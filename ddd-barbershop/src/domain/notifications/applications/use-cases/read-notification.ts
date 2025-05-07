import { left, right, type Either } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { NotFoundError } from '@/core/errors/resource-not-found-error'
import { Notification } from '../../enterprise/entites/notifications'
import { NotificationRepository } from '../repositories/notification.repository'

interface ReadNotificationUseCaseRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationUseCaseResponse = Either<
  NotAllowedError | NotFoundError,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationRepository.findByID(notificationId)

    if (!notification) return left(new NotFoundError('Notification not found.'))

    if (recipientId !== notification.recipientId.toString())
      return left(
        new NotAllowedError(
          "You're not allowed to read notification from another user."
        )
      )

    notification.read()
    await this.notificationRepository.save(notification)

    return right({
      notification,
    })
  }
}
