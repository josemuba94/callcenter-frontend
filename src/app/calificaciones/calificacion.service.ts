import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Calificacion } from './calificacion';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  archivo: File;

  constructor(private httpCliente: HttpClient) { }

  setArchivo(archivoSeleccionado: File) {
    this.archivo = archivoSeleccionado;
  }

  obtenerCalificaciones(pagina: number): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('archivo', this.archivo);

    if(this.archivo) {
      return this.httpCliente.post(environment.urlCalificarConversaciones +'/'+ pagina, formData).pipe(
        catchError(error => { return this.responseError(error) })
      );
    } else {
      return this.responseError({ error: { error: 'No se ha cargado el archivo a procesar. Intente cargarlo nuevamente por favor.' } });
    }
  }

  responseError(error) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ha surgido un error procesando el archivo',
      text: error.error.error,
      showConfirmButton: true
    });
    return throwError(error);
  }

}
