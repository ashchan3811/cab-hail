import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ISlot } from '../data.model';
import { AppService } from '../app.service';

@Component({
    selector: 'app-edit-time-slot',
    templateUrl: './edit-time-slot.component.html',
    styleUrls: ['./edit-time-slot.component.scss'],
})
export class EditTimeSlotComponent implements OnInit {
    slot!: ISlot;

    is_admin = false;

    constructor(
        public dialogRef: MatDialogRef<EditTimeSlotComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { slot: ISlot },
        private snackbar: MatSnackBar,
        private appService: AppService
    ) {
        this.slot = this.data.slot;
        this.is_admin = this.appService.is_admin;
    }

    ngOnInit(): void {
        console.log(this.data);
    }

    remove(index: number) {
        this.slot.booking_persons.splice(index, 1);
        this.snackbar.open('Removed!', 'Close');
    }

    add() {
        this.slot.booking_persons = this.slot.booking_persons || [];

        if (this.slot.booking_persons.length < 4) {
            this.slot.booking_persons.push({
                _id: '',
                name: '',
                phone: '',
                is_new: true,
            });
        } else {
            this.snackbar.open('Max 4 persons allowed!', 'Close');
        }
    }

    save(index: number) {
        const x = this.slot.booking_persons[index];
        if (x) {
            if (x.name) {
                x.is_new = false;
                this.snackbar.open('Saved!', 'Close');
            } else {
                this.snackbar.open('Please provide name and phone', 'Close');
            }
        }
    }

    cancel() {
        this.dialogRef.close(null);
    }

    ok() {
        const isValid = this.slot.booking_persons.every((a) => a.name);
        if (isValid) {
            this.dialogRef.close({ ...this.slot });
        } else {
            this.snackbar.open('Invalid data. Please provide valid data and try to save again! ', 'Close');
        }
    }
}
