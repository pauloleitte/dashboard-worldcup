import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { StandingComponent } from "./standing.component";
import { StandingRoutingModule } from "./standing.routing.module";
import { StandingService } from "./standing.service";

@NgModule({
  declarations: [StandingComponent],
  imports: [CommonModule, StandingRoutingModule, SharedModule],
  providers: [StandingService],
})
export class StandingModule {}
