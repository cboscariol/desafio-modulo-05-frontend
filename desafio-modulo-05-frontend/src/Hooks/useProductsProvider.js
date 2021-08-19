import { useState } from "react";

export default function useProductsProvider() {
	const [produtos, setProdutos] = useState([]);
	const [atualizaProduto, setAtualizaProduto] = useState(false);
	const [restaurantes, setRestaurantes] = useState([])
	const [confirmCart, setConfirmCart] = useState();

	return {
		produtos,
		setProdutos,
		atualizaProduto,
		setAtualizaProduto,
		restaurantes,
		setRestaurantes,
		confirmCart,
		setConfirmCart
	};
}
