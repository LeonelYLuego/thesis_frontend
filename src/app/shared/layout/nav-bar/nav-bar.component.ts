import { Account } from '@accounts/models/account.interface';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { MaterialModule } from '@core/material.module';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  account: Account | undefined;

  async ngOnInit() {
    try {
      this.account = await this.authService.logged();
    } catch {
      this.logOut();
    }
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigateByUrl('/landing').then(() => window.location.reload());
  }
}
