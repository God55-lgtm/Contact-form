document.addEventListener('DOMContentLoaded', () => {
    // Selectores
    const containerForm = document.querySelector('.container-form')
    const conjuntoInputs = document.querySelectorAll('.container-form input:not([type="radio"]):not([type="checkbox"]), .container-form textarea')
    const form = document.querySelector('form')
    const nameInput = document.querySelector('.name-input')
    const lastNameInput = document.querySelector('.lastName-input')
    const emailInput = document.querySelector('.email-input')
    const messageInput = document.querySelector('.message')
    const radioButtons = document.querySelectorAll('input[type="radio"]')
    const checkbox = document.querySelector('input[type="checkbox"]')
    const queryContainer = document.querySelector('.query-container')
    const checkboxContainer = document.querySelector('.checkbox-container')
    const opcionesQuery = document.querySelector('.opciones-query')
    const botonSubmit = document.querySelector('.submit-button')
    const parrafo = document.getElementById('marqueAqui')


    console.log(emailInput);

    // Función para quitar mensaje de error
    function quitarMensajeError(input) {
        if (!input) return;
        const mensajeError = input.parentNode.querySelector('.thisFieldRequired');
        if (mensajeError) {
            mensajeError.remove();
            input.style.borderColor = '#9a9595';
            input.style.borderWidth = '1px';
        }
    }

    // Función para validar email
    function validarEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input.value);
    }

    // Función para validar query type
    function validarQuery() {
        let algunoSeleccionado = false;
        radioButtons.forEach(radio => {
            if (radio.checked) algunoSeleccionado = true;
        });

        const mensajeExistente = queryContainer.querySelector('.query-error');

        if (!algunoSeleccionado) {
            if (!mensajeExistente) {
                let mensajeError = document.createElement('p');
                mensajeError.classList.add('query-error', 'thisFieldRequired');
                mensajeError.textContent = 'Please select a query type';
                mensajeError.style.color = 'hsl(0, 66%, 54%)';
                mensajeError.style.marginTop = '8px';
                mensajeError.style.marginBottom = '0';
                mensajeError.style.fontSize = '14px';
                mensajeError.style.fontWeight = 'normal';

                queryContainer.appendChild(mensajeError);
            }
            return false;
        } else {
            if (mensajeExistente) mensajeExistente.remove();
            return true;
        }
    }

    // Función para validar checkbox
    function validarCheckbox() {
        const mensajeExistente = document.querySelector('.checkbox-error-message');

        if (!checkbox.checked) {
            if (!mensajeExistente) {
                let mensajeError = document.createElement('p');
                mensajeError.classList.add('checkbox-error-message', 'thisFieldRequired');
                mensajeError.textContent = 'To submit this form, please consent to being contacted';
                mensajeError.style.color = 'hsl(0, 66%, 54%)';
                mensajeError.style.marginTop = '0';
                mensajeError.style.marginBottom = '20px';
                mensajeError.style.fontSize = '14px';
                mensajeError.style.fontWeight = 'normal';
                mensajeError.style.marginLeft = '0';

                // Insertar después del contenedor del checkbox
                checkboxContainer.appendChild(mensajeError)
            }
            return false;
        } else {
            if (mensajeExistente) mensajeExistente.remove();
            return true;
        }
    }

    // Función para validar inputs normales - COMPLETAMENTE CORREGIDA
    function validarInputs() {
        let esValido = true;

        conjuntoInputs.forEach(input => {
            // Limpiar mensajes existentes primero
            const mensajeExistente = input.parentNode.querySelector('.thisFieldRequired');
            if (mensajeExistente) {
                mensajeExistente.remove();
            }

            // Validar campo vacío
            if (input.validity.valueMissing) {
                let mensajeError = document.createElement('p')
                mensajeError.classList.add('thisFieldRequired')
                if (input === emailInput) {
                    mensajeError.textContent = 'Please enter a valid email address'
                } else {
                    mensajeError.textContent = 'This field is required'
                }


                mensajeError.style.color = 'hsl(0, 66%, 54%)'
                mensajeError.style.marginTop = '8px'
                mensajeError.style.marginBottom = '0'
                mensajeError.style.fontSize = '14px'
                mensajeError.style.fontWeight = 'normal'

                input.style.borderColor = "hsl(0, 66%, 54%)"
                input.style.borderWidth = "2px"
                input.parentNode.appendChild(mensajeError)
                esValido = false;
            }
            // Validación ESPECÍFICA para email (creo que esta por gusto pero fuciona a sique XD)
            else if (input === emailInput && input.value.trim() !== "") {
                if (!validarEmail(input)) {
                    let mensajeError = document.createElement('p')
                    mensajeError.classList.add('thisFieldRequired')
                    mensajeError.textContent = 'Please enter a valid email address'
                    mensajeError.style.color = 'hsl(0, 66%, 54%)'
                    mensajeError.style.marginTop = '8px'
                    mensajeError.style.marginBottom = '0'
                    mensajeError.style.fontSize = '14px'
                    mensajeError.style.fontWeight = 'normal'

                    input.style.borderColor = "hsl(0, 66%, 54%)"
                    input.style.borderWidth = "2px"
                    input.parentNode.appendChild(mensajeError)
                    esValido = false;
                } else {
                    input.style.borderColor = '#9a9595'
                    input.style.borderWidth = '1px'
                }
            }
            // Si el campo tiene valor y es válido
            else if (input.value.trim() !== "") {
                input.style.borderColor = '#9a9595'
                input.style.borderWidth = '1px'
            }
        });

        return esValido;
    }

    // Función principal de validación
    function validarFormulario(event) {
        event.preventDefault();

        let inputsValidos = validarInputs();
        let queryValido = validarQuery();
        let checkboxValido = validarCheckbox();

        if (inputsValidos && queryValido && checkboxValido) {
            mostrarMensajeExito();

            //  Se resetea a los 5 segundos
            setTimeout(() => {
                ocultarMensajeExito();
            }, 5000);
        }
    }

    // Event listeners
    botonSubmit.addEventListener('click', validarFormulario);

    // Event listeners para inputs
    conjuntoInputs.forEach(input => {
        input.addEventListener('input', function () {
            // Quitar mensaje de error
            const mensajeError = this.parentNode.querySelector('.thisFieldRequired');
            if (mensajeError) {
                mensajeError.remove();
            }

            // Restaurar borde normal
            this.style.borderColor = '#9a9595';
            this.style.borderWidth = '1px';

            // Validar email en tiempo real
            if (this === emailInput && this.value.trim() !== "") {
                if (validarEmail(this)) {
                    this.style.borderColor = '#9a9595';
                }
            }
        });
    });

    // Event listeners para radios
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function () {
            const mensajeExistente = queryContainer.querySelector('.query-error');
            if (mensajeExistente) {
                mensajeExistente.remove();
            }
        });
    });

    // Event listener para checkbox
    checkbox.addEventListener('change', function () {
        const mensajeExistente = document.querySelector('.checkbox-error-message');
        if (mensajeExistente) {
            mensajeExistente.remove();
        }
    });

    // Funcion de Mostrar mensaje al hacer submit
    function mostrarMensajeExito() {
        // Si existe el mensaje, borralo
        const mensajeExistente = document.querySelector('.success-message-js');
        if (mensajeExistente) mensajeExistente.remove();

        // Crear mensaje
        const successMensaje = document.createElement('div')
        successMensaje.className = 'success-message-js';
        successMensaje.innerHTML = `
        <h2>Message Sent!</h2>
        <p>Thanks for completing the form. We'll be in touch soon!</p>
    `;

        form.parentNode.insertBefore(successMensaje, form);
        form.classList.add('form-disabled');
    }

    function ocultarMensajeExito() {
        // Remover el mensaje de éxito
        const successMessage = document.querySelector('.success-message-js');
        if (successMessage) successMessage.remove();

        // Restaurar el formulario
        form.classList.remove('form-disabled');
        form.reset();

        // Limpiar estilos de radio buttons
        document.querySelectorAll('.opcion1, .opcion2').forEach(contenedor => {
            contenedor.classList.remove('radio-seleccionado');
            contenedor.style.backgroundColor = '';
            contenedor.style.borderColor = '#9a9595';
        });
    }


    // Marcar la casilla con el texto
    parrafo.onclick = function(){
        checkbox.checked = !checkbox.checked;
    }







});