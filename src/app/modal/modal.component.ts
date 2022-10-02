import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Todo } from "src/types/Todo";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
  @Input() option: string = "";
  @Input() isOpenModal: boolean = false;
  @Input() hasSimilarTitle: boolean = false;
  @Input() newTodoTitle: string = "";
  @Input() editedTodoTitle: string = "";
  @Input() todos: Todo[] = [];
  @Input() selectedTodo: Todo = {
    id: 0,
    userId: 0,
    completed: false,
    title: "",
  };
  @Output() addTodo = new EventEmitter<string>();
  @Output() deleteTodo = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();
  @Output() editTodo = new EventEmitter<string>();

  constructor() {}

  onAddTodo(todoTitle: string) {
    if (todoTitle.length) {
      this.addTodo.emit(todoTitle);
      this.newTodoTitle = "";
    }
    if (this.todos.some((todo) => todo.title === todoTitle)) {
      this.hasSimilarTitle = true;
    }
  }

  onEditTodo(title: string) {
    this.editTodo.emit(title);

    if (this.todos.some((todo) => todo.title === title)) {
      this.hasSimilarTitle = true;
    }
  }
}
