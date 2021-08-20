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


function ModalCarrinho({ setOpenCarrinho, produto, setOpenRevisaoPedido }) {
	const { token } = useContext(AuthContext);
	const [erro, setErro] = useState('');
	const { confirmCart, setConfirmCart, restaurante } = useProductsContext();
	const [count, setCount] = useState(0);
	const [showDiv, setShowDiv] = useState(true);
	const [showDivImg, setShowDivImg] = useState(false);
	console.log(produto, 'carrinho produto')
	function handleClose() {
		setOpenCarrinho(false)
	}

	function handleCart() {
		const carrinhoAtual = [...confirmCart]

		if (count === 0) {
			return
		}

		if (confirmCart.length > 0) {
			if (restaurante.id !== confirmCart[0].idRestaurante) {
				return setErro('Não é possível adicionar produtos de restaurantes diferentes no mesmo pedido')
			}
		}

		const produtoExiste = carrinhoAtual.find((p) => p.id === produto.id);

		if (produtoExiste) {
			produtoExiste.quantidade += count;

			setConfirmCart(carrinhoAtual)
			setShowDiv(false)
			setShowDivImg(true)
			return
		}

		const precoTotalProduto = produto.preco * count;

		const produtoCart = {
			imagem: produto.imagem,
			nome: produto.nome,
			quantidade: count,
			preco: produto.preco,
			precoTotal: precoTotalProduto,
			id: produto.id,
			idRestaurante: restaurante.id
		}

		const newCart = confirmCart;
		newCart.push(produtoCart);
		setConfirmCart([...newCart]);


		setShowDiv(false)
		setShowDivImg(true)
	}

	function handleRemove() {
		if (count === 0) {
			return
		} else {
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
				<div className='headerModalCarrinho flex-column' style={{ backgroundImage: `url(${produto.imagem})`, backgroundPosition: 'center center' }}>
					<img className='close-icon' src={closeIcon} alt="fechar" onClick={() => handleClose()} />
					<img className='img-restaurante' src={User} alt='imagem restaurante' />
				</div>

				<div className='flex-row font-montserrat title'><h1>{produto.nome}</h1></div>

				<div className='flex-row items-center restaurant-info-carrinho'>

					<div className='flex-row items-center font-montserrat font-color-gray restaurant-info-carrinho-2'>
						<div className='div-icon'><img src={Money} alt="icon" /></div>
						<p>{`Pedido mínimo: R$${(restaurante.valor_minimo_pedido / 100).toFixed(2)}`}</p>
					</div>
					<div className='flex-row items-center font-montserrat font-color-gray restaurant-info-carrinho-2'>
						<div className='div-icon'><img src={Time} alt="icon" /></div>
						<p>{`Tempo de entrega: ${restaurante.tempo_entrega_minutos}  minutos`}</p>
					</div>
				</div>

				<div className={showDiv ? "flex-column items-center" : "none"}>
					<div className='flex-row restaurante-info-carrinho-3'>
						<div className='restaurante-descricao'> {produto.descricao}
						</div>
						<div className='flex-row items-center content-center preco-div'>{`R$${(produto.preco / 100).toFixed(2)}`} </div>
					</div>


					<div className='flex-row items-center div-contador'>
						<div className='flex-row items-center  div-contador-2'>
							<img className='' src={closeIcon} alt="fechar" onClick={() => handleRemove()} />
							<p>{count}</p>
							<img className='' src={closeIcon} alt="fechar" onClick={() => handleAdd()} />
						</div>


						<div className='flex-row'>
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

				<div className={showDivImg ? "flex-column items-center content-center div-showImg" : "none"}>
					<img src={ShoppingCart} alt='icone carrinho' />
					<p className='font-montserrat font-bold font-color-gray font-size-3'>Pedido adicionado!</p>
				</div>

				{/* {confirmCart.length > 0 ?
				<div>
					<p className='font-montserrat font-color-gray font-weigth-600 font-size-3'>ir para a revisão do pedido</p>
				</div>
				:
				""
				} */}

				{erro &&
					<Alert severity='error'>{erro}</Alert>
				}
			</div>
		</div >
	)
}

export default ModalCarrinho
