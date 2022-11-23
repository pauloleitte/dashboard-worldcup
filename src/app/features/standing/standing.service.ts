import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StadingResponseModel } from "./models/standing-response.model";

@Injectable({
  providedIn: "root",
})
export class StandingService {
  token: string = "";
  constructor(private readonly http: HttpClient) {
    this.token = localStorage.getItem("TOKEN");
  }

  getStandings(): Observable<StadingResponseModel> {
    const headers = new HttpHeaders()
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${this.token}`);
    return this.http.get<StadingResponseModel>("/api/standings", {
      headers: headers,
    });
  }
}
