import { Team } from "./team";

export interface TeamsResponseModel {
  status: string;
  data: Team[];
}
