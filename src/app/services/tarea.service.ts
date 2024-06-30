import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ITarea } from '../interfaces/Tareas';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private _baseUrl : string = environment.endPoint;
  private _apiUrl : string = this._baseUrl + "TareasControllers/"

  constructor(private _http : HttpClient) { 
    
  }

  //Get para traer las tareas de la base de datos como lista
  getList() : Observable<ITarea[]>{
    return this._http.get<ITarea[]>(`${this._apiUrl}ListaTareas`)
  }

  //Post que permite añadir tareas a la base de datos
  addTarea(request: ITarea) : Observable<ITarea>{
    return this._http.post<ITarea>(`${this._apiUrl}AddTareas`,request);
  }

  //PUT para permitir modificar tareas de la base de datos
  updateTarea(request: ITarea) : Observable<void>{
    return this._http.put<void>(`${this._apiUrl}UpdateTareas?id=${request.idTarea}`,request);
  }

  //DELETE que permite eliminar tareas de la base de datos
  deleteTarea(idTarea : number) : Observable<void>{
    return this._http.delete<void>(`${this._apiUrl}DeleteTareas?id=${idTarea}`);
  }

}
