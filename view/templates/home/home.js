function carregarElementos() {
    // Carregar cabeçalho
    var xhrHeader = new XMLHttpRequest();
    xhrHeader.open("GET", "/index-menu.html", true);
    xhrHeader.onreadystatechange = function () {
        if (xhrHeader.readyState == 4 && xhrHeader.status == 200) {
            document.querySelector(".header-content").innerHTML = xhrHeader.responseText;
        }
    };
    xhrHeader.send();

    // Carregar rodapé
    var xhrFooter = new XMLHttpRequest();
    xhrFooter.open("GET", "/index-footer.html", true);
    xhrFooter.onreadystatechange = function () {
        if (xhrFooter.readyState == 4 && xhrFooter.status == 200) {
            document.querySelector(".footer").innerHTML = xhrFooter.responseText;
        }
    };
    xhrFooter.send();

}

// Quando o documento estiver pronto, chamar a função para carregar os elementos
document.addEventListener("DOMContentLoaded", function () {
    carregarElementos();
});
