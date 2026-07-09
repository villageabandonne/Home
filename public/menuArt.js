const toc = document.getElementById('toc');
const text = document.getElementById('text');
const headings = Array.from(text.querySelectorAll('h3'));


function slugify(s) {
    return s
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
}

headings.forEach((h, i) => {
    if (!h.id) h.id = `${slugify(h.textContent)}-${i}`;

    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.textContent = h.textContent;

    a.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById(h.id).scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    toc.appendChild(a);
});

const links = Array.from(toc.querySelectorAll('a'));

const io = new IntersectionObserver(
    (entries) => {
        const visible = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const id = visible.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
    },
    {
        root: null,
        threshold: [0.2, 0.6, 1.0],
        rootMargin: '-6% 0px -70% 0px'
    }
);

headings.forEach(h => io.observe(h));

if (links[0]) links[0].classList.add('active');
