const bg=document.querySelector('.burger'),ln=document.querySelector('.links');
if(bg&&ln){
 bg.addEventListener('click',()=>{const o=ln.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
 ln.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ln.classList.remove('open');bg.setAttribute('aria-expanded','false')}));
}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach((el,i)=>{el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)});
const f=document.getElementById('form'),s=document.getElementById('status');
if(f&&s){f.addEventListener('submit',async e=>{e.preventDefault();s.textContent='Sending…';
 try{const r=await fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}});
 if(r.ok){s.textContent="Thank you! I'll be in touch soon.";f.reset()}else throw 0}
 catch{s.textContent='Something went wrong. Please email webcreate1206@gmail.com instead.'}})}
