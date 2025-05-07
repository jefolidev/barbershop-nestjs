import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Notification } from '@/domain/notifications/enterprise/entites/notifications'
import { InMemoryNotificationRepository } from '@/tests/repositories/in-memory-notification.repository'
import { ReadNotificationUseCase } from '../read-notification'

let inMemoryNotificationRepository: InMemoryNotificationRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeAll(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be able to read a notification', async () => {
    const notification = Notification.create({
      recipientId: new UniqueEntityId('1'),
      title: 'New notification',
      content: 'Notification content',
    })

    await inMemoryNotificationRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(inMemoryNotificationRepository.items[0]?.recipientId).toBe(
        result.value?.notification.recipientId
      )
      expect(inMemoryNotificationRepository.items[0]?.id).toBe(
        result.value?.notification.id
      )
      expect(inMemoryNotificationRepository.items[0]?.readAt).toEqual(
        expect.any(Date)
      )
    }
  })
})
