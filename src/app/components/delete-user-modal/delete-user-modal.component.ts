import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.css']
})
export class DeleteUserModalComponent implements OnInit {
  @Output() dismissCallback: EventEmitter<any> = new EventEmitter();

  public passwordForm: FormGroup;
  public errorMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthentificationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      Password: ['', [Validators.required]]
    });
  }

  dismiss() {
    this.dismissCallback.emit();
  }

  changePassword() {
    if (this.passwordForm.status === 'VALID') {
      this.auth.deleteUser(this.passwordForm.value).subscribe(
        (res) => {
          localStorage.clear();
          this.router.navigate(['/login']);
          this.dismissCallback.emit();
        },
        (err) => {
          console.log(err);
          if(err.error && err.error.message && err.error.message.length) {
            this.errorMessage = err.error.message;
          } else {
            if (err.error && err.error.errors && err.error.errors.Password.length && err.error.errors.Password[0]) {
              this.errorMessage = err.error.errors.Password[0];
            }
          }
        }
      );
    }
  }

}
