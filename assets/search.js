(function(){var R=document.documentElement.getAttribute('data-root')||'';var q=document.getElementById('q'),r=document.getElementById('results'),idx=null,sel=-1;
function load(cb){if(idx)return cb();fetch(R+'assets/index.json').then(function(x){return x.json()}).then(function(d){idx=d;cb()})}
function esc(s){return s.replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function run(){var v=q.value.trim().toLowerCase();if(v.length<2){r.classList.remove('show');return}
load(function(){var terms=v.split(/\s+/),out=[];idx.forEach(function(p){var t=p.t.toLowerCase(),x=p.x.toLowerCase(),s=0;
for(var i=0;i<terms.length;i++){var a=t.indexOf(terms[i]),b=x.indexOf(terms[i]);if(a<0&&b<0)return;s+=(a>=0?10:0)+(b>=0?1:0)}out.push([s,p])});
out.sort(function(a,b){return b[0]-a[0]});sel=-1;
r.innerHTML=out.slice(0,12).map(function(o){var p=o[1],i=p.x.toLowerCase().indexOf(terms[0]),sn=p.x.substr(Math.max(0,i-40),120);
return '<a href="'+R+p.u+'"><em>'+esc(p.s)+'</em><b>'+esc(p.t)+'</b><small>'+esc(sn)+'\u2026</small></a>'}).join('')||'<a><small>No matches</small></a>';r.classList.add('show')})}
q.addEventListener('input',run);q.addEventListener('focus',run);
q.addEventListener('keydown',function(e){var a=r.querySelectorAll('a[href]');if(e.key==='ArrowDown'||e.key==='ArrowUp'){sel=(sel+(e.key==='ArrowDown'?1:-1)+a.length)%a.length;a.forEach(function(x,i){x.classList.toggle('sel',i===sel)});e.preventDefault()}
if(e.key==='Enter'&&a.length){location.href=a[Math.max(sel,0)].getAttribute('href')}if(e.key==='Escape'){r.classList.remove('show');q.blur()}});
document.addEventListener('click',function(e){if(!e.target.closest('.search'))r.classList.remove('show')});})();
