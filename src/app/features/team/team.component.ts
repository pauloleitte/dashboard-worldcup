import { Component, OnInit } from "@angular/core";
import { Team } from "./models/team";

import { TeamService } from "./team.service";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"],
})
export class TeamComponent implements OnInit {
  constructor(private readonly teamService: TeamService) {}

  teams: Team[];
  team: Team;

  ngOnInit() {
    this.getTeams();
  }

  getTeams() {
    this.teamService.getTeams().subscribe((resp) => {
      this.teams = resp.data;
    }, console.error);
  }
}
