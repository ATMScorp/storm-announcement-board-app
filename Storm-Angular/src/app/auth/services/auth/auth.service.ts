import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  register(user: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/register`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(BASIC_URL + '/login', { email, password }, { observe: 'response' })
      .pipe(
        tap(__ => this.log("User Authentication")),
        map(res => {
          this.handleAuthentication(res);
          return res;
        })
      );
  }

  getAnnouncements(): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}/announcements`);
  }

  getAnnouncementById(announcementId: number): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}/announcements/${announcementId}`);
  }

  private handleAuthentication(response: any): void {
    const token = response.headers.get('Authorization');
    this.storage.saveToken(token);
    this.storage.saveUser(response.body);
  }

  private log(message: string): void {
    console.log(message);
  }
}