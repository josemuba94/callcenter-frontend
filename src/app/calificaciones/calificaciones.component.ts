import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalificacionService } from './calificacion.service';
import { Calificacion } from './calificacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html'
})
export class CalificacionesComponent implements OnInit {

  calificaciones: Calificacion[];
  archivoSeleccionado: File;
  nombreArchivo: string = 'Seleccionar archivo';

  paginador: any;

  constructor(
    private calificacionService: CalificacionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(parametros => {
      let pagina: string = parametros.get('pagina');

      if(pagina) {
        this.calificacionService.obtenerCalificaciones(+pagina).subscribe(result => {
          this.paginador = result;
          this.calificaciones = (result.content as Calificacion[]);
        }, error => {
          this.router.navigate(['/calificaciones']);
        });
      }
    });
  }
  
  seleccionarArchivo(event) {
    this.archivoSeleccionado = event.target.files[0];
    this.nombreArchivo = this.archivoSeleccionado.name.toString();
    
    if(this.archivoSeleccionado.type != 'text/plain') {
      this.nombreArchivo = 'Seleccionar archivo';
      this.archivoSeleccionado = null;
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error seleccionando el archivo',
        text: 'El archivo seleccionado debe ser un texto plano.',
        showConfirmButton: true
      });
    } else 
      this.calificacionService.setArchivo(this.archivoSeleccionado);
  }

  darEstrellas(estrellas: number) {
    return Array(estrellas);
  }

}
