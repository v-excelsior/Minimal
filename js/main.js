window.onload = sliderRender();

function sliderRender() {
    $('.testimonials__slider').slick({
        infinite: false,
        arrows: false,
        dots: true,
        slidesToShow: 1
    });
    if (window.matchMedia("(min-width: 768px)").matches) {
        $('.our-team__slider').slick({
            infinite: false,
            arrows: false,
            dots: true,
            slidesToShow: 4,
            slideToScroll: 1
        });
        $('.clients__slider').slick({
            infinite: false,
            arrows: false,
            dots: true,
            slidesToShow: 5,
            slideToScroll: 1
        });
    } else {
        $('.our-team__slider').slick({
            infinite: false,
            arrows: false,
            dots: true,
            slidesToShow: 1,
            slideToScroll: 1
        });
        $('.clients__slider').slick({
            infinite: false,
            arrows: false,
            dots: true,
            slidesToShow: 1,
            slideToScroll: 1
        });
    }
};

const anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        if (!e.target.classList.contains('scroll-btn')) {
            headerListVisibilityHandler();
        }
        const blockID = anchor.getAttribute('href').substr(1);
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}


const filterRadios = document.getElementsByClassName('works__filter-radio');
const labels = document.getElementsByClassName('works__filter-type');
const works = document.getElementsByClassName('works__item');
const worksBtn = document.getElementsByClassName('works__item-btn');

addListenerHelper(filterRadios, 'click', filterHandler);
addListenerHelper(worksBtn, 'click', worksHandler);

function addListenerHelper(array, event, handler) {
    for (let item of array) {
        item.addEventListener(event, handler);
    }
}

function filterHandler(e) {
    filterByCategory(e.target.value);
    currentCategoty(e.target.getAttribute('id'));
}

function worksHandler(e) {
    let curModal = new Modal(modal);
    curModal.clean();
    curModal.generateCost();
    curModal.open();
}

filterByCategory('all');

function filterByCategory(category) {
    for (let item of works) {
        curCategory = item.getAttribute('data-categoty')
        item.classList.remove("show");
        if (curCategory == category || category == 'all') {
            item.classList.add("show");
        }
    }
}

function currentCategoty(currentRadio) { //выделяет текущий фильтр
    for (let label of labels) {
        if (label.getAttribute('for') == currentRadio) {
            label.classList.add('active');
        } else label.classList.remove('active');
    }
}

const headerListBtn = document.getElementById('header__menu-btn');
const headerList = document.getElementById('header__menu');
headerListBtn.addEventListener('click', headerListVisibilityHandler);

function headerListVisibilityHandler() {
    headerListBtn.classList.toggle('active');
    headerList.classList.toggle('active');
}

const contactForm = document.querySelector(".contact-form");
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
contactForm.addEventListener('submit', contactFormHandler);

function contactFormHandler(e) {
    e.preventDefault();
    let curModal = new Modal(modal);
    const inputs = getInputs(contactForm);
    curModal.clean();
    curModal.create(inputs);
    curModal.open();
}
function getInputs(form) {
    return Array.from(form.querySelectorAll('input, textarea'));
}
class Modal {
    constructor(element) {
        this.element = element;
        this._handler = null;
    }
    create(inputs) {
        for (let input of inputs) {
            let contentBlock = document.createElement('p');
            contentBlock.innerHTML = input.value;
            modalContent.append(contentBlock);
        }
    }
    open() {
        this.element.style.display = 'flex';
        setTimeout(() => {
            window.addEventListener('click', this._handler = e => this.close(e));
        }, 1);  //уточнить как переписать, костыль
    }
    close(e) {
        if (e.target.closest(".modal-content") === null) {
            window.removeEventListener('click', this._handler);
            this.element.style.display = "none";
        }
    }
    generateCost() {
        let rnd = document.createElement('p');
        rnd.innerHTML = "That may be cost: " + Math.floor(Math.random() * (100 - 1) + 1) + "$";
        modalContent.append(rnd);
    }
    clean() {
        while (modalContent.firstChild) modalContent.removeChild(modalContent.firstChild);
    }
}




