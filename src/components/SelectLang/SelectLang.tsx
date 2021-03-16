import React, { FC } from 'react';
import {
	makeStyles,
	Theme,
	createStyles,
	withStyles,
} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { InputBase } from '@material-ui/core';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			position: 'absolute',
			top: 10,
			right: 70,
			fontSize: '0.8em',
			'& div': {
				paddingRight: '0 !important',
			},
			'& svg': {
				color: 'white',
				fontSize: '1.5em',
				width: '0.8em',
				height: '0.8em',
			},
		},
	}),
);

const BootstrapInput = withStyles(() => ({
	root: {
		borderRadius: 10,
	},
	input: {
		color: 'white',
		borderRadius: 10,
		position: 'relative',
		fontSize: '0.8em',
		padding: 0,
		width: 20,
		'&:focus': {
			outline: 'none',
			border: 'none',
			boxShadow: 'none',
			background: 'none',
		},
	},
}))(InputBase);

export const SelectLang: FC<{}> = () => {
	const classes = useStyles();
	const [lang, handleChangeLang] = React.useState<string | number>('RU');

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		handleChangeLang(event.target.value as string);
	};

	return (
		<FormControl className={clsx(classes.formControl)}>
			<Select
				id="lists"
				value={lang}
				onChange={handleChange}
				input={<BootstrapInput />}
				IconComponent={() => <ExpandMoreIcon />}
			>
				<MenuItem value="RU">RU</MenuItem>
				<MenuItem value="EN">EN</MenuItem>
				<MenuItem value="ZHO">ZHO</MenuItem>
			</Select>
		</FormControl>
	);
};
