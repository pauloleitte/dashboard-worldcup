import { Component, OnInit } from "@angular/core";
import { StandingsStateService } from "src/app/shared/state/standings/standings-state.service";
import { Group } from "../standing/models/standing-response.model";
import { StandingService } from "../standing/standing.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  groups: Group[];
  totalGoals = 0;
  totalMatches = 0;
  totalWins = 0;
  totalLosses = 0;
  totalDraw = 0;
  totalPoints = 0;

  constructor(
    private readonly standingsState: StandingsStateService,
    private readonly standingsService: StandingService
  ) {}

  ngOnInit() {
    this.standingsService.getStandings().subscribe((resp) => {
      this.standingsState.setState(resp);
      this.groups = resp.data;
      this.handleDashboardValues();
    });
  }

  handleDashboardValues() {
    this.groups.forEach((group) => {
      group.teams.forEach((team) => {
        this.totalGoals += Number(team.gf);
        this.totalMatches += Number(team.mp);
        this.totalWins += Number(team.w);
        this.totalLosses += Number(team.l);
        this.totalDraw += Number(team.d);
        this.totalPoints += Number(team.pts);
      });
    });
  }
}
