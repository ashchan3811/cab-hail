import { Component, OnInit } from '@angular/core';
import { ISlot } from './data.model';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'cab-hail';

  slots: ISlot[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getSlots().subscribe((data) => {
      this.slots = data;
    });
  }
}
