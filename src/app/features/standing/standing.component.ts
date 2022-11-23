import { Component, OnInit } from "@angular/core";
import { Group } from "./models/standing-response.model";
import { StandingService } from "./standing.service";

@Component({
  selector: "app-standing",
  templateUrl: "./standing.component.html",
  styleUrls: ["./standing.component.scss"],
})
export class StandingComponent implements OnInit {
  groups: Group[];

  constructor(private readonly standingService: StandingService) {}

  ngOnInit() {
    this.getStandings();
  }

  getStandings() {
    this.standingService.getStandings().subscribe((resp) => {
      this.groups = resp.data;
      this.orderByPoints();
    }, console.error);
  }

  orderByPoints() {
    this.groups.forEach((group) => {
      group.teams.sort((a, b) => {
        return Number(b.pts) - Number(a.pts);
      });
    });
  }
}
