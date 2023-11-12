const userElement = document.querySelector("#user-icon");

userElement.addEventListener("click", (event) => {
    if (event.target == userElement) {
        userElement.childNodes.forEach ((child) => {
            try {
                if (child.classList.contains("view")) {
                    child.classList.remove("view");
                } else if (!child.classList.contains("view")) {
                    let loginElement = document.querySelector("#login-form");
                    loginElement.classList.add("view");
                }
            } catch (e) {}
        })
    }
}
)