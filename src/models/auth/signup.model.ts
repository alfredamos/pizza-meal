import { Gender } from "../gender.model";

export class SignupModel{
  name: string = "";
  email: string = "";
  phone: string = "";
  image?: string;
  gender: Gender = Gender.Male;
  confirmPassword: string = "";
  password: string = "";
  address: string = "";
}