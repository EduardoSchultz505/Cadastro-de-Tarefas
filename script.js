const url = "http://159.65.228.63/produtos"

function salvar() {
    let dados = {
        prioridade: document.querySelector("input[name='prioridade']:checked")?.value || "",
        descricao: document.getElementById('desc').value,
        local: document.getElementById('local').value,
        recursosNecessarios: recursos(document.getElementById('recursos').value),
        dataLimite: formatarData(document.getElementById('hora').value),
        matricula: document.getElementById('matricula').value
    }

    if (!dados.prioridade || !dados.descricao || !dados.local || !dados.dataLimite || !dados.matricula) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    else {
        console.log(dados)
        fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(dados)
        })
    }
    console.log(dados)
}

async function atualizar() {
    alert("produto salvo com sucesso")
    const response = await fetch(url)
    const dados = await response.JSON
}

function recursos(data) {
    let resultado = []
    for (let item of data.split(",")) {
        item = item.trim();
        if (item) resultado.push(item)
    }
    return resultado
}

function formatarData(dados) {
    let [data, hora] = dados.split("T")
    let [ano, mes, dia] = data.split("-")
    return `${dia}/${mes}/${ano} ${hora}`
}

async function carregarDados() {
    const resp = await fetch(url)
    const dados = await resp.json()

    criarTabela(dados)
}

function criarTabela(lista) {
    const container = document.getElementById("tabela-container")

    const tabela = document.createElement("table")
    tabela.id = "tabela-dados"
    tabela.className = "tabela"
    container.appendChild(tabela)

    const th1 = document.createElement("thead")
    th1.innerHTML = `
                <tr>
                    <th>Prioridade</th>
                    <th>Descrição</th>
                    <th>Local</th>
                    <th>Recursos</th>
                    <th>Data/Hora</th>
                    <th>Matrícula</th>
                    <th>ID</th>
                </tr>
            `
    tabela.appendChild(th1)

    const td1 = document.createElement("tbody")

    lista.forEach(item => {
        const tr = document.createElement("tr")

        if (item.prioridade === "Urgente") {
            tr.style.color = "red"
        }

        tr.innerHTML = `
                    <td>${item.prioridade}</td>
                    <td>${item.descricao}</td>
                    <td>${item.local}</td>
                    <td>${item.recursosNecessarios}</td>
                    <td>${item.dataLimite}</td>
                    <td>${item.matricula}</td>
                    <td>${item.id}</td>
                `
        td1.appendChild(tr)
    });

    tabela.appendChild(td1)
}