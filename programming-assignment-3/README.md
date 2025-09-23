# Programming Assignment 3: Building with React

Hello friend! This is a programming assignment for CS 160/260A.

## Cloning the repository

You'll want to [clone this repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the typical way, using the `git` commandline tool.

You're welcome to use a non-commandline Git client (like [GitHub Desktop](https://desktop.github.com/)) for your Git operations, but you'll need to use the commandline for the next step.
On Windows, this will probably be PowerShell; on macOS, you can use the Terminal application; and other operating systems will have their own commandline software (e.g., `bash` and `gnome-terminal` on some Linux installations).
You may also be able to use a terminal built into your text editor, like VS Code or vim.

## Running the server

Make sure you have recent versions of `node` and `npm` installed (definitely at least version 22 of Node).
Installation instructions for most operating systems are available [on the Node.js website](https://nodejs.org/en/download).
On Windows, we recommend <strong>not</strong> using the Docker version of Node; try a package manager like Chocolatey (described in the linked page).
You can check your `node` and `npm` versions using the following commands:

```bash
node --version
npm --version
```

Node.js is a tool that enables you to run JavaScript code outside of the web browser; it's a full-featured language runtime just like the `python3` or `java` command, and you can build desktop software using Node.js.
You won't write any Node.js JavaScript code for this assignment, but you will need to use Node.js to run a local Web server for your work on this assignment.
Node.js is also used to run the assignment's test cases using the Playwright library.

### Installing the server dependencies

This repository contains a `package.json` file, which is the standard way to tell Node.js some information about the program, including what libraries are needed to run the server code.

Make sure you are inside the repository directory (`programming-assignment-3`).
Run the `install` command in `npm`, Node's default package manager:

```bash
cd <repository location>/programming-assignment-3
npm install
```

This will read `package.json`, then look to the [NPM package repository](https://www.npmjs.com/) to grab the appropriate dependencies.

<!-- removed autograder instructions here. add them back in for PA4! -->

### Run the server

Run the server on your computer with <code>npm start</code>:

```bash
cd <repository location>/programming-assignment-3
npm start
```

This will start a long-running process (though you should be able to stop it with `Ctrl+C` or by closing your terminal window).
Now, you can visit <a href="http://localhost:6160">http://localhost:6160</a> in your Web browser.
There, you will see links to the specification document (which tells you how to complete this assignment) and to the project you will flesh out in this assignment.

In this project, we have already created a Vite application for you; this will make sure the React code is processed correctly so you can see the page as you build it.
Vite also includes live-reloading, so that you don’t need to refresh the page manually when you make a change.

We have configured `npm start` to run the Vite development server in addition to hosting the static specification document.
In a personal project, you would instead generally open a terminal into the directory that has `vite.config.js` (in this case, that's the `code` directory) and run `npm run dev` from there; in this project, you’ll instead run `npm start` from the outer `programming-assignment-3` directory.
