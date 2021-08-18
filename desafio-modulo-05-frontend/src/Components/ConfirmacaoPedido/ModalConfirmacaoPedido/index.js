import React from 'react';
import { useStyles } from '../Components/AddAddress/styles';
import { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';
import closeIcon from '../Assets/close-icon.svg'
import './styles.css';
import AddAddress from '../Components/AddAddress/AddAddress'
import RealCart from '../Components/RealCart/RealCart'





function EditarPerfil({ setOpenModal }) {
	const { token } = useContext(AuthContext);

	const handleClose = () => {
		setOpenModal(false)
	}

	// const lala = 0

	// const renderSteps = () => {
	// 	switch (lala) {
	// 		case "carrinho":
	// 			<RealCart />
	// 			break;
	// 		case "adicionar-endereco":
	// 			<AddAddress />
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// }


	return (

		<div className='wrapperModal'>
			<div className='font-montserrat containerModal'>
				<img src={closeIcon} className='closeModal' alt="fechar" onClick={handleClose} />
				<div className='boxContainer'>
					{/* {renderSteps} */}

				</div>
			</div>
		</div>








	)
}

export default EditarPerfil
