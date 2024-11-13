import { Component, OnInit } from '@angular/core';
import { ProduitService, Produit } from '../service/produit.service';
import { CategoryService, Category } from '../service/category.service';
import { ClientService, Client } from '../service/client.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {
  totalProducts: number = 0;
  totalCategories: number = 0;
  totalProductSum: number = 0;
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  selectedProducts: Produit[] = [];
  selectedClients: Client[] = [];

  constructor(
    private produitService: ProduitService,
    private categoryService: CategoryService,
    private clientService: ClientService // Ajout du service client
  ) {}

  ngOnInit(): void {
    this.loadTotals();
    this.loadCategories();
  }

  // Charger les totaux
  loadTotals(): void {
    // Total des produits (quantité)
    this.produitService.getTotalProduits().subscribe(total => this.totalProducts = total);
    
    // Total des catégories
    this.produitService.getTotalCategories().subscribe(total => this.totalCategories = total);
    
    // Somme totale des produits (prix * quantité)
    this.produitService.getTotalSomme().subscribe(total => this.totalProductSum = total);
  }

  // Charger les catégories
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  // Lorsqu'une catégorie est sélectionnée, charger les produits et les clients associés
  onCategoryClick(category: Category): void {
    this.selectedCategory = category;
    
    // Charger les produits associés à la catégorie sélectionnée
    this.produitService.getProductsByCategory(category.id).subscribe(products => {
      this.selectedProducts = products;
    });
    
    // Charger les clients associés à la catégorie sélectionnée
    this.clientService.getClientsByCategory(category.id).subscribe(clients => {
      this.selectedClients = clients;
    });
  }
}
