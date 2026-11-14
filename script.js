/* =========================================================
   V-Day from Sergjo: the question page (ask.html)
   Names come from the link:  ask.html?from=Sergjo&to=Ana
   Use index.html (the link maker) to build those links.
   Edit the CONFIG block below to change the messages.
   ========================================================= */

const CONFIG = {
  // Default sender name, used only if the link has no ?from=
  from: "Sergjo",

  // Messages the "No" button cycles through as she keeps trying it.
  noMessages: [
    "Are you sure? 🥺",
    "Really sure?",
    "Think about it once more...",
    "I'll bring snacks. Good ones.",
    "Okay but what if it's fun?",
    "Don't make me use puppy eyes 🐶",
    "You're breaking my heart 💔",
    "Last chance... (it's not)",
    "Fine, I'll just make Yes bigger.",
  ],

  // After this many "No" clicks, the No button starts dodging.
  dodgeAfter: 3,

  // Yes button growth per "No" click (1 = no growth).
  growthPerNo: 1.18,

  // Emoji that fall in the background.
  hearts: ["💖", "💗", "💕", "🌹", "💘", "✨"],
};

/* ---------- helpers ---------- */
const $ = (id) => document.getElementById(id);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const askView = $("askView");
const yesView = $("yesView");
const yesBtn = $("yesBtn");
const noBtn = $("noBtn");
const title = $("title");
const sub = $("sub");
const hint = $("hint");
const emoji = $("emoji");
const heartsLayer = $("hearts");
const sendBtn = $("sendBtn");
const sendHint = $("sendHint");

/* ---------- personalise from ?from=Name&to=Name ---------- */
const cleanName = (s) => (s || "").replace(/[\u0000-\u001f\u007f<>]/g, "").trim().slice(0, 30);
const params = new URLSearchParams(location.search);
const herName = cleanName(params.get("to"));
const fromName = cleanName(params.get("from")) || CONFIG.from;
$("fromName").textContent = fromName;
document.title = `A little question from ${fromName} 💌`;
if (herName) {
  title.textContent = `${herName}, will you be my Valentine?`;
  $("yesTitle").textContent = `${herName} said yes!`;
}

/* ---------- falling hearts ---------- */
function spawnHeart() {
  if (reduceMotion) return;
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = CONFIG.hearts[Math.floor(Math.random() * CONFIG.hearts.length)];
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 14 + Math.random() * 22 + "px";
  const dur = 6 + Math.random() * 6;
  h.style.animationDuration = dur + "s";
  heartsLayer.appendChild(h);
  setTimeout(() => h.remove(), dur * 1000 + 200);
}
setInterval(spawnHeart, 450);
for (let i = 0; i < 6; i++) setTimeout(spawnHeart, i * 150);

/* ---------- the "No" button ---------- */
let noCount = 0;
let yesScale = 1;

function moveNoButton() {
  noBtn.classList.add("dodging");
  const pad = 12;
  const w = noBtn.offsetWidth;
  const h = noBtn.offsetHeight;
  const maxX = Math.max(pad, window.innerWidth - w - pad);
  const maxY = Math.max(pad, window.innerHeight - h - pad);
  noBtn.style.left = pad + Math.random() * (maxX - pad) + "px";
  noBtn.style.top = pad + Math.random() * (maxY - pad) + "px";
}

function onNo(e) {
  if (e) e.preventDefault();
  noCount += 1;

  const msg = CONFIG.noMessages[Math.min(noCount - 1, CONFIG.noMessages.length - 1)];
  noBtn.textContent = msg;
  hint.textContent = "";

  // Yes grows every time.
  // Capped so it never grows wider than the card (the full-screen takeover comes at the end).
  const maxScale = Math.max(1, Math.min(2.4, (askView.clientWidth - 48) / yesBtn.offsetWidth));
  yesScale = Math.min(yesScale * CONFIG.growthPerNo, maxScale);
  yesBtn.style.transform = `scale(${yesScale.toFixed(3)})`;
  yesBtn.style.margin = `${(yesScale - 1) * 14}px ${(yesScale - 1) * 26}px`;

  if (noCount === 2) emoji.textContent = "🥺";
  if (noCount === 5) emoji.textContent = "😢";
  if (noCount === 8) emoji.textContent = "😭";

  if (noCount >= CONFIG.dodgeAfter) moveNoButton();

  // Out of messages: Yes takes over the screen, No is gone.
  if (noCount > CONFIG.noMessages.length) {
    noBtn.classList.add("hidden");
    yesBtn.style.transform = "";
    yesBtn.style.margin = "";
    yesBtn.classList.add("mega");
    yesBtn.textContent = "Okay, it's a Yes 💖";
  }
}

noBtn.addEventListener("click", onNo);

// Once it starts dodging, it also runs from the cursor / finger.
// Every second dodge counts as a "No" so the story still moves forward.
let dodgeHits = 0;
["pointerenter", "touchstart"].forEach((evt) =>
  noBtn.addEventListener(evt, (e) => {
    if (noCount >= CONFIG.dodgeAfter && !noBtn.classList.contains("hidden")) {
      e.preventDefault();
      dodgeHits += 1;
      if (dodgeHits % 2 === 0) onNo();
      else moveNoButton();
    }
  }, { passive: false })
);

/* ---------- Yes! ---------- */
function confettiBurst() {
  if (reduceMotion) return;
  const pieces = ["💖", "🎉", "✨", "💕", "🌹", "🎊"];
  for (let i = 0; i < 70; i++) {
    const c = document.createElement("span");
    c.className = "confetti";
    c.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    c.style.left = Math.random() * 100 + "vw";
    c.style.fontSize = 16 + Math.random() * 22 + "px";
    const dur = 2.5 + Math.random() * 3;
    c.style.animationDuration = dur + "s";
    c.style.animationDelay = Math.random() * 0.8 + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), (dur + 1) * 1000);
  }
}

yesBtn.addEventListener("click", () => {
  askView.classList.add("hidden");
  yesView.classList.remove("hidden");
  yesBtn.classList.remove("mega");
  confettiBurst();
  setTimeout(confettiBurst, 1200);
});

/* ---------- Pick a plan + send the answer ---------- */
let chosenPlan = null;
const planButtons = Array.from(document.querySelectorAll(".plan"));

planButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    planButtons.forEach((b) => b.setAttribute("aria-checked", "false"));
    btn.setAttribute("aria-checked", "true");
    chosenPlan = btn.dataset.plan;
    sendBtn.disabled = false;
    sendBtn.textContent = `Tell ${fromName} 💌`;
  })
);

sendBtn.addEventListener("click", async () => {
  if (!chosenPlan) return;
  const who = herName ? `It's ${herName}. ` : "";
  const text = `${who}YES. 💖 I'd love to be your Valentine. Let's do ${chosenPlan}`;

  try {
    if (navigator.share) {
      await navigator.share({ text });
      sendHint.textContent = "Sent! See you soon. 💕";
      return;
    }
  } catch (err) {
    // User closed the share sheet: fall through to the copy option.
  }

  try {
    await navigator.clipboard.writeText(text);
    sendHint.textContent = `Copied! Paste it in a message to ${fromName}. 💕`;
  } catch (err) {
    sendHint.textContent = `Just text ${fromName}: "${text}"`;
  }
});
