import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { PaginadorComponent } from './paginador/paginador.component';

import { AppComponent } from './app.component';
import { CalificacionesComponent } from './calificaciones/calificaciones.component';

const routes: Routes = [
  {path: '', redirectTo: '/calificaciones', pathMatch: 'full'},
  {path: 'calificaciones', component: CalificacionesComponent},
  {path: 'calificaciones/pagina/:pagina', component: CalificacionesComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    CalificacionesComponent,
    PaginadorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
