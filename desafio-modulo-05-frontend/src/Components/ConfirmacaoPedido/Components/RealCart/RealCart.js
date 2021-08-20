import cartIcon from '../../Assets/yellow-cart.svg'
import lineModal from '../../Assets/line-modal.svg'
import Alert from '@material-ui/lab/Alert';
import './styles.css';
import CardCart from '../../../../Components/CardCart'
import { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import successIcon from '../../Assets/success-green-icon.svg'
import semItensCarrinho from '../../Assets/sem-itens-carrinho.svg'
import { AuthContext } from '../../../../Contexts/AuthContext'
import { ProductsContext } from '../../../../Contexts/ProductsContext'
import { finalizarPedido, getEndereco } from '../../../../Services/functions'

function RealCart({ setShowPage, setProdutoEscolhido, setOpenCarrinho, closeRevisaoPedido }) {
	const { token } = useContext(AuthContext);
	const { restaurante, confirmCart } = useContext(ProductsContext);
	const [showAddress, setShowAddress] = useState(false)
	const [addressDetails, setAddressDetails] = useState()
	const [erroSubmit, setErroSubmit] = useState(false)
	const [showSuccess, setShowSuccess] = useState(false)
	const history = useHistory()


	const addAddress = () => {
		setShowPage("address")
	}

	const redirect = () => {
		history.push(`/cardapio/${restaurante.id}`)
	}

	const getEndereço = async () => {
		const result = await getEndereco(token)

		if (result.cep === undefined) {
			setShowAddress(false)
		} else {
			setAddressDetails(result)
			setShowAddress(true)
		}
	}

	useEffect(() => {
		getEndereço()
	}, [])

	function openProductDetails(produto) {
		setProdutoEscolhido(produto);
		setOpenCarrinho(true);
		closeRevisaoPedido();
	}

	const onSubmit = async () => {
		const subTotal = getSubTotal()

		const cart = {
			produtos: confirmCart,
			subtotal: subTotal,
			taxaEntrega: restaurante.taxa_entrega,
			total: subTotal + restaurante.taxa_entrega,
		}
		console.log("cart aqui:")
		console.log(cart)

		const result = await finalizarPedido({ cart, token, id: restaurante.id });

		if (result.error) {
			setErroSubmit(result.error)
		} else {
			setShowSuccess(true)
		}
	}

	const handleCloseErrorAlert = () => {
		setErroSubmit('')
	}

	const getSubTotal = () => {
		const result = confirmCart.reduce((acc, produto) => acc + produto.precoTotal, 0)
		return result
	}

	const renderOrderInfos = () => {
		return (
			<>
				<p className='font-bold font-size-2'>Tempo de Entrega: <span className='font-size-1 '>{restaurante.tempo_entrega_minutos} min</span></p>



				{confirmCart.map((produto) => (
					<CardCart
						imagem={produto.imagem}
						nome={produto.nome}
						quantidade={produto.quantidade}
						precoTotal={produto.precoTotal}
						onClick={() => openProductDetails(produto)}
					/>
				))}



				<a href={`/cardapio/${restaurante.id}`}>Adicionar mais itens ao pedido</a>

				<img src={lineModal} alt="" />

				<div className='finalCart font-color-gray font-size-3 '>
					<p className='finalCartStyle'>Subtotal <spam>R$ {getSubTotal() / 100}</spam> </p>
					<p className='finalCartStyle'>Taxa de entrega<spam>R$ {restaurante.taxa_entrega / 100}</spam> </p>
					<p className='finalCartStyle'>Total <spam className='font-size-1'>R$ {(restaurante.taxa_entrega + getSubTotal()) / 100}</spam> </p>
				</div>
				<div className='flex-row actionButtons '>
					<button
						className='btn-orange-small font-montserrat font-color-white'
						type='submit'
						onClick={onSubmit}
					>
						Confirmar Pedido
					</button>
				</div>
			</>
		)
	}


	return (
		<div>
			<header className='headerModal'>
				<img src={cartIcon} alt="icone-carrinho-de-compras-amarelo" />
				<h1>{restaurante.nome}</h1>
			</header>
			<div className='alert-confirmacao-pedido'>
				{erroSubmit && <Alert variant="filled" severity="error" onClose={handleCloseErrorAlert}>{erroSubmit}</Alert>}
			</div>


			<div className='contentModal'
				style={{ display: showSuccess ? 'none' : 'block' }}
			>
				{showAddress ?
					<p className='font-color-orange font-bold'>Endereço de Entrega: <span className='font-color-gray font-weight-normal '>
						{`${addressDetails.endereco} , ${addressDetails.complemento} , ${addressDetails.cep}`}	</span> </p>
					:
					<button className='addAddress' onClick={addAddress}>Adicionar endereço</button>

				}

				{confirmCart.length === 0 ?
					<div className='content-modal-no-itens'>
						<img src={semItensCarrinho} alt="endereço-adiconado-com-sucesso" />
					</div>
					:
					renderOrderInfos()
				}







			</div>


			{/* --------------------------------------PEDIDO REALIZADO COM SUCESSO -------------------------------- */}

			<div className='content-modal-sucess' style={{ display: showSuccess ? 'block' : 'none' }}>
				<img src={successIcon} alt="endereço-adiconado-com-sucesso" />
				<p className='font-color-gray font-size-4 font-weight-600 text-align-center'>
					Pedido Confirmado! <br></br>
					Agora é só aguardar o seu pedido
				</p>


				<div className='flex-row actionButtons '>
					<a href={`/cardapio/${restaurante.id}`} className='btn-orange-small font-montserrat font-color-white' >Voltar para o cardápio</a>
				</div>
			</div>

			{/* --------------------------------------SEM ITENS NO CARRINHO -------------------------------- */}




		</div>
	)
}


export default RealCart
