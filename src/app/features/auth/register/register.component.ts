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

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.email],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });
  }

  ngOnInit() {}

  register() {
    this.authService.signup(this.form.value).subscribe((resp) => {
      localStorage.setItem("TOKEN", resp.data.token);
      alert("Cadastro realizado com sucesso");
      this.router.navigateByUrl("/home");
    }, console.error);
  }

  get f() {
    return this.form;
  }
}
