const form = document.querySelector("form");

const data_emissao = document.querySelector("#emissao");

const nome_cliente = document.querySelector("#cliente");
const endereco = document.querySelector("#endereco");
const bairro = document.querySelector("#bairro");
const cidade = document.querySelector("#cidade");

data_emissao.valueAsDate = new Date();

form.onsubmit = (e) => {
    e.preventDefault();

    window.capturarDados.getDados({
        cliente: nome_cliente.value,
        endereco: endereco.value,
        bairro: bairro.value,
        cidade: cidade.value
    });
}
