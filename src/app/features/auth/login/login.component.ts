import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  hide = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBarService: MatSnackBar,
  ) {
    this.form = this.fb.group({
      email: ["", Validators.email],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    this.isLoading = true;
    this.authService.login(this.form.value).subscribe(
      (_) => {
        this.snackBarService.open("Login successful", "X");
        this.router.navigateByUrl("/dashboard");
      },
      (_) => {
        this.isLoading = false;
        this.snackBarService.open(
          "Something went wrong try later",
          "X"
        );
      }
    );
  }

  get f() {
    return this.form;
  }
}
