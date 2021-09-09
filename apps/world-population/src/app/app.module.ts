import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { TotalPagePipe } from './total-page.pipe';

@NgModule({
  declarations: [AppComponent, TotalPagePipe],
  imports: [CommonModule, BrowserModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
