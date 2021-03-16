import React, { FC } from 'react';
import { Container, makeStyles, Theme } from '@material-ui/core';
import Chat from '@/modules/Chat';
import bgImage from './assets/coc_game_ui_update 1.png';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		maxWidth: '100vw',
		height: '100vh',
		background: `url(${bgImage}) center center /auto no-repeat`,
		position: 'relative',
	},
}));

const App: FC<{}> = () => {
	const classes = useStyles();
	return (
		<Container className={classes.root}>
			<Chat />
		</Container>
	);
};

export default App;
