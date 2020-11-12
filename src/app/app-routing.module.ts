import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HerosComponent } from './components/pages/heros/heros.component';
import { HeroComponent } from './components/pages/hero/hero.component';

const routes: Routes = [
  { path: 'hero/:id', component: HeroComponent },
  { path: 'heros', component: HerosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'heros' },
  { path: '', pathMatch: 'full', redirectTo: 'heros' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
