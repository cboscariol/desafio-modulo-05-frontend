import { useState } from "react";

export default function useProductsProvider() {
	const [produtos, setProdutos] = useState([]);
	const [atualizaProduto, setAtualizaProduto] = useState(false);
  const [ atualizaCardapio, setAtualizaCardapio ] = useState(false);
	const [restaurante, setRestaurante] = useState([])
	const [confirmCart, setConfirmCart] = useState([]);

	console.log(confirmCart, "confirmCart")

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
