$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);
 
function inserePlacar(){
    var placar = $(".placar");
    /** recebe como parâmetro seletores CSS e busca em seus filhos algum elemento que atenda aquela busca*/
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();
   

    /** é apenas uma string antes de ser adicionada no HTML. Só conseguimos atrelar eventos à elementos! 
     *  var botaoRemover = "<a href='#' title='Remover linha'><i class='small material-icons'>delete</i></a>" ;
    var linha = "<tr>"+
                        "<td>"+ usuario + "</td>"+
                        "<td>"+ numPalavras + "</td>"+
                        "<td>"+ botaoRemover + "</td>"
                "</tr>"; */

    /** Por isso, vamos mudar o modo de criação da linha e vamos criar um elemento HTML, que será nossa linha, dentro do Javascript antes de colocá-la no placar. */
    var linha = novaLinha(usuario, numPalavras);
    /** Encontrar dentro de linha a classe botao-remover - execute função remover linha */
    linha.find(".botao-remover").click(removeLinha);
    corpoTabela.prepend(linha);

    /** Ao finalizar partida exibir placar */
    $(".placar").slideDown("fast");
    scrollPlacar();

}


function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;

    $("html, body").animate(
    {
        scrollTop: posicaoPlacar+"px"
    }, 1000);
}


function novaLinha(usuario, numPalavras) {
    var linha = $("<tr>");
     /** criado e passar o valor de usuário na coluna */
    var colunaUsuario = $("<td>").text(usuario);
     /** criado e passar o valor de palavras na coluna */
    var colunaPalavras = $("<td>").text(numPalavras);
     /** criado e irar passar o valor delete na coluna */
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href","#").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

     /** Icone dentro do <a> */
     link.append(icone);

     /**  <a> dentro do <td> */
     colunaRemover.append(link);
 
     /**  Os três <td> dentro do <tr> */
     linha.append(colunaUsuario);
     linha.append(colunaPalavras);
     linha.append(colunaRemover);

     return linha;
}


function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();

    linha.fadeOut(1000);
    /** Agurada 1 segundo para executar a ação remover */
    setTimeout(function() {
        linha.remove();
    }, 1000);
}


function mostraPlacar() {
    /** slideToggle de forma suave em milisegundos != toggle */
    // $(".placar").slideToggle(600); 
    /** Executa a ultima ação do click - stop() */
    $(".placar").stop().slideToggle(600);
}


function sincronizaPlacar(){
    /** inicia array vazio */
    var placar = [];
    /** captura as filhas tr que são diretas dentro do tbody */
    var linhas = $("tbody>tr");
    /** para cada linha obter as colunas usuario e palavras */
    linhas.each(function(){
        /** encontrar filhos com o valor */
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        /** 
         * A estrutura que devemos enviar para o servidor é um array de objetos, então salvar os dados que obtemos 
         * de cada linha dentro um novo objeto: 
         * */
        var score = {
            usuario: usuario,
            pontos: palavras            
        };

        /** adicionado dentro do array placar utilizando a função push do Javascript */
        /** um arry com dois objetos */
        placar.push(score);
    });

    /** 
     * só podemos enviar como dados das funções de AJAX do jQuery um Objeto ou uma String, por isso vamos colocar o nosso 
     * array placar dentro de um objeto antes de passá-lo para a função $.post: 
     * */
    var dados = {
        placar: placar
    };

    /** enviar para o servidor */
    $.post("http://localhost:3000/placar", dados, function(){
    }).done(function(){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Atualizado com Sucesso',
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
            confirmButtonText: 'Entendido'
        })
    })
}


function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        });
    });
}