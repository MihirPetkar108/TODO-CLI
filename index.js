const { Command } = require("commander");
const fs = require("fs");

const program = new Command();

program
    .name("TODO CLI")
    .description("CLI for your daily TODO's")
    .version("0.0.0");

program
    .command("add")
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

            try {
                todos = JSON.parse(data);
            } catch (e) {
                todos = [];
            }

            let maxId =
                todos.length > 0
                    ? Math.max(...todos.map((todo) => todo.id))
                    : 0;
            let newtodo = {
                id: maxId + 1,
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

program
    .command("list")
    .description("List all your todos!")
    .action(() => {
        fs.readFile("todo.txt", "utf-8", (err, data) => {
            if (err) {
                if (err.code == "ENOENT") {
                    console.log("No todos found!");
                    return;
                } else {
                    console.log(`Error while listing the data: ${err}`);
                    return;
                }
            }

            let content = [];

            try {
                content = JSON.parse(data);
            } catch (e) {
                content = [];
            }

            if (content.length === 0) {
                console.log("No todos found!");
                return;
            }

            for (let i = 0; i < content.length; i++) {
                console.log(
                    `ID ${content[i].id} => Task ${i + 1}:- ${content[i].task}`,
                );
            }
        });
    });

program
    .command("delete")
    .description("Delete a todo!")
    .argument("<number>", "Which task do you want to delete?")
    .action((id) => {
        fs.readFile("todo.txt", "utf-8", (err, data) => {
            if (err) {
                if (err.code == "ENOENT") {
                    console.log("No data found!");
                    return;
                } else {
                    console.log(`Error while deleting data:- ${err}`);
                    return;
                }
            }

            let content = [];

            try {
                content = JSON.parse(data);
            } catch (e) {
                console.log(`No data found!`);
                return;
            }

            if (content.length === 0) {
                console.log("No data found!");
                return;
            }

            const originalLength = content.length;
            content = content.filter((todo) => todo.id != id);
            if (content.length === originalLength) {
                console.log(`No todo found with ID ${id}`);
                return;
            }

            fs.writeFile(
                "todo.txt",
                JSON.stringify(content, null, 2),
                "utf-8",
                (err) => {
                    if (err) {
                        console.log(
                            `Error while writing to file while deleting data`,
                        );
                    } else {
                        console.log(`Deleted todo!`);
                    }
                },
            );
        });
    });

program
    .command("edit")
    .description("Edit a todo!")
    .argument("<number>", "Which task do you want to edit?")
    .argument("<string>", "What do you want to change the task to?")
    .action((id, taskContent) => {
        fs.readFile("todo.txt", "utf-8", (err, data) => {
            if (err) {
                if (err.code == "ENOENT") {
                    console.log("No data found to edit!");
                    return;
                } else {
                    console.log(`Error while editing the file:- ${err}`);
                    return;
                }
            }

            let content = [];

            try {
                content = JSON.parse(data);
            } catch (e) {
                content = [];
                console.log("No data found to edit!");
                return;
            }

            if (content.length === 0) console.log("No data found to edit!");

            let found = false;

            for (let i = 0; i < content.length; i++) {
                if (content[i].id == id) {
                    found = true;
                    content[i].task = taskContent;
                    break;
                }
            }

            if (!found) {
                console.log(`No todo found with ID ${id}`);
                return;
            }

            fs.writeFile(
                "todo.txt",
                JSON.stringify(content, null, 2),
                "utf-8",
                (err) => {
                    if (err) {
                        console.log(
                            `Error while writing to file while editing data`,
                        );
                    } else {
                        console.log(`Edited todo!`);
                    }
                },
            );
        });
    });

program.parse();
