import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { routes } from '@/routes';

const App: FC<{}> = () => (
	<Router>
		<Container>
			<Switch>
				{routes.map(({ path, Component }) => (
					<Route key={path} path={path} exact>
						<Component />
					</Route>
				))}
			</Switch>
		</Container>
	</Router>
);

export default App;
