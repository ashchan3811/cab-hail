import { Component, OnInit } from '@angular/core';
import { ISlot } from './data.model';
import { DataService } from './data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTimeSlotComponent } from './edit-time-slot/edit-time-slot.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'cab-hail';

    slots: ISlot[] = [];

    constructor(private dataService: DataService, private dialog: MatDialog, private snackbar: MatSnackBar) {}

    ngOnInit(): void {
        this.dataService.getSlots().subscribe((data) => {
            this.slots = data;

            this.processSlots();
        });
    }

    edit(slot: ISlot, index: number) {
        this.dialog
            .open(EditTimeSlotComponent, {
                data: {
                    slot: JSON.parse(JSON.stringify(slot)),
                },
                width: '500px',
            })
            .afterClosed()
            .subscribe((response) => {
                if (response) {
                    this.slots[index] = JSON.parse(JSON.stringify(response));

                    this.snackbar.open('Updated!', 'Close');

                    this.processSlots();
                }
            });
    }

    processSlots() {
        this.slots.forEach((a) => {
            a.booking_persons = a.booking_persons || [];
            a.style_name = `slot-${a.booking_persons.length}`;
        });
    }
}
