class Alunos {
  constructor(nomeAluno, av1, av2){
    this.nomeAluno = nomeAluno
    this.av1 = parseFloat(av1) || 0
    this.av2 = parseFloat(av2) || 0
    this.media = ((this.av1 + this.av2) /2).toFixed(2)
    this.status = this.status(this.media)
  }
  apresentarMedia() {
    console.log(`${this.nomeAluno} ${this.av1}+${this.av2} = ${this.media}`)
  }
  status(media) {
    if(media >= 7){
      this.status = "APROVADO"
      return this.status
    }else{
      this.status = "REPROVADO"
      return this.status
    }
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

function createTableRow(nomeAluno, av1, av2, media, status) {
  var linha = document.createElement('tr')
  var col1 = document.createElement('td')
  var col2 = document.createElement('td')
  var col3 = document.createElement('td')
  var col4 = document.createElement('td')
  var col5 = document.createElement('td')
  
  tabela.appendChild(linha)

  col1.textContent = nomeAluno
  col2.textContent = av1
  col3.textContent = av2
  col4.textContent = media
  col5.innerHTML = `<strong>${status}</strong>`
  if(col5.textContent == 'APROVADO'){
    col5.classList.add('aprovado')
  }else{
    col5.classList.add('reprovado')
  }

  linha.appendChild(col1)
  linha.appendChild(col2)
  linha.appendChild(col3)
  linha.appendChild(col4)
  linha.appendChild(col5)
  //add na linha
  tabela.appendChild(linha)
}

function addAlunosToTable() {
  const { nome, notaAv1, notaAv2 } = getFormData()
  const { nomeLimpo, notaAv1Limpa, notaAv2Limpa } = cleanData(nome, notaAv1, notaAv2)
  for (let i = 0; i < nomeLimpo.length; i++) {
    const aluno = notaAluno({ nome: nomeLimpo[i], av1: notaAv1Limpa[i], av2: notaAv2Limpa[i] })
    aluno.apresentarMedia()
    createTableRow(nomeLimpo[i], notaAv1Limpa[i], notaAv2Limpa[i], aluno.media, aluno.status)
  }
}


enviarDadosButton .addEventListener('click', addAlunosToTable)