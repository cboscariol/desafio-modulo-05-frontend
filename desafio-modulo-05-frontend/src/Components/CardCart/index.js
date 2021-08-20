
import './style.css'


function CardCart(props) {

	return (
		<div className='containerProductCart'>
			<img src={props.imagem} alt="imagem-do-produto" />
			<div>
				<h3>{props.nome}</h3>
				<p>{props.quantidade}</p>
				<p className='valueBox'>{props.precoTotal}</p>
			</div>
		</div>
	)
}

export default CardCart
