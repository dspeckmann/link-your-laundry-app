import { User } from "./user";
import { LaundryTemplate } from "./laundry-template";

export interface ActiveLaundry {
    id?: number;
    user: User;
    laundryTemplate: LaundryTemplate;
    washStartTime: Date;
    dryStartTime: Date;
    completed: boolean;
}