import { useHistory } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react'
import './style.css';
import UserImage from '../../Assets/user.jpg';
import backgroundUser from '../../Assets/Rectangle 129.png';
import { AuthContext } from '../../Contexts/AuthContext';
import { getRestaurante } from '../../Services/functions.js';



function Header({ idRestaurante }) {
	const history = useHistory();
	const { token } = useContext(AuthContext);
	const [ error, setError ] = useState('');
	const [ openModal, setOpenModal ] = useState(false);
	const [ imagemCategoria, setImagemCategoria ] = useState()
	const [ imagemPerfil, setImagemPerfil ] = useState()
	const [ restaurante, setRestaurante ] = useState();
	
	// function handleOpenModal() {
	// 	setOpenModal(true)
	// }

	function logout() {
		localStorage.clear();
		history.push('/');
	}

	//--------------------------------------getRestaurante----------------------------------//
	async function listarRestaurante() {
			const { lista, erros, errorGet } = await getRestaurante(token, idRestaurante);

			if (erros) {
				return setError(erros)
			}

			if(errorGet){
				setError(errorGet)
			}
			
			setRestaurante(lista)
			
			setImagemPerfil(lista.imagem)
	};
	
	useEffect(() => {
		listarRestaurante();
	}, [token]);

	//---------------------------------------getCategorias------------------------------------//
	async function getImagemCategoria() {
		if(restaurante){
		await fetch('https://icubus.herokuapp.com/categorias')
			.then(async (res) => {
				const data = await res.json()
				if (res.status < 300) {
					const categoria = data.find((item) => item.id === restaurante.categoria_id)
					setImagemCategoria(categoria.imagem)
					
				}
			})
		} 
	}
	
	
	useEffect(() => {	
		getImagemCategoria()
	}, [restaurante])
	

	const background = imagemCategoria ? imagemCategoria : backgroundUser;
	

	return (
		<div className='flex-row items-flex-end headerProducts' style={{backgroundImage: `url(${background})`}}>
			<img className='imgProfile' src={imagemPerfil ? imagemPerfil : UserImage} alt='background pizzaria' />
			{/* {openModal && <NewEditProfile setOpenModal={setOpenModal} setImagemPerfil={setImagemPerfil} />} */}
			<h1 className='font-baloo font-color-white title-header'>{restaurante ? restaurante.nome: "Restaurantes"}</h1>
			<button className='font-montserrat font-color-white btn-logout' onClick={() => logout()}>Logout</button>
		</div>
	)
}

export default Header;
