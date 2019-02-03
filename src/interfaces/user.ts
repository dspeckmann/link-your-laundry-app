import { Invitation } from "./invitation";

export interface User {
    id: number;
    username: string;
    email: string;
    groupOwnerId?: number;
    groupOwner?: User;
    groupMembers: User[];
    pendingActiveInvitations: Invitation[];
    pendingPassiveInvitations: Invitation[];
}