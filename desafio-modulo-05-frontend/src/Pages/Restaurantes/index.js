import React from 'react';
import { useEffect, useState, useContext } from 'react';
import Header from '../../Components/Header';
import CardRestaurante from '../../Components/CardRestaurante';
import { AuthContext } from '../../Contexts/AuthContext';
import useProductsContext from '../../Hooks/useContextProducts';
import LinhaLaranja from '../../Assets/Vector.svg';
import './style.css';
import { getRestaurantes } from '../../Services/functions';


function Restaurantes() {
	const { token } = useContext(AuthContext);
	const [ erro, setErro ] = useState('');
	const [ restaurantes, setRestaurantes ] = useState([]);
	// const [ restauranteFiltrado, setRestauranteFiltrado ] = useState([])
	const [ filtro, setFiltro ] = useState("");
	
	let restauranteFiltrado = [];

	useEffect(() => {

		async function listarRestaurantes() {
			const { lista, erros, errorGet } = await getRestaurantes(token);

			if (erros) {
				return setErro(erros)
			}

			if(errorGet){
				setErro(errorGet)
			}
			
			return setRestaurantes(lista)
		};

		listarRestaurantes();
	}, [token]);



	return (
		<div className='flex-column items-center container-products'>
			<Header />
			<img className='linhaLaranja' src={LinhaLaranja} alt=""/>

			
				<div className='flex-column items-center container-main'>
					<div className='actBtn'>
						<div>
							
								<input
									className='input-gray-big font-montserrat'
									placeholder="Buscar"
									type='text'
									onChange={(e) => setFiltro(e.target.value.toLowerCase())}
								>
								</input>
							
						</div>
					</div>

					{restaurantes.length > 0 ?
						<div className='grid'>
							{restaurantes.filter((restaurante) => {
								console.log(restaurante, "1")
								if (filtro === "") {
									console.log(restaurante, "2")
									return restaurante
								} else if (restaurante.nome.toLowerCase().includes(filtro)) {
									console.log(restaurante, "3")
									return restaurante
								} 
							}).map((r) => {
									return (
										<CardRestaurante
											key={r.id_restaurante}
											id_restaurante={r.id_restaurante}
											nome={r.nome}
											descricao={r.descricao}
											img={r.imagem}
										/>
									)
								})}
						</div>
						
					:

						<div className="font-montserrat font-bold font-color-orange">
							<p>Ops...não encontramos nenhum restaurante</p>
						</div>
					}
					
				</div>		
		</div>
	)
}

export default Restaurantes;
