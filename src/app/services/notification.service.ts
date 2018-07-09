import { Injectable } from '@angular/core';
import { Notification } from "../models/notification"

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    notifications: Array<Notification> = [];

    constructor() {

    }

    // Add notification
    add(notification: Notification) {
        this.notifications.push(notification);
    }

    // Close notification
    close(notification: Notification) {
        this.notifications = this.notifications.filter(mNotification => mNotification != notification);
    }

}
