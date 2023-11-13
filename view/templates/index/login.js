const userElement = document.querySelector("#user-icon");
const loginElement = document.querySelector("#login-form");
const signupButton = document.querySelector("#signup-link");
const registerForm = document.querySelector("#register-form");
localStorage.removeItem("user");
var localUser = JSON.parse(localStorage.getItem("user"));
var userDatabase = JSON.parse(localStorage.getItem("userDatabase"));

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
                        if (child === loginElement) {
                            loginElement.classList.toggle("view");
                            console.log("Nenhuma sessão de usuário encontrada!")
                        }
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

//mostrar formulário de cadastro
signupButton.addEventListener("click", event => {
    if (event.target == signupButton) {
        event.preventDefault();
        loginElement.classList.toggle("view");
        registerForm.classList.toggle("view");
        }
    }
)

//formulário de login
loginElement.addEventListener("submit", event => {
    event.preventDefault();
    let usernameLogin = document.querySelector("#login-username");
    let passwordLogin = document.querySelector("#login-password");
    let exists = false;

    if (userDatabase === null) {
        fetch(`/model/repositories/UserRepository.json`)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("userDatabase", JSON.stringify(data));
    
                for (let i = 0; i < data.length; i++)
                {
                    if (data[i]["username"] === usernameLogin.value) {
                        exists = true;
                        if (data[i]["password"] === passwordLogin.value) {
                            isAuthenticated = true;
                            localStorage.setItem("user", JSON.stringify(data[i]));
                            localUser = data[i];
                            console.log("Logado")
                            break;
                        }
                        passwordLogin.value = "";
                        passwordLogin.setAttribute("placeholder", "Senha incorreta")    
    
                        break;
                    } 
                }
            });
    } else {
        for (let i = 0; i < userDatabase.length; i++)
        {
            if (userDatabase[i]["username"] === usernameLogin.value) {
                exists = true;
                if (userDatabase[i]["password"] === passwordLogin.value) {
                    isAuthenticated = true;
                    localStorage.setItem("user", JSON.stringify(userDatabase[i]));
                    localUser = userDatabase[i];
                    console.log("Logado");
                    break;
                }
                passwordLogin.value = "";
                passwordLogin.setAttribute("placeholder", "Senha incorreta")    

                break;
            } 
        }
    }

    if (!exists) {
        usernameLogin.value = "";
        usernameLogin.setAttribute("placeholder", "Usuário inexistente")
        passwordLogin.value = "";
    }

    //efeitos visuais ao logar

})

//formulário de cadastro
registerForm.addEventListener("submit", event => {
    event.preventDefault()
    let id;
    let nameRegister = document.querySelector("#name-register");
    let usernameRegister = document.querySelector("#register-username");
    let passwordRegister = document.querySelector("#register-password");
    let confirmPasswordRegister = document.querySelector("#register-confirm-password");
    let emailRegister = document.querySelector("#register-email");
    let confirmEmailRegister = document.querySelector("#register-confirm-email");
    let contractRules = document.querySelector("#register-contract-rules");
    let exists = false;

    if (passwordRegister.value !== confirmPasswordRegister.value) {
        confirmPasswordRegister.value = "";
        confirmPasswordRegister.placeholder = "Senha não condiz"
        return
    }

    if (emailRegister.value !== confirmEmailRegister.value) {
        confirmEmailRegister.value = "";
        confirmEmailRegister.placeholder = "Email não condiz"
        return
    }
    
    //confirmar se username existe
    if (userDatabase === null) {
        fetch(`/model/repositories/UserRepository.json`)
            .then(response => response.json())
            .then(data => {
                userDatabase = data;
                localStorage.setItem("userDatabase", JSON.stringify(data));
                id = data.length;
                for (let i = 0; i < data.length; i++)
                {
                    if (data[i]["username"] === usernameRegister.value) {
                        exists = true;     
                        break;
                    } 
                }
            });
    } else {
        id = userDatabase.length
        for (let i = 0; i < userDatabase.length; i++)
        {
            if (userDatabase[i]["username"] === usernameRegister.value) {
                exists = true;
                break;
            } 
        }
    }

    if (exists) {
        usernameRegister.value = "";
        usernameRegister.setAttribute("placeholder", "Usuário já cadastrado")
        passwordRegister.value = "";
        confirmPasswordRegister.value = "";
        emailRegister.value = "";
        confirmEmailRegister.value = "";
        contractRules.checked = false;
    } else {
        let user = {"id": id,
        "username": usernameRegister.value,
        "name": nameRegister.value,
        "email": emailRegister.value,
        "password": passwordRegister.value,
        "addresses": [],
        "cart": [],
        "purchases": [],
        "active": true}

        if (localStorage.getItem("cart")) {
            user["cart"].push(localStorage.getItem("cart"));
        }

        localStorage.setItem("user", JSON.stringify(user));
        userDatabase.push(user);
        localStorage.setItem("userDatabase", JSON.stringify(userDatabase));

        //efeitos visuais depois de cadastrado

    }


})
