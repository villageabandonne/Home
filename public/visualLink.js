const svg = document.getElementById('link');
const lefts = document.querySelectorAll('.hookLeft');
const rights = document.querySelectorAll('.hookRight');

let activeValue = null;


function createLines() {
    svg.innerHTML = '';

    const s = svg.getBoundingClientRect(); // <— важно

    lefts.forEach(left => {
        const leftValue = left.dataset.value;
        const l = left.getBoundingClientRect();

        const x1 = l.right - s.left;
        const y1 = (l.top + l.height / 2) - s.top;

        rights.forEach(right => {
            if (right.dataset.value !== leftValue) return;

            const r = right.getBoundingClientRect();

            const x2 = r.left - s.left;                  // начало справа
            const y2 = (r.top + r.height / 2) - s.top;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.dataset.value = leftValue;
            line.classList.add('link-line');
            if (leftValue === activeValue) {
                line.classList.add('active');
            }

            svg.appendChild(line);
        });
    });
}

createLines();
window.addEventListener('resize', createLines);
window.addEventListener('scroll', createLines, { passive: true });


const leftScroll = document.querySelector('.left-scroll');
if (leftScroll) leftScroll.addEventListener('scroll', createLines, { passive: true });


document.addEventListener('click', (e) => {
    if (!e.target.matches('.highlightRight')) return;

    const v = e.target.dataset.value;
    const isActive = e.target.classList.contains('active');

    activeValue = isActive ? null : v;

    document
        .querySelectorAll('.highlightRight, .highlight, .link-line line')
        .forEach(el => el.classList.remove('active'));

    if (isActive) return;

    document.querySelectorAll('.highlightRight').forEach(el =>
        el.classList.toggle('active', el.dataset.value === v)
    );
    document.querySelectorAll('.highlight').forEach(el =>
        el.classList.toggle('active', el.dataset.value === v)
    );
    document.querySelectorAll('.link-line line').forEach(line =>
        line.classList.toggle('active', line.dataset.value === v)
    );
});
