import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./shared/guards/auth.guard";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./features/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "teams",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./features/team/team.module").then((m) => m.TeamModule),
  },
  {
    path: "match",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./features/match/match.module").then((m) => m.MatchModule),
  },
  {
    path: "standing",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./features/standing/standing.module").then(
        (m) => m.StandingModule
      ),
  },
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./features/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: "**",
    redirectTo: "/dashboard",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
