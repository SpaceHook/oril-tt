import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Todo } from "src/types/Todo";

@Injectable({
  providedIn: "root",
})
export class TodosService {
  todosUrl = "https://jsonplaceholder.typicode.com/todos";

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<Todo[]>(this.todosUrl);
  }

  deleteTodo(todo: Todo) {
    return this.http.delete(`${this.todosUrl}/${todo.id}`);
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>(
      "https://jsonplaceholder.typicode.com/todos",
      todo
    );
  }

  updateTodo(todo: Todo) {
    return this.http.put(`${this.todosUrl}/${todo.id}`, todo);
  }
}
