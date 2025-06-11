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
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     width="1080" height="1080" viewBox="0 0 810 809.999993" 
     zoomAndPan="magnify" preserveAspectRatio="xMidYMid meet" version="1.2">
  <defs>
    <clipPath id="2421e06835">
      <path d="M 201 147.015625 L 391 147.015625 L 391 645 L 201 645 Z M 201 147.015625 " />
    </clipPath>
    <clipPath id="818c18c0c6">
      <path d="M 419 147.015625 L 609 147.015625 L 609 645 L 419 645 Z M 419 147.015625 " />
    </clipPath>
    <clipPath id="39c1607229">
      <path d="M 81 213 L 118 213 L 118 564 L 81 564 Z M 81 213 " />
    </clipPath>
  </defs>
  <g id="eabdf21f08">
    <rect x="0" y="0" width="810" height="809.999993" style="fill:#f28500;fill-opacity:1;stroke:none;" />
    
    <g clip-rule="nonzero" clip-path="url(#2421e06835)">
      <path style="stroke:none;fill-rule:nonzero;fill:#ffffff;fill-opacity:1;" 
            d="M 201.085938 147.15625 L 201.085938 478.402344 C 247.441406 509.949219 283.847656 537.140625 310.304688 559.980469 
               C 323.957031 571.742188 336.789062 583.710938 348.792969 595.882812 
               C 365.960938 613.476562 378.757812 629.539062 387.183594 644.070312 
               L 390.597656 644.070312 L 390.617188 328.601562 
               C 388.808594 328.441406 387.207031 327.691406 385.808594 326.347656 
               L 215.183594 155.714844 Z" />
    </g>
    
    <g clip-rule="nonzero" clip-path="url(#818c18c0c6)">
      <path style="stroke:none;fill-rule:nonzero;fill:#ffffff;fill-opacity:1;" 
            d="M 608.777344 147.15625 L 593.164062 157.238281 
               L 424.050781 326.347656 C 422.65625 327.691406 421.054688 328.441406 419.246094 328.597656 
               L 419.265625 644.070312 L 422.679688 644.070312 
               C 435.0625 623.738281 454.195312 601.53125 480.078125 577.457031 
               C 515.382812 546.542969 538.59375 527.4375 549.703125 520.132812 
               C 567.707031 506.691406 587.398438 492.78125 608.777344 478.40625 Z" />
    </g>

    <path style="stroke:none;fill-rule:nonzero;fill:#ffffff;fill-opacity:1;" 
          d="M 628.453125 168.882812 L 669.875 168.882812 L 669.875 519.835938 
             C 656.066406 519.835938 642.261719 519.835938 628.453125 519.839844 
             C 628.453125 402.851562 628.453125 285.867188 628.453125 168.882812" />
    
    <path style="stroke:none;fill-rule:nonzero;fill:#ffffff;fill-opacity:1;" 
          d="M 181.410156 168.882812 L 139.988281 168.882812 L 139.988281 519.835938 
             C 153.792969 519.835938 167.601562 519.835938 181.410156 519.839844 
             C 181.410156 402.851562 181.410156 285.867188 181.410156 168.882812" />
    
    <path style="stroke:none;fill-rule:nonzero;fill:#ffffff;fill-opacity:1;" 
          d="M 692.660156 213.398438 L 728.902344 213.398438 
             C 728.902344 330.039062 728.902344 446.679688 728.902344 563.316406 
             C 716.824219 563.316406 704.742188 563.320312 692.660156 563.320312 
             C 692.660156 446.679688 692.660156 330.039062 692.660156 213.398438" />
    
    <g clip-rule="nonzero" clip-path="url(#39c1607229)">
      <path style="stroke:none;fill-rule:nonzero;fill:#ffffff;fill-opacity:1;" 
            d="M 117.203125 213.398438 L 80.957031 213.398438 
               C 80.957031 330.039062 80.957031 446.679688 80.957031 563.316406 
               C 93.039062 563.316406 105.121094 563.320312 117.203125 563.320312 
               C 117.203125 446.679688 117.203125 330.039062 117.203125 213.398438" />
    </g>
    
    <path style="stroke:none;fill-rule:nonzero;fill:#ffffff;fill-opacity:1;" 
          d="M 641.140625 486.269531 L 623.816406 495.371094 
             C 617.253906 498.613281 602.285156 507.085938 578.910156 520.789062 
             C 570.109375 526.121094 562.09375 531.25 554.863281 536.167969 
             C 543.765625 543.605469 529.089844 555 510.835938 570.359375 
             C 468.164062 605.332031 442.484375 632.714844 433.792969 652.5 
             C 513.179688 596.5 566.789062 560.980469 594.628906 545.953125 
             C 620.417969 531.761719 644.230469 523.269531 666.0625 520.472656 
             L 641.140625 486.269531" />
    
    <path style="stroke:none;fill-rule:nonzero;fill:#ffffff;fill-opacity:1;" 
          d="M 168.722656 486.269531 L 186.046875 495.371094 
             C 192.609375 498.613281 207.578125 507.085938 230.953125 520.789062 
             C 239.753906 526.121094 247.769531 531.25 254.996094 536.167969 
             C 266.097656 543.605469 280.773438 555 299.023438 570.359375 
             C 341.699219 605.332031 367.378906 632.714844 376.070312 652.5 
             C 296.683594 596.5 243.070312 560.980469 215.234375 545.953125 
             C 189.445312 531.761719 165.632812 523.269531 143.800781 520.472656 
             L 168.722656 486.269531" />
    
    <path style="stroke:none;fill-rule:nonzero;fill:#ffffff;fill-opacity:1;" 
          d="M 717.351562 533.699219 L 676.269531 546.65625 
             C 623.394531 564.144531 578.105469 582.496094 540.402344 601.707031 
             L 513.550781 616.28125 L 489.542969 631.175781 L 468.382812 646.390625 
             L 450.066406 661.933594 C 450.230469 662.554688 450.910156 662.679688 452.113281 662.308594 
             C 551.515625 615.925781 607.140625 591.199219 618.984375 588.125 
             C 644.730469 577.808594 680.066406 568.695312 725 560.785156 
             L 717.351562 533.699219" />
    
    <path style="stroke:none;fill-rule:nonzero;fill:#ffffff;fill-opacity:1;" 
          d="M 92.511719 533.699219 L 133.589844 546.65625 
             C 186.46875 564.144531 231.757812 582.496094 269.457031 601.707031 
             L 296.3125 616.28125 L 320.320312 631.175781 L 341.480469 646.390625 
             L 359.796875 661.933594 C 359.632812 662.554688 358.949219 662.679688 357.75 662.308594 
             C 258.34375 615.925781 202.722656 591.199219 190.878906 588.125 
             C 165.132812 577.808594 129.792969 568.695312 84.863281 560.785156 
             L 92.511719 533.699219" />
  </g>
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