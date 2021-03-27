import React, { FC } from 'react';
import {
	Container,
	createMuiTheme,
	CssBaseline,
	makeStyles,
	ThemeProvider,
} from '@material-ui/core';
import { Provider } from 'react-redux';
import Chat from '@/modules/Chat';
import bgImage from './assets/coc_game_ui_update 1.png';
import RubikLatin from '@/assets/fonts/rubik-v12-latin-regular.woff2';
import RubikCyrillic from '@/assets/fonts/rubik-v12-cyrillic-regular.woff2';
import { store } from './store';

const latin = {
	fontFamily: 'RubikLatin',
	fontStyle: 'normal',
	fontWeight: 400,
	src: `
		local('Rubik'),
		url(${RubikLatin}) format('woff2')
	`,
};

const cyrillic = {
	fontFamily: 'RubikCyrillic',
	fontStyle: 'normal',
	fontWeight: 400,
	src: `
		local('Rubik'),
		url(${RubikCyrillic}) format('woff2')
	`,
};

const theme = createMuiTheme({
	typography: {
		fontFamily: 'RubikLatin, RubikCyrillic',
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'@font-face': [latin, cyrillic],
			},
		},
	},
});

const useStyles = makeStyles(() => ({
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
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Container className={classes.root}>
					<Chat />
				</Container>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
