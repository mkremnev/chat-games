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
		'& .MuiTab-textColorInherit': {
			color: '#23B838',
		},
		'& .Mui-selected': {
			color: '#FFFFFF',
		},
		'& .MuiTabs-indicator': {
			backgroundColor: '#23B838',
		},
	},
}));

export type NavRoomProp = {
	commonElement: React.ReactElement<any, any>;
};

export const NavRoom: FC<NavRoomProp> = ({ commonElement }) => {
	const classes = useStyles();
	const [roomId, setRoomId] = useState(0);

	const handleChangeRoom = (ev: ChangeEvent<{}>, index: number) => {
		ev.preventDefault();
		setRoomId(index);
	};

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
					<Tab label="Общий" />
					<Tab label="Клан" />
					<Tab label="Друзья" />
					<Tab label="Новости" />
				</Tabs>
			</AppBar>
			<TabPanel value={roomId} index={0}>
				{commonElement}
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
