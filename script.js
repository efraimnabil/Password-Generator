const slider = document.getElementById("slider");
const sliderValue = document.getElementById("length");
const lowercaseEl = document.getElementById('lowercase');
const uppercaseEl = document.getElementById('uppercase');
const numberEl = document.getElementById('numbers');
const symbolEl = document.getElementById('symbols');
const generateBtn = document.getElementById("generate");
const message = document.querySelector(".message"),
      buttonOpen = document.querySelector(".open"),
      buttonClose = document.querySelector(".close");

sliderValue.textContent = slider.value;
slider.oninput = function() {
    sliderValue.textContent = this.value;
}
document.getElementById("generate").addEventListener("click", function() {
    document.getElementById("res").innerHTML = generatePassword();
});
let started = false;

document.getElementById("res").addEventListener("click", function() {
    if(started) {
        const copyText = document.getElementById("res").innerHTML;
        const el = document.createElement('textarea');
        el.value = copyText;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        message.classList.add('show');
        setTimeout(function() {
            message.classList.remove('show');
        }
        , 1000);
    }
    document.getElementById("res").disabled = true;
});

function generatePassword() {
    started = true;
    document.getElementById("res").disabled = false;
    const length = slider.value;
    const hasLower = document.getElementById("lowercase").checked;
    const hasUpper = document.getElementById("uppercase").checked;
    const hasNumber = document.getElementById("numbers").checked;
    const hasSymbol = document.getElementById("symbols").checked;
    const cnt = hasLower + hasUpper + hasNumber + hasSymbol;
    let password = "";
    let x = Math.floor(length / cnt);
    let y = length % cnt;
    let l = hasLower * x;
    let u = hasUpper * x;
    let n = hasNumber * x;
    let s = hasSymbol * x;
    if(y > 0) {
        if(hasLower) {
            l += y;
            y = 0;
        }
        if(hasUpper && y > 0) {
            u += y;
            y = 0;
        }
        if(hasNumber && y > 0) {
            n += y;
            y = 0;
        }
        if(hasSymbol && y > 0) {
            s += y;
            y = 0;
        }
    }
    for(let i = 0; i < l; i++) {
        password += getRandomLower();
    }
    for(let i = 0; i < u; i++) {
        password += getRandomUpper();
    }
    for(let i = 0; i < n; i++) {
        password += getRandomNumber();
    }
    for(let i = 0; i < s; i++) {
        password += getRandomSymbol();
    }
    password = password.split('').sort(function() {
        return 0.5 - Math.random()
    }).join('');
    return password;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '~!@#$%^&*()_+{}":;.,';
	return symbols[Math.floor(Math.random() * symbols.length)];
}

[uppercaseEl, lowercaseEl, numberEl, symbolEl].forEach(el => {el.addEventListener('change', disableOnlyCheckbox)})
function disableOnlyCheckbox(){
	let totalChecked = [lowercaseEl, uppercaseEl, numberEl, symbolEl].filter(el => el.checked)
	totalChecked.forEach(el => {
		if(totalChecked.length == 1){
			el.disabled = true;
		}else{
			el.disabled = false;
		}
	})
}

