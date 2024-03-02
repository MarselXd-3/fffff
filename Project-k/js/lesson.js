const tabContentItems = document.querySelectorAll('.tab_content_block');
const tabItems = document.querySelectorAll('.tab_content_item');
const tabItemsParent = document.querySelector('.tab_content_items');

let currentTab = 0;
let intervalId; 

const hideTabContent = () => {
    tabContentItems.forEach((item) => {
        item.style.display = 'none';
    });
    tabItems.forEach((item) => {
        item.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (index = 0) => {
    hideTabContent();
    const currentTabContent = tabContentItems[index];
    currentTabContent.style.display = 'block';
    tabItems[index].classList.add('tab_content_item_active');
    const backgroundImage = currentTabContent.querySelector('.image_container img').getAttribute('src');
    // Устанавливаем фоновое изображение только для блока .inner_tab_slider
    const innerTabSlider = document.querySelector('.inner_tab_slider');
    innerTabSlider.style.backgroundImage = `url(${backgroundImage})`;
    innerTabSlider.style.backgroundSize = 'cover'; // Устанавливаем размер фона
};

showTabContent(currentTab);

const autoSlide = () => {
    currentTab = (currentTab + 1) % tabItems.length;
    showTabContent(currentTab);
};

intervalId = setInterval(autoSlide, 3000);

tabItemsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabItems.forEach((tabItem, tabIndex) => {
            if (event.target === tabItem) {
                currentTab = tabIndex;
                hideTabContent();
                showTabContent(tabIndex);
                clearInterval(intervalId); 
                intervalId = setInterval(autoSlide, 3000); 
            }
        });
    }
};




const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const cardBlock = document.querySelector('.card');

let currentCard = 1;

function fetchData(cardNumber) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardNumber}`)
    .then(response => response.json())
    .then(data => {
        const completedText = data.completed ? 'Completed' : 'Not Completed';
        const completedColor = data.completed ? 'green' : 'red';
        cardBlock.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${completedColor}">${completedText}</p>
            <span>${data.id}</span>`;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function fetchPostsData() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        console.log("Posts data:", data);
    })
    .catch(error => {
        console.error('Error fetching posts data:', error);
    });
}

function showNextCard() {
    currentCard = currentCard === 200 ? 1 : currentCard + 1;
    fetchData(currentCard);
}

function showPrevCard() {
    currentCard = currentCard === 1 ? 200 : currentCard - 1;
    fetchData(currentCard);
}


fetchData(currentCard);
fetchPostsData();

btnPrev.onclick = showPrevCard;
btnNext.onclick = showNextCard;

//weather

const cityInput = document.querySelector('.cityName')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const searchButton = document.getElementById('search')
const BASE_URL = 'http://api.openweathermap.org'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

const citySearch = () => {
    searchButton.onclick = () => {
        fetch(`${BASE_URL}/data/2.5/weather?q=${cityInput.value}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            city.innerHTML = data.name || 'City Not Found...'
            temp.innerHTML = data.main?.temp ? Math.round(data.main?.temp - 273) + '&deg;C' : '...'      

        })
    }
}

citySearch()

const user = {name: "Marsel"}

console.log(user.addres?.street)



let toggler = document.querySelector('.toggler');
let price = document.querySelectorAll('.price');
let dollar = document.querySelectorAll('.dollar');
let usd = 89.72;


toggler.onclick = () =>{

    toggler.classList.toggle('active');

    if(toggler.classList.contains('active')){

        for(var i = 0; i < dollar.length; i++){
            dollar[i].innerText = '₹';
        }
        for(var k = 0; k < price.length; k++){
            price[k].innerText = (price[k].innerText * usd).toFixed(2);
        }

    }else{

        for(var i = 0; i < dollar.length; i++){
            dollar[i].innerText = '$';
        }
        for(var k = 0; k < price.length; k++){
            price[k].innerText = (price[k].innerText / usd).toFixed(2);
        }

    }

}


