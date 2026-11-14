/* =========================================================
   V-Day Link Maker
   Builds a link to ask.html with the sender's name and hers.
   Only the two names are customizable.
   ========================================================= */

const $ = (id) => document.getElementById(id);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const form = $("makeForm");
const fromInput = $("fromInput");
const toInput = $("toInput");
const formHint = $("formHint");
const result = $("result");
const linkOut = $("linkOut");
const copyBtn = $("copyBtn");
const shareBtn = $("shareBtn");
const previewLink = $("previewLink");
const resultHint = $("resultHint");

/* ---------- falling hearts (same as the question page) ---------- */
const HEARTS = ["💖", "💗", "💕", "🌹", "💘", "✨"];
function spawnHeart() {
  if (reduceMotion) return;
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 14 + Math.random() * 22 + "px";
  const dur = 6 + Math.random() * 6;
  h.style.animationDuration = dur + "s";
  $("hearts").appendChild(h);
  setTimeout(() => h.remove(), dur * 1000 + 200);
}
setInterval(spawnHeart, 450);
for (let i = 0; i < 6; i++) setTimeout(spawnHeart, i * 150);

/* ---------- link building ---------- */
const cleanName = (s) => (s || "").replace(/[\u0000-\u001f\u007f<>]/g, "").trim().slice(0, 30);

function buildLink(from, to) {
  // Resolves next to this page, so it works on GitHub Pages and when opened locally.
  const url = new URL("ask.html", location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);
  return url.toString();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const from = cleanName(fromInput.value);
  const to = cleanName(toInput.value);

  if (!from || !to) {
    formHint.textContent = !from && !to
      ? "Add your name and hers first."
      : !from ? "Add your name first." : "Add her name first.";
    result.classList.add("hidden");
    return;
  }

  formHint.textContent = "";
  const link = buildLink(from, to);
  linkOut.value = link;
  previewLink.href = link;
  resultHint.textContent = `Send this to ${to}. When she says yes, she can message you straight back.`;
  result.classList.remove("hidden");
  result.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
});

linkOut.addEventListener("focus", () => linkOut.select());

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(linkOut.value);
    resultHint.textContent = "Copied! Now go send it. 💕";
  } catch (err) {
    linkOut.focus();
    linkOut.select();
    resultHint.textContent = "Press and hold the link to copy it.";
  }
});

if (!navigator.share) shareBtn.classList.add("hidden");
shareBtn.addEventListener("click", async () => {
  try {
    await navigator.share({
      title: "A little question 💌",
      text: "I made something for you 💌",
      url: linkOut.value,
    });
  } catch (err) {
    // Share sheet closed: nothing to do.
  }
});
