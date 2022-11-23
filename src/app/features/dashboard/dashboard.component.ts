import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { StandingsStateService } from "src/app/shared/state/standings/standings-state.service";
import { Group } from "../standing/models/standing-response.model";
import { StandingService } from "../standing/standing.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective, { static: false }) chart:
    | BaseChartDirective
    | undefined;

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

  public barChartOptions: ChartConfiguration["options"] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType: ChartType = "bar";
  public barChartData: ChartData<"bar"> = {
    labels: ["2006", "2007", "2008", "2009", "2010", "2011", "2012"],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
      { data: [28, 48, 40, 19, 86, 27, 90], label: "Series B" },
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }
}
