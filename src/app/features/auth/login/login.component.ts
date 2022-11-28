import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SnackBarService } from "src/app/shared/services/snack-bar/snack-bar.service";
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
    private readonly snackBarService: SnackBarService
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
        this.snackBarService.openSnackBar("Login successful", "X");
        this.router.navigateByUrl("/dashboard");
      },
      (_) => {
        this.isLoading = false;
        this.snackBarService.openSnackBar(
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
