// criando o titulo do site
/*

// document para pegar um arquivo do HTML .queryselector 
//para especificar qual sera
let titulo = document.querySelector("h1");

//.innerHTML para mudar algo no html
// colocando a string do texto
titulo.innerHTML = "jogo do número";


//fazendo um paragrafo
let paragrafo = document.querySelector("p");

//.innerHTML para mudar algo no html
// colocando a string do texto
paragrafo.innerHTML = "escolha um número de 1 há 10";

*/

//----------------------------------------------------------------

//criando lista para numero sorteados
let lista_numero_sorteados = [];

//variavel para numero limite do jogo e lista
let numero_limite = 10;

//criando variavel do numero secreto
let numero_secreto = gerar_numero_aleatorio();

//variavel para tentativas, ja começa com 1 pq sempre tent no min 1 vez
let tentativas = 1

//criando titulo do site de forma mais bonita usando função
function criando_texto(tag, texto)
{
    let campo = document.querySelector(tag, texto);
    campo.innerHTML = texto;
    //colocando voz no jogo
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}

// criando função para os titulos e facilitar na hora de reiniciar
function titulo_inicial ()
{
criando_texto ("h1", "Jogo do número");
criando_texto ("p", `Escolha um número entre 1 e ${numero_limite}`);
}
//chamando função de texto
titulo_inicial();

//criando função para botão de chute
function verificar_chute()
{
    let chute = document.querySelector("input").value;
    
    //fazendo aparecer mensagem ao acertar o numero

    if (chute == numero_secreto) // acertando
    {
        criando_texto ("h1", "parabéns!!!");
        let singular = tentativas > 1 ? "tentativas" : "tentativa"; //plurao ou singular
        let mensagem_tentativa = `você acertou com: ${tentativas} ${singular}`
        criando_texto ("p", mensagem_tentativa);
        //ativando botão de novo jogo
        document.getElementById("reiniciar").removeAttribute("disabled");
    }
    else //caso erre
    {
        //caso coloque um numero maior que o secreto
      if (chute > numero_secreto)
      {
        criando_texto ("h1", "ERROU ANIMAL!!");
        criando_texto ("p", "o numero secreto é menor que esse");
      }
      else //se não errou e não foi maior só pode ser menor
      {
        criando_texto ("h1", "ERROU ANIMAL!!");
        criando_texto ("p", "o numero secreto é maior que esse");
      }

      //acrescentando 1 tentativa a cada erro
      tentativas ++;
      //zerando o campo de numero
      limpar_campo();
    }
}

//gerar o numero aleatório 
function gerar_numero_aleatorio()
{
    //gerando numero aleatorio de 1 a 10
     let numero_escolhidos = parseInt(Math.random() * numero_limite + 1);
     //variavel para pegar apenas a quantidade da lista
     let quantidade_da_lista = lista_numero_sorteados.length;

     //caso sorteie todos os numero ele ira zerar a lista
     if (quantidade_da_lista == numero_limite)
     {
        lista_numero_sorteados = [];
     }

     //verificando se o numero sorteado esta na lista d ja sorteado
     if (lista_numero_sorteados.includes(numero_escolhidos))
     {
        //caso ja tenha sido sorteado ira retornar:
        return gerar_numero_aleatorio();
     }
     else
     {
      //colocando o numero q sorteou na lista de ja sorteados
      lista_numero_sorteados.push(numero_escolhidos);

console.log (lista_numero_sorteados)

      //caso não tenha sorteado ira reotnar o numero q foi gerado msm
      return numero_escolhidos;
     }

}

//criando fução para limpar o campo após errar
function limpar_campo()
{
    chute = document.querySelector("input"); //linha em que vamos mexer
    chute.value = ""; //fazendo o numero virar uma string vazia (0)
}

// criando função para reiniciar o jogo quando apertar o botão

function reiniciar_jogo() 
{
  //criando o jogo novamente gerando outro numero aleatorio, limpando campo etc...
  numero_secreto = gerar_numero_aleatorio();
  limpar_campo();
  tentativas = 1;
  titulo_inicial();
  //fazendo botão de reiniciar voltar em branco novamente
  document.getElementById("reiniciar").setAttribute("disabled",
  true);
}