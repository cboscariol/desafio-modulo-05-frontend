import React from 'react';
import { useEffect, useState, useContext } from 'react';
import Header from '../../Components/Header';
import CardRestaurante from '../../Components/CardRestaurante';
import { AuthContext } from '../../Contexts/AuthContext';
import LinhaLaranja from '../../Assets/Vector.svg';
import { getRestaurantes } from '../../Services/functions';
import './style.css';


function Restaurantes() {
	const { token } = useContext(AuthContext);
	const [ erro, setErro ] = useState('');
	const [ restaurantes, setRestaurantes ] = useState([]);
	const [ restauranteFiltrado, setRestauranteFiltrado ] = useState([])
	const [ filtro, setFiltro ] = useState("");
	
	
	

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


	useEffect(() => {
		function filtrarRestaurante(){
			const resultadoFilter = restaurantes.filter((restaurante) => {
				 if(restaurante.nome.toLowerCase().includes(filtro)){
					return restaurante
				} 
			})
			
			setRestauranteFiltrado(resultadoFilter)
		}

		filtrarRestaurante()
	}, [filtro])


	return (
		<div className='flex-column items-center container-products'>
			<Header  />
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

					{filtro ?
						<div className='grid' >
								{restauranteFiltrado.map((r) => {
									return (
										<CardRestaurante
											key={r.id_restaurante}
											id_restaurante={r.usuario_id}
											nome={r.nome}
											descricao={r.descricao}
											img={r.imagem}
											
										/>
									)
									})	
								}

								{restauranteFiltrado.length === 0 ?
									<div className="font-montserrat font-bold font-color-orange">
										<p>Ops...sua busca não retornou nenhum restaurante </p>
									</div>
									:
									""
								}
						</div>	
	
						
					:
							
						<div className='grid'>
							{console.log(restaurantes, "antes do map restaurantes")}
							{restaurantes.map((r) => {
								return (
									<CardRestaurante
										key={r.id_restaurante}
										id_restaurante={r.usuario_id}
										nome={r.nome}
										descricao={r.descricao}
										img={r.imagem}
										
									/>
								)
								})	
							}

							{restaurantes.length === 0 ?
								<div className="font-montserrat font-bold font-color-orange">
									<p>Ops...não encontramos nenhum restaurante</p>
								</div>
								:
								""
							}
						</div>	
					
					}	
				</div>		
		</div>
	)
}

export default Restaurantes;