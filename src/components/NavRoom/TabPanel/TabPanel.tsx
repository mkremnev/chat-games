import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

export const TabPanel: FC<TabPanelProps> = (props: TabPanelProps) => {
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
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
};
