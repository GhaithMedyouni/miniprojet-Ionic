import { Component, OnInit } from '@angular/core';
import { ClientService, Client } from '../service/client.service';
import { CategoryService, Category } from '../service/category.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss']
})
export class ClientPage implements OnInit {
  clients: Client[] = [];
  categories: Category[] = [];
  selectedClient: Client | null = null;
  clientData: Client = { name: '', email: '', phone: '', categoryId: '' };

  constructor(
    private clientService: ClientService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadCategories();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSelect(client: Client): void {
    this.selectedClient = client;
    this.clientData = { ...client }; // Populate clientData with the selected client's details
  }

  onCreate(clientData: Client): void {
    this.clientService.createClient(clientData).then(() => {
      this.loadClients();
      this.resetForm();
    });
  }

  onUpdate(clientData: Client): void {
    if (this.selectedClient && this.selectedClient.id) {
      this.clientService.updateClient(this.selectedClient.id, clientData).then(() => {
        this.loadClients();
        this.resetForm();
      });
    }
  }

  onDelete(id: string | undefined): void {
    if (id) {
      this.clientService.deleteClient(id).then(() => {
        this.loadClients();
      });
    }
  }

  resetForm(): void {
    this.selectedClient = null;
    this.clientData = { name: '', email: '', phone: '', categoryId: '' };
  }

  getCategoryNameById(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Catégorie inconnue';
  }
}
