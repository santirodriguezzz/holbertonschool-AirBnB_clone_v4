#!/usr/bin/node
// task 2.
// Listen for changes on each input checkbox tag

window.onload = function () {
  const qsel = document.querySelector('div .amenities h4'); // permite recuperar un elemento del DOM
  const gt = document.getElementsByTagName('input'); // devolverá todos los input(elementos) del documento
  const leng = gt.length;
  const arr = [];
  const amenitiesID = [];

  for (let i = 0; i < leng; i++) {
    const checkbox = gt[i];
    checkbox.addEventListener('change', (event) => {
      if (event.currentTarget.checked) {
        if (String(qsel.innerHTML) === '&nbsp;') {
          arr.push(checkbox.dataset.name);
          amenitiesID.push(checkbox.dataset.id);

          qsel.innerHTML = arr.join(', ');
        } else {
          arr.push(checkbox.dataset.name);
          amenitiesID.push(checkbox.dataset.id);

          qsel.innerHTML = arr.join(', ');
        }
      } else if (event.currentTarget.checked === false) {
        const idx = arr.indexOf(checkbox.dataset.name);
        arr.splice(idx, 1);

        const idxAmenitiesID = amenitiesID.indexOf(checkbox.dataset.id);
        amenitiesID.splice(idxAmenitiesID, 1);

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
        console.log("Status: OK --> class available was added")
        element.classList.add('available');
      } else {
        console.log("Class available was removed")
        element.classList.remove('available');
      }
    })

  // task 4.
  // Request http://0.0.0.0:5001/api/v1/places_search/
  // Now, places are loaded from the front-end, not from the back-end
  // const section = document.querySelector('.places');
  // fetch('http://localhost:5001/api/v1/places_search', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({})
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     for (place of data) {
  //       section.innerHTML += `
  //       <article>
  //           <div class="title_box">
  //             <h2>${place.name}</h2>
  //             <div class="price_by_night">$${place.price_by_night}</div>
  //           </div>
  //           <div class="information">
  //             <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? "s" : ""}</div>
  //                   <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? "s" : ""}</div>
  //                   <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? "s" : ""}</div>
  //           </div>
  //                 <div class="description">
  //             ${place.description}
  //                 </div>
  //         </article>
  //       `;
  //     }
  //   })


    // task 5. 
    // Implement a filter:
    // When the button tag is clicked, a new POST request to places_search
    // should be made with the list of Amenities checked
    const button =  document.querySelector('.button');
    button.addEventListener("click", amenitiesFilter);

    function amenitiesFilter () {
      fetch('http://localhost:5001/api/v1/places_search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({amenities: amenitiesID})
      })
      .then(response => response.json())
      .then(data => {
        const placesSection = document. querySelector('.places');
        for (place of data) {
          for (id of place.amenity_ids) {
            if (id in amenitiesID) {
              placesSection.innerHTML = `
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
              break;
            }
          }
        }
      }
    )}
};
