import { User } from "./user";

export interface LaundryTemplate {
    id?: number;
    user?: User;
    name: string;
    detergent: string;
    washCycle: string;
    washDuration: string;
    dryCycle: string;
    dryDuration: string;
}