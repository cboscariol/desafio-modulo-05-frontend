import React from 'react';
import { useEffect, useState, useContext } from 'react';
import Header from '../../Components/Header';
import CardRestaurante from '../../Components/CardRestaurante';
import { AuthContext } from '../../Contexts/AuthContext';
import LinhaLaranja from '../../Assets/Vector.svg';
import { getRestaurantes, getCategorias } from '../../Services/functions';
import './style.css';


function Restaurantes() {
	const { token } = useContext(AuthContext);
	const [erro, setErro] = useState('');
	const [restaurantes, setRestaurantes] = useState([]);
	const [restauranteFiltrado, setRestauranteFiltrado] = useState([])
	const [filtro, setFiltro] = useState("");
	const [filtroCategoria, setFiltroCategoria] = useState();
	const [categoria, setCategoria] = useState();


	useEffect(() => {
		async function listarRestaurantes() {
			const { lista, erros, errorGet } = await getRestaurantes(token);

			if (erros) {
				return setErro(erros)
			}

			if (errorGet) {
				setErro(errorGet)
			}

			setRestaurantes(lista)
			return setRestauranteFiltrado(lista)
		};

		listarRestaurantes();
	}, [token]);

	async function getCategoria() {
		await fetch('https://icubus.herokuapp.com/categorias')
			.then(async (res) => {
				const data = await res.json()
				if (res.status < 300) {
					console.log("CATEGORIAS", data)
					setCategoria([{
						id: 0,
						nome: 'Todos',
					}, ...data])
				}
			})
	}

	useEffect(() => {
		getCategoria()
	}, [token])


	useEffect(() => {
		function filtrarRestaurante() {
			const resultadoFilter = restaurantes.filter((restaurante) => {
				if (restaurante.nome.toLowerCase().includes(filtro)) {
					return restaurante
				}
			})
			setRestauranteFiltrado(resultadoFilter)
		}

		filtrarRestaurante()
	}, [filtro])


	useEffect(() => {
		function handleFiltro() {
			if (filtroCategoria === 0) {
				return setRestauranteFiltrado(restaurantes)
			}

			const resultadoFilterCategoria = restaurantes.filter((restaurante) => {
				if (restaurante.categoria_id === filtroCategoria) {
					return restaurante
				}
			})
			console.log("RESULTADO AQUI", resultadoFilterCategoria)

			setRestauranteFiltrado(resultadoFilterCategoria)
		}

		handleFiltro()
	}, [filtroCategoria])


	return (
		<div className='flex-column items-center container-products'>
			<Header />
			<img className='linhaLaranja' src={LinhaLaranja} alt="" />


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

				<div className='flex-row div-filter'>
					{categoria && categoria.map((c) => {
						return (
							<button className='filter-btn' onClick={() => setFiltroCategoria(c.id)}>
								{c.nome}
							</button>
						)
					})}
				</div>

				{restauranteFiltrado && restauranteFiltrado.length > 0 &&
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
					</div>
				}

				{restauranteFiltrado.length === 0 &&
					<p>NÃO HÁ RESTAURANTES NESSA CATEGORIA</p>}

			</div>
		</div>
	)
}

export default Restaurantes;
