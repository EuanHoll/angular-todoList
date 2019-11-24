import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todoitem',
  templateUrl: './todoitem.component.html',
  styleUrls: ['./todoitem.component.css']
})
export class TodoitemComponent implements OnInit {

  @Input() todo:Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit() {
  }

  //Set Dynamic Classes
  setClasses()
  {
    let classes = {
      todo: true,
      'is-complete':this.todo.completed
    }

    return classes;
  }

  //Toggling Todo Checkbox
  onToggle(todo)
  {
    //UI Toogle
    todo.completed = !todo.completed;
    //Server Toggle
    this.todoService.toggleServer(this.todo).subscribe(todo => {console.log(todo)})
  }

  //Delete Todo
  onDelete(todo)
  {
    this.deleteTodo.emit(todo)
  }

}
