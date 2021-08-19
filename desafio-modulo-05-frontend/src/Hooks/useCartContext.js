import { useState } from "react";

export default function useCartContext() {
	const [produtosNoCarrinho, setProdutosNoCarrinho] = useState([]);
	const [tempoEntrega, setTempoEntrega] = useState();
	const [subtotal, setSubtotal] = useState()
	const [taxaEntrega, setTaxaEntrega] = useState()

	return {
		produtosNoCarrinho,
		setProdutosNoCarrinho,
		tempoEntrega,
		setTempoEntrega,
		subtotal,
		setSubtotal,
		taxaEntrega,
		setTaxaEntrega,
	};
}
