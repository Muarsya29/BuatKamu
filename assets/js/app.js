(function () {
  // ===== MUSIC =====
  const audio = document.getElementById("bgm");
  const btn = document.getElementById("musicBtn");
  const label = document.getElementById("musicLabel");
  const dot = btn ? btn.querySelector(".dot") : null;

  function setUI(playing){
    if(!label || !dot) return;
    label.textContent = playing ? "Music on" : "Play music";
    dot.classList.toggle("playing", playing);
  }

  if (audio) audio.volume = 0.7;

  const saved = localStorage.getItem("love-music") || "off";
  if (saved === "on" && audio) {
    audio.play().then(() => setUI(true)).catch(() => setUI(false));
  } else {
    setUI(false);
  }

  if (btn && audio) {
    btn.addEventListener("click", async () => {
      if (audio.paused) {
        try {
          await audio.play();
          localStorage.setItem("love-music", "on");
          setUI(true);
        } catch {
          setUI(false);
        }
      } else {
        audio.pause();
        localStorage.setItem("love-music", "off");
        setUI(false);
      }
    });
  }

  // ===== SIMPLE 10-SLIDE (no library) =====
  const slides = document.querySelectorAll(".slide");
  let index = 0;

  function show(i){
    slides.forEach(s => s.classList.remove("active"));
    slides[i].classList.add("active");
  }

  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");

  if (slides.length) {
  show(0);

  const INTERVAL = 1500; // 1,5 detik
  let timer = null;

  function startAuto(){
    stopAuto();
    timer = setInterval(() => {
      index = (index + 1) % slides.length;
      show(index);
    }, INTERVAL);
  }

  function stopAuto(){
    if (timer) clearInterval(timer);
    timer = null;
  }

  nextBtn?.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    show(index);
  });

  prevBtn?.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    show(index);
  });

  // Auto play
  startAuto();

  // Pause saat mouse di area slider (biar enak dibaca)
  const sliderEl = document.querySelector(".slider");
  sliderEl?.addEventListener("mouseenter", stopAuto);
  sliderEl?.addEventListener("mouseleave", startAuto);
}

  // ===== WORDS PAGE: add line + surprise hearts =====
  const addLineBtn = document.getElementById("addLineBtn");
  const loveNotes = document.getElementById("loveNotes");

  if (addLineBtn && loveNotes) {
    const lines = [
      "“Aku sayang kamu, lebih dari yang bisa aku jelasin.”",
      "“Kalau kamu capek, sini… aku jagain.”",
      "“Aku suka caramu bikin hal sederhana jadi spesial.”",
      "“Peluk kamu itu tempat paling tenang.”",
      "“Aku pilih kamu, hari ini dan seterusnya.”",
    ];

    addLineBtn.addEventListener("click", () => {
      const p = document.createElement("p");
      p.textContent = `${loveNotes.children.length + 1}) ${lines[Math.floor(Math.random() * lines.length)]}`;
      loveNotes.appendChild(p);
      p.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  }

  const surpriseBtn = document.getElementById("surpriseBtn");
  if (surpriseBtn) {
    surpriseBtn.addEventListener("click", () => {
      for (let i = 0; i < 18; i++) {
        const el = document.createElement("div");
        el.textContent = Math.random() > 0.5 ? "♥" : "♡";
        el.style.position = "fixed";
        el.style.left = (window.innerWidth * 0.5 + (Math.random() * 140 - 70)) + "px";
        el.style.top = (window.innerHeight * 0.75) + "px";
        el.style.fontSize = (18 + Math.random() * 18) + "px";
        el.style.color = "#ff3f9a";
        el.style.zIndex = 9999;
        document.body.appendChild(el);

        gsap.to(el, {
          y: -200 - Math.random() * 160,
          x: (Math.random() * 240 - 120),
          rotation: (Math.random() * 240 - 120),
          opacity: 0,
          duration: 1.2 + Math.random() * 0.7,
          ease: "power2.out",
          onComplete: () => el.remove(),
        });
      }
    });
  }
})();
// ========================
// LOVE CURSOR
// ========================

const cursor=document.createElement("div");
cursor.className="love-cursor";
cursor.innerHTML="💖";

document.body.appendChild(cursor);

document.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";

// smoke
const smoke=document.createElement("div");
smoke.className="smoke";
smoke.style.left=e.clientX+"px";
smoke.style.top=e.clientY+"px";
document.body.appendChild(smoke);

setTimeout(()=>{
smoke.remove();
},900);

// glitter
if(Math.random()<0.4){

const sparkle=document.createElement("div");
sparkle.className="sparkle";
sparkle.innerHTML=["✨","⭐","💫"][Math.floor(Math.random()*3)];

sparkle.style.left=e.clientX+(Math.random()*20-10)+"px";
sparkle.style.top=e.clientY+(Math.random()*20-10)+"px";

document.body.appendChild(sparkle);

setTimeout(()=>{
sparkle.remove();
},800);

}

// floating love
if(Math.random()<0.25){

const love=document.createElement("div");
love.className="float-love";

love.innerHTML=["💗","💕","💖","💞"][Math.floor(Math.random()*4)];

love.style.left=e.clientX+"px";
love.style.top=e.clientY+"px";

love.style.setProperty(
'--move',
(Math.random()*60-30)+"px"
);

document.body.appendChild(love);

setTimeout(()=>{
love.remove();
},1400);

}

});

// ========================
// HEART EXPLOSION
// ========================

document.addEventListener("click",(e)=>{

for(let i=0;i<18;i++){

const heart=document.createElement("div");

heart.className="explode-heart";
heart.innerHTML=["💖","💕","💗","💞"][Math.floor(Math.random()*4)];

heart.style.left=e.clientX+"px";
heart.style.top=e.clientY+"px";

heart.style.setProperty(
'--x',
(Math.random()*180-90)+"px"
);

heart.style.setProperty(
'--y',
(Math.random()*180-90)+"px"
);

document.body.appendChild(heart);

setTimeout(()=>{
heart.remove();
},1000);

}

});

// ========================
// HOVER EFFECT
// ========================

document.querySelectorAll(
'button,a,img,.btn,.tile,.card'
).forEach(el=>{

el.addEventListener("mouseenter",()=>{
cursor.classList.add("hover");
});

el.addEventListener("mouseleave",()=>{
cursor.classList.remove("hover");
});

});