import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartConfiguration, ChartData, ChartType } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { MatchesStateService } from "src/app/shared/state/matches/matches-state.service";
import { StandingsStateService } from "src/app/shared/state/standings/standings-state.service";
import { MatchService } from "../match/match.service";
import { Match } from "../match/models/match";
import { Group } from "../standing/models/standing-response.model";
import { StandingService } from "../standing/standing.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  loading = true;
  isError = false;

  groups: Group[];
  matches: Match[];

  totalGoals = 0;
  totalMatches = 0;
  totalWins = 0;
  totalLosses = 0;
  totalDraw = 0;
  totalPoints = 0;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public barChartType: ChartType = "bar";
  public barChartData: ChartData = {
    labels: [],
    datasets: [],
  };

  public barChartConfig: ChartConfiguration = {
    options: {
      title: {
        text: "Goals by day",
        display: true,
      },
      legend: {
        display: false,
      },
    },
  };

  constructor(
    private readonly standingsState: StandingsStateService,
    private readonly standingsService: StandingService,
    private readonly matchesState: MatchesStateService,
    private readonly matcheService: MatchService
  ) {}

  ngOnInit() {
    this.standingsService.getStandings().subscribe(
      (resp) => {
        this.standingsState.setState(resp);
        this.groups = resp.data;
        this.handleDashboardValuesStandings();
      },
      (_) => {
        this.loading = false;
        this.isError = true;
      }
    );
    this.matcheService.getMatches().subscribe(
      (resp) => {
        this.matchesState.setState(resp);
        this.matches = resp.data;
        this.loading = false;
        this.handleDashboardChartValuesMatches();
      },
      (_) => {
        this.loading = false;
        this.isError = true;
      }
    );
  }

  handleDashboardChartValuesMatches() {
    let goalsByDate = [];
    this.matches.forEach((match) => {
      const date = new Date(match.local_date).toLocaleDateString();
      const totalGoals = match.away_score + match.home_score;
      goalsByDate.push({
        date: date,
        goals: totalGoals,
      });
      if (!this.barChartData["labels"].includes(date))
        this.barChartData["labels"].push(date);
    });
    goalsByDate = this.groupItems(goalsByDate, "date");
    var totalGoalsByDay = [];
    for (var key in goalsByDate) {
      var totalGoals = 0;
      var group = goalsByDate[key];
      for (var i in group) {
        var date = group[i];
        totalGoals += date.goals;
      }
      totalGoalsByDay.push({
        date: key,
        totalGoals,
      });
    }
    this.barChartData["datasets"].push({
      label: "Gols",
      data: totalGoalsByDay.map((entry) => entry.totalGoals),
    });
    this.chart.ngOnDestroy();
    this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
    this.loading = false;
  }

  groupItems(array, property) {
    return array.reduce(function (groups, item) {
      var name = item[property];
      var group = groups[name] || (groups[name] = []);
      group.push(item);
      return groups;
    }, []);
  }

  handleDashboardValuesStandings() {
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
