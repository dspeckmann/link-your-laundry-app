import { User } from "./user";
import { LaundryTemplate } from "./laundry-template";
import { LaundryStatus } from "./laundry-status";

export interface ActiveLaundry {
    id?: number;
    user: User;
    laundryTemplate: LaundryTemplate;
    washStartTime: Date;
    dryStartTime?: Date;
    completed: boolean;
    timeLeft?: Date;
    status?: LaundryStatus;
}