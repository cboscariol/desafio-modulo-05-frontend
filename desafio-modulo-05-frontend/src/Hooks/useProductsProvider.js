import { useState } from "react";

export default function useProductsProvider() {
	const [produtos, setProdutos] = useState([])
	const [atualizaProduto, setAtualizaProduto] = useState(false);
	const [restaurante, setRestaurante] = useState({})
	const [confirmCart, setConfirmCart] = useState();

	return {
		produtos,
		setProdutos,
    atualizaCardapio,
		setAtualizaCardapio,
		restaurante,
		setRestaurante,
		confirmCart,
		setConfirmCart
	};
}
