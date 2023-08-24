const accessKey  = "uV5xvtUJMSyVujdl4c5Vnv5e2w0TVYCRNsO8yTvKeqo";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResult = document.querySelector(".search-images");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page === 1){
        searchResult.innerHTML = ""
    }
    results.map((result) => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("search1");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageContainer.appendChild(image);
        imageContainer.appendChild(imageLink);
        searchResult.appendChild(imageContainer);      
    });

    page++

    if(page > 1){
        showMore.style.display = "block";
    }
}

    formElement.addEventListener("submit", (event) => {
        event.preventDefault();
        page =1;
        searchImages();
    });

    showMore.addEventListener("click", () => {
        searchImages();
    });