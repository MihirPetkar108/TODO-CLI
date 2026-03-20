const { Command } = require("commander");
const fs = require("fs");

const program = new Command();

program
    .name("TODO CLI")
    .description("CLI for your daily TODO's")
    .version("0.0.0");

program.parse();
