import { Person } from "../person";

export interface GuestRead extends Person {
    phone: string;
}