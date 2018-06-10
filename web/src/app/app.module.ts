import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HttpModule } from '@angular/http';


const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'registration', component: RegistrationComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
