const container = document.getElementById('slider');
const artPage = document.getElementById('artPage');
const pages = document.querySelectorAll('.h-page');
const btnTech = document.getElementById('tech');
const btnArt = document.getElementById('art');
const btnBack = document.querySelectorAll('.back');

let index = 1;

container.scrollLeft = window.innerWidth;

function goTo(i) {
    index = Math.max(0, Math.min(pages.length - 1, i));
    container.scrollTo({
        left: index * window.innerWidth,
        behavior: 'smooth'
    });
}

let to = 0

btnArt.addEventListener('click', () => {
    to = -1;
    goTo(index + to);
});

btnTech.addEventListener('click', () => {
    to = 1;
    goTo(index + to);
});

btnBack.forEach(btn => {
    btn.addEventListener('click', () => {
        goTo(index - to);
    });
});
