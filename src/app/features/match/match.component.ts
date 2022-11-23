import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatchService } from "./match.service";
import { Match } from "./models/match";

@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.scss"],
})
export class MatchComponent implements OnInit {
  matches: Match[];
  match: Match;
  closeResult = "";
  constructor(
    private readonly matchService: MatchService,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getMatches();
  }

  getMatches() {
    this.matchService.getMatches().subscribe((resp) => {
      this.matches = resp.data;
    }, console.error);
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
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
