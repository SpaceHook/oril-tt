import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "src/types/User";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  usersUrl = "https://jsonplaceholder.typicode.com/users";

  constructor(private http: HttpClient) {}
  createUser(data: any) {
    return this.http.post(this.usersUrl, data);
  }

  getUsers() {
    return this.http.get<User[]>(this.usersUrl);
  }
}
