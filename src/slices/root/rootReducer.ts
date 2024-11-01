import { combineReducers } from '@reduxjs/toolkit'
import todoReducer from '../todo/toDoReducer'
import filterReducer from '../filter/filterReducer'

const rootReducer = combineReducers({
	todo: todoReducer,
	filter: filterReducer,
})

export default rootReducer
