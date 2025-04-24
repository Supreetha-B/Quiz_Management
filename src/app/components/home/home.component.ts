import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  firstName: 'sss' | undefined;
  signOut() {
    throw new Error('Method not implemented.');
  }
  viewUsers() {
    throw new Error('Method not implemented.');
  }
  goHome() {
    throw new Error('Method not implemented.');
  }
  private router = inject(Router);
  logout() {
    sessionStorage.clear();
    this.router.navigate(['login'])
  }
}
