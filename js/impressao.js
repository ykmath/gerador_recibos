const pdfButton = document.querySelector("#pdfButton");

pdfButton.addEventListener("click", () => {
    const nome = document.querySelector("#dados-cliente_nome").textContent;
    window.capturarDados.gerarPDF(nome);
})