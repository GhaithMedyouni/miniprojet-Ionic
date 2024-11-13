import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; // Pour naviguer après l'authentification

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user$ = afAuth.authState; // Observateur de l'état de l'utilisateur (connecté/déconnecté)
  }

  // Inscription avec email et mot de passe
  signup(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Connexion avec email et mot de passe
  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Déconnexion
  logout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']); // Redirection après déconnexion
    });
  }

  // Vérifier si l'utilisateur est connecté
  getCurrentUser(): Observable<any> {
    return this.afAuth.authState;
  }

  // Réinitialisation du mot de passe
  resetPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
