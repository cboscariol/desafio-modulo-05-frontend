import { createContext } from "react";
import useCartContextProvider from "../Hooks/useCartContext";

const useCartContext = createContext();

export function CartProvider(props) {
	const cart = useCartContextProvider();

	return (
		<useCartContext.Provider value={cart}>
			{props.children}
		</useCartContext.Provider>
	);
}

export default useCartContext;
