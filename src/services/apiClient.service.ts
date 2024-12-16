import http from "../interceptor/axios.interceptor"

export class ApiClientService<T> {

  constructor(public baseUrl: string) {}

  async createResource(resource: T) {
    const response = await http.post<T>(this.baseUrl, resource);


    return response;
  }

  async deleteResource(id: string) {
    const url = `${this.baseUrl}/${id}`;

    const response = await http.delete<T>(url);

    return response;
  }

  async editResource(id: string, resource: T) {
    const url = `${this.baseUrl}/${id}`;

    const response = await http.patch<T>(url, resource);

    return response;
  }

  async getOneResource(id: string) {
    const url = `${this.baseUrl}/${id}`;

    const response = await http.get<T>(url);

    return response;
  }

  async getAllResources() {
    const response = await http.get<T[]>(this.baseUrl);
    
    return response;
  }

  
}
