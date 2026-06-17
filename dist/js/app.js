/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "burgerMenu": () => (/* binding */ burgerMenu),
/* harmony export */   "phoneMask": () => (/* binding */ phoneMask),
/* harmony export */   "popups": () => (/* binding */ popups)
/* harmony export */ });
/*---------------------------------------------------------------------------
Маска телефона
---------------------------------------------------------------------------*/
function phoneMask() {
   document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll("input.tel-mask").forEach((input) => {
         let keyCode;
         function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___ __ __",
               i = 0,
               val = this.value.replace(/\D/g, ""),
               new_value = matrix.replace(/[_\d]/g, (a) =>
                  i < val.length ? val.charAt(i++) : a
               );
            i = new_value.indexOf("_");
            if (i !== -1) {
               i < 5 && (i = 3);
               new_value = new_value.slice(0, i);
            }
            let reg = matrix
               .substr(0, this.value.length)
               .replace(/_+/g, (a) => `\\d{1,${a.length}}`)
               .replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
               this.value = new_value;
            }
            if (event.type === "blur" && this.value.length < 5) this.value = "";
         }

         input.addEventListener("input", mask);
         input.addEventListener("focus", mask);
         input.addEventListener("blur", mask);
         input.addEventListener("keydown", mask);
      });
   });
}


/*---------------------------------------------------------------------------
Бургер меню
---------------------------------------------------------------------------*/
function burgerMenu() {
   document.addEventListener("DOMContentLoaded", () => {
      const menuIcon = document.querySelector(".menu__icon");
      const menuBody = document.querySelector(".menu__body");
      const body = document.body;
      const menuBodyClose = document.querySelector(".menu__body-close");

      if (!menuIcon || !menuBody) return;

      const closeMenu = () => {
         menuIcon.classList.remove("active");
         menuBody.classList.remove("active");
         body.classList.remove("no-scroll");
      };

      menuIcon.addEventListener("click", () => {
         menuIcon.classList.toggle("active");
         menuBody.classList.toggle("active");
         body.classList.toggle("no-scroll");
      });

      menuBody.addEventListener("click", (e) => {
         const link = e.target.closest("a");
         if (link) {
            closeMenu();
         }
      });

      if (menuBodyClose) menuBodyClose.addEventListener("click", closeMenu);

      document.addEventListener("click", (e) => {
         if (!menuBody.contains(e.target) && !menuIcon.contains(e.target)) closeMenu();
      });
   });
}



/*---------------------------------------------------------------------------
Попапы
---------------------------------------------------------------------------*/
function popups() {
   if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initPopups);
   } else {
      initPopups();
   }
}

function initPopups() {
   const POPUP_SELECTOR = ".popup";
   const OPEN_BTN_SELECTOR = ".open-popup";
   const ACTIVE_CLASS = "show";
   const BODY_ACTIVE_CLASS = "popup-opened";

   let activeButton = null;

   // =========================
   // OPEN / SWITCH POPUPS
   // =========================
   document.addEventListener("click", (e) => {
      const button = e.target.closest(OPEN_BTN_SELECTOR);
      if (!button) return;

      e.preventDefault();
      e.stopPropagation();

      const popupId = button.dataset.popup;
      if (!popupId) return;

      const popup = document.getElementById(popupId);
      if (!popup) return;

      const currentPopup = document.querySelector(
         `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
      );

      if (activeButton === button && currentPopup) {
         closePopup(currentPopup);
         return;
      }

      if (currentPopup) {
         closePopup(currentPopup);
      }

      openPopup(popup, button);
   });

   // =========================
   // CLOSE POPUPS (overlay / close btn / outside)
   // =========================
   document.addEventListener("click", (e) => {
      const openPopupEl = document.querySelector(
         `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
      );
      if (!openPopupEl) return;

      if (e.target.closest(OPEN_BTN_SELECTOR)) return;

      const isCloseBtn = e.target.closest(".popup__close");
      const isInsideBody = e.target.closest(".popup__body");

      if (isCloseBtn || !isInsideBody) {
         closePopup(openPopupEl);
      }
   });

   // =========================
   // ESC KEY
   // =========================
   document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;

      const openPopupEl = document.querySelector(
         `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
      );
      if (!openPopupEl) return;

      closePopup(openPopupEl);
   });

   // =========================
   // HELPERS
   // =========================
   function openPopup(popup, button) {
      popup.classList.add(ACTIVE_CLASS);
      document.body.classList.add(BODY_ACTIVE_CLASS);

      if (button) {
         button.classList.add("active");
         activeButton = button;
      }
   }

   function closePopup(popup) {
      popup.classList.remove(ACTIVE_CLASS);
      document.body.classList.remove(BODY_ACTIVE_CLASS);

      if (activeButton) {
         activeButton.classList.remove("active");
         activeButton = null;
      }
   }
}


/***/ })
/******/ 	]);
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
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.burgerMenu();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.popups();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.phoneMask();

/*==========================================================================
Submenu
============================================================================*/
function initSubmenu() {
   const menu = document.querySelector('.menu__list');

   if (!menu) return;

   menu.addEventListener('click', (e) => {
      const toggle = e.target.closest('.menu__toggle');

      if (!toggle) return;

      e.stopPropagation();

      const sublist = toggle.nextElementSibling;

      if (!sublist?.classList.contains('menu__sublist')) return;

      document.querySelectorAll('.menu__sublist.active').forEach(item => {
         if (item !== sublist) {
            item.classList.remove('active');
         }
      });

      document.querySelectorAll('.menu__toggle.active').forEach(item => {
         if (item !== toggle) {
            item.classList.remove('active');
         }
      });

      sublist.classList.toggle('active');
      toggle.classList.toggle('active');
   });

   document.addEventListener('click', () => {
      document.querySelectorAll('.menu__sublist.active').forEach(item => {
         item.classList.remove('active');
      });

      document.querySelectorAll('.menu__toggle.active').forEach(item => {
         item.classList.remove('active');
      });
   });
}


/*==========================================================================
GLightbox
============================================================================*/
let lightbox = null;

function initGalleries() {
   if (typeof GLightbox !== 'undefined') {
      if (lightbox) {
         lightbox.destroy();
      }

      lightbox = GLightbox({
         selector: '.glightbox'
      });
   } else {
      console.warn('GLightbox не загружен');
   }
}


/*==========================================================================
FAQ
============================================================================*/
function initFaqAccordion() {
   const faqItems = document.querySelectorAll('.faq__item');
   if (!faqItems.length) return;

   faqItems.forEach(item => {
      const question = item.querySelector('.faq__question');
      const answer = item.querySelector('.faq__answer');

      if (!question || !answer || item.dataset.inited) return;

      question.addEventListener('click', () => {
         const isActive = item.classList.contains('active');

         if (isActive) {
            item.classList.remove('active');
            answer.style.maxHeight = null;
         } else {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
         }
      });

      item.dataset.inited = 'true';
   });
}


/*==========================================================================
Reviews
============================================================================*/
function initSplideSlider(selector, options = {}) {
   const slider = document.querySelector(selector);

   if (!slider) return null;

   const splide = new Splide(slider, {
      type: 'loop',
      perPage: 1,
      gap: 20,
      arrows: true,
      pagination: true,

      ...options,
   });

   splide.mount();

   return splide;
}


/*==========================================================================
Map
============================================================================*/
function initLazyMap() {
   const mapEl = document.getElementById('map');

   if (!mapEl) return;

   let mapLoaded = false;

   const observer = new IntersectionObserver(
      (entries) => {
         const entry = entries[0];

         if (!entry.isIntersecting || mapLoaded) return;

         mapLoaded = true;
         observer.disconnect();

         loadYandexMap();
      },
      {
         rootMargin: '300px'
      }
   );

   observer.observe(mapEl);

   function loadYandexMap() {
      const script = document.createElement('script');

      script.src =
         'https://api-maps.yandex.ru/2.1/?lang=ru_RU';

      script.onload = () => {
         ymaps.ready(() => {
            initMap(mapEl);

            mapEl.classList.remove('map-skeleton');
            mapEl.classList.add('map-loaded');
         });
      };

      document.body.append(script);
   }
}

function initMap(mapEl) {
   const lat = parseFloat(mapEl.dataset.lat);
   const lng = parseFloat(mapEl.dataset.lng);

   if (isNaN(lat) || isNaN(lng)) return;

   const center = [lat, lng];

   const myMap = new ymaps.Map('map', {
      center,
      zoom: 15
   });

   const placemark = new ymaps.Placemark(center);

   myMap.geoObjects.add(placemark);
}

/*==========================================================================
Go top
============================================================================*/
function initGoTop() {
   const btn = document.querySelector('.go-top');
   if (!btn) return;

   const toggleBtn = () => {
      if (window.scrollY > 700) {
         btn.classList.add('active');
      } else {
         btn.classList.remove('active');
      }
   };

   window.addEventListener('scroll', toggleBtn);

   toggleBtn();
}


/*==========================================================================
Form send
============================================================================*/
function initRequestForm() {
   const form = document.getElementById('requestForm');
   const popup = document.getElementById('thanks-popup');

   if (!form || !popup) return;

   form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;

      const formData = new FormData(form);

      try {
         const response = await fetch('send.php', {
            method: 'POST',
            body: formData
         });

         const result = await response.json();

         if (result.status === 'success') {
            form.reset();

            popup.classList.add('show');
         } else {
            alert(result.message || 'Ошибка отправки');
         }

      } catch (err) {
         alert('Ошибка сети');
      } finally {
         submitBtn.disabled = false;
      }
   });
}

/*==========================================================================
Init
============================================================================*/
document.addEventListener('DOMContentLoaded', (e) => {
   initSubmenu();
   initGalleries();
   initFaqAccordion();
   initSplideSlider('.reviews__slider');
   initGoTop();
   initLazyMap();
   initRequestForm();
})

})();

/******/ })()
;