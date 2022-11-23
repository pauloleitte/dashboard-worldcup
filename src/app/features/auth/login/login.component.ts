import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      email: ["", Validators.email],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    this.authService.login(this.form.value).subscribe((resp) => {
      localStorage.setItem("TOKEN", resp.data.token);
      alert("Login realizado com sucesso");
      this.router.navigateByUrl("/home");
    }, console.error);
  }

  get f() {
    return this.form;
  }
}
