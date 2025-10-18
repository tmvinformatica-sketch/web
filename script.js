const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

btnSignIn.addEventListener("click",()=>{
   container.classList.remove("toggle");
});
btnSignUp.addEventListener("click",()=>{
   container.classList.add("toggle");
});


 document.addEventListener('DOMContentLoaded', () => {
            // --- CONSTANTES Y ELEMENTOS DEL DOM ---
            const AUTH_KEY = 'tmv_users';
            /*const container = document.getElementById('main-auth-container');*/

            const container = document.getElementById('container');
            const appPage = document.getElementById('app-page');

            // Formularios
            const loginForm = document.querySelector('.sign-in');
            const registerForm = document.querySelector('.sign-up');

            // Botones de toggle
            const btnSignUp = document.getElementById('btn-sign-up');
            const btnSignIn = document.getElementById('btn-sign-in');
            const logoutBtn = document.getElementById('logout-btn');

            // Inputs de Login
            const userLogInput = document.getElementById('usuariolog');
            const passLogInput = document.getElementById('passwordlog');
            const loginMessage = document.getElementById('login-message');

            // Inputs de Registro
            const nameRegInput = document.getElementById('register-name');
            const emailRegInput = document.getElementById('register-email');
            const passRegInput = document.getElementById('register-password');
            const registerMessage = document.getElementById('register-message');

            // --- 1. FUNCIÓN DE INICIALIZACIÓN DE USUARIOS ---
            function initializeUsers() {
                let users = localStorage.getItem(AUTH_KEY);
                if (!users) {
                    // Usuarios predefinidos requeridos
                    const defaultUsers = {
                        "info@tmvinformatica.com": "1234",
                        "clientes@tmvinformatica.com": "clientes"
                    };
                    localStorage.setItem(AUTH_KEY, JSON.stringify(defaultUsers));
                    console.log('Usuarios por defecto creados (LocalStorage):', defaultUsers); // Log para depuración
                } else {
                    console.log('Usuarios cargados (LocalStorage):', JSON.parse(users)); // Log para depuración
                }
            }
            initializeUsers();

            // --- 3. FUNCIÓN DE INICIO DE SESIÓN ---
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                loginMessage.className = 'text-center text-sm mb-4 font-semibold';
                const username = userLogInput.value.trim().toLowerCase();
                const password = passLogInput.value.trim();
                const usersData = JSON.parse(localStorage.getItem(AUTH_KEY) || '{}');

                if (usersData[username] && usersData[username] === password) {
                    // Éxito: Muestra la página de bienvenida
                    
                    loginMessage.textContent = '¡Inicio de sesión exitoso!';
                    container.classList.add('hidden'); 
                    appPage.classList.remove('hidden');
                    localStorage.setItem('isLoggedIn', 'true'); // Marca la sesión

                   
                } else {
                    // Error
                    loginMessage.textContent = 'Usuario o contraseña incorrectos';
                    loginMessage.classList.add('text-red-500');
                }
            });

            // --- 5. FUNCIÓN DE CERRAR SESIÓN ---
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('isLoggedIn');
                appPage.classList.add('hidden');
                container.classList.remove('hidden');
                userLogInput.value = ''; // Limpia los campos de login al cerrar
                passLogInput.value = '';
                loginMessage.textContent = '';
                switchToLogin();
            });

            // --- 6. VERIFICAR SESIÓN AL CARGAR (para simular persistencia) ---
            if (localStorage.getItem('isLoggedIn') === 'true') {
                container.classList.add('hidden');
                appPage.classList.remove('hidden');
            }

            // --- 4. FUNCIÓN DE REGISTRO ---
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                registerMessage.className = 'text-center text-sm mb-4 font-semibold';

                const name = nameRegInput.value.trim();
                const email = emailRegInput.value.trim().toLowerCase();
                const password = passRegInput.value.trim();

                if (!name || !email || !password) {
                    registerMessage.textContent = 'Todos los campos son obligatorios.';
                    registerMessage.classList.add('text-red-500');
                    return;
                }

                let usersData = JSON.parse(localStorage.getItem(AUTH_KEY) || '{}');

                if (usersData[email]) {
                    registerMessage.textContent = 'Error: Este email ya está registrado.';
                    registerMessage.classList.add('text-red-500');
                    return;
                }

                // Registro exitoso: Añadir el nuevo usuario
                usersData[email] = password;
                localStorage.setItem(AUTH_KEY, JSON.stringify(usersData));
                console.log(`Nuevo usuario registrado con éxito: ${email}`); // Log para depuración
                console.log('Total de usuarios actualizado:', usersData); // Log para depuración

                registerMessage.textContent = `¡Registro exitoso para ${name}! Ahora puedes iniciar sesión.`;
                registerMessage.classList.add('text-tmv-green');

                // Limpiar campos y cambiar a la vista de Login
                nameRegInput.value = '';
                emailRegInput.value = '';
                passRegInput.value = '';
                setTimeout(switchToLogin, 1500); // Cambia a Login después de 1.5s
            });
        });


        /* ********************************* */

const menuselec = document.getElementById("mi-seleccion");

/* function menupricipal() {

    if (menuselec === "salir") {
    logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('isLoggedIn');
                appPage.classList.add('hidden');
                container.classList.remove('hidden');
                userLogInput.value = ''; // Limpia los campos de login al cerrar
                passLogInput.value = '';
                loginMessage.textContent = '';
                switchToLogin();
            });

    }


}

menuselec.addEventListener("click,menuprincipal";) */