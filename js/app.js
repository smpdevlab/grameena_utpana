

/* ===================================================
   MOBILE MENU
=================================================== */

const menuButton = document.querySelector(".mobile-toggle");

const mobileMenu = document.querySelector(".mobile-menu");

menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


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