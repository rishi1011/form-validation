const emailInput = document.getElementById('email');
const countryInput = document.getElementById('country-input');
const pincodeInput = document.getElementById('pincode');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('check');

const form = document.getElementById('form');
const inputElements = document.querySelectorAll('input');

const patterns = {
    email: /^([a-zA-Z\d\.-]+)@([a-zA-Z\d]+)\.([a-zA-Z\d]{2,8})(\.[a-zA-Z\d]{2,8})?$/,
    pincode: /^[\d]{6}$/,
    country: /^[a-zA-Z]+$/,
};

inputElements.forEach(input => {
    input.addEventListener('keyup', () => validate(input));
});

function validate(input) {
    if ((input === confirmPasswordInput || input === passwordInput)) {
        if (input === passwordInput && confirmPasswordInput.value === '' && !satisfyPasswordConstraints(input.value)) {
            addInputInValid(input);
            input.setCustomValidity('Minimum 8 characters and maximum 20 characters with one lower, upper and symbol must be present.');
            input.reportValidity();
        } else if (passwordInput.value !== confirmPasswordInput.value && confirmPasswordInput.value !== '') {
            input.setCustomValidity('Passwords do not match');
            input.reportValidity();
            addInputInValid(passwordInput);
            if (confirmPasswordInput.value !== '')
                addInputInValid(confirmPasswordInput);
        } else {
            passwordInput.setCustomValidity('');
            confirmPasswordInput.setCustomValidity('');
            if (passwordInput.value !== '')
                addInputValid(passwordInput);
            if (confirmPasswordInput.value !== '')
                addInputValid(confirmPasswordInput);
        }
    } else {
        if (patterns[input.name].test(input.value)) {
            addInputValid(input);
        } else {
            addInputInValid(input);
        }
    }
}

function addInputValid(input) {
    input.className = 'valid';
}

function addInputInValid(input) {
    input.className = 'invalid';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
});


function satisfyPasswordConstraints(value) {
    if (value.length < 8 || value.length > 20) return false;

    let hasUpper = false;
    let hasLower = false;
    let hasSymbols = false;

    for (let i = 0; i < value.length; i++) {
        let c = value[i];
        if (/^[A-Z]$/.test(c)) {
            hasUpper = true;
        } else if (/^[a-z]$/.test(c)) {
            hasLower = true;
        } else if (/^[!@#$%^&*()_]$/.test(c)) {
            hasSymbols = true;
        }
    }

    return hasLower && hasUpper && hasSymbols;
}