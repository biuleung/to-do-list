import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from '../task/task.component';
import { TodoService } from '../services/todo.service';
import { of } from 'rxjs';
import { Task } from '../models/task';

describe('TodoListComponent', () => {
    let component: TodoListComponent;
    let todoService: TodoService;
    let fixture: ComponentFixture<TodoListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TodoListComponent, TaskComponent],
            imports: [FormsModule, BrowserModule],
        });
        fixture = TestBed.createComponent(TodoListComponent);
        component = fixture.componentInstance;
        todoService = TestBed.inject(TodoService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('addTask()', () => {
        it('should add a task when addTask() is called with a valid input', () => {
            const mockAddedTask: Task = {
                id: 'id-1',
                description: 'do homework',
                isCompleted: false,
                createdAt: new Date(),
            };
            spyOn(todoService, 'addTask').and.returnValue(of(mockAddedTask));
            component.newTaskDescInput = mockAddedTask.description;
            component.addTask();

            expect(todoService.addTask).toHaveBeenCalledWith(
                mockAddedTask.description
            );
            expect(component.newTaskDescInput).toBe('');
            expect(component.filteredTasksInput).toBe('');
        });
    });

    describe('deleteTask()', () => {
        it('should delete a task', () => {
            const mockDeletedTask: Task = {
                id: 'id-1',
                description: 'do homework',
                isCompleted: false,
                createdAt: new Date(),
            };
            spyOn(todoService, 'deleteTask').and.returnValue(
                of(mockDeletedTask)
            );

            component.deleteTask({ taskId: mockDeletedTask.id });

            expect(todoService.deleteTask).toHaveBeenCalledWith(
                mockDeletedTask.id
            );
            expect(component.filteredTasksInput).toBe('');
        });
    });

    describe('updateTaskCompletion()', () => {
        it('should update task completion status and call the modifyTaskState method', () => {
            const mockUpdatedTask: Task = {
                id: 'id-1',
                description: 'do homework',
                isCompleted: true,
                createdAt: new Date(),
            };

            spyOn(todoService, 'modifyTaskState').and.returnValue(
                of(mockUpdatedTask)
            );

            component.updateTaskCompletion({
                taskId: mockUpdatedTask.id,
                completed: mockUpdatedTask.isCompleted,
            });
            expect(todoService.modifyTaskState).toHaveBeenCalledWith(
                mockUpdatedTask.id,
                { isCompleted: mockUpdatedTask.isCompleted } as any
            );
        });
    });

    describe('modifiedDescription()', () => {
        it('should update task description status and call the modifyTaskState method', () => {
            const mockUpdatedTask: Task = {
                id: 'id-1',
                description: 'finish homework',
                isCompleted: false,
                createdAt: new Date(),
            };

            spyOn(todoService, 'modifyTaskState').and.returnValue(
                of(mockUpdatedTask)
            );

            component.modifiedDescription({
                taskId: mockUpdatedTask.id,
                description: mockUpdatedTask.description,
            });
            expect(todoService.modifyTaskState).toHaveBeenCalledWith(
                mockUpdatedTask.id,
                { description: mockUpdatedTask.description } as any
            );
        });
    });

    describe('sortTasks()', () => {
        it('should toggle the sorting order and update filtered tasks', () => {
            spyOn(component, 'updateFilteredTasks');
            component.sortTasks();
            expect(component.isSortByNewest).toBe(false);
            expect(component.updateFilteredTasks).toHaveBeenCalled();
        });
    });

    describe('filterTasks()', () => {
        it('should update filtered tasks with the new filter text', () => {
            spyOn(todoService, 'updateFilteredTasks');
            component.sortTasks();
            expect(component.isSortByNewest).toBe(false);
            expect(todoService.updateFilteredTasks).toHaveBeenCalled();
        });
    });

    describe('updateFilteredTasks()', () => {
        it('should update the filtered tasks by calling the service', () => {
            spyOn(todoService, 'updateFilteredTasks');
            component.updateFilteredTasks();
            expect(todoService.updateFilteredTasks).toHaveBeenCalledWith({
                filteredText: component.filteredTasksInput,
                isSortByCreationTimeDescending: component.isSortByNewest,
            });
        });
    });
});
