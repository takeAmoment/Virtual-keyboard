/*--create title---*/

const title = document.createElement('div');
title.className = 'title';
title.textContent = 'My virtual-keyboard';
document.body.appendChild(title);

/*--------create textarea--------*/

const input = document.createElement('div');
input.className = 'textarea';
input.rows = '20';
input.cols = '50';
document.body.appendChild(input);