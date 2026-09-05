/* =========================================
   TECNODOC PRO
   JAVASCRIPT PRINCIPAL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("TecnoDoc Pro iniciado correctamente.");

    const loginForm = document.getElementById("loginForm");

    const loginMessage =
        document.getElementById("loginMessage");

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();

        loginMessage.textContent =
            "El sistema de autenticación se conectará con Supabase en una fase posterior.";

    });

});
