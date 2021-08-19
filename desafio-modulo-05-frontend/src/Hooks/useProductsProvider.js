import { useState } from "react";

export default function useProductsProvider() {
	const [produtos, setProdutos] = useState([]);
	const [atualizaProduto, setAtualizaProduto] = useState(false);
  const [ atualizaCardapio, setAtualizaCardapio ] = useState(false);
	const [restaurantes, setRestaurantes] = useState([])
	const [confirmCart, setConfirmCart] = useState();

	return {
		produtos,
		setProdutos,
		atualizaCardapio,
    setAtualizaCardapio,
		restaurantes,
		setRestaurantes,
		confirmCart,
		setConfirmCart
	};
}
