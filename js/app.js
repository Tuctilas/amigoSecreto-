let amigos = [];

function adicionar() {
    let amigo = document.getElementById('nome-amigo');
    let valor = amigo.value.trim();

    if (valor === '') {
        alert('Por favor, insira o nome de um amigo.');
        return;
    }
    if (amigos.includes(valor)) {
        alert('Este amigo já está na lista.');
        return;
    }

    amigos.push(valor);
    amigo.value = '';

    atualizarLista();
    atualizarSorteio();
}

function sortear() {
    if (amigos.length < 3) {
        alert('Adicione pelo menos 3 amigos para realizar o sorteio.');
        return;
    }

    embaralhar(amigos);

    let sorteio = document.getElementById('lista-sorteio');
    sorteio.innerHTML = '';

    for (let i = 0; i < amigos.length; i++) {
        let proximo = (i === amigos.length - 1) ? amigos[0] : amigos[i + 1];
        sorteio.innerHTML += `${amigos[i]} --> ${proximo}<br/>`;
    }
}

function excluirAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
    atualizarSorteio();
}

function embaralhar(lista) {
    for (let indice = lista.length; indice; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * indice);
        [lista[indice - 1], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[indice - 1]];
    }
}

function atualizarSorteio() {
    document.getElementById('lista-sorteio').innerHTML = '';
}

function atualizarLista() {
    let lista = document.getElementById('lista-amigos');
    lista.innerHTML = '';

    for (let i = 0; i < amigos.length; i++) {
        let paragrafo = document.createElement('p');
        paragrafo.textContent = amigos[i];

        paragrafo.addEventListener('click', (function(indice) {
            return function() { excluirAmigo(indice); };
        })(i));

        lista.appendChild(paragrafo);
    }
}

function reiniciar() {
    amigos = [];
    document.getElementById('lista-amigos').innerHTML = '';
    document.getElementById('lista-sorteio').innerHTML = '';
}

// ── DADO 3D ───────────────────────────────────────
const faceTransforms = {
    1: { fx: '-20deg', fy: '0deg',   fz: '0deg' },
    2: { fx: '-90deg', fy: '0deg',   fz: '0deg' },
    3: { fx: '-20deg', fy: '-90deg', fz: '0deg' },
    4: { fx: '-20deg', fy: '90deg',  fz: '0deg' },
    5: { fx: '90deg',  fy: '0deg',   fz: '0deg' },
    6: { fx: '-20deg', fy: '180deg', fz: '0deg' },
};

let rolling = false;

function rollDice() {
    if (rolling) return;
    rolling = true;

    const cube = document.getElementById('cube');
    const value = Math.floor(Math.random() * 6) + 1;
    const t = faceTransforms[value];

    cube.style.setProperty('--fx', t.fx);
    cube.style.setProperty('--fy', t.fy);
    cube.style.setProperty('--fz', t.fz);

    cube.classList.remove('rolling');
    void cube.offsetWidth;
    cube.classList.add('rolling');

    cube.addEventListener('animationend', () => {
        cube.classList.remove('rolling');
        cube.style.animation = 'none';
        cube.style.transform = `rotateX(${t.fx}) rotateY(${t.fy}) rotateZ(${t.fz})`;
        setTimeout(() => {
            cube.style.animation = '';
            cube.style.transform = '';
        }, 100);
        rolling = false;
    }, { once: true });
}