import { UserResponseModel } from "@/models/users/userResponse.model";

export class AuthState{
  id: string = "";
  name: string = "";
  role: string = "";
  token: string = "";
  image: string = "";
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  currentUser: UserResponseModel = new UserResponseModel();
}