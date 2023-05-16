# ToDoList challenge

This project is an implementation of a ToDoList application built with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

## Development server

To set up the development server, follow these steps:

1. Run `npm install` or `yarn install` to install all project dependencies.
2. Run `ng serve` or `yarn start` to start the development server.
3. Navigate to `http://localhost:4221/` in your web browser to access the application.

## Running unit tests

Run `ng test` to execute the unit tests. The project includes 19 unit test cases.

# Notice

Please note that the above commands assume you have the Angular CLI installed globally on your machine.
Run `npm install -g @angular/cli` to intall the Angular CLI.

# Funtionality

-   Allows adding tasks with a short description.
-   Displays a list of all tasks, including completed and uncompleted tasks.
-   Supports marking tasks as completed or uncompleted.
-   Enables deleting tasks.
-   Supports updating task descriptions by double-clicking on them.
-   Provides the ability to sort tasks by their creation time.
-   Allows filtering or searching for tasks.
-   Responsive user interface for optimal display on different devices.

# Codebase architecture

```
to-do-list
├─ README.md
├─ angular.json
├─ package.json
├─ spec
│  └─ support
│     └─ jasmine.json
├─ src
│  ├─ app
│  │  ├─ app-routing.module.ts
│  │  ├─ app.component.html
│  │  ├─ app.component.scss
│  │  ├─ app.component.spec.ts
│  │  ├─ app.component.ts
│  │  ├─ app.module.ts
│  │  ├─ models
│  │  │  └─ task.ts
│  │  ├─ services
│  │  │  ├─ todo.service.spec.ts
│  │  │  └─ todo.service.ts
│  │  ├─ task
│  │  │  ├─ task.component.html
│  │  │  ├─ task.component.scss
│  │  │  ├─ task.component.spec.ts
│  │  │  └─ task.component.ts
│  │  └─ todo-list
│  │     ├─ todo-list.component.html
│  │     ├─ todo-list.component.scss
│  │     ├─ todo-list.component.spec.ts
│  │     └─ todo-list.component.ts
│  ├─ assets
│  │  └─ styles
│  │     ├─ _variables.scss
│  │     ├─ button.scss
│  │     └─ input.scss
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ main.ts
│  └─ styles.scss
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.spec.json

```
