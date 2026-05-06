import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  QueryConstraint,
} from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private auth: Auth;
  private firestore: Firestore;
  private currentUser$ = new BehaviorSubject<User | null>(null);

  // Replace with your Firebase config
  private firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
  };

  constructor() {
    // Initialize Firebase
    const app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(app);
    this.firestore = getFirestore(app);

    // Listen to auth state changes
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser$.next(user);
    });
  }

  /**
   * Get current user as observable
   */
  getCurrentUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  /**
   * Get current user value synchronously
   */
  getCurrentUserSync(): User | null {
    return this.currentUser$.value;
  }

  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string): Promise<User | null> {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      return result.user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  /**
   * Sign out user
   */
  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  /**
   * Get nurse profile data
   */
  async getNurseProfile(userId: string): Promise<any> {
    try {
      const docRef = doc(this.firestore, 'nurses', userId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      console.error('Error fetching nurse profile:', error);
      return null;
    }
  }

  /**
   * Get schedule items for a nurse
   */
  async getSchedule(userId: string): Promise<any[]> {
    try {
      const q = query(collection(this.firestore, 'schedules'), where('nurseId', '==', userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching schedule:', error);
      return [];
    }
  }

  /**
   * Get learning modules for a nurse
   */
  async getLearningModules(userId: string): Promise<any[]> {
    try {
      const q = query(
        collection(this.firestore, 'learningModules'),
        where('nurseId', '==', userId),
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching learning modules:', error);
      return [];
    }
  }

  /**
   * Update schedule item
   */
  async updateScheduleItem(scheduleId: string, data: any): Promise<void> {
    try {
      const docRef = doc(this.firestore, 'schedules', scheduleId);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error('Error updating schedule:', error);
      throw error;
    }
  }

  /**
   * Update learning module progress
   */
  async updateModuleProgress(moduleId: string, progress: number): Promise<void> {
    try {
      const docRef = doc(this.firestore, 'learningModules', moduleId);
      await updateDoc(docRef, {
        progress,
        lastUpdated: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error updating module progress:', error);
      throw error;
    }
  }

  /**
   * Get alerts for a nurse
   */
  async getAlerts(userId: string): Promise<any[]> {
    try {
      const q = query(collection(this.firestore, 'alerts'), where('nurseId', '==', userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching alerts:', error);
      return [];
    }
  }

  /**
   * Create a new learning session
   */
  async createLearningSession(userId: string, moduleId: string): Promise<void> {
    try {
      const sessionId = `${userId}_${moduleId}_${Date.now()}`;
      const docRef = doc(this.firestore, 'learningSessions', sessionId);
      await setDoc(docRef, {
        userId,
        moduleId,
        startedAt: new Date().toISOString(),
        status: 'in_progress',
      });
    } catch (error) {
      console.error('Error creating learning session:', error);
      throw error;
    }
  }
}
