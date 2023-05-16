import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
    let service: TodoService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TodoService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('addTask', () => {
        it('should add a new task', () => {
            const description = 'New Task';
            const initialTasks = service.mockTasks.length;

            service.addTask(description).subscribe((task) => {
                expect(task).toBeDefined();
                expect(task.description).toBe(description);
                expect(service.mockTasks.length).toBe(initialTasks + 1);
            });
        });
    });

    describe('deleteTask()', () => {
        it('should delete a task', () => {
            const taskId = service.mockTasks[0].id;
            const initialTasks = service.mockTasks.length;

            service.deleteTask(taskId).subscribe((deletedTask) => {
                expect(deletedTask).toBeDefined();
                expect(service.mockTasks.length).toBe(initialTasks - 1);
            });
        });
    });

    describe('modifyTaskState()', () => {
        it("should modify the  state of a task' isCompleted", () => {
            const taskId = service.mockTasks[0].id;
            const updatedIsCompleted = !service.mockTasks[0].isCompleted;

            service
                .modifyTaskState(taskId, { isCompleted: updatedIsCompleted })
                .subscribe((updatedTask) => {
                    expect(updatedTask).toBeDefined();
                    if (updatedTask) {
                        expect(updatedTask.isCompleted).toBe(
                            updatedIsCompleted
                        );
                    } else {
                        fail('Failed to modify task state');
                    }
                });
        });
        it("should modify the state of a task's description", () => {
            const taskId = service.mockTasks[0].id;
            const updatedDescription = 'Updated description';

            service
                .modifyTaskState(taskId, { description: updatedDescription })
                .subscribe((updatedTask) => {
                    expect(updatedTask).toBeDefined();
                    if (updatedTask) {
                        expect(updatedTask.description).toBe(
                            updatedDescription
                        );
                    } else {
                        fail('Failed to modify task state');
                    }
                });
        });
    });

    describe('updateFilteredTasks()', () => {
        it('should update filtered tasks based on provided options', () => {
            const options = {
                filteredText: 'todo',
                isSortByCreationTimeDescending: true,
            };

            const mockTasks = [
                {
                    id: '1',
                    description: 'Task 1',
                    isCompleted: false,
                    createdAt: new Date('2022-01-01'),
                },
                {
                    id: '2',
                    description: 'todo Task 2',
                    isCompleted: true,
                    createdAt: new Date('2022-01-02'),
                },
                {
                    id: '3',
                    description: 'Another todo task',
                    isCompleted: false,
                    createdAt: new Date('2022-01-03'),
                },
            ];
            service.mockTasks = mockTasks;

            service.updateFilteredTasks(options);

            service.tasks$.subscribe((tasks) => {
                expect(tasks.length).toBe(2);
                expect(tasks[0].id).toBe('3');
                expect(tasks[1].id).toBe('2');
            });
        });
    });
});
