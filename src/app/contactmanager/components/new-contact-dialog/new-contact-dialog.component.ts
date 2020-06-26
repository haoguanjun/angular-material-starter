import { Component, OnInit } from '@angular/core';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from '../../services/user.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  user: User;
  avatars = ['boy', 'girl'];

  nameControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(private dialogRef: MatDialogRef<NewContactDialogComponent>,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.user = new User();
  }

  save() {
    this.userService.addUser( this.user ).then(
      user => {
        this.dialogRef.close( this.user );
      }
    )

  }

  dismiss(){
    this.dialogRef.close( null );
  }

  getErrorMessage() {
    return this.nameControl.hasError('required') ? 'You must enter a name.': '';
  }
}
