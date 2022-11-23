import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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

  constructor(private readonly http: HttpClient) {}

  login(request: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`api/user/login`, request);
  }

  signup(request: SignupRequestModel): Observable<SignupResponseModel> {
    return this.http.post<SignupResponseModel>(`api/user`, request);
  }
}
