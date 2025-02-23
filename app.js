function runTime() {
    let tOD;
    const t = new Date();
    let hour = t.getHours();
    if (hour < 12 && hour > 0) {
        tOD = 'AM';
    } else if (hour > 12) {
        tOD = 'PM';
        hour -= 12;
    } else if (hour === 12) {
        tOD = 'PM';
    } else if (hour === 0) {
        tOD = 'AM';
        hour += 12
    }
    let minute = t.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }
    document.getElementById('current-time').textContent = `${hour}:${minute} ${tOD}`;
}

let timeInterval = setInterval(runTime, 1);

let letterIndex = 0;
let letterAddInterval;

function typeOutHeading() {
    const heading = document.getElementById('main-heading');
    const subheading = document.getElementById('main-subheading');
    const cursor = document.getElementById('imitation-cursor');
    const name = ['B', 'e', 'n', ' ', 'F', 'i', 'n', 'k']
    if (letterIndex < 8) {
        heading.textContent += name[letterIndex];
        cursor.style.width = '5px';
        cursor.style.height = '90px';
        letterIndex += 1;
    } else {
        clearInterval(letterAddInterval);
        letterAddInterval = undefined;
        cursor.style.height = '0';
        cursor.style.width = '0';
        document.getElementById('enter-button').style.opacity = '1';
        document.getElementById('header').style.opacity = '1';
        subheading.style.color = 'black';
        document.getElementById('social-links').style.opacity = '1';
        document.getElementById('mobile-header').style.opacity = '1';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    letterAddInterval = setInterval(typeOutHeading, 100);
});

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a');
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            if (!link.href.includes(window.location.hostname) && !link.href.includes('mailto:') && !link.href.includes('tel:')) {
                e.preventDefault();
                linkSecurity(link.href);
            }
        });
    });
});

let focusedLink;

function linkSecurity(link) {
    focusedLink = link;
    let security;
    let url;
    let domain;
    let sublinks;
    const status = document.getElementById('link-security-status');
    [security, url] = link.split('://');
    [domain, sublinks] = url.split('/');
    document.getElementById('link-in-text').textContent = domain;
    document.getElementById('full-link').textContent = link;
    document.getElementById('link-security-container').style.display = 'block';
    if (security === 'https') {
        status.style.color = 'rgb(59, 166, 59)';
        status.textContent = 'Secure';
    } else {
        status.style.color = 'rgb(166, 59, 59)';
        status.textContent = 'Not Secure';
    }
}

function openFocusedLink() {
    window.open(focusedLink);
    closeLinkSecurity();
}

function closeLinkSecurity() {
    focusedLink = undefined;
    const status = document.getElementById('link-security-status');
    document.getElementById('link-security-container').style.display = 'none';
    document.getElementById('link-in-text').textContent = '';
    document.getElementById('full-link').textContent = '';
    status.style.color = 'rgb(0, 0, 0)';
    status.textContent = '';
}

let home = true;
let currentSection = 'main-titles';

const sections = ['main-titles', 'about-me', 'my-projects', 'contact-me', 'social-links'];

function switchSection(current) {
    sections.forEach((section) => {
        if (current !== currentSection) {
            if (section !== current) {
                document.getElementById(section).style.opacity = '0';
                if (section !== 'social-links') {
                    setTimeout(() => {document.getElementById(section).style.display = 'none';}, 1000);
                }
            }
        }

        if (current === 'main-titles') {
            home = true;
        } else {
            home = false;
        }
    });
    setTimeout(() => {
        document.getElementById(current).style.display = 'block';
        setTimeout(() => {
            document.getElementById(current).style.opacity = '1';
            document.getElementById('social-links').style.opacity = '1';
        }, 100);
    }, 1000);

    currentSection = current;
}

function timeToDate() {
    const time = document.getElementById('current-time');
    time.style.opacity = '0';
    clearInterval(timeInterval);
    const t = new Date();
    const month = t.getMonth() + 1;
    const day = t.getDate();
    const year = t.getFullYear();
    setTimeout(() => {
        time.textContent = `${month}/${day}/${year}`;
        time.style.opacity = '1';
        }, 1000);
    setTimeout(() => {
        time.style.opacity = '0';
        setTimeout(() => {
            timeInterval = setInterval(runTime, 1);
            time.style.opacity = '1';
        }, 1000);
    }, 4000);
}

function toClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => console.log(`"${text}" copied to clipboard successfully.`))
        .catch((err) => console.error(`Error encountered when attempting to copy to clipboard. ${err}`));
}

function nothing() {}

function checkSize() {
    if (document.documentElement.clientWidth < 550) {
        const linkSecurity = document.getElementById('link-security');
        document.getElementById('header-links').style.display = 'none';
        document.getElementById('mobile-header').style.display = 'block';
        document.getElementById('link-security-heading').textContent = 'Warning';
    } else {
        document.getElementById('header-links').style.display = 'flex';
        document.getElementById('mobile-header').style.display = 'none';
        document.getElementById('link-security-heading').textContent = 'Warning: External Link';
    }
}

function openMobileMenu() {
    document.getElementById('mobile-menu').style.display = 'block';
    setTimeout(() => {document.getElementById('mobile-menu').style.opacity = '1';}, 100);
}

function closeMobileMenu() {
    document.getElementById('mobile-menu').style.opacity = '0';
    setTimeout(() => {document.getElementById('mobile-menu').style.display = 'none';}, 1100);
}

document.getElementById('mobile-menu').addEventListener('click', () => {
    closeMobileMenu();
});

document.addEventListener('DOMContentLoaded', checkSize);

window.addEventListener('resize', checkSize);