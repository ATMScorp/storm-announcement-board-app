import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user-service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  announcements: any[] = [];

  constructor(
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.userService.getAllAnnouncements().subscribe({
      next: (response) => {
        this.announcements = response;
      },
      error: (error) => {
        this.snackbar.open('Failed to load announcements.', 'Close', {
          duration: 3000
        });
      }
    });
  }

  goToDetails(announcementId: number) {
    this.router.navigate(['/announcements', announcementId]);
  }

  addToFavorites(event: Event, announcementId: number) {
    event.stopPropagation();
    this.userService.addToFavorites(announcementId).subscribe({
      next: () => {
        this.snackbar.open('Announcement added to favorites.', 'Close', {
          duration: 3000
        });
      },
      error: () => {
        this.snackbar.open('Announcement is already in favorites.', 'Close', {
          duration: 3000
        });
      }
    });
  }
}
