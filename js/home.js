//Simula usuarios vindo do backend
let usuarios = [
  {
    id: 1,
    nome: "Carlos Moraes",
    cpf: "741.852.963-17",
    logradouro: "Av. Epitácio Pessoa 580, João Pessoa/PB",
  },
  {
    id: 2,
    nome: "Eduardo de Sousa",
    cpf: "654.789.741-05",
    logradouro: "Av. Epitácio Pessoa 580, João Pessoa/PB",
  },
  {
    id: 3,
    nome: "Rafaela Sousa",
    cpf: "123.987.456-07",
    logradouro: "Rui Carneiro 58, João Pessoa/PB",
  },
];

$(document).ready(function () {
  listaUsuarios();
});


function listaUsuarios() {
  let concatUsuarios = "";
  usuarios.map((usuario) => {
    concatUsuarios += `<tr>
							<th scope="row">${usuario.id}</th>
							<td>${usuario.nome}</td>
							<td>${usuario.cpf}</td>
							<td>${usuario.logradouro}</td>
							<td><i class="fa-sharp fa-solid fa-pen-to-square"></i></td>
							<td><i class="fa-solid fa-trash-can"></i></td>
						</tr>`;
  });

  $("#tbodyListaUsuarios").html(concatUsuarios);
  $("#divNumeroTotalUsuarios").html("Total: " + usuarios.length);
}

$("#btnAdicionarUsuario").click(() => {
  $("#modalCadastroEdicaoUsuario").modal("show");
});

$("#inputCep").keyup(() => {
  if ($("#inputCep").val().length == 8) {
    buscaCep($("#inputCep").val());
  }
});

function buscaCep(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
    response.json().then((data) => {
      $("#inputLogradouro").val(data.logradouro)
      $("#inputBairro").val(data.bairro)
      $("#inputCidade").val(data.localidade)
      $("#inputUf").val(data.uf)
    });
  });

}

$("#formCadastroUsuario").submit((e) => {
  e.preventDefault();
  
  const objUsuario = {
    id: 0,
    nome: $("#inputNome").val(),
    cpf: $("#inputCpf").val(),
    cep: $("#inputCep").val(),
    logradouro: $("#inputLogradouro").val(),
    num: $("#inputNum").val(),
    bairro: $("#inputBairro").val(),
    cidade: $("#inputCidade").val(),
    uf: $("#inputUf").val(),
  }

  usuarios.push(objUsuario);
  $("#modalCadastroEdicaoUsuario").modal("hide");
  listaUsuarios();
})
