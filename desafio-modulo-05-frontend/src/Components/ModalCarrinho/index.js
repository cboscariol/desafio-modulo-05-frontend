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
import Add from '../../Assets/add-icon.png';
import Remove from '../../Assets/remove-icon.png';
import Delete from '../../Assets/delete-icon.png';


export default function ModalCarrinho({ setOpenCarrinho, produto, setOpenRevisaoPedido }) {
	const { token } = useContext(AuthContext);
	const [erro, setErro] = useState('');
	const { confirmCart, setConfirmCart, removeConfirmCart, restaurante } = useProductsContext();
	const [ count, setCount ] = useState(0);
	const [ showDiv, setShowDiv ] = useState(true);
	const [ showDivImg, setShowDivImg ] = useState(false);
	const [ produtoExiste, setProdutoExiste ] = useState();
	const [ produtoExcluido, setProdutoExcluido ] = useState(false);


	useEffect(() => {
		function verificaProduto(){
			if(confirmCart){
			setProdutoExiste(confirmCart.find((p) => p.id === produto.id));
			}
		}

		verificaProduto()
	}, [])

	useEffect(() => {
		function verificaProdutoQtd(){
			if(produtoExiste){
				setCount(produtoExiste.quantidade)
			}
		}
		verificaProdutoQtd()
	}, [produtoExiste])
	

	function handleClose() {
		setOpenCarrinho(false)
	}

	function handleOpenRevisao() {
		setOpenCarrinho(false)
		setOpenRevisaoPedido(true)
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

	
		if(produtoExiste){
			produtoExiste.quantidade = count;

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
		return
	}

	function handleRemove(){
		if(produtoExiste && count < 2){
		
			const newArray = [...confirmCart];
			const index = newArray.findIndex((e) => e.id === produtoExiste.id)
		
			setShowDiv(false)
			setShowDivImg(true)
			setConfirmCart(newArray.filter((produto, i) => i !== index ))
			setProdutoExcluido(true);
			return
		}

		if(count === 0){
			return setErro("Não é possível remover um produto que não está no carrinho")
		}else {
			const newValue = count - 1;
			return setCount(newValue); 
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
							<div className='div-icon-carrinho'><img src={Money} alt="icon" /></div>
							<p>{`Pedido mínimo: R$${(restaurante.valor_minimo_pedido/100).toFixed(2)}`}</p>
						</div>
						<div className='flex-row items-center font-montserrat font-color-gray restaurant-info-carrinho-2'>
							<div className='div-icon-carrinho'><img src={Time} alt="icon" /></div>
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

							<div style={{backgroundColor: '#D13201', width: '25px', height: '25px'}}>
								<img style={{width: '25px', height: '25px'}}src={produtoExiste && count < 2 ? Delete : Remove} alt="fechar" onClick={()=>handleRemove()} />
							</div>

							<p>{count}</p>

							<div style={{backgroundColor: '#D13201', width: '25px', height: '25px'}}>
								<img style={{width: '25px', height: '25px'}}src={Add} alt="fechar" onClick={()=>handleAdd()} />
							</div>

						</div>


						<div className='flex-row'>
							<button
								className='btn-orange-small font-montserrat font-color-white font-bold'
								type='submit'
								onClick={() => handleCart()}
							>
								{produtoExiste ? "Editar Pedido" : "Adicionar ao carrinho"}
							</button>
						</div>


					</div>
				</div>

				<div className={showDivImg ? "flex-column items-center content-center div-showImg" : "none"}>
					<img src={ShoppingCart} alt='icone carrinho' />
					<p className='font-montserrat font-bold font-color-gray font-size-3'>{produtoExcluido ? 'Produto excluído!' : "Produto adicionado!"}</p>
				</div>


				
				{confirmCart.length > 0 ?
				<div onClick={() => handleOpenRevisao()}>
					<p className='font-montserrat font-color-gray font-weigth-600 font-size-3'>ir para a revisão do pedido</p>
				</div>
				:
				""
				}
				

				{erro &&
					<Alert severity='error'>{erro}</Alert>
				}
			</div>
		</div >
	)
}
