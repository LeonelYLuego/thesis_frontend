import { AccountsService } from '@accounts/accounts.service';
import { Account } from '@accounts/models/account.interface';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { MaterialModule } from '@core/material.module';
import { OAuthService } from '@oauth/oauth.service';
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
    private router: Router,
    private OAuthService: OAuthService,
    private accountsService: AccountsService
  ) {}
  loading = true;
  invalid = false;
  redirectTo?: string;
  page?: Page;
  account?: Account;

  async ngOnInit(): Promise<void> {
    let publicKey = this.route.snapshot.queryParams['id'] as string | undefined;
    if (!publicKey)
      publicKey = this.route.snapshot.queryParams['publicKey'] as
        | string
        | undefined;
    this.redirectTo = this.route.snapshot.queryParams['redirectTo'] as
      | string
      | undefined;
    if (publicKey && this.redirectTo) {
      try {
        this.page = await this.pagesService.findOneByPublicKey(publicKey);

        if (this.redirectTo.indexOf(this.page.url) != -1) {
          try {
            this.account = await this.authService.logged();

            if (
              await this.accountsService.checkIfPageRegistered(this.page.id)
            ) {
              await this.accept();
              return;
            }

            this.loading = false;
            return;
          } catch {
            this.router.navigate(['/', 'auth', 'log-in'], {
              queryParams: { publicKey, redirectTo: this.redirectTo },
            });
            return;
          }
        }
      } catch {}
    }
    this.invalid = true;
    this.loading = false;
  }

  cancel(): void {
    window.location.href = this.redirectTo!;
  }

  async accept(): Promise<void> {
    const result = (await this.OAuthService.accept(this.page!.id)).value;
    console.log(this.redirectTo);
    window.location.href = `https://${this.redirectTo!}?encrypted=${encodeURIComponent(
      result
    )}`;
  }
}
