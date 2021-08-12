import { useState } from "react";

export default function useProductsProvider() {
  const [produtos, setProdutos] = useState([]);
  const [ atualizaProduto, setAtualizaProduto ] = useState(false);
  const [ restaurantes, setRestaurantes ] = useState([])
  
  return {
    produtos,
    setProdutos,
    atualizaProduto,
    setAtualizaProduto,
    restaurantes, 
    setRestaurantes
  };
}