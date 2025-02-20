import type { ChangePasswordModel } from "@/models/auth/changePassword.model";
import type { EditProfileModel } from "@/models/auth/editProfile.model";
import type { LoginModel } from "@/models/auth/login.model";
import type { SignupModel } from "@/models/auth/signup.model";
import http from "../interceptor/axios.interceptor"
import type { ResponseAuth } from "@/models/auth/responseAuth.model";
import type { UserResponseModel } from "@/models/users/userResponse.model";
import type { LoginResponse } from "@/models/auth/loginResponse.model";
import type { UserPayload } from "@/models/users/userPayload.model";

class AuthDbService {
  baseUrl = 'http://localhost:3000/api/auth';

  async changePassword(changePasswordModel: ChangePasswordModel) {
    const url = `${this.baseUrl}/change-password`;
    const response = await http.patch<UserPayload>(url, changePasswordModel);

    return response;
  }

  async editProfile(editProfileModel: EditProfileModel) {
    const url = `${this.baseUrl}/edit-profile`;
    const response = await http.patch<UserPayload>(url, editProfileModel);

    return response;
  }

  async getCurrentUser(){
    const url = `${this.baseUrl}/current-user`;

    const response = await http.get<UserResponseModel>(url);

    return response;
  }

  async login(loginModel: LoginModel) {
    const url = `${this.baseUrl}/login`;
    console.log({url})
    const response = await http.post<LoginResponse>(url, loginModel);
    
    return response;
  }

  async logout(){
    const url = `${this.baseUrl}/logout`;
    console.log({url})
    const response = await http.post<LoginResponse>(url);
    
    console.log({response});

    return response;
  }

  async signup(signupModel: SignupModel) {
    const url = `${this.baseUrl}/signup`;
    const response = await http.post<ResponseAuth>(url, signupModel);

    return response;
  }
}

export const authDbService = new AuthDbService()