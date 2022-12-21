#!/usr/bin/node
window.onload = function () {
  const qsel = document.querySelector('div.amenities h4'); // permite recuperar un elemento del DOM
  const gt = document.getElementsByTagName('input'); // devolverá todos los input(elementos) del documento
  const leng = gt.length;
  const arr = [];

  for (let i = 0; i < leng; i++) {
    const checkbox = document.getAnimationsByTagName('input')[i];
    checkbox.addEventListener('change', (event) => {
      if (event.currentTarget.checked) {
        if (String(qsel.innerHTML) === '&nbsp;') {
          arr.push(checkbox.dataset.name);
          qsel.innerHTML = arr.join(', ');
        } else {
          arr.push(checkbox.dataset.name);
          qsel.innerHTML = arr.join(', ');
        }
      } else if (event.currentTarget.checked === false) {
        const idx = arr.indexOf(checkbox.dataset.name);
        arr.splice(idx, 1);
        if (arr.length === 0) {
          qsel.innerHTML = '&nbsp;';
        } else {
          qsel.innerHTML = arr.join(', ');
        }
      }
    });
  }
};
