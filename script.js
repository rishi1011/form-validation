const emailInput = document.getElementById('email');
const countryInput = document.getElementById('country-input');
const pincodeInput = document.getElementById('pincode');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('check');

const form = document.getElementById('form');
const inputElements = document.querySelectorAll('input');

inputElements.forEach(input => {
    input.addEventListener('keyup', () => validate(input));
});

function validate(input) {
    if ((input === confirmPasswordInput || input === passwordInput)) {
        if (input === passwordInput && confirmPasswordInput.value === '' && !satisfyPasswordConstraits(input.value)) {
            addInputInValid(input);
            input.setCustomValidity('Minimum 8 characters with one lower, upper and symbol must be present.');
            input.reportValidity();
        } else if (passwordInput.value !== confirmPasswordInput.value) {
            input.setCustomValidity('Passwords do not match');
            input.reportValidity();
            addInputInValid(passwordInput);
            addInputInValid(confirmPasswordInput);
        } else {
            passwordInput.setCustomValidity('');
            confirmPasswordInput.setCustomValidity('');
            addInputValid(passwordInput);
            addInputValid(confirmPasswordInput);
        }
    } else if (!input.checkValidity()) {
        input.reportValidity();
        addInputInValid(input);
    } else {
        addInputValid(input);
    }
}

function addInputValid(input) {
    input.classList.add('valid');

    //if it has invalid class, remove it
    if (input.classList.contains('invalid')) {
        input.classList.remove('invalid');
    }
}

function addInputInValid(input) {
    input.classList.add('invalid');

    //if it has valid class, remove it
    if (input.classList.contains('valid')) {
        input.classList.remove('valid');
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
});


function satisfyPasswordConstraits(value) {
    return value.length >= 8 ;
}