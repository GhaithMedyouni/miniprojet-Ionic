import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Produit {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity : number;
  categoryId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  constructor(private firestore: AngularFirestore) { }

  // Créer un produit
  createProduit(produit: Produit): Promise<any> {
    return this.firestore.collection('produits').add(produit).catch((error) => {
      console.error('Erreur lors de la création du produit: ', error);
      throw error;  // Propager l'erreur pour gestion en amont
    });
  }

  // Obtenir tous les produits
  getProduits(): Observable<Produit[]> {
    return this.firestore.collection<Produit>('produits').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Produit;
        const id = a.payload.doc.id;
        return { id, ...data };
      })),
      catchError((error) => {
        console.error('Erreur lors de la récupération des produits: ', error);
        throw error;
      })
    );
  }

  // Obtenir un produit par ID
  getProduit(id: string): Observable<Produit> {
    return this.firestore.collection('produits').doc<Produit>(id).valueChanges().pipe(
      map(produit => produit || { name: '', description: '', price: 0, quantity: 0, categoryId: '' }), // Valeur par défaut si produit est undefined
      catchError((error) => {
        console.error(`Erreur lors de la récupération du produit ${id}: `, error);
        throw error; // Propager l'erreur
      })
    );
  }

  // Mettre à jour un produit (avec mise à jour de la catégorie si nécessaire)
  updateProduit(id: string, produit: Produit): Promise<void> {
    return this.firestore.collection('produits').doc(id).update(produit).catch((error) => {
      console.error('Erreur lors de la mise à jour du produit: ', error);
      throw error;  // Propager l'erreur
    });
  }

  // Supprimer un produit
  deleteProduit(id: string): Promise<void> {
    return this.firestore.collection('produits').doc(id).delete().catch((error) => {
      console.error('Erreur lors de la suppression du produit: ', error);
      throw error;  // Propager l'erreur
    });
  }

  // Mettre à jour la catégorie d'un produit
  updateCategoryForProduit(produitId: string, newCategoryId: string): Promise<void> {
    return this.firestore.collection('produits').doc(produitId).update({ categoryId: newCategoryId }).catch((error) => {
      console.error('Erreur lors de la mise à jour de la catégorie du produit: ', error);
      throw error;  // Propager l'erreur
    });
  }

 // Méthode pour récupérer le total des produits (quantité)
 getTotalProduits(): Observable<number> {
  return this.firestore.collection<Produit>('produits').snapshotChanges().pipe(
    map(actions => actions.reduce((total, a) => {
      const data = a.payload.doc.data() as Produit;
      return total + (data.quantity || 0);
    }, 0))
  );
}

  // Méthode pour récupérer le total des catégories (nombre de produits par catégorie)
  getTotalCategories(): Observable<number> {
    return this.firestore.collection<Produit>('produits').snapshotChanges().pipe(
      map(actions => {
        const categories = new Set(actions.map(a => (a.payload.doc.data() as Produit).categoryId));
        return categories.size;
      })
    );
  }


  // Méthode pour récupérer la somme totale des produits (prix * quantité)
  getTotalSomme(): Observable<number> {
    return this.firestore.collection<Produit>('produits').snapshotChanges().pipe(
      map(actions => actions.reduce((total, a) => {
        const data = a.payload.doc.data() as Produit;
        return total + (data.price * (data.quantity || 0));
      }, 0))
    );
  }

  // Méthode pour récupérer les produits par catégorie
  getProductsByCategory(categoryId: string | undefined): Observable<Produit[]> {
    return this.firestore.collection<Produit>('produits', ref => ref.where('categoryId', '==', categoryId))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Produit;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  // Get all clients (assuming a clients collection exists)
  // getClientsParCategorie(categoryId: string | undefined): Observable<any[]> {
  //   return this.firestore.collection('clients', ref => ref.where('categoryId', '==', categoryId))
  //     .snapshotChanges().pipe(
  //       map(actions => actions.map(a => {
  //         const data = a.payload.doc.data() as { [key: string]: any };  // Assertion du type
  //         const id = a.payload.doc.id;
  //         return { id, ...data };  // Utilisation du spread sur l'objet 'data'
  //       }))
  //     );
  // }
  
  
}
