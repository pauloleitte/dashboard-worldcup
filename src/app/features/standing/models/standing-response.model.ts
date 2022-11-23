import { Standing } from "./standing";

export interface Group {
  _id: string;
  group: string;
  teams: Standing[];
}

export interface StadingResponseModel {
  status: string;
  data: Group[];
}
