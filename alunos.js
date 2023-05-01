class Alunos {
  constructor(nomeAluno, av1, av2){
    this.nomeAluno = nomeAluno
    this.av1 = parseFloat(av1) || 0
    this.av2 = parseFloat(av2) || 0
    this.media = ((this.av1 + this.av2) /2).toFixed(2)
  }
  apresentarMedia() {
    console.log(`${this.nomeAluno} ${this.av1}+${this.av2} = ${this.media}`)
  }
}

function notaAluno(dados){
  const {nome, av1, av2} = dados
  return new Alunos(nome, av1, av2)
}

const enviarDadosButton = document.getElementById('enviarDados')
const tabela = document.getElementById('tabela');

//criar uma array vazia para puxar os valores


function getFormData() {
  const nome = document.getElementById('nomeAlunos').value
  const notaAv1 = document.getElementById('notaAv1Aluno').value
  const notaAv2 = document.getElementById('notaAv2Aluno').value

  return { nome, notaAv1, notaAv2 }
}

function cleanData(nome, av1, av2) {
  const nomeLimpo = nome.split(';')
  const notaAv1Limpa = av1.split(';')
  const notaAv2Limpa = av2.split(';')
  return { nomeLimpo, notaAv1Limpa, notaAv2Limpa }
}

function createTableRow(nomeAluno, av1, av2, media) {
  var linha = document.createElement('tr')
  var col1 = document.createElement('td')
  var col2 = document.createElement('td')
  var col3 = document.createElement('td')
  var col4 = document.createElement('td')
  tabela.appendChild(linha)

  col1.textContent = nomeAluno
  col2.textContent = av1
  col3.textContent = av2
  col4.textContent = media

  linha.appendChild(col1)
  linha.appendChild(col2)
  linha.appendChild(col3)
  linha.appendChild(col4)
  tabela.appendChild(linha)
}

function addAlunosToTable() {
  const { nome, notaAv1, notaAv2 } = getFormData()
  const { nomeLimpo, notaAv1Limpa, notaAv2Limpa } = cleanData(nome, notaAv1, notaAv2)
  for (let i = 0; i < nomeLimpo.length; i++) {
    const aluno = notaAluno({ nome: nomeLimpo[i], av1: notaAv1Limpa[i], av2: notaAv2Limpa[i] })
    aluno.apresentarMedia()
    createTableRow(nomeLimpo[i], notaAv1Limpa[i], notaAv2Limpa[i], aluno.media)
  }
}


enviarDadosButton .addEventListener('click', addAlunosToTable)