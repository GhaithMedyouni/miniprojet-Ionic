import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  
  

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

  // Méthode pour rediriger vers une page spécifique
  navigateToPage(page: string) {
    if (page === 'dashboard') {
      this.router.navigate(['/dashboard']); // Rediriger vers la page Dashboard
    } else if (page === 'clients') {
      this.router.navigate(['/client']); // Rediriger vers la page Clients
    } else if (page === 'produits') {
      this.router.navigate(['/produit']); // Rediriger vers la page Produits
    } else if (page === 'stock') {
      this.router.navigate(['/stock']); // Rediriger vers la page Stock
    } else if (page === 'categorie') {
      this.router.navigate(['/categorie']); // Rediriger vers la page Catégorie
    }
  }
}
