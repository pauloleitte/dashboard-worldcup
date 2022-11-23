import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StandingComponent } from "./standing.component";

const routes: Routes = [{ path: "", component: StandingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StandingRoutingModule {}
