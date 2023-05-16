import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
} from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { ElementRef } from '@angular/core';

describe('TaskComponent', () => {
    let component: TaskComponent;
    let fixture: ComponentFixture<TaskComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TaskComponent],
        });
        fixture = TestBed.createComponent(TaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('deleteTask()', () => {
        it('should emit onDelete event when deleteTask is called', () => {
            const onDeleteSpy = spyOn(component.onDelete, 'emit');
            const mockTaskId = 'task-1';

            component.task = {
                id: mockTaskId,
                description: '',
                isCompleted: false,
                createdAt: new Date(),
            };
            component.deleteTask();

            expect(onDeleteSpy).toHaveBeenCalledWith({ taskId: mockTaskId });
        });
    });

    describe('toggleCheck()', () => {
        it('should toggle the task completion status and emit onToggleComplete event', () => {
            const onToggleCompleteSpy = spyOn(
                component.onToggleComplete,
                'emit'
            );
            const mockTaskId = 'task1';

            component.task = {
                id: mockTaskId,
                description: '',
                isCompleted: false,
                createdAt: new Date(),
            };
            component.toggleCheck();

            expect(component.task.isCompleted).toBe(true);
            expect(onToggleCompleteSpy).toHaveBeenCalledWith({
                taskId: mockTaskId,
                completed: true,
            });

            component.toggleCheck();

            expect(component.task.isCompleted).toBe(false);
            expect(onToggleCompleteSpy).toHaveBeenCalledWith({
                taskId: mockTaskId,
                completed: false,
            });
        });
    });

    describe('modifiedDescription', () => {
        it('should modify the description and emit onModifiedDescription event when the description is changed', fakeAsync(() => {
            const onModifiedDescriptionSpy = spyOn(
                component.onModifiedDescription,
                'emit'
            );
            const mockTaskId = 'task1';

            component.task = {
                id: mockTaskId,
                description: 'Old Description',
                isCompleted: false,
                createdAt: new Date(),
            };
            const mockElementRef: ElementRef<HTMLElement> = {
                nativeElement: jasmine.createSpyObj('nativeElement', ['focus']),
            };
            component.descriptionInputRef = mockElementRef;

            component.modifiedDescription();
            tick();

            expect(component.isModifyingDescription).toBe(true);
            expect(component.descriptionInput).toBe('Old Description');

            const newDescription = 'New Description';
            component.descriptionInput = newDescription;

            // create a mock click event and dispatch it on the window, simulating a user clicking outside the input element
            const mockClickEvent = new Event('click');
            spyOn(mockClickEvent, 'target' as any).and.returnValue(
                document.createElement('div') as any
            );

            window.dispatchEvent(mockClickEvent);
            tick();

            expect(component.isModifyingDescription).toBe(false);
            expect(onModifiedDescriptionSpy).toHaveBeenCalledWith({
                taskId: mockTaskId,
                description: newDescription,
            });
        }));
    });
});
