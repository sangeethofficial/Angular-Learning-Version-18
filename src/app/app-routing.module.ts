import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnComponent } from './components/learn/learn.component';
import { RoadmapComponent } from './components/roadmap/roadmap.component';

const routes: Routes = [
  {
    path: 'roadmap',
    component:RoadmapComponent
  },
  { path: '', redirectTo: 'roadmap', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
