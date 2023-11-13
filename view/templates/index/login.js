const userElement = document.querySelector("#user-icon");
const loginElement = document.querySelector("#login-form");
const signupButton = document.querySelector("#signup-link");
localStorage.removeItem("user");
let localUser = JSON.parse(localStorage.getItem("user"));

//escolher a tela que abrirá
userElement.addEventListener("click", event => {
    if (event.target == userElement) {
        userElement.childNodes.forEach (child => {
            try {
                if (child.nodeType !== Node.TEXT_NODE) {
                    if (child.classList.contains("view")) {
                        child.classList.remove("view");
                        console.log("Removendo: ")
                        console.log(child)
                    } else if (!child.classList.contains("view") && localUser === null) {
                        let loginElement = document.querySelector("#login-form");
                        loginElement.classList.toggle("view");
                        console.log("Nenhuma sessão de usuário encontrada!")
                    } else {
                        var profileElement = document.querySelector("#profile-menu")
                        if (profileElement === null) {
                            profileElement = document.createElement("div");
                            profileElement.setAttribute("id", "profile-menu");
                            profileElement.innerHTML = 
                                `<p>${localUser["name"]}</p>
                                <p>${localUser["email"]}</p>
                                <a>Meu Perfil</a>
                                <a>Carrinho</a>
                                <a>Configurações</a>
                                <button id="logout-button">Sair</button>
                                `
                            userElement.appendChild(profileElement);
                            
                            console.log("Sessão encontrada, criando elemento");

                            profileElement.classList.add("view");
                        } else if (child === profileElement) {
                            profileElement.classList.add("view");
                        }
                    }
                }
            } catch (e) {console.log("erro: " + child)}
        })
    }
})

//formulário de login
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

signupButton.addEventListener("click", event => {
    if (event.target == signupButton)
})