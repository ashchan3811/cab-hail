import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISlot } from './data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getSlots() {
    return this.httpClient.get<ISlot[]>('assets/data.json');
  }
}
