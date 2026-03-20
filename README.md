# TODO CLI

Lightweight command-line TODO manager that stores tasks in `todo.txt`.

**Table of Contents**

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [Examples](#examples)
- [Configuration & Storage](#configuration--storage)
- [Development](#development)

## About

`TODO CLI` is a small, dependency light command line tool for managing a plaintext todo list (`todo.txt`).

A Node.js CLI tool for managing todos with file based persistence. Built using Commander.js supporting CRUD operations on tasks via terminal commands.

## Features

- File-backed tasks in `todo.txt` for portability and manual edits
- Add, list, delete, and edit tasks from the command line
- Human friendly commands

## Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/MihirPetkar108/TODO-CLI.git
cd TODO_CLI
npm install
```

Run locally via Node:

```bash
node index.js <command>
```

## Usage

The CLI reads and writes tasks in `todo.txt` located in the project root. Use the available commands to manipulate the list.

Basic form:

```bash
node index.js <command> [arguments]
```

## Commands

- `add "task text"` — Add a new task.
- `list` — Show all pending tasks with numeric IDs.
- `delete <id>` — Delete a task by its ID.
- `edit <id> <string>` - Edits the tasks of the given ID
- `help` — Show help and command list.

## Examples

Add a task:

```bash
node index.js add "Buy groceries"
```

List tasks:

```bash
node index.js list
```

Delete a task:

```bash
node index.js delete 2
```

Edit task:

```bash
node index.js edit 1 "Go to gym"
```

## Configuration & Storage

- Tasks are stored in `todo.txt` in the repository root. You can edit that file using the CLI.
- To change storage location, update the path in `index.js`=

## Development

1. Install dependencies: `npm install`
2. Run commands with `node index.js <command>`
