const container = document.getElementById('slider');
const artPage = document.getElementById('artPage');
const pages = document.querySelectorAll('.h-page');
const btnTech = document.getElementById('tech');
const btnArt = document.getElementById('art');
const btnArtBack = document.getElementById('artBack');
const btnBack = document.querySelectorAll('.back');

const scrollContainer = document.getElementById('scrollContainer');
function lockVerticalScroll() {
    scrollContainer.style.overflowY = 'hidden';
    document.body.style.overflowY = 'hidden';
    document.documentElement.style.overflowY = 'hidden';
}

function unlockVerticalScroll() {
    scrollContainer.style.overflowY = 'auto';
    document.body.style.overflowY = 'auto';
    document.documentElement.style.overflowY = 'auto';
}

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
    console.log('Art');
    to = -1;
    goTo(index + to);
    lockVerticalScroll();
});

btnTech.addEventListener('click', () => {
    to = 1;
    goTo(index + to);
    lockVerticalScroll();
});

btnArtBack.addEventListener('click', () => {
    console.log('back');
    goTo(1);
    unlockVerticalScroll();
});

// btnBack.forEach(btn => {
//     btn.addEventListener('click', () => {
//         goTo(index - to);
//     });
// });
