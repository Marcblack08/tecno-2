/* =========================================================
   TECNODOC PRO
   JAVASCRIPT PRINCIPAL
   FASE 2 - INTERACTIVIDAD
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


    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    if (menuToggle && sidebar) {

        menuToggle.addEventListener("click", () => {

            sidebar.classList.toggle("open");

        });

    }


    /* =====================================================
       CERRAR MENÚ AL HACER CLIC EN UN ENLACE
       EN DISPOSITIVOS MÓVILES
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
       CERRAR SESIÓN
       POR AHORA SOLO ES UNA SIMULACIÓN.
       
       SUPABASE AUTH SE IMPLEMENTARÁ MÁS ADELANTE.
    ===================================================== */

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            () => {

                const confirmLogout =
                    window.confirm(
                        "¿Deseas cerrar la sesión?"
                    );

                if (!confirmLogout) {
                    return;
                }

                window.location.href =
                    "index.html";

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

});
