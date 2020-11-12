import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './components/pages/hero/hero.component';
import { HerosComponent } from './components/pages/heros/heros.component';
import { ButtonOneComponent } from './components/shared/button-one/button-one.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    HerosComponent,
    ButtonOneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
