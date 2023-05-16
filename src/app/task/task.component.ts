import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { Task } from '../models/task';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
    @ViewChild('descInput', { static: false })
    descriptionInputRef!: ElementRef<HTMLElement>;

    @Input() task!: Task;

    @Output() onDelete = new EventEmitter<{ taskId: string }>();
    @Output() onToggleComplete = new EventEmitter<{
        taskId: string;
        completed: boolean;
    }>();
    @Output() onModifiedDescription = new EventEmitter<{
        taskId: string;
        description: string;
    }>();

    descriptionInput!: string;
    isModifyingDescription = false;

    constructor(private renderer: Renderer2) {}

    ngOnInit(): void {}

    deleteTask() {
        this.onDelete.emit({ taskId: this.task.id });
    }

    toggleCheck() {
        this.task.isCompleted = !this.task.isCompleted;
        this.onToggleComplete.emit({
            taskId: this.task.id,
            completed: this.task.isCompleted,
        });
    }

    modifiedDescription() {
        this.isModifyingDescription = true;
        this.descriptionInput = this.task.description;
        setTimeout(() => {
            this.descriptionInputRef.nativeElement.focus();
            const listen = this.renderer.listen(
                'window',
                'click',
                (e: Event) => {
                    if (e.target !== this.descriptionInputRef.nativeElement) {
                        if (
                            this.descriptionInput.trim() !==
                            this.task.description
                        ) {
                            this.onModifiedDescription.emit({
                                taskId: this.task.id,
                                description: this.descriptionInput,
                            });
                        }
                        this.isModifyingDescription = false;
                        listen();
                    }
                }
            );
        });
    }
}
