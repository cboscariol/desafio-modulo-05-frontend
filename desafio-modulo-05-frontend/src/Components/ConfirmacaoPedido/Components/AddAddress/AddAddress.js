import React from 'react'
import {
	TextField,
	MenuItem,
	CircularProgress,
} from '@material-ui/core';
import { useStyles } from './styles';
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../../Contexts/AuthContext';
import successIcon from '../../Assets/success-green-icon.svg'
import cartIcon from '../../Assets/yellow-cart.svg'
import './styles.css';

function AddAddress() {
	const classes = useStyles();
	const { register, handleSubmit, watch, control, formState: { errors } } = useForm();

	return (
		<div>
			<div className='headerModal'>
				<img src={cartIcon} alt="icone-carrinho-de-compras-amarelo" />
				<h1>Adicionar Endereço</h1>
			</div>

			<div className='contentModal'>

				<form action="">
					<h3 >CEP</h3>
					<Controller
						control={control}
						name="cep"
						render={({ field }) => (
							<InputMask
								mask="99999-999"
								{...register('cep', { required: true })}
								maskChar={null}
								{...field}
							>
								{(maskProps) => (
									<TextField
										className={classes.formsdeCadastro}
										id="input-cep"
										type='text'
										variant="outlined"
										placeholder='xxxxx-xxx'
										autoComplete="off"
										error={Boolean(errors.cep)}
										helperText={errors.cep ? "Campo Obrigatório" : false}
										{...maskProps} />
								)}
							</InputMask>

						)}
					/>
					<h3 >Endereço</h3>
					<TextField
						className={classes.formsdeCadastro}
						id="input-email"
						type='email'
						variant="outlined"
						autoComplete="off"
						error={Boolean(errors.email)}
						helperText={errors.email ? "Campo Obrigatório" : false}
						{...register('email', { required: true })} />

					<h3 >Complemento</h3>
					<TextField
						className={classes.formsdeCadastro}
						id="input-email"
						type='email'
						variant="outlined"
						autoComplete="off"
						error={Boolean(errors.email)}
						helperText={errors.email ? "Campo Obrigatório" : false}
						{...register('email', { required: true })} />

					<div className='flex-row actionButtons '>
						<button
							className='btn-orange-small font-montserrat font-color-white'
							type='submit'
							onClick={''}
						>
							Adicionar endereço
						</button>


					</div>
				</form>
			</div>

			{/* ----------------------ENDEREÇO ADICIONADO COM SUCESSO------------------------------ */}

			<div className='content-modal-sucess'>

				<img src={successIcon} alt="endereço-adiconado-com-sucesso" />
				<p className='font-color-gray font-size-4 font-weight-600'>Endereço adicionado com sucesso!</p>
			</div>

			<div className='flex-row actionButtons '>
				<button
					className='btn-orange-small font-montserrat font-color-white'
					type='submit'
					onClick={''}
				>
					Voltar para o carrinho
				</button>


			</div>

		</div>
	)
}

export default AddAddress
