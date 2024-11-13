import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';  // Import de AngularFireAuthModule
import { environment } from '../environments/environment';  // Import de la configuration Firebase
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Initialisation de Firebase
    AngularFirestoreModule, // Pour Firestore
    AngularFireAuthModule, // Pour l'authentification
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
