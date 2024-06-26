import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@core/material.module';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {}
