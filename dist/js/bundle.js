/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/js/modules/calc.js":
/*!*********************************!*\
  !*** ./dist/js/modules/calc.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
//Калькулятор каллорий

const result= document.querySelector('.calculating__result span');

let sex, height, weight, age, ratio;

if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
} else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
}

if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
} else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
}


function initLocalSetting(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.classList.remove(activeClass);
        if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
        }
        if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
        }
    });
}

initLocalSetting('#gender div', 'calculating__choose-item_active');
initLocalSetting('.calculating__choose_big div', 'calculating__choose-item_active');

function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = '____';
        return;
    }

    if (sex === 'famale') {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
    
}

calcTotal();


function getStaticInformation(selector, activeClass){
    const elements = document.querySelectorAll(selector);


    elements.forEach(elem => {
        elem.addEventListener('click', (e) => {
            if ( e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
            } else {
                sex= e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id'));
            }

            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            });

            e.target.classList.add(activeClass);

            calcTotal();            
        });
    });
}



getStaticInformation('#gender div', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

        if (input.value.match(/\D/g)) {
            input.style.border = '2px solid red';
        } else {
            input.style.border = 'none';
        }

        switch(input.getAttribute('id')) {
            case 'height':
                height = +input.value;
                break;
            case 'weight':
                weight = +input.value;
                break;
            case 'age':
                age = +input.value;
                break;
        }

        
    calcTotal();
    });
}

getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./dist/js/modules/cards.js":
/*!**********************************!*\
  !*** ./dist/js/modules/cards.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./dist/js/services/services.js");


function cards() {
    // Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src=src;
            this.alt=alt;
            this.title=title;
            this.descr=descr;
            this.price=price;
            this.classes = classes;
            this.parent= document.querySelector(parentSelector);
            this.transfer = 60;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div');

            if (this.classes.length==0) {
                this.element= 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./dist/js/modules/forms.js":
/*!**********************************!*\
  !*** ./dist/js/modules/forms.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./dist/js/modules/modal.js");
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services.js */ "./dist/js/services/services.js");



function forms(formSelector, modalTimerId) {
// Forms

const forms = document.querySelectorAll(formSelector);

const message = {
  loading: 'SVG/spinner.svg',
  success: 'Спасибо! Скоро мы вам позвоним',
  failure: 'Что-то пошло не так....'  
};

forms.forEach(item =>{
    bindPostData(item);
});

function bindPostData(form) {
    form.addEventListener('submit', (e)=> {
        e.preventDefault();


        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto; 
        `;
        // form.append(statusMessage);
        form.insertAdjacentElement('afterend', statusMessage);


       
        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));
    

        (0,_services_services_js__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
            showThanksModal(message.success);
            form.reset();
            statusMessage.remove();
        }).catch(()=> {
            showThanksModal(message.failure);
        }).finally(()=> {
            form.reset();
        });
    });
};
function showThanksModal (message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide'); //modal
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
            <div data-close class="modal__close">×</div>
            <div class="modal__title">${message}</div>
    </div>
    `;

    document.querySelector('.show').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide'); //modal
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 4000);
};


fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res=> console.log(res));


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./dist/js/modules/modal.js":
/*!**********************************!*\
  !*** ./dist/js/modules/modal.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    //    modal.classList.toggle('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    // modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);

    if (modalTimerId){
        clearInterval(modalTimerId);
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {

const modalTrigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector);

modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
});


modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal(modalSelector);
    }
});

document.addEventListener('keydown', (e)=>{
    if (e.code === "Escape" && modal.classList.contains('show')) {
        closeModal(modalSelector);
    }
});

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }  

window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./dist/js/modules/slider.js":
/*!***********************************!*\
  !*** ./dist/js/modules/slider.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    
    let offset = 0;
    let slideIndex = 1;
    
     const slides = document.querySelectorAll(slide),
     slider = document.querySelector(container),
     prev = document.querySelector(prevArrow),
     next = document.querySelector(nextArrow),
     total=document.querySelector(totalCounter),
     current = document.querySelector(currentCounter),
     slidesWrapper = document.querySelector(wrapper),
     slidesField = document.querySelector(field),
     width = window.getComputedStyle(slidesWrapper).width;


    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent= `0${slideIndex}`;
    } else {
            total.textContent = slides.length;
            current.textContent= slideIndex;
    }

    slidesField.style.width = 100 * slides.length +'%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
   slide.style.width = width;
});

slider.style.position='relative';

const indicators = document.createElement('ol'),
      dots=[];

indicators.classList.add('carousel-indicatores');
indicators.style.cssText= `
   position: absolute;
   right: 0;
   bottom: 0;
   left: 0;
   z-index: 15;
   display: flex;
   justify-content: center;
   margin-right: 15%;
   margin-left: 15%;
   list-style: none;
`;
slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
   const dot = document.createElement('li');
   dot.setAttribute('data-slide-to', i+1);
   dot.style.cssText= `
       box-sizing: content-box;
       flex: 0 1 auto;
       width: 30px;
       height: 6px;
       margin-right: 3px;
       margin-left: 3px;
       cursor: pointer;
       background-color: #fff;
       background-clip: padding-box;
       border-top: 10px solid transparent;
       border-bottom: 10px solid transparent;
       opacity: .5;
       transition: opacity .6s ease;
   `;
   if(i == 0 ) {
       dot.style.opacity = 1;
   };

   indicators.append(dot);
   dots.push(dot);
}

function deleteNotDigits(str) {
   return +str.replace(/\D/g, '');
}

next.addEventListener('click', () => { //'500px'
   if (offset == deleteNotDigits(width) * (slides.length -1)){
       offset = 0;
   } else {
       offset += deleteNotDigits(width);
   }

   slidesField.style.transform = `translateX(-${offset}px)`;

   if (slideIndex == slides.length) {
       slideIndex = 1;
   } else {
       slideIndex++;
   }

   if (slides.length < 10) {
       current.textContent = `0${slideIndex}`;
   } else {
       current.textContent = slideIndex;
   }

   dots.forEach(dot => dot.style.opacity ='.5');
   dots[slideIndex -1].style.opacity =1;
});


prev.addEventListener('click', () => {
   if (offset == 0){
       offset == deleteNotDigits(width)* (slides.length - 1);
   } else {
       offset -= deleteNotDigits(width);
   }

   slidesField.style.transform = `translateX(-${offset}px)`;

if (slideIndex == 1) {
       slideIndex = slides.length;
   } else {
       slideIndex--;
   }

   if (slides.length < 10) {
       current.textContent = `0${slideIndex}`;
   } else {
       current.textContent = slideIndex;
   }

   
   dots.forEach(dot => dot.style.opacity ='.5');
   dots[slideIndex -1].style.opacity =1;
});


dots.forEach(dot => {
   dot.addEventListener('click', (e) => {
       const slideTo = e.target.getAttribute('data-slide-to');

       slideIndex = slideTo;
       offset = deleteNotDigits(width) * (slideTo -1);
       
       slidesField.style.transform = `translateX(-${offset}px)`;
   
       if (slides.length < 10) {
           current.textContent = `0${slideIndex}`;
       } else {
           current.textContent = slideIndex;
       }

       dots.forEach(dot => dot.style.opacity ='.5');
       dots[slideIndex -1].style.opacity =1;
   
   });
});


// showSlides(slideIndex);

// if (slides.length < 10) {
//     total.textContent = `0${slides.length}`;
// } else {
//     total.textContent = slides.length;
// }

// function showSlides(n) {
//     if (n > slides.length) {
//         slideIndex = 1;
//     }

//     if (n < 1) {
//         slideIndex = slides.length;
//     }

//     slides.forEach(item => item.style.display = 'none');

//     slides[slideIndex - 1].style.display = 'block';

//     if (slides.length < 10) {
//         current.textContent = `0${slideIndex}`;
//     } else {
//         current.textContent = slideIndex;
//     }
// }


// function plusSlides(n) {
//     showSlides(slideIndex += n);
// }

// prev.addEventListener('click', () => {
//     plusSlides(-1);
// });
// next.addEventListener('click', ()=>{
//     plusSlides(1);
// });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./dist/js/modules/tabs.js":
/*!*********************************!*\
  !*** ./dist/js/modules/tabs.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
//Tabs//

 
const tabs = document.querySelectorAll(tabsSelector),
tabsContent = document.querySelectorAll(tabsContentSelector),
tabsParent = document.querySelector(tabsParentSelector);


function hideTabContent() {
    tabsContent.forEach(item => {
        item.style.display = 'none';
        item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
        item.classList.remove(activeClass);
    });
}

function showTabContent(i = 0) {
    // tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
    tabsContent[i].style.display= 'block';
    tabs[i].classList.add('tabheader__items');
}

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', (event)=> {
    const target = event.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./dist/js/modules/timer.js":
/*!**********************************!*\
  !*** ./dist/js/modules/timer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 *60 * 24));
        const hours = Math.floor((t / (1000*60*60) % 24));
        const minutes = Math.floor((t/1000/60) % 60);
        const seconds = Math.floor ((t/1000) % 60);
    
    
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }


    function getZero(num) {
        if (num>= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }


    function setClock (selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
              
              updateClock();

              function updateClock() {
                const t = getTimeRemaining(endtime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if (t.total <= 0 ) {
                    clearInterval(timeInterval);
                }
            }
    }
            setClock(id, deadline);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./dist/js/services/services.js":
/*!**************************************!*\
  !*** ./dist/js/services/services.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
    });

    return await res.json();
};

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok){
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./dist/js/script.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dist_js_modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../dist/js/modules/tabs */ "./dist/js/modules/tabs.js");
/* harmony import */ var _dist_js_modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./dist/js/modules/modal.js");
/* harmony import */ var _dist_js_modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../dist/js/modules/timer */ "./dist/js/modules/timer.js");
/* harmony import */ var _dist_js_modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../dist/js/modules/cards */ "./dist/js/modules/cards.js");
/* harmony import */ var _dist_js_modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../dist/js/modules/calc */ "./dist/js/modules/calc.js");
/* harmony import */ var _dist_js_modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../dist/js/modules/forms */ "./dist/js/modules/forms.js");
/* harmony import */ var _dist_js_modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../dist/js/modules/slider */ "./dist/js/modules/slider.js");
// const express = require("express");










window.addEventListener('DOMContentLoaded', ()=> {

    const modalTimerId = setTimeout(() => (0,_dist_js_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000);

    (0,_dist_js_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_dist_js_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_dist_js_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2023-06-19');
    (0,_dist_js_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_dist_js_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_dist_js_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
    (0,_dist_js_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        container:'.offer__slider',
        slide:'.offer__slide',
        nextArrow:'.offer__slider-next',
        prevArrow:'.offer__slider-prev',
        totalCounter:'#total',
        currentCounter:'#current',
        wrapper:'.offer__slider-wrapper',
        field:'.offer__slider-inner'
    });

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map