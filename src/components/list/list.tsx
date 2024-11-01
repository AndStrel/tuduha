import React from 'react'
import {
	List,
	ListItem,
	ListItemText,
	Checkbox,
	IconButton,
	Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch } from '../../services/store'
import { toggleTodo, deleteTodo } from '../../slices/todo/toDoReducer'

export type Task = {
	id: number
	text: string
	completed: boolean
}

type TaskListProps = {
	tasks: Task[]
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
	const dispatch = useDispatch()

	if (tasks.length === 0) {
		return (
			<Typography
				variant='h6'
				color='textSecondary'
				sx={{ textAlign: 'center', marginY: 2 }}
				data-cy='task-list'
			>
				Бездельничаем
			</Typography>
		)
	}

	return (
		<List data-cy='task-list'>
			{tasks.map((task) => (
				<ListItem
					key={task.id}
					sx={{ display: 'flex', alignItems: 'center' }}
					className={task.completed ? 'completed' : ''}
					data-cy='task-item'
				>
					<Checkbox
						checked={task.completed}
						onChange={() => dispatch(toggleTodo(task.id))}
						data-cy='task-checkbox'
						color='primary'
					/>
					<ListItemText
						primary={task.text}
						data-cy='task-text'
						sx={{
							textDecoration: task.completed ? 'line-through' : 'none',
							flexGrow: 1,
						}}
					/>
					<IconButton
						onClick={() => dispatch(deleteTodo(task.id))}
						data-cy='delete-button'
						color='error'
					>
						<DeleteIcon />
					</IconButton>
				</ListItem>
			))}
		</List>
	)
}

export default TaskList
