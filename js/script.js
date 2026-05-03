/* ============================================
   INITIALIZE AOS
============================================ */
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

/* ============================================
   TYPING ANIMATION
============================================ */
const typingTexts = ["Web Developer", "AI Enthusiast", "Problem Solver", "Computer Engineer"];
let textIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;

function typeWriter() {
    currentText = typingTexts[textIndex];
    document.getElementById("typing").textContent = currentText.substring(0, charIndex);

    if (!isDeleting && charIndex < currentText.length) {
        charIndex++;
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
    } else if (!isDeleting) {
        isDeleting = true;
        setTimeout(typeWriter, 1500);
        return;
    } else {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }

    setTimeout(typeWriter, isDeleting ? 50 : 100);
}

typeWriter();

/* ============================================
   THEME TOGGLE
============================================ */
function toggleTheme() {
    document.body.classList.toggle("light");
    const theme = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", theme);

    // Change icon
    const icon = document.querySelector(".theme-toggle");
    if (theme === "light") {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}

/* ============================================
   LOAD SAVED THEME
============================================ */
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem("theme");
    const icon = document.querySelector(".theme-toggle");

    if (savedTheme === "light") {
        document.body.classList.add("light");
        if (icon) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }
    }
});

/* ============================================
   NAVBAR SCROLL EFFECT
============================================ */
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ============================================
   SCROLL BUTTONS
============================================ */
const scrollUpBtn = document.getElementById('scrollUp');
const scrollDownBtn = document.getElementById('scrollDown');

const updateScrollButtons = () => {
    const atTop = window.scrollY < 100;
    const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;

    if (atTop) {
        scrollDownBtn.classList.remove('hidden');
        scrollUpBtn.classList.add('hidden');
    } else {
        scrollDownBtn.classList.add('hidden');
        scrollUpBtn.classList.remove('hidden');
    }
};

if (scrollUpBtn && scrollDownBtn) {
    window.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    updateScrollButtons();

    scrollUpBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    scrollDownBtn.addEventListener('click', () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
}

/* ============================================
   SMOOTH SCROLL FOR NAV LINKS
============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            const transitionEl = document.querySelector('.page-transition');
            if (transitionEl) {
                transitionEl.classList.add('active');
                setTimeout(() => {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'auto'
                    });
                    setTimeout(() => {
                        transitionEl.classList.remove('active');
                    }, 50);
                }, 400);
            } else {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            const navCollapse = document.querySelector('.navbar-collapse');
            if (navCollapse.classList.contains('show')) {
                navCollapse.classList.remove('show');
            }
        }
    });
});

/* ============================================
   PROGRESS BAR ANIMATION ON SCROLL
============================================ */
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
};

// Trigger once on page load
window.addEventListener('load', () => {
    animateProgressBars();

    // Page load fade out
    const transitionEl = document.querySelector('.page-transition');
    if (transitionEl) {
        setTimeout(() => {
            transitionEl.classList.remove('active');
        }, 200);
    }
});

/* ============================================
   DIRECT EMAIL REDIRECT
============================================ */
const directEmailBtn = document.getElementById('directEmailBtn');
if (directEmailBtn) {
    directEmailBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Open Gmail Web Composer as primary, fallback to default mailto
        const email = 'sandarvlamichhane1@gmail.com';
        const subject = encodeURIComponent('Portfolio Inquiry');

        // Open Gmail composer in a new tab
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}`;
        window.open(gmailUrl, '_blank');

        // Trigger mailto as a fallback
        setTimeout(() => {
            window.location.href = `mailto:${email}?subject=${subject}`;
        }, 300);
    });
}

/* ============================================
   CONSOLE WELCOME MESSAGE
============================================ */
console.log('%c👋 Welcome to Sandarv\'s Portfolio!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ using HTML, CSS, JavaScript & Bootstrap', 'color: #7c3aed; font-size: 14px;');