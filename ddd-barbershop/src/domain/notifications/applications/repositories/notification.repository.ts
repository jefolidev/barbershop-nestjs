import type { Notification } from '../../enterprise/entites/notifications'

export interface NotificationRepository {
  create(notification: Notification): Promise<void>
  findByID(notificationId: string): Promise<Notification | null>
  save(notification: Notification): Promise<void>
}
