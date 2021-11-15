import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Item} from "./interfaces";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class ItemService {

  cartItems: Item[] = []

  constructor(private http: HttpClient) {}

  getAll(): Observable<Item[]> {
    return this.http.get(`${environment.fbDbUrl}/.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key
          }))
      }))
  }

  addItem(item) {
    this.cartItems.push(item)
  }
}
