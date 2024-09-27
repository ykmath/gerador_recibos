// Datas

const data_emissao = document.querySelector("#header-box-data_emissao");
const data_saida = document.querySelector("#header-box-data_saida");

// Informações do Cliente

const cliente_nome = document.querySelector("#dados-cliente_nome");
const endereco = document.querySelector("#dados-cliente-endereco");
const bairro = document.querySelector("#dados-cliente-bairro");
const cidade = document.querySelector("#dados-cliente-cidade");
const uf = document.querySelector("#dados-cliente-uf");
const fone = document.querySelector("#dados-cliente-fone");
const cep = document.querySelector("#dados-cliente-cep");
const insc = document.querySelector("#dados-cliente-insc");
const cpf_cnpj = document.querySelector("#dados-cliente-cpf_cnpj");

// Faturas

const fatura1 = document.querySelector("#dados-fatura1");
const vencimento1 = document.querySelector("#dados-fatura1-vencimento");
const valor1 = document.querySelector("#dados-fatura1-valor");

const fatura2 = document.querySelector("#dados-fatura2");
const vencimento2 = document.querySelector("#dados-fatura2-vencimento");
const valor2 = document.querySelector("#dados-fatura2-valor");

// Serviços

const servicosLista = document.querySelector("#servicos");

function invertDate(date) {
    const split = date.split("-");

    const year = split[0];
    split[0] = split[2];
    split[2] = year;

    return `${split[0]}/${split[1]}/${split[2]}`;
}

function format(n) {
    return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

window.capturarDados.setDados((dados) => {
    // Datas

    data_emissao.textContent = invertDate(dados.data_emissao);
    data_saida.textContent = invertDate(dados.data_saida);
    
    // Informações do Cliente

    cliente_nome.textContent = dados.cliente;
    endereco.textContent = dados.endereco;
    bairro.textContent = dados.bairro;
    cidade.textContent = dados.cidade;
    uf.textContent = dados.uf;
    fone.textContent = dados.fone;
    cep.textContent = dados.cep;
    insc.textContent = dados.insc;
    cpf_cnpj.textContent = dados.cpf_cnpj;

    // Faturas

    fatura1.textContent = "1";
    vencimento1.textContent = invertDate(dados.vencimento1);
    valor1.textContent = format(parseFloat(dados.valor1));

    if (dados.vencimento2 !== "") {
        fatura2.textContent = "2";
        vencimento2.textContent = invertDate(dados.vencimento2);
        valor2.textContent = format(parseFloat(dados.valor2));
    }

    // Serviços

    let total = 0;

    dados.servicos.map((servico) => {
        const row = document.createElement("tr");
    
        const col1 = document.createElement("td");
        const col2 = document.createElement("td");
        const col3 = document.createElement("td");
        const col4 = document.createElement("td");

        const unf = parseFloat(servico.valor.substring(2).replace(".", "").replace(",", "."));

        const val = unf * parseInt(servico.qtd);
    
        row.append(col1, col2, col3, col4);
    
        row.className = "servicos-box-row";
    
        col1.className = "servicos-box-col";
        col2.className = "servicos-box-col";
        col3.className = "servicos-box-col";
        col4.className = "servicos-box-col";

        col1.textContent = servico.qtd;
        col2.textContent = servico.desc;
        col3.textContent = format(unf);
        col4.textContent = format(val);

        total += val;

        servicosLista.appendChild(row);
    })

    const row = document.createElement("tr");
    
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");

    row.append(col1, col2);

    row.className = "servicos-box-row-sum";

    col1.className = "servicos-box-col";
    col1.setAttribute("colspan", 3);

    col2.className = "servicos-box-col";
    
    col1.innerHTML = "<strong>VALOR TOTAL</strong>";
    col2.innerHTML = `<strong>${format(total)}</strong>`;

    servicosLista.appendChild(row);
})