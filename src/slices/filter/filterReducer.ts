import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Filter = 'all' | 'active' | 'completed'

interface FilterState {
	filter: Filter
}

export const initialState: FilterState = {
	filter: 'all',
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setFilter: (state, action: PayloadAction<Filter>) => {
			state.filter = action.payload
		},
	},
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
