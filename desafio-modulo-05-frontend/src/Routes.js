import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Contexts/AuthContext'
import AuthProvider from './Contexts/AuthContext';
import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import Restaurantes from './Pages/Restaurantes';
import { ProductsProvider } from './Contexts/ProductsContext';
import Modal from './Components/ConfirmacaoPedido/ModalConfirmacaoPedido'

function RotasProtegidas(props) {
	const { token } = useContext(AuthContext);

	return (
		<Route render={() => (token ? props.children : <Redirect to='/' />)} />
	)
}

function Routes() {
	return (
		<AuthProvider>
			<Router>
				<Switch>
					<Route path="/" exact component={Login} />
					<Route path="/cadastro" exact component={Cadastro} />
					<Route path="/modal" exact component={Modal} />

					<RotasProtegidas >
						<ProductsProvider>
							<Route path="/restaurantes" exact component={Restaurantes} />
						</ProductsProvider>
					</RotasProtegidas>
				</Switch>
			</Router>
		</AuthProvider>
	)
}

export default Routes;

