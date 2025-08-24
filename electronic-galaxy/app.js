const galaxy = document.querySelector("#galaxy");

// layout: place nodes around a circle
function layoutNodes(width, height) {
  const cx = width/2, cy = height/2;
  const r = Math.min(width, height) * 0.35;
  return GENRES.map((g, i) => {
    const angle = (i / GENRES.length) * Math.PI * 2;
    return { ...g, x: cx + Math.cos(angle)*r, y: cy + Math.sin(angle)*r };
  });
}

function renderGalaxy() {
  // give the box a size if empty
  galaxy.style.minHeight = "520px";
  const width = galaxy.clientWidth || 900;
  const height = galaxy.clientHeight || 580;
  galaxy.innerHTML = "";

  layoutNodes(width, height).forEach(node => {
    const btn = document.createElement("button");
    btn.className = "node";
    btn.style.left = `${node.x}px`;
    btn.style.top = `${node.y}px`;
    btn.setAttribute("aria-label", `${node.name} genre`);
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = node.name;
    btn.appendChild(label);
    btn.addEventListener("click", () => onSelect(node));
    galaxy.appendChild(btn);
  });
}

window.addEventListener("resize", renderGalaxy);
document.addEventListener("DOMContentLoaded", renderGalaxy);
