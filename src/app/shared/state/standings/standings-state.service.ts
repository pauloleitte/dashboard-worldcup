import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StadingResponseModel } from "src/app/features/standing/models/standing-response.model";

@Injectable({
  providedIn: "root",
})
export class StandingsStateService {
  private state = new BehaviorSubject({});
  constructor() {}

  setState(value: StadingResponseModel) {
    this.state.next(value);
  }

  getState() {
    return this.state.asObservable();
  }
}
