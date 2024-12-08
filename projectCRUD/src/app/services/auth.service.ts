import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllHabits(): Observable<any> {
    return this.http.get(`${this.baseUrl}/habits`);
  }

  addHabit(habit: { name: string; description: string; category: string; date: string; time: string; progress?: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/habits`, habit);
  }

  updateHabit(habit: { name: string; description: string; category: string; date: string; time: string; progress: number }): Observable<any> {
    return this.http.put(`${this.baseUrl}/habits`, habit);
  }

  deleteHabit(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/habits`, { body: { name } });
  }

  getHabitByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/habits/${name}`);
  }

  getHabitsByCategory(category: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/habits/category`, { category });
  }

  getHabitsByTime(time: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/habits/time`, { time });
  }
}