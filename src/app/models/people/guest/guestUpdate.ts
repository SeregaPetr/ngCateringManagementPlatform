import { Person } from "../person";

export interface GuestUpdate extends Person {
    id: number;
    phone: string;
}