import { expect, test, describe } from '@jest/globals'

import filterReducer, {
	initialState as initialStateFilter,
	setFilter,
} from './filterReducer'

describe('Проверка корректной работы filterReducer', () => {
	test('Проверка начального состояния фильтра', () => {
		const initialState = filterReducer(undefined, { type: 'UNKNOWN_ACTION' })
		expect(initialState.filter).toBe('all')
	})

	test('Изменение фильтра на "completed"', () => {
		const state = filterReducer(initialStateFilter, setFilter('completed'))
		expect(state.filter).toBe('completed')
	})

	test('Изменение фильтра на "active"', () => {
		const state = filterReducer(initialStateFilter, setFilter('active'))
		expect(state.filter).toBe('active')
	})
})
