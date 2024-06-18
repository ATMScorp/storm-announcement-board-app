import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user-service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteAnnouncements: any[] = [];

  constructor(
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFavoriteAnnouncements();
  }

  loadFavoriteAnnouncements() {
    this.userService.getFavoritesByUserId().subscribe({
      next: (response) => {
        this.favoriteAnnouncements = response;
      },
      error: (error) => {
        this.snackbar.open('Failed to load favorite announcements.', 'Close', {
          duration: 3000
        });
      }
    });
  }

  goToDetails(announcementId: number) {
    this.router.navigate(['/announcements', announcementId]);
  }
}
