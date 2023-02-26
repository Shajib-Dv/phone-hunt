/** @format */

const loadPhone = (search, dataLimit) => {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    .then((res) => res.json())
    .then((data) => displayPhone(data.data, dataLimit));
};

const displayPhone = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phone-container");

  phoneContainer.innerHTML = "";

  // show all btn set

  const showBtn = document.getElementById("show-all-btn");
  if (dataLimit && phones.length > 6) {
    phones = phones.slice(0, 6);
    showBtn.classList.remove("d-none");
  } else {
    showBtn.classList.add("d-none");
  }

  //   if no phones found

  const noPhone = document.getElementById("no-phone");

  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = ` <div class="card h-100">
             <div class="d-flex justify-content-center"> <img src="${phone.image}" class="card-img-top w-50 pt-2" alt="..." /></div>
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                  <button
                  onclick="showDetailsModal('${phone.slug}')"
                   type="button"
                   class="btn btn-primary"
                   data-bs-toggle="modal"
                   data-bs-target="#phone-details-modal"
                  >
                    Show Details
                 </button>
              </div>
            </div>`;

    phoneContainer.appendChild(phoneDiv);
  });
  toggleSpinner(false);
};

// show details in a modal

const showDetailsModal = (phone) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phone}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => setDetailsModal(data))
    .catch((error) => console.log(error));
};

// set phone details on modal

const setDetailsModal = (data) => {
  const title = (document.getElementById("modal-title").innerText =
    data.data.name);
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
  <h4>Brand : ${
    data.data.brand ? data.data.brand : "Bangla Brand from Gulisthan"
  }</h4>
    <p>Released on : ${
      data.data.releaseDate ? data.data.releaseDate : "Upcoming"
    }</p>
    <h5>${data.data.mainFeatures.chipSet}</h5>

    `;

  data.data.mainFeatures.sensors.forEach((sensor) => {
    const div = document.createElement("div");
    div.innerHTML = `
  <p> => ${sensor}</p>
  `;
    modalBody.appendChild(div);
  });

  console.log(data.data.mainFeatures);
};

// process data common function

const processSearchData = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchResult = searchField.value;

  if (searchResult) {
    loadPhone(searchResult, dataLimit);
  } else {
    loadPhone("iphone");
  }
};

// search data

const searchPhone = () => {
  processSearchData(6);
};

// press enter to search

document
  .getElementById("search-field")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      processSearchData(6);
    }
  });

// spinner load

const toggleSpinner = (isLoading) => {
  const spinnerSection = document.getElementById("spinner");
  if (isLoading === true) {
    spinnerSection.classList.remove("d-none");
  } else {
    spinnerSection.classList.add("d-none");
  }
};

// show all data

// show all btn
document.getElementById("show-all-btn").addEventListener("click", function () {
  processSearchData();
});

loadPhone("iphone");
