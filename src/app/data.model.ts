export interface ISlot {
  _id: number;
  name: string;
  booking_persons: Array<ISlotBookingPerson>;
}

export interface ISlotBookingPerson {
  _id: string;
  name: string;
  phone: string;
}
