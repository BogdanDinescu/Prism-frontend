import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from 'ng-bootstrap-darkmode';
import { ChangePasswordModalComponent } from 'src/app/components/change-password-modal/change-password-modal.component';
import { DeleteUserModalComponent } from 'src/app/components/delete-user-modal/delete-user-modal.component';
import { User } from 'src/app/models/User';
import { AuthentificationService } from 'src/app/services/auth/authentication.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {

  public user: User = new User();
  public userForm: FormGroup;
  public success: boolean = false;
  public errorMessage: string = "";
  public theme: string;

  constructor(
    private router: Router,
    public auth: AuthentificationService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private themeService: ThemeService,
    ) { }

  getUser() {
    this.auth.getUser().subscribe(
      (res) => {
        this.user = res;
        this.userForm.setValue({Name: res.name})
      }
    )
  }
  
  ngOnInit(): void {
    this.getUser()
    this.userForm = this.formBuilder.group({
      Name: ['', [Validators.required]],
    });
    this.themeService.theme$.subscribe(
      (theme) => {
        this.theme = theme;
    });
  }
  
  themeChange() {
    this.themeService.theme = this.theme;
  }

  openChangePasswordModal() {
    const modalRef = this.modalService.open(ChangePasswordModalComponent);
    modalRef.componentInstance.dismissCallback.subscribe(
        () => {
          modalRef.close();
        }
    )
  }

  doChange() {
    if (this.userForm.status === 'VALID') {
      this.auth.updateUser(this.userForm.value).subscribe(
        (res) => {
          this.success = true;
          setTimeout(function() {this.success = false;}.bind(this),3000);
          this.errorMessage = "";
          this.user = res;
        },
        (err) => {
          this.success = false;
          if (err.error && err.error.errors) {
            if (err.error.errors.Email) {
              this.errorMessage = err.error.errors.Email[0];
              return;
            }
            if (err.error.errors.Password) {
              this.errorMessage = err.error.errors.Password[0];
              return;
            }
            if (err.error.errors.Name) {
              this.errorMessage = err.error.errors.Name[0];
              return;
            }
          }
            
        }
      );
    }
  }

  deleteUser() {
    const modalRef = this.modalService.open(DeleteUserModalComponent);
    modalRef.componentInstance.dismissCallback.subscribe(
      () => {
        modalRef.dismiss();
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
