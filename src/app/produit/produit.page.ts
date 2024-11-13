import { Component, OnInit } from '@angular/core';
import { ProduitService, Produit } from '../service/produit.service';
import { CategoryService, Category } from '../service/category.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.page.html',
  styleUrls: ['./produit.page.scss']
})
export class ProduitPage implements OnInit {
  produits: Produit[] = [];  // Liste des produits
  categories: Category[] = [];  // Liste des catégories
  selectedProduit: Produit | null = null;  // Produit sélectionné pour modification
  produitData: Produit = { name: '', description: '', price: 0, categoryId: '', quantity: 0 };  // Données du formulaire

  constructor(
    private produitService: ProduitService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadProduits();
    this.loadCategories();
  }

  // Charger tous les produits
  loadProduits(): void {
    this.produitService.getProduits().subscribe(produits => {
      this.produits = produits;
    }, error => {
      console.error('Erreur lors du chargement des produits:', error);
    });
  }

  // Charger toutes les catégories
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    }, error => {
      console.error('Erreur lors du chargement des catégories:', error);
    });
  }

  // Sélectionner un produit pour modification
  onSelect(produit: Produit): void {
    this.selectedProduit = produit;
    this.produitData = { ...produit };  // Remplir produitData avec les détails du produit sélectionné
  }

  // Créer un nouveau produit
  onCreate(produitData: Produit): void {
    const priceNumber = parseFloat(produitData.price.toString());
    if (isNaN(priceNumber)) {
      console.error('Le prix doit être un nombre valide');
      return;
    }

    produitData.price = priceNumber;
    this.produitService.createProduit(produitData).then(() => {
      this.loadProduits();  // Recharger la liste des produits après la création
      this.resetForm();  // Réinitialiser le formulaire
    });
  }

  // Mettre à jour un produit existant
  onUpdate(produitData: Produit): void {
    if (this.selectedProduit && this.selectedProduit.id) {
      const priceNumber = parseFloat(produitData.price.toString());
      if (isNaN(priceNumber)) {
        console.error('Le prix doit être un nombre valide');
        return;
      }

      produitData.price = priceNumber;
      this.produitService.updateProduit(this.selectedProduit.id, produitData).then(() => {
        this.loadProduits();  // Recharger la liste des produits après la mise à jour
        this.resetForm();  // Réinitialiser le formulaire
      });
    }
  }

  // Supprimer un produit
  onDelete(id: string | undefined): void {
    if (id) {
      this.produitService.deleteProduit(id).then(() => {
        this.loadProduits();  // Recharger la liste des produits après la suppression
      });
    } else {
      console.error('L\'ID du produit est indéfini');
    }
  }

  // Réinitialiser le formulaire et le produit sélectionné
  resetForm(): void {
    this.selectedProduit = null;
    this.produitData = { name: '', description: '', price: 0, categoryId: '', quantity: 0 };
  }

  // Obtenir le nom de la catégorie par ID
  getCategoryNameById(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Catégorie inconnue';
  }
}
