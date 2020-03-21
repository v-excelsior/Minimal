function sliderRender(){
  if (window.matchMedia("(min-width: 768px)").matches) {
    $('.slider-our-team').slick({
      infinite:false,
      arrows:false,
      dots:true,
      slidesToShow: 4,
      slideToScroll:1
    });
    $('.slider-clients').slick({
      infinite:false,
      arrows:false,
      dots:true,
      slidesToShow: 5,
      slideToScroll: 1
    });
  } else {
    $('.slider-our-team').slick({
      infinite:false,
      arrows:false,
      dots:true,
      slidesToShow: 1,
      slideToScroll:1
    });
    $('.slider-clients').slick({
      infinite:false,
      arrows:false,
      dots:true,
      slidesToShow: 1,
      slideToScroll:1
    });
  }
};

$('.slider-testimonials').slick({ //доделать resize
    infinite:false,
    arrows:false,
    dots:true,
    slidesToShow: 1
  });

window.onload = sliderRender();

filterSelection("all");

function filterSelection(category) {
  let collection, i;
  collection = document.getElementsByClassName("works-item");
  for (i = 0; i < collection.length; i++) {
    collection[i].classList.remove("show");
    if (collection[i].classList.contains(category) || category=="all"){
      collection[i].classList.add("show")};
  }
}

let sortButtons = document.getElementsByClassName("sort-btn");
for (let i = 0; i < sortButtons.length; i++) {
  sortButtons[i].addEventListener("click", function() {
    for (let i = 0; i < sortButtons.length; i++){
      sortButtons[i].classList.remove("active");
    }
    sortButtons[i].classList.add("active");
  });
}

function toggleClass(idItem,classToToggle){
  let item = document.getElementById(idItem);
  item.classList.toggle(classToToggle);
}

function hideNav(idItemFirst, idItemSecond, classToToggle){ //у nav надо туглить 2 класса
  toggleClass(idItemFirst,classToToggle);
  toggleClass(idItemSecond,classToToggle);
}

const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const blockID = anchor.getAttribute('href').substr(1);
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

function showModal(){
  let modal = document.getElementById('modal-block');
  while(modal.firstChild) modal.removeChild(modal.firstChild);
  modal.style.display = "flex";
  document.body.style.overflow = 'hidden';
}

function getInputs(idForm,modal){
  form = document.getElementById(idForm);
  let inputs = form.getElementsByClassName('input-data');
  for (let input of inputs){
    let p = document.createElement('p');
    p.className = input.id;
    p.innerHTML = input.id + ": " + input.value;
    modal.append(p);  
  }
}
function generateSomeContentForModal(){
  let modal = document.getElementById('modal-block');
  let content = document.createElement('p');
  content.innerHTML = "That is random number " + Math.floor((Math.random() * (100 - 1) + 1));
  modal.append(content);
}

let works = document.getElementsByClassName("works-item"); //добавляю листенер на btn в works-item
for (let work of works) {
  let btn = work.querySelector(".work-btn");
  btn.addEventListener('click', function(){
    setTimeout(() => {showModal();generateSomeContentForModal()},50);
  });
}


function processForm(idForm){
  let modal = document.getElementById('modal-block');
  showModal();
  getInputs(idForm, modal);
  return false;
}

let modal = document.getElementById('modal-block');
window.onclick = function(event){
  if (event.target != modal){
    modal.style.display = "none";
    document.body.style.overflow = 'visible';
  }

  let parag = modal.getElementsByTagName('p');
  for (let chld of parag) {     //узнать почему p созданные в modal не относятся к самому div modal
    if (event.target == chld){
      modal.style.display = "flex";
      document.body.style.overflow = 'hidden';
    }
  }
}
