import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { MatchesResponseModel } from "./models/match-response.model";

@Injectable({
  providedIn: "root",
})
export class MatchService {
  token: string = "";
  urlApi = environment.API_URL;
  constructor(private readonly http: HttpClient) {
    this.token = localStorage.getItem("TOKEN");
  }

  getMatches(): Observable<MatchesResponseModel> {
    const headers = new HttpHeaders()
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${this.token}`);
    return this.http.get<MatchesResponseModel>(`${this.urlApi}/match`, {
      headers: headers,
    });
  }

  getMatchById(id: string): Observable<MatchesResponseModel> {
    const headers = new HttpHeaders()
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${this.token}`);
    return this.http.get<MatchesResponseModel>(`${this.urlApi}/match/${id}`, {
      headers: headers,
    });
  }
}
