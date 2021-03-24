import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavComponent } from './nav/nav.component';
import { PhotographyComponent } from './photography/photography.component';
import { DrawingComponent } from './drawing/drawing.component';
import { MockupComponent } from './mockup/mockup.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RwdWebsiteComponent } from './rwd-website/rwd-website.component';
import { PsPhotoComponent } from './ps-photo/ps-photo.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'photography', component: PhotographyComponent},
  {path: 'drawing', component: DrawingComponent},
  {path: 'mockup', component: MockupComponent},
  {path: 'about', component: AboutComponent},
  {path: 'rwd-website', component: RwdWebsiteComponent},
  {path: 'ps-photo', component: PsPhotoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
