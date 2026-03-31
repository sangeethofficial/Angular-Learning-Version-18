import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LearnComponent } from './components/learn/learn.component';
import { FormsModule } from '@angular/forms';
import { RoadmapComponent } from './components/roadmap/roadmap.component';

@NgModule({
  declarations: [
    AppComponent,
    LearnComponent,
    RoadmapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
