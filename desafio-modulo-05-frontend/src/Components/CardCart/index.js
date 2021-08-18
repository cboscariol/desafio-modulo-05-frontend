import React from 'react'
import './style.css'
import fotoProduto from '../../Assets/Rectangle 6.png'

function CardCart() {
	return (
		<div className='containerProductCart'>
			<img src={fotoProduto} alt="imagem-do-produto" />
			<div>
				<h3>Produto</h3>
				<p>Quantidade</p>
				<p className='valueBox'>Valor X Quantidade</p>
			</div>
		</div>
	)
}

export default CardCart
