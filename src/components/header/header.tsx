import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'

const Header: React.FC = () => {
	return (
		<AppBar position='static' color='primary'>
			<Toolbar>
				<Typography
					variant='h5'
					component='div'
					sx={{ flexGrow: 1 }}
					align='center'
				>
					Тудухи
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

export default Header
