#!/usr/bin/node
// task 2.
// Listen for changes on each input checkbox tag

window.onload = function () {
  const qsel = document.querySelector('div .amenities h4'); // permite recuperar un elemento del DOM
  const gt = document.getElementsByTagName('input'); // devolverá todos los input(elementos) del documento
  const leng = gt.length;
  const arr = [];

  for (let i = 0; i < leng; i++) {
    const checkbox = gt[i];
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

  // task 3.
  // Request http://0.0.0.0:5001/api/v1/status/:
  // If in the status is “OK”, add the class available to the div#api_status
  // Otherwise, remove the class available to the div#api_status

  const element = document.getElementById('api_status');

  fetch('http://localhost:5001/api/v1/status/')
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        console.log("if")
        element.classList.add('available');
      } else {
        console.log("else")
        element.classList.remove('available');
      }
    })

  // task 4.
  // Request http://0.0.0.0:5001/api/v1/places_search/
  const section = document.querySelector('.places');
  fetch('http://localhost:5001/api/v1/places_search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({key: 'value'})
  })
    .then(response => response.json())
    .then(data => {
      for (place of data) {
        section.innerHTML += `
        <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? "s" : ""}</div>
                    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? "s" : ""}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? "s" : ""}</div>
            </div>
                  <div class="description">
              ${place.description}
                  </div>
          </article>
        `;
      }
    })
};
