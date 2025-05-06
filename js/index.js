
const displaySpineer = (show) => {
    const spineer = document.getElementById('spineer');
    if (show) {
        spineer.classList.remove('hidden');
    }
    else {
        spineer.classList.add('hidden');
    }
}

const loeadCategories = async () => {
    displaySpineer(true);
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json();
    setTimeout(() => {
        displayCategories(data.categories)
        displaySpineer(false)
    }, 2000);
};
loeadCategories();
const displayCategories = (categories) => {
    const categoryBtnContainer = document.getElementById('category-btn-container');
    categoryBtnContainer.classList = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 text-center"

    categories.forEach((item) => {
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
          <button id="btn-${item.category}" onclick="loadCategoryPets('${item.category}')" class="btn border border-[#0E7A811A] rounded-2xl w-2/3 md:w-full py-15  bg-[#0E7A8126]/15 font-bold gap-3 text-2xl category-btn" bg-opacity-1><img class="" src=${item.category_icon}>
          ${item.category}
          </button>
          `
        categoryBtnContainer.append(buttonContainer);
    });

}
const loeadAllCategories = async (status) => {
    displaySpineer(true);

    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json()

    setTimeout(() => {
        if (status) {
            displayAllCategories(data.pets)
        }
        else {
            displayAllCategories(data.pets.slice(0, 6))
        }
        displaySpineer(false)
    }, 2000);
};

const viewMore = () => {
    loeadAllCategories(true);
}
loeadAllCategories();
const displayAllCategories = (categories) => {

    const categoryCardContainer = document.getElementById('category-card-container');
    categoryCardContainer.innerHTML = "";
    if (categories.length === 0) {
        categoryCardContainer.classList.remove('grid')
        categoryCardContainer.innerHTML = `
      <div class="p-20 rounded-xl text-center space-y-4">  <img class="mx-auto" src="./images/error.webp" />
      <p class="text-3xl font-semibold"> No Information Available</p>
      <p class="text-gray-400">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
  its layout. The point of using Lorem Ipsum is that it has a.</p>
      `;
        return
    }
    else {
        categoryCardContainer.classList.add('grid')
    }
    categories.forEach((item) => {

        const cardContainer = document.createElement('div');
        cardContainer.innerHTML = `
          <div class="flex flex-col card border border-gray-300 p-5 shadow-sm">
    <figure>
      <img class="w-full"
        src=${item.
                image} />
    </figure>
    <div>
      <h2 class="card-title text-xl font-bold">${item.
                pet_name
            }</h2>
      <div class="text-gray-500 font-medium">
      <p><i class="fa-solid fa-table-cells"></i> Breed: ${item.breed}</p>
      <p><i class="fa-solid fa-calendar-days"></i> Birth: ${item.
                date_of_birth}</p>
      <p><i class="fa-solid fa-mercury"></i> Gender: ${item.gender}</p>
      <p><i class="fa-solid fa-dollar-sign"></i>
       Price: ${item.price} $</p>
       <hr class="my-3"></hr>
      </div>
      </div>
      <div class=" flex justify-center gap-2 ">
        <button onclick="likedImage('${item.
                image}')" class="btn text-green-600 bg-white border rounded-lg   py-1 px-3"><i class="fa-regular fa-thumbs-up"></i></button>
        <button onclick="adoptModal(this)" id="adopt-Btn" class="btn text-green-600 bg-white border rounded-lg   py-1 px-3">Adopt</button>
        <button class="btn text-green-600 bg-white border rounded-lg   py-1 px-3">Details</button>
      </div>
      </div>
          `
        categoryCardContainer.append(cardContainer);
    });
};
const loadCategoryPets = (id) => {

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then(response => response.json())
        .then(data => displayAllCategories(data.data))
        .catch(error => console.log(error))
}

const likedImage = (image) => {
    const likedImageContainer = document.getElementById('pet-image-container');
    const div = document.createElement('div');
    div.innerHTML = `<img class="rounded-lg " src="${image}" />`
    likedImageContainer.append(div);
}

const adoptModal = (button) => {
    // const adoptBtn = document.getElementById('adopt-Btn');
    button.innerText = 'Adopted';
    button.disabled = true;
}


