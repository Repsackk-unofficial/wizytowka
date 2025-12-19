document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    const successMessage = document.getElementById("successMessage");

    // Funkcja walidacji pojedynczego pola
    function validateField(input, errorElement, condition, errorMsg) {
        if (!condition) {
            errorElement.textContent = errorMsg;
            errorElement.style.opacity = "1";
            input.classList.add("input-error");
            input.classList.remove("input-ok");
            return false;
        } else {
            errorElement.style.opacity = "0";
            input.classList.remove("input-error");
            input.classList.add("input-ok");
            return true;
        }
    }

    // Live walidacja – poprawiasz → komunikat znika
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener("input", () => {
            successMessage.style.opacity = "0";
        });
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        successMessage.style.opacity = "0";

        let validName = validateField(
            nameInput,
            nameError,
            nameInput.value.trim().length >= 3,
            "Imię musi mieć co najmniej 3 znaki."
        );

        let validEmail = validateField(
            emailInput,
            emailError,
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()),
            "Podaj poprawny adres email."
        );

        let validMessage = validateField(
            messageInput,
            messageError,
            messageInput.value.trim().length >= 10,
            "Wiadomość musi mieć co najmniej 10 znaków."
        );

        if (validName && validEmail && validMessage) {
            successMessage.textContent = "Wiadomość została wysłana pomyślnie!";
            successMessage.style.opacity = "1";

            form.reset();

            // pozostawienie efektu OK tylko dla pustych pól po reset
            nameInput.classList.remove("input-ok");
            emailInput.classList.remove("input-ok");
            messageInput.classList.remove("input-ok");
        }
    });
});
// CYBERPUNK PIXEL TRANSITION
document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
        const href = link.getAttribute("href");

        if (!href || href.startsWith("http")) return;

        e.preventDefault();

        const transition = document.querySelector(".page-transition");
        const bar = document.querySelector(".progress-bar");
        const text = document.querySelector(".progress-text");

        transition.classList.add("active");

        let progress = 0;
        bar.style.width = "0%";
        text.textContent = "0%";

        setTimeout(() => {
            const interval = setInterval(() => {
                progress += Math.floor(Math.random() * 12) + 6;

                if (progress >= 100) {
                    progress = 100;
                    bar.style.width = "100%";
                    text.textContent = "100%";
                    clearInterval(interval);

                    setTimeout(() => {
                        window.location.href = href;
                    }, 500);
                } else {
                    bar.style.width = progress + "%";
                    text.textContent = progress + "%";
                }
            }, 120);
        }, 700); // start po rozpadzie pixeli
    });
});
