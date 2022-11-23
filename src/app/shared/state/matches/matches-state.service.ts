import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MatchesResponseModel } from "src/app/features/match/models/match-response.model";
@Injectable({
  providedIn: "root",
})
export class MatchesStateService {
  private state = new BehaviorSubject({});
  constructor() {}

  setState(value: MatchesResponseModel) {
    this.state.next(value);
  }

  getState() {
    return this.state.asObservable();
  }
}
