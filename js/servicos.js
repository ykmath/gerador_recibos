const lista = document.querySelector("#servicos-lista");
const adicaoModo = document.querySelector("#servicos-modo-adicao");

const h3 = document.querySelector("#servicos > h3");

const addBtn = document.querySelector("#add");
const adicaoAddBtn = document.querySelector("#adicao-add");
const adicaoCancelarBtn = document.querySelector("#adicao-cancelar");

const adicaoDesc = document.querySelector("#adicao-descricao");
const adicaoValor = document.querySelector("#adicao-valor");
const adicaoQtd = document.querySelector("#adicao-quantidade");

addBtn.addEventListener("click", () => {
    changeMode(true);
})

adicaoAddBtn.addEventListener("click", () => {
    adicionarServico();
    changeMode(false);
})

adicaoCancelarBtn.addEventListener("click", () => {
    changeMode(false);
})

function format(n) {
    return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function changeMode(val) {
    if (val) {
        lista.style.display = "none";
        adicaoModo.style.display = "flex";

        h3.style.display = "inline-block";

        addBtn.style.display = "none";
        adicaoAddBtn.style.display = "block";
        adicaoCancelarBtn.style.display = "block";
    } else {
        lista.style.display = "block";
        adicaoModo.style.display = "none";

        h3.style.display = "none";

        adicaoDesc.value = "";
        adicaoValor.value = null;
        adicaoQtd.value = 1;
        
        addBtn.style.display = "block";
        adicaoAddBtn.style.display = "none";
        adicaoCancelarBtn.style.display = "none";
    }
}

function adicionarServico() {
    const box = document.createElement("li");

    const sDesc = document.createElement("p");
    const sVal = document.createElement("p");
    const sQtd = document.createElement("p");
    const trash = document.createElement("div");

    sDesc.id = "servico-descricao";
    sVal.id = "servico-valor";
    sQtd.id = "servico-quantidade";
    trash.id = "servico-lixeira";

    trash.addEventListener("click", () => {box.remove()});

    sDesc.textContent = adicaoDesc.value !== "" ? adicaoDesc.value : "Sem descrição";
    sVal.textContent = format(parseFloat(adicaoValor.value !== "" ? adicaoValor.value : 0));
    sQtd.textContent = adicaoQtd.value;

    box.append(sDesc, sVal, sQtd, trash);

    lista.appendChild(box);
}