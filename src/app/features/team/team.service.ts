import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TeamResponseModel } from "./models/team-response.model";
import { TeamsResponseModel } from "./models/teams-response.model";

@Injectable({
  providedIn: "root",
})
export class TeamService {
  token: string = "";
  constructor(private readonly http: HttpClient) {
    this.token = localStorage.getItem("TOKEN");
  }

  getTeams(): Observable<TeamsResponseModel> {
    const headers = new HttpHeaders()
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${this.token}`);
    return this.http.get<TeamsResponseModel>("/api/team", { headers: headers });
  }

  getTeamById(id: string): Observable<TeamResponseModel> {
    const headers = new HttpHeaders()
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${this.token}`);
    return this.http.get<TeamResponseModel>(`/api/team/${id}`, {
      headers: headers,
    });
  }
}
