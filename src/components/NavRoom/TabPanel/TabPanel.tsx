import React, { ChangeEvent, FC } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
	onScroll: (ev: ChangeEvent<HTMLElement>) => void;
}

const useStyles = makeStyles(() => ({
	root: {
		padding: '0 10px',
		height: 320,
		color: '#fff',
		overflowY: 'scroll',
		'&::-webkit-scrollbar': {
			width: 0,
		},
	},
}));

export const TabPanel: FC<TabPanelProps> = (props: TabPanelProps) => {
	const classes = useStyles();
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`wrapped-tabpanel-${index}`}
			aria-labelledby={`wrapped-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3} className={classes.root}>
					{children}
				</Box>
			)}
		</div>
	);
};
