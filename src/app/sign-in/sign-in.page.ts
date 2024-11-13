// src/app/sign-in/sign-in.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/firebase.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private firebaseService: AuthService, private router: Router) {}

  async signIn() {
    try {
      await this.firebaseService.login(this.email, this.password);
      // Rediriger vers la page d'accueil ou une autre page
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.error = error.message;
    }
  }
}
