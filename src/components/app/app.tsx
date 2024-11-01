import Header from '../header/header'
import Input from '../input/input'
import TaskList from '../list/list'
import Filter from '../filter/filter'
import { RootState, useSelector } from '../../services/store'

export const App = () => {
	const tasks = useSelector((state: RootState) => state.todo)
	const filter = useSelector((state: RootState) => state.filter.filter)

	const filteredTasks = tasks.filter((task) => {
		if (filter === 'all') return true
		if (filter === 'active') return !task.completed
		if (filter === 'completed') return task.completed
		return true
	})

	return (
		<>
			<Header />
			<Input />
			<TaskList tasks={filteredTasks} />
			<Filter />
		</>
	)
}
