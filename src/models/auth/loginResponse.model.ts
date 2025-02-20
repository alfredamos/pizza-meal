import { UserResponseModel } from "../users/userResponse.model";
import { ResponseAuth } from './responseAuth.model';

export class LoginResponse{
  authResponse: ResponseAuth = new ResponseAuth();
  currentUser: UserResponseModel = new UserResponseModel();
}