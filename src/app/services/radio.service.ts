import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class RadioService {
  radioList: AngularFireList<any>;

  // selectedRadio: Category = new Category();

  constructor(private firebase: AngularFireDatabase) { }

  getRadios() {
    return this.radioList = this.firebase.list('radios',ref => ref.orderByChild('Orden'));
  }
}
