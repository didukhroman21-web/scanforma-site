// Умови — один файл TERMS.txt (його ж показує інсталятор); тут він перетворюється на розмітку.
fetch("TERMS.txt").then(r => r.ok ? r.text() : Promise.reject()).then(t => {
  const box = document.getElementById("terms"), lines = t.replace(/^﻿/, "").split(/\r?\n/);
  document.getElementById("ed").textContent = lines[1] || "";
  box.textContent = "";
  let list = null;
  const link = s => s.replace(/https:\/\/\S+/g, u => `<a href="${u}">${u}</a>`);
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  for (const raw of lines.slice(2)) {
    const s = raw.trim();
    if (!s) { list = null; continue; }
    let el;
    if (/^\d+\.\s+[А-ЯІЇЄҐA-Z',' ]+$/.test(s)) { el = document.createElement("h2"); list = null; }
    else if (s.startsWith("- ")) { if (!list) box.append(list = document.createElement("ul")); el = document.createElement("li"); list.append(el); el.innerHTML = link(esc(s.slice(2))); continue; }
    else { el = document.createElement("p"); list = null; }
    el.innerHTML = link(esc(s));
    box.append(el);
  }
}).catch(() => {});
