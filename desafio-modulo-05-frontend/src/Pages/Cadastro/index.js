import React, { useState } from 'react'
import { useStyles } from './styles';
import './styles.css'
import {
	TextField,
	Button,
	Typography,
} from '@material-ui/core';
import InputSenha from '../../Components/InputSenha/inputSenha'
import { useForm } from "react-hook-form";
import cadastroPic from '../../Assets/cadastroPic.png'
import logo from '../../Assets/Logo.png'
import { useHistory } from 'react-router-dom';

function Cadastro() {
	const classes = useStyles();
	const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const [error, setError] = useState(false)
	const history = useHistory()

	async function salvarCadastro(data) {
		setError(false);
		console.log(data)

		if (data.senha !== data.senhaRepetida) {
			return
		}


		fetch('https://icubus.herokuapp.com/usuarios', {
			method: "POST",
			body: JSON.stringify({
				"nome": data.nome,
				"email": data.email,
				"telefone": toString(data.telefone),
				"senha": data.senha,
			}
			),
			headers: {
				'Content-type': 'application/json'
			}
		}).then(async (res) => {
			const data = await res.json()

			if (res.status > 299) {
				setError(data)
			} else {
				history.push('/', {
					registerSuccess: true
				})
			}
		});
	}


	return (
		<div className='container'>
			<div className="cadastroPic">
				<img src={cadastroPic} className='cadastroPic' alt="" />
				<img src={logo} className='cadastroLogo' alt="" />
			</div>
			<div className='cardCadastro'>
				<h1>Cadastro</h1>
				<div className='formsCadastro'>
					<form onSubmit={handleSubmit(salvarCadastro)} id="cadastro-form">
						<Typography >Nome de usuário</Typography>
						<TextField
							className={classes.formsdeCadastro}
							id="input-nome"
							type='text'
							variant="outlined"
							autoComplete="off"
							error={Boolean(errors.nome)}
							helperText={errors.nome ? "Campo Obrigatório" : false}
							{...register('nome', { required: true })} />

						<Typography >Email</Typography>
						<TextField
							className={classes.formsdeCadastro}
							id="input-email"
							type='email'
							variant="outlined"
							autoComplete="off"
							error={Boolean(errors.email)}
							helperText={errors.email ? "Campo Obrigatório" : false}
							{...register('email', { required: true })} />

						<Typography >Telefone</Typography>
						<TextField
							className={classes.formsdeCadastro}
							id="input-telefone"
							type='text'
							variant="outlined"
							autoComplete="off"
							error={Boolean(errors.telefone)}
							helperText={errors.telefone ? "Campo Obrigatório" : false}
							{...register('telefone', { required: true })} />

						<Typography >Senha</Typography>
						<InputSenha
							className={classes.formsdeCadastro}
							register={() => register('senha', { required: true })}
							id="inputSenhaCadastro"
							error={errors.senha && errors.senha.message}
							helperText={errors.senha ? "Campo Obrigatório" : false} />

						<Typography >Repita sua senha</Typography>
						<InputSenha
							className={classes.formsdeCadastro}
							error={errors.senhaRepetida && errors.senhaRepetida.message}
							register={() => register('senhaRepetida', {
								required: true,
								validate: (value) => value === watch('senha') || "Senhas não conferem"
							})}
							id="inputSenhaRepetidaCadastro" />
					</form>

					<div className='containerButtonCadastro'>
						<Button className={classes.buttonCadastro} variant="contained" type="submit" form="cadastro-form">
							Criar conta
						</Button>
						<span className='linkCadastro'>Já tem uma conta? <a href="/" >Login </a> </span>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Cadastro
