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

setInterval(runTime, 1);

let letterIndex = 0;
let letterAddInterval

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
    }
}

document.addEventListener('DOMContentLoaded', () => {
    letterAddInterval = setInterval(typeOutHeading, 100);
});

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a');
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            if (!link.href.includes(window.location.hostname) && !link.href.includes('mailto')) {
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