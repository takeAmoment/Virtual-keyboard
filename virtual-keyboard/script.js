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

let keysArr = document.querySelectorAll('.key');
const textarea = document.querySelector('.textarea');

function createActionOfKey(key, event){
    if(key.innerHTML.length === 1){
        textarea.innerHTML += key.innerHTML;
    } else if(event.code === 'Space' || event.target.dataset.key === 'Space'){
        textarea.innerHTML += ' ';
    } else if(event.code === 'Backspace'|| event.target.dataset.key === 'Backspace'){
        textarea.innerHTML = textarea.innerHTML.slice(0, -1);
    } else if(event.code === 'ShiftLeft'|| event.target.dataset.key === 'ShiftLeft' || event.code === 'ShiftRight'|| event.target.dataset.key === 'ShiftRight'){
        isShift();
    } else if(event.code === 'Delete'|| event.target.dataset.key === 'Delete'){
        textarea.innerHTML = '';
    }else if(event.code === 'Enter'|| event.target.dataset.key === 'Enter'){
        textarea.innerHTML += '\n';
    }else if(event.code === 'CapsLock'|| event.target.dataset.key === 'CapsLock'){
        doCapsLock(key);
    }
}

function addActiveToKey(event){
    keysArr.forEach(key => {
        key.classList.remove('active');
        if(key.dataset.key === event.code || key.dataset.key === event.target.dataset.key){
            key.classList.add('active');
            createActionOfKey(key, event);
        }
    })
}

document.addEventListener('mousedown', function(event){
    if(event.target.className === 'key' || event.target.className === 'key active'){
       addActiveToKey(event);
    }
})


/*--------keypress------*/


function pressTwoKeys(func, ...keys){
    let arrOfKeys = new Set();
    document.addEventListener('keydown', function(event){
        arrOfKeys.add(event.code);

        for(let code of keys){
            if(!arrOfKeys.has(code)){
                return;
            }
        }

        arrOfKeys.clear();
        func();
    });


    document.addEventListener('keyup', function(event){
        arrOfKeys.delete(event.code);
    })
}

pressTwoKeys(
    ()=> console.log('hi'),
    'ShiftLeft',
    'AltLeft'
);

let isCapse = false;
function makeLowerCase(){
    for(let key of keysArr){
        if(key.innerHTML.length === 1){
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

function doCapsLock(key){
    isCapse = !isCapse;

    if(isCapse){
        key.style.backgroundColor = 'green';
        makeUpperCase();
    } else if(!isCapse){
        key.style.backgroundColor = '';
        makeLowerCase();
    }
}
function isShift(){
    if(!isCapse){
        makeUpperCase();
        document.addEventListener('keyup', function(event){
            if(event.code === 'ShiftLeft'|| event.target.dataset.key === 'ShiftLeft' || event.code === 'ShiftRight'|| event.target.dataset.key === 'ShiftRight'){
                makeLowerCase();
            }
           
        })
        document.addEventListener('mouseup', function(event){
            if(event.code === 'ShiftLeft'|| event.target.dataset.key === 'ShiftLeft' || event.code === 'ShiftRight'|| event.target.dataset.key === 'ShiftRight'){
                makeLowerCase();
            }
        })
    } else if(isCapse){
        makeLowerCase();
        document.addEventListener('keyup', function(event){
            if(event.code === 'ShiftLeft'|| event.target.dataset.key === 'ShiftLeft' || event.code === 'ShiftRight'|| event.target.dataset.key === 'ShiftRight'){
                makeUpperCase();
            }
        })
        document.addEventListener('mouseup', function(event){
            if(event.code === 'ShiftLeft'|| event.target.dataset.key === 'ShiftLeft' || event.code === 'ShiftRight'|| event.target.dataset.key === 'ShiftRight'){
               console.log(event.code)
                makeUpperCase();
            }
        })
    }
    
    
   
}




// function removeActiveToKey(){
//     keysArr.forEach(key => {
//         key.classList.remove('active');
//     })
// }

document.addEventListener('keydown', function(event){
    console.log(event.code)
    addActiveToKey(event);
})
// document.addEventListener('keyup', function(event){
//     console.log(event.code)
//     removeActiveToKey(event);
// })