function selecionarBebidasAlcoolicas(bebidaAlcoolica) {
  let bebidaAlcoolicaSelecionada = document.querySelector(".pratos .escolhido");

  if (!!bebidaAlcoolicaSelecionada) {
    bebidaAlcoolicaSelecionada.classList.remove("escolhido");
  }

  bebidaAlcoolica.classList.add("escolhido");
  verificarSelecao();
}

function selecionarBebidas(bebida) {
  let bebidaSelecionada = document.querySelector(".bebidas .escolhido");

  if (!!bebidaSelecionada) {
    bebidaSelecionada.classList.remove("escolhido");
  }

  bebida.classList.add("escolhido");
  verificarSelecao();
}

function selecionarSobremesas(sobremesa) {
  let sobremesaSelecionada = document.querySelector(".sobremesas .escolhido");

  if (!!sobremesaSelecionada) {
    sobremesaSelecionada.classList.remove("escolhido");
  }

  sobremesa.classList.add("escolhido");
  verificarSelecao();
}

function verificarSelecao() {
  const verifica = document.querySelectorAll(".escolhido").length;
  const footer = document.querySelector("footer");

  if (verifica === 3) {
    footer.firstElementChild.classList.add("escondido");
    footer.lastElementChild.classList.remove("escondido");
  }
}

function formatarPreco(valor) {
  let preco = valor
    .querySelector(".valor")
    .innerHTML.replace("R$", "")
    .replace(",", ".");

  preco = (Number(preco) * 100) / 100;

  return preco;
}

function fechandoPedido() {
  let pedido = {};
  let bebidaAlcoolicaSelecionada = document.querySelector(".pratos .escolhido");
  let bebidaSelecionada = document.querySelector(".bebidas .escolhido");
  let sobremesaSelecionada = document.querySelector(".sobremesas .escolhido");

  const nomeBebidaAlcoolica = bebidaAlcoolicaSelecionada.querySelector(".nome").innerHTML;
  const nomeBebida = bebidaSelecionada.querySelector(".nome").innerHTML;
  const nomeSobremesa =
    sobremesaSelecionada.querySelector(".nome").innerHTML;

  const precoBebidaAlcoolica = formatarPreco(bebidaAlcoolicaSelecionada);
  const precoBebida = formatarPreco(bebidaSelecionada);
  const precoSobremesa = formatarPreco(sobremesaSelecionada);

  const precoTotal = (precoBebidaAlcoolica + precoBebida + precoSobremesa).toFixed(2);

  pedido = {
    nomeBebidaAlcoolica,
    nomeBebida,
    nomeSobremesa,
    precoBebidaAlcoolica,
    precoBebida,
    precoSobremesa,
    precoTotal,
  };

  return pedido;
}

function confirmaPedido() {
  document
    .querySelector(".tela-de-confirmacao")
    .classList.remove("nenhuma-selecao");

  monstraItensDoPedido();
}

function monstraItensDoPedido() {
  const {
    nomeBebidaAlcoolica,
    nomeBebida,
    nomeSobremesa,
    precoBebidaAlcoolica,
    precoBebida,
    precoSobremesa,
    precoTotal,
  } = fechandoPedido();

  const itensDoPedido = document.querySelector(".itens-confirmacao");
  itensDoPedido.innerHTML = `
    <li class="item">
      <h6 class="nome">${nomeBebidaAlcoolica}</h6>
      <h6 class="preco">${precoBebidaAlcoolica.toFixed(2)}</h6>
    </li>
    <li class="item">
    <h6 class="nome">${nomeBebida}</h6>
    <h6 class="preco">${precoBebida.toFixed(2)}</h6>
    </li>
    <li class="item">
    <h6 class="nome">${nomeSobremesa}</h6>
    <h6 class="preco">${precoSobremesa.toFixed(2)}</h6>
    </li>
    <li class="item total">
      <h5 class="total-texto">TOTAL</h5>
      <h5 class="total-valor">R$ ${precoTotal}</h5>
    </li>
  `;
}

function enviaPedido() {
  const { nomeBebidaAlcoolica, nomeBebida, nomeSobremesa, precoBebidaAlcoolica,
    precoBebida, precoSobremesa, precoTotal } = fechandoPedido();

  const mensagemDoPedido = `Olá, gostaria de fazer o pedido: \n
    - Bebida Alcoolica: ${nomeBebidaAlcoolica} - ${precoBebidaAlcoolica} \n
    - Bebida: ${nomeBebida} - ${precoBebida} \n
    - Sobremesa: ${nomeSobremesa} - ${precoSobremesa} \n
    Total: R$ ${precoTotal}`;

  const linkWhatsApp = `https://wa.me/5511933316252?text=${encodeURIComponent(
    mensagemDoPedido
  )}`;

  window.open(linkWhatsApp);
}

function cancelaPedido() {
  document
    .querySelector(".tela-de-confirmacao")
    .classList.add("nenhuma-selecao");

  const finalizarPedido = document.querySelector("footer");

  finalizarPedido.firstElementChild.classList.remove("escondido");
  finalizarPedido.lastElementChild.classList.add("escondido");

  let itensEscolhidos = document.querySelectorAll(".escolhido");

  itensEscolhidos.forEach((item) => {
    item.classList.remove("escolhido");
  });
}
