export interface ISlot {
    _id: number;
    name: string;
    booking_persons: Array<ISlotBookingPerson>;
    style_name?: string;
}

export interface ISlotBookingPerson {
    _id: string;
    name: string;
    phone: string;
    is_new?: boolean;
}
