/* =========================================================
   TECNODOC PRO - AUTENTICACIÓN
   Login, registro y recuperación de contraseña
========================================================= */

(function () {
    "use strict";

    function message(id, text, type) {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = text;
        el.className = "login-message " + (type || "info");
    }

    function setLoading(button, loading, loadingText, normalText) {
        if (!button) return;
        button.disabled = loading;
        button.textContent = loading ? loadingText : normalText;
    }

    function translateAuthError(error) {
        const text = String(error?.message || error || "").toLowerCase();
        if (text.includes("invalid login credentials")) return "Correo o contraseña incorrectos.";
        if (text.includes("email not confirmed")) return "Debes confirmar tu correo electrónico antes de iniciar sesión.";
        if (text.includes("user already registered")) return "Ese correo ya está registrado. Inicia sesión o recupera tu contraseña.";
        if (text.includes("password should be at least")) return "La contraseña debe tener al menos 8 caracteres.";
        if (text.includes("too many requests")) return "Demasiados intentos. Espera unos minutos e inténtalo nuevamente.";
        return error?.message || "No se pudo completar la operación.";
    }

    document.addEventListener("DOMContentLoaded", function () {
        console.log("TecnoDoc Pro: módulo de autenticación cargado.");

        const loginForm = document.getElementById("loginForm");
        if (loginForm) {
            loginForm.addEventListener("submit", async function (event) {
                event.preventDefault();
                event.stopPropagation();

                const email = document.getElementById("email")?.value.trim();
                const password = document.getElementById("password")?.value || "";
                const button = document.getElementById("loginButton") || loginForm.querySelector('button[type="submit"]');

                if (!email || !password) {
                    message("loginMessage", "Completa el correo y la contraseña.", "error");
                    return;
                }

                setLoading(button, true, "Iniciando sesión...", "Iniciar sesión");
                message("loginMessage", "Verificando tus datos...", "info");

                try {
                    if (typeof supabaseClient === "undefined") throw new Error("No se pudo cargar el cliente de Supabase.");
                    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
                    if (error) throw error;
                    if (!data?.user) throw new Error("Supabase no devolvió un usuario autenticado.");

                    message("loginMessage", "Inicio de sesión correcto. Entrando...", "success");
                    setTimeout(() => { window.location.href = "dashboard.html"; }, 500);
                } catch (error) {
                    console.error("Error de inicio de sesión:", error);
                    message("loginMessage", translateAuthError(error), "error");
                    setLoading(button, false, "Iniciando sesión...", "Iniciar sesión");
                }
            });
        }

        const registerForm = document.getElementById("registerForm");
        if (registerForm) {
            registerForm.addEventListener("submit", async function (event) {
                event.preventDefault();
                event.stopPropagation();

                const name = document.getElementById("registerName")?.value.trim();
                const company = document.getElementById("registerCompany")?.value.trim();
                const email = document.getElementById("registerEmail")?.value.trim();
                const password = document.getElementById("registerPassword")?.value || "";
                const password2 = document.getElementById("registerPassword2")?.value || "";
                const button = document.getElementById("registerButton");

                if (!name || !company || !email || !password || !password2) {
                    message("registerMessage", "Completa todos los campos.", "error");
                    return;
                }
                if (password.length < 8) {
                    message("registerMessage", "La contraseña debe tener al menos 8 caracteres.", "error");
                    return;
                }
                if (password !== password2) {
                    message("registerMessage", "Las contraseñas no coinciden.", "error");
                    return;
                }

                setLoading(button, true, "Creando cuenta...", "Crear cuenta");
                message("registerMessage", "Creando tu cuenta...", "info");

                try {
                    if (typeof supabaseClient === "undefined") throw new Error("No se pudo cargar el cliente de Supabase.");
                    const { data, error } = await supabaseClient.auth.signUp({
                        email,
                        password,
                        options: { data: { nombre: name, empresa: company } }
                    });
                    if (error) throw error;

                    if (data?.session) {
                        message("registerMessage", "Cuenta creada correctamente. Entrando...", "success");
                        setTimeout(() => { window.location.href = "dashboard.html"; }, 700);
                    } else {
                        message("registerMessage", "Cuenta creada. Revisa tu correo para confirmar la cuenta y luego inicia sesión.", "success");
                        setTimeout(() => { window.location.href = "index.html"; }, 2500);
                    }
                } catch (error) {
                    console.error("Error de registro:", error);
                    message("registerMessage", translateAuthError(error), "error");
                    setLoading(button, false, "Creando cuenta...", "Crear cuenta");
                }
            });
        }

        const recoveryForm = document.getElementById("recoveryForm");
        if (recoveryForm) {
            recoveryForm.addEventListener("submit", async function (event) {
                event.preventDefault();
                event.stopPropagation();

                const email = document.getElementById("recoveryEmail")?.value.trim();
                const button = document.getElementById("recoveryButton");
                if (!email) {
                    message("recoveryMessage", "Introduce tu correo electrónico.", "error");
                    return;
                }

                setLoading(button, true, "Enviando...", "Enviar enlace");
                message("recoveryMessage", "Enviando enlace de recuperación...", "info");

                try {
                    const redirectUrl = window.location.origin + "/index.html";
                    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl });
                    if (error) throw error;
                    message("recoveryMessage", "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.", "success");
                } catch (error) {
                    console.error("Error de recuperación:", error);
                    message("recoveryMessage", translateAuthError(error), "error");
                } finally {
                    setLoading(button, false, "Enviando...", "Enviar enlace");
                }
            });
        }
    });
})();
