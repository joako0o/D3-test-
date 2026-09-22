/* app.js — GENERADO por scripts/build-js.mjs. No editar: se pisa al correr
   `npm run build:js` (que `npm start` ejecuta solo).
   Fuentes: js/*.js (ver js/README.md) + three@0.160.0 (tree-shaken).
   Edítalas y corre `npm run build:js`. */
var Pv=Object.defineProperty;var Ti=(i,e,t)=>()=>{if(t)throw t[0];try{return i&&(e=i(i=0)),e}catch(n){throw t=[n],n}};var Mo=(i,e)=>{for(var t in e)Pv(i,t,{get:e[t],enumerable:!0})};function ti(){let i=document.documentElement,e=window.visualViewport;return{width:Math.max(i?.clientWidth||e?.width||window.innerWidth,1),height:Math.max(i?.clientHeight||e?.height||window.innerHeight,1)}}function N_(){return ti().width<=767}function nn(){return El===null&&(El=Object.freeze(ti())),El}function Ah(){El=null}var El,ga=Ti(()=>{El=null;typeof window<"u"&&(window.addEventListener("resize",Ah),window.addEventListener("orientationchange",Ah),window.visualViewport&&window.visualViewport.addEventListener("resize",Ah))});function B_(){return An.pinned>=0?An.pinned:An.hover}function Ml(){return An.pinned>=0}function Rh(i){An.hover=i}function Ch(){An.hover=-1}function Rn(i){An.pinned=i,An.hover=-1}function bl(){An.pinned=-1,An.hover=-1}function Tl(){rn.participant=null,rn.rendered=null,rn.quoteIndex=-1}var An,rn,lo,Cn,_n,fs=Ti(()=>{An={hover:-1,pinned:-1};rn={participant:null,rendered:null,quoteIndex:-1};lo={scales:{}},Cn={card:null},_n={index:-1}});var Et,Ih,Al,Dh,cr,Nr,ms=Ti(()=>{Et=(i,e=0)=>{let t=Math.sin((i+1)*12.9898+e*78.233)*43758.5453;return t-Math.floor(t)},Ih=(i,e,t)=>Math.min(Math.max(i,e),t),Al=i=>{let e=i?.label||"neutral",t=Ih(Number(i?.score)||.7,0,1),n=String(i?.date||"").length+String(i?.text||"").length,r=Math.sin(n*9301+49297)*233280,o=r-Math.floor(r);return e==="hawkish"?.3+t*.4:e==="dovish"?-(.3+t*.4):(o-.5)*.18},Dh=(i,e)=>{if(i>=1)return 1;if(i<=0)return 0;let t=Math.min(e,100)/(1e3/60);return 1-Math.pow(1-i,t)},cr=(i,e,t,n)=>i+(e-i)*Dh(t,n),Nr=(i=[],e=[2005,2015])=>{let t=(i||[]).map(n=>{let r=String(n?.date||"").match(/^(\d{4})/);return Number(r?r[1]:n?.year)}).filter(n=>Number.isFinite(n));return t.length?{start:Math.min(...t),end:Math.max(...t)}:{start:e[0],end:e[1]}}});var X_,yi,Nh,Rl=Ti(()=>{X_=[{id:"inflation",short:"Inflaci\xF3n",label:"Inflaci\xF3n y precios",terms:["inflaci\xF3n","inflacionario","ipc","precios","subyacente","expectativas","meta"]},{id:"activity",short:"Actividad",label:"Actividad y crecimiento",terms:["crecimiento","pib","actividad","demanda","consumo","inversi\xF3n","producto","brecha"]},{id:"monetary",short:"Tasas",label:"Pol\xEDtica monetaria",terms:["tasa","tpm","pol\xEDtica monetaria","est\xEDmulo","neutralidad","liquidez","mantener","subir","bajar"]},{id:"external",short:"Externo",label:"Escenario internacional",terms:["externo","internacional","estados unidos","ee.uu","global","mundial","china","europa","mercados externos"]},{id:"financial",short:"Mercados",label:"Mercados y tipo de cambio",terms:["mercados financieros","tipo de cambio","tasas forward","forward","activos","bonos","financiero","d\xF3lar","peso"]},{id:"commodities",short:"Commodities",label:"Commodities y energ\xEDa",terms:["materias primas","petr\xF3leo","cobre","energ\xEDa","alimentos","commodities"]},{id:"labor",short:"Laboral",label:"Empleo y holguras",terms:["empleo","desempleo","salarios","salario","holgura","trabajadores"]},{id:"fiscal",short:"Fiscal",label:"Pol\xEDtica fiscal",terms:["fiscal","gasto","presupuesto","presupuestos","gobierno","impuesto","d\xE9ficit"]}],yi=i=>String(i||"").toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g,""),Nh=(i,e)=>i.includes(yi(e))});var q_={};Mo(q_,{initVoiceExplorer:()=>xb});function xb({quotes:i,openQuote:e,closeQuotePanel:t}){let n=document.getElementById("voiceRail"),r=document.getElementById("voiceDirectoryMeta"),o=document.getElementById("voiceDetailEmpty"),s=document.getElementById("voiceDetailContent"),a=document.getElementById("voiceDetailName"),c=document.getElementById("voiceDetailMeta"),l=document.getElementById("voiceDetailSummary"),u=document.getElementById("voiceDetailQuote"),d=document.getElementById("voiceDetailCitation"),h=document.getElementById("voiceDetailOpen"),p=document.getElementById("voiceProfileOpen"),g=document.getElementById("voiceProfilePanel"),x=document.getElementById("voiceProfileClose"),m=document.getElementById("voiceProfileTitle"),f=document.getElementById("voiceProfileSubtitle"),v=document.getElementById("voiceRadar"),_=document.getElementById("voiceTopicList"),T=document.getElementById("voiceProfileEvidenceQuote"),A=document.getElementById("voiceProfileEvidenceCitation");if(!n||!r||!o||!s||!h||!p||!g||!x||!v||!_||!T||!A||!i.length)return;let b=H=>{let Q=String(H.date||"").match(/^(\d{4})/);return Number(Q?Q[1]:H.year)},S=new Map,P=0,E=Nr(i);i.forEach((H,Q)=>{let le=b(H);if(!Number.isFinite(le)||le<E.start||le>E.end){P+=1;return}let W=H.participant||"Participante an\xF3nimo";S.has(W)||S.set(W,[]),S.get(W).push({q:H,index:Q,normalizedText:yi(H.text)})});let w=Array.from(S,([H,Q])=>{let le={hawkish:0,dovish:0,neutral:0},W=Q.map(({q:R})=>b(R)).filter(Number.isFinite);return Q.forEach(({q:R})=>{let he=R.label in le?R.label:"neutral";le[he]+=1}),{name:H,rows:Q,count:Q.length,toneCounts:le,minYear:W.length?Math.min(...W):"\u2014",maxYear:W.length?Math.max(...W):"\u2014"}}).sort((H,Q)=>Q.count-H.count||H.name.localeCompare(Q.name,"es"));r.textContent=`Muestra visual \xB7 ${w.length} voces \xB7 ${i.length-P} fragmentos${P?` \xB7 ${P} fuera del per\xEDodo`:""}`,n.innerHTML="";let I=[],O=null,te={hawkish:"hawkish (restrictiva)",dovish:"dovish (expansiva)",neutral:"neutral"},D="http://www.w3.org/2000/svg",G=(H,Q={})=>{let le=document.createElementNS(D,H);return Object.entries(Q).forEach(([W,R])=>le.setAttribute(W,String(R))),le},X=H=>{if(!H||!H.length)return null;let Q=H.slice().sort((le,W)=>{let R=String(le.q.date||le.q.year||""),he=String(W.q.date||W.q.year||"");return R.localeCompare(he)||le.index-W.index});return Q[Math.floor((Q.length-1)/2)]},z=H=>X_.map(Q=>{let le=H.rows.filter(R=>Q.terms.some(he=>Nh(R.normalizedText,he))),W=Q.terms.map(R=>({term:R,count:H.rows.filter(he=>Nh(he.normalizedText,R)).length})).filter(R=>R.count>0).sort((R,he)=>he.count-R.count||R.term.localeCompare(he.term,"es"));return{definition:Q,rows:le,value:H.count?le.length/H.count*100:0,termCounts:W}});function V(H,Q){v.innerHTML="";let le=150,W=128,R=82,he=H.length,pe=U=>-Math.PI/2+U/he*Math.PI*2,ye=(U,M,y=R*(M/100))=>{let B=pe(U);return[le+Math.cos(B)*y,W+Math.sin(B)*y]},$=U=>H.map((M,y)=>ye(y,100,U).join(",")).join(" ");[.25,.5,.75,1].forEach(U=>{v.appendChild(G("polygon",{class:"radar-ring",points:$(R*U)}))}),H.forEach((U,M)=>{let[y,B]=ye(M,100);v.appendChild(G("line",{class:"radar-axis",x1:le,y1:W,x2:y,y2:B}))});let ue=G("polygon",{class:"radar-shape",points:H.map((U,M)=>ye(M,U.value).join(",")).join(" ")});v.appendChild(ue),H.forEach((U,M)=>{let[y,B]=ye(M,U.value);v.appendChild(G("circle",{class:"radar-point",cx:y,cy:B,r:3.5}));let[K,Z]=ye(M,100,R+23),ee=G("text",{class:"radar-label",x:K,y:Z+(Z<W?-2:4),"text-anchor":K<le-8?"end":K>le+8?"start":"middle"});ee.textContent=U.definition.short,v.appendChild(ee)}),v.appendChild(G("circle",{cx:le,cy:W,r:2,fill:"rgba(255,255,255,0.65)"})),v.setAttribute("aria-label",`Perfil tem\xE1tico de ${Q}. Cada eje muestra el porcentaje de sus fragmentos con una menci\xF3n directa.`),gsap.fromTo(ue,{opacity:0,scale:.92,transformOrigin:`${le}px ${W}px`},{opacity:1,scale:1,duration:.55,ease:"cinematicOut"})}let j=null,ce=null;function se(H,Q){let le=X(Q)||X(H.rows);le&&(T.textContent=`\u201C${le.q.text||"Sin texto disponible"}\u201D`,A.textContent=`\u2014 ${le.q.participant||H.name}, ${le.q.formatted_date||le.q.date||le.q.year||"fecha no especificada"}`)}function F(H,Q=null){if(!H)return;let le=z(H);m.textContent=H.name,f.textContent=`${H.count} ${H.count===1?"intervenci\xF3n":"intervenciones"} \xB7 ${H.minYear}\u2013${H.maxYear} \xB7 cada eje = proporci\xF3n de fragmentos con menci\xF3n directa`,V(le,H.name),_.innerHTML="",le.forEach(R=>{let he=document.createElement("button");he.type="button",he.className="voice-topic-row"+(R.definition.id===Q?" is-active":""),he.setAttribute("aria-pressed",String(R.definition.id===Q)),he.setAttribute("aria-label",`${R.definition.label}: ${Math.round(R.value)} por ciento de los fragmentos`),he.innerHTML=`
        <span class="voice-topic-row-top"><span></span><strong></strong></span>
        <span class="voice-topic-meter"><i></i></span>
        <span class="voice-topic-terms"></span>`,he.querySelector(".voice-topic-row-top span").textContent=R.definition.label,he.querySelector(".voice-topic-row-top strong").textContent=`${Math.round(R.value)}%`,he.querySelector(".voice-topic-meter i").style.width=`${R.value}%`,he.querySelector(".voice-topic-terms").textContent=R.termCounts.length?R.termCounts.slice(0,3).map(pe=>pe.term).join(" \xB7 "):"sin coincidencia directa en la muestra",he.addEventListener("click",()=>F(H,R.definition.id)),_.appendChild(he)});let W=le.find(R=>R.definition.id===Q);se(H,W?.rows||H.rows)}function N(H){H&&(F(H),ce=document.activeElement,g.hidden=!1,g.setAttribute("aria-hidden","false"),document.body.classList.add("voice-profile-modal-open"),requestAnimationFrame(()=>g.classList.add("is-open")),x.focus({preventScroll:!0}))}function q(){g.hidden||(g.classList.remove("is-open"),g.setAttribute("aria-hidden","true"),document.body.classList.remove("voice-profile-modal-open"),clearTimeout(j),j=setTimeout(()=>{g.hidden=!0,ce&&typeof ce.focus=="function"&&ce.focus({preventScroll:!0}),ce=null},340))}x.addEventListener("click",q),g.querySelectorAll("[data-voice-profile-close]").forEach(H=>H.addEventListener("click",q)),window.addEventListener("keydown",H=>{H.key==="Escape"&&!g.hidden&&(H.preventDefault(),q())});function de(H){if(ie&&(ie.hidden=!H),!H){o.hidden=!1,s.hidden=!0,rn.quoteIndex=-1;return}let Q=X(H.rows),le=[`${H.toneCounts.hawkish} ${te.hawkish}`,`${H.toneCounts.dovish} ${te.dovish}`,`${H.toneCounts.neutral} neutral${H.toneCounts.neutral===1?"":"es"}`].join(" \xB7 ");o.hidden=!0,s.hidden=!1,a.textContent=H.name,c.textContent=`${H.count} ${H.count===1?"intervenci\xF3n":"intervenciones"} en la muestra \xB7 ${H.minYear}\u2013${H.maxYear}`,l.textContent=`Se\xF1ales detectadas en sus fragmentos: ${le}.`,u.textContent=`\u201C${Q.q.text||"Sin texto disponible"}\u201D`,d.textContent=`\u2014 ${Q.q.participant||H.name}, ${Q.q.formatted_date||Q.q.date||Q.q.year||"fecha no especificada"}`,rn.quoteIndex=Q.index}function _e(H){O=O===H?null:H,rn.participant=O,O&&(rn.rendered=O),I.forEach(({card:Q,voice:le})=>{let W=le.name===O;Q.setAttribute("aria-pressed",String(W))}),de(O?w.find(Q=>Q.name===O):null),typeof t=="function"&&t()}let ie=document.getElementById("voiceDetailClear");ie&&ie.addEventListener("click",()=>{_e(O),ie.focus({preventScroll:!0})}),window.addEventListener("focus-clear",()=>{O&&(O=null,Tl(),I.forEach(({card:H})=>H.setAttribute("aria-pressed","false")),de(null))}),p.addEventListener("click",()=>{let H=O?w.find(Q=>Q.name===O):null;N(H)}),w.forEach((H,Q)=>{let le=document.createElement("div");le.setAttribute("role","listitem"),le.className="voice-card-item";let W=document.createElement("button");W.type="button",W.className="voice-card",W.setAttribute("aria-pressed","false"),W.setAttribute("aria-label",`Seleccionar ${H.name}: ${H.count} ${H.count===1?"intervenci\xF3n":"intervenciones"} entre ${H.minYear} y ${H.maxYear}.`),W.innerHTML=`
      <span class="voice-card-index"></span>
      <span class="voice-card-name"></span>
      <span class="voice-card-meta"></span>
      <span class="voice-card-years"></span>
      <span class="voice-signal-bar" aria-hidden="true">
        <i class="hawkish"></i><i class="dovish"></i><i class="neutral"></i>
      </span>`,W.querySelector(".voice-card-index").textContent=String(Q+1).padStart(2,"0"),W.querySelector(".voice-card-name").textContent=H.name,W.querySelector(".voice-card-meta").textContent=`${H.count} ${H.count===1?"intervenci\xF3n":"intervenciones"}`,W.querySelector(".voice-card-years").textContent=`${H.minYear}\u2013${H.maxYear}`,["hawkish","dovish","neutral"].forEach(R=>{W.querySelector(`.voice-signal-bar .${R}`).style.width=`${H.toneCounts[R]/H.count*100}%`}),W.addEventListener("click",()=>_e(H.name)),le.appendChild(W),n.appendChild(le),I.push({card:W,voice:H})}),h.addEventListener("click",()=>{rn.quoteIndex<0||(Rn(rn.quoteIndex),e(rn.quoteIndex,{x:window.innerWidth*.54,y:window.innerHeight*.62}))})}var Y_=Ti(()=>{fs();Rl();ms()});var j_={};Mo(j_,{initD3Axes:()=>_b});function _b({quotes:i,openQuote:e}){let t=document.getElementById("d3-canvas");if(!t)return;t.innerHTML="";let n=ti(),r=n.width,o=n.height,s=d3.select(t).append("svg").attr("width",r).attr("height",o).attr("role","img").attr("aria-label","Mapa de intervenciones: cada punto conserva su fecha, participante y fragmento").style("position","absolute").style("inset","0"),a={top:o*(r<640?.34:.28),right:r*.15,bottom:o*.18,left:r*.15},c=r-a.left-a.right,l=o-a.top-a.bottom,u=Nr(i),d=d3.scaleTime().domain([new Date(u.start,0,1),new Date(u.end,11,31)]).range([a.left,r-a.right]),h=d3.scaleLinear().domain([-1,1]).range([a.top+l,a.top]);lo.scales={xScale:d,yScale:h};let p=a.top+l/2,g=s.append("g");g.append("rect").attr("class","axes-plot-field").attr("x",a.left).attr("y",a.top).attr("width",c).attr("height",l).attr("rx",Math.min(8,r*.01));let x=r<500?4:r<900?6:8;g.append("g").attr("class","axes-grid").selectAll(".axes-grid-vertical").data(d.ticks(x)).join("line").attr("class","axes-grid-vertical").attr("x1",I=>d(I)).attr("x2",I=>d(I)).attr("y1",a.top).attr("y2",a.top+l),[-.5,.5].forEach(I=>{g.append("line").attr("class","axes-grid-guide").attr("x1",a.left).attr("x2",r-a.right).attr("y1",h(I)).attr("y2",h(I))}),g.append("line").attr("class","axes-zero-line").attr("x1",a.left).attr("x2",r-a.right).attr("y1",p).attr("y2",p);let f=new Date(u.start,0,1).getTime(),v=new Date(u.end,11,31).getTime(),_=i.map((I,O)=>({q:I,index:O,date:new Date(I.date)})).filter(({date:I})=>I.getTime()>=f&&I.getTime()<=v);s.append("g").attr("class","axes-data-layer").selectAll(".axes-data-point").data(_,I=>I.index).join(I=>{let O=I.append("g").attr("class","axes-data-mark");return O.append("circle").attr("class","axes-data-hit").attr("r",14).attr("fill","transparent").attr("pointer-events","all"),O.append("circle").attr("class","axes-data-halo"),O.append("circle").attr("class","axes-data-point"),O}).attr("transform",({q:I,date:O})=>`translate(${d(O)}, ${h(Al(I))})`).attr("data-quote-index",({index:I})=>I).attr("class",({q:I})=>`axes-data-mark axes-data-mark--${I.label||"neutral"}`).attr("tabindex","0").attr("role","button").attr("aria-label",({q:I})=>`Abrir intervenci\xF3n ${I.label||"neutral"} de ${I.participant||"participante an\xF3nimo"}, ${I.formatted_date||I.date||I.year||"fecha no especificada"}`).on("keydown",(I,O)=>{I.key!=="Enter"&&I.key!==" "||(I.preventDefault(),Cn.card=I.currentTarget,Rn(O.index),e(O.index,{x:window.innerWidth*.55,y:window.innerHeight*.58}))}).on("click",(I,O)=>{I.stopPropagation(),Cn.card=I.currentTarget,Rn(O.index),e(O.index,{x:I.clientX,y:I.clientY})}).each(function({q:I}){let te=2.8+Ih(Number(I.score)||.7,0,1)*2.1,D=d3.select(this);D.select(".axes-data-halo").attr("r",te*1.9).attr("class",`axes-data-halo axes-data-halo--${I.label||"neutral"}`),D.select(".axes-data-point").attr("r",te).attr("class",`axes-data-point axes-data-point--${I.label||"neutral"}`)});let b=d3.axisBottom(d).ticks(x).tickSizeOuter(0).tickFormat(d3.timeFormat("%Y")),S=g.append("g").attr("class","axes-x-axis").attr("transform",`translate(0, ${p})`).call(b);S.selectAll("text").attr("dy","1.55em").style("fill","rgba(255,255,255,0.48)").style("font-family","var(--font-body)").style("font-size",r<500?"10px":"12px").style("letter-spacing","0.2px"),S.selectAll(".domain, .tick line").style("stroke","rgba(255,255,255,0.13)");let P=r<640,E=P?10:a.left-16,w=P?"start":"end";return s.append("text").attr("x",E).attr("y",a.top-12).attr("text-anchor",w).style("fill","rgba(255,215,106,0.82)").style("font-size",r<500?"11px":"13px").style("letter-spacing","2px").style("text-transform","uppercase").text("Hawkish \u2191"),s.append("text").attr("x",E).attr("y",a.top+l+20).attr("text-anchor",w).style("fill","rgba(138,180,248,0.82)").style("font-size",r<500?"11px":"13px").style("letter-spacing","2px").style("text-transform","uppercase").text("Dovish \u2193"),lo.scales}var $_=Ti(()=>{fs();ga();ms()});var K_={};Mo(K_,{initWordEvolution:()=>vb});function yb(){ya.forEach(i=>{try{i()}catch{}}),ya.length=0}function vb(i=gs){gs=i;let e=document.getElementById("wordEvolutionSvg"),t=document.querySelector(".word-evolution-intro"),n=document.getElementById("wordEvolutionBoard"),r=document.getElementById("wordEvolutionYear"),o=document.getElementById("wordEvolutionReadout");if(!e||!t||!n||!r||!o||!gs.length||!window.d3)return;yb(),d3.select(e).selectAll("*").remove(),e.removeAttribute("viewBox");let{start:s,end:a}=Nr(gs),c=d3.range(s,a+1),l=["hawkish","dovish"],u=["inflaci\xF3n","precios","expectativas","tasa","tasas","aumento","subir","mantener","bajar","alza","riesgo","crecimiento","actividad","demanda","producto","contexto","escenario","internacional","mercado","mercados","empresas","hogares","endeudamiento","petr\xF3leo","cobre","energ\xEDa","alimentos","empleo","salarios","fiscal","gasto","presupuesto","d\xE9ficit","consumo","inversi\xF3n","exportaciones","importaciones"].map(yi),d=new Set(u),h=new Set(["para","como","desde","entre","sobre","esta","este","estas","estos","tambi\xE9n","tambien","cada","cuando","donde","se\xF1ala","senala","indica","se\xF1or","senor","presidente","consejero","gerente","gerencia","divisi\xF3n","division","estudios","reuni\xF3n","reunion","anterior","opci\xF3n","opciones","oportunidad","respecto","puntos","base","parte","lugar","forma","manera","mayor","menor","dado","considera","elementos","siguiente","siguientes","adem\xE1s","ademas","aunque","ellos","ellas","ello","hasta","hace","tiene","tienen","puede","podr\xEDa","podria","ser\xEDa","seria","chile","banco","central","pol\xEDtica","politica","monetaria","fragmento","intervenci\xF3n","intervencion","acta","actas","muestra"].map(yi)),p=new Set(gs.flatMap(F=>yi(F.participant).match(/[a-zñ]{4,}/g)||[])),g={hawkish:new Map,dovish:new Map},x={hawkish:new Map,dovish:new Map},m={inflacion:"inflaci\xF3n",precios:"precios",expectativas:"expectativas",tasa:"tasa",tasas:"tasas",aumento:"aumento",subir:"subir",mantener:"mantener",bajar:"bajar",alza:"alza",riesgo:"riesgo",crecimiento:"crecimiento",actividad:"actividad",demanda:"demanda",producto:"producto",contexto:"contexto",escenario:"escenario",internacional:"internacional",mercado:"mercado",mercados:"mercados",empresas:"empresas",hogares:"hogares",endeudamiento:"endeudamiento",petroleo:"petr\xF3leo",cobre:"cobre",energia:"energ\xEDa",alimentos:"alimentos",empleo:"empleo",salarios:"salarios",fiscal:"fiscal",gasto:"gasto",presupuesto:"presupuesto",deficit:"d\xE9ficit",consumo:"consumo",inversion:"inversi\xF3n",exportaciones:"exportaciones",importaciones:"importaciones"},f=F=>{let N=String(F.date||"").match(/^(\d{4})/);return Number(N?N[1]:F.year)};gs.forEach(F=>{let N=l.includes(F.label)?F.label:null,q=f(F);if(!N||!c.includes(q))return;g[N].set(q,(g[N].get(q)||0)+1),new Set((yi(F.text).match(/[a-zñ]{4,}/g)||[]).filter(_e=>d.has(_e)&&!h.has(_e)&&!p.has(_e))).forEach(_e=>{x[N].has(_e)||x[N].set(_e,new Map);let ie=x[N].get(_e);ie.set(q,(ie.get(q)||0)+1)})});let v={};l.forEach(F=>{v[F]=[...x[F].entries()].map(([N,q])=>({term:N,total:[...q.values()].reduce((de,_e)=>de+_e,0),yearly:q})).sort((N,q)=>q.total-N.total||N.term.localeCompare(q.term,"es")).slice(0,3)});let _=e.parentElement,T=_?.getBoundingClientRect(),A=Math.max(280,Math.round(T?.width||e.clientWidth||1e3)),b=Math.max(180,Math.round(T?.height||e.clientHeight||450)),S=A<520||b<240,P=S?{top:b<220?31:36,right:A<360?74:84,bottom:b<220?25:30,left:A<360?34:48}:{top:42,right:128,bottom:42,left:72},E=S?b<220?25:34:42,w=(b-P.top-P.bottom-E)/2,I=d3.scaleLinear().domain([s,a]).range([P.left,A-P.right]),O=d3.select(e).attr("viewBox",`0 0 ${A} ${b}`).attr("preserveAspectRatio","xMidYMid meet"),te=O.append("g").attr("class","word-chart-group"),D=O.append("line").attr("class","word-cursor").attr("x1",I(s)).attr("x2",I(s)).attr("y1",P.top-4).attr("y2",b-P.bottom+3),G=[],X=(F,N,q)=>{let de=N.yearly.get(q)||0,_e=g[F].get(q)||0;return _e?de/_e*100:0};l.forEach((F,N)=>{let q=P.top+N*(w+E),de=q+w,_e=v[F],ie=Math.max(20,..._e.flatMap(ue=>c.map(U=>X(F,ue,U)))),H=d3.scaleLinear().domain([0,ie]).range([de,q]),Q=te.append("g").attr("class",`word-lane word-lane--${F}`);Q.append("text").attr("class",`word-lane-label ${F}`).attr("x",P.left).attr("y",q-14).text(F==="hawkish"?"Hawkish \xB7 restrictiva":"Dovish \xB7 expansiva"),[0,ie/2,ie].forEach(ue=>{Q.append("line").attr("class",ue===0?"word-zero-line":"word-grid-line").attr("x1",P.left).attr("x2",A-P.right).attr("y1",H(ue)).attr("y2",H(ue))}),Q.append("text").attr("class","word-axis-label").attr("x",P.left-10).attr("y",de+4).attr("text-anchor","end").text("0%"),Q.append("text").attr("class","word-axis-label").attr("x",P.left-10).attr("y",q+4).attr("text-anchor","end").text(`${Math.round(ie)}%`);let le=S?13:15,W=q+(S?9:11),R=de-(S?3:4),he=new Map,pe=_e.map((ue,U)=>{let M=X(F,ue,a);return{rank:U,desired:H(M)+(U-1)*le}}).sort((ue,U)=>ue.desired-U.desired),ye=W;pe.forEach(ue=>{let U=Math.max(ye,Math.min(R,ue.desired));he.set(ue.rank,U),ye=U+le});let $=ye-le-R;$>0&&pe.forEach(ue=>he.set(ue.rank,he.get(ue.rank)-$)),_e.forEach((ue,U)=>{let M=c.map(ee=>({year:ee,value:X(F,ue,ee)})),y=d3.line().x(ee=>I(ee.year)).y(ee=>H(ee.value)).curve(d3.curveMonotoneX),B=Q.append("path").attr("class",`word-path ${F}`).attr("d",y(M)).attr("stroke-width",U===0?2.7:1.8).style("opacity",U===0?1:U===1?.68:.42),K=B.node();if(K){let ee=K.getTotalLength();B.attr("stroke-dasharray",ee).attr("stroke-dashoffset",ee).attr("data-length",ee)}M.forEach(ee=>{Q.append("circle").attr("class",`word-point ${F}`).attr("cx",I(ee.year)).attr("cy",H(ee.value)).attr("r",U===0?2.8:2).style("opacity",U===0?.95:U===1?.58:.36)});let Z=M[M.length-1];Q.append("text").attr("class",`word-end-label ${F}`).attr("x",I(Z.year)+8).attr("y",he.get(U)+4).text(m[ue.term]||ue.term),G.push({label:F,term:ue.term,values:M,path:K})})}),c.forEach(F=>{(S?F===s||F===a||(F-s)%5===0:(F-s)%3===0||F===a)&&O.append("text").attr("class","word-axis-label").attr("x",I(F)).attr("y",b-12).attr("text-anchor","middle").text(F)});let z=(F,N=1)=>{let q=Math.round(d3.max([s,Math.min(a,F)]));r.textContent=q,D.attr("x1",I(q)).attr("x2",I(q)),G.forEach(_e=>{if(!_e.path)return;let ie=Number(_e.path.getAttribute("data-length")||0);_e.path.style.strokeDashoffset=String(ie*(1-N))});let de=l.map(_e=>{let ie=G.filter(H=>H.label===_e).map(H=>{let Q=H.values.find(le=>le.year===q);return`${m[H.term]||H.term} ${Math.round(Q?.value||0)}%`}).join(" \xB7 ");return`${_e==="hawkish"?"Hawkish":"Dovish"}: ${ie||"sin registros"}`}).join("   /   ");o.textContent=de||"No hay t\xE9rminos suficientes en la muestra disponible."};z(s,0);let V=F=>{let N=e.getBoundingClientRect(),q=(F.clientX-N.left)/N.width*A;z(I.invert(q),1)},j=()=>z((s+a)/2,1);e.addEventListener("pointermove",V),_?.addEventListener("pointerleave",j),ya.push(()=>{e.removeEventListener("pointermove",V),_?.removeEventListener("pointerleave",j)});let ce=gsap.timeline({scrollTrigger:{trigger:"#stageWordEvolution",start:"top 85%",end:"bottom bottom",scrub:!0}}).fromTo(t,{opacity:0,y:18},{opacity:1,y:0,duration:.12,ease:"none"},.04).fromTo(n,{opacity:0,y:24},{opacity:1,y:0,duration:.15,ease:"none"},.16).to(t,{opacity:0,y:-14,duration:.08,ease:"none"},.9);ya.push(()=>{try{ce.scrollTrigger?.kill()}catch{}try{ce.kill()}catch{}});let se=ScrollTrigger.create({trigger:"#stageWordEvolution",start:"top 85%",end:"bottom bottom",scrub:!0,onUpdate:F=>{let N=d3.min([1,d3.max([0,(F.progress-.08)/.52])]);z(s+F.progress*(a-s),N)}});ya.push(()=>se.kill())}var gs,ya,Z_=Ti(()=>{Rl();ms();gs=[],ya=[]});var J_={};Mo(J_,{initActBrowser:()=>Eb});function Eb({quotes:i,openQuote:e}){let t=document.getElementById("actsList"),n=document.getElementById("actsIndexMeta"),r=document.getElementById("actYearFilter"),o=document.getElementById("actReader"),s=document.getElementById("actReaderEmpty"),a=null,c=()=>{a=null,o.classList.add("is-empty"),s&&(s.hidden=!1),W.forEach(({button:U})=>U.setAttribute("aria-current","false")),window.dispatchEvent(new CustomEvent("particle-act-focus",{detail:{date:null}}))},l=document.getElementById("actDate"),u=document.getElementById("actDateSub"),d=document.getElementById("actEra"),h=document.getElementById("actSignalName"),p=document.getElementById("actSignalCount"),g=document.getElementById("actSignalExplanation"),x=document.getElementById("actParticipants"),m=document.getElementById("actTermNetwork"),f=document.getElementById("actTermList"),v=document.getElementById("actEvidenceList"),_=document.getElementById("actEvidenceMeta"),T=document.getElementById("actEvidenceQuote"),A=document.getElementById("actEvidenceCitation"),b=document.getElementById("actOpenEvidence"),S=document.getElementById("actsBrowser"),P=document.querySelector(".acts-intro");if(!t||!n||!r||!l||!u||!d||!h||!p||!g||!x||!m||!f||!v||!_||!T||!A||!b||!S||!P||!i.length)return;let E=[{key:"inflacion",label:"inflaci\xF3n"},{key:"precios",label:"precios"},{key:"expectativas",label:"expectativas"},{key:"tasa",label:"tasa"},{key:"tasas",label:"tasas"},{key:"aumento",label:"aumento"},{key:"alza",label:"alza"},{key:"subir",label:"subir"},{key:"mantener",label:"mantener"},{key:"bajar",label:"bajar"},{key:"riesgo",label:"riesgo"},{key:"crecimiento",label:"crecimiento"},{key:"actividad",label:"actividad"},{key:"demanda",label:"demanda"},{key:"producto",label:"producto"},{key:"contexto",label:"contexto"},{key:"escenario",label:"escenario"},{key:"internacional",label:"internacional"},{key:"mercado",label:"mercado"},{key:"mercados",label:"mercados"},{key:"petr\xF3leo",label:"petr\xF3leo"},{key:"cobre",label:"cobre"},{key:"energ\xEDa",label:"energ\xEDa"},{key:"alimentos",label:"alimentos"},{key:"empleo",label:"empleo"},{key:"salarios",label:"salarios"},{key:"gasto",label:"gasto"},{key:"presupuesto",label:"presupuesto"},{key:"d\xE9ficit",label:"d\xE9ficit"},{key:"consumo",label:"consumo"},{key:"inversi\xF3n",label:"inversi\xF3n"}].map(U=>({...U,normalized:yi(U.key)})),w=[{id:"E1",name:"Fiebre",from:2005,to:2007},{id:"E2",name:"Crisis",from:2008,to:2009},{id:"E3",name:"Normalizaci\xF3n",from:2010,to:2014},{id:"E4",name:"Giro",from:2015,to:2015}],I=w[0].from,O=w[w.length-1].to,te="http://www.w3.org/2000/svg",D=(U,M={})=>{let y=document.createElementNS(te,U);return Object.entries(M).forEach(([B,K])=>y.setAttribute(B,String(K))),y},G=U=>{let M=String(U.date||"").match(/^(\d{4})/);return Number(M?M[1]:U.year)},X=(U,M)=>{let y=U&&/^\d{4}-\d{2}-\d{2}$/.test(U)?new Date(`${U}T00:00:00Z`):null;return!y||Number.isNaN(y.getTime())?M?`A\xF1o ${M}`:"Fecha no especificada":new Intl.DateTimeFormat("es-CL",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(y)},z=()=>window.matchMedia&&window.matchMedia("(max-width: 430px)").matches,V=(U,M)=>{if(!z())return X(U,M);let y=U&&/^\d{4}-\d{2}-\d{2}$/.test(U)?new Date(`${U}T00:00:00Z`):null;if(!y||Number.isNaN(y.getTime()))return X(U,M);let B=new Intl.DateTimeFormat("es-CL",{day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}).formatToParts(y),K=Object.fromEntries(B.filter(Z=>Z.type!=="literal").map(Z=>[Z.type,Z.value]));return`${K.day} ${K.month} ${K.year}`},j=(U,M)=>z()?V(U,M):X(U,M),ce=U=>w.find(M=>U>=M.from&&U<=M.to)||{id:"\u2014",name:"fuera de per\xEDodo"},se=U=>E.filter(M=>U.normalizedText.includes(M.normalized)),F=U=>["hawkish","dovish","neutral"].includes(U.label)?U.label:"neutral",N={hawkish:"Hawkish",dovish:"Dovish",neutral:"Neutral",mixed:"Mixta"},q={hawkish:"restrictiva",dovish:"expansiva",neutral:"sin orientaci\xF3n dominante"},de=new Map,_e=0;i.forEach((U,M)=>{let y=G(U);if(!Number.isFinite(y)||y<I||y>O){_e+=1;return}let B=/^\d{4}-\d{2}-\d{2}$/.test(String(U.date||""))?U.date:`${y}-01-01`;de.has(B)||de.set(B,[]),de.get(B).push({q:U,index:M,normalizedText:yi(U.text)})});let ie=[...de.entries()].map(([U,M])=>{let y=G(M[0].q),B={hawkish:0,dovish:0,neutral:0},K=new Set,Z=new Map;M.forEach(me=>{let xe=F(me.q);B[xe]+=1,K.add(me.q.participant||"Participante an\xF3nimo"),se(me).forEach(Me=>Z.set(Me.normalized,{label:Me.label,count:(Z.get(Me.normalized)?.count||0)+1}))});let ee=Object.entries(B).filter(([,me])=>me>0).sort((me,xe)=>xe[1]-me[1]),ve=ee.length>1&&ee[0][1]===ee[1][1]?"mixed":ee[0]?.[0]||"neutral";return{id:U,date:U,year:y,rows:M,count:M.length,participants:[...K],toneCounts:B,dominantTone:ve,terms:[...Z.entries()].map(([me,xe])=>({key:me,...xe})).sort((me,xe)=>xe.count-me.count||me.label.localeCompare(xe.label,"es"))}}).sort((U,M)=>U.date.localeCompare(M.date));if(!ie.length)return;n.textContent=`Muestra visible: ${ie.length} actas \xB7 ${ie.reduce((U,M)=>U+M.count,0)} fragmentos${_e?` \xB7 ${_e} fuera del per\xEDodo`:""}`,[...new Set(ie.map(U=>U.year))].sort((U,M)=>U-M).forEach(U=>{let M=document.createElement("option");M.value=String(U),M.textContent=U,r.appendChild(M)});let H=null,Q=0,le=null,W=[],R=U=>{m.innerHTML="";let M=U?se(U).slice(0,4):[],y=U?F(U.q):"neutral",B=48,K=43,Z=125,ve=M.length>1?(492-Z)/(M.length-1):0;m.appendChild(D("text",{class:"act-network-caption",x:B,y:12,"text-anchor":"middle"})).textContent="SE\xD1AL",m.appendChild(D("circle",{class:`act-network-signal ${y}`,cx:B,cy:K,r:22}));let me=D("text",{class:"act-network-caption",x:B,y:K+3,"text-anchor":"middle"});if(me.textContent=N[y].toUpperCase(),m.appendChild(me),!M.length){let xe=D("text",{class:"act-network-term",x:108,y:K+4});xe.textContent="sin t\xE9rmino de la taxonom\xEDa visible en este fragmento",m.appendChild(xe),m.setAttribute("aria-label",`La etiqueta ${N[y]} no tiene t\xE9rminos de la taxonom\xEDa visible en este fragmento`);return}M.forEach((xe,Me)=>{let Ee=M.length===1?280:Z+ve*Me,Y=Me%2===0?29:65;m.appendChild(D("line",{class:"act-network-link",x1:B+22,y1:K,x2:Ee-8,y2:Y-3})),m.appendChild(D("circle",{class:"act-network-signal",cx:Ee-8,cy:Y-3,r:3.5}));let Le=D("text",{class:"act-network-term",x:Ee,y:Y,"text-anchor":"middle"});Le.textContent=xe.label,m.appendChild(Le)}),m.setAttribute("aria-label",`${N[y]} conectada con ${M.map(xe=>xe.label).join(", ")}`)},he=(U,M,y=null)=>{if(!U?.rows.length)return;H=U,Q=Math.max(0,Math.min(M,U.rows.length-1)),le=y;let B=U.rows[Q],K=se(B),Z=F(B.q),ee=K.slice(0,z()?3:5).map(me=>me.label),ve=ee.length?`\xAB${ee.join("\xBB, \xAB")}\xBB`:"ning\xFAn t\xE9rmino de la taxonom\xEDa visible";g.textContent=z()?`${ve} acompa\xF1an la etiqueta ${N[Z]} (${q[Z]}).`:`Este fragmento re\xFAne ${ve}; en esta lectura exploratoria, esa evidencia l\xE9xica acompa\xF1a la etiqueta ${N[Z]} (${q[Z]}).`,R(B),[...v.querySelectorAll(".act-evidence-row")].forEach(me=>{me.setAttribute("aria-current",String(Number(me.dataset.rowIndex)===Q))}),[...f.querySelectorAll(".act-term-chip")].forEach(me=>{me.setAttribute("aria-pressed",String(me.dataset.termKey===le))}),T.textContent=`\u201C${B.q.text||"Sin texto disponible"}\u201D`,A.textContent=`\u2014 ${B.q.participant||"Participante an\xF3nimo"}, ${B.q.formatted_date||X(U.date,U.year)}`,b.dataset.quoteIndex=String(B.index)},pe=U=>{if(!U)return;H=U,Q=Math.min(Q,U.rows.length-1),le=null;let M=ce(U.year);l.textContent=V(U.date,U.year),u.textContent=`${U.count} ${U.count===1?"fragmento":"fragmentos"} \xB7 ${U.participants.length} ${U.participants.length===1?"participante":"participantes"}`,d.textContent=`${M.id} \xB7 ${M.name}`,h.textContent=N[U.dominantTone],h.className=`act-signal-name ${U.dominantTone}`;let y=U.dominantTone==="mixed"?Math.max(...Object.values(U.toneCounts)):U.toneCounts[U.dominantTone]||0;if(p.textContent=`${y}/${U.count} fragmentos`,["hawkish","dovish","neutral"].forEach(B=>{let K=document.getElementById(`act${B.charAt(0).toUpperCase()}${B.slice(1)}Bar`);K&&(K.style.width=`${U.toneCounts[B]/U.count*100}%`)}),x.innerHTML="",U.participants.forEach(B=>{let K=document.createElement("span");K.className="act-participant",K.textContent=B,x.appendChild(K)}),f.innerHTML="",U.terms.length)U.terms.slice(0,7).forEach(B=>{let K=document.createElement("button");K.type="button",K.className="act-term-chip",K.dataset.termKey=B.key,K.setAttribute("aria-pressed","false"),K.innerHTML="<span></span><small></small>",K.querySelector("span").textContent=B.label,K.querySelector("small").textContent=B.count,K.addEventListener("click",()=>{let Z=U.rows.findIndex(ee=>se(ee).some(ve=>ve.normalized===B.key));he(U,Z>=0?Z:0,B.key)}),f.appendChild(K)});else{let B=document.createElement("span");B.className="acts-index-meta",B.textContent="sin t\xE9rminos directos en la muestra",f.appendChild(B)}v.innerHTML="",_.textContent=`${U.count} ${U.count===1?"fragmento":"fragmentos"}`,U.rows.forEach((B,K)=>{let Z=document.createElement("button");Z.type="button",Z.className="act-evidence-row",Z.dataset.rowIndex=String(K),Z.setAttribute("role","listitem"),Z.setAttribute("aria-current","false");let ee=document.createElement("span");ee.className="act-evidence-person",ee.textContent=B.q.participant||"Participante an\xF3nimo";let ve=document.createElement("span");ve.className=`act-evidence-tone ${F(B.q)}`,ve.textContent=N[F(B.q)],Z.append(ee,ve),Z.addEventListener("click",()=>he(U,K)),v.appendChild(Z)}),he(U,Q),W.forEach(({button:B,act:K})=>B.setAttribute("aria-current",String(K.id===U.id)))},ye=(U,{alternar:M=!1}={})=>{if(!U)return;if(M&&a===U.id){c();return}a=U.id,o.classList.remove("is-empty"),s.hidden=!0,Q=0,pe(U),window.dispatchEvent(new CustomEvent("particle-act-focus",{detail:{date:U.date}}));let y=W.find(({act:Z})=>Z.id===U.id);if(!y)return;let B=t.getBoundingClientRect(),K=y.button.getBoundingClientRect();K.top<B.top?t.scrollTop+=K.top-B.top:K.bottom>B.bottom&&(t.scrollTop+=K.bottom-B.bottom)},$=(U=r.value)=>{let M=U==="all"?ie:ie.filter(y=>String(y.year)===String(U));if(t.innerHTML="",W.length=0,!M.length){let y=document.createElement("div");y.className="acts-empty",y.textContent="No hay actas disponibles para este a\xF1o.",t.appendChild(y);return}M.forEach(y=>{let B=document.createElement("button");B.type="button",B.className="act-list-item",B.setAttribute("role","listitem"),B.setAttribute("aria-current",String(H?.id===y.id)),B.setAttribute("aria-label",`Abrir acta del ${X(y.date,y.year)}, ${y.count} fragmentos`);let K=document.createElement("i");K.className=`act-tone-dot ${y.dominantTone}`,K.setAttribute("aria-hidden","true");let Z=document.createElement("span"),ee=document.createElement("span");ee.className="act-list-date",ee.textContent=j(y.date,y.year);let ve=document.createElement("span");ve.className="act-list-meta",ve.textContent=`${y.count} ${y.count===1?"fragmento":"fragmentos"} \xB7 ${y.participants.length} ${y.participants.length===1?"voz":"voces"}`,Z.append(ee,ve);let me=document.createElement("span");me.className="act-list-signal",me.textContent=N[y.dominantTone],B.append(K,Z,me),B.addEventListener("click",()=>ye(y,{alternar:!0})),t.appendChild(B),W.push({button:B,act:y})})};b.addEventListener("click",()=>{let U=Number(b.dataset.quoteIndex);!Number.isFinite(U)||!i[U]||(Rn(U),e(U,{x:window.innerWidth*.62,y:window.innerHeight*.62}))}),r.addEventListener("change",()=>{$(r.value);let U=ie.find(M=>r.value==="all"||String(M.year)===r.value);U&&ye(U)}),window.addEventListener("focus-clear",c),$("all");let ue=ie.find(U=>U.date==="2010-05-13")||ie.slice().sort((U,M)=>M.count-U.count||U.date.localeCompare(M.date))[0]||ie[0];ye(ue),gsap.timeline({scrollTrigger:{trigger:"#stageActs",start:"top 85%",end:"bottom bottom",scrub:!0}}).fromTo(P,{opacity:0,y:18},{opacity:1,y:0,duration:.13,ease:"none"},.04).fromTo(S,{opacity:0,y:24},{opacity:1,y:0,duration:.16,ease:"none"},.16).to(P,{opacity:0,y:-14,duration:.08,ease:"none"},.9)}var Q_=Ti(()=>{fs();Rl()});var ey={};Mo(ey,{initResultsDecision:()=>bb});function bb({data:i,openQuote:e}){let t=document.getElementById("resultsDecisionChart"),n=document.getElementById("resultsReadout");if(!t||!n||!i?.actas?.length||!window.d3)return;let r=window.d3,o=ti(),s=o.width<700,a=i.actas.filter(z=>z.decision&&z.decision.accion&&typeof z.score_hd=="number").map(z=>({...z,accion:z.decision.accion})),c=i.puente_muestra?.por_acta||{},l=z=>Array.isArray(c[z.id]?.indices)&&c[z.id].indices.length>0,u=a.length,d=Object.fromEntries(Cl.map(z=>[z.clave,a.filter(V=>V.accion===z.clave)])),h=Math.max(320,t.clientWidth||900),g=o.height<800?s?58:62:s?74:86,x={top:s?46:54,right:s?16:28,bottom:34,left:s?96:150},m=x.top+g*Cl.length+x.bottom,f=a.map(z=>z.score_hd),v=Math.max(.25,Math.ceil(Math.max(...f.map(Math.abs))*20)/20),_=r.scaleLinear().domain([-v,v]).range([x.left,h-x.right]),T=z=>{let V=Math.sin((z+1)*12.9898)*43758.5453;return(V-Math.floor(V)-.5)*(g*.55)},A=r.select(t).append("svg").attr("viewBox",`0 0 ${h} ${m}`).attr("role","img").attr("aria-label",`Tono de la deliberaci\xF3n en las ${u} reuniones, agrupadas por lo que decidi\xF3 el Consejo: ${d.subir.length} subieron la tasa y todas quedaron con tono positivo, ${d.bajar.length} la bajaron y todas con tono negativo, ${d.mantener.length} la mantuvieron alrededor de cero.`).style("width","100%").style("height","auto");A.append("line").attr("x1",_(0)).attr("x2",_(0)).attr("y1",x.top-22).attr("y2",m-x.bottom+6).attr("stroke","rgba(255,255,255,0.22)").attr("stroke-dasharray","4,5");let b=[];Cl.forEach((z,V)=>{let j=d[z.clave],ce=x.top+V*g+g/2,se=j.reduce((F,N)=>F+N.score_hd,0)/(j.length||1);A.append("text").attr("x",s?6:x.left-74).attr("y",ce-6).attr("fill",z.tinta).attr("font-size",s?12:13).attr("font-weight",600).attr("letter-spacing","0.2px").text(z.etiqueta),A.append("text").attr("x",s?6:x.left-74).attr("y",ce+13).attr("fill","rgba(255,255,255,0.42)").attr("font-size",s?11:12).text(`${j.length} ${j.length===1?"reuni\xF3n":"reuniones"}`),A.append("line").attr("x1",x.left).attr("x2",h-x.right).attr("y1",x.top+V*g+g-6).attr("y2",x.top+V*g+g-6).attr("stroke","rgba(255,255,255,0.05)"),j.forEach((F,N)=>{let q=_(F.score_hd),de=ce+T(N+V*37),_e=l(F),ie=A.append("g").attr("class",`results-dot${_e?" results-dot--leible":""}`).attr("data-acta",F.id).attr("transform",`translate(${q}, ${de})`).attr("tabindex",-1);ie.append("circle").attr("class","results-dot-hit").attr("r",_e?11:8).attr("fill","transparent").attr("pointer-events","all"),ie.append("circle").attr("class","results-dot-mark").attr("r",s?3.4:3.8).attr("fill",z.color).attr("fill-opacity",F.h+F.d===0?.35:.9).attr("stroke",_e?"rgba(255,255,255,0.55)":"none").attr("stroke-width",_e?1.1:0),b.push({grupo:ie,acta:F,cfg:z,puede:_e})}),A.append("line").attr("x1",_(se)).attr("x2",_(se)).attr("y1",ce-g*.34).attr("y2",ce+g*.34).attr("stroke",z.tinta).attr("stroke-width",2).attr("stroke-opacity",.85),A.append("text").attr("x",_(se)).attr("y",x.top+V*g+12).attr("text-anchor","middle").attr("fill",z.tinta).attr("font-size",11).attr("font-weight",600).text(Bh(se))});let S=m-x.bottom+22;A.append("line").attr("x1",x.left).attr("x2",h-x.right).attr("y1",S-12).attr("y2",S-12).attr("stroke","rgba(255,255,255,0.09)"),[-v,-v/2,0,v/2,v].forEach(z=>{A.append("text").attr("x",_(z)).attr("y",S+2).attr("text-anchor","middle").attr("fill","rgba(255,255,255,0.4)").attr("font-size",11).text(z===0?"0":Bh(z))}),A.append("text").attr("x",_(-v)).attr("y",S+16).attr("text-anchor","start").attr("fill","rgba(138,180,248,0.75)").attr("font-size",11).text("\u2190 m\xE1s dovish"),A.append("text").attr("x",_(v)).attr("y",S+16).attr("text-anchor","end").attr("fill","rgba(255,215,106,0.75)").attr("font-size",11).text("m\xE1s hawkish \u2192");let P=i.cruce_decision?.con_frase_acuerdo||[],E=P.find(z=>z.accion==="subir"),w=P.find(z=>z.accion==="bajar"),I=z=>{let V=Cl.find(N=>N.clave===z.accion),j=l(z),ce=j?c[z.id].indices[0]:-1;n.innerHTML="";let se=document.createElement("span");se.className="results-readout-fecha",se.textContent=Mb(z.fecha);let F=document.createElement("span");if(F.className="results-readout-decision",F.textContent=`${V.etiqueta.toLowerCase()} \xB7 tono ${Bh(z.score_hd)}`,F.style.color=V.tinta,n.append(se,F),j){let N=document.createElement("button");N.type="button",N.className="results-readout-open",N.textContent="Leer una intervenci\xF3n de esa reuni\xF3n \u2197",N.addEventListener("click",()=>{Cn.card=N,Rn(ce),e(ce,{x:window.innerWidth*.5,y:window.innerHeight*.5})}),n.appendChild(N)}else{let N=document.createElement("span");N.className="results-readout-sin",N.textContent="sin fragmento abrible en esta muestra",n.appendChild(N)}},O=b.find(z=>z.acta.accion==="subir"&&z.puede&&z.acta.score_hd>.15)||b.find(z=>z.puede)||b[0],te=b.filter(z=>z.puede),D=te.indexOf(O)>=0?te.indexOf(O):0,G=(z,V)=>{te.length&&(D=(z+te.length)%te.length,te.forEach((j,ce)=>j.grupo.attr("tabindex",ce===D?0:-1)),V&&te[D].grupo.node().focus(),I(te[D].acta))};G(D,!1),b.forEach(({grupo:z,acta:V,puede:j},ce)=>{z.style("cursor",j?"pointer":"default"),z.on("click",()=>{if(j){let se=te.findIndex(F=>F.acta.id===V.id);G(se,!1)}else I(V)}),z.on("keydown",se=>{se.key==="ArrowRight"||se.key==="ArrowDown"?(se.preventDefault(),G(D+1,!0)):se.key==="ArrowLeft"||se.key==="ArrowUp"?(se.preventDefault(),G(D-1,!0)):(se.key==="Enter"||se.key===" ")&&(se.preventDefault(),document.querySelector(".results-readout-open")?.click())})});let X=document.getElementById("resultsSummary");X&&E&&w&&(X.textContent=`${E.signo_coherente} de ${E.n} la subieron \xB7 ${w.signo_coherente} de ${w.n} la bajaron`)}var Cl,Bh,Mb,ty=Ti(()=>{fs();ga();Cl=[{clave:"subir",etiqueta:"Subi\xF3 la tasa",color:"var(--color-gold)",tinta:"#ffd76a"},{clave:"mantener",etiqueta:"La mantuvo",color:"rgba(223,229,240,0.9)",tinta:"#cfd6e4"},{clave:"bajar",etiqueta:"Baj\xF3 la tasa",color:"var(--color-dovish)",tinta:"#8ab4f8"}],Bh=i=>`${i>=0?"+":"\u2212"}${Math.abs(i).toFixed(2).replace(".",",")}`,Mb=i=>{let[e,t,n]=i.split("-").map(Number);return`${n} de ${["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"][t-1]} de ${e}`}});var ny={};Mo(ny,{initTimeline:()=>Tb});function Tb(i=[]){Fh=i;let e=document.querySelector("[data-timeline-title]");gsap.fromTo(e,{opacity:0,y:20},{opacity:1,y:0,duration:.8,ease:"cinematicOut",scrollTrigger:{trigger:e,start:"top 80%",toggleActions:"play none none reverse"}});let t=!1,n,r;function o(){let a=document.getElementById("timelineContainer");if(!a)return;t&&d3.select(a).selectAll("*").remove(),t=!0;let c=ti(),l=c.height<620,u=Math.min(1060,c.width-40),d=l?Math.max(230,Math.min(300,c.height-132)):320,h=l?{top:24,right:18,bottom:44,left:42}:{top:40,right:30,bottom:60,left:50},p=u-h.left-h.right,g=d-h.top-h.bottom,x=d3.select(a).append("svg").attr("width",u).attr("height",d).attr("viewBox",`0 0 ${u} ${d}`).attr("role","img").attr("aria-label","\xCDndice exploratorio de orientaci\xF3n por a\xF1o, agregado desde los fragmentos visibles").attr("aria-describedby","timelineNote").style("max-width","100%").style("height","auto"),m=x.append("g").attr("transform",`translate(${h.left},${h.top})`),{start:f,end:v}=Nr(Fh),_=d3.range(f,v+1),T=new Map(_.map(F=>[F,{year:F,hawkish:0,dovish:0,neutral:0,total:0}])),A=F=>{let N=String(F.date||"").match(/^(\d{4})/);return Number(N?N[1]:F.year)};Fh.forEach(F=>{let N=A(F),q=T.get(N);if(!q)return;let de=["hawkish","dovish","neutral"].includes(F.label)?F.label:"neutral";q[de]+=1,q.total+=1});let b=_.filter(F=>T.get(F).total>0).map(F=>{let N=T.get(F);return{...N,date:new Date(F,6,1),value:(N.hawkish-N.dovish)/N.total,hasSample:!0}}),S=_.filter(F=>T.get(F).total===0),P=F=>{let N=[];return F.forEach(q=>{let de=N[N.length-1];de&&q===de[1]+1?de[1]=q:N.push([q,q])}),N.map(([q,de])=>q===de?String(q):`${q}\u2013${de}`).join(", ")},E=new Date(f,0,1),w=new Date(v,11,31),I=d3.scaleTime().domain([E,w]).range([0,p]),O=d3.scaleLinear().domain([-1,1]).range([g,0]),te=u<520?4:2,D=_.filter((F,N)=>N%te===0||F===v).map(F=>new Date(F,6,1));m.append("g").attr("transform",`translate(0,${g})`).call(d3.axisBottom(I).tickValues(D).tickFormat(d3.timeFormat("%Y"))).selectAll("text").style("fill","#e8ecf5").style("font-size","clamp(14px, 1.25vw, 16px)"),m.selectAll(".domain, .tick line").style("stroke","rgba(255,255,255,0.12)"),m.append("g").call(d3.axisLeft(O).ticks(5).tickFormat(F=>F>0?`+${F}`:F)).selectAll("text").style("fill","#e8ecf5").style("font-size","clamp(14px, 1.25vw, 16px)"),m.selectAll(".domain").style("stroke","none"),m.selectAll(".tick line").style("stroke","rgba(255,255,255,0.06)"),m.append("line").attr("x1",0).attr("x2",p).attr("y1",O(0)).attr("y2",O(0)).style("stroke","rgba(255,255,255,0.15)").style("stroke-dasharray","4,4");let G=x.append("defs").append("linearGradient").attr("id","lineGrad").attr("x1","0%").attr("x2","100%");G.append("stop").attr("offset","0%").attr("stop-color","#8ab4f8"),G.append("stop").attr("offset","50%").attr("stop-color","#ffd76a"),G.append("stop").attr("offset","100%").attr("stop-color","#8ab4f8");let X=_.map(F=>T.get(F).total>0?b.find(N=>N.year===F):{year:F,date:new Date(F,6,1),value:null,hasSample:!1}),z=d3.line().defined(F=>F.hasSample).x(F=>I(F.date)).y(F=>O(F.value)).curve(d3.curveLinear);n=m.append("path").datum(X).attr("fill","none").attr("stroke","url(#lineGrad)").attr("stroke-width",2.5).attr("d",z),r=n.node().getTotalLength(),n.attr("stroke-dasharray",r).attr("stroke-dashoffset",r);let V=F=>F.value>0?"#ffd76a":F.value<0?"#8ab4f8":"#cfd6e4";if(m.append("g").attr("class","timeline-points").selectAll("circle").data(b).enter().append("circle").attr("class","timeline-point").attr("cx",F=>I(F.date)).attr("cy",F=>O(F.value)).attr("r",4).style("fill",V).style("stroke","#0a0e1a").style("stroke-width",2).style("opacity",.95).append("title").text(F=>`${F.year}: \xEDndice ${F.value>=0?"+":""}${F.value.toFixed(2)} \xB7 ${F.total} fragmentos (H ${F.hawkish} / D ${F.dovish} / N ${F.neutral})`),m.append("text").attr("class","timeline-direction timeline-direction--high").attr("x",0).attr("y",11).text("hawkish +"),m.append("text").attr("class","timeline-direction timeline-direction--low").attr("x",0).attr("y",g-8).text("dovish \u2212"),S.length){let F=m.append("g").attr("class","timeline-absence");F.selectAll("line").data(S).enter().append("line").attr("x1",N=>I(new Date(N,6,1))).attr("x2",N=>I(new Date(N,6,1))).attr("y1",g-3).attr("y2",g+8),F.append("text").attr("x",d3.mean(S,N=>I(new Date(N,6,1)))).attr("y",g+36).attr("text-anchor","middle").text(`sin muestra: ${P(S)}`)}let ce=[{date:new Date(2008,8),label:"Crisis financiera externa"}],se=m.selectAll(".ev").data(ce).enter().append("g").attr("class","ev");se.append("line").attr("x1",F=>I(F.date)).attr("x2",F=>I(F.date)).attr("y1",0).attr("y2",g).style("stroke","rgba(255,215,106,0.25)").style("stroke-dasharray","3,3"),se.append("text").attr("x",F=>I(F.date)).attr("y",-8).attr("text-anchor","middle").style("font-size","clamp(14px, 1.25vw, 16px)").style("fill","#ffd76a").style("opacity",.7).text(F=>F.label),gsap.to(a,{opacity:1,duration:.3})}ScrollTrigger.create({trigger:"#stageTimeline",start:"top 80%",onEnter:o,onEnterBack:o});let s;window.addEventListener("resize",()=>{clearTimeout(s),s=setTimeout(()=>{t&&o()},200)}),ScrollTrigger.create({trigger:"#stageTimeline",start:"top top",end:"+=120%",pin:".timeline-pin-wrapper",scrub:1,onUpdate:a=>{n&&n.attr("stroke-dashoffset",r*(1-a.progress))}})}var Fh,iy=Ti(()=>{ga();ms();Fh=[]});var Qf=0,Eu=1,ep=2;var Ga=1,tp=2,ri=3,Zt=0,bt=1,It=2;var Wn=0,ki=1,fr=2,Mu=3,Fs=4,np=5,zi=100,ip=101,rp=102,bu=103,Tu=104,op=200,sp=201,ap=202,cp=203,Os=204,Hs=205,lp=206,up=207,dp=208,hp=209,fp=210,pp=211,mp=212,gp=213,xp=214,_p=0,yp=1,vp=2,bo=3,Ep=4,Mp=5,bp=6,Tp=7,Va=0,Sp=1,wp=2,Xn=0,Ap=1,Rp=2,Cp=3,Wa=4,Lp=5,Pp=6,Su="attached",Ip="detached",wu=300,oi=301,Si=302,ks=303,zs=304,pr=306,si=1e3,Ot=1001,Wr=1002,Tt=1003,Gs=1004;var To=1005;var Bt=1006,Xa=1007;var qn=1008;var Nn=1009,Dp=1010,Up=1011,So=1012,qa=1013,Bn=1014,gn=1015,Gi=1016,Ya=1017,ja=1018,Yn=1020,Np=1021,Ht=1023,Bp=1024,Fp=1025,ai=1026,wi=1027,Op=1028,$a=1029,Hp=1030,Ka=1031,Za=1033,Ja=33776,Qa=33777,ec=33778,tc=33779,Au=35840,Ru=35841,Cu=35842,Lu=35843,nc=36196,Pu=37492,Iu=37496,Du=37808,Uu=37809,Nu=37810,Bu=37811,Fu=37812,Ou=37813,Hu=37814,ku=37815,zu=37816,Gu=37817,Vu=37818,Wu=37819,Xu=37820,qu=37821,ic=36492,Yu=36494,ju=36495,kp=36283,$u=36284,Ku=36285,Zu=36286;var Vi=2300,Wi=2301,rc=2302,Ju=2400,Qu=2401,ed=2402,zp=2500;var td=0,Vs=1,wo=2,oc=3e3,ci=3001,Gp=3200,Vp=3201,sc=0,Wp=1,Jt="",nt="srgb",pt="srgb-linear",Ao="display-p3",Xr="display-p3-linear",Ro="linear",ct="srgb",Co="rec709",Lo="p3";var qr=7680;var nd=519,Xp=512,qp=513,Yp=514,ac=515,jp=516,$p=517,Kp=518,Zp=519,Ws=35044;var id="300 es",Xs=1035,bn=2e3,Yr=2001;var Tn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let o=r.indexOf(t);o!==-1&&r.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let o=0,s=r.length;o<s;o++)r[o].call(this,e);e.target=null}}};var an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Jp=1234567,mr=Math.PI/180,Xi=180/Math.PI;function kt(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(an[i&255]+an[i>>8&255]+an[i>>16&255]+an[i>>24&255]+"-"+an[e&255]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[t&63|128]+an[t>>8&255]+"-"+an[t>>16&255]+an[t>>24&255]+an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]).toLowerCase()}function Lt(i,e,t){return Math.max(e,Math.min(t,i))}function cc(i,e){return(i%e+e)%e}function Iv(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Dv(i,e,t){return i!==e?(t-i)/(e-i):0}function Po(i,e,t){return(1-t)*i+t*e}function Uv(i,e,t,n){return Po(i,e,1-Math.exp(-t*n))}function Nv(i,e=1){return e-Math.abs(cc(i,e*2)-e)}function Bv(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Fv(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Ov(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Hv(i,e){return i+Math.random()*(e-i)}function kv(i){return i*(.5-Math.random())}function zv(i){i!==void 0&&(Jp=i);let e=Jp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Gv(i){return i*mr}function Vv(i){return i*Xi}function lc(i){return(i&i-1)===0&&i!==0}function Wv(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Io(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Xv(i,e,t,n,r){let o=Math.cos,s=Math.sin,a=o(t/2),c=s(t/2),l=o((e+n)/2),u=s((e+n)/2),d=o((e-n)/2),h=s((e-n)/2),p=o((n-e)/2),g=s((n-e)/2);switch(r){case"XYX":i.set(a*u,c*d,c*h,a*l);break;case"YZY":i.set(c*h,a*u,c*d,a*l);break;case"ZXZ":i.set(c*d,c*h,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*p,a*l);break;case"YXY":i.set(c*p,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*p,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function jn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function lt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var ne={DEG2RAD:mr,RAD2DEG:Xi,generateUUID:kt,clamp:Lt,euclideanModulo:cc,mapLinear:Iv,inverseLerp:Dv,lerp:Po,damp:Uv,pingpong:Nv,smoothstep:Bv,smootherstep:Fv,randInt:Ov,randFloat:Hv,randFloatSpread:kv,seededRandom:zv,degToRad:Gv,radToDeg:Vv,isPowerOfTwo:lc,ceilPowerOfTwo:Wv,floorPowerOfTwo:Io,setQuaternionFromProperEuler:Xv,normalize:lt,denormalize:jn};var De=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),o=this.x-e.x,s=this.y-e.y;return this.x=o*n-s*r+e.x,this.y=o*r+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};var Oe=class i{constructor(e,t,n,r,o,s,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,o,s,a,c,l)}set(e,t,n,r,o,s,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=o,u[5]=c,u[6]=n,u[7]=s,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,o=this.elements,s=n[0],a=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],p=n[5],g=n[8],x=r[0],m=r[3],f=r[6],v=r[1],_=r[4],T=r[7],A=r[2],b=r[5],S=r[8];return o[0]=s*x+a*v+c*A,o[3]=s*m+a*_+c*b,o[6]=s*f+a*T+c*S,o[1]=l*x+u*v+d*A,o[4]=l*m+u*_+d*b,o[7]=l*f+u*T+d*S,o[2]=h*x+p*v+g*A,o[5]=h*m+p*_+g*b,o[8]=h*f+p*T+g*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],s=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*s*u-t*a*l-n*o*u+n*a*c+r*o*l-r*s*c}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],s=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*s-a*l,h=a*c-u*o,p=l*o-s*c,g=t*d+n*h+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=d*x,e[1]=(r*l-u*n)*x,e[2]=(a*n-r*s)*x,e[3]=h*x,e[4]=(u*t-r*c)*x,e[5]=(r*o-a*t)*x,e[6]=p*x,e[7]=(n*c-l*t)*x,e[8]=(s*t-n*o)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,o,s,a){let c=Math.cos(o),l=Math.sin(o);return this.set(n*c,n*l,-n*(c*s+l*a)+s+e,-r*l,r*c,-r*(-l*s+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(rd.makeScale(e,t)),this}rotate(e){return this.premultiply(rd.makeRotation(-e)),this}translate(e,t){return this.premultiply(rd.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},rd=new Oe;function uc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function gr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function em(){let i=gr("canvas");return i.style.display="block",i}var Qp={};function xr(i){i in Qp||(Qp[i]=!0,console.warn(i))}var tm=new Oe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),nm=new Oe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),dc={[pt]:{transfer:Ro,primaries:Co,toReference:i=>i,fromReference:i=>i},[nt]:{transfer:ct,primaries:Co,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Xr]:{transfer:Ro,primaries:Lo,toReference:i=>i.applyMatrix3(nm),fromReference:i=>i.applyMatrix3(tm)},[Ao]:{transfer:ct,primaries:Lo,toReference:i=>i.convertSRGBToLinear().applyMatrix3(nm),fromReference:i=>i.applyMatrix3(tm).convertLinearToSRGB()}},qv=new Set([pt,Xr]),Ke={enabled:!0,_workingColorSpace:pt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!qv.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;let n=dc[e].toReference,r=dc[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return dc[i].primaries},getTransfer:function(i){return i===Jt?Ro:dc[i].transfer}};function _r(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function hc(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Do,Uo=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Do===void 0&&(Do=gr("canvas")),Do.width=e.width,Do.height=e.height;let n=Do.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Do}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=gr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),o=r.data;for(let s=0;s<o.length;s++)o[s]=_r(o[s]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(_r(t[n]/255)*255):t[n]=_r(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}};var Yv=0,No=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yv++}),this.uuid=kt(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let o;if(Array.isArray(r)){o=[];for(let s=0,a=r.length;s<a;s++)r[s].isDataTexture?o.push(od(r[s].image)):o.push(od(r[s]))}else o=od(r);n.url=o}return t||(e.images[this.uuid]=n),n}};function od(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Uo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var jv=0,mt=class i extends Tn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Ot,r=Ot,o=Bt,s=qn,a=Ht,c=Nn,l=i.DEFAULT_ANISOTROPY,u=Jt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jv++}),this.uuid=kt(),this.name="",this.source=new No(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=o,this.minFilter=s,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new De(0,0),this.repeat=new De(1,1),this.center=new De(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(xr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===ci?nt:Jt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==wu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case si:e.x=e.x-Math.floor(e.x);break;case Ot:e.x=e.x<0?0:1;break;case Wr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case si:e.y=e.y-Math.floor(e.y);break;case Ot:e.y=e.y<0?0:1;break;case Wr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return xr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===nt?ci:oc}set encoding(e){xr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ci?nt:Jt}};mt.DEFAULT_IMAGE=null;mt.DEFAULT_MAPPING=wu;mt.DEFAULT_ANISOTROPY=1;var rt=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,o=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r+s[12]*o,this.y=s[1]*t+s[5]*n+s[9]*r+s[13]*o,this.z=s[2]*t+s[6]*n+s[10]*r+s[14]*o,this.w=s[3]*t+s[7]*n+s[11]*r+s[15]*o,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,o,c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],p=c[5],g=c[9],x=c[2],m=c[6],f=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(l+1)/2,T=(p+1)/2,A=(f+1)/2,b=(u+h)/4,S=(d+x)/4,P=(g+m)/4;return _>T&&_>A?_<.01?(n=0,r=.707106781,o=.707106781):(n=Math.sqrt(_),r=b/n,o=S/n):T>A?T<.01?(n=.707106781,r=0,o=.707106781):(r=Math.sqrt(T),n=b/r,o=P/r):A<.01?(n=.707106781,r=.707106781,o=0):(o=Math.sqrt(A),n=S/o,r=P/o),this.set(n,r,o,t),this}let v=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-x)/v,this.z=(h-u)/v,this.w=Math.acos((l+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};var fc=class extends Tn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t);let r={width:e,height:t,depth:1};n.encoding!==void 0&&(xr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===ci?nt:Jt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new mt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new No(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Sn=class extends fc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}};var Bo=class extends mt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=Ot,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var pc=class extends mt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=Ot,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Qt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,o,s,a){let c=n[r+0],l=n[r+1],u=n[r+2],d=n[r+3],h=o[s+0],p=o[s+1],g=o[s+2],x=o[s+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=h,e[t+1]=p,e[t+2]=g,e[t+3]=x;return}if(d!==x||c!==h||l!==p||u!==g){let m=1-a,f=c*h+l*p+u*g+d*x,v=f>=0?1:-1,_=1-f*f;if(_>Number.EPSILON){let A=Math.sqrt(_),b=Math.atan2(A,f*v);m=Math.sin(m*b)/A,a=Math.sin(a*b)/A}let T=a*v;if(c=c*m+h*T,l=l*m+p*T,u=u*m+g*T,d=d*m+x*T,m===1-a){let A=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=A,l*=A,u*=A,d*=A}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,o,s){let a=n[r],c=n[r+1],l=n[r+2],u=n[r+3],d=o[s],h=o[s+1],p=o[s+2],g=o[s+3];return e[t]=a*g+u*d+c*p-l*h,e[t+1]=c*g+u*h+l*d-a*p,e[t+2]=l*g+u*p+a*h-c*d,e[t+3]=u*g-a*d-c*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,o=e._z,s=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(r/2),d=a(o/2),h=c(n/2),p=c(r/2),g=c(o/2);switch(s){case"XYZ":this._x=h*u*d+l*p*g,this._y=l*p*d-h*u*g,this._z=l*u*g+h*p*d,this._w=l*u*d-h*p*g;break;case"YXZ":this._x=h*u*d+l*p*g,this._y=l*p*d-h*u*g,this._z=l*u*g-h*p*d,this._w=l*u*d+h*p*g;break;case"ZXY":this._x=h*u*d-l*p*g,this._y=l*p*d+h*u*g,this._z=l*u*g+h*p*d,this._w=l*u*d-h*p*g;break;case"ZYX":this._x=h*u*d-l*p*g,this._y=l*p*d+h*u*g,this._z=l*u*g-h*p*d,this._w=l*u*d+h*p*g;break;case"YZX":this._x=h*u*d+l*p*g,this._y=l*p*d+h*u*g,this._z=l*u*g-h*p*d,this._w=l*u*d-h*p*g;break;case"XZY":this._x=h*u*d-l*p*g,this._y=l*p*d-h*u*g,this._z=l*u*g+h*p*d,this._w=l*u*d+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],o=t[8],s=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=n+a+d;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-c)*p,this._y=(o-l)*p,this._z=(s-r)*p}else if(n>a&&n>d){let p=2*Math.sqrt(1+n-a-d);this._w=(u-c)/p,this._x=.25*p,this._y=(r+s)/p,this._z=(o+l)/p}else if(a>d){let p=2*Math.sqrt(1+a-n-d);this._w=(o-l)/p,this._x=(r+s)/p,this._y=.25*p,this._z=(c+u)/p}else{let p=2*Math.sqrt(1+d-n-a);this._w=(s-r)/p,this._x=(o+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Lt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,o=e._z,s=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+s*a+r*l-o*c,this._y=r*u+s*c+o*a-n*l,this._z=o*u+s*l+n*c-r*a,this._w=s*u-n*a-r*c-o*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,o=this._z,s=this._w,a=s*e._w+n*e._x+r*e._y+o*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=n,this._y=r,this._z=o,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-t;return this._w=p*s+t*this._w,this._x=p*n+t*this._x,this._y=p*r+t*this._y,this._z=p*o+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),d=Math.sin((1-t)*u)/l,h=Math.sin(t*u)/l;return this._w=s*d+this._w*h,this._x=n*d+this._x*h,this._y=r*d+this._y*h,this._z=o*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),o=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(o),n*Math.cos(o),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};var L=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(im.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(im.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*r,this.y=o[1]*t+o[4]*n+o[7]*r,this.z=o[2]*t+o[5]*n+o[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,o=e.elements,s=1/(o[3]*t+o[7]*n+o[11]*r+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*r+o[12])*s,this.y=(o[1]*t+o[5]*n+o[9]*r+o[13])*s,this.z=(o[2]*t+o[6]*n+o[10]*r+o[14])*s,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,o=e.x,s=e.y,a=e.z,c=e.w,l=2*(s*r-a*n),u=2*(a*t-o*r),d=2*(o*n-s*t);return this.x=t+c*l+s*d-a*u,this.y=n+c*u+a*l-o*d,this.z=r+c*d+o*u-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r,this.y=o[1]*t+o[5]*n+o[9]*r,this.z=o[2]*t+o[6]*n+o[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,o=e.z,s=t.x,a=t.y,c=t.z;return this.x=r*c-o*a,this.y=o*s-n*c,this.z=n*a-r*s,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return sd.copy(this).projectOnVector(e),this.sub(sd)}reflect(e){return this.sub(sd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},sd=new L,im=new Qt;var ht=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(li.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(li.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=li.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let o=n.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=o.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,li):li.fromBufferAttribute(o,s),li.applyMatrix4(e.matrixWorld),this.expandByPoint(li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),mc.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),mc.copy(n.boundingBox)),mc.applyMatrix4(e.matrixWorld),this.union(mc)}let r=e.children;for(let o=0,s=r.length;o<s;o++)this.expandByObject(r[o],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,li),li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qs),gc.subVectors(this.max,qs),Fo.subVectors(e.a,qs),Oo.subVectors(e.b,qs),Ho.subVectors(e.c,qs),yr.subVectors(Oo,Fo),vr.subVectors(Ho,Oo),jr.subVectors(Fo,Ho);let t=[0,-yr.z,yr.y,0,-vr.z,vr.y,0,-jr.z,jr.y,yr.z,0,-yr.x,vr.z,0,-vr.x,jr.z,0,-jr.x,-yr.y,yr.x,0,-vr.y,vr.x,0,-jr.y,jr.x,0];return!ad(t,Fo,Oo,Ho,gc)||(t=[1,0,0,0,1,0,0,0,1],!ad(t,Fo,Oo,Ho,gc))?!1:(xc.crossVectors(yr,vr),t=[xc.x,xc.y,xc.z],ad(t,Fo,Oo,Ho,gc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(qi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},qi=[new L,new L,new L,new L,new L,new L,new L,new L],li=new L,mc=new ht,Fo=new L,Oo=new L,Ho=new L,yr=new L,vr=new L,jr=new L,qs=new L,gc=new L,xc=new L,$r=new L;function ad(i,e,t,n,r){for(let o=0,s=i.length-3;o<=s;o+=3){$r.fromArray(i,o);let a=r.x*Math.abs($r.x)+r.y*Math.abs($r.y)+r.z*Math.abs($r.z),c=e.dot($r),l=t.dot($r),u=n.dot($r);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var $v=new ht,Ys=new L,cd=new L,At=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):$v.setFromPoints(e).getCenter(n);let r=0;for(let o=0,s=e.length;o<s;o++)r=Math.max(r,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ys.subVectors(e,this.center);let t=Ys.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Ys,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(cd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ys.copy(e.center).add(cd)),this.expandByPoint(Ys.copy(e.center).sub(cd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}};var Yi=new L,ld=new L,_c=new L,Er=new L,ud=new L,yc=new L,dd=new L,$n=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Yi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Yi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Yi.copy(this.origin).addScaledVector(this.direction,t),Yi.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ld.copy(e).add(t).multiplyScalar(.5),_c.copy(t).sub(e).normalize(),Er.copy(this.origin).sub(ld);let o=e.distanceTo(t)*.5,s=-this.direction.dot(_c),a=Er.dot(this.direction),c=-Er.dot(_c),l=Er.lengthSq(),u=Math.abs(1-s*s),d,h,p,g;if(u>0)if(d=s*c-a,h=s*a-c,g=o*u,d>=0)if(h>=-g)if(h<=g){let x=1/u;d*=x,h*=x,p=d*(d+s*h+2*a)+h*(s*d+h+2*c)+l}else h=o,d=Math.max(0,-(s*h+a)),p=-d*d+h*(h+2*c)+l;else h=-o,d=Math.max(0,-(s*h+a)),p=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-s*o+a)),h=d>0?-o:Math.min(Math.max(-o,-c),o),p=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-o,-c),o),p=h*(h+2*c)+l):(d=Math.max(0,-(s*o+a)),h=d>0?o:Math.min(Math.max(-o,-c),o),p=-d*d+h*(h+2*c)+l);else h=s>0?-o:o,d=Math.max(0,-(s*h+a)),p=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(ld).addScaledVector(_c,h),p}intersectSphere(e,t){Yi.subVectors(e.center,this.origin);let n=Yi.dot(this.direction),r=Yi.dot(Yi)-n*n,o=e.radius*e.radius;if(r>o)return null;let s=Math.sqrt(o-r),a=n-s,c=n+s;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,o,s,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(o=(e.min.y-h.y)*u,s=(e.max.y-h.y)*u):(o=(e.max.y-h.y)*u,s=(e.min.y-h.y)*u),n>s||o>r||((o>n||isNaN(n))&&(n=o),(s<r||isNaN(r))&&(r=s),d>=0?(a=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Yi)!==null}intersectTriangle(e,t,n,r,o){ud.subVectors(t,e),yc.subVectors(n,e),dd.crossVectors(ud,yc);let s=this.direction.dot(dd),a;if(s>0){if(r)return null;a=1}else if(s<0)a=-1,s=-s;else return null;Er.subVectors(this.origin,e);let c=a*this.direction.dot(yc.crossVectors(Er,yc));if(c<0)return null;let l=a*this.direction.dot(ud.cross(Er));if(l<0||c+l>s)return null;let u=-a*Er.dot(dd);return u<0?null:this.at(u/s,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};var Ue=class i{constructor(e,t,n,r,o,s,a,c,l,u,d,h,p,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,o,s,a,c,l,u,d,h,p,g,x,m)}set(e,t,n,r,o,s,a,c,l,u,d,h,p,g,x,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=r,f[1]=o,f[5]=s,f[9]=a,f[13]=c,f[2]=l,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/ko.setFromMatrixColumn(e,0).length(),o=1/ko.setFromMatrixColumn(e,1).length(),s=1/ko.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,o=e.z,s=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(o),d=Math.sin(o);if(e.order==="XYZ"){let h=s*u,p=s*d,g=a*u,x=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=p+g*l,t[5]=h-x*l,t[9]=-a*c,t[2]=x-h*l,t[6]=g+p*l,t[10]=s*c}else if(e.order==="YXZ"){let h=c*u,p=c*d,g=l*u,x=l*d;t[0]=h+x*a,t[4]=g*a-p,t[8]=s*l,t[1]=s*d,t[5]=s*u,t[9]=-a,t[2]=p*a-g,t[6]=x+h*a,t[10]=s*c}else if(e.order==="ZXY"){let h=c*u,p=c*d,g=l*u,x=l*d;t[0]=h-x*a,t[4]=-s*d,t[8]=g+p*a,t[1]=p+g*a,t[5]=s*u,t[9]=x-h*a,t[2]=-s*l,t[6]=a,t[10]=s*c}else if(e.order==="ZYX"){let h=s*u,p=s*d,g=a*u,x=a*d;t[0]=c*u,t[4]=g*l-p,t[8]=h*l+x,t[1]=c*d,t[5]=x*l+h,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=s*c}else if(e.order==="YZX"){let h=s*c,p=s*l,g=a*c,x=a*l;t[0]=c*u,t[4]=x-h*d,t[8]=g*d+p,t[1]=d,t[5]=s*u,t[9]=-a*u,t[2]=-l*u,t[6]=p*d+g,t[10]=h-x*d}else if(e.order==="XZY"){let h=s*c,p=s*l,g=a*c,x=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+x,t[5]=s*u,t[9]=p*d-g,t[2]=g*d-p,t[6]=a*u,t[10]=x*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Kv,e,Zv)}lookAt(e,t,n){let r=this.elements;return Fn.subVectors(e,t),Fn.lengthSq()===0&&(Fn.z=1),Fn.normalize(),Mr.crossVectors(n,Fn),Mr.lengthSq()===0&&(Math.abs(n.z)===1?Fn.x+=1e-4:Fn.z+=1e-4,Fn.normalize(),Mr.crossVectors(n,Fn)),Mr.normalize(),vc.crossVectors(Fn,Mr),r[0]=Mr.x,r[4]=vc.x,r[8]=Fn.x,r[1]=Mr.y,r[5]=vc.y,r[9]=Fn.y,r[2]=Mr.z,r[6]=vc.z,r[10]=Fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,o=this.elements,s=n[0],a=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],p=n[13],g=n[2],x=n[6],m=n[10],f=n[14],v=n[3],_=n[7],T=n[11],A=n[15],b=r[0],S=r[4],P=r[8],E=r[12],w=r[1],I=r[5],O=r[9],te=r[13],D=r[2],G=r[6],X=r[10],z=r[14],V=r[3],j=r[7],ce=r[11],se=r[15];return o[0]=s*b+a*w+c*D+l*V,o[4]=s*S+a*I+c*G+l*j,o[8]=s*P+a*O+c*X+l*ce,o[12]=s*E+a*te+c*z+l*se,o[1]=u*b+d*w+h*D+p*V,o[5]=u*S+d*I+h*G+p*j,o[9]=u*P+d*O+h*X+p*ce,o[13]=u*E+d*te+h*z+p*se,o[2]=g*b+x*w+m*D+f*V,o[6]=g*S+x*I+m*G+f*j,o[10]=g*P+x*O+m*X+f*ce,o[14]=g*E+x*te+m*z+f*se,o[3]=v*b+_*w+T*D+A*V,o[7]=v*S+_*I+T*G+A*j,o[11]=v*P+_*O+T*X+A*ce,o[15]=v*E+_*te+T*z+A*se,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],o=e[12],s=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],p=e[14],g=e[3],x=e[7],m=e[11],f=e[15];return g*(+o*c*d-r*l*d-o*a*h+n*l*h+r*a*p-n*c*p)+x*(+t*c*p-t*l*h+o*s*h-r*s*p+r*l*u-o*c*u)+m*(+t*l*d-t*a*p-o*s*d+n*s*p+o*a*u-n*l*u)+f*(-r*a*u-t*c*d+t*a*h+r*s*d-n*s*h+n*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],s=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],p=e[11],g=e[12],x=e[13],m=e[14],f=e[15],v=d*m*l-x*h*l+x*c*p-a*m*p-d*c*f+a*h*f,_=g*h*l-u*m*l-g*c*p+s*m*p+u*c*f-s*h*f,T=u*x*l-g*d*l+g*a*p-s*x*p-u*a*f+s*d*f,A=g*d*c-u*x*c-g*a*h+s*x*h+u*a*m-s*d*m,b=t*v+n*_+r*T+o*A;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let S=1/b;return e[0]=v*S,e[1]=(x*h*o-d*m*o-x*r*p+n*m*p+d*r*f-n*h*f)*S,e[2]=(a*m*o-x*c*o+x*r*l-n*m*l-a*r*f+n*c*f)*S,e[3]=(d*c*o-a*h*o-d*r*l+n*h*l+a*r*p-n*c*p)*S,e[4]=_*S,e[5]=(u*m*o-g*h*o+g*r*p-t*m*p-u*r*f+t*h*f)*S,e[6]=(g*c*o-s*m*o-g*r*l+t*m*l+s*r*f-t*c*f)*S,e[7]=(s*h*o-u*c*o+u*r*l-t*h*l-s*r*p+t*c*p)*S,e[8]=T*S,e[9]=(g*d*o-u*x*o-g*n*p+t*x*p+u*n*f-t*d*f)*S,e[10]=(s*x*o-g*a*o+g*n*l-t*x*l-s*n*f+t*a*f)*S,e[11]=(u*a*o-s*d*o-u*n*l+t*d*l+s*n*p-t*a*p)*S,e[12]=A*S,e[13]=(u*x*r-g*d*r+g*n*h-t*x*h-u*n*m+t*d*m)*S,e[14]=(g*a*r-s*x*r-g*n*c+t*x*c+s*n*m-t*a*m)*S,e[15]=(s*d*r-u*a*r+u*n*c-t*d*c-s*n*h+t*a*h)*S,this}scale(e){let t=this.elements,n=e.x,r=e.y,o=e.z;return t[0]*=n,t[4]*=r,t[8]*=o,t[1]*=n,t[5]*=r,t[9]*=o,t[2]*=n,t[6]*=r,t[10]*=o,t[3]*=n,t[7]*=r,t[11]*=o,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),o=1-n,s=e.x,a=e.y,c=e.z,l=o*s,u=o*a;return this.set(l*s+n,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+n,u*c-r*s,0,l*c-r*a,u*c+r*s,o*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,o,s){return this.set(1,n,o,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,o=t._x,s=t._y,a=t._z,c=t._w,l=o+o,u=s+s,d=a+a,h=o*l,p=o*u,g=o*d,x=s*u,m=s*d,f=a*d,v=c*l,_=c*u,T=c*d,A=n.x,b=n.y,S=n.z;return r[0]=(1-(x+f))*A,r[1]=(p+T)*A,r[2]=(g-_)*A,r[3]=0,r[4]=(p-T)*b,r[5]=(1-(h+f))*b,r[6]=(m+v)*b,r[7]=0,r[8]=(g+_)*S,r[9]=(m-v)*S,r[10]=(1-(h+x))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,o=ko.set(r[0],r[1],r[2]).length(),s=ko.set(r[4],r[5],r[6]).length(),a=ko.set(r[8],r[9],r[10]).length();this.determinant()<0&&(o=-o),e.x=r[12],e.y=r[13],e.z=r[14],ui.copy(this);let l=1/o,u=1/s,d=1/a;return ui.elements[0]*=l,ui.elements[1]*=l,ui.elements[2]*=l,ui.elements[4]*=u,ui.elements[5]*=u,ui.elements[6]*=u,ui.elements[8]*=d,ui.elements[9]*=d,ui.elements[10]*=d,t.setFromRotationMatrix(ui),n.x=o,n.y=s,n.z=a,this}makePerspective(e,t,n,r,o,s,a=bn){let c=this.elements,l=2*o/(t-e),u=2*o/(n-r),d=(t+e)/(t-e),h=(n+r)/(n-r),p,g;if(a===bn)p=-(s+o)/(s-o),g=-2*s*o/(s-o);else if(a===Yr)p=-s/(s-o),g=-s*o/(s-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,o,s,a=bn){let c=this.elements,l=1/(t-e),u=1/(n-r),d=1/(s-o),h=(t+e)*l,p=(n+r)*u,g,x;if(a===bn)g=(s+o)*d,x=-2*d;else if(a===Yr)g=o*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ko=new L,ui=new Ue,Kv=new L(0,0,0),Zv=new L(1,1,1),Mr=new L,vc=new L,Fn=new L;var rm=new Ue,om=new Qt,br=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,o=r[0],s=r[4],a=r[8],c=r[1],l=r[5],u=r[9],d=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-s,o)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Lt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(Lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-Lt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(Lt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Lt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return rm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(rm,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return om.setFromEuler(this),this.setFromQuaternion(om,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};br.DEFAULT_ORDER="XYZ";var Tr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}};var Jv=0,sm=new L,zo=new Qt,ji=new Ue,Ec=new L,js=new L,Qv=new L,eE=new Qt,am=new L(1,0,0),cm=new L(0,1,0),lm=new L(0,0,1),tE={type:"added"},nE={type:"removed"},Xe=class i extends Tn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jv++}),this.uuid=kt(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new L,t=new br,n=new Qt,r=new L(1,1,1);function o(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ue},normalMatrix:{value:new Oe}}),this.matrix=new Ue,this.matrixWorld=new Ue,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return zo.setFromAxisAngle(e,t),this.quaternion.multiply(zo),this}rotateOnWorldAxis(e,t){return zo.setFromAxisAngle(e,t),this.quaternion.premultiply(zo),this}rotateX(e){return this.rotateOnAxis(am,e)}rotateY(e){return this.rotateOnAxis(cm,e)}rotateZ(e){return this.rotateOnAxis(lm,e)}translateOnAxis(e,t){return sm.copy(e).applyQuaternion(this.quaternion),this.position.add(sm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(am,e)}translateY(e){return this.translateOnAxis(cm,e)}translateZ(e){return this.translateOnAxis(lm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ji.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ec.copy(e):Ec.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ji.lookAt(js,Ec,this.up):ji.lookAt(Ec,js,this.up),this.quaternion.setFromRotationMatrix(ji),r&&(ji.extractRotation(r.matrixWorld),zo.setFromRotationMatrix(ji),this.quaternion.premultiply(zo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(tE)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(nE)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ji.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ji.multiply(e.parent.matrixWorld)),e.applyMatrix4(ji),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let o=0,s=r.length;o<s;o++)r[o].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,e,Qv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,eE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++){let o=t[n];(o.matrixWorldAutoUpdate===!0||e===!0)&&o.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let r=this.children;for(let o=0,s=r.length;o<s;o++){let a=r[o];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function o(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=o(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let d=c[l];o(e.shapes,d)}else o(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(o(e.materials,this.material[c]));r.material=a}else r.material=o(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];r.animations.push(o(e.animations,c))}}if(t){let a=s(e.geometries),c=s(e.materials),l=s(e.textures),u=s(e.images),d=s(e.shapes),h=s(e.skeletons),p=s(e.animations),g=s(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=r,n;function s(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};Xe.DEFAULT_UP=new L(0,1,0);Xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var di=new L,$i=new L,hd=new L,Ki=new L,Go=new L,Vo=new L,um=new L,fd=new L,pd=new L,md=new L,Mc=!1,Zi=class i{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),di.subVectors(e,t),r.cross(di);let o=r.lengthSq();return o>0?r.multiplyScalar(1/Math.sqrt(o)):r.set(0,0,0)}static getBarycoord(e,t,n,r,o){di.subVectors(r,t),$i.subVectors(n,t),hd.subVectors(e,t);let s=di.dot(di),a=di.dot($i),c=di.dot(hd),l=$i.dot($i),u=$i.dot(hd),d=s*l-a*a;if(d===0)return o.set(0,0,0),null;let h=1/d,p=(l*c-a*u)*h,g=(s*u-a*c)*h;return o.set(1-p-g,g,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Ki)===null?!1:Ki.x>=0&&Ki.y>=0&&Ki.x+Ki.y<=1}static getUV(e,t,n,r,o,s,a,c){return Mc===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Mc=!0),this.getInterpolation(e,t,n,r,o,s,a,c)}static getInterpolation(e,t,n,r,o,s,a,c){return this.getBarycoord(e,t,n,r,Ki)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(o,Ki.x),c.addScaledVector(s,Ki.y),c.addScaledVector(a,Ki.z),c)}static isFrontFacing(e,t,n,r){return di.subVectors(n,t),$i.subVectors(e,t),di.cross($i).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return di.subVectors(this.c,this.b),$i.subVectors(this.a,this.b),di.cross($i).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,o){return Mc===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Mc=!0),i.getInterpolation(e,this.a,this.b,this.c,t,n,r,o)}getInterpolation(e,t,n,r,o){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,o)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,o=this.c,s,a;Go.subVectors(r,n),Vo.subVectors(o,n),fd.subVectors(e,n);let c=Go.dot(fd),l=Vo.dot(fd);if(c<=0&&l<=0)return t.copy(n);pd.subVectors(e,r);let u=Go.dot(pd),d=Vo.dot(pd);if(u>=0&&d<=u)return t.copy(r);let h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return s=c/(c-u),t.copy(n).addScaledVector(Go,s);md.subVectors(e,o);let p=Go.dot(md),g=Vo.dot(md);if(g>=0&&p<=g)return t.copy(o);let x=p*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Vo,a);let m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return um.subVectors(o,r),a=(d-u)/(d-u+(p-g)),t.copy(r).addScaledVector(um,a);let f=1/(m+x+h);return s=x*f,a=h*f,t.copy(n).addScaledVector(Go,s).addScaledVector(Vo,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}};var dm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Sr={h:0,s:0,l:0},bc={h:0,s:0,l:0};function gd(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var ge=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Ke.workingColorSpace){if(e=cc(e,1),t=Lt(t,0,1),n=Lt(n,0,1),t===0)this.r=this.g=this.b=n;else{let o=n<=.5?n*(1+t):n+t-n*t,s=2*n-o;this.r=gd(s,o,e+1/3),this.g=gd(s,o,e),this.b=gd(s,o,e-1/3)}return Ke.toWorkingColorSpace(this,r),this}setStyle(e,t=nt){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let o,s=r[1],a=r[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let o=r[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nt){let n=dm[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_r(e.r),this.g=_r(e.g),this.b=_r(e.b),this}copyLinearToSRGB(e){return this.r=hc(e.r),this.g=hc(e.g),this.b=hc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nt){return Ke.fromWorkingColorSpace(ln.copy(this),e),Math.round(Lt(ln.r*255,0,255))*65536+Math.round(Lt(ln.g*255,0,255))*256+Math.round(Lt(ln.b*255,0,255))}getHexString(e=nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(ln.copy(this),t);let n=ln.r,r=ln.g,o=ln.b,s=Math.max(n,r,o),a=Math.min(n,r,o),c,l,u=(a+s)/2;if(a===s)c=0,l=0;else{let d=s-a;switch(l=u<=.5?d/(s+a):d/(2-s-a),s){case n:c=(r-o)/d+(r<o?6:0);break;case r:c=(o-n)/d+2;break;case o:c=(n-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(ln.copy(this),t),e.r=ln.r,e.g=ln.g,e.b=ln.b,e}getStyle(e=nt){Ke.fromWorkingColorSpace(ln.copy(this),e);let t=ln.r,n=ln.g,r=ln.b;return e!==nt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Sr),this.setHSL(Sr.h+e,Sr.s+t,Sr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Sr),e.getHSL(bc);let n=Po(Sr.h,bc.h,t),r=Po(Sr.s,bc.s,t),o=Po(Sr.l,bc.l,t);return this.setHSL(n,r,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,o=e.elements;return this.r=o[0]*t+o[3]*n+o[6]*r,this.g=o[1]*t+o[4]*n+o[7]*r,this.b=o[2]*t+o[5]*n+o[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ln=new ge;ge.NAMES=dm;var iE=0,Dt=class extends Tn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:iE++}),this.uuid=kt(),this.name="",this.type="Material",this.blending=ki,this.side=Zt,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Os,this.blendDst=Hs,this.blendEquation=zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ge(0,0,0),this.blendAlpha=0,this.depthFunc=bo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qr,this.stencilZFail=qr,this.stencilZPass=qr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ki&&(n.blending=this.blending),this.side!==Zt&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Os&&(n.blendSrc=this.blendSrc),this.blendDst!==Hs&&(n.blendDst=this.blendDst),this.blendEquation!==zi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==bo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==nd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==qr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==qr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(o){let s=[];for(let a in o){let c=o[a];delete c.metadata,s.push(c)}return s}if(t){let o=r(e.textures),s=r(e.images);o.length>0&&(n.textures=o),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let o=0;o!==r;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Ut=class extends Dt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Va,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Ft=new L,Tc=new De,$e=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ws,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=gn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,o=this.itemSize;r<o;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Tc.fromBufferAttribute(this,t),Tc.applyMatrix3(e),this.setXY(t,Tc.x,Tc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=jn(t,this.array)),t}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=jn(t,this.array)),t}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=jn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=jn(t,this.array)),t}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),r=lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,o){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),r=lt(r,this.array),o=lt(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ws&&(e.usage=this.usage),e}};var Wo=class extends $e{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Xo=class extends $e{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ze=class extends $e{constructor(e,t,n){super(new Float32Array(e),t,n)}};var rE=0,Kn=new Ue,xd=new Xe,qo=new L,On=new ht,$s=new ht,en=new L,Je=class i extends Tn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rE++}),this.uuid=kt(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(uc(e)?Xo:Wo)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let o=new Oe().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Kn.makeRotationFromQuaternion(e),this.applyMatrix4(Kn),this}rotateX(e){return Kn.makeRotationX(e),this.applyMatrix4(Kn),this}rotateY(e){return Kn.makeRotationY(e),this.applyMatrix4(Kn),this}rotateZ(e){return Kn.makeRotationZ(e),this.applyMatrix4(Kn),this}translate(e,t,n){return Kn.makeTranslation(e,t,n),this.applyMatrix4(Kn),this}scale(e,t,n){return Kn.makeScale(e,t,n),this.applyMatrix4(Kn),this}lookAt(e){return xd.lookAt(e),xd.updateMatrix(),this.applyMatrix4(xd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qo).negate(),this.translate(qo.x,qo.y,qo.z),this}setFromPoints(e){let t=[];for(let n=0,r=e.length;n<r;n++){let o=e[n];t.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new Ze(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ht);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let o=t[n];On.setFromBufferAttribute(o),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,On.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,On.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(On.min),this.boundingBox.expandByPoint(On.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new At);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(On.setFromBufferAttribute(e),t)for(let o=0,s=t.length;o<s;o++){let a=t[o];$s.setFromBufferAttribute(a),this.morphTargetsRelative?(en.addVectors(On.min,$s.min),On.expandByPoint(en),en.addVectors(On.max,$s.max),On.expandByPoint(en)):(On.expandByPoint($s.min),On.expandByPoint($s.max))}On.getCenter(n);let r=0;for(let o=0,s=e.count;o<s;o++)en.fromBufferAttribute(e,o),r=Math.max(r,n.distanceToSquared(en));if(t)for(let o=0,s=t.length;o<s;o++){let a=t[o],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)en.fromBufferAttribute(a,l),c&&(qo.fromBufferAttribute(e,l),en.add(qo)),r=Math.max(r,n.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,r=t.position.array,o=t.normal.array,s=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $e(new Float32Array(4*a),4));let c=this.getAttribute("tangent").array,l=[],u=[];for(let w=0;w<a;w++)l[w]=new L,u[w]=new L;let d=new L,h=new L,p=new L,g=new De,x=new De,m=new De,f=new L,v=new L;function _(w,I,O){d.fromArray(r,w*3),h.fromArray(r,I*3),p.fromArray(r,O*3),g.fromArray(s,w*2),x.fromArray(s,I*2),m.fromArray(s,O*2),h.sub(d),p.sub(d),x.sub(g),m.sub(g);let te=1/(x.x*m.y-m.x*x.y);isFinite(te)&&(f.copy(h).multiplyScalar(m.y).addScaledVector(p,-x.y).multiplyScalar(te),v.copy(p).multiplyScalar(x.x).addScaledVector(h,-m.x).multiplyScalar(te),l[w].add(f),l[I].add(f),l[O].add(f),u[w].add(v),u[I].add(v),u[O].add(v))}let T=this.groups;T.length===0&&(T=[{start:0,count:n.length}]);for(let w=0,I=T.length;w<I;++w){let O=T[w],te=O.start,D=O.count;for(let G=te,X=te+D;G<X;G+=3)_(n[G+0],n[G+1],n[G+2])}let A=new L,b=new L,S=new L,P=new L;function E(w){S.fromArray(o,w*3),P.copy(S);let I=l[w];A.copy(I),A.sub(S.multiplyScalar(S.dot(I))).normalize(),b.crossVectors(P,I);let te=b.dot(u[w])<0?-1:1;c[w*4]=A.x,c[w*4+1]=A.y,c[w*4+2]=A.z,c[w*4+3]=te}for(let w=0,I=T.length;w<I;++w){let O=T[w],te=O.start,D=O.count;for(let G=te,X=te+D;G<X;G+=3)E(n[G+0]),E(n[G+1]),E(n[G+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new $e(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);let r=new L,o=new L,s=new L,a=new L,c=new L,l=new L,u=new L,d=new L;if(e)for(let h=0,p=e.count;h<p;h+=3){let g=e.getX(h+0),x=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),o.fromBufferAttribute(t,x),s.fromBufferAttribute(t,m),u.subVectors(s,o),d.subVectors(r,o),u.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),o.fromBufferAttribute(t,h+1),s.fromBufferAttribute(t,h+2),u.subVectors(s,o),d.subVectors(r,o),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)en.fromBufferAttribute(e,t),en.normalize(),e.setXYZ(t,en.x,en.y,en.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,d=a.normalized,h=new l.constructor(c.length*u),p=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?p=c[x]*a.data.stride+a.offset:p=c[x]*u;for(let f=0;f<u;f++)h[g++]=l[p++]}return new $e(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,n);t.setAttribute(a,l)}let o=this.morphAttributes;for(let a in o){let c=[],l=o[a];for(let u=0,d=l.length;u<d;u++){let h=l[u],p=e(h,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let a=0,c=s.length;a<c;a++){let l=s[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},o=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){let p=l[d];u.push(p.toJSON(e.data))}u.length>0&&(r[c]=u,o=!0)}o&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let o=e.morphAttributes;for(let l in o){let u=[],d=o[l];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let l=0,u=s.length;l<u;l++){let d=s[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};var hm=new Ue,Kr=new $n,Sc=new At,fm=new L,Yo=new L,jo=new L,$o=new L,_d=new L,wc=new L,Ac=new De,Rc=new De,Cc=new De,pm=new L,mm=new L,gm=new L,Lc=new L,Pc=new L,Ge=class extends Xe{constructor(e=new Je,t=new Ut){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){let a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,o=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(o&&a){wc.set(0,0,0);for(let c=0,l=o.length;c<l;c++){let u=a[c],d=o[c];u!==0&&(_d.fromBufferAttribute(d,e),s?wc.addScaledVector(_d,u):wc.addScaledVector(_d.sub(t),u))}t.add(wc)}return t}raycast(e,t){let n=this.geometry,r=this.material,o=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Sc.copy(n.boundingSphere),Sc.applyMatrix4(o),Kr.copy(e.ray).recast(e.near),!(Sc.containsPoint(Kr.origin)===!1&&(Kr.intersectSphere(Sc,fm)===null||Kr.origin.distanceToSquared(fm)>(e.far-e.near)**2))&&(hm.copy(o).invert(),Kr.copy(e.ray).applyMatrix4(hm),!(n.boundingBox!==null&&Kr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Kr)))}_computeIntersections(e,t,n){let r,o=this.geometry,s=this.material,a=o.index,c=o.attributes.position,l=o.attributes.uv,u=o.attributes.uv1,d=o.attributes.normal,h=o.groups,p=o.drawRange;if(a!==null)if(Array.isArray(s))for(let g=0,x=h.length;g<x;g++){let m=h[g],f=s[m.materialIndex],v=Math.max(m.start,p.start),_=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let T=v,A=_;T<A;T+=3){let b=a.getX(T),S=a.getX(T+1),P=a.getX(T+2);r=Ic(this,f,e,n,l,u,d,b,S,P),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let v=a.getX(m),_=a.getX(m+1),T=a.getX(m+2);r=Ic(this,s,e,n,l,u,d,v,_,T),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(s))for(let g=0,x=h.length;g<x;g++){let m=h[g],f=s[m.materialIndex],v=Math.max(m.start,p.start),_=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let T=v,A=_;T<A;T+=3){let b=T,S=T+1,P=T+2;r=Ic(this,f,e,n,l,u,d,b,S,P),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let v=m,_=m+1,T=m+2;r=Ic(this,s,e,n,l,u,d,v,_,T),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function oE(i,e,t,n,r,o,s,a){let c;if(e.side===bt?c=n.intersectTriangle(s,o,r,!0,a):c=n.intersectTriangle(r,o,s,e.side===Zt,a),c===null)return null;Pc.copy(a),Pc.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Pc);return l<t.near||l>t.far?null:{distance:l,point:Pc.clone(),object:i}}function Ic(i,e,t,n,r,o,s,a,c,l){i.getVertexPosition(a,Yo),i.getVertexPosition(c,jo),i.getVertexPosition(l,$o);let u=oE(i,e,t,n,Yo,jo,$o,Lc);if(u){r&&(Ac.fromBufferAttribute(r,a),Rc.fromBufferAttribute(r,c),Cc.fromBufferAttribute(r,l),u.uv=Zi.getInterpolation(Lc,Yo,jo,$o,Ac,Rc,Cc,new De)),o&&(Ac.fromBufferAttribute(o,a),Rc.fromBufferAttribute(o,c),Cc.fromBufferAttribute(o,l),u.uv1=Zi.getInterpolation(Lc,Yo,jo,$o,Ac,Rc,Cc,new De),u.uv2=u.uv1),s&&(pm.fromBufferAttribute(s,a),mm.fromBufferAttribute(s,c),gm.fromBufferAttribute(s,l),u.normal=Zi.getInterpolation(Lc,Yo,jo,$o,pm,mm,gm,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new L,materialIndex:0};Zi.getNormal(Yo,jo,$o,d.normal),u.face=d}return u}var Zn=class i extends Je{constructor(e=1,t=1,n=1,r=1,o=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:o,depthSegments:s};let a=this;r=Math.floor(r),o=Math.floor(o),s=Math.floor(s);let c=[],l=[],u=[],d=[],h=0,p=0;g("z","y","x",-1,-1,n,t,e,s,o,0),g("z","y","x",1,-1,n,t,-e,s,o,1),g("x","z","y",1,1,e,n,t,r,s,2),g("x","z","y",1,-1,e,n,-t,r,s,3),g("x","y","z",1,-1,e,t,n,r,o,4),g("x","y","z",-1,-1,e,t,-n,r,o,5),this.setIndex(c),this.setAttribute("position",new Ze(l,3)),this.setAttribute("normal",new Ze(u,3)),this.setAttribute("uv",new Ze(d,2));function g(x,m,f,v,_,T,A,b,S,P,E){let w=T/S,I=A/P,O=T/2,te=A/2,D=b/2,G=S+1,X=P+1,z=0,V=0,j=new L;for(let ce=0;ce<X;ce++){let se=ce*I-te;for(let F=0;F<G;F++){let N=F*w-O;j[x]=N*v,j[m]=se*_,j[f]=D,l.push(j.x,j.y,j.z),j[x]=0,j[m]=0,j[f]=b>0?1:-1,u.push(j.x,j.y,j.z),d.push(F/S),d.push(1-ce/P),z+=1}}for(let ce=0;ce<P;ce++)for(let se=0;se<S;se++){let F=h+se+G*ce,N=h+se+G*(ce+1),q=h+(se+1)+G*(ce+1),de=h+(se+1)+G*ce;c.push(F,N,de),c.push(N,q,de),V+=6}a.addGroup(p,V,E),p+=V,h+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ji(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function un(i){let e={};for(let t=0;t<i.length;t++){let n=Ji(i[t]);for(let r in n)e[r]=n[r]}return e}function xm(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Dc(i){return i.getRenderTarget()===null?i.outputColorSpace:Ke.workingColorSpace}var _m={clone:Ji,merge:un};var ym=`
void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;var vm=`
void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}
`;var dn=class extends Dt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ym,this.fragmentShader=vm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ji(e.uniforms),this.uniformsGroups=xm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}};var Ko=class extends Xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ue,this.projectionMatrix=new Ue,this.projectionMatrixInverse=new Ue,this.coordinateSystem=bn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};var ft=class extends Ko{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Xi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(mr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Xi*2*Math.atan(Math.tan(mr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,o,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(mr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,o=-.5*r,s=this.view;if(this.view!==null&&this.view.enabled){let c=s.fullWidth,l=s.fullHeight;o+=s.offsetX*r/c,t-=s.offsetY*n/l,r*=s.width/c,n*=s.height/l}let a=this.filmOffset;a!==0&&(o+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Zo=-90,Jo=1,Uc=class extends Xe{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new ft(Zo,Jo,e,t);r.layers=this.layers,this.add(r);let o=new ft(Zo,Jo,e,t);o.layers=this.layers,this.add(o);let s=new ft(Zo,Jo,e,t);s.layers=this.layers,this.add(s);let a=new ft(Zo,Jo,e,t);a.layers=this.layers,this.add(a);let c=new ft(Zo,Jo,e,t);c.layers=this.layers,this.add(c);let l=new ft(Zo,Jo,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,o,s,a,c]=t;for(let l of t)this.remove(l);if(e===bn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Yr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[o,s,a,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,o),e.setRenderTarget(n,1,r),e.render(t,s),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}};var Qo=class extends mt{constructor(e,t,n,r,o,s,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:oi,super(e,t,n,r,o,s,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Nc=class extends Sn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(xr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ci?nt:Jt),this.texture=new Qo(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Bt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Zn(5,5,5),o=new dn({name:"CubemapFromEquirect",uniforms:Ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:bt,blending:Wn});o.uniforms.tEquirect.value=t;let s=new Ge(r,o),a=t.minFilter;return t.minFilter===qn&&(t.minFilter=Bt),new Uc(1,10,this).update(e,s),t.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,n,r){let o=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,r);e.setRenderTarget(o)}};var yd=new L,sE=new L,aE=new Oe,hi=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=yd.subVectors(n,t).cross(sE.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(yd),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||aE.getNormalMatrix(e),r=this.coplanarPoint(yd).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}};var Zr=new At,Bc=new L,wr=class{constructor(e=new hi,t=new hi,n=new hi,r=new hi,o=new hi,s=new hi){this.planes=[e,t,n,r,o,s]}set(e,t,n,r,o,s){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(o),a[5].copy(s),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=bn){let n=this.planes,r=e.elements,o=r[0],s=r[1],a=r[2],c=r[3],l=r[4],u=r[5],d=r[6],h=r[7],p=r[8],g=r[9],x=r[10],m=r[11],f=r[12],v=r[13],_=r[14],T=r[15];if(n[0].setComponents(c-o,h-l,m-p,T-f).normalize(),n[1].setComponents(c+o,h+l,m+p,T+f).normalize(),n[2].setComponents(c+s,h+u,m+g,T+v).normalize(),n[3].setComponents(c-s,h-u,m-g,T-v).normalize(),n[4].setComponents(c-a,h-d,m-x,T-_).normalize(),t===bn)n[5].setComponents(c+a,h+d,m+x,T+_).normalize();else if(t===Yr)n[5].setComponents(a,d,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Zr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Zr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Zr)}intersectsSprite(e){return Zr.center.set(0,0,0),Zr.radius=.7071067811865476,Zr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Bc.x=r.normal.x>0?e.max.x:e.min.x,Bc.y=r.normal.y>0?e.max.y:e.min.y,Bc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Bc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Fc(){let i=null,e=!1,t=null,n=null;function r(o,s){t(o,s),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){i=o}}}function Em(i,e){let t=e.isWebGL2,n=new WeakMap;function r(l,u){let d=l.array,h=l.usage,p=d.byteLength,g=i.createBuffer();i.bindBuffer(u,g),i.bufferData(u,d,h),l.onUploadCallback();let x;if(d instanceof Float32Array)x=i.FLOAT;else if(d instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)x=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=i.UNSIGNED_SHORT;else if(d instanceof Int16Array)x=i.SHORT;else if(d instanceof Uint32Array)x=i.UNSIGNED_INT;else if(d instanceof Int32Array)x=i.INT;else if(d instanceof Int8Array)x=i.BYTE;else if(d instanceof Uint8Array)x=i.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)x=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:x,bytesPerElement:d.BYTES_PER_ELEMENT,version:l.version,size:p}}function o(l,u,d){let h=u.array,p=u._updateRange,g=u.updateRanges;if(i.bindBuffer(d,l),p.count===-1&&g.length===0&&i.bufferSubData(d,0,h),g.length!==0){for(let x=0,m=g.length;x<m;x++){let f=g[x];t?i.bufferSubData(d,f.start*h.BYTES_PER_ELEMENT,h,f.start,f.count):i.bufferSubData(d,f.start*h.BYTES_PER_ELEMENT,h.subarray(f.start,f.start+f.count))}u.clearUpdateRanges()}p.count!==-1&&(t?i.bufferSubData(d,p.offset*h.BYTES_PER_ELEMENT,h,p.offset,p.count):i.bufferSubData(d,p.offset*h.BYTES_PER_ELEMENT,h.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);u&&(i.deleteBuffer(u.buffer),n.delete(l))}function c(l,u){if(l.isGLBufferAttribute){let h=n.get(l);(!h||h.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let d=n.get(l);if(d===void 0)n.set(l,r(l,u));else if(d.version<l.version){if(d.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");o(d.buffer,l,u),d.version=l.version}}return{get:s,remove:a,update:c}}var Jr=class i extends Je{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let o=e/2,s=t/2,a=Math.floor(n),c=Math.floor(r),l=a+1,u=c+1,d=e/a,h=t/c,p=[],g=[],x=[],m=[];for(let f=0;f<u;f++){let v=f*h-s;for(let _=0;_<l;_++){let T=_*d-o;g.push(T,-v,0),x.push(0,0,1),m.push(_/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let v=0;v<a;v++){let _=v+l*f,T=v+l*(f+1),A=v+1+l*(f+1),b=v+1+l*f;p.push(_,T,b),p.push(T,A,b)}this.setIndex(p),this.setAttribute("position",new Ze(g,3)),this.setAttribute("normal",new Ze(x,3)),this.setAttribute("uv",new Ze(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Mm=`
#ifdef USE_ALPHAHASH

	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;

#endif
`;var bm=`
#ifdef USE_ALPHAHASH

	/**
	 * See: https://casual-effects.com/research/Wyman2017Hashed/index.html
	 */

	const float ALPHA_HASH_SCALE = 0.05; // Derived from trials only, and may be changed.

	float hash2D( vec2 value ) {

		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );

	}

	float hash3D( vec3 value ) {

		return hash2D( vec2( hash2D( value.xy ), value.z ) );

	}

	float getAlphaHashThreshold( vec3 position ) {

		// Find the discretized derivatives of our coordinates
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );

		// Find two nearest log-discretized noise scales
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);

		// Compute alpha thresholds at our two noise scales
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);

		// Factor to interpolate lerp with
		float lerpFactor = fract( log2( pixScale ) );

		// Interpolate alpha threshold from noise at two scales
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;

		// Pass into CDF to compute uniformly distrib threshold
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);

		// Find our final, uniformly distributed alpha threshold (\u03B1\u03C4)
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;

		// Avoids \u03B1\u03C4 == 0. Could also do \u03B1\u03C4 =1-\u03B1\u03C4
		return clamp( threshold , 1.0e-6, 1.0 );

	}

#endif
`;var Tm=`
#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;

#endif
`;var Sm=`
#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`;var wm=`
#ifdef USE_ALPHATEST

	if ( diffuseColor.a < alphaTest ) discard;

#endif
`;var Am=`
#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif
`;var Rm=`
#ifdef USE_AOMAP

	// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;

	reflectedLight.indirectDiffuse *= ambientOcclusion;

	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif

	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif

	#if defined( USE_ENVMAP ) && defined( STANDARD )

		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );

		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );

	#endif

#endif
`;var Cm=`
#ifdef USE_AOMAP

	uniform sampler2D aoMap;
	uniform float aoMapIntensity;

#endif
`;var Lm=`
#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {

		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );

	}
#endif
`;var Pm=`
#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif
`;var Im=`
vec3 transformed = vec3( position );

#ifdef USE_ALPHAHASH

	vPosition = vec3( position );

#endif
`;var Dm=`
vec3 objectNormal = vec3( normal );

#ifdef USE_TANGENT

	vec3 objectTangent = vec3( tangent.xyz );

#endif
`;var Um=`

float G_BlinnPhong_Implicit( /* const in float dotNL, const in float dotNV */ ) {

	// geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)
	return 0.25;

}

float D_BlinnPhong( const in float shininess, const in float dotNH ) {

	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );

}

vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );

	vec3 F = F_Schlick( specularColor, 1.0, dotVH );

	float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );

	float D = D_BlinnPhong( shininess, dotNH );

	return F * ( G * D );

} // validated

`;var Nm=`

#ifdef USE_IRIDESCENCE

	// XYZ to linear-sRGB color space
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);

	// Assume air interface for top
	// Note: We don't handle the case fresnel0 == 1
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {

		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );

	}

	// Conversion FO/IOR
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {

		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );

	}

	// ior is a value between 1.0 and 3.0. 1.0 is air interface
	float IorToFresnel0( float transmittedIor, float incidentIor ) {

		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));

	}

	// Fresnel equations for dielectric/dielectric interfaces.
	// Ref: https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html
	// Evaluation XYZ sensitivity curves in Fourier space
	vec3 evalSensitivity( float OPD, vec3 shift ) {

		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );

		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;

		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;

	}

	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {

		vec3 I;

		// Force iridescenceIOR -> outsideIOR when thinFilmThickness -> 0.0
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		// Evaluate the cosTheta on the base layer (Snell law)
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );

		// Handle TIR:
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {

			return vec3( 1.0 );

		}

		float cosTheta2 = sqrt( cosTheta2Sq );

		// First interface
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;

		// Second interface
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) ); // guard against 1.0
		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;

		// Phase shift
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;

		// Compound terms
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );

		// Reflectance term for m = 0 (DC term amplitude)
		vec3 C0 = R12 + Rs;
		I = C0;

		// Reflectance term for m > 0 (pairs of diracs)
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {

			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;

		}

		// Since out of gamut colors might be produced, negative color values are clamped to 0.
		return max( I, vec3( 0.0 ) );

	}

#endif

`;var Bm=`
#ifdef USE_BUMPMAP

	uniform sampler2D bumpMap;
	uniform float bumpScale;

	// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
	// https://mmikk.github.io/papers3d/mm_sfgrad_bump.pdf

	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

	vec2 dHdxy_fwd() {

		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );

		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;

		return vec2( dBx, dBy );

	}

	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

		// normalize is done to ensure that the bump map looks the same regardless of the texture's scale
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm; // normalized

		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );

		float fDet = dot( vSigmaX, R1 ) * faceDirection;

		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );

	}

#endif
`;var Fm=`
#if NUM_CLIPPING_PLANES > 0

	vec4 plane;

	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {

		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;

	}
	#pragma unroll_loop_end

	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

		bool clipped = true;

		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {

			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;

		}
		#pragma unroll_loop_end

		if ( clipped ) discard;

	#endif

#endif
`;var Om=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif
`;var Hm=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

#endif
`;var km=`
#if NUM_CLIPPING_PLANES > 0

	vClipPosition = - mvPosition.xyz;

#endif
`;var zm=`
#if defined( USE_COLOR_ALPHA )

	diffuseColor *= vColor;

#elif defined( USE_COLOR )

	diffuseColor.rgb *= vColor;

#endif
`;var Gm=`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR )

	varying vec3 vColor;

#endif
`;var Vm=`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )

	varying vec3 vColor;

#endif
`;var Wm=`
#if defined( USE_COLOR_ALPHA )

	vColor = vec4( 1.0 );

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )

	vColor = vec3( 1.0 );

#endif

#ifdef USE_COLOR

	vColor *= color;

#endif

#ifdef USE_INSTANCING_COLOR

	vColor.xyz *= instanceColor.xyz;

#endif
`;var Xm=`
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
// <tonemapping_pars_fragment> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( const in vec2 uv ) {

	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

	return fract( sin( sn ) * c );

}

#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif

struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};

struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};

#ifdef USE_ALPHAHASH

	varying vec3 vPosition;

#endif

vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

}

vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {

	// dir can be either a direction vector or a normal vector
	// upper-left 3x3 of matrix is assumed to be orthogonal

	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );

}

mat3 transposeMat3( const in mat3 m ) {

	mat3 tmp;

	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );

	return tmp;

}

float luminance( const in vec3 rgb ) {

	// assumes rgb is in linear color space with sRGB primaries and D65 white point

	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );

	return dot( weights, rgb );

}

bool isPerspectiveMatrix( mat4 m ) {

	return m[ 2 ][ 3 ] == - 1.0;

}

vec2 equirectUv( in vec3 dir ) {

	// dir is assumed to be unit length

	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;

	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;

	return vec2( u, v );

}

vec3 BRDF_Lambert( const in vec3 diffuseColor ) {

	return RECIPROCAL_PI * diffuseColor;

} // validated

vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotVH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated

float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotVH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated
`;var qm=`
#ifdef ENVMAP_TYPE_CUBE_UV

	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0

	// These shader functions convert between the UV coordinates of a single face of
	// a cubemap, the 0-5 integer index of a cube face, and the direction vector for
	// sampling a textureCube (not generally normalized ).

	float getFace( vec3 direction ) {

		vec3 absDirection = abs( direction );

		float face = - 1.0;

		if ( absDirection.x > absDirection.z ) {

			if ( absDirection.x > absDirection.y )

				face = direction.x > 0.0 ? 0.0 : 3.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		} else {

			if ( absDirection.z > absDirection.y )

				face = direction.z > 0.0 ? 2.0 : 5.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		}

		return face;

	}

	// RH coordinate system; PMREM face-indexing convention
	vec2 getUV( vec3 direction, float face ) {

		vec2 uv;

		if ( face == 0.0 ) {

			uv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x

		} else if ( face == 1.0 ) {

			uv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y

		} else if ( face == 2.0 ) {

			uv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z

		} else if ( face == 3.0 ) {

			uv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x

		} else if ( face == 4.0 ) {

			uv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y

		} else {

			uv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z

		}

		return 0.5 * ( uv + 1.0 );

	}

	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {

		float face = getFace( direction );

		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );

		mipInt = max( mipInt, cubeUV_minMipLevel );

		float faceSize = exp2( mipInt );

		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0; // #25071

		if ( face > 2.0 ) {

			uv.y += faceSize;

			face -= 3.0;

		}

		uv.x += face * faceSize;

		uv.x += filterInt * 3.0 * cubeUV_minTileSize;

		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );

		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;

		#ifdef texture2DGradEXT

			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb; // disable anisotropic filtering

		#else

			return texture2D( envMap, uv ).rgb;

		#endif

	}

	// These defines must match with PMREMGenerator

	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0

	float roughnessToMip( float roughness ) {

		float mip = 0.0;

		if ( roughness >= cubeUV_r1 ) {

			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;

		} else if ( roughness >= cubeUV_r4 ) {

			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;

		} else if ( roughness >= cubeUV_r5 ) {

			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;

		} else if ( roughness >= cubeUV_r6 ) {

			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;

		} else {

			mip = - 2.0 * log2( 1.16 * roughness ); // 1.16 = 1.79^0.25
		}

		return mip;

	}

	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {

		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );

		float mipF = fract( mip );

		float mipInt = floor( mip );

		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );

		if ( mipF == 0.0 ) {

			return vec4( color0, 1.0 );

		} else {

			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );

			return vec4( mix( color0, color1, mipF ), 1.0 );

		}

	}

#endif
`;var Ym=`

vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT

	vec3 transformedTangent = objectTangent;

#endif

#ifdef USE_BATCHING

	// this is in lieu of a per-instance normal-matrix
	// shear transforms in the instance matrix are not supported

	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;

	#ifdef USE_TANGENT

		transformedTangent = bm * transformedTangent;

	#endif

#endif

#ifdef USE_INSTANCING

	// this is in lieu of a per-instance normal-matrix
	// shear transforms in the instance matrix are not supported

	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;

	#ifdef USE_TANGENT

		transformedTangent = im * transformedTangent;

	#endif

#endif

transformedNormal = normalMatrix * transformedNormal;

#ifdef FLIP_SIDED

	transformedNormal = - transformedNormal;

#endif

#ifdef USE_TANGENT

	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;

	#ifdef FLIP_SIDED

		transformedTangent = - transformedTangent;

	#endif

#endif
`;var jm=`
#ifdef USE_DISPLACEMENTMAP

	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;

#endif
`;var $m=`
#ifdef USE_DISPLACEMENTMAP

	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );

#endif
`;var Km=`
#ifdef USE_EMISSIVEMAP

	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );

	totalEmissiveRadiance *= emissiveColor.rgb;

#endif
`;var Zm=`
#ifdef USE_EMISSIVEMAP

	uniform sampler2D emissiveMap;

#endif
`;var Jm=`
gl_FragColor = linearToOutputTexel( gl_FragColor );
`;var Qm=`

// http://www.russellcottrell.com/photo/matrixCalculator.htm

// Linear sRGB => XYZ => Linear Display P3
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);

// Linear Display P3 => XYZ => Linear sRGB
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);

vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}

vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}

vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}

vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

// @deprecated, r156
vec4 LinearToLinear( in vec4 value ) {
	return value;
}

// @deprecated, r156
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}
`;var eg=`
#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

		vec3 cameraToFrag;

		if ( isOrthographic ) {

			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

		} else {

			cameraToFrag = normalize( vWorldPosition - cameraPosition );

		}

		// Transforming Normal Vectors with the Inverse Transformation
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vec3 reflectVec = reflect( cameraToFrag, worldNormal );

		#else

			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );

		#endif

	#else

		vec3 reflectVec = vReflect;

	#endif

	#ifdef ENVMAP_TYPE_CUBE

		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );

	#else

		vec4 envColor = vec4( 0.0 );

	#endif

	#ifdef ENVMAP_BLENDING_MULTIPLY

		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );

	#elif defined( ENVMAP_BLENDING_MIX )

		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );

	#elif defined( ENVMAP_BLENDING_ADD )

		outgoingLight += envColor.xyz * specularStrength * reflectivity;

	#endif

#endif
`;var tg=`
#ifdef USE_ENVMAP

	uniform float envMapIntensity;
	uniform float flipEnvMap;

	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif
`;var ng=`
#ifdef USE_ENVMAP

	uniform float reflectivity;

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif

#endif
`;var ig=`
#ifdef USE_ENVMAP

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;

	#else

		varying vec3 vReflect;
		uniform float refractionRatio;

	#endif

#endif
`;var rg=`
#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

		vWorldPosition = worldPosition.xyz;

	#else

		vec3 cameraToVertex;

		if ( isOrthographic ) {

			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

		} else {

			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );

		}

		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vReflect = reflect( cameraToVertex, worldNormal );

		#else

			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );

		#endif

	#endif

#endif
`;var og=`
#ifdef USE_FOG

	vFogDepth = - mvPosition.z;

#endif
`;var sg=`
#ifdef USE_FOG

	varying float vFogDepth;

#endif
`;var ag=`
#ifdef USE_FOG

	#ifdef FOG_EXP2

		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );

	#else

		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );

	#endif

	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

#endif
`;var cg=`
#ifdef USE_FOG

	uniform vec3 fogColor;
	varying float vFogDepth;

	#ifdef FOG_EXP2

		uniform float fogDensity;

	#else

		uniform float fogNear;
		uniform float fogFar;

	#endif

#endif
`;var lg=`

#ifdef USE_GRADIENTMAP

	uniform sampler2D gradientMap;

#endif

vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {

	// dotNL will be from -1.0 to 1.0
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );

	#ifdef USE_GRADIENTMAP

		return vec3( texture2D( gradientMap, coord ).r );

	#else

		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );

	#endif

}
`;var ug=`
#ifdef USE_LIGHTMAP

	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;

	reflectedLight.indirectDiffuse += lightMapIrradiance;

#endif
`;var dg=`
#ifdef USE_LIGHTMAP

	uniform sampler2D lightMap;
	uniform float lightMapIntensity;

#endif
`;var hg=`
LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;
`;var fg=`
varying vec3 vViewPosition;

struct LambertMaterial {

	vec3 diffuseColor;
	float specularStrength;

};

void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert
`;var pg=`
uniform bool receiveShadow;
uniform vec3 ambientLightColor;

#if defined( USE_LIGHT_PROBES )

	uniform vec3 lightProbe[ 9 ];

#endif

// get the irradiance (radiance convolved with cosine lobe) at the point 'normal' on the unit sphere
// source: https://graphics.stanford.edu/papers/envmap/envmap.pdf
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {

	// normal is assumed to have unit length

	float x = normal.x, y = normal.y, z = normal.z;

	// band 0
	vec3 result = shCoefficients[ 0 ] * 0.886227;

	// band 1
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;

	// band 2
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );

	return result;

}

vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {

	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );

	return irradiance;

}

vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {

	vec3 irradiance = ambientLightColor;

	return irradiance;

}

float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

	#if defined ( LEGACY_LIGHTS )

		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {

			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );

		}

		return 1.0;

	#else

		// based upon Frostbite 3 Moving to Physically-based Rendering
		// page 32, equation 26: E[window1]
		// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );

		if ( cutoffDistance > 0.0 ) {

			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

		}

		return distanceFalloff;

	#endif

}

float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {

	return smoothstep( coneCosine, penumbraCosine, angleCosine );

}

#if NUM_DIR_LIGHTS > 0

	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};

	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];

	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {

		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;

	}

#endif


#if NUM_POINT_LIGHTS > 0

	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};

	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

	// light is an out parameter as having it as a return value caused compiler errors on some devices
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {

		vec3 lVector = pointLight.position - geometryPosition;

		light.direction = normalize( lVector );

		float lightDistance = length( lVector );

		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );

	}

#endif


#if NUM_SPOT_LIGHTS > 0

	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};

	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];

	// light is an out parameter as having it as a return value caused compiler errors on some devices
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {

		vec3 lVector = spotLight.position - geometryPosition;

		light.direction = normalize( lVector );

		float angleCos = dot( light.direction, spotLight.direction );

		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );

		if ( spotAttenuation > 0.0 ) {

			float lightDistance = length( lVector );

			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );

		} else {

			light.color = vec3( 0.0 );
			light.visible = false;

		}

	}

#endif


#if NUM_RECT_AREA_LIGHTS > 0

	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};

	// Pre-computed values of LinearTransformedCosine approximation of BRDF
	// BRDF approximation Texture is 64x64
	uniform sampler2D ltc_1; // RGBA Float
	uniform sampler2D ltc_2; // RGBA Float

	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];

#endif


#if NUM_HEMI_LIGHTS > 0

	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};

	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];

	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {

		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;

		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );

		return irradiance;

	}

#endif
`;var mg=`
#ifdef USE_ENVMAP

	vec3 getIBLIrradiance( const in vec3 normal ) {

		#ifdef ENVMAP_TYPE_CUBE_UV

			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );

			return PI * envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {

		#ifdef ENVMAP_TYPE_CUBE_UV

			vec3 reflectVec = reflect( - viewDir, normal );

			// Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );

			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );

			return envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	#ifdef USE_ANISOTROPY

		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {

			#ifdef ENVMAP_TYPE_CUBE_UV

			  // https://google.github.io/filament/Filament.md.html#lighting/imagebasedlights/anisotropy
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );

				return getIBLRadiance( viewDir, bentNormal, roughness );

			#else

				return vec3( 0.0 );

			#endif

		}

	#endif

#endif
`;var gg=`
ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;
`;var xg=`
varying vec3 vViewPosition;

struct ToonMaterial {

	vec3 diffuseColor;

};

void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
`;var _g=`
BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;
`;var yg=`
varying vec3 vViewPosition;

struct BlinnPhongMaterial {

	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;

};

void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;

}

void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
`;var vg=`
PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );

vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );

material.roughness = max( roughnessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );

#ifdef IOR

	material.ior = ior;

	#ifdef USE_SPECULAR

		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;

		#ifdef USE_SPECULAR_COLORMAP

			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;

		#endif

		#ifdef USE_SPECULAR_INTENSITYMAP

			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;

		#endif

		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );

	#else

		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;

	#endif

	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );

#else

	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;

#endif

#ifdef USE_CLEARCOAT

	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;

	#ifdef USE_CLEARCOATMAP

		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;

	#endif

	#ifdef USE_CLEARCOAT_ROUGHNESSMAP

		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;

	#endif

	material.clearcoat = saturate( material.clearcoat ); // Burley clearcoat model
	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );

#endif

#ifdef USE_IRIDESCENCE

	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;

	#ifdef USE_IRIDESCENCEMAP

		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;

	#endif

	#ifdef USE_IRIDESCENCE_THICKNESSMAP

		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;

	#else

		material.iridescenceThickness = iridescenceThicknessMaximum;

	#endif

#endif

#ifdef USE_SHEEN

	material.sheenColor = sheenColor;

	#ifdef USE_SHEEN_COLORMAP

		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;

	#endif

	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );

	#ifdef USE_SHEEN_ROUGHNESSMAP

		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;

	#endif

#endif

#ifdef USE_ANISOTROPY

	#ifdef USE_ANISOTROPYMAP

		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;

	#else

		vec2 anisotropyV = anisotropyVector;

	#endif

	material.anisotropy = length( anisotropyV );

	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}

	// Roughness along the anisotropy bitangent is the material roughness, while the tangent roughness increases with anisotropy.
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );

	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;

#endif
`;var Eg=`

struct PhysicalMaterial {

	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;

	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif

	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif

	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif

	#ifdef IOR
		float ior;
	#endif

	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif

	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif

};

// temporary
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );

vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );

    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}

// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2
// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {

	float a2 = pow2( alpha );

	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );

	return 0.5 / max( gv + gl, EPSILON );

}

// Microfacet Models for Refraction through Rough Surfaces - equation (33)
// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html
// alpha is "roughness squared" in Disney\u2019s reparameterization
float D_GGX( const in float alpha, const in float dotNH ) {

	float a2 = pow2( alpha );

	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1

	return RECIPROCAL_PI * a2 / pow2( denom );

}

// https://google.github.io/filament/Filament.md.html#materialsystem/anisotropicmodel/anisotropicspecularbrdf
#ifdef USE_ANISOTROPY

	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {

		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );

		return saturate(v);

	}

	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {

		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;

		return RECIPROCAL_PI * a2 * pow2 ( w2 );

	}

#endif

#ifdef USE_CLEARCOAT

	// GGX Distribution, Schlick Fresnel, GGX_SmithCorrelated Visibility
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {

		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;

		float alpha = pow2( roughness ); // UE4's roughness

		vec3 halfDir = normalize( lightDir + viewDir );

		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );

		vec3 F = F_Schlick( f0, f90, dotVH );

		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

		float D = D_GGX( alpha, dotNH );

		return F * ( V * D );

	}

#endif

vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {

	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;

	float alpha = pow2( roughness ); // UE4's roughness

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );

	vec3 F = F_Schlick( f0, f90, dotVH );

	#ifdef USE_IRIDESCENCE

		F = mix( F, material.iridescenceFresnel, material.iridescence );

	#endif

	#ifdef USE_ANISOTROPY

		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );

		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );

		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );

	#else

		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

		float D = D_GGX( alpha, dotNH );

	#endif

	return F * ( V * D );

}

// Rect Area Light

// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines
// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt
// code: https://github.com/selfshadow/ltc_code/

vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {

	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;

	float dotNV = saturate( dot( N, V ) );

	// texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );

	uv = uv * LUT_SCALE + LUT_BIAS;

	return uv;

}

float LTC_ClippedSphereFormFactor( const in vec3 f ) {

	// Real-Time Area Lighting: a Journey from Research to Production (p.102)
	// An approximation of the form factor of a horizon-clipped rectangle.

	float l = length( f );

	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );

}

vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {

	float x = dot( v1, v2 );

	float y = abs( x );

	// rational polynomial approximation to theta / sin( theta ) / 2PI
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;

	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;

	return cross( v1, v2 ) * theta_sintheta;

}

vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {

	// bail if point is on back side of plane of light
	// assumes ccw winding order of light vertices
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );

	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );

	// construct orthonormal basis around N
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system

	// compute transform
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );

	// transform rect
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );

	// project rect onto sphere
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );

	// calculate vector form factor
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );

	// adjust for horizon clipping
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );

/*
	// alternate method of adjusting for horizon clipping (see referece)
	// refactoring required
	float len = length( vectorFormFactor );
	float z = vectorFormFactor.z / len;

	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;

	// tabulated horizon-clipped sphere, apparently...
	vec2 uv = vec2( z * 0.5 + 0.5, len );
	uv = uv * LUT_SCALE + LUT_BIAS;

	float scale = texture2D( ltc_2, uv ).w;

	float result = len * scale;
*/

	return vec3( result );

}

// End Rect Area Light

#if defined( USE_SHEEN )

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs
float D_Charlie( float roughness, float dotNH ) {

	float alpha = pow2( roughness );

	// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF"
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 ); // 2^(-14/2), so sin2h^2 > 0 in fp16

	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );

}

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs
float V_Neubelt( float dotNV, float dotNL ) {

	// Neubelt and Pettineo 2013, "Crafting a Next-gen Material Pipeline for The Order: 1886"
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );

}

vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );

	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );

	return sheenColor * ( D * V );

}

#endif

// This is a curve-fit approxmation to the "Charlie sheen" BRDF integrated over the hemisphere from 
// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF". The analysis can be found
// in the Sheen section of https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {

	float dotNV = saturate( dot( normal, viewDir ) );

	float r2 = roughness * roughness;

	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;

	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;

	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );

	return saturate( DG * RECIPROCAL_PI );

}

// Analytical approximation of the DFG LUT, one half of the
// split-sum approximation used in indirect specular lighting.
// via 'environmentBRDF' from "Physically Based Shading on Mobile"
// https://www.unrealengine.com/blog/physically-based-shading-on-mobile
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {

	float dotNV = saturate( dot( normal, viewDir ) );

	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );

	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );

	vec4 r = roughness * c0 + c1;

	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;

	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;

	return fab;

}

vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {

	vec2 fab = DFGApprox( normal, viewDir, roughness );

	return specularColor * fab.x + specularF90 * fab.y;

}

// Fdez-Ag\xFCera's "Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting"
// Approximates multiscattering in order to preserve energy.
// http://www.jcgt.org/published/0008/01/03/
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif

	vec2 fab = DFGApprox( normal, viewDir, roughness );

	#ifdef USE_IRIDESCENCE

		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );

	#else

		vec3 Fr = specularColor;

	#endif

	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;

	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;

	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619; // 1/21
	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );

	singleScatter += FssEss;
	multiScatter += Fms * Ems;

}

#if NUM_RECT_AREA_LIGHTS > 0

	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;

		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction
		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;

		vec2 uv = LTC_Uv( normal, viewDir, roughness );

		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );

		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);

		// LTC Fresnel Approximation by Stephen Hill
		// http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );

		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );

		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );

	}

#endif

void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );

	vec3 irradiance = dotNL * directLight.color;

	#ifdef USE_CLEARCOAT

		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );

		vec3 ccIrradiance = dotNLcc * directLight.color;

		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );

	#endif

	#ifdef USE_SHEEN

		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );

	#endif

	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}

void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {

	#ifdef USE_CLEARCOAT

		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );

	#endif

	#ifdef USE_SHEEN

		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );

	#endif

	// Both indirect specular and indirect diffuse light accumulate here

	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;

	#ifdef USE_IRIDESCENCE

		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );

	#else

		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );

	#endif

	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );

	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;

	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;

}

#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical

// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {

	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );

}
`;var Mg=`
/**
 * This is a template that can be used to light a material, it uses pluggable
 * RenderEquations (RE)for specific lighting scenarios.
 *
 * Instructions for use:
 * - Ensure that both RE_Direct, RE_IndirectDiffuse and RE_IndirectSpecular are defined
 * - Create a material parameter that is to be passed as the third parameter to your lighting functions.
 *
 * TODO:
 * - Add area light support.
 * - Add sphere light support.
 * - Add diffuse light probe (irradiance cubemap) support.
 */

vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

vec3 geometryClearcoatNormal = vec3( 0.0 );

#ifdef USE_CLEARCOAT

	geometryClearcoatNormal = clearcoatNormal;

#endif

#ifdef USE_IRIDESCENCE

	float dotNVi = saturate( dot( normal, geometryViewDir ) );

	if ( material.iridescenceThickness == 0.0 ) {

		material.iridescence = 0.0;

	} else {

		material.iridescence = saturate( material.iridescence );

	}

	if ( material.iridescence > 0.0 ) {

		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );

		// Iridescence F0 approximation
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );

	}

#endif

IncidentLight directLight;

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];

		getPointLightInfo( pointLight, geometryPosition, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;

	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];

		getSpotLightInfo( spotLight, geometryPosition, directLight );

		// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif

		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif

		#undef SPOT_LIGHT_MAP_INDEX

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];

		getDirectionalLightInfo( directionalLight, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

	RectAreaLight rectAreaLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )

	vec3 iblIrradiance = vec3( 0.0 );

	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

	#if defined( USE_LIGHT_PROBES )

		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );

	#endif

	#if ( NUM_HEMI_LIGHTS > 0 )

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );

		}
		#pragma unroll_loop_end

	#endif

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`;var bg=`
#if defined( RE_IndirectDiffuse )

	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;

		irradiance += lightMapIrradiance;

	#endif

	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )

		iblIrradiance += getIBLIrradiance( geometryNormal );

	#endif

#endif

#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )

	#ifdef USE_ANISOTROPY

		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );

	#else

		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );

	#endif

	#ifdef USE_CLEARCOAT

		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );

	#endif

#endif
`;var Tg=`
#if defined( RE_IndirectDiffuse )

	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif

#if defined( RE_IndirectSpecular )

	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif
`;var Sg=`
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	// Doing a strict comparison with == 1.0 can cause noise artifacts
	// on some platforms. See issue #17623.
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;

#endif
`;var wg=`
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`;var Ag=`
#ifdef USE_LOGDEPTHBUF

	#ifdef USE_LOGDEPTHBUF_EXT

		varying float vFragDepth;
		varying float vIsPerspective;

	#else

		uniform float logDepthBufFC;

	#endif

#endif
`;var Rg=`
#ifdef USE_LOGDEPTHBUF

	#ifdef USE_LOGDEPTHBUF_EXT

		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );

	#else

		if ( isPerspectiveMatrix( projectionMatrix ) ) {

			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;

			gl_Position.z *= gl_Position.w;

		}

	#endif

#endif
`;var Cg=`
#ifdef USE_MAP

	vec4 sampledDiffuseColor = texture2D( map, vMapUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// use inline sRGB decode until browsers properly support SRGB8_APLHA8 with video textures

		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif

	diffuseColor *= sampledDiffuseColor;

#endif
`;var Lg=`
#ifdef USE_MAP

	uniform sampler2D map;

#endif
`;var Pg=`
#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

	#if defined( USE_POINTS_UV )

		vec2 uv = vUv;

	#else

		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;

	#endif

#endif

#ifdef USE_MAP

	diffuseColor *= texture2D( map, uv );

#endif

#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, uv ).g;

#endif
`;var Ig=`
#if defined( USE_POINTS_UV )

	varying vec2 vUv;

#else

	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

		uniform mat3 uvTransform;

	#endif

#endif

#ifdef USE_MAP

	uniform sampler2D map;

#endif

#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`;var Dg=`
float metalnessFactor = metalness;

#ifdef USE_METALNESSMAP

	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );

	// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	metalnessFactor *= texelMetalness.b;

#endif
`;var Ug=`
#ifdef USE_METALNESSMAP

	uniform sampler2D metalnessMap;

#endif
`;var Ng=`
#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	vColor *= morphTargetBaseInfluence;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		#if defined( USE_COLOR_ALPHA )

			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];

		#elif defined( USE_COLOR )

			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];

		#endif

	}

#endif
`;var Bg=`
#ifdef USE_MORPHNORMALS

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	objectNormal *= morphTargetBaseInfluence;

	#ifdef MORPHTARGETS_TEXTURE

		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];

		}

	#else

		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];

	#endif

#endif
`;var Fg=`
#ifdef USE_MORPHTARGETS

	uniform float morphTargetBaseInfluence;

	#ifdef MORPHTARGETS_TEXTURE

		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;

		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {

			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;

			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );

		}

	#else

		#ifndef USE_MORPHNORMALS

			uniform float morphTargetInfluences[ 8 ];

		#else

			uniform float morphTargetInfluences[ 4 ];

		#endif

	#endif

#endif
`;var Og=`
#ifdef USE_MORPHTARGETS

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in position = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	transformed *= morphTargetBaseInfluence;

	#ifdef MORPHTARGETS_TEXTURE

		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];

		}

	#else

		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];

		#ifndef USE_MORPHNORMALS

			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];

		#endif

	#endif

#endif
`;var Hg=`
float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;

#ifdef FLAT_SHADED

	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );

#else

	vec3 normal = normalize( vNormal );

	#ifdef DOUBLE_SIDED

		normal *= faceDirection;

	#endif

#endif

#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )

	#ifdef USE_TANGENT

		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

	#else

		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);

	#endif

	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;

	#endif

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	#ifdef USE_TANGENT

		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

	#else

		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );

	#endif

	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;

	#endif

#endif

// non perturbed normal for clearcoat among others

vec3 nonPerturbedNormal = normal;

`;var kg=`

#ifdef USE_NORMALMAP_OBJECTSPACE

	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

	#ifdef FLIP_SIDED

		normal = - normal;

	#endif

	#ifdef DOUBLE_SIDED

		normal = normal * faceDirection;

	#endif

	normal = normalize( normalMatrix * normal );

#elif defined( USE_NORMALMAP_TANGENTSPACE )

	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;

	normal = normalize( tbn * mapN );

#elif defined( USE_BUMPMAP )

	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );

#endif
`;var zg=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`;var Gg=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`;var Vg=`
#ifndef FLAT_SHADED // normal is computed with derivatives when FLAT_SHADED

	vNormal = normalize( transformedNormal );

	#ifdef USE_TANGENT

		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );

	#endif

#endif
`;var Wg=`
#ifdef USE_NORMALMAP

	uniform sampler2D normalMap;
	uniform vec2 normalScale;

#endif

#ifdef USE_NORMALMAP_OBJECTSPACE

	uniform mat3 normalMatrix;

#endif

#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )

	// Normal Mapping Without Precomputed Tangents
	// http://www.thetenthplanet.de/archives/1180

	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {

		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );

		vec3 N = surf_norm; // normalized

		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );

		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;

		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );

		return mat3( T * scale, B * scale, N );

	}

#endif
`;var Xg=`
#ifdef USE_CLEARCOAT

	vec3 clearcoatNormal = nonPerturbedNormal;

#endif
`;var qg=`
#ifdef USE_CLEARCOAT_NORMALMAP

	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;

	clearcoatNormal = normalize( tbn2 * clearcoatMapN );

#endif
`;var Yg=`

#ifdef USE_CLEARCOATMAP

	uniform sampler2D clearcoatMap;

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;

#endif

#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform sampler2D clearcoatRoughnessMap;

#endif
`;var jg=`

#ifdef USE_IRIDESCENCEMAP

	uniform sampler2D iridescenceMap;

#endif

#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform sampler2D iridescenceThicknessMap;

#endif
`;var $g=`
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif

gl_FragColor = vec4( outgoingLight, diffuseColor.a );
`;var Kg=`
vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}

vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}

const float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)
const float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)

const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );

const float ShiftRight8 = 1. / 256.;

vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8; // tidy overflow
	return r * PackUpscale;
}

float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}

vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}

float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}

vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}

vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}

// NOTE: viewZ, the z-coordinate in camera space, is negative for points in front of the camera

float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	// -near maps to 0; -far maps to 1
	return ( viewZ + near ) / ( near - far );
}

float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	// maps orthographic depth in [ 0, 1 ] to viewZ
	return depth * ( near - far ) - near;
}

// NOTE: https://twitter.com/gonnavis/status/1377183786949959682

float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	// -near maps to 0; -far maps to 1
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}

float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	// maps perspective depth in [ 0, 1 ] to viewZ
	return ( near * far ) / ( ( far - near ) * depth - far );
}
`;var Zg=`
#ifdef PREMULTIPLIED_ALPHA

	// Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.
	gl_FragColor.rgb *= gl_FragColor.a;

#endif
`;var Jg=`
vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_BATCHING

	mvPosition = batchingMatrix * mvPosition;

#endif

#ifdef USE_INSTANCING

	mvPosition = instanceMatrix * mvPosition;

#endif

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;
`;var Qg=`
#ifdef DITHERING

	gl_FragColor.rgb = dithering( gl_FragColor.rgb );

#endif
`;var e0=`
#ifdef DITHERING

	// based on https://www.shadertoy.com/view/MslGR8
	vec3 dithering( vec3 color ) {
		//Calculate grid position
		float grid_position = rand( gl_FragCoord.xy );

		//Shift the individual colors differently, thus making it even harder to see the dithering pattern
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );

		//modify shift according to grid position.
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );

		//shift the color by dither_shift
		return color + dither_shift_RGB;
	}

#endif
`;var t0=`
float roughnessFactor = roughness;

#ifdef USE_ROUGHNESSMAP

	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );

	// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	roughnessFactor *= texelRoughness.g;

#endif
`;var n0=`
#ifdef USE_ROUGHNESSMAP

	uniform sampler2D roughnessMap;

#endif
`;var i0=`
#if NUM_SPOT_LIGHT_COORDS > 0

	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];

#endif

#if NUM_SPOT_LIGHT_MAPS > 0

	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];

#endif

#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];

		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};

		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): create uniforms for area light shadows

	#endif
	*/

	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {

		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );

	}

	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {

		return unpackRGBATo2Half( texture2D( shadow, uv ) );

	}

	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){

		float occlusion = 1.0;

		vec2 distribution = texture2DDistribution( shadow, uv );

		float hard_shadow = step( compare , distribution.x ); // Hard Shadow

		if (hard_shadow != 1.0 ) {

			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance ); // Chebeyshevs inequality
			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 ); // 0.3 reduces light bleed
			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );

		}
		return occlusion;

	}

	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {

		float shadow = 1.0;

		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;

		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;

		if ( frustumTest ) {

		#if defined( SHADOWMAP_TYPE_PCF )

			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;

			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;

			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );

		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )

			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;

			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;

			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );

		#elif defined( SHADOWMAP_TYPE_VSM )

			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );

		#else // no percentage-closer filtering:

			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );

		#endif

		}

		return shadow;

	}

	// cubeToUV() maps a 3D direction vector suitable for cube texture mapping to a 2D
	// vector suitable for 2D texture mapping. This code uses the following layout for the
	// 2D texture:
	//
	// xzXZ
	//  y Y
	//
	// Y - Positive y direction
	// y - Negative y direction
	// X - Positive x direction
	// x - Negative x direction
	// Z - Positive z direction
	// z - Negative z direction
	//
	// Source and test bed:
	// https://gist.github.com/tschw/da10c43c467ce8afd0c4

	vec2 cubeToUV( vec3 v, float texelSizeY ) {

		// Number of texels to avoid at the edge of each square

		vec3 absV = abs( v );

		// Intersect unit cube

		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;

		// Apply scale to avoid seams

		// two texels less per square (one texel will do for NEAREST)
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );

		// Unwrap

		// space: -1 ... 1 range for each square
		//
		// #X##		dim    := ( 4 , 2 )
		//  # #		center := ( 1 , 1 )

		vec2 planar = v.xy;

		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;

		if ( absV.z >= almostOne ) {

			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;

		} else if ( absV.x >= almostOne ) {

			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;

		} else if ( absV.y >= almostOne ) {

			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;

		}

		// Transform to UV space

		// scale := 0.5 / dim
		// translate := ( center + 0.5 ) / dim
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );

	}

	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {

		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );

		// for point lights, the uniform @vShadowCoord is re-purposed to hold
		// the vector from the light to the world-space position of the fragment.
		vec3 lightToPosition = shadowCoord.xyz;

		// dp = normalized distance from light to fragment position
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear ); // need to clamp?
		dp += shadowBias;

		// bd3D = base direction 3D
		vec3 bd3D = normalize( lightToPosition );

		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )

			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;

			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );

		#else // no percentage-closer filtering

			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );

		#endif

	}

#endif
`;var r0=`

#if NUM_SPOT_LIGHT_COORDS > 0

	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];

#endif

#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};

		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): uniforms for area light shadows

	#endif
	*/

#endif
`;var o0=`

#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )

	// Offsetting the position used for querying occlusion along the world normal can be used to reduce shadow acne.
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;

#endif

#if defined( USE_SHADOWMAP )

	#if NUM_DIR_LIGHT_SHADOWS > 0

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;

		}
		#pragma unroll_loop_end

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;

		}
		#pragma unroll_loop_end

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update vAreaShadowCoord with area light info

	#endif
	*/

#endif

// spot lights can be evaluated without active shadow mapping (when SpotLight.map is used)

#if NUM_SPOT_LIGHT_COORDS > 0

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {

		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;

	}
	#pragma unroll_loop_end

#endif


`;var s0=`
float getShadowMask() {

	float shadow = 1.0;

	#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

	DirectionalLightShadow directionalLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

	SpotLightShadow spotLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {

		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

	PointLightShadow pointLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update shadow for Area light

	#endif
	*/

	#endif

	return shadow;

}
`;var a0=`
#ifdef USE_SKINNING

	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );

#endif
`;var c0=`
#ifdef USE_SKINNING

	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;

	uniform highp sampler2D boneTexture;

	mat4 getBoneMatrix( const in float i ) {

		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );

		return mat4( v1, v2, v3, v4 );

	}

#endif
`;var l0=`
#ifdef USE_SKINNING

	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );

	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;

	transformed = ( bindMatrixInverse * skinned ).xyz;

#endif
`;var u0=`
#ifdef USE_SKINNING

	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;

	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;

	#ifdef USE_TANGENT

		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;

	#endif

#endif
`;var d0=`
float specularStrength;

#ifdef USE_SPECULARMAP

	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;

#else

	specularStrength = 1.0;

#endif
`;var h0=`
#ifdef USE_SPECULARMAP

	uniform sampler2D specularMap;

#endif
`;var f0=`
#if defined( TONE_MAPPING )

	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );

#endif
`;var p0=`
#ifndef saturate
// <common> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif

uniform float toneMappingExposure;

// exposure only
vec3 LinearToneMapping( vec3 color ) {

	return saturate( toneMappingExposure * color );

}

// source: https://www.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf
vec3 ReinhardToneMapping( vec3 color ) {

	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );

}

// source: http://filmicworlds.com/blog/filmic-tonemapping-operators/
vec3 OptimizedCineonToneMapping( vec3 color ) {

	// optimized filmic operator by Jim Hejl and Richard Burgess-Dawson
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );

}

// source: https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs
vec3 RRTAndODTFit( vec3 v ) {

	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;

}

// this implementation of ACES is modified to accommodate a brighter viewing environment.
// the scale factor of 1/0.6 is subjective. see discussion in #19621.

vec3 ACESFilmicToneMapping( vec3 color ) {

	// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ), // transposed from source
		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);

	// ODT_SAT => XYZ => D60_2_D65 => sRGB
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ), // transposed from source
		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);

	color *= toneMappingExposure / 0.6;

	color = ACESInputMat * color;

	// Apply RRT and ODT
	color = RRTAndODTFit( color );

	color = ACESOutputMat * color;

	// Clamp to [0, 1]
	return saturate( color );

}

// Matrices for rec 2020 <> rec 709 color space conversion
// matrix provided in row-major order so it has been transposed
// https://www.itu.int/pub/R-REP-BT.2407-2017
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);

const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);

// https://iolite-engine.com/blog_posts/minimal_agx_implementation
// Mean error^2: 3.6705141e-06
vec3 agxDefaultContrastApprox( vec3 x ) {

	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;

	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;

}

// Input and output encoded as Linear-sRGB.
vec3 AgXToneMapping( vec3 color ) {

	// AgX constants
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);

	// explicit AgXOutsetMatrix generated from Filaments AgXOutsetMatrixInv
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);

	const float AgxMinEv = - 12.47393;  // log2(pow(2, LOG2_MIN) * MIDDLE_GRAY)
	const float AgxMaxEv = 4.026069;    // log2(pow(2, LOG2_MAX) * MIDDLE_GRAY)

	// AGX Tone Mapping implementation based on Filament, which is in turn based
	// on Blender's implementation for rec 2020 colors:
	// https://github.com/google/filament/pull/7236
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;

	color = AgXInsetMatrix * color;

	// Log2 encoding
	color = max( color, 1e-10 ); // avoid 0 or negative numbers for log2
	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );

	color = clamp( color, 0.0, 1.0 );

	// Apply sigmoid
	color = agxDefaultContrastApprox( color );

	// Apply AgX look
	// v = agxLook(v, look);

	color = AgXOutsetMatrix * color;

	// Linearize
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );

	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;

	return color;

}

vec3 CustomToneMapping( vec3 color ) { return color; }
`;var m0=`
#ifdef USE_TRANSMISSION

	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;

	#ifdef USE_TRANSMISSIONMAP

		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;

	#endif

	#ifdef USE_THICKNESSMAP

		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;

	#endif

	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );

	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );

	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );

	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );

#endif
`;var g0=`
#ifdef USE_TRANSMISSION

	// Transmission code is based on glTF-Sampler-Viewer
	// https://github.com/KhronosGroup/glTF-Sample-Viewer

	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;

	#ifdef USE_TRANSMISSIONMAP

		uniform sampler2D transmissionMap;

	#endif

	#ifdef USE_THICKNESSMAP

		uniform sampler2D thicknessMap;

	#endif

	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;

	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;

	varying vec3 vWorldPosition;

	// Mipped Bicubic Texture Filtering by N8
	// https://www.shadertoy.com/view/Dl2SDW

	float w0( float a ) {

		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );

	}

	float w1( float a ) {

		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );

	}

	float w2( float a ){

		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );

	}

	float w3( float a ) {

		return ( 1.0 / 6.0 ) * ( a * a * a );

	}

	// g0 and g1 are the two amplitude functions
	float g0( float a ) {

		return w0( a ) + w1( a );

	}

	float g1( float a ) {

		return w2( a ) + w3( a );

	}

	// h0 and h1 are the two offset functions
	float h0( float a ) {

		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );

	}

	float h1( float a ) {

		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );

	}

	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {

		uv = uv * texelSize.zw + 0.5;

		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );

		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );

		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;

		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );

	}

	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {

		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );

	}

	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {

		// Direction of refracted light.
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );

		// Compute rotation-independant scaling of the model matrix.
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );

		// The thickness is specified in local space.
		return normalize( refractionVector ) * thickness * modelScale;

	}

	float applyIorToRoughness( const in float roughness, const in float ior ) {

		// Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
		// an IOR of 1.5 results in the default amount of microfacet refraction.
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );

	}

	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {

		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );

	}

	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {

		if ( isinf( attenuationDistance ) ) {

			// Attenuation distance is +\u221E, i.e. the transmitted color is not attenuated at all.
			return vec3( 1.0 );

		} else {

			// Compute light attenuation using Beer's law.
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
			return transmittance;

		}

	}

	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {

		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;

		// Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;

		// Sample framebuffer to get pixel the refracted ray hits.
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );

		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;

		// Get the specular component.
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );

		// As less light is transmitted, the opacity should be increased. This simple approximation does a decent job 
		// of modulating a CSS background, and has no effect when the buffer is opaque, due to a solid object or clear color.
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;

		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );

	}
#endif
`;var x0=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	varying vec2 vUv;

#endif
#ifdef USE_MAP

	varying vec2 vMapUv;

#endif
#ifdef USE_ALPHAMAP

	varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

	varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

	varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

	varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

	varying vec2 vNormalMapUv;

#endif
#ifdef USE_EMISSIVEMAP

	varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

	varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

	varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_ANISOTROPYMAP

	varying vec2 vAnisotropyMapUv;

#endif
#ifdef USE_CLEARCOATMAP

	varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

	varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

	varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_SPECULARMAP

	varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

	varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;

#endif
`;var _0=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	varying vec2 vUv;

#endif
#ifdef USE_MAP

	uniform mat3 mapTransform;
	varying vec2 vMapUv;

#endif
#ifdef USE_ALPHAMAP

	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;

#endif
#ifdef USE_DISPLACEMENTMAP

	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;

#endif
#ifdef USE_EMISSIVEMAP

	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_ANISOTROPYMAP

	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;

#endif
#ifdef USE_CLEARCOATMAP

	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SPECULARMAP

	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;

#endif
`;var y0=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	vUv = vec3( uv, 1 ).xy;

#endif
#ifdef USE_MAP

	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ALPHAMAP

	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_LIGHTMAP

	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_AOMAP

	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_BUMPMAP

	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_NORMALMAP

	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_DISPLACEMENTMAP

	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_EMISSIVEMAP

	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_METALNESSMAP

	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ROUGHNESSMAP

	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ANISOTROPYMAP

	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOATMAP

	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_IRIDESCENCEMAP

	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SHEEN_COLORMAP

	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULARMAP

	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULAR_COLORMAP

	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_TRANSMISSIONMAP

	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_THICKNESSMAP

	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;

#endif
`;var v0=`
#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0

	vec4 worldPosition = vec4( transformed, 1.0 );

	#ifdef USE_BATCHING

		worldPosition = batchingMatrix * worldPosition;

	#endif

	#ifdef USE_INSTANCING

		worldPosition = instanceMatrix * worldPosition;

	#endif

	worldPosition = modelMatrix * worldPosition;

#endif
`;var E0=`
varying vec2 vUv;
uniform mat3 uvTransform;

void main() {

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	gl_Position = vec4( position.xy, 1.0, 1.0 );

}
`,M0=`
uniform sampler2D t2D;
uniform float backgroundIntensity;

varying vec2 vUv;

void main() {

	vec4 texColor = texture2D( t2D, vUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// use inline sRGB decode until browsers properly support SRGB8_APLHA8 with video textures

		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );

	#endif

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`;var b0=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,T0=`

#ifdef ENVMAP_TYPE_CUBE

	uniform samplerCube envMap;

#elif defined( ENVMAP_TYPE_CUBE_UV )

	uniform sampler2D envMap;

#endif

uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;

varying vec3 vWorldDirection;

#include <cube_uv_reflection_fragment>

void main() {

	#ifdef ENVMAP_TYPE_CUBE

		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );

	#elif defined( ENVMAP_TYPE_CUBE_UV )

		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );

	#else

		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );

	#endif

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`;var S0=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,w0=`
uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;

varying vec3 vWorldDirection;

void main() {

	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );

	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`;var A0=`
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

// This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.
// Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for
// depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.
varying vec2 vHighPrecisionZW;

void main() {

	#include <uv_vertex>

	#include <batching_vertex>
	#include <skinbase_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vHighPrecisionZW = gl_Position.zw;

}
`,R0=`
#if DEPTH_PACKING == 3200

	uniform float opacity;

#endif

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

varying vec2 vHighPrecisionZW;

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( 1.0 );

	#if DEPTH_PACKING == 3200

		diffuseColor.a = opacity;

	#endif

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	#include <logdepthbuf_fragment>

	// Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;

	#if DEPTH_PACKING == 3200

		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );

	#elif DEPTH_PACKING == 3201

		gl_FragColor = packDepthToRGBA( fragCoordZ );

	#endif

}
`;var C0=`
#define DISTANCE

varying vec3 vWorldPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	#include <batching_vertex>
	#include <skinbase_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>

	vWorldPosition = worldPosition.xyz;

}
`,L0=`
#define DISTANCE

uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>

void main () {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( 1.0 );

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist ); // clamp to [ 0, 1 ]

	gl_FragColor = packDepthToRGBA( dist );

}
`;var P0=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

}
`,I0=`
uniform sampler2D tEquirect;

varying vec3 vWorldDirection;

#include <common>

void main() {

	vec3 direction = normalize( vWorldDirection );

	vec2 sampleUV = equirectUv( direction );

	gl_FragColor = texture2D( tEquirect, sampleUV );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`;var D0=`
uniform float scale;
attribute float lineDistance;

varying float vLineDistance;

#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	vLineDistance = scale * lineDistance;

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`,U0=`
uniform vec3 diffuse;
uniform float opacity;

uniform float dashSize;
uniform float totalSize;

varying float vLineDistance;

#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	if ( mod( vLineDistance, totalSize ) > dashSize ) {

		discard;

	}

	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>

	outgoingLight = diffuseColor.rgb; // simple shader

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`;var N0=`
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>

}
`,B0=`
uniform vec3 diffuse;
uniform float opacity;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

	// accumulation (baked indirect lighting only)
	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;

	#else

		reflectedLight.indirectDiffuse += vec3( 1.0 );

	#endif

	// modulation
	#include <aomap_fragment>

	reflectedLight.indirectDiffuse *= diffuseColor.rgb;

	vec3 outgoingLight = reflectedLight.indirectDiffuse;

	#include <envmap_fragment>

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var F0=`
#define LAMBERT

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,O0=`
#define LAMBERT

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var H0=`
#define MATCAP

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>

#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

	vViewPosition = - mvPosition.xyz;

}
`,k0=`
#define MATCAP

uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;

varying vec3 vViewPosition;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks

	#ifdef USE_MATCAP

		vec4 matcapColor = texture2D( matcap, uv );

	#else

		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 ); // default if matcap is missing

	#endif

	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var z0=`
#define NORMAL

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	varying vec3 vViewPosition;

#endif

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	vViewPosition = - mvPosition.xyz;

#endif

}
`,G0=`
#define NORMAL

uniform float opacity;

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	varying vec3 vViewPosition;

#endif

#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );

	#ifdef OPAQUE

		gl_FragColor.a = 1.0;

	#endif

}
`;var V0=`
#define PHONG

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,W0=`
#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var X0=`
#define STANDARD

varying vec3 vViewPosition;

#ifdef USE_TRANSMISSION

	varying vec3 vWorldPosition;

#endif

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

#ifdef USE_TRANSMISSION

	vWorldPosition = worldPosition.xyz;

#endif
}
`,q0=`
#define STANDARD

#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifdef IOR
	uniform float ior;
#endif

#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;

	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif

	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif

#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif

#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif

#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;

	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif

	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif

#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;

	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif

varying vec3 vViewPosition;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;

	#include <transmission_fragment>

	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;

	#ifdef USE_SHEEN

		// Sheen energy compensation approximation calculation can be found at the end of
		// https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );

		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;

	#endif

	#ifdef USE_CLEARCOAT

		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );

		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );

		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;

	#endif

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var Y0=`
#define TOON

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,j0=`
#define TOON

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var $0=`
uniform float size;
uniform float scale;

#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#ifdef USE_POINTS_UV

	varying vec2 vUv;
	uniform mat3 uvTransform;

#endif

void main() {

	#ifdef USE_POINTS_UV

		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	#endif

	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>

	gl_PointSize = size;

	#ifdef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );

	#endif

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>

}
`,K0=`
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	outgoingLight = diffuseColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`;var Z0=`
#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>

void main() {

	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,J0=`
uniform vec3 color;
uniform float opacity;

#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

void main() {

	#include <logdepthbuf_fragment>

	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>

}
`;var Q0=`
uniform float rotation;
uniform vec2 center;

#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );

	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

	#ifndef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) scale *= - mvPosition.z;

	#endif

	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;

	mvPosition.xy += rotatedPosition;

	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`,ex=`
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	outgoingLight = diffuseColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>

}
`;var qe={alphahash_fragment:Mm,alphahash_pars_fragment:bm,alphamap_fragment:Tm,alphamap_pars_fragment:Sm,alphatest_fragment:wm,alphatest_pars_fragment:Am,aomap_fragment:Rm,aomap_pars_fragment:Cm,batching_pars_vertex:Lm,batching_vertex:Pm,begin_vertex:Im,beginnormal_vertex:Dm,bsdfs:Um,iridescence_fragment:Nm,bumpmap_pars_fragment:Bm,clipping_planes_fragment:Fm,clipping_planes_pars_fragment:Om,clipping_planes_pars_vertex:Hm,clipping_planes_vertex:km,color_fragment:zm,color_pars_fragment:Gm,color_pars_vertex:Vm,color_vertex:Wm,common:Xm,cube_uv_reflection_fragment:qm,defaultnormal_vertex:Ym,displacementmap_pars_vertex:jm,displacementmap_vertex:$m,emissivemap_fragment:Km,emissivemap_pars_fragment:Zm,colorspace_fragment:Jm,colorspace_pars_fragment:Qm,envmap_fragment:eg,envmap_common_pars_fragment:tg,envmap_pars_fragment:ng,envmap_pars_vertex:ig,envmap_physical_pars_fragment:mg,envmap_vertex:rg,fog_vertex:og,fog_pars_vertex:sg,fog_fragment:ag,fog_pars_fragment:cg,gradientmap_pars_fragment:lg,lightmap_fragment:ug,lightmap_pars_fragment:dg,lights_lambert_fragment:hg,lights_lambert_pars_fragment:fg,lights_pars_begin:pg,lights_toon_fragment:gg,lights_toon_pars_fragment:xg,lights_phong_fragment:_g,lights_phong_pars_fragment:yg,lights_physical_fragment:vg,lights_physical_pars_fragment:Eg,lights_fragment_begin:Mg,lights_fragment_maps:bg,lights_fragment_end:Tg,logdepthbuf_fragment:Sg,logdepthbuf_pars_fragment:wg,logdepthbuf_pars_vertex:Ag,logdepthbuf_vertex:Rg,map_fragment:Cg,map_pars_fragment:Lg,map_particle_fragment:Pg,map_particle_pars_fragment:Ig,metalnessmap_fragment:Dg,metalnessmap_pars_fragment:Ug,morphcolor_vertex:Ng,morphnormal_vertex:Bg,morphtarget_pars_vertex:Fg,morphtarget_vertex:Og,normal_fragment_begin:Hg,normal_fragment_maps:kg,normal_pars_fragment:zg,normal_pars_vertex:Gg,normal_vertex:Vg,normalmap_pars_fragment:Wg,clearcoat_normal_fragment_begin:Xg,clearcoat_normal_fragment_maps:qg,clearcoat_pars_fragment:Yg,iridescence_pars_fragment:jg,opaque_fragment:$g,packing:Kg,premultiplied_alpha_fragment:Zg,project_vertex:Jg,dithering_fragment:Qg,dithering_pars_fragment:e0,roughnessmap_fragment:t0,roughnessmap_pars_fragment:n0,shadowmap_pars_fragment:i0,shadowmap_pars_vertex:r0,shadowmap_vertex:o0,shadowmask_pars_fragment:s0,skinbase_vertex:a0,skinning_pars_vertex:c0,skinning_vertex:l0,skinnormal_vertex:u0,specularmap_fragment:d0,specularmap_pars_fragment:h0,tonemapping_fragment:f0,tonemapping_pars_fragment:p0,transmission_fragment:m0,transmission_pars_fragment:g0,uv_pars_fragment:x0,uv_pars_vertex:_0,uv_vertex:y0,worldpos_vertex:v0,background_vert:E0,background_frag:M0,backgroundCube_vert:b0,backgroundCube_frag:T0,cube_vert:S0,cube_frag:w0,depth_vert:A0,depth_frag:R0,distanceRGBA_vert:C0,distanceRGBA_frag:L0,equirect_vert:P0,equirect_frag:I0,linedashed_vert:D0,linedashed_frag:U0,meshbasic_vert:N0,meshbasic_frag:B0,meshlambert_vert:F0,meshlambert_frag:O0,meshmatcap_vert:H0,meshmatcap_frag:k0,meshnormal_vert:z0,meshnormal_frag:G0,meshphong_vert:V0,meshphong_frag:W0,meshphysical_vert:X0,meshphysical_frag:q0,meshtoon_vert:Y0,meshtoon_frag:j0,points_vert:$0,points_frag:K0,shadow_vert:Z0,shadow_frag:J0,sprite_vert:Q0,sprite_frag:ex};var Te={common:{diffuse:{value:new ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new De(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new ge(16777215)},opacity:{value:1},center:{value:new De(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}};var Jn={basic:{uniforms:un([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:un([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new ge(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:un([Te.common,Te.specularmap,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,Te.lights,{emissive:{value:new ge(0)},specular:{value:new ge(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:un([Te.common,Te.envmap,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.roughnessmap,Te.metalnessmap,Te.fog,Te.lights,{emissive:{value:new ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:un([Te.common,Te.aomap,Te.lightmap,Te.emissivemap,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.gradientmap,Te.fog,Te.lights,{emissive:{value:new ge(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:un([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,Te.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:un([Te.points,Te.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:un([Te.common,Te.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:un([Te.common,Te.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:un([Te.common,Te.bumpmap,Te.normalmap,Te.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:un([Te.sprite,Te.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:un([Te.common,Te.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:un([Te.lights,Te.fog,{color:{value:new ge(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};Jn.physical={uniforms:un([Jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new De(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new De},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new ge(0)},specularColor:{value:new ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new De},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};var Oc={r:0,b:0,g:0};function tx(i,e,t,n,r,o,s){let a=new ge(0),c=o===!0?0:1,l,u,d=null,h=0,p=null;function g(m,f){let v=!1,_=f.isScene===!0?f.background:null;_&&_.isTexture&&(_=(f.backgroundBlurriness>0?t:e).get(_)),_===null?x(a,c):_&&_.isColor&&(x(_,1),v=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(i.autoClear||v)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),_&&(_.isCubeTexture||_.mapping===pr)?(u===void 0&&(u=new Ge(new Zn(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:Ji(Jn.backgroundCube.uniforms),vertexShader:Jn.backgroundCube.vertexShader,fragmentShader:Jn.backgroundCube.fragmentShader,side:bt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,b,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,u.material.toneMapped=Ke.getTransfer(_.colorSpace)!==ct,(d!==_||h!==_.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,d=_,h=_.version,p=i.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Ge(new Jr(2,2),new dn({name:"BackgroundMaterial",uniforms:Ji(Jn.background.uniforms),vertexShader:Jn.background.vertexShader,fragmentShader:Jn.background.fragmentShader,side:Zt,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,l.material.toneMapped=Ke.getTransfer(_.colorSpace)!==ct,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||h!==_.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,d=_,h=_.version,p=i.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function x(m,f){m.getRGB(Oc,Dc(i)),n.buffers.color.setClear(Oc.r,Oc.g,Oc.b,f,s)}return{getClearColor:function(){return a},setClearColor:function(m,f=1){a.set(m),c=f,x(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,x(a,c)},render:g}}function nx(i,e,t,n){let r=i.getParameter(i.MAX_VERTEX_ATTRIBS),o=n.isWebGL2?null:e.get("OES_vertex_array_object"),s=n.isWebGL2||o!==null,a={},c=m(null),l=c,u=!1;function d(D,G,X,z,V){let j=!1;if(s){let ce=x(z,X,G);l!==ce&&(l=ce,p(l.object)),j=f(D,z,X,V),j&&v(D,z,X,V)}else{let ce=G.wireframe===!0;(l.geometry!==z.id||l.program!==X.id||l.wireframe!==ce)&&(l.geometry=z.id,l.program=X.id,l.wireframe=ce,j=!0)}V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(j||u)&&(u=!1,P(D,G,X,z),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function h(){return n.isWebGL2?i.createVertexArray():o.createVertexArrayOES()}function p(D){return n.isWebGL2?i.bindVertexArray(D):o.bindVertexArrayOES(D)}function g(D){return n.isWebGL2?i.deleteVertexArray(D):o.deleteVertexArrayOES(D)}function x(D,G,X){let z=X.wireframe===!0,V=a[D.id];V===void 0&&(V={},a[D.id]=V);let j=V[G.id];j===void 0&&(j={},V[G.id]=j);let ce=j[z];return ce===void 0&&(ce=m(h()),j[z]=ce),ce}function m(D){let G=[],X=[],z=[];for(let V=0;V<r;V++)G[V]=0,X[V]=0,z[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:X,attributeDivisors:z,object:D,attributes:{},index:null}}function f(D,G,X,z){let V=l.attributes,j=G.attributes,ce=0,se=X.getAttributes();for(let F in se)if(se[F].location>=0){let q=V[F],de=j[F];if(de===void 0&&(F==="instanceMatrix"&&D.instanceMatrix&&(de=D.instanceMatrix),F==="instanceColor"&&D.instanceColor&&(de=D.instanceColor)),q===void 0||q.attribute!==de||de&&q.data!==de.data)return!0;ce++}return l.attributesNum!==ce||l.index!==z}function v(D,G,X,z){let V={},j=G.attributes,ce=0,se=X.getAttributes();for(let F in se)if(se[F].location>=0){let q=j[F];q===void 0&&(F==="instanceMatrix"&&D.instanceMatrix&&(q=D.instanceMatrix),F==="instanceColor"&&D.instanceColor&&(q=D.instanceColor));let de={};de.attribute=q,q&&q.data&&(de.data=q.data),V[F]=de,ce++}l.attributes=V,l.attributesNum=ce,l.index=z}function _(){let D=l.newAttributes;for(let G=0,X=D.length;G<X;G++)D[G]=0}function T(D){A(D,0)}function A(D,G){let X=l.newAttributes,z=l.enabledAttributes,V=l.attributeDivisors;X[D]=1,z[D]===0&&(i.enableVertexAttribArray(D),z[D]=1),V[D]!==G&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,G),V[D]=G)}function b(){let D=l.newAttributes,G=l.enabledAttributes;for(let X=0,z=G.length;X<z;X++)G[X]!==D[X]&&(i.disableVertexAttribArray(X),G[X]=0)}function S(D,G,X,z,V,j,ce){ce===!0?i.vertexAttribIPointer(D,G,X,V,j):i.vertexAttribPointer(D,G,X,z,V,j)}function P(D,G,X,z){if(n.isWebGL2===!1&&(D.isInstancedMesh||z.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();let V=z.attributes,j=X.getAttributes(),ce=G.defaultAttributeValues;for(let se in j){let F=j[se];if(F.location>=0){let N=V[se];if(N===void 0&&(se==="instanceMatrix"&&D.instanceMatrix&&(N=D.instanceMatrix),se==="instanceColor"&&D.instanceColor&&(N=D.instanceColor)),N!==void 0){let q=N.normalized,de=N.itemSize,_e=t.get(N);if(_e===void 0)continue;let ie=_e.buffer,H=_e.type,Q=_e.bytesPerElement,le=n.isWebGL2===!0&&(H===i.INT||H===i.UNSIGNED_INT||N.gpuType===qa);if(N.isInterleavedBufferAttribute){let W=N.data,R=W.stride,he=N.offset;if(W.isInstancedInterleavedBuffer){for(let pe=0;pe<F.locationSize;pe++)A(F.location+pe,W.meshPerAttribute);D.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let pe=0;pe<F.locationSize;pe++)T(F.location+pe);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let pe=0;pe<F.locationSize;pe++)S(F.location+pe,de/F.locationSize,H,q,R*Q,(he+de/F.locationSize*pe)*Q,le)}else{if(N.isInstancedBufferAttribute){for(let W=0;W<F.locationSize;W++)A(F.location+W,N.meshPerAttribute);D.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let W=0;W<F.locationSize;W++)T(F.location+W);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let W=0;W<F.locationSize;W++)S(F.location+W,de/F.locationSize,H,q,de*Q,de/F.locationSize*W*Q,le)}}else if(ce!==void 0){let q=ce[se];if(q!==void 0)switch(q.length){case 2:i.vertexAttrib2fv(F.location,q);break;case 3:i.vertexAttrib3fv(F.location,q);break;case 4:i.vertexAttrib4fv(F.location,q);break;default:i.vertexAttrib1fv(F.location,q)}}}}b()}function E(){O();for(let D in a){let G=a[D];for(let X in G){let z=G[X];for(let V in z)g(z[V].object),delete z[V];delete G[X]}delete a[D]}}function w(D){if(a[D.id]===void 0)return;let G=a[D.id];for(let X in G){let z=G[X];for(let V in z)g(z[V].object),delete z[V];delete G[X]}delete a[D.id]}function I(D){for(let G in a){let X=a[G];if(X[D.id]===void 0)continue;let z=X[D.id];for(let V in z)g(z[V].object),delete z[V];delete X[D.id]}}function O(){te(),u=!0,l!==c&&(l=c,p(l.object))}function te(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:d,reset:O,resetDefaultState:te,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfProgram:I,initAttributes:_,enableAttribute:T,disableUnusedAttributes:b}}function ix(i,e,t,n){let r=n.isWebGL2,o;function s(u){o=u}function a(u,d){i.drawArrays(o,u,d),t.update(d,o,1)}function c(u,d,h){if(h===0)return;let p,g;if(r)p=i,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](o,u,d,h),t.update(d,o,h)}function l(u,d,h){if(h===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<h;g++)this.render(u[g],d[g]);else{p.multiDrawArraysWEBGL(o,u,0,d,0,h);let g=0;for(let x=0;x<h;x++)g+=d[x];t.update(g,o,1)}}this.setMode=s,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function rx(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let S=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(S){if(S==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let s=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",a=t.precision!==void 0?t.precision:"highp",c=o(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);let l=s||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),h=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),x=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),f=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),_=h>0,T=s||e.has("OES_texture_float"),A=_&&T,b=s?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:s,drawBuffers:l,getMaxAnisotropy:r,getMaxPrecision:o,precision:a,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:h,maxTextureSize:p,maxCubemapSize:g,maxAttributes:x,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:v,vertexTextures:_,floatFragmentTextures:T,floatVertexTextures:A,maxSamples:b}}function ox(i){let e=this,t=null,n=0,r=!1,o=!1,s=new hi,a=new Oe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let p=d.length!==0||h||n!==0||r;return r=h,n=d.length,p},this.beginShadows=function(){o=!0,u(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!r||g===null||g.length===0||o&&!m)o?u(null):l();else{let v=o?0:n,_=v*4,T=f.clippingState||null;c.value=T,T=u(g,h,_,p);for(let A=0;A!==_;++A)T[A]=t[A];f.clippingState=T,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,p,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let f=p+x*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<f)&&(m=new Float32Array(f));for(let _=0,T=p;_!==x;++_,T+=4)s.copy(d[_]).applyMatrix4(v,a),s.normal.toArray(m,T),m[T+3]=s.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function sx(i){let e=new WeakMap;function t(s,a){return a===ks?s.mapping=oi:a===zs&&(s.mapping=Si),s}function n(s){if(s&&s.isTexture){let a=s.mapping;if(a===ks||a===zs)if(e.has(s)){let c=e.get(s).texture;return t(c,s.mapping)}else{let c=s.image;if(c&&c.height>0){let l=new Nc(c.height/2);return l.fromEquirectangularTexture(i,s),e.set(s,l),s.addEventListener("dispose",r),t(l.texture,s.mapping)}else return null}}return s}function r(s){let a=s.target;a.removeEventListener("dispose",r);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}var Qi=class extends Ko{constructor(e=-1,t=1,n=1,r=-1,o=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=o,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,o,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,o=n-e,s=n+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,s=o+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(o,s,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var ts=4,ax=[.125,.215,.35,.446,.526,.582],eo=20,vd=new Qi,cx=new ge,Ed=null,Md=0,bd=0,Qr=(1+Math.sqrt(5))/2,es=1/Qr,lx=[new L(1,1,1),new L(-1,1,1),new L(1,1,-1),new L(-1,1,-1),new L(0,Qr,es),new L(0,Qr,-es),new L(es,0,Qr),new L(-es,0,Qr),new L(Qr,es,0),new L(-Qr,es,0)],Ar=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){Ed=this._renderer.getRenderTarget(),Md=this._renderer.getActiveCubeFace(),bd=this._renderer.getActiveMipmapLevel(),this._setSize(256);let o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,r,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hx(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dx(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ed,Md,bd),e.scissorTest=!1,Hc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===oi||e.mapping===Si?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ed=this._renderer.getRenderTarget(),Md=this._renderer.getActiveCubeFace(),bd=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:Gi,format:Ht,colorSpace:pt,depthBuffer:!1},r=ux(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ux(e,t,n);let{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=SE(o)),this._blurMaterial=wE(o,e,t)}return r}_compileMaterial(e){let t=new Ge(this._lodPlanes[0],e);this._renderer.compile(t,vd)}_sceneToCubeUV(e,t,n,r){let a=new ft(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(cx),u.toneMapping=Xn,u.autoClear=!1;let p=new Ut({name:"PMREM.Background",side:bt,depthWrite:!1,depthTest:!1}),g=new Ge(new Zn,p),x=!1,m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,x=!0):(p.color.copy(cx),x=!0);for(let f=0;f<6;f++){let v=f%3;v===0?(a.up.set(0,c[f],0),a.lookAt(l[f],0,0)):v===1?(a.up.set(0,0,c[f]),a.lookAt(0,l[f],0)):(a.up.set(0,c[f],0),a.lookAt(0,0,l[f]));let _=this._cubeSize;Hc(r,v*_,f>2?_:0,_,_),u.setRenderTarget(r),x&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===oi||e.mapping===Si;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=hx()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dx());let o=r?this._cubemapMaterial:this._equirectMaterial,s=new Ge(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=e;let c=this._cubeSize;Hc(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(s,vd)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),s=lx[(r-1)%lx.length];this._blur(e,r-1,r,o,s)}t.autoClear=n}_blur(e,t,n,r,o){let s=this._pingPongRenderTarget;this._halfBlur(e,s,t,n,r,"latitudinal",o),this._halfBlur(s,e,n,n,r,"longitudinal",o)}_halfBlur(e,t,n,r,o,s,a){let c=this._renderer,l=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new Ge(this._lodPlanes[r],l),h=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(o)?Math.PI/(2*p):2*Math.PI/(2*eo-1),x=o/g,m=isFinite(o)?1+Math.floor(u*x):eo;m>eo&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${eo}`);let f=[],v=0;for(let S=0;S<eo;++S){let P=S/x,E=Math.exp(-P*P/2);f.push(E),S===0?v+=E:S<m&&(v+=2*E)}for(let S=0;S<f.length;S++)f[S]=f[S]/v;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=s==="latitudinal",a&&(h.poleAxis.value=a);let{_lodMax:_}=this;h.dTheta.value=g,h.mipInt.value=_-n;let T=this._sizeLods[r],A=3*T*(r>_-ts?r-_+ts:0),b=4*(this._cubeSize-T);Hc(t,A,b,3*T,2*T),c.setRenderTarget(t),c.render(d,vd)}};function SE(i){let e=[],t=[],n=[],r=i,o=i-ts+1+ax.length;for(let s=0;s<o;s++){let a=Math.pow(2,r);t.push(a);let c=1/a;s>i-ts?c=ax[s-i+ts-1]:s===0&&(c=0),n.push(c);let l=1/(a-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,x=3,m=2,f=1,v=new Float32Array(x*g*p),_=new Float32Array(m*g*p),T=new Float32Array(f*g*p);for(let b=0;b<p;b++){let S=b%3*2/3-1,P=b>2?0:-1,E=[S,P,0,S+2/3,P,0,S+2/3,P+1,0,S,P,0,S+2/3,P+1,0,S,P+1,0];v.set(E,x*g*b),_.set(h,m*g*b);let w=[b,b,b,b,b,b];T.set(w,f*g*b)}let A=new Je;A.setAttribute("position",new $e(v,x)),A.setAttribute("uv",new $e(_,m)),A.setAttribute("faceIndex",new $e(T,f)),e.push(A),r>ts&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ux(i,e,t){let n=new Sn(i,e,t);return n.texture.mapping=pr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Hc(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function wE(i,e,t){let n=new Float32Array(eo),r=new L(0,1,0);return new dn({name:"SphericalGaussianBlur",defines:{n:eo,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Td(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function dx(){return new dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Td(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function hx(){return new dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Td(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Td(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function fx(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===ks||c===zs,u=c===oi||c===Si;if(l||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=e.get(a);return t===null&&(t=new Ar(i)),d=l?t.fromEquirectangular(a,d):t.fromCubemap(a,d),e.set(a,d),d.texture}else{if(e.has(a))return e.get(a).texture;{let d=a.image;if(l&&d&&d.height>0||u&&d&&r(d)){t===null&&(t=new Ar(i));let h=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",o),h.texture}else return null}}}return a}function r(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function o(a){let c=a.target;c.removeEventListener("dispose",o);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:s}}function px(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function mx(i,e,t,n){let r={},o=new WeakMap;function s(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let g in h.attributes)e.remove(h.attributes[g]);for(let g in h.morphAttributes){let x=h.morphAttributes[g];for(let m=0,f=x.length;m<f;m++)e.remove(x[m])}h.removeEventListener("dispose",s),delete r[h.id];let p=o.get(h);p&&(e.remove(p),o.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return r[h.id]===!0||(h.addEventListener("dispose",s),r[h.id]=!0,t.memory.geometries++),h}function c(d){let h=d.attributes;for(let g in h)e.update(h[g],i.ARRAY_BUFFER);let p=d.morphAttributes;for(let g in p){let x=p[g];for(let m=0,f=x.length;m<f;m++)e.update(x[m],i.ARRAY_BUFFER)}}function l(d){let h=[],p=d.index,g=d.attributes.position,x=0;if(p!==null){let v=p.array;x=p.version;for(let _=0,T=v.length;_<T;_+=3){let A=v[_+0],b=v[_+1],S=v[_+2];h.push(A,b,b,S,S,A)}}else if(g!==void 0){let v=g.array;x=g.version;for(let _=0,T=v.length/3-1;_<T;_+=3){let A=_+0,b=_+1,S=_+2;h.push(A,b,b,S,S,A)}}else return;let m=new(uc(h)?Xo:Wo)(h,1);m.version=x;let f=o.get(d);f&&e.remove(f),o.set(d,m)}function u(d){let h=o.get(d);if(h){let p=d.index;p!==null&&h.version<p.version&&l(d)}else l(d);return o.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function gx(i,e,t,n){let r=n.isWebGL2,o;function s(p){o=p}let a,c;function l(p){a=p.type,c=p.bytesPerElement}function u(p,g){i.drawElements(o,g,a,p*c),t.update(g,o,1)}function d(p,g,x){if(x===0)return;let m,f;if(r)m=i,f="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](o,g,a,p*c,x),t.update(g,o,x)}function h(p,g,x){if(x===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<x;f++)this.render(p[f]/c,g[f]);else{m.multiDrawElementsWEBGL(o,g,0,a,p,0,x);let f=0;for(let v=0;v<x;v++)f+=g[v];t.update(f,o,1)}}this.setMode=s,this.setIndex=l,this.render=u,this.renderInstances=d,this.renderMultiDraw=h}function xx(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,s,a){switch(t.calls++,s){case i.TRIANGLES:t.triangles+=a*(o/3);break;case i.LINES:t.lines+=a*(o/2);break;case i.LINE_STRIP:t.lines+=a*(o-1);break;case i.LINE_LOOP:t.lines+=a*o;break;case i.POINTS:t.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function AE(i,e){return i[0]-e[0]}function RE(i,e){return Math.abs(e[1])-Math.abs(i[1])}function _x(i,e,t){let n={},r=new Float32Array(8),o=new WeakMap,s=new rt,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,u,d){let h=l.morphTargetInfluences;if(e.isWebGL2===!0){let p=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=p!==void 0?p.length:0,x=o.get(u);if(x===void 0||x.count!==g){let D=function(){O.dispose(),o.delete(u),u.removeEventListener("dispose",D)};x!==void 0&&x.texture.dispose();let v=u.morphAttributes.position!==void 0,_=u.morphAttributes.normal!==void 0,T=u.morphAttributes.color!==void 0,A=u.morphAttributes.position||[],b=u.morphAttributes.normal||[],S=u.morphAttributes.color||[],P=0;v===!0&&(P=1),_===!0&&(P=2),T===!0&&(P=3);let E=u.attributes.position.count*P,w=1;E>e.maxTextureSize&&(w=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);let I=new Float32Array(E*w*4*g),O=new Bo(I,E,w,g);O.type=gn,O.needsUpdate=!0;let te=P*4;for(let G=0;G<g;G++){let X=A[G],z=b[G],V=S[G],j=E*w*4*G;for(let ce=0;ce<X.count;ce++){let se=ce*te;v===!0&&(s.fromBufferAttribute(X,ce),I[j+se+0]=s.x,I[j+se+1]=s.y,I[j+se+2]=s.z,I[j+se+3]=0),_===!0&&(s.fromBufferAttribute(z,ce),I[j+se+4]=s.x,I[j+se+5]=s.y,I[j+se+6]=s.z,I[j+se+7]=0),T===!0&&(s.fromBufferAttribute(V,ce),I[j+se+8]=s.x,I[j+se+9]=s.y,I[j+se+10]=s.z,I[j+se+11]=V.itemSize===4?s.w:1)}}x={count:g,texture:O,size:new De(E,w)},o.set(u,x),u.addEventListener("dispose",D)}let m=0;for(let v=0;v<h.length;v++)m+=h[v];let f=u.morphTargetsRelative?1:1-m;d.getUniforms().setValue(i,"morphTargetBaseInfluence",f),d.getUniforms().setValue(i,"morphTargetInfluences",h),d.getUniforms().setValue(i,"morphTargetsTexture",x.texture,t),d.getUniforms().setValue(i,"morphTargetsTextureSize",x.size)}else{let p=h===void 0?0:h.length,g=n[u.id];if(g===void 0||g.length!==p){g=[];for(let _=0;_<p;_++)g[_]=[_,0];n[u.id]=g}for(let _=0;_<p;_++){let T=g[_];T[0]=_,T[1]=h[_]}g.sort(RE);for(let _=0;_<8;_++)_<p&&g[_][1]?(a[_][0]=g[_][0],a[_][1]=g[_][1]):(a[_][0]=Number.MAX_SAFE_INTEGER,a[_][1]=0);a.sort(AE);let x=u.morphAttributes.position,m=u.morphAttributes.normal,f=0;for(let _=0;_<8;_++){let T=a[_],A=T[0],b=T[1];A!==Number.MAX_SAFE_INTEGER&&b?(x&&u.getAttribute("morphTarget"+_)!==x[A]&&u.setAttribute("morphTarget"+_,x[A]),m&&u.getAttribute("morphNormal"+_)!==m[A]&&u.setAttribute("morphNormal"+_,m[A]),r[_]=b,f+=b):(x&&u.hasAttribute("morphTarget"+_)===!0&&u.deleteAttribute("morphTarget"+_),m&&u.hasAttribute("morphNormal"+_)===!0&&u.deleteAttribute("morphNormal"+_),r[_]=0)}let v=u.morphTargetsRelative?1:1-f;d.getUniforms().setValue(i,"morphTargetBaseInfluence",v),d.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:c}}function yx(i,e,t,n){let r=new WeakMap;function o(c){let l=n.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==l&&(e.update(d),r.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){let h=c.skeleton;r.get(h)!==l&&(h.update(),r.set(h,l))}return d}function s(){r=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:o,dispose:s}}var ns=class extends mt{constructor(e,t,n,r,o,s,a,c,l,u){if(u=u!==void 0?u:ai,u!==ai&&u!==wi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===ai&&(n=Bn),n===void 0&&u===wi&&(n=Yn),super(null,r,o,s,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Tt,this.minFilter=c!==void 0?c:Tt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}};var wx=new mt,Ax=new ns(1,1);Ax.compareFunction=ac;var Rx=new Bo,Cx=new pc,Lx=new Qo,vx=[],Ex=[],Mx=new Float32Array(16),bx=new Float32Array(9),Tx=new Float32Array(4);function is(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,o=vx[r];if(o===void 0&&(o=new Float32Array(r),vx[r]=o),e!==0){n.toArray(o,0);for(let s=1,a=0;s!==e;++s)a+=t,i[s].toArray(o,a)}return o}function zt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function kc(i,e){let t=Ex[e];t===void 0&&(t=new Int32Array(e),Ex[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function CE(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function LE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2fv(this.addr,e),Gt(t,e)}}function PE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(zt(t,e))return;i.uniform3fv(this.addr,e),Gt(t,e)}}function IE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4fv(this.addr,e),Gt(t,e)}}function DE(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(zt(t,n))return;Tx.set(n),i.uniformMatrix2fv(this.addr,!1,Tx),Gt(t,n)}}function UE(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(zt(t,n))return;bx.set(n),i.uniformMatrix3fv(this.addr,!1,bx),Gt(t,n)}}function NE(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(zt(t,n))return;Mx.set(n),i.uniformMatrix4fv(this.addr,!1,Mx),Gt(t,n)}}function BE(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function FE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2iv(this.addr,e),Gt(t,e)}}function OE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;i.uniform3iv(this.addr,e),Gt(t,e)}}function HE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4iv(this.addr,e),Gt(t,e)}}function kE(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function zE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2uiv(this.addr,e),Gt(t,e)}}function GE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;i.uniform3uiv(this.addr,e),Gt(t,e)}}function VE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4uiv(this.addr,e),Gt(t,e)}}function WE(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let o=this.type===i.SAMPLER_2D_SHADOW?Ax:wx;t.setTexture2D(e||o,r)}function XE(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Cx,r)}function qE(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Lx,r)}function YE(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Rx,r)}function jE(i){switch(i){case 5126:return CE;case 35664:return LE;case 35665:return PE;case 35666:return IE;case 35674:return DE;case 35675:return UE;case 35676:return NE;case 5124:case 35670:return BE;case 35667:case 35671:return FE;case 35668:case 35672:return OE;case 35669:case 35673:return HE;case 5125:return kE;case 36294:return zE;case 36295:return GE;case 36296:return VE;case 35678:case 36198:case 36298:case 36306:case 35682:return WE;case 35679:case 36299:case 36307:return XE;case 35680:case 36300:case 36308:case 36293:return qE;case 36289:case 36303:case 36311:case 36292:return YE}}function $E(i,e){i.uniform1fv(this.addr,e)}function KE(i,e){let t=is(e,this.size,2);i.uniform2fv(this.addr,t)}function ZE(i,e){let t=is(e,this.size,3);i.uniform3fv(this.addr,t)}function JE(i,e){let t=is(e,this.size,4);i.uniform4fv(this.addr,t)}function QE(i,e){let t=is(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function eM(i,e){let t=is(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function tM(i,e){let t=is(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function nM(i,e){i.uniform1iv(this.addr,e)}function iM(i,e){i.uniform2iv(this.addr,e)}function rM(i,e){i.uniform3iv(this.addr,e)}function oM(i,e){i.uniform4iv(this.addr,e)}function sM(i,e){i.uniform1uiv(this.addr,e)}function aM(i,e){i.uniform2uiv(this.addr,e)}function cM(i,e){i.uniform3uiv(this.addr,e)}function lM(i,e){i.uniform4uiv(this.addr,e)}function uM(i,e,t){let n=this.cache,r=e.length,o=kc(t,r);zt(n,o)||(i.uniform1iv(this.addr,o),Gt(n,o));for(let s=0;s!==r;++s)t.setTexture2D(e[s]||wx,o[s])}function dM(i,e,t){let n=this.cache,r=e.length,o=kc(t,r);zt(n,o)||(i.uniform1iv(this.addr,o),Gt(n,o));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||Cx,o[s])}function hM(i,e,t){let n=this.cache,r=e.length,o=kc(t,r);zt(n,o)||(i.uniform1iv(this.addr,o),Gt(n,o));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||Lx,o[s])}function fM(i,e,t){let n=this.cache,r=e.length,o=kc(t,r);zt(n,o)||(i.uniform1iv(this.addr,o),Gt(n,o));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||Rx,o[s])}function pM(i){switch(i){case 5126:return $E;case 35664:return KE;case 35665:return ZE;case 35666:return JE;case 35674:return QE;case 35675:return eM;case 35676:return tM;case 5124:case 35670:return nM;case 35667:case 35671:return iM;case 35668:case 35672:return rM;case 35669:case 35673:return oM;case 5125:return sM;case 36294:return aM;case 36295:return cM;case 36296:return lM;case 35678:case 36198:case 36298:case 36306:case 35682:return uM;case 35679:case 36299:case 36307:return dM;case 35680:case 36300:case 36308:case 36293:return hM;case 36289:case 36303:case 36311:case 36292:return fM}}var wd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=jE(t.type)}},Ad=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=pM(t.type)}},Rd=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let o=0,s=r.length;o!==s;++o){let a=r[o];a.setValue(e,t[a.id],n)}}},Sd=/(\w+)(\])?(\[|\.)?/g;function Sx(i,e){i.seq.push(e),i.map[e.id]=e}function mM(i,e,t){let n=i.name,r=n.length;for(Sd.lastIndex=0;;){let o=Sd.exec(n),s=Sd.lastIndex,a=o[1],c=o[2]==="]",l=o[3];if(c&&(a=a|0),l===void 0||l==="["&&s+2===r){Sx(t,l===void 0?new wd(a,i,e):new Ad(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new Rd(a),Sx(t,d)),t=d}}}var Rr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let o=e.getActiveUniform(t,r),s=e.getUniformLocation(t,o.name);mM(o,s,this)}}setValue(e,t,n,r){let o=this.map[t];o!==void 0&&o.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let o=0,s=t.length;o!==s;++o){let a=t[o],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,o=e.length;r!==o;++r){let s=e[r];s.id in t&&n.push(s)}return n}};function Cd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var gM=37297,xM=0;function _M(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let s=r;s<o;s++){let a=s+1;n.push(`${a===e?">":" "} ${a}: ${t[s]}`)}return n.join(`
`)}function yM(i){let e=Ke.getPrimaries(Ke.workingColorSpace),t=Ke.getPrimaries(i),n;switch(e===t?n="":e===Lo&&t===Co?n="LinearDisplayP3ToLinearSRGB":e===Co&&t===Lo&&(n="LinearSRGBToLinearDisplayP3"),i){case pt:case Xr:return[n,"LinearTransferOETF"];case nt:case Ao:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Px(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let s=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+_M(i.getShaderSource(e),s)}else return r}function vM(i,e){let t=yM(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function EM(i,e){let t;switch(e){case Ap:t="Linear";break;case Rp:t="Reinhard";break;case Cp:t="OptimizedCineon";break;case Wa:t="ACESFilmic";break;case Pp:t="AgX";break;case Lp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function MM(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(rs).join(`
`)}function bM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(rs).join(`
`)}function TM(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function SM(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let o=i.getActiveAttrib(e,r),s=o.name,a=1;o.type===i.FLOAT_MAT2&&(a=2),o.type===i.FLOAT_MAT3&&(a=3),o.type===i.FLOAT_MAT4&&(a=4),t[s]={type:o.type,location:i.getAttribLocation(e,s),locationSize:a}}return t}function rs(i){return i!==""}function Ix(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dx(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var wM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ld(i){return i.replace(wM,RM)}var AM=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function RM(i,e){let t=qe[e];if(t===void 0){let n=AM.get(e);if(n!==void 0)t=qe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ld(t)}var CM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ux(i){return i.replace(CM,LM)}function LM(i,e,t,n){let r="";for(let o=parseInt(e);o<parseInt(t);o++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function Nx(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function PM(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ga?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===tp?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ri&&(e="SHADOWMAP_TYPE_VSM"),e}function IM(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case oi:case Si:e="ENVMAP_TYPE_CUBE";break;case pr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function DM(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Si&&(e="ENVMAP_MODE_REFRACTION"),e}function UM(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Va:e="ENVMAP_BLENDING_MULTIPLY";break;case Sp:e="ENVMAP_BLENDING_MIX";break;case wp:e="ENVMAP_BLENDING_ADD";break}return e}function NM(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Bx(i,e,t,n){let r=i.getContext(),o=t.defines,s=t.vertexShader,a=t.fragmentShader,c=PM(t),l=IM(t),u=DM(t),d=UM(t),h=NM(t),p=t.isWebGL2?"":MM(t),g=bM(t),x=TM(o),m=r.createProgram(),f,v,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(rs).join(`
`),f.length>0&&(f+=`
`),v=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(rs).join(`
`),v.length>0&&(v+=`
`)):(f=[Nx(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(rs).join(`
`),v=[p,Nx(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xn?"#define TONE_MAPPING":"",t.toneMapping!==Xn?qe.tonemapping_pars_fragment:"",t.toneMapping!==Xn?EM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,vM("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(rs).join(`
`)),s=Ld(s),s=Ix(s,t),s=Dx(s,t),a=Ld(a),a=Ix(a,t),a=Dx(a,t),s=Ux(s),a=Ux(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,f=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===id?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===id?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);let T=_+f+s,A=_+v+a,b=Cd(r,r.VERTEX_SHADER,T),S=Cd(r,r.FRAGMENT_SHADER,A);r.attachShader(m,b),r.attachShader(m,S),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function P(O){if(i.debug.checkShaderErrors){let te=r.getProgramInfoLog(m).trim(),D=r.getShaderInfoLog(b).trim(),G=r.getShaderInfoLog(S).trim(),X=!0,z=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,m,b,S);else{let V=Px(r,b,"vertex"),j=Px(r,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+te+`
`+V+`
`+j)}else te!==""?console.warn("THREE.WebGLProgram: Program Info Log:",te):(D===""||G==="")&&(z=!1);z&&(O.diagnostics={runnable:X,programLog:te,vertexShader:{log:D,prefix:f},fragmentShader:{log:G,prefix:v}})}r.deleteShader(b),r.deleteShader(S),E=new Rr(r,m),w=SM(r,m)}let E;this.getUniforms=function(){return E===void 0&&P(this),E};let w;this.getAttributes=function(){return w===void 0&&P(this),w};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=r.getProgramParameter(m,gM)),I},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=xM++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=S,this}var BM=0,zc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),o=this._getShaderStage(n),s=this._getShaderCacheForMaterial(e);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(o)===!1&&(s.add(o),o.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Pd(e),t.set(e,n)),n}},Pd=class{constructor(e){this.id=BM++,this.code=e,this.usedTimes=0}};function Fx(i,e,t,n,r,o,s){let a=new Tr,c=new zc,l=[],u=r.isWebGL2,d=r.logarithmicDepthBuffer,h=r.vertexTextures,p=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return E===0?"uv":`uv${E}`}function m(E,w,I,O,te){let D=O.fog,G=te.geometry,X=E.isMeshStandardMaterial?O.environment:null,z=(E.isMeshStandardMaterial?t:e).get(E.envMap||X),V=z&&z.mapping===pr?z.image.height:null,j=g[E.type];E.precision!==null&&(p=r.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));let ce=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,se=ce!==void 0?ce.length:0,F=0;G.morphAttributes.position!==void 0&&(F=1),G.morphAttributes.normal!==void 0&&(F=2),G.morphAttributes.color!==void 0&&(F=3);let N,q,de,_e;if(j){let pn=Jn[j];N=pn.vertexShader,q=pn.fragmentShader}else N=E.vertexShader,q=E.fragmentShader,c.update(E),de=c.getVertexShaderID(E),_e=c.getFragmentShaderID(E);let ie=i.getRenderTarget(),H=te.isInstancedMesh===!0,Q=te.isBatchedMesh===!0,le=!!E.map,W=!!E.matcap,R=!!z,he=!!E.aoMap,pe=!!E.lightMap,ye=!!E.bumpMap,$=!!E.normalMap,ue=!!E.displacementMap,U=!!E.emissiveMap,M=!!E.metalnessMap,y=!!E.roughnessMap,B=E.anisotropy>0,K=E.clearcoat>0,Z=E.iridescence>0,ee=E.sheen>0,ve=E.transmission>0,me=B&&!!E.anisotropyMap,xe=K&&!!E.clearcoatMap,Me=K&&!!E.clearcoatNormalMap,Ee=K&&!!E.clearcoatRoughnessMap,Y=Z&&!!E.iridescenceMap,Le=Z&&!!E.iridescenceThicknessMap,Ce=ee&&!!E.sheenColorMap,Ie=ee&&!!E.sheenRoughnessMap,we=!!E.specularMap,Se=!!E.specularColorMap,Ne=!!E.specularIntensityMap,Ye=ve&&!!E.transmissionMap,at=ve&&!!E.thicknessMap,He=!!E.gradientMap,be=!!E.alphaMap,k=E.alphaTest>0,Ae=!!E.alphaHash,Re=!!E.extensions,ze=!!G.attributes.uv1,Fe=!!G.attributes.uv2,_t=!!G.attributes.uv3,yt=Xn;return E.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(yt=i.toneMapping),{isWebGL2:u,shaderID:j,shaderType:E.type,shaderName:E.name,vertexShader:N,fragmentShader:q,defines:E.defines,customVertexShaderID:de,customFragmentShaderID:_e,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Q,instancing:H,instancingColor:H&&te.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:ie===null?i.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:pt,map:le,matcap:W,envMap:R,envMapMode:R&&z.mapping,envMapCubeUVHeight:V,aoMap:he,lightMap:pe,bumpMap:ye,normalMap:$,displacementMap:h&&ue,emissiveMap:U,normalMapObjectSpace:$&&E.normalMapType===Wp,normalMapTangentSpace:$&&E.normalMapType===sc,metalnessMap:M,roughnessMap:y,anisotropy:B,anisotropyMap:me,clearcoat:K,clearcoatMap:xe,clearcoatNormalMap:Me,clearcoatRoughnessMap:Ee,iridescence:Z,iridescenceMap:Y,iridescenceThicknessMap:Le,sheen:ee,sheenColorMap:Ce,sheenRoughnessMap:Ie,specularMap:we,specularColorMap:Se,specularIntensityMap:Ne,transmission:ve,transmissionMap:Ye,thicknessMap:at,gradientMap:He,opaque:E.transparent===!1&&E.blending===ki,alphaMap:be,alphaTest:k,alphaHash:Ae,combine:E.combine,mapUv:le&&x(E.map.channel),aoMapUv:he&&x(E.aoMap.channel),lightMapUv:pe&&x(E.lightMap.channel),bumpMapUv:ye&&x(E.bumpMap.channel),normalMapUv:$&&x(E.normalMap.channel),displacementMapUv:ue&&x(E.displacementMap.channel),emissiveMapUv:U&&x(E.emissiveMap.channel),metalnessMapUv:M&&x(E.metalnessMap.channel),roughnessMapUv:y&&x(E.roughnessMap.channel),anisotropyMapUv:me&&x(E.anisotropyMap.channel),clearcoatMapUv:xe&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:Me&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:Le&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&x(E.sheenRoughnessMap.channel),specularMapUv:we&&x(E.specularMap.channel),specularColorMapUv:Se&&x(E.specularColorMap.channel),specularIntensityMapUv:Ne&&x(E.specularIntensityMap.channel),transmissionMapUv:Ye&&x(E.transmissionMap.channel),thicknessMapUv:at&&x(E.thicknessMap.channel),alphaMapUv:be&&x(E.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&($||B),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,vertexUv1s:ze,vertexUv2s:Fe,vertexUv3s:_t,pointsUvs:te.isPoints===!0&&!!G.attributes.uv&&(le||be),fog:!!D,useFog:E.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:te.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:se,morphTextureStride:F,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:yt,useLegacyLights:i._useLegacyLights,decodeVideoTexture:le&&E.map.isVideoTexture===!0&&Ke.getTransfer(E.map.colorSpace)===ct,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===It,flipSided:E.side===bt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:Re&&E.extensions.derivatives===!0,extensionFragDepth:Re&&E.extensions.fragDepth===!0,extensionDrawBuffers:Re&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:Re&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Re&&E.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function f(E){let w=[];if(E.shaderID?w.push(E.shaderID):(w.push(E.customVertexShaderID),w.push(E.customFragmentShaderID)),E.defines!==void 0)for(let I in E.defines)w.push(I),w.push(E.defines[I]);return E.isRawShaderMaterial===!1&&(v(w,E),_(w,E),w.push(i.outputColorSpace)),w.push(E.customProgramCacheKey),w.join()}function v(E,w){E.push(w.precision),E.push(w.outputColorSpace),E.push(w.envMapMode),E.push(w.envMapCubeUVHeight),E.push(w.mapUv),E.push(w.alphaMapUv),E.push(w.lightMapUv),E.push(w.aoMapUv),E.push(w.bumpMapUv),E.push(w.normalMapUv),E.push(w.displacementMapUv),E.push(w.emissiveMapUv),E.push(w.metalnessMapUv),E.push(w.roughnessMapUv),E.push(w.anisotropyMapUv),E.push(w.clearcoatMapUv),E.push(w.clearcoatNormalMapUv),E.push(w.clearcoatRoughnessMapUv),E.push(w.iridescenceMapUv),E.push(w.iridescenceThicknessMapUv),E.push(w.sheenColorMapUv),E.push(w.sheenRoughnessMapUv),E.push(w.specularMapUv),E.push(w.specularColorMapUv),E.push(w.specularIntensityMapUv),E.push(w.transmissionMapUv),E.push(w.thicknessMapUv),E.push(w.combine),E.push(w.fogExp2),E.push(w.sizeAttenuation),E.push(w.morphTargetsCount),E.push(w.morphAttributeCount),E.push(w.numDirLights),E.push(w.numPointLights),E.push(w.numSpotLights),E.push(w.numSpotLightMaps),E.push(w.numHemiLights),E.push(w.numRectAreaLights),E.push(w.numDirLightShadows),E.push(w.numPointLightShadows),E.push(w.numSpotLightShadows),E.push(w.numSpotLightShadowsWithMaps),E.push(w.numLightProbes),E.push(w.shadowMapType),E.push(w.toneMapping),E.push(w.numClippingPlanes),E.push(w.numClipIntersection),E.push(w.depthPacking)}function _(E,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),E.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.skinning&&a.enable(4),w.morphTargets&&a.enable(5),w.morphNormals&&a.enable(6),w.morphColors&&a.enable(7),w.premultipliedAlpha&&a.enable(8),w.shadowMapEnabled&&a.enable(9),w.useLegacyLights&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),E.push(a.mask)}function T(E){let w=g[E.type],I;if(w){let O=Jn[w];I=_m.clone(O.uniforms)}else I=E.uniforms;return I}function A(E,w){let I;for(let O=0,te=l.length;O<te;O++){let D=l[O];if(D.cacheKey===w){I=D,++I.usedTimes;break}}return I===void 0&&(I=new Bx(i,w,E,o),l.push(I)),I}function b(E){if(--E.usedTimes===0){let w=l.indexOf(E);l[w]=l[l.length-1],l.pop(),E.destroy()}}function S(E){c.remove(E)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:T,acquireProgram:A,releaseProgram:b,releaseShaderCache:S,programs:l,dispose:P}}function Ox(){let i=new WeakMap;function e(o){let s=i.get(o);return s===void 0&&(s={},i.set(o,s)),s}function t(o){i.delete(o)}function n(o,s,a){i.get(o)[s]=a}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function FM(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Hx(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function kx(){let i=[],e=0,t=[],n=[],r=[];function o(){e=0,t.length=0,n.length=0,r.length=0}function s(d,h,p,g,x,m){let f=i[e];return f===void 0?(f={id:d.id,object:d,geometry:h,material:p,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},i[e]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=x,f.group=m),e++,f}function a(d,h,p,g,x,m){let f=s(d,h,p,g,x,m);p.transmission>0?n.push(f):p.transparent===!0?r.push(f):t.push(f)}function c(d,h,p,g,x,m){let f=s(d,h,p,g,x,m);p.transmission>0?n.unshift(f):p.transparent===!0?r.unshift(f):t.unshift(f)}function l(d,h){t.length>1&&t.sort(d||FM),n.length>1&&n.sort(h||Hx),r.length>1&&r.sort(h||Hx)}function u(){for(let d=e,h=i.length;d<h;d++){let p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:o,push:a,unshift:c,finish:u,sort:l}}function zx(){let i=new WeakMap;function e(n,r){let o=i.get(n),s;return o===void 0?(s=new kx,i.set(n,[s])):r>=o.length?(s=new kx,o.push(s)):s=o[r],s}function t(){i=new WeakMap}return{get:e,dispose:t}}function OM(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new ge};break;case"SpotLight":t={position:new L,direction:new L,color:new ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new ge,groundColor:new ge};break;case"RectAreaLight":t={color:new ge,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function HM(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var kM=0;function zM(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Gx(i,e){let t=new OM,n=HM(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new L);let o=new L,s=new Ue,a=new Ue;function c(u,d){let h=0,p=0,g=0;for(let O=0;O<9;O++)r.probe[O].set(0,0,0);let x=0,m=0,f=0,v=0,_=0,T=0,A=0,b=0,S=0,P=0,E=0;u.sort(zM);let w=d===!0?Math.PI:1;for(let O=0,te=u.length;O<te;O++){let D=u[O],G=D.color,X=D.intensity,z=D.distance,V=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=G.r*X*w,p+=G.g*X*w,g+=G.b*X*w;else if(D.isLightProbe){for(let j=0;j<9;j++)r.probe[j].addScaledVector(D.sh.coefficients[j],X);E++}else if(D.isDirectionalLight){let j=t.get(D);if(j.color.copy(D.color).multiplyScalar(D.intensity*w),D.castShadow){let ce=D.shadow,se=n.get(D);se.shadowBias=ce.bias,se.shadowNormalBias=ce.normalBias,se.shadowRadius=ce.radius,se.shadowMapSize=ce.mapSize,r.directionalShadow[x]=se,r.directionalShadowMap[x]=V,r.directionalShadowMatrix[x]=D.shadow.matrix,T++}r.directional[x]=j,x++}else if(D.isSpotLight){let j=t.get(D);j.position.setFromMatrixPosition(D.matrixWorld),j.color.copy(G).multiplyScalar(X*w),j.distance=z,j.coneCos=Math.cos(D.angle),j.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),j.decay=D.decay,r.spot[f]=j;let ce=D.shadow;if(D.map&&(r.spotLightMap[S]=D.map,S++,ce.updateMatrices(D),D.castShadow&&P++),r.spotLightMatrix[f]=ce.matrix,D.castShadow){let se=n.get(D);se.shadowBias=ce.bias,se.shadowNormalBias=ce.normalBias,se.shadowRadius=ce.radius,se.shadowMapSize=ce.mapSize,r.spotShadow[f]=se,r.spotShadowMap[f]=V,b++}f++}else if(D.isRectAreaLight){let j=t.get(D);j.color.copy(G).multiplyScalar(X),j.halfWidth.set(D.width*.5,0,0),j.halfHeight.set(0,D.height*.5,0),r.rectArea[v]=j,v++}else if(D.isPointLight){let j=t.get(D);if(j.color.copy(D.color).multiplyScalar(D.intensity*w),j.distance=D.distance,j.decay=D.decay,D.castShadow){let ce=D.shadow,se=n.get(D);se.shadowBias=ce.bias,se.shadowNormalBias=ce.normalBias,se.shadowRadius=ce.radius,se.shadowMapSize=ce.mapSize,se.shadowCameraNear=ce.camera.near,se.shadowCameraFar=ce.camera.far,r.pointShadow[m]=se,r.pointShadowMap[m]=V,r.pointShadowMatrix[m]=D.shadow.matrix,A++}r.point[m]=j,m++}else if(D.isHemisphereLight){let j=t.get(D);j.skyColor.copy(D.color).multiplyScalar(X*w),j.groundColor.copy(D.groundColor).multiplyScalar(X*w),r.hemi[_]=j,_++}}v>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Te.LTC_FLOAT_1,r.rectAreaLTC2=Te.LTC_FLOAT_2):(r.rectAreaLTC1=Te.LTC_HALF_1,r.rectAreaLTC2=Te.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Te.LTC_FLOAT_1,r.rectAreaLTC2=Te.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=Te.LTC_HALF_1,r.rectAreaLTC2=Te.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=p,r.ambient[2]=g;let I=r.hash;(I.directionalLength!==x||I.pointLength!==m||I.spotLength!==f||I.rectAreaLength!==v||I.hemiLength!==_||I.numDirectionalShadows!==T||I.numPointShadows!==A||I.numSpotShadows!==b||I.numSpotMaps!==S||I.numLightProbes!==E)&&(r.directional.length=x,r.spot.length=f,r.rectArea.length=v,r.point.length=m,r.hemi.length=_,r.directionalShadow.length=T,r.directionalShadowMap.length=T,r.pointShadow.length=A,r.pointShadowMap.length=A,r.spotShadow.length=b,r.spotShadowMap.length=b,r.directionalShadowMatrix.length=T,r.pointShadowMatrix.length=A,r.spotLightMatrix.length=b+S-P,r.spotLightMap.length=S,r.numSpotLightShadowsWithMaps=P,r.numLightProbes=E,I.directionalLength=x,I.pointLength=m,I.spotLength=f,I.rectAreaLength=v,I.hemiLength=_,I.numDirectionalShadows=T,I.numPointShadows=A,I.numSpotShadows=b,I.numSpotMaps=S,I.numLightProbes=E,r.version=kM++)}function l(u,d){let h=0,p=0,g=0,x=0,m=0,f=d.matrixWorldInverse;for(let v=0,_=u.length;v<_;v++){let T=u[v];if(T.isDirectionalLight){let A=r.directional[h];A.direction.setFromMatrixPosition(T.matrixWorld),o.setFromMatrixPosition(T.target.matrixWorld),A.direction.sub(o),A.direction.transformDirection(f),h++}else if(T.isSpotLight){let A=r.spot[g];A.position.setFromMatrixPosition(T.matrixWorld),A.position.applyMatrix4(f),A.direction.setFromMatrixPosition(T.matrixWorld),o.setFromMatrixPosition(T.target.matrixWorld),A.direction.sub(o),A.direction.transformDirection(f),g++}else if(T.isRectAreaLight){let A=r.rectArea[x];A.position.setFromMatrixPosition(T.matrixWorld),A.position.applyMatrix4(f),a.identity(),s.copy(T.matrixWorld),s.premultiply(f),a.extractRotation(s),A.halfWidth.set(T.width*.5,0,0),A.halfHeight.set(0,T.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),x++}else if(T.isPointLight){let A=r.point[p];A.position.setFromMatrixPosition(T.matrixWorld),A.position.applyMatrix4(f),p++}else if(T.isHemisphereLight){let A=r.hemi[m];A.direction.setFromMatrixPosition(T.matrixWorld),A.direction.transformDirection(f),m++}}}return{setup:c,setupView:l,state:r}}function Vx(i,e){let t=new Gx(i,e),n=[],r=[];function o(){n.length=0,r.length=0}function s(d){n.push(d)}function a(d){r.push(d)}function c(d){t.setup(n,d)}function l(d){t.setupView(n,d)}return{init:o,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:c,setupLightsView:l,pushLight:s,pushShadow:a}}function Wx(i,e){let t=new WeakMap;function n(o,s=0){let a=t.get(o),c;return a===void 0?(c=new Vx(i,e),t.set(o,[c])):s>=a.length?(c=new Vx(i,e),a.push(c)):c=a[s],c}function r(){t=new WeakMap}return{get:n,dispose:r}}var Gc=class extends Dt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}};var Vc=class extends Dt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Xx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}
`,qx=`
uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;

#include <packing>

void main() {

	const float samples = float( VSM_SAMPLES );

	float mean = 0.0;
	float squared_mean = 0.0;

	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {

		float uvOffset = uvStart + i * uvStride;

		#ifdef HORIZONTAL_PASS

			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;

		#else

			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;

		#endif

	}

	mean = mean / samples;
	squared_mean = squared_mean / samples;

	float std_dev = sqrt( squared_mean - mean * mean );

	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );

}
`;function Yx(i,e,t){let n=new wr,r=new De,o=new De,s=new rt,a=new Gc({depthPacking:Vp}),c=new Vc,l={},u=t.maxTextureSize,d={[Zt]:bt,[bt]:Zt,[It]:It},h=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new De},radius:{value:4}},vertexShader:Xx,fragmentShader:qx}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let g=new Je;g.setAttribute("position",new $e(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ge(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ga;let f=this.type;this.render=function(b,S,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;let E=i.getRenderTarget(),w=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Wn),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let te=f!==ri&&this.type===ri,D=f===ri&&this.type!==ri;for(let G=0,X=b.length;G<X;G++){let z=b[G],V=z.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);let j=V.getFrameExtents();if(r.multiply(j),o.copy(V.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(o.x=Math.floor(u/j.x),r.x=o.x*j.x,V.mapSize.x=o.x),r.y>u&&(o.y=Math.floor(u/j.y),r.y=o.y*j.y,V.mapSize.y=o.y)),V.map===null||te===!0||D===!0){let se=this.type!==ri?{minFilter:Tt,magFilter:Tt}:{};V.map!==null&&V.map.dispose(),V.map=new Sn(r.x,r.y,se),V.map.texture.name=z.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();let ce=V.getViewportCount();for(let se=0;se<ce;se++){let F=V.getViewport(se);s.set(o.x*F.x,o.y*F.y,o.x*F.z,o.y*F.w),O.viewport(s),V.updateMatrices(z,se),n=V.getFrustum(),T(S,P,V.camera,z,this.type)}V.isPointLightShadow!==!0&&this.type===ri&&v(V,P),V.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(E,w,I)};function v(b,S){let P=e.update(x);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Sn(r.x,r.y)),h.uniforms.shadow_pass.value=b.map.texture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(S,null,P,h,x,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(S,null,P,p,x,null)}function _(b,S,P,E){let w=null,I=P.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(I!==void 0)w=I;else if(w=P.isPointLight===!0?c:a,i.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0){let O=w.uuid,te=S.uuid,D=l[O];D===void 0&&(D={},l[O]=D);let G=D[te];G===void 0&&(G=w.clone(),D[te]=G,S.addEventListener("dispose",A)),w=G}if(w.visible=S.visible,w.wireframe=S.wireframe,E===ri?w.side=S.shadowSide!==null?S.shadowSide:S.side:w.side=S.shadowSide!==null?S.shadowSide:d[S.side],w.alphaMap=S.alphaMap,w.alphaTest=S.alphaTest,w.map=S.map,w.clipShadows=S.clipShadows,w.clippingPlanes=S.clippingPlanes,w.clipIntersection=S.clipIntersection,w.displacementMap=S.displacementMap,w.displacementScale=S.displacementScale,w.displacementBias=S.displacementBias,w.wireframeLinewidth=S.wireframeLinewidth,w.linewidth=S.linewidth,P.isPointLight===!0&&w.isMeshDistanceMaterial===!0){let O=i.properties.get(w);O.light=P}return w}function T(b,S,P,E,w){if(b.visible===!1)return;if(b.layers.test(S.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&w===ri)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,b.matrixWorld);let te=e.update(b),D=b.material;if(Array.isArray(D)){let G=te.groups;for(let X=0,z=G.length;X<z;X++){let V=G[X],j=D[V.materialIndex];if(j&&j.visible){let ce=_(b,j,E,w);b.onBeforeShadow(i,b,S,P,te,ce,V),i.renderBufferDirect(P,null,te,ce,b,V),b.onAfterShadow(i,b,S,P,te,ce,V)}}}else if(D.visible){let G=_(b,D,E,w);b.onBeforeShadow(i,b,S,P,te,G,null),i.renderBufferDirect(P,null,te,G,b,null),b.onAfterShadow(i,b,S,P,te,G,null)}}let O=b.children;for(let te=0,D=O.length;te<D;te++)T(O[te],S,P,E,w)}function A(b){b.target.removeEventListener("dispose",A);for(let P in l){let E=l[P],w=b.target.uuid;w in E&&(E[w].dispose(),delete E[w])}}}function jx(i,e,t){let n=t.isWebGL2;function r(){let k=!1,Ae=new rt,Re=null,ze=new rt(0,0,0,0);return{setMask:function(Fe){Re!==Fe&&!k&&(i.colorMask(Fe,Fe,Fe,Fe),Re=Fe)},setLocked:function(Fe){k=Fe},setClear:function(Fe,_t,yt,$t,pn){pn===!0&&(Fe*=$t,_t*=$t,yt*=$t),Ae.set(Fe,_t,yt,$t),ze.equals(Ae)===!1&&(i.clearColor(Fe,_t,yt,$t),ze.copy(Ae))},reset:function(){k=!1,Re=null,ze.set(-1,0,0,0)}}}function o(){let k=!1,Ae=null,Re=null,ze=null;return{setTest:function(Fe){Fe?Q(i.DEPTH_TEST):le(i.DEPTH_TEST)},setMask:function(Fe){Ae!==Fe&&!k&&(i.depthMask(Fe),Ae=Fe)},setFunc:function(Fe){if(Re!==Fe){switch(Fe){case _p:i.depthFunc(i.NEVER);break;case yp:i.depthFunc(i.ALWAYS);break;case vp:i.depthFunc(i.LESS);break;case bo:i.depthFunc(i.LEQUAL);break;case Ep:i.depthFunc(i.EQUAL);break;case Mp:i.depthFunc(i.GEQUAL);break;case bp:i.depthFunc(i.GREATER);break;case Tp:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Re=Fe}},setLocked:function(Fe){k=Fe},setClear:function(Fe){ze!==Fe&&(i.clearDepth(Fe),ze=Fe)},reset:function(){k=!1,Ae=null,Re=null,ze=null}}}function s(){let k=!1,Ae=null,Re=null,ze=null,Fe=null,_t=null,yt=null,$t=null,pn=null;return{setTest:function(vt){k||(vt?Q(i.STENCIL_TEST):le(i.STENCIL_TEST))},setMask:function(vt){Ae!==vt&&!k&&(i.stencilMask(vt),Ae=vt)},setFunc:function(vt,mn,bi){(Re!==vt||ze!==mn||Fe!==bi)&&(i.stencilFunc(vt,mn,bi),Re=vt,ze=mn,Fe=bi)},setOp:function(vt,mn,bi){(_t!==vt||yt!==mn||$t!==bi)&&(i.stencilOp(vt,mn,bi),_t=vt,yt=mn,$t=bi)},setLocked:function(vt){k=vt},setClear:function(vt){pn!==vt&&(i.clearStencil(vt),pn=vt)},reset:function(){k=!1,Ae=null,Re=null,ze=null,Fe=null,_t=null,yt=null,$t=null,pn=null}}}let a=new r,c=new o,l=new s,u=new WeakMap,d=new WeakMap,h={},p={},g=new WeakMap,x=[],m=null,f=!1,v=null,_=null,T=null,A=null,b=null,S=null,P=null,E=new ge(0,0,0),w=0,I=!1,O=null,te=null,D=null,G=null,X=null,z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,j=0,ce=i.getParameter(i.VERSION);ce.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(ce)[1]),V=j>=1):ce.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(ce)[1]),V=j>=2);let se=null,F={},N=i.getParameter(i.SCISSOR_BOX),q=i.getParameter(i.VIEWPORT),de=new rt().fromArray(N),_e=new rt().fromArray(q);function ie(k,Ae,Re,ze){let Fe=new Uint8Array(4),_t=i.createTexture();i.bindTexture(k,_t),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let yt=0;yt<Re;yt++)n&&(k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY)?i.texImage3D(Ae,0,i.RGBA,1,1,ze,0,i.RGBA,i.UNSIGNED_BYTE,Fe):i.texImage2D(Ae+yt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Fe);return _t}let H={};H[i.TEXTURE_2D]=ie(i.TEXTURE_2D,i.TEXTURE_2D,1),H[i.TEXTURE_CUBE_MAP]=ie(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(H[i.TEXTURE_2D_ARRAY]=ie(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),H[i.TEXTURE_3D]=ie(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Q(i.DEPTH_TEST),c.setFunc(bo),U(!1),M(Eu),Q(i.CULL_FACE),$(Wn);function Q(k){h[k]!==!0&&(i.enable(k),h[k]=!0)}function le(k){h[k]!==!1&&(i.disable(k),h[k]=!1)}function W(k,Ae){return p[k]!==Ae?(i.bindFramebuffer(k,Ae),p[k]=Ae,n&&(k===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=Ae),k===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=Ae)),!0):!1}function R(k,Ae){let Re=x,ze=!1;if(k)if(Re=g.get(Ae),Re===void 0&&(Re=[],g.set(Ae,Re)),k.isWebGLMultipleRenderTargets){let Fe=k.texture;if(Re.length!==Fe.length||Re[0]!==i.COLOR_ATTACHMENT0){for(let _t=0,yt=Fe.length;_t<yt;_t++)Re[_t]=i.COLOR_ATTACHMENT0+_t;Re.length=Fe.length,ze=!0}}else Re[0]!==i.COLOR_ATTACHMENT0&&(Re[0]=i.COLOR_ATTACHMENT0,ze=!0);else Re[0]!==i.BACK&&(Re[0]=i.BACK,ze=!0);ze&&(t.isWebGL2?i.drawBuffers(Re):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Re))}function he(k){return m!==k?(i.useProgram(k),m=k,!0):!1}let pe={[zi]:i.FUNC_ADD,[ip]:i.FUNC_SUBTRACT,[rp]:i.FUNC_REVERSE_SUBTRACT};if(n)pe[bu]=i.MIN,pe[Tu]=i.MAX;else{let k=e.get("EXT_blend_minmax");k!==null&&(pe[bu]=k.MIN_EXT,pe[Tu]=k.MAX_EXT)}let ye={[op]:i.ZERO,[sp]:i.ONE,[ap]:i.SRC_COLOR,[Os]:i.SRC_ALPHA,[fp]:i.SRC_ALPHA_SATURATE,[dp]:i.DST_COLOR,[lp]:i.DST_ALPHA,[cp]:i.ONE_MINUS_SRC_COLOR,[Hs]:i.ONE_MINUS_SRC_ALPHA,[hp]:i.ONE_MINUS_DST_COLOR,[up]:i.ONE_MINUS_DST_ALPHA,[pp]:i.CONSTANT_COLOR,[mp]:i.ONE_MINUS_CONSTANT_COLOR,[gp]:i.CONSTANT_ALPHA,[xp]:i.ONE_MINUS_CONSTANT_ALPHA};function $(k,Ae,Re,ze,Fe,_t,yt,$t,pn,vt){if(k===Wn){f===!0&&(le(i.BLEND),f=!1);return}if(f===!1&&(Q(i.BLEND),f=!0),k!==np){if(k!==v||vt!==I){if((_!==zi||b!==zi)&&(i.blendEquation(i.FUNC_ADD),_=zi,b=zi),vt)switch(k){case ki:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fr:i.blendFunc(i.ONE,i.ONE);break;case Mu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fs:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case ki:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fr:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Mu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Fs:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}T=null,A=null,S=null,P=null,E.set(0,0,0),w=0,v=k,I=vt}return}Fe=Fe||Ae,_t=_t||Re,yt=yt||ze,(Ae!==_||Fe!==b)&&(i.blendEquationSeparate(pe[Ae],pe[Fe]),_=Ae,b=Fe),(Re!==T||ze!==A||_t!==S||yt!==P)&&(i.blendFuncSeparate(ye[Re],ye[ze],ye[_t],ye[yt]),T=Re,A=ze,S=_t,P=yt),($t.equals(E)===!1||pn!==w)&&(i.blendColor($t.r,$t.g,$t.b,pn),E.copy($t),w=pn),v=k,I=!1}function ue(k,Ae){k.side===It?le(i.CULL_FACE):Q(i.CULL_FACE);let Re=k.side===bt;Ae&&(Re=!Re),U(Re),k.blending===ki&&k.transparent===!1?$(Wn):$(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),c.setFunc(k.depthFunc),c.setTest(k.depthTest),c.setMask(k.depthWrite),a.setMask(k.colorWrite);let ze=k.stencilWrite;l.setTest(ze),ze&&(l.setMask(k.stencilWriteMask),l.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),l.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),B(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):le(i.SAMPLE_ALPHA_TO_COVERAGE)}function U(k){O!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),O=k)}function M(k){k!==Qf?(Q(i.CULL_FACE),k!==te&&(k===Eu?i.cullFace(i.BACK):k===ep?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):le(i.CULL_FACE),te=k}function y(k){k!==D&&(V&&i.lineWidth(k),D=k)}function B(k,Ae,Re){k?(Q(i.POLYGON_OFFSET_FILL),(G!==Ae||X!==Re)&&(i.polygonOffset(Ae,Re),G=Ae,X=Re)):le(i.POLYGON_OFFSET_FILL)}function K(k){k?Q(i.SCISSOR_TEST):le(i.SCISSOR_TEST)}function Z(k){k===void 0&&(k=i.TEXTURE0+z-1),se!==k&&(i.activeTexture(k),se=k)}function ee(k,Ae,Re){Re===void 0&&(se===null?Re=i.TEXTURE0+z-1:Re=se);let ze=F[Re];ze===void 0&&(ze={type:void 0,texture:void 0},F[Re]=ze),(ze.type!==k||ze.texture!==Ae)&&(se!==Re&&(i.activeTexture(Re),se=Re),i.bindTexture(k,Ae||H[k]),ze.type=k,ze.texture=Ae)}function ve(){let k=F[se];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function me(){try{i.compressedTexImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function xe(){try{i.compressedTexImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Me(){try{i.texSubImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ee(){try{i.texSubImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Y(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Le(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ce(){try{i.texStorage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ie(){try{i.texStorage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function we(){try{i.texImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Se(){try{i.texImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ne(k){de.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),de.copy(k))}function Ye(k){_e.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),_e.copy(k))}function at(k,Ae){let Re=d.get(Ae);Re===void 0&&(Re=new WeakMap,d.set(Ae,Re));let ze=Re.get(k);ze===void 0&&(ze=i.getUniformBlockIndex(Ae,k.name),Re.set(k,ze))}function He(k,Ae){let ze=d.get(Ae).get(k);u.get(Ae)!==ze&&(i.uniformBlockBinding(Ae,ze,k.__bindingPointIndex),u.set(Ae,ze))}function be(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},se=null,F={},p={},g=new WeakMap,x=[],m=null,f=!1,v=null,_=null,T=null,A=null,b=null,S=null,P=null,E=new ge(0,0,0),w=0,I=!1,O=null,te=null,D=null,G=null,X=null,de.set(0,0,i.canvas.width,i.canvas.height),_e.set(0,0,i.canvas.width,i.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:Q,disable:le,bindFramebuffer:W,drawBuffers:R,useProgram:he,setBlending:$,setMaterial:ue,setFlipSided:U,setCullFace:M,setLineWidth:y,setPolygonOffset:B,setScissorTest:K,activeTexture:Z,bindTexture:ee,unbindTexture:ve,compressedTexImage2D:me,compressedTexImage3D:xe,texImage2D:we,texImage3D:Se,updateUBOMapping:at,uniformBlockBinding:He,texStorage2D:Ce,texStorage3D:Ie,texSubImage2D:Me,texSubImage3D:Ee,compressedTexSubImage2D:Y,compressedTexSubImage3D:Le,scissor:Ne,viewport:Ye,reset:be}}function $x(i,e,t,n,r,o,s){let a=r.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap,d,h=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(M,y){return p?new OffscreenCanvas(M,y):gr("canvas")}function x(M,y,B,K){let Z=1;if((M.width>K||M.height>K)&&(Z=K/Math.max(M.width,M.height)),Z<1||y===!0)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap){let ee=y?Io:Math.floor,ve=ee(Z*M.width),me=ee(Z*M.height);d===void 0&&(d=g(ve,me));let xe=B?g(ve,me):d;return xe.width=ve,xe.height=me,xe.getContext("2d").drawImage(M,0,0,ve,me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+M.width+"x"+M.height+") to ("+ve+"x"+me+")."),xe}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+M.width+"x"+M.height+")."),M;return M}function m(M){return lc(M.width)&&lc(M.height)}function f(M){return a?!1:M.wrapS!==Ot||M.wrapT!==Ot||M.minFilter!==Tt&&M.minFilter!==Bt}function v(M,y){return M.generateMipmaps&&y&&M.minFilter!==Tt&&M.minFilter!==Bt}function _(M){i.generateMipmap(M)}function T(M,y,B,K,Z=!1){if(a===!1)return y;if(M!==null){if(i[M]!==void 0)return i[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let ee=y;if(y===i.RED&&(B===i.FLOAT&&(ee=i.R32F),B===i.HALF_FLOAT&&(ee=i.R16F),B===i.UNSIGNED_BYTE&&(ee=i.R8)),y===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(ee=i.R8UI),B===i.UNSIGNED_SHORT&&(ee=i.R16UI),B===i.UNSIGNED_INT&&(ee=i.R32UI),B===i.BYTE&&(ee=i.R8I),B===i.SHORT&&(ee=i.R16I),B===i.INT&&(ee=i.R32I)),y===i.RG&&(B===i.FLOAT&&(ee=i.RG32F),B===i.HALF_FLOAT&&(ee=i.RG16F),B===i.UNSIGNED_BYTE&&(ee=i.RG8)),y===i.RGBA){let ve=Z?Ro:Ke.getTransfer(K);B===i.FLOAT&&(ee=i.RGBA32F),B===i.HALF_FLOAT&&(ee=i.RGBA16F),B===i.UNSIGNED_BYTE&&(ee=ve===ct?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(ee=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(ee=i.RGB5_A1)}return(ee===i.R16F||ee===i.R32F||ee===i.RG16F||ee===i.RG32F||ee===i.RGBA16F||ee===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function A(M,y,B){return v(M,B)===!0||M.isFramebufferTexture&&M.minFilter!==Tt&&M.minFilter!==Bt?Math.log2(Math.max(y.width,y.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?y.mipmaps.length:1}function b(M){return M===Tt||M===Gs||M===To?i.NEAREST:i.LINEAR}function S(M){let y=M.target;y.removeEventListener("dispose",S),E(y),y.isVideoTexture&&u.delete(y)}function P(M){let y=M.target;y.removeEventListener("dispose",P),I(y)}function E(M){let y=n.get(M);if(y.__webglInit===void 0)return;let B=M.source,K=h.get(B);if(K){let Z=K[y.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&w(M),Object.keys(K).length===0&&h.delete(B)}n.remove(M)}function w(M){let y=n.get(M);i.deleteTexture(y.__webglTexture);let B=M.source,K=h.get(B);delete K[y.__cacheKey],s.memory.textures--}function I(M){let y=M.texture,B=n.get(M),K=n.get(y);if(K.__webglTexture!==void 0&&(i.deleteTexture(K.__webglTexture),s.memory.textures--),M.depthTexture&&M.depthTexture.dispose(),M.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(B.__webglFramebuffer[Z]))for(let ee=0;ee<B.__webglFramebuffer[Z].length;ee++)i.deleteFramebuffer(B.__webglFramebuffer[Z][ee]);else i.deleteFramebuffer(B.__webglFramebuffer[Z]);B.__webglDepthbuffer&&i.deleteRenderbuffer(B.__webglDepthbuffer[Z])}else{if(Array.isArray(B.__webglFramebuffer))for(let Z=0;Z<B.__webglFramebuffer.length;Z++)i.deleteFramebuffer(B.__webglFramebuffer[Z]);else i.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer&&i.deleteRenderbuffer(B.__webglDepthbuffer),B.__webglMultisampledFramebuffer&&i.deleteFramebuffer(B.__webglMultisampledFramebuffer),B.__webglColorRenderbuffer)for(let Z=0;Z<B.__webglColorRenderbuffer.length;Z++)B.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(B.__webglColorRenderbuffer[Z]);B.__webglDepthRenderbuffer&&i.deleteRenderbuffer(B.__webglDepthRenderbuffer)}if(M.isWebGLMultipleRenderTargets)for(let Z=0,ee=y.length;Z<ee;Z++){let ve=n.get(y[Z]);ve.__webglTexture&&(i.deleteTexture(ve.__webglTexture),s.memory.textures--),n.remove(y[Z])}n.remove(y),n.remove(M)}let O=0;function te(){O=0}function D(){let M=O;return M>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+r.maxTextures),O+=1,M}function G(M){let y=[];return y.push(M.wrapS),y.push(M.wrapT),y.push(M.wrapR||0),y.push(M.magFilter),y.push(M.minFilter),y.push(M.anisotropy),y.push(M.internalFormat),y.push(M.format),y.push(M.type),y.push(M.generateMipmaps),y.push(M.premultiplyAlpha),y.push(M.flipY),y.push(M.unpackAlignment),y.push(M.colorSpace),y.join()}function X(M,y){let B=n.get(M);if(M.isVideoTexture&&ue(M),M.isRenderTargetTexture===!1&&M.version>0&&B.__version!==M.version){let K=M.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{de(B,M,y);return}}t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+y)}function z(M,y){let B=n.get(M);if(M.version>0&&B.__version!==M.version){de(B,M,y);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+y)}function V(M,y){let B=n.get(M);if(M.version>0&&B.__version!==M.version){de(B,M,y);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+y)}function j(M,y){let B=n.get(M);if(M.version>0&&B.__version!==M.version){_e(B,M,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+y)}let ce={[si]:i.REPEAT,[Ot]:i.CLAMP_TO_EDGE,[Wr]:i.MIRRORED_REPEAT},se={[Tt]:i.NEAREST,[Gs]:i.NEAREST_MIPMAP_NEAREST,[To]:i.NEAREST_MIPMAP_LINEAR,[Bt]:i.LINEAR,[Xa]:i.LINEAR_MIPMAP_NEAREST,[qn]:i.LINEAR_MIPMAP_LINEAR},F={[Xp]:i.NEVER,[Zp]:i.ALWAYS,[qp]:i.LESS,[ac]:i.LEQUAL,[Yp]:i.EQUAL,[Kp]:i.GEQUAL,[jp]:i.GREATER,[$p]:i.NOTEQUAL};function N(M,y,B){if(B?(i.texParameteri(M,i.TEXTURE_WRAP_S,ce[y.wrapS]),i.texParameteri(M,i.TEXTURE_WRAP_T,ce[y.wrapT]),(M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY)&&i.texParameteri(M,i.TEXTURE_WRAP_R,ce[y.wrapR]),i.texParameteri(M,i.TEXTURE_MAG_FILTER,se[y.magFilter]),i.texParameteri(M,i.TEXTURE_MIN_FILTER,se[y.minFilter])):(i.texParameteri(M,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(M,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY)&&i.texParameteri(M,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(y.wrapS!==Ot||y.wrapT!==Ot)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(M,i.TEXTURE_MAG_FILTER,b(y.magFilter)),i.texParameteri(M,i.TEXTURE_MIN_FILTER,b(y.minFilter)),y.minFilter!==Tt&&y.minFilter!==Bt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(i.texParameteri(M,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(M,i.TEXTURE_COMPARE_FUNC,F[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let K=e.get("EXT_texture_filter_anisotropic");if(y.magFilter===Tt||y.minFilter!==To&&y.minFilter!==qn||y.type===gn&&e.has("OES_texture_float_linear")===!1||a===!1&&y.type===Gi&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||n.get(y).__currentAnisotropy)&&(i.texParameterf(M,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy)}}function q(M,y){let B=!1;M.__webglInit===void 0&&(M.__webglInit=!0,y.addEventListener("dispose",S));let K=y.source,Z=h.get(K);Z===void 0&&(Z={},h.set(K,Z));let ee=G(y);if(ee!==M.__cacheKey){Z[ee]===void 0&&(Z[ee]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,B=!0),Z[ee].usedTimes++;let ve=Z[M.__cacheKey];ve!==void 0&&(Z[M.__cacheKey].usedTimes--,ve.usedTimes===0&&w(y)),M.__cacheKey=ee,M.__webglTexture=Z[ee].texture}return B}function de(M,y,B){let K=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(K=i.TEXTURE_3D);let Z=q(M,y),ee=y.source;t.bindTexture(K,M.__webglTexture,i.TEXTURE0+B);let ve=n.get(ee);if(ee.version!==ve.__version||Z===!0){t.activeTexture(i.TEXTURE0+B);let me=Ke.getPrimaries(Ke.workingColorSpace),xe=y.colorSpace===Jt?null:Ke.getPrimaries(y.colorSpace),Me=y.colorSpace===Jt||me===xe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let Ee=f(y)&&m(y.image)===!1,Y=x(y.image,Ee,!1,r.maxTextureSize);Y=U(y,Y);let Le=m(Y)||a,Ce=o.convert(y.format,y.colorSpace),Ie=o.convert(y.type),we=T(y.internalFormat,Ce,Ie,y.colorSpace,y.isVideoTexture);N(K,y,Le);let Se,Ne=y.mipmaps,Ye=a&&y.isVideoTexture!==!0&&we!==nc,at=ve.__version===void 0||Z===!0,He=A(y,Y,Le);if(y.isDepthTexture)we=i.DEPTH_COMPONENT,a?y.type===gn?we=i.DEPTH_COMPONENT32F:y.type===Bn?we=i.DEPTH_COMPONENT24:y.type===Yn?we=i.DEPTH24_STENCIL8:we=i.DEPTH_COMPONENT16:y.type===gn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===ai&&we===i.DEPTH_COMPONENT&&y.type!==So&&y.type!==Bn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=Bn,Ie=o.convert(y.type)),y.format===wi&&we===i.DEPTH_COMPONENT&&(we=i.DEPTH_STENCIL,y.type!==Yn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=Yn,Ie=o.convert(y.type))),at&&(Ye?t.texStorage2D(i.TEXTURE_2D,1,we,Y.width,Y.height):t.texImage2D(i.TEXTURE_2D,0,we,Y.width,Y.height,0,Ce,Ie,null));else if(y.isDataTexture)if(Ne.length>0&&Le){Ye&&at&&t.texStorage2D(i.TEXTURE_2D,He,we,Ne[0].width,Ne[0].height);for(let be=0,k=Ne.length;be<k;be++)Se=Ne[be],Ye?t.texSubImage2D(i.TEXTURE_2D,be,0,0,Se.width,Se.height,Ce,Ie,Se.data):t.texImage2D(i.TEXTURE_2D,be,we,Se.width,Se.height,0,Ce,Ie,Se.data);y.generateMipmaps=!1}else Ye?(at&&t.texStorage2D(i.TEXTURE_2D,He,we,Y.width,Y.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Y.width,Y.height,Ce,Ie,Y.data)):t.texImage2D(i.TEXTURE_2D,0,we,Y.width,Y.height,0,Ce,Ie,Y.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ye&&at&&t.texStorage3D(i.TEXTURE_2D_ARRAY,He,we,Ne[0].width,Ne[0].height,Y.depth);for(let be=0,k=Ne.length;be<k;be++)Se=Ne[be],y.format!==Ht?Ce!==null?Ye?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,be,0,0,0,Se.width,Se.height,Y.depth,Ce,Se.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,be,we,Se.width,Se.height,Y.depth,0,Se.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage3D(i.TEXTURE_2D_ARRAY,be,0,0,0,Se.width,Se.height,Y.depth,Ce,Ie,Se.data):t.texImage3D(i.TEXTURE_2D_ARRAY,be,we,Se.width,Se.height,Y.depth,0,Ce,Ie,Se.data)}else{Ye&&at&&t.texStorage2D(i.TEXTURE_2D,He,we,Ne[0].width,Ne[0].height);for(let be=0,k=Ne.length;be<k;be++)Se=Ne[be],y.format!==Ht?Ce!==null?Ye?t.compressedTexSubImage2D(i.TEXTURE_2D,be,0,0,Se.width,Se.height,Ce,Se.data):t.compressedTexImage2D(i.TEXTURE_2D,be,we,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage2D(i.TEXTURE_2D,be,0,0,Se.width,Se.height,Ce,Ie,Se.data):t.texImage2D(i.TEXTURE_2D,be,we,Se.width,Se.height,0,Ce,Ie,Se.data)}else if(y.isDataArrayTexture)Ye?(at&&t.texStorage3D(i.TEXTURE_2D_ARRAY,He,we,Y.width,Y.height,Y.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Y.width,Y.height,Y.depth,Ce,Ie,Y.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,we,Y.width,Y.height,Y.depth,0,Ce,Ie,Y.data);else if(y.isData3DTexture)Ye?(at&&t.texStorage3D(i.TEXTURE_3D,He,we,Y.width,Y.height,Y.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Y.width,Y.height,Y.depth,Ce,Ie,Y.data)):t.texImage3D(i.TEXTURE_3D,0,we,Y.width,Y.height,Y.depth,0,Ce,Ie,Y.data);else if(y.isFramebufferTexture){if(at)if(Ye)t.texStorage2D(i.TEXTURE_2D,He,we,Y.width,Y.height);else{let be=Y.width,k=Y.height;for(let Ae=0;Ae<He;Ae++)t.texImage2D(i.TEXTURE_2D,Ae,we,be,k,0,Ce,Ie,null),be>>=1,k>>=1}}else if(Ne.length>0&&Le){Ye&&at&&t.texStorage2D(i.TEXTURE_2D,He,we,Ne[0].width,Ne[0].height);for(let be=0,k=Ne.length;be<k;be++)Se=Ne[be],Ye?t.texSubImage2D(i.TEXTURE_2D,be,0,0,Ce,Ie,Se):t.texImage2D(i.TEXTURE_2D,be,we,Ce,Ie,Se);y.generateMipmaps=!1}else Ye?(at&&t.texStorage2D(i.TEXTURE_2D,He,we,Y.width,Y.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ce,Ie,Y)):t.texImage2D(i.TEXTURE_2D,0,we,Ce,Ie,Y);v(y,Le)&&_(K),ve.__version=ee.version,y.onUpdate&&y.onUpdate(y)}M.__version=y.version}function _e(M,y,B){if(y.image.length!==6)return;let K=q(M,y),Z=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,M.__webglTexture,i.TEXTURE0+B);let ee=n.get(Z);if(Z.version!==ee.__version||K===!0){t.activeTexture(i.TEXTURE0+B);let ve=Ke.getPrimaries(Ke.workingColorSpace),me=y.colorSpace===Jt?null:Ke.getPrimaries(y.colorSpace),xe=y.colorSpace===Jt||ve===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);let Me=y.isCompressedTexture||y.image[0].isCompressedTexture,Ee=y.image[0]&&y.image[0].isDataTexture,Y=[];for(let be=0;be<6;be++)!Me&&!Ee?Y[be]=x(y.image[be],!1,!0,r.maxCubemapSize):Y[be]=Ee?y.image[be].image:y.image[be],Y[be]=U(y,Y[be]);let Le=Y[0],Ce=m(Le)||a,Ie=o.convert(y.format,y.colorSpace),we=o.convert(y.type),Se=T(y.internalFormat,Ie,we,y.colorSpace),Ne=a&&y.isVideoTexture!==!0,Ye=ee.__version===void 0||K===!0,at=A(y,Le,Ce);N(i.TEXTURE_CUBE_MAP,y,Ce);let He;if(Me){Ne&&Ye&&t.texStorage2D(i.TEXTURE_CUBE_MAP,at,Se,Le.width,Le.height);for(let be=0;be<6;be++){He=Y[be].mipmaps;for(let k=0;k<He.length;k++){let Ae=He[k];y.format!==Ht?Ie!==null?Ne?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,k,0,0,Ae.width,Ae.height,Ie,Ae.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,k,Se,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,k,0,0,Ae.width,Ae.height,Ie,we,Ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,k,Se,Ae.width,Ae.height,0,Ie,we,Ae.data)}}}else{He=y.mipmaps,Ne&&Ye&&(He.length>0&&at++,t.texStorage2D(i.TEXTURE_CUBE_MAP,at,Se,Y[0].width,Y[0].height));for(let be=0;be<6;be++)if(Ee){Ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,Y[be].width,Y[be].height,Ie,we,Y[be].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,Se,Y[be].width,Y[be].height,0,Ie,we,Y[be].data);for(let k=0;k<He.length;k++){let Re=He[k].image[be].image;Ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,k+1,0,0,Re.width,Re.height,Ie,we,Re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,k+1,Se,Re.width,Re.height,0,Ie,we,Re.data)}}else{Ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,0,0,Ie,we,Y[be]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,Se,Ie,we,Y[be]);for(let k=0;k<He.length;k++){let Ae=He[k];Ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,k+1,0,0,Ie,we,Ae.image[be]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,k+1,Se,Ie,we,Ae.image[be])}}}v(y,Ce)&&_(i.TEXTURE_CUBE_MAP),ee.__version=Z.version,y.onUpdate&&y.onUpdate(y)}M.__version=y.version}function ie(M,y,B,K,Z,ee){let ve=o.convert(B.format,B.colorSpace),me=o.convert(B.type),xe=T(B.internalFormat,ve,me,B.colorSpace);if(!n.get(y).__hasExternalTextures){let Ee=Math.max(1,y.width>>ee),Y=Math.max(1,y.height>>ee);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,ee,xe,Ee,Y,y.depth,0,ve,me,null):t.texImage2D(Z,ee,xe,Ee,Y,0,ve,me,null)}t.bindFramebuffer(i.FRAMEBUFFER,M),$(y)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Z,n.get(B).__webglTexture,0,ye(y)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,Z,n.get(B).__webglTexture,ee),t.bindFramebuffer(i.FRAMEBUFFER,null)}function H(M,y,B){if(i.bindRenderbuffer(i.RENDERBUFFER,M),y.depthBuffer&&!y.stencilBuffer){let K=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(B||$(y)){let Z=y.depthTexture;Z&&Z.isDepthTexture&&(Z.type===gn?K=i.DEPTH_COMPONENT32F:Z.type===Bn&&(K=i.DEPTH_COMPONENT24));let ee=ye(y);$(y)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee,K,y.width,y.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,ee,K,y.width,y.height)}else i.renderbufferStorage(i.RENDERBUFFER,K,y.width,y.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,M)}else if(y.depthBuffer&&y.stencilBuffer){let K=ye(y);B&&$(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,K,i.DEPTH24_STENCIL8,y.width,y.height):$(y)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,K,i.DEPTH24_STENCIL8,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,M)}else{let K=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let Z=0;Z<K.length;Z++){let ee=K[Z],ve=o.convert(ee.format,ee.colorSpace),me=o.convert(ee.type),xe=T(ee.internalFormat,ve,me,ee.colorSpace),Me=ye(y);B&&$(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Me,xe,y.width,y.height):$(y)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Me,xe,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,xe,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Q(M,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,M),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),X(y.depthTexture,0);let K=n.get(y.depthTexture).__webglTexture,Z=ye(y);if(y.depthTexture.format===ai)$(y)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(y.depthTexture.format===wi)$(y)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function le(M){let y=n.get(M),B=M.isWebGLCubeRenderTarget===!0;if(M.depthTexture&&!y.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Q(y.__webglFramebuffer,M)}else if(B){y.__webglDepthbuffer=[];for(let K=0;K<6;K++)t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[K]),y.__webglDepthbuffer[K]=i.createRenderbuffer(),H(y.__webglDepthbuffer[K],M,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=i.createRenderbuffer(),H(y.__webglDepthbuffer,M,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function W(M,y,B){let K=n.get(M);y!==void 0&&ie(K.__webglFramebuffer,M,M.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&le(M)}function R(M){let y=M.texture,B=n.get(M),K=n.get(y);M.addEventListener("dispose",P),M.isWebGLMultipleRenderTargets!==!0&&(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=y.version,s.memory.textures++);let Z=M.isWebGLCubeRenderTarget===!0,ee=M.isWebGLMultipleRenderTargets===!0,ve=m(M)||a;if(Z){B.__webglFramebuffer=[];for(let me=0;me<6;me++)if(a&&y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer[me]=[];for(let xe=0;xe<y.mipmaps.length;xe++)B.__webglFramebuffer[me][xe]=i.createFramebuffer()}else B.__webglFramebuffer[me]=i.createFramebuffer()}else{if(a&&y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer=[];for(let me=0;me<y.mipmaps.length;me++)B.__webglFramebuffer[me]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(ee)if(r.drawBuffers){let me=M.texture;for(let xe=0,Me=me.length;xe<Me;xe++){let Ee=n.get(me[xe]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=i.createTexture(),s.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&M.samples>0&&$(M)===!1){let me=ee?y:[y];B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let xe=0;xe<me.length;xe++){let Me=me[xe];B.__webglColorRenderbuffer[xe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[xe]);let Ee=o.convert(Me.format,Me.colorSpace),Y=o.convert(Me.type),Le=T(Me.internalFormat,Ee,Y,Me.colorSpace,M.isXRRenderTarget===!0),Ce=ye(M);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ce,Le,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xe,i.RENDERBUFFER,B.__webglColorRenderbuffer[xe])}i.bindRenderbuffer(i.RENDERBUFFER,null),M.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),H(B.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),N(i.TEXTURE_CUBE_MAP,y,ve);for(let me=0;me<6;me++)if(a&&y.mipmaps&&y.mipmaps.length>0)for(let xe=0;xe<y.mipmaps.length;xe++)ie(B.__webglFramebuffer[me][xe],M,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+me,xe);else ie(B.__webglFramebuffer[me],M,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);v(y,ve)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){let me=M.texture;for(let xe=0,Me=me.length;xe<Me;xe++){let Ee=me[xe],Y=n.get(Ee);t.bindTexture(i.TEXTURE_2D,Y.__webglTexture),N(i.TEXTURE_2D,Ee,ve),ie(B.__webglFramebuffer,M,Ee,i.COLOR_ATTACHMENT0+xe,i.TEXTURE_2D,0),v(Ee,ve)&&_(i.TEXTURE_2D)}t.unbindTexture()}else{let me=i.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(a?me=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(me,K.__webglTexture),N(me,y,ve),a&&y.mipmaps&&y.mipmaps.length>0)for(let xe=0;xe<y.mipmaps.length;xe++)ie(B.__webglFramebuffer[xe],M,y,i.COLOR_ATTACHMENT0,me,xe);else ie(B.__webglFramebuffer,M,y,i.COLOR_ATTACHMENT0,me,0);v(y,ve)&&_(me),t.unbindTexture()}M.depthBuffer&&le(M)}function he(M){let y=m(M)||a,B=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let K=0,Z=B.length;K<Z;K++){let ee=B[K];if(v(ee,y)){let ve=M.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,me=n.get(ee).__webglTexture;t.bindTexture(ve,me),_(ve),t.unbindTexture()}}}function pe(M){if(a&&M.samples>0&&$(M)===!1){let y=M.isWebGLMultipleRenderTargets?M.texture:[M.texture],B=M.width,K=M.height,Z=i.COLOR_BUFFER_BIT,ee=[],ve=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=n.get(M),xe=M.isWebGLMultipleRenderTargets===!0;if(xe)for(let Me=0;Me<y.length;Me++)t.bindFramebuffer(i.FRAMEBUFFER,me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,me.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglFramebuffer);for(let Me=0;Me<y.length;Me++){ee.push(i.COLOR_ATTACHMENT0+Me),M.depthBuffer&&ee.push(ve);let Ee=me.__ignoreDepthValues!==void 0?me.__ignoreDepthValues:!1;if(Ee===!1&&(M.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),M.stencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),xe&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,me.__webglColorRenderbuffer[Me]),Ee===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[ve]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[ve])),xe){let Y=n.get(y[Me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Y,0)}i.blitFramebuffer(0,0,B,K,0,0,B,K,Z,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ee)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),xe)for(let Me=0;Me<y.length;Me++){t.bindFramebuffer(i.FRAMEBUFFER,me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,me.__webglColorRenderbuffer[Me]);let Ee=n.get(y[Me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,Ee,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglMultisampledFramebuffer)}}function ye(M){return Math.min(r.maxSamples,M.samples)}function $(M){let y=n.get(M);return a&&M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function ue(M){let y=s.render.frame;u.get(M)!==y&&(u.set(M,y),M.update())}function U(M,y){let B=M.colorSpace,K=M.format,Z=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||M.format===Xs||B!==pt&&B!==Jt&&(Ke.getTransfer(B)===ct?a===!1?e.has("EXT_sRGB")===!0&&K===Ht?(M.format=Xs,M.minFilter=Bt,M.generateMipmaps=!1):y=Uo.sRGBToLinear(y):(K!==Ht||Z!==Nn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),y}this.allocateTextureUnit=D,this.resetTextureUnits=te,this.setTexture2D=X,this.setTexture2DArray=z,this.setTexture3D=V,this.setTextureCube=j,this.rebindTextures=W,this.setupRenderTarget=R,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=pe,this.setupDepthRenderbuffer=le,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=$}function Kx(i,e,t){let n=t.isWebGL2;function r(o,s=Jt){let a,c=Ke.getTransfer(s);if(o===Nn)return i.UNSIGNED_BYTE;if(o===Ya)return i.UNSIGNED_SHORT_4_4_4_4;if(o===ja)return i.UNSIGNED_SHORT_5_5_5_1;if(o===Dp)return i.BYTE;if(o===Up)return i.SHORT;if(o===So)return i.UNSIGNED_SHORT;if(o===qa)return i.INT;if(o===Bn)return i.UNSIGNED_INT;if(o===gn)return i.FLOAT;if(o===Gi)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(o===Np)return i.ALPHA;if(o===Ht)return i.RGBA;if(o===Bp)return i.LUMINANCE;if(o===Fp)return i.LUMINANCE_ALPHA;if(o===ai)return i.DEPTH_COMPONENT;if(o===wi)return i.DEPTH_STENCIL;if(o===Xs)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(o===Op)return i.RED;if(o===$a)return i.RED_INTEGER;if(o===Hp)return i.RG;if(o===Ka)return i.RG_INTEGER;if(o===Za)return i.RGBA_INTEGER;if(o===Ja||o===Qa||o===ec||o===tc)if(c===ct)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(o===Ja)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(o===Qa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(o===ec)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(o===tc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(o===Ja)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(o===Qa)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(o===ec)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(o===tc)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(o===Au||o===Ru||o===Cu||o===Lu)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(o===Au)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(o===Ru)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(o===Cu)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(o===Lu)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(o===nc)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(o===Pu||o===Iu)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(o===Pu)return c===ct?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(o===Iu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(o===Du||o===Uu||o===Nu||o===Bu||o===Fu||o===Ou||o===Hu||o===ku||o===zu||o===Gu||o===Vu||o===Wu||o===Xu||o===qu)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(o===Du)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(o===Uu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(o===Nu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(o===Bu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(o===Fu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(o===Ou)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(o===Hu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(o===ku)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(o===zu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(o===Gu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(o===Vu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(o===Wu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(o===Xu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(o===qu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(o===ic||o===Yu||o===ju)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(o===ic)return c===ct?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(o===Yu)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(o===ju)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(o===kp||o===$u||o===Ku||o===Zu)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(o===ic)return a.COMPRESSED_RED_RGTC1_EXT;if(o===$u)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(o===Ku)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(o===Zu)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return o===Yn?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[o]!==void 0?i[o]:null}return{convert:r}}var Wc=class extends ft{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}};var St=class extends Xe{constructor(){super(),this.isGroup=!0,this.type="Group"}};var VM={type:"move"},os=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new St,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new St,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new St,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,o=null,s=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),f=this._getHandJoint(l,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&h>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&o!==null&&(r=o),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(VM)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new St;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Xc=class extends Tn{constructor(e,t){super();let n=this,r=null,o=1,s=null,a="local-floor",c=1,l=null,u=null,d=null,h=null,p=null,g=null,x=t.getContextAttributes(),m=null,f=null,v=[],_=[],T=new De,A=null,b=new ft;b.layers.enable(1),b.viewport=new rt;let S=new ft;S.layers.enable(2),S.viewport=new rt;let P=[b,S],E=new Wc;E.layers.enable(1),E.layers.enable(2);let w=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let q=v[N];return q===void 0&&(q=new os,v[N]=q),q.getTargetRaySpace()},this.getControllerGrip=function(N){let q=v[N];return q===void 0&&(q=new os,v[N]=q),q.getGripSpace()},this.getHand=function(N){let q=v[N];return q===void 0&&(q=new os,v[N]=q),q.getHandSpace()};function O(N){let q=_.indexOf(N.inputSource);if(q===-1)return;let de=v[q];de!==void 0&&(de.update(N.inputSource,N.frame,l||s),de.dispatchEvent({type:N.type,data:N.inputSource}))}function te(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",te),r.removeEventListener("inputsourceschange",D);for(let N=0;N<v.length;N++){let q=_[N];q!==null&&(_[N]=null,v[N].disconnect(q))}w=null,I=null,e.setRenderTarget(m),p=null,h=null,d=null,r=null,f=null,F.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){o=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){a=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(N){l=N},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(N){if(r=N,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",te),r.addEventListener("inputsourceschange",D),x.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(T),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let q={antialias:r.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:o};p=new XRWebGLLayer(r,t,q),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new Sn(p.framebufferWidth,p.framebufferHeight,{format:Ht,type:Nn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let q=null,de=null,_e=null;x.depth&&(_e=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,q=x.stencil?wi:ai,de=x.stencil?Yn:Bn);let ie={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:o};d=new XRWebGLBinding(r,t),h=d.createProjectionLayer(ie),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),f=new Sn(h.textureWidth,h.textureHeight,{format:Ht,type:Nn,depthTexture:new ns(h.textureWidth,h.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,q),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});let H=e.properties.get(f);H.__ignoreDepthValues=h.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(c),l=null,s=await r.requestReferenceSpace(a),F.setContext(r),F.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function D(N){for(let q=0;q<N.removed.length;q++){let de=N.removed[q],_e=_.indexOf(de);_e>=0&&(_[_e]=null,v[_e].disconnect(de))}for(let q=0;q<N.added.length;q++){let de=N.added[q],_e=_.indexOf(de);if(_e===-1){for(let H=0;H<v.length;H++)if(H>=_.length){_.push(de),_e=H;break}else if(_[H]===null){_[H]=de,_e=H;break}if(_e===-1)break}let ie=v[_e];ie&&ie.connect(de)}}let G=new L,X=new L;function z(N,q,de){G.setFromMatrixPosition(q.matrixWorld),X.setFromMatrixPosition(de.matrixWorld);let _e=G.distanceTo(X),ie=q.projectionMatrix.elements,H=de.projectionMatrix.elements,Q=ie[14]/(ie[10]-1),le=ie[14]/(ie[10]+1),W=(ie[9]+1)/ie[5],R=(ie[9]-1)/ie[5],he=(ie[8]-1)/ie[0],pe=(H[8]+1)/H[0],ye=Q*he,$=Q*pe,ue=_e/(-he+pe),U=ue*-he;q.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(U),N.translateZ(ue),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert();let M=Q+ue,y=le+ue,B=ye-U,K=$+(_e-U),Z=W*le/y*M,ee=R*le/y*M;N.projectionMatrix.makePerspective(B,K,Z,ee,M,y),N.projectionMatrixInverse.copy(N.projectionMatrix).invert()}function V(N,q){q===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(q.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(r===null)return;E.near=S.near=b.near=N.near,E.far=S.far=b.far=N.far,(w!==E.near||I!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),w=E.near,I=E.far);let q=N.parent,de=E.cameras;V(E,q);for(let _e=0;_e<de.length;_e++)V(de[_e],q);de.length===2?z(E,b,S):E.projectionMatrix.copy(b.projectionMatrix),j(N,E,q)};function j(N,q,de){de===null?N.matrix.copy(q.matrixWorld):(N.matrix.copy(de.matrixWorld),N.matrix.invert(),N.matrix.multiply(q.matrixWorld)),N.matrix.decompose(N.position,N.quaternion,N.scale),N.updateMatrixWorld(!0),N.projectionMatrix.copy(q.projectionMatrix),N.projectionMatrixInverse.copy(q.projectionMatrixInverse),N.isPerspectiveCamera&&(N.fov=Xi*2*Math.atan(1/N.projectionMatrix.elements[5]),N.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(N){c=N,h!==null&&(h.fixedFoveation=N),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=N)};let ce=null;function se(N,q){if(u=q.getViewerPose(l||s),g=q,u!==null){let de=u.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let _e=!1;de.length!==E.cameras.length&&(E.cameras.length=0,_e=!0);for(let ie=0;ie<de.length;ie++){let H=de[ie],Q=null;if(p!==null)Q=p.getViewport(H);else{let W=d.getViewSubImage(h,H);Q=W.viewport,ie===0&&(e.setRenderTargetTextures(f,W.colorTexture,h.ignoreDepthValues?void 0:W.depthStencilTexture),e.setRenderTarget(f))}let le=P[ie];le===void 0&&(le=new ft,le.layers.enable(ie),le.viewport=new rt,P[ie]=le),le.matrix.fromArray(H.transform.matrix),le.matrix.decompose(le.position,le.quaternion,le.scale),le.projectionMatrix.fromArray(H.projectionMatrix),le.projectionMatrixInverse.copy(le.projectionMatrix).invert(),le.viewport.set(Q.x,Q.y,Q.width,Q.height),ie===0&&(E.matrix.copy(le.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),_e===!0&&E.cameras.push(le)}}for(let de=0;de<v.length;de++){let _e=_[de],ie=v[de];_e!==null&&ie!==void 0&&ie.update(_e,q,l||s)}ce&&ce(N,q),q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:q}),g=null}let F=new Fc;F.setAnimationLoop(se),this.setAnimationLoop=function(N){ce=N},this.dispose=function(){}}};function Zx(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Dc(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,v,_,T){f.isMeshBasicMaterial||f.isMeshLambertMaterial?o(m,f):f.isMeshToonMaterial?(o(m,f),d(m,f)):f.isMeshPhongMaterial?(o(m,f),u(m,f)):f.isMeshStandardMaterial?(o(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,T)):f.isMeshMatcapMaterial?(o(m,f),g(m,f)):f.isMeshDepthMaterial?o(m,f):f.isMeshDistanceMaterial?(o(m,f),x(m,f)):f.isMeshNormalMaterial?o(m,f):f.isLineBasicMaterial?(s(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,v,_):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function o(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===bt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===bt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let v=e.get(f).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;let _=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*_,t(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function s(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,v,_){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*v,m.scale.value=_*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,v){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===bt&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){let v=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Jx(i,e,t,n){let r={},o={},s=[],a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(v,_){let T=_.program;n.uniformBlockBinding(v,T)}function l(v,_){let T=r[v.id];T===void 0&&(g(v),T=u(v),r[v.id]=T,v.addEventListener("dispose",m));let A=_.program;n.updateUBOMapping(v,A);let b=e.render.frame;o[v.id]!==b&&(h(v),o[v.id]=b)}function u(v){let _=d();v.__bindingPointIndex=_;let T=i.createBuffer(),A=v.__size,b=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,A,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,T),T}function d(){for(let v=0;v<a;v++)if(s.indexOf(v)===-1)return s.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){let _=r[v.id],T=v.uniforms,A=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let b=0,S=T.length;b<S;b++){let P=Array.isArray(T[b])?T[b]:[T[b]];for(let E=0,w=P.length;E<w;E++){let I=P[E];if(p(I,b,E,A)===!0){let O=I.__offset,te=Array.isArray(I.value)?I.value:[I.value],D=0;for(let G=0;G<te.length;G++){let X=te[G],z=x(X);typeof X=="number"||typeof X=="boolean"?(I.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,O+D,I.__data)):X.isMatrix3?(I.__data[0]=X.elements[0],I.__data[1]=X.elements[1],I.__data[2]=X.elements[2],I.__data[3]=0,I.__data[4]=X.elements[3],I.__data[5]=X.elements[4],I.__data[6]=X.elements[5],I.__data[7]=0,I.__data[8]=X.elements[6],I.__data[9]=X.elements[7],I.__data[10]=X.elements[8],I.__data[11]=0):(X.toArray(I.__data,D),D+=z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(v,_,T,A){let b=v.value,S=_+"_"+T;if(A[S]===void 0)return typeof b=="number"||typeof b=="boolean"?A[S]=b:A[S]=b.clone(),!0;{let P=A[S];if(typeof b=="number"||typeof b=="boolean"){if(P!==b)return A[S]=b,!0}else if(P.equals(b)===!1)return P.copy(b),!0}return!1}function g(v){let _=v.uniforms,T=0,A=16;for(let S=0,P=_.length;S<P;S++){let E=Array.isArray(_[S])?_[S]:[_[S]];for(let w=0,I=E.length;w<I;w++){let O=E[w],te=Array.isArray(O.value)?O.value:[O.value];for(let D=0,G=te.length;D<G;D++){let X=te[D],z=x(X),V=T%A;V!==0&&A-V<z.boundary&&(T+=A-V),O.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=T,T+=z.storage}}}let b=T%A;return b>0&&(T+=A-b),v.__size=T,v.__cache={},this}function x(v){let _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=48,_.storage=48):v.isMatrix4?(_.boundary=64,_.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),_}function m(v){let _=v.target;_.removeEventListener("dispose",m);let T=s.indexOf(_.__bindingPointIndex);s.splice(T,1),i.deleteBuffer(r[_.id]),delete r[_.id],delete o[_.id]}function f(){for(let v in r)i.deleteBuffer(r[v]);s=[],r={},o={}}return{bind:c,update:l,dispose:f}}var Ks=class{constructor(e={}){let{canvas:t=em(),context:n=null,depth:r=!0,stencil:o=!0,alpha:s=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let h;n!==null?h=n.getContextAttributes().alpha:h=s;let p=new Uint32Array(4),g=new Int32Array(4),x=null,m=null,f=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=nt,this._useLegacyLights=!1,this.toneMapping=Xn,this.toneMappingExposure=1;let _=this,T=!1,A=0,b=0,S=null,P=-1,E=null,w=new rt,I=new rt,O=null,te=new ge(0),D=0,G=t.width,X=t.height,z=1,V=null,j=null,ce=new rt(0,0,G,X),se=new rt(0,0,G,X),F=!1,N=new wr,q=!1,de=!1,_e=null,ie=new Ue,H=new De,Q=new L,le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function W(){return S===null?z:1}let R=n;function he(C,J){for(let oe=0;oe<C.length;oe++){let ae=C[oe],re=t.getContext(ae,J);if(re!==null)return re}return null}try{let C={alpha:!0,depth:r,stencil:o,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"160"}`),t.addEventListener("webglcontextlost",be,!1),t.addEventListener("webglcontextrestored",k,!1),t.addEventListener("webglcontextcreationerror",Ae,!1),R===null){let J=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&J.shift(),R=he(J,C),R===null)throw he(J)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&R instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),R.getShaderPrecisionFormat===void 0&&(R.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let pe,ye,$,ue,U,M,y,B,K,Z,ee,ve,me,xe,Me,Ee,Y,Le,Ce,Ie,we,Se,Ne,Ye;function at(){pe=new px(R),ye=new rx(R,pe,e),pe.init(ye),Se=new Kx(R,pe,ye),$=new jx(R,pe,ye),ue=new xx(R),U=new Ox,M=new $x(R,pe,$,U,ye,Se,ue),y=new sx(_),B=new fx(_),K=new Em(R,ye),Ne=new nx(R,pe,K,ye),Z=new mx(R,K,ue,Ne),ee=new yx(R,Z,K,ue),Ce=new _x(R,ye,M),Ee=new ox(U),ve=new Fx(_,y,B,pe,ye,Ne,Ee),me=new Zx(_,U),xe=new zx,Me=new Wx(pe,ye),Le=new tx(_,y,B,$,ee,h,c),Y=new Yx(_,ee,ye),Ye=new Jx(R,ue,ye,$),Ie=new ix(R,pe,ue,ye),we=new gx(R,pe,ue,ye),ue.programs=ve.programs,_.capabilities=ye,_.extensions=pe,_.properties=U,_.renderLists=xe,_.shadowMap=Y,_.state=$,_.info=ue}at();let He=new Xc(_,R);this.xr=He,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let C=pe.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){let C=pe.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(C){C!==void 0&&(z=C,this.setSize(G,X,!1))},this.getSize=function(C){return C.set(G,X)},this.setSize=function(C,J,oe=!0){if(He.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=C,X=J,t.width=Math.floor(C*z),t.height=Math.floor(J*z),oe===!0&&(t.style.width=C+"px",t.style.height=J+"px"),this.setViewport(0,0,C,J)},this.getDrawingBufferSize=function(C){return C.set(G*z,X*z).floor()},this.setDrawingBufferSize=function(C,J,oe){G=C,X=J,z=oe,t.width=Math.floor(C*oe),t.height=Math.floor(J*oe),this.setViewport(0,0,C,J)},this.getCurrentViewport=function(C){return C.copy(w)},this.getViewport=function(C){return C.copy(ce)},this.setViewport=function(C,J,oe,ae){C.isVector4?ce.set(C.x,C.y,C.z,C.w):ce.set(C,J,oe,ae),$.viewport(w.copy(ce).multiplyScalar(z).floor())},this.getScissor=function(C){return C.copy(se)},this.setScissor=function(C,J,oe,ae){C.isVector4?se.set(C.x,C.y,C.z,C.w):se.set(C,J,oe,ae),$.scissor(I.copy(se).multiplyScalar(z).floor())},this.getScissorTest=function(){return F},this.setScissorTest=function(C){$.setScissorTest(F=C)},this.setOpaqueSort=function(C){V=C},this.setTransparentSort=function(C){j=C},this.getClearColor=function(C){return C.copy(Le.getClearColor())},this.setClearColor=function(){Le.setClearColor.apply(Le,arguments)},this.getClearAlpha=function(){return Le.getClearAlpha()},this.setClearAlpha=function(){Le.setClearAlpha.apply(Le,arguments)},this.clear=function(C=!0,J=!0,oe=!0){let ae=0;if(C){let re=!1;if(S!==null){let Pe=S.texture.format;re=Pe===Za||Pe===Ka||Pe===$a}if(re){let Pe=S.texture.type,Be=Pe===Nn||Pe===Bn||Pe===So||Pe===Yn||Pe===Ya||Pe===ja,ke=Le.getClearColor(),Ve=Le.getClearAlpha(),Qe=ke.r,We=ke.g,je=ke.b;Be?(p[0]=Qe,p[1]=We,p[2]=je,p[3]=Ve,R.clearBufferuiv(R.COLOR,0,p)):(g[0]=Qe,g[1]=We,g[2]=je,g[3]=Ve,R.clearBufferiv(R.COLOR,0,g))}else ae|=R.COLOR_BUFFER_BIT}J&&(ae|=R.DEPTH_BUFFER_BIT),oe&&(ae|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(ae)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",be,!1),t.removeEventListener("webglcontextrestored",k,!1),t.removeEventListener("webglcontextcreationerror",Ae,!1),xe.dispose(),Me.dispose(),U.dispose(),y.dispose(),B.dispose(),ee.dispose(),Ne.dispose(),Ye.dispose(),ve.dispose(),He.dispose(),He.removeEventListener("sessionstart",pn),He.removeEventListener("sessionend",vt),_e&&(_e.dispose(),_e=null),mn.stop()};function be(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function k(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let C=ue.autoReset,J=Y.enabled,oe=Y.autoUpdate,ae=Y.needsUpdate,re=Y.type;at(),ue.autoReset=C,Y.enabled=J,Y.autoUpdate=oe,Y.needsUpdate=ae,Y.type=re}function Ae(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Re(C){let J=C.target;J.removeEventListener("dispose",Re),ze(J)}function ze(C){Fe(C),U.remove(C)}function Fe(C){let J=U.get(C).programs;J!==void 0&&(J.forEach(function(oe){ve.releaseProgram(oe)}),C.isShaderMaterial&&ve.releaseShaderCache(C))}this.renderBufferDirect=function(C,J,oe,ae,re,Pe){J===null&&(J=le);let Be=re.isMesh&&re.matrixWorld.determinant()<0,ke=Av(C,J,oe,ae,re);$.setMaterial(ae,Be);let Ve=oe.index,Qe=1;if(ae.wireframe===!0){if(Ve=Z.getWireframeAttribute(oe),Ve===void 0)return;Qe=2}let We=oe.drawRange,je=oe.attributes.position,Pt=We.start*Qe,Un=(We.start+We.count)*Qe;Pe!==null&&(Pt=Math.max(Pt,Pe.start*Qe),Un=Math.min(Un,(Pe.start+Pe.count)*Qe)),Ve!==null?(Pt=Math.max(Pt,0),Un=Math.min(Un,Ve.count)):je!=null&&(Pt=Math.max(Pt,0),Un=Math.min(Un,je.count));let Kt=Un-Pt;if(Kt<0||Kt===1/0)return;Ne.setup(re,ae,ke,oe,Ve);let Hi,Rt=Ie;if(Ve!==null&&(Hi=K.get(Ve),Rt=we,Rt.setIndex(Hi)),re.isMesh)ae.wireframe===!0?($.setLineWidth(ae.wireframeLinewidth*W()),Rt.setMode(R.LINES)):Rt.setMode(R.TRIANGLES);else if(re.isLine){let et=ae.linewidth;et===void 0&&(et=1),$.setLineWidth(et*W()),re.isLineSegments?Rt.setMode(R.LINES):re.isLineLoop?Rt.setMode(R.LINE_LOOP):Rt.setMode(R.LINE_STRIP)}else re.isPoints?Rt.setMode(R.POINTS):re.isSprite&&Rt.setMode(R.TRIANGLES);if(re.isBatchedMesh)Rt.renderMultiDraw(re._multiDrawStarts,re._multiDrawCounts,re._multiDrawCount);else if(re.isInstancedMesh)Rt.renderInstances(Pt,Kt,re.count);else if(oe.isInstancedBufferGeometry){let et=oe._maxInstanceCount!==void 0?oe._maxInstanceCount:1/0,xu=Math.min(oe.instanceCount,et);Rt.renderInstances(Pt,Kt,xu)}else Rt.render(Pt,Kt)};function _t(C,J,oe){C.transparent===!0&&C.side===It&&C.forceSinglePass===!1?(C.side=bt,C.needsUpdate=!0,za(C,J,oe),C.side=Zt,C.needsUpdate=!0,za(C,J,oe),C.side=It):za(C,J,oe)}this.compile=function(C,J,oe=null){oe===null&&(oe=C),m=Me.get(oe),m.init(),v.push(m),oe.traverseVisible(function(re){re.isLight&&re.layers.test(J.layers)&&(m.pushLight(re),re.castShadow&&m.pushShadow(re))}),C!==oe&&C.traverseVisible(function(re){re.isLight&&re.layers.test(J.layers)&&(m.pushLight(re),re.castShadow&&m.pushShadow(re))}),m.setupLights(_._useLegacyLights);let ae=new Set;return C.traverse(function(re){let Pe=re.material;if(Pe)if(Array.isArray(Pe))for(let Be=0;Be<Pe.length;Be++){let ke=Pe[Be];_t(ke,oe,re),ae.add(ke)}else _t(Pe,oe,re),ae.add(Pe)}),v.pop(),m=null,ae},this.compileAsync=function(C,J,oe=null){let ae=this.compile(C,J,oe);return new Promise(re=>{function Pe(){if(ae.forEach(function(Be){U.get(Be).currentProgram.isReady()&&ae.delete(Be)}),ae.size===0){re(C);return}setTimeout(Pe,10)}pe.get("KHR_parallel_shader_compile")!==null?Pe():setTimeout(Pe,10)})};let yt=null;function $t(C){yt&&yt(C)}function pn(){mn.stop()}function vt(){mn.start()}let mn=new Fc;mn.setAnimationLoop($t),typeof self<"u"&&mn.setContext(self),this.setAnimationLoop=function(C){yt=C,He.setAnimationLoop(C),C===null?mn.stop():mn.start()},He.addEventListener("sessionstart",pn),He.addEventListener("sessionend",vt),this.render=function(C,J){if(J!==void 0&&J.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),J.parent===null&&J.matrixWorldAutoUpdate===!0&&J.updateMatrixWorld(),He.enabled===!0&&He.isPresenting===!0&&(He.cameraAutoUpdate===!0&&He.updateCamera(J),J=He.getCamera()),C.isScene===!0&&C.onBeforeRender(_,C,J,S),m=Me.get(C,v.length),m.init(),v.push(m),ie.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),N.setFromProjectionMatrix(ie),de=this.localClippingEnabled,q=Ee.init(this.clippingPlanes,de),x=xe.get(C,f.length),x.init(),f.push(x),bi(C,J,0,_.sortObjects),x.finish(),_.sortObjects===!0&&x.sort(V,j),this.info.render.frame++,q===!0&&Ee.beginShadows();let oe=m.state.shadowsArray;if(Y.render(oe,C,J),q===!0&&Ee.endShadows(),this.info.autoReset===!0&&this.info.reset(),Le.render(x,C),m.setupLights(_._useLegacyLights),J.isArrayCamera){let ae=J.cameras;for(let re=0,Pe=ae.length;re<Pe;re++){let Be=ae[re];Yf(x,C,Be,Be.viewport)}}else Yf(x,C,J);S!==null&&(M.updateMultisampleRenderTarget(S),M.updateRenderTargetMipmap(S)),C.isScene===!0&&C.onAfterRender(_,C,J),Ne.resetDefaultState(),P=-1,E=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,f.pop(),f.length>0?x=f[f.length-1]:x=null};function bi(C,J,oe,ae){if(C.visible===!1)return;if(C.layers.test(J.layers)){if(C.isGroup)oe=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(J);else if(C.isLight)m.pushLight(C),C.castShadow&&m.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||N.intersectsSprite(C)){ae&&Q.setFromMatrixPosition(C.matrixWorld).applyMatrix4(ie);let Be=ee.update(C),ke=C.material;ke.visible&&x.push(C,Be,ke,oe,Q.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||N.intersectsObject(C))){let Be=ee.update(C),ke=C.material;if(ae&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Q.copy(C.boundingSphere.center)):(Be.boundingSphere===null&&Be.computeBoundingSphere(),Q.copy(Be.boundingSphere.center)),Q.applyMatrix4(C.matrixWorld).applyMatrix4(ie)),Array.isArray(ke)){let Ve=Be.groups;for(let Qe=0,We=Ve.length;Qe<We;Qe++){let je=Ve[Qe],Pt=ke[je.materialIndex];Pt&&Pt.visible&&x.push(C,Be,Pt,oe,Q.z,je)}}else ke.visible&&x.push(C,Be,ke,oe,Q.z,null)}}let Pe=C.children;for(let Be=0,ke=Pe.length;Be<ke;Be++)bi(Pe[Be],J,oe,ae)}function Yf(C,J,oe,ae){let re=C.opaque,Pe=C.transmissive,Be=C.transparent;m.setupLightsView(oe),q===!0&&Ee.setGlobalState(_.clippingPlanes,oe),Pe.length>0&&wv(re,Pe,J,oe),ae&&$.viewport(w.copy(ae)),re.length>0&&ka(re,J,oe),Pe.length>0&&ka(Pe,J,oe),Be.length>0&&ka(Be,J,oe),$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),$.setPolygonOffset(!1)}function wv(C,J,oe,ae){if((oe.isScene===!0?oe.overrideMaterial:null)!==null)return;let Pe=ye.isWebGL2;_e===null&&(_e=new Sn(1,1,{generateMipmaps:!0,type:pe.has("EXT_color_buffer_half_float")?Gi:Nn,minFilter:qn,samples:Pe?4:0})),_.getDrawingBufferSize(H),Pe?_e.setSize(H.x,H.y):_e.setSize(Io(H.x),Io(H.y));let Be=_.getRenderTarget();_.setRenderTarget(_e),_.getClearColor(te),D=_.getClearAlpha(),D<1&&_.setClearColor(16777215,.5),_.clear();let ke=_.toneMapping;_.toneMapping=Xn,ka(C,oe,ae),M.updateMultisampleRenderTarget(_e),M.updateRenderTargetMipmap(_e);let Ve=!1;for(let Qe=0,We=J.length;Qe<We;Qe++){let je=J[Qe],Pt=je.object,Un=je.geometry,Kt=je.material,Hi=je.group;if(Kt.side===It&&Pt.layers.test(ae.layers)){let Rt=Kt.side;Kt.side=bt,Kt.needsUpdate=!0,jf(Pt,oe,ae,Un,Kt,Hi),Kt.side=Rt,Kt.needsUpdate=!0,Ve=!0}}Ve===!0&&(M.updateMultisampleRenderTarget(_e),M.updateRenderTargetMipmap(_e)),_.setRenderTarget(Be),_.setClearColor(te,D),_.toneMapping=ke}function ka(C,J,oe){let ae=J.isScene===!0?J.overrideMaterial:null;for(let re=0,Pe=C.length;re<Pe;re++){let Be=C[re],ke=Be.object,Ve=Be.geometry,Qe=ae===null?Be.material:ae,We=Be.group;ke.layers.test(oe.layers)&&jf(ke,J,oe,Ve,Qe,We)}}function jf(C,J,oe,ae,re,Pe){C.onBeforeRender(_,J,oe,ae,re,Pe),C.modelViewMatrix.multiplyMatrices(oe.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),re.onBeforeRender(_,J,oe,ae,C,Pe),re.transparent===!0&&re.side===It&&re.forceSinglePass===!1?(re.side=bt,re.needsUpdate=!0,_.renderBufferDirect(oe,J,ae,re,C,Pe),re.side=Zt,re.needsUpdate=!0,_.renderBufferDirect(oe,J,ae,re,C,Pe),re.side=It):_.renderBufferDirect(oe,J,ae,re,C,Pe),C.onAfterRender(_,J,oe,ae,re,Pe)}function za(C,J,oe){J.isScene!==!0&&(J=le);let ae=U.get(C),re=m.state.lights,Pe=m.state.shadowsArray,Be=re.state.version,ke=ve.getParameters(C,re.state,Pe,J,oe),Ve=ve.getProgramCacheKey(ke),Qe=ae.programs;ae.environment=C.isMeshStandardMaterial?J.environment:null,ae.fog=J.fog,ae.envMap=(C.isMeshStandardMaterial?B:y).get(C.envMap||ae.environment),Qe===void 0&&(C.addEventListener("dispose",Re),Qe=new Map,ae.programs=Qe);let We=Qe.get(Ve);if(We!==void 0){if(ae.currentProgram===We&&ae.lightsStateVersion===Be)return Kf(C,ke),We}else ke.uniforms=ve.getUniforms(C),C.onBuild(oe,ke,_),C.onBeforeCompile(ke,_),We=ve.acquireProgram(ke,Ve),Qe.set(Ve,We),ae.uniforms=ke.uniforms;let je=ae.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(je.clippingPlanes=Ee.uniform),Kf(C,ke),ae.needsLights=Cv(C),ae.lightsStateVersion=Be,ae.needsLights&&(je.ambientLightColor.value=re.state.ambient,je.lightProbe.value=re.state.probe,je.directionalLights.value=re.state.directional,je.directionalLightShadows.value=re.state.directionalShadow,je.spotLights.value=re.state.spot,je.spotLightShadows.value=re.state.spotShadow,je.rectAreaLights.value=re.state.rectArea,je.ltc_1.value=re.state.rectAreaLTC1,je.ltc_2.value=re.state.rectAreaLTC2,je.pointLights.value=re.state.point,je.pointLightShadows.value=re.state.pointShadow,je.hemisphereLights.value=re.state.hemi,je.directionalShadowMap.value=re.state.directionalShadowMap,je.directionalShadowMatrix.value=re.state.directionalShadowMatrix,je.spotShadowMap.value=re.state.spotShadowMap,je.spotLightMatrix.value=re.state.spotLightMatrix,je.spotLightMap.value=re.state.spotLightMap,je.pointShadowMap.value=re.state.pointShadowMap,je.pointShadowMatrix.value=re.state.pointShadowMatrix),ae.currentProgram=We,ae.uniformsList=null,We}function $f(C){if(C.uniformsList===null){let J=C.currentProgram.getUniforms();C.uniformsList=Rr.seqWithValue(J.seq,C.uniforms)}return C.uniformsList}function Kf(C,J){let oe=U.get(C);oe.outputColorSpace=J.outputColorSpace,oe.batching=J.batching,oe.instancing=J.instancing,oe.instancingColor=J.instancingColor,oe.skinning=J.skinning,oe.morphTargets=J.morphTargets,oe.morphNormals=J.morphNormals,oe.morphColors=J.morphColors,oe.morphTargetsCount=J.morphTargetsCount,oe.numClippingPlanes=J.numClippingPlanes,oe.numIntersection=J.numClipIntersection,oe.vertexAlphas=J.vertexAlphas,oe.vertexTangents=J.vertexTangents,oe.toneMapping=J.toneMapping}function Av(C,J,oe,ae,re){J.isScene!==!0&&(J=le),M.resetTextureUnits();let Pe=J.fog,Be=ae.isMeshStandardMaterial?J.environment:null,ke=S===null?_.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:pt,Ve=(ae.isMeshStandardMaterial?B:y).get(ae.envMap||Be),Qe=ae.vertexColors===!0&&!!oe.attributes.color&&oe.attributes.color.itemSize===4,We=!!oe.attributes.tangent&&(!!ae.normalMap||ae.anisotropy>0),je=!!oe.morphAttributes.position,Pt=!!oe.morphAttributes.normal,Un=!!oe.morphAttributes.color,Kt=Xn;ae.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(Kt=_.toneMapping);let Hi=oe.morphAttributes.position||oe.morphAttributes.normal||oe.morphAttributes.color,Rt=Hi!==void 0?Hi.length:0,et=U.get(ae),xu=m.state.lights;if(q===!0&&(de===!0||C!==E)){let Vn=C===E&&ae.id===P;Ee.setState(ae,C,Vn)}let Ct=!1;ae.version===et.__version?(et.needsLights&&et.lightsStateVersion!==xu.state.version||et.outputColorSpace!==ke||re.isBatchedMesh&&et.batching===!1||!re.isBatchedMesh&&et.batching===!0||re.isInstancedMesh&&et.instancing===!1||!re.isInstancedMesh&&et.instancing===!0||re.isSkinnedMesh&&et.skinning===!1||!re.isSkinnedMesh&&et.skinning===!0||re.isInstancedMesh&&et.instancingColor===!0&&re.instanceColor===null||re.isInstancedMesh&&et.instancingColor===!1&&re.instanceColor!==null||et.envMap!==Ve||ae.fog===!0&&et.fog!==Pe||et.numClippingPlanes!==void 0&&(et.numClippingPlanes!==Ee.numPlanes||et.numIntersection!==Ee.numIntersection)||et.vertexAlphas!==Qe||et.vertexTangents!==We||et.morphTargets!==je||et.morphNormals!==Pt||et.morphColors!==Un||et.toneMapping!==Kt||ye.isWebGL2===!0&&et.morphTargetsCount!==Rt)&&(Ct=!0):(Ct=!0,et.__version=ae.version);let Gr=et.currentProgram;Ct===!0&&(Gr=za(ae,J,re));let Zf=!1,Bs=!1,_u=!1,sn=Gr.getUniforms(),Vr=et.uniforms;if($.useProgram(Gr.program)&&(Zf=!0,Bs=!0,_u=!0),ae.id!==P&&(P=ae.id,Bs=!0),Zf||E!==C){sn.setValue(R,"projectionMatrix",C.projectionMatrix),sn.setValue(R,"viewMatrix",C.matrixWorldInverse);let Vn=sn.map.cameraPosition;Vn!==void 0&&Vn.setValue(R,Q.setFromMatrixPosition(C.matrixWorld)),ye.logarithmicDepthBuffer&&sn.setValue(R,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(ae.isMeshPhongMaterial||ae.isMeshToonMaterial||ae.isMeshLambertMaterial||ae.isMeshBasicMaterial||ae.isMeshStandardMaterial||ae.isShaderMaterial)&&sn.setValue(R,"isOrthographic",C.isOrthographicCamera===!0),E!==C&&(E=C,Bs=!0,_u=!0)}if(re.isSkinnedMesh){sn.setOptional(R,re,"bindMatrix"),sn.setOptional(R,re,"bindMatrixInverse");let Vn=re.skeleton;Vn&&(ye.floatVertexTextures?(Vn.boneTexture===null&&Vn.computeBoneTexture(),sn.setValue(R,"boneTexture",Vn.boneTexture,M)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}re.isBatchedMesh&&(sn.setOptional(R,re,"batchingTexture"),sn.setValue(R,"batchingTexture",re._matricesTexture,M));let yu=oe.morphAttributes;if((yu.position!==void 0||yu.normal!==void 0||yu.color!==void 0&&ye.isWebGL2===!0)&&Ce.update(re,oe,Gr),(Bs||et.receiveShadow!==re.receiveShadow)&&(et.receiveShadow=re.receiveShadow,sn.setValue(R,"receiveShadow",re.receiveShadow)),ae.isMeshGouraudMaterial&&ae.envMap!==null&&(Vr.envMap.value=Ve,Vr.flipEnvMap.value=Ve.isCubeTexture&&Ve.isRenderTargetTexture===!1?-1:1),Bs&&(sn.setValue(R,"toneMappingExposure",_.toneMappingExposure),et.needsLights&&Rv(Vr,_u),Pe&&ae.fog===!0&&me.refreshFogUniforms(Vr,Pe),me.refreshMaterialUniforms(Vr,ae,z,X,_e),Rr.upload(R,$f(et),Vr,M)),ae.isShaderMaterial&&ae.uniformsNeedUpdate===!0&&(Rr.upload(R,$f(et),Vr,M),ae.uniformsNeedUpdate=!1),ae.isSpriteMaterial&&sn.setValue(R,"center",re.center),sn.setValue(R,"modelViewMatrix",re.modelViewMatrix),sn.setValue(R,"normalMatrix",re.normalMatrix),sn.setValue(R,"modelMatrix",re.matrixWorld),ae.isShaderMaterial||ae.isRawShaderMaterial){let Vn=ae.uniformsGroups;for(let vu=0,Lv=Vn.length;vu<Lv;vu++)if(ye.isWebGL2){let Jf=Vn[vu];Ye.update(Jf,Gr),Ye.bind(Jf,Gr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Gr}function Rv(C,J){C.ambientLightColor.needsUpdate=J,C.lightProbe.needsUpdate=J,C.directionalLights.needsUpdate=J,C.directionalLightShadows.needsUpdate=J,C.pointLights.needsUpdate=J,C.pointLightShadows.needsUpdate=J,C.spotLights.needsUpdate=J,C.spotLightShadows.needsUpdate=J,C.rectAreaLights.needsUpdate=J,C.hemisphereLights.needsUpdate=J}function Cv(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(C,J,oe){U.get(C.texture).__webglTexture=J,U.get(C.depthTexture).__webglTexture=oe;let ae=U.get(C);ae.__hasExternalTextures=!0,ae.__hasExternalTextures&&(ae.__autoAllocateDepthBuffer=oe===void 0,ae.__autoAllocateDepthBuffer||pe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ae.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(C,J){let oe=U.get(C);oe.__webglFramebuffer=J,oe.__useDefaultFramebuffer=J===void 0},this.setRenderTarget=function(C,J=0,oe=0){S=C,A=J,b=oe;let ae=!0,re=null,Pe=!1,Be=!1;if(C){let Ve=U.get(C);Ve.__useDefaultFramebuffer!==void 0?($.bindFramebuffer(R.FRAMEBUFFER,null),ae=!1):Ve.__webglFramebuffer===void 0?M.setupRenderTarget(C):Ve.__hasExternalTextures&&M.rebindTextures(C,U.get(C.texture).__webglTexture,U.get(C.depthTexture).__webglTexture);let Qe=C.texture;(Qe.isData3DTexture||Qe.isDataArrayTexture||Qe.isCompressedArrayTexture)&&(Be=!0);let We=U.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(We[J])?re=We[J][oe]:re=We[J],Pe=!0):ye.isWebGL2&&C.samples>0&&M.useMultisampledRTT(C)===!1?re=U.get(C).__webglMultisampledFramebuffer:Array.isArray(We)?re=We[oe]:re=We,w.copy(C.viewport),I.copy(C.scissor),O=C.scissorTest}else w.copy(ce).multiplyScalar(z).floor(),I.copy(se).multiplyScalar(z).floor(),O=F;if($.bindFramebuffer(R.FRAMEBUFFER,re)&&ye.drawBuffers&&ae&&$.drawBuffers(C,re),$.viewport(w),$.scissor(I),$.setScissorTest(O),Pe){let Ve=U.get(C.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+J,Ve.__webglTexture,oe)}else if(Be){let Ve=U.get(C.texture),Qe=J||0;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,Ve.__webglTexture,oe||0,Qe)}P=-1},this.readRenderTargetPixels=function(C,J,oe,ae,re,Pe,Be){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=U.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Be!==void 0&&(ke=ke[Be]),ke){$.bindFramebuffer(R.FRAMEBUFFER,ke);try{let Ve=C.texture,Qe=Ve.format,We=Ve.type;if(Qe!==Ht&&Se.convert(Qe)!==R.getParameter(R.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let je=We===Gi&&(pe.has("EXT_color_buffer_half_float")||ye.isWebGL2&&pe.has("EXT_color_buffer_float"));if(We!==Nn&&Se.convert(We)!==R.getParameter(R.IMPLEMENTATION_COLOR_READ_TYPE)&&!(We===gn&&(ye.isWebGL2||pe.has("OES_texture_float")||pe.has("WEBGL_color_buffer_float")))&&!je){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}J>=0&&J<=C.width-ae&&oe>=0&&oe<=C.height-re&&R.readPixels(J,oe,ae,re,Se.convert(Qe),Se.convert(We),Pe)}finally{let Ve=S!==null?U.get(S).__webglFramebuffer:null;$.bindFramebuffer(R.FRAMEBUFFER,Ve)}}},this.copyFramebufferToTexture=function(C,J,oe=0){let ae=Math.pow(2,-oe),re=Math.floor(J.image.width*ae),Pe=Math.floor(J.image.height*ae);M.setTexture2D(J,0),R.copyTexSubImage2D(R.TEXTURE_2D,oe,0,0,C.x,C.y,re,Pe),$.unbindTexture()},this.copyTextureToTexture=function(C,J,oe,ae=0){let re=J.image.width,Pe=J.image.height,Be=Se.convert(oe.format),ke=Se.convert(oe.type);M.setTexture2D(oe,0),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,oe.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,oe.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,oe.unpackAlignment),J.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,ae,C.x,C.y,re,Pe,Be,ke,J.image.data):J.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,ae,C.x,C.y,J.mipmaps[0].width,J.mipmaps[0].height,Be,J.mipmaps[0].data):R.texSubImage2D(R.TEXTURE_2D,ae,C.x,C.y,Be,ke,J.image),ae===0&&oe.generateMipmaps&&R.generateMipmap(R.TEXTURE_2D),$.unbindTexture()},this.copyTextureToTexture3D=function(C,J,oe,ae,re=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Pe=C.max.x-C.min.x+1,Be=C.max.y-C.min.y+1,ke=C.max.z-C.min.z+1,Ve=Se.convert(ae.format),Qe=Se.convert(ae.type),We;if(ae.isData3DTexture)M.setTexture3D(ae,0),We=R.TEXTURE_3D;else if(ae.isDataArrayTexture||ae.isCompressedArrayTexture)M.setTexture2DArray(ae,0),We=R.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,ae.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ae.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,ae.unpackAlignment);let je=R.getParameter(R.UNPACK_ROW_LENGTH),Pt=R.getParameter(R.UNPACK_IMAGE_HEIGHT),Un=R.getParameter(R.UNPACK_SKIP_PIXELS),Kt=R.getParameter(R.UNPACK_SKIP_ROWS),Hi=R.getParameter(R.UNPACK_SKIP_IMAGES),Rt=oe.isCompressedTexture?oe.mipmaps[re]:oe.image;R.pixelStorei(R.UNPACK_ROW_LENGTH,Rt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Rt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,C.min.x),R.pixelStorei(R.UNPACK_SKIP_ROWS,C.min.y),R.pixelStorei(R.UNPACK_SKIP_IMAGES,C.min.z),oe.isDataTexture||oe.isData3DTexture?R.texSubImage3D(We,re,J.x,J.y,J.z,Pe,Be,ke,Ve,Qe,Rt.data):oe.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),R.compressedTexSubImage3D(We,re,J.x,J.y,J.z,Pe,Be,ke,Ve,Rt.data)):R.texSubImage3D(We,re,J.x,J.y,J.z,Pe,Be,ke,Ve,Qe,Rt),R.pixelStorei(R.UNPACK_ROW_LENGTH,je),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Pt),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Un),R.pixelStorei(R.UNPACK_SKIP_ROWS,Kt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Hi),re===0&&ae.generateMipmaps&&R.generateMipmap(We),$.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?M.setTextureCube(C,0):C.isData3DTexture?M.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?M.setTexture2DArray(C,0):M.setTexture2D(C,0),$.unbindTexture()},this.resetState=function(){A=0,b=0,S=null,$.reset(),Ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===Ao?"display-p3":"srgb",t.unpackColorSpace=Ke.workingColorSpace===Xr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===nt?ci:oc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ci?nt:pt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}};var Zs=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ge(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var to=class extends Xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}};var no=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ws,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=kt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,o=this.stride;r<o;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}};var xn=new L,io=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyMatrix4(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.applyNormalMatrix(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xn.fromBufferAttribute(this,t),xn.transformDirection(e),this.setXYZ(t,xn.x,xn.y,xn.z);return this}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=jn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=jn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=jn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=jn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),r=lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,o){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),r=lt(r,this.array),o=lt(o,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=o,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return new $e(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Qx=new L,e_=new rt,t_=new rt,WM=new L,n_=new Ue,qc=new L,Dd=new At,i_=new Ue,Ud=new $n,Js=class extends Ge{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Su,this.bindMatrix=new Ue,this.bindMatrixInverse=new Ue,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ht),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,qc),this.boundingBox.expandByPoint(qc)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new At),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,qc),this.boundingSphere.expandByPoint(qc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Dd.copy(this.boundingSphere),Dd.applyMatrix4(r),e.ray.intersectsSphere(Dd)!==!1&&(i_.copy(r).invert(),Ud.copy(e.ray).applyMatrix4(i_),!(this.boundingBox!==null&&Ud.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ud)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new rt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let o=1/e.manhattanLength();o!==1/0?e.multiplyScalar(o):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Su?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Ip?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;e_.fromBufferAttribute(r.attributes.skinIndex,e),t_.fromBufferAttribute(r.attributes.skinWeight,e),Qx.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let o=0;o<4;o++){let s=t_.getComponent(o);if(s!==0){let a=e_.getComponent(o);n_.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(WM.copy(Qx).applyMatrix4(n_),s)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}};var ro=class extends Xe{constructor(){super(),this.isBone=!0,this.type="Bone"}};var Yc=class extends mt{constructor(e=null,t=1,n=1,r,o,s,a,c,l=Tt,u=Tt,d,h){super(null,s,a,c,l,u,r,o,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var r_=new Ue,XM=new Ue,Qs=class i{constructor(e=[],t=[]){this.uuid=kt(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new Ue)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ue;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let o=0,s=e.length;o<s;o++){let a=e[o]?e[o].matrixWorld:XM;r_.multiplyMatrices(a,t[o]),r_.toArray(n,o*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Yc(t,e,e,Ht,gn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let o=e.bones[n],s=t[o];s===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",o),s=new ro),this.bones.push(s),this.boneInverses.push(new Ue().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,o=t.length;r<o;r++){let s=t[r];e.bones.push(s.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}};var Ai=class extends $e{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}};var ss=new Ue,o_=new Ue,jc=[],s_=new ht,qM=new Ue,ea=new Ge,ta=new At,oo=class extends Ge{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ai(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,qM)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ht),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ss),s_.copy(e.boundingBox).applyMatrix4(ss),this.boundingBox.union(s_)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new At),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ss),ta.copy(e.boundingSphere).applyMatrix4(ss),this.boundingSphere.union(ta)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let n=this.matrixWorld,r=this.count;if(ea.geometry=this.geometry,ea.material=this.material,ea.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ta.copy(this.boundingSphere),ta.applyMatrix4(n),e.ray.intersectsSphere(ta)!==!1))for(let o=0;o<r;o++){this.getMatrixAt(o,ss),o_.multiplyMatrices(n,ss),ea.matrixWorld=o_,ea.raycast(e,jc);for(let s=0,a=jc.length;s<a;s++){let c=jc[s];c.instanceId=o,c.object=this,t.push(c)}jc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ai(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var fi=class extends Dt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}};var a_=new L,c_=new L,l_=new Ue,Nd=new $n,$c=new At,er=class extends Xe{constructor(e=new Je,t=new fi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,o=t.count;r<o;r++)a_.fromBufferAttribute(t,r-1),c_.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=a_.distanceTo(c_);e.setAttribute("lineDistance",new Ze(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,o=e.params.Line.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$c.copy(n.boundingSphere),$c.applyMatrix4(r),$c.radius+=o,e.ray.intersectsSphere($c)===!1)return;l_.copy(r).invert(),Nd.copy(e.ray).applyMatrix4(l_);let a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new L,u=new L,d=new L,h=new L,p=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){let f=Math.max(0,s.start),v=Math.min(g.count,s.start+s.count);for(let _=f,T=v-1;_<T;_+=p){let A=g.getX(_),b=g.getX(_+1);if(l.fromBufferAttribute(m,A),u.fromBufferAttribute(m,b),Nd.distanceSqToSegment(l,u,h,d)>c)continue;h.applyMatrix4(this.matrixWorld);let P=e.ray.origin.distanceTo(h);P<e.near||P>e.far||t.push({distance:P,point:d.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{let f=Math.max(0,s.start),v=Math.min(m.count,s.start+s.count);for(let _=f,T=v-1;_<T;_+=p){if(l.fromBufferAttribute(m,_),u.fromBufferAttribute(m,_+1),Nd.distanceSqToSegment(l,u,h,d)>c)continue;h.applyMatrix4(this.matrixWorld);let b=e.ray.origin.distanceTo(h);b<e.near||b>e.far||t.push({distance:b,point:d.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){let a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}};var u_=new L,d_=new L,tr=class extends er{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,o=t.count;r<o;r+=2)u_.fromBufferAttribute(t,r),d_.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+u_.distanceTo(d_);e.setAttribute("lineDistance",new Ze(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var na=class extends er{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}};var nr=class extends Dt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ge(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}};var h_=new Ue,Bd=new $n,Kc=new At,Zc=new L,Cr=class extends Xe{constructor(e=new Je,t=new nr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,o=e.params.Points.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Kc.copy(n.boundingSphere),Kc.applyMatrix4(r),Kc.radius+=o,e.ray.intersectsSphere(Kc)===!1)return;h_.copy(r).invert(),Bd.copy(e.ray).applyMatrix4(h_);let a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,d=n.attributes.position;if(l!==null){let h=Math.max(0,s.start),p=Math.min(l.count,s.start+s.count);for(let g=h,x=p;g<x;g++){let m=l.getX(g);Zc.fromBufferAttribute(d,m),f_(Zc,m,c,r,e,t,this)}}else{let h=Math.max(0,s.start),p=Math.min(d.count,s.start+s.count);for(let g=h,x=p;g<x;g++)Zc.fromBufferAttribute(d,g),f_(Zc,g,c,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){let a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}};function f_(i,e,t,n,r,o,s){let a=Bd.distanceSqToPoint(i);if(a<t){let c=new L;Bd.closestPointToPoint(i,c),c.applyMatrix4(n);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;o.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:s})}}var so=class extends mt{constructor(e,t,n,r,o,s,a,c,l){super(e,t,n,r,o,s,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ia=class i extends Je{constructor(e=1,t=1,n=1,r=32,o=1,s=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:o,openEnded:s,thetaStart:a,thetaLength:c};let l=this;r=Math.floor(r),o=Math.floor(o);let u=[],d=[],h=[],p=[],g=0,x=[],m=n/2,f=0;v(),s===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new Ze(d,3)),this.setAttribute("normal",new Ze(h,3)),this.setAttribute("uv",new Ze(p,2));function v(){let T=new L,A=new L,b=0,S=(t-e)/n;for(let P=0;P<=o;P++){let E=[],w=P/o,I=w*(t-e)+e;for(let O=0;O<=r;O++){let te=O/r,D=te*c+a,G=Math.sin(D),X=Math.cos(D);A.x=I*G,A.y=-w*n+m,A.z=I*X,d.push(A.x,A.y,A.z),T.set(G,S,X).normalize(),h.push(T.x,T.y,T.z),p.push(te,1-w),E.push(g++)}x.push(E)}for(let P=0;P<r;P++)for(let E=0;E<o;E++){let w=x[E][P],I=x[E+1][P],O=x[E+1][P+1],te=x[E][P+1];u.push(w,I,te),u.push(I,O,te),b+=6}l.addGroup(f,b,0),f+=b}function _(T){let A=g,b=new De,S=new L,P=0,E=T===!0?e:t,w=T===!0?1:-1;for(let O=1;O<=r;O++)d.push(0,m*w,0),h.push(0,w,0),p.push(.5,.5),g++;let I=g;for(let O=0;O<=r;O++){let D=O/r*c+a,G=Math.cos(D),X=Math.sin(D);S.x=E*X,S.y=m*w,S.z=E*G,d.push(S.x,S.y,S.z),h.push(0,w,0),b.x=G*.5+.5,b.y=X*.5*w+.5,p.push(b.x,b.y),g++}for(let O=0;O<r;O++){let te=A+O,D=I+O;T===!0?u.push(D,D+1,te):u.push(D+1,D,te),P+=3}l.addGroup(f,P,T===!0?1:2),f+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Jc=class i extends Je{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let o=[],s=[];a(r),l(n),u(),this.setAttribute("position",new Ze(o,3)),this.setAttribute("normal",new Ze(o.slice(),3)),this.setAttribute("uv",new Ze(s,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let _=new L,T=new L,A=new L;for(let b=0;b<t.length;b+=3)p(t[b+0],_),p(t[b+1],T),p(t[b+2],A),c(_,T,A,v)}function c(v,_,T,A){let b=A+1,S=[];for(let P=0;P<=b;P++){S[P]=[];let E=v.clone().lerp(T,P/b),w=_.clone().lerp(T,P/b),I=b-P;for(let O=0;O<=I;O++)O===0&&P===b?S[P][O]=E:S[P][O]=E.clone().lerp(w,O/I)}for(let P=0;P<b;P++)for(let E=0;E<2*(b-P)-1;E++){let w=Math.floor(E/2);E%2===0?(h(S[P][w+1]),h(S[P+1][w]),h(S[P][w])):(h(S[P][w+1]),h(S[P+1][w+1]),h(S[P+1][w]))}}function l(v){let _=new L;for(let T=0;T<o.length;T+=3)_.x=o[T+0],_.y=o[T+1],_.z=o[T+2],_.normalize().multiplyScalar(v),o[T+0]=_.x,o[T+1]=_.y,o[T+2]=_.z}function u(){let v=new L;for(let _=0;_<o.length;_+=3){v.x=o[_+0],v.y=o[_+1],v.z=o[_+2];let T=m(v)/2/Math.PI+.5,A=f(v)/Math.PI+.5;s.push(T,1-A)}g(),d()}function d(){for(let v=0;v<s.length;v+=6){let _=s[v+0],T=s[v+2],A=s[v+4],b=Math.max(_,T,A),S=Math.min(_,T,A);b>.9&&S<.1&&(_<.2&&(s[v+0]+=1),T<.2&&(s[v+2]+=1),A<.2&&(s[v+4]+=1))}}function h(v){o.push(v.x,v.y,v.z)}function p(v,_){let T=v*3;_.x=e[T+0],_.y=e[T+1],_.z=e[T+2]}function g(){let v=new L,_=new L,T=new L,A=new L,b=new De,S=new De,P=new De;for(let E=0,w=0;E<o.length;E+=9,w+=6){v.set(o[E+0],o[E+1],o[E+2]),_.set(o[E+3],o[E+4],o[E+5]),T.set(o[E+6],o[E+7],o[E+8]),b.set(s[w+0],s[w+1]),S.set(s[w+2],s[w+3]),P.set(s[w+4],s[w+5]),A.copy(v).add(_).add(T).divideScalar(3);let I=m(A);x(b,w+0,v,I),x(S,w+2,_,I),x(P,w+4,T,I)}}function x(v,_,T,A){A<0&&v.x===1&&(s[_]=v.x-1),T.x===0&&T.z===0&&(s[_]=A/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function f(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}};var Qc=new L,el=new L,Fd=new L,tl=new Zi,as=class extends Je{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),o=Math.cos(mr*t),s=e.getIndex(),a=e.getAttribute("position"),c=s?s.count:a.count,l=[0,0,0],u=["a","b","c"],d=new Array(3),h={},p=[];for(let g=0;g<c;g+=3){s?(l[0]=s.getX(g),l[1]=s.getX(g+1),l[2]=s.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:x,b:m,c:f}=tl;if(x.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),f.fromBufferAttribute(a,l[2]),tl.getNormal(Fd),d[0]=`${Math.round(x.x*r)},${Math.round(x.y*r)},${Math.round(x.z*r)}`,d[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,d[2]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let v=0;v<3;v++){let _=(v+1)%3,T=d[v],A=d[_],b=tl[u[v]],S=tl[u[_]],P=`${T}_${A}`,E=`${A}_${T}`;E in h&&h[E]?(Fd.dot(h[E].normal)<=o&&(p.push(b.x,b.y,b.z),p.push(S.x,S.y,S.z)),h[E]=null):P in h||(h[P]={index0:l[v],index1:l[_],normal:Fd.clone()})}}for(let g in h)if(h[g]){let{index0:x,index1:m}=h[g];Qc.fromBufferAttribute(a,x),el.fromBufferAttribute(a,m),p.push(Qc.x,Qc.y,Qc.z),p.push(el.x,el.y,el.z)}this.setAttribute("position",new Ze(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};var ra=class i extends Jc{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],o=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,o,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var nl=class i extends Je{constructor(e=.5,t=1,n=32,r=1,o=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:o,thetaLength:s},n=Math.max(3,n),r=Math.max(1,r);let a=[],c=[],l=[],u=[],d=e,h=(t-e)/r,p=new L,g=new De;for(let x=0;x<=r;x++){for(let m=0;m<=n;m++){let f=o+m/n*s;p.x=d*Math.cos(f),p.y=d*Math.sin(f),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,u.push(g.x,g.y)}d+=h}for(let x=0;x<r;x++){let m=x*(n+1);for(let f=0;f<n;f++){let v=f+m,_=v,T=v+n+1,A=v+n+2,b=v+1;a.push(_,T,b),a.push(T,A,b)}}this.setIndex(a),this.setAttribute("position",new Ze(c,3)),this.setAttribute("normal",new Ze(l,3)),this.setAttribute("uv",new Ze(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var oa=class i extends Je{constructor(e=1,t=32,n=16,r=0,o=Math.PI*2,s=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:o,thetaStart:s,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(s+a,Math.PI),l=0,u=[],d=new L,h=new L,p=[],g=[],x=[],m=[];for(let f=0;f<=n;f++){let v=[],_=f/n,T=0;f===0&&s===0?T=.5/t:f===n&&c===Math.PI&&(T=-.5/t);for(let A=0;A<=t;A++){let b=A/t;d.x=-e*Math.cos(r+b*o)*Math.sin(s+_*a),d.y=e*Math.cos(s+_*a),d.z=e*Math.sin(r+b*o)*Math.sin(s+_*a),g.push(d.x,d.y,d.z),h.copy(d).normalize(),x.push(h.x,h.y,h.z),m.push(b+T,1-_),v.push(l++)}u.push(v)}for(let f=0;f<n;f++)for(let v=0;v<t;v++){let _=u[f][v+1],T=u[f][v],A=u[f+1][v],b=u[f+1][v+1];(f!==0||s>0)&&p.push(_,T,b),(f!==n-1||c<Math.PI)&&p.push(T,A,b)}this.setIndex(p),this.setAttribute("position",new Ze(g,3)),this.setAttribute("normal",new Ze(x,3)),this.setAttribute("uv",new Ze(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var il=class i extends Je{constructor(e=1,t=.4,n=12,r=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:o},n=Math.floor(n),r=Math.floor(r);let s=[],a=[],c=[],l=[],u=new L,d=new L,h=new L;for(let p=0;p<=n;p++)for(let g=0;g<=r;g++){let x=g/r*o,m=p/n*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(x),d.y=(e+t*Math.cos(m))*Math.sin(x),d.z=t*Math.sin(m),a.push(d.x,d.y,d.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),h.subVectors(d,u).normalize(),c.push(h.x,h.y,h.z),l.push(g/r),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=r;g++){let x=(r+1)*p+g-1,m=(r+1)*(p-1)+g-1,f=(r+1)*(p-1)+g,v=(r+1)*p+g;s.push(x,m,v),s.push(m,f,v)}this.setIndex(s),this.setAttribute("position",new Ze(a,3)),this.setAttribute("normal",new Ze(c,3)),this.setAttribute("uv",new Ze(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var tn=class extends Dt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sc,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Hn=class extends tn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new De(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ge(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ge(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ge(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function sa(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function p_(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function m_(i){function e(r,o){return i[r]-i[o]}let t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function Od(i,e,t){let n=i.length,r=new i.constructor(n);for(let o=0,s=0;s!==n;++o){let a=t[o]*e;for(let c=0;c!==e;++c)r[s++]=i[a+c]}return r}function Hd(i,e,t,n){let r=1,o=i[0];for(;o!==void 0&&o[n]===void 0;)o=i[r++];if(o===void 0)return;let s=o[n];if(s!==void 0)if(Array.isArray(s))do s=o[n],s!==void 0&&(e.push(o.time),t.push.apply(t,s)),o=i[r++];while(o!==void 0);else if(s.toArray!==void 0)do s=o[n],s!==void 0&&(e.push(o.time),s.toArray(t,t.length)),o=i[r++];while(o!==void 0);else do s=o[n],s!==void 0&&(e.push(o.time),t.push(s)),o=i[r++];while(o!==void 0)}var kn=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],o=t[n-1];n:{e:{let s;t:{i:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<o)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(o=r,r=t[++n],e<r)break e}s=t.length;break t}if(!(e>=o)){let a=t[1];e<a&&(n=2,o=a);for(let c=n-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=o,o=t[--n-1],e>=o)break e}s=n,n=0;break t}break n}for(;n<s;){let a=n+s>>>1;e<t[a]?s=a:n=a+1}if(r=t[n],o=t[n-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,o,r)}return this.interpolate_(n,o,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,o=e*r;for(let s=0;s!==r;++s)t[s]=n[o+s];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}};var rl=class extends kn{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ju,endingEnd:Ju}}intervalChanged_(e,t,n){let r=this.parameterPositions,o=e-2,s=e+1,a=r[o],c=r[s];if(a===void 0)switch(this.getSettings_().endingStart){case Qu:o=e,a=2*t-n;break;case ed:o=r.length-2,a=t+r[o]-r[o+1];break;default:o=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Qu:s=e,c=2*n-t;break;case ed:s=1,c=n+r[1]-r[0];break;default:s=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=o*u,this._offsetNext=s*u}interpolate_(e,t,n,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,p=this._weightNext,g=(n-t)/(r-t),x=g*g,m=x*g,f=-h*m+2*h*x-h*g,v=(1+h)*m+(-1.5-2*h)*x+(-.5+h)*g+1,_=(-1-p)*m+(1.5+p)*x+.5*g,T=p*m-p*x;for(let A=0;A!==a;++A)o[A]=f*s[u+A]+v*s[l+A]+_*s[c+A]+T*s[d+A];return o}};var ol=class extends kn{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(r-t),d=1-u;for(let h=0;h!==a;++h)o[h]=s[l+h]*d+s[c+h]*u;return o}};var sl=class extends kn{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}};var Vt=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=sa(t,this.TimeBufferType),this.values=sa(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:sa(e.times,Array),values:sa(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new sl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ol(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new rl(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Vi:t=this.InterpolantFactoryMethodDiscrete;break;case Wi:t=this.InterpolantFactoryMethodLinear;break;case rc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Vi;case this.InterpolantFactoryMethodLinear:return Wi;case this.InterpolantFactoryMethodSmooth:return rc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,o=0,s=r-1;for(;o!==r&&n[o]<e;)++o;for(;s!==-1&&n[s]>t;)--s;if(++s,o!==0||s!==r){o>=s&&(s=Math.max(s,1),o=s-1);let a=this.getValueSize();this.times=n.slice(o,s),this.values=this.values.slice(o*a,s*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,o=n.length;o===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let a=0;a!==o;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(s!==null&&s>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,s),e=!1;break}s=c}if(r!==void 0&&p_(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===rc,o=e.length-1,s=1;for(let a=1;a<o;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let d=a*n,h=d-n,p=d+n;for(let g=0;g!==n;++g){let x=t[d+g];if(x!==t[h+g]||x!==t[p+g]){c=!0;break}}}if(c){if(a!==s){e[s]=e[a];let d=a*n,h=s*n;for(let p=0;p!==n;++p)t[h+p]=t[d+p]}++s}}if(o>0){e[s]=e[o];for(let a=o*n,c=s*n,l=0;l!==n;++l)t[c+l]=t[a+l];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=t.slice(0,s*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Vt.prototype.TimeBufferType=Float32Array;Vt.prototype.ValueBufferType=Float32Array;Vt.prototype.DefaultInterpolation=Wi;var ir=class extends Vt{};ir.prototype.ValueTypeName="bool";ir.prototype.ValueBufferType=Array;ir.prototype.DefaultInterpolation=Vi;ir.prototype.InterpolantFactoryMethodLinear=void 0;ir.prototype.InterpolantFactoryMethodSmooth=void 0;var aa=class extends Vt{};aa.prototype.ValueTypeName="color";var pi=class extends Vt{};pi.prototype.ValueTypeName="number";var al=class extends kn{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=(n-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)Qt.slerpFlat(o,0,s,l-a,s,l,c);return o}};var Qn=class extends Vt{InterpolantFactoryMethodLinear(e){return new al(this.times,this.values,this.getValueSize(),e)}};Qn.prototype.ValueTypeName="quaternion";Qn.prototype.DefaultInterpolation=Wi;Qn.prototype.InterpolantFactoryMethodSmooth=void 0;var rr=class extends Vt{};rr.prototype.ValueTypeName="string";rr.prototype.ValueBufferType=Array;rr.prototype.DefaultInterpolation=Vi;rr.prototype.InterpolantFactoryMethodLinear=void 0;rr.prototype.InterpolantFactoryMethodSmooth=void 0;var mi=class extends Vt{};mi.prototype.ValueTypeName="vector";var ca=class{constructor(e,t=-1,n,r=zp){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=kt(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let s=0,a=n.length;s!==a;++s)t.push(jM(n[s]).scale(r));let o=new this(e.name,e.duration,t,e.blendMode);return o.uuid=e.uuid,o}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let o=0,s=n.length;o!==s;++o)t.push(Vt.toJSON(n[o]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let o=t.length,s=[];for(let a=0;a<o;a++){let c=[],l=[];c.push((a+o-1)%o,a,(a+1)%o),l.push(0,1,0);let u=m_(c);c=Od(c,1,u),l=Od(l,1,u),!r&&c[0]===0&&(c.push(o),l.push(l[0])),s.push(new pi(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,s)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},o=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],u=l.name.match(o);if(u&&u.length>1){let d=u[1],h=r[d];h||(r[d]=h=[]),h.push(l)}}let s=[];for(let a in r)s.push(this.CreateFromMorphTargetSequence(a,r[a],t,n));return s}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(d,h,p,g,x){if(p.length!==0){let m=[],f=[];Hd(p,m,f,g),m.length!==0&&x.push(new d(h,m,f))}},r=[],o=e.name||"default",s=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let d=0;d<l.length;d++){let h=l[d].keys;if(!(!h||h.length===0))if(h[0].morphTargets){let p={},g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let x=0;x<h[g].morphTargets.length;x++)p[h[g].morphTargets[x]]=-1;for(let x in p){let m=[],f=[];for(let v=0;v!==h[g].morphTargets.length;++v){let _=h[g];m.push(_.time),f.push(_.morphTarget===x?1:0)}r.push(new pi(".morphTargetInfluence["+x+"]",m,f))}c=p.length*s}else{let p=".bones["+t[d].name+"]";n(mi,p+".position",h,"pos",r),n(Qn,p+".quaternion",h,"rot",r),n(mi,p+".scale",h,"scl",r)}}return r.length===0?null:new this(o,c,r,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,r=e.length;n!==r;++n){let o=this.tracks[n];t=Math.max(t,o.times[o.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function YM(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return pi;case"vector":case"vector2":case"vector3":case"vector4":return mi;case"color":return aa;case"quaternion":return Qn;case"bool":case"boolean":return ir;case"string":return rr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function jM(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=YM(i.type);if(i.times===void 0){let t=[],n=[];Hd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var gi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};var cs=class{constructor(e,t,n){let r=this,o=!1,s=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,o===!1&&r.onStart!==void 0&&r.onStart(u,s,a),o=!0},this.itemEnd=function(u){s++,r.onProgress!==void 0&&r.onProgress(u,s,a),s===a&&(o=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){let p=l[d],g=l[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null}}},kd=new cs;var hn=class{constructor(e){this.manager=e!==void 0?e:kd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,o){n.load(e,r,t,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};hn.DEFAULT_MATERIAL_NAME="__DEFAULT";var or={},zd=class extends Error{constructor(e,t){super(e),this.response=t}},sr=class extends hn{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let o=gi.get(e);if(o!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(o),this.manager.itemEnd(e)},0),o;if(or[e]!==void 0){or[e].push({onLoad:t,onProgress:n,onError:r});return}or[e]=[],or[e].push({onLoad:t,onProgress:n,onError:r});let s=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(s).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=or[e],d=l.body.getReader(),h=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),p=h?parseInt(h):0,g=p!==0,x=0,m=new ReadableStream({start(f){v();function v(){d.read().then(({done:_,value:T})=>{if(_)f.close();else{x+=T.byteLength;let A=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:p});for(let b=0,S=u.length;b<S;b++){let P=u[b];P.onProgress&&P.onProgress(A)}f.enqueue(T),v()}})}}});return new Response(m)}else throw new zd(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{let d=/charset="?([^;"\s]*)"?/i.exec(a),h=d&&d[1]?d[1].toLowerCase():void 0,p=new TextDecoder(h);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{gi.add(e,l);let u=or[e];delete or[e];for(let d=0,h=u.length;d<h;d++){let p=u[d];p.onLoad&&p.onLoad(l)}}).catch(l=>{let u=or[e];if(u===void 0)throw this.manager.itemError(e),l;delete or[e];for(let d=0,h=u.length;d<h;d++){let p=u[d];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var cl=class extends hn{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let o=this,s=gi.get(e);if(s!==void 0)return o.manager.itemStart(e),setTimeout(function(){t&&t(s),o.manager.itemEnd(e)},0),s;let a=gr("img");function c(){u(),gi.add(e,this),t&&t(this),o.manager.itemEnd(e)}function l(d){u(),r&&r(d),o.manager.itemError(e),o.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),o.manager.itemStart(e),a.src=e,a}};var la=class extends hn{constructor(e){super(e)}load(e,t,n,r){let o=new mt,s=new cl(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(a){o.image=a,o.needsUpdate=!0,t!==void 0&&t(o)},n,r),o}};var Ri=class extends Xe{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ge(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}};var Gd=new Ue,x_=new L,__=new L,Lr=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new De(512,512),this.map=null,this.mapPass=null,this.matrix=new Ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wr,this._frameExtents=new De(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;x_.setFromMatrixPosition(e.matrixWorld),t.position.copy(x_),__.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(__),t.updateMatrixWorld(),Gd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gd),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Gd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var ll=class extends Lr{constructor(){super(new ft(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=Xi*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,o=e.distance||t.far;(n!==t.fov||r!==t.aspect||o!==t.far)&&(t.fov=n,t.aspect=r,t.far=o,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}};var Pr=class extends Ri{constructor(e,t,n=0,r=Math.PI/3,o=0,s=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Xe.DEFAULT_UP),this.updateMatrix(),this.target=new Xe,this.distance=n,this.angle=r,this.penumbra=o,this.decay=s,this.map=null,this.shadow=new ll}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var y_=new Ue,ua=new L,Vd=new L,ul=class extends Lr{constructor(){super(new ft(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new De(4,2),this._viewportCount=6,this._viewports=[new rt(2,1,1,1),new rt(0,1,1,1),new rt(3,1,1,1),new rt(1,1,1,1),new rt(3,0,1,1),new rt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,r=this.matrix,o=e.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),ua.setFromMatrixPosition(e.matrixWorld),n.position.copy(ua),Vd.copy(n.position),Vd.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Vd),n.updateMatrixWorld(),r.makeTranslation(-ua.x,-ua.y,-ua.z),y_.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(y_)}};var xi=class extends Ri{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new ul}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}};var dl=class extends Lr{constructor(){super(new Qi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}};var Ci=class extends Ri{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Xe.DEFAULT_UP),this.updateMatrix(),this.target=new Xe,this.shadow=new dl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var da=class extends Ri{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var ar=class{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,r=e.length;n<r;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var ha=class extends hn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let o=this,s=gi.get(e);if(s!==void 0){if(o.manager.itemStart(e),s.then){s.then(l=>{t&&t(l),o.manager.itemEnd(e)}).catch(l=>{r&&r(l)});return}return setTimeout(function(){t&&t(s),o.manager.itemEnd(e)},0),s}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(o.options,{colorSpaceConversion:"none"}))}).then(function(l){return gi.add(e,l),t&&t(l),o.manager.itemEnd(e),l}).catch(function(l){r&&r(l),gi.remove(e),o.manager.itemError(e),o.manager.itemEnd(e)});gi.add(e,c),o.manager.itemStart(e)}};var fa=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=v_(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=v_();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function v_(){return(typeof performance>"u"?Date:performance).now()}var Xd="\\[\\]\\.:\\/",$M=new RegExp("["+Xd+"]","g"),qd="[^"+Xd+"]",KM="[^"+Xd.replace("\\.","")+"]",ZM=/((?:WC+[\/:])*)/.source.replace("WC",qd),JM=/(WCOD+)?/.source.replace("WCOD",KM),QM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",qd),eb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",qd),tb=new RegExp("^"+ZM+JM+QM+eb+"$"),nb=["material","materials","bones","map"],Wd=class{constructor(e,t,n){let r=n||gt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,o=n.length;r!==o;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},gt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace($M,"")}static parseTrackName(e){let t=tb.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let o=n.nodeName.substring(r+1);nb.indexOf(o)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=o)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(o){for(let s=0;s<o.length;s++){let a=o[s];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,o=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let s=e[r];if(s===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(o!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[o]!==void 0&&(o=e.morphTargetDictionary[o])}c=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=o}else s.fromArray!==void 0&&s.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(c=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};gt.Composite=Wd;gt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};gt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};gt.prototype.GetterByBindingType=[gt.prototype._getValue_direct,gt.prototype._getValue_array,gt.prototype._getValue_arrayElement,gt.prototype._getValue_toArray];gt.prototype.SetterByBindingTypeAndVersioning=[[gt.prototype._setValue_direct,gt.prototype._setValue_direct_setNeedsUpdate,gt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_array,gt.prototype._setValue_array_setNeedsUpdate,gt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_arrayElement,gt.prototype._setValue_arrayElement_setNeedsUpdate,gt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_fromArray,gt.prototype._setValue_fromArray_setNeedsUpdate,gt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var pa=class{constructor(e,t,n=0,r=1/0){this.ray=new $n(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Tr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Yd(e,this,n,t),n.sort(E_),n}intersectObjects(e,t=!0,n=[]){for(let r=0,o=e.length;r<o;r++)Yd(e[r],this,n,t);return n.sort(E_),n}};function E_(i,e){return i.distance-e.distance}function Yd(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){let r=i.children;for(let o=0,s=r.length;o<s;o++)Yd(r[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");function $d(i,e){if(e===td)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===wo||e===Vs){let t=i.getIndex();if(t===null){let s=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)s.push(c);i.setIndex(s),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,r=[];if(e===wo)for(let s=1;s<=n;s++)r.push(t.getX(0)),r.push(t.getX(s)),r.push(t.getX(s+1));else for(let s=0;s<n;s++)s%2===0?(r.push(t.getX(s)),r.push(t.getX(s+1)),r.push(t.getX(s+2))):(r.push(t.getX(s+2)),r.push(t.getX(s+1)),r.push(t.getX(s)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let o=i.clone();return o.setIndex(r),o.clearGroups(),o}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var us=class extends hn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new nh(t)}),this.register(function(t){return new dh(t)}),this.register(function(t){return new hh(t)}),this.register(function(t){return new fh(t)}),this.register(function(t){return new rh(t)}),this.register(function(t){return new oh(t)}),this.register(function(t){return new sh(t)}),this.register(function(t){return new ah(t)}),this.register(function(t){return new th(t)}),this.register(function(t){return new ch(t)}),this.register(function(t){return new ih(t)}),this.register(function(t){return new uh(t)}),this.register(function(t){return new lh(t)}),this.register(function(t){return new Qd(t)}),this.register(function(t){return new ph(t)}),this.register(function(t){return new mh(t)})}load(e,t,n,r){let o=this,s;if(this.resourcePath!=="")s=this.resourcePath;else if(this.path!==""){let l=ar.extractUrlBase(e);s=ar.resolveURL(l,this.path)}else s=ar.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){r?r(l):console.error(l),o.manager.itemError(e),o.manager.itemEnd(e)},c=new sr(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{o.parse(l,s,function(u){t(u),o.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let o,s={},a={},c=new TextDecoder;if(typeof e=="string")o=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===w_){try{s[ot.KHR_BINARY_GLTF]=new gh(e)}catch(d){r&&r(d);return}o=JSON.parse(s[ot.KHR_BINARY_GLTF].content)}else o=JSON.parse(c.decode(e));else o=e;if(o.asset===void 0||o.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new bh(o,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let d=this.pluginCallbacks[u](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,s[d.name]=!0}if(o.extensionsUsed)for(let u=0;u<o.extensionsUsed.length;++u){let d=o.extensionsUsed[u],h=o.extensionsRequired||[];switch(d){case ot.KHR_MATERIALS_UNLIT:s[d]=new eh;break;case ot.KHR_DRACO_MESH_COMPRESSION:s[d]=new xh(o,this.dracoLoader);break;case ot.KHR_TEXTURE_TRANSFORM:s[d]=new _h;break;case ot.KHR_MESH_QUANTIZATION:s[d]=new yh;break;default:h.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(s),l.setPlugins(a),l.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,o){n.parse(e,t,r,o)})}};function ib(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var ot={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Qd=class{constructor(e){this.parser=e,this.name=ot.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let o=t[n];o.extensions&&o.extensions[this.name]&&o.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,o.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,r=t.cache.get(n);if(r)return r;let o=t.json,c=((o.extensions&&o.extensions[this.name]||{}).lights||[])[e],l,u=new ge(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],pt);let d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Ci(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new xi(u),l.distance=d;break;case"spot":l=new Pr(u),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Dr(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),r=Promise.resolve(l),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,o=n.json.nodes[e],a=(o.extensions&&o.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},eh=class{constructor(){this.name=ot.KHR_MATERIALS_UNLIT}getMaterialType(){return Ut}extendParams(e,t,n){let r=[];e.color=new ge(1,1,1),e.opacity=1;let o=t.pbrMetallicRoughness;if(o){if(Array.isArray(o.baseColorFactor)){let s=o.baseColorFactor;e.color.setRGB(s[0],s[1],s[2],pt),e.opacity=s[3]}o.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",o.baseColorTexture,nt))}return Promise.all(r)}},th=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=r.extensions[this.name].emissiveStrength;return o!==void 0&&(t.emissiveIntensity=o),Promise.resolve()}},nh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];if(s.clearcoatFactor!==void 0&&(t.clearcoat=s.clearcoatFactor),s.clearcoatTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatMap",s.clearcoatTexture)),s.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=s.clearcoatRoughnessFactor),s.clearcoatRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatRoughnessMap",s.clearcoatRoughnessTexture)),s.clearcoatNormalTexture!==void 0&&(o.push(n.assignTexture(t,"clearcoatNormalMap",s.clearcoatNormalTexture)),s.clearcoatNormalTexture.scale!==void 0)){let a=s.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new De(a,a)}return Promise.all(o)}},ih=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];return s.iridescenceFactor!==void 0&&(t.iridescence=s.iridescenceFactor),s.iridescenceTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceMap",s.iridescenceTexture)),s.iridescenceIor!==void 0&&(t.iridescenceIOR=s.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),s.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=s.iridescenceThicknessMinimum),s.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=s.iridescenceThicknessMaximum),s.iridescenceThicknessTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceThicknessMap",s.iridescenceThicknessTexture)),Promise.all(o)}},rh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[];t.sheenColor=new ge(0,0,0),t.sheenRoughness=0,t.sheen=1;let s=r.extensions[this.name];if(s.sheenColorFactor!==void 0){let a=s.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],pt)}return s.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=s.sheenRoughnessFactor),s.sheenColorTexture!==void 0&&o.push(n.assignTexture(t,"sheenColorMap",s.sheenColorTexture,nt)),s.sheenRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"sheenRoughnessMap",s.sheenRoughnessTexture)),Promise.all(o)}},oh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];return s.transmissionFactor!==void 0&&(t.transmission=s.transmissionFactor),s.transmissionTexture!==void 0&&o.push(n.assignTexture(t,"transmissionMap",s.transmissionTexture)),Promise.all(o)}},sh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];t.thickness=s.thicknessFactor!==void 0?s.thicknessFactor:0,s.thicknessTexture!==void 0&&o.push(n.assignTexture(t,"thicknessMap",s.thicknessTexture)),t.attenuationDistance=s.attenuationDistance||1/0;let a=s.attenuationColor||[1,1,1];return t.attenuationColor=new ge().setRGB(a[0],a[1],a[2],pt),Promise.all(o)}},ah=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=r.extensions[this.name];return t.ior=o.ior!==void 0?o.ior:1.5,Promise.resolve()}},ch=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];t.specularIntensity=s.specularFactor!==void 0?s.specularFactor:1,s.specularTexture!==void 0&&o.push(n.assignTexture(t,"specularIntensityMap",s.specularTexture));let a=s.specularColorFactor||[1,1,1];return t.specularColor=new ge().setRGB(a[0],a[1],a[2],pt),s.specularColorTexture!==void 0&&o.push(n.assignTexture(t,"specularColorMap",s.specularColorTexture,nt)),Promise.all(o)}},lh=class{constructor(e){this.parser=e,this.name=ot.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];return t.bumpScale=s.bumpFactor!==void 0?s.bumpFactor:1,s.bumpTexture!==void 0&&o.push(n.assignTexture(t,"bumpMap",s.bumpTexture)),Promise.all(o)}},uh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Hn}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];return s.anisotropyStrength!==void 0&&(t.anisotropy=s.anisotropyStrength),s.anisotropyRotation!==void 0&&(t.anisotropyRotation=s.anisotropyRotation),s.anisotropyTexture!==void 0&&o.push(n.assignTexture(t,"anisotropyMap",s.anisotropyTexture)),Promise.all(o)}},dh=class{constructor(e){this.parser=e,this.name=ot.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let o=r.extensions[this.name],s=t.options.ktx2Loader;if(!s){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,o.source,s)}},hh=class{constructor(e){this.parser=e,this.name=ot.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,r=n.json,o=r.textures[e];if(!o.extensions||!o.extensions[t])return null;let s=o.extensions[t],a=r.images[s.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,s.source,c);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},fh=class{constructor(e){this.parser=e,this.name=ot.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,r=n.json,o=r.textures[e];if(!o.extensions||!o.extensions[t])return null;let s=o.extensions[t],a=r.images[s.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,s.source,c);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},ph=class{constructor(e){this.name=ot.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let r=n.extensions[this.name],o=this.parser.getDependency("buffer",r.buffer),s=this.parser.options.meshoptDecoder;if(!s||!s.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return o.then(function(a){let c=r.byteOffset||0,l=r.byteLength||0,u=r.count,d=r.byteStride,h=new Uint8Array(a,c,l);return s.decodeGltfBufferAsync?s.decodeGltfBufferAsync(u,d,h,r.mode,r.filter).then(function(p){return p.buffer}):s.ready.then(function(){let p=new ArrayBuffer(u*d);return s.decodeGltfBuffer(new Uint8Array(p),u,d,h,r.mode,r.filter),p})})}else return null}},mh=class{constructor(e){this.name=ot.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let l of r.primitives)if(l.mode!==ei.TRIANGLES&&l.mode!==ei.TRIANGLE_STRIP&&l.mode!==ei.TRIANGLE_FAN&&l.mode!==void 0)return null;let s=n.extensions[this.name].attributes,a=[],c={};for(let l in s)a.push(this.parser.getDependency("accessor",s[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let u=l.pop(),d=u.isGroup?u.children:[u],h=l[0].count,p=[];for(let g of d){let x=new Ue,m=new L,f=new Qt,v=new L(1,1,1),_=new oo(g.geometry,g.material,h);for(let T=0;T<h;T++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,T),c.ROTATION&&f.fromBufferAttribute(c.ROTATION,T),c.SCALE&&v.fromBufferAttribute(c.SCALE,T),_.setMatrixAt(T,x.compose(m,f,v));for(let T in c)if(T==="_COLOR_0"){let A=c[T];_.instanceColor=new Ai(A.array,A.itemSize,A.normalized)}else T!=="TRANSLATION"&&T!=="ROTATION"&&T!=="SCALE"&&g.geometry.setAttribute(T,c[T]);Xe.prototype.copy.call(_,g),this.parser.assignFinalMaterial(_),p.push(_)}return u.isGroup?(u.clear(),u.add(...p),u):p[0]}))}},w_="glTF",ma=12,M_={JSON:1313821514,BIN:5130562},gh=class{constructor(e){this.name=ot.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ma),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==w_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let r=this.header.length-ma,o=new DataView(e,ma),s=0;for(;s<r;){let a=o.getUint32(s,!0);s+=4;let c=o.getUint32(s,!0);if(s+=4,c===M_.JSON){let l=new Uint8Array(e,ma+s,a);this.content=n.decode(l)}else if(c===M_.BIN){let l=ma+s;this.body=e.slice(l,l+a)}s+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},xh=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ot.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,o=e.extensions[this.name].bufferView,s=e.extensions[this.name].attributes,a={},c={},l={};for(let u in s){let d=Eh[u]||u.toLowerCase();a[d]=s[u]}for(let u in e.attributes){let d=Eh[u]||u.toLowerCase();if(s[u]!==void 0){let h=n.accessors[e.attributes[u]],p=ls[h.componentType];l[d]=p.name,c[d]=h.normalized===!0}}return t.getDependency("bufferView",o).then(function(u){return new Promise(function(d,h){r.decodeDracoFile(u,function(p){for(let g in p.attributes){let x=p.attributes[g],m=c[g];m!==void 0&&(x.normalized=m)}d(p)},a,l,pt,h)})})}},_h=class{constructor(){this.name=ot.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},yh=class{constructor(){this.name=ot.KHR_MESH_QUANTIZATION}},hl=class extends kn{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,o=e*r*3+r;for(let s=0;s!==r;s++)t[s]=n[o+s];return t}interpolate_(e,t,n,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=r-t,d=(n-t)/u,h=d*d,p=h*d,g=e*l,x=g-l,m=-2*p+3*h,f=p-h,v=1-m,_=f-h+d;for(let T=0;T!==a;T++){let A=s[x+T+a],b=s[x+T+c]*u,S=s[g+T+a],P=s[g+T]*u;o[T]=v*A+_*b+m*S+f*P}return o}},rb=new Qt,vh=class extends hl{interpolate_(e,t,n,r){let o=super.interpolate_(e,t,n,r);return rb.fromArray(o).normalize().toArray(o),o}},ei={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ls={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},b_={9728:Tt,9729:Bt,9984:Gs,9985:Xa,9986:To,9987:qn},T_={33071:Ot,33648:Wr,10497:si},Kd={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Eh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ir={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},ob={CUBICSPLINE:void 0,LINEAR:Wi,STEP:Vi},Zd={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function sb(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new tn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Zt})),i.DefaultMaterial}function ao(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Dr(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function ab(i,e,t){let n=!1,r=!1,o=!1;for(let l=0,u=e.length;l<u;l++){let d=e[l];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(r=!0),d.COLOR_0!==void 0&&(o=!0),n&&r&&o)break}if(!n&&!r&&!o)return Promise.resolve(i);let s=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){let d=e[l];if(n){let h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):i.attributes.position;s.push(h)}if(r){let h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):i.attributes.normal;a.push(h)}if(o){let h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):i.attributes.color;c.push(h)}}return Promise.all([Promise.all(s),Promise.all(a),Promise.all(c)]).then(function(l){let u=l[0],d=l[1],h=l[2];return n&&(i.morphAttributes.position=u),r&&(i.morphAttributes.normal=d),o&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function cb(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function lb(i){let e,t=i.extensions&&i.extensions[ot.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Jd(t.attributes):e=i.indices+":"+Jd(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,r=i.targets.length;n<r;n++)e+=":"+Jd(i.targets[n]);return e}function Jd(i){let e="",t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Mh(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function ub(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var db=new Ue,bh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new ib,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=!1,o=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,r=navigator.userAgent.indexOf("Firefox")>-1,o=r?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||r&&o<98?this.textureLoader=new la(this.options.manager):this.textureLoader=new ha(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new sr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,o=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(s){return s._markDefs&&s._markDefs()}),Promise.all(this._invokeAll(function(s){return s.beforeRoot&&s.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(s){let a={scene:s[0][r.scene||0],scenes:s[0],animations:s[1],cameras:s[2],asset:r.asset,parser:n,userData:{}};return ao(o,a,r),Dr(a,r),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,o=t.length;r<o;r++){let s=t[r].joints;for(let a=0,c=s.length;a<c;a++)e[s[a]].isBone=!0}for(let r=0,o=e.length;r<o;r++){let s=e[r];s.mesh!==void 0&&(this._addNodeRef(this.meshCache,s.mesh),s.skin!==void 0&&(n[s.mesh].isSkinnedMesh=!0)),s.camera!==void 0&&this._addNodeRef(this.cameraCache,s.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),o=(s,a)=>{let c=this.associations.get(s);c!=null&&this.associations.set(a,c);for(let[l,u]of s.children.entries())o(u,a.children[l])};return o(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let o=e(t[r]);o&&n.push(o)}return n}getDependency(e,t){let n=e+":"+t,r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(o){return o.loadNode&&o.loadNode(t)});break;case"mesh":r=this._invokeOne(function(o){return o.loadMesh&&o.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(o){return o.loadBufferView&&o.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(o){return o.loadMaterial&&o.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(o){return o.loadTexture&&o.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(o){return o.loadAnimation&&o.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(o){return o!=this&&o.getDependency&&o.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(o,s){return n.getDependency(e,s)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ot.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(o,s){n.load(ar.resolveURL(t.uri,r.path),o,void 0,function(){s(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let r=t.byteLength||0,o=t.byteOffset||0;return n.slice(o,o+r)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let s=Kd[r.type],a=ls[r.componentType],c=r.normalized===!0,l=new a(r.count*s);return Promise.resolve(new $e(l,s,c))}let o=[];return r.bufferView!==void 0?o.push(this.getDependency("bufferView",r.bufferView)):o.push(null),r.sparse!==void 0&&(o.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),o.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(o).then(function(s){let a=s[0],c=Kd[r.type],l=ls[r.componentType],u=l.BYTES_PER_ELEMENT,d=u*c,h=r.byteOffset||0,p=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,g=r.normalized===!0,x,m;if(p&&p!==d){let f=Math.floor(h/p),v="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+f+":"+r.count,_=t.cache.get(v);_||(x=new l(a,f*p,r.count*p/u),_=new no(x,p/u),t.cache.add(v,_)),m=new io(_,c,h%p/u,g)}else a===null?x=new l(r.count*c):x=new l(a,h,r.count*c),m=new $e(x,c,g);if(r.sparse!==void 0){let f=Kd.SCALAR,v=ls[r.sparse.indices.componentType],_=r.sparse.indices.byteOffset||0,T=r.sparse.values.byteOffset||0,A=new v(s[1],_,r.sparse.count*f),b=new l(s[2],T,r.sparse.count*c);a!==null&&(m=new $e(m.array.slice(),m.itemSize,m.normalized));for(let S=0,P=A.length;S<P;S++){let E=A[S];if(m.setX(E,b[S*c]),c>=2&&m.setY(E,b[S*c+1]),c>=3&&m.setZ(E,b[S*c+2]),c>=4&&m.setW(E,b[S*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){let t=this.json,n=this.options,o=t.textures[e].source,s=t.images[o],a=this.textureLoader;if(s.uri){let c=n.manager.getHandler(s.uri);c!==null&&(a=c)}return this.loadTextureImage(e,o,a)}loadTextureImage(e,t,n){let r=this,o=this.json,s=o.textures[e],a=o.images[t],c=(a.uri||a.bufferView)+":"+s.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=s.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let h=(o.samplers||{})[s.sampler]||{};return u.magFilter=b_[h.magFilter]||Bt,u.minFilter=b_[h.minFilter]||qn,u.wrapS=T_[h.wrapS]||si,u.wrapT=T_[h.wrapT]||si,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,r=this.json,o=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let s=r.images[e],a=self.URL||self.webkitURL,c=s.uri||"",l=!1;if(s.bufferView!==void 0)c=n.getDependency("bufferView",s.bufferView).then(function(d){l=!0;let h=new Blob([d],{type:s.mimeType});return c=a.createObjectURL(h),c});else if(s.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(d){return new Promise(function(h,p){let g=h;t.isImageBitmapLoader===!0&&(g=function(x){let m=new mt(x);m.needsUpdate=!0,h(m)}),t.load(ar.resolveURL(d,o.path),g,void 0,p)})}).then(function(d){return l===!0&&a.revokeObjectURL(c),d.userData.mimeType=s.mimeType||ub(s.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,r){let o=this;return this.getDependency("texture",n.index).then(function(s){if(!s)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(s=s.clone(),s.channel=n.texCoord),o.extensions[ot.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[ot.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=o.associations.get(s);s=o.extensions[ot.KHR_TEXTURE_TRANSFORM].extendTexture(s,a),o.associations.set(s,c)}}return r!==void 0&&(s.colorSpace=r),e[t]=s,s})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,o=t.attributes.color!==void 0,s=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new nr,Dt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new fi,Dt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(r||o||s){let a="ClonedMaterial:"+n.uuid+":";r&&(a+="derivative-tangents:"),o&&(a+="vertex-colors:"),s&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),o&&(c.vertexColors=!0),s&&(c.flatShading=!0),r&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return tn}loadMaterial(e){let t=this,n=this.json,r=this.extensions,o=n.materials[e],s,a={},c=o.extensions||{},l=[];if(c[ot.KHR_MATERIALS_UNLIT]){let d=r[ot.KHR_MATERIALS_UNLIT];s=d.getMaterialType(),l.push(d.extendParams(a,o,t))}else{let d=o.pbrMetallicRoughness||{};if(a.color=new ge(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){let h=d.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],pt),a.opacity=h[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",d.baseColorTexture,nt)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),s=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}o.doubleSided===!0&&(a.side=It);let u=o.alphaMode||Zd.OPAQUE;if(u===Zd.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Zd.MASK&&(a.alphaTest=o.alphaCutoff!==void 0?o.alphaCutoff:.5)),o.normalTexture!==void 0&&s!==Ut&&(l.push(t.assignTexture(a,"normalMap",o.normalTexture)),a.normalScale=new De(1,1),o.normalTexture.scale!==void 0)){let d=o.normalTexture.scale;a.normalScale.set(d,d)}if(o.occlusionTexture!==void 0&&s!==Ut&&(l.push(t.assignTexture(a,"aoMap",o.occlusionTexture)),o.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=o.occlusionTexture.strength)),o.emissiveFactor!==void 0&&s!==Ut){let d=o.emissiveFactor;a.emissive=new ge().setRGB(d[0],d[1],d[2],pt)}return o.emissiveTexture!==void 0&&s!==Ut&&l.push(t.assignTexture(a,"emissiveMap",o.emissiveTexture,nt)),Promise.all(l).then(function(){let d=new s(a);return o.name&&(d.name=o.name),Dr(d,o),t.associations.set(d,{materials:e}),o.extensions&&ao(r,d,o),d})}createUniqueName(e){let t=gt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function o(a){return n[ot.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return S_(c,a,t)})}let s=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],u=lb(l),d=r[u];if(d)s.push(d.promise);else{let h;l.extensions&&l.extensions[ot.KHR_DRACO_MESH_COMPRESSION]?h=o(l):h=S_(new Je,l,t),r[u]={primitive:l,promise:h},s.push(h)}}return Promise.all(s)}loadMesh(e){let t=this,n=this.json,r=this.extensions,o=n.meshes[e],s=o.primitives,a=[];for(let c=0,l=s.length;c<l;c++){let u=s[c].material===void 0?sb(this.cache):this.getDependency("material",s[c].material);a.push(u)}return a.push(t.loadGeometries(s)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],d=[];for(let p=0,g=u.length;p<g;p++){let x=u[p],m=s[p],f,v=l[p];if(m.mode===ei.TRIANGLES||m.mode===ei.TRIANGLE_STRIP||m.mode===ei.TRIANGLE_FAN||m.mode===void 0)f=o.isSkinnedMesh===!0?new Js(x,v):new Ge(x,v),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===ei.TRIANGLE_STRIP?f.geometry=$d(f.geometry,Vs):m.mode===ei.TRIANGLE_FAN&&(f.geometry=$d(f.geometry,wo));else if(m.mode===ei.LINES)f=new tr(x,v);else if(m.mode===ei.LINE_STRIP)f=new er(x,v);else if(m.mode===ei.LINE_LOOP)f=new na(x,v);else if(m.mode===ei.POINTS)f=new Cr(x,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&cb(f,o),f.name=t.createUniqueName(o.name||"mesh_"+e),Dr(f,o),m.extensions&&ao(r,f,m),t.assignFinalMaterial(f),d.push(f)}for(let p=0,g=d.length;p<g;p++)t.associations.set(d[p],{meshes:e,primitives:p});if(d.length===1)return o.extensions&&ao(r,d[0],o),d[0];let h=new St;o.extensions&&ao(r,h,o),t.associations.set(h,{meshes:e});for(let p=0,g=d.length;p<g;p++)h.add(d[p]);return h})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new ft(ne.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new Qi(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Dr(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let r=0,o=t.joints.length;r<o;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){let o=r.pop(),s=r,a=[],c=[];for(let l=0,u=s.length;l<u;l++){let d=s[l];if(d){a.push(d);let h=new Ue;o!==null&&h.fromArray(o.array,l*16),c.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Qs(a,c)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],o=r.name?r.name:"animation_"+e,s=[],a=[],c=[],l=[],u=[];for(let d=0,h=r.channels.length;d<h;d++){let p=r.channels[d],g=r.samplers[p.sampler],x=p.target,m=x.node,f=r.parameters!==void 0?r.parameters[g.input]:g.input,v=r.parameters!==void 0?r.parameters[g.output]:g.output;x.node!==void 0&&(s.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",f)),c.push(this.getDependency("accessor",v)),l.push(g),u.push(x))}return Promise.all([Promise.all(s),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(d){let h=d[0],p=d[1],g=d[2],x=d[3],m=d[4],f=[];for(let v=0,_=h.length;v<_;v++){let T=h[v],A=p[v],b=g[v],S=x[v],P=m[v];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();let E=n._createAnimationTracks(T,A,b,S,P);if(E)for(let w=0;w<E.length;w++)f.push(E[w])}return new ca(o,void 0,f)})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(o){let s=n._getNodeRef(n.meshCache,r.mesh,o);return r.weights!==void 0&&s.traverse(function(a){if(a.isMesh)for(let c=0,l=r.weights.length;c<l;c++)a.morphTargetInfluences[c]=r.weights[c]}),s})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],o=n._loadNodeShallow(e),s=[],a=r.children||[];for(let l=0,u=a.length;l<u;l++)s.push(n.getDependency("node",a[l]));let c=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([o,Promise.all(s),c]).then(function(l){let u=l[0],d=l[1],h=l[2];h!==null&&u.traverse(function(p){p.isSkinnedMesh&&p.bind(h,db)});for(let p=0,g=d.length;p<g;p++)u.add(d[p]);return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let o=t.nodes[e],s=o.name?r.createUniqueName(o.name):"",a=[],c=r._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),o.camera!==void 0&&a.push(r.getDependency("camera",o.camera).then(function(l){return r._getNodeRef(r.cameraCache,o.camera,l)})),r._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(o.isBone===!0?u=new ro:l.length>1?u=new St:l.length===1?u=l[0]:u=new Xe,u!==l[0])for(let d=0,h=l.length;d<h;d++)u.add(l[d]);if(o.name&&(u.userData.name=o.name,u.name=s),Dr(u,o),o.extensions&&ao(n,u,o),o.matrix!==void 0){let d=new Ue;d.fromArray(o.matrix),u.applyMatrix4(d)}else o.translation!==void 0&&u.position.fromArray(o.translation),o.rotation!==void 0&&u.quaternion.fromArray(o.rotation),o.scale!==void 0&&u.scale.fromArray(o.scale);return r.associations.has(u)||r.associations.set(u,{}),r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,o=new St;n.name&&(o.name=r.createUniqueName(n.name)),Dr(o,n),n.extensions&&ao(t,o,n);let s=n.nodes||[],a=[];for(let c=0,l=s.length;c<l;c++)a.push(r.getDependency("node",s[c]));return Promise.all(a).then(function(c){for(let u=0,d=c.length;u<d;u++)o.add(c[u]);let l=u=>{let d=new Map;for(let[h,p]of r.associations)(h instanceof Dt||h instanceof mt)&&d.set(h,p);return u.traverse(h=>{let p=r.associations.get(h);p!=null&&d.set(h,p)}),d};return r.associations=l(o),o})}_createAnimationTracks(e,t,n,r,o){let s=[],a=e.name?e.name:e.uuid,c=[];Ir[o.path]===Ir.weights?e.traverse(function(h){h.morphTargetInfluences&&c.push(h.name?h.name:h.uuid)}):c.push(a);let l;switch(Ir[o.path]){case Ir.weights:l=pi;break;case Ir.rotation:l=Qn;break;case Ir.position:case Ir.scale:l=mi;break;default:n.itemSize===1?l=pi:l=mi;break}let u=r.interpolation!==void 0?ob[r.interpolation]:Wi,d=this._getArrayFromAccessor(n);for(let h=0,p=c.length;h<p;h++){let g=new l(c[h]+"."+Ir[o.path],t.array,d,u);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),s.push(g)}return s}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Mh(t.constructor),r=new Float32Array(t.length);for(let o=0,s=t.length;o<s;o++)r[o]=t[o]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let r=this instanceof Qn?vh:hl;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function hb(i,e,t){let n=e.attributes,r=new ht;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(r.set(new L(c[0],c[1],c[2]),new L(l[0],l[1],l[2])),a.normalized){let u=Mh(ls[a.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let o=e.targets;if(o!==void 0){let a=new L,c=new L;for(let l=0,u=o.length;l<u;l++){let d=o[l];if(d.POSITION!==void 0){let h=t.json.accessors[d.POSITION],p=h.min,g=h.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),h.normalized){let x=Mh(ls[h.componentType]);c.multiplyScalar(x)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(a)}i.boundingBox=r;let s=new At;r.getCenter(s.center),s.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=s}function S_(i,e,t){let n=e.attributes,r=[];function o(s,a){return t.getDependency("accessor",s).then(function(c){i.setAttribute(a,c)})}for(let s in n){let a=Eh[s]||s.toLowerCase();a in i.attributes||r.push(o(n[s],a))}if(e.indices!==void 0&&!i.index){let s=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});r.push(s)}return Ke.workingColorSpace!==pt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ke.workingColorSpace}" not supported.`),Dr(i,e),hb(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?ab(i,e.targets,t):i})}var Th=new WeakMap,ds=class extends hn{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,r){let o=new sr(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,s=>{this.parse(s,t,r)},n,r)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,nt).catch(n)}decodeDracoFile(e,t,n,r,o=pt,s=()=>{}){let a={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:r||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:o};return this.decodeGeometry(e,a).then(t).catch(s)}decodeGeometry(e,t){let n=JSON.stringify(t);if(Th.has(e)){let c=Th.get(e);if(c.key===n)return c.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let r,o=this.workerNextTaskID++,s=e.byteLength,a=this._getWorker(o,s).then(c=>(r=c,new Promise((l,u)=>{r._callbacks[o]={resolve:l,reject:u},r.postMessage({type:"decode",id:o,taskConfig:t,buffer:e},[e])}))).then(c=>this._createGeometry(c.geometry));return a.catch(()=>!0).then(()=>{r&&o&&this._releaseTask(r,o)}),Th.set(e,{key:n,promise:a}),a}_createGeometry(e){let t=new Je;e.index&&t.setIndex(new $e(e.index.array,1));for(let n=0;n<e.attributes.length;n++){let r=e.attributes[n],o=r.name,s=r.array,a=r.itemSize,c=new $e(s,a);o==="color"&&(this._assignVertexColorSpace(c,r.vertexColorSpace),c.normalized=!(s instanceof Float32Array)),t.setAttribute(o,c)}return t}_assignVertexColorSpace(e,t){if(t!==nt)return;let n=new ge;for(let r=0,o=e.count;r<o;r++)n.fromBufferAttribute(e,r).convertSRGBToLinear(),e.setXYZ(r,n.r,n.g,n.b)}_loadLibrary(e,t){let n=new sr(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((r,o)=>{n.load(e,r,void 0,o)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;let e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{let r=n[0];e||(this.decoderConfig.wasmBinary=n[1]);let o=fb.toString(),s=["/* draco decoder */",r,"","/* worker */",o.substring(o.indexOf("{")+1,o.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([s]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){let r=new Worker(this.workerSourceURL);r._callbacks={},r._taskCosts={},r._taskLoad=0,r.postMessage({type:"init",decoderConfig:this.decoderConfig}),r.onmessage=function(o){let s=o.data;switch(s.type){case"decode":r._callbacks[s.id].resolve(s);break;case"error":r._callbacks[s.id].reject(s);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+s.type+'"')}},this.workerPool.push(r)}else this.workerPool.sort(function(r,o){return r._taskLoad>o._taskLoad?-1:1});let n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}};function fb(){let i,e;onmessage=function(s){let a=s.data;switch(a.type){case"init":i=a.decoderConfig,e=new Promise(function(u){i.onModuleLoaded=function(d){u({draco:d})},DracoDecoderModule(i)});break;case"decode":let c=a.buffer,l=a.taskConfig;e.then(u=>{let d=u.draco,h=new d.Decoder;try{let p=t(d,h,new Int8Array(c),l),g=p.attributes.map(x=>x.array.buffer);p.index&&g.push(p.index.array.buffer),self.postMessage({type:"decode",id:a.id,geometry:p},g)}catch(p){console.error(p),self.postMessage({type:"error",id:a.id,error:p.message})}finally{d.destroy(h)}});break}};function t(s,a,c,l){let u=l.attributeIDs,d=l.attributeTypes,h,p,g=a.GetEncodedGeometryType(c);if(g===s.TRIANGULAR_MESH)h=new s.Mesh,p=a.DecodeArrayToMesh(c,c.byteLength,h);else if(g===s.POINT_CLOUD)h=new s.PointCloud,p=a.DecodeArrayToPointCloud(c,c.byteLength,h);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!p.ok()||h.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+p.error_msg());let x={index:null,attributes:[]};for(let m in u){let f=self[d[m]],v,_;if(l.useUniqueIDs)_=u[m],v=a.GetAttributeByUniqueId(h,_);else{if(_=a.GetAttributeId(h,s[u[m]]),_===-1)continue;v=a.GetAttribute(h,_)}let T=r(s,a,h,m,f,v);m==="color"&&(T.vertexColorSpace=l.vertexColorSpace),x.attributes.push(T)}return g===s.TRIANGULAR_MESH&&(x.index=n(s,a,h)),s.destroy(h),x}function n(s,a,c){let u=c.num_faces()*3,d=u*4,h=s._malloc(d);a.GetTrianglesUInt32Array(c,d,h);let p=new Uint32Array(s.HEAPF32.buffer,h,u).slice();return s._free(h),{array:p,itemSize:1}}function r(s,a,c,l,u,d){let h=d.num_components(),g=c.num_points()*h,x=g*u.BYTES_PER_ELEMENT,m=o(s,u),f=s._malloc(x);a.GetAttributeDataArrayForAllPoints(c,d,m,x,f);let v=new u(s.HEAPF32.buffer,f,g).slice();return s._free(f),{name:l,array:v,itemSize:h}}function o(s,a){switch(a){case Float32Array:return s.DT_FLOAT32;case Int8Array:return s.DT_INT8;case Int16Array:return s.DT_INT16;case Int32Array:return s.DT_INT32;case Uint8Array:return s.DT_UINT8;case Uint16Array:return s.DT_UINT16;case Uint32Array:return s.DT_UINT32}}}var fl=class extends to{constructor(e=null){super();let t=new Zn;t.deleteAttribute("uv");let n=new tn({side:bt}),r=new tn,o=5;e!==null&&e._useLegacyLights===!1&&(o=900);let s=new xi(16777215,o,28,2);s.position.set(.418,16.199,.3),this.add(s);let a=new Ge(t,n);a.position.set(-.757,13.219,.717),a.scale.set(31.713,28.305,28.591),this.add(a);let c=new Ge(t,r);c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),this.add(c);let l=new Ge(t,r);l.position.set(-5.607,-.754,-.758),l.rotation.set(0,.994,0),l.scale.set(1.97,1.534,3.955),this.add(l);let u=new Ge(t,r);u.position.set(6.167,.857,7.803),u.rotation.set(0,.561,0),u.scale.set(3.927,6.285,3.687),this.add(u);let d=new Ge(t,r);d.position.set(-2.017,.018,6.124),d.rotation.set(0,.333,0),d.scale.set(2.002,4.566,2.064),this.add(d);let h=new Ge(t,r);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);let p=new Ge(t,r);p.position.set(-2.193,-.369,-5.547),p.rotation.set(0,.516,0),p.scale.set(3.875,3.487,2.986),this.add(p);let g=new Ge(t,hs(50));g.position.set(-16.116,14.37,8.208),g.scale.set(.1,2.428,2.739),this.add(g);let x=new Ge(t,hs(50));x.position.set(-16.109,18.021,-8.207),x.scale.set(.1,2.425,2.751),this.add(x);let m=new Ge(t,hs(17));m.position.set(14.904,12.198,-1.832),m.scale.set(.15,4.265,6.331),this.add(m);let f=new Ge(t,hs(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);let v=new Ge(t,hs(20));v.position.set(3.235,11.486,-12.541),v.scale.set(2.5,2,.1),this.add(v);let _=new Ge(t,hs(100));_.position.set(0,20,0),_.scale.set(1,.1,1),this.add(_)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function hs(i){let e=new Ut;return e.color.setScalar(i),e}var Ur=(i,e)=>{let t=parseFloat(new URLSearchParams(location.search).get(i));return Number.isFinite(t)?t:e},Li={safeTopRatio:Ur("coinTop",.13),gapRatio:Ur("coinGap",.045),fillRatio:Ur("coinFill",.78),bandAnchor:Ur("coinAnchor",.47),coinWidthRatio:Ur("coinWide",.4),maxSizeRatio:Ur("coinSize",.42),minSizeRatio:Ur("coinMin",.2),centerYRatio:Ur("coinY",.31)},pl=-2,ml=pl-4.3,fe={camera:{fov:38,x:0,y:.6,z:5.8},lights:{ambient:{color:16774367,intensity:.25},key:{color:16771248,intensity:2.2,x:3.5,y:4.5,z:4.5},fill:{color:11059432,intensity:.5,x:-4,y:1.5,z:3},rim:{color:16766826,intensity:1.5,x:-2.5,y:3.5,z:-4},front:{color:16773576,intensity:1,x:0,y:.8,z:5.5}},exposure:1.08,coin:{scale:2.15,swaySpeedY:.45,tiltBase:-.05,tiltOscillation:.025,tiltSpeed:.5,floatAmount:.04,floatSpeed:.7,baseY:1.05,color:"#ffd76a",metalness:1,roughness:.22,envMapIntensity:1.05,emissive:"#3d2508",emissiveIntensity:.05},door:{widthVsCoin:2.75,groundY:.15,baseX:0,baseZ:0,heroBaseZ:-.85,doorDepthSquash:.55,maxDepthWorld:3,shadowWidthMul:1.3,shadowDepthMul:2.2,color:"#ffd76a",metalness:1,roughness:.22,envMapIntensity:1.3,emissive:"#3d2508",emissiveIntensity:.05,leaf:{hero:{metalness:.12,roughness:.92,envMapIntensity:.12},meet:{metalness:.88,roughness:.5,envMapIntensity:.54},cross:{metalness:.95,roughness:.38,envMapIntensity:.72},meetOrn:{metalness:.95,roughness:.28,envMapIntensity:.88},crossOrn:{metalness:1,roughness:.23,envMapIntensity:1.05},meetDark:{metalness:.55,roughness:.72,envMapIntensity:.18},crossDark:{metalness:.65,roughness:.64,envMapIntensity:.24}},frameAnim:{hero:{metalness:.06,roughness:.9,envMapIntensity:.24,bumpScale:.045},meet:{metalness:.04,roughness:.88,envMapIntensity:.22,bumpScale:.03}},spots:{key:{color:16769973,intensity:120,angle:.45,penumbra:.5,decay:1.2,distance:0,x:1.2,y:5.5,z:2.5,tx:0,ty:.2,tz:0},rim:{color:9484799,intensity:45,angle:.6,penumbra:.7,decay:1.2,distance:0,x:-4.5,y:4,z:-4.5,tx:0,ty:-.2,tz:0},under:{color:16759424,intensity:12,angle:.9,penumbra:.8,decay:1.6,distance:0,x:0,y:-2,z:2.2,tx:0,ty:-.3,tz:0}},fog:725021,fogDensity:.08,transition:"doorway",roomCamZ:pl,roomCamY:.62,roomLook:{x:0,y:.55,z:pl-1.5},roomLight:{color:16760435,intensity:11,x:0,y:.9,z:pl+.05},veilFog:.06,exitFog:.16,exitFogSink:.14,fovKick:4,roomSwarm:{x:0,y:.55,leadOut:1.2,lead:2,scale:.35},funnel:{z:-.89,cx:0,cy:1.3,halfW:.42,halfH:.85,window:[.3,.52,.86,.98],depth:1.5,squeeze:.75,zSqueeze:.6},aimDoorT:[0,.45],aimRoomT:[.55,.95],leafFadeT:[.84,.94]},doorText:{bottomOffset:"9vh",horizontalOffset:"0px",maxWidth:"min(47rem, 90vw)",titleSize:"var(--fs-kicker)",textSize:"var(--fs-display)",gap:"1.4rem"},interaction:{hoverRadius:.075,hoverDelayMs:90,touchRadiusMul:2.2},room:{figure:{x:0,z:ml},orbit:{count:12,trail:58,trailStep:.085,headSize:.15,tailSize:.08,minRadius:.46,maxRadius:.95,minY:.44,maxY:1.12,tilt:34,speed:.24,precession:.028,opacity:.82,neutralDim:.78},swarm:{ambientFloor:.62,stageFloor:.62,stageFalloff:.38,figureFloor:.6,chroma:1.16,nearFade:[.35,1.2]},accentIntensity:26,fillIntensity:10}};fe.door.widthVsCoin=4.2,fe.door.fogDensity=.026,fe.door.doorDepthSquash=.72,fe.door.maxDepthWorld=4.8,fe.camera.fov=32,fe.camera.y=1.55,fe.camera.z=7.7,fe.door.approachCamY=.62,fe.door.approachCamZ=fe.camera.z,fe.exposure=.94,fe.door.spots.key={color:16769973,intensity:15,angle:.72,penumbra:.62,decay:1.35,distance:0,x:-3.8,y:3.5,z:4.4,tx:0,ty:.2,tz:0},fe.door.spots.rim={color:10465995,intensity:6.5,angle:.8,penumbra:.75,decay:1.35,distance:0,x:3.5,y:1.6,z:2,tx:0,ty:.1,tz:-.35},fe.door.spots.under={color:16761455,intensity:4.4,angle:.7,penumbra:.85,decay:1.6,distance:0,x:0,y:.5,z:2.9,tx:0,ty:.25,tz:0};var A_=[{id:"soporte",label:"Pedestal",subtitle:"Base de la pieza central",glb:"figures/soporte.glb",available:!0,x:0,y:0,z:ml,scale:.7,stretchY:1.6,color:10135229,finish:{metalness:.05,roughness:.7,color:4344931}},{id:"balanza",label:"Balanza",subtitle:"Equilibrio hawkish / dovish",glb:"figures/balanza.glb",available:!0,x:0,y:0,z:ml,standsOn:"soporte",centerOn:"base",scale:1,color:16766826,finish:{metalness:0,roughness:.82,color:13089188}},{id:"inflacion",label:"Vela de precios",subtitle:"Presi\xF3n inflacionaria",glb:"figures/inflacion.glb",available:!1,x:-4.8,y:0,z:-3.2,scale:1,color:16747100},{id:"brote",label:"Brote",subtitle:"Crecimiento y holgura",glb:"figures/brote.glb",available:!1,x:4.8,y:0,z:-3.2,scale:1,color:9090296},{id:"acta",label:"Acta",subtitle:"Fuente trazable",glb:"figures/acta.glb",available:!1,x:0,y:0,z:-6.4,scale:.9,color:13620964},{id:"corpus",label:"Corpus",subtitle:"182 reuniones de referencia",glb:"figures/corpus.glb",available:!1,x:-4.6,y:0,z:-5.6,scale:.8,color:13620964},{id:"campana",label:"Campana",subtitle:"Inicio y cierre de sesi\xF3n",glb:"figures/campana.glb",available:!1,x:4.6,y:0,z:-5.6,scale:.8,color:16766826}];function R_(i,{onReady:e=null,debug:t=!1,dracoLoader:n=null}={}){let r=new Map,o=new St;o.name="dioramas",i.add(o);let s=n||(()=>{let m=new ds;return m.setDecoderPath("js/vendor/draco/"),m})(),a=new us;a.setDRACOLoader(s);let c=new tn({color:9081766,metalness:.55,roughness:.35,transparent:!0,opacity:.6}),l=new Ut({color:16766826,wireframe:!0,transparent:!0,opacity:.22}),u=new Ut({color:16766826,transparent:!0,opacity:.08,side:It});function d(m,f=.06){m.updateMatrixWorld(!0);let v=new ht().setFromObject(m),_=v.min.y+(v.max.y-v.min.y)*f,T=[],A=[],b=new L;if(m.traverse(P=>{let E=P.isMesh?P.geometry?.attributes?.position:null;if(E)for(let w=0;w<E.count;w++)b.fromBufferAttribute(E,w).applyMatrix4(P.matrixWorld),b.y<=_&&(T.push(b.x),A.push(b.z))}),T.length<8)return null;let S=P=>{P.sort((I,O)=>I-O);let E=P[Math.floor(P.length*.05)],w=P[Math.min(P.length-1,Math.floor(P.length*.95))];return(E+w)/2};return{x:S(T),z:S(A)}}function h(m){let f=new Ge(new ra(.2,0),c);f.material=c.clone(),f.userData={...m,pending:!0};let v=new Ge(new ra(.27,1),l),_=new Ge(new nl(.31,.38,32),u.clone());return _.rotation.x=-Math.PI/2,f.add(v),f.add(_),f}function p(){return document.getElementById("figureCabinet")}A_.forEach(m=>{if(!t&&!m.available)return;let f=new St;f.name=`figure--${m.id}`,f.position.set(m.x,m.y,m.z),f.visible=!0,o.add(f);let v={def:m,root:f,model:null,status:"searching"};r.set(m.id,v);let _=A=>{let b=A.scene;b.updateMatrixWorld(!0);let S=new ht().setFromObject(b),P=S.getSize(new L),E=Math.max(P.x,P.y,P.z)||1,w=m.scale/E;b.scale.setScalar(w),m.stretchY&&(b.scale.y*=m.stretchY),S.setFromObject(b);let I=S.getCenter(new L),O=I.x,te=I.z;if(m.centerOn==="base"){let D=d(b,m.footprintSlab??.06);D&&(O=D.x,te=D.z)}b.position.x-=O,b.position.z-=te,b.position.y-=S.min.y,S.setFromObject(b),v.height=S.max.y-S.min.y,b.traverse(D=>{if(!D.isMesh||!D.material)return;(Array.isArray(D.material)?D.material:[D.material]).filter(Boolean).forEach(X=>{let z=m.finish,V=z?.metalness??.82,j=z?.roughness??.24;"metalness"in X&&(X.metalness=V),"roughness"in X&&(X.roughness=j),X.color=X.color||new ge,z?.color!=null?X.color.set(z.color):D.name.toLowerCase().includes("gold")||D.name.toLowerCase().includes("oro")?X.color.set(16766826):(D.name.toLowerCase().includes("blue")||D.name.toLowerCase().includes("azul"))&&X.color.set(9090296),X.needsUpdate=!0})}),f.clear(),f.add(b),v.model=b,v.status="loaded",g(),x(m,"ready"),e?.(v)},T=()=>{v.status="pending";let A=h(m);f.add(A),v.placeholder=A,x(m,"pending"),e?.(v)};m.available?(t&&x(m,"searching"),a.loadAsync(m.glb).then(_).catch(()=>{t&&T()})):t&&T()});function g(){r.forEach(m=>{let f=m.def.standsOn?r.get(m.def.standsOn):null;if(!f)return;let v=f.height??0;m.root.position.y=(m.def.y??0)+(f.def.y??0)+v})}function x(m,f){let v=p();if(!v)return;let _=v.querySelector(`[data-figure="${m.id}"]`);_||(_=document.createElement("div"),_.className="figure-row",_.dataset.figure=m.id,_.innerHTML=`<span class="figure-row-dot"></span><span class="figure-row-name">${m.label}</span><span class="figure-row-status">\u2026</span>`,v.appendChild(_));let T=_.querySelector(".figure-row-status");T&&(f==="ready"?(_.classList.add("is-ready"),T.textContent="listo"):f==="pending"?(_.classList.add("is-pending"),T.textContent="por modelar"):(_.classList.add("is-searching"),T.textContent="buscando\u2026"))}return{group:o,figures:r,defs:A_,restack:g}}function L_(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),o={},s={},a=i[0].morphTargetsRelative,c=new Je,l=0;for(let u=0;u<i.length;++u){let d=i[u],h=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in d.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;o[p]===void 0&&(o[p]=[]),o[p].push(d.attributes[p]),h++}if(h!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in d.morphAttributes){if(!r.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;s[p]===void 0&&(s[p]=[]),s[p].push(d.morphAttributes[p])}if(e){let p;if(t)p=d.index.count;else if(d.attributes.position!==void 0)p=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,u),l+=p}}if(t){let u=0,d=[];for(let h=0;h<i.length;++h){let p=i[h].index;for(let g=0;g<p.count;++g)d.push(p.getX(g)+u);u+=i[h].attributes.position.count}c.setIndex(d)}for(let u in o){let d=C_(o[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,d)}for(let u in s){let d=s[u][0].length;if(d===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let h=0;h<d;++h){let p=[];for(let x=0;x<s[u].length;++x)p.push(s[u][x][h]);let g=C_(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function C_(i){let e,t,n,r=-1,o=0;for(let l=0;l<i.length;++l){let u=i[l];if(u.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;o+=u.array.length}let s=new e(o),a=0;for(let l=0;l<i.length;++l)s.set(i[l].array,a),a+=i[l].array.length;let c=new $e(s,t,n);return r!==void 0&&(c.gpuType=r),c}var Nt=3.5,Wt=6.2,co=Nt/2,Sh=.12,gl=.2,yl=.16,P_=.36,vl=5,I_=3.35,xl=Nt/2+.06+.26+.14,_l=2.35,wn=yl*vl;function _i(i,e,t,n={}){return new tn({color:i,metalness:e,roughness:t,...n})}var wh={stone:_i(6709594,.05,.9),stone_dark:_i(4867650,.05,.92),granite:_i(2762532,.1,.6),marble:_i(9207920,.05,.3),medal:_i(13211455,1,.35),bronze:_i(9071164,1,.38),bronze_dark:_i(4864032,1,.55),bronze_matte:_i(6966828,.9,.6),glow:new tn({color:2363653,emissive:16749632,emissiveIntensity:.6,roughness:1,metalness:0})},D_={bronze:_i(9071164,1,.38),bronze_dark:_i(4864032,1,.55),bronze_matte:_i(6966828,.9,.6)};function U_(){let i=new Map,e=new Map,t={},n=(T,A)=>{if(!T)return A;let b=T==="Door_L"?-Nt/2:Nt/2;return new Ue().makeTranslation(-b,0,-wn).multiply(A)},r=(T,A,b)=>`${T}|${A}|${b||""}`;function o(T,A,b,S,P){let E=S.clone();E.applyMatrix4(n(b,P||new Ue));let w=r(T,A,b);i.has(w)||i.set(w,[]),i.get(w).push(E)}let s=(T,A,b,S=0,P=0,E=0)=>{let w=new Ue,I=new Qt().setFromEuler(new br(S,P,E));return w.compose(new L(T,A,b),I,new L(1,1,1)),w};function a(T,A,b,S,P,E,w,I,O,te){o(T,A,b,new Zn(w,I,O),s(S,P,E,...te||[0,0,0]))}function c(T,A,b,S,P,E,w,I,O="Z",te=20,D=null){let G={Z:[0,0,0],Y:[Math.PI/2,0,0],X:[0,0,Math.PI/2]}[O];o(T,A,b,new ia(w,w,I,te),s(S,P,E,...D||G))}function l(T,A,b,S,P,E,w,I,O="Z",te=20){let D=O==="Y"?[Math.PI/2,0,0]:O==="X"?[0,Math.PI/2,0]:[0,0,0];o(T,A,b,new il(w,I,10,te),s(S,P,E,...D))}function u(T,A,b,S,P,E,w,I,O,te,D=10,G=7){let X=new oa(.5,D,G),z=s(S,P,E,...te||[0,0,0]),V=new Ue().makeScale(w,I,O);z.multiply(V),o(T,A,b,X,z)}function d(T,A,b,S){e.has(T)||e.set(T,[]),e.get(T).push(n(T,s(A,b,S)))}function h(T,A,b,S,P,E,w){let I=-Sh/2;a("bronze_matte","leaf",A,b,I-.01,S,P,.02,E);let O=.07,te=.05;a("bronze","leaf",A,b,I-te/2+.01,S+E/2-O/2,P,te,O),a("bronze","leaf",A,b,I-te/2+.01,S-E/2+O/2,P,te,O),a("bronze","leaf",A,b-P/2+O/2,I-te/2+.01,S,O,te,E-2*O),a("bronze","leaf",A,b+P/2-O/2,I-te/2+.01,S,O,te,E-2*O);let D=.016,G=D*4.2,X=b-P/2+O+D,z=b+P/2-O-D,V=S-E/2+O+D,j=S+E/2-O-D,ce=Math.max(2,Math.round((z-X)/G)),se=Math.max(2,Math.round((j-V)/G));for(let N=0;N<=ce;N++){let q=X+(z-X)*N/ce;d(A,q,I-.008,V),d(A,q,I-.008,j)}for(let N=1;N<se;N++){let q=V+(j-V)*N/se;d(A,X,I-.008,q),d(A,z,I-.008,q)}let F=I;if(w==="rosette"){let N=Math.min(P,E)*.62;a("bronze","leaf",A,b,F-.02,S,N,.04,N),a("bronze_dark","leaf",A,b,F-.045,S,N*.78,.02,N*.78),c("bronze","leaf",A,b,F-.075,S,N*.16,.05,"Y",16),u("bronze","leaf",A,b,F-.1,S,N*.14,N*.14,N*.14);for(let q=0;q<8;q++){let de=q*2*Math.PI/8;u("bronze","leaf",A,b+Math.cos(de)*N*.24,F-.07,S+Math.sin(de)*N*.24,N*.18,.04,N*.32,[0,-de+Math.PI/2,0],8,6)}for(let[q,de]of[[-1,-1],[1,-1],[-1,1],[1,1]])u("bronze","leaf",A,b+q*N*.33,F-.06,S+de*N*.33,N*.2,.04,N*.12,[0,Math.atan2(de,q)+Math.PI/2,0],8,6)}else if(w==="knocker"){let N=F-.02,q=S+.1;u("bronze","leaf",A,b,N-.02,q+.12,.056,.04,.19,null,12,8);for(let de of[-1,1])u("bronze","leaf",A,b+de*.05,N-.02,q+.1,.044,.036,.14,[0,de*-.52,0],12,8),u("bronze","leaf",A,b+de*.078,N-.02,q+.06,.044,.032,.06,[0,de*-1.3,0],8,6),u("bronze","leaf",A,b+de*.035,N-.02,q-.02,.032,.03,.07,[0,de*.52,0],8,6);a("bronze","leaf",A,b,N-.025,q+.02,.11,.03,.03),u("bronze","leaf",A,b,N-.02,q-.03,.036,.03,.09,null,8,6),c("bronze_dark","leaf",A,b,N-.05,q-.06,.018,.06,"X",12),l("bronze","leaf",A,b,N-.05,q-.19,.13,.024,"Y",20),a("bronze","leaf",A,b,N-.05,q-.32,.05,.05,.05)}}function p(T,A){let b=Math.sign(A)*Nt/2,S=new Xe;S.name=`${T}_Pivot`,S.position.set(b,0,wn),S.userData.openSign=A<0?1:-1;let P=T,E=wn,w=E+Wt/2;a("bronze","leaf",P,A,0,w,co,Sh,Wt);let I=-Sh/2,O=co-2*gl;a("bronze","leaf",P,A,I-.015,E+.32,co-.04,.03,.62);let te=E+.65+gl+1.45/2,D=te+1.45/2+gl+2.05/2,G=D+2.05/2+gl+1.05/2;h(`${P}_Bottom`,P,A,te,O,1.45,"rosette"),h(`${P}_Middle`,P,A,D,O,2.05,"knocker"),h(`${P}_Top`,P,A,G,O,1.05,"rosette");let X=A-Math.sign(A)*(co/2-.1);a("bronze_dark","leaf",P,X,I-.01,E+2.95,.06,.02,.3);let z=A+Math.sign(A)*(co/2+.02);for(let V of[.7,2.4,4.1,5.7])c("bronze_dark","leaf",P,z,I+.02,E+V,.035,.28,"Z",10);return t[T]=S,S}function g(T,A,b,S){let P="facade";a("stone",P,null,A,-.28/2-.05,b+1.1/2,.95+.16,.28+.1,1.1),a("stone",P,null,A,-.28/2-.08,b+1.1+.06,.95+.26,.28+.16,.12);let O=b+1.1+.12,te=1,D=S-te-O;a("stone",P,null,A,-.28/2,O+D/2,.95,.28,D);for(let X of[-.95*.28,0,.95*.28])a("stone_dark",P,null,A+X,-.28-.005,O+D/2,.95*.12,.02,D-.5);let G=O+D;a("stone",P,null,A,-.28/2-.02,G+.04,.95+.06,.28+.04,.08),o("stone",P,null,new ia(.95*.56,.95*.38,.6,14),s(A,-.28/2,G+.36,Math.PI/2));for(let[X,z,V]of[[.26,5,-.2],[.5,4,-.08]])for(let j=0;j<z;j++){let ce=A-.475+.95*(j+.5)/z;u("stone",P,null,ce,-.28+.02,G+X,.17,.1,.44,[V,0,0],8,6)}for(let X of[-1,1])l("stone",P,null,A+X*(.95/2-.06),-.28-.1,G+.66,.12,.05,"Y",14);a("stone",P,null,A,-.28/2-.06,G+te-.07,.95+.36,.28+.16,.14)}{let b=wn+Wt+1.15+1.1,S=b+.5,P=wn+Wt+.75,E=(8.6-Nt)/2;for(let w of[-1,1])a("stone","facade",null,w*(Nt/2+E/2),.5,S/2,E,1,S);a("stone","facade",null,0,.5,(P+S)/2,Nt+.02,1,S-P),a("granite","facade",null,0,-.1,wn/2,8.6,.2,wn);for(let w of[-1,1])g(`Pilaster_${w}`,w*I_,wn,b);a("stone","facade",null,0,-.3,b+.25,8.6,.6,.5)}{let T=wn,A=.55,b=.3,S=.75;for(let te of[-1,1]){let D=te*(Nt/2+A/2);a("stone","frame",null,D,-b/2,T+Wt/2,A,b,Wt),a("stone","frame",null,te*(Nt/2+.16),-b-.015,T+Wt/2,.2,.03,Wt)}a("stone","frame",null,0,-b/2,T+Wt+S/2,Nt+2*A,b,S),a("stone","frame",null,0,-b-.015,T+Wt+.08,Nt+.48,.03,.16),a("stone","frame",null,0,-b-.12,T+Wt+S+.08,Nt+2*A+.4,.24+b,.16);let P=.06;a("bronze","frame",null,0,-b/2-.02,T+Wt+P/2,Nt+2*P,b+.04,P);for(let te of[-1,1])a("bronze","frame",null,te*(Nt/2+P/2),-b/2-.02,T+Wt/2,P,b+.04,Wt);let E=Nt/2+A,I=I_-.95/2-.08-E+.02,O=Wt+S+.16;for(let te of[-1,1])a("stone","frame",null,te*(E+I/2-.01),-b/2+.031,T+O/2,I,b-.06,O);c("medal","medal",null,-xl,-b-.02,T+_l+.35,.1,.03,"Z",24),l("medal","medal",null,-xl,-b-.045,T+_l+.35,.08,.01,"Y",24),c("medal","medal",null,xl,-b-.02,T+_l+.35,.1,.03,"Z",24),l("medal","medal",null,xl,-b-.045,T+_l+.35,.08,.01,"Y",24)}{let T=Nt+1.1+.9,A=P_*vl+.6;for(let S=0;S<vl;S++){let P=P_*(vl-S)+.6,E=yl*(S+.5);a("granite","frame",null,0,-P/2,E,T,P,yl),a("granite","frame",null,0,-P-.015,E+yl/2-.02,T,.03,.04)}let b=.45;for(let S of[-1,1]){let P=S*(T/2+b/2);a("stone","frame",null,P,-A/2,wn/2+.06,b,A,wn+.12),a("stone","frame",null,P,-A/2,wn+.16,b+.08,A+.08,.08)}a("bronze_dark","frame",null,0,-.05,wn+.01,Nt+.1,.3,.02)}{let T=wn,A=5,b=5,S=Wt+1;a("stone_dark","interior",null,0,A/2+.1,T-.05,b,A,.1),a("stone_dark","interior",null,0,A/2,T+S+.05,b,A,.1);for(let P of[-1,1])a("stone_dark","interior",null,P*(b/2+.05),A/2,T+S/2,.1,A,S);a("stone_dark","interior",null,0,.3,T+Wt+.5,b,.4,1);for(let P of[-1,1])a("stone_dark","interior",null,P*(Nt/2+(b-Nt)/4),.3,T+Wt/2,(b-Nt)/2,.4,Wt);a("glow","glow",null,0,A-.15,T+3.25,4.7,.05,6.7)}let x=p("Door_L",-co/2),m=p("Door_R",co/2),f=new St;f.name="CentralBankDoor";let v={Door_L:x,Door_R:m};for(let[T,A]of i){let[b,S,P]=T.split("|"),E=L_(A,!1);if(!E)continue;let w=(S==="leaf"?D_:wh)[b]||wh[b],I=new Ge(E,w);I.name=`${S}_${b}${P?"_"+P:""}`,I.userData.role=S,I.userData.matName=b,I.matrixAutoUpdate=!1,I.matrix.identity(),(P?v[P]:f).add(I)}let _=new oa(.012,6,4);for(let[T,A]of e){let b=new oo(_,D_.bronze,A.length);A.forEach((S,P)=>b.setMatrixAt(P,S)),b.instanceMatrix.needsUpdate=!0,b.name=`leaf_beads_${T}`,b.userData.role="leaf",b.userData.matName="bronze",v[T].add(b)}return f.add(x,m),f.updateMatrixWorld(!0),{group:f,pivotL:x,pivotR:m,glowMat:wh.glow}}ga();fs();var Sl=[],Lh=[],Ph=[],xa=!1,ps=!1,O_=!1,pb=4e3,mb=350,gb=800;function H_(i=mb){return new Promise(e=>{if(O_){setTimeout(e,0);return}typeof requestIdleCallback=="function"?requestIdleCallback(()=>e(),{timeout:i}):setTimeout(e,Math.min(i,200))})}function F_(i){H_(gb).then(i)}function k_(){if(!xa)if(xa=!0,document.readyState==="complete")F_(wl);else{let i=()=>F_(wl);window.addEventListener("load",i,{once:!0}),setTimeout(i,pb)}}async function wl(){for(;Sl.length;){await H_();let i=Sl.shift();try{await i()}catch(e){console.warn("Tarea diferida del arranque incompleta:",e)}}for(ps=!0;Lh.length;){let i=Lh.shift();try{i()}catch(e){console.warn("Aviso tras el arranque diferido:",e)}}for(;Ph.length;)Ph.shift()()}function z_(){O_=!0,xa||(xa=!0,wl())}function G_(){return ps?Promise.resolve():new Promise(i=>Ph.push(i))}function uo(i){Sl.push(i),ps?(ps=!1,wl()):k_()}function V_(i){ps?i():Lh.push(i)}var W_=()=>({pending:Sl.length,started:xa,finished:ps});k_();ms();var Uh=new Map;function _a(i){if(Uh.has(i))return Uh.get(i);let e=typeof fetch!="function"?Promise.resolve(null):fetch(`data/web/${i}.json`,{cache:"no-cache"}).then(t=>t.ok?t.json():null).catch(()=>null).then(t=>t&&typeof t=="object"?t:null);return Uh.set(i,e),e}var xs=null;function Na(){return xs||(window.d3?(xs=Promise.resolve(window.d3),xs):(xs=new Promise((i,e)=>{let t=document.createElement("script");t.src="js/vendor/d3.min.js",t.async=!0,t.onload=()=>i(window.d3),t.onerror=()=>e(new Error("No se pudo cargar js/vendor/d3.min.js")),document.head.appendChild(t)}),xs))}gsap.registerPlugin(ScrollTrigger,CustomEase,SplitText);CustomEase.create("cinematicIn","0.22,1,0.36,1");CustomEase.create("cinematicOut","0.61,1,0.88,1");CustomEase.create("cinematicInOut","0.65,0,0.35,1");CustomEase.create("cinematicSilk","0.45,0.05,0.55,0.95");CustomEase.create("cinematicSnap","0.16,1,0.3,1");"scrollRestoration"in history&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("load",()=>{window.scrollY!==0&&window.scrollTo(0,0)});window.addEventListener("pageshow",i=>{i.persisted&&window.scrollTo(0,0)});var Eo=/[?&]debug\b/.test(location.search);if(!Eo)["debugPanel","timelineScrubber","figureCabinet"].forEach(i=>{let e=document.getElementById(i);e&&(e.style.display="none")});else{let i=document.getElementById("figureCabinet");i&&(i.style.display="block")}var ni=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,Sb=ni?0:1;await Promise.race([new Promise(i=>requestAnimationFrame(()=>requestAnimationFrame(i))),new Promise(i=>setTimeout(i,100))]);var Ia=document.getElementById("canvas"),Mi=document.getElementById("load"),Oy=!1;function Af(){Oy=!0,Mi&&Mi.classList.add("hidden")}var Jh=document.getElementById("haloWrap"),Ll=document.getElementById("objectReflection"),ry=document.getElementById("scrollHint"),Hy=document.getElementById("hero"),Ma=document.querySelector(".hero-title");function Rf(){let i=Ma?.querySelector("h1");if(!i)return;let e=Math.max(window.devicePixelRatio||1,1),t=window.innerWidth/e;if(t<=900){let n=ne.clamp(t*.04,16,24);i.style.setProperty("font-size",`${n}px`,"important"),i.style.setProperty("line-height","1.16","important")}else i.style.removeProperty("font-size"),i.style.removeProperty("line-height")}Rf();function Cf(){let i=document.getElementById("stageObjectiveTitle"),e=document.getElementById("stageObjectiveParagraph"),t=Math.max(window.devicePixelRatio||1,1),n=window.innerWidth/t;if(n<=900||window.innerHeight<=760){let o=ne.clamp(n*.04,15,20),s=ne.clamp(n*.032,14,17);i?.style.setProperty("font-size",`${o}px`,"important"),e?.style.setProperty("font-size",`${s}px`,"important"),e?.style.setProperty("line-height","1.32","important")}else i?.style.removeProperty("font-size"),e?.style.removeProperty("font-size"),e?.style.removeProperty("line-height")}Cf();window.addEventListener("resize",Rf);window.addEventListener("resize",Cf);window.visualViewport&&window.visualViewport.addEventListener("resize",Rf);var Ds=1;function oy(i){i!==Ds&&(Ds=i,i===1?(Jh.classList.remove("hidden-stage"),ry.classList.remove("hidden")):(Jh.classList.add("hidden-stage"),ry.classList.add("hidden")),In.children.length>0&&(In.visible=i===1&&Or>.01),document.body.style.cursor=i===1?"grab":"")}var ky=new IntersectionObserver(i=>{i.forEach(e=>{e.isIntersecting&&(e.target===Hy?oy(1):oy(2))})},{threshold:.45});ky.observe(Hy);document.querySelectorAll(".stage-hook, .stage-voices, .stage-acts, .stage-counters, .stage-pipeline, .stage-timeline, .stage-quotes, .stage-closing, #stageObjective, #stageHook, #stageAxes, #stageRoomContainer").forEach(i=>ky.observe(i));var ut=new to,mo=.7;ut.fog=new Zs(fe.door?.fog??658970,0);var Jl=nn(),Mt=new ft(fe.camera.fov,Jl.width/Jl.height,.1,100);Mt.position.set(fe.camera.x,fe.camera.y,fe.camera.z);Mt.lookAt(0,.95,-.25);var tt=null,Ba=/HeadlessChrome|Headless/.test(navigator.userAgent),zy=typeof navigator.cpuPerformance=="number"?navigator.cpuPerformance:0,Ql=typeof navigator.deviceMemory=="number"&&navigator.deviceMemory<=4||zy===1,Ei=Math.min(window.devicePixelRatio||1,Ql?1:1.25),Dn=Ei,Us=!1,Gy=0;try{tt=new Ks({canvas:Ia,antialias:!Ql,alpha:!0,powerPreference:"high-performance"}),tt.setPixelRatio(Dn),tt.setSize(Jl.width,Jl.height),tt.outputColorSpace=nt,tt.toneMapping=Wa,tt.toneMappingExposure=fe.exposure,tt.shadowMap.enabled=!1,tt.debug.checkShaderErrors=Eo}catch{tt=null}tt||(Mi.innerHTML='<span style="opacity:.9">Tu dispositivo no soporta WebGL. Se muestra una versi&oacute;n simplificada.</span>');tt&&(Ia.addEventListener("webglcontextlost",i=>{i.preventDefault(),!Us&&(Mi.innerHTML='<span style="opacity:.9">Conexi&oacute;n WebGL perdida. Recargue la p&aacute;gina.</span>',Mi.style.display="flex")},!1),Ia.addEventListener("webglcontextrestored",()=>{Us||window.location.reload()},!1));var Qh="",Lf=!1,wb=/intel.*(hd graphics|uhd graphics|iris.{0,6}(xe|plus|pro)|gen[5-9])|adreno.*\b(3\d\d|4\d\d|5[01]\d|6[01]\d|64\d)\b|powervr|mali-t\d{2}|swiftshader|llvmpipe/i;if(tt)try{let i=tt.getContext(),e=i.getExtension("WEBGL_debug_renderer_info");e&&(Qh=String(i.getParameter(e.UNMASKED_RENDERER_WEBGL)||"")),Lf=wb.test(Qh)}catch{}if(Lf&&!Ba){Ei=Math.min(Ei,1),Dn=Ei;let i=nn();tt.setPixelRatio(Dn),tt.setSize(i.width,i.height,!1)}tt&&typeof navigator.getBattery=="function"&&!Ba&&navigator.getBattery().then(i=>{i&&!i.charging&&i.level<=.2&&Ei>1&&(Ei=Math.min(Ei,1),Sf(Math.min(Dn,Ei)))}).catch(()=>{});window.__D3_PERF={get gpu(){return Qh},get tier(){return tt?Lf||Ql?"lite":"high":"none"},lowMem:Ql,cpuTier:zy,headless:Ba,get armed(){return Ua},get frames(){return gv},get samples(){return po.length},get dpr(){return Dn},get cap(){return Ei},get poster(){return Us},get avgMs(){return Gy}};if(tt){let i=new Ar(tt);ut.environment=i.fromScene(new fl,.04).texture,i.dispose()}var sy=["map","normalMap","roughnessMap","metalnessMap","aoMap","emissiveMap","bumpMap","alphaMap","displacementMap","lightMap","envMap"],ay=new Set,Ab=0,ba=null,ef=!1,Pl=()=>new Promise(i=>setTimeout(i,0));function Vy(){return tt?ba?(ef=!0,ba):(ba=Rb(),ba):Promise.resolve()}async function Rb(){do{ef=!1;try{await Cb()}catch(i){console.warn("Precalentado de la escena incompleto:",i)}}while(ef);ba=null}async function Cb(){let i=`warmUpScene ${++Ab}`;try{performance.mark(`${i} start`)}catch{}let e=Ui?Ui.visible:null,t=[],n=new Set;try{ut.traverse(o=>{let s=Array.isArray(o.material)?o.material:o.material?[o.material]:[];for(let a=0;a<s.length;a++){let c=s[a];c&&c.transparent&&c.side===It&&c.forceSinglePass===!1&&(t.push(c),c.forceSinglePass=!0)}}),await Pl();for(let o of e===null?[!0]:[e,!e])Ui&&(Ui.visible=o),tt.compile(ut,Mt),ut.traverse(s=>{let a=Array.isArray(s.material)?s.material:s.material?[s.material]:[];for(let c=0;c<a.length;c++){let l=a[c];if(!l)continue;let u=tt.properties.get(l)?.currentProgram;u&&n.add(u)}}),await Pl();for(let o of n){try{o.getUniforms()}catch{}await Pl()}let r=[];ut.traverse(o=>{let s=Array.isArray(o.material)?o.material:o.material?[o.material]:[];for(let a=0;a<s.length;a++){let c=s[a];if(c)for(let l=0;l<sy.length;l++){let u=c[sy[l]];!u||!u.isTexture||ay.has(u.uuid)||(ay.add(u.uuid),r.push(u))}}});for(let o=0;o<r.length;o++)tt.initTexture(r[o]),o%4===3&&await Pl()}catch(r){console.warn("Precalentado de la escena incompleto:",r)}finally{for(let r=0;r<t.length;r++)t[r].forceSinglePass=!1;Ui&&(Ui.visible=e);try{performance.mark(`${i} end`),performance.measure("warmUpScene",`${i} start`,`${i} end`)}catch{}}}var xt=fe.lights,Wy=new da(xt.ambient.color,xt.ambient.intensity);ut.add(Wy);var Pf=new Ci(xt.key.color,xt.key.intensity);Pf.position.set(xt.key.x,xt.key.y,xt.key.z);var If=new Ci(xt.fill.color,xt.fill.intensity);If.position.set(xt.fill.x,xt.fill.y,xt.fill.z);var Df=new Ci(xt.rim.color,xt.rim.intensity);Df.position.set(xt.rim.x,xt.rim.y,xt.rim.z);var Uf=new Ci(xt.front.color,xt.front.intensity);Uf.position.set(xt.front.x,xt.front.y,xt.front.z);ut.add(Pf,If,Df,Uf);var Xy=new xi(16773576,.4,8);ut.add(Xy);var bs=new ds,Lb="https://www.gstatic.com/draco/versioned/decoders/1.5.6/",Pb="https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/",Oh=i=>(bs.dispose(),bs.decoderPending=null,bs.setDecoderPath(i),bs.preload().decoderPending);Oh("js/vendor/draco/").catch(()=>(console.warn("Draco local no disponible \u2014 usando CDN gstatic"),Oh(Lb))).catch(()=>(console.warn("Draco CDN primario no disponible \u2014 usando mirror jsDelivr"),Oh(Pb))).catch(i=>console.warn("Ning\xFAn decodificador Draco disponible:",i));var Xt=R_(ut,{dracoLoader:bs,debug:Eo,onReady:()=>setTimeout(Vy,0)}),Ts=new Pr(16767400,0,9,.55,.62,1.4);Ts.position.set(0,2.8,-3);var au=new Xe;au.position.set(0,.6,-4.8);Ts.target=au;ut.add(Ts);ut.add(au);var wa=new xi(10466520,0,8,1.8);wa.position.set(-2.4,1.4,-2.4);ut.add(wa);var Ii=[];function Ib(){let i=fe.door.spots,e=new St;e.name="doorLights";let t=n=>{let r=new Pr(n.color,n.intensity,n.distance,n.angle,n.penumbra,n.decay);r.position.set(n.x,n.y,n.z);let o=new Xe;return o.position.set(n.tx,n.ty,n.tz),r.target=o,e.add(r),e.add(o),Ii.push(r),r};return t(i.key),t(i.rim),t(i.under),ut.add(e),e.visible=!1,e}var Ui=Ib(),cu=document.createElement("canvas");cu.width=256;cu.height=256;var Nf=cu.getContext("2d"),lu=Nf.createRadialGradient(128,128,0,128,128,128);lu.addColorStop(0,"rgba(0, 0, 0, 0.9)");lu.addColorStop(.4,"rgba(0, 0, 0, 0.5)");lu.addColorStop(1,"rgba(0, 0, 0, 0)");Nf.fillStyle=lu;Nf.fillRect(0,0,256,256);var Db=new so(cu),hr=new Ge(new Jr(1,1),new Ut({map:Db,transparent:!0,opacity:.8,depthWrite:!1,blending:Fs}));hr.rotation.x=-Math.PI/2;hr.position.set(0,0,0);ut.add(hr);var In=new St;ut.add(In);var Hl=[],tf=null,nf=0,Bf=0,Ns={diameter:0,centerY:0,band:null};function Ub(){return Ma?Number.isFinite(Ma.offsetTop)?Ma.offsetTop:Ma.getBoundingClientRect().top+(window.scrollY||0):NaN}function Nb(){let{width:i,height:e}=nn(),t=ne.clamp(e*Li.safeTopRatio,56,112),n=Ub(),o=(Number.isFinite(n)&&n>0&&n<e*1.5?n:e*.78)-Math.max(18,e*Li.gapRatio);return{w:i,h:e,top:t,bottom:o,height:Math.max(0,o-t)}}function Ff(){let i=Nb(),{w:e,h:t}=i;if(!!0){let l=ne.clamp(.028*e,16,34);return{diameter:Math.min(Math.max(l*9,Math.min(e,t)*(N_()?.46:.4)),Math.min(e*.5,680),i.height>0?i.height*.82:1/0),centerY:t*.41,band:i}}let n=Math.max(Math.min(e,t)*Li.minSizeRatio,Math.min(i.height*Li.fillRatio,e*Li.coinWidthRatio,t*Li.maxSizeRatio)),r=n/2,o=i.top+r,s=i.bottom-r,a=i.top+i.height*Li.bandAnchor,c=s>=o?ne.clamp(a,o,s):(i.top+i.bottom)/2;return{diameter:n,centerY:c,band:i}}function Bb(){return Ff().diameter}function qy(){let{height:i}=nn(),e=Math.tan(fe.camera.fov*Math.PI/360),t=fe.camera.z,n=i/(2*e*t);return ne.clamp(Bb()/(fe.coin.scale*n),.25,3.4)}function Yy(){let{height:i}=nn(),e=i*Li.centerYRatio,t=Math.tan(fe.camera.fov*Math.PI/360),n=i/(2*t*fe.camera.z);return ne.clamp(mo+(i*.5-e)/n,.15,2.5)}function jy(){Ns=Ff(),Bf=Ns.diameter,tf&&nf&&tf.scale.setScalar(nf*qy()),fe.coin.baseY=Yy()}function Fb(){return fe.coin.scale*qy()}Ns=Ff();Bf=Ns.diameter;fe.coin.baseY=Yy();var Da=new cs;Da.onLoad=()=>{z_(),Promise.all([Vy(),G_()]).finally(()=>{setTimeout(()=>{tt&&Af(),_v()},300)})};Da.onError=i=>console.warn("Error cargando recurso:",i);setTimeout(()=>{Mi&&!Mi.classList.contains("hidden")&&(Mi.innerHTML='<span style="opacity:.9">La carga est&aacute; tomando m&aacute;s tiempo del esperado. Verifique su conexi&oacute;n a internet.</span>')},15e3);setTimeout(()=>{Mi&&!Mi.classList.contains("hidden")&&Af(),_v()},3e4);var Of=new us(Da);Of.setDRACOLoader(bs);Of.load("monedav5-draco.glb",i=>{let e=i.scene;e.rotation.y=-Math.PI/2;let t=new ht().setFromObject(e);if(!t.isEmpty()){let n=t.getCenter(new L);e.position.sub(n);let r=t.getSize(new L);nf=fe.coin.scale/Math.max(r.x,r.y,r.z),tf=e,jy()}e.traverse(n=>{!n.isMesh||!n.material||[n.material].flat().forEach(r=>{!r||!("metalness"in r)||(r.side=Zt,r.metalness=fe.coin.metalness,r.roughness=fe.coin.roughness,r.envMapIntensity=fe.coin.envMapIntensity,r.emissiveIntensity=.14,r.envMapIntensity=1.25,r.needsUpdate=!0,Hl.push(r))})}),In.add(e)},void 0,i=>{console.error("Error cargando GLB:",i),Mi.innerHTML='<span style="opacity:.9">No se pudo cargar la moneda</span>',setTimeout(Af,1200)});var it=new St;ut.add(it);it.visible=!1;var eu=new xi(fe.door?.roomLight?.color??16760435,0,16,1.8);eu.position.set(fe.door?.roomLight?.x??0,fe.door?.roomLight?.y??.9,fe.door?.roomLight?.z??-.45);ut.add(eu);var Ni=new St;it.add(Ni);var lr=null,rf=[],xo=null,go=null,of=null,sf=null,af=null,cf=[],Ob=[],lf=[],Aa=[],on={vis:-1,colorT:-1,crossT:-1,scatter:-1,exitT:-1,fade:-1};function Hf(){if(!lr||!xo)return;let i=fe.door,e=nn(),t=e.width/Math.max(e.height,1),n=ne.clamp(1.9/t,.78,1),r=Fb()*(i.widthVsCoin??1.4)*n,o=r/Math.max(xo.width,.001),a=!!go&&lr===go?1:ne.clamp(i.doorDepthSquash??1,.05,1),c=xo.depth*o*a,l=Math.min(1,(i.maxDepthWorld??1/0)/Math.max(c,1e-6));Ni.scale.set(o,o,o*a*l),hr.scale.set(r*(i.shadowWidthMul??1.3),c*l*(i.shadowDepthMul??2.2),1)}function Hb(i){i.updateMatrixWorld(!0);let e=new ht().setFromObject(i);if(e.isEmpty())return null;let t=e.getCenter(new L);i.position.sub(t),i.updateMatrixWorld(!0);let n=new ht().setFromObject(i),r=n.getSize(new L);return xo={width:Math.max(r.x,.001),depth:Math.max(r.z,.001)},La=Math.max(r.y,.001),Ca=n.min.y,iu=n.max.y,lr=i,Hf(),n}function $y(){let i=fe.doorText;if(!i)return;let e=document.getElementById("stageObjectiveContainer"),t=document.getElementById("stageObjectiveTitle"),n=document.getElementById("stageObjectiveParagraph");e&&(i.bottomOffset&&(e.style.paddingBottom=i.bottomOffset),i.horizontalOffset&&(e.style.transform=`translateX(${i.horizontalOffset})`)),t&&(i.titleSize&&(t.style.fontSize=i.titleSize),i.gap&&(t.style.marginBottom=i.gap),t.style.color="var(--color-gold)",t.style.letterSpacing="0.34em"),n&&(i.textSize&&(n.style.fontSize=i.textSize),i.maxWidth&&(n.style.maxWidth=i.maxWidth),n.style.lineHeight="1.38",n.style.fontWeight="500"),Cf()}$y();function uu(i,e){let t=document.createElement("canvas");t.width=t.height=i;let n=t.getContext("2d");e(n,i);let r=new so(t);return r.wrapS=r.wrapT=si,r.anisotropy=8,r.colorSpace=nt,r.needsUpdate=!0,r}function kb(){return uu(512,(i,e)=>{i.fillStyle="#243044",i.fillRect(0,0,e,e);for(let t=0;t<5200;t++){let n=.04+Math.random()*.16;i.fillStyle=Math.random()>.45?`rgba(210,224,240,${n})`:`rgba(4,8,14,${n*1.5})`,i.fillRect(Math.random()*e,Math.random()*e,1+Math.random()*4,1+Math.random()*3)}i.globalAlpha=.22;for(let t=0;t<e;t+=28)i.fillStyle=t%56===0?"#121820":"#3a4c62",i.fillRect(0,t,e,2);i.globalAlpha=1})}function zb(){return uu(256,(i,e)=>{i.fillStyle="#1a222e",i.fillRect(0,0,e,e),i.strokeStyle="#c5b48a",i.lineWidth=9,i.lineJoin="miter",i.lineCap="square";let t=64;for(let n=0;n<e;n+=t)for(let r=0;r<e;r+=t)i.beginPath(),i.moveTo(r+8,n+18),i.lineTo(r+46,n+18),i.lineTo(r+46,n+50),i.lineTo(r+22,n+50),i.lineTo(r+22,n+34),i.lineTo(r+8,n+34),i.closePath(),i.stroke()})}function Gb(){return uu(512,(i,e)=>{let t=i.createLinearGradient(0,0,e,e);t.addColorStop(0,"#f0c875"),t.addColorStop(.48,"#d8a653"),t.addColorStop(1,"#fff0b1"),i.fillStyle=t,i.fillRect(0,0,e,e);for(let n=0;n<4200;n++){let r=.025+Math.random()*.1;i.fillStyle=Math.random()>.52?`rgba(255,238,178,${r})`:`rgba(72,43,13,${r*1.2})`;let o=Math.random()*e,s=Math.random()*e;i.fillRect(o,s,1+Math.random()*2.5,3+Math.random()*16)}i.globalAlpha=.18,i.strokeStyle="#211307",i.lineWidth=1;for(let n=6;n<e;n+=18+Math.random()*8)i.beginPath(),i.moveTo(n,0),i.lineTo(n+Math.sin(n)*5,e),i.stroke();i.globalAlpha=1})}function Vb(){return uu(512,(i,e)=>{let t=i.createRadialGradient(e*.5,e*.45,0,e*.5,e*.48,e*.52);t.addColorStop(0,"rgba(255, 192, 94, 0.75)"),t.addColorStop(.3,"rgba(255, 150, 46, 0.26)"),t.addColorStop(.58,"rgba(146, 76, 20, 0.08)"),t.addColorStop(1,"rgba(0, 0, 0, 0)"),i.fillStyle=t,i.fillRect(0,0,e,e)})}var uf=kb();uf.repeat.set(2.4,3);var Wb=Gb();Wb.repeat.set(1.4,4.6);var Xb=zb();Xb.repeat.set(6,8);var df=Vb();df.wrapS=df.wrapT=Ot;var hf=new Ut({map:df,transparent:!0,opacity:0,depthWrite:!1,depthTest:!1,blending:fr,toneMapped:!1}),Bi=new Ge(new Jr(1,1),hf);Bi.name="doorEditorialAura";Bi.renderOrder=-5;Bi.visible=!1;it.add(Bi);var Ra=[],ff=[],kl=[],qb=[],zl=[],cy=[],tu=[],Ky=new ge("#07090f"),Yb=new ge("#6b4f28"),jb=new ge("#d9a94f"),$b=new ge("#201307"),Kb=new ge("#2d1b08"),Zb=new ge("#c9973f"),Jb=new ge("#ffd76a"),nu={stone:{hero:new ge("#6e7d92"),meet:new ge("#3a4048")},dark:{hero:new ge("#4c5666"),meet:new ge("#252b33")},granite:{hero:new ge("#2a2724"),meet:new ge("#22201e")},medal:{hero:new ge("#c9973f"),meet:new ge("#c9973f")}},Qb=new ge(13951218),eT=new ge(15265526),tT=new ge(7242140),nT=new ge(9081763);function ly(i){return i==="stone_dark"?"dark":i==="granite"?"granite":"stone"}var Gl=null,Vl=null,Wl=null,Ca=-1.15,iu=1.15,La=0;{let i=U_(),e=i.group;of=e,e.rotation.x=-Math.PI/2,Gl=i.pivotL,Vl=i.pivotR,Wl=i.glowMat,e.updateMatrixWorld(!0);let t=new ht().setFromObject(e);if(!t.isEmpty()){let n=new ht;e.traverse(a=>{a.userData.role==="leaf"&&n.expandByObject(a)});let o=(n.isEmpty()?t:n).getCenter(new L);e.position.sub(o),e.updateMatrixWorld(!0);let s=t.getSize(new L);xo={width:Math.max(s.x,.001),depth:Math.max(s.z,.001)},La=Math.max(s.y,.001),Ca=t.min.y-o.y,iu=t.max.y-o.y,lr=e,Hf()}e.traverse(n=>{if(!n.isMesh||!n.material)return;let r=n.material;if(!("metalness"in r))return;let o=n.userData.role,s=o==="leaf",a=o==="glow",c=o==="facade",l=o==="medal",u=o==="frame";if(c&&qb.push(n),(n.userData.role==="interior"||n.userData.role==="glow")&&zl.push(n),s){cy.includes(n)||cy.push(n);let d=n.userData.matName||"";if(d!=="bronze_dark"&&(r.map=null,r.bumpMap=null,r.bumpScale=0),!n.isInstancedMesh&&d!=="bronze_dark"&&n.geometry&&!n.userData.edgeLinesAdded){let h=new fi({color:1444611,transparent:!0,opacity:.42,depthTest:!0,depthWrite:!1}),p=new tr(new as(n.geometry,38),h);p.name=`${n.name}_edgeLines`,p.renderOrder=3,n.add(p),ff.push(h),n.userData.edgeLinesAdded=!0}}if((c||u)&&n.geometry&&!n.userData.edgeLinesAdded){let d=ly(n.userData.matName||"stone"),h=d==="dark"?.22:d==="granite"?.28:.12,p=new fi({color:d==="stone"?3945255:1117449,transparent:!0,opacity:h,depthTest:!0,depthWrite:!1}),g=new tr(new as(n.geometry,36),p);g.name=`${n.name}_stoneEdges`,g.renderOrder=2,n.add(g),kl.push({m:p,baseOpacity:h}),n.userData.edgeLinesAdded=!0}if(a){r.transparent=!0,r.opacity=0,r.depthWrite=!1,r.depthTest=!0,r.side=It,r.blending=fr,r.needsUpdate=!0;return}if(r.side=Zt,s)if(!0){if(r.color.copy(Ky),r.metalness=.12,r.roughness=.92,r.envMapIntensity=.12,r.emissive||(r.emissive=new ge),r.emissive.set("#000000"),r.emissiveIntensity=0,!Ra.some(d=>d.m===r)){let d=n.userData.matName||"",h=d==="bronze_dark"?"dark":d==="bronze_matte"?"base":"orn";Ra.push({m:r,tone:h})}}else r.color.set("#ffd76a"),r.metalness=1,r.roughness=.22,r.envMapIntensity=1.3,r.emissive||(r.emissive=new ge),r.emissive.set("#3d2508"),r.emissiveIntensity=.05;else if(l)r.color.set("#c9973f"),r.metalness=1,r.roughness=.35,r.envMapIntensity=.9,r.emissive||(r.emissive=new ge),r.emissive.set("#000000"),r.emissiveIntensity=0;else if(!0){let d=ly(n.userData.matName||"stone"),h=nu[d]||nu.stone;r.color.copy(h.hero),r.metalness=d==="granite"?.1:.04,r.roughness=d==="granite"?.68:.86,r.map=uf,r.bumpMap=uf,r.bumpScale=d==="dark"?.02:.04,r.envMapIntensity=d==="granite"?.2:.26,r.emissive||(r.emissive=new ge),r.emissive.set("#000000"),r.emissiveIntensity=0,tu.some(p=>p.m===r)||tu.push({m:r,tone:d})}else r.color.set("#0d0f16"),r.metalness=.15,r.roughness=.75,r.envMapIntensity=.3,r.emissive||(r.emissive=new ge),r.emissive.set("#000000"),r.emissiveIntensity=0;r.needsUpdate=!0,rf.includes(r)||rf.push(r),Aa.includes(r)||Aa.push(r)}),Ni.add(e),it.visible=!0}var uy=new ge("#2e3741"),iT=new ge("#5c6874"),rT=new ge("#232a32"),oT=new ge("#9f6118"),sT=new ge("#d9a23a"),aT=new ge("#f2d16a"),cT=new ge("#d6a030"),dy=new ge("#090502"),Zy=new ge("#24251e"),lT=new ge("#f1f0e7"),uT=new ge("#211706"),dT=new ge("#05070a"),hT=new ge("#39434e");function Pa(i,e,t){let n=ne.clamp((t-i)/Math.max(e-i,1e-6),0,1);return n*n*(3-2*n)}function fT(i,e,t=!1,n=0){if(!t||e<-.86||e>.84||n<-.15||n>.24)return 0;let r=Pa(-.86,-.72,e)*(1-Pa(.74,.86,e));return ne.clamp(.86+.14*r,0,1)}function Hh(i,e=!1,t=new ge){let n=i.x,r=i.y,o=i.z,s=Math.abs(n),a=r<-.62||r<-.48&&s>.42,c=r>.82,l=s>.47&&s<.86&&r>-.64&&r<.84,u=fT(n,r,e,o);if(e){let h=ne.clamp(.42+.34*(r+.85)/1.7+(n>0?.03:0),0,.86);t.copy(oT).lerp(sT,h),t.lerp(cT,.16),t.lerp(aT,.16+.1*u);let p=(1-Pa(0,.035,s))*Pa(-.7,-.54,r)*(1-Pa(.64,.82,r));return t.lerp(dy,p*.18),.94}let d=ne.clamp(.24+.18*(r+.9)/1.8+.05*(1-Math.min(s,1)),0,.46);return t.copy(uy).lerp(iT,d),u>.01&&t.lerp(hT,.62),l&&t.lerp(uy,.38),c&&t.lerp(dy,.3),a&&t.lerp(rT,.78),u>.01?.16:.08}function pT(i="frame"){let e=new tn({color:Zy.clone(),vertexColors:!0,metalness:.1,roughness:.82,envMapIntensity:.72,emissive:0,emissiveIntensity:0,transparent:!0,opacity:0,depthWrite:!0,side:It});return e.userData.bcchKind=i,e.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
attribute float bcchDoorMask;
varying float vBcchDoorMask;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vBcchDoorMask = bcchDoorMask;`),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
varying float vBcchDoorMask;`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor = mix(0.92, 0.38, vBcchDoorMask);`).replace("#include <metalnessmap_fragment>",`#include <metalnessmap_fragment>
metalnessFactor = mix(0.035, 0.82, vBcchDoorMask);`)},e.customProgramCacheKey=()=>"bcch-door-openable-recolor-v13",e}function Il(i,e=0,t=0){if(!i.length)return null;let n=new Float32Array(i.length*9),r=new Float32Array(i.length*9),o=new Float32Array(i.length*9),s=new Float32Array(i.length*3),a=0,c=0,l=0,u=0;for(let h of i)for(let p of h)n[a++]=p.p.x-e,n[a++]=p.p.y,n[a++]=p.p.z-t,r[c++]=p.n.x,r[c++]=p.n.y,r[c++]=p.n.z,o[l++]=p.c.r,o[l++]=p.c.g,o[l++]=p.c.b,s[u++]=p.mask;let d=new Je;return d.setAttribute("position",new $e(n,3)),d.setAttribute("normal",new $e(r,3)),d.setAttribute("color",new $e(o,3)),d.setAttribute("bcchDoorMask",new $e(s,1)),d.computeBoundingSphere(),d}function Dl(i,e,t="frame"){if(!i)return null;let n=pT(t),r=new Ge(i,n);if(r.name=e,r.renderOrder=5,r.userData.role="bcchDoor",i.attributes.position?.count>0){let o=t==="leaf"||t==="medal",s=new fi({color:o?1181699:328707,transparent:!0,opacity:0,depthTest:!0,depthWrite:!1}),a=new tr(new as(i,o?26:34),s);a.name=`${e}_edgeLines`,a.renderOrder=6,r.add(a),lf.push({m:s,baseOpacity:o?.22:.15,kind:t})}return rf.push(n),cf.push(n),t==="aperture"&&Ob.push(n),r}var Ln={axisX:-.0153,slabZ:[-.34,-.14],slabY:[-.9267,.8333],slabX:1,ballY:.0986,pilasterInnerX:.5053,gap:.02,splay:.06};function mT(i,e){let t=new St;t.name="Puerta_bcch_Openable";let n=e.clone();n.x+=Ln.axisX;let r=[],o=[],s=[],a=(ie,H)=>({p:ie,n:H,c:new ge,mask:0}),c=ie=>Math.abs(ie-Ln.slabZ[0])<.003||Math.abs(ie-Ln.slabZ[1])<.003;i.updateMatrixWorld(!0),i.traverse(ie=>{if(!ie.isMesh||!ie.geometry)return;let H=ie.geometry,Q=H.attributes.position,le=H.attributes.normal;if(!Q||!le)return;let W=new Oe().getNormalMatrix(ie.matrixWorld),R=/Puerta_Izquierda/i.test(ie.name),he=/Puerta_Derecha/i.test(ie.name),pe=H.index,ye=pe?pe.count/3:Q.count/3;for(let $=0;$<ye;$++){let U=(pe?[pe.getX($*3),pe.getX($*3+1),pe.getX($*3+2)]:[$*3,$*3+1,$*3+2]).map(M=>a(new L().fromBufferAttribute(Q,M).applyMatrix4(ie.matrixWorld).sub(n),new L().fromBufferAttribute(le,M).applyMatrix3(W).normalize()));if(R){o.push(U);continue}if(he){s.push(U);continue}U.every(M=>c(M.p.z))||r.push(U)}});let l=(ie,H)=>{let Q=ie.map(le=>le.p[H]);return Math.max(...Q)-Math.min(...Q)},u=(ie,H)=>{let Q=1/0,le=-1/0,W=[];for(let he of ie)if(H(he)){W.push(he);for(let pe of he)Q=Math.min(Q,pe.p.x),le=Math.max(le,pe.p.x)}if(!W.length)return 0;let R=-(Q+le)*.5;if(Math.abs(R)>1e-4)for(let he of W)for(let pe of he)pe.p.x+=R;return R},d={cornice:u(r,ie=>ie.every(H=>H.p.y>=Ln.slabY[1]+.002)&&(l(ie,"x")>.5||l(ie,"z")>.5)),capitals:u(r,ie=>ie.every(H=>H.p.y>=.63-.001&&H.p.y<=.845&&Math.abs(H.p.x)<.53)),steps:u(r,ie=>ie.every(H=>H.p.y<=-.7038+.001&&H.p.z>=-.27))},h=(ie,H)=>{let Q=H<0?1/0:-1/0;for(let le of ie)for(let W of le)Math.abs(W.p.y-Ln.ballY)<.07||(Q=H<0?Math.min(Q,W.p.x):Math.max(Q,W.p.x));return Q},p=h(o,-1),g=h(s,1),x=(ie,H,Q)=>{let le=[],W=[];for(let R of ie)(R.some(pe=>Q<0?pe.p.x<H-1e-4:pe.p.x>H+1e-4)?W:le).push(R);return{keep:le,medal:W}},m=x(o,p,-1),f=x(s,g,1);o.length=0,o.push(...m.keep),s.length=0,s.push(...f.keep);let v=[],_=new ht,T=(ie,H)=>{_.makeEmpty();for(let Ee of ie)for(let Y of Ee)_.expandByPoint(Y.p);if(_.isEmpty())return;let Q=_.getSize(new L),le=Math.min(Q.x,Q.y)*.5,W=Math.max(Q.z,.02),R=(_.min.y+_.max.y)*.5,he=H<0?p+d.leaves-Ln.gap:g+d.leaves+Ln.gap,pe=H*Ln.pilasterInnerX,ye=(he+pe)*.5,$=Ln.slabZ[1],ue=$+W,U=28,M=Ee=>Array.from({length:U},(Y,Le)=>{let Ce=Le/U*Math.PI*2;return new L(ye+Math.cos(Ce)*le,R+Math.sin(Ce)*le,Ee)}),y=M(ue),B=M($),K=new L(ye,R,ue),Z=new L(ye,R,$),ee=new L(0,0,1),ve=new L(0,0,-1);for(let Ee=0;Ee<U;Ee++){let Y=(Ee+1)%U;v.push([a(K.clone(),ee.clone()),a(y[Ee].clone(),ee.clone()),a(y[Y].clone(),ee.clone())]),v.push([a(Z.clone(),ve.clone()),a(B[Y].clone(),ve.clone()),a(B[Ee].clone(),ve.clone())]);let Le=new L(y[Ee].x-ye,y[Ee].y-R,0).normalize(),Ce=new L(y[Y].x-ye,y[Y].y-R,0).normalize();v.push([a(B[Ee].clone(),Le.clone()),a(y[Y].clone(),Ce.clone()),a(y[Ee].clone(),Le.clone())]),v.push([a(B[Ee].clone(),Le.clone()),a(B[Y].clone(),Ce.clone()),a(y[Y].clone(),Ce.clone())])}let me=ue+W*.35,xe=M(me).map(Ee=>Ee.sub(new L(ye,R,0)).multiplyScalar(.55).add(new L(ye,R,0))),Me=new L(ye,R,me);for(let Ee=0;Ee<U;Ee++){let Y=(Ee+1)%U;v.push([a(Me.clone(),ee.clone()),a(xe[Ee].clone(),ee.clone()),a(xe[Y].clone(),ee.clone())]);let Le=new L(xe[Ee].x-ye,xe[Ee].y-R,0).normalize(),Ce=new L(xe[Y].x-ye,xe[Y].y-R,0).normalize(),Ie=new L(xe[Ee].x,xe[Ee].y,ue),we=new L(xe[Y].x,xe[Y].y,ue);v.push([a(Ie,Le.clone()),a(xe[Y].clone(),Ce.clone()),a(xe[Ee].clone(),Le.clone())]),v.push([a(Ie.clone(),Le.clone()),a(we,Ce.clone()),a(xe[Y].clone(),Ce.clone())])}};d.leaves=-(p+g)*.5,T(m.medal,-1),T(f.medal,1);for(let ie of[o,s])for(let H of ie)for(let Q of H)Q.p.x+=d.leaves;p+=d.leaves,g+=d.leaves;let A=1/0,b=-1/0;for(let ie of[o,s])for(let H of ie)for(let Q of H)A=Math.min(A,Q.p.z),b=Math.max(b,Q.p.y);let S=A,P=p,E=g,w=new Xe,I=new Xe;w.name="Puerta_bcch_LeftPivot",I.name="Puerta_bcch_RightPivot",w.position.set(P,0,S),I.position.set(E,0,S),w.userData.openSign=1,I.userData.openSign=-1;let O=Ln.gap,te=Ln.splay,D=p-O,G=g+O,[X,z]=Ln.slabZ,[V,j]=Ln.slabY,ce=Ln.slabX,se=(ie,H,Q,le)=>{let W=[ie,H,Q,le].map(he=>new L(...he)),R=new L().crossVectors(new L().subVectors(W[1],W[0]),new L().subVectors(W[2],W[0])).normalize();r.push([a(W[0].clone(),R.clone()),a(W[1].clone(),R.clone()),a(W[2].clone(),R.clone())],[a(W[0].clone(),R.clone()),a(W[2].clone(),R.clone()),a(W[3].clone(),R.clone())])},F=ie=>{let H=ie*ce,Q=ie<0?D:G,le=Q+ie*te,W=[H,z],R=[Q,z],he=[le,X],pe=[H,X],ye=($,ue)=>ie<0?se([$[0],V,$[1]],[ue[0],V,ue[1]],[ue[0],j,ue[1]],[$[0],j,$[1]]):se([ue[0],V,ue[1]],[$[0],V,$[1]],[$[0],j,$[1]],[ue[0],j,ue[1]]);ye(W,R),ye(R,he),ye(he,pe),ye(pe,W),ie<0?(se([W[0],j,W[1]],[R[0],j,R[1]],[he[0],j,he[1]],[pe[0],j,pe[1]]),se([pe[0],V,pe[1]],[he[0],V,he[1]],[R[0],V,R[1]],[W[0],V,W[1]])):(se([R[0],j,R[1]],[W[0],j,W[1]],[pe[0],j,pe[1]],[he[0],j,he[1]]),se([he[0],V,he[1]],[pe[0],V,pe[1]],[W[0],V,W[1]],[R[0],V,R[1]]))};F(-1),F(1),se([D-te,V,X],[G+te,V,X],[G,V,z],[D,V,z]);for(let ie of r)for(let H of ie)H.mask=Hh(H.p,!1,H.c);for(let ie of[o,s])for(let H of ie)for(let Q of H)Q.mask=Hh(Q.p,!0,Q.c);for(let ie of v)for(let H of ie)H.mask=Hh(H.p,!0,H.c);let N=Dl(Il(r),"Puerta_bcch_frame","frame"),q=Dl(Il(o,P,S),"Puerta_bcch_left_leaf","leaf"),de=Dl(Il(s,E,S),"Puerta_bcch_right_leaf","leaf"),_e=Dl(Il(v),"Puerta_bcch_medals","medal");return N&&t.add(N),_e&&t.add(_e),q&&w.add(q),de&&I.add(de),t.add(w,I),sf=w,af=I,t.userData.bcchDoor={hingeL:P,hingeR:E,hingeZ:S,edgeL:p,edgeR:g,leafTop:b,openL:D,openR:G,shifts:d},t}Of.load("Puerta_bcch_v3.glb?v=16",i=>{let t=new ht().setFromObject(i.scene).getCenter(new L),n=mT(i.scene,t);n.visible=!1,go=n,Hb(n),Ni.add(n),on.vis=-1,on.colorT=-1,on.crossT=-1,on.scatter=-1,on.exitT=-1,on.fade=-1,it.visible=!0},void 0,i=>{console.warn("No se pudo cargar Puerta_bcch_v3.glb; se usa la puerta procedural:",i)});var gT=new fa,ho=fe.coin,kh=-1,Jy=0,Qy=0,va=0,_s=0,ev=0,tv=0,du=!1,pf=0,mf=0,Xl=0,ql=0;function kf(i,e){let t=nn();Jy=i/t.width*2-1,Qy=e/t.height*2-1,du&&(Xl+=(i-pf)*.005,ql+=(e-mf)*.005,pf=i,mf=e)}function hu(i,e){du=!0,pf=i,mf=e}function fu(){du=!1}var zf=i=>!!(i.target&&i.target.closest&&i.target.closest("a, button, .quote-card, .signal-card, [data-quote], #quotePanel, #timelineContainer, .closing-cta, .jargon-term, .axes-data-mark, .voice-explorer, .voice-card, .voice-detail, .voice-profile-panel, .acts-browser, .act-list-item, .act-term-chip, .act-evidence-row, .act-open-evidence, .stage-results"));window.addEventListener("pointermove",i=>{i.pointerType==="touch"||zf(i)||(ev=i.clientX,tv=i.clientY,kf(i.clientX,i.clientY))});var Fr=null;window.addEventListener("pointerdown",i=>{if(!zf(i)){if(i.pointerType==="touch"){Fr={id:i.pointerId,x:i.clientX,y:i.clientY,at:performance.now()};return}hu(i.clientX,i.clientY,i)}});window.addEventListener("pointerup",i=>{if(Fr&&i.pointerType==="touch"&&i.pointerId===Fr.id){let e=i.clientX-Fr.x,t=i.clientY-Fr.y,n=e*e+t*t<100&&performance.now()-Fr.at<600;Fr=null,n&&!zf(i)&&hu(i.clientX,i.clientY,i)}fu()});window.addEventListener("pointercancel",()=>{Fr=null,fu()});window.addEventListener("blur",fu);document.addEventListener("visibilitychange",fu);var Ul=new L,dt=(window.QUOTES||[]).slice(),Gn=new St;ut.add(Gn);var nv=Math.max(dt.length,0),jt=nv||1,Yl=new Float32Array(jt*3),Ss=new Float32Array(jt*3),ws=new Float32Array(jt*3),As=new Float32Array(jt*3),Rs=new Float32Array(jt*3),Cs=new Float32Array(jt*3),Ls=new Float32Array(jt*3),Fi=new Float32Array(jt*3),hy=new Int16Array(jt),fy=new Int16Array(jt),py=new Int16Array(jt),my=new Int16Array(jt),gf=dt.map(i=>{let e=String(i?.date||"").match(/^(\d{4})/),t=Number(e?e[1]:i?.year);return/^\d{4}-\d{2}-\d{2}$/.test(String(i?.date||""))?i.date:`${Number.isFinite(t)?t:0}-01-01`}),Hr=fe.room?.swarm??{},En=fe.door?.funnel??null,ru=En?new Float32Array(jt*2):null,zn=En?new L:null,gy=En?new Ue:null,xy=new L,zh=new Float32Array(jt).fill(1),iv=new ge(16766826),rv=new ge(9090296),ov=new ge(13620964);function Gf(i,e){if(!e||e===1)return i;let t=.299*i.r+.587*i.g+.114*i.b;return new ge(ne.clamp(t+(i.r-t)*e,0,1),ne.clamp(t+(i.g-t)*e,0,1),ne.clamp(t+(i.b-t)*e,0,1))}var xT=Gf(iv,Hr.chroma),_T=Gf(rv,Hr.chroma),yT=Gf(ov,Hr.chroma);for(let i=0;i<jt;i++){let e=dt[i],t=e?e.label:"neutral",n=yT;t==="hawkish"?n=xT:t==="dovish"&&(n=_T),Fi[i*3+0]=n.r,Fi[i*3+1]=n.g,Fi[i*3+2]=n.b;let r=i/jt*Math.PI*2+(Et(i,1)-.5)*.5,o=2.1+Et(i,2)*1.5,s=(Et(i,3)-.5)*1.6,a=Math.cos(r)*o,c=s,l=Math.sin(r)*o;Ss[i*3+0]=a,Ss[i*3+1]=c,Ss[i*3+2]=l,Yl[i*3+0]=a,Yl[i*3+1]=c,Yl[i*3+2]=l;let u=Et(i,4)*Math.PI*2,d=3.8+Et(i,5)*5.5;ws[i*3+0]=Math.cos(u)*d,ws[i*3+1]=(Et(i,6)-.5)*6.5,ws[i*3+2]=(Et(i,7)-.5)*4.5-1,En&&(ru[i*2]=(En.cx??0)+(Et(i,8)-.5)*2*(En.halfW??.42),ru[i*2+1]=(En.cy??1.3)+(Et(i,9)-.5)*2*(En.halfH??.85))}var vT=dt.length,ET=new Set(dt.map(i=>i.participant)).size,sv=document.querySelectorAll("[data-counter]"),Nl=i=>sv[i]?.querySelector(".counter-number")||null;sv.length>=4&&(Nl(2).dataset.target=vT.toString(),Nl(3).dataset.target=ET.toString(),_a("resumen").then(i=>{let e=i?.meta;e&&(Nl(0).dataset.target=String(e.n_anios),Nl(1).dataset.target=String(e.n_reuniones))}));var MT={anios:i=>i.n_anios,periodo:i=>`${i.periodo[0]}\u2013${i.periodo[1]}`,intervenciones:i=>i.n_intervenciones,reuniones:i=>i.n_reuniones,actores:i=>i.n_actores,direccionales:i=>i.n_direccionales,hawkish:i=>i.n_hawkish,dovish:i=>i.n_dovish,neutrales:i=>i.n_neutral,relevantes:i=>i.n_relevantes,no_relevantes:i=>i.n_no_relevantes,entrenamiento:i=>i.n_entrenamiento,ciegas:i=>i.n_evaluacion_ciega,acuerdo:i=>i.acuerdo_unanime_pct};_a("resumen").then(i=>{let e=i?.meta;e&&document.querySelectorAll("[data-corpus-stat]").forEach(t=>{let n=MT[t.dataset.corpusStat];if(!n)return;let r=n(e);r!=null&&(t.textContent=typeof r=="number"?r.toLocaleString("es-CL"):String(r))})});function bT(){let i=document.createElement("canvas");i.width=64,i.height=64;let e=i.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.25,"rgba(255,255,255,0.85)"),t.addColorStop(.7,"rgba(255,255,255,0.2)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle="#fff",e.fillRect(0,0,64,64),e.globalCompositeOperation="destination-in",e.fillStyle=t,e.fillRect(0,0,64,64);let n=new so(i);return n.colorSpace=nt,n}var Gh=null;function av(){return Gh||(Gh=bT()),Gh}var ur=new Je;ur.setAttribute("position",new $e(Yl,3));ur.setAttribute("color",new $e(new Float32Array(Fi),3));ur.boundingSphere=new At(new L,12);var cv=.14,xf=new nr({size:cv,sizeAttenuation:!0,vertexColors:!0,map:av(),transparent:!0,alphaTest:.06,opacity:.82,blending:fr,depthTest:!0,depthWrite:!1,fog:!1}),lv=new Cr(ur,xf);Gn.add(lv);var Pn={roomWarm:-1,voiceFocusMix:-1,actFocusMix:-1,quoteStageMix:-1,focusName:null,activeQuoteIndex:-1,selectedActDate:null},Mn=fe.room?.orbit??{},_o=Math.max(0,Mn.count??12),yo=Math.max(2,Mn.trail??58),Fa=_o*yo,_f=[];{let i={hawkish:[],dovish:[],neutral:[]};dt.forEach((t,n)=>{let r=["hawkish","dovish","neutral"].includes(t?.label)?t.label:"neutral";i[r].push(n)});let e=["hawkish","dovish","neutral"];for(let t=0;_f.length<_o&&t<_o*3;t++){let n=i[e[t%3]];if(!n.length)continue;let r=Math.floor(t/3),o=n[Math.round((r+.5)*(n.length/Math.max(1,Math.ceil(_o/3))))%n.length];o!=null&&_f.push(o)}}var ii=new St;ii.name="roomOrbitals";ii.position.set(fe.room?.figure?.x??0,0,fe.room?.figure?.z??-4.8);ii.visible=!1;ut.add(ii);var vo=_f.map((i,e)=>{let t=Mn.minRadius??.46,n=t+Et(e,11)*((Mn.maxRadius??.95)-t),r=ne.degToRad((Et(e,12)-.5)*2*(Mn.tilt??34));return{quoteIndex:i,radius:n,ecc:.86+Et(e,13)*.26,y:(Mn.minY??.26)+Et(e,14)*((Mn.maxY??1.14)-(Mn.minY??.26)),tilt:r,node:Et(e,15)*Math.PI*2,phase:Et(e,16)*Math.PI*2,speed:(Mn.speed??.24)/Math.pow(n/.6,1.15)*(Et(e,17)>.5?1:-1),bob:.05+Et(e,18)*.07}}),jl=new Float32Array(Fa*3),$l=new Float32Array(Fa*3),yf=new Float32Array(Fa),vf=new Float32Array(Fa),uv=new Float32Array(Fa);vo.forEach((i,e)=>{let t=dt[i.quoteIndex],n=["hawkish","dovish","neutral"].includes(t?.label)?t.label:"neutral",r=n==="hawkish"?iv:n==="dovish"?rv:ov,o=n==="neutral"?Mn.neutralDim??.78:1;for(let s=0;s<yo;s++){let a=e*yo+s;if($l[a*3+0]=r.r*o,$l[a*3+1]=r.g*o,$l[a*3+2]=r.b*o,uv[a]=e,s===0)yf[a]=Mn.headSize??.175,vf[a]=1;else{let c=1-(s-1)/Math.max(1,yo-2);yf[a]=(Mn.tailSize??.095)*(.34+.66*c),vf[a]=Math.pow(c,1.65)*.72}}});var zr=new Je;zr.setAttribute("position",new $e(jl,3));zr.setAttribute("aColor",new $e($l,3));zr.setAttribute("aSize",new $e(yf,1));zr.setAttribute("aFade",new $e(vf,1));zr.setAttribute("aOwner",new $e(uv,1));zr.boundingSphere=new At(new L(0,.7,0),2.4);var pu=new dn({uniforms:{uMap:{value:av()},uOpacity:{value:0},uScale:{value:450},uFocus:{value:-1}},vertexShader:`
    attribute float aSize;
    attribute float aFade;
    attribute float aOwner;
    attribute vec3 aColor;
    uniform float uScale;
    uniform float uFocus;
    varying vec3 vColor;
    varying float vFade;
    void main() {
      /* 1.0 solo en el fragmento con la cita activa (hover / fijada) */
      float focus = 1.0 - step(0.5, abs(aOwner - uFocus));
      vColor = mix(aColor, min(aColor * 1.55 + 0.16, vec3(1.0)), focus);
      vFade = aFade * (1.0 + 0.45 * focus);
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * (1.0 + 0.35 * focus) * (uScale / max(-mv.z, 0.001));
      gl_Position = projectionMatrix * mv;
    }
  `,fragmentShader:`
    uniform sampler2D uMap;
    uniform float uOpacity;
    varying vec3 vColor;
    varying float vFade;
    void main() {
      float a = texture2D(uMap, gl_PointCoord).a * vFade * uOpacity;
      if (a < 0.004) discard;
      gl_FragColor = vec4(vColor, a);
      /* Un ShaderMaterial no aplica solo el tone mapping ni la conversi\xF3n
         de espacio de color: sin estas dos l\xEDneas el oro y el azul de las
         estelas no coincidir\xEDan con los de la nube de part\xEDculas. */
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,transparent:!0,depthTest:!0,depthWrite:!1,blending:fr}),Vf=new Cr(zr,pu);Vf.frustumCulled=!1;ii.add(Vf);function ou(){if(!tt)return;let i=tt.getSize(new De);pu.uniforms.uScale.value=i.y*tt.getPixelRatio()*.5}ou();var Bl=new L;function TT(i,e,t){let n=i.phase+i.speed*e,r=i.node+(Mn.precession??.028)*e,o=Math.cos(n)*i.radius,s=Math.sin(n)*i.radius*i.ecc,a=Math.cos(i.tilt),c=Math.sin(i.tilt),l=-s*c,u=s*a,d=Math.cos(r),h=Math.sin(r);return t.set(o*d+u*h,i.y+l+Math.sin(e*.5+i.phase)*i.bob,-o*h+u*d),t}var dv=0;function ST(i,e){if(dv=e,pu.uniforms.uOpacity.value=e*(Mn.opacity??.95),AT(e>.35&&_o>0),e<.004||_o===0){ii.visible=!1;return}ii.visible=!0;let t=Mn.trailStep??.07;for(let n=0;n<_o;n++){let r=vo[n];for(let o=0;o<yo;o++){TT(r,i-o*t,Bl);let s=(n*yo+o)*3;jl[s]=Bl.x,jl[s+1]=Bl.y,jl[s+2]=Bl.z}}zr.attributes.position.needsUpdate=!0}var Ps=document.getElementById("roomVoiceNav"),_y=document.getElementById("roomVoiceNavList"),yy=null;function wT(){if(!Ps||!_y||vo.length===0)return;let i=document.createDocumentFragment();vo.forEach((e,t)=>{let n=dt[e.quoteIndex];if(!n)return;let r=document.createElement("li");r.className="room-voice-nav-item";let o=document.createElement("button");o.type="button",o.className="room-voice-btn",o.dataset.quoteIndex=String(e.quoteIndex),o.dataset.tone=n.label||"neutral";let s=n.participant||"Participante an\xF3nimo",a=n.formatted_date||n.date||(n.year?"A\xF1o "+n.year:"fecha no especificada"),c=n.label||"neutral";o.appendChild(document.createTextNode(s));let l=document.createElement("span");l.className="room-voice-meta",l.textContent=`${a} \xB7 ${c}`,o.appendChild(l),o.setAttribute("aria-label",`${s}, ${a}, tono ${c}. Abrir la cita.`),o.addEventListener("focus",()=>{Rh(e.quoteIndex),su()}),o.addEventListener("click",()=>{Rn(e.quoteIndex),Cn.card=o,Oi(e.quoteIndex,o.getBoundingClientRect());let u=document.getElementById("quotePanelClose");u&&u.focus({preventScroll:!0})}),r.appendChild(o),i.appendChild(r)}),_y.appendChild(i),Ps.addEventListener("focusout",e=>{Ps.contains(e.relatedTarget)||Ml()||(Ch(),su())})}function AT(i){!Ps||i===yy||(yy=i,!i&&Ps.contains(document.activeElement)&&document.activeElement.blur(),Ps.hidden=!i)}wT();function RT(){if(typeof _n.index!="number"||_n.index<0)return-1;for(let i=0;i<vo.length;i++)if(vo[i].quoteIndex===_n.index)return i;return-1}var Kl=new pa,Vh=new De,Wh=new L;function CT(i=1){let e=fe.interaction?.hoverRadius??.075,t=Gn.scale?.x||1;Kl.params.Points.threshold=e*t*i}function hv(i,e,t=1){if(!nv)return-1;let n=nn();CT(t),Vh.x=i/n.width*2-1,Vh.y=-(e/n.height)*2+1,Kl.setFromCamera(Vh,Mt);let r=Kl.intersectObject(lv,!1),o=dv>.35&&ii.visible?Kl.intersectObject(Vf,!1):[];if(r.length===0&&o.length===0)return-1;let s=-1,a=1/0,c=(l,u)=>{Wh.copy(l.point).project(Mt);let d=(Wh.x*.5+.5)*n.width,h=(-Wh.y*.5+.5)*n.height,p=d-i,g=h-e,x=p*p+g*g;x<a&&(a=x,s=u)};for(let l=0;l<r.length;l++)c(r[l],r[l].index);for(let l=0;l<o.length;l++){let u=Math.floor(o[l].index/yo),d=vo[u]?.quoteIndex;d!=null&&c(o[l],d)}return s}function LT(){let i=document.getElementById("quotePanel");if(!i)return;let e=ti(),t=Math.max(180,e.height-24);i.style.maxHeight=`${t}px`,i.classList.remove("is-compact","is-ultra-compact"),i.scrollHeight>t&&i.classList.add("is-compact"),i.scrollHeight>t&&i.classList.add("is-ultra-compact")}function fv(i){let e=document.getElementById("quotePanel");if(!e)return;LT();let t=ti(),n=e.offsetWidth||t.width*.38,r=e.offsetHeight||t.height*.34,o=Math.max(12,Math.min(t.width,t.height)*.025),s=Math.max(10,Math.min(t.width,t.height)*.018),a=ne.clamp(i&&typeof i.x=="number"?i.x:ev,0,t.width),c=ne.clamp(i&&typeof i.y=="number"?i.y:tv,0,t.height),l=[{name:"right",left:a+s,top:c-r/2},{name:"left",left:a-n-s,top:c-r/2},{name:"below",left:a-n/2,top:c+s},{name:"above",left:a-n/2,top:c-r-s}],u=g=>g.left>=o&&g.top>=o&&g.left+n<=t.width-o&&g.top+r<=t.height-o,d=l.find(u)||l.map(g=>({...g,overflow:Math.max(0,o-g.left)+Math.max(0,o-g.top)+Math.max(0,g.left+n-t.width+o)+Math.max(0,g.top+r-t.height+o)})).sort((g,x)=>g.overflow-x.overflow)[0],h=ne.clamp(d.left,o,Math.max(o,t.width-n-o)),p=ne.clamp(d.top,o,Math.max(o,t.height-r-o));e.style.left=`${h}px`,e.style.top=`${p}px`,e.style.right="auto",e.style.bottom="auto",e.dataset.placement=d.name}function Oa(i){if(document.querySelectorAll(".axes-data-mark.is-focus").forEach(t=>t.classList.remove("is-focus")),i<0)return;let e=document.querySelector(`#d3-canvas .axes-data-mark[data-quote-index="${i}"]`);e&&e.classList.add("is-focus")}function Oi(i,e){let t=dt[i];if(!t)return;_n.index=i,Oa(i),document.getElementById("qpWho").textContent=t.participant||"Participante an\xF3nimo";let n=document.getElementById("qpTag");n.textContent=(t.label||"neutral").charAt(0).toUpperCase()+(t.label||"neutral").slice(1),n.className="tag "+(t.label||"neutral"),document.getElementById("qpWhen").textContent=t.formatted_date||t.date||"Fecha no especificada",document.getElementById("qpText").textContent="\u201C"+(t.text||"Sin texto disponible")+"\u201D",document.getElementById("qpYear").textContent=t.year?"A\xF1o "+t.year:"A\xF1o no especificado";let r=document.getElementById("qpScore");if(r){let u=typeof t.score=="number"?t.score:null;if(u==null)r.style.display="none";else{r.style.display="flex";let d=document.getElementById("qpScoreBar"),h=ne.clamp(Math.abs(u),0,1)*50;d.style.width=h.toFixed(0)+"%",d.parentElement.classList.toggle("negative",u<0),d.parentElement.classList.toggle("positive",u>0),d.parentElement.classList.toggle("neutral",u===0),document.getElementById("qpScoreVal").textContent=u.toFixed(2)}}let o=document.getElementById("quotePanel"),s=t.label||"neutral",a=typeof t.score=="number"?t.score:0,c=s==="hawkish"?"var(--color-gold)":s==="dovish"?"var(--color-dovish)":"rgba(223, 229, 240, 0.96)",l=1.9+Math.min(Math.abs(a),1)*1.4;o.dataset.tone=s,o.style.setProperty("--quote-border-color",c),o.style.setProperty("--quote-border-width",`${l.toFixed(2)}px`),o.hidden=!1,o.setAttribute("aria-hidden","false"),o.classList.add("visible"),fv(e),Cn.card&&document.activeElement===Cn.card&&document.getElementById("quotePanelClose").focus({preventScroll:!0})}var vy=!1,Ey=0,Xh=null;function My(i){_n.index!==i&&(_n.index=i,Oa(i))}function su(){let i=B_();i>=0?Oi(i):Ha()}function PT(i,e){if(!kr.classList.contains("visible"))return!1;let t=kr.getBoundingClientRect();return i>=t.left&&i<=t.right&&e>=t.top&&e<=t.bottom}function IT(i,e){let t=performance.now();if(t-Ey<32)return;Ey=t;let n=hv(i,e),r=n>=0;if(r!==vy&&(vy=r,document.body.style.cursor=r?"pointer":Ds===1?"grab":""),!Ml())if(r){if(PT(i,e)||n===An.hover&&An.hover>=0)return;Xh&&clearTimeout(Xh),Xh=setTimeout(()=>{Rh(n),My(n)},fe.interaction?.hoverDelayMs??90)}else(An.hover>=0||_n.index>=0)&&(Ch(),My(-1))}var DT=kf;kf=function(i,e){DT(i,e),IT(i,e)};var UT=hu;hu=function(i,e,t){let n=hv(i,e,t?.pointerType==="touch"?fe.interaction?.touchRadiusMul??2.2:1);if(n>=0){Rn(n),Oi(n);return}Ml()&&Ha(),UT(i,e)};var fn=0,pv=0,Or=1,vn=1,Yt=1,NT=["axes","voices","acts","timeline","quotes"],Ef={axes:0,voices:0,acts:0,timeline:0,quotes:0},yn={axes:0,voices:0,acts:0,timeline:0,quotes:0},vi=null,ys=0,Mf=!1,Is=(i,e)=>{i in Ef&&(Ef[i]=ne.clamp(Number(e)||0,0,1))};window.addEventListener("particle-act-focus",i=>{vi=i.detail?.date||null});var qt=fe.door&&fe.door.transition==="doorway"?"doorway":"classic";qt==="classic"&&document.body.classList.add("mode-classic");var wt=0,Fl=1,qh=0,dr=0,fo=0,Yh=new L(0,.7,0),mv=new L(fe.door?.roomLook?.x??0,fe.door?.roomLook?.y??.45,fe.door?.roomLook?.z??-2),by=document.getElementById("roomTitle"),BT=new ft,Zl=new ht,Ty=new L,Ol=fe.door?.roomLook?.y??.45,Wf=!0;function Sy(i){let{width:e,height:t}=nn(),n=BT;return n.fov=fe.camera.fov,n.aspect=e/t,n.near=.1,n.far=100,n.position.set(fe.camera.x,fe.door?.roomCamY??.62,fe.door?.roomCamZ??-.5),n.up.set(0,1,0),n.lookAt(fe.door?.roomLook?.x??0,i,fe.door?.roomLook?.z??-2),n.updateMatrixWorld(!0),n.updateProjectionMatrix(),Ty.set(fe.room?.figure?.x??0,Zl.min.y,fe.room?.figure?.z??-4.8).project(n),(1-Ty.y)*.5*t}function FT(){if(Wf=!1,!Xt||!by)return;let i=Xt.figures.get("soporte")?.root;if(!i)return;let e=Xt.group,t=e.scale.x,n=e.position.y;if(e.scale.setScalar(1),e.position.y=0,e.updateMatrixWorld(!0),Zl.setFromObject(i),e.scale.setScalar(t),e.position.y=n,e.updateMatrixWorld(!0),Zl.isEmpty()||!Number.isFinite(Zl.min.y))return;let{height:r}=nn(),o=by.offsetTop;if(!Number.isFinite(o)||o<=0)return;let s=o-Math.max(24,r*(Li.gapRatio??.045)),a=Ol,c=Ol+.15,l=Sy(a),d=(Sy(c)-l)/(c-a);!Number.isFinite(d)||Math.abs(d)<1||(mv.y=ne.clamp(a+(s-l)/d,Ol-.7,Ol+.35))}var wy=new L(0,mo,0),Ay=new L,vs=[{id:"hero",pos:[0,.72,7.15],look:[0,.95,-.25]},{id:"stageObjective",pos:[0,.7,4.45],look:[0,.78,-.55]},{id:"stageHook",pos:[0,.6,5.8],look:[0,.7,0]},{id:"stageAxes",pos:[0,.6,5.8],look:[0,.7,0]},{id:"stageWordEvolution",pos:[1.3,.74,5.1],look:[0,.68,0]},{id:"stageVoices",pos:[1.1,.74,5.2],look:[0,.68,0]},{id:"stageActs",pos:[-1.1,.74,5.2],look:[0,.68,0]},{id:"stageCounters",pos:[0,.68,5.5],look:[0,.7,0]},{id:"stagePipeline",pos:[1.5,.8,4.9],look:[0,.66,0]},{id:"stageResults",pos:[0,.76,5.2],look:[0,.68,0]},{id:"stageTimeline",pos:[-1.5,.8,4.9],look:[0,.66,0]},{id:"stageQuotes",pos:[0,.72,5.4],look:[0,.7,0]},{id:"stageClosing",pos:[0,.6,5.8],look:[0,.7,0]}],Di=[];function bf(){if(!0){let n=fe.coin.baseY;fe.camera.y=n+.38,vs[0].pos=[0,fe.camera.y,fe.camera.z],vs[0].look=[0,n,0];let r=fe.door.approachCamY??.62,o=fe.door.approachCamZ??fe.camera.z;vs[1].pos=[0,r,o],vs[1].look=[0,r,0]}let i=document.documentElement.scrollHeight-window.innerHeight,e=[],t=vs.length;for(let n=0;n<t;n++){let r=vs[n],o=document.getElementById(r.id),s;if(o&&i>0){let a=o.getBoundingClientRect(),c=a.top+window.scrollY+a.height/2;s=ne.clamp((c-window.innerHeight*.5)/i,0,1)}else s=t>1?n/(t-1):0;if(r.id==="stageObjective"){let a=document.getElementById("hero"),c=a?a.offsetHeight:window.innerHeight;s=ne.clamp(c/Math.max(i,1e-4),0,1)}e.push({id:r.id,p:s,pos:r.pos,look:r.look})}if(i>0){let n=e.find(o=>o.id==="stageObjective"),r=document.getElementById("stageRoom");if(n&&r){let o=r.getBoundingClientRect().top+window.scrollY-window.innerHeight*.85,s=ne.clamp(o/i,0,1),a=e.indexOf(n);e.splice(a+1,0,{id:"doorwayHold",p:Math.max(s,n.p+.001),pos:n.pos,look:n.look})}}for(let n=1;n<e.length;n++)e[n].p<e[n-1].p&&(e[n].p=e[n-1].p+.001);Di=e}var Es=new L,Ms=new L;function OT(i){if(ni)return Es.set(fe.camera.x,mo,fe.camera.z),Ms.set(0,mo,0),{pos:Es,look:Ms};let e=ne.clamp(i,0,1);if(!Di.length)return Es.set(fe.camera.x,mo,fe.camera.z),Ms.set(0,mo,0),{pos:Es,look:Ms};let t=Di[0],n=Di[Di.length-1];for(let s=0;s<Di.length-1;s++)if(e>=Di[s].p&&e<=Di[s+1].p){t=Di[s],n=Di[s+1];break}let r=Math.max(n.p-t.p,1e-4),o=ne.smoothstep((e-t.p)/r,0,1);return Es.set(ne.lerp(t.pos[0],n.pos[0],o),ne.lerp(t.pos[1],n.pos[1],o),ne.lerp(t.pos[2],n.pos[2],o)),Ms.set(ne.lerp(t.look[0],n.look[0],o),ne.lerp(t.look[1],n.look[1],o),ne.lerp(t.look[2],n.look[2],o)),{pos:Es,look:Ms}}var Ry=new L,Cy=new L;uo(async()=>{let{initVoiceExplorer:i}=await Promise.resolve().then(()=>(Y_(),q_));i({quotes:dt,openQuote:Oi,closeQuotePanel:Ha})});var po=[],Ea=0,gv=0,Tf=!1;document.addEventListener("visibilitychange",()=>{document.hidden&&(Tf=!0)});var Ua=!1,xv=0,jh=0;function _v(){Ua||(Ua=!0,xv=performance.now())}function Sf(i){if(!tt||Math.abs(i-Dn)<.05)return;Dn=i,tt.setPixelRatio(Dn);let e=nn();tt.setSize(e.width,e.height,!1),typeof ou=="function"&&ou()}function HT(){if(Us||!tt)return;Us=!0;try{tt.render(ut,Mt)}catch{}let i=null;try{i=Ia.toDataURL("image/png")}catch{}let e=!1;if(i&&i.length>1e3)try{let t=document.createElement("img");t.id="canvasPoster",t.src=i,t.alt="",t.setAttribute("aria-hidden","true"),t.style.cssText="display:block; position:fixed; inset:0; width:100%; height:100%; z-index:2; object-fit:fill; pointer-events:none;",Ia.replaceWith(t),e=!0}catch{}if(gsap.ticker.remove(yv),e)try{let n=tt.getContext().getExtension("WEBGL_lose_context");n&&n.loseContext()}catch{}document.body.dataset.perfPoster="1",console.info("[perf] Modo p\xF3ster: la escena 3D queda como imagen fija (DPR 0,75 no fue suficiente). El relato sigue en el DOM.")}function yv(){gv++;let i=performance.now(),e=Ea>0?Math.min(i-Ea,100):1e3/60;if(Ea>0&&Ua)if(Tf)Tf=!1;else{let W=i-Ea;W<2e3&&po.push(W)}Ea=i;let t=gT.getElapsedTime(),n=ne.smoothstep(dr,0,1),r=wt,o=wt*(1-n);if(zl.length){let W=wt<.55;for(let R=0;R<zl.length;R++)zl[R].visible=W}if(Gl&&Vl){let W=ne.smoothstep(wt,.14,.72),R=ne.degToRad(85)*W;Gl.rotation.z=R*(Gl.userData.openSign||1),Vl.rotation.z=R*(Vl.userData.openSign||-1)}if(sf&&af){let W=ne.smoothstep(wt,.04,.42),R=ne.degToRad(78)*W;sf.rotation.y=R,af.rotation.y=-R}if(Wl){let W=ne.smoothstep(wt,.02,.22),R=1-ne.smoothstep(wt,.32,.52),he=W*R;Wl.opacity=.1*he,Wl.emissiveIntensity=.03+.42*he}if(NT.forEach(W=>{yn[W]=cr(yn[W],Ef[W],ni?1:.14,e)}),va=cr(va,Jy,.06,e),_s=cr(_s,Qy,.06,e),du||(Xl=cr(Xl,0,.05,e),ql=cr(ql,0,.05,e)),In.children.length>0){kh<0&&(kh=t);let W=t-kh,R=Math.min(W/(ni?1.2:1.8),1),he=1-Math.pow(1-R,3),pe=ni?.12:1;In.rotation.y=W*ho.swaySpeedY*he*pe+va*.08*pe+Xl,In.rotation.x=-.11+.018*Math.sin(W*ho.tiltSpeed*pe)+_s*-.12*pe+ql,In.position.y=ho.baseY+ho.floatAmount*Math.sin(W*ho.floatSpeed*pe)*pe,Xy.position.set(va*2.5,fe.coin.baseY+_s*-1.8,4),In.getWorldPosition(Ul),Ul.project(Mt);let ye=nn(),$=(Ul.x*.5+.5)*ye.width,ue=(-Ul.y*.5+.5)*ye.height;if(Jh.style.transform=`translate3d(${$}px, ${ue}px, 0)`,Or=ne.clamp(1-fn/.45,0,1),Ll)if(!0)Ll.style.opacity="0";else{let U=Math.max(20,Bf*.48);Ll.style.transform=`translate3d(${$}px, ${ue+U}px, 0) scale(${.82+Or*.18})`,Ll.style.opacity=(Or*.46).toFixed(3)}if(In.visible=Ds===1&&Or>.01,In.position.z=.55,In.visible){let U=Or<.999;for(let M=0;M<Hl.length;M++)Hl[M].transparent=U,Hl[M].opacity=Or}}let s=vn;if(it.children.length>0){fn<.02&&dr<.01&&(Yt=1,vn=Math.max(vn,.98)),vn=cr(vn,Yt,.12,e),Yt===0&&vn<.03&&(vn=0);let W=0,R=qt==="doorway"?ne.smoothstep(dr,0,.18):0;if(s=vn*(1-W)*(1-R),it.visible=s>.001&&!!lr,!it.visible)Ui&&(Ui.visible=!1),hr.visible=!1,Bi&&(Bi.visible=!1),ut.fog&&(ut.fog.density=0);else{let he=vn*vn*(3-2*vn),pe=1-ne.smoothstep(fn,.18,.88),ye=1-pe;it.rotation.y=va*.05*he*ye,it.position.x=fe.door.baseX,it.position.z=fe.door.heroBaseZ??fe.door.baseZ??0;let $=ne.lerp(1.25/Math.max(fe.door.widthVsCoin,.001),1,1-ne.smoothstep(fn,.18,.88)),ue=ne.lerp(1.55,1,pe),U=(.94+.06*he)*$*ue;if(wt<.001?Fl=1:qh<=.001&&wt>.001&&(Fl=it.scale.x/Math.max(U,1e-6)),wt<qh-.01&&(Fl=1),it.scale.setScalar(U*Fl),qh=wt,wt<.01&&lr&&La>0){let Y=nn(),Le=La*Ni.scale.y*it.scale.y,Ce=Math.max(Mt.position.distanceTo(it.position),.1),Ie=Le*Y.height/(2*Ce*Math.tan(ne.degToRad(Mt.fov*.5)));Cy.copy(it.position).project(Mt);let we=(-Cy.y*.5+.5)*Y.height,Se=2*Math.max(80,Math.min(we-Y.height*.02,(Ns?.band?.bottom??Y.height*.72)-we)),Ye=Y.width/Math.max(window.devicePixelRatio||1,1)<=900||Y.height<=760,at=Y.height*(Ye?.3:.52),He=ne.lerp(at,Se,pe);Ie>He&&it.scale.multiplyScalar(He/Ie)}let M=lr?Ca*Ni.scale.y*it.scale.x:0,y=(fe.door.groundY??0)-M;it.rotation.x=-.12*pe+_s*-.03*he*ye,it.position.y=ne.lerp(y,fe.coin.baseY,pe)+_s*-.06*he*ye;let B=go?1:0,K=go?0:1,Z=ne.smoothstep(fn,.18,.88);go&&(go.visible=s>.001),of&&(of.visible=s>.001&&K>.001);let ee=1,ve=1-ne.smoothstep(wt,.86,.96),[me,xe]=fe.door?.leafFadeT??[.84,.94],Me=Math.abs(s-on.vis)>1e-4||Math.abs(Z-on.colorT)>1e-4||Math.abs(wt-on.crossT)>1e-4||Math.abs(fn-on.scatter)>1e-4||Math.abs(dr-on.exitT)>1e-4||Math.abs(vn-on.fade)>1e-4;if(on.vis=s,on.colorT=Z,on.crossT=wt,on.scatter=fn,on.exitT=dr,on.fade=vn,Me)for(let Y=0;Y<cf.length;Y++){let Le=cf[Y],Ce=Le.userData?.bcchKind||"frame",Ie=Ce==="leaf",we=Ie||Ce==="medal",Se=Ce==="aperture",Ne=ne.smoothstep(Z,.1,1),Ye=Ie?1-ne.smoothstep(wt,me,xe):1,at=Ie?Ye:(Se?ee:1)*ve,He=s*B*at;Le.transparent=He<.999,Le.opacity=He,Le.color.copy(Zy).lerp(lT,Z),Le.envMapIntensity=we?ne.lerp(.22,.58,Ne):ne.lerp(.1,.24,Ne),Le.emissive&&(Le.emissive.copy(we?uT:dT),Le.emissiveIntensity=(we?.006:.0015)*Ne)}if(Me){for(let Y=0;Y<lf.length;Y++){let Le=lf[Y],Ce=Le.kind==="leaf"?1-ne.smoothstep(wt,me,xe):(Le.kind==="aperture"?ee:1)*ve;Le.m.opacity=Le.baseOpacity*s*B*Ce*(.55+.45*Z)}for(let Y=0;Y<Aa.length;Y++){let Le=s*K;Aa[Y].transparent=Le<.999,Aa[Y].opacity=Le}for(let Y=0;Y<ff.length;Y++)ff[Y].opacity=.42*s*K;for(let Y=0;Y<kl.length;Y++)kl[Y].m.opacity=kl[Y].baseOpacity*s*K}if(Me&&!0&&Ra.length){let Y=ne.smoothstep(fn,.28,.9),Le=ne.smoothstep(wt,.1,.6);for(let Ce=0;Ce<Ra.length;Ce++){let Ie=Ra[Ce],we=Ie.m,Se=fe.door.leaf,Ne=Ie.tone==="orn",Ye=Ie.tone==="dark",at=Ne?Se.meetOrn:Ye&&Se.meetDark||Se.meet,He=Ne?Se.crossOrn:Ye&&Se.crossDark||Se.cross,be=Ne?Zb:Ye?$b:Yb,k=Ne?Jb:Ye?Kb:jb;we.color.copy(Ky).lerp(be,Y).lerp(k,Le),we.metalness=ne.lerp(ne.lerp(Se.hero.metalness,at.metalness,Y),He.metalness,Le),we.roughness=ne.lerp(ne.lerp(Se.hero.roughness,at.roughness,Y),He.roughness,Le),we.envMapIntensity=ne.lerp(ne.lerp(Se.hero.envMapIntensity,at.envMapIntensity,Y),He.envMapIntensity,Le)}for(let Ce=0;Ce<tu.length;Ce++){let Ie=tu[Ce],we=Ie.m,Se=nu[Ie.tone]||nu.stone;we.color.copy(Se.hero).lerp(Se.meet,Y);let Ne=fe.door.frameAnim,Ye=Ie.tone==="dark"?.72:Ie.tone==="granite"?.82:1;if(we.metalness=ne.lerp(Ne.hero.metalness,Ne.meet.metalness,Y)*Ye,we.roughness=ne.lerp(Ne.hero.roughness,Ne.meet.roughness,Y),we.envMapIntensity=ne.lerp(Ne.hero.envMapIntensity,Ne.meet.envMapIntensity,Y)*Ye,we.bumpScale!=null){let at=Ie.tone==="dark"?.55:1;we.bumpScale=ne.lerp(Ne.hero.bumpScale,Ne.meet.bumpScale,Y)*at}we.emissive&&(we.emissive.setRGB(0,0,0),we.emissiveIntensity=0)}Ii[0]&&(Ii[0].color.copy(Qb).lerp(eT,Y),Ii[0].intensity=ne.lerp(8.5,13.5,Y)),Ii[1]&&(Ii[1].color.copy(tT).lerp(nT,Y),Ii[1].intensity=ne.lerp(4.8,7.5,Y)),Ii[2]&&(Ii[2].intensity=ne.lerp(2.4,4.2,Y))}let Ee=s>.01&&!!lr;if(Ui&&(Ui.visible=Ee),hr.visible=Ee&&!(fn<.55),hr.material.opacity=.8*he*(1-W),ut.fog&&(ut.fog.density=Ee?fe.door.fogDensity*he:0),hr.position.set(it.position.x,it.position.y+M,it.position.z),Bi&&lr&&xo){let Y=(Ca+iu)*.5*Ni.scale.y;Bi.position.set(0,Y+.08,-.34),Bi.scale.set(xo.width*Ni.scale.x*1.78,Math.max(La*Ni.scale.y*1.08,1),1);let Le=1-ne.smoothstep(wt,.12,.36),Ce=ne.smoothstep(fn,.48,.92)*Le;hf.opacity=Ee?.18*he*Ce:0,Bi.visible=hf.opacity>.002}Ee&&(Ry.set(it.position.x,it.position.y,it.position.z),Ii.forEach(Y=>{Y.target.position.copy(Ry),Y.target.updateMatrixWorld()}))}}let a=fe.door?.roomSwarm??{x:0,y:.55,lead:2,leadOut:1.2,scale:.35},c=qt==="doorway"&&o>0?ne.smoothstep((o-.25)/.5,0,1):0,l=ne.lerp(1,a.scale??.35,c),u=ne.lerp(a.leadOut??1.2,a.lead??2,c);Gn.position.set(ne.lerp(0,a.x??0,c),ne.lerp(0,a.y??.55,c),Gn.position.z),Gn.scale.setScalar(l),xf.size=cv*l;let d=t*.12+fn*.8,h=c*Math.sin(t*.35)*.06,p=Math.max(yn.axes,yn.timeline,yn.voices*fo,yn.acts*ys);Gn.rotation.y=d*(1-c)*(1-p)+h;let g=qt==="doorway"?ne.smoothstep((o-.3)/.5,0,1):0,x=rn.participant||rn.rendered;fo=cr(fo,rn.participant?1:0,ni?1:.08,e),ys=cr(ys,vi?1:0,ni?1:.08,e),!rn.participant&&fo<.005&&(rn.rendered=null);let m=_n.index>=0?_n.index:-1,f=yn.voices*fo,v=yn.acts*ys,_=yn.quotes,T=Math.abs(g-Pn.roomWarm)>1e-4||Math.abs(fo-Pn.voiceFocusMix)>.001||Math.abs(ys-Pn.actFocusMix)>.001||Math.abs(_-Pn.quoteStageMix)>.001||x!==Pn.focusName||m!==Pn.activeQuoteIndex||vi!==Pn.selectedActDate;Pn.roomWarm=g,Pn.voiceFocusMix=fo,Pn.actFocusMix=ys,Pn.quoteStageMix=_,Pn.focusName=x,Pn.activeQuoteIndex=m,Pn.selectedActDate=vi;let A=Hr.nearFade??null,b=!1;if(A){let W=ur.attributes.position.array;for(let R=0;R<jt;R++){xy.set(W[R*3],W[R*3+1],W[R*3+2]).applyMatrix4(Gn.matrixWorld);let he=ne.smoothstep(xy.distanceTo(Mt.position),A[0],A[1]);Math.abs(he-zh[R])>.01&&(zh[R]=he,b=!0)}}if(T||b){let W=ur.attributes.color.array;for(let R=0;R<jt;R++){let he=R*3,pe=dt[R],ye=!!(x&&pe&&pe.participant===x),$=!!(vi&&gf[R]===vi),ue=R===m,U=x?ne.lerp(1,ye?1:.1,f):1,M=vi?ne.lerp(1,$?1:.16,v):1,y=m>=0?Math.max(.55,_*.82):0,B=m>=0?ne.lerp(1,ue?1.15:.28,y):1,K=U*M*B,Z=g*.22,ee=ne.lerp(Fi[he],1,Z),ve=ne.lerp(Fi[he+1],.8,Z),me=ne.lerp(Fi[he+2],.52,Z),xe=ne.clamp(Math.max(K,.22),0,1),Me=Math.max(1,K),Ee=Math.max(Fi[he]*.34,.14),Y=Math.max(Fi[he+1]*.34,.16),Le=Math.max(Fi[he+2]*.34,.2),Ce=zh[R];W[he]=ne.lerp(Ee,ee,xe)*Me*Ce,W[he+1]=ne.lerp(Y,ve,xe)*Me*Ce,W[he+2]=ne.lerp(Le,me,xe)*Me*Ce}ur.attributes.color.needsUpdate=!0}let S=ur.attributes.position.array,P=ne.lerp(fn,.06,c),E=Mf?yn.axes:0,w=Mf?yn.timeline:0,I=Dh(ni?1:.16,e),O=Math.max(E,w,f,v),te=En?.window??null,D=te?ne.smoothstep(wt,te[0],te[1])*(1-ne.smoothstep(wt,te[2],te[3])):0;D>0&&(Gn.updateMatrixWorld(!0),gy.copy(Gn.matrixWorld).invert());for(let W=0;W<jt;W++){let R=W*3,he=Ss[R],pe=Ss[R+1],ye=Ss[R+2],$=ws[R],ue=ws[R+1],U=ws[R+2],M=ne.lerp(he,$,P),y=ne.lerp(pe,ue,P),B=ne.lerp(ye,U,P),K=Math.sin(t*.9+W*.5)*.08*Sb*(1-O),Z=M+K,ee=y+K,ve=B,me=dt[W];if(E>0&&(Z=ne.lerp(Z,As[R],E),ee=ne.lerp(ee,As[R+1],E),ve=ne.lerp(ve,As[R+2],E)),w>0&&(Z=ne.lerp(Z,Ls[R],w),ee=ne.lerp(ee,Ls[R+1],w),ve=ne.lerp(ve,Ls[R+2],w)),f>0&&x&&me?.participant===x&&(Z=ne.lerp(Z,Rs[R],f),ee=ne.lerp(ee,Rs[R+1],f),ve=ne.lerp(ve,Rs[R+2],f)),v>0&&vi&&gf[W]===vi&&(Z=ne.lerp(Z,Cs[R],v),ee=ne.lerp(ee,Cs[R+1],v),ve=ne.lerp(ve,Cs[R+2],v)),D>0){zn.set(Z,ee,ve).applyMatrix4(Gn.matrixWorld);let xe=1-ne.smoothstep(Math.abs(zn.z-En.z)/En.depth,0,1);if(xe>.002){let Me=xe*(En.squeeze??.75)*D;zn.x+=(ru[W*2]-zn.x)*Me,zn.y+=(ru[W*2+1]-zn.y)*Me,zn.z>En.z&&(zn.z+=(En.z-zn.z)*xe*(En.zSqueeze??.6)*D),zn.applyMatrix4(gy),Z=zn.x,ee=zn.y,ve=zn.z}}S[R]+=(Z-S[R])*I,S[R+1]+=(ee-S[R+1])*I,S[R+2]+=(ve-S[R+2])*I}ur.attributes.position.needsUpdate=!0;let X=1-(it.children.length>0?s:0)*.85;Pf.intensity=xt.key.intensity*X,If.intensity=xt.fill.intensity*X,Df.intensity=xt.rim.intensity*X,Uf.intensity=xt.front.intensity*X,Wy.intensity=xt.ambient.intensity*X;let z=OT(pv),V=1-ne.smoothstep(fn,.18,.88);if(V>0){let W=fe.door.approachCamY??.62,R=fe.door.approachCamZ??fe.camera.z;z.pos.set(0,ne.lerp(W,fe.camera.y,V),ne.lerp(R,fe.camera.z,V));let he=nn().height,pe=Math.max(fe.camera.z-.55,.001),ye=he/(2*Math.tan(fe.camera.fov*Math.PI/360)*pe),$=fe.coin.baseY+(Ns.centerY-he/2)/Math.max(ye,1e-6);z.look.set(0,ne.lerp(W,$,V),0)}if(qt==="doorway"&&r>.001){let W=fe.door.approachCamY??.62,R=fe.door.approachCamZ??fe.camera.z,he=ne.smoothstep(r,0,1),pe=ne.smoothstep(r,.04,.38),ye=ne.smoothstep(r,.38,.72),$=ne.lerp(0,0,ye);Mt.position.set(ne.lerp(0,fe.camera.x,he),ne.lerp(W,fe.door.roomCamY??.62,he)+$,ne.lerp(R,fe.door.roomCamZ??-.5,he)),n>.001&&Mt.position.lerp(z.pos,n),Gn.position.z=ne.lerp(0,Mt.position.z-u,c);let[ue,U]=fe.door.aimDoorT??[0,.45],[M,y]=fe.door.aimRoomT??[.55,.95],B=ne.smoothstep((r-ue)/Math.max(U-ue,.001),0,1),K=ne.smoothstep((r-M)/Math.max(y-M,.001),0,1);wy.set(0,fe.door.approachCamY??.62,0),Ay.set(it.position.x,it.position.y+(Ca+iu)*.5*Ni.scale.y*it.scale.x,it.position.z),Yh.copy(wy).lerp(Ay,B).lerp(mv,K),n>.001&&Yh.lerp(z.look,n),Mt.lookAt(Yh)}else Mt.position.copy(z.pos),Mt.lookAt(z.look);if(eu){let W=qt==="doorway"?ne.smoothstep(o,.1,.45):0;eu.intensity=W*(fe.door?.roomLight?.intensity??10)}let j=fe.camera.fov+(qt==="doorway"?Math.sin(Math.PI*ne.clamp(r,0,1))*(fe.door?.fovKick??4):0);Math.abs(Mt.fov-j)>.01&&(Mt.fov=j,Mt.updateProjectionMatrix());let ce=qt==="doorway"?Math.sin(Math.PI*ne.clamp((r-.6)/.4,0,1)):0,se=1-ne.smoothstep(n,.95,1),F=qt==="doorway"?ne.smoothstep(n,0,.5)*se:0,N=qt==="doorway"?ne.smoothstep(n,.55,.9)*se:0;if(ut.fog){let W=ce*(fe.door?.veilFog??0),R=F*(fe.door?.exitFog??.16)+N*(fe.door?.exitFogSink??.14);ut.fog.density=Math.max(ut.fog.density,W,R)}let q=Math.max(Ta,yn.voices*.72,yn.acts*.64,yn.timeline*.78,yn.quotes*.7),de=Math.max(Hr.stageFloor??.62,1-(Hr.stageFalloff??.38)*q),_e=Math.max(Hr.ambientFloor??.62,.82-.3*fn),ie=qt==="doorway"?1-(1-(Hr.figureFloor??.6))*ne.smoothstep((c-.1)/.5,0,1):1;xf.opacity=_e*(1-.5*ce)*de*ie;let H=qt==="doorway"?ne.smoothstep((wt-.04)/.3,0,1):Ds!==1?1:0,Q=qt==="doorway"?ne.smoothstep(n,.85,.95):0,le=1-ne.smoothstep(n,.25,.85);if(Xt)if(Wf&&FT(),Xt.group.visible=H>.01&&Q<.99,!Xt.group.visible)Ts.intensity=0,wa.intensity=0,ii.visible=!1,Xt.group.scale.setScalar(.86+.14*H),Xt.group.position.y=(1-H)*.5;else{Xt.group.scale.setScalar(.86+.14*H),Xt.group.position.y=(1-H)*.5;let W=!1,R=wt>.6&&n<.001;Xt.figures.forEach(y=>{y.placeholder&&(y.placeholder.visible=R,y.placeholder.rotation.y=t*.18*H,y.placeholder.position.y=Math.sin(t*.6+y.def.x)*.04*H),y.model&&(W=!0)});let he=W?H*le*(1-Q):0,pe=Xt.figures.get("balanza"),ye=pe?.def,$=(ye?.x??0)+Xt.group.position.x,ue=ye?.z??fe.room?.figure?.z??-4.8,U=Xt.group.position.y+.55*(ye?.scale??1.15)+(pe?.root?.position.y??0);Ts.intensity=he*(fe.room?.accentIntensity??14),Ts.position.set($+.9,3.1,ue+2.2),au.position.set($,U,ue),wa.position.set($-2.2,1.5,ue+2.1),wa.intensity=he*(fe.room?.fillIntensity??4);let M=Xt.figures.get("soporte");ii.position.set($,Xt.group.position.y+(M?.height??0)*.25,ue),ii.scale.setScalar(Xt.group.scale.x),pu.uniforms.uFocus.value=RT(),ST(ni?0:t,he)}if(tt&&Oy&&(tt.render(ut,Mt),Ua&&!ni&&!Ba&&po.length>=90)){let W=0;for(let he=0;he<po.length;he++)W+=po[he];let R=W/po.length;po.length=0,Gy=R,R>26&&Dn>.75?Sf(Math.max(.75,Dn-.25)):R<12&&Dn<Ei&&Sf(Math.min(Ei,Dn+.25)),Dn<=.76&&R>42&&i-xv>15e3?(jh++,jh>=3&&HT()):jh=0}}gsap.ticker.add(yv);var kr=document.getElementById("quotePanel"),Ly=null;function Ha(){kr.classList.remove("visible"),kr.setAttribute("aria-hidden","true"),clearTimeout(Ly),Ly=setTimeout(()=>{kr.classList.contains("visible")||(kr.hidden=!0)},360),bl(),_n.index=-1,Oa(-1),Cn.card&&(Cn.card.focus({preventScroll:!0}),Cn.card=null)}document.getElementById("quotePanelClose").addEventListener("click",Ha);window.addEventListener("resize",()=>{kr.classList.contains("visible")&&fv()});window.addEventListener("keydown",i=>{if(i.key!=="Escape")return;if(kr.classList.contains("visible")){Ha();return}(rn.participant||vi||_n.index>=0)&&(Tl(),vi=null,_n.index=-1,Oa(-1),window.dispatchEvent(new CustomEvent("focus-clear")))});function Xf(){let{width:i,height:e}=ti();Mt.aspect=i/e,Mt.updateProjectionMatrix(),tt&&!Us&&(tt.setPixelRatio(Dn),tt.setSize(i,e)),ou(),jy(),Wf=!0,Hf(),$y()}window.addEventListener("resize",Xf);window.visualViewport&&window.visualViewport.addEventListener("resize",Xf);var Ta=0,Pi=new ft;function kT(){let{width:i,height:e}=nn();return Pi.aspect=i/e,Pi.fov=fe.camera.fov,Pi.near=Mt.near,Pi.far=Mt.far,Pi.position.set(fe.camera.x,fe.camera.y,fe.camera.z),Pi.up.set(0,1,0),Pi.lookAt(0,mo,0),Pi.updateProjectionMatrix(),Pi.updateMatrixWorld(!0),Pi}function zT(i,e){let{xScale:t,yScale:n}=lo.scales;if(!t||!n)return new L(0,0,0);let r=t(i),o=n(e),s=nn(),a=r/s.width*2-1,c=-(o/s.height)*2+1,l=kT(),d=new L(a,c,.5).unproject(l).sub(l.position).normalize(),h=-l.position.z/d.z;return l.position.clone().add(d.multiplyScalar(h))}function vv(){if(!dt.length||!lo.scales.xScale||!lo.scales.yScale)return;let i=new Map,e=new Map;dt.forEach((t,n)=>{let r=t?.participant||"Participante an\xF3nimo",o=gf[n];i.has(r)||i.set(r,[]),e.has(o)||e.set(o,[]),i.get(r).push(n),e.get(o).push(n)}),i.forEach(t=>{t.forEach((n,r)=>{hy[n]=r,fy[n]=t.length})}),e.forEach(t=>{t.forEach((n,r)=>{py[n]=r,my[n]=t.length})}),dt.forEach((t,n)=>{let r=n*3,o=/^\d{4}-\d{2}-\d{2}$/.test(String(t?.date||""))?new Date(`${t.date}T00:00:00Z`):new Date(`${Number(t?.year)||2005}-01-01T00:00:00Z`),s=Al(t),a=zT(o,s);As[r]=a.x,As[r+1]=a.y,As[r+2]=.06+(Et(n,12)-.5)*.06;let c=t?.label==="hawkish"?.22:t?.label==="dovish"?-.22:0,l=Math.max(fy[n],1),u=hy[n];Rs[r]=(u-(l-1)/2)*.18,Rs[r+1]=.66+c+(Et(n,13)-.5)*.12,Rs[r+2]=-1.35+(Et(n,14)-.5)*.28;let d=Math.max(my[n],1),h=py[n];Cs[r]=(h-(d-1)/2)*.22,Cs[r+1]=.6+c*.8+(Et(n,15)-.5)*.15,Cs[r+2]=-1.05+(Et(n,16)-.5)*.22;let p=String(t?.date||"").match(/^(\d{4})/),x=(ne.clamp(Number(p?p[1]:t?.year)||2005,2005,2015)-2005)/10;Ls[r]=-2.65+x*5.3+(Et(n,17)-.5)*.11,Ls[r+1]=.66+s*1.05+(Et(n,18)-.5)*.12,Ls[r+2]=-.32+(Et(n,19)-.5)*.18}),Mf=!0}var GT=null,Ev=()=>GT||=Promise.resolve().then(()=>($_(),j_));uo(async()=>{let[{initD3Axes:i}]=await Promise.all([Ev(),Na()]);i({quotes:dt,openQuote:Oi})});vv();var Py;function Mv(){clearTimeout(Py),Py=setTimeout(async()=>{if(vv(),!W_().finished){bf();return}try{let[{initD3Axes:i},{initWordEvolution:e}]=await Promise.all([Ev(),Sv(),Na()]);i({quotes:dt,openQuote:Oi}),e(dt),_n.index>=0&&Oa(_n.index),bf()}catch(i){console.warn("Reconstrucci\xF3n de las secciones de datos incompleta:",i)}},150)}window.addEventListener("resize",Mv);window.visualViewport&&window.visualViewport.addEventListener("resize",Mv);function VT(){let i=document.getElementById("hookContent");if(!i)return;let e=gsap.utils.toArray(i.querySelectorAll(".signal-card")),t=i.querySelector(".hook-intro");gsap.timeline({scrollTrigger:{trigger:"#stageHook",start:"top 45%",end:"bottom bottom",scrub:1}}).fromTo("#stageHook h2[data-hook]",{opacity:0,y:16,filter:"blur(8px)"},{opacity:1,y:0,filter:"blur(0px)",duration:.1,ease:"none"},.08).fromTo(".hook-lead",{opacity:0,y:18,filter:"blur(8px)"},{opacity:1,y:0,filter:"blur(0px)",duration:.14,ease:"none"},.14).fromTo([t,".model-note"],{opacity:0,y:12},{opacity:1,y:0,duration:.12,ease:"none"},.26).fromTo(e,{opacity:0,y:28},{opacity:1,y:0,duration:.16,ease:"none",stagger:.09},.36).to(["#stageHook h2[data-hook]",i],{opacity:0,y:-18,duration:.12,ease:"none"},.88)}VT();function WT(){let i=document.querySelectorAll("#stageHook .signal-card[data-quote-index]");if(!i.length)return;let e=t=>{let n=Number(t.dataset.quoteIndex);!Number.isFinite(n)||!dt[n]||(Cn.card=t,Rn(n),Oi(n,{x:window.innerWidth*.62,y:window.innerHeight*.58}))};i.forEach(t=>{t.addEventListener("click",()=>e(t)),t.addEventListener("keydown",n=>{n.key!=="Enter"&&n.key!==" "||(n.preventDefault(),e(t))})})}WT();function XT(){let i=document.querySelector(".model-note-toggle"),e=document.getElementById("modelNotePanel");if(!i||!e)return;let t=n=>{i.setAttribute("aria-expanded",String(n)),e.hidden=!n};i.addEventListener("click",()=>t(i.getAttribute("aria-expanded")!=="true")),document.addEventListener("keydown",n=>{n.key==="Escape"&&i.getAttribute("aria-expanded")==="true"&&(t(!1),i.focus())})}XT();function qT(){let i=(e,t)=>{document.querySelector(e)&&ScrollTrigger.create({trigger:e,start:"top 82%",end:"bottom 18%",scrub:!0,onUpdate:n=>{let r=n.progress,o=ne.smoothstep(r/.18,0,1),s=ne.smoothstep((r-.82)/.18,0,1);Is(t,Math.min(o,1-s))},onLeave:()=>Is(t,0),onLeaveBack:()=>Is(t,0)})};i("#stageVoices","voices"),i("#stageActs","acts"),i("#stageTimeline","timeline"),i("#stageQuotes","quotes")}var YT=document.getElementById("tsProgress"),jT=document.getElementById("tsBar"),$T=document.getElementById("tsMarker"),KT=document.getElementById("tsSection"),$h=[{label:"hero",start:0},{label:"door",start:.04},...qt==="doorway"?[{label:"sala",start:.13}]:[],{label:"hook",start:.29},{label:"axes",start:.38},{label:"voices",start:.52},{label:"acts",start:.61},{label:"counters",start:.69},{label:"pipeline",start:.75},{label:"timeline",start:.83},{label:"quotes",start:.91},{label:"closing",start:.98}],Iy=document.getElementById("progressBar"),Kh=document.getElementById("sectionIndicator"),Dy,Sa=-1;function bv(){Sa=-1}window.addEventListener("resize",bv);ScrollTrigger.addEventListener("refresh",bv);var Uy=-1;function Tv(){let i=window.scrollY||document.documentElement.scrollTop;Sa<0&&(Sa=document.documentElement.scrollHeight-nn().height);let e=Sa>0?i/Sa:0;pv=e;let t=Math.round(e*100);if(t!==Uy&&(Uy=t,Iy.style.transform="scaleX("+t/100+")",Iy.setAttribute("aria-valuenow",String(t))),!Eo)return;YT.textContent=t+"%",jT.style.height=t+"%",$T.style.top=t+"%";let n="hero";for(let r=$h.length-1;r>=0;r--)if(e>=$h[r].start){n=$h[r].label;break}KT.textContent=n,Kh.textContent=n,Kh.style.opacity="0.6",clearTimeout(Dy),Dy=setTimeout(()=>{Kh.style.opacity="0"},1500)}window.addEventListener("scroll",Tv,{passive:!0});Tv();qT();var ZT=null,Sv=()=>ZT||=Promise.resolve().then(()=>(Z_(),K_));uo(async()=>{let[{initWordEvolution:i}]=await Promise.all([Sv(),Na()]);i(dt)});uo(async()=>{let{initActBrowser:i}=await Promise.resolve().then(()=>(Q_(),J_));i({quotes:dt,openQuote:Oi})});Eo&&(window.__diag={get state(){return{stage:Ds,scatter:Number(fn.toFixed(3)),coinVisible:In.visible,coinChildren:In.children.length,coinFade:Number(Or.toFixed(3)),crossT:Number(wt.toFixed(3)),exitT:Number(dr.toFixed(3)),y:Math.round(window.scrollY)}}},window.__objs={doorGroup:it,doorFloor:hr,swarm:Gn,orbitGroup:ii,figureGroup:Xt?Xt.group:null,scene:ut,camera:Mt});var mu=new Lenis({duration:ni?0:1.2,easing:i=>Math.min(1,1.001-Math.pow(2,-10*i)),smoothWheel:!ni});mu.on("scroll",ScrollTrigger.update);gsap.ticker.add(i=>{mu.raf(i*1e3)});gsap.ticker.lagSmoothing(0);(Eo||Ba)&&(window.lenis=mu);document.querySelector(".closing-cta")?.addEventListener("click",i=>{i.preventDefault(),mu.scrollTo(0,{duration:1.8,easing:e=>1-Math.pow(1-e,3)})});var qf=gsap.timeline({scrollTrigger:{trigger:".hero",start:"top top",end:"55% top",scrub:!0}});qf.to(".hero-title",{opacity:0,y:-60,ease:"cinematicSilk"},0);qf.to(".scroll-hint",{opacity:0,ease:"cinematicSilk"},0);qf.to("#haloWrap",{opacity:0,ease:"cinematicSilk"},0);ScrollTrigger.create({trigger:".hero",start:"top top",end:"bottom top",scrub:!0,onUpdate:i=>{fn=i.progress,!!0&&i.progress<.25&&(Yt=0,vn=0,it&&(it.visible=!1))},onLeaveBack:()=>{if(!0){Yt=1;return}Yt=0,vn=0,it&&(it.visible=!1)}});qt==="doorway"&&ScrollTrigger.create({trigger:"#stageObjective",start:"top 70%",end:"top 15%",scrub:!0,onUpdate:i=>{if(!0){Yt=1;return}Yt=ne.clamp(i.progress,0,1)}});ScrollTrigger.create({trigger:"#stageObjective",start:"top top",end:"bottom top",scrub:!0,onUpdate:i=>{let e=i.progress;if(qt==="doorway"){Yt=1;return}e<=0?Yt=0:e<.15?Yt=e/.15:e<=.35?Yt=1:e<.55?Yt=Math.max(0,1-(e-.35)/.2):Yt=0},onLeave:()=>{qt!=="doorway"&&(Yt=0)},onLeaveBack:()=>{qt!=="doorway"&&(Yt=0)}});if(qt==="doorway"){ScrollTrigger.create({trigger:"#stageRoom",start:"top 85%",end:"+=250%",scrub:!0,onUpdate:r=>{wt=r.progress}}),ScrollTrigger.create({trigger:"#stageHook",start:"top 80%",end:"top 30%",scrub:!0,onUpdate:r=>{dr=r.progress},onLeave:()=>{dr=1},onLeaveBack:()=>{dr=0}}),ScrollTrigger.create({trigger:"#stageHook",start:"top 85%",end:"top 20%",scrub:!0,onUpdate:r=>{Yt=1-ne.clamp(r.progress,0,1)},onLeave:()=>{Yt=0},onEnterBack:()=>{Yt=1}}),ScrollTrigger.create({trigger:"#stageRoom",start:"top 100%",end:"bottom 0%",onLeave:()=>{bl(),su()},onLeaveBack:()=>{bl(),su()}});let i=document.getElementById("roomTitle"),e=document.getElementById("roomLead"),t=document.getElementById("roomSub");if(window.matchMedia&&window.matchMedia("(pointer: coarse)").matches){let r=document.querySelector(".axes-reading-trace");r&&(r.textContent="toca un punto \u2192 fecha \xB7 voz \xB7 fragmento")}let n=document.getElementById("stageRoomContainer");if(i&&e&&t){let r={v:0},o=()=>{n&&n.style.setProperty("--room-scrim",r.v.toFixed(3))},s=1/285;gsap.timeline({scrollTrigger:{trigger:"#stageRoom",start:"top top",end:"bottom bottom",scrub:!0}}).fromTo(r,{v:0},{v:1,duration:16*s,ease:"none",onUpdate:o},72*s).fromTo(i,{opacity:0,y:18},{opacity:1,y:0,duration:14*s,ease:"none"},78*s).fromTo(e,{opacity:0,y:18},{opacity:1,y:0,duration:14*s,ease:"none"},90*s).fromTo(t,{opacity:0,y:14},{opacity:1,y:0,duration:14*s,ease:"none"},104*s).to(i,{opacity:0,y:-14,duration:10*s,ease:"none"},255*s).to(e,{opacity:0,y:-14,duration:10*s,ease:"none"},259*s).to(t,{opacity:0,y:-12,duration:10*s,ease:"none"},263*s).to(r,{v:.5,duration:10*s,ease:"none",onUpdate:o},263*s).to(r,{v:0,duration:6*s,ease:"none",onUpdate:o},279*s)}}var Zh=document.querySelector(".voices-intro"),Ny=document.getElementById("voiceExplorer");Zh&&Ny&&gsap.timeline({scrollTrigger:{trigger:"#stageVoices",start:"top 85%",end:"bottom bottom",scrub:!0}}).fromTo(Zh,{opacity:0,y:18},{opacity:1,y:0,duration:.12,ease:"none"},.04).fromTo(Ny,{opacity:0,y:24},{opacity:1,y:0,duration:.14,ease:"none"},.16).to(Zh,{opacity:0,y:-14,duration:.08,ease:"none"},.9);var JT=gsap.timeline({scrollTrigger:{trigger:"#stageObjective",start:"top top",end:"bottom bottom",scrub:!0}});JT.fromTo("[data-objective]",{opacity:0,y:30},{opacity:1,y:0,duration:.22,ease:"cinematicOut",stagger:.05},.06).to("[data-objective]",{opacity:0,y:-25,duration:.2,ease:"cinematicIn"},.8);var QT=document.querySelectorAll("#stageHook h2[data-hook]");QT.forEach((i,e)=>{let t=new SplitText(i,{type:"chars,words",charsClass:"char-reveal",wordsClass:"word-reveal"});gsap.fromTo(t.chars,{opacity:0,y:20,rotationX:-40},{opacity:1,y:0,rotationX:0,duration:.6,stagger:.02,ease:"cinematicOut",scrollTrigger:{trigger:i,start:"top 70%",end:"top 40%",toggleActions:"play none none reverse"}})});var eS=document.querySelectorAll("[data-counter]");eS.forEach(i=>{let e=i.querySelector(".counter-number");gsap.fromTo(i,{opacity:0,y:24},{opacity:1,y:0,duration:.6,ease:"cinematicOut",scrollTrigger:{trigger:i,start:"top 85%",toggleActions:"play none none reverse",onEnter:()=>{let t=e.dataset.target;if(!t||t.startsWith("[TODO"))return;let n=parseInt(t,10);if(!Number.isFinite(n))return;let r={val:0};gsap.to(r,{val:n,duration:1.5,ease:"cinematicSilk",onUpdate:()=>{e.textContent=Math.round(r.val)}})}}})});(function(){let e=document.getElementById("pipeTrack"),t=e?.closest(".pipe-viewport");if(!e||!t)return;let n=document.getElementById("seedGrid"),r=[],o=dt.filter($=>["hawkish","dovish","neutral"].includes($.label));o.forEach(($,ue)=>{let U=document.createElement("i");U.className=`seed-dot ${$.label}`,U.dataset.th=(.04+ue/Math.max(o.length,1)*.76).toFixed(3),U.title=`${$.label} \xB7 ${$.participant||"Participante an\xF3nimo"} \xB7 ${$.date||$.year||"fecha no especificada"}`,n.appendChild(U),r.push(U)});let s=o.length,a=document.getElementById("corpusGrid"),c=document.getElementById("corpusHead"),l=document.getElementById("corpusYear"),u=document.getElementById("corpusPct"),d=document.getElementById("corpusCoverageNote"),h=Array.from({length:11},($,ue)=>2005+ue),p=$=>{let ue=String($.date||"").match(/^(\d{4})/);return Number(ue?ue[1]:$.year)},g=[],x=new Map,m=[],f=0,v=()=>{g=dt.filter($=>h.includes(p($))),x=new Map(h.map($=>[$,[]])),g.forEach($=>x.get(p($)).push($)),m=h.filter($=>x.get($).length===0),f=dt.length-g.length};v();let _=[],T=-1,A=$=>{let ue=[];return $.forEach(U=>{let M=ue[ue.length-1];M&&U===M[1]+1?M[1]=U:ue.push([U,U])}),ue.map(([U,M])=>U===M?String(U):`${U}\u2013${M}`).join(", ")},b=()=>`${h[0]}\u2013${h[h.length-1]}`;function S(){if(a.innerHTML="",a.style.setProperty("--cols",h.length),_=[],h.forEach($=>{let ue=document.createElement("span");if(ue.className="corpus-col",ue.dataset.year=String($),x.get($).forEach(U=>{let M=document.createElement("i"),y=["hawkish","dovish","neutral"].includes(U.label)?U.label:"neutral";M.className=`corpus-dot ${y==="hawkish"?"h":y==="dovish"?"d":"n"}`,ue.appendChild(M)}),!x.get($).length){let U=document.createElement("i");U.className="corpus-empty",U.setAttribute("aria-hidden","true"),ue.appendChild(U)}a.appendChild(ue),_.push(ue)}),T=-1,d){let $=[];m.length&&$.push(`sin muestra: ${A(m)}`),f&&$.push(`${f} fuera de ${b()}`),d.textContent=$.length?` \xB7 ${$.join(" \xB7 ")}`:""}}S(),l&&(l.textContent=String(h[0])),document.querySelectorAll(".corpus-axis span").forEach(($,ue,U)=>{$.textContent=String(ue===0?h[0]:h[h.length-1])}),_a("resumen").then($=>{let ue=$?.meta?.anios;!Array.isArray(ue)||!ue.length||ue.join()===h.join()||(h.splice(0,h.length,...ue),v(),S(),document.querySelectorAll(".corpus-axis span").forEach((U,M,y)=>{U.textContent=String(M===0?h[0]:h[h.length-1])}))});let P=document.getElementById("wordCount"),E=document.querySelectorAll("#stagePipeline .doc-line > span"),w=document.querySelector("#stagePipeline .frag"),I=document.getElementById("verdictStamp"),O=document.getElementById("confBar"),te=document.getElementById("confVal"),D=document.getElementById("seedCount"),G=document.querySelectorAll("#pipeRail .rail-node"),X=document.querySelectorAll("#pipeRail .rail-seg i"),z=gsap.utils.clamp(0,1),V=($,ue,U)=>{let M=U-ue;return M<=1e-6?$>=U?1:0:z(($-ue)/M)},j=$=>1-Math.pow(1-$,3),ce=$=>Math.round($).toLocaleString("es-CL"),se=dt.reduce(($,ue)=>$+String(ue.text||"").trim().split(/\s+/).filter(Boolean).length,0),F=dt.find($=>$.label==="hawkish")||dt[0],N=["hawkish","dovish","neutral"].includes(F?.label)?F.label:"neutral",q=Number.isFinite(Number(F?.score))?Number(F.score):0,de={hawkish:"Hawkish",dovish:"Dovish",neutral:"Neutral"},_e=String(F?.text||"Sin texto disponible").replace(/\s+/g," ").trim();w&&(w.textContent=`\xAB${_e.length>150?`${_e.slice(0,150)}\u2026`:_e}\xBB`),I&&(I.textContent=de[N]);let ie=e.querySelectorAll(".pipe-panel"),H=()=>{let $=e.scrollWidth-t.clientWidth,ue=t.clientWidth,U=ue*.78,M=ue*.5;if(!($>0)||!(ue>0)||!ie.length){let B=1/(ie.length||1);return Array.from(ie).map((K,Z)=>({start:Z*B,end:Math.min(1,(Z+1)*B)}))}return Array.from(ie).map(y=>{let B=y.offsetLeft+y.offsetWidth/2,K=(B-U)/$,Z=(B-M)/$;return{start:z(K),end:z(Z)}})},Q=H(),le=document.getElementById("debugPanel"),W=document.getElementById("debugSection"),R=document.getElementById("debugProgress"),he=document.getElementById("debugPanelInfo"),pe=document.getElementById("debugBar");function ye($){let ue=V($,Q[0].start,Q[0].end);E.forEach((Me,Ee)=>{let Y=j(V(ue,.04+Ee*.08,.3+Ee*.08));Me.style.transform=`translateY(${(1-Y)*110}%)`}),P.textContent=ce(se*j(V(ue,.2,.9)));let U=V($,Q[1].start,Q[1].end);r.forEach(Me=>Me.classList.toggle("lit",U>+Me.dataset.th)),D.textContent=ce(s*j(V(U,.12,.92)));let M=V($,Q[2].start,Q[2].end);w.style.opacity=j(V(M,.08,.4));let y=j(V(M,.5,.75));I.style.opacity=y,I.style.transform=`scale(${1.9-.9*y}) rotate(${-9+6*y}deg)`;let B=j(V(M,.55,.95));O.style.width=B*q*100+"%",te.textContent=(B*q).toFixed(2);let K=V($,Q[3].start,Q[3].end),Z=V(K,.1,.95),ee=Math.floor(Z*(h.length+1));ee!==T&&(_.forEach((Me,Ee)=>Me.classList.toggle("lit",Ee<ee)),T=ee),c.style.left=Z*100+"%",c.style.opacity=K>.02&&Z<.999?1:0;let ve=Math.min(h.length-1,Math.round(Z*(h.length-1)));l.textContent=h[ve];let me=h.slice(0,ee).reduce((Me,Ee)=>Me+x.get(Ee).length,0);u.textContent=Math.min(100,Math.round(me/Math.max(g.length,1)*100))+"%";let xe=0;for(let Me=Q.length-1;Me>=0;Me--)if($>=Q[Me].start){xe=Me;break}if(G.forEach((Me,Ee)=>Me.classList.toggle("active",Ee<=xe)),X.forEach((Me,Ee)=>{Ee<xe?Me.style.transform="scaleX(1)":Ee===xe?Me.style.transform=`scaleX(${V($,Q[Ee].start,Q[Ee].end)})`:Me.style.transform="scaleX(0)"}),Eo&&le){le.classList.add("visible"),W.textContent="Pipeline",R.textContent=Math.round($*100)+"%";let Me=["01 \xB7 Fuente","02 \xB7 Muestra / criterio","03 \xB7 Clasificaci\xF3n","04 \xB7 Revisi\xF3n / trazabilidad"];he.textContent=Me[xe]||"\u2014",pe.style.transform="scaleX("+$+")"}}gsap.to(e,{x:()=>-(e.scrollWidth-t.clientWidth),ease:"none",scrollTrigger:{trigger:".pipeline-pin-wrapper",start:"top top",end:()=>"+="+(e.scrollWidth-t.clientWidth),pin:!0,scrub:1,invalidateOnRefresh:!0,anticipatePin:1,onRefresh:()=>{Q=H()},onUpdate:$=>ye($.progress)}}),ye(0),window.addEventListener("resize",()=>{ScrollTrigger.refresh()})})();uo(async()=>{let[{initResultsDecision:i},[e]]=await Promise.all([Promise.resolve().then(()=>(ty(),ey)),Promise.all([_a("resultados"),Na()])]);e&&i({data:e,openQuote:Oi})});uo(async()=>{let[{initTimeline:i}]=await Promise.all([Promise.resolve().then(()=>(iy(),ny)),Na()]);i(dt)});gsap.timeline({scrollTrigger:{trigger:"#stageAxes",start:"top 60%",end:"bottom top",scrub:!0}}).fromTo("#d3-canvas",{opacity:0},{opacity:1,duration:.15,ease:"none"},0).to("#d3-canvas",{opacity:0,duration:.15,ease:"none",immediateRender:!1},.85);ScrollTrigger.create({trigger:"#stageAxes",start:"top 60%",end:"bottom top",scrub:!0,onUpdate:i=>{let e=i.progress,t=gsap.utils.clamp(0,1,e/.15),n=gsap.utils.clamp(0,1,(1-e)/.15);Ta=Math.min(t,n),Is("axes",Ta)},onLeave:()=>{Ta=0,Is("axes",0)},onLeaveBack:()=>{Ta=0,Is("axes",0)}});var tS=document.querySelectorAll("[data-quote]");tS.forEach(i=>{gsap.fromTo(i,{opacity:0,y:24},{opacity:1,y:0,duration:.8,ease:"cinematicOut",scrollTrigger:{trigger:i,start:"top 80%",toggleActions:"play none none reverse"}}),i.addEventListener("click",()=>{let e=i.dataset.quoteParticipant,t=parseInt(i.dataset.quoteYear,10),n=dt.findIndex(r=>r.participant===e&&r.year===t);if(n<0&&(n=dt.findIndex(r=>r.participant===e)),n>=0){Cn.card=i,Rn(n);let r=i.getBoundingClientRect();Oi(n,{x:r.left+r.width/2,y:r.top+r.height/2})}}),i.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),i.click())})});document.querySelectorAll("[data-closing]").forEach(i=>{let e=i.textContent.replace(/\s+/g," ").trim(),t=new SplitText(i,{type:"chars,words",charsClass:"char-reveal",wordsClass:"word-reveal",aria:"none"});t.words.forEach(r=>r.setAttribute("aria-hidden","true"));let n=document.createElement("span");n.className="sr-only",n.textContent=e,i.appendChild(n),gsap.fromTo(t.chars,{opacity:0,y:15,rotationX:-30},{opacity:1,y:0,rotationX:0,duration:.5,stagger:.015,ease:"cinematicOut",scrollTrigger:{trigger:i,start:"top 85%",toggleActions:"play none none reverse"}})});var nS=[{trigger:"#stageObjective",color:"#0c1020"},{trigger:"#stageRoom",color:"#0b0f1c"},{trigger:"#stageHook",color:"#0a0e1a"},{trigger:"#stageAxes",color:"#0d1225"},{trigger:"#stageVoices",color:"#0b101c"},{trigger:"#stageCounters",color:"#0a0e1a"},{trigger:"#stagePipeline",color:"#0c1020"},{trigger:"#stageTimeline",color:"#0a0e1a"},{trigger:"#stageQuotes",color:"#0d1225"},{trigger:"#stageClosing",color:"#0a0e1a"}];nS.forEach(({trigger:i,color:e})=>{ScrollTrigger.create({id:`bg${i}`,trigger:i,start:"top center",end:"bottom center",onToggle:t=>{t.isActive&&(gsap.to("html",{backgroundColor:e,duration:1.2,ease:"power2.inOut"}),gsap.to("body",{backgroundColor:e,duration:1.2,ease:"power2.inOut"}))}})});var Br=document.getElementById("ambientGlow"),By=Br||document.documentElement,iS=[{trigger:"#hero",alpha:.16},{trigger:"#stageObjective",alpha:.14},{trigger:"#stageRoom",alpha:.07},{trigger:"#stageHook",alpha:.025},{trigger:"#stageAxes",alpha:.015},{trigger:"#stageVoices",alpha:.035},{trigger:"#stageCounters",alpha:.025},{trigger:"#stagePipeline",alpha:.018},{trigger:"#stageTimeline",alpha:.035},{trigger:"#stageQuotes",alpha:.018},{trigger:"#stageClosing",alpha:.08}];function wf(i,e=!1){if(e){Br?Br.style.opacity=String(i):By.style.setProperty("--ambient-alpha",String(i));return}let t=()=>Br&&Br.classList.remove("is-fading");Br&&Br.classList.add("is-fading"),gsap.to(By,{...Br?{opacity:i}:{"--ambient-alpha":i},duration:1.25,ease:"power2.inOut",overwrite:"auto",onComplete:t,onInterrupt:t})}wf(.16,!0);iS.forEach(({trigger:i,alpha:e})=>{ScrollTrigger.create({id:`ambient${i}`,trigger:i,start:"top center",end:"bottom center",onEnter:()=>wf(e),onEnterBack:()=>wf(e)})});document.querySelectorAll(".quote-card").forEach(i=>{i.addEventListener("mouseenter",()=>{gsap.to(i,{scale:1.02,duration:.3,ease:"power2.out",boxShadow:i.classList.contains("hawkish")?"0 0 60px rgba(255,215,106,0.15)":"0 0 60px rgba(138,180,248,0.15)"})}),i.addEventListener("mouseleave",()=>{gsap.to(i,{scale:1,duration:.3,ease:"power2.out",boxShadow:i.classList.contains("hawkish")?"0 0 40px rgba(255,215,106,0.05)":"0 0 40px rgba(138,180,248,0.05)"})})});var rS=()=>ScrollTrigger.refresh(),oS=()=>{Xf(),bf(),rS()},Fy=0,sS=150;function gu(){clearTimeout(Fy),Fy=setTimeout(oS,sS)}document.fonts&&document.fonts.ready&&document.fonts.ready.then(gu);window.addEventListener("load",gu);Da.onLoad=(()=>{let i=Da.onLoad;return()=>{i(),gu()}})();V_(gu);
