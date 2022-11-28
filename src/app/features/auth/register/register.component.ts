import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  hide = true;
  hideConfirm = true;

  constructor(
    private readonly snackBarService: MatSnackBar,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.form = this.fb.group(
      {
        name: ["", Validators.required],
        email: ["", Validators.email],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required],
      },
      { validators: this.checkPasswords }
    );
  }

  ngOnInit() {}

  register() {
    this.isLoading = true;
    this.authService.signup(this.form.value).subscribe(
      (resp) => {
        localStorage.setItem("TOKEN", resp.data.token);
        this.snackBarService.open(
          "Registration done successfully",
          "X"
        );
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

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get("password").value;
    let confirmPass = group.get("confirmPassword").value;
    return pass === confirmPass ? null : { notSame: true };
  };
}
