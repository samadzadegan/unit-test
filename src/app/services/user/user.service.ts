import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UsersResult } from "../../interfaces/users";
import { API_URL } from "../../interfaces/constant";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUser(): Observable<UsersResult> {
    return this.httpClient.get<UsersResult>(API_URL);
  }
}
