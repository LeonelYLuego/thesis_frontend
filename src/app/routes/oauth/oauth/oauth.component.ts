import { Account } from '@accounts/models/account.interface';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { MaterialModule } from '@core/material.module';
import { Page } from '@pages/models/page.interface';
import { PagesService } from '@pages/pages.service';

@Component({
  selector: 'app-oauth',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './oauth.component.html',
  styleUrl: './oauth.component.scss',
})
export class OAuthComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private pagesService: PagesService,
    private router: Router
  ) {}
  loading = true;
  invalid = false;
  page?: Page;
  account?: Account;

  async ngOnInit(): Promise<void> {
    const publicKey = this.route.snapshot.queryParams['publicKey'] as
      | string
      | undefined;
    const redirectTo = this.route.snapshot.queryParams['redirectTo'] as
      | string
      | undefined;
    if (publicKey && redirectTo) {
      try {
        this.page = await this.pagesService.findOneByPublicKey(publicKey);

        if (redirectTo.indexOf(this.page.url) != -1) {
          try {
            this.account = await this.authService.logged();
            // TODO: Validate that the user wants to register
            this.loading = false;
            return;
          } catch {
            this.router.navigate(['/', 'auth', 'log-in'], {
              queryParams: { publicKey, redirectTo },
            });
            return;
          }
        }
      } catch {}
    }
    this.invalid = true;
    this.loading = false;
  }
}
