import { useState } from "react";

export default function useProductsProvider() {
	const [produtos, setProdutos] = useState([{
		nome: "Pizza",
		imagem: "https://img.itdg.com.br/tdg/images/blog/uploads/2019/05/pizza.jpg",
		quantidade: 2,
		preco: 2275,
		precoTotal: 4550,
		id: 5
	},
	{
		nome: "Pizza",
		imagem: "https://img.itdg.com.br/tdg/images/blog/uploads/2019/05/pizza.jpg",
		quantidade: 2,
		preco: 2275,
		precoTotal: 4550,
		id: 6
	}]);
	const [atualizaProduto, setAtualizaProduto] = useState(false);
	const [atualizaCardapio, setAtualizaCardapio] = useState(false);
	const [restaurante, setRestaurante] = useState({
		nome: "Pizza da Camila",
		taxa_entrega: 450,
		tempo_entrega_minutos: "30",
		id: 9
	})
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
