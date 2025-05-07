import type { Notification } from '../../enterprise/entites/notifications'

export interface NotificationRepository {
  create(notification: Notification): Promise<void>
}
