const form = document.querySelector("form");

// Datas

const data_emissao = document.querySelector("#emissao");
const data_saida = document.querySelector("#saida");

const hoje = new Date();
hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());

data_emissao.valueAsDate = hoje;

// Informações do Cliente

const nome_cliente = document.querySelector("#cliente");
const endereco = document.querySelector("#endereco");
const bairro = document.querySelector("#bairro");
const cidade = document.querySelector("#cidade");
const uf = document.querySelector("#uf");
const fone = document.querySelector("#fone");
const cep = document.querySelector("#cep");
const insc = document.querySelector("#insc");
const cpf_cnpj = document.querySelector("#cpf-cnpj");

// Faturas

const vencimento1 = document.querySelector("#vencimento1");
const valor1 = document.querySelector("#valor1");

const vencimento2 = document.querySelector("#vencimento2");
const valor2 = document.querySelector("#valor2");

// Serviços

const listaa = document.querySelector("#servicos-lista");

form.onsubmit = (e) => {
    e.preventDefault();

    const list = [];

    Array.from(listaa.children).map((child) => {
        const obj = {};

        obj.desc = child.querySelector("#servico-descricao").textContent;
        obj.valor = child.querySelector("#servico-valor").textContent;
        obj.qtd = child.querySelector("#servico-quantidade").textContent;

        list.push(obj);
    })

    window.capturarDados.getDados({
        data_emissao: data_emissao.value,
        data_saida: data_saida.value,
        cliente: nome_cliente.value,
        endereco: endereco.value,
        bairro: bairro.value,
        cidade: cidade.value,
        uf: uf.value,
        fone: fone.value,
        cep: cep.value,
        insc: insc.value,
        cpf_cnpj: cpf_cnpj.value,
        vencimento1: vencimento1.value,
        valor1: valor1.value,
        vencimento2: vencimento2.value,
        valor2: valor2.value,
        servicos: list
    });
}
