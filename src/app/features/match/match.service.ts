import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MatchesResponseModel } from "./models/match-response.model";

@Injectable({
  providedIn: "root",
})
export class MatchService {
  token: string = "";
  constructor(private readonly http: HttpClient) {
    this.token = localStorage.getItem("TOKEN");
  }

  getMatches(): Observable<MatchesResponseModel> {
    const headers = new HttpHeaders()
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${this.token}`);
    return this.http.get<MatchesResponseModel>("/api/match", {
      headers: headers,
    });
  }

  getMatchById(id: string): Observable<MatchesResponseModel> {
    const headers = new HttpHeaders()
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${this.token}`);
    return this.http.get<MatchesResponseModel>(`/api/match/${id}`, {
      headers: headers,
    });
  }
}
