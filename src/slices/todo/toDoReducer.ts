import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Todo {
	id: number
	text: string
	completed: boolean
}

export const initialState: Todo[] = []

const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<string>) => {
			state.push({ id: Date.now(), text: action.payload, completed: false })
		},
		toggleTodo: (state, action: PayloadAction<number>) => {
			const todo = state.find((todo) => todo.id === action.payload)
			if (todo) {
				todo.completed = !todo.completed
			}
		},
		deleteTodo: (state, action: PayloadAction<number>) => {
			return state.filter((todo) => todo.id !== action.payload)
		},
		clearCompleted: (state) => {
			return state.filter((todo) => !todo.completed)
		},
	},
})

export const { addTodo, toggleTodo, deleteTodo, clearCompleted } =
	todoSlice.actions
export default todoSlice.reducer
