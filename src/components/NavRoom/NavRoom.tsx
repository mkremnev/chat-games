import React, { ChangeEvent, FC, Fragment, useState } from 'react';
import { AppBar, makeStyles, Tab, Tabs } from '@material-ui/core';
import TabPanel from '@/components/NavRoom/TabPanel';

const useStyles = makeStyles(() => ({
	appBar: {
		position: 'inherit',
		backgroundColor: 'rgba(0, 0, 0, .6)',
		minHeight: 40,
	},
	tabs: {
		minHeight: 40,
		maxWidth: 243,
		'& button': {
			minHeight: 40,
			padding: 0,
			minWidth: 50,
			marginRight: 15,
		},
		'& .MuiTabScrollButton-root': {
			width: 25,
		},
	},
}));

export const NavRoom: FC<{}> = () => {
	const classes = useStyles();
	const [roomId, setRoomId] = useState(0);

	const handleChangeRoom = (ev: ChangeEvent<{}>, index: number) => {
		ev.preventDefault();
		setRoomId(index);
	};

	const onclick = () => console.log(roomId);

	return (
		<Fragment>
			<AppBar className={classes.appBar}>
				<Tabs
					value={roomId}
					onChange={handleChangeRoom}
					variant="scrollable"
					scrollButtons="on"
					className={classes.tabs}
				>
					<Tab label="Общий" onClick={onclick} />
					<Tab label="Клан" onClick={onclick} />
					<Tab label="Друзья" onClick={onclick} />
					<Tab label="Новости" onClick={onclick} />
				</Tabs>
			</AppBar>
			<TabPanel value={roomId} index={0}>
				Общий
			</TabPanel>
			<TabPanel value={roomId} index={1}>
				Клан
			</TabPanel>
			<TabPanel value={roomId} index={2}>
				Друзья
			</TabPanel>
			<TabPanel value={roomId} index={3}>
				Новости
			</TabPanel>
		</Fragment>
	);
};
