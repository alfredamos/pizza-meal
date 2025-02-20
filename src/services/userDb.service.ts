import type { UserPayload } from "@/models/users/userPayload.model";
import { ApiClientService } from "./apiClient.service";

export class UserDbService extends ApiClientService<UserPayload> {
  constructor() {
    super("http://localhost:3000/api/users");
  }
}

export const userDbService = new UserDbService();
