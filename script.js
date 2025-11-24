// Extraordinary RPS — polished features, confetti, sounds, autoplay demo
const choices = ['rock','paper','scissors'];
const beats = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

let userScore = Number(localStorage.getItem('rps_user')||0);
let computerScore = Number(localStorage.getItem('rps_comp')||0);
let soundEnabled = false; // muted by default, user toggles

// elements
const el = id => document.getElementById(id);
const userChoiceEl = el('userChoice');
const computerChoiceEl = el('computerChoice');
const userScoreEl = el('userScore');
const compScoreEl = el('computerScore');
const banner = el('banner');
const trophy = el('trophy');

const soundClick = el('soundClick');
const soundWin = el('soundWin');
const soundLose = el('soundLose');
const soundDraw = el('soundDraw');

// confetti canvas
const confettiCanvas = document.getElementById('confetti');
const confettiCtx = confettiCanvas.getContext && confettiCanvas.getContext('2d');
let confettiActive = false, confettiPieces = [];

// adapt canvas size
function resizeCanvas(){
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// create simple confetti pieces
function spawnConfetti(count=60){
  if(!confettiCtx) return;
  confettiPieces = [];
  for(let i=0;i<count;i++){
    confettiPieces.push({
      x: Math.random()*confettiCanvas.width,
      y: Math.random()*-confettiCanvas.height,
      r: 6+Math.random()*8,
      vx: -2 + Math.random()*4,
      vy: 2 + Math.random()*6,
      color: ['#ff9f1c','#ff6b6b','#6bffb8','#6b6bff','#f6f',' #08f'][Math.floor(Math.random()*6)]
    });
  }
  confettiActive = true;
  requestAnimationFrame(updateConfetti);
}
function updateConfetti(){
  if(!confettiActive) return;
  confettiCtx.clearRect(0,0,confettiCanvas.width, confettiCanvas.height);
  for(let p of confettiPieces){
    p.x += p.vx; p.y += p.vy; p.vy += 0.12;
    confettiCtx.fillStyle = p.color || '#fff';
    confettiCtx.beginPath();
    confettiCtx.ellipse(p.x,p.y,p.r,p.r*0.6, Math.random()*Math.PI,0,Math.PI*2);
    confettiCtx.fill();
  }
  confettiPieces = confettiPieces.filter(p=>p.y < confettiCanvas.height + 50);
  if(confettiPieces.length>0) requestAnimationFrame(updateConfetti);
  else confettiActive = false;
}

// restore scores ui
userScoreEl.innerText = userScore;
compScoreEl.innerText = computerScore;
trophy.innerText = userScore > computerScore ? '🏆' : Math.max(userScore, computerScore);

// sound toggle UI
const soundToggle = document.getElementById('soundToggle');
soundToggle.addEventListener('click', ()=>{
  soundEnabled = !soundEnabled;
  soundToggle.textContent = soundEnabled ? '🔊' : '🔈';
});
function playSound(s){ if(!soundEnabled) return; try{s.currentTime=0; s.play();}catch(e){} }

// theme toggle (store preference)
const themeToggle = document.getElementById('themeToggle');
if(localStorage.getItem('rps_theme') === 'dark' || (!localStorage.getItem('rps_theme') && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)){
  document.body.classList.add('dark'); themeToggle.checked = true;
}
themeToggle.addEventListener('change', (e)=>{
  if(e.target.checked){ document.body.classList.add('dark'); localStorage.setItem('rps_theme','dark'); }else{ document.body.classList.remove('dark'); localStorage.setItem('rps_theme','light'); }
});

// game play
function playRound(user){
  const comp = choices[Math.floor(Math.random()*3)];
  userChoiceEl.textContent = emojiFor(user) + ' ' + user.toUpperCase();
  computerChoiceEl.textContent = emojiFor(comp) + ' ' + comp.toUpperCase();
  playSound(soundClick);

  if(user === comp){
    banner.textContent = "It's a Draw!"; banner.className='banner draw'; playSound(soundDraw);
  } else if(beats[user] === comp){
    userScore++; banner.textContent = "You Win! 🎉"; banner.className='banner win'; playSound(soundWin); spawnConfetti(80);
  } else {
    computerScore++; banner.textContent = "You Lose 😢"; banner.className='banner lose'; playSound(soundLose);
  }

  userScoreEl.textContent = userScore;
  compScoreEl.textContent = computerScore;
  localStorage.setItem('rps_user', userScore);
  localStorage.setItem('rps_comp', computerScore);
  trophy.innerText = userScore > computerScore ? '🏆' : Math.max(userScore, computerScore);
}

// helper for emoji
function emojiFor(s){ if(s==='rock') return '🪨'; if(s==='paper') return '📄'; return '✂️'; }

document.querySelectorAll('.choice').forEach(b=> b.addEventListener('click', ()=> playRound(b.dataset.move)));

// keyboard shortcuts
window.addEventListener('keydown', (e)=>{ const k = e.key.toLowerCase(); if(k==='r') document.querySelector('[data-move="rock"]').click(); if(k==='p') document.querySelector('[data-move="paper"]').click(); if(k==='s') document.querySelector('[data-move="scissors"]').click(); });

// reset
document.getElementById('resetBtn').addEventListener('click', ()=>{
  userScore=0; computerScore=0; localStorage.removeItem('rps_user'); localStorage.removeItem('rps_comp');
  userScoreEl.textContent='0'; compScoreEl.textContent='0'; banner.textContent='Scores reset — have fun!'; banner.className='banner';
});

// demo autoplay
document.getElementById('demoBtn').addEventListener('click', async ()=>{
  for(let i=0;i<5;i++){ await new Promise(r=>setTimeout(r, 600)); const m = choices[Math.floor(Math.random()*3)]; playRound(m); }
});

// initialize small flourish
setTimeout(()=>{ document.querySelector('.stage').classList.add('loaded'); }, 300);
