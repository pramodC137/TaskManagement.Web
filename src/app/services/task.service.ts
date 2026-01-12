import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskCreate, TaskUpdate } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7247/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(sortBy: string = 'createdAt', filter: string = 'all'): Observable<Task[]> {
    const params = new HttpParams()
      .set('sortBy', sortBy)
      .set('filter', filter);
    
    return this.http.get<Task[]>(this.apiUrl, { params, withCredentials: true });
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  createTask(task: TaskCreate): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, { withCredentials: true });
  }

  updateTask(id: number, task: TaskUpdate): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task, { withCredentials: true });
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}