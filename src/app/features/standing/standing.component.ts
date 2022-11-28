import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Group } from "./models/standing-response.model";
import { StandingService } from "./standing.service";

@Component({
  selector: "app-standing",
  templateUrl: "./standing.component.html",
  styleUrls: ["./standing.component.scss"],
})
export class StandingComponent implements OnInit {
  groups: Group[];
  loading = false;

  constructor(
    private readonly standingService: StandingService,
    private readonly snackBarService: MatSnackBar
  ) {}

  ngOnInit() {
    this.getStandings();
  }

  getStandings() {
    this.loading = true;
    this.standingService.getStandings().subscribe(
      (resp) => {
        this.groups = resp.data;
        this.orderByPoints();
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.snackBarService.open("Ops, erro during request data", "X");
      }
    );
  }

  orderByPoints() {
    this.groups.forEach((group) => {
      group.teams.sort((a, b) => {
        return Number(b.pts) - Number(a.pts);
      });
    });
  }
}
