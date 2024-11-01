import React, { useState } from 'react'
// import styles from './Input.module.scss'
import { useDispatch } from '../../services/store'
import { addTodo } from '../../slices/todo/toDoReducer'
import { TextField, Button, Box } from '@mui/material'
const Input: React.FC = () => {
	const [task, setTask] = useState('')
	const dispatch = useDispatch()
	const handleAddTask = () => {
		if (task.trim()) {
			dispatch(addTodo(task))
			setTask('')
		}
	}

	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			dispatch(addTodo(task))
		}
	}

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', marginY: 2 }}>
			<TextField
				variant='outlined'
				label='Что нужно сделать?'
				value={task}
				onChange={(e) => setTask(e.target.value)}
				onKeyDown={handleKeyPress}
				sx={{ flexGrow: 1, marginRight: 2 }}
				data-cy='task-input'
			/>
			<Button
				variant='contained'
				color='primary'
				onClick={handleAddTask}
				data-cy='add-button'
			>
				Добавить
			</Button>
		</Box>
	)
}

export default Input

// />
// <button
// 	onClick={handleAddTask}
// 	className={styles.addButton}
