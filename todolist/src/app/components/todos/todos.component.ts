import { Component, OnInit } from '@angular/core';

import { TodoService } from '../../services/todo.service';

import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos:Todo[];

  constructor(private todoService:TodoService) { 
  }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {this.todos = todos});
  }

  deleteTodo(todo:Todo)
  {
    //Delete UI
    this.todos = this.todos.filter(t => t.id != todo.id);
    //Delete Server
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(title:string)
  {
    var id = Math.floor(Math.random() * 10000);
    while (this.todos.filter(t => t.id == id).length > 0);
      id = Math.floor(Math.random() * 10000);
    
    const todo = {
      title: title,
      completed: false,
      id: id
    }

    this.todoService.addTodo(todo).subscribe(todo => {
      todo.id = id;
      this.todos.push(todo);
    })
  }

}
