import { Component, OnInit } from "@angular/core";
import { UsersService } from "../users.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { User } from "src/types/User";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent {
  constructor(
    private userData: UsersService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  onSubmit(user: User) {
    this.spinner.show();

    this.userData.createUser(user).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl("/main");
    });
  }
}
