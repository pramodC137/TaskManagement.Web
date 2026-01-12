import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user : any) => {
      this.isLoggedIn = user !== null;
    });
    
    this.authService.checkAuth().subscribe({
      next: () => {},
      error: () => {}
    });
  }

  onLoginSuccess(): void {
    this.isLoggedIn = true;
  }
}