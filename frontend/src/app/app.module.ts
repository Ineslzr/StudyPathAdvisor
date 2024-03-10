import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentGpaComponent } from './student-gpa/student-gpa.component';
import { GraphiqueComponent } from './graphique/graphique.component';
import { LineGraphiqueComponent } from './line-graphique/line-graphique.component';
import { StudentMapComponent } from './student-map/student-map.component';
import { PieGraphiqueComponent } from './pie-graphique/pie-graphique.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentGpaComponent,
    GraphiqueComponent,
    LineGraphiqueComponent,
    StudentMapComponent,
    PieGraphiqueComponent
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
