import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../../Components/Header';
import CardCardapio from '../../Components/CardCardapio';
import { AuthContext } from '../../Contexts/AuthContext';
import useProductsContext from '../../Hooks/useContextProducts';
import LinhaLaranja from '../../Assets/Vector.svg';
import { getRestaurante, getCardapio } from '../../Services/functions';
import './style.css';


function Cardapio() {
	const { token } = useContext(AuthContext);
    const restaurante_id  = useParams();
	const [ erro, setErro ] = useState('');
	const [ cardapio, setCardapio ] = useState([]);
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
	

	useEffect(() => {
	
		listarCardapio();
		
	}, []);


	return (
		<div className='flex-column items-center container-products'>
			<Header idRestaurante={Number(restauranteId)} />
			<img className='linhaLaranja' src={LinhaLaranja} alt=""/>

			
				<div className='flex-column items-center container-main'>
					
					<div className=''>
						<div>
								
						</div>
					</div>
		{console.log(cardapio, "antes do map")}
					{cardapio ?
						<div className='grid'>
								{cardapio.map((r) => {
									return (
										<CardCardapio
											key={r.id_restaurante}
											id_restaurante={r.id_restaurante}
											nome={r.nome}
											descricao={r.descricao}
											img={r.imagem}
                                            preco={r.preco}
										/>
									)
									})	
								}		
						</div>	
	
						
					:
							
						<div className='grid'>
							<p>nenhum produto encontrado </p>
							
						</div>	
					
					}	
				</div>		
		</div>
	)
}

export default Cardapio;