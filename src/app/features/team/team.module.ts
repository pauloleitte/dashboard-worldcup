import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TeamComponent } from "./team.component";
import { TeamRoutingModule } from "./team.routing.module";
import { TeamService } from "./team.service";

@NgModule({
  declarations: [TeamComponent],
  imports: [CommonModule, TeamRoutingModule, SharedModule],
  exports: [TeamComponent],
  providers: [TeamService],
})
export class TeamModule {}
