import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StandingComponent } from "./standing.component";
import { StandingRoutingModule } from "./standing.routing.module";
import { StandingService } from "./standing.service";

@NgModule({
  declarations: [StandingComponent],
  imports: [CommonModule, StandingRoutingModule],
  providers: [StandingService],
})
export class StandingModule {}
