// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
if (toggle) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen);
  });
}

// Typing terminal effect
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const termBody = document.getElementById("term-body");

const lines = [
  { type: "prompt", text: "whoami" },
  { type: "out", text: "catharina — from languages to information security" },
  { type: "prompt", text: "translate \"confidentiality, integrity, availability\"" },
  { type: "out", text: "→ confidencialidade, integridade, disponibilidade" },
  { type: "prompt", text: "scan --target local-network --quiet" },
  { type: "out", text: "[+] 12 hosts up · 0 critical anomalies" },
];

if (reduceMotion || !termBody) {
  if (termBody) termBody.classList.add("reduced");
} else {
  termBody.innerHTML = "";
  runTerminal();
}

async function typeLine(container, text, speed = 22) {
  const span = document.createElement("span");
  container.appendChild(span);
  for (let i = 0; i < text.length; i++) {
    span.textContent += text[i];
    await wait(speed);
  }
}

function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function runTerminal() {
  while (true) {
    termBody.innerHTML = "";
    for (const line of lines) {
      const p = document.createElement("p");
      if (line.type === "prompt") {
        const promptSpan = document.createElement("span");
        promptSpan.className = "prompt";
        promptSpan.textContent = "$";
        p.appendChild(promptSpan);
      } else {
        p.classList.add("out");
      }
      const textWrap = document.createElement("span");
      textWrap.className = "type-line";
      p.appendChild(textWrap);
      termBody.appendChild(p);
      await typeLine(textWrap, line.text, line.type === "prompt" ? 26 : 14);
      await wait(line.type === "out" ? 500 : 200);
    }
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    termBody.appendChild(cursor);
    await wait(2200);
  }
}
