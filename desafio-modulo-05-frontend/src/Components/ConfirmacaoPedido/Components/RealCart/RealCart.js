import React from 'react'
import cartIcon from '../../Assets/yellow-cart.svg'
import lineModal from '../../Assets/line-modal.svg'
import './styles.css';
import CardCart from '../CardCart'
import { useState, useEffect, useContext } from 'react';
import successIcon from '../../Assets/success-green-icon.svg'
import semItensCarrinho from '../../Assets/sem-itens-carrinho.svg'

function RealCart() {
	return (
		<div>
			<div className='headerModal'>
				<img src={cartIcon} alt="icone-carrinho-de-compras-amarelo" />
				<h1>Nome restaurante</h1>
			</div>

			<div className='contentModal'>
				<p className='font-color-orange font-bold'>Endereço de Entrega: <span className='font-color-gray font-weight-normal '>
					Av. Tancredo Neves, 2227, ed. Salvador Prime,
					sala 901:906; 917:920 - Caminho das Árvores, Salvador - BA, 41820-021</span> </p>
				<p className='font-bold font-size-2'>Tempo de Entrega: <span className='font-size-1 '>45min</span></p>

				<CardCart />

				<CardCart />

				<CardCart />

				<CardCart />

				<a href="/cardapio">Adicionar mais itens ao pedido</a>

				<img src={lineModal} alt="" />

				<div className='finalCart font-color-gray font-size-3 '>
					<p className='finalCartStyle'>Subtotal <spam>`R$ ${'valor'}`</spam> </p>
					<p className='finalCartStyle'>Taxa de entrega <spam>`R$ ${'valor'}`</spam> </p>
					<p className='finalCartStyle'>Total <spam className='font-size-1'>`R$ ${'valor'}`</spam> </p>
				</div>
			</div>



			<div className='flex-row actionButtons '>
				<button
					className='btn-orange-small font-montserrat font-color-white'
					type='submit'
					onClick={''}
				>
					Confirmar Pedido
				</button>
			</div>

			{/* --------------------------------------PEDIDO REALIZADO COM SUCESSO -------------------------------- */}
			<div className='content-modal-sucess'>
				<img src={successIcon} alt="endereço-adiconado-com-sucesso" />
				<p className='font-color-gray font-size-4 font-weight-600 text-align-center'>
					Pedido Confirmado! <br></br>
					Agora é só aguardar o seu pedido
				</p>
			</div>

			<div className='flex-row actionButtons '>
				<button
					className='btn-orange-small font-montserrat font-color-white'
					type='submit'
					onClick={''}
				>
					Voltar para o carrinho
				</button>
			</div>

			{/* --------------------------------------SEM ITENS NO CARRINHO -------------------------------- */}

			<div className='content-modal-no-itens'>
				<img src={semItensCarrinho} alt="endereço-adiconado-com-sucesso" />
			</div>


		</div>
	)
}

export default RealCart
