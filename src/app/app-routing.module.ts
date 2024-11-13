import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Page de connexion
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  // Routes pour les pages d'inscription et de connexion
  { path: 'signIn', loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInPageModule) },
  { path: 'signUp', loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpPageModule) },

  // Page d'accueil
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },

  // Dashboard principal
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },

  // Routes pour la gestion des produits
  {
    path: 'produit',
    loadChildren: () => import('./produit/produit.module').then(m => m.ProduitPageModule)
  },
  // Route pour la gestion des catégories
  {
    path: 'categorie',
    loadChildren: () => import('./categorie/categorie.module').then(m => m.CategoriePageModule)
  },
  // Route pour la gestion des stocks
  {
    path: 'stock',
    loadChildren: () => import('./stock/stock.module').then(m => m.StockPageModule)
  },
  // Route pour la gestion des clients
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then(m => m.ClientPageModule)
  },

  // Autres routes (si nécessaire, vous pouvez en ajouter pour les pages de détails ou de mise à jour)
  // Exemple: { path: 'produit/:id', loadChildren: () => import('./produit-detail/produit-detail.module').then(m => m.ProduitDetailPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
