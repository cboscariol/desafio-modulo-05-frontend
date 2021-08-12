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
	const [erro, setErro] = useState('');
	const [restaurantes, setRestaurantes ] = useState([]);
	const [atualiza, setAtualiza] = useState(false)
	// const { restaurantes, setRestaurantes } = useProductsContext();
	
	const lista = [{
		nome: "Pizza e Pizza",
		descricao: "Pizzaria"
	},
	{
		nome: "Mexican Taquito",
		descricao: "Mexicano"
	}]

	useEffect(() => {
		setRestaurantes(lista)
	}, [])

	
	

	function handleChange(e) {
				console.log(e.target.value);
				
				
				const novaLista	= restaurantes.filter(restaurante => restaurante.nome.includes(e.target.value))
				setRestaurantes(novaLista[0])
				console.log(novaLista)
				setAtualiza(true)
				
	}

	// useEffect(() => {
		
	// 	function handleChange(e) {
	// 		console.log(e.target.value);
	// 		let search = e.target.value;
			
	// 		const novaLista	= restaurantes.nome.filter(search)
	// 		console.log(novaLista);
	// 		return setRestaurantes(novaLista)
	// 	}

	// }, [handleChange()])
	

	

	useEffect(() => {

		async function listarRestaurantes() {
			const { lista, erros, errorGet } = await getRestaurantes(token);

			if (erros) {
				return setErro(erros)
			}

			if(errorGet){
				setErro(errorGet)
			}
			// setAtualizaProdutos(false)
			// return setRestaurantes(lista)
		};

		listarRestaurantes();
	}, [token]);

	return (
		<div className='flex-column items-center container-products'>
			<Header />
			<img className='linhaLaranja' src={LinhaLaranja} alt=""/>

			{restaurantes ?
				<div className='flex-column items-center container-main'>
					<div className='actBtn'>
						<div>
							<form>
								<input
									className='input-gray-big font-montserrat'
									placeholder="Buscar"
									type='text'
									onChange={(e) => handleChange(e)}
								>
								</input>
							</form>
							{/* <button
								className='btn-gray-big font-montserrat'
								onChange={(e) => handleChange(e)}
								placeholder="Buscar"
								defaultValue='Buscar'
							/> */}
						</div>
					</div>
					<div className='grid'>

						{restaurantes.map((r) => {
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
				</div>

			:

			<div className='flex-column content-center items-center main-products'>
					<div className='flex-row items-center content-center font-montserrat font-color-gray text-products'>
						Você ainda não tem nenhum produto no seu cardápio. Gostaria de adicionar um novo produto?
					</div>

					<div>
						<button
							className='btn-orange-big font-montserrat font-color-white'
						>
							Adicionar produto ao cardápio
						</button>
					</div>

				</div>

			}
		</div>
	)
}

export default Restaurantes;
