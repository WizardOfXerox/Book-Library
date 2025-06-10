// JavaScript for the website
// This script handles navigation, sidebar toggle, header pinning, and carousel functionality

//Navigations

document.addEventListener("DOMContentLoaded", function() {
    const hash = window.location.hash.substring(1); // Remove the '#' symbol
    if (hash) {
        const targetSection = document.getElementById(hash);
        if (targetSection) {
            // Remove active class from all sections and nav links/icons
            document.querySelectorAll(".section").forEach(section => section.classList.remove("active"));
            document.querySelectorAll(".nav-link, .nav-link-icon").forEach(link => link.classList.remove("active"));

            // Show the target section
            targetSection.classList.add("active");

            // Activate all matching nav-link and nav-link-icon elements
            document.querySelectorAll(`[data-target="${hash}"]`).forEach(link => {
                link.classList.add("active");
            });

            topFunction(); // Optional scroll-to-top
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Query all relevant elements
    const navLinks = document.querySelectorAll(".nav-link, .nav-link-icon");

    // Debugging: Log all nav links
    console.log("Navigation links:", navLinks);

    navLinks.forEach((link) => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const target = this.getAttribute("data-target");
            history.replaceState(null, null, `#${target}`);

            // Debugging: Log clicked link's data-target
            console.log("Clicked link data-target:", target);

            // Remove 'active' class from all nav links
            navLinks.forEach((link) => link.classList.remove("active"));

            // Add 'active' class to the clicked link
            this.classList.add("active");

            // Remove 'active' class from all sections
            const sections = document.querySelectorAll(".section");
            console.log("Sections:", sections); // Debugging
            sections.forEach((section) => section.classList.remove("active"));

            // Add 'active' class to the target section
            const targetSection = document.getElementById(target);
            if (targetSection) {
                targetSection.classList.add("active");
                console.log("Showing section:", target); // Debugging
            } else {
                console.error("Target section not found:", target); // Debugging
            }

            topFunction();
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".creation-nav-link-btn");
    navLinks.forEach((link) => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const target = this.getAttribute("data-target");
            // history.replaceState(null, null, `#${target}`);
            navLinks.forEach((link) => link.classList.remove("active"));
            this.classList.add("active");
            const sections = document.querySelectorAll(".section-c1");
            sections.forEach((section) => section.classList.remove("active"));
            document.getElementById(target).classList.add("active");
            topFunction();
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const footerNavLinks = document.querySelectorAll(".footer-nav a");
    footerNavLinks.forEach((link) => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const target = this.getAttribute("data-target");
            history.replaceState(null, null, `#${target}`);
            const navLinks = document.querySelectorAll(".nav-link");
            navLinks.forEach((link) => {
                link.classList.remove("active");
            });
            const sections = document.querySelectorAll(".section");
            sections.forEach((section) => section.classList.remove("active"));
            document.getElementById(target).classList.add("active");

            // Add active class to the corresponding.nav-link element
            const correspondingNavLink = document.querySelector(`.nav-link[data-target="${target}"]`);
            if (correspondingNavLink) {
                correspondingNavLink.classList.add("active");
            }

            topFunction();
        });
    });
});

document.addEventListener("keydown", (event) => {
    const navLinks = document.querySelectorAll(".nav-link"); // Get NodeList directly
    const filteredNavLinks = Array.prototype.filter.call(navLinks, link => {
        return link.getAttribute("data-target") !== "account";
    });

    let activeIndex = -1;

    // Find the currently active link among the filtered links
    filteredNavLinks.forEach((link, index) => {
        if (link.classList.contains("active")) {
            activeIndex = index;
        }
    });

    if (event.key === 'ArrowDown') {
        event.preventDefault(); // Prevent default behavior

        if (activeIndex > 0) { // If there is a previous link in the filtered list
            const previousIndex = activeIndex - 1; // Index of the previous link

            // Remove the active class from the current active link
            filteredNavLinks[activeIndex].classList.remove("active");

            // Add the active class to the previous link
            filteredNavLinks[previousIndex].classList.add("active");

            // Get the target section from the previous link
            const target = filteredNavLinks[previousIndex].getAttribute("data-target");
            history.replaceState(null, null, `#${target}`);

            // Remove active class from all sections
            const sections = document.querySelectorAll(".section");
            sections.forEach((section) => section.classList.remove("active"));

            // Add active class to the target section
            const targetSection = document.getElementById(target);
            if (targetSection) {
                targetSection.classList.add("active");
                console.log("Showing section:", target); // Debugging
            } else {
                console.error("Target section not found:", target); // Debugging
            }

            console.log("Active Index:", activeIndex);
            console.log("Filtered Nav Links Length:", filteredNavLinks.length);

            topFunction(); // Call custom function
        }
    } else if (event.key === 'ArrowUp') {
        event.preventDefault(); // Prevent default behavior

        if (activeIndex !== -1 && activeIndex < filteredNavLinks.length - 1) { // If there is a next link in the filtered list
            const nextIndex = activeIndex + 1; // Index of the next link

            // Remove the active class from the current active link
            filteredNavLinks[activeIndex].classList.remove("active");

            // Add the active class to the next link
            filteredNavLinks[nextIndex].classList.add("active");

            // Get the target section from the next link
            const target = filteredNavLinks[nextIndex].getAttribute("data-target");
            history.replaceState(null, null, `#${target}`);

            // Remove active class from all sections
            const sections = document.querySelectorAll(".section");
            sections.forEach((section) => section.classList.remove("active"));

            // Add active class to the target section
            const targetSection = document.getElementById(target);
            if (targetSection) {
                targetSection.classList.add("active");
                console.log("Showing section:", target); // Debugging
            } else {
                console.error("Target section not found:", target); // Debugging
            }

            console.log("Active Index:", activeIndex);
            console.log("Filtered Nav Links Length:", filteredNavLinks.length);
            console.log("Next Index:", nextIndex);

            topFunction(); // Call custom function
        }
    }
});


//Sidebar Navigation
const body = document.querySelector("body"),
    sidebar = body.querySelector(".nav-sidebar"),
    sidebarToggle = document.getElementById("sidebarToggle");

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if (sidebar.dataset.state === "closed") {
        sidebar.dataset.state = "opened";
    } else {
        sidebar.dataset.state = "closed";
    }
});

/* let isSidebarOpen = false;

function toggleNav() {
    const sidebar = document.getElementById("mySidebar");
    const content = document.querySelector(".main-content");
    const button = document.getElementById("sidebarToggle");

    if (isSidebarOpen) {
        sidebar.style.transform = "translateX(-250px)";
        content.style.marginLeft = "0px";
        button.textContent = "☰ Open Sidebar";
    } else {
        sidebar.style.transform = "translateX(0)";
        content.style.marginLeft = "220px";
        button.textContent = "✖ Close Sidebar";
    }

    isSidebarOpen = !isSidebarOpen;
}
    */

let lastScrollY = window.scrollY;
let timeout = null;
let isHovered = false; // Track hover state

// Function to reset the header after inactivity
function resetHeader() {
    if (!isHovered) {
        const header = document.getElementById('header');
        const maincontent = document.getElementById('main-content');
        const sidebar = document.querySelector('.nav-sidebar');
        header.style.transform = 'translateY(-48px)';
        maincontent.style.paddingTop = '20px';
    }
}

// Pinned Navigation
const headerElement = document.getElementById('header');
const pin = document.querySelectorAll('.nav-pin');
console.log(pin); // Debugging: Log all pin elements

pin.forEach(navpin => {
    navpin.addEventListener('click', function() {
        const isPinned = headerElement.getAttribute('data-pinned');
        const pincolor = document.querySelectorAll('[id=pin]');

        if (isPinned === 'true') {
            headerElement.classList.remove('pinned');
            headerElement.setAttribute('data-pinned', 'false');
            pincolor.forEach(pcolor => {
                pcolor.style.color = '#B3B3B3';
                pcolor.style.animation = 'none';
            });
        }
        if (isPinned === 'false') {
            headerElement.classList.add('pinned');
            headerElement.setAttribute('data-pinned', 'true');
            pincolor.forEach(pcolor => {
                pcolor.style.color = '#02ff88';
                pcolor.style.animation = 'neon1 1.5s ease-in-out infinite alternate';
                pcolor.style.animationPlayState = 'running';
            });
        }
    });
});

const maincontent = document.getElementById('main-content');
headerElement.addEventListener('mouseover', () => {
    isHovered = true;
    // Ensure the header is in the visible state when hovered
    headerElement.style.transform = 'translateY(0px)';
    maincontent.style.paddingTop = '70px';
});

headerElement.addEventListener('mouseout', () => {
    const isPinned = headerElement.getAttribute('data-pinned'); // Check data-pinheaderElementned on the
    if (isPinned === 'true') {
        isHovered = true;
        // Ensure the header is in the visible state when hovered
        headerElement.style.transform = 'translateY(0px)';
        maincontent.style.paddingTop = '70px';

    }
    if (isPinned === 'false') {
        isHovered = false;
        //maincontent.style.paddingTop = '20px';
        //header.style.transform = 'translateY(-48px)'
        //Reset to original state after hover
        timeout = setTimeout(resetHeader, 2000);
    }
});

// Function to handle the scroll event
function handleScroll() {
    const header = document.getElementById('header');
    const maincontent = document.getElementById('main-content');
    const sidebar = document.querySelector('.nav-sidebar');
    const isPinned = headerElement.getAttribute('data-pinned'); // Check data-pinheaderElementned on the
    if (isPinned === 'false') {
        isHovered = true;
        // Ensure the header is in the visible state when hovered
        headerElement.style.transform = 'translateY(0px)';
        maincontent.style.paddingTop = '70px';
        sidebar.style.paddingTop = '70px';
    }
    if (isPinned === 'false') {
        isHovered = false;
        if (window.scrollY < lastScrollY) {
            // Scrolling up
            header.style.transform = 'translateY(0px)';
            maincontent.style.paddingTop = '70px';
            sidebar.style.paddingTop = '70px';
        } else {
            // Scrolling down
            header.style.transform = 'translateY(-48px)';
            maincontent.style.paddingTop = '20px';
            sidebar.style.paddingTop = '20px';
        }

        lastScrollY = window.scrollY;

        // Clear any previous timeout and set a new one
        if (timeout) {
            clearTimeout(timeout);
        }

        // Set a timeout to reset the header after 2 seconds of inactivity
        timeout = setTimeout(resetHeader, 2000);
    }
}

// Check if the device width is less than or equal to 530px
if (window.matchMedia('(max-width: 600px)').matches) {
    window.addEventListener('scroll', handleScroll);
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// SVG-Favicon
// Use SVG image to be a Favicon

function TitleIcon() {
    // document.title = 'Hidden Content';
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="7.2" fill="red" stroke="#000" stroke-width="1" />
      <circle cx="8" cy="8" r="3.1" fill="#fff" stroke="#000" stroke-width="1" />
    </svg>
    `;

    var favicon_link_html = document.createElement('link');
    favicon_link_html.rel = 'icon';
    favicon_link_html.href = svgToDataUri(svg);
    favicon_link_html.type = 'image/svg+xml';

    try {
        let favicons = document.querySelectorAll('link[rel~="icon"]');
        favicons.forEach(function(favicon) {
            favicon.parentNode.removeChild(favicon);
        });

        const head = document.getElementsByTagName('head')[0];
        head.insertBefore(favicon_link_html, head.firstChild);
    } catch (e) {}

    function escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

    function svgToDataUri(svg) {
        var encoded = svg.replace(/\s+/g, " ")
        encoded = replaceAll(encoded, "%", "%25");
        encoded = replaceAll(encoded, "> <", "><");
        encoded = replaceAll(encoded, "; }", ";}");
        encoded = replaceAll(encoded, "<", "%3c");
        encoded = replaceAll(encoded, ">", "%3e");
        encoded = replaceAll(encoded, "\"", "'");
        encoded = replaceAll(encoded, "#", "%23");
        encoded = replaceAll(encoded, "{", "%7b");
        encoded = replaceAll(encoded, "}", "%7d");
        encoded = replaceAll(encoded, "|", "%7c");
        encoded = replaceAll(encoded, "^", "%5e");
        encoded = replaceAll(encoded, "`", "%60");
        encoded = replaceAll(encoded, "@", "%40");
        var dataUri = 'data:image/svg+xml;charset=UTF-8,' + encoded.trim();
        return dataUri;
    }
};

TitleIcon();

// Carousel for About Section

const settings = {
    autoSlide: false,
    slideInterval: 3000,
    loop: true,
    dragThreshold: 50,
    enableDrag: false
};

const carousel = document.getElementById('carousel');
const container = document.getElementById('carousel-container');
const dotsContainer = document.getElementById('dots');
const totalPages = carousel.children.length;
let currentIndex = 0;
let autoSlideInterval;
let scrollTimeout;
let isDragging = false;
let startX = 0;
let currentX = 0;
let animationFrameId;

function getPageWidth() {
    const about = document.querySelector('.about-content') || container;
    return parseFloat(getComputedStyle(about).width);
}

function updateCarousel(animated = true) {
    const pageWidth = getPageWidth();
    carousel.style.transition = animated ? 'transform 0.4s ease' : 'none';
    carousel.style.transform = `translateX(-${currentIndex * pageWidth}px)`;
    updateDots();
}

window.addEventListener('resize', updateCarousel);

function nextPage() {
    if (currentIndex < totalPages - 1) {
        currentIndex++;
    } else if (settings.loop) {
        currentIndex = 0;
    }
    updateCarousel();
}

function prevPage() {
    if (currentIndex > 0) {
        currentIndex--;
    } else if (settings.loop) {
        currentIndex = totalPages - 1;
    }
    updateCarousel();
}

function startAutoSlide() {
    if (settings.autoSlide) {
        autoSlideInterval = setInterval(nextPage, settings.slideInterval);
    }
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function updateDots() {
    Array.from(dotsContainer.children).forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
    });
}

// Create dots
function createDots() {
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    }
    updateDots();
}

createDots();
startAutoSlide();

// Touch events
container.addEventListener('touchstart', (e) => {
    stopAutoSlide();
    isDragging = true;
    startX = e.touches[0].clientX;
});

container.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    carousel.style.transition = 'none';
    carousel.style.transform = `translateX(calc(${-currentIndex * getPageWidth()}px + ${deltaX}px))`;
});

container.addEventListener('touchend', () => {
    const diff = startX - currentX;
    if (diff > settings.dragThreshold) nextPage();
    else if (diff < -settings.dragThreshold) prevPage();
    else updateCarousel();
    isDragging = false;
    startAutoSlide();
});

// Mouse drag
container.addEventListener('mousedown', (e) => {
    if (!settings.enableDrag) return;
    stopAutoSlide();
    isDragging = true;
    startX = e.clientX;
    container.style.cursor = 'grabbing';

    const step = () => {
        if (!isDragging) return;
        const deltaX = currentX - startX;
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(calc(${-currentIndex * getPageWidth()}px + ${deltaX}px))`;
        animationFrameId = requestAnimationFrame(step);
    };
    animationFrameId = requestAnimationFrame(step);
});

container.addEventListener('mousemove', (e) => {
    if (!settings.enableDrag || !isDragging) return;
    if (isDragging) currentX = e.clientX;
});

container.addEventListener('mouseup', () => {
    if (!settings.enableDrag) return;
    cancelAnimationFrame(animationFrameId);
    const diff = startX - currentX;
    if (diff > settings.dragThreshold) nextPage();
    else if (diff < -settings.dragThreshold) prevPage();
    else updateCarousel();
    isDragging = false;
    container.style.cursor = 'grab';
    startAutoSlide();
});

container.addEventListener('mouseleave', () => {
    if (!settings.enableDrag || !isDragging) return;
    if (isDragging) {
        cancelAnimationFrame(animationFrameId);
        updateCarousel();
        isDragging = false;
        startAutoSlide();
    }
    container.style.cursor = 'grab';
});

// Scroll wheel
container.addEventListener('wheel', (e) => {
    e.preventDefault();
    stopAutoSlide();

    if (scrollTimeout) clearTimeout(scrollTimeout);

    if (e.deltaY > 0) nextPage();
    else if (e.deltaY < 0) prevPage();

    scrollTimeout = setTimeout(startAutoSlide, 1000);
}, { passive: false });