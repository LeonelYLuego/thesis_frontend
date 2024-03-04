import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '@core/material.module';
import { CreatePageInterface, Page } from '@pages/models/page.interface';
import { PagesService } from '@pages/pages.service';

@Component({
  selector: 'app-page-details-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './page-details-dialog.component.html',
  styleUrl: './page-details-dialog.component.scss',
})
export class PageDetailsDialogComponent implements OnInit {
  pageForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(32)]),
    url: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9_-]+(\.[a-zA-Z]{2,})+$/),
      Validators.maxLength(32),
    ]),
  });
  page?: Page;

  constructor(
    public dialogRef: MatDialogRef<PageDetailsDialogComponent>,
    private pagesService: PagesService,
    private matSnackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    await this.find();
  }

  async find() {
    try {
      this.page = await this.pagesService.find();
      if (this.page) {
        this.pageForm.controls.name.disable();
        this.pageForm.controls.url.disable();
        this.pageForm.patchValue(this.page);
      }
    } catch {}
  }

  async createDelete(): Promise<void> {
    if (this.page) {
      await this.pagesService.remove();
      this.dialogRef.close();
    } else if (this.pageForm.valid) {
      try {
        await this.pagesService.create(
          this.pageForm.value as CreatePageInterface
        );
        await this.find();
      } catch (ex: any) {
        if (
          ex.status &&
          ex.status == 400 &&
          ex.error.message == 'url already exist'
        ) {
          this.pageForm.controls.url.setErrors({ incorrect: true });
          this.matSnackBar.open('URL ya registrada', undefined, {
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
            panelClass: 'primary-snackbar',
            duration: 2000,
          });
        }
      }
    }
  }
}
