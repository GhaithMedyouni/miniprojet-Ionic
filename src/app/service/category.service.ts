import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Category {
  id?: string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private collectionName = 'categories';

  constructor(private firestore: AngularFirestore) {}

  // Récupérer toutes les catégories
  getCategories(): Observable<Category[]> {
    return this.firestore.collection<Category>(this.collectionName).valueChanges({ idField: 'id' }).pipe(
      map(data => data || []),
      catchError(error => {
        console.error('Erreur lors de la récupération des catégories:', error);
        return of([]);
      })
    );
  }

  // Ajouter une nouvelle catégorie
  addCategory(category: Category): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(this.collectionName).doc(id).set({ ...category, id });
  }

  // Mettre à jour une catégorie existante
  updateCategory(category: Category): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(category.id).update(category);
  }

  // Supprimer une catégorie
  deleteCategory(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
