import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { StadingResponseModel } from "./models/standing-response.model";

@Injectable({
  providedIn: "root",
})
export class StandingService {
  token: string = "";
  urlApi = environment.API_URL;
  constructor(private readonly http: HttpClient) {
    this.token = localStorage.getItem("TOKEN");
  }

  getStandings(): Observable<StadingResponseModel> {
    const headers = new HttpHeaders()
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${this.token}`);
    return this.http.get<StadingResponseModel>(`${this.urlApi}/standings`, {
      headers: headers,
    });
  }
}
