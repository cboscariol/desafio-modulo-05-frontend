import React from 'react';
import useStyles from './styles';
import './style.css'
import { useState, useContext } from 'react';
import logoLogin from '../../Assets/logo-login.png'
import InputSenha from '../../Components/InputSenha/inputSenha';
import {
	Card,
	CardContent,
	TextField
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';



export default function Login() {
	const { setToken } = useContext(AuthContext)
	const classes = useStyles();
	const history = useHistory();
	const [error, setError] = useState(false)
	const { register, handleSubmit, formState: { errors } } = useForm()
	const [showRegisterSuccess, setShowRegisterSuccess] = useState(() =>
		history.location.state && history.location.state.registerSuccess
	)


	async function onSubmit(data) {


		setError(false);



		fetch('https://icubus-clientes.herokuapp.com/login', {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				'Content-type': 'application/json'
			}
		}).then(async (res) => {
			const data = await res.json()

			if (res.status > 299) {

				setError(data)
			} else {
				setToken(data.token)
				history.push('/restaurantes')
			}
		});
	}

	const handleCloseAlert = () => {
		history.replace('/')
		setShowRegisterSuccess(false)
	}

	const handleCloseErrorAlert = () => {
		setError('')
	}


	return (
		<div className={classes.container}>

			<Card className={classes.cardLogin}>
				<CardContent >
					{showRegisterSuccess && (
						<Alert severity="success" variant="filled" onClose={handleCloseAlert}>
							Cadastro efetuado com sucesso
						</Alert>
					)}
					{Boolean(error) && (
						<Alert severity="error" variant="filled" onClose={handleCloseErrorAlert}>
							{error}
						</Alert>
					)}
					<div className='header-login'>
						<h1 className='loginTitle font-baloo'>Login</h1>
						<img src={logoLogin} alt="logo-barril" />
					</div>

					<form className={classes.formsLogin} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
						<div className={classes.formsLogin}>
							<h2 className='placeholderLogin font-montserrat'>Email</h2>
							<TextField
								id="input-email"
								type='email'
								variant="outlined"
								error={Boolean(errors.email)}
								helperText={errors.email ? "Campo Obrigatório" : false}
								{...register('email', { required: true })}
							/>
						</div>
						<div className={classes.formsLogin}>
							<h2 className='placeholderLogin font-montserrat'>Senha</h2>
							<InputSenha
								error={errors.senha ? "Campo Obrigatório" : false}
								register={() => register('senha', { required: true })}
								id="inputSenhaLogin" />
						</div>
						<button className="buttonLogin" type="submit">
							Entrar
						</button>
					</form>
					<div className={classes.linkcadastrese}>
						<span className='linkLogin'>Ainda não tem uma conta? <a href="/cadastro" >Cadastre-se </a> </span>

					</div>
				</CardContent>
			</Card>
		</div>

	);
}
