// Посилання на інсталятор: одне місце для обох кнопок.
const DOWNLOAD_URL = "https://github.com/didukhroman21-web/scanforma-site/releases/download/v0.3.11/ScanForma_Setup_0.3.11.exe";
if (DOWNLOAD_URL) for (const id of ["dl-hero", "dl-main"]) {
  const a = document.getElementById(id); a.href = DOWNLOAD_URL; a.target = "_blank"; a.rel = "noopener";
}

// Демо: у спокої анкета вже заповнена; коли блок видно — сканування і заповнення поле за полем, по колу.
(function () {
  const demo = document.getElementById("demo");
  if (!demo || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const fields = [...demo.querySelectorAll(".fld")];
  const tag = document.getElementById("demo-tag");
  let busy = false, visible = false;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  async function play() {
    if (busy || !visible) return;
    busy = true;
    for (const f of fields) { f.classList.add("wait"); f.querySelector(".box").classList.add("wait"); f.querySelector(".box").textContent = ""; }
    tag.className = "tag warn"; tag.textContent = "Сканую…";
    demo.classList.remove("run"); void demo.offsetWidth; demo.classList.add("run");
    await wait(1500);
    for (const f of fields) {
      const box = f.querySelector(".box"), v = box.dataset.v;
      box.classList.remove("wait");
      for (let i = 1; i <= v.length; i++) { box.innerHTML = v.slice(0, i) + '<span class="caret"></span>'; await wait(45); }
      box.textContent = v; f.classList.remove("wait");
      await wait(160);
    }
    tag.className = "tag"; tag.textContent = "✓ з документів";
    busy = false;
    setTimeout(play, 3200);
  }
  new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible) setTimeout(play, 600); }, { threshold: .4 }).observe(demo);
})();
