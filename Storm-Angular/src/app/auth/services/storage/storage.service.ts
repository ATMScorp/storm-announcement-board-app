import { Injectable } from '@angular/core';

const USER = "User";
const TOKEN = "Token";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    const user = window.localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  static hasToken(): boolean {
    return this.getToken() !== null;
  }

  static getUserId(): string {
    const user = this.getUser();
    return user ? user.userId : '';
  }

  static isUserLoggedIn(){
    if(this.getToken() == null) {
      return false;
    }
    return true;
  }

  static logout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
