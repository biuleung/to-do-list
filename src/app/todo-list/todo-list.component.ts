import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
    tasks$ = this.todoService.tasks$;
    newTaskDescInput = '';
    filteredTasksInput = '';
    isSortByNewest = true;

    constructor(private todoService: TodoService) {}

    addTask() {
        if (this.newTaskDescInput.trim().length > 0) {
            this.todoService
                .addTask(this.newTaskDescInput)
                .subscribe((result) => {
                    if (result) {
                        console.log('Add task successfully: ', result);
                        this.newTaskDescInput = '';
                    }
                    this.updateFilteredTasks();
                });
        }
    }

    deleteTask(task: { taskId: string }) {
        this.todoService.deleteTask(task.taskId).subscribe((result) => {
            if (result) {
                console.log('Delete task successfully: ', result);
            }
            this.updateFilteredTasks();
        });
    }

    updateTaskCompletion(e: { taskId: string; completed: boolean }) {
        this.todoService
            .modifyTaskState(e.taskId, {
                isCompleted: e.completed,
            })
            .subscribe((result) => {
                if (result) {
                    console.log(
                        "Modified task's isCompleted property successfully: ",
                        result
                    );
                }
                this.updateFilteredTasks();
            });
    }

    modifiedDescription(e: { taskId: string; description: string }) {
        this.todoService
            .modifyTaskState(e.taskId, {
                description: e.description,
            })
            .subscribe((result) => {
                if (result) {
                    console.log(
                        "Modified task's description successfully: ",
                        result
                    );
                }
                this.updateFilteredTasks();
            });
    }

    sortTasks() {
        this.isSortByNewest = !this.isSortByNewest;
        this.updateFilteredTasks();
    }

    filterTasks(e: string) {
        this.filteredTasksInput = e;
        this.updateFilteredTasks();
    }

    updateFilteredTasks() {
        this.todoService.updateFilteredTasks({
            filteredText: this.filteredTasksInput,
            isSortByCreationTimeDescending: this.isSortByNewest,
        });
    }
}
