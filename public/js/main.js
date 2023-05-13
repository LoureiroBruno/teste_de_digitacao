/**
 *  LEMBRETES
 *  no objeto e função, se quiser obter o valor do objeto então fica: obj.fn
 *  se quiser passar um valor no objeto então: obj.fn(valor)
 */

var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();


$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
    atualizaPlacar();
    $("#usuarios").selectize({
        create: true,
        sortField: 'text',
    })
    $(".tooltip").tooltipster();
});


function atualizaTamanhoFrase() {
    /** obj.função */
    var frase = $(".frase").text();
    /** quebrar em partes em "" no quantitativo */
    var numPalavras = frase.split(" ").length;
    /** obtem elemento*/
    var tamanhoFrase = $("#tamanho-frase");
    /** inclui o elemento numPalavras em elemento*/
    tamanhoFrase.text(numPalavras);
}


function inicializaContadores() {
    /** ao clicar função "click" e substituido por input ao digitar*/
    campo.on("input", function () {
        /** Lembrando que o val nos dá acesso ao que está dentro de uma tag de input, como as tags input e textarea. Já o text nos dá acesso ao que está dentro de uma tag de texto, como p, span e h1 */
        var conteudo = campo.val();
        /** var qtdPalavras = conteudo.split(" ").length;*/
        /** expressão regular - espaços não são mais considerados como palavras*/
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}


function inicializaCronometro() {
    /** one - executa uma unica vez por ready */
    campo.one("focus", function () {
        var tempoRestante = $("#tempo-digitacao").text();
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                /** finaliza o setInterval com o ID */
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}


function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}


function inicializaMarcadores() {
    campo.on("input", function () {
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}


function reiniciaJogo() {
    /** função de atalho click() */
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);

    inicializaCronometro();
     /** campo.removeClass("campo-desativado") */;
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
};


function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}