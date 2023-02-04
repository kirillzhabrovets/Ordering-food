// const express = require("express");

require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from '/dist/js/modules/tabs';
import modal from '/dist/js/modules/modal';
import timer from '/dist/js/modules/timer';
import cards from '/dist/js/modules/cards';
import calc from '/dist/js/modules/calc';
import forms from '/dist/js/modules/forms';
import slider from '/dist/js/modules/slider';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', ()=> {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2023-06-19');
    cards();
    calc();
    forms('form', modalTimerId);
    slider({
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