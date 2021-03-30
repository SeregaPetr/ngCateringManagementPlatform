import { Person } from "../person";

export interface GuestCreate extends Person {
    phone: string;
}