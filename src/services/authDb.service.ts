import type { ChangePasswordModel } from "@/models/auth/changePassword.model";
import type { EditProfileModel } from "@/models/auth/editProfile.model";
import type { LoginModel } from "@/models/auth/login.model";
import type { SignupModel } from "@/models/auth/signup.model";
import type { AuthState } from "@/states/authState";
import http from "../interceptor/axios.interceptor"

class AuthDbService {
  baseUrl = 'http://localhost:5000/api/auth';

  async changePassword(changePasswordModel: ChangePasswordModel) {
    const url = `${this.baseUrl}/change-password`;
    const response = await http.patch<AuthState>(url, changePasswordModel);

    return response;
  }

  async editProfile(editProfileModel: EditProfileModel) {
    const url = `${this.baseUrl}/edit-profile`;
    const response = await http.patch<AuthState>(url, editProfileModel);

    return response;
  }

  async login(loginModel: LoginModel) {
    const url = `${this.baseUrl}/login`;
    console.log({url})
    const response = await http.post<AuthState>(url, loginModel);
    
    return response;
  }

  async signup(signupModel: SignupModel) {
    const url = `${this.baseUrl}/signup`;
    const response = await http.post<AuthState>(url, signupModel);

    return response;
  }
}

export const authDbService = new AuthDbService()