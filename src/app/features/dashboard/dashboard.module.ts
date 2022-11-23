import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ChartsModule } from "ng2-charts";
import { MatchesStateService } from "src/app/shared/state/matches/matches-state.service";
import { StandingsStateService } from "src/app/shared/state/standings/standings-state.service";
import { MatchService } from "../match/match.service";
import { StandingService } from "../standing/standing.service";
import { DashboardComponent } from "./dashboard.component";
import { DashBoardRoutingModule } from "./dashboard.routing.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashBoardRoutingModule, ChartsModule],
  providers: [
    StandingsStateService,
    StandingService,
    MatchService,
    MatchesStateService,
  ],
})
export class DashboardModule {}
