import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { Team } from "./models/team";

import { TeamService } from "./team.service";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"],
})
export class TeamComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly teamService: TeamService,
    private readonly snackBarService: MatSnackBar
  ) {}

  @ViewChild(MatTable) table: MatTable<Team>;
  @ViewChild("paginator") paginator: MatPaginator;

  displayedColumns: string[] = ["Name", "Group", "FifaCode", "Flag"];
  teams: Team[];
  team: Team;
  dataSource = new MatTableDataSource();
  loading = false;

  ngOnInit() {
    this.getTeams();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getTeams() {
    this.loading = true;
    this.teamService.getTeams().subscribe(
      (resp) => {
        this.teams = resp.data;
        this.dataSource.data = this.teams;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.snackBarService.open("Ops, erro during request data", "X");
      }
    );
  }
}
