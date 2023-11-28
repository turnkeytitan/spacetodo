import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../core/services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  newTodoTitle = '';
  isComplete = false;
  constructor(public todoService: TodoService) {}

  addTodo() {
    this.todoService.addTodo({
      id: Date.now(),
      title: this.newTodoTitle,
      description: '',
      completed: false,
    });
    this.newTodoTitle = '';
  }
  deleteTodo(event: number) {
    this.todoService.deleteTodo(event);
  }
  complete(event: number) {
    this.todoService.completeTodo(event);
  }
}
