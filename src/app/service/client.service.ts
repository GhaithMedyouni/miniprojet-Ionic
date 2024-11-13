import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Client {
  id?: string;
  name: string;
  email: string;
  phone: string;
  categoryId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private firestore: AngularFirestore) { }

  // Créer un client
  createClient(client: Client): Promise<any> {
    return this.firestore.collection('clients').add(client).catch((error) => {
      console.error('Erreur lors de la création du client: ', error);
      throw error;  // Propager l'erreur pour gestion en amont
    });
  }

  // Obtenir tous les clients
  getClients(): Observable<Client[]> {
    return this.firestore.collection<Client>('clients').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      })),
      catchError((error) => {
        console.error('Erreur lors de la récupération des clients: ', error);
        throw error;
      })
    );
  }

  // Obtenir un client par ID
  getClient(id: string): Observable<Client> {
    return this.firestore.collection('clients').doc<Client>(id).valueChanges().pipe(
      map(client => client || { name: '', email: '', phone: '', categoryId: '' }), // Valeur par défaut si client est undefined
      catchError((error) => {
        console.error(`Erreur lors de la récupération du client ${id}: `, error);
        throw error; // Propager l'erreur
      })
    );
  }

  // Mettre à jour un client (avec mise à jour de la catégorie si nécessaire)
  updateClient(id: string, client: Client): Promise<void> {
    return this.firestore.collection('clients').doc(id).update(client).catch((error) => {
      console.error('Erreur lors de la mise à jour du client: ', error);
      throw error;  // Propager l'erreur
    });
  }

  // Supprimer un client
  deleteClient(id: string): Promise<void> {
    return this.firestore.collection('clients').doc(id).delete().catch((error) => {
      console.error('Erreur lors de la suppression du client: ', error);
      throw error;  // Propager l'erreur
    });
  }

  // Mettre à jour la catégorie d'un client
  updateCategoryForClient(clientId: string, newCategoryId: string): Promise<void> {
    return this.firestore.collection('clients').doc(clientId).update({ categoryId: newCategoryId }).catch((error) => {
      console.error('Erreur lors de la mise à jour de la catégorie du client: ', error);
      throw error;  // Propager l'erreur
    });
  }
}
