import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: BehaviorSubject<Todo[]> = new BehaviorSubject([] as Todo[]);
  todos$: Observable<Todo[]> = this.todos.asObservable();

  constructor() {
    const listText = localStorage.getItem('list');
    if (listText) {
      this.todos.next(JSON.parse(listText));
    }
  }

  addTodo(todo: Todo) {
    this.todos.next([todo, ...this.todos.value]);
  }

  deleteTodo(id: number) {
    this.todos.next(this.todos.value.filter((todo) => todo.id !== id));
  }
}
