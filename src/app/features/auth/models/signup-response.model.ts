interface Data {
  token: string;
}

export interface SignupResponseModel {
  status: string;
  message: string;
  data: Data;
}
