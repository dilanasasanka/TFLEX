import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInVar: boolean = false;
  private user: any; 


  isLoggedIn(): boolean {
    return this.isLoggedInVar;
  }

  login(username: string, userId: number) {
    this.isLoggedInVar = true;
    this.user = { username, userId };
    
  }


  getUserId(): number | null {
    console.log(this.user.id)
    return this.user ? this.user.userId : null;
  }

  logout(): void {
    this.isLoggedInVar = false;
  }
}
