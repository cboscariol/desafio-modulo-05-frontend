import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import useProductsContext from '../../Hooks/useContextProducts';
import closeIcon from '../../Assets/close-icon.svg'
import ShoppingCart from '../../Assets/shopping-cart 1.png';
import './styles.css';
import User from '../../Assets/user.jpg';
import Money from '../../Assets/money-icon.svg';
import Time from '../../Assets/time-icon.svg';

function ModalCarrinho({ setOpenCarrinho }) {
	const { token } = useContext(AuthContext);
	const { confirmCart, setConfirmCart } = useProductsContext();
	const [ count, setCount ] = useState(0);
	const [ showDiv, setShowDiv ] = useState(true);
	const [ showDivImg, setShowDivImg ] = useState(false);

	function handleClose() {
		setOpenCarrinho(false)
	}

	function handleCart(){
		if(count === 0){
			return
		}

		const produto = {
			imagem: "",
			nome: "",
			quantidade: 0,
			preco: 0
		}

		setConfirmCart({...produto});
		setShowDiv(false)
		setShowDivImg(true)
	}

	function handleRemove(){
		if(count === 0){
			return
		}else {
			const newValue = count - 1;
			setCount(newValue); 
		} 
	}

	function handleAdd() {
		const newValue = count + 1;
		setCount(newValue);
	}

	return (

		<div className='wrapperModalCarrinho'>
			<div className='flex-column font-montserrat containerModalCarrinho'>
				<div className='headerModalCarrinho flex-column'>
					<img className='close-icon' src={closeIcon} alt="fechar"  onClick={() => handleClose()} />
					<img className='img-restaurante' src={User} alt='imagem restaurante' />
				</div>

				<div className='flex-row font-montserrat title'><h1>Título do modal</h1></div>

				<div className='flex-row items-center restaurant-info-carrinho'>
						<div className='flex-row items-center font-montserrat font-color-gray restaurant-info-carrinho-2'>
							<div className='div-icon'><img src={Money} alt="icon" /></div>
							<p>{`Pedido mínimo: R$20`}</p>
						</div>
						<div className='flex-row items-center font-montserrat font-color-gray restaurant-info-carrinho-2'>
							<div className='div-icon'><img src={Time} alt="icon" /></div>
							<p>{`Tempo de entrega:  minutos`}</p>
						</div>
				</div>

				<div className={showDiv ? "flex-column" : "none"}>
					<div className='flex-row restaurante-info-carrinho-3'>
						<div className='restaurante-descricao'> Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit 
							amet luctus venenatis	
						</div>
						<div className='flex-row items-center content-center preco-div'>R$90.00 </div>
					</div>

					<div className='flex-row items-center  div-contador'>
						<div className='flex-row items-center  div-contador-2'>
							<img className='' src={closeIcon} alt="fechar" onClick={()=>handleRemove()} />
							<p>{count}</p>
							<img className='' src={closeIcon} alt="fechar" onClick={()=>handleAdd()} />
						</div>

						<div className='flex-row actionButtons '>
							<button
								className='btn-orange-small font-montserrat font-color-white font-bold'
								type='submit'
								onClick={() => handleCart()}
							>
								Adicionar ao carrinho
							</button>
						</div>
					</div>
				</div>

				<div className={showDivImg? "flex-column items-center content-center div-showImg" : "none"}>
					<img src={ShoppingCart} alt='icone carrinho' />
					<p className='font-montserrat font-bold font-color-gray font-size-3'>Pedido adicionado!</p>
				</div>

				<div>
					<p>ir para a revisão do pedido</p>
				</div>
			</div>
		</div >
	)
}

export default ModalCarrinho