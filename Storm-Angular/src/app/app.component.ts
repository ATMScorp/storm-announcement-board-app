import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Storm-Angular';
  isUserLoggedIn: boolean = false;
  dropdownOpen = false;
  announcements: any[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.updateUserLoggedStatus();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateUserLoggedStatus();
      }
    })
  }

  private updateUserLoggedStatus(): void {
    this.isUserLoggedIn = StorageService.isUserLoggedIn();
  }

  logout() {
    StorageService.logout();
    this.updateUserLoggedStatus();
    this.router.navigateByUrl("/login");
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}