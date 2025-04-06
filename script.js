const display = document.getElementById('display');
let currentInput = '';

function appendNumber(num) {
  if (currentInput === '0' && num !== '.') {
    currentInput = num;
  } else {
    currentInput += num;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (/[+\-*/%]$/.test(currentInput)) {
    currentInput = currentInput.slice(0, -1);
  }
  currentInput += op;
  updateDisplay();
}

function clearDisplay() {
  currentInput = '';
  updateDisplay('0');
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput || '0');
}

function calculateResult() {
  try {
    currentInput = eval(currentInput.replace('%', '/100')).toString();
    updateDisplay();
  } catch {
    updateDisplay('Error');
  }
}

function updateDisplay(val = currentInput) {
  display.textContent = val;
}

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (!isNaN(key) || key === '.') {
    appendNumber(key);
  } else if (['+', '-', '*', '/', '%'].includes(key)) {
    appendOperator(key);
  } else if (key === 'Enter') {
    event.preventDefault();
    calculateResult();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  }
});