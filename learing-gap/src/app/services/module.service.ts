import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  constructor(private firestore: Firestore) {}

  addTestModule() {
    const ref = collection(this.firestore, 'modules');
    return addDoc(ref, {
      title: 'Test Module',
      content: 'This works!'
    });
  }

  getModules(): Observable<any[]> {
    const ref = collection(this.firestore, 'modules');
    return collectionData(ref, { idField: 'id' }) as Observable<any[]>;
  }
}
