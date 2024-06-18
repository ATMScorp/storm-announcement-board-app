import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user-service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss']
})
export class MyDashboardComponent implements OnInit {
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
    this.userService.getAnnouncementsByUserId().subscribe({
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

  deleteAnnouncement(event: Event, announcementId: number) {
    event.stopPropagation();
    this.userService.deleteAnnouncement(announcementId).subscribe({
      next: () => {
        this.snackbar.open('Announcement deleted successfully.', 'Close', {
          duration: 3000
        });
        this.loadAnnouncements();
      },
      error: (error) => {
        this.snackbar.open('Failed to delete announcement.', 'Close', {
          duration: 3000
        });
      }
    });
  }
}

