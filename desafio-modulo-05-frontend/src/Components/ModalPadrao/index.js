import React from 'react';
import {
	TextField,
	MenuItem,
	CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import InputSenha from '../InputSenha/inputSenha'
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { getCategorias, getProfileDetails, putEditProfile } from '../../Services/functions';
import './styles.css';



function EditarPerfil() {
	const { token } = useContext(AuthContext);


	return (

		<div className='wrapperModal'>
			<div className='font-montserrat containerModal'>
				<div className='headerModal'>
					<h1>Título do modal</h1>
				</div>



				<div className='flex-row actionButtons '>
					<button
						className='btn-orange-small font-montserrat font-color-white'
						type='submit'
						onClick={''}
					>
						texto do botão
					</button>
				</div>



			</div>
		</div >
	)
}

export default EditarPerfil
