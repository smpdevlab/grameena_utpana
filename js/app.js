

/* ===================================================
   MOBILE MENU
=================================================== */

const menuButton =
    document.querySelector(".mobile-toggle");

const mobileMenu =
    document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {

    menuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "active"
        );

        const icon =
            menuButton.querySelector("i");

        if (
            mobileMenu.classList.contains(
                "active"
            )
        ) {

            icon.classList.remove(
                "fa-bars"
            );

            icon.classList.add(
                "fa-xmark"
            );

             icon.style.transform = "rotate(90deg)";

        } else {

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

            icon.style.transform = "rotate(0deg)";

        }

    }
);

}/* end of if */


/* ===================================================
   CLOSE MENU AFTER CLICK
=================================================== */

document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });


/* ===================================================
   STICKY HEADER SHADOW
=================================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});







/* ===================================================
   SIMPLE FADE-IN ANIMATION
=================================================== */

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                
              /*  alert('intersectionObserver works! \n'+entry.target.className +' became visible!'); */
                entry.target.classList.add("show"); 

            }

        });

    },

    {

        threshold: 0.20

    }

);

const sections = document.querySelectorAll("section");

/* alert("Sections found: " + sections.length); */

sections.forEach((section) => {

    section.classList.add("hidden");

    observer.observe(section);

});


/******************************************/

/*=====================================
PRODUCT SELECTION
=====================================*/

// DOM REFERENCES

const productCheckboxes = document.querySelectorAll(
    '.catalog-item input[type="checkbox"]'
);

const selectedProductsList = document.getElementById(
    'selected-products-list'
);

const selectedCount = document.getElementById(
    'selected-count'
);

const selectedProductsInput = document.getElementById(
    "selected-products-input"
);


/*=====================================
RENDER SELECTED PRODUCTS
=====================================*/
console.log("B4 updateSelectedProducts() func");
// FUNCTIONS

function updateSelectedProducts() {

    const selectedProducts = [];

    productCheckboxes.forEach((product) => {

        if (product.checked) {

            selectedProducts.push(product.value);

        }

    });

    selectedProductsList.innerHTML = "";

    if (selectedProducts.length === 0) {

        selectedProductsList.innerHTML =
            '<p class="empty-selection">No products selected yet.</p>';

    } else {

        selectedProducts.forEach((product) => {

            const tag = document.createElement("span");

            tag.className = "selected-tag";

            tag.innerHTML = `
                ${product}
                <button
                    type="button"
                    class="remove-tag"
                    data-product="${product}">
                    &times;
                </button>
            `;

            selectedProductsList.appendChild(tag);

        });

    }

    selectedCount.textContent = selectedProducts.length;

    selectedProductsInput.value =
    selectedProducts.length > 0
        ? selectedProducts.join(", ")
        : "None specified";

    const removeButtons = document.querySelectorAll(".remove-tag");

    removeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const productToRemove = button.dataset.product;

            productCheckboxes.forEach((checkbox) => {

                if (checkbox.value === productToRemove) {

                    checkbox.checked = false;

                    checkbox.dispatchEvent(new Event("change"));

                }

            });

        });

    });

}/*****end of function */

console.log("after updateSelectedProducts() func");
/*=====================================
end of RENDER SELECTED PRODUCTS
=====================================*/




/*=============================================================== */


if (productCheckboxes.length > 0) {
// EVENT LISTENERS

productCheckboxes.forEach((checkbox) => {

    checkbox.addEventListener("change", () => {

        updateSelectedProducts();

    });

});

console.log("after chkboxes change event listnrs added");

updateSelectedProducts(); // updates/rebuilds tags-list on F5-reFresh

}// end of if-Block:  checkboxes.length > 0

console.log("after updateSelectedProducts() func executed");

/*=============================================================== */

/********************** ****************
 PRODUCT ENQUIRY FORM

****************************************/
const enquiryForm =document.getElementById("enquiry-form");


const nameInput =document.getElementById("name");

const phoneInput =document.getElementById("phone");

const nameError =document.getElementById("name-error");

const phoneError =document.getElementById("phone-error");

const phonePattern = /^[6-9]\d{9}$/;





function validateEnquiryForm() {

    nameError.textContent = "";

    phoneError.textContent = "";

    let isValid = true;

    /*========================
      FULL NAME
    ========================*/

    if (nameInput.value.trim() === "") {

        nameError.textContent =
            "Please enter your full name.";

        isValid = false;

    }

    /*========================
      PHONE
    ========================*/

    

    if (!phonePattern.test(phoneInput.value.trim())) {

        phoneError.textContent =
            "Please enter a valid mobile number.";

        isValid = false;

    }

    return isValid;

} // end of validateEnquiryForm() function




if (enquiryForm) {

    

    enquiryForm.addEventListener("submit", (event) => {

        if (!validateEnquiryForm()) {

            event.preventDefault();

        }

    });

}


/********************** ****************
 end of PRODUCT ENQUIRY FORM

****************************************/



/* ===================================================
SUBSCRIPTION ENQUIRY FORM
=================================================== */

const subscriptionForm =
    document.getElementById("subscription-form");
    console.log(subscriptionForm);
    console.log("Subscription JS loaded");

if (subscriptionForm) {

    

    const nameInput =
        document.getElementById("subscription-name");

    const phoneInput =
        document.getElementById("subscription-phone");

    const businessInput =
        document.getElementById("subscription-business");

    const planInput =
        document.getElementById("subscription-plan");

    const requirementsInput =
        document.getElementById("subscription-requirements");

    const nameError =
        document.getElementById("subscription-name-error");

    const phoneError =
        document.getElementById("subscription-phone-error");

    const businessError =
        document.getElementById("subscription-business-error");

    const planError =
        document.getElementById("subscription-plan-error");

    const requirementsError =
        document.getElementById(
            "subscription-requirements-error"
        );

    const submitButton =
        document.getElementById("subscription-submit");

    const resultMessage =
        document.getElementById("subscription-result");


    /*=====================================
    VALIDATE FORM
    =====================================*/

    function validateSubscriptionForm() {

        nameError.textContent = "";
        phoneError.textContent = "";
        businessError.textContent = "";
        planError.textContent = "";
        requirementsError.textContent = "";

        let isValid = true;


        /* FULL NAME */

        if (nameInput.value.trim() === "") {

            nameError.textContent =
                "Please enter your full name.";

            isValid = false;

        }


        /* PHONE */

        const phonePattern =
            /^[6-9]\d{9}$/;

        if (
            !phonePattern.test(
                phoneInput.value.trim()
            )
        ) {

            phoneError.textContent =
                "Please enter a valid mobile number.";

            isValid = false;

        }


        /* BUSINESS */

        if (businessInput.value.trim() === "") {

            businessError.textContent =
                "Please enter your business name.";

            isValid = false;

        }


        /* SUBSCRIPTION PLAN */

        if (planInput.value === "") {

            planError.textContent =
                "Please select a subscription plan.";

            isValid = false;

        }


        /* REQUIREMENTS */

        if (requirementsInput.value.trim() === "") {

            requirementsError.textContent =
                "Please tell us your requirements.";

            isValid = false;

        }


        return isValid;

    } //validateSubscriptionForm() ends here


    /*=====================================
    SUBMIT FORM
    =====================================*/

    subscriptionForm.addEventListener(
        "submit",
        async (event) => {
            console.log("SUBMIT FIRED");

            event.preventDefault();


            /* Clear previous result */

            resultMessage.textContent = "";

            resultMessage.className =
                "form-result";


            /* Validate */

            if (!validateSubscriptionForm()) {

                return;

            }


            /* Disable button */

            submitButton.disabled = true;

            submitButton.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';


            try {

                /*
                 * FormSubmit AJAX endpoint
                 *
                 * We keep the normal FormSubmit
                 * action in HTML and convert it
                 * to the AJAX endpoint here.
                 */

                const ajaxUrl =
                    subscriptionForm.action.replace(
                        "https://formsubmit.co/",
                        "https://formsubmit.co/ajax/"
                    );


                const response =
                    await fetch(
                        ajaxUrl,
                        {
                            method: "POST",

                            headers: {
                                "Accept":
                                    "application/json"
                            },

                            body:
                                new FormData(
                                    subscriptionForm
                                )
                        }
                    );


                const data =
                    await response.json();


                if (response.ok && data.success) {

                    resultMessage.textContent =
                        "Thank you! Your enquiry has been sent successfully.";

                    resultMessage.classList.add(
                        "success"
                    );

                    subscriptionForm.reset();

                } else {

                    throw new Error(
                        "Form submission failed."
                    );

                }


            } catch (error) {

                resultMessage.textContent =
                    "Sorry, something went wrong. Please try again.";

                resultMessage.classList.add(
                    "error"
                );

            }


            /* Restore button */

            submitButton.disabled = false;

            submitButton.innerHTML =
                '<i class="fa-solid fa-paper-plane"></i> Submit Enquiry';

        }// end of submit Event handler callback
    );// end of submit Event handler

}// if(subscriptioForm exists)

/* ===================================================
end of SUBSCRIPTION ENQUIRY FORM
=================================================== */


/* ===================================================
CONTACT FORM
=================================================== */

const contactForm =
    document.getElementById("contactpage-form");

if (contactForm) {

    const nameInput =
        document.getElementById("contact-name");

    const phoneInput =
        document.getElementById("contact-phone");

    const subjectInput =
        document.getElementById("contact-subject");

    const messageInput =
        document.getElementById("contact-message");

    const nameError =
        document.getElementById("contact-name-error");

    const phoneError =
        document.getElementById("contact-phone-error");

    const subjectError =
        document.getElementById("contact-subject-error");

    const messageError =
        document.getElementById("contact-message-error");

    const submitButton =
        document.getElementById("contact-submit");

    const resultMessage =
        document.getElementById("contact-result");


    function validateContactForm() {

        nameError.textContent = "";
        phoneError.textContent = "";
        subjectError.textContent = "";
        messageError.textContent = "";

        let isValid = true;


        if (nameInput.value.trim() === "") {

            nameError.textContent =
                "Please enter your full name.";

            isValid = false;

        }


        const phonePattern =
            /^[6-9]\d{9}$/;

        if (
            !phonePattern.test(
                phoneInput.value.trim()
            )
        ) {

            phoneError.textContent =
                "Please enter a valid mobile number.";

            isValid = false;

        }


        if (subjectInput.value.trim() === "") {

            subjectError.textContent =
                "Please enter a subject.";

            isValid = false;

        }


        if (messageInput.value.trim() === "") {

            messageError.textContent =
                "Please enter your message.";

            isValid = false;

        }

        return isValid;

    }


    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            resultMessage.textContent = "";
            resultMessage.className =
                "form-result";

            if (!validateContactForm()) {

                return;

            }

            submitButton.disabled = true;

            submitButton.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            try {

                const ajaxUrl =
                    contactForm.action.replace(
                        "https://formsubmit.co/",
                        "https://formsubmit.co/ajax/"
                    );

                const response =
                    await fetch(
                        ajaxUrl,
                        {
                            method: "POST",

                            headers: {
                                "Accept":
                                    "application/json"
                            },

                            body:
                                new FormData(
                                    contactForm
                                )
                        }
                    );

                const data =
                    await response.json();

                if (
                    response.ok &&
                    data.success
                ) {

                    resultMessage.textContent =
                        "Thank you! Your message has been sent successfully.";

                    resultMessage.classList.add(
                        "success"
                    );

                    contactForm.reset();

                } else {

                    throw new Error();

                }

            } catch {

                resultMessage.textContent =
                    "Sorry, something went wrong. Please try again.";

                resultMessage.classList.add(
                    "error"
                );

            }

            submitButton.disabled = false;

            submitButton.innerHTML =
                '<i class="fa-solid fa-paper-plane"></i> Send Message';

        }
    );

}




/*********************************************
 * 
 * Enquiry form validation
 * 
 * 
 * *******************************************/
/*
const enquiryFormNw =
    document.getElementById("idHomepageEnquiryForm");
    console.log("Enquire form loc");

if (enquiryFormNw) {

    enquiryFormNw.addEventListener(
        "submit",
        function (event) {

            const mobileNumber =
                document
                    .getElementById("idMobileNumber")
                    .value
                    .trim();

            const mobileRegex =
                /^[6-9]\d{9}$/;

            if (!mobileRegex.test(mobileNumber)) {

                alert(
                    "Please enter a valid 10-digit mobile number."
                );

                event.preventDefault();

            }

        }
    );

}

*/


/************************************************************************
 Homepage Enquiry Form Validation
************************************************************************/

const enquiryFormNw =
    document.getElementById("idHomepageEnquiryForm");

const mobileError =
    document.getElementById("mobileError");

if (enquiryFormNw) {

    enquiryFormNw.addEventListener(
        "submit",
        function (event) {

            const mobileNumber =
                document
                    .getElementById("idMobileNumber")
                    .value
                    .trim();

            const mobileRegex =
                /^[6-9]\d{9}$/;

            if (!mobileRegex.test(mobileNumber)) {

                event.preventDefault();

                mobileError.textContent =
                    "Please enter a valid 10-digit mobile number.";

                return;

            }

            mobileError.textContent = "";

        }
    );

}


/************************************************************************
 Movement CTA Buttons → Enquiry Form Interest Selection
************************************************************************/

/*const enquiryForm =
    document.getElementById("idHomepageEnquiryForm"); */

const interestSelect =
    document.getElementById("idNewHeroInterest");

if (enquiryFormNw && interestSelect) {

    document
        .querySelectorAll(".movement-btn")
        .forEach((button) => {

            button.addEventListener(
                "click",
                function () {

                    const interest =
                        this.dataset.interest;

                    interestSelect.value =
                        interest;

                }
            );

        });

}










/***********Google Translate module : hindi , Kannada , Marathi **********/



function googleTranslateElementInit() {

    new google.translate.TranslateElement(
        {
            pageLanguage: 'en',
            includedLanguages: 'hi,kn,mr'
        },
        'google_translate_element'
    );

}





/*
<script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
*/



    (function() {
      if(!window['_DumpException']) {
        const _DumpException = window['_DumpException'] || function(e) {
          throw e;
        };
        window['_DumpException'] = _DumpException;
      }

      var _getCallbackFunction = function(name) {
        var segments = name.split('.');
        var w = window;
        for (var i = 0; i < segments.length; ++i) {
          if (!(w = w[segments[i]])) {
            return null;
          }
        }
        return w;
      };

      var _loadCss = function(url) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.charset = 'UTF-8';
        link.href = url;
        document.head.appendChild(link);
      };

      var _loadJs = function(url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'UTF-8';
        script.src = url;
        document.head.appendChild(script);
      };

      // Create a function so variables do not leak into the global scope
      var initProtoFlow = function() {
  var configProto = JSON.parse('\x5b\x22en-GB\x22,\x22googleTranslateElementInit\x22,\x5b0,1,0,\x5b\x22es_en\x22,\x22en_zh\x22,\x22en_de\x22,\x22en_ja\x22,\x22en_es\x22,\x22de_en\x22\x5d,null,\x5b0,3,100,\x5b\x22en_hi\x22,\x22en_it\x22,\x22en_ar\x22,\x22en_ru\x22,\x22en_de\x22,\x22en_zh\x22,\x22en_es\x22,\x22en_pt\x22,\x22en_fr\x22,\x22en_ko\x22,\x22en_ja\x22,\x22en_id\x22,\x22en_fa\x22,\x22en_pl\x22,\x22en_vi\x22,\x22en_tr\x22,\x22en_th\x22,\x22en_hu\x22,\x22en_ro\x22,\x22en_zh-hant\x22\x5d\x5d,0,1,0,\x5b\x22200%\x22,100\x5d\x5d,\x22\x22,\x22\x22,\x22prod\x22,\x22INFO\x22,null,\x22496836.1081715215\x22,\x22translate.googleapis.com\x22,\x22translate-pa.googleapis.com\x22,null,\x22translate.googleapis.com\x22,\x22https:\/\/www.gstatic.com\/_\/translate_http\/_\/ss\/k\\u003dtranslate_http.tr.B7Dih9Jyjnw.L.F4.O\/am\\u003dBECAAQ\/d\\u003d0\/rs\\u003dAN8SPfrzHf-2T7wal-G0YeaqSuEl3yfBrA\/m\\u003del_main_css\x22,\x22translate-pa.googleapis.com\/v1\/supportedLanguages\x22,\x22translate.google.com\x22,0,null,null,null,\x22https:\/\/translate.googleapis.com\/_\/translate_http\/_\/js\/k\\u003dtranslate_http.tr.en_GB.sdecAZKHQE4.O\/am\\u003dBECAAQ\/d\\u003d1\/ed\\u003d1\/rs\\u003dAN8SPfpbs-G1hAUGlwbvy4dnkxgsBYSCng\/m\\u003del_main\x22,\x22TE_20260902\x22\x5d'); window['google'] = window['google'] || {}; window['google']['translate'] = window['google']['translate'] || {}; window['google']['translate']['_protoConfig'] = configProto;_loadCss('https:\/\/www.gstatic.com\/_\/translate_http\/_\/ss\/k\x3dtranslate_http.tr.B7Dih9Jyjnw.L.F4.O\/am\x3dBECAAQ\/d\x3d0\/rs\x3dAN8SPfrzHf-2T7wal-G0YeaqSuEl3yfBrA\/m\x3del_main_css'); _loadJs('https:\/\/translate.googleapis.com\/_\/translate_http\/_\/js\/k\x3dtranslate_http.tr.en_GB.sdecAZKHQE4.O\/am\x3dBECAAQ\/d\x3d1\/ed\x3d1\/rs\x3dAN8SPfpbs-G1hAUGlwbvy4dnkxgsBYSCng\/m\x3del_main');
      };

      initProtoFlow();
    })();
  



  /***************Hide the Google translate Pop up on top begins here*************** */

 /*
const observer = new MutationObserver(() => {

    const banner =
        document.querySelector(
            'iframe.goog-te-banner-frame'
        );

    if (banner) {

        banner.style.display = 'none';

    }

    document.body.style.top = '0';

});

observer.observe(
    document.body,
    {
        childList: true,
        subtree: true
    }
);


 /***************Hide the Google translate Pop up on top ends here*************** */


 

alert("hya 5"); 

const observerGtranslate = new MutationObserver(() => {

    const banner =
        document.querySelector(
            'iframe.VIpgJd-ZVi9od-ORHb-OEVmcd.skiptranslate'
        );

    if (banner) {

        banner.style.display = 'none';

    }

    document.body.style.top = '0';

});

observerGtranslate.observe(
    document.body,
    {
        childList: true,
        subtree: true
    }
);

  



/*
const observer = new MutationObserver(() => {

    document
        .querySelectorAll('iframe')
        .forEach(frame => {

            console.log(frame);

        });

});
*/