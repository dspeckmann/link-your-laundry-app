import { User } from "./user";

export interface Invitation {
    id: number;
    date: Date;
    groupOwner: User;
    invitedUser: User;
}