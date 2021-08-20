import React from 'react'
import {
	TextField,
} from '@material-ui/core';
import { useStyles } from './styles';
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../../Contexts/AuthContext';
import successIcon from '../../Assets/success-green-icon.svg'
import cartIcon from '../../Assets/yellow-cart.svg'
import './styles.css';
import { adicionaEndereco } from '../../../../Services/functions'

function AddAddress({ setShowPage }) {
	const classes = useStyles();
	const [erroSubmit, setErroSubmit] = useState()
	const { token } = useContext(AuthContext);
	const [showSuccess, setShowSuccess] = useState(false)
	const { register, getValues, handleSubmit, control, formState: { errors } } = useForm();

	const onSubmit = async () => {
		const values = getValues()
		console.log(values)
		const data =
		{
			cep: values.cep,
			complemento: values.complemento,
			endereco: values.endereco,
		}

		const result = await adicionaEndereco({ data, token });

		if (result.error) {
			setErroSubmit(result.error)
		} else {
			setShowSuccess(true)
		}

	}

	return (
		<div>
			<div className='headerModal'>
				<img src={cartIcon} alt="icone-carrinho-de-compras-amarelo" />
				<h1>Adicionar Endereço</h1>
			</div>

			<div style={{ display: showSuccess ? 'none' : 'block' }} className='contentModal align-modal-address'>

				<form onSubmit={handleSubmit(onSubmit)}>
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
						id="input-endereco"
						type='text'
						variant="outlined"
						autoComplete="off"
						error={Boolean(errors.endereco)}
						helperText={errors.endereco ? "Campo Obrigatório" : false}
						{...register('endereco', { required: true })} />

					<h3 >Complemento</h3>
					<TextField
						className={classes.formsdeCadastro}
						id="input-complemento"
						type='text'
						variant="outlined"
						autoComplete="off"
						error={Boolean(errors.complemento)}
						{...register('complemento')} />

					<div className='flex-row actionButtons '>
						<button
							className='btn-orange-small font-montserrat font-color-white'
							type='submit'
						>
							Adicionar endereço
						</button>


					</div>
				</form>
			</div>

			{/* ----------------------ENDEREÇO ADICIONADO COM SUCESSO------------------------------ */}

			<div style={{ display: showSuccess ? 'block' : 'none' }}>
				<div className='content-modal-sucess'>

					<img src={successIcon} alt="endereço-adiconado-com-sucesso" />
					<p className='font-color-gray font-size-4 font-weight-600'>Endereço adicionado com sucesso!</p>
				</div>

				<div className='flex-row actionButtons '>
					<button
						className='btn-orange-small font-montserrat font-color-white'
						type='submit'
						onClick={() => setShowPage('cart')}
					>
						Voltar para o carrinho
					</button>


				</div>
			</div>

		</div>
	)
}

export default AddAddress
