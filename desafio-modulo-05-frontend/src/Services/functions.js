export async function getRestaurantes(token) {
	try {
		const resposta = await fetch('https://icubus-clientes.herokuapp.com/restaurantes', {
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		});

		const lista = await resposta.json();

		if (resposta.status >= 400) {
			return { erros: lista }
		}

		return { lista }
	}
	catch (error) {
		return { errorGet: error.message };
	}
};

export async function getRestaurante(token, id) {
	try {
		const resposta = await fetch(`https://icubus-clientes.herokuapp.com/restaurantes/${id}`, {
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		});

		const lista = await resposta.json();

		if (resposta.status >= 400) {
			return { erros: lista }
		}

		return { lista }
	}
	catch (error) {
		return { errorGet: error.message };
	}
};

export async function getCardapio(token, id) {
	console.log(Number(id.id), "id da funcao cardapio")


	try {
		const resposta = await fetch(`https://icubus-clientes.herokuapp.com/restaurantes/${id}/produtos/ativos`, {
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		});

		const lista = await resposta.json();
		console.log(resposta, "funcao cardapio resposta")
		if (resposta.status >= 400) {
			return { erros: lista }
		}
		console.log(lista, "funcao cardapio")
		return { lista };

	}
	catch (error) {
		return { errorGet: error.message };
	}
};

export async function getProducts(token) {
	try {
		const resposta = await fetch('https://icubus.herokuapp.com/produtos', {
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		});

		const lista = await resposta.json();

		if (resposta.status >= 400) {
			return { erros: lista }
		}

		return { lista }
	}
	catch (error) {
		return { errorGet: error.message };
	}
};

export async function getSingleProduct({ id, token }) {
	console.log('entrou aqui')
	try {
		const resposta = await fetch(`https://icubus.herokuapp.com/produtos/${id}`, {
			headers: {
				'Authorization': `Bearer ${token}`,
			}
		});

		const dados = await resposta.json();
		console.log(dados)
		if (resposta.status >= 400) {
			return { erro: dados }
		}

		return dados
	}
	catch (error) {
		return error.message;
	}
}

export async function registerProduct({ produtoFormatado, token }) {
	try {
		const resposta = await fetch('https://icubus.herokuapp.com/produtos', {
			method: 'POST',
			body: JSON.stringify(produtoFormatado),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});

		const dados = await resposta.json();

		if (resposta.status >= 400) {
			return { erro: dados }
		}

		return dados
	}
	catch (error) {
		return error.message;
	}
}

export async function editProduct({ produtoFormatado, id, token }) {
	try {
		const resposta = await fetch(` https://icubus.herokuapp.com/produtos/${id}`, {
			method: 'PUT',
			body: JSON.stringify(produtoFormatado),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});

		const dados = await resposta.json();

		if (resposta.status >= 400) {
			return { erro: dados }
		}

		return dados
	}
	catch (error) {
		return { error: error.message };
	}
}

export async function activateProduct({ id, token }) {
	try {
		const resposta = await fetch(` https://icubus.herokuapp.com/produtos/${id}/ativar`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

		const dados = await resposta.json();

		if (resposta.status >= 400) {
			return { erro: dados }
		}

		return dados

	} catch (error) {

		return error.message;
	}
}

export async function disableProduct({ id, token }) {
	try {
		const resposta = await fetch(` https://icubus.herokuapp.com/produtos/${id}/desativar`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

		const dados = await resposta.json();

		if (resposta.status >= 400) {
			return { erro: dados }
		}

		return dados

	} catch (error) {

		return error.message;
	}
}

export async function deleteProduct({ id, token }) {
	try {
		const resposta = await fetch(`https://icubus.herokuapp.com/produtos/${id} `, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${token}`,
			}
		});

		const dados = await resposta.json();

		if (resposta.status >= 400) {
			return { erro: dados }
		}

		return dados

	}
	catch (error) {
		return console.log(error.message)
	}
}

export async function getCategorias() {
	try {
		const resposta = await fetch(`https://icubus.herokuapp.com/categorias `);

		const dados = await resposta.json();

		if (resposta.status >= 400) {
			return { error: dados }
		}

		return dados

	} catch (error) {
		return { error: error.message }
	}
}


export async function getProfileDetails(token) {
	try {
		const resposta = await fetch('https://icubus.herokuapp.com/perfil', {
			headers: {
				'Authorization': `Bearer ${token}`,
			}
		});
		const dados = await resposta.json();

		if (resposta.status >= 400) {
			return { error: dados }
		}
		return dados
	}
	catch (error) {
		return { error: error.message }
	}
}

export async function putEditProfile(token, perfilEditado) {
	try {
		const resposta = await fetch('https://icubus.herokuapp.com/perfil', {
			method: 'PUT',
			body: JSON.stringify(perfilEditado),
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Bearer ${token}`,
			}
		});
		const dados = await resposta.json();

		if (resposta.status >= 400) {
			return { error: dados }
		}
		return dados
	} catch (error) {
		return { error: error.message }
	}
}

export async function finalizarPedido({ cart, token, id }) {
	try {
		const resposta = await fetch(`https://icubus-clientes.herokuapp.com/restaurantes/${id}/finalizar-pedido`, {
			method: 'POST',
			body: JSON.stringify(cart),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});

		const dados = await resposta.json();

		if (resposta.status >= 400) {
			return { error: dados }
		}

		return dados
	}
	catch (error) {
		return { error: error.message }
	}
}

export async function adicionaEndereco({ data, token }) {
	try {
		const resposta = await fetch('https://icubus-clientes.herokuapp.com/clientes/enderecos', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});

		const dados = await resposta.json();

		if (resposta.status >= 400) {
			return { erro: dados }
		}

		return dados
	}
	catch (error) {
		return error.message;
	}
}

export async function getEndereco(token) {
	try {
		const resposta = await fetch('https://icubus-clientes.herokuapp.com/clientes/enderecos', {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

		const dados = await resposta.json();

		if (resposta.status >= 400) {
			return { erro: dados }
		}

		return dados
	}
	catch (error) {
		return error.message;
	}
}





