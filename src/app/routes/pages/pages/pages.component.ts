import { AccountsService } from '@accounts/accounts.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '@core/material.module';
import { Page } from '@pages/models/page.interface';
import { PageDetailsDialogComponent } from '@pages/page-details-dialog/page-details-dialog.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
})
export class PagesComponent implements OnInit {
  pages: Page[] = [];
  displayedColumns = ['name'];

  constructor(
    private matDialog: MatDialog,
    private accountsService: AccountsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.pages = await this.accountsService.pages();
  }

  openPageDetails(): void {
    this.matDialog.open(PageDetailsDialogComponent, {
      width: '500px',
    });
  }
}
