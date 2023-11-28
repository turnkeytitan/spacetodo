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
    const all = [todo, ...this.todos.value];
    this.todos.next(all);
    localStorage.setItem('list', JSON.stringify(all));
  }

  deleteTodo(id: number) {
    const all = this.todos.value.filter((todo) => todo.id !== id);
    this.todos.next(all);
    localStorage.setItem('list', JSON.stringify(all));
  }

  completeTodo(id: number) {
    const changed = this.todos.value.find((todo) => todo.id === id);
    if (changed) {
      changed.completed = !changed.completed;
      const all = this.todos.value.filter((todo) => todo.id !== id);
      all.push(changed);
      all.sort((a, b) => b.id - a.id);
      this.todos.next([...all]);
      localStorage.setItem('list', JSON.stringify(all));
    }
  }
}
