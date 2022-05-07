/*--create title---*/

const title = document.createElement('div');
title.className = 'title';
title.textContent = 'My virtual-keyboard';
document.body.appendChild(title);

/*--------create textarea--------*/

const input = document.createElement('textarea');
input.className = 'textarea';
input.autofocus = true;
// input.rows = '20';
// input.cols = '50';
document.body.appendChild(input);

/*----------keyboard---------------*/
const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
document.body.appendChild(keyboard);

let enKeys = {
    '`': 'Backquote',
    '1': 'Digit1',
    '2': 'Digit2',
    '3': 'Digit3',
    '4': 'Digit4',
    '5': 'Digit5',
    '6': 'Digit6',
    '7': 'Digit7',
    '8': 'Digit8',
    '9': 'Digit9',
    '0': 'Digit0',
    '-': 'NumpadSubtract',
    '=': 'Equal',
    'Backspace': 'Backspace',
    'Tab': 'Tab',
    'q': 'KeyQ',
    'w': 'KeyW',
    'e': 'KeyE',
    'r': 'KeyR',
    't': 'KeyT',
    'y': 'KeyY',
    'u': 'KeyU',
    'i': 'KeyI',
    'o': 'KeyO',
    'p': 'KeyP',
    '[': 'BracketLeft',
    ']': 'BracketRight',
    '\\': 'Backslash',
    'Del': 'Delete',
    'CapsLock': 'CapsLock',
    'a': 'KeyA',
    's': 'KeyS',
    'd': 'KeyD',
    'f': 'KeyF',
    'g': 'KeyG',
    'h': 'KeyH',
    'j': 'KeyJ',
    'k': 'KeyK',
    'l': 'KeyL',
    ';': 'Semicolon',
    '\'': 'Quote',
    'Enter': 'Enter',
    'Shift ': 'ShiftLeft',
    'z': 'KeyZ',
    'x': 'KeyX',
    'c': 'KeyC',
    'v': 'KeyV',
    'b': 'KeyB',
    'n': 'KeyN',
    'm': 'KeyM',
    ',': 'Comma',
    '.': 'Period',
    '/': 'Slash',
    '▲': 'ArrowUp',
    'Shift': 'ShiftRight',
    'Ctrl ': 'ControlLeft',
    'Win': 'MetaLeft',
    'Alt ': 'AltLeft',
    ' ': 'Space',
    'Alt': 'AltRight',
    '◄': 'ArrowLeft',
    '▼': 'ArrowDown',
    '►': 'ArrowRight',
    'Ctrl': 'ControlRight'
};

function createTemplateKeys(){
    for(let el of Object.keys(enKeys)){
        let key  = document.createElement('div');
        key.className = 'key';
        key.setAttribute('data-key', `${enKeys[el]}`);
        key.textContent = el;
        keyboard.appendChild(key);
    }
}

createTemplateKeys();

/*----click------ */


document.addEventListener('click', function(event){
    let target = event.target;
    console.log(event.target.className);
    if(event.target.className === 'key' || event.target.className === 'key active'){
       
        document.querySelectorAll('.key').forEach(el => {
            el.classList.remove('active');
            if (el.dataset.key === target.dataset.key){
                el.classList.add('active');
                createActionOfKey(el, event);
                
            }
        })
    }
})


/*--------keypress------*/
let keysArr = document.querySelectorAll('.key');
const textarea = document.querySelector('.textarea');

let isCapse = false;
function makeLowerCase(){
    for(let key of keysArr){
        if(key.innerHTML === 1){
            key.innerHTML = key.innerHTML.toLowerCase();
        }
    }
}

function makeUpperCase(){
    for(let key of keysArr){
        if(key.innerHTML.length === 1){
            key.innerHTML = key.innerHTML.toUpperCase();
        }
    }
}
makeUpperCase();


function createActionOfKey(key, event){
    if(key.innerHTML.length === 1){
        textarea.innerHTML += key.innerHTML;
    } else if(event.code === 'Space' || event.target.dataset.key === 'Space'){
        textarea.innerHTML += ' ';
    } else if(event.code === 'Backspace'|| event.target.dataset.key === 'Backspace'){
        textarea.innerHTML = textarea.innerHTML.slice(0, -1);
    } else if(event.code === 'ShiftLeft'|| event.target.dataset.key === 'ShiftLeft' || event.code === 'ShiftRight'|| event.target.dataset.key === 'ShiftRight'){
    } else if(event.code === 'Delete'|| event.target.dataset.key === 'Delete'){
        textarea.innerHTML = '';
    }else if(event.code === 'Enter'|| event.target.dataset.key === 'Enter'){
        textarea.innerHTML += '\n';
    }
}

function addActiveToKey( event){
    keysArr.forEach(key => {
        key.classList.remove('active');
        if(key.dataset.key === event.code){
            key.classList.add('active');
            createActionOfKey(key, event);
            

        }
    })
}


document.addEventListener('keydown', function(event){
    console.log(event.code)
    addActiveToKey(event);
})