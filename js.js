const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const gen = {
  low: getLow,
  upp: getUpp,
  num: getNum,
  sym: getSym
};

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLow = lowercaseEl.checked;
  const hasUpp = uppercaseEl.checked;
  const hasNum = numbersEl.checked;
  const hasSym = symbolsEl.checked;

  resultEl.innerText = genPass(hasLow, hasUpp, hasNum, hasSym, length) || '';
});

clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Your password has been copied to clipboard.');
});

function genPass(low, upp, num, sym, len) {
  if (len < 4 || len > 16) {
    alert('Your password must be between 4 and 16 characters.');
    return;
  }

  let pass = '';
  const count = low + upp + num + sym;
  const types = [{low}, {upp}, {num}, {sym}].filter(i => Object.values(i)[0]);

  if(types === 0) {
    return '';
  }

  for(let i = 0; i < len; i += count) {
    types.forEach(t => {
      const funcCall = Object.keys(t)[0];
      pass += gen[funcCall]();
    });
  }

  const finalPass = pass.slice(0, len);

  return finalPass;
};

function getLow() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

function getUpp() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

function getNum() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

function getSym() {
  const symbols = '!?@#$£€%^&*(){}[]=<>/-~+",.'
	return symbols[Math.floor(Math.random() * symbols.length)];
};