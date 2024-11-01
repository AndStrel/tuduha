import { expect, test, describe } from '@jest/globals'
import rootReducer from './rootReducer'
import { initialState as filterSlice } from '../filter/filterReducer'
import { initialState as todoSlice } from '../todo/toDoReducer'

describe('Проверяем корректность работы rootReducer.', () => {
	test('Проверка корректного начального состояния при неизвестном экшене', () => {
		// вызываем rootReducer с undefined состоянием и неизвестным экшеном
		const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' })
		// получаем начальное состояние для всех редюсеров

		expect(initialState.filter).toEqual(filterSlice)
		expect(initialState.todo).toEqual(todoSlice)
	})
})
