import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(private authService: AuthService, private router: Router) {}
  register(regForm: NgForm) {
    console.log(regForm.value);
    this.authService.registerUser(regForm.value.email, regForm.value.password);
    // this.router.navigate(['/login']);
  }
  reset(regForm: NgForm) {
    regForm.reset();
  }
}
