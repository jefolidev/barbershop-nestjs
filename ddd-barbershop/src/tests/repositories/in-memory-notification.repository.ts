import type { NotificationRepository } from '@/domain/notifications/applications/repositories/notification.repository'
import type { Notification } from '@/domain/notifications/enterprise/entites/notifications'

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }
}
