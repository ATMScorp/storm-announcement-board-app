import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../auth/services/storage/storage.service';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createAnnouncement(announcement: any): Observable<any> {
    return this.http.post<any>(`${BASIC_URL}user/create-item`, announcement, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllAnnouncements(): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}user/announcements`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAnnouncementsByUserId(): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}user/announcements/${StorageService.getUserId()}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addToFavorites(announcementId: number): Observable<any> {
    return this.http.post<any>(`${BASIC_URL}user/announcements/${announcementId}/favorites`, null, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getFavoritesByUserId(): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}user/favorites/${StorageService.getUserId()}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteAnnouncement(announcementId: number): Observable<any> {
    return this.http.delete<any>(`${BASIC_URL}user/announcements/${announcementId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAnnouncementById(announcementId: number): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}user/announcements/edit/${announcementId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateAnnouncement(announcementId: number, announcementDto: any): Observable<any> {
    return this.http.put<any>(`${BASIC_URL}user/announcements/edit/${announcementId}`, announcementDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const token = StorageService.getToken();
    if (token) {
      return authHeaders.set('Authorization', "Bearer " + token);
    } else {
      console.error("Token not found!");
      return authHeaders;
    }
  }
}
