import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';
import closeIcon from '../Assets/close-icon.svg'
import './styles.css';
import AddAddress from '../Components/AddAddress/AddAddress'
import RealCart from '../Components/RealCart/RealCart'
import RSC from "react-scrollbars-custom";


function ConfirmacaoPedido({ setOpenRevisaoPedido, setOpenCarrinho, setProdutoEscolhido }) {
	const { token } = useContext(AuthContext);
	const [showPage, setShowPage] = useState("cart")

	const handleClose = () => {
		setOpenRevisaoPedido(false)
	}

	return (

		<div className='wrapperModal'>
			<div className='font-montserrat containerModal'>
				<RSC id="RSC-Example" style={{ width: "100%", height: "90vh" }}>
					<img src={closeIcon} className='closeModal' alt="fechar" onClick={handleClose} />
					<div className='boxContainer'>
						{showPage === "cart" ?
							<RealCart closeRevisaoPedido={handleClose} setShowPage={setShowPage} setOpenCarrinho={setOpenCarrinho} setProdutoEscolhido={setProdutoEscolhido} />
							:
							<AddAddress setShowPage={setShowPage} />}
					</div>
				</RSC>
			</div>
		</div>
	)
}

export default ConfirmacaoPedido
