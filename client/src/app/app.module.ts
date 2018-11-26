import { FileUploadService } from './services/shared/file-upload.service';
// import { FORM_DIRECTIVES, CORE_DIRECTIVES, NgClass, NgStyle } from '@angular/common';

import { ProductsService } from './services/products/products.service';
import { LoginService } from './services/login/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
// import { FILE_UPLOAD_DIRECTIVES} from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule, MatTooltipModule, MatButtonModule, MatStepperModule, MatMenuModule,
  MatToolbarModule, MatIconModule, MatCardModule, MatFormFieldModule, MatDatepickerModule,
  MatNativeDateModule, MatRadioModule, MatSelectModule, MatOptionModule, MatSlideToggleModule,
  MatTableModule, MatProgressBarModule, MatCheckboxModule, MatProgressSpinnerModule, MatExpansionModule
}
  from '@angular/material';
import { HttpModule } from '@angular/http';
import { FileUploadComponent } from './components/shared/file-upload/file-upload.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    // FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES,
    FileUploadComponent,
    DashboardComponent,
    // FileSelectDirective,
    // FileDropDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [LoginService, ProductsService, FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
