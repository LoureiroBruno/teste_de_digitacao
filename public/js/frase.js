$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
    /** iniciar spinner ao clicar botão */
    $("#spinner").toggle();

    $.get("http://localhost:3000/frases",trocaFraseAleatoria)
    .done(function(){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Encontrado com Sucesso',
            showConfirmButton: false,
            timer: 1000
        })
    })
    .fail(function(){
        Swal.fire({
            icon: 'error',
            title: 'Falha de Comunicação',
            text: 'por favor, tente novamente!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Entendido',
        })
    })
    .always(function(){
        /** fechar spinner ao cocluir requisição*/
        $("#spinner").toggle();
    });
}


function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length)

    /** retorno da frase conforme indice frase[indice]*/
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}


function buscaFrase() {
    /** iniciar spinner ao clicar botão */
    $("#spinner").toggle();

    /** criacao do objeto JS que guarda a id */
    var fraseId = $("#frase-id").val();
    var dados = {id : fraseId}; 
 
    /** passando objeto como segundo parâmetro */
    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .done(function(){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Encontrado com Sucesso',
            showConfirmButton: false,
            timer: 1000
        })
    })
    .fail(function(){
        Swal.fire({
            icon: 'error',
            title: 'Falha de Comunicação',
            text: 'por favor, tente novamente!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Entendido',
            footer: 'valor digitado [<b>' + dados.id + '</b>] inexistente'
        })
        $("#frase-id").val("");
    })
    .always(function(){
        /** fechar spinner ao cocluir requisição*/
        $("#spinner").toggle();
        $("#frase-id").val("");
    });
}


function trocaFrase(data) {
    var frase = $(".frase");
    frase.text(data.texto); 
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}