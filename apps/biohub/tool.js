"use strict";

/* Seletor de modo das paginas de ferramenta. Um arquivo para as oito: o
   estado mora no endereco E em localStorage, sob a MESMA chave da raiz do
   site, entao quem escolheu um modo la chega aqui nele. */

const MODES = ["", "paper-like", "deep-blue", "dark"];
const themeMeta = document.querySelector('meta[name="theme-color"]');
const probe = document.createElement("div");
probe.style.cssText = "position:absolute;visibility:hidden";
document.body.appendChild(probe);

function resolve(name) {
  probe.style.color = "var(" + name + ")";
  const m = getComputedStyle(probe).color.match(/\d+(\.\d+)?/g);
  return "#" + m.slice(0, 3).map((c) => (+c).toString(16).padStart(2, "0")).join("");
}

/* ---------- cor de grafico a partir dos tokens ----------

   Plotly nao resolve var(): uma cor escrita como "var(--color-primary)"
   e string invalida e ele cai na paleta padrao dele, que e o que estava
   acontecendo nas duas paginas com grafico. Aqui o token e RESOLVIDO
   antes de entrar na configuracao.

   Serie sai de --chart-n, malha de --chart-grid, tinta de --chart-ink:
   fatia de grafico nunca carrega estado e cor de estado nunca carrega
   serie. */

function pureToken(name) {
  probe.style.color = "var(" + name + ")";
  return getComputedStyle(probe).color;
}

window.pureChart = function () {
  const series = [];
  for (let i = 1; i <= 8; i++) series.push(pureToken("--chart-" + i));
  const seq = [];
  for (let i = 1; i <= 7; i++) seq.push(pureToken("--seq-" + i));
  const div = [];
  for (let i = 1; i <= 9; i++) div.push(pureToken("--div-" + i));
  return {
    paper: "rgba(0,0,0,0)",
    plot: "rgba(0,0,0,0)",
    ink: pureToken("--chart-ink"),
    muted: pureToken("--chart-ink-muted"),
    grid: pureToken("--chart-grid"),
    series: series,
    /* escala continua no formato que o Plotly espera: parada e cor */
    sequential: seq.map((c, i) => [i / (seq.length - 1), c]),
    diverging: div.map((c, i) => [i / (div.length - 1), c]),
  };
};

/* o grafico ja desenhado precisa acompanhar a troca de modo, senao a
   pagina inteira muda e ele fica com a cor do modo anterior */
function repaintPlots() {
  if (!window.Plotly) return;
  const c = window.pureChart();
  document.querySelectorAll(".js-plotly-plot").forEach((d) => {
    window.Plotly.relayout(d, {
      paper_bgcolor: c.paper,
      plot_bgcolor: c.plot,
      "font.color": c.ink,
      "xaxis.gridcolor": c.grid,
      "yaxis.gridcolor": c.grid,
      "xaxis.linecolor": c.grid,
      "yaxis.linecolor": c.grid,
    });
  });
}

function applyMode(mode, record) {
  document.documentElement.className = mode;
  try { localStorage.setItem("mode", mode || "light"); } catch (e) {}
  document.querySelectorAll(".mode-btn").forEach((b) =>
    b.setAttribute("aria-pressed", String(b.dataset.mode === mode)));
  if (themeMeta) themeMeta.setAttribute("content", resolve("--bg"));
  repaintPlots();
  if (!record) return;
  const url = new URL(location.href);
  if (mode) url.searchParams.set("mode", mode); else url.searchParams.delete("mode");
  history.replaceState(null, "", url);
}

document.querySelectorAll(".mode-btn").forEach((btn) =>
  btn.addEventListener("click", () => applyMode(btn.dataset.mode, true)));

/* o endereco vence o guardado, e o guardado vence o padrao */
const asked = new URL(location.href).searchParams.get("mode");
let stored = null;
try { stored = localStorage.getItem("mode"); } catch (e) {}
const start = MODES.includes(asked) ? asked
  : stored !== null && MODES.includes(stored === "light" ? "" : stored) ? (stored === "light" ? "" : stored)
  : "dark";
applyMode(start, false);
