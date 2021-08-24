import { useState } from "react";
import { useLocalStorage } from 'react-use';

export default function useProductsProvider() {
	const [produtos, setProdutos] = useState([])
	const [atualizaCardapio, setAtualizaCardapio] = useState(false);
	const [atualizaProduto, setAtualizaProduto] = useState(false);
	const [restaurante, setRestaurante] = useState([])
	const [confirmCart, setConfirmCart, removeConfirmCart] = useLocalStorage('carrinho', [])

	return {
		produtos,
		setProdutos,
		atualizaProduto,
		setAtualizaProduto,
		atualizaCardapio,
		setAtualizaCardapio,
		restaurante,
		setRestaurante,
		confirmCart: confirmCart || [],
		setConfirmCart,
		removeConfirmCart,
	};
}
