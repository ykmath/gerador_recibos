const form = document.querySelector("form");

const nome_cliente = document.querySelector("#cliente");

form.onsubmit = (e) => {
    e.preventDefault();
    const nome = nome_cliente.value;
    window.capturarDados.getDados(nome);
}