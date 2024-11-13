import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/firebase.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';  // Ajout de la variable pour la confirmation du mot de passe
  error: string = '';

  constructor(private firebaseService: AuthService, private router: Router) {}

  async signUp() {
    // Vérification si les mots de passe correspondent
    if (this.password !== this.confirmPassword) {
      this.error = "Les mots de passe ne correspondent pas";
      return;  // Sortie de la fonction si les mots de passe ne correspondent pas
    }

    try {
      // Appel à la méthode signUp du service Firebase
      await this.firebaseService.signup(this.email, this.password);
      // Redirection vers la page de connexion si l'inscription est réussie
      this.router.navigate(['/signIn']);
    } catch (error: any) {
      // Gestion des erreurs venant de Firebase (ex: email déjà utilisé)
      this.error = error.message;
    }
  }
}
