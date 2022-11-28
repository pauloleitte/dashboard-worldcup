import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.email],
      password: ["", Validators.required, Validators.min(8)],
    });
  }

  ngOnInit() {}

  register() {
    this.isLoading = true;
    this.authService.signup(this.form.value).subscribe(
      (resp) => {
        localStorage.setItem("TOKEN", resp.data.token);
        alert("Registration done successfully");
        this.router.navigateByUrl("/dashboard");
      },
      (_) => {
        this.isLoading = false;
        alert("Something went wrong try later");
      }
    );
  }

  get f() {
    return this.form;
  }
}
