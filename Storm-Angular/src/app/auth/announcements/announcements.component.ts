import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  announcements: any[] = [];
  announcement: any;

  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.authService.getAnnouncements().subscribe({
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

  viewAnnouncementDetails(id: number) {
    this.router.navigate(['/announcements', id]);
  }
}