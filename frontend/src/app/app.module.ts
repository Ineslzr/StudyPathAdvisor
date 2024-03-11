import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineGraphiqueComponent } from './line-graphique/line-graphique.component';
import { StudentMapComponent } from './student-map/student-map.component';
import { PieGraphiqueComponent } from './pie-graphique/pie-graphique.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { BarGraphiqueComponent } from './bar-graphique/bar-graphique.component';

@NgModule({
  declarations: [
    AppComponent,
    LineGraphiqueComponent,
    StudentMapComponent,
    PieGraphiqueComponent,
    StatistiquesComponent,
    BarGraphiqueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
