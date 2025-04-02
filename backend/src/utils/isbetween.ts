import * as dayjs from 'dayjs'
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(isSameOrAfter)

export function isBetween(
	date: Date | dayjs.Dayjs,
	firstDate: dayjs.Dayjs,
	secondDate: dayjs.Dayjs,
): boolean {
	const dayJs = dayjs(date)

	console.log('DATA PARA COMPARAR', dayJs.format())

	const isAfterFirstDate = dayJs.isSameOrAfter(firstDate, 'minute')
	console.log('É DEPOIS DE:', firstDate.format(), '?', isAfterFirstDate)

	const isBeforeSecondDate = dayJs.isBefore(secondDate, 'minute')
	console.log('É ANTES DE:', secondDate.format(), '?', isBeforeSecondDate)

	return isAfterFirstDate && isBeforeSecondDate
}
