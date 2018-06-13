import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { MenuComponent } from './menu/menu.component';
import { GameComponent } from './game/game.component';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'users', component: UsersComponent },
  { path: 'game', component: GameComponent },
  { path: 'login', component: LoginComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LandingComponent,
    UsersComponent,
    MenuComponent,
    GameComponent,
    HelpComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
