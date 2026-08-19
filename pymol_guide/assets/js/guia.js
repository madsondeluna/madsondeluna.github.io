/* Comportamentos da pagina do guia. O conteudo e estatico; este arquivo apenas
   acrescenta busca, copia de comandos e destaque do indice. Sem ele a pagina
   continua legivel e navegavel. */
(function () {
  "use strict";

  var content = document.getElementById("content");
  var toc = document.getElementById("toc");
  var busca = document.getElementById("q");
  var totop = document.getElementById("totop");

  // indice de busca montado a partir do texto ja presente no documento
  var cards = [].slice.call(document.querySelectorAll(".card"));
  cards.forEach(function (c) {
    c.dataset.search = c.textContent.toLowerCase();
  });

  if (content) {
    content.addEventListener("click", function (e) {
      if (!e.target.classList.contains("copy")) return;
      var pre = e.target.parentElement.querySelector("pre");
      navigator.clipboard.writeText(pre.innerText).then(function () {
        e.target.textContent = "Copiado";
        e.target.classList.add("done");
        setTimeout(function () {
          e.target.textContent = "Copiar";
          e.target.classList.remove("done");
        }, 1400);
      });
    });
  }

  if (busca) {
    busca.addEventListener("input", function (e) {
      var q = e.target.value.trim().toLowerCase();
      var total = 0;
      [].forEach.call(document.querySelectorAll("section"), function (sec) {
        var vis = 0;
        [].forEach.call(sec.querySelectorAll(".card"), function (c) {
          var ok = !q || c.dataset.search.indexOf(q) !== -1;
          c.classList.toggle("hidden", !ok);
          if (ok) vis++;
        });
        [].forEach.call(sec.querySelectorAll(".rawblock"), function (r) {
          r.classList.toggle("hidden", !!q);
        });
        sec.classList.toggle("hidden", !!q && vis === 0);
        total += vis;
      });
      var msg = document.getElementById("nores");
      if (!msg) {
        msg = document.createElement("div");
        msg.id = "nores";
        msg.className = "empty hidden";
        msg.textContent = "Nenhum comando corresponde ao filtro.";
        content.parentNode.insertBefore(msg, content);
      }
      msg.classList.toggle("hidden", !(q && total === 0));
    });
  }


  // fachada de video: o iframe so nasce no clique, entao nenhuma
  // requisicao sai para o YouTube em quem apenas passa pela pagina
  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest(".video-play");
    if (!btn) return;
    var frame = btn.parentElement;
    var id = frame.dataset.video;
    if (!id) return;
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
    f.title = frame.dataset.title || "Video";
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture";
    f.referrerPolicy = "strict-origin-when-cross-origin";
    f.allowFullscreen = true;
    frame.textContent = "";
    frame.appendChild(f);
  });

  if (toc && "IntersectionObserver" in window) {
    var links = [].slice.call(toc.querySelectorAll("a"));
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) {
          l.classList.toggle("on", l.dataset.id === en.target.id);
        });
      });
    }, { rootMargin: "-8% 0px -78% 0px" });
    [].forEach.call(document.querySelectorAll("section"), function (s) { obs.observe(s); });
  }

  if (totop) {
    addEventListener("scroll", function () {
      totop.classList.toggle("show", scrollY > 900);
    }, { passive: true });
    totop.addEventListener("click", function (e) {
      e.preventDefault();
      scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
