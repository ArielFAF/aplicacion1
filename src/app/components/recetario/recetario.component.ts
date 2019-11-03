import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recetario',
  templateUrl: './recetario.component.html',
  styleUrls: ['./recetario.component.css']
})
export class RecetarioComponent implements OnInit {

  recetasList = [
    {
      nombre: 'Donas'
    }, {
      nombre: 'Pizza'
    }
  ];

  busqueda: '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    alert('buscara recetas...');
  }

  onNew() {
    // alert('grabara nueva receta...');
    this.router.navigateByUrl('/recetario/receta');
  }

  onView(texto: any) {
    alert('mostrara la receta ' + texto);
  }

  onEdit(texto: any) {
    alert('editara la receta ' + texto);
  }

  onDelete(texto: any) {
    alert('eliminara la receta ' + texto);
  }
}
