import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';  // Import de FormsModule
import { ProduitPage } from './produit.page';
import { ProduitPageRoutingModule } from './produit-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,  // Ajout de FormsModule ici
    ProduitPageRoutingModule
  ],
  declarations: [ProduitPage]
})
export class ProduitPageModule {}
