const pdfButton = document.querySelector("#pdfButton");

pdfButton.addEventListener("click", () => {
    window.capturarDados.gerarPDF();
})