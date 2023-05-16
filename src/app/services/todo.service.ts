import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, take } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
    providedIn: 'root',
})

/**
 * Manages tasks and provides methods for adding, deleting, modifying, filtering and sorting
 */
export class TodoService {
    mockTasks: Task[] = [];

    tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
    tasks$ = this.tasks.asObservable();

    latestTimestamp = new Date();

    constructor() {
        this.mockGetTasks().subscribe((tasks) => {
            this.tasks.next(tasks);
        });
    }

    /**
     * Is used in mock data to create a unique ID and creation date
     * @returns a new date object that's one day ahead of the latestTimestamp date
     */
    getUpdatedDate() {
        return new Date(
            this.latestTimestamp.setDate(this.latestTimestamp.getDate() + 1)
        );
    }

    /**
     * Generates some mock tasks with unique ids, descriptions, and creation dates
     * @returns an array of mock tasks sorted by creation date(newest to oldest by default).
     */
    mockGetTasks(): Observable<Task[]> {
        Array.from({ length: 5 }, (_, i) => {
            const updatedDate = this.getUpdatedDate();
            this.mockTasks.unshift({
                id: updatedDate.getTime().toString(),
                description: `todo ${i}`,
                isCompleted: i % 2 !== 0 ? true : false,
                createdAt: updatedDate,
            });
        });
        return of(this.mockTasks);
    }

    /**
     * Adds a new task with provided description
     * @param description
     * @returns an Observable of the new task
     */
    addTask(description: string): Observable<Task> {
        const updatedDate = this.getUpdatedDate();
        const newTask: Task = {
            id: updatedDate.getTime().toString(),
            description: description,
            isCompleted: false,
            createdAt: updatedDate,
        };

        this.mockTasks.push(newTask);
        this.tasks.next(this.mockTasks);
        return of(newTask);
    }

    /**
     * Removes a task with provided id
     * @param deletedTaskId
     * @returns an Observable of deleted task or null if not found
     */
    deleteTask(deletedTaskId: string): Observable<Task | null> {
        const deletedTask = this.mockTasks.find(
            (task) => task.id === deletedTaskId
        );

        if (deletedTask) {
            const index = this.mockTasks.indexOf(deletedTask);
            this.mockTasks.splice(index, 1);

            this.tasks.next(this.mockTasks);
            return of(deletedTask);
        }
        return of(null);
    }

    /**
     * Updates the state of a task by allowing modification of its description and completion status
     * @param taskId
     * @param prop
     * @returns an observable with updated task or null
     */
    modifyTaskState<K extends keyof Pick<Task, 'isCompleted' | 'description'>>(
        taskId: string,
        prop: {
            [key in K]: Task[key];
        }
    ): Observable<Task | null> {
        const updatedTaskIndex = this.mockTasks.findIndex(
            (task) => task.id === taskId
        );
        if (updatedTaskIndex !== -1) {
            Object.entries(prop).forEach(([key, value]) => {
                this.mockTasks[updatedTaskIndex] = {
                    ...this.mockTasks[updatedTaskIndex],
                    [key]: value,
                } as Task;
            });
            this.tasks.next(this.mockTasks);
            return of(this.mockTasks[updatedTaskIndex]);
        }
        return of(null);
    }

    /**
     * Filters and sorts tasks based on provided options, and updating the task list accordingly
     * @param options
     */

    updateFilteredTasks(options: {
        filteredText: string;
        isSortByCreationTimeDescending: boolean;
    }) {
        let filteredTasks: Task[];

        if (options.filteredText.trim().length) {
            filteredTasks = this.mockTasks.filter((task) =>
                task.description.includes(options.filteredText)
            );
        } else {
            filteredTasks = this.mockTasks;
        }

        filteredTasks.sort((a, b) =>
            options.isSortByCreationTimeDescending
                ? b.createdAt.getTime() - a.createdAt.getTime()
                : a.createdAt.getTime() - b.createdAt.getTime()
        );
        this.tasks.next(filteredTasks);
    }
}
