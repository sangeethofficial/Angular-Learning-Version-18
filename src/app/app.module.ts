import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LearnComponent } from './components/learn/learn.component';
import { LearnProjectComponent } from './components/learn-project/learn-project.component';

@NgModule({
  declarations: [
    AppComponent,
    LearnComponent,
    LearnProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
