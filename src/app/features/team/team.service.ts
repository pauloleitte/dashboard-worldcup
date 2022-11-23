import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TeamResponseModel } from "./models/team-response.model";
import { TeamsResponseModel } from "./models/teams-response.model";

@Injectable({
  providedIn: "root",
})
export class TeamService {
  token: string = "";
  urlApi = environment.API_URL;
  constructor(private readonly http: HttpClient) {
    this.token = localStorage.getItem("TOKEN");
  }

  getTeams(): Observable<TeamsResponseModel> {
    const headers = new HttpHeaders()
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${this.token}`);
    return this.http.get<TeamsResponseModel>(`${this.urlApi}/team`, {
      headers: headers,
    });
  }

  getTeamById(id: string): Observable<TeamResponseModel> {
    const headers = new HttpHeaders()
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${this.token}`);
    return this.http.get<TeamResponseModel>(`${this.urlApi}/team/${id}`, {
      headers: headers,
    });
  }
}
