/* =========================================================
   TECNODOC PRO
   JAVASCRIPT PRINCIPAL
   FASE 3 - SUPABASE AUTH
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("TecnoDoc Pro iniciado correctamente.");

    /* =====================================================
       ELEMENTOS DEL DOM
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const sidebar =
        document.getElementById("sidebar");

    const logoutButton =
        document.getElementById("logoutButton");

    const globalSearch =
        document.getElementById("globalSearch");

    const loginForm =
        document.getElementById("loginForm");

    const loginMessage =
        document.getElementById("loginMessage");


    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    if (menuToggle && sidebar) {

        menuToggle.addEventListener("click", () => {

            sidebar.classList.toggle("open");

        });

    }


    /* =====================================================
       CERRAR MENÚ EN MÓVIL
    ===================================================== */

    const navLinks =
        document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (
                window.innerWidth <= 800 &&
                sidebar
            ) {

                sidebar.classList.remove("open");

            }

        });

    });


    /* =====================================================
       BUSCADOR
    ===================================================== */

    if (globalSearch) {

        globalSearch.addEventListener(
            "input",
            (event) => {

                const search =
                    event.target.value
                        .trim()
                        .toLowerCase();

                console.log(
                    "Búsqueda:",
                    search
                );

            }
        );

    }


    /* =====================================================
       INICIO DE SESIÓN CON SUPABASE
    ===================================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();

                const email =
                    document
                        .getElementById("email")
                        .value
                        .trim();

                const password =
                    document
                        .getElementById("password")
                        .value;

                if (!email || !password) {

                    mostrarMensaje(
                        "Completa el correo y la contraseña.",
                        "error"
                    );

                    return;

                }


                /* =========================================
                   ESTADO DE CARGA
                ========================================= */

                const submitButton =
                    loginForm.querySelector(
                        'button[type="submit"]'
                    );

                if (submitButton) {

                    submitButton.disabled = true;
                    submitButton.textContent =
                        "Iniciando sesión...";

                }

                mostrarMensaje(
                    "Verificando tus datos...",
                    "info"
                );


                /* =========================================
                   SUPABASE AUTH
                ========================================= */

                try {

                    const {
                        data,
                        error
                    } =
                        await supabaseClient.auth
                            .signInWithPassword({
                                email: email,
                                password: password
                            });


                    /* =====================================
                       ERROR DE SUPABASE
                    ===================================== */

                    if (error) {

                        console.error(
                            "Error de inicio de sesión:",
                            error
                        );

                        mostrarMensaje(
                            traducirErrorLogin(
                                error.message
                            ),
                            "error"
                        );

                        return;

                    }


                    /* =====================================
                       LOGIN CORRECTO
                    ===================================== */

                    console.log(
                        "Usuario autenticado:",
                        data.user
                    );

                    mostrarMensaje(
                        "Inicio de sesión correcto. Entrando...",
                        "success"
                    );


                    /* =====================================
                       IR AL DASHBOARD
                    ===================================== */

                    setTimeout(() => {

                        window.location.href =
                            "dashboard.html";

                    }, 800);


                } catch (error) {

                    console.error(
                        "Error inesperado:",
                        error
                    );

                    mostrarMensaje(
                        "Ocurrió un error inesperado. Inténtalo nuevamente.",
                        "error"
                    );

                } finally {

                    if (submitButton) {

                        submitButton.disabled = false;
                        submitButton.textContent =
                            "Iniciar sesión";

                    }

                }

            }
        );

    }


    /* =====================================================
       CERRAR SESIÓN CON SUPABASE
    ===================================================== */

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            async () => {

                const confirmLogout =
                    window.confirm(
                        "¿Deseas cerrar la sesión?"
                    );

                if (!confirmLogout) {
                    return;
                }


                try {

                    const {
                        error
                    } =
                        await supabaseClient.auth
                            .signOut();


                    if (error) {

                        console.error(
                            "Error al cerrar sesión:",
                            error
                        );

                        alert(
                            "No se pudo cerrar la sesión."
                        );

                        return;

                    }


                    window.location.href =
                        "index.html";


                } catch (error) {

                    console.error(
                        "Error inesperado:",
                        error
                    );

                    alert(
                        "Ocurrió un error al cerrar la sesión."
                    );

                }

            }
        );

    }


    /* =====================================================
       BOTONES DE ACCIONES RÁPIDAS
    ===================================================== */

    const quickCards =
        document.querySelectorAll(".quick-card");

    quickCards.forEach((card) => {

        card.addEventListener(
            "click",
            () => {

                const title =
                    card.querySelector("strong");

                if (!title) {
                    return;
                }

                alert(
                    `La función "${title.textContent}" se implementará en una fase posterior.`
                );

            }
        );

    });


    /* =====================================================
       BOTONES PRINCIPALES
    ===================================================== */

    const actionButtons =
        document.querySelectorAll(
            ".heading-actions .button"
        );

    actionButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                alert(
                    "Esta función será conectada posteriormente al sistema."
                );

            }
        );

    });


    /* =====================================================
       VER TODO
    ===================================================== */

    const viewAllButton =
        document.querySelector(".text-button");

    if (viewAllButton) {

        viewAllButton.addEventListener(
            "click",
            () => {

                alert(
                    "El historial completo se implementará posteriormente."
                );

            }
        );

    }


    /* =====================================================
       FUNCIÓN PARA MOSTRAR MENSAJES
    ===================================================== */

    function mostrarMensaje(
        mensaje,
        tipo
    ) {

        if (!loginMessage) {
            return;
        }

        loginMessage.textContent =
            mensaje;

        loginMessage.className =
            "login-message";

        loginMessage.classList.add(
            tipo
        );

    }


    /* =====================================================
       TRADUCIR ERRORES DE SUPABASE
    ===================================================== */

    function traducirErrorLogin(
        mensaje
    ) {

        const error =
            mensaje.toLowerCase();


        if (
            error.includes(
                "invalid login credentials"
            )
        ) {

            return "Correo o contraseña incorrectos.";

        }


        if (
            error.includes(
                "email not confirmed"
            )
        ) {

            return "Debes confirmar tu correo electrónico antes de iniciar sesión.";

        }


        if (
            error.includes(
                "too many requests"
            )
        ) {

            return "Demasiados intentos. Espera unos minutos e inténtalo nuevamente.";

        }


        return mensaje;

    }

});
