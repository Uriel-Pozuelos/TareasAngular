import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ITarea } from './interfaces/Tareas';
import { TareaService } from './services/tarea.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,FormsModule, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  listaTareas : ITarea[] = [];
  isResultadosLoaded = false;
  idUpdateFormActive = false;

  nombre:string = "";
  idTareasNow : number = 0;

  obenterTareas(){
    this._tareasServices.getList().subscribe({
      next:(data) => {
        this.listaTareas = data;
        this.isResultadosLoaded = true;
      }, error:(e) => {console.log(e)}
    });
  }

  agregarTareas(){
    const request : ITarea = {
      idTarea: 0,
      nombre: this.nombre,
    }

    this._tareasServices.addTarea(request).subscribe({
      next:(data) => {
        this.nombre = "";
        this.obenterTareas();
      }, error(err) {
        console.log(err);
      },
    });
  }

  obtenerTarea(data : ITarea){
    this.nombre = data.nombre;
    this.idTareasNow = data.idTarea;
  }

  updateTarea(){
    const request : ITarea = {
      idTarea: this.idTareasNow,
      nombre: this.nombre,
    }

    this._tareasServices.updateTarea(request).subscribe({
      next:(data) => {
        
        this.nombre = "";
        this.idTareasNow = 0;
        this.obenterTareas();
      }, error(err) {
        console.log(err);
      },
    });
  }

  guardarTarea(){
    if(this.idTareasNow === 0){
      this.agregarTareas();
    }else{
      this.updateTarea();
    }
  }

  borrarTarea(tarea : ITarea){
    this._tareasServices.deleteTarea(tarea.idTarea).subscribe({
      next:(data) => {
        this.obenterTareas();
      }, error(err) {
        console.log(err);
      },
    });
    
  }

  constructor (private _tareasServices : TareaService) {
    this.obenterTareas();
  }
}
