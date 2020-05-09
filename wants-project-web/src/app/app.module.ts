import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './home/home.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { WishListShowComponent } from './parts/wish-list-show/wish-list-show.component';
import { WishItemNewComponent } from './parts/wish-item-new/wish-item-new.component';
import { HeaderComponent } from './header/header.component';
import { AuthenticateInterceptor } from './authenticate-Interceptor';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserGroupComponent } from './user-group/user-group.component';
import { MatTableModule } from '@angular/material/table';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { UserGroupConfirmComponent } from './user-group-confirm/user-group-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    HomeComponent,
    WishListComponent,
    WishListShowComponent,
    WishItemNewComponent,
    HeaderComponent,
    UserGroupComponent,
    AuthenticateComponent,
    UserGroupConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatGridListModule,
    MatTabsModule,
    MatProgressBarModule,
    MatTableModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticateInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
