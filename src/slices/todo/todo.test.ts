import { expect, test, describe } from '@jest/globals'
import toDoReducer, {
	addTodo,
	toggleTodo,
	deleteTodo,
	clearCompleted,
} from './toDoReducer'

describe('Проверка корректной работы toDoReducer', () => {
	test('Проверка начального состояния', () => {
		const initialState = toDoReducer(undefined, { type: 'UNKNOWN_ACTION' })
		expect(initialState).toEqual([])
	})

	test('Добавление новой задачи', () => {
		const state = toDoReducer([], addTodo('Новая задача'))
		expect(state).toHaveLength(1)
		expect(state[0]).toEqual({
			id: expect.any(Number),
			text: 'Новая задача',
			completed: false,
		})
	})

	test('Переключение состояния задачи', () => {
		const initialState = [{ id: 1, text: 'Задача 1', completed: false }]
		const state = toDoReducer(initialState, toggleTodo(1))
		expect(state[0].completed).toBe(true)
	})

	test('Удаление задачи', () => {
		const initialState = [
			{ id: 1, text: 'Задача 1', completed: false },
			{ id: 2, text: 'Задача 2', completed: false },
		]
		const state = toDoReducer(initialState, deleteTodo(1))
		expect(state).toHaveLength(1)
		expect(state[0].id).toBe(2)
	})

	test('Очистка завершенных задач', () => {
		const initialState = [
			{ id: 1, text: 'Задача 1', completed: true },
			{ id: 2, text: 'Задача 2', completed: false },
		]
		const state = toDoReducer(initialState, clearCompleted())
		expect(state).toHaveLength(1)
		expect(state[0].id).toBe(2)
	})
})
