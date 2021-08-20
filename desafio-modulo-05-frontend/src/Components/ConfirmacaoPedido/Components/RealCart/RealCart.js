import cartIcon from '../../Assets/yellow-cart.svg'
import lineModal from '../../Assets/line-modal.svg'
import './styles.css';
import CardCart from '../../../../Components/CardCart'
import { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import successIcon from '../../Assets/success-green-icon.svg'
import semItensCarrinho from '../../Assets/sem-itens-carrinho.svg'
import { AuthContext } from '../../../../Contexts/AuthContext'
import { ProductsContext } from '../../../../Contexts/ProductsContext'
import { finalizarPedido, getEndereco } from '../../../../Services/functions'

function RealCart({ setShowPage }) {
	const { token } = useContext(AuthContext);
	const {
		produtos,
		setProdutos,
		atualizaCardapio,
		setAtualizaCardapio,
		restaurante,
		setRestaurante,
		confirmCart,
		setConfirmCart } = useContext(ProductsContext);
	console.log({
		produtos,
		setProdutos,
		atualizaCardapio,
		setAtualizaCardapio,
		restaurante,
		setRestaurante,
		confirmCart,
		setConfirmCart
	})
	const [showAddress, setShowAddress] = useState(false)
	const [addressDetails, setAddressDetails] = useState()
	const [erroSubmit, setErroSubmit] = useState(false)
	const [showSuccess, setShowSuccess] = useState(false)
	const [noItensOnCart, setNoItensOnCart] = useState(false)
	const history = useHistory()
	// const [restaurante, setRestaurante] = useState([]);



	const addAddress = () => {
		setShowPage("address")
	}

	const redirect = () => {
		history.push(`/cardapio/${restaurante.id}`)
	}

	const getEndereço = async () => {
		const result = await getEndereco(token)
		if (!result.error) {
			setAddressDetails(result)
			setShowAddress(true)
		}
	}

	useEffect(() => {
		getEndereço()
	}, [])

	const onSubmit = async () => {
		const subTotal = getSubTotal()

		const cart = {
			produtos,
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

	const getSubTotal = () => {
		const result = produtos.reduce((acc, produto) => acc + produto.precoTotal, 0)
		return result
	}


	return (
		<div>
			<header className='headerModal'>
				<img src={cartIcon} alt="icone-carrinho-de-compras-amarelo" />
				<h1>{restaurante.nome}</h1>
			</header>

			{produtos.length === 0 ?
				<div className='content-modal-no-itens'>
					<img src={semItensCarrinho} alt="endereço-adiconado-com-sucesso" />
				</div>
				:
				""
			}




			<div className='contentModal'
				style={{ display: showSuccess ? 'none' : 'block' }}
			>
				{showAddress ?
					<p className='font-color-orange font-bold'>Endereço de Entrega: <span className='font-color-gray font-weight-normal '>
						{`${addressDetails.endereco} , ${addressDetails.complemento} , ${addressDetails.cep}`}	</span> </p>
					:
					<button className='addAddress' onClick={addAddress}>Adicionar endereço</button>

				}
				<p className='font-bold font-size-2'>Tempo de Entrega: <span className='font-size-1 '>{restaurante.tempo_entrega_minutos} min</span></p>


				{produtos.map((produto) => (
					<CardCart
						imagem={produto.imagem}
						nome={produto.nome}
						quantidade={produto.quantidade}
						precoTotal={produto.precoTotal} />
				))}



				<a href={`/cardapio/${restaurante.id}`}>Adicionar mais itens ao pedido</a>

				<img src={lineModal} alt="" />

				<div className='finalCart font-color-gray font-size-3 '>
					<p className='finalCartStyle'>Subtotal <spam>R$ {getSubTotal()}</spam> </p>
					<p className='finalCartStyle'>Taxa de entrega<spam>R$ {restaurante.taxa_entrega}</spam> </p>
					<p className='finalCartStyle'>Total <spam className='font-size-1'>R$ {restaurante.taxa_entrega + getSubTotal()}</spam> </p>
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

			</div>


			{/* --------------------------------------PEDIDO REALIZADO COM SUCESSO -------------------------------- */}

			<div className='content-modal-sucess' style={{ display: showSuccess ? 'block' : 'none' }}>
				<img src={successIcon} alt="endereço-adiconado-com-sucesso" />
				<p className='font-color-gray font-size-4 font-weight-600 text-align-center'>
					Pedido Confirmado! <br></br>
					Agora é só aguardar o seu pedido
				</p>


				<div className='flex-row actionButtons '>
					<button
						className='btn-orange-small font-montserrat font-color-white'
						type='submit'
						onClick={redirect}
					>
						Voltar para o cardápio
					</button>
				</div>
			</div>

			{/* --------------------------------------SEM ITENS NO CARRINHO -------------------------------- */}




		</div>
	)
}


export default RealCart
