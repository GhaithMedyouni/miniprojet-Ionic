import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss']
})
export class CategoryPage implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  categoryData: Category = { name: '', description: '' };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onCreateCategory(categoryData: Category): void {
    this.categoryService.addCategory(categoryData).then(() => {
      this.loadCategories();
      this.resetCategoryForm();
    });
  }

  onSelectCategory(category: Category): void {
    this.selectedCategory = category;
    this.categoryData = { ...category }; // Populate categoryData with the selected category details
  }

  onUpdateCategory(categoryData: Category): void {
    if (this.selectedCategory && this.selectedCategory.id) {
      // Passez directement l'objet categoryData, qui contient déjà l'ID
      this.categoryService.updateCategory({...categoryData, id: this.selectedCategory.id}).then(() => {
        this.loadCategories();
        this.resetCategoryForm();
      });
    }
  }
  

  onDeleteCategory(id: string | undefined): void {
    if (id) {
      this.categoryService.deleteCategory(id).then(() => {
        this.loadCategories();
      });
    }
  }

  resetCategoryForm(): void {
    this.selectedCategory = null;
    this.categoryData = { name: '', description: '' };
  }
}
