import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '@core/material.module';
import { PageDetailsDialogComponent } from '@pages/page-details-dialog/page-details-dialog.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
})
export class PagesComponent {
  constructor(private matDialog: MatDialog) {}

  openPageDetails(): void {
    this.matDialog.open(PageDetailsDialogComponent, {
      width: '500px',
    })
  }
}
