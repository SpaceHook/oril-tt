import { Component, OnInit } from "@angular/core";
import { Todo } from "src/types/Todo";
import { User } from "src/types/User";
import { TodosService } from "../todos.service";
import { UsersService } from "../users.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  todos: Todo[] = [];
  users: User[] = [];
  isLoading = false;
  spinnerDelete: number = 0;
  spinnerEdit: number | null = 0;
  option: string = "";
  isOpenModal: boolean = false;
  selectedTodo: Todo = { id: 0, userId: 0, completed: false, title: "" };
  hasSimilarTitle: boolean = false;
  newTodoTitle: string = "";
  editedTodoTitle: string = "";

  constructor(
    private todosFromServer: TodosService,
    private usersFromServer: UsersService
  ) {}

  ngOnInit(): void {
    this.todosFromServer
      .getTodos()
      .subscribe((todosArray) => (this.todos = todosArray));
    this.usersFromServer
      .getUsers()
      .subscribe((usersArray) => (this.users = usersArray));
  }

  onOpenModal(option: string) {
    this.isOpenModal = true;
    this.option = option;
  }

  onAddTodo(todoTitle: string) {
    const newTodo = {
      id: this.todos.length,
      completed: false,
      title: todoTitle,
      userId: this.users.length + 1,
    };

    if (!this.todos.some((todo) => todo.title === todoTitle)) {
      this.isLoading = true;

      this.todosFromServer.addTodo(newTodo).subscribe((todo) => {
        this.isLoading = false;
        this.todos = [newTodo, ...this.todos];
      });
      this.hasSimilarTitle = false;
      this.isOpenModal = false;
    }
  }

  onEditTodo(title: string) {
    const editedTodo = {
      ...this.selectedTodo,
      title,
    };
    if (!this.todos.some((todo) => todo.title === title)) {
      this.isOpenModal = false;

      this.spinnerEdit = this.selectedTodo.id;
      this.todosFromServer.updateTodo(this.selectedTodo).subscribe((data) => {
        this.spinnerEdit = null;
        this.todos = this.todos.map((todo) => {
          if (todo.id === this.selectedTodo.id) {
            return editedTodo;
          }

          return todo;
        });
      });
    }
  }

  onDeleteTodo(todo: Todo) {
    this.spinnerDelete = todo.id;
    this.isOpenModal = false;

    this.todosFromServer.deleteTodo(todo).subscribe((data) => {
      this.todos = this.todos.filter(
        (selectedTodo) => todo.id !== selectedTodo.id
      );
    });
  }

  toggleComplete(selectedTodo: Todo) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === selectedTodo.id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });
  }
}
