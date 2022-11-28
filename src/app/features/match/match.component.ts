import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SnackBarService } from "src/app/shared/services/snack-bar/snack-bar.service";
import { MatchService } from "./match.service";
import { Match } from "./models/match";

@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.scss"],
})
export class MatchComponent implements OnInit, AfterViewInit {
  matches: Match[];
  match: Match;
  loading = false;

  @ViewChild(MatTable) table: MatTable<Match>;
  @ViewChild("paginator") paginator: MatPaginator;

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [
    "HomeTeam",
    "AwayTeam",
    "Date",
    "Status",
    "Action",
  ];

  constructor(
    private readonly matchService: MatchService,
    private readonly modalService: NgbModal,
    private readonly SnackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.getMatches();
  }

  pageSizes = [3, 5, 7];

  ngAfterViewInit() {}

  getMatches() {
    this.loading = true;
    this.matchService.getMatches().subscribe(
      (resp) => {
        this.matches = resp.data;
        this.dataSource.data = this.matches;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.SnackBarService.openSnackBar("Ops, erro during request data", "X");
      }
    );
  }

  getMatchById(content, id: string) {
    this.matchService.getMatchById(id).subscribe((resp) => {
      this.match = resp.data[0];
      this.open(content);
    });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
}
