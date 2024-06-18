import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user-service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent {

  createForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackbar: MatSnackBar
  ) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      location: ['', Validators.required],
      contactPerson: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+?\d{1,3}|\d{1,4})?\s?\d{7,14}$/)]],
      itemCondition: ['', Validators.required],
      color: [''],
      photo: ['']
    });
  }

  createItem() {
    if (this.createForm.valid) {
      this.userService.createAnnouncement(this.createForm.value).subscribe({
        next: (response) => {
          this.snackbar.open('Announcement created successfully!', 'Close', {
            duration: 3000
          });
          this.createForm.reset();
        },
        error: (error) => {
          this.snackbar.open('Failed to create announcement.', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
}
