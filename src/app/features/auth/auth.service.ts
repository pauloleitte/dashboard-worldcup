import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { LoginRequestModel } from "./models/login-request.model";
import { LoginResponseModel } from "./models/login-response-model";
import { SignupRequestModel } from "./models/signup-request.model";
import { SignupResponseModel } from "./models/signup-response.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  urlApi = environment.API_URL;
  private loggedIn = new BehaviorSubject<boolean>(this.tokenAvailable());

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  login(request: LoginRequestModel): Observable<LoginResponseModel> {
    let req = this.http
      .post<LoginResponseModel>(`${this.urlApi}/user/login`, request)
      .pipe(
        tap((result) => {
          if (result.status == "success") {
            localStorage.setItem("TOKEN", result.data.token);
            this.loggedIn.next(true);
            return result.data;
          }
        })
      );
    return req;
  }

  signup(request: SignupRequestModel): Observable<SignupResponseModel> {
    let req = this.http
      .post<SignupResponseModel>(`${this.urlApi}/user`, request)
      .pipe(
        tap((result) => {
          if (result.status == "success") {
            localStorage.setItem("TOKEN", result.data.token);
            this.loggedIn.next(true);
            return result.data;
          }
        })
      );
    return req;
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  setIsLoggedIn() {
    this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem("TOKEN");
    this.router.navigateByUrl("/auth");
  }

  private tokenAvailable(): boolean {
    return !!localStorage.getItem("TOKEN");
  }
}
