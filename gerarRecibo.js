const cliente_nome = document.querySelector("#dados-cliente_nome");
const endereco = document.querySelector("#dados-cliente-endereco");
const bairro = document.querySelector("#dados-cliente-bairro");
const cidade = document.querySelector("#dados-cliente-cidade");

window.capturarDados.setDados((dados) => {
    cliente_nome.textContent = dados.cliente;
    endereco.textContent = dados.endereco;
    bairro.textContent = dados.bairro;
    cidade.textContent = dados.cidade;
})