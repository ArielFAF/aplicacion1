import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {
  ingredientes = [
    {
      id: 1,
      nombre: 'Harina'
    }, {
      id: 2,
      nombre: 'Huevos'
    }, {
      id: 3,
      nombre: 'Queso'
    }
  ];

  ingredientesList = [
    {
      nombre: 'Harina',
      cantidad: '100 gr'
    }, {
      nombre: 'Huevos',
      cantidad: '2 u.'
    }
  ];

  cantidad: any;
  busqueda: any;
  id: any;

  constructor() { }

  ngOnInit() {
  }

  onGrabar() {
    alert('grabara los cambios a la receta');
  }

  onAgregarEditarIngrediente() {
    alert('graba el ingrediente');
  }

  onEdit(text: any) {
    alert('edita el ingrediente ' + text);
  }

  onDelete(text: any) {
    alert('elimina el ingrediente '+text);
  }  
}
