import { useState } from "react";

export default function useProductsProvider() {
  const [produtos, setProdutos] = useState([]);
  const [ atualizaCardapio, setAtualizaCardapio ] = useState(false);
  const [ restaurantes, setRestaurantes ] = useState([])
  
  return {
    produtos,
    setProdutos,
    atualizaCardapio,
    setAtualizaCardapio,
    restaurantes, 
    setRestaurantes
  };
}