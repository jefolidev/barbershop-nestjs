import type { NotificationRepository } from '@/domain/notifications/applications/repositories/notification.repository'
import type { Notification } from '@/domain/notifications/enterprise/entites/notifications'

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async findByID(notificationId: string): Promise<Notification | null> {
    const notification = this.items.find(
      (notification) => notification.id.toString() === notificationId
    )

    return notification ?? null
  }

  async save(notification: Notification): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === notification.id
    )

    this.items[itemIndex] === notification
  }
}
