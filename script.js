/* =========================================================
   RESUMEFORGE — LANDING PAGE INTERACTIONS
========================================================= */


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        navbar.style.background =
            "rgba(8, 10, 18, 0.94)";

    } else {

        navbar.style.background =
            "rgba(8, 10, 18, 0.78)";

    }

});


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

const navigationLinks =
    document.querySelectorAll('a[href^="#"]');


navigationLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".step, .template-card, .feature-card, .section-heading, .feature-intro, .cta-content"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "revealed"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================================
   TEMPLATE HOVER
========================================================= */

const templateCards =
    document.querySelectorAll(".template-card");


templateCards.forEach((card) => {

    card.addEventListener(
        "mouseenter",
        () => {

            templateCards.forEach(
                (otherCard) => {

                    if (otherCard !== card) {

                        otherCard.style.opacity =
                            "0.6";

                    }

                }
            );

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            templateCards.forEach(
                (otherCard) => {

                    otherCard.style.opacity =
                        "1";

                }
            );

        }
    );

});


/* =========================================================
   RESUME PREVIEW MOVEMENT
========================================================= */

const resumePreview =
    document.querySelector(".resume-preview");


if (resumePreview) {

    document.addEventListener(
        "mousemove",
        (event) => {

            const x =
                event.clientX /
                window.innerWidth -
                0.5;

            const y =
                event.clientY /
                window.innerHeight -
                0.5;


            resumePreview.style.transform =
                `rotate(${x * 2}deg)
                 translate(${x * 5}px, ${y * 5}px)`;

        }
    );

}


/* =========================================================
   BUTTON INTERACTION
========================================================= */

const primaryButtons =
    document.querySelectorAll(
        ".primary-button"
    );


primaryButtons.forEach((button) => {

    button.addEventListener(
        "mouseenter",
        () => {

            button.style.cursor =
                "pointer";

        }
    );

});


/* =========================================================
   TEMPLATE CARD KEYBOARD ACCESS
========================================================= */

templateCards.forEach((card) => {

    card.setAttribute(
        "tabindex",
        "0"
    );

});


/* =========================================================
   FOOTER YEAR
========================================================= */

const footerYear =
    document.querySelector(
        ".footer-bottom span"
    );


if (footerYear) {

    footerYear.textContent =
        `© ${new Date().getFullYear()} ResumeForge`;

}