/* --create title--- */

const title = document.createElement('div');
title.className = 'title';
title.textContent = 'Virtual keyboard (RSS)';
document.body.appendChild(title);

/* --------create textarea-------- */

const input = document.createElement('textarea');
input.className = 'textarea';
input.autofocus = true;
// input.rows = '20';
// input.cols = '50';
document.body.appendChild(input);

/* ----------keyboard--------------- */
const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
document.body.appendChild(keyboard);

const enKeys = {
  '`': 'Backquote',
  1: 'Digit1',
  2: 'Digit2',
  3: 'Digit3',
  4: 'Digit4',
  5: 'Digit5',
  6: 'Digit6',
  7: 'Digit7',
  8: 'Digit8',
  9: 'Digit9',
  0: 'Digit0',
  '-': 'Minus',
  '=': 'Equal',
  Backspace: 'Backspace',
  Tab: 'Tab',
  q: 'KeyQ',
  w: 'KeyW',
  e: 'KeyE',
  r: 'KeyR',
  t: 'KeyT',
  y: 'KeyY',
  u: 'KeyU',
  i: 'KeyI',
  o: 'KeyO',
  p: 'KeyP',
  '[': 'BracketLeft',
  ']': 'BracketRight',
  '\\': 'Backslash',
  Del: 'Delete',
  CapsLock: 'CapsLock',
  a: 'KeyA',
  s: 'KeyS',
  d: 'KeyD',
  f: 'KeyF',
  g: 'KeyG',
  h: 'KeyH',
  j: 'KeyJ',
  k: 'KeyK',
  l: 'KeyL',
  ';': 'Semicolon',
  '\'': 'Quote',
  Enter: 'Enter',
  'Shift ': 'ShiftLeft',
  z: 'KeyZ',
  x: 'KeyX',
  c: 'KeyC',
  v: 'KeyV',
  b: 'KeyB',
  n: 'KeyN',
  m: 'KeyM',
  ',': 'Comma',
  '.': 'Period',
  '/': 'Slash',
  '▲': 'ArrowUp',
  Shift: 'ShiftRight',
  'Ctrl ': 'ControlLeft',
  Win: 'MetaLeft',
  'Alt ': 'AltLeft',
  ' ': 'Space',
  Alt: 'AltRight',
  '◄': 'ArrowLeft',
  '▼': 'ArrowDown',
  '►': 'ArrowRight',
  Ctrl: 'ControlRight',
};

const ruKeys = {
  '`': 'ё',
  q: 'й',
  w: 'ц',
  e: 'у',
  r: 'к',
  t: 'е',
  y: 'н',
  u: 'г',
  i: 'ш',
  o: 'щ',
  p: 'з',
  '[': 'х',
  ']': 'ъ',
  a: 'ф',
  s: 'ы',
  d: 'в',
  f: 'а',
  g: 'п',
  h: 'р',
  j: 'о',
  k: 'л',
  l: 'д',
  ';': 'ж',
  '\'': 'э',
  z: 'я',
  x: 'ч',
  c: 'с',
  v: 'м',
  b: 'и',
  n: 'т',
  m: 'ь',
  '/': '.',
  ',': 'б',
  '.': 'ю',

};

const ruShift = {
  1: '!',
  2: '"',
  3: '№',
  4: ';',
  5: '%',
  6: ':',
  7: '?',
  8: '*',
  9: '(',
  0: ')',
  '-': '_',
  '=': '+',
  '\\': '/',
  '.': ',',
};

const enShift = {
  1: '!',
  2: '@',
  3: '#',
  4: '$',
  5: '%',
  6: '^',
  7: '&amp;',
  8: '*',
  9: '(',
  0: ')',
  '-': '_',
  '=': '+',
  '[': '{',
  ']': '}',
  '\\': '|',
  ';': ':',
  '\'': '"',
  ',': '&lt;',
  '.': '&gt;',
  '/': '?',
};

function createTemplateKeys() {
  // eslint-disable-next-line no-restricted-syntax
  for (const el of Object.keys(enKeys)) {
    const key = document.createElement('div');
    key.className = 'key';
    key.setAttribute('data-key', `${enKeys[el]}`);
    key.textContent = el;
    keyboard.appendChild(key);
  }
}

createTemplateKeys();

/* ------create signature---- */
const signature = document.createElement('div');
const description = document.createElement('p');
const hint = document.createElement('p');
signature.className = 'signature';
description.className = 'text';
description.textContent = 'The keyboard was created in the operating system Windows.';
hint.className = 'text';
hint.textContent = 'Use to change language Ctrl + Alt.';

signature.appendChild(description);
signature.appendChild(hint);

document.body.appendChild(signature);

/* ----click------ */

const keysArr = document.querySelectorAll('.key');
const textarea = document.querySelector('.textarea');
let enLang = 'true';
let isCapse = false;
let arr = [];

function changeEnSymbol(obj) {
  arr = Object.keys(obj);
  keysArr.forEach((key) => {
    if (arr.includes(key.innerHTML)) {
      // eslint-disable-next-line no-param-reassign
      key.innerHTML = obj[key.innerHTML];
    }
  });
}
function changeRuSymbol(obj) {
  arr = Object.values(obj);
  keysArr.forEach((key) => {
    if (arr.includes(key.innerHTML)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const el of Object.keys(obj)) {
        if (obj[el] === key.innerHTML) {
          // eslint-disable-next-line no-param-reassign
          key.innerHTML = el;
        }
      }
    }
  });
}
function changeSymbol(obj) {
  if (enLang === 'true') {
    changeEnSymbol(obj);
    enLang = 'false';
  } else if (enLang === 'false') {
    changeRuSymbol(obj);
    enLang = 'true';
  }
}

// eslint-disable-next-line no-shadow
function pressTwoKeys(func, ...arr) {
  const arrOfKeys = new Set();
  document.addEventListener('keydown', (event) => {
    arrOfKeys.add(event.code);
    // eslint-disable-next-line no-restricted-syntax
    for (const code of arr) {
      if (!arrOfKeys.has(code)) {
        return;
      }
    }

    arrOfKeys.clear();
    func(ruKeys);
  });

  document.addEventListener('keyup', (event) => {
    arrOfKeys.delete(event.code);
  });
}

pressTwoKeys(
  () => changeSymbol(ruKeys),
  'ControlLeft',
  'AltLeft',
);
pressTwoKeys(
  () => changeSymbol(ruKeys),
  'ControlRight',
  'AltRight',
);

function makeLowerCase() {
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keysArr) {
    if (key.innerHTML.length === 1) {
      key.innerHTML = key.innerHTML.toLowerCase();
    }
  }
}

function makeUpperCase() {
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keysArr) {
    if (key.innerHTML.length === 1) {
      key.innerHTML = key.innerHTML.toUpperCase();
    }
  }
}

function doCapsLock(key) {
  isCapse = !isCapse;
  if (isCapse) {
    // eslint-disable-next-line no-param-reassign
    key.style.backgroundColor = 'green';
    makeUpperCase();
  } else if (!isCapse) {
    // eslint-disable-next-line no-param-reassign
    key.style.backgroundColor = '';
    makeLowerCase();
  }
}
function changeKey() {
  if (enLang) {
    arr = Object.keys(enShift);
    keysArr.forEach((key) => {
      if (arr.includes(key.innerHTML)) {
        // eslint-disable-next-line no-param-reassign
        key.innerHTML = enShift[key.innerHTML];
      }
    });
  } else if (!enLang) {
    arr = Object.keys(ruShift);
    keysArr.forEach((key) => {
      if (arr.includes(key.innerHTML)) {
        // eslint-disable-next-line no-param-reassign
        key.innerHTML = ruShift[key.innerHTML];
      }
    });
  }
}
function removeChanges() {
  if (enLang) {
    arr = Object.values(enShift);
    keysArr.forEach((key) => {
      if (arr.includes(key.innerHTML)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const el of Object.keys(enShift)) {
          if (enShift[el] === key.innerHTML) {
            // eslint-disable-next-line no-param-reassign
            key.innerHTML = el;
          }
        }
      }
    });
  } else if (!enLang) {
    arr = Object.values(ruShift);
    keysArr.forEach((key) => {
      if (arr.includes(key.innerHTML)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const el of Object.keys(ruShift)) {
          if (ruShift[el] === key.innerHTML) {
            // eslint-disable-next-line no-param-reassign
            key.innerHTML = el;
          }
        }
      }
    });
  }
}

function doShift() {
  if (!isCapse) {
    changeKey();
    makeUpperCase();

    document.addEventListener('keyup', (event) => {
      if (event.code === 'ShiftLeft' || event.target.dataset.key === 'ShiftLeft' || event.code === 'ShiftRight' || event.target.dataset.key === 'ShiftRight') {
        makeLowerCase();
        removeChanges();
      }
    });
    document.addEventListener('mouseup', (event) => {
      if (event.code === 'ShiftLeft' || event.target.dataset.key === 'ShiftLeft' || event.code === 'ShiftRight' || event.target.dataset.key === 'ShiftRight') {
        makeLowerCase();
        removeChanges();
      }
    });
  } else if (isCapse) {
    changeKey();
    makeLowerCase();
    document.addEventListener('keyup', (event) => {
      if (event.code === 'ShiftLeft' || event.target.dataset.key === 'ShiftLeft' || event.code === 'ShiftRight' || event.target.dataset.key === 'ShiftRight') {
        removeChanges();
        makeUpperCase();
      }
    });
    document.addEventListener('mouseup', (event) => {
      if (event.code === 'ShiftLeft' || event.target.dataset.key === 'ShiftLeft' || event.code === 'ShiftRight' || event.target.dataset.key === 'ShiftRight') {
        removeChanges();
        makeUpperCase();
      }
    });
  }
}

function createActionOfKey(key, event) {
  if (key.innerHTML.length === 1) {
    textarea.innerHTML += key.innerHTML;
  } else if (event.code === 'Space' || event.target.dataset.key === 'Space') {
    textarea.innerHTML += ' ';
  } else if (event.code === 'Backspace' || event.target.dataset.key === 'Backspace') {
    textarea.innerHTML = textarea.innerHTML.slice(0, -1);
  } else if (event.code === 'ShiftLeft' || event.target.dataset.key === 'ShiftLeft' || event.code === 'ShiftRight' || event.target.dataset.key === 'ShiftRight') {
    doShift();
  } else if (event.code === 'Delete' || event.target.dataset.key === 'Delete') {
    textarea.innerHTML = '';
  } else if (event.code === 'Enter' || event.target.dataset.key === 'Enter') {
    textarea.innerHTML += '\n';
  } else if (event.code === 'CapsLock' || event.target.dataset.key === 'CapsLock') {
    doCapsLock(key);
  }
}

function addActiveToKey(event) {
  keysArr.forEach((key) => {
    key.classList.remove('active');
    if (key.dataset.key === event.code || key.dataset.key === event.target.dataset.key) {
      key.classList.add('active');
      createActionOfKey(key, event);
      setTimeout(() => {
        key.classList.remove('active');
      }, 500);
    }
  });
}
document.addEventListener('mousedown', (event) => {
  if (event.target.className === 'key' || event.target.className === 'key active') {
    addActiveToKey(event);
  }
});

document.addEventListener('keydown', (event) => {
  addActiveToKey(event);
});

/* ----local storage--- */

function setLocalStorage() {
  localStorage.setItem('enLang', enLang);
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('enLang')) {
    enLang = localStorage.getItem('enLang');
    if (enLang === 'false') {
      changeEnSymbol(ruKeys);
    }
  }
}
window.addEventListener('load', getLocalStorage);
