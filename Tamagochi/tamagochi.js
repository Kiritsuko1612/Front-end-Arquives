// ── Imagens dos estados ──────────────────────────────────────────────
const imagens = {
    normal:  "normal_foxy.png",
    bravo:   "angry_foxy.png",
    morto:   "sleepy_foxy.png",
    clicado: "eating_foxy.png",
    feliz:   "after_eating_foxy.png"
};

// ── Cenários ─────────────────────────────────────────────────────────
const fundoDia   = "cenary_foxy.png";
// Noite simulada via CSS filter (sem imagem separada)

// ── Estado ───────────────────────────────────────────────────────────
let contador      = 0;
let horasCount    = 0;
let horasInterval = null;
let timeoutClique = null;
let timeoutBack   = null;
let modoNoiteManual = false;

const img   = document.getElementById("mainImage");
const barra = document.getElementById("barraFome");
const badge = document.getElementById("statusBadge");

// ── Helpers de status ────────────────────────────────────────────────
function setStatus(icone, texto, cor) {
    badge.textContent = icone + " " + texto;
    badge.className = "badge badge-lg font-bold text-base shadow mb-4 " + cor;
}

// ── Controle de fome ─────────────────────────────────────────────────
function controle() {
    setInterval(() => {
        contador++;
        barra.value = contador;

        if (contador >= 20) {
            img.src = imagens.morto;
            setStatus("💀", "Morreu de fome...", "badge-error");
        } else if (contador >= 10) {
            img.src = imagens.bravo;
            setStatus("😡", "Com muita fome!", "badge-error");
        } else if (contador >= 5) {
            setStatus("😟", "Com fome...", "badge-warning");
        }
    }, 1000);
}

// ── Alimentar ────────────────────────────────────────────────────────
function alimentar() {
    img.src     = imagens.clicado;
    contador    = 0;
    barra.value = 0;
    setStatus("🍓", "Comendo!", "badge-success");

    console.log("Comendo");

    if (timeoutClique) clearTimeout(timeoutClique);

    timeoutClique = setTimeout(() => {
        img.src = imagens.feliz;
        setStatus("😍", "Feliz e saciado!", "badge-success");

        timeoutBack = setTimeout(() => {
            img.src = imagens.normal;
            setStatus("😊", "Normal", "badge-warning");
        }, 2000);
    }, 1000);
}

// ── Ciclo dia/noite automático ───────────────────────────────────────
function atualizarFundo() {
    if (horasInterval) clearInterval(horasInterval);

    horasInterval = setInterval(() => {
        if (modoNoiteManual) return; // toggle manual tem prioridade

        horasCount++;

        if (horasCount >= 12) {
            aplicarNoite();
        } else {
            aplicarDia();
        }
        if (horasCount >= 24) horasCount = 0;
    }, 2000); // 2s por "hora" → dia completo em ~48s
}

function aplicarNoite() {
    document.body.style.filter = "brightness(0.45) saturate(0.6) hue-rotate(200deg)";
}

function aplicarDia() {
    document.body.style.filter = "";
}

// ── Toggle manual dia/noite ──────────────────────────────────────────
function toggleModoNoite(ligado) {
    modoNoiteManual = ligado;
    if (ligado) {
        horasCount = 12;
        aplicarNoite();
    } else {
        horasCount = 0;
        aplicarDia();
    }
}

// ── Easter egg Ferlini ───────────────────────────────────────────────
function mostrarFerlini() {
    document.getElementById("ferliniModal").showModal();
}

// ── Init ─────────────────────────────────────────────────────────────
controle();
atualizarFundo();
