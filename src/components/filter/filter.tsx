import React from 'react'
import { Button, ButtonGroup, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../services/store'
import { setFilter } from '../../slices/filter/filterReducer'
import { clearCompleted } from '../../slices/todo/toDoReducer'

const Filter: React.FC = () => {
	const filter = useSelector((state: RootState) => state.filter.filter)
	const dispatch = useDispatch()

	const handleFilterChange = (newFilter: 'all' | 'active' | 'completed') => {
		dispatch(setFilter(newFilter))
	}

	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between', marginY: 2 }}>
			<ButtonGroup variant='outlined' color='primary'>
				<Button
					onClick={() => handleFilterChange('all')}
					variant={filter === 'all' ? 'contained' : 'outlined'}
					data-cy='all-filter'
				>
					Все
				</Button>
				<Button
					onClick={() => handleFilterChange('active')}
					variant={filter === 'active' ? 'contained' : 'outlined'}
					data-cy='active-filter'
				>
					Активные
				</Button>
				<Button
					onClick={() => handleFilterChange('completed')}
					variant={filter === 'completed' ? 'contained' : 'outlined'}
					data-cy='completed-filter'
				>
					Выполненные
				</Button>
			</ButtonGroup>
			<Button
				variant='contained'
				color='error'
				onClick={() => dispatch(clearCompleted())}
				data-cy='clear-button'
			>
				Удалить выполненные
			</Button>
		</Box>
	)
}

export default Filter
