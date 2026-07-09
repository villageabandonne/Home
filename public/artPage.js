
const WORDS = {
    concrete: ["concrete"],

    interaction: ["interaction", "interactions"],

    // material: ["material", "materials"],

    recycle: ["recycle", "recycled", "recycling"],

    // represent: ["represent", "representation", "represents", "represented"],

    fragility: ["fragile", "fragility"],

    spirituality: ["spirituality", "spiritual"],

    symbol: ["symbol", "symbols"],

    // mythology: ["mythology", "mythologies"],

    // object: ["object", "objects"],

    construct: ["construct", "construction", "constructs", "constructed"],

    architect: ["architect", "architects", "architectural"],

    // gather: ["gather", "gathers", "gathered", "gathering"],

    // force: ["force", "forces"],

    abandoned: ["abandoned", "abandon"],

    // cult: ["cult", "cults"],

    beam: ["beam", "beams"],

    oscillation: ["oscillate", "oscillation", "oscillating"],

    geometry: ["geometric", "geometry"],

    friend: ["friend", "friends"],

    seven: ["seven", "7"],

    three: ["three", "3"],

    prehistory: ["prehistoric", "prehistory"],

    performance: ["perform", "performance", "performer"],

    god: ["god"],

    superposition: ["superposition"],

    religion: ["religion", "religious"]
};
const root = document.getElementById('text');

const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const entries = Object.entries(WORDS)
    .flatMap(([key, forms]) => forms.map(f => ({ key, form: f })))
    .sort((a,b) => b.form.length - a.form.length);

const re = new RegExp(
    `\\b(${entries.map(e => esc(e.form)).join('|')})\\b`,
    'gi'
);

function wrap(node) {
    const text = node.nodeValue;
    if (!re.test(text)) return;

    const frag = document.createDocumentFragment();
    let last = 0;
    re.lastIndex = 0;

    let m;
    while ((m = re.exec(text))) {
        const before = text.slice(last, m.index);
        if (before) frag.appendChild(document.createTextNode(before));

        const found = m[0];
        const entry = entries.find(e => e.form.toLowerCase() === found.toLowerCase());

        const hi = document.createElement('span');
        hi.className = 'highlight';
        hi.dataset.value = entry.key;
        hi.textContent = found;

        const hook = document.createElement('span');
        hook.className = 'hookLeft';
        hook.dataset.value = entry.key;

        frag.appendChild(hi);
        frag.appendChild(hook);

        last = m.index + found.length;
    }

    const after = text.slice(last);
    if (after) frag.appendChild(document.createTextNode(after));

    node.parentNode.replaceChild(frag, node);
}

const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
        if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (n.parentElement?.classList.contains('highlight')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
    }
});

const nodes = [];
while (walker.nextNode()) nodes.push(walker.currentNode);
nodes.forEach(wrap);


const container = document.querySelector('.right-fixed');
const words = container.querySelectorAll('.highlightRight');

const cols = 4;                 // сколько «столбцов»
const rows = Math.ceil(words.length / cols);

const cw = container.clientWidth;
const ch = container.clientHeight;

const cellW = cw / cols;
const cellH = ch / rows;

words.forEach((word, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);

    const x = col * cellW + Math.random() * (cellW * 0.6);
    const y = row * cellH + Math.random() * (cellH * 0.6);

    word.classList.add('word');
    word.style.left = `${x}px`;
    word.style.top = `${y}px`;
});

