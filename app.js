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

function typeOutHeader() {
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
        subheading.style.color = 'black';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    letterAddInterval = setInterval(typeOutHeader, 100);
})