import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@core/material.module';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(private router: Router) {}

  logOut(): void {
    localStorage.clear();
    this.router.navigateByUrl('/landing').then(() => window.location.reload());
  }
}
