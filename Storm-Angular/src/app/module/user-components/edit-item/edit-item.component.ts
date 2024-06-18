import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user-service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent {
  
  announcementForm!: FormGroup;
  isSubmitting: boolean = false;
  announcementId: number = this.activatedRoute.snapshot.params['announcementId'];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      location: ['', Validators.required],
      contactPerson: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      itemCondition: ['', Validators.required],
      color: [''],
      photo: ['']
    });
    this.getAnnouncementById();
  }

  getAnnouncementById() {
    this.userService.getAnnouncementById(this.announcementId).subscribe((res) => {
      const announcementDto = res.announcementDto;
      this.announcementForm.patchValue(announcementDto);
      console.log(res);
    });
  }

  updateAnnouncement() {
    this.isSubmitting = true;
    this.userService.updateAnnouncement(this.announcementId, this.announcementForm.value).subscribe(
      (res) => {
        this.isSubmitting = false;
        console.log(res);
        if (res.id != null) {
          this.snackBar.open("Announcement updated successfully.", "Close", { duration: 5000 });
        } else {
          this.snackBar.open("Announcement not found.", "Close", { duration: 5000 });
        }
      },
      (error) => {
        this.isSubmitting = false;
        console.error('Error updating announcement', error);
        this.snackBar.open("Error updating announcement.", "Close", { duration: 5000 });
      }
    );
  }
}
