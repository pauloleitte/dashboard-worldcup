import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StandingsStateService } from "src/app/shared/state/standings/standings-state.service";
import { StandingService } from "../standing/standing.service";
import { DashboardComponent } from "./dashboard.component";
import { DashBoardRoutingModule } from "./dashboard.routing.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashBoardRoutingModule],
  providers: [StandingsStateService, StandingService],
})
export class DashboardModule {}
