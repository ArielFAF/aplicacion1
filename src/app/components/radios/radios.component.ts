import { Component, OnInit } from '@angular/core';

// Services
import { RadioService } from "../../services/radio.service";

// Class Category
import { Radio } from '../../models/radio';

@Component({
  selector: 'app-radios',
  templateUrl: './radios.component.html',
  styleUrls: ['./radios.component.css']
})
export class RadiosComponent implements OnInit {
  radioList: Radio[];

  constructor(private radioService: RadioService) { }

  ngOnInit() {
    this.radioService.getRadios()
    .snapshotChanges()
    .subscribe(item => {
      this.radioList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['Nombre'] = element.key;
        if(x['Activa']) {
          this.radioList.push(x as Radio);
        }
      });

    });
  }

}
