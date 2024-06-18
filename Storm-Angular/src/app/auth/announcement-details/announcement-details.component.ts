import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrls: ['./announcement-details.component.scss']
})
export class AnnouncementDetailsComponent implements OnInit {
  announcement: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const announcementId = this.activatedRoute.snapshot.params['id'];
    this.authService.getAnnouncementById(announcementId).subscribe((res) => {
      this.announcement = res.announcementDto;
      console.log(res);
    });
  }
}