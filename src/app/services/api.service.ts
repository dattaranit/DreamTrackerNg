import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditModel } from '../models/EditModel';
import { Record } from '../models/Record';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "http://localhost:3000/goal"
  constructor(private http: HttpClient) { }

  getRecords() {
    return this.http.get<Record[]>(`${this.baseUrl}`)
  }

  updateRecord(edit: EditModel, id: number) {
    return this.http.put<EditModel>(`${this.baseUrl}/${id}`, edit)
  }

  getRecordId(id: number) {
    return this.http.get<EditModel>(`${this.baseUrl}/${id}`)
  }

  postRecord(addObj: Record) {
    return this.http.post<Record>(`${this.baseUrl}`, addObj)
  }

  deleteRecord(id: number) {
    return this.http.delete<Record>(`${this.baseUrl}/${id}`)
  }

}