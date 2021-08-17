import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useProductsContext from '../../Hooks/useContextProducts';
import Header from '../../Components/Header';
import ModalCarrinho from '../../Components/ModalCarrinho';
import CardCardapio from '../../Components/CardCardapio';
import { AuthContext } from '../../Contexts/AuthContext';
import LinhaLaranja from '../../Assets/Vector.svg';
import ServingDish from '../../Assets/serving-dish 1.png';
import Money from '../../Assets/money-icon.svg';
import Time from '../../Assets/time-icon.svg';
import { getRestaurante, getCardapio } from '../../Services/functions';
import './style.css';


function Cardapio() {
	const { token } = useContext(AuthContext);
    const restaurante_id  = useParams();
	const [ erro, setErro ] = useState('');
	const [ openCarrinho, setOpenCarrinho ] = useState(false);
	const [ cardapio, setCardapio ] = useState([]);
	const [ produtoEscolhido, setProdutoEscolhido ] = useState();
	const { restaurante, setRestaurante } = useProductsContext();
	const [ restauranteId, setRestauranteId ] = useState(restaurante_id.id)
	
	async function listarCardapio() {
		const { lista, erros, errorGet } = await getCardapio(token, restauranteId);

		if (erros) {
			return setErro(erros)
		}

		if(errorGet){
			setErro(errorGet)
		}
	
		return setCardapio(lista)
	};
	
	async function listarRestaurante(){
		const { lista, erros, errorGet } = await getRestaurante(token, restauranteId);

		if (erros) {
			return setErro(erros)
		}

		if(errorGet){
			setErro(errorGet)
		}
	
		return setRestaurante(lista)
	}

	useEffect(() => {
		listarCardapio();
	}, []);

	useEffect(() => {
		listarRestaurante();
	}, []);


	return (
		<div className='flex-column items-center container-products'>
			{openCarrinho === true ?
				<ModalCarrinho setOpenCarrinho={setOpenCarrinho} produto={produtoEscolhido}/>
				:
				""
			}	
			<Header idRestaurante={Number(restauranteId)} />
			<img className='linhaLaranja' src={LinhaLaranja} alt=""/>

			
				<div className='flex-column items-center container-main'>
					
					<div className='actBtn'>
						<div>
							<button
								className='btn-orange-small font-montserrat font-color-white'
								type='text'
							>
								Revisar pedido
							</button>
						</div>
					</div>

					<div className='flex-row items-center restaurant-info'>
						<div className='flex-row items-center font-montserrat font-color-gray restaurant-info-2'>
							<div className='div-icon'><img src={Money} alt="icon" /></div>
							<p>{`Pedido mínimo: R$${(restaurante.valor_minimo_pedido/100).toFixed(2)}`}</p>
						</div>
						<div className='flex-row items-center font-montserrat font-color-gray restaurant-info-2'>
							<div className='div-icon'><img src={Time} alt="icon" /></div>
							<p>{`Tempo de entrega: ${restaurante.tempo_entrega_minutos} minutos`}</p>
						</div>
						<div className='flex-row items-center font-montserrat font-color-gray'>
							<p>{restaurante.descricao}</p>
						</div>
					</div>
					
	
					{cardapio.length > 0 ?
						<div className='grid' >
								{cardapio.map((r) => {
									return (
										<CardCardapio
											key={r.id}
											id={r.id}
											nome={r.nome}
											descricao={r.descricao}
											img={r.imagem}
                                            preco={r.preco}
											setOpenCarrinho={setOpenCarrinho}
											setProdutoEscolhido={setProdutoEscolhido}
										/>
									)
									})	
								}
	
						</div>	
	
					:
							
						<div className='flex-column content-center items-center font-montserrat semProdutos'>
							<img src={ServingDish} alt='icone' />
							<p> Desculpe, estamos sem produtos ativos </p>
							
						</div>	
					
					}	
				</div>		
		</div>
	)
}

export default Cardapio;