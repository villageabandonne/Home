const leftCol = document.getElementById('text');

window.addEventListener('wheel', (e) => {
    leftCol.scrollTop += e.deltaY;
}, { passive: true });

