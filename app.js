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
    const minute = t.getMinutes();

    document.getElementById('current-time').textContent = `${hour}:${minute} ${tOD}`;
}

setInterval(runTime, 1);