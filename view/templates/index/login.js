const userElement = document.querySelector("#user-icon");
const loginElement = document.querySelector("#login-form");
//localStorage.removeItem("user");
let localUser = JSON.parse(localStorage.getItem("user"));
var isOpen;

userElement.addEventListener("click", event => {
    if (event.target == userElement) {
        userElement.childNodes.forEach (child => {
            try {
                if (isOpen) {
                    child.classList.remove("view");
                    isOpen = false;
                    console.log("aqui");
                } else if (!isOpen && localUser === null) {
                    isOpen = true;
                    let loginElement = document.querySelector("#login-form");
                    loginElement.classList.toggle("view");
                    console.log("Nada logado")
                    return
                } else if (!isOpen) {
                    if (userElement.querySelector("#profile-menu") === null) {
                        let profileElement = document.createElement("div");
                        profileElement.setAttribute("id", "profile-menu");
                        profileElement.innerHTML = 
                            `<p>${localUser["name"]}</p>
                            <p>${localUser["email"]}</p>
                            <a>Meu Perfil</a>
                            <a>Carrinho</a>
                            <a>Configurações</a>
                            <a id="logout-button">Sair</a>
                            `
                        userElement.appendChild(profileElement);
                        console.log("aqui3")
                    }
                    isOpen = true;
                    let profileElement = document.querySelector("#profile-menu")
                    profileElement.classList.toggle("view");
                    console.log("aqui2")
                    return
                }
            } catch (e) {}
        })
    }
})


loginElement.addEventListener("submit", event => {
    event.preventDefault();
    let usernameLogin = document.querySelector("#login-username");
    let passwordLogin = document.querySelector("#login-password");

    if (usernameLogin.value == "") {
        usernameLogin.setAttribute("placeholder", "Insira o login");
    } else if (passwordLogin.value == "") {
        passwordLogin.setAttribute("placeholder", "Insira a senha")    
    } else {
        fetch(`/model/repositories/UserRepository.json`)
            .then(response => response.json())
            .then(data => {
                let exists = false;
                let isAuthenticated = false;

                //login
                for (let i = 0; i < data.length; i++)
                {
                    if (data[i]["username"] === usernameLogin.value) {
                        exists = true;
                        if (data[i]["password"] === passwordLogin.value) {
                            isAuthenticated = true;
                            localStorage.setItem("user", JSON.stringify(data[i]));
                            console.log("Logado")
                            break;
                        }
                        passwordLogin.value = "";
                        passwordLogin.setAttribute("placeholder", "Senha incorreta")    

                        break;
                    } 
                }
                if (!exists) {
                    usernameLogin.value = "";
                    usernameLogin.setAttribute("placeholder", "Usuário inexistente")
                    passwordLogin.value = "";
                }

                //efeitos visuais caso logado

            });
    }

    if (passwordLogin.value == "") {
        passwordLogin.setAttribute("placeholder", "Campo vazio!")    
    }
})