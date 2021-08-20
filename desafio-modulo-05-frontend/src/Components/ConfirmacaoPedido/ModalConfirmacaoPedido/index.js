import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';
import closeIcon from '../Assets/close-icon.svg'
import './styles.css';
import AddAddress from '../Components/AddAddress/AddAddress'
import RealCart from '../Components/RealCart/RealCart'





function ConfirmacaoPedido({ setOpenRevisaoPedido }) {
	const { token } = useContext(AuthContext);
	const [showPage, setShowPage] = useState("cart")

	const handleClose = () => {
		setOpenRevisaoPedido(false)
	}

	useEffect(() => {
		console.log(showPage)
	}, [])




	return (

		<div className='wrapperModal'>
			<div className='font-montserrat containerModal'>
				<img src={closeIcon} className='closeModal' alt="fechar" onClick={handleClose} />
				<div className='boxContainer'>
					{showPage === "cart" ? <RealCart setShowPage={setShowPage} /> : <AddAddress setShowPage={setShowPage} />}
				</div>
			</div>
		</div>








	)
}

export default ConfirmacaoPedido
