import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'paginador-nav',
  templateUrl: './paginador.component.html'
})
export class PaginadorComponent implements OnInit, OnChanges {

  @Input() paginador: any;
  paginas: number[];
  desde: number;
  hasta: number;

  constructor() { }

  ngOnInit() {
    this.calcularRangoPaginas();
  }
  
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    let paginadorActualizado = changes['paginador'];

    if(paginadorActualizado.previousValue)
      this.calcularRangoPaginas();
  }
  
  calcularRangoPaginas(): void {
    this.desde = Math.min(Math.max(1, this.paginador.number-4), this.paginador.totalPages-5);
    this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number+4), 6);
  
    if(this.paginador.totalPages > 5)
      this.paginas = new Array(this.hasta - this.desde).fill(0).map((_valor, indice) => indice + this.desde);
    else
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice + 1);
  }

}
