import type { Either } from '@/core/either'

interface RescheduleAnAppointmentUseCaseRequest {
  appointmentId: string
}

type RescheduleAnAppointmentUseCaseResponse = Either<null, {}>

export class RescheduleAnAppointmentUseCase{

}