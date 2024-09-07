import { Injectable } from '@angular/core';
// import { initializeApp } from "firebase/app";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteField,
  deleteDoc,
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { DataBase } from './models/db.model';
import { AuthService } from './auth.service';

interface Snippet {
  id: string;
  // Add other snippet properties here based on your data structure
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private db?: any;

  constructor(private authService: AuthService) {
    this.db = getFirestore();
  }
  async deleteSnippet(id: string) {
    try {
      await deleteDoc(doc(this.db, "Snippets", id));
      console.log(`Snippet with ID: ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }
  
  async createSnippet(snippet: DataBase) {
    try {
      const docRef = await addDoc(collection(this.db, 'Snippets'), {
        ...snippet,
        by: this.authService.getUid(),
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  async getAllSnippet(): Promise<Snippet[]> {
    try {
      const result: Snippet[] = [];
      const querySnapshot = await getDocs(collection(this.db, 'Snippets'));

      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });

      return result;
    } catch (error) {
      console.error('Error fetching snippets: ', error);
      throw error;
    }
  }

  async getSnippetById(docId: string) {
    const docRef = doc(this.db, 'Snippets', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('No such document!');
      return {
        id: '0',
        title: '^_____^',
        code: '(┬┬﹏┬┬)',
      };
    }
  }
}
