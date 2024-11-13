import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  selectedSection: string = 'dashboard'; // Section par défaut

  constructor(private firebaseService: AuthService, private router: Router) {}

  // Fonction pour déconnexion
  async logout() {
    try {
      await this.firebaseService.logout();
      // Rediriger vers la page de login après déconnexion
      this.router.navigate(['/signIn']);
    } catch (error) {
      console.log('Error during logout:', error);
    }
  }

  // Méthode pour mettre à jour la section sélectionnée
  selectSection(section: string) {
    this.selectedSection = section;
  }
}
