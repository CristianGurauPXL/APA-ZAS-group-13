import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import { environment } from '../env/environment';

const firebaseConfig = {
  apiKey: "AIzaSyCSLickASQdKMH4Y09_3P49L6jIlycxYN4",
  authDomain: "learning-gap-547ae.firebaseapp.com",
  projectId: "learning-gap-547ae",
  storageBucket: "learning-gap-547ae.firebasestorage.app",
  messagingSenderId: "1067257288108",
  appId: "1:1067257288108:web:d5a262a33e7487611c1609"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ]
};
