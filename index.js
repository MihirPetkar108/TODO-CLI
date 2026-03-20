const { Command } = require("commander");
const fs = require("fs");

const program = new Command();

program
    .name("TODO CLI")
    .description("CLI for your daily TODO's")
    .version("0.0.0");

program
    .command("write")
    .description("Add a todo!")
    .argument("<string>", "What do you want to add?")
    .action((content) => {
        fs.readFile("todo.txt", "utf-8", (err, data) => {
            if (err) {
                if (err.code === "ENOENT") {
                    data = "";
                } else {
                    console.log(
                        "Error while reading the file during add to task!",
                    );
                    return;
                }
            }

            let todos = [];

            if (data) {
                try {
                    todos = JSON.parse(data);
                } catch (e) {
                    todos = [];
                }
            }

            let newtodo = {
                id: todos.length + 1,
                task: content,
            };

            todos.push(newtodo);

            fs.writeFile(
                "todo.txt",
                JSON.stringify(todos, null, 2),
                "utf-8",
                (err) => {
                    if (err)
                        console.log(
                            "Error while writing to file during adding a task!",
                        );
                    else console.log("Task added successfully!");
                },
            );
        });
    });

program.parse();
