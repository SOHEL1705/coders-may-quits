import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  signOut,
  onAuthStateChanged,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Auth,
  UserCredential,
  User,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth;
  private uid?: string;

  constructor(private router: Router) {
    
    this.auth = getAuth(); // Ensure this.auth is initialized

    // Handle authentication state changes
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        this.uid = user.uid;
        console.log(`${user.email} is logged in`);
      } else {
        this.uid = undefined; 
        console.log('User is logged out');
      }
    });
  }

  registerUser(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => this.handleAuthSuccess(userCredential))
      .catch((error) => this.handleAuthError(error));
  }

  loginUser(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => this.handleAuthSuccess(userCredential))
      .catch((error) => this.handleAuthError(error));
  }

  private handleAuthSuccess(userCredential: UserCredential): void {
    const user = userCredential.user;
    console.log({ user });
    this.router.navigate(['/']); // Optional navigation after login/register
  }

  private handleAuthError(error: any): void {
    const errorMessage = error.message;
    console.log('Authentication Error:', errorMessage);
    alert("Email or password don't match.");
    // Handle specific error codes if needed
  }

  logout(): Promise<void> {
    return signOut(this.auth)
      .then(() => {
        console.log('Logged out successfully');
        // Optional: Uncomment if you want to navigate after logout
        // this.router.navigate(['/login']);
      })
      .catch((error) => this.handleLogoutError(error));
  }

  private handleLogoutError(error: any): void {
    console.error('Logout failed:', error);
    alert('Cannot log out. Something went wrong.');
  }

  isUser(){
  return  this.uid ? true : false 
  }

  getUid(){
    return this.uid
  }
}
