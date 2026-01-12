import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Task, TaskCreate, TaskUpdate } from '../../models/task.model';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {
  tasks: Task[] = [];
  sortBy = 'createdAt';
  filter = 'all';
  message = '';
  messageType = '';
  
  isEditing = false;
  editingTaskId: number | null = null;
  taskTitle = '';
  taskDescription = '';
  
  currentUser: any = null;

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks(this.sortBy, this.filter).subscribe({
      next: (tasks: any) => this.tasks = tasks,
      error: () => this.showMessage('Failed to load tasks', 'error')
    });
  }

  onSortChange(): void {
    this.loadTasks();
  }

  onFilterChange(): void {
    this.loadTasks();
  }

  startEdit(task: Task): void {
    this.isEditing = true;
    this.editingTaskId = task.id;
    this.taskTitle = task.title;
    this.taskDescription = task.description;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingTaskId = null;
    this.taskTitle = '';
    this.taskDescription = '';
  }

  onSubmit(): void {
    if (!this.taskTitle.trim()) {
      this.showMessage('Title is required', 'error');
      return;
    }

    if (this.isEditing && this.editingTaskId) {
      const task = this.tasks.find(t => t.id === this.editingTaskId);
      if (task) {
        const updateData: TaskUpdate = {
          title: this.taskTitle,
          description: this.taskDescription,
          isCompleted: task.isCompleted
        };

        this.taskService.updateTask(this.editingTaskId, updateData).subscribe({
          next: () => {
            this.showMessage('Task updated successfully', 'success');
            this.loadTasks();
            this.cancelEdit();
          },
          error: () => this.showMessage('Failed to update task', 'error')
        });
      }
    } else {
      const newTask: TaskCreate = {
        title: this.taskTitle,
        description: this.taskDescription
      };

      this.taskService.createTask(newTask).subscribe({
        next: () => {
          this.showMessage('Task created successfully', 'success');
          this.loadTasks();
          this.taskTitle = '';
          this.taskDescription = '';
        },
        error: () => this.showMessage('Failed to create task', 'error')
      });
    }
  }

  toggleComplete(task: Task): void {
    const updateData: TaskUpdate = {
      title: task.title,
      description: task.description,
      isCompleted: !task.isCompleted
    };

    this.taskService.updateTask(task.id, updateData).subscribe({
      next: () => {
        this.showMessage('Task status updated', 'success');
        this.loadTasks();
      },
      error: () => this.showMessage('Failed to update task', 'error')
    });
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.showMessage('Task deleted successfully', 'success');
          this.loadTasks();
          if (this.editingTaskId === id) {
            this.cancelEdit();
          }
        },
        error: () => this.showMessage('Failed to delete task', 'error')
      });
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => window.location.reload(),
      error: () => this.showMessage('Logout failed', 'error')
    });
  }

  showMessage(msg: string, type: string): void {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);
  }
}