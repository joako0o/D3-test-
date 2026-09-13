/* app.js — GENERADO por scripts/build-js.mjs. No editar: se pisa al correr
   `npm run build:js` (que `npm start` ejecuta solo).
   Fuentes: js/*.js (ver js/README.md) + three@0.160.0 (tree-shaken).
   Edítalas y corre `npm run build:js`. */
var fv=Object.defineProperty;var Bi=(i,e,t)=>()=>{if(t)throw t[0];try{return i&&(e=i(i=0)),e}catch(n){throw t=[n],n}};var Ds=(i,e)=>{for(var t in e)fv(i,t,{get:e[t],enumerable:!0})};function or(){let i=document.documentElement,e=window.visualViewport;return{width:Math.max(i?.clientWidth||e?.width||window.innerWidth,1),height:Math.max(i?.clientHeight||e?.height||window.innerHeight,1)}}function M_(){return or().width<=767}function tn(){return fl===null&&(fl=Object.freeze(or())),fl}function xh(){fl=null}var fl,pl=Bi(()=>{fl=null;typeof window<"u"&&(window.addEventListener("resize",xh),window.addEventListener("orientationchange",xh),window.visualViewport&&window.visualViewport.addEventListener("resize",xh))});function b_(){return bn.pinned>=0?bn.pinned:bn.hover}function ml(){return bn.pinned>=0}function _h(i){bn.hover=i}function yh(){bn.hover=-1}function gi(i){bn.pinned=i,bn.hover=-1}function gl(){bn.pinned=-1,bn.hover=-1}var bn,Tn,ao,xi,wi,fa=Bi(()=>{bn={hover:-1,pinned:-1};Tn={participant:null,rendered:null,quoteIndex:-1},ao={scales:{}},xi={card:null},wi={index:-1}});var vt,Mh,yl,bh,sr,Th=Bi(()=>{vt=(i,e=0)=>{let t=Math.sin((i+1)*12.9898+e*78.233)*43758.5453;return t-Math.floor(t)},Mh=(i,e,t)=>Math.min(Math.max(i,e),t),yl=i=>{let e=i?.label||"neutral",t=Mh(Number(i?.score)||.7,0,1),n=String(i?.date||"").length+String(i?.text||"").length,r=Math.sin(n*9301+49297)*233280,o=r-Math.floor(r);return e==="hawkish"?.3+t*.4:e==="dovish"?-(.3+t*.4):(o-.5)*.18},bh=(i,e)=>{if(i>=1)return 1;if(i<=0)return 0;let t=Math.min(e,100)/(1e3/60);return 1-Math.pow(1-i,t)},sr=(i,e,t,n)=>i+(e-i)*bh(t,n)});var I_,_i,Sh,vl=Bi(()=>{I_=[{id:"inflation",short:"Inflaci\xF3n",label:"Inflaci\xF3n y precios",terms:["inflaci\xF3n","inflacionario","ipc","precios","subyacente","expectativas","meta"]},{id:"activity",short:"Actividad",label:"Actividad y crecimiento",terms:["crecimiento","pib","actividad","demanda","consumo","inversi\xF3n","producto","brecha"]},{id:"monetary",short:"Tasas",label:"Pol\xEDtica monetaria",terms:["tasa","tpm","pol\xEDtica monetaria","est\xEDmulo","neutralidad","liquidez","mantener","subir","bajar"]},{id:"external",short:"Externo",label:"Escenario internacional",terms:["externo","internacional","estados unidos","ee.uu","global","mundial","china","europa","mercados externos"]},{id:"financial",short:"Mercados",label:"Mercados y tipo de cambio",terms:["mercados financieros","tipo de cambio","tasas forward","forward","activos","bonos","financiero","d\xF3lar","peso"]},{id:"commodities",short:"Commodities",label:"Commodities y energ\xEDa",terms:["materias primas","petr\xF3leo","cobre","energ\xEDa","alimentos","commodities"]},{id:"labor",short:"Laboral",label:"Empleo y holguras",terms:["empleo","desempleo","salarios","salario","holgura","trabajadores"]},{id:"fiscal",short:"Fiscal",label:"Pol\xEDtica fiscal",terms:["fiscal","gasto","presupuesto","presupuestos","gobierno","impuesto","d\xE9ficit"]}],_i=i=>String(i||"").toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g,""),Sh=(i,e)=>i.includes(_i(e))});var D_={};Ds(D_,{initVoiceExplorer:()=>QM});function QM({quotes:i,openQuote:e,closeQuotePanel:t}){let n=document.getElementById("voiceRail"),r=document.getElementById("voiceDirectoryMeta"),o=document.getElementById("voiceDetailEmpty"),s=document.getElementById("voiceDetailContent"),a=document.getElementById("voiceDetailName"),c=document.getElementById("voiceDetailMeta"),l=document.getElementById("voiceDetailSummary"),u=document.getElementById("voiceDetailQuote"),d=document.getElementById("voiceDetailCitation"),h=document.getElementById("voiceDetailOpen"),f=document.getElementById("voiceProfileOpen"),g=document.getElementById("voiceProfilePanel"),x=document.getElementById("voiceProfileClose"),m=document.getElementById("voiceProfileTitle"),p=document.getElementById("voiceProfileSubtitle"),v=document.getElementById("voiceRadar"),_=document.getElementById("voiceTopicList"),T=document.getElementById("voiceProfileEvidenceQuote"),w=document.getElementById("voiceProfileEvidenceCitation");if(!n||!r||!o||!s||!h||!f||!g||!x||!v||!_||!T||!w||!i.length)return;let E=Y=>{let W=String(Y.date||"").match(/^(\d{4})/);return Number(W?W[1]:Y.year)},A=new Map,P=0;i.forEach((Y,W)=>{let Q=E(Y);if(!Number.isFinite(Q)||Q<2e3||Q>2015){P+=1;return}let ce=Y.participant||"Participante an\xF3nimo";A.has(ce)||A.set(ce,[]),A.get(ce).push({q:Y,index:W,normalizedText:_i(Y.text)})});let y=Array.from(A,([Y,W])=>{let Q={hawkish:0,dovish:0,neutral:0},ce=W.map(({q:pe})=>E(pe)).filter(Number.isFinite);return W.forEach(({q:pe})=>{let K=pe.label in Q?pe.label:"neutral";Q[K]+=1}),{name:Y,rows:W,count:W.length,toneCounts:Q,minYear:ce.length?Math.min(...ce):"\u2014",maxYear:ce.length?Math.max(...ce):"\u2014"}}).sort((Y,W)=>W.count-Y.count||Y.name.localeCompare(W.name,"es"));r.textContent=`Muestra visual \xB7 ${y.length} voces \xB7 ${i.length-P} fragmentos${P?` \xB7 ${P} fuera del per\xEDodo`:""}`,n.innerHTML="";let M=[],D=null,V={hawkish:"hawkish (restrictiva)",dovish:"dovish (expansiva)",neutral:"neutral"},te="http://www.w3.org/2000/svg",I=(Y,W={})=>{let Q=document.createElementNS(te,Y);return Object.entries(W).forEach(([ce,pe])=>Q.setAttribute(ce,String(pe))),Q},k=Y=>{if(!Y||!Y.length)return null;let W=Y.slice().sort((Q,ce)=>{let pe=String(Q.q.date||Q.q.year||""),K=String(ce.q.date||ce.q.year||"");return pe.localeCompare(K)||Q.index-ce.index});return W[Math.floor((W.length-1)/2)]},G=Y=>I_.map(W=>{let Q=Y.rows.filter(pe=>W.terms.some(K=>Sh(pe.normalizedText,K))),ce=W.terms.map(pe=>({term:pe,count:Y.rows.filter(K=>Sh(K.normalizedText,pe)).length})).filter(pe=>pe.count>0).sort((pe,K)=>K.count-pe.count||pe.term.localeCompare(K.term,"es"));return{definition:W,rows:Q,value:Y.count?Q.length/Y.count*100:0,termCounts:ce}});function ee(Y,W){v.innerHTML="";let Q=150,ce=128,pe=82,K=Y.length,S=B=>-Math.PI/2+B/K*Math.PI*2,Z=(B,le,xe=pe*(le/100))=>{let R=S(B);return[Q+Math.cos(R)*xe,ce+Math.sin(R)*xe]},U=B=>Y.map((le,xe)=>Z(xe,100,B).join(",")).join(" ");[.25,.5,.75,1].forEach(B=>{v.appendChild(I("polygon",{class:"radar-ring",points:U(pe*B)}))}),Y.forEach((B,le)=>{let[xe,R]=Z(le,100);v.appendChild(I("line",{class:"radar-axis",x1:Q,y1:ce,x2:xe,y2:R}))});let O=I("polygon",{class:"radar-shape",points:Y.map((B,le)=>Z(le,B.value).join(",")).join(" ")});v.appendChild(O),Y.forEach((B,le)=>{let[xe,R]=Z(le,B.value);v.appendChild(I("circle",{class:"radar-point",cx:xe,cy:R,r:3.5}));let[b,z]=Z(le,100,pe+23),ae=I("text",{class:"radar-label",x:b,y:z+(z<ce?-2:4),"text-anchor":b<Q-8?"end":b>Q+8?"start":"middle"});ae.textContent=B.definition.short,v.appendChild(ae)}),v.appendChild(I("circle",{cx:Q,cy:ce,r:2,fill:"rgba(255,255,255,0.65)"})),v.setAttribute("aria-label",`Perfil tem\xE1tico de ${W}. Cada eje muestra el porcentaje de sus fragmentos con una menci\xF3n directa.`),gsap.fromTo(O,{opacity:0,scale:.92,transformOrigin:`${Q}px ${ce}px`},{opacity:1,scale:1,duration:.55,ease:"cinematicOut"})}let N=null,X=null;function q(Y,W){let Q=k(W)||k(Y.rows);Q&&(T.textContent=`\u201C${Q.q.text||"Sin texto disponible"}\u201D`,w.textContent=`\u2014 ${Q.q.participant||Y.name}, ${Q.q.formatted_date||Q.q.date||Q.q.year||"fecha no especificada"}`)}function J(Y,W=null){if(!Y)return;let Q=G(Y);m.textContent=Y.name,p.textContent=`${Y.count} ${Y.count===1?"intervenci\xF3n":"intervenciones"} \xB7 ${Y.minYear}\u2013${Y.maxYear} \xB7 cada eje = proporci\xF3n de fragmentos con menci\xF3n directa`,ee(Q,Y.name),_.innerHTML="",Q.forEach(pe=>{let K=document.createElement("button");K.type="button",K.className="voice-topic-row"+(pe.definition.id===W?" is-active":""),K.setAttribute("aria-pressed",String(pe.definition.id===W)),K.setAttribute("aria-label",`${pe.definition.label}: ${Math.round(pe.value)} por ciento de los fragmentos`),K.innerHTML=`
        <span class="voice-topic-row-top"><span></span><strong></strong></span>
        <span class="voice-topic-meter"><i></i></span>
        <span class="voice-topic-terms"></span>`,K.querySelector(".voice-topic-row-top span").textContent=pe.definition.label,K.querySelector(".voice-topic-row-top strong").textContent=`${Math.round(pe.value)}%`,K.querySelector(".voice-topic-meter i").style.width=`${pe.value}%`,K.querySelector(".voice-topic-terms").textContent=pe.termCounts.length?pe.termCounts.slice(0,3).map(S=>S.term).join(" \xB7 "):"sin coincidencia directa en la muestra",K.addEventListener("click",()=>J(Y,pe.definition.id)),_.appendChild(K)});let ce=Q.find(pe=>pe.definition.id===W);q(Y,ce?.rows||Y.rows)}function fe(Y){Y&&(J(Y),X=document.activeElement,g.hidden=!1,g.setAttribute("aria-hidden","false"),document.body.classList.add("voice-profile-modal-open"),requestAnimationFrame(()=>g.classList.add("is-open")),x.focus({preventScroll:!0}))}function H(){g.hidden||(g.classList.remove("is-open"),g.setAttribute("aria-hidden","true"),document.body.classList.remove("voice-profile-modal-open"),clearTimeout(N),N=setTimeout(()=>{g.hidden=!0,X&&typeof X.focus=="function"&&X.focus({preventScroll:!0}),X=null},340))}x.addEventListener("click",H),g.querySelectorAll("[data-voice-profile-close]").forEach(Y=>Y.addEventListener("click",H)),window.addEventListener("keydown",Y=>{Y.key==="Escape"&&!g.hidden&&(Y.preventDefault(),H())});function $(Y){if(!Y){o.hidden=!1,s.hidden=!0,Tn.quoteIndex=-1;return}let W=k(Y.rows),Q=[`${Y.toneCounts.hawkish} ${V.hawkish}`,`${Y.toneCounts.dovish} ${V.dovish}`,`${Y.toneCounts.neutral} neutral${Y.toneCounts.neutral===1?"":"es"}`].join(" \xB7 ");o.hidden=!0,s.hidden=!1,a.textContent=Y.name,c.textContent=`${Y.count} ${Y.count===1?"intervenci\xF3n":"intervenciones"} en la muestra \xB7 ${Y.minYear}\u2013${Y.maxYear}`,l.textContent=`Se\xF1ales detectadas en sus fragmentos: ${Q}.`,u.textContent=`\u201C${W.q.text||"Sin texto disponible"}\u201D`,d.textContent=`\u2014 ${W.q.participant||Y.name}, ${W.q.formatted_date||W.q.date||W.q.year||"fecha no especificada"}`,Tn.quoteIndex=W.index}function me(Y){D=D===Y?null:Y,Tn.participant=D,D&&(Tn.rendered=D),M.forEach(({card:W,voice:Q})=>{let ce=Q.name===D;W.setAttribute("aria-pressed",String(ce))}),$(D?y.find(W=>W.name===D):null),typeof t=="function"&&t()}f.addEventListener("click",()=>{let Y=D?y.find(W=>W.name===D):null;fe(Y)}),y.forEach((Y,W)=>{let Q=document.createElement("div");Q.setAttribute("role","listitem"),Q.className="voice-card-item";let ce=document.createElement("button");ce.type="button",ce.className="voice-card",ce.setAttribute("aria-pressed","false"),ce.setAttribute("aria-label",`Seleccionar ${Y.name}: ${Y.count} ${Y.count===1?"intervenci\xF3n":"intervenciones"} entre ${Y.minYear} y ${Y.maxYear}.`),ce.innerHTML=`
      <span class="voice-card-index"></span>
      <span class="voice-card-name"></span>
      <span class="voice-card-meta"></span>
      <span class="voice-card-years"></span>
      <span class="voice-signal-bar" aria-hidden="true">
        <i class="hawkish"></i><i class="dovish"></i><i class="neutral"></i>
      </span>`,ce.querySelector(".voice-card-index").textContent=String(W+1).padStart(2,"0"),ce.querySelector(".voice-card-name").textContent=Y.name,ce.querySelector(".voice-card-meta").textContent=`${Y.count} ${Y.count===1?"intervenci\xF3n":"intervenciones"}`,ce.querySelector(".voice-card-years").textContent=`${Y.minYear}\u2013${Y.maxYear}`,["hawkish","dovish","neutral"].forEach(pe=>{ce.querySelector(`.voice-signal-bar .${pe}`).style.width=`${Y.toneCounts[pe]/Y.count*100}%`}),ce.addEventListener("click",()=>me(Y.name)),Q.appendChild(ce),n.appendChild(Q),M.push({card:ce,voice:Y})}),h.addEventListener("click",()=>{Tn.quoteIndex<0||(gi(Tn.quoteIndex),e(Tn.quoteIndex,{x:window.innerWidth*.54,y:window.innerHeight*.62}))})}var U_=Bi(()=>{fa();vl()});var N_={};Ds(N_,{initD3Axes:()=>eb});function eb({quotes:i,openQuote:e}){let t=document.getElementById("d3-canvas");if(!t)return;t.innerHTML="";let n=or(),r=n.width,o=n.height,s=d3.select(t).append("svg").attr("width",r).attr("height",o).attr("role","img").attr("aria-label","Mapa de intervenciones: cada punto conserva su fecha, participante y fragmento").style("position","absolute").style("inset","0"),a={top:o*(r<640?.34:.28),right:r*.15,bottom:o*.18,left:r*.15},c=r-a.left-a.right,l=o-a.top-a.bottom,u=d3.scaleTime().domain([new Date(2e3,0,1),new Date(2015,11,31)]).range([a.left,r-a.right]),d=d3.scaleLinear().domain([-1,1]).range([a.top+l,a.top]);ao.scales={xScale:u,yScale:d};let h=a.top+l/2,f=s.append("g");f.append("rect").attr("class","axes-plot-field").attr("x",a.left).attr("y",a.top).attr("width",c).attr("height",l).attr("rx",Math.min(8,r*.01));let g=r<500?4:r<900?6:8;f.append("g").attr("class","axes-grid").selectAll(".axes-grid-vertical").data(u.ticks(g)).join("line").attr("class","axes-grid-vertical").attr("x1",M=>u(M)).attr("x2",M=>u(M)).attr("y1",a.top).attr("y2",a.top+l),[-.5,.5].forEach(M=>{f.append("line").attr("class","axes-grid-guide").attr("x1",a.left).attr("x2",r-a.right).attr("y1",d(M)).attr("y2",d(M))}),f.append("line").attr("class","axes-zero-line").attr("x1",a.left).attr("x2",r-a.right).attr("y1",h).attr("y2",h);let m=new Date(2e3,0,1).getTime(),p=new Date(2015,11,31).getTime(),v=i.map((M,D)=>({q:M,index:D,date:new Date(M.date)})).filter(({date:M})=>M.getTime()>=m&&M.getTime()<=p);s.append("g").attr("class","axes-data-layer").selectAll(".axes-data-point").data(v,M=>M.index).join(M=>{let D=M.append("g").attr("class","axes-data-mark");return D.append("circle").attr("class","axes-data-hit").attr("r",14).attr("fill","transparent").attr("pointer-events","all"),D.append("circle").attr("class","axes-data-halo"),D.append("circle").attr("class","axes-data-point"),D}).attr("transform",({q:M,date:D})=>`translate(${u(D)}, ${d(yl(M))})`).attr("data-quote-index",({index:M})=>M).attr("class",({q:M})=>`axes-data-mark axes-data-mark--${M.label||"neutral"}`).attr("tabindex","0").attr("role","button").attr("aria-label",({q:M})=>`Abrir intervenci\xF3n ${M.label||"neutral"} de ${M.participant||"participante an\xF3nimo"}, ${M.formatted_date||M.date||M.year||"fecha no especificada"}`).on("keydown",(M,D)=>{M.key!=="Enter"&&M.key!==" "||(M.preventDefault(),xi.card=M.currentTarget,gi(D.index),e(D.index,{x:window.innerWidth*.55,y:window.innerHeight*.58}))}).on("click",(M,D)=>{M.stopPropagation(),xi.card=M.currentTarget,gi(D.index),e(D.index,{x:M.clientX,y:M.clientY})}).each(function({q:M}){let V=2.8+Mh(Number(M.score)||.7,0,1)*2.1,te=d3.select(this);te.select(".axes-data-halo").attr("r",V*1.9).attr("class",`axes-data-halo axes-data-halo--${M.label||"neutral"}`),te.select(".axes-data-point").attr("r",V).attr("class",`axes-data-point axes-data-point--${M.label||"neutral"}`)});let w=d3.axisBottom(u).ticks(g).tickSizeOuter(0).tickFormat(d3.timeFormat("%Y")),E=f.append("g").attr("class","axes-x-axis").attr("transform",`translate(0, ${h})`).call(w);E.selectAll("text").attr("dy","1.55em").style("fill","rgba(255,255,255,0.48)").style("font-family","var(--font-body)").style("font-size",r<500?"10px":"12px").style("letter-spacing","0.2px"),E.selectAll(".domain, .tick line").style("stroke","rgba(255,255,255,0.13)");let A=r<640,P=A?10:a.left-16,y=A?"start":"end";return s.append("text").attr("x",P).attr("y",a.top-12).attr("text-anchor",y).style("fill","rgba(255,215,106,0.82)").style("font-size",r<500?"11px":"13px").style("letter-spacing","2px").style("text-transform","uppercase").text("Hawkish \u2191"),s.append("text").attr("x",P).attr("y",a.top+l+20).attr("text-anchor",y).style("fill","rgba(138,180,248,0.82)").style("font-size",r<500?"11px":"13px").style("letter-spacing","2px").style("text-transform","uppercase").text("Dovish \u2193"),ao.scales}var B_=Bi(()=>{fa();pl();Th()});var F_={};Ds(F_,{initWordEvolution:()=>nb});function tb(){ga.forEach(i=>{try{i()}catch{}}),ga.length=0}function nb(i=ma){ma=i;let e=document.getElementById("wordEvolutionSvg"),t=document.querySelector(".word-evolution-intro"),n=document.getElementById("wordEvolutionBoard"),r=document.getElementById("wordEvolutionYear"),o=document.getElementById("wordEvolutionReadout");if(!e||!t||!n||!r||!o||!ma.length||!window.d3)return;tb(),d3.select(e).selectAll("*").remove(),e.removeAttribute("viewBox");let s=d3.range(2e3,2016),a=["hawkish","dovish"],c=["inflaci\xF3n","precios","expectativas","tasa","tasas","aumento","subir","mantener","bajar","alza","riesgo","crecimiento","actividad","demanda","producto","contexto","escenario","internacional","mercado","mercados","empresas","hogares","endeudamiento","petr\xF3leo","cobre","energ\xEDa","alimentos","empleo","salarios","fiscal","gasto","presupuesto","d\xE9ficit","consumo","inversi\xF3n","exportaciones","importaciones"].map(_i),l=new Set(c),u=new Set(["para","como","desde","entre","sobre","esta","este","estas","estos","tambi\xE9n","tambien","cada","cuando","donde","se\xF1ala","senala","indica","se\xF1or","senor","presidente","consejero","gerente","gerencia","divisi\xF3n","division","estudios","reuni\xF3n","reunion","anterior","opci\xF3n","opciones","oportunidad","respecto","puntos","base","parte","lugar","forma","manera","mayor","menor","dado","considera","elementos","siguiente","siguientes","adem\xE1s","ademas","aunque","ellos","ellas","ello","hasta","hace","tiene","tienen","puede","podr\xEDa","podria","ser\xEDa","seria","chile","banco","central","pol\xEDtica","politica","monetaria","fragmento","intervenci\xF3n","intervencion","acta","actas","muestra"].map(_i)),d=new Set(ma.flatMap(q=>_i(q.participant).match(/[a-zñ]{4,}/g)||[])),h={hawkish:new Map,dovish:new Map},f={hawkish:new Map,dovish:new Map},g={inflacion:"inflaci\xF3n",precios:"precios",expectativas:"expectativas",tasa:"tasa",tasas:"tasas",aumento:"aumento",subir:"subir",mantener:"mantener",bajar:"bajar",alza:"alza",riesgo:"riesgo",crecimiento:"crecimiento",actividad:"actividad",demanda:"demanda",producto:"producto",contexto:"contexto",escenario:"escenario",internacional:"internacional",mercado:"mercado",mercados:"mercados",empresas:"empresas",hogares:"hogares",endeudamiento:"endeudamiento",petroleo:"petr\xF3leo",cobre:"cobre",energia:"energ\xEDa",alimentos:"alimentos",empleo:"empleo",salarios:"salarios",fiscal:"fiscal",gasto:"gasto",presupuesto:"presupuesto",deficit:"d\xE9ficit",consumo:"consumo",inversion:"inversi\xF3n",exportaciones:"exportaciones",importaciones:"importaciones"},x=q=>{let J=String(q.date||"").match(/^(\d{4})/);return Number(J?J[1]:q.year)};ma.forEach(q=>{let J=a.includes(q.label)?q.label:null,fe=x(q);if(!J||!s.includes(fe))return;h[J].set(fe,(h[J].get(fe)||0)+1),new Set((_i(q.text).match(/[a-zñ]{4,}/g)||[]).filter($=>l.has($)&&!u.has($)&&!d.has($))).forEach($=>{f[J].has($)||f[J].set($,new Map);let me=f[J].get($);me.set(fe,(me.get(fe)||0)+1)})});let m={};a.forEach(q=>{m[q]=[...f[q].entries()].map(([J,fe])=>({term:J,total:[...fe.values()].reduce((H,$)=>H+$,0),yearly:fe})).sort((J,fe)=>fe.total-J.total||J.term.localeCompare(fe.term,"es")).slice(0,3)});let p=e.parentElement,v=p?.getBoundingClientRect(),_=Math.max(280,Math.round(v?.width||e.clientWidth||1e3)),T=Math.max(180,Math.round(v?.height||e.clientHeight||450)),w=_<520||T<240,E=w?{top:T<220?31:36,right:_<360?74:84,bottom:T<220?25:30,left:_<360?34:48}:{top:42,right:128,bottom:42,left:72},A=w?T<220?25:34:42,P=(T-E.top-E.bottom-A)/2,y=d3.scaleLinear().domain([2e3,2015]).range([E.left,_-E.right]),M=d3.select(e).attr("viewBox",`0 0 ${_} ${T}`).attr("preserveAspectRatio","xMidYMid meet"),D=M.append("g").attr("class","word-chart-group"),V=M.append("line").attr("class","word-cursor").attr("x1",y(2e3)).attr("x2",y(2e3)).attr("y1",E.top-4).attr("y2",T-E.bottom+3),te=[],I=(q,J,fe)=>{let H=J.yearly.get(fe)||0,$=h[q].get(fe)||0;return $?H/$*100:0};a.forEach((q,J)=>{let fe=E.top+J*(P+A),H=fe+P,$=m[q],me=Math.max(20,...$.flatMap(O=>s.map(B=>I(q,O,B)))),Y=d3.scaleLinear().domain([0,me]).range([H,fe]),W=D.append("g").attr("class",`word-lane word-lane--${q}`);W.append("text").attr("class",`word-lane-label ${q}`).attr("x",E.left).attr("y",fe-14).text(q==="hawkish"?"Hawkish \xB7 restrictiva":"Dovish \xB7 expansiva"),[0,me/2,me].forEach(O=>{W.append("line").attr("class",O===0?"word-zero-line":"word-grid-line").attr("x1",E.left).attr("x2",_-E.right).attr("y1",Y(O)).attr("y2",Y(O))}),W.append("text").attr("class","word-axis-label").attr("x",E.left-10).attr("y",H+4).attr("text-anchor","end").text("0%"),W.append("text").attr("class","word-axis-label").attr("x",E.left-10).attr("y",fe+4).attr("text-anchor","end").text(`${Math.round(me)}%`);let Q=w?13:15,ce=fe+(w?9:11),pe=H-(w?3:4),K=new Map,S=$.map((O,B)=>{let le=I(q,O,2015);return{rank:B,desired:Y(le)+(B-1)*Q}}).sort((O,B)=>O.desired-B.desired),Z=ce;S.forEach(O=>{let B=Math.max(Z,Math.min(pe,O.desired));K.set(O.rank,B),Z=B+Q});let U=Z-Q-pe;U>0&&S.forEach(O=>K.set(O.rank,K.get(O.rank)-U)),$.forEach((O,B)=>{let le=s.map(ae=>({year:ae,value:I(q,O,ae)})),xe=d3.line().x(ae=>y(ae.year)).y(ae=>Y(ae.value)).curve(d3.curveMonotoneX),R=W.append("path").attr("class",`word-path ${q}`).attr("d",xe(le)).attr("stroke-width",B===0?2.7:1.8).style("opacity",B===0?1:B===1?.68:.42),b=R.node();if(b){let ae=b.getTotalLength();R.attr("stroke-dasharray",ae).attr("stroke-dashoffset",ae).attr("data-length",ae)}le.forEach(ae=>{W.append("circle").attr("class",`word-point ${q}`).attr("cx",y(ae.year)).attr("cy",Y(ae.value)).attr("r",B===0?2.8:2).style("opacity",B===0?.95:B===1?.58:.36)});let z=le[le.length-1];W.append("text").attr("class",`word-end-label ${q}`).attr("x",y(z.year)+8).attr("y",K.get(B)+4).text(g[O.term]||O.term),te.push({label:q,term:O.term,values:le,path:b})})}),s.forEach(q=>{(w?[2e3,2005,2010,2015].includes(q):(q-2e3)%3===0||q===2015)&&M.append("text").attr("class","word-axis-label").attr("x",y(q)).attr("y",T-12).attr("text-anchor","middle").text(q)});let k=(q,J=1)=>{let fe=Math.round(d3.max([2e3,Math.min(2015,q)]));r.textContent=fe,V.attr("x1",y(fe)).attr("x2",y(fe)),te.forEach($=>{if(!$.path)return;let me=Number($.path.getAttribute("data-length")||0);$.path.style.strokeDashoffset=String(me*(1-J))});let H=a.map($=>{let me=te.filter(Y=>Y.label===$).map(Y=>{let W=Y.values.find(Q=>Q.year===fe);return`${g[Y.term]||Y.term} ${Math.round(W?.value||0)}%`}).join(" \xB7 ");return`${$==="hawkish"?"Hawkish":"Dovish"}: ${me||"sin registros"}`}).join("   /   ");o.textContent=H||"No hay t\xE9rminos suficientes en la muestra disponible."};k(2e3,0);let G=q=>{let J=e.getBoundingClientRect(),fe=(q.clientX-J.left)/J.width*_;k(y.invert(fe),1)},ee=()=>k(2e3+15*.5,1);e.addEventListener("pointermove",G),p?.addEventListener("pointerleave",ee),ga.push(()=>{e.removeEventListener("pointermove",G),p?.removeEventListener("pointerleave",ee)});let N=gsap.timeline({scrollTrigger:{trigger:"#stageWordEvolution",start:"top 85%",end:"bottom bottom",scrub:!0}}).fromTo(t,{opacity:0,y:18},{opacity:1,y:0,duration:.12,ease:"none"},.04).fromTo(n,{opacity:0,y:24},{opacity:1,y:0,duration:.15,ease:"none"},.16).to(t,{opacity:0,y:-14,duration:.08,ease:"none"},.9);ga.push(()=>{try{N.scrollTrigger?.kill()}catch{}try{N.kill()}catch{}});let X=ScrollTrigger.create({trigger:"#stageWordEvolution",start:"top 85%",end:"bottom bottom",scrub:!0,onUpdate:q=>{let J=d3.min([1,d3.max([0,(q.progress-.08)/.52])]);k(2e3+q.progress*15,J)}});ga.push(()=>X.kill())}var ma,ga,O_=Bi(()=>{vl();ma=[],ga=[]});var H_={};Ds(H_,{initActBrowser:()=>ib});function ib({quotes:i,openQuote:e}){let t=document.getElementById("actsList"),n=document.getElementById("actsIndexMeta"),r=document.getElementById("actYearFilter"),o=document.getElementById("actDate"),s=document.getElementById("actDateSub"),a=document.getElementById("actEra"),c=document.getElementById("actSignalName"),l=document.getElementById("actSignalCount"),u=document.getElementById("actSignalExplanation"),d=document.getElementById("actParticipants"),h=document.getElementById("actTermNetwork"),f=document.getElementById("actTermList"),g=document.getElementById("actEvidenceList"),x=document.getElementById("actEvidenceMeta"),m=document.getElementById("actEvidenceQuote"),p=document.getElementById("actEvidenceCitation"),v=document.getElementById("actOpenEvidence"),_=document.getElementById("actsBrowser"),T=document.querySelector(".acts-intro");if(!t||!n||!r||!o||!s||!a||!c||!l||!u||!d||!h||!f||!g||!x||!m||!p||!v||!_||!T||!i.length)return;let w=[{key:"inflacion",label:"inflaci\xF3n"},{key:"precios",label:"precios"},{key:"expectativas",label:"expectativas"},{key:"tasa",label:"tasa"},{key:"tasas",label:"tasas"},{key:"aumento",label:"aumento"},{key:"alza",label:"alza"},{key:"subir",label:"subir"},{key:"mantener",label:"mantener"},{key:"bajar",label:"bajar"},{key:"riesgo",label:"riesgo"},{key:"crecimiento",label:"crecimiento"},{key:"actividad",label:"actividad"},{key:"demanda",label:"demanda"},{key:"producto",label:"producto"},{key:"contexto",label:"contexto"},{key:"escenario",label:"escenario"},{key:"internacional",label:"internacional"},{key:"mercado",label:"mercado"},{key:"mercados",label:"mercados"},{key:"petr\xF3leo",label:"petr\xF3leo"},{key:"cobre",label:"cobre"},{key:"energ\xEDa",label:"energ\xEDa"},{key:"alimentos",label:"alimentos"},{key:"empleo",label:"empleo"},{key:"salarios",label:"salarios"},{key:"gasto",label:"gasto"},{key:"presupuesto",label:"presupuesto"},{key:"d\xE9ficit",label:"d\xE9ficit"},{key:"consumo",label:"consumo"},{key:"inversi\xF3n",label:"inversi\xF3n"}].map(S=>({...S,normalized:_i(S.key)})),E=[{id:"E1",name:"Despegue",from:2e3,to:2003},{id:"E2",name:"Fiebre",from:2004,to:2007},{id:"E3",name:"Crisis",from:2008,to:2009},{id:"E4",name:"Normalizaci\xF3n",from:2010,to:2014},{id:"E5",name:"Giro",from:2015,to:2015}],A="http://www.w3.org/2000/svg",P=(S,Z={})=>{let U=document.createElementNS(A,S);return Object.entries(Z).forEach(([O,B])=>U.setAttribute(O,String(B))),U},y=S=>{let Z=String(S.date||"").match(/^(\d{4})/);return Number(Z?Z[1]:S.year)},M=(S,Z)=>{let U=S&&/^\d{4}-\d{2}-\d{2}$/.test(S)?new Date(`${S}T00:00:00Z`):null;return!U||Number.isNaN(U.getTime())?Z?`A\xF1o ${Z}`:"Fecha no especificada":new Intl.DateTimeFormat("es-CL",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(U)},D=()=>window.matchMedia&&window.matchMedia("(max-width: 430px)").matches,V=(S,Z)=>{if(!D())return M(S,Z);let U=S&&/^\d{4}-\d{2}-\d{2}$/.test(S)?new Date(`${S}T00:00:00Z`):null;if(!U||Number.isNaN(U.getTime()))return M(S,Z);let O=new Intl.DateTimeFormat("es-CL",{day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}).formatToParts(U),B=Object.fromEntries(O.filter(le=>le.type!=="literal").map(le=>[le.type,le.value]));return`${B.day} ${B.month} ${B.year}`},te=(S,Z)=>D()?V(S,Z):M(S,Z),I=S=>E.find(Z=>S>=Z.from&&S<=Z.to)||{id:"\u2014",name:"fuera de per\xEDodo"},k=S=>w.filter(Z=>S.normalizedText.includes(Z.normalized)),G=S=>["hawkish","dovish","neutral"].includes(S.label)?S.label:"neutral",ee={hawkish:"Hawkish",dovish:"Dovish",neutral:"Neutral",mixed:"Mixta"},N={hawkish:"restrictiva",dovish:"expansiva",neutral:"sin orientaci\xF3n dominante"},X=new Map,q=0;i.forEach((S,Z)=>{let U=y(S);if(!Number.isFinite(U)||U<2e3||U>2015){q+=1;return}let O=/^\d{4}-\d{2}-\d{2}$/.test(String(S.date||""))?S.date:`${U}-01-01`;X.has(O)||X.set(O,[]),X.get(O).push({q:S,index:Z,normalizedText:_i(S.text)})});let J=[...X.entries()].map(([S,Z])=>{let U=y(Z[0].q),O={hawkish:0,dovish:0,neutral:0},B=new Set,le=new Map;Z.forEach(b=>{let z=G(b.q);O[z]+=1,B.add(b.q.participant||"Participante an\xF3nimo"),k(b).forEach(ae=>le.set(ae.normalized,{label:ae.label,count:(le.get(ae.normalized)?.count||0)+1}))});let xe=Object.entries(O).filter(([,b])=>b>0).sort((b,z)=>z[1]-b[1]),R=xe.length>1&&xe[0][1]===xe[1][1]?"mixed":xe[0]?.[0]||"neutral";return{id:S,date:S,year:U,rows:Z,count:Z.length,participants:[...B],toneCounts:O,dominantTone:R,terms:[...le.entries()].map(([b,z])=>({key:b,...z})).sort((b,z)=>z.count-b.count||b.label.localeCompare(z.label,"es"))}}).sort((S,Z)=>S.date.localeCompare(Z.date));if(!J.length)return;n.textContent=`Muestra visible: ${J.length} actas \xB7 ${J.reduce((S,Z)=>S+Z.count,0)} fragmentos${q?` \xB7 ${q} fuera del per\xEDodo`:""}`,[...new Set(J.map(S=>S.year))].sort((S,Z)=>S-Z).forEach(S=>{let Z=document.createElement("option");Z.value=String(S),Z.textContent=S,r.appendChild(Z)});let fe=null,H=0,$=null,me=[],Y=S=>{h.innerHTML="";let Z=S?k(S).slice(0,4):[],U=S?G(S.q):"neutral",O=48,B=43,le=125,R=Z.length>1?(492-le)/(Z.length-1):0;h.appendChild(P("text",{class:"act-network-caption",x:O,y:12,"text-anchor":"middle"})).textContent="SE\xD1AL",h.appendChild(P("circle",{class:`act-network-signal ${U}`,cx:O,cy:B,r:22}));let b=P("text",{class:"act-network-caption",x:O,y:B+3,"text-anchor":"middle"});if(b.textContent=ee[U].toUpperCase(),h.appendChild(b),!Z.length){let z=P("text",{class:"act-network-term",x:108,y:B+4});z.textContent="sin t\xE9rmino de la taxonom\xEDa visible en este fragmento",h.appendChild(z),h.setAttribute("aria-label",`La etiqueta ${ee[U]} no tiene t\xE9rminos de la taxonom\xEDa visible en este fragmento`);return}Z.forEach((z,ae)=>{let ue=Z.length===1?280:le+R*ae,de=ae%2===0?29:65;h.appendChild(P("line",{class:"act-network-link",x1:O+22,y1:B,x2:ue-8,y2:de-3})),h.appendChild(P("circle",{class:"act-network-signal",cx:ue-8,cy:de-3,r:3.5}));let Me=P("text",{class:"act-network-term",x:ue,y:de,"text-anchor":"middle"});Me.textContent=z.label,h.appendChild(Me)}),h.setAttribute("aria-label",`${ee[U]} conectada con ${Z.map(z=>z.label).join(", ")}`)},W=(S,Z,U=null)=>{if(!S?.rows.length)return;fe=S,H=Math.max(0,Math.min(Z,S.rows.length-1)),$=U;let O=S.rows[H],B=k(O),le=G(O.q),xe=B.slice(0,D()?3:5).map(b=>b.label),R=xe.length?`\xAB${xe.join("\xBB, \xAB")}\xBB`:"ning\xFAn t\xE9rmino de la taxonom\xEDa visible";u.textContent=D()?`${R} acompa\xF1an la etiqueta ${ee[le]} (${N[le]}).`:`Este fragmento re\xFAne ${R}; en esta lectura exploratoria, esa evidencia l\xE9xica acompa\xF1a la etiqueta ${ee[le]} (${N[le]}).`,Y(O),[...g.querySelectorAll(".act-evidence-row")].forEach(b=>{b.setAttribute("aria-current",String(Number(b.dataset.rowIndex)===H))}),[...f.querySelectorAll(".act-term-chip")].forEach(b=>{b.setAttribute("aria-pressed",String(b.dataset.termKey===$))}),m.textContent=`\u201C${O.q.text||"Sin texto disponible"}\u201D`,p.textContent=`\u2014 ${O.q.participant||"Participante an\xF3nimo"}, ${O.q.formatted_date||M(S.date,S.year)}`,v.dataset.quoteIndex=String(O.index)},Q=S=>{if(!S)return;fe=S,H=Math.min(H,S.rows.length-1),$=null;let Z=I(S.year);o.textContent=V(S.date,S.year),s.textContent=`${S.count} ${S.count===1?"fragmento":"fragmentos"} \xB7 ${S.participants.length} ${S.participants.length===1?"participante":"participantes"}`,a.textContent=`${Z.id} \xB7 ${Z.name}`,c.textContent=ee[S.dominantTone],c.className=`act-signal-name ${S.dominantTone}`;let U=S.dominantTone==="mixed"?Math.max(...Object.values(S.toneCounts)):S.toneCounts[S.dominantTone]||0;if(l.textContent=`${U}/${S.count} fragmentos`,["hawkish","dovish","neutral"].forEach(O=>{let B=document.getElementById(`act${O.charAt(0).toUpperCase()}${O.slice(1)}Bar`);B&&(B.style.width=`${S.toneCounts[O]/S.count*100}%`)}),d.innerHTML="",S.participants.forEach(O=>{let B=document.createElement("span");B.className="act-participant",B.textContent=O,d.appendChild(B)}),f.innerHTML="",S.terms.length)S.terms.slice(0,7).forEach(O=>{let B=document.createElement("button");B.type="button",B.className="act-term-chip",B.dataset.termKey=O.key,B.setAttribute("aria-pressed","false"),B.innerHTML="<span></span><small></small>",B.querySelector("span").textContent=O.label,B.querySelector("small").textContent=O.count,B.addEventListener("click",()=>{let le=S.rows.findIndex(xe=>k(xe).some(R=>R.normalized===O.key));W(S,le>=0?le:0,O.key)}),f.appendChild(B)});else{let O=document.createElement("span");O.className="acts-index-meta",O.textContent="sin t\xE9rminos directos en la muestra",f.appendChild(O)}g.innerHTML="",x.textContent=`${S.count} ${S.count===1?"fragmento":"fragmentos"}`,S.rows.forEach((O,B)=>{let le=document.createElement("button");le.type="button",le.className="act-evidence-row",le.dataset.rowIndex=String(B),le.setAttribute("role","listitem"),le.setAttribute("aria-current","false");let xe=document.createElement("span");xe.className="act-evidence-person",xe.textContent=O.q.participant||"Participante an\xF3nimo";let R=document.createElement("span");R.className=`act-evidence-tone ${G(O.q)}`,R.textContent=ee[G(O.q)],le.append(xe,R),le.addEventListener("click",()=>W(S,B)),g.appendChild(le)}),W(S,H),me.forEach(({button:O,act:B})=>O.setAttribute("aria-current",String(B.id===S.id)))},ce=S=>{if(!S)return;H=0,Q(S),window.dispatchEvent(new CustomEvent("particle-act-focus",{detail:{date:S.date}}));let Z=me.find(({act:B})=>B.id===S.id);if(!Z)return;let U=t.getBoundingClientRect(),O=Z.button.getBoundingClientRect();O.top<U.top?t.scrollTop+=O.top-U.top:O.bottom>U.bottom&&(t.scrollTop+=O.bottom-U.bottom)},pe=(S=r.value)=>{let Z=S==="all"?J:J.filter(U=>String(U.year)===String(S));if(t.innerHTML="",me.length=0,!Z.length){let U=document.createElement("div");U.className="acts-empty",U.textContent="No hay actas disponibles para este a\xF1o.",t.appendChild(U);return}Z.forEach(U=>{let O=document.createElement("button");O.type="button",O.className="act-list-item",O.setAttribute("role","listitem"),O.setAttribute("aria-current",String(fe?.id===U.id)),O.setAttribute("aria-label",`Abrir acta del ${M(U.date,U.year)}, ${U.count} fragmentos`);let B=document.createElement("i");B.className=`act-tone-dot ${U.dominantTone}`,B.setAttribute("aria-hidden","true");let le=document.createElement("span"),xe=document.createElement("span");xe.className="act-list-date",xe.textContent=te(U.date,U.year);let R=document.createElement("span");R.className="act-list-meta",R.textContent=`${U.count} ${U.count===1?"fragmento":"fragmentos"} \xB7 ${U.participants.length} ${U.participants.length===1?"voz":"voces"}`,le.append(xe,R);let b=document.createElement("span");b.className="act-list-signal",b.textContent=ee[U.dominantTone],O.append(B,le,b),O.addEventListener("click",()=>ce(U)),t.appendChild(O),me.push({button:O,act:U})})};v.addEventListener("click",()=>{let S=Number(v.dataset.quoteIndex);!Number.isFinite(S)||!i[S]||(gi(S),e(S,{x:window.innerWidth*.62,y:window.innerHeight*.62}))}),r.addEventListener("change",()=>{pe(r.value);let S=J.find(Z=>r.value==="all"||String(Z.year)===r.value);S&&ce(S)}),pe("all");let K=J.find(S=>S.date==="2010-05-13")||J.slice().sort((S,Z)=>Z.count-S.count||S.date.localeCompare(Z.date))[0]||J[0];ce(K),gsap.timeline({scrollTrigger:{trigger:"#stageActs",start:"top 85%",end:"bottom bottom",scrub:!0}}).fromTo(T,{opacity:0,y:18},{opacity:1,y:0,duration:.13,ease:"none"},.04).fromTo(_,{opacity:0,y:24},{opacity:1,y:0,duration:.16,ease:"none"},.16).to(T,{opacity:0,y:-14,duration:.08,ease:"none"},.9)}var z_=Bi(()=>{fa();vl()});var G_={};Ds(G_,{initTimeline:()=>rb});function rb(i=[]){k_=i;let e=document.querySelector("[data-timeline-title]");gsap.fromTo(e,{opacity:0,y:20},{opacity:1,y:0,duration:.8,ease:"cinematicOut",scrollTrigger:{trigger:e,start:"top 80%",toggleActions:"play none none reverse"}});let t=!1,n,r;function o(){let a=document.getElementById("timelineContainer");if(!a)return;t&&d3.select(a).selectAll("*").remove(),t=!0;let c=or(),l=c.height<620,u=Math.min(1060,c.width-40),d=l?Math.max(230,Math.min(300,c.height-132)):320,h=l?{top:24,right:18,bottom:44,left:42}:{top:40,right:30,bottom:60,left:50},f=u-h.left-h.right,g=d-h.top-h.bottom,x=d3.select(a).append("svg").attr("width",u).attr("height",d).attr("viewBox",`0 0 ${u} ${d}`).attr("role","img").attr("aria-label","\xCDndice exploratorio de orientaci\xF3n por a\xF1o, agregado desde los fragmentos visibles").attr("aria-describedby","timelineNote").style("max-width","100%").style("height","auto"),m=x.append("g").attr("transform",`translate(${h.left},${h.top})`),p=d3.range(2e3,2016),v=new Map(p.map(N=>[N,{year:N,hawkish:0,dovish:0,neutral:0,total:0}])),_=N=>{let X=String(N.date||"").match(/^(\d{4})/);return Number(X?X[1]:N.year)};k_.forEach(N=>{let X=_(N),q=v.get(X);if(!q)return;let J=["hawkish","dovish","neutral"].includes(N.label)?N.label:"neutral";q[J]+=1,q.total+=1});let T=p.filter(N=>v.get(N).total>0).map(N=>{let X=v.get(N);return{...X,date:new Date(N,6,1),value:(X.hawkish-X.dovish)/X.total,hasSample:!0}}),w=p.filter(N=>v.get(N).total===0),E=N=>{let X=[];return N.forEach(q=>{let J=X[X.length-1];J&&q===J[1]+1?J[1]=q:X.push([q,q])}),X.map(([q,J])=>q===J?String(q):`${q}\u2013${J}`).join(", ")},A=new Date(2e3,0,1),P=new Date(2015,11,31),y=d3.scaleTime().domain([A,P]).range([0,f]),M=d3.scaleLinear().domain([-1,1]).range([g,0]);m.append("g").attr("transform",`translate(0,${g})`).call(d3.axisBottom(y).ticks(d3.timeYear.every(u<520?4:2)).tickFormat(d3.timeFormat("%Y"))).selectAll("text").style("fill","#e8ecf5").style("font-size","clamp(14px, 1.25vw, 16px)"),m.selectAll(".domain, .tick line").style("stroke","rgba(255,255,255,0.12)"),m.append("g").call(d3.axisLeft(M).ticks(5).tickFormat(N=>N>0?`+${N}`:N)).selectAll("text").style("fill","#e8ecf5").style("font-size","clamp(14px, 1.25vw, 16px)"),m.selectAll(".domain").style("stroke","none"),m.selectAll(".tick line").style("stroke","rgba(255,255,255,0.06)"),m.append("line").attr("x1",0).attr("x2",f).attr("y1",M(0)).attr("y2",M(0)).style("stroke","rgba(255,255,255,0.15)").style("stroke-dasharray","4,4");let D=x.append("defs").append("linearGradient").attr("id","lineGrad").attr("x1","0%").attr("x2","100%");D.append("stop").attr("offset","0%").attr("stop-color","#8ab4f8"),D.append("stop").attr("offset","50%").attr("stop-color","#ffd76a"),D.append("stop").attr("offset","100%").attr("stop-color","#8ab4f8");let V=p.map(N=>v.get(N).total>0?T.find(X=>X.year===N):{year:N,date:new Date(N,6,1),value:null,hasSample:!1}),te=d3.line().defined(N=>N.hasSample).x(N=>y(N.date)).y(N=>M(N.value)).curve(d3.curveLinear);n=m.append("path").datum(V).attr("fill","none").attr("stroke","url(#lineGrad)").attr("stroke-width",2.5).attr("d",te),r=n.node().getTotalLength(),n.attr("stroke-dasharray",r).attr("stroke-dashoffset",r);let I=N=>N.value>0?"#ffd76a":N.value<0?"#8ab4f8":"#cfd6e4";if(m.append("g").attr("class","timeline-points").selectAll("circle").data(T).enter().append("circle").attr("class","timeline-point").attr("cx",N=>y(N.date)).attr("cy",N=>M(N.value)).attr("r",4).style("fill",I).style("stroke","#0a0e1a").style("stroke-width",2).style("opacity",.95).append("title").text(N=>`${N.year}: \xEDndice ${N.value>=0?"+":""}${N.value.toFixed(2)} \xB7 ${N.total} fragmentos (H ${N.hawkish} / D ${N.dovish} / N ${N.neutral})`),m.append("text").attr("class","timeline-direction timeline-direction--high").attr("x",0).attr("y",11).text("hawkish +"),m.append("text").attr("class","timeline-direction timeline-direction--low").attr("x",0).attr("y",g-8).text("dovish \u2212"),w.length){let N=m.append("g").attr("class","timeline-absence");N.selectAll("line").data(w).enter().append("line").attr("x1",X=>y(new Date(X,6,1))).attr("x2",X=>y(new Date(X,6,1))).attr("y1",g-3).attr("y2",g+8),N.append("text").attr("x",d3.mean(w,X=>y(new Date(X,6,1)))).attr("y",g+36).attr("text-anchor","middle").text(`sin muestra: ${E(w)}`)}let G=[{date:new Date(2008,8),label:"Crisis financiera externa"}],ee=m.selectAll(".ev").data(G).enter().append("g").attr("class","ev");ee.append("line").attr("x1",N=>y(N.date)).attr("x2",N=>y(N.date)).attr("y1",0).attr("y2",g).style("stroke","rgba(255,215,106,0.25)").style("stroke-dasharray","3,3"),ee.append("text").attr("x",N=>y(N.date)).attr("y",-8).attr("text-anchor","middle").style("font-size","clamp(14px, 1.25vw, 16px)").style("fill","#ffd76a").style("opacity",.7).text(N=>N.label),gsap.to(a,{opacity:1,duration:.3})}ScrollTrigger.create({trigger:"#stageTimeline",start:"top 80%",onEnter:o,onEnterBack:o});let s;window.addEventListener("resize",()=>{clearTimeout(s),s=setTimeout(()=>{t&&o()},200)}),ScrollTrigger.create({trigger:"#stageTimeline",start:"top top",end:"+=120%",pin:".timeline-pin-wrapper",scrub:1,onUpdate:a=>{n&&n.attr("stroke-dashoffset",r*(1-a.progress))}})}var k_,V_=Bi(()=>{pl();k_=[]});var zf=0,du=1,kf=2;var Ua=1,Gf=2,ti=3,$t=0,Mt=1,Pt=2;var zn=0,Fi=1,dr=2,hu=3,Us=4,Vf=5,Oi=100,Wf=101,Xf=102,fu=103,pu=104,qf=200,Yf=201,jf=202,Kf=203,Ns=204,Bs=205,$f=206,Zf=207,Jf=208,Qf=209,ep=210,tp=211,np=212,ip=213,rp=214,op=0,sp=1,ap=2,_o=3,cp=4,lp=5,up=6,dp=7,Na=0,hp=1,fp=2,kn=0,pp=1,mp=2,gp=3,Ba=4,xp=5,_p=6,mu="attached",yp="detached",gu=300,ni=301,Ei=302,Fs=303,Os=304,hr=306,ii=1e3,Ot=1001,Gr=1002,bt=1003,Hs=1004;var yo=1005;var Nt=1006,Fa=1007;var Gn=1008;var Ln=1009,vp=1010,Ep=1011,vo=1012,Oa=1013,Pn=1014,fn=1015,Hi=1016,Ha=1017,za=1018,Vn=1020,Mp=1021,Ht=1023,bp=1024,Tp=1025,ri=1026,Mi=1027,Sp=1028,ka=1029,Ap=1030,Ga=1031,Va=1033,Wa=33776,Xa=33777,qa=33778,Ya=33779,xu=35840,_u=35841,yu=35842,vu=35843,ja=36196,Eu=37492,Mu=37496,bu=37808,Tu=37809,Su=37810,Au=37811,wu=37812,Ru=37813,Cu=37814,Lu=37815,Pu=37816,Iu=37817,Du=37818,Uu=37819,Nu=37820,Bu=37821,Ka=36492,Fu=36494,Ou=36495,wp=36283,Hu=36284,zu=36285,ku=36286;var zi=2300,ki=2301,$a=2302,Gu=2400,Vu=2401,Wu=2402,Rp=2500;var Xu=0,zs=1,Eo=2,Za=3e3,oi=3001,Cp=3200,Lp=3201,Ja=0,Pp=1,Zt="",tt="srgb",ft="srgb-linear",Mo="display-p3",Vr="display-p3-linear",bo="linear",at="srgb",To="rec709",So="p3";var Wr=7680;var qu=519,Ip=512,Dp=513,Up=514,Qa=515,Np=516,Bp=517,Fp=518,Op=519,ks=35044;var Yu="300 es",Gs=1035,yn=2e3,Xr=2001;var vn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let o=r.indexOf(t);o!==-1&&r.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let o=0,s=r.length;o<s;o++)r[o].call(this,e);e.target=null}}};var on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Hp=1234567,fr=Math.PI/180,Gi=180/Math.PI;function zt(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(on[i&255]+on[i>>8&255]+on[i>>16&255]+on[i>>24&255]+"-"+on[e&255]+on[e>>8&255]+"-"+on[e>>16&15|64]+on[e>>24&255]+"-"+on[t&63|128]+on[t>>8&255]+"-"+on[t>>16&255]+on[t>>24&255]+on[n&255]+on[n>>8&255]+on[n>>16&255]+on[n>>24&255]).toLowerCase()}function Ct(i,e,t){return Math.max(e,Math.min(t,i))}function ec(i,e){return(i%e+e)%e}function pv(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function mv(i,e,t){return i!==e?(t-i)/(e-i):0}function Ao(i,e,t){return(1-t)*i+t*e}function gv(i,e,t,n){return Ao(i,e,1-Math.exp(-t*n))}function xv(i,e=1){return e-Math.abs(ec(i,e*2)-e)}function _v(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function yv(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function vv(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Ev(i,e){return i+Math.random()*(e-i)}function Mv(i){return i*(.5-Math.random())}function bv(i){i!==void 0&&(Hp=i);let e=Hp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Tv(i){return i*fr}function Sv(i){return i*Gi}function tc(i){return(i&i-1)===0&&i!==0}function Av(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function wo(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function wv(i,e,t,n,r){let o=Math.cos,s=Math.sin,a=o(t/2),c=s(t/2),l=o((e+n)/2),u=s((e+n)/2),d=o((e-n)/2),h=s((e-n)/2),f=o((n-e)/2),g=s((n-e)/2);switch(r){case"XYX":i.set(a*u,c*d,c*h,a*l);break;case"YZY":i.set(c*h,a*u,c*d,a*l);break;case"ZXZ":i.set(c*d,c*h,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Wn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ct(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var oe={DEG2RAD:fr,RAD2DEG:Gi,generateUUID:zt,clamp:Ct,euclideanModulo:ec,mapLinear:pv,inverseLerp:mv,lerp:Ao,damp:gv,pingpong:xv,smoothstep:_v,smootherstep:yv,randInt:vv,randFloat:Ev,randFloatSpread:Mv,seededRandom:bv,degToRad:Tv,radToDeg:Sv,isPowerOfTwo:tc,ceilPowerOfTwo:Av,floorPowerOfTwo:wo,setQuaternionFromProperEuler:wv,normalize:ct,denormalize:Wn};var Ie=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),o=this.x-e.x,s=this.y-e.y;return this.x=o*n-s*r+e.x,this.y=o*r+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};var Fe=class i{constructor(e,t,n,r,o,s,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,o,s,a,c,l)}set(e,t,n,r,o,s,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=o,u[5]=c,u[6]=n,u[7]=s,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,o=this.elements,s=n[0],a=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],f=n[5],g=n[8],x=r[0],m=r[3],p=r[6],v=r[1],_=r[4],T=r[7],w=r[2],E=r[5],A=r[8];return o[0]=s*x+a*v+c*w,o[3]=s*m+a*_+c*E,o[6]=s*p+a*T+c*A,o[1]=l*x+u*v+d*w,o[4]=l*m+u*_+d*E,o[7]=l*p+u*T+d*A,o[2]=h*x+f*v+g*w,o[5]=h*m+f*_+g*E,o[8]=h*p+f*T+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],s=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*s*u-t*a*l-n*o*u+n*a*c+r*o*l-r*s*c}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],s=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*s-a*l,h=a*c-u*o,f=l*o-s*c,g=t*d+n*h+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=d*x,e[1]=(r*l-u*n)*x,e[2]=(a*n-r*s)*x,e[3]=h*x,e[4]=(u*t-r*c)*x,e[5]=(r*o-a*t)*x,e[6]=f*x,e[7]=(n*c-l*t)*x,e[8]=(s*t-n*o)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,o,s,a){let c=Math.cos(o),l=Math.sin(o);return this.set(n*c,n*l,-n*(c*s+l*a)+s+e,-r*l,r*c,-r*(-l*s+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ju.makeScale(e,t)),this}rotate(e){return this.premultiply(ju.makeRotation(-e)),this}translate(e,t){return this.premultiply(ju.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},ju=new Fe;function nc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function pr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function kp(){let i=pr("canvas");return i.style.display="block",i}var zp={};function mr(i){i in zp||(zp[i]=!0,console.warn(i))}var Gp=new Fe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Vp=new Fe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ic={[ft]:{transfer:bo,primaries:To,toReference:i=>i,fromReference:i=>i},[tt]:{transfer:at,primaries:To,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Vr]:{transfer:bo,primaries:So,toReference:i=>i.applyMatrix3(Vp),fromReference:i=>i.applyMatrix3(Gp)},[Mo]:{transfer:at,primaries:So,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Vp),fromReference:i=>i.applyMatrix3(Gp).convertLinearToSRGB()}},Rv=new Set([ft,Vr]),Ke={enabled:!0,_workingColorSpace:ft,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Rv.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;let n=ic[e].toReference,r=ic[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return ic[i].primaries},getTransfer:function(i){return i===Zt?bo:ic[i].transfer}};function gr(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function rc(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ro,Co=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ro===void 0&&(Ro=pr("canvas")),Ro.width=e.width,Ro.height=e.height;let n=Ro.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ro}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=pr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),o=r.data;for(let s=0;s<o.length;s++)o[s]=gr(o[s]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(gr(t[n]/255)*255):t[n]=gr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}};var Cv=0,Lo=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Cv++}),this.uuid=zt(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let o;if(Array.isArray(r)){o=[];for(let s=0,a=r.length;s<a;s++)r[s].isDataTexture?o.push(Ku(r[s].image)):o.push(Ku(r[s]))}else o=Ku(r);n.url=o}return t||(e.images[this.uuid]=n),n}};function Ku(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Co.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Lv=0,pt=class i extends vn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Ot,r=Ot,o=Nt,s=Gn,a=Ht,c=Ln,l=i.DEFAULT_ANISOTROPY,u=Zt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Lv++}),this.uuid=zt(),this.name="",this.source=new Lo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=o,this.minFilter=s,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ie(0,0),this.repeat=new Ie(1,1),this.center=new Ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(mr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===oi?tt:Zt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==gu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ii:e.x=e.x-Math.floor(e.x);break;case Ot:e.x=e.x<0?0:1;break;case Gr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ii:e.y=e.y-Math.floor(e.y);break;case Ot:e.y=e.y<0?0:1;break;case Gr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return mr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===tt?oi:Za}set encoding(e){mr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===oi?tt:Zt}};pt.DEFAULT_IMAGE=null;pt.DEFAULT_MAPPING=gu;pt.DEFAULT_ANISOTROPY=1;var it=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,o=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r+s[12]*o,this.y=s[1]*t+s[5]*n+s[9]*r+s[13]*o,this.z=s[2]*t+s[6]*n+s[10]*r+s[14]*o,this.w=s[3]*t+s[7]*n+s[11]*r+s[15]*o,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,o,c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(l+1)/2,T=(f+1)/2,w=(p+1)/2,E=(u+h)/4,A=(d+x)/4,P=(g+m)/4;return _>T&&_>w?_<.01?(n=0,r=.707106781,o=.707106781):(n=Math.sqrt(_),r=E/n,o=A/n):T>w?T<.01?(n=.707106781,r=0,o=.707106781):(r=Math.sqrt(T),n=E/r,o=P/r):w<.01?(n=.707106781,r=.707106781,o=0):(o=Math.sqrt(w),n=A/o,r=P/o),this.set(n,r,o,t),this}let v=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-x)/v,this.z=(h-u)/v,this.w=Math.acos((l+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};var oc=class extends vn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);let r={width:e,height:t,depth:1};n.encoding!==void 0&&(mr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===oi?tt:Zt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new pt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Lo(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}};var En=class extends oc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}};var Po=class extends pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=bt,this.minFilter=bt,this.wrapR=Ot,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var sc=class extends pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=bt,this.minFilter=bt,this.wrapR=Ot,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Jt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,o,s,a){let c=n[r+0],l=n[r+1],u=n[r+2],d=n[r+3],h=o[s+0],f=o[s+1],g=o[s+2],x=o[s+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(d!==x||c!==h||l!==f||u!==g){let m=1-a,p=c*h+l*f+u*g+d*x,v=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){let w=Math.sqrt(_),E=Math.atan2(w,p*v);m=Math.sin(m*E)/w,a=Math.sin(a*E)/w}let T=a*v;if(c=c*m+h*T,l=l*m+f*T,u=u*m+g*T,d=d*m+x*T,m===1-a){let w=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=w,l*=w,u*=w,d*=w}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,o,s){let a=n[r],c=n[r+1],l=n[r+2],u=n[r+3],d=o[s],h=o[s+1],f=o[s+2],g=o[s+3];return e[t]=a*g+u*d+c*f-l*h,e[t+1]=c*g+u*h+l*d-a*f,e[t+2]=l*g+u*f+a*h-c*d,e[t+3]=u*g-a*d-c*h-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,o=e._z,s=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(r/2),d=a(o/2),h=c(n/2),f=c(r/2),g=c(o/2);switch(s){case"XYZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"YZX":this._x=h*u*d+l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d-h*f*g;break;case"XZY":this._x=h*u*d-l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],o=t[8],s=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=n+a+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-c)*f,this._y=(o-l)*f,this._z=(s-r)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(u-c)/f,this._x=.25*f,this._y=(r+s)/f,this._z=(o+l)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(o-l)/f,this._x=(r+s)/f,this._y=.25*f,this._z=(c+u)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(s-r)/f,this._x=(o+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ct(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,o=e._z,s=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+s*a+r*l-o*c,this._y=r*u+s*c+o*a-n*l,this._z=o*u+s*l+n*c-r*a,this._w=s*u-n*a-r*c-o*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,o=this._z,s=this._w,a=s*e._w+n*e._x+r*e._y+o*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=n,this._y=r,this._z=o,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-t;return this._w=f*s+t*this._w,this._x=f*n+t*this._x,this._y=f*r+t*this._y,this._z=f*o+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),d=Math.sin((1-t)*u)/l,h=Math.sin(t*u)/l;return this._w=s*d+this._w*h,this._x=n*d+this._x*h,this._y=r*d+this._y*h,this._z=o*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),o=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(o),n*Math.cos(o),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};var L=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Wp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Wp.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*r,this.y=o[1]*t+o[4]*n+o[7]*r,this.z=o[2]*t+o[5]*n+o[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,o=e.elements,s=1/(o[3]*t+o[7]*n+o[11]*r+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*r+o[12])*s,this.y=(o[1]*t+o[5]*n+o[9]*r+o[13])*s,this.z=(o[2]*t+o[6]*n+o[10]*r+o[14])*s,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,o=e.x,s=e.y,a=e.z,c=e.w,l=2*(s*r-a*n),u=2*(a*t-o*r),d=2*(o*n-s*t);return this.x=t+c*l+s*d-a*u,this.y=n+c*u+a*l-o*d,this.z=r+c*d+o*u-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r,this.y=o[1]*t+o[5]*n+o[9]*r,this.z=o[2]*t+o[6]*n+o[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,o=e.z,s=t.x,a=t.y,c=t.z;return this.x=r*c-o*a,this.y=o*s-n*c,this.z=n*a-r*s,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return $u.copy(this).projectOnVector(e),this.sub($u)}reflect(e){return this.sub($u.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},$u=new L,Wp=new Jt;var ut=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(si.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(si.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=si.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let o=n.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=o.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,si):si.fromBufferAttribute(o,s),si.applyMatrix4(e.matrixWorld),this.expandByPoint(si);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ac.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ac.copy(n.boundingBox)),ac.applyMatrix4(e.matrixWorld),this.union(ac)}let r=e.children;for(let o=0,s=r.length;o<s;o++)this.expandByObject(r[o],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,si),si.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vs),cc.subVectors(this.max,Vs),Io.subVectors(e.a,Vs),Do.subVectors(e.b,Vs),Uo.subVectors(e.c,Vs),xr.subVectors(Do,Io),_r.subVectors(Uo,Do),qr.subVectors(Io,Uo);let t=[0,-xr.z,xr.y,0,-_r.z,_r.y,0,-qr.z,qr.y,xr.z,0,-xr.x,_r.z,0,-_r.x,qr.z,0,-qr.x,-xr.y,xr.x,0,-_r.y,_r.x,0,-qr.y,qr.x,0];return!Zu(t,Io,Do,Uo,cc)||(t=[1,0,0,0,1,0,0,0,1],!Zu(t,Io,Do,Uo,cc))?!1:(lc.crossVectors(xr,_r),t=[lc.x,lc.y,lc.z],Zu(t,Io,Do,Uo,cc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,si).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(si).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Vi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Vi=[new L,new L,new L,new L,new L,new L,new L,new L],si=new L,ac=new ut,Io=new L,Do=new L,Uo=new L,xr=new L,_r=new L,qr=new L,Vs=new L,cc=new L,lc=new L,Yr=new L;function Zu(i,e,t,n,r){for(let o=0,s=i.length-3;o<=s;o+=3){Yr.fromArray(i,o);let a=r.x*Math.abs(Yr.x)+r.y*Math.abs(Yr.y)+r.z*Math.abs(Yr.z),c=e.dot(Yr),l=t.dot(Yr),u=n.dot(Yr);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var Pv=new ut,Ws=new L,Ju=new L,At=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Pv.setFromPoints(e).getCenter(n);let r=0;for(let o=0,s=e.length;o<s;o++)r=Math.max(r,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ws.subVectors(e,this.center);let t=Ws.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Ws,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ju.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ws.copy(e.center).add(Ju)),this.expandByPoint(Ws.copy(e.center).sub(Ju))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}};var Wi=new L,Qu=new L,uc=new L,yr=new L,ed=new L,dc=new L,td=new L,Xn=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Wi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wi.copy(this.origin).addScaledVector(this.direction,t),Wi.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Qu.copy(e).add(t).multiplyScalar(.5),uc.copy(t).sub(e).normalize(),yr.copy(this.origin).sub(Qu);let o=e.distanceTo(t)*.5,s=-this.direction.dot(uc),a=yr.dot(this.direction),c=-yr.dot(uc),l=yr.lengthSq(),u=Math.abs(1-s*s),d,h,f,g;if(u>0)if(d=s*c-a,h=s*a-c,g=o*u,d>=0)if(h>=-g)if(h<=g){let x=1/u;d*=x,h*=x,f=d*(d+s*h+2*a)+h*(s*d+h+2*c)+l}else h=o,d=Math.max(0,-(s*h+a)),f=-d*d+h*(h+2*c)+l;else h=-o,d=Math.max(0,-(s*h+a)),f=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-s*o+a)),h=d>0?-o:Math.min(Math.max(-o,-c),o),f=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-o,-c),o),f=h*(h+2*c)+l):(d=Math.max(0,-(s*o+a)),h=d>0?o:Math.min(Math.max(-o,-c),o),f=-d*d+h*(h+2*c)+l);else h=s>0?-o:o,d=Math.max(0,-(s*h+a)),f=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Qu).addScaledVector(uc,h),f}intersectSphere(e,t){Wi.subVectors(e.center,this.origin);let n=Wi.dot(this.direction),r=Wi.dot(Wi)-n*n,o=e.radius*e.radius;if(r>o)return null;let s=Math.sqrt(o-r),a=n-s,c=n+s;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,o,s,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(o=(e.min.y-h.y)*u,s=(e.max.y-h.y)*u):(o=(e.max.y-h.y)*u,s=(e.min.y-h.y)*u),n>s||o>r||((o>n||isNaN(n))&&(n=o),(s<r||isNaN(r))&&(r=s),d>=0?(a=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Wi)!==null}intersectTriangle(e,t,n,r,o){ed.subVectors(t,e),dc.subVectors(n,e),td.crossVectors(ed,dc);let s=this.direction.dot(td),a;if(s>0){if(r)return null;a=1}else if(s<0)a=-1,s=-s;else return null;yr.subVectors(this.origin,e);let c=a*this.direction.dot(dc.crossVectors(yr,dc));if(c<0)return null;let l=a*this.direction.dot(ed.cross(yr));if(l<0||c+l>s)return null;let u=-a*yr.dot(td);return u<0?null:this.at(u/s,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};var De=class i{constructor(e,t,n,r,o,s,a,c,l,u,d,h,f,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,o,s,a,c,l,u,d,h,f,g,x,m)}set(e,t,n,r,o,s,a,c,l,u,d,h,f,g,x,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=o,p[5]=s,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/No.setFromMatrixColumn(e,0).length(),o=1/No.setFromMatrixColumn(e,1).length(),s=1/No.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,o=e.z,s=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(o),d=Math.sin(o);if(e.order==="XYZ"){let h=s*u,f=s*d,g=a*u,x=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=f+g*l,t[5]=h-x*l,t[9]=-a*c,t[2]=x-h*l,t[6]=g+f*l,t[10]=s*c}else if(e.order==="YXZ"){let h=c*u,f=c*d,g=l*u,x=l*d;t[0]=h+x*a,t[4]=g*a-f,t[8]=s*l,t[1]=s*d,t[5]=s*u,t[9]=-a,t[2]=f*a-g,t[6]=x+h*a,t[10]=s*c}else if(e.order==="ZXY"){let h=c*u,f=c*d,g=l*u,x=l*d;t[0]=h-x*a,t[4]=-s*d,t[8]=g+f*a,t[1]=f+g*a,t[5]=s*u,t[9]=x-h*a,t[2]=-s*l,t[6]=a,t[10]=s*c}else if(e.order==="ZYX"){let h=s*u,f=s*d,g=a*u,x=a*d;t[0]=c*u,t[4]=g*l-f,t[8]=h*l+x,t[1]=c*d,t[5]=x*l+h,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=s*c}else if(e.order==="YZX"){let h=s*c,f=s*l,g=a*c,x=a*l;t[0]=c*u,t[4]=x-h*d,t[8]=g*d+f,t[1]=d,t[5]=s*u,t[9]=-a*u,t[2]=-l*u,t[6]=f*d+g,t[10]=h-x*d}else if(e.order==="XZY"){let h=s*c,f=s*l,g=a*c,x=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+x,t[5]=s*u,t[9]=f*d-g,t[2]=g*d-f,t[6]=a*u,t[10]=x*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Iv,e,Dv)}lookAt(e,t,n){let r=this.elements;return In.subVectors(e,t),In.lengthSq()===0&&(In.z=1),In.normalize(),vr.crossVectors(n,In),vr.lengthSq()===0&&(Math.abs(n.z)===1?In.x+=1e-4:In.z+=1e-4,In.normalize(),vr.crossVectors(n,In)),vr.normalize(),hc.crossVectors(In,vr),r[0]=vr.x,r[4]=hc.x,r[8]=In.x,r[1]=vr.y,r[5]=hc.y,r[9]=In.y,r[2]=vr.z,r[6]=hc.z,r[10]=In.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,o=this.elements,s=n[0],a=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],v=n[3],_=n[7],T=n[11],w=n[15],E=r[0],A=r[4],P=r[8],y=r[12],M=r[1],D=r[5],V=r[9],te=r[13],I=r[2],k=r[6],G=r[10],ee=r[14],N=r[3],X=r[7],q=r[11],J=r[15];return o[0]=s*E+a*M+c*I+l*N,o[4]=s*A+a*D+c*k+l*X,o[8]=s*P+a*V+c*G+l*q,o[12]=s*y+a*te+c*ee+l*J,o[1]=u*E+d*M+h*I+f*N,o[5]=u*A+d*D+h*k+f*X,o[9]=u*P+d*V+h*G+f*q,o[13]=u*y+d*te+h*ee+f*J,o[2]=g*E+x*M+m*I+p*N,o[6]=g*A+x*D+m*k+p*X,o[10]=g*P+x*V+m*G+p*q,o[14]=g*y+x*te+m*ee+p*J,o[3]=v*E+_*M+T*I+w*N,o[7]=v*A+_*D+T*k+w*X,o[11]=v*P+_*V+T*G+w*q,o[15]=v*y+_*te+T*ee+w*J,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],o=e[12],s=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15];return g*(+o*c*d-r*l*d-o*a*h+n*l*h+r*a*f-n*c*f)+x*(+t*c*f-t*l*h+o*s*h-r*s*f+r*l*u-o*c*u)+m*(+t*l*d-t*a*f-o*s*d+n*s*f+o*a*u-n*l*u)+p*(-r*a*u-t*c*d+t*a*h+r*s*d-n*s*h+n*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],s=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],v=d*m*l-x*h*l+x*c*f-a*m*f-d*c*p+a*h*p,_=g*h*l-u*m*l-g*c*f+s*m*f+u*c*p-s*h*p,T=u*x*l-g*d*l+g*a*f-s*x*f-u*a*p+s*d*p,w=g*d*c-u*x*c-g*a*h+s*x*h+u*a*m-s*d*m,E=t*v+n*_+r*T+o*w;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/E;return e[0]=v*A,e[1]=(x*h*o-d*m*o-x*r*f+n*m*f+d*r*p-n*h*p)*A,e[2]=(a*m*o-x*c*o+x*r*l-n*m*l-a*r*p+n*c*p)*A,e[3]=(d*c*o-a*h*o-d*r*l+n*h*l+a*r*f-n*c*f)*A,e[4]=_*A,e[5]=(u*m*o-g*h*o+g*r*f-t*m*f-u*r*p+t*h*p)*A,e[6]=(g*c*o-s*m*o-g*r*l+t*m*l+s*r*p-t*c*p)*A,e[7]=(s*h*o-u*c*o+u*r*l-t*h*l-s*r*f+t*c*f)*A,e[8]=T*A,e[9]=(g*d*o-u*x*o-g*n*f+t*x*f+u*n*p-t*d*p)*A,e[10]=(s*x*o-g*a*o+g*n*l-t*x*l-s*n*p+t*a*p)*A,e[11]=(u*a*o-s*d*o-u*n*l+t*d*l+s*n*f-t*a*f)*A,e[12]=w*A,e[13]=(u*x*r-g*d*r+g*n*h-t*x*h-u*n*m+t*d*m)*A,e[14]=(g*a*r-s*x*r-g*n*c+t*x*c+s*n*m-t*a*m)*A,e[15]=(s*d*r-u*a*r+u*n*c-t*d*c-s*n*h+t*a*h)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,o=e.z;return t[0]*=n,t[4]*=r,t[8]*=o,t[1]*=n,t[5]*=r,t[9]*=o,t[2]*=n,t[6]*=r,t[10]*=o,t[3]*=n,t[7]*=r,t[11]*=o,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),o=1-n,s=e.x,a=e.y,c=e.z,l=o*s,u=o*a;return this.set(l*s+n,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+n,u*c-r*s,0,l*c-r*a,u*c+r*s,o*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,o,s){return this.set(1,n,o,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,o=t._x,s=t._y,a=t._z,c=t._w,l=o+o,u=s+s,d=a+a,h=o*l,f=o*u,g=o*d,x=s*u,m=s*d,p=a*d,v=c*l,_=c*u,T=c*d,w=n.x,E=n.y,A=n.z;return r[0]=(1-(x+p))*w,r[1]=(f+T)*w,r[2]=(g-_)*w,r[3]=0,r[4]=(f-T)*E,r[5]=(1-(h+p))*E,r[6]=(m+v)*E,r[7]=0,r[8]=(g+_)*A,r[9]=(m-v)*A,r[10]=(1-(h+x))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,o=No.set(r[0],r[1],r[2]).length(),s=No.set(r[4],r[5],r[6]).length(),a=No.set(r[8],r[9],r[10]).length();this.determinant()<0&&(o=-o),e.x=r[12],e.y=r[13],e.z=r[14],ai.copy(this);let l=1/o,u=1/s,d=1/a;return ai.elements[0]*=l,ai.elements[1]*=l,ai.elements[2]*=l,ai.elements[4]*=u,ai.elements[5]*=u,ai.elements[6]*=u,ai.elements[8]*=d,ai.elements[9]*=d,ai.elements[10]*=d,t.setFromRotationMatrix(ai),n.x=o,n.y=s,n.z=a,this}makePerspective(e,t,n,r,o,s,a=yn){let c=this.elements,l=2*o/(t-e),u=2*o/(n-r),d=(t+e)/(t-e),h=(n+r)/(n-r),f,g;if(a===yn)f=-(s+o)/(s-o),g=-2*s*o/(s-o);else if(a===Xr)f=-s/(s-o),g=-s*o/(s-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,o,s,a=yn){let c=this.elements,l=1/(t-e),u=1/(n-r),d=1/(s-o),h=(t+e)*l,f=(n+r)*u,g,x;if(a===yn)g=(s+o)*d,x=-2*d;else if(a===Xr)g=o*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},No=new L,ai=new De,Iv=new L(0,0,0),Dv=new L(1,1,1),vr=new L,hc=new L,In=new L;var Xp=new De,qp=new Jt,Er=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,o=r[0],s=r[4],a=r[8],c=r[1],l=r[5],u=r[9],d=r[2],h=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-s,o)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ct(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(Ct(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-Ct(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(Ct(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ct(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Xp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Xp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return qp.setFromEuler(this),this.setFromQuaternion(qp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Er.DEFAULT_ORDER="XYZ";var Mr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}};var Uv=0,Yp=new L,Bo=new Jt,Xi=new De,fc=new L,Xs=new L,Nv=new L,Bv=new Jt,jp=new L(1,0,0),Kp=new L(0,1,0),$p=new L(0,0,1),Fv={type:"added"},Ov={type:"removed"},We=class i extends vn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Uv++}),this.uuid=zt(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new L,t=new Er,n=new Jt,r=new L(1,1,1);function o(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new De},normalMatrix:{value:new Fe}}),this.matrix=new De,this.matrixWorld=new De,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Mr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Bo.setFromAxisAngle(e,t),this.quaternion.multiply(Bo),this}rotateOnWorldAxis(e,t){return Bo.setFromAxisAngle(e,t),this.quaternion.premultiply(Bo),this}rotateX(e){return this.rotateOnAxis(jp,e)}rotateY(e){return this.rotateOnAxis(Kp,e)}rotateZ(e){return this.rotateOnAxis($p,e)}translateOnAxis(e,t){return Yp.copy(e).applyQuaternion(this.quaternion),this.position.add(Yp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(jp,e)}translateY(e){return this.translateOnAxis(Kp,e)}translateZ(e){return this.translateOnAxis($p,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Xi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?fc.copy(e):fc.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Xs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xi.lookAt(Xs,fc,this.up):Xi.lookAt(fc,Xs,this.up),this.quaternion.setFromRotationMatrix(Xi),r&&(Xi.extractRotation(r.matrixWorld),Bo.setFromRotationMatrix(Xi),this.quaternion.premultiply(Bo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Fv)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ov)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Xi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let o=0,s=r.length;o<s;o++)r[o].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xs,e,Nv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xs,Bv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++){let o=t[n];(o.matrixWorldAutoUpdate===!0||e===!0)&&o.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let r=this.children;for(let o=0,s=r.length;o<s;o++){let a=r[o];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function o(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=o(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let d=c[l];o(e.shapes,d)}else o(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(o(e.materials,this.material[c]));r.material=a}else r.material=o(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];r.animations.push(o(e.animations,c))}}if(t){let a=s(e.geometries),c=s(e.materials),l=s(e.textures),u=s(e.images),d=s(e.shapes),h=s(e.skeletons),f=s(e.animations),g=s(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=r,n;function s(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};We.DEFAULT_UP=new L(0,1,0);We.DEFAULT_MATRIX_AUTO_UPDATE=!0;We.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ci=new L,qi=new L,nd=new L,Yi=new L,Fo=new L,Oo=new L,Zp=new L,id=new L,rd=new L,od=new L,pc=!1,ji=class i{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),ci.subVectors(e,t),r.cross(ci);let o=r.lengthSq();return o>0?r.multiplyScalar(1/Math.sqrt(o)):r.set(0,0,0)}static getBarycoord(e,t,n,r,o){ci.subVectors(r,t),qi.subVectors(n,t),nd.subVectors(e,t);let s=ci.dot(ci),a=ci.dot(qi),c=ci.dot(nd),l=qi.dot(qi),u=qi.dot(nd),d=s*l-a*a;if(d===0)return o.set(0,0,0),null;let h=1/d,f=(l*c-a*u)*h,g=(s*u-a*c)*h;return o.set(1-f-g,g,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Yi)===null?!1:Yi.x>=0&&Yi.y>=0&&Yi.x+Yi.y<=1}static getUV(e,t,n,r,o,s,a,c){return pc===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),pc=!0),this.getInterpolation(e,t,n,r,o,s,a,c)}static getInterpolation(e,t,n,r,o,s,a,c){return this.getBarycoord(e,t,n,r,Yi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(o,Yi.x),c.addScaledVector(s,Yi.y),c.addScaledVector(a,Yi.z),c)}static isFrontFacing(e,t,n,r){return ci.subVectors(n,t),qi.subVectors(e,t),ci.cross(qi).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ci.subVectors(this.c,this.b),qi.subVectors(this.a,this.b),ci.cross(qi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,o){return pc===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),pc=!0),i.getInterpolation(e,this.a,this.b,this.c,t,n,r,o)}getInterpolation(e,t,n,r,o){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,o)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,o=this.c,s,a;Fo.subVectors(r,n),Oo.subVectors(o,n),id.subVectors(e,n);let c=Fo.dot(id),l=Oo.dot(id);if(c<=0&&l<=0)return t.copy(n);rd.subVectors(e,r);let u=Fo.dot(rd),d=Oo.dot(rd);if(u>=0&&d<=u)return t.copy(r);let h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return s=c/(c-u),t.copy(n).addScaledVector(Fo,s);od.subVectors(e,o);let f=Fo.dot(od),g=Oo.dot(od);if(g>=0&&f<=g)return t.copy(o);let x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Oo,a);let m=u*g-f*d;if(m<=0&&d-u>=0&&f-g>=0)return Zp.subVectors(o,r),a=(d-u)/(d-u+(f-g)),t.copy(r).addScaledVector(Zp,a);let p=1/(m+x+h);return s=x*p,a=h*p,t.copy(n).addScaledVector(Fo,s).addScaledVector(Oo,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}};var Jp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},br={h:0,s:0,l:0},mc={h:0,s:0,l:0};function sd(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var ge=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=tt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Ke.workingColorSpace){if(e=ec(e,1),t=Ct(t,0,1),n=Ct(n,0,1),t===0)this.r=this.g=this.b=n;else{let o=n<=.5?n*(1+t):n+t-n*t,s=2*n-o;this.r=sd(s,o,e+1/3),this.g=sd(s,o,e),this.b=sd(s,o,e-1/3)}return Ke.toWorkingColorSpace(this,r),this}setStyle(e,t=tt){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let o,s=r[1],a=r[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let o=r[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=tt){let n=Jp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gr(e.r),this.g=gr(e.g),this.b=gr(e.b),this}copyLinearToSRGB(e){return this.r=rc(e.r),this.g=rc(e.g),this.b=rc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=tt){return Ke.fromWorkingColorSpace(an.copy(this),e),Math.round(Ct(an.r*255,0,255))*65536+Math.round(Ct(an.g*255,0,255))*256+Math.round(Ct(an.b*255,0,255))}getHexString(e=tt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(an.copy(this),t);let n=an.r,r=an.g,o=an.b,s=Math.max(n,r,o),a=Math.min(n,r,o),c,l,u=(a+s)/2;if(a===s)c=0,l=0;else{let d=s-a;switch(l=u<=.5?d/(s+a):d/(2-s-a),s){case n:c=(r-o)/d+(r<o?6:0);break;case r:c=(o-n)/d+2;break;case o:c=(n-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(an.copy(this),t),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=tt){Ke.fromWorkingColorSpace(an.copy(this),e);let t=an.r,n=an.g,r=an.b;return e!==tt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(br),this.setHSL(br.h+e,br.s+t,br.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(br),e.getHSL(mc);let n=Ao(br.h,mc.h,t),r=Ao(br.s,mc.s,t),o=Ao(br.l,mc.l,t);return this.setHSL(n,r,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,o=e.elements;return this.r=o[0]*t+o[3]*n+o[6]*r,this.g=o[1]*t+o[4]*n+o[7]*r,this.b=o[2]*t+o[5]*n+o[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},an=new ge;ge.NAMES=Jp;var Hv=0,It=class extends vn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hv++}),this.uuid=zt(),this.name="",this.type="Material",this.blending=Fi,this.side=$t,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ns,this.blendDst=Bs,this.blendEquation=Oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ge(0,0,0),this.blendAlpha=0,this.depthFunc=_o,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wr,this.stencilZFail=Wr,this.stencilZPass=Wr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fi&&(n.blending=this.blending),this.side!==$t&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ns&&(n.blendSrc=this.blendSrc),this.blendDst!==Bs&&(n.blendDst=this.blendDst),this.blendEquation!==Oi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==_o&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==qu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Wr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Wr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Wr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(o){let s=[];for(let a in o){let c=o[a];delete c.metadata,s.push(c)}return s}if(t){let o=r(e.textures),s=r(e.images);o.length>0&&(n.textures=o),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let o=0;o!==r;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Dt=class extends It{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Na,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Bt=new L,gc=new Ie,Ye=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ks,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=fn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,o=this.itemSize;r<o;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)gc.fromBufferAttribute(this,t),gc.applyMatrix3(e),this.setXY(t,gc.x,gc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),r=ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,o){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),r=ct(r,this.array),o=ct(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ks&&(e.usage=this.usage),e}};var Ho=class extends Ye{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var zo=class extends Ye{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var $e=class extends Ye{constructor(e,t,n){super(new Float32Array(e),t,n)}};var zv=0,qn=new De,ad=new We,ko=new L,Dn=new ut,qs=new ut,Qt=new L,Ze=class i extends vn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zv++}),this.uuid=zt(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(nc(e)?zo:Ho)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let o=new Fe().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return qn.makeRotationFromQuaternion(e),this.applyMatrix4(qn),this}rotateX(e){return qn.makeRotationX(e),this.applyMatrix4(qn),this}rotateY(e){return qn.makeRotationY(e),this.applyMatrix4(qn),this}rotateZ(e){return qn.makeRotationZ(e),this.applyMatrix4(qn),this}translate(e,t,n){return qn.makeTranslation(e,t,n),this.applyMatrix4(qn),this}scale(e,t,n){return qn.makeScale(e,t,n),this.applyMatrix4(qn),this}lookAt(e){return ad.lookAt(e),ad.updateMatrix(),this.applyMatrix4(ad.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ko).negate(),this.translate(ko.x,ko.y,ko.z),this}setFromPoints(e){let t=[];for(let n=0,r=e.length;n<r;n++){let o=e[n];t.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new $e(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ut);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let o=t[n];Dn.setFromBufferAttribute(o),this.morphTargetsRelative?(Qt.addVectors(this.boundingBox.min,Dn.min),this.boundingBox.expandByPoint(Qt),Qt.addVectors(this.boundingBox.max,Dn.max),this.boundingBox.expandByPoint(Qt)):(this.boundingBox.expandByPoint(Dn.min),this.boundingBox.expandByPoint(Dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new At);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(Dn.setFromBufferAttribute(e),t)for(let o=0,s=t.length;o<s;o++){let a=t[o];qs.setFromBufferAttribute(a),this.morphTargetsRelative?(Qt.addVectors(Dn.min,qs.min),Dn.expandByPoint(Qt),Qt.addVectors(Dn.max,qs.max),Dn.expandByPoint(Qt)):(Dn.expandByPoint(qs.min),Dn.expandByPoint(qs.max))}Dn.getCenter(n);let r=0;for(let o=0,s=e.count;o<s;o++)Qt.fromBufferAttribute(e,o),r=Math.max(r,n.distanceToSquared(Qt));if(t)for(let o=0,s=t.length;o<s;o++){let a=t[o],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Qt.fromBufferAttribute(a,l),c&&(ko.fromBufferAttribute(e,l),Qt.add(ko)),r=Math.max(r,n.distanceToSquared(Qt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,r=t.position.array,o=t.normal.array,s=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ye(new Float32Array(4*a),4));let c=this.getAttribute("tangent").array,l=[],u=[];for(let M=0;M<a;M++)l[M]=new L,u[M]=new L;let d=new L,h=new L,f=new L,g=new Ie,x=new Ie,m=new Ie,p=new L,v=new L;function _(M,D,V){d.fromArray(r,M*3),h.fromArray(r,D*3),f.fromArray(r,V*3),g.fromArray(s,M*2),x.fromArray(s,D*2),m.fromArray(s,V*2),h.sub(d),f.sub(d),x.sub(g),m.sub(g);let te=1/(x.x*m.y-m.x*x.y);isFinite(te)&&(p.copy(h).multiplyScalar(m.y).addScaledVector(f,-x.y).multiplyScalar(te),v.copy(f).multiplyScalar(x.x).addScaledVector(h,-m.x).multiplyScalar(te),l[M].add(p),l[D].add(p),l[V].add(p),u[M].add(v),u[D].add(v),u[V].add(v))}let T=this.groups;T.length===0&&(T=[{start:0,count:n.length}]);for(let M=0,D=T.length;M<D;++M){let V=T[M],te=V.start,I=V.count;for(let k=te,G=te+I;k<G;k+=3)_(n[k+0],n[k+1],n[k+2])}let w=new L,E=new L,A=new L,P=new L;function y(M){A.fromArray(o,M*3),P.copy(A);let D=l[M];w.copy(D),w.sub(A.multiplyScalar(A.dot(D))).normalize(),E.crossVectors(P,D);let te=E.dot(u[M])<0?-1:1;c[M*4]=w.x,c[M*4+1]=w.y,c[M*4+2]=w.z,c[M*4+3]=te}for(let M=0,D=T.length;M<D;++M){let V=T[M],te=V.start,I=V.count;for(let k=te,G=te+I;k<G;k+=3)y(n[k+0]),y(n[k+1]),y(n[k+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ye(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);let r=new L,o=new L,s=new L,a=new L,c=new L,l=new L,u=new L,d=new L;if(e)for(let h=0,f=e.count;h<f;h+=3){let g=e.getX(h+0),x=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),o.fromBufferAttribute(t,x),s.fromBufferAttribute(t,m),u.subVectors(s,o),d.subVectors(r,o),u.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,f=t.count;h<f;h+=3)r.fromBufferAttribute(t,h+0),o.fromBufferAttribute(t,h+1),s.fromBufferAttribute(t,h+2),u.subVectors(s,o),d.subVectors(r,o),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Qt.fromBufferAttribute(e,t),Qt.normalize(),e.setXYZ(t,Qt.x,Qt.y,Qt.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,d=a.normalized,h=new l.constructor(c.length*u),f=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*u;for(let p=0;p<u;p++)h[g++]=l[f++]}return new Ye(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,n);t.setAttribute(a,l)}let o=this.morphAttributes;for(let a in o){let c=[],l=o[a];for(let u=0,d=l.length;u<d;u++){let h=l[u],f=e(h,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let a=0,c=s.length;a<c;a++){let l=s[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},o=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){let f=l[d];u.push(f.toJSON(e.data))}u.length>0&&(r[c]=u,o=!0)}o&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let o=e.morphAttributes;for(let l in o){let u=[],d=o[l];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let l=0,u=s.length;l<u;l++){let d=s[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Qp=new De,jr=new Xn,xc=new At,em=new L,Go=new L,Vo=new L,Wo=new L,cd=new L,_c=new L,yc=new Ie,vc=new Ie,Ec=new Ie,tm=new L,nm=new L,im=new L,Mc=new L,bc=new L,ke=class extends We{constructor(e=new Ze,t=new Dt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){let a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,o=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(o&&a){_c.set(0,0,0);for(let c=0,l=o.length;c<l;c++){let u=a[c],d=o[c];u!==0&&(cd.fromBufferAttribute(d,e),s?_c.addScaledVector(cd,u):_c.addScaledVector(cd.sub(t),u))}t.add(_c)}return t}raycast(e,t){let n=this.geometry,r=this.material,o=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xc.copy(n.boundingSphere),xc.applyMatrix4(o),jr.copy(e.ray).recast(e.near),!(xc.containsPoint(jr.origin)===!1&&(jr.intersectSphere(xc,em)===null||jr.origin.distanceToSquared(em)>(e.far-e.near)**2))&&(Qp.copy(o).invert(),jr.copy(e.ray).applyMatrix4(Qp),!(n.boundingBox!==null&&jr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,jr)))}_computeIntersections(e,t,n){let r,o=this.geometry,s=this.material,a=o.index,c=o.attributes.position,l=o.attributes.uv,u=o.attributes.uv1,d=o.attributes.normal,h=o.groups,f=o.drawRange;if(a!==null)if(Array.isArray(s))for(let g=0,x=h.length;g<x;g++){let m=h[g],p=s[m.materialIndex],v=Math.max(m.start,f.start),_=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let T=v,w=_;T<w;T+=3){let E=a.getX(T),A=a.getX(T+1),P=a.getX(T+2);r=Tc(this,p,e,n,l,u,d,E,A,P),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let v=a.getX(m),_=a.getX(m+1),T=a.getX(m+2);r=Tc(this,s,e,n,l,u,d,v,_,T),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(s))for(let g=0,x=h.length;g<x;g++){let m=h[g],p=s[m.materialIndex],v=Math.max(m.start,f.start),_=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let T=v,w=_;T<w;T+=3){let E=T,A=T+1,P=T+2;r=Tc(this,p,e,n,l,u,d,E,A,P),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let v=m,_=m+1,T=m+2;r=Tc(this,s,e,n,l,u,d,v,_,T),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function kv(i,e,t,n,r,o,s,a){let c;if(e.side===Mt?c=n.intersectTriangle(s,o,r,!0,a):c=n.intersectTriangle(r,o,s,e.side===$t,a),c===null)return null;bc.copy(a),bc.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(bc);return l<t.near||l>t.far?null:{distance:l,point:bc.clone(),object:i}}function Tc(i,e,t,n,r,o,s,a,c,l){i.getVertexPosition(a,Go),i.getVertexPosition(c,Vo),i.getVertexPosition(l,Wo);let u=kv(i,e,t,n,Go,Vo,Wo,Mc);if(u){r&&(yc.fromBufferAttribute(r,a),vc.fromBufferAttribute(r,c),Ec.fromBufferAttribute(r,l),u.uv=ji.getInterpolation(Mc,Go,Vo,Wo,yc,vc,Ec,new Ie)),o&&(yc.fromBufferAttribute(o,a),vc.fromBufferAttribute(o,c),Ec.fromBufferAttribute(o,l),u.uv1=ji.getInterpolation(Mc,Go,Vo,Wo,yc,vc,Ec,new Ie),u.uv2=u.uv1),s&&(tm.fromBufferAttribute(s,a),nm.fromBufferAttribute(s,c),im.fromBufferAttribute(s,l),u.normal=ji.getInterpolation(Mc,Go,Vo,Wo,tm,nm,im,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new L,materialIndex:0};ji.getNormal(Go,Vo,Wo,d.normal),u.face=d}return u}var Yn=class i extends Ze{constructor(e=1,t=1,n=1,r=1,o=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:o,depthSegments:s};let a=this;r=Math.floor(r),o=Math.floor(o),s=Math.floor(s);let c=[],l=[],u=[],d=[],h=0,f=0;g("z","y","x",-1,-1,n,t,e,s,o,0),g("z","y","x",1,-1,n,t,-e,s,o,1),g("x","z","y",1,1,e,n,t,r,s,2),g("x","z","y",1,-1,e,n,-t,r,s,3),g("x","y","z",1,-1,e,t,n,r,o,4),g("x","y","z",-1,-1,e,t,-n,r,o,5),this.setIndex(c),this.setAttribute("position",new $e(l,3)),this.setAttribute("normal",new $e(u,3)),this.setAttribute("uv",new $e(d,2));function g(x,m,p,v,_,T,w,E,A,P,y){let M=T/A,D=w/P,V=T/2,te=w/2,I=E/2,k=A+1,G=P+1,ee=0,N=0,X=new L;for(let q=0;q<G;q++){let J=q*D-te;for(let fe=0;fe<k;fe++){let H=fe*M-V;X[x]=H*v,X[m]=J*_,X[p]=I,l.push(X.x,X.y,X.z),X[x]=0,X[m]=0,X[p]=E>0?1:-1,u.push(X.x,X.y,X.z),d.push(fe/A),d.push(1-q/P),ee+=1}}for(let q=0;q<P;q++)for(let J=0;J<A;J++){let fe=h+J+k*q,H=h+J+k*(q+1),$=h+(J+1)+k*(q+1),me=h+(J+1)+k*q;c.push(fe,H,me),c.push(H,$,me),N+=6}a.addGroup(f,N,y),f+=N,h+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ki(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function cn(i){let e={};for(let t=0;t<i.length;t++){let n=Ki(i[t]);for(let r in n)e[r]=n[r]}return e}function rm(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Sc(i){return i.getRenderTarget()===null?i.outputColorSpace:Ke.workingColorSpace}var om={clone:Ki,merge:cn};var sm=`
void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;var am=`
void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}
`;var ln=class extends It{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sm,this.fragmentShader=am,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ki(e.uniforms),this.uniformsGroups=rm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}};var Xo=class extends We{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new De,this.projectionMatrix=new De,this.projectionMatrixInverse=new De,this.coordinateSystem=yn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};var ht=class extends Xo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Gi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(fr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Gi*2*Math.atan(Math.tan(fr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,o,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(fr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,o=-.5*r,s=this.view;if(this.view!==null&&this.view.enabled){let c=s.fullWidth,l=s.fullHeight;o+=s.offsetX*r/c,t-=s.offsetY*n/l,r*=s.width/c,n*=s.height/l}let a=this.filmOffset;a!==0&&(o+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var qo=-90,Yo=1,Ac=class extends We{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new ht(qo,Yo,e,t);r.layers=this.layers,this.add(r);let o=new ht(qo,Yo,e,t);o.layers=this.layers,this.add(o);let s=new ht(qo,Yo,e,t);s.layers=this.layers,this.add(s);let a=new ht(qo,Yo,e,t);a.layers=this.layers,this.add(a);let c=new ht(qo,Yo,e,t);c.layers=this.layers,this.add(c);let l=new ht(qo,Yo,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,o,s,a,c]=t;for(let l of t)this.remove(l);if(e===yn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Xr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[o,s,a,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,o),e.setRenderTarget(n,1,r),e.render(t,s),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}};var jo=class extends pt{constructor(e,t,n,r,o,s,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:ni,super(e,t,n,r,o,s,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var wc=class extends En{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(mr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===oi?tt:Zt),this.texture=new jo(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Nt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Yn(5,5,5),o=new ln({name:"CubemapFromEquirect",uniforms:Ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Mt,blending:zn});o.uniforms.tEquirect.value=t;let s=new ke(r,o),a=t.minFilter;return t.minFilter===Gn&&(t.minFilter=Nt),new Ac(1,10,this).update(e,s),t.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,n,r){let o=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,r);e.setRenderTarget(o)}};var ld=new L,Gv=new L,Vv=new Fe,li=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=ld.subVectors(n,t).cross(Gv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(ld),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Vv.getNormalMatrix(e),r=this.coplanarPoint(ld).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}};var Kr=new At,Rc=new L,Tr=class{constructor(e=new li,t=new li,n=new li,r=new li,o=new li,s=new li){this.planes=[e,t,n,r,o,s]}set(e,t,n,r,o,s){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(o),a[5].copy(s),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=yn){let n=this.planes,r=e.elements,o=r[0],s=r[1],a=r[2],c=r[3],l=r[4],u=r[5],d=r[6],h=r[7],f=r[8],g=r[9],x=r[10],m=r[11],p=r[12],v=r[13],_=r[14],T=r[15];if(n[0].setComponents(c-o,h-l,m-f,T-p).normalize(),n[1].setComponents(c+o,h+l,m+f,T+p).normalize(),n[2].setComponents(c+s,h+u,m+g,T+v).normalize(),n[3].setComponents(c-s,h-u,m-g,T-v).normalize(),n[4].setComponents(c-a,h-d,m-x,T-_).normalize(),t===yn)n[5].setComponents(c+a,h+d,m+x,T+_).normalize();else if(t===Xr)n[5].setComponents(a,d,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kr)}intersectsSprite(e){return Kr.center.set(0,0,0),Kr.radius=.7071067811865476,Kr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Rc.x=r.normal.x>0?e.max.x:e.min.x,Rc.y=r.normal.y>0?e.max.y:e.min.y,Rc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Rc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Cc(){let i=null,e=!1,t=null,n=null;function r(o,s){t(o,s),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){i=o}}}function cm(i,e){let t=e.isWebGL2,n=new WeakMap;function r(l,u){let d=l.array,h=l.usage,f=d.byteLength,g=i.createBuffer();i.bindBuffer(u,g),i.bufferData(u,d,h),l.onUploadCallback();let x;if(d instanceof Float32Array)x=i.FLOAT;else if(d instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)x=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=i.UNSIGNED_SHORT;else if(d instanceof Int16Array)x=i.SHORT;else if(d instanceof Uint32Array)x=i.UNSIGNED_INT;else if(d instanceof Int32Array)x=i.INT;else if(d instanceof Int8Array)x=i.BYTE;else if(d instanceof Uint8Array)x=i.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)x=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:x,bytesPerElement:d.BYTES_PER_ELEMENT,version:l.version,size:f}}function o(l,u,d){let h=u.array,f=u._updateRange,g=u.updateRanges;if(i.bindBuffer(d,l),f.count===-1&&g.length===0&&i.bufferSubData(d,0,h),g.length!==0){for(let x=0,m=g.length;x<m;x++){let p=g[x];t?i.bufferSubData(d,p.start*h.BYTES_PER_ELEMENT,h,p.start,p.count):i.bufferSubData(d,p.start*h.BYTES_PER_ELEMENT,h.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}f.count!==-1&&(t?i.bufferSubData(d,f.offset*h.BYTES_PER_ELEMENT,h,f.offset,f.count):i.bufferSubData(d,f.offset*h.BYTES_PER_ELEMENT,h.subarray(f.offset,f.offset+f.count)),f.count=-1),u.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);u&&(i.deleteBuffer(u.buffer),n.delete(l))}function c(l,u){if(l.isGLBufferAttribute){let h=n.get(l);(!h||h.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let d=n.get(l);if(d===void 0)n.set(l,r(l,u));else if(d.version<l.version){if(d.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");o(d.buffer,l,u),d.version=l.version}}return{get:s,remove:a,update:c}}var $r=class i extends Ze{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let o=e/2,s=t/2,a=Math.floor(n),c=Math.floor(r),l=a+1,u=c+1,d=e/a,h=t/c,f=[],g=[],x=[],m=[];for(let p=0;p<u;p++){let v=p*h-s;for(let _=0;_<l;_++){let T=_*d-o;g.push(T,-v,0),x.push(0,0,1),m.push(_/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){let _=v+l*p,T=v+l*(p+1),w=v+1+l*(p+1),E=v+1+l*p;f.push(_,T,E),f.push(T,w,E)}this.setIndex(f),this.setAttribute("position",new $e(g,3)),this.setAttribute("normal",new $e(x,3)),this.setAttribute("uv",new $e(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var lm=`
#ifdef USE_ALPHAHASH

	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;

#endif
`;var um=`
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
`;var dm=`
#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;

#endif
`;var hm=`
#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`;var fm=`
#ifdef USE_ALPHATEST

	if ( diffuseColor.a < alphaTest ) discard;

#endif
`;var pm=`
#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif
`;var mm=`
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
`;var gm=`
#ifdef USE_AOMAP

	uniform sampler2D aoMap;
	uniform float aoMapIntensity;

#endif
`;var xm=`
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
`;var _m=`
#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif
`;var ym=`
vec3 transformed = vec3( position );

#ifdef USE_ALPHAHASH

	vPosition = vec3( position );

#endif
`;var vm=`
vec3 objectNormal = vec3( normal );

#ifdef USE_TANGENT

	vec3 objectTangent = vec3( tangent.xyz );

#endif
`;var Em=`

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

`;var Mm=`

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

`;var bm=`
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
`;var Tm=`
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
`;var Sm=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif
`;var Am=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

#endif
`;var wm=`
#if NUM_CLIPPING_PLANES > 0

	vClipPosition = - mvPosition.xyz;

#endif
`;var Rm=`
#if defined( USE_COLOR_ALPHA )

	diffuseColor *= vColor;

#elif defined( USE_COLOR )

	diffuseColor.rgb *= vColor;

#endif
`;var Cm=`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR )

	varying vec3 vColor;

#endif
`;var Lm=`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )

	varying vec3 vColor;

#endif
`;var Pm=`
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
`;var Im=`
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
`;var Dm=`
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
`;var Um=`

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
`;var Nm=`
#ifdef USE_DISPLACEMENTMAP

	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;

#endif
`;var Bm=`
#ifdef USE_DISPLACEMENTMAP

	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );

#endif
`;var Fm=`
#ifdef USE_EMISSIVEMAP

	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );

	totalEmissiveRadiance *= emissiveColor.rgb;

#endif
`;var Om=`
#ifdef USE_EMISSIVEMAP

	uniform sampler2D emissiveMap;

#endif
`;var Hm=`
gl_FragColor = linearToOutputTexel( gl_FragColor );
`;var zm=`

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
`;var km=`
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
`;var Gm=`
#ifdef USE_ENVMAP

	uniform float envMapIntensity;
	uniform float flipEnvMap;

	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif
`;var Vm=`
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
`;var Wm=`
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
`;var Xm=`
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
`;var qm=`
#ifdef USE_FOG

	vFogDepth = - mvPosition.z;

#endif
`;var Ym=`
#ifdef USE_FOG

	varying float vFogDepth;

#endif
`;var jm=`
#ifdef USE_FOG

	#ifdef FOG_EXP2

		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );

	#else

		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );

	#endif

	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

#endif
`;var Km=`
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
`;var $m=`

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
`;var Zm=`
#ifdef USE_LIGHTMAP

	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;

	reflectedLight.indirectDiffuse += lightMapIrradiance;

#endif
`;var Jm=`
#ifdef USE_LIGHTMAP

	uniform sampler2D lightMap;
	uniform float lightMapIntensity;

#endif
`;var Qm=`
LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;
`;var eg=`
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
`;var tg=`
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
`;var ng=`
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
`;var ig=`
ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;
`;var rg=`
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
`;var og=`
BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;
`;var sg=`
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
`;var ag=`
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
`;var cg=`

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
`;var lg=`
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
`;var ug=`
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
`;var dg=`
#if defined( RE_IndirectDiffuse )

	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif

#if defined( RE_IndirectSpecular )

	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif
`;var hg=`
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	// Doing a strict comparison with == 1.0 can cause noise artifacts
	// on some platforms. See issue #17623.
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;

#endif
`;var fg=`
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`;var pg=`
#ifdef USE_LOGDEPTHBUF

	#ifdef USE_LOGDEPTHBUF_EXT

		varying float vFragDepth;
		varying float vIsPerspective;

	#else

		uniform float logDepthBufFC;

	#endif

#endif
`;var mg=`
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
`;var gg=`
#ifdef USE_MAP

	vec4 sampledDiffuseColor = texture2D( map, vMapUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// use inline sRGB decode until browsers properly support SRGB8_APLHA8 with video textures

		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif

	diffuseColor *= sampledDiffuseColor;

#endif
`;var xg=`
#ifdef USE_MAP

	uniform sampler2D map;

#endif
`;var _g=`
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
`;var yg=`
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
`;var vg=`
float metalnessFactor = metalness;

#ifdef USE_METALNESSMAP

	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );

	// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	metalnessFactor *= texelMetalness.b;

#endif
`;var Eg=`
#ifdef USE_METALNESSMAP

	uniform sampler2D metalnessMap;

#endif
`;var Mg=`
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
`;var bg=`
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
`;var Tg=`
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
`;var Sg=`
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
`;var Ag=`
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

`;var wg=`

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
`;var Rg=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`;var Cg=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`;var Lg=`
#ifndef FLAT_SHADED // normal is computed with derivatives when FLAT_SHADED

	vNormal = normalize( transformedNormal );

	#ifdef USE_TANGENT

		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );

	#endif

#endif
`;var Pg=`
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
`;var Ig=`
#ifdef USE_CLEARCOAT

	vec3 clearcoatNormal = nonPerturbedNormal;

#endif
`;var Dg=`
#ifdef USE_CLEARCOAT_NORMALMAP

	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;

	clearcoatNormal = normalize( tbn2 * clearcoatMapN );

#endif
`;var Ug=`

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
`;var Ng=`

#ifdef USE_IRIDESCENCEMAP

	uniform sampler2D iridescenceMap;

#endif

#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform sampler2D iridescenceThicknessMap;

#endif
`;var Bg=`
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif

gl_FragColor = vec4( outgoingLight, diffuseColor.a );
`;var Fg=`
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
`;var Og=`
#ifdef PREMULTIPLIED_ALPHA

	// Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.
	gl_FragColor.rgb *= gl_FragColor.a;

#endif
`;var Hg=`
vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_BATCHING

	mvPosition = batchingMatrix * mvPosition;

#endif

#ifdef USE_INSTANCING

	mvPosition = instanceMatrix * mvPosition;

#endif

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;
`;var zg=`
#ifdef DITHERING

	gl_FragColor.rgb = dithering( gl_FragColor.rgb );

#endif
`;var kg=`
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
`;var Gg=`
float roughnessFactor = roughness;

#ifdef USE_ROUGHNESSMAP

	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );

	// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	roughnessFactor *= texelRoughness.g;

#endif
`;var Vg=`
#ifdef USE_ROUGHNESSMAP

	uniform sampler2D roughnessMap;

#endif
`;var Wg=`
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
`;var Xg=`

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
`;var qg=`

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


`;var Yg=`
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
`;var jg=`
#ifdef USE_SKINNING

	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );

#endif
`;var Kg=`
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
`;var $g=`
#ifdef USE_SKINNING

	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );

	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;

	transformed = ( bindMatrixInverse * skinned ).xyz;

#endif
`;var Zg=`
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
`;var Jg=`
float specularStrength;

#ifdef USE_SPECULARMAP

	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;

#else

	specularStrength = 1.0;

#endif
`;var Qg=`
#ifdef USE_SPECULARMAP

	uniform sampler2D specularMap;

#endif
`;var e0=`
#if defined( TONE_MAPPING )

	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );

#endif
`;var t0=`
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
`;var n0=`
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
`;var i0=`
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
`;var r0=`
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
`;var o0=`
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
`;var s0=`
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
`;var a0=`
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
`;var c0=`
varying vec2 vUv;
uniform mat3 uvTransform;

void main() {

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	gl_Position = vec4( position.xy, 1.0, 1.0 );

}
`,l0=`
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
`;var u0=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,d0=`

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
`;var h0=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,f0=`
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
`;var p0=`
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
`,m0=`
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
`;var g0=`
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
`,x0=`
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
`;var _0=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

}
`,y0=`
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
`;var v0=`
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
`,E0=`
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
`;var M0=`
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
`,b0=`
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
`;var T0=`
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
`,S0=`
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
`;var A0=`
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
`,w0=`
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
`;var R0=`
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
`,C0=`
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
`;var L0=`
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
`,P0=`
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
`;var I0=`
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
`,D0=`
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
`;var U0=`
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
`,N0=`
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
`;var B0=`
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
`,F0=`
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
`;var O0=`
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
`,H0=`
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
`;var z0=`
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
`,k0=`
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
`;var Xe={alphahash_fragment:lm,alphahash_pars_fragment:um,alphamap_fragment:dm,alphamap_pars_fragment:hm,alphatest_fragment:fm,alphatest_pars_fragment:pm,aomap_fragment:mm,aomap_pars_fragment:gm,batching_pars_vertex:xm,batching_vertex:_m,begin_vertex:ym,beginnormal_vertex:vm,bsdfs:Em,iridescence_fragment:Mm,bumpmap_pars_fragment:bm,clipping_planes_fragment:Tm,clipping_planes_pars_fragment:Sm,clipping_planes_pars_vertex:Am,clipping_planes_vertex:wm,color_fragment:Rm,color_pars_fragment:Cm,color_pars_vertex:Lm,color_vertex:Pm,common:Im,cube_uv_reflection_fragment:Dm,defaultnormal_vertex:Um,displacementmap_pars_vertex:Nm,displacementmap_vertex:Bm,emissivemap_fragment:Fm,emissivemap_pars_fragment:Om,colorspace_fragment:Hm,colorspace_pars_fragment:zm,envmap_fragment:km,envmap_common_pars_fragment:Gm,envmap_pars_fragment:Vm,envmap_pars_vertex:Wm,envmap_physical_pars_fragment:ng,envmap_vertex:Xm,fog_vertex:qm,fog_pars_vertex:Ym,fog_fragment:jm,fog_pars_fragment:Km,gradientmap_pars_fragment:$m,lightmap_fragment:Zm,lightmap_pars_fragment:Jm,lights_lambert_fragment:Qm,lights_lambert_pars_fragment:eg,lights_pars_begin:tg,lights_toon_fragment:ig,lights_toon_pars_fragment:rg,lights_phong_fragment:og,lights_phong_pars_fragment:sg,lights_physical_fragment:ag,lights_physical_pars_fragment:cg,lights_fragment_begin:lg,lights_fragment_maps:ug,lights_fragment_end:dg,logdepthbuf_fragment:hg,logdepthbuf_pars_fragment:fg,logdepthbuf_pars_vertex:pg,logdepthbuf_vertex:mg,map_fragment:gg,map_pars_fragment:xg,map_particle_fragment:_g,map_particle_pars_fragment:yg,metalnessmap_fragment:vg,metalnessmap_pars_fragment:Eg,morphcolor_vertex:Mg,morphnormal_vertex:bg,morphtarget_pars_vertex:Tg,morphtarget_vertex:Sg,normal_fragment_begin:Ag,normal_fragment_maps:wg,normal_pars_fragment:Rg,normal_pars_vertex:Cg,normal_vertex:Lg,normalmap_pars_fragment:Pg,clearcoat_normal_fragment_begin:Ig,clearcoat_normal_fragment_maps:Dg,clearcoat_pars_fragment:Ug,iridescence_pars_fragment:Ng,opaque_fragment:Bg,packing:Fg,premultiplied_alpha_fragment:Og,project_vertex:Hg,dithering_fragment:zg,dithering_pars_fragment:kg,roughnessmap_fragment:Gg,roughnessmap_pars_fragment:Vg,shadowmap_pars_fragment:Wg,shadowmap_pars_vertex:Xg,shadowmap_vertex:qg,shadowmask_pars_fragment:Yg,skinbase_vertex:jg,skinning_pars_vertex:Kg,skinning_vertex:$g,skinnormal_vertex:Zg,specularmap_fragment:Jg,specularmap_pars_fragment:Qg,tonemapping_fragment:e0,tonemapping_pars_fragment:t0,transmission_fragment:n0,transmission_pars_fragment:i0,uv_pars_fragment:r0,uv_pars_vertex:o0,uv_vertex:s0,worldpos_vertex:a0,background_vert:c0,background_frag:l0,backgroundCube_vert:u0,backgroundCube_frag:d0,cube_vert:h0,cube_frag:f0,depth_vert:p0,depth_frag:m0,distanceRGBA_vert:g0,distanceRGBA_frag:x0,equirect_vert:_0,equirect_frag:y0,linedashed_vert:v0,linedashed_frag:E0,meshbasic_vert:M0,meshbasic_frag:b0,meshlambert_vert:T0,meshlambert_frag:S0,meshmatcap_vert:A0,meshmatcap_frag:w0,meshnormal_vert:R0,meshnormal_frag:C0,meshphong_vert:L0,meshphong_frag:P0,meshphysical_vert:I0,meshphysical_frag:D0,meshtoon_vert:U0,meshtoon_frag:N0,points_vert:B0,points_frag:F0,shadow_vert:O0,shadow_frag:H0,sprite_vert:z0,sprite_frag:k0};var be={common:{diffuse:{value:new ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new Ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new ge(16777215)},opacity:{value:1},center:{value:new Ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}};var jn={basic:{uniforms:cn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:cn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new ge(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:cn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new ge(0)},specular:{value:new ge(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:cn([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:cn([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new ge(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:cn([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:cn([be.points,be.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:cn([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:cn([be.common,be.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:cn([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:cn([be.sprite,be.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:cn([be.common,be.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:cn([be.lights,be.fog,{color:{value:new ge(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};jn.physical={uniforms:cn([jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new Ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new Ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new ge(0)},specularColor:{value:new ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new Ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};var Lc={r:0,b:0,g:0};function G0(i,e,t,n,r,o,s){let a=new ge(0),c=o===!0?0:1,l,u,d=null,h=0,f=null;function g(m,p){let v=!1,_=p.isScene===!0?p.background:null;_&&_.isTexture&&(_=(p.backgroundBlurriness>0?t:e).get(_)),_===null?x(a,c):_&&_.isColor&&(x(_,1),v=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(i.autoClear||v)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),_&&(_.isCubeTexture||_.mapping===hr)?(u===void 0&&(u=new ke(new Yn(1,1,1),new ln({name:"BackgroundCubeMaterial",uniforms:Ki(jn.backgroundCube.uniforms),vertexShader:jn.backgroundCube.vertexShader,fragmentShader:jn.backgroundCube.fragmentShader,side:Mt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=Ke.getTransfer(_.colorSpace)!==at,(d!==_||h!==_.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,d=_,h=_.version,f=i.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new ke(new $r(2,2),new ln({name:"BackgroundMaterial",uniforms:Ki(jn.background.uniforms),vertexShader:jn.background.vertexShader,fragmentShader:jn.background.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=Ke.getTransfer(_.colorSpace)!==at,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||h!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,d=_,h=_.version,f=i.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function x(m,p){m.getRGB(Lc,Sc(i)),n.buffers.color.setClear(Lc.r,Lc.g,Lc.b,p,s)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),c=p,x(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,x(a,c)},render:g}}function V0(i,e,t,n){let r=i.getParameter(i.MAX_VERTEX_ATTRIBS),o=n.isWebGL2?null:e.get("OES_vertex_array_object"),s=n.isWebGL2||o!==null,a={},c=m(null),l=c,u=!1;function d(I,k,G,ee,N){let X=!1;if(s){let q=x(ee,G,k);l!==q&&(l=q,f(l.object)),X=p(I,ee,G,N),X&&v(I,ee,G,N)}else{let q=k.wireframe===!0;(l.geometry!==ee.id||l.program!==G.id||l.wireframe!==q)&&(l.geometry=ee.id,l.program=G.id,l.wireframe=q,X=!0)}N!==null&&t.update(N,i.ELEMENT_ARRAY_BUFFER),(X||u)&&(u=!1,P(I,k,G,ee),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function h(){return n.isWebGL2?i.createVertexArray():o.createVertexArrayOES()}function f(I){return n.isWebGL2?i.bindVertexArray(I):o.bindVertexArrayOES(I)}function g(I){return n.isWebGL2?i.deleteVertexArray(I):o.deleteVertexArrayOES(I)}function x(I,k,G){let ee=G.wireframe===!0,N=a[I.id];N===void 0&&(N={},a[I.id]=N);let X=N[k.id];X===void 0&&(X={},N[k.id]=X);let q=X[ee];return q===void 0&&(q=m(h()),X[ee]=q),q}function m(I){let k=[],G=[],ee=[];for(let N=0;N<r;N++)k[N]=0,G[N]=0,ee[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:G,attributeDivisors:ee,object:I,attributes:{},index:null}}function p(I,k,G,ee){let N=l.attributes,X=k.attributes,q=0,J=G.getAttributes();for(let fe in J)if(J[fe].location>=0){let $=N[fe],me=X[fe];if(me===void 0&&(fe==="instanceMatrix"&&I.instanceMatrix&&(me=I.instanceMatrix),fe==="instanceColor"&&I.instanceColor&&(me=I.instanceColor)),$===void 0||$.attribute!==me||me&&$.data!==me.data)return!0;q++}return l.attributesNum!==q||l.index!==ee}function v(I,k,G,ee){let N={},X=k.attributes,q=0,J=G.getAttributes();for(let fe in J)if(J[fe].location>=0){let $=X[fe];$===void 0&&(fe==="instanceMatrix"&&I.instanceMatrix&&($=I.instanceMatrix),fe==="instanceColor"&&I.instanceColor&&($=I.instanceColor));let me={};me.attribute=$,$&&$.data&&(me.data=$.data),N[fe]=me,q++}l.attributes=N,l.attributesNum=q,l.index=ee}function _(){let I=l.newAttributes;for(let k=0,G=I.length;k<G;k++)I[k]=0}function T(I){w(I,0)}function w(I,k){let G=l.newAttributes,ee=l.enabledAttributes,N=l.attributeDivisors;G[I]=1,ee[I]===0&&(i.enableVertexAttribArray(I),ee[I]=1),N[I]!==k&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,k),N[I]=k)}function E(){let I=l.newAttributes,k=l.enabledAttributes;for(let G=0,ee=k.length;G<ee;G++)k[G]!==I[G]&&(i.disableVertexAttribArray(G),k[G]=0)}function A(I,k,G,ee,N,X,q){q===!0?i.vertexAttribIPointer(I,k,G,N,X):i.vertexAttribPointer(I,k,G,ee,N,X)}function P(I,k,G,ee){if(n.isWebGL2===!1&&(I.isInstancedMesh||ee.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();let N=ee.attributes,X=G.getAttributes(),q=k.defaultAttributeValues;for(let J in X){let fe=X[J];if(fe.location>=0){let H=N[J];if(H===void 0&&(J==="instanceMatrix"&&I.instanceMatrix&&(H=I.instanceMatrix),J==="instanceColor"&&I.instanceColor&&(H=I.instanceColor)),H!==void 0){let $=H.normalized,me=H.itemSize,Y=t.get(H);if(Y===void 0)continue;let W=Y.buffer,Q=Y.type,ce=Y.bytesPerElement,pe=n.isWebGL2===!0&&(Q===i.INT||Q===i.UNSIGNED_INT||H.gpuType===Oa);if(H.isInterleavedBufferAttribute){let K=H.data,S=K.stride,Z=H.offset;if(K.isInstancedInterleavedBuffer){for(let U=0;U<fe.locationSize;U++)w(fe.location+U,K.meshPerAttribute);I.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let U=0;U<fe.locationSize;U++)T(fe.location+U);i.bindBuffer(i.ARRAY_BUFFER,W);for(let U=0;U<fe.locationSize;U++)A(fe.location+U,me/fe.locationSize,Q,$,S*ce,(Z+me/fe.locationSize*U)*ce,pe)}else{if(H.isInstancedBufferAttribute){for(let K=0;K<fe.locationSize;K++)w(fe.location+K,H.meshPerAttribute);I.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let K=0;K<fe.locationSize;K++)T(fe.location+K);i.bindBuffer(i.ARRAY_BUFFER,W);for(let K=0;K<fe.locationSize;K++)A(fe.location+K,me/fe.locationSize,Q,$,me*ce,me/fe.locationSize*K*ce,pe)}}else if(q!==void 0){let $=q[J];if($!==void 0)switch($.length){case 2:i.vertexAttrib2fv(fe.location,$);break;case 3:i.vertexAttrib3fv(fe.location,$);break;case 4:i.vertexAttrib4fv(fe.location,$);break;default:i.vertexAttrib1fv(fe.location,$)}}}}E()}function y(){V();for(let I in a){let k=a[I];for(let G in k){let ee=k[G];for(let N in ee)g(ee[N].object),delete ee[N];delete k[G]}delete a[I]}}function M(I){if(a[I.id]===void 0)return;let k=a[I.id];for(let G in k){let ee=k[G];for(let N in ee)g(ee[N].object),delete ee[N];delete k[G]}delete a[I.id]}function D(I){for(let k in a){let G=a[k];if(G[I.id]===void 0)continue;let ee=G[I.id];for(let N in ee)g(ee[N].object),delete ee[N];delete G[I.id]}}function V(){te(),u=!0,l!==c&&(l=c,f(l.object))}function te(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:d,reset:V,resetDefaultState:te,dispose:y,releaseStatesOfGeometry:M,releaseStatesOfProgram:D,initAttributes:_,enableAttribute:T,disableUnusedAttributes:E}}function W0(i,e,t,n){let r=n.isWebGL2,o;function s(u){o=u}function a(u,d){i.drawArrays(o,u,d),t.update(d,o,1)}function c(u,d,h){if(h===0)return;let f,g;if(r)f=i,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](o,u,d,h),t.update(d,o,h)}function l(u,d,h){if(h===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<h;g++)this.render(u[g],d[g]);else{f.multiDrawArraysWEBGL(o,u,0,d,0,h);let g=0;for(let x=0;x<h;x++)g+=d[x];t.update(g,o,1)}}this.setMode=s,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function X0(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let s=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",a=t.precision!==void 0?t.precision:"highp",c=o(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);let l=s||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),h=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),x=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),p=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),_=h>0,T=s||e.has("OES_texture_float"),w=_&&T,E=s?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:s,drawBuffers:l,getMaxAnisotropy:r,getMaxPrecision:o,precision:a,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:h,maxTextureSize:f,maxCubemapSize:g,maxAttributes:x,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:v,vertexTextures:_,floatFragmentTextures:T,floatVertexTextures:w,maxSamples:E}}function q0(i){let e=this,t=null,n=0,r=!1,o=!1,s=new li,a=new Fe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||n!==0||r;return r=h,n=d.length,f},this.beginShadows=function(){o=!0,u(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!r||g===null||g.length===0||o&&!m)o?u(null):l();else{let v=o?0:n,_=v*4,T=p.clippingState||null;c.value=T,T=u(g,h,_,f);for(let w=0;w!==_;++w)T[w]=t[w];p.clippingState=T,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let p=f+x*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,T=f;_!==x;++_,T+=4)s.copy(d[_]).applyMatrix4(v,a),s.normal.toArray(m,T),m[T+3]=s.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Y0(i){let e=new WeakMap;function t(s,a){return a===Fs?s.mapping=ni:a===Os&&(s.mapping=Ei),s}function n(s){if(s&&s.isTexture){let a=s.mapping;if(a===Fs||a===Os)if(e.has(s)){let c=e.get(s).texture;return t(c,s.mapping)}else{let c=s.image;if(c&&c.height>0){let l=new wc(c.height/2);return l.fromEquirectangularTexture(i,s),e.set(s,l),s.addEventListener("dispose",r),t(l.texture,s.mapping)}else return null}}return s}function r(s){let a=s.target;a.removeEventListener("dispose",r);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}var $i=class extends Xo{constructor(e=-1,t=1,n=1,r=-1,o=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=o,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,o,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,o=n-e,s=n+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,s=o+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(o,s,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var $o=4,j0=[.125,.215,.35,.446,.526,.582],Jr=20,ud=new $i,K0=new ge,dd=null,hd=0,fd=0,Zr=(1+Math.sqrt(5))/2,Ko=1/Zr,$0=[new L(1,1,1),new L(-1,1,1),new L(1,1,-1),new L(-1,1,-1),new L(0,Zr,Ko),new L(0,Zr,-Ko),new L(Ko,0,Zr),new L(-Ko,0,Zr),new L(Zr,Ko,0),new L(-Zr,Ko,0)],Sr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){dd=this._renderer.getRenderTarget(),hd=this._renderer.getActiveCubeFace(),fd=this._renderer.getActiveMipmapLevel(),this._setSize(256);let o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,r,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Q0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=J0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(dd,hd,fd),e.scissorTest=!1,Pc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ni||e.mapping===Ei?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),dd=this._renderer.getRenderTarget(),hd=this._renderer.getActiveCubeFace(),fd=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Nt,minFilter:Nt,generateMipmaps:!1,type:Hi,format:Ht,colorSpace:ft,depthBuffer:!1},r=Z0(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Z0(e,t,n);let{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=aE(o)),this._blurMaterial=cE(o,e,t)}return r}_compileMaterial(e){let t=new ke(this._lodPlanes[0],e);this._renderer.compile(t,ud)}_sceneToCubeUV(e,t,n,r){let a=new ht(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(K0),u.toneMapping=kn,u.autoClear=!1;let f=new Dt({name:"PMREM.Background",side:Mt,depthWrite:!1,depthTest:!1}),g=new ke(new Yn,f),x=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,x=!0):(f.color.copy(K0),x=!0);for(let p=0;p<6;p++){let v=p%3;v===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):v===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let _=this._cubeSize;Pc(r,v*_,p>2?_:0,_,_),u.setRenderTarget(r),x&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===ni||e.mapping===Ei;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Q0()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=J0());let o=r?this._cubemapMaterial:this._equirectMaterial,s=new ke(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=e;let c=this._cubeSize;Pc(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(s,ud)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),s=$0[(r-1)%$0.length];this._blur(e,r-1,r,o,s)}t.autoClear=n}_blur(e,t,n,r,o){let s=this._pingPongRenderTarget;this._halfBlur(e,s,t,n,r,"latitudinal",o),this._halfBlur(s,e,n,n,r,"longitudinal",o)}_halfBlur(e,t,n,r,o,s,a){let c=this._renderer,l=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new ke(this._lodPlanes[r],l),h=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(o)?Math.PI/(2*f):2*Math.PI/(2*Jr-1),x=o/g,m=isFinite(o)?1+Math.floor(u*x):Jr;m>Jr&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Jr}`);let p=[],v=0;for(let A=0;A<Jr;++A){let P=A/x,y=Math.exp(-P*P/2);p.push(y),A===0?v+=y:A<m&&(v+=2*y)}for(let A=0;A<p.length;A++)p[A]=p[A]/v;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=s==="latitudinal",a&&(h.poleAxis.value=a);let{_lodMax:_}=this;h.dTheta.value=g,h.mipInt.value=_-n;let T=this._sizeLods[r],w=3*T*(r>_-$o?r-_+$o:0),E=4*(this._cubeSize-T);Pc(t,w,E,3*T,2*T),c.setRenderTarget(t),c.render(d,ud)}};function aE(i){let e=[],t=[],n=[],r=i,o=i-$o+1+j0.length;for(let s=0;s<o;s++){let a=Math.pow(2,r);t.push(a);let c=1/a;s>i-$o?c=j0[s-i+$o-1]:s===0&&(c=0),n.push(c);let l=1/(a-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,x=3,m=2,p=1,v=new Float32Array(x*g*f),_=new Float32Array(m*g*f),T=new Float32Array(p*g*f);for(let E=0;E<f;E++){let A=E%3*2/3-1,P=E>2?0:-1,y=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];v.set(y,x*g*E),_.set(h,m*g*E);let M=[E,E,E,E,E,E];T.set(M,p*g*E)}let w=new Ze;w.setAttribute("position",new Ye(v,x)),w.setAttribute("uv",new Ye(_,m)),w.setAttribute("faceIndex",new Ye(T,p)),e.push(w),r>$o&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Z0(i,e,t){let n=new En(i,e,t);return n.texture.mapping=hr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Pc(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function cE(i,e,t){let n=new Float32Array(Jr),r=new L(0,1,0);return new ln({name:"SphericalGaussianBlur",defines:{n:Jr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:pd(),fragmentShader:`

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
		`,blending:zn,depthTest:!1,depthWrite:!1})}function J0(){return new ln({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pd(),fragmentShader:`

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
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Q0(){return new ln({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function pd(){return`

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
	`}function ex(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Fs||c===Os,u=c===ni||c===Ei;if(l||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=e.get(a);return t===null&&(t=new Sr(i)),d=l?t.fromEquirectangular(a,d):t.fromCubemap(a,d),e.set(a,d),d.texture}else{if(e.has(a))return e.get(a).texture;{let d=a.image;if(l&&d&&d.height>0||u&&d&&r(d)){t===null&&(t=new Sr(i));let h=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",o),h.texture}else return null}}}return a}function r(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function o(a){let c=a.target;c.removeEventListener("dispose",o);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:s}}function tx(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function nx(i,e,t,n){let r={},o=new WeakMap;function s(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let g in h.attributes)e.remove(h.attributes[g]);for(let g in h.morphAttributes){let x=h.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)e.remove(x[m])}h.removeEventListener("dispose",s),delete r[h.id];let f=o.get(h);f&&(e.remove(f),o.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return r[h.id]===!0||(h.addEventListener("dispose",s),r[h.id]=!0,t.memory.geometries++),h}function c(d){let h=d.attributes;for(let g in h)e.update(h[g],i.ARRAY_BUFFER);let f=d.morphAttributes;for(let g in f){let x=f[g];for(let m=0,p=x.length;m<p;m++)e.update(x[m],i.ARRAY_BUFFER)}}function l(d){let h=[],f=d.index,g=d.attributes.position,x=0;if(f!==null){let v=f.array;x=f.version;for(let _=0,T=v.length;_<T;_+=3){let w=v[_+0],E=v[_+1],A=v[_+2];h.push(w,E,E,A,A,w)}}else if(g!==void 0){let v=g.array;x=g.version;for(let _=0,T=v.length/3-1;_<T;_+=3){let w=_+0,E=_+1,A=_+2;h.push(w,E,E,A,A,w)}}else return;let m=new(nc(h)?zo:Ho)(h,1);m.version=x;let p=o.get(d);p&&e.remove(p),o.set(d,m)}function u(d){let h=o.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&l(d)}else l(d);return o.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function ix(i,e,t,n){let r=n.isWebGL2,o;function s(f){o=f}let a,c;function l(f){a=f.type,c=f.bytesPerElement}function u(f,g){i.drawElements(o,g,a,f*c),t.update(g,o,1)}function d(f,g,x){if(x===0)return;let m,p;if(r)m=i,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](o,g,a,f*c,x),t.update(g,o,x)}function h(f,g,x){if(x===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<x;p++)this.render(f[p]/c,g[p]);else{m.multiDrawElementsWEBGL(o,g,0,a,f,0,x);let p=0;for(let v=0;v<x;v++)p+=g[v];t.update(p,o,1)}}this.setMode=s,this.setIndex=l,this.render=u,this.renderInstances=d,this.renderMultiDraw=h}function rx(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,s,a){switch(t.calls++,s){case i.TRIANGLES:t.triangles+=a*(o/3);break;case i.LINES:t.lines+=a*(o/2);break;case i.LINE_STRIP:t.lines+=a*(o-1);break;case i.LINE_LOOP:t.lines+=a*o;break;case i.POINTS:t.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function lE(i,e){return i[0]-e[0]}function uE(i,e){return Math.abs(e[1])-Math.abs(i[1])}function ox(i,e,t){let n={},r=new Float32Array(8),o=new WeakMap,s=new it,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,u,d){let h=l.morphTargetInfluences;if(e.isWebGL2===!0){let f=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=f!==void 0?f.length:0,x=o.get(u);if(x===void 0||x.count!==g){let I=function(){V.dispose(),o.delete(u),u.removeEventListener("dispose",I)};x!==void 0&&x.texture.dispose();let v=u.morphAttributes.position!==void 0,_=u.morphAttributes.normal!==void 0,T=u.morphAttributes.color!==void 0,w=u.morphAttributes.position||[],E=u.morphAttributes.normal||[],A=u.morphAttributes.color||[],P=0;v===!0&&(P=1),_===!0&&(P=2),T===!0&&(P=3);let y=u.attributes.position.count*P,M=1;y>e.maxTextureSize&&(M=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let D=new Float32Array(y*M*4*g),V=new Po(D,y,M,g);V.type=fn,V.needsUpdate=!0;let te=P*4;for(let k=0;k<g;k++){let G=w[k],ee=E[k],N=A[k],X=y*M*4*k;for(let q=0;q<G.count;q++){let J=q*te;v===!0&&(s.fromBufferAttribute(G,q),D[X+J+0]=s.x,D[X+J+1]=s.y,D[X+J+2]=s.z,D[X+J+3]=0),_===!0&&(s.fromBufferAttribute(ee,q),D[X+J+4]=s.x,D[X+J+5]=s.y,D[X+J+6]=s.z,D[X+J+7]=0),T===!0&&(s.fromBufferAttribute(N,q),D[X+J+8]=s.x,D[X+J+9]=s.y,D[X+J+10]=s.z,D[X+J+11]=N.itemSize===4?s.w:1)}}x={count:g,texture:V,size:new Ie(y,M)},o.set(u,x),u.addEventListener("dispose",I)}let m=0;for(let v=0;v<h.length;v++)m+=h[v];let p=u.morphTargetsRelative?1:1-m;d.getUniforms().setValue(i,"morphTargetBaseInfluence",p),d.getUniforms().setValue(i,"morphTargetInfluences",h),d.getUniforms().setValue(i,"morphTargetsTexture",x.texture,t),d.getUniforms().setValue(i,"morphTargetsTextureSize",x.size)}else{let f=h===void 0?0:h.length,g=n[u.id];if(g===void 0||g.length!==f){g=[];for(let _=0;_<f;_++)g[_]=[_,0];n[u.id]=g}for(let _=0;_<f;_++){let T=g[_];T[0]=_,T[1]=h[_]}g.sort(uE);for(let _=0;_<8;_++)_<f&&g[_][1]?(a[_][0]=g[_][0],a[_][1]=g[_][1]):(a[_][0]=Number.MAX_SAFE_INTEGER,a[_][1]=0);a.sort(lE);let x=u.morphAttributes.position,m=u.morphAttributes.normal,p=0;for(let _=0;_<8;_++){let T=a[_],w=T[0],E=T[1];w!==Number.MAX_SAFE_INTEGER&&E?(x&&u.getAttribute("morphTarget"+_)!==x[w]&&u.setAttribute("morphTarget"+_,x[w]),m&&u.getAttribute("morphNormal"+_)!==m[w]&&u.setAttribute("morphNormal"+_,m[w]),r[_]=E,p+=E):(x&&u.hasAttribute("morphTarget"+_)===!0&&u.deleteAttribute("morphTarget"+_),m&&u.hasAttribute("morphNormal"+_)===!0&&u.deleteAttribute("morphNormal"+_),r[_]=0)}let v=u.morphTargetsRelative?1:1-p;d.getUniforms().setValue(i,"morphTargetBaseInfluence",v),d.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:c}}function sx(i,e,t,n){let r=new WeakMap;function o(c){let l=n.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==l&&(e.update(d),r.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){let h=c.skeleton;r.get(h)!==l&&(h.update(),r.set(h,l))}return d}function s(){r=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:o,dispose:s}}var Zo=class extends pt{constructor(e,t,n,r,o,s,a,c,l,u){if(u=u!==void 0?u:ri,u!==ri&&u!==Mi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===ri&&(n=Pn),n===void 0&&u===Mi&&(n=Vn),super(null,r,o,s,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:bt,this.minFilter=c!==void 0?c:bt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}};var fx=new pt,px=new Zo(1,1);px.compareFunction=Qa;var mx=new Po,gx=new sc,xx=new jo,ax=[],cx=[],lx=new Float32Array(16),ux=new Float32Array(9),dx=new Float32Array(4);function Jo(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,o=ax[r];if(o===void 0&&(o=new Float32Array(r),ax[r]=o),e!==0){n.toArray(o,0);for(let s=1,a=0;s!==e;++s)a+=t,i[s].toArray(o,a)}return o}function kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ic(i,e){let t=cx[e];t===void 0&&(t=new Int32Array(e),cx[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function dE(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function hE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2fv(this.addr,e),Gt(t,e)}}function fE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;i.uniform3fv(this.addr,e),Gt(t,e)}}function pE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4fv(this.addr,e),Gt(t,e)}}function mE(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(kt(t,n))return;dx.set(n),i.uniformMatrix2fv(this.addr,!1,dx),Gt(t,n)}}function gE(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(kt(t,n))return;ux.set(n),i.uniformMatrix3fv(this.addr,!1,ux),Gt(t,n)}}function xE(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(kt(t,n))return;lx.set(n),i.uniformMatrix4fv(this.addr,!1,lx),Gt(t,n)}}function _E(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function yE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2iv(this.addr,e),Gt(t,e)}}function vE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3iv(this.addr,e),Gt(t,e)}}function EE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4iv(this.addr,e),Gt(t,e)}}function ME(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function bE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2uiv(this.addr,e),Gt(t,e)}}function TE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3uiv(this.addr,e),Gt(t,e)}}function SE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4uiv(this.addr,e),Gt(t,e)}}function AE(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let o=this.type===i.SAMPLER_2D_SHADOW?px:fx;t.setTexture2D(e||o,r)}function wE(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||gx,r)}function RE(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||xx,r)}function CE(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||mx,r)}function LE(i){switch(i){case 5126:return dE;case 35664:return hE;case 35665:return fE;case 35666:return pE;case 35674:return mE;case 35675:return gE;case 35676:return xE;case 5124:case 35670:return _E;case 35667:case 35671:return yE;case 35668:case 35672:return vE;case 35669:case 35673:return EE;case 5125:return ME;case 36294:return bE;case 36295:return TE;case 36296:return SE;case 35678:case 36198:case 36298:case 36306:case 35682:return AE;case 35679:case 36299:case 36307:return wE;case 35680:case 36300:case 36308:case 36293:return RE;case 36289:case 36303:case 36311:case 36292:return CE}}function PE(i,e){i.uniform1fv(this.addr,e)}function IE(i,e){let t=Jo(e,this.size,2);i.uniform2fv(this.addr,t)}function DE(i,e){let t=Jo(e,this.size,3);i.uniform3fv(this.addr,t)}function UE(i,e){let t=Jo(e,this.size,4);i.uniform4fv(this.addr,t)}function NE(i,e){let t=Jo(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function BE(i,e){let t=Jo(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function FE(i,e){let t=Jo(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function OE(i,e){i.uniform1iv(this.addr,e)}function HE(i,e){i.uniform2iv(this.addr,e)}function zE(i,e){i.uniform3iv(this.addr,e)}function kE(i,e){i.uniform4iv(this.addr,e)}function GE(i,e){i.uniform1uiv(this.addr,e)}function VE(i,e){i.uniform2uiv(this.addr,e)}function WE(i,e){i.uniform3uiv(this.addr,e)}function XE(i,e){i.uniform4uiv(this.addr,e)}function qE(i,e,t){let n=this.cache,r=e.length,o=Ic(t,r);kt(n,o)||(i.uniform1iv(this.addr,o),Gt(n,o));for(let s=0;s!==r;++s)t.setTexture2D(e[s]||fx,o[s])}function YE(i,e,t){let n=this.cache,r=e.length,o=Ic(t,r);kt(n,o)||(i.uniform1iv(this.addr,o),Gt(n,o));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||gx,o[s])}function jE(i,e,t){let n=this.cache,r=e.length,o=Ic(t,r);kt(n,o)||(i.uniform1iv(this.addr,o),Gt(n,o));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||xx,o[s])}function KE(i,e,t){let n=this.cache,r=e.length,o=Ic(t,r);kt(n,o)||(i.uniform1iv(this.addr,o),Gt(n,o));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||mx,o[s])}function $E(i){switch(i){case 5126:return PE;case 35664:return IE;case 35665:return DE;case 35666:return UE;case 35674:return NE;case 35675:return BE;case 35676:return FE;case 5124:case 35670:return OE;case 35667:case 35671:return HE;case 35668:case 35672:return zE;case 35669:case 35673:return kE;case 5125:return GE;case 36294:return VE;case 36295:return WE;case 36296:return XE;case 35678:case 36198:case 36298:case 36306:case 35682:return qE;case 35679:case 36299:case 36307:return YE;case 35680:case 36300:case 36308:case 36293:return jE;case 36289:case 36303:case 36311:case 36292:return KE}}var gd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=LE(t.type)}},xd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=$E(t.type)}},_d=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let o=0,s=r.length;o!==s;++o){let a=r[o];a.setValue(e,t[a.id],n)}}},md=/(\w+)(\])?(\[|\.)?/g;function hx(i,e){i.seq.push(e),i.map[e.id]=e}function ZE(i,e,t){let n=i.name,r=n.length;for(md.lastIndex=0;;){let o=md.exec(n),s=md.lastIndex,a=o[1],c=o[2]==="]",l=o[3];if(c&&(a=a|0),l===void 0||l==="["&&s+2===r){hx(t,l===void 0?new gd(a,i,e):new xd(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new _d(a),hx(t,d)),t=d}}}var Ar=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let o=e.getActiveUniform(t,r),s=e.getUniformLocation(t,o.name);ZE(o,s,this)}}setValue(e,t,n,r){let o=this.map[t];o!==void 0&&o.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let o=0,s=t.length;o!==s;++o){let a=t[o],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,o=e.length;r!==o;++r){let s=e[r];s.id in t&&n.push(s)}return n}};function yd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var JE=37297,QE=0;function eM(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let s=r;s<o;s++){let a=s+1;n.push(`${a===e?">":" "} ${a}: ${t[s]}`)}return n.join(`
`)}function tM(i){let e=Ke.getPrimaries(Ke.workingColorSpace),t=Ke.getPrimaries(i),n;switch(e===t?n="":e===So&&t===To?n="LinearDisplayP3ToLinearSRGB":e===To&&t===So&&(n="LinearSRGBToLinearDisplayP3"),i){case ft:case Vr:return[n,"LinearTransferOETF"];case tt:case Mo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function _x(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let s=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+eM(i.getShaderSource(e),s)}else return r}function nM(i,e){let t=tM(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function iM(i,e){let t;switch(e){case pp:t="Linear";break;case mp:t="Reinhard";break;case gp:t="OptimizedCineon";break;case Ba:t="ACESFilmic";break;case _p:t="AgX";break;case xp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function rM(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Qo).join(`
`)}function oM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Qo).join(`
`)}function sM(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function aM(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let o=i.getActiveAttrib(e,r),s=o.name,a=1;o.type===i.FLOAT_MAT2&&(a=2),o.type===i.FLOAT_MAT3&&(a=3),o.type===i.FLOAT_MAT4&&(a=4),t[s]={type:o.type,location:i.getAttribLocation(e,s),locationSize:a}}return t}function Qo(i){return i!==""}function yx(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function vx(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var cM=/^[ \t]*#include +<([\w\d./]+)>/gm;function vd(i){return i.replace(cM,uM)}var lM=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function uM(i,e){let t=Xe[e];if(t===void 0){let n=lM.get(e);if(n!==void 0)t=Xe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return vd(t)}var dM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ex(i){return i.replace(dM,hM)}function hM(i,e,t,n){let r="";for(let o=parseInt(e);o<parseInt(t);o++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function Mx(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function fM(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ua?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Gf?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ti&&(e="SHADOWMAP_TYPE_VSM"),e}function pM(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ni:case Ei:e="ENVMAP_TYPE_CUBE";break;case hr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function mM(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Ei&&(e="ENVMAP_MODE_REFRACTION"),e}function gM(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Na:e="ENVMAP_BLENDING_MULTIPLY";break;case hp:e="ENVMAP_BLENDING_MIX";break;case fp:e="ENVMAP_BLENDING_ADD";break}return e}function xM(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function bx(i,e,t,n){let r=i.getContext(),o=t.defines,s=t.vertexShader,a=t.fragmentShader,c=fM(t),l=pM(t),u=mM(t),d=gM(t),h=xM(t),f=t.isWebGL2?"":rM(t),g=oM(t),x=sM(o),m=r.createProgram(),p,v,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Qo).join(`
`),p.length>0&&(p+=`
`),v=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Qo).join(`
`),v.length>0&&(v+=`
`)):(p=[Mx(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qo).join(`
`),v=[f,Mx(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==kn?"#define TONE_MAPPING":"",t.toneMapping!==kn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==kn?iM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,nM("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qo).join(`
`)),s=vd(s),s=yx(s,t),s=vx(s,t),a=vd(a),a=yx(a,t),a=vx(a,t),s=Ex(s),a=Ex(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Yu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Yu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);let T=_+p+s,w=_+v+a,E=yd(r,r.VERTEX_SHADER,T),A=yd(r,r.FRAGMENT_SHADER,w);r.attachShader(m,E),r.attachShader(m,A),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function P(V){if(i.debug.checkShaderErrors){let te=r.getProgramInfoLog(m).trim(),I=r.getShaderInfoLog(E).trim(),k=r.getShaderInfoLog(A).trim(),G=!0,ee=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,m,E,A);else{let N=_x(r,E,"vertex"),X=_x(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+te+`
`+N+`
`+X)}else te!==""?console.warn("THREE.WebGLProgram: Program Info Log:",te):(I===""||k==="")&&(ee=!1);ee&&(V.diagnostics={runnable:G,programLog:te,vertexShader:{log:I,prefix:p},fragmentShader:{log:k,prefix:v}})}r.deleteShader(E),r.deleteShader(A),y=new Ar(r,m),M=aM(r,m)}let y;this.getUniforms=function(){return y===void 0&&P(this),y};let M;this.getAttributes=function(){return M===void 0&&P(this),M};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=r.getProgramParameter(m,JE)),D},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=QE++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=E,this.fragmentShader=A,this}var _M=0,Dc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),o=this._getShaderStage(n),s=this._getShaderCacheForMaterial(e);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(o)===!1&&(s.add(o),o.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ed(e),t.set(e,n)),n}},Ed=class{constructor(e){this.id=_M++,this.code=e,this.usedTimes=0}};function Tx(i,e,t,n,r,o,s){let a=new Mr,c=new Dc,l=[],u=r.isWebGL2,d=r.logarithmicDepthBuffer,h=r.vertexTextures,f=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return y===0?"uv":`uv${y}`}function m(y,M,D,V,te){let I=V.fog,k=te.geometry,G=y.isMeshStandardMaterial?V.environment:null,ee=(y.isMeshStandardMaterial?t:e).get(y.envMap||G),N=ee&&ee.mapping===hr?ee.image.height:null,X=g[y.type];y.precision!==null&&(f=r.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));let q=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,J=q!==void 0?q.length:0,fe=0;k.morphAttributes.position!==void 0&&(fe=1),k.morphAttributes.normal!==void 0&&(fe=2),k.morphAttributes.color!==void 0&&(fe=3);let H,$,me,Y;if(X){let dn=jn[X];H=dn.vertexShader,$=dn.fragmentShader}else H=y.vertexShader,$=y.fragmentShader,c.update(y),me=c.getVertexShaderID(y),Y=c.getFragmentShaderID(y);let W=i.getRenderTarget(),Q=te.isInstancedMesh===!0,ce=te.isBatchedMesh===!0,pe=!!y.map,K=!!y.matcap,S=!!ee,Z=!!y.aoMap,U=!!y.lightMap,O=!!y.bumpMap,B=!!y.normalMap,le=!!y.displacementMap,xe=!!y.emissiveMap,R=!!y.metalnessMap,b=!!y.roughnessMap,z=y.anisotropy>0,ae=y.clearcoat>0,ue=y.iridescence>0,de=y.sheen>0,Me=y.transmission>0,ye=z&&!!y.anisotropyMap,ve=ae&&!!y.clearcoatMap,_e=ae&&!!y.clearcoatNormalMap,Ee=ae&&!!y.clearcoatRoughnessMap,se=ue&&!!y.iridescenceMap,Ue=ue&&!!y.iridescenceThicknessMap,Se=de&&!!y.sheenColorMap,Pe=de&&!!y.sheenRoughnessMap,Re=!!y.specularMap,Ce=!!y.specularColorMap,Oe=!!y.specularIntensityMap,nt=Me&&!!y.transmissionMap,St=Me&&!!y.thicknessMap,je=!!y.gradientMap,Te=!!y.alphaMap,F=y.alphaTest>0,Ae=!!y.alphaHash,we=!!y.extensions,ze=!!k.attributes.uv1,Be=!!k.attributes.uv2,xt=!!k.attributes.uv3,_t=kn;return y.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(_t=i.toneMapping),{isWebGL2:u,shaderID:X,shaderType:y.type,shaderName:y.name,vertexShader:H,fragmentShader:$,defines:y.defines,customVertexShaderID:me,customFragmentShaderID:Y,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:ce,instancing:Q,instancingColor:Q&&te.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:W===null?i.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:ft,map:pe,matcap:K,envMap:S,envMapMode:S&&ee.mapping,envMapCubeUVHeight:N,aoMap:Z,lightMap:U,bumpMap:O,normalMap:B,displacementMap:h&&le,emissiveMap:xe,normalMapObjectSpace:B&&y.normalMapType===Pp,normalMapTangentSpace:B&&y.normalMapType===Ja,metalnessMap:R,roughnessMap:b,anisotropy:z,anisotropyMap:ye,clearcoat:ae,clearcoatMap:ve,clearcoatNormalMap:_e,clearcoatRoughnessMap:Ee,iridescence:ue,iridescenceMap:se,iridescenceThicknessMap:Ue,sheen:de,sheenColorMap:Se,sheenRoughnessMap:Pe,specularMap:Re,specularColorMap:Ce,specularIntensityMap:Oe,transmission:Me,transmissionMap:nt,thicknessMap:St,gradientMap:je,opaque:y.transparent===!1&&y.blending===Fi,alphaMap:Te,alphaTest:F,alphaHash:Ae,combine:y.combine,mapUv:pe&&x(y.map.channel),aoMapUv:Z&&x(y.aoMap.channel),lightMapUv:U&&x(y.lightMap.channel),bumpMapUv:O&&x(y.bumpMap.channel),normalMapUv:B&&x(y.normalMap.channel),displacementMapUv:le&&x(y.displacementMap.channel),emissiveMapUv:xe&&x(y.emissiveMap.channel),metalnessMapUv:R&&x(y.metalnessMap.channel),roughnessMapUv:b&&x(y.roughnessMap.channel),anisotropyMapUv:ye&&x(y.anisotropyMap.channel),clearcoatMapUv:ve&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:_e&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:se&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ue&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&x(y.sheenRoughnessMap.channel),specularMapUv:Re&&x(y.specularMap.channel),specularColorMapUv:Ce&&x(y.specularColorMap.channel),specularIntensityMapUv:Oe&&x(y.specularIntensityMap.channel),transmissionMapUv:nt&&x(y.transmissionMap.channel),thicknessMapUv:St&&x(y.thicknessMap.channel),alphaMapUv:Te&&x(y.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(B||z),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUv1s:ze,vertexUv2s:Be,vertexUv3s:xt,pointsUvs:te.isPoints===!0&&!!k.attributes.uv&&(pe||Te),fog:!!I,useFog:y.fog===!0,fogExp2:I&&I.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:te.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:fe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:_t,useLegacyLights:i._useLegacyLights,decodeVideoTexture:pe&&y.map.isVideoTexture===!0&&Ke.getTransfer(y.map.colorSpace)===at,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Pt,flipSided:y.side===Mt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:we&&y.extensions.derivatives===!0,extensionFragDepth:we&&y.extensions.fragDepth===!0,extensionDrawBuffers:we&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:we&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:we&&y.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function p(y){let M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(let D in y.defines)M.push(D),M.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(v(M,y),_(M,y),M.push(i.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function v(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapCubeUVHeight),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.morphAttributeCount),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function _(y,M){a.disableAll(),M.isWebGL2&&a.enable(0),M.supportsVertexTextures&&a.enable(1),M.instancing&&a.enable(2),M.instancingColor&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),y.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.skinning&&a.enable(4),M.morphTargets&&a.enable(5),M.morphNormals&&a.enable(6),M.morphColors&&a.enable(7),M.premultipliedAlpha&&a.enable(8),M.shadowMapEnabled&&a.enable(9),M.useLegacyLights&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),y.push(a.mask)}function T(y){let M=g[y.type],D;if(M){let V=jn[M];D=om.clone(V.uniforms)}else D=y.uniforms;return D}function w(y,M){let D;for(let V=0,te=l.length;V<te;V++){let I=l[V];if(I.cacheKey===M){D=I,++D.usedTimes;break}}return D===void 0&&(D=new bx(i,M,y,o),l.push(D)),D}function E(y){if(--y.usedTimes===0){let M=l.indexOf(y);l[M]=l[l.length-1],l.pop(),y.destroy()}}function A(y){c.remove(y)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:T,acquireProgram:w,releaseProgram:E,releaseShaderCache:A,programs:l,dispose:P}}function Sx(){let i=new WeakMap;function e(o){let s=i.get(o);return s===void 0&&(s={},i.set(o,s)),s}function t(o){i.delete(o)}function n(o,s,a){i.get(o)[s]=a}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function yM(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Ax(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function wx(){let i=[],e=0,t=[],n=[],r=[];function o(){e=0,t.length=0,n.length=0,r.length=0}function s(d,h,f,g,x,m){let p=i[e];return p===void 0?(p={id:d.id,object:d,geometry:h,material:f,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},i[e]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=x,p.group=m),e++,p}function a(d,h,f,g,x,m){let p=s(d,h,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?r.push(p):t.push(p)}function c(d,h,f,g,x,m){let p=s(d,h,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?r.unshift(p):t.unshift(p)}function l(d,h){t.length>1&&t.sort(d||yM),n.length>1&&n.sort(h||Ax),r.length>1&&r.sort(h||Ax)}function u(){for(let d=e,h=i.length;d<h;d++){let f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:r,init:o,push:a,unshift:c,finish:u,sort:l}}function Rx(){let i=new WeakMap;function e(n,r){let o=i.get(n),s;return o===void 0?(s=new wx,i.set(n,[s])):r>=o.length?(s=new wx,o.push(s)):s=o[r],s}function t(){i=new WeakMap}return{get:e,dispose:t}}function vM(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new ge};break;case"SpotLight":t={position:new L,direction:new L,color:new ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new ge,groundColor:new ge};break;case"RectAreaLight":t={color:new ge,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function EM(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var MM=0;function bM(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Cx(i,e){let t=new vM,n=EM(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new L);let o=new L,s=new De,a=new De;function c(u,d){let h=0,f=0,g=0;for(let V=0;V<9;V++)r.probe[V].set(0,0,0);let x=0,m=0,p=0,v=0,_=0,T=0,w=0,E=0,A=0,P=0,y=0;u.sort(bM);let M=d===!0?Math.PI:1;for(let V=0,te=u.length;V<te;V++){let I=u[V],k=I.color,G=I.intensity,ee=I.distance,N=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=k.r*G*M,f+=k.g*G*M,g+=k.b*G*M;else if(I.isLightProbe){for(let X=0;X<9;X++)r.probe[X].addScaledVector(I.sh.coefficients[X],G);y++}else if(I.isDirectionalLight){let X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity*M),I.castShadow){let q=I.shadow,J=n.get(I);J.shadowBias=q.bias,J.shadowNormalBias=q.normalBias,J.shadowRadius=q.radius,J.shadowMapSize=q.mapSize,r.directionalShadow[x]=J,r.directionalShadowMap[x]=N,r.directionalShadowMatrix[x]=I.shadow.matrix,T++}r.directional[x]=X,x++}else if(I.isSpotLight){let X=t.get(I);X.position.setFromMatrixPosition(I.matrixWorld),X.color.copy(k).multiplyScalar(G*M),X.distance=ee,X.coneCos=Math.cos(I.angle),X.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),X.decay=I.decay,r.spot[p]=X;let q=I.shadow;if(I.map&&(r.spotLightMap[A]=I.map,A++,q.updateMatrices(I),I.castShadow&&P++),r.spotLightMatrix[p]=q.matrix,I.castShadow){let J=n.get(I);J.shadowBias=q.bias,J.shadowNormalBias=q.normalBias,J.shadowRadius=q.radius,J.shadowMapSize=q.mapSize,r.spotShadow[p]=J,r.spotShadowMap[p]=N,E++}p++}else if(I.isRectAreaLight){let X=t.get(I);X.color.copy(k).multiplyScalar(G),X.halfWidth.set(I.width*.5,0,0),X.halfHeight.set(0,I.height*.5,0),r.rectArea[v]=X,v++}else if(I.isPointLight){let X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity*M),X.distance=I.distance,X.decay=I.decay,I.castShadow){let q=I.shadow,J=n.get(I);J.shadowBias=q.bias,J.shadowNormalBias=q.normalBias,J.shadowRadius=q.radius,J.shadowMapSize=q.mapSize,J.shadowCameraNear=q.camera.near,J.shadowCameraFar=q.camera.far,r.pointShadow[m]=J,r.pointShadowMap[m]=N,r.pointShadowMatrix[m]=I.shadow.matrix,w++}r.point[m]=X,m++}else if(I.isHemisphereLight){let X=t.get(I);X.skyColor.copy(I.color).multiplyScalar(G*M),X.groundColor.copy(I.groundColor).multiplyScalar(G*M),r.hemi[_]=X,_++}}v>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=be.LTC_FLOAT_1,r.rectAreaLTC2=be.LTC_FLOAT_2):(r.rectAreaLTC1=be.LTC_HALF_1,r.rectAreaLTC2=be.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=be.LTC_FLOAT_1,r.rectAreaLTC2=be.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=be.LTC_HALF_1,r.rectAreaLTC2=be.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=f,r.ambient[2]=g;let D=r.hash;(D.directionalLength!==x||D.pointLength!==m||D.spotLength!==p||D.rectAreaLength!==v||D.hemiLength!==_||D.numDirectionalShadows!==T||D.numPointShadows!==w||D.numSpotShadows!==E||D.numSpotMaps!==A||D.numLightProbes!==y)&&(r.directional.length=x,r.spot.length=p,r.rectArea.length=v,r.point.length=m,r.hemi.length=_,r.directionalShadow.length=T,r.directionalShadowMap.length=T,r.pointShadow.length=w,r.pointShadowMap.length=w,r.spotShadow.length=E,r.spotShadowMap.length=E,r.directionalShadowMatrix.length=T,r.pointShadowMatrix.length=w,r.spotLightMatrix.length=E+A-P,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=P,r.numLightProbes=y,D.directionalLength=x,D.pointLength=m,D.spotLength=p,D.rectAreaLength=v,D.hemiLength=_,D.numDirectionalShadows=T,D.numPointShadows=w,D.numSpotShadows=E,D.numSpotMaps=A,D.numLightProbes=y,r.version=MM++)}function l(u,d){let h=0,f=0,g=0,x=0,m=0,p=d.matrixWorldInverse;for(let v=0,_=u.length;v<_;v++){let T=u[v];if(T.isDirectionalLight){let w=r.directional[h];w.direction.setFromMatrixPosition(T.matrixWorld),o.setFromMatrixPosition(T.target.matrixWorld),w.direction.sub(o),w.direction.transformDirection(p),h++}else if(T.isSpotLight){let w=r.spot[g];w.position.setFromMatrixPosition(T.matrixWorld),w.position.applyMatrix4(p),w.direction.setFromMatrixPosition(T.matrixWorld),o.setFromMatrixPosition(T.target.matrixWorld),w.direction.sub(o),w.direction.transformDirection(p),g++}else if(T.isRectAreaLight){let w=r.rectArea[x];w.position.setFromMatrixPosition(T.matrixWorld),w.position.applyMatrix4(p),a.identity(),s.copy(T.matrixWorld),s.premultiply(p),a.extractRotation(s),w.halfWidth.set(T.width*.5,0,0),w.halfHeight.set(0,T.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),x++}else if(T.isPointLight){let w=r.point[f];w.position.setFromMatrixPosition(T.matrixWorld),w.position.applyMatrix4(p),f++}else if(T.isHemisphereLight){let w=r.hemi[m];w.direction.setFromMatrixPosition(T.matrixWorld),w.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:r}}function Lx(i,e){let t=new Cx(i,e),n=[],r=[];function o(){n.length=0,r.length=0}function s(d){n.push(d)}function a(d){r.push(d)}function c(d){t.setup(n,d)}function l(d){t.setupView(n,d)}return{init:o,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:c,setupLightsView:l,pushLight:s,pushShadow:a}}function Px(i,e){let t=new WeakMap;function n(o,s=0){let a=t.get(o),c;return a===void 0?(c=new Lx(i,e),t.set(o,[c])):s>=a.length?(c=new Lx(i,e),a.push(c)):c=a[s],c}function r(){t=new WeakMap}return{get:n,dispose:r}}var Uc=class extends It{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Cp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}};var Nc=class extends It{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Ix=`
void main() {

	gl_Position = vec4( position, 1.0 );

}
`,Dx=`
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
`;function Ux(i,e,t){let n=new Tr,r=new Ie,o=new Ie,s=new it,a=new Uc({depthPacking:Lp}),c=new Nc,l={},u=t.maxTextureSize,d={[$t]:Mt,[Mt]:$t,[Pt]:Pt},h=new ln({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ie},radius:{value:4}},vertexShader:Ix,fragmentShader:Dx}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ze;g.setAttribute("position",new Ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new ke(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ua;let p=this.type;this.render=function(E,A,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;let y=i.getRenderTarget(),M=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),V=i.state;V.setBlending(zn),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);let te=p!==ti&&this.type===ti,I=p===ti&&this.type!==ti;for(let k=0,G=E.length;k<G;k++){let ee=E[k],N=ee.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;r.copy(N.mapSize);let X=N.getFrameExtents();if(r.multiply(X),o.copy(N.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(o.x=Math.floor(u/X.x),r.x=o.x*X.x,N.mapSize.x=o.x),r.y>u&&(o.y=Math.floor(u/X.y),r.y=o.y*X.y,N.mapSize.y=o.y)),N.map===null||te===!0||I===!0){let J=this.type!==ti?{minFilter:bt,magFilter:bt}:{};N.map!==null&&N.map.dispose(),N.map=new En(r.x,r.y,J),N.map.texture.name=ee.name+".shadowMap",N.camera.updateProjectionMatrix()}i.setRenderTarget(N.map),i.clear();let q=N.getViewportCount();for(let J=0;J<q;J++){let fe=N.getViewport(J);s.set(o.x*fe.x,o.y*fe.y,o.x*fe.z,o.y*fe.w),V.viewport(s),N.updateMatrices(ee,J),n=N.getFrustum(),T(A,P,N.camera,ee,this.type)}N.isPointLightShadow!==!0&&this.type===ti&&v(N,P),N.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(y,M,D)};function v(E,A){let P=e.update(x);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new En(r.x,r.y)),h.uniforms.shadow_pass.value=E.map.texture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(A,null,P,h,x,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(A,null,P,f,x,null)}function _(E,A,P,y){let M=null,D=P.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(D!==void 0)M=D;else if(M=P.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let V=M.uuid,te=A.uuid,I=l[V];I===void 0&&(I={},l[V]=I);let k=I[te];k===void 0&&(k=M.clone(),I[te]=k,A.addEventListener("dispose",w)),M=k}if(M.visible=A.visible,M.wireframe=A.wireframe,y===ti?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:d[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let V=i.properties.get(M);V.light=P}return M}function T(E,A,P,y,M){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&M===ti)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,E.matrixWorld);let te=e.update(E),I=E.material;if(Array.isArray(I)){let k=te.groups;for(let G=0,ee=k.length;G<ee;G++){let N=k[G],X=I[N.materialIndex];if(X&&X.visible){let q=_(E,X,y,M);E.onBeforeShadow(i,E,A,P,te,q,N),i.renderBufferDirect(P,null,te,q,E,N),E.onAfterShadow(i,E,A,P,te,q,N)}}}else if(I.visible){let k=_(E,I,y,M);E.onBeforeShadow(i,E,A,P,te,k,null),i.renderBufferDirect(P,null,te,k,E,null),E.onAfterShadow(i,E,A,P,te,k,null)}}let V=E.children;for(let te=0,I=V.length;te<I;te++)T(V[te],A,P,y,M)}function w(E){E.target.removeEventListener("dispose",w);for(let P in l){let y=l[P],M=E.target.uuid;M in y&&(y[M].dispose(),delete y[M])}}}function Nx(i,e,t){let n=t.isWebGL2;function r(){let F=!1,Ae=new it,we=null,ze=new it(0,0,0,0);return{setMask:function(Be){we!==Be&&!F&&(i.colorMask(Be,Be,Be,Be),we=Be)},setLocked:function(Be){F=Be},setClear:function(Be,xt,_t,jt,dn){dn===!0&&(Be*=jt,xt*=jt,_t*=jt),Ae.set(Be,xt,_t,jt),ze.equals(Ae)===!1&&(i.clearColor(Be,xt,_t,jt),ze.copy(Ae))},reset:function(){F=!1,we=null,ze.set(-1,0,0,0)}}}function o(){let F=!1,Ae=null,we=null,ze=null;return{setTest:function(Be){Be?ce(i.DEPTH_TEST):pe(i.DEPTH_TEST)},setMask:function(Be){Ae!==Be&&!F&&(i.depthMask(Be),Ae=Be)},setFunc:function(Be){if(we!==Be){switch(Be){case op:i.depthFunc(i.NEVER);break;case sp:i.depthFunc(i.ALWAYS);break;case ap:i.depthFunc(i.LESS);break;case _o:i.depthFunc(i.LEQUAL);break;case cp:i.depthFunc(i.EQUAL);break;case lp:i.depthFunc(i.GEQUAL);break;case up:i.depthFunc(i.GREATER);break;case dp:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}we=Be}},setLocked:function(Be){F=Be},setClear:function(Be){ze!==Be&&(i.clearDepth(Be),ze=Be)},reset:function(){F=!1,Ae=null,we=null,ze=null}}}function s(){let F=!1,Ae=null,we=null,ze=null,Be=null,xt=null,_t=null,jt=null,dn=null;return{setTest:function(yt){F||(yt?ce(i.STENCIL_TEST):pe(i.STENCIL_TEST))},setMask:function(yt){Ae!==yt&&!F&&(i.stencilMask(yt),Ae=yt)},setFunc:function(yt,hn,vi){(we!==yt||ze!==hn||Be!==vi)&&(i.stencilFunc(yt,hn,vi),we=yt,ze=hn,Be=vi)},setOp:function(yt,hn,vi){(xt!==yt||_t!==hn||jt!==vi)&&(i.stencilOp(yt,hn,vi),xt=yt,_t=hn,jt=vi)},setLocked:function(yt){F=yt},setClear:function(yt){dn!==yt&&(i.clearStencil(yt),dn=yt)},reset:function(){F=!1,Ae=null,we=null,ze=null,Be=null,xt=null,_t=null,jt=null,dn=null}}}let a=new r,c=new o,l=new s,u=new WeakMap,d=new WeakMap,h={},f={},g=new WeakMap,x=[],m=null,p=!1,v=null,_=null,T=null,w=null,E=null,A=null,P=null,y=new ge(0,0,0),M=0,D=!1,V=null,te=null,I=null,k=null,G=null,ee=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,X=0,q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(q)[1]),N=X>=1):q.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),N=X>=2);let J=null,fe={},H=i.getParameter(i.SCISSOR_BOX),$=i.getParameter(i.VIEWPORT),me=new it().fromArray(H),Y=new it().fromArray($);function W(F,Ae,we,ze){let Be=new Uint8Array(4),xt=i.createTexture();i.bindTexture(F,xt),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _t=0;_t<we;_t++)n&&(F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY)?i.texImage3D(Ae,0,i.RGBA,1,1,ze,0,i.RGBA,i.UNSIGNED_BYTE,Be):i.texImage2D(Ae+_t,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Be);return xt}let Q={};Q[i.TEXTURE_2D]=W(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=W(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Q[i.TEXTURE_2D_ARRAY]=W(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=W(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),ce(i.DEPTH_TEST),c.setFunc(_o),xe(!1),R(du),ce(i.CULL_FACE),B(zn);function ce(F){h[F]!==!0&&(i.enable(F),h[F]=!0)}function pe(F){h[F]!==!1&&(i.disable(F),h[F]=!1)}function K(F,Ae){return f[F]!==Ae?(i.bindFramebuffer(F,Ae),f[F]=Ae,n&&(F===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=Ae),F===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=Ae)),!0):!1}function S(F,Ae){let we=x,ze=!1;if(F)if(we=g.get(Ae),we===void 0&&(we=[],g.set(Ae,we)),F.isWebGLMultipleRenderTargets){let Be=F.texture;if(we.length!==Be.length||we[0]!==i.COLOR_ATTACHMENT0){for(let xt=0,_t=Be.length;xt<_t;xt++)we[xt]=i.COLOR_ATTACHMENT0+xt;we.length=Be.length,ze=!0}}else we[0]!==i.COLOR_ATTACHMENT0&&(we[0]=i.COLOR_ATTACHMENT0,ze=!0);else we[0]!==i.BACK&&(we[0]=i.BACK,ze=!0);ze&&(t.isWebGL2?i.drawBuffers(we):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(we))}function Z(F){return m!==F?(i.useProgram(F),m=F,!0):!1}let U={[Oi]:i.FUNC_ADD,[Wf]:i.FUNC_SUBTRACT,[Xf]:i.FUNC_REVERSE_SUBTRACT};if(n)U[fu]=i.MIN,U[pu]=i.MAX;else{let F=e.get("EXT_blend_minmax");F!==null&&(U[fu]=F.MIN_EXT,U[pu]=F.MAX_EXT)}let O={[qf]:i.ZERO,[Yf]:i.ONE,[jf]:i.SRC_COLOR,[Ns]:i.SRC_ALPHA,[ep]:i.SRC_ALPHA_SATURATE,[Jf]:i.DST_COLOR,[$f]:i.DST_ALPHA,[Kf]:i.ONE_MINUS_SRC_COLOR,[Bs]:i.ONE_MINUS_SRC_ALPHA,[Qf]:i.ONE_MINUS_DST_COLOR,[Zf]:i.ONE_MINUS_DST_ALPHA,[tp]:i.CONSTANT_COLOR,[np]:i.ONE_MINUS_CONSTANT_COLOR,[ip]:i.CONSTANT_ALPHA,[rp]:i.ONE_MINUS_CONSTANT_ALPHA};function B(F,Ae,we,ze,Be,xt,_t,jt,dn,yt){if(F===zn){p===!0&&(pe(i.BLEND),p=!1);return}if(p===!1&&(ce(i.BLEND),p=!0),F!==Vf){if(F!==v||yt!==D){if((_!==Oi||E!==Oi)&&(i.blendEquation(i.FUNC_ADD),_=Oi,E=Oi),yt)switch(F){case Fi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case dr:i.blendFunc(i.ONE,i.ONE);break;case hu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Us:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Fi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case dr:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case hu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Us:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}T=null,w=null,A=null,P=null,y.set(0,0,0),M=0,v=F,D=yt}return}Be=Be||Ae,xt=xt||we,_t=_t||ze,(Ae!==_||Be!==E)&&(i.blendEquationSeparate(U[Ae],U[Be]),_=Ae,E=Be),(we!==T||ze!==w||xt!==A||_t!==P)&&(i.blendFuncSeparate(O[we],O[ze],O[xt],O[_t]),T=we,w=ze,A=xt,P=_t),(jt.equals(y)===!1||dn!==M)&&(i.blendColor(jt.r,jt.g,jt.b,dn),y.copy(jt),M=dn),v=F,D=!1}function le(F,Ae){F.side===Pt?pe(i.CULL_FACE):ce(i.CULL_FACE);let we=F.side===Mt;Ae&&(we=!we),xe(we),F.blending===Fi&&F.transparent===!1?B(zn):B(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),c.setFunc(F.depthFunc),c.setTest(F.depthTest),c.setMask(F.depthWrite),a.setMask(F.colorWrite);let ze=F.stencilWrite;l.setTest(ze),ze&&(l.setMask(F.stencilWriteMask),l.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),l.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),z(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ce(i.SAMPLE_ALPHA_TO_COVERAGE):pe(i.SAMPLE_ALPHA_TO_COVERAGE)}function xe(F){V!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),V=F)}function R(F){F!==zf?(ce(i.CULL_FACE),F!==te&&(F===du?i.cullFace(i.BACK):F===kf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pe(i.CULL_FACE),te=F}function b(F){F!==I&&(N&&i.lineWidth(F),I=F)}function z(F,Ae,we){F?(ce(i.POLYGON_OFFSET_FILL),(k!==Ae||G!==we)&&(i.polygonOffset(Ae,we),k=Ae,G=we)):pe(i.POLYGON_OFFSET_FILL)}function ae(F){F?ce(i.SCISSOR_TEST):pe(i.SCISSOR_TEST)}function ue(F){F===void 0&&(F=i.TEXTURE0+ee-1),J!==F&&(i.activeTexture(F),J=F)}function de(F,Ae,we){we===void 0&&(J===null?we=i.TEXTURE0+ee-1:we=J);let ze=fe[we];ze===void 0&&(ze={type:void 0,texture:void 0},fe[we]=ze),(ze.type!==F||ze.texture!==Ae)&&(J!==we&&(i.activeTexture(we),J=we),i.bindTexture(F,Ae||Q[F]),ze.type=F,ze.texture=Ae)}function Me(){let F=fe[J];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function ye(){try{i.compressedTexImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ve(){try{i.compressedTexImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function _e(){try{i.texSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ee(){try{i.texSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function se(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ue(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Se(){try{i.texStorage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Pe(){try{i.texStorage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Re(){try{i.texImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ce(){try{i.texImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Oe(F){me.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),me.copy(F))}function nt(F){Y.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),Y.copy(F))}function St(F,Ae){let we=d.get(Ae);we===void 0&&(we=new WeakMap,d.set(Ae,we));let ze=we.get(F);ze===void 0&&(ze=i.getUniformBlockIndex(Ae,F.name),we.set(F,ze))}function je(F,Ae){let ze=d.get(Ae).get(F);u.get(Ae)!==ze&&(i.uniformBlockBinding(Ae,ze,F.__bindingPointIndex),u.set(Ae,ze))}function Te(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},J=null,fe={},f={},g=new WeakMap,x=[],m=null,p=!1,v=null,_=null,T=null,w=null,E=null,A=null,P=null,y=new ge(0,0,0),M=0,D=!1,V=null,te=null,I=null,k=null,G=null,me.set(0,0,i.canvas.width,i.canvas.height),Y.set(0,0,i.canvas.width,i.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:ce,disable:pe,bindFramebuffer:K,drawBuffers:S,useProgram:Z,setBlending:B,setMaterial:le,setFlipSided:xe,setCullFace:R,setLineWidth:b,setPolygonOffset:z,setScissorTest:ae,activeTexture:ue,bindTexture:de,unbindTexture:Me,compressedTexImage2D:ye,compressedTexImage3D:ve,texImage2D:Re,texImage3D:Ce,updateUBOMapping:St,uniformBlockBinding:je,texStorage2D:Se,texStorage3D:Pe,texSubImage2D:_e,texSubImage3D:Ee,compressedTexSubImage2D:se,compressedTexSubImage3D:Ue,scissor:Oe,viewport:nt,reset:Te}}function Bx(i,e,t,n,r,o,s){let a=r.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap,d,h=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,b){return f?new OffscreenCanvas(R,b):pr("canvas")}function x(R,b,z,ae){let ue=1;if((R.width>ae||R.height>ae)&&(ue=ae/Math.max(R.width,R.height)),ue<1||b===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){let de=b?wo:Math.floor,Me=de(ue*R.width),ye=de(ue*R.height);d===void 0&&(d=g(Me,ye));let ve=z?g(Me,ye):d;return ve.width=Me,ve.height=ye,ve.getContext("2d").drawImage(R,0,0,Me,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+Me+"x"+ye+")."),ve}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function m(R){return tc(R.width)&&tc(R.height)}function p(R){return a?!1:R.wrapS!==Ot||R.wrapT!==Ot||R.minFilter!==bt&&R.minFilter!==Nt}function v(R,b){return R.generateMipmaps&&b&&R.minFilter!==bt&&R.minFilter!==Nt}function _(R){i.generateMipmap(R)}function T(R,b,z,ae,ue=!1){if(a===!1)return b;if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let de=b;if(b===i.RED&&(z===i.FLOAT&&(de=i.R32F),z===i.HALF_FLOAT&&(de=i.R16F),z===i.UNSIGNED_BYTE&&(de=i.R8)),b===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(de=i.R8UI),z===i.UNSIGNED_SHORT&&(de=i.R16UI),z===i.UNSIGNED_INT&&(de=i.R32UI),z===i.BYTE&&(de=i.R8I),z===i.SHORT&&(de=i.R16I),z===i.INT&&(de=i.R32I)),b===i.RG&&(z===i.FLOAT&&(de=i.RG32F),z===i.HALF_FLOAT&&(de=i.RG16F),z===i.UNSIGNED_BYTE&&(de=i.RG8)),b===i.RGBA){let Me=ue?bo:Ke.getTransfer(ae);z===i.FLOAT&&(de=i.RGBA32F),z===i.HALF_FLOAT&&(de=i.RGBA16F),z===i.UNSIGNED_BYTE&&(de=Me===at?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(de=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(de=i.RGB5_A1)}return(de===i.R16F||de===i.R32F||de===i.RG16F||de===i.RG32F||de===i.RGBA16F||de===i.RGBA32F)&&e.get("EXT_color_buffer_float"),de}function w(R,b,z){return v(R,z)===!0||R.isFramebufferTexture&&R.minFilter!==bt&&R.minFilter!==Nt?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function E(R){return R===bt||R===Hs||R===yo?i.NEAREST:i.LINEAR}function A(R){let b=R.target;b.removeEventListener("dispose",A),y(b),b.isVideoTexture&&u.delete(b)}function P(R){let b=R.target;b.removeEventListener("dispose",P),D(b)}function y(R){let b=n.get(R);if(b.__webglInit===void 0)return;let z=R.source,ae=h.get(z);if(ae){let ue=ae[b.__cacheKey];ue.usedTimes--,ue.usedTimes===0&&M(R),Object.keys(ae).length===0&&h.delete(z)}n.remove(R)}function M(R){let b=n.get(R);i.deleteTexture(b.__webglTexture);let z=R.source,ae=h.get(z);delete ae[b.__cacheKey],s.memory.textures--}function D(R){let b=R.texture,z=n.get(R),ae=n.get(b);if(ae.__webglTexture!==void 0&&(i.deleteTexture(ae.__webglTexture),s.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let ue=0;ue<6;ue++){if(Array.isArray(z.__webglFramebuffer[ue]))for(let de=0;de<z.__webglFramebuffer[ue].length;de++)i.deleteFramebuffer(z.__webglFramebuffer[ue][de]);else i.deleteFramebuffer(z.__webglFramebuffer[ue]);z.__webglDepthbuffer&&i.deleteRenderbuffer(z.__webglDepthbuffer[ue])}else{if(Array.isArray(z.__webglFramebuffer))for(let ue=0;ue<z.__webglFramebuffer.length;ue++)i.deleteFramebuffer(z.__webglFramebuffer[ue]);else i.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&i.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&i.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let ue=0;ue<z.__webglColorRenderbuffer.length;ue++)z.__webglColorRenderbuffer[ue]&&i.deleteRenderbuffer(z.__webglColorRenderbuffer[ue]);z.__webglDepthRenderbuffer&&i.deleteRenderbuffer(z.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let ue=0,de=b.length;ue<de;ue++){let Me=n.get(b[ue]);Me.__webglTexture&&(i.deleteTexture(Me.__webglTexture),s.memory.textures--),n.remove(b[ue])}n.remove(b),n.remove(R)}let V=0;function te(){V=0}function I(){let R=V;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),V+=1,R}function k(R){let b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function G(R,b){let z=n.get(R);if(R.isVideoTexture&&le(R),R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){let ae=R.image;if(ae===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ae.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{me(z,R,b);return}}t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+b)}function ee(R,b){let z=n.get(R);if(R.version>0&&z.__version!==R.version){me(z,R,b);return}t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+b)}function N(R,b){let z=n.get(R);if(R.version>0&&z.__version!==R.version){me(z,R,b);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+b)}function X(R,b){let z=n.get(R);if(R.version>0&&z.__version!==R.version){Y(z,R,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+b)}let q={[ii]:i.REPEAT,[Ot]:i.CLAMP_TO_EDGE,[Gr]:i.MIRRORED_REPEAT},J={[bt]:i.NEAREST,[Hs]:i.NEAREST_MIPMAP_NEAREST,[yo]:i.NEAREST_MIPMAP_LINEAR,[Nt]:i.LINEAR,[Fa]:i.LINEAR_MIPMAP_NEAREST,[Gn]:i.LINEAR_MIPMAP_LINEAR},fe={[Ip]:i.NEVER,[Op]:i.ALWAYS,[Dp]:i.LESS,[Qa]:i.LEQUAL,[Up]:i.EQUAL,[Fp]:i.GEQUAL,[Np]:i.GREATER,[Bp]:i.NOTEQUAL};function H(R,b,z){if(z?(i.texParameteri(R,i.TEXTURE_WRAP_S,q[b.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,q[b.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,q[b.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,J[b.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,J[b.minFilter])):(i.texParameteri(R,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(R,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(b.wrapS!==Ot||b.wrapT!==Ot)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(R,i.TEXTURE_MAG_FILTER,E(b.magFilter)),i.texParameteri(R,i.TEXTURE_MIN_FILTER,E(b.minFilter)),b.minFilter!==bt&&b.minFilter!==Nt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),b.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,fe[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let ae=e.get("EXT_texture_filter_anisotropic");if(b.magFilter===bt||b.minFilter!==yo&&b.minFilter!==Gn||b.type===fn&&e.has("OES_texture_float_linear")===!1||a===!1&&b.type===Hi&&e.has("OES_texture_half_float_linear")===!1)return;(b.anisotropy>1||n.get(b).__currentAnisotropy)&&(i.texParameterf(R,ae.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy)}}function $(R,b){let z=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",A));let ae=b.source,ue=h.get(ae);ue===void 0&&(ue={},h.set(ae,ue));let de=k(b);if(de!==R.__cacheKey){ue[de]===void 0&&(ue[de]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,z=!0),ue[de].usedTimes++;let Me=ue[R.__cacheKey];Me!==void 0&&(ue[R.__cacheKey].usedTimes--,Me.usedTimes===0&&M(b)),R.__cacheKey=de,R.__webglTexture=ue[de].texture}return z}function me(R,b,z){let ae=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ae=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ae=i.TEXTURE_3D);let ue=$(R,b),de=b.source;t.bindTexture(ae,R.__webglTexture,i.TEXTURE0+z);let Me=n.get(de);if(de.version!==Me.__version||ue===!0){t.activeTexture(i.TEXTURE0+z);let ye=Ke.getPrimaries(Ke.workingColorSpace),ve=b.colorSpace===Zt?null:Ke.getPrimaries(b.colorSpace),_e=b.colorSpace===Zt||ye===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let Ee=p(b)&&m(b.image)===!1,se=x(b.image,Ee,!1,r.maxTextureSize);se=xe(b,se);let Ue=m(se)||a,Se=o.convert(b.format,b.colorSpace),Pe=o.convert(b.type),Re=T(b.internalFormat,Se,Pe,b.colorSpace,b.isVideoTexture);H(ae,b,Ue);let Ce,Oe=b.mipmaps,nt=a&&b.isVideoTexture!==!0&&Re!==ja,St=Me.__version===void 0||ue===!0,je=w(b,se,Ue);if(b.isDepthTexture)Re=i.DEPTH_COMPONENT,a?b.type===fn?Re=i.DEPTH_COMPONENT32F:b.type===Pn?Re=i.DEPTH_COMPONENT24:b.type===Vn?Re=i.DEPTH24_STENCIL8:Re=i.DEPTH_COMPONENT16:b.type===fn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),b.format===ri&&Re===i.DEPTH_COMPONENT&&b.type!==vo&&b.type!==Pn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),b.type=Pn,Pe=o.convert(b.type)),b.format===Mi&&Re===i.DEPTH_COMPONENT&&(Re=i.DEPTH_STENCIL,b.type!==Vn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),b.type=Vn,Pe=o.convert(b.type))),St&&(nt?t.texStorage2D(i.TEXTURE_2D,1,Re,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,Re,se.width,se.height,0,Se,Pe,null));else if(b.isDataTexture)if(Oe.length>0&&Ue){nt&&St&&t.texStorage2D(i.TEXTURE_2D,je,Re,Oe[0].width,Oe[0].height);for(let Te=0,F=Oe.length;Te<F;Te++)Ce=Oe[Te],nt?t.texSubImage2D(i.TEXTURE_2D,Te,0,0,Ce.width,Ce.height,Se,Pe,Ce.data):t.texImage2D(i.TEXTURE_2D,Te,Re,Ce.width,Ce.height,0,Se,Pe,Ce.data);b.generateMipmaps=!1}else nt?(St&&t.texStorage2D(i.TEXTURE_2D,je,Re,se.width,se.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,se.width,se.height,Se,Pe,se.data)):t.texImage2D(i.TEXTURE_2D,0,Re,se.width,se.height,0,Se,Pe,se.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){nt&&St&&t.texStorage3D(i.TEXTURE_2D_ARRAY,je,Re,Oe[0].width,Oe[0].height,se.depth);for(let Te=0,F=Oe.length;Te<F;Te++)Ce=Oe[Te],b.format!==Ht?Se!==null?nt?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Te,0,0,0,Ce.width,Ce.height,se.depth,Se,Ce.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Te,Re,Ce.width,Ce.height,se.depth,0,Ce.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):nt?t.texSubImage3D(i.TEXTURE_2D_ARRAY,Te,0,0,0,Ce.width,Ce.height,se.depth,Se,Pe,Ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Te,Re,Ce.width,Ce.height,se.depth,0,Se,Pe,Ce.data)}else{nt&&St&&t.texStorage2D(i.TEXTURE_2D,je,Re,Oe[0].width,Oe[0].height);for(let Te=0,F=Oe.length;Te<F;Te++)Ce=Oe[Te],b.format!==Ht?Se!==null?nt?t.compressedTexSubImage2D(i.TEXTURE_2D,Te,0,0,Ce.width,Ce.height,Se,Ce.data):t.compressedTexImage2D(i.TEXTURE_2D,Te,Re,Ce.width,Ce.height,0,Ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):nt?t.texSubImage2D(i.TEXTURE_2D,Te,0,0,Ce.width,Ce.height,Se,Pe,Ce.data):t.texImage2D(i.TEXTURE_2D,Te,Re,Ce.width,Ce.height,0,Se,Pe,Ce.data)}else if(b.isDataArrayTexture)nt?(St&&t.texStorage3D(i.TEXTURE_2D_ARRAY,je,Re,se.width,se.height,se.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,Se,Pe,se.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,Re,se.width,se.height,se.depth,0,Se,Pe,se.data);else if(b.isData3DTexture)nt?(St&&t.texStorage3D(i.TEXTURE_3D,je,Re,se.width,se.height,se.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,Se,Pe,se.data)):t.texImage3D(i.TEXTURE_3D,0,Re,se.width,se.height,se.depth,0,Se,Pe,se.data);else if(b.isFramebufferTexture){if(St)if(nt)t.texStorage2D(i.TEXTURE_2D,je,Re,se.width,se.height);else{let Te=se.width,F=se.height;for(let Ae=0;Ae<je;Ae++)t.texImage2D(i.TEXTURE_2D,Ae,Re,Te,F,0,Se,Pe,null),Te>>=1,F>>=1}}else if(Oe.length>0&&Ue){nt&&St&&t.texStorage2D(i.TEXTURE_2D,je,Re,Oe[0].width,Oe[0].height);for(let Te=0,F=Oe.length;Te<F;Te++)Ce=Oe[Te],nt?t.texSubImage2D(i.TEXTURE_2D,Te,0,0,Se,Pe,Ce):t.texImage2D(i.TEXTURE_2D,Te,Re,Se,Pe,Ce);b.generateMipmaps=!1}else nt?(St&&t.texStorage2D(i.TEXTURE_2D,je,Re,se.width,se.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Se,Pe,se)):t.texImage2D(i.TEXTURE_2D,0,Re,Se,Pe,se);v(b,Ue)&&_(ae),Me.__version=de.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function Y(R,b,z){if(b.image.length!==6)return;let ae=$(R,b),ue=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+z);let de=n.get(ue);if(ue.version!==de.__version||ae===!0){t.activeTexture(i.TEXTURE0+z);let Me=Ke.getPrimaries(Ke.workingColorSpace),ye=b.colorSpace===Zt?null:Ke.getPrimaries(b.colorSpace),ve=b.colorSpace===Zt||Me===ye?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);let _e=b.isCompressedTexture||b.image[0].isCompressedTexture,Ee=b.image[0]&&b.image[0].isDataTexture,se=[];for(let Te=0;Te<6;Te++)!_e&&!Ee?se[Te]=x(b.image[Te],!1,!0,r.maxCubemapSize):se[Te]=Ee?b.image[Te].image:b.image[Te],se[Te]=xe(b,se[Te]);let Ue=se[0],Se=m(Ue)||a,Pe=o.convert(b.format,b.colorSpace),Re=o.convert(b.type),Ce=T(b.internalFormat,Pe,Re,b.colorSpace),Oe=a&&b.isVideoTexture!==!0,nt=de.__version===void 0||ae===!0,St=w(b,Ue,Se);H(i.TEXTURE_CUBE_MAP,b,Se);let je;if(_e){Oe&&nt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,St,Ce,Ue.width,Ue.height);for(let Te=0;Te<6;Te++){je=se[Te].mipmaps;for(let F=0;F<je.length;F++){let Ae=je[F];b.format!==Ht?Pe!==null?Oe?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,F,0,0,Ae.width,Ae.height,Pe,Ae.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,F,Ce,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,F,0,0,Ae.width,Ae.height,Pe,Re,Ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,F,Ce,Ae.width,Ae.height,0,Pe,Re,Ae.data)}}}else{je=b.mipmaps,Oe&&nt&&(je.length>0&&St++,t.texStorage2D(i.TEXTURE_CUBE_MAP,St,Ce,se[0].width,se[0].height));for(let Te=0;Te<6;Te++)if(Ee){Oe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,se[Te].width,se[Te].height,Pe,Re,se[Te].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,Ce,se[Te].width,se[Te].height,0,Pe,Re,se[Te].data);for(let F=0;F<je.length;F++){let we=je[F].image[Te].image;Oe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,F+1,0,0,we.width,we.height,Pe,Re,we.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,F+1,Ce,we.width,we.height,0,Pe,Re,we.data)}}else{Oe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,Pe,Re,se[Te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,Ce,Pe,Re,se[Te]);for(let F=0;F<je.length;F++){let Ae=je[F];Oe?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,F+1,0,0,Pe,Re,Ae.image[Te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,F+1,Ce,Pe,Re,Ae.image[Te])}}}v(b,Se)&&_(i.TEXTURE_CUBE_MAP),de.__version=ue.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function W(R,b,z,ae,ue,de){let Me=o.convert(z.format,z.colorSpace),ye=o.convert(z.type),ve=T(z.internalFormat,Me,ye,z.colorSpace);if(!n.get(b).__hasExternalTextures){let Ee=Math.max(1,b.width>>de),se=Math.max(1,b.height>>de);ue===i.TEXTURE_3D||ue===i.TEXTURE_2D_ARRAY?t.texImage3D(ue,de,ve,Ee,se,b.depth,0,Me,ye,null):t.texImage2D(ue,de,ve,Ee,se,0,Me,ye,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),B(b)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ae,ue,n.get(z).__webglTexture,0,O(b)):(ue===i.TEXTURE_2D||ue>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ue<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ae,ue,n.get(z).__webglTexture,de),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Q(R,b,z){if(i.bindRenderbuffer(i.RENDERBUFFER,R),b.depthBuffer&&!b.stencilBuffer){let ae=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(z||B(b)){let ue=b.depthTexture;ue&&ue.isDepthTexture&&(ue.type===fn?ae=i.DEPTH_COMPONENT32F:ue.type===Pn&&(ae=i.DEPTH_COMPONENT24));let de=O(b);B(b)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,de,ae,b.width,b.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,de,ae,b.width,b.height)}else i.renderbufferStorage(i.RENDERBUFFER,ae,b.width,b.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,R)}else if(b.depthBuffer&&b.stencilBuffer){let ae=O(b);z&&B(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ae,i.DEPTH24_STENCIL8,b.width,b.height):B(b)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ae,i.DEPTH24_STENCIL8,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,R)}else{let ae=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let ue=0;ue<ae.length;ue++){let de=ae[ue],Me=o.convert(de.format,de.colorSpace),ye=o.convert(de.type),ve=T(de.internalFormat,Me,ye,de.colorSpace),_e=O(b);z&&B(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e,ve,b.width,b.height):B(b)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e,ve,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,ve,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ce(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),G(b.depthTexture,0);let ae=n.get(b.depthTexture).__webglTexture,ue=O(b);if(b.depthTexture.format===ri)B(b)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ae,0);else if(b.depthTexture.format===Mi)B(b)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function pe(R){let b=n.get(R),z=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");ce(b.__webglFramebuffer,R)}else if(z){b.__webglDepthbuffer=[];for(let ae=0;ae<6;ae++)t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[ae]),b.__webglDepthbuffer[ae]=i.createRenderbuffer(),Q(b.__webglDepthbuffer[ae],R,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer=i.createRenderbuffer(),Q(b.__webglDepthbuffer,R,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function K(R,b,z){let ae=n.get(R);b!==void 0&&W(ae.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&pe(R)}function S(R){let b=R.texture,z=n.get(R),ae=n.get(b);R.addEventListener("dispose",P),R.isWebGLMultipleRenderTargets!==!0&&(ae.__webglTexture===void 0&&(ae.__webglTexture=i.createTexture()),ae.__version=b.version,s.memory.textures++);let ue=R.isWebGLCubeRenderTarget===!0,de=R.isWebGLMultipleRenderTargets===!0,Me=m(R)||a;if(ue){z.__webglFramebuffer=[];for(let ye=0;ye<6;ye++)if(a&&b.mipmaps&&b.mipmaps.length>0){z.__webglFramebuffer[ye]=[];for(let ve=0;ve<b.mipmaps.length;ve++)z.__webglFramebuffer[ye][ve]=i.createFramebuffer()}else z.__webglFramebuffer[ye]=i.createFramebuffer()}else{if(a&&b.mipmaps&&b.mipmaps.length>0){z.__webglFramebuffer=[];for(let ye=0;ye<b.mipmaps.length;ye++)z.__webglFramebuffer[ye]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(de)if(r.drawBuffers){let ye=R.texture;for(let ve=0,_e=ye.length;ve<_e;ve++){let Ee=n.get(ye[ve]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=i.createTexture(),s.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&R.samples>0&&B(R)===!1){let ye=de?b:[b];z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ve=0;ve<ye.length;ve++){let _e=ye[ve];z.__webglColorRenderbuffer[ve]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[ve]);let Ee=o.convert(_e.format,_e.colorSpace),se=o.convert(_e.type),Ue=T(_e.internalFormat,Ee,se,_e.colorSpace,R.isXRRenderTarget===!0),Se=O(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Se,Ue,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,z.__webglColorRenderbuffer[ve])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Q(z.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ue){t.bindTexture(i.TEXTURE_CUBE_MAP,ae.__webglTexture),H(i.TEXTURE_CUBE_MAP,b,Me);for(let ye=0;ye<6;ye++)if(a&&b.mipmaps&&b.mipmaps.length>0)for(let ve=0;ve<b.mipmaps.length;ve++)W(z.__webglFramebuffer[ye][ve],R,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,ve);else W(z.__webglFramebuffer[ye],R,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0);v(b,Me)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){let ye=R.texture;for(let ve=0,_e=ye.length;ve<_e;ve++){let Ee=ye[ve],se=n.get(Ee);t.bindTexture(i.TEXTURE_2D,se.__webglTexture),H(i.TEXTURE_2D,Ee,Me),W(z.__webglFramebuffer,R,Ee,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,0),v(Ee,Me)&&_(i.TEXTURE_2D)}t.unbindTexture()}else{let ye=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(a?ye=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ye,ae.__webglTexture),H(ye,b,Me),a&&b.mipmaps&&b.mipmaps.length>0)for(let ve=0;ve<b.mipmaps.length;ve++)W(z.__webglFramebuffer[ve],R,b,i.COLOR_ATTACHMENT0,ye,ve);else W(z.__webglFramebuffer,R,b,i.COLOR_ATTACHMENT0,ye,0);v(b,Me)&&_(ye),t.unbindTexture()}R.depthBuffer&&pe(R)}function Z(R){let b=m(R)||a,z=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let ae=0,ue=z.length;ae<ue;ae++){let de=z[ae];if(v(de,b)){let Me=R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ye=n.get(de).__webglTexture;t.bindTexture(Me,ye),_(Me),t.unbindTexture()}}}function U(R){if(a&&R.samples>0&&B(R)===!1){let b=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],z=R.width,ae=R.height,ue=i.COLOR_BUFFER_BIT,de=[],Me=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=n.get(R),ve=R.isWebGLMultipleRenderTargets===!0;if(ve)for(let _e=0;_e<b.length;_e++)t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let _e=0;_e<b.length;_e++){de.push(i.COLOR_ATTACHMENT0+_e),R.depthBuffer&&de.push(Me);let Ee=ye.__ignoreDepthValues!==void 0?ye.__ignoreDepthValues:!1;if(Ee===!1&&(R.depthBuffer&&(ue|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&(ue|=i.STENCIL_BUFFER_BIT)),ve&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ye.__webglColorRenderbuffer[_e]),Ee===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[Me]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[Me])),ve){let se=n.get(b[_e]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,se,0)}i.blitFramebuffer(0,0,z,ae,0,0,z,ae,ue,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,de)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ve)for(let _e=0;_e<b.length;_e++){t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,ye.__webglColorRenderbuffer[_e]);let Ee=n.get(b[_e]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,Ee,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}}function O(R){return Math.min(r.maxSamples,R.samples)}function B(R){let b=n.get(R);return a&&R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function le(R){let b=s.render.frame;u.get(R)!==b&&(u.set(R,b),R.update())}function xe(R,b){let z=R.colorSpace,ae=R.format,ue=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===Gs||z!==ft&&z!==Zt&&(Ke.getTransfer(z)===at?a===!1?e.has("EXT_sRGB")===!0&&ae===Ht?(R.format=Gs,R.minFilter=Nt,R.generateMipmaps=!1):b=Co.sRGBToLinear(b):(ae!==Ht||ue!==Ln)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),b}this.allocateTextureUnit=I,this.resetTextureUnits=te,this.setTexture2D=G,this.setTexture2DArray=ee,this.setTexture3D=N,this.setTextureCube=X,this.rebindTextures=K,this.setupRenderTarget=S,this.updateRenderTargetMipmap=Z,this.updateMultisampleRenderTarget=U,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=W,this.useMultisampledRTT=B}function Fx(i,e,t){let n=t.isWebGL2;function r(o,s=Zt){let a,c=Ke.getTransfer(s);if(o===Ln)return i.UNSIGNED_BYTE;if(o===Ha)return i.UNSIGNED_SHORT_4_4_4_4;if(o===za)return i.UNSIGNED_SHORT_5_5_5_1;if(o===vp)return i.BYTE;if(o===Ep)return i.SHORT;if(o===vo)return i.UNSIGNED_SHORT;if(o===Oa)return i.INT;if(o===Pn)return i.UNSIGNED_INT;if(o===fn)return i.FLOAT;if(o===Hi)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(o===Mp)return i.ALPHA;if(o===Ht)return i.RGBA;if(o===bp)return i.LUMINANCE;if(o===Tp)return i.LUMINANCE_ALPHA;if(o===ri)return i.DEPTH_COMPONENT;if(o===Mi)return i.DEPTH_STENCIL;if(o===Gs)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(o===Sp)return i.RED;if(o===ka)return i.RED_INTEGER;if(o===Ap)return i.RG;if(o===Ga)return i.RG_INTEGER;if(o===Va)return i.RGBA_INTEGER;if(o===Wa||o===Xa||o===qa||o===Ya)if(c===at)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(o===Wa)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(o===Xa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(o===qa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(o===Ya)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(o===Wa)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(o===Xa)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(o===qa)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(o===Ya)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(o===xu||o===_u||o===yu||o===vu)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(o===xu)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(o===_u)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(o===yu)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(o===vu)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(o===ja)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(o===Eu||o===Mu)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(o===Eu)return c===at?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(o===Mu)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(o===bu||o===Tu||o===Su||o===Au||o===wu||o===Ru||o===Cu||o===Lu||o===Pu||o===Iu||o===Du||o===Uu||o===Nu||o===Bu)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(o===bu)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(o===Tu)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(o===Su)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(o===Au)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(o===wu)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(o===Ru)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(o===Cu)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(o===Lu)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(o===Pu)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(o===Iu)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(o===Du)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(o===Uu)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(o===Nu)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(o===Bu)return c===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(o===Ka||o===Fu||o===Ou)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(o===Ka)return c===at?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(o===Fu)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(o===Ou)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(o===wp||o===Hu||o===zu||o===ku)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(o===Ka)return a.COMPRESSED_RED_RGTC1_EXT;if(o===Hu)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(o===zu)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(o===ku)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return o===Vn?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[o]!==void 0?i[o]:null}return{convert:r}}var Bc=class extends ht{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}};var Tt=class extends We{constructor(){super(),this.isGroup=!0,this.type="Group"}};var SM={type:"move"},es=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,o=null,s=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&h>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&o!==null&&(r=o),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(SM)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Tt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var Fc=class extends vn{constructor(e,t){super();let n=this,r=null,o=1,s=null,a="local-floor",c=1,l=null,u=null,d=null,h=null,f=null,g=null,x=t.getContextAttributes(),m=null,p=null,v=[],_=[],T=new Ie,w=null,E=new ht;E.layers.enable(1),E.viewport=new it;let A=new ht;A.layers.enable(2),A.viewport=new it;let P=[E,A],y=new Bc;y.layers.enable(1),y.layers.enable(2);let M=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let $=v[H];return $===void 0&&($=new es,v[H]=$),$.getTargetRaySpace()},this.getControllerGrip=function(H){let $=v[H];return $===void 0&&($=new es,v[H]=$),$.getGripSpace()},this.getHand=function(H){let $=v[H];return $===void 0&&($=new es,v[H]=$),$.getHandSpace()};function V(H){let $=_.indexOf(H.inputSource);if($===-1)return;let me=v[$];me!==void 0&&(me.update(H.inputSource,H.frame,l||s),me.dispatchEvent({type:H.type,data:H.inputSource}))}function te(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",te),r.removeEventListener("inputsourceschange",I);for(let H=0;H<v.length;H++){let $=_[H];$!==null&&(_[H]=null,v[H].disconnect($))}M=null,D=null,e.setRenderTarget(m),f=null,h=null,d=null,r=null,p=null,fe.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){o=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){a=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(H){l=H},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(H){if(r=H,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",te),r.addEventListener("inputsourceschange",I),x.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(T),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let $={antialias:r.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:o};f=new XRWebGLLayer(r,t,$),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new En(f.framebufferWidth,f.framebufferHeight,{format:Ht,type:Ln,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let $=null,me=null,Y=null;x.depth&&(Y=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,$=x.stencil?Mi:ri,me=x.stencil?Vn:Pn);let W={colorFormat:t.RGBA8,depthFormat:Y,scaleFactor:o};d=new XRWebGLBinding(r,t),h=d.createProjectionLayer(W),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),p=new En(h.textureWidth,h.textureHeight,{format:Ht,type:Ln,depthTexture:new Zo(h.textureWidth,h.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});let Q=e.properties.get(p);Q.__ignoreDepthValues=h.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,s=await r.requestReferenceSpace(a),fe.setContext(r),fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function I(H){for(let $=0;$<H.removed.length;$++){let me=H.removed[$],Y=_.indexOf(me);Y>=0&&(_[Y]=null,v[Y].disconnect(me))}for(let $=0;$<H.added.length;$++){let me=H.added[$],Y=_.indexOf(me);if(Y===-1){for(let Q=0;Q<v.length;Q++)if(Q>=_.length){_.push(me),Y=Q;break}else if(_[Q]===null){_[Q]=me,Y=Q;break}if(Y===-1)break}let W=v[Y];W&&W.connect(me)}}let k=new L,G=new L;function ee(H,$,me){k.setFromMatrixPosition($.matrixWorld),G.setFromMatrixPosition(me.matrixWorld);let Y=k.distanceTo(G),W=$.projectionMatrix.elements,Q=me.projectionMatrix.elements,ce=W[14]/(W[10]-1),pe=W[14]/(W[10]+1),K=(W[9]+1)/W[5],S=(W[9]-1)/W[5],Z=(W[8]-1)/W[0],U=(Q[8]+1)/Q[0],O=ce*Z,B=ce*U,le=Y/(-Z+U),xe=le*-Z;$.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(xe),H.translateZ(le),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();let R=ce+le,b=pe+le,z=O-xe,ae=B+(Y-xe),ue=K*pe/b*R,de=S*pe/b*R;H.projectionMatrix.makePerspective(z,ae,ue,de,R,b),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function N(H,$){$===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices($.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(r===null)return;y.near=A.near=E.near=H.near,y.far=A.far=E.far=H.far,(M!==y.near||D!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),M=y.near,D=y.far);let $=H.parent,me=y.cameras;N(y,$);for(let Y=0;Y<me.length;Y++)N(me[Y],$);me.length===2?ee(y,E,A):y.projectionMatrix.copy(E.projectionMatrix),X(H,y,$)};function X(H,$,me){me===null?H.matrix.copy($.matrixWorld):(H.matrix.copy(me.matrixWorld),H.matrix.invert(),H.matrix.multiply($.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy($.projectionMatrix),H.projectionMatrixInverse.copy($.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Gi*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(h===null&&f===null))return c},this.setFoveation=function(H){c=H,h!==null&&(h.fixedFoveation=H),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=H)};let q=null;function J(H,$){if(u=$.getViewerPose(l||s),g=$,u!==null){let me=u.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let Y=!1;me.length!==y.cameras.length&&(y.cameras.length=0,Y=!0);for(let W=0;W<me.length;W++){let Q=me[W],ce=null;if(f!==null)ce=f.getViewport(Q);else{let K=d.getViewSubImage(h,Q);ce=K.viewport,W===0&&(e.setRenderTargetTextures(p,K.colorTexture,h.ignoreDepthValues?void 0:K.depthStencilTexture),e.setRenderTarget(p))}let pe=P[W];pe===void 0&&(pe=new ht,pe.layers.enable(W),pe.viewport=new it,P[W]=pe),pe.matrix.fromArray(Q.transform.matrix),pe.matrix.decompose(pe.position,pe.quaternion,pe.scale),pe.projectionMatrix.fromArray(Q.projectionMatrix),pe.projectionMatrixInverse.copy(pe.projectionMatrix).invert(),pe.viewport.set(ce.x,ce.y,ce.width,ce.height),W===0&&(y.matrix.copy(pe.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),Y===!0&&y.cameras.push(pe)}}for(let me=0;me<v.length;me++){let Y=_[me],W=v[me];Y!==null&&W!==void 0&&W.update(Y,$,l||s)}q&&q(H,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),g=null}let fe=new Cc;fe.setAnimationLoop(J),this.setAnimationLoop=function(H){q=H},this.dispose=function(){}}};function Ox(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Sc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,v,_,T){p.isMeshBasicMaterial||p.isMeshLambertMaterial?o(m,p):p.isMeshToonMaterial?(o(m,p),d(m,p)):p.isMeshPhongMaterial?(o(m,p),u(m,p)):p.isMeshStandardMaterial?(o(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,T)):p.isMeshMatcapMaterial?(o(m,p),g(m,p)):p.isMeshDepthMaterial?o(m,p):p.isMeshDistanceMaterial?(o(m,p),x(m,p)):p.isMeshNormalMaterial?o(m,p):p.isLineBasicMaterial?(s(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,v,_):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function o(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Mt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Mt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let v=e.get(p).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;let _=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*_,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function s(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=_*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Mt&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Hx(i,e,t,n){let r={},o={},s=[],a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(v,_){let T=_.program;n.uniformBlockBinding(v,T)}function l(v,_){let T=r[v.id];T===void 0&&(g(v),T=u(v),r[v.id]=T,v.addEventListener("dispose",m));let w=_.program;n.updateUBOMapping(v,w);let E=e.render.frame;o[v.id]!==E&&(h(v),o[v.id]=E)}function u(v){let _=d();v.__bindingPointIndex=_;let T=i.createBuffer(),w=v.__size,E=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,w,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,T),T}function d(){for(let v=0;v<a;v++)if(s.indexOf(v)===-1)return s.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){let _=r[v.id],T=v.uniforms,w=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let E=0,A=T.length;E<A;E++){let P=Array.isArray(T[E])?T[E]:[T[E]];for(let y=0,M=P.length;y<M;y++){let D=P[y];if(f(D,E,y,w)===!0){let V=D.__offset,te=Array.isArray(D.value)?D.value:[D.value],I=0;for(let k=0;k<te.length;k++){let G=te[k],ee=x(G);typeof G=="number"||typeof G=="boolean"?(D.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,V+I,D.__data)):G.isMatrix3?(D.__data[0]=G.elements[0],D.__data[1]=G.elements[1],D.__data[2]=G.elements[2],D.__data[3]=0,D.__data[4]=G.elements[3],D.__data[5]=G.elements[4],D.__data[6]=G.elements[5],D.__data[7]=0,D.__data[8]=G.elements[6],D.__data[9]=G.elements[7],D.__data[10]=G.elements[8],D.__data[11]=0):(G.toArray(D.__data,I),I+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,_,T,w){let E=v.value,A=_+"_"+T;if(w[A]===void 0)return typeof E=="number"||typeof E=="boolean"?w[A]=E:w[A]=E.clone(),!0;{let P=w[A];if(typeof E=="number"||typeof E=="boolean"){if(P!==E)return w[A]=E,!0}else if(P.equals(E)===!1)return P.copy(E),!0}return!1}function g(v){let _=v.uniforms,T=0,w=16;for(let A=0,P=_.length;A<P;A++){let y=Array.isArray(_[A])?_[A]:[_[A]];for(let M=0,D=y.length;M<D;M++){let V=y[M],te=Array.isArray(V.value)?V.value:[V.value];for(let I=0,k=te.length;I<k;I++){let G=te[I],ee=x(G),N=T%w;N!==0&&w-N<ee.boundary&&(T+=w-N),V.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=T,T+=ee.storage}}}let E=T%w;return E>0&&(T+=w-E),v.__size=T,v.__cache={},this}function x(v){let _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=48,_.storage=48):v.isMatrix4?(_.boundary=64,_.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),_}function m(v){let _=v.target;_.removeEventListener("dispose",m);let T=s.indexOf(_.__bindingPointIndex);s.splice(T,1),i.deleteBuffer(r[_.id]),delete r[_.id],delete o[_.id]}function p(){for(let v in r)i.deleteBuffer(r[v]);s=[],r={},o={}}return{bind:c,update:l,dispose:p}}var Ys=class{constructor(e={}){let{canvas:t=kp(),context:n=null,depth:r=!0,stencil:o=!0,alpha:s=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let h;n!==null?h=n.getContextAttributes().alpha:h=s;let f=new Uint32Array(4),g=new Int32Array(4),x=null,m=null,p=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=tt,this._useLegacyLights=!1,this.toneMapping=kn,this.toneMappingExposure=1;let _=this,T=!1,w=0,E=0,A=null,P=-1,y=null,M=new it,D=new it,V=null,te=new ge(0),I=0,k=t.width,G=t.height,ee=1,N=null,X=null,q=new it(0,0,k,G),J=new it(0,0,k,G),fe=!1,H=new Tr,$=!1,me=!1,Y=null,W=new De,Q=new Ie,ce=new L,pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function K(){return A===null?ee:1}let S=n;function Z(C,j){for(let ie=0;ie<C.length;ie++){let re=C[ie],ne=t.getContext(re,j);if(ne!==null)return ne}return null}try{let C={alpha:!0,depth:r,stencil:o,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"160"}`),t.addEventListener("webglcontextlost",Te,!1),t.addEventListener("webglcontextrestored",F,!1),t.addEventListener("webglcontextcreationerror",Ae,!1),S===null){let j=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&j.shift(),S=Z(j,C),S===null)throw Z(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&S instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),S.getShaderPrecisionFormat===void 0&&(S.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let U,O,B,le,xe,R,b,z,ae,ue,de,Me,ye,ve,_e,Ee,se,Ue,Se,Pe,Re,Ce,Oe,nt;function St(){U=new tx(S),O=new X0(S,U,e),U.init(O),Ce=new Fx(S,U,O),B=new Nx(S,U,O),le=new rx(S),xe=new Sx,R=new Bx(S,U,B,xe,O,Ce,le),b=new Y0(_),z=new ex(_),ae=new cm(S,O),Oe=new V0(S,U,ae,O),ue=new nx(S,ae,le,Oe),de=new sx(S,ue,ae,le),Se=new ox(S,O,R),Ee=new q0(xe),Me=new Tx(_,b,z,U,O,Oe,Ee),ye=new Ox(_,xe),ve=new Rx,_e=new Px(U,O),Ue=new G0(_,b,z,B,de,h,c),se=new Ux(_,de,O),nt=new Hx(S,le,O,B),Pe=new W0(S,U,le,O),Re=new ix(S,U,le,O),le.programs=Me.programs,_.capabilities=O,_.extensions=U,_.properties=xe,_.renderLists=ve,_.shadowMap=se,_.state=B,_.info=le}St();let je=new Fc(_,S);this.xr=je,this.getContext=function(){return S},this.getContextAttributes=function(){return S.getContextAttributes()},this.forceContextLoss=function(){let C=U.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){let C=U.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(C){C!==void 0&&(ee=C,this.setSize(k,G,!1))},this.getSize=function(C){return C.set(k,G)},this.setSize=function(C,j,ie=!0){if(je.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=C,G=j,t.width=Math.floor(C*ee),t.height=Math.floor(j*ee),ie===!0&&(t.style.width=C+"px",t.style.height=j+"px"),this.setViewport(0,0,C,j)},this.getDrawingBufferSize=function(C){return C.set(k*ee,G*ee).floor()},this.setDrawingBufferSize=function(C,j,ie){k=C,G=j,ee=ie,t.width=Math.floor(C*ie),t.height=Math.floor(j*ie),this.setViewport(0,0,C,j)},this.getCurrentViewport=function(C){return C.copy(M)},this.getViewport=function(C){return C.copy(q)},this.setViewport=function(C,j,ie,re){C.isVector4?q.set(C.x,C.y,C.z,C.w):q.set(C,j,ie,re),B.viewport(M.copy(q).multiplyScalar(ee).floor())},this.getScissor=function(C){return C.copy(J)},this.setScissor=function(C,j,ie,re){C.isVector4?J.set(C.x,C.y,C.z,C.w):J.set(C,j,ie,re),B.scissor(D.copy(J).multiplyScalar(ee).floor())},this.getScissorTest=function(){return fe},this.setScissorTest=function(C){B.setScissorTest(fe=C)},this.setOpaqueSort=function(C){N=C},this.setTransparentSort=function(C){X=C},this.getClearColor=function(C){return C.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor.apply(Ue,arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha.apply(Ue,arguments)},this.clear=function(C=!0,j=!0,ie=!0){let re=0;if(C){let ne=!1;if(A!==null){let Le=A.texture.format;ne=Le===Va||Le===Ga||Le===ka}if(ne){let Le=A.texture.type,Ne=Le===Ln||Le===Pn||Le===vo||Le===Vn||Le===Ha||Le===za,He=Ue.getClearColor(),Ge=Ue.getClearAlpha(),Je=He.r,Ve=He.g,qe=He.b;Ne?(f[0]=Je,f[1]=Ve,f[2]=qe,f[3]=Ge,S.clearBufferuiv(S.COLOR,0,f)):(g[0]=Je,g[1]=Ve,g[2]=qe,g[3]=Ge,S.clearBufferiv(S.COLOR,0,g))}else re|=S.COLOR_BUFFER_BIT}j&&(re|=S.DEPTH_BUFFER_BIT),ie&&(re|=S.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),S.clear(re)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Te,!1),t.removeEventListener("webglcontextrestored",F,!1),t.removeEventListener("webglcontextcreationerror",Ae,!1),ve.dispose(),_e.dispose(),xe.dispose(),b.dispose(),z.dispose(),de.dispose(),Oe.dispose(),nt.dispose(),Me.dispose(),je.dispose(),je.removeEventListener("sessionstart",dn),je.removeEventListener("sessionend",yt),Y&&(Y.dispose(),Y=null),hn.stop()};function Te(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function F(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let C=le.autoReset,j=se.enabled,ie=se.autoUpdate,re=se.needsUpdate,ne=se.type;St(),le.autoReset=C,se.enabled=j,se.autoUpdate=ie,se.needsUpdate=re,se.type=ne}function Ae(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function we(C){let j=C.target;j.removeEventListener("dispose",we),ze(j)}function ze(C){Be(C),xe.remove(C)}function Be(C){let j=xe.get(C).programs;j!==void 0&&(j.forEach(function(ie){Me.releaseProgram(ie)}),C.isShaderMaterial&&Me.releaseShaderCache(C))}this.renderBufferDirect=function(C,j,ie,re,ne,Le){j===null&&(j=pe);let Ne=ne.isMesh&&ne.matrixWorld.determinant()<0,He=lv(C,j,ie,re,ne);B.setMaterial(re,Ne);let Ge=ie.index,Je=1;if(re.wireframe===!0){if(Ge=ue.getWireframeAttribute(ie),Ge===void 0)return;Je=2}let Ve=ie.drawRange,qe=ie.attributes.position,Lt=Ve.start*Je,Cn=(Ve.start+Ve.count)*Je;Le!==null&&(Lt=Math.max(Lt,Le.start*Je),Cn=Math.min(Cn,(Le.start+Le.count)*Je)),Ge!==null?(Lt=Math.max(Lt,0),Cn=Math.min(Cn,Ge.count)):qe!=null&&(Lt=Math.max(Lt,0),Cn=Math.min(Cn,qe.count));let Kt=Cn-Lt;if(Kt<0||Kt===1/0)return;Oe.setup(ne,re,He,ie,Ge);let Ni,wt=Pe;if(Ge!==null&&(Ni=ae.get(Ge),wt=Re,wt.setIndex(Ni)),ne.isMesh)re.wireframe===!0?(B.setLineWidth(re.wireframeLinewidth*K()),wt.setMode(S.LINES)):wt.setMode(S.TRIANGLES);else if(ne.isLine){let Qe=re.linewidth;Qe===void 0&&(Qe=1),B.setLineWidth(Qe*K()),ne.isLineSegments?wt.setMode(S.LINES):ne.isLineLoop?wt.setMode(S.LINE_LOOP):wt.setMode(S.LINE_STRIP)}else ne.isPoints?wt.setMode(S.POINTS):ne.isSprite&&wt.setMode(S.TRIANGLES);if(ne.isBatchedMesh)wt.renderMultiDraw(ne._multiDrawStarts,ne._multiDrawCounts,ne._multiDrawCount);else if(ne.isInstancedMesh)wt.renderInstances(Lt,Kt,ne.count);else if(ie.isInstancedBufferGeometry){let Qe=ie._maxInstanceCount!==void 0?ie._maxInstanceCount:1/0,au=Math.min(ie.instanceCount,Qe);wt.renderInstances(Lt,Kt,au)}else wt.render(Lt,Kt)};function xt(C,j,ie){C.transparent===!0&&C.side===Pt&&C.forceSinglePass===!1?(C.side=Mt,C.needsUpdate=!0,Da(C,j,ie),C.side=$t,C.needsUpdate=!0,Da(C,j,ie),C.side=Pt):Da(C,j,ie)}this.compile=function(C,j,ie=null){ie===null&&(ie=C),m=_e.get(ie),m.init(),v.push(m),ie.traverseVisible(function(ne){ne.isLight&&ne.layers.test(j.layers)&&(m.pushLight(ne),ne.castShadow&&m.pushShadow(ne))}),C!==ie&&C.traverseVisible(function(ne){ne.isLight&&ne.layers.test(j.layers)&&(m.pushLight(ne),ne.castShadow&&m.pushShadow(ne))}),m.setupLights(_._useLegacyLights);let re=new Set;return C.traverse(function(ne){let Le=ne.material;if(Le)if(Array.isArray(Le))for(let Ne=0;Ne<Le.length;Ne++){let He=Le[Ne];xt(He,ie,ne),re.add(He)}else xt(Le,ie,ne),re.add(Le)}),v.pop(),m=null,re},this.compileAsync=function(C,j,ie=null){let re=this.compile(C,j,ie);return new Promise(ne=>{function Le(){if(re.forEach(function(Ne){xe.get(Ne).currentProgram.isReady()&&re.delete(Ne)}),re.size===0){ne(C);return}setTimeout(Le,10)}U.get("KHR_parallel_shader_compile")!==null?Le():setTimeout(Le,10)})};let _t=null;function jt(C){_t&&_t(C)}function dn(){hn.stop()}function yt(){hn.start()}let hn=new Cc;hn.setAnimationLoop(jt),typeof self<"u"&&hn.setContext(self),this.setAnimationLoop=function(C){_t=C,je.setAnimationLoop(C),C===null?hn.stop():hn.start()},je.addEventListener("sessionstart",dn),je.addEventListener("sessionend",yt),this.render=function(C,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),je.enabled===!0&&je.isPresenting===!0&&(je.cameraAutoUpdate===!0&&je.updateCamera(j),j=je.getCamera()),C.isScene===!0&&C.onBeforeRender(_,C,j,A),m=_e.get(C,v.length),m.init(),v.push(m),W.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),H.setFromProjectionMatrix(W),me=this.localClippingEnabled,$=Ee.init(this.clippingPlanes,me),x=ve.get(C,p.length),x.init(),p.push(x),vi(C,j,0,_.sortObjects),x.finish(),_.sortObjects===!0&&x.sort(N,X),this.info.render.frame++,$===!0&&Ee.beginShadows();let ie=m.state.shadowsArray;if(se.render(ie,C,j),$===!0&&Ee.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ue.render(x,C),m.setupLights(_._useLegacyLights),j.isArrayCamera){let re=j.cameras;for(let ne=0,Le=re.length;ne<Le;ne++){let Ne=re[ne];Uf(x,C,Ne,Ne.viewport)}}else Uf(x,C,j);A!==null&&(R.updateMultisampleRenderTarget(A),R.updateRenderTargetMipmap(A)),C.isScene===!0&&C.onAfterRender(_,C,j),Oe.resetDefaultState(),P=-1,y=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,p.pop(),p.length>0?x=p[p.length-1]:x=null};function vi(C,j,ie,re){if(C.visible===!1)return;if(C.layers.test(j.layers)){if(C.isGroup)ie=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(j);else if(C.isLight)m.pushLight(C),C.castShadow&&m.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||H.intersectsSprite(C)){re&&ce.setFromMatrixPosition(C.matrixWorld).applyMatrix4(W);let Ne=de.update(C),He=C.material;He.visible&&x.push(C,Ne,He,ie,ce.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||H.intersectsObject(C))){let Ne=de.update(C),He=C.material;if(re&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),ce.copy(C.boundingSphere.center)):(Ne.boundingSphere===null&&Ne.computeBoundingSphere(),ce.copy(Ne.boundingSphere.center)),ce.applyMatrix4(C.matrixWorld).applyMatrix4(W)),Array.isArray(He)){let Ge=Ne.groups;for(let Je=0,Ve=Ge.length;Je<Ve;Je++){let qe=Ge[Je],Lt=He[qe.materialIndex];Lt&&Lt.visible&&x.push(C,Ne,Lt,ie,ce.z,qe)}}else He.visible&&x.push(C,Ne,He,ie,ce.z,null)}}let Le=C.children;for(let Ne=0,He=Le.length;Ne<He;Ne++)vi(Le[Ne],j,ie,re)}function Uf(C,j,ie,re){let ne=C.opaque,Le=C.transmissive,Ne=C.transparent;m.setupLightsView(ie),$===!0&&Ee.setGlobalState(_.clippingPlanes,ie),Le.length>0&&cv(ne,Le,j,ie),re&&B.viewport(M.copy(re)),ne.length>0&&Ia(ne,j,ie),Le.length>0&&Ia(Le,j,ie),Ne.length>0&&Ia(Ne,j,ie),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function cv(C,j,ie,re){if((ie.isScene===!0?ie.overrideMaterial:null)!==null)return;let Le=O.isWebGL2;Y===null&&(Y=new En(1,1,{generateMipmaps:!0,type:U.has("EXT_color_buffer_half_float")?Hi:Ln,minFilter:Gn,samples:Le?4:0})),_.getDrawingBufferSize(Q),Le?Y.setSize(Q.x,Q.y):Y.setSize(wo(Q.x),wo(Q.y));let Ne=_.getRenderTarget();_.setRenderTarget(Y),_.getClearColor(te),I=_.getClearAlpha(),I<1&&_.setClearColor(16777215,.5),_.clear();let He=_.toneMapping;_.toneMapping=kn,Ia(C,ie,re),R.updateMultisampleRenderTarget(Y),R.updateRenderTargetMipmap(Y);let Ge=!1;for(let Je=0,Ve=j.length;Je<Ve;Je++){let qe=j[Je],Lt=qe.object,Cn=qe.geometry,Kt=qe.material,Ni=qe.group;if(Kt.side===Pt&&Lt.layers.test(re.layers)){let wt=Kt.side;Kt.side=Mt,Kt.needsUpdate=!0,Nf(Lt,ie,re,Cn,Kt,Ni),Kt.side=wt,Kt.needsUpdate=!0,Ge=!0}}Ge===!0&&(R.updateMultisampleRenderTarget(Y),R.updateRenderTargetMipmap(Y)),_.setRenderTarget(Ne),_.setClearColor(te,I),_.toneMapping=He}function Ia(C,j,ie){let re=j.isScene===!0?j.overrideMaterial:null;for(let ne=0,Le=C.length;ne<Le;ne++){let Ne=C[ne],He=Ne.object,Ge=Ne.geometry,Je=re===null?Ne.material:re,Ve=Ne.group;He.layers.test(ie.layers)&&Nf(He,j,ie,Ge,Je,Ve)}}function Nf(C,j,ie,re,ne,Le){C.onBeforeRender(_,j,ie,re,ne,Le),C.modelViewMatrix.multiplyMatrices(ie.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),ne.onBeforeRender(_,j,ie,re,C,Le),ne.transparent===!0&&ne.side===Pt&&ne.forceSinglePass===!1?(ne.side=Mt,ne.needsUpdate=!0,_.renderBufferDirect(ie,j,re,ne,C,Le),ne.side=$t,ne.needsUpdate=!0,_.renderBufferDirect(ie,j,re,ne,C,Le),ne.side=Pt):_.renderBufferDirect(ie,j,re,ne,C,Le),C.onAfterRender(_,j,ie,re,ne,Le)}function Da(C,j,ie){j.isScene!==!0&&(j=pe);let re=xe.get(C),ne=m.state.lights,Le=m.state.shadowsArray,Ne=ne.state.version,He=Me.getParameters(C,ne.state,Le,j,ie),Ge=Me.getProgramCacheKey(He),Je=re.programs;re.environment=C.isMeshStandardMaterial?j.environment:null,re.fog=j.fog,re.envMap=(C.isMeshStandardMaterial?z:b).get(C.envMap||re.environment),Je===void 0&&(C.addEventListener("dispose",we),Je=new Map,re.programs=Je);let Ve=Je.get(Ge);if(Ve!==void 0){if(re.currentProgram===Ve&&re.lightsStateVersion===Ne)return Ff(C,He),Ve}else He.uniforms=Me.getUniforms(C),C.onBuild(ie,He,_),C.onBeforeCompile(He,_),Ve=Me.acquireProgram(He,Ge),Je.set(Ge,Ve),re.uniforms=He.uniforms;let qe=re.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(qe.clippingPlanes=Ee.uniform),Ff(C,He),re.needsLights=dv(C),re.lightsStateVersion=Ne,re.needsLights&&(qe.ambientLightColor.value=ne.state.ambient,qe.lightProbe.value=ne.state.probe,qe.directionalLights.value=ne.state.directional,qe.directionalLightShadows.value=ne.state.directionalShadow,qe.spotLights.value=ne.state.spot,qe.spotLightShadows.value=ne.state.spotShadow,qe.rectAreaLights.value=ne.state.rectArea,qe.ltc_1.value=ne.state.rectAreaLTC1,qe.ltc_2.value=ne.state.rectAreaLTC2,qe.pointLights.value=ne.state.point,qe.pointLightShadows.value=ne.state.pointShadow,qe.hemisphereLights.value=ne.state.hemi,qe.directionalShadowMap.value=ne.state.directionalShadowMap,qe.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,qe.spotShadowMap.value=ne.state.spotShadowMap,qe.spotLightMatrix.value=ne.state.spotLightMatrix,qe.spotLightMap.value=ne.state.spotLightMap,qe.pointShadowMap.value=ne.state.pointShadowMap,qe.pointShadowMatrix.value=ne.state.pointShadowMatrix),re.currentProgram=Ve,re.uniformsList=null,Ve}function Bf(C){if(C.uniformsList===null){let j=C.currentProgram.getUniforms();C.uniformsList=Ar.seqWithValue(j.seq,C.uniforms)}return C.uniformsList}function Ff(C,j){let ie=xe.get(C);ie.outputColorSpace=j.outputColorSpace,ie.batching=j.batching,ie.instancing=j.instancing,ie.instancingColor=j.instancingColor,ie.skinning=j.skinning,ie.morphTargets=j.morphTargets,ie.morphNormals=j.morphNormals,ie.morphColors=j.morphColors,ie.morphTargetsCount=j.morphTargetsCount,ie.numClippingPlanes=j.numClippingPlanes,ie.numIntersection=j.numClipIntersection,ie.vertexAlphas=j.vertexAlphas,ie.vertexTangents=j.vertexTangents,ie.toneMapping=j.toneMapping}function lv(C,j,ie,re,ne){j.isScene!==!0&&(j=pe),R.resetTextureUnits();let Le=j.fog,Ne=re.isMeshStandardMaterial?j.environment:null,He=A===null?_.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:ft,Ge=(re.isMeshStandardMaterial?z:b).get(re.envMap||Ne),Je=re.vertexColors===!0&&!!ie.attributes.color&&ie.attributes.color.itemSize===4,Ve=!!ie.attributes.tangent&&(!!re.normalMap||re.anisotropy>0),qe=!!ie.morphAttributes.position,Lt=!!ie.morphAttributes.normal,Cn=!!ie.morphAttributes.color,Kt=kn;re.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Kt=_.toneMapping);let Ni=ie.morphAttributes.position||ie.morphAttributes.normal||ie.morphAttributes.color,wt=Ni!==void 0?Ni.length:0,Qe=xe.get(re),au=m.state.lights;if($===!0&&(me===!0||C!==y)){let Hn=C===y&&re.id===P;Ee.setState(re,C,Hn)}let Rt=!1;re.version===Qe.__version?(Qe.needsLights&&Qe.lightsStateVersion!==au.state.version||Qe.outputColorSpace!==He||ne.isBatchedMesh&&Qe.batching===!1||!ne.isBatchedMesh&&Qe.batching===!0||ne.isInstancedMesh&&Qe.instancing===!1||!ne.isInstancedMesh&&Qe.instancing===!0||ne.isSkinnedMesh&&Qe.skinning===!1||!ne.isSkinnedMesh&&Qe.skinning===!0||ne.isInstancedMesh&&Qe.instancingColor===!0&&ne.instanceColor===null||ne.isInstancedMesh&&Qe.instancingColor===!1&&ne.instanceColor!==null||Qe.envMap!==Ge||re.fog===!0&&Qe.fog!==Le||Qe.numClippingPlanes!==void 0&&(Qe.numClippingPlanes!==Ee.numPlanes||Qe.numIntersection!==Ee.numIntersection)||Qe.vertexAlphas!==Je||Qe.vertexTangents!==Ve||Qe.morphTargets!==qe||Qe.morphNormals!==Lt||Qe.morphColors!==Cn||Qe.toneMapping!==Kt||O.isWebGL2===!0&&Qe.morphTargetsCount!==wt)&&(Rt=!0):(Rt=!0,Qe.__version=re.version);let zr=Qe.currentProgram;Rt===!0&&(zr=Da(re,j,ne));let Of=!1,Is=!1,cu=!1,rn=zr.getUniforms(),kr=Qe.uniforms;if(B.useProgram(zr.program)&&(Of=!0,Is=!0,cu=!0),re.id!==P&&(P=re.id,Is=!0),Of||y!==C){rn.setValue(S,"projectionMatrix",C.projectionMatrix),rn.setValue(S,"viewMatrix",C.matrixWorldInverse);let Hn=rn.map.cameraPosition;Hn!==void 0&&Hn.setValue(S,ce.setFromMatrixPosition(C.matrixWorld)),O.logarithmicDepthBuffer&&rn.setValue(S,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(re.isMeshPhongMaterial||re.isMeshToonMaterial||re.isMeshLambertMaterial||re.isMeshBasicMaterial||re.isMeshStandardMaterial||re.isShaderMaterial)&&rn.setValue(S,"isOrthographic",C.isOrthographicCamera===!0),y!==C&&(y=C,Is=!0,cu=!0)}if(ne.isSkinnedMesh){rn.setOptional(S,ne,"bindMatrix"),rn.setOptional(S,ne,"bindMatrixInverse");let Hn=ne.skeleton;Hn&&(O.floatVertexTextures?(Hn.boneTexture===null&&Hn.computeBoneTexture(),rn.setValue(S,"boneTexture",Hn.boneTexture,R)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}ne.isBatchedMesh&&(rn.setOptional(S,ne,"batchingTexture"),rn.setValue(S,"batchingTexture",ne._matricesTexture,R));let lu=ie.morphAttributes;if((lu.position!==void 0||lu.normal!==void 0||lu.color!==void 0&&O.isWebGL2===!0)&&Se.update(ne,ie,zr),(Is||Qe.receiveShadow!==ne.receiveShadow)&&(Qe.receiveShadow=ne.receiveShadow,rn.setValue(S,"receiveShadow",ne.receiveShadow)),re.isMeshGouraudMaterial&&re.envMap!==null&&(kr.envMap.value=Ge,kr.flipEnvMap.value=Ge.isCubeTexture&&Ge.isRenderTargetTexture===!1?-1:1),Is&&(rn.setValue(S,"toneMappingExposure",_.toneMappingExposure),Qe.needsLights&&uv(kr,cu),Le&&re.fog===!0&&ye.refreshFogUniforms(kr,Le),ye.refreshMaterialUniforms(kr,re,ee,G,Y),Ar.upload(S,Bf(Qe),kr,R)),re.isShaderMaterial&&re.uniformsNeedUpdate===!0&&(Ar.upload(S,Bf(Qe),kr,R),re.uniformsNeedUpdate=!1),re.isSpriteMaterial&&rn.setValue(S,"center",ne.center),rn.setValue(S,"modelViewMatrix",ne.modelViewMatrix),rn.setValue(S,"normalMatrix",ne.normalMatrix),rn.setValue(S,"modelMatrix",ne.matrixWorld),re.isShaderMaterial||re.isRawShaderMaterial){let Hn=re.uniformsGroups;for(let uu=0,hv=Hn.length;uu<hv;uu++)if(O.isWebGL2){let Hf=Hn[uu];nt.update(Hf,zr),nt.bind(Hf,zr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return zr}function uv(C,j){C.ambientLightColor.needsUpdate=j,C.lightProbe.needsUpdate=j,C.directionalLights.needsUpdate=j,C.directionalLightShadows.needsUpdate=j,C.pointLights.needsUpdate=j,C.pointLightShadows.needsUpdate=j,C.spotLights.needsUpdate=j,C.spotLightShadows.needsUpdate=j,C.rectAreaLights.needsUpdate=j,C.hemisphereLights.needsUpdate=j}function dv(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(C,j,ie){xe.get(C.texture).__webglTexture=j,xe.get(C.depthTexture).__webglTexture=ie;let re=xe.get(C);re.__hasExternalTextures=!0,re.__hasExternalTextures&&(re.__autoAllocateDepthBuffer=ie===void 0,re.__autoAllocateDepthBuffer||U.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),re.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(C,j){let ie=xe.get(C);ie.__webglFramebuffer=j,ie.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(C,j=0,ie=0){A=C,w=j,E=ie;let re=!0,ne=null,Le=!1,Ne=!1;if(C){let Ge=xe.get(C);Ge.__useDefaultFramebuffer!==void 0?(B.bindFramebuffer(S.FRAMEBUFFER,null),re=!1):Ge.__webglFramebuffer===void 0?R.setupRenderTarget(C):Ge.__hasExternalTextures&&R.rebindTextures(C,xe.get(C.texture).__webglTexture,xe.get(C.depthTexture).__webglTexture);let Je=C.texture;(Je.isData3DTexture||Je.isDataArrayTexture||Je.isCompressedArrayTexture)&&(Ne=!0);let Ve=xe.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ve[j])?ne=Ve[j][ie]:ne=Ve[j],Le=!0):O.isWebGL2&&C.samples>0&&R.useMultisampledRTT(C)===!1?ne=xe.get(C).__webglMultisampledFramebuffer:Array.isArray(Ve)?ne=Ve[ie]:ne=Ve,M.copy(C.viewport),D.copy(C.scissor),V=C.scissorTest}else M.copy(q).multiplyScalar(ee).floor(),D.copy(J).multiplyScalar(ee).floor(),V=fe;if(B.bindFramebuffer(S.FRAMEBUFFER,ne)&&O.drawBuffers&&re&&B.drawBuffers(C,ne),B.viewport(M),B.scissor(D),B.setScissorTest(V),Le){let Ge=xe.get(C.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ge.__webglTexture,ie)}else if(Ne){let Ge=xe.get(C.texture),Je=j||0;S.framebufferTextureLayer(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,Ge.__webglTexture,ie||0,Je)}P=-1},this.readRenderTargetPixels=function(C,j,ie,re,ne,Le,Ne){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let He=xe.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ne!==void 0&&(He=He[Ne]),He){B.bindFramebuffer(S.FRAMEBUFFER,He);try{let Ge=C.texture,Je=Ge.format,Ve=Ge.type;if(Je!==Ht&&Ce.convert(Je)!==S.getParameter(S.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let qe=Ve===Hi&&(U.has("EXT_color_buffer_half_float")||O.isWebGL2&&U.has("EXT_color_buffer_float"));if(Ve!==Ln&&Ce.convert(Ve)!==S.getParameter(S.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ve===fn&&(O.isWebGL2||U.has("OES_texture_float")||U.has("WEBGL_color_buffer_float")))&&!qe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=C.width-re&&ie>=0&&ie<=C.height-ne&&S.readPixels(j,ie,re,ne,Ce.convert(Je),Ce.convert(Ve),Le)}finally{let Ge=A!==null?xe.get(A).__webglFramebuffer:null;B.bindFramebuffer(S.FRAMEBUFFER,Ge)}}},this.copyFramebufferToTexture=function(C,j,ie=0){let re=Math.pow(2,-ie),ne=Math.floor(j.image.width*re),Le=Math.floor(j.image.height*re);R.setTexture2D(j,0),S.copyTexSubImage2D(S.TEXTURE_2D,ie,0,0,C.x,C.y,ne,Le),B.unbindTexture()},this.copyTextureToTexture=function(C,j,ie,re=0){let ne=j.image.width,Le=j.image.height,Ne=Ce.convert(ie.format),He=Ce.convert(ie.type);R.setTexture2D(ie,0),S.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,ie.flipY),S.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ie.premultiplyAlpha),S.pixelStorei(S.UNPACK_ALIGNMENT,ie.unpackAlignment),j.isDataTexture?S.texSubImage2D(S.TEXTURE_2D,re,C.x,C.y,ne,Le,Ne,He,j.image.data):j.isCompressedTexture?S.compressedTexSubImage2D(S.TEXTURE_2D,re,C.x,C.y,j.mipmaps[0].width,j.mipmaps[0].height,Ne,j.mipmaps[0].data):S.texSubImage2D(S.TEXTURE_2D,re,C.x,C.y,Ne,He,j.image),re===0&&ie.generateMipmaps&&S.generateMipmap(S.TEXTURE_2D),B.unbindTexture()},this.copyTextureToTexture3D=function(C,j,ie,re,ne=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Le=C.max.x-C.min.x+1,Ne=C.max.y-C.min.y+1,He=C.max.z-C.min.z+1,Ge=Ce.convert(re.format),Je=Ce.convert(re.type),Ve;if(re.isData3DTexture)R.setTexture3D(re,0),Ve=S.TEXTURE_3D;else if(re.isDataArrayTexture||re.isCompressedArrayTexture)R.setTexture2DArray(re,0),Ve=S.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}S.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,re.flipY),S.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,re.premultiplyAlpha),S.pixelStorei(S.UNPACK_ALIGNMENT,re.unpackAlignment);let qe=S.getParameter(S.UNPACK_ROW_LENGTH),Lt=S.getParameter(S.UNPACK_IMAGE_HEIGHT),Cn=S.getParameter(S.UNPACK_SKIP_PIXELS),Kt=S.getParameter(S.UNPACK_SKIP_ROWS),Ni=S.getParameter(S.UNPACK_SKIP_IMAGES),wt=ie.isCompressedTexture?ie.mipmaps[ne]:ie.image;S.pixelStorei(S.UNPACK_ROW_LENGTH,wt.width),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,wt.height),S.pixelStorei(S.UNPACK_SKIP_PIXELS,C.min.x),S.pixelStorei(S.UNPACK_SKIP_ROWS,C.min.y),S.pixelStorei(S.UNPACK_SKIP_IMAGES,C.min.z),ie.isDataTexture||ie.isData3DTexture?S.texSubImage3D(Ve,ne,j.x,j.y,j.z,Le,Ne,He,Ge,Je,wt.data):ie.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),S.compressedTexSubImage3D(Ve,ne,j.x,j.y,j.z,Le,Ne,He,Ge,wt.data)):S.texSubImage3D(Ve,ne,j.x,j.y,j.z,Le,Ne,He,Ge,Je,wt),S.pixelStorei(S.UNPACK_ROW_LENGTH,qe),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,Lt),S.pixelStorei(S.UNPACK_SKIP_PIXELS,Cn),S.pixelStorei(S.UNPACK_SKIP_ROWS,Kt),S.pixelStorei(S.UNPACK_SKIP_IMAGES,Ni),ne===0&&re.generateMipmaps&&S.generateMipmap(Ve),B.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?R.setTextureCube(C,0):C.isData3DTexture?R.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?R.setTexture2DArray(C,0):R.setTexture2D(C,0),B.unbindTexture()},this.resetState=function(){w=0,E=0,A=null,B.reset(),Oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===Mo?"display-p3":"srgb",t.unpackColorSpace=Ke.workingColorSpace===Vr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===tt?oi:Za}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===oi?tt:ft}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}};var js=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ge(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Qr=class extends We{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}};var eo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ks,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=zt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,o=this.stride;r<o;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}};var pn=new L,to=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)pn.fromBufferAttribute(this,t),pn.applyMatrix4(e),this.setXYZ(t,pn.x,pn.y,pn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)pn.fromBufferAttribute(this,t),pn.applyNormalMatrix(e),this.setXYZ(t,pn.x,pn.y,pn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)pn.fromBufferAttribute(this,t),pn.transformDirection(e),this.setXYZ(t,pn.x,pn.y,pn.z);return this}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Wn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Wn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Wn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Wn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),r=ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,o){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),r=ct(r,this.array),o=ct(o,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=o,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return new Ye(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var zx=new L,kx=new it,Gx=new it,AM=new L,Vx=new De,Oc=new L,bd=new At,Wx=new De,Td=new Xn,Ks=class extends ke{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=mu,this.bindMatrix=new De,this.bindMatrixInverse=new De,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ut),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Oc),this.boundingBox.expandByPoint(Oc)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new At),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Oc),this.boundingSphere.expandByPoint(Oc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),bd.copy(this.boundingSphere),bd.applyMatrix4(r),e.ray.intersectsSphere(bd)!==!1&&(Wx.copy(r).invert(),Td.copy(e.ray).applyMatrix4(Wx),!(this.boundingBox!==null&&Td.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Td)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new it,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let o=1/e.manhattanLength();o!==1/0?e.multiplyScalar(o):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===mu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===yp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;kx.fromBufferAttribute(r.attributes.skinIndex,e),Gx.fromBufferAttribute(r.attributes.skinWeight,e),zx.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let o=0;o<4;o++){let s=Gx.getComponent(o);if(s!==0){let a=kx.getComponent(o);Vx.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(AM.copy(zx).applyMatrix4(Vx),s)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}};var no=class extends We{constructor(){super(),this.isBone=!0,this.type="Bone"}};var Hc=class extends pt{constructor(e=null,t=1,n=1,r,o,s,a,c,l=bt,u=bt,d,h){super(null,s,a,c,l,u,r,o,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Xx=new De,wM=new De,$s=class i{constructor(e=[],t=[]){this.uuid=zt(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new De)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new De;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let o=0,s=e.length;o<s;o++){let a=e[o]?e[o].matrixWorld:wM;Xx.multiplyMatrices(a,t[o]),Xx.toArray(n,o*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Hc(t,e,e,Ht,fn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let o=e.bones[n],s=t[o];s===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",o),s=new no),this.bones.push(s),this.boneInverses.push(new De().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,o=t.length;r<o;r++){let s=t[r];e.bones.push(s.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}};var bi=class extends Ye{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}};var ts=new De,qx=new De,zc=[],Yx=new ut,RM=new De,Zs=new ke,Js=new At,io=class extends ke{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new bi(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,RM)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ut),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ts),Yx.copy(e.boundingBox).applyMatrix4(ts),this.boundingBox.union(Yx)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new At),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ts),Js.copy(e.boundingSphere).applyMatrix4(ts),this.boundingSphere.union(Js)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Zs.geometry=this.geometry,Zs.material=this.material,Zs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Js.copy(this.boundingSphere),Js.applyMatrix4(n),e.ray.intersectsSphere(Js)!==!1))for(let o=0;o<r;o++){this.getMatrixAt(o,ts),qx.multiplyMatrices(n,ts),Zs.matrixWorld=qx,Zs.raycast(e,zc);for(let s=0,a=zc.length;s<a;s++){let c=zc[s];c.instanceId=o,c.object=this,t.push(c)}zc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new bi(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var ui=class extends It{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}};var jx=new L,Kx=new L,$x=new De,Sd=new Xn,kc=new At,Zi=class extends We{constructor(e=new Ze,t=new ui){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,o=t.count;r<o;r++)jx.fromBufferAttribute(t,r-1),Kx.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=jx.distanceTo(Kx);e.setAttribute("lineDistance",new $e(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,o=e.params.Line.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),kc.copy(n.boundingSphere),kc.applyMatrix4(r),kc.radius+=o,e.ray.intersectsSphere(kc)===!1)return;$x.copy(r).invert(),Sd.copy(e.ray).applyMatrix4($x);let a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new L,u=new L,d=new L,h=new L,f=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){let p=Math.max(0,s.start),v=Math.min(g.count,s.start+s.count);for(let _=p,T=v-1;_<T;_+=f){let w=g.getX(_),E=g.getX(_+1);if(l.fromBufferAttribute(m,w),u.fromBufferAttribute(m,E),Sd.distanceSqToSegment(l,u,h,d)>c)continue;h.applyMatrix4(this.matrixWorld);let P=e.ray.origin.distanceTo(h);P<e.near||P>e.far||t.push({distance:P,point:d.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{let p=Math.max(0,s.start),v=Math.min(m.count,s.start+s.count);for(let _=p,T=v-1;_<T;_+=f){if(l.fromBufferAttribute(m,_),u.fromBufferAttribute(m,_+1),Sd.distanceSqToSegment(l,u,h,d)>c)continue;h.applyMatrix4(this.matrixWorld);let E=e.ray.origin.distanceTo(h);E<e.near||E>e.far||t.push({distance:E,point:d.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){let a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}};var Zx=new L,Jx=new L,Ji=class extends Zi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,o=t.count;r<o;r+=2)Zx.fromBufferAttribute(t,r),Jx.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Zx.distanceTo(Jx);e.setAttribute("lineDistance",new $e(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Qs=class extends Zi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}};var Qi=class extends It{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ge(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}};var Qx=new De,Ad=new Xn,Gc=new At,Vc=new L,wr=class extends We{constructor(e=new Ze,t=new Qi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,o=e.params.Points.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gc.copy(n.boundingSphere),Gc.applyMatrix4(r),Gc.radius+=o,e.ray.intersectsSphere(Gc)===!1)return;Qx.copy(r).invert(),Ad.copy(e.ray).applyMatrix4(Qx);let a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,d=n.attributes.position;if(l!==null){let h=Math.max(0,s.start),f=Math.min(l.count,s.start+s.count);for(let g=h,x=f;g<x;g++){let m=l.getX(g);Vc.fromBufferAttribute(d,m),e_(Vc,m,c,r,e,t,this)}}else{let h=Math.max(0,s.start),f=Math.min(d.count,s.start+s.count);for(let g=h,x=f;g<x;g++)Vc.fromBufferAttribute(d,g),e_(Vc,g,c,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){let a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}};function e_(i,e,t,n,r,o,s){let a=Ad.distanceSqToPoint(i);if(a<t){let c=new L;Ad.closestPointToPoint(i,c),c.applyMatrix4(n);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;o.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:s})}}var ro=class extends pt{constructor(e,t,n,r,o,s,a,c,l){super(e,t,n,r,o,s,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ea=class i extends Ze{constructor(e=1,t=1,n=1,r=32,o=1,s=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:o,openEnded:s,thetaStart:a,thetaLength:c};let l=this;r=Math.floor(r),o=Math.floor(o);let u=[],d=[],h=[],f=[],g=0,x=[],m=n/2,p=0;v(),s===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new $e(d,3)),this.setAttribute("normal",new $e(h,3)),this.setAttribute("uv",new $e(f,2));function v(){let T=new L,w=new L,E=0,A=(t-e)/n;for(let P=0;P<=o;P++){let y=[],M=P/o,D=M*(t-e)+e;for(let V=0;V<=r;V++){let te=V/r,I=te*c+a,k=Math.sin(I),G=Math.cos(I);w.x=D*k,w.y=-M*n+m,w.z=D*G,d.push(w.x,w.y,w.z),T.set(k,A,G).normalize(),h.push(T.x,T.y,T.z),f.push(te,1-M),y.push(g++)}x.push(y)}for(let P=0;P<r;P++)for(let y=0;y<o;y++){let M=x[y][P],D=x[y+1][P],V=x[y+1][P+1],te=x[y][P+1];u.push(M,D,te),u.push(D,V,te),E+=6}l.addGroup(p,E,0),p+=E}function _(T){let w=g,E=new Ie,A=new L,P=0,y=T===!0?e:t,M=T===!0?1:-1;for(let V=1;V<=r;V++)d.push(0,m*M,0),h.push(0,M,0),f.push(.5,.5),g++;let D=g;for(let V=0;V<=r;V++){let I=V/r*c+a,k=Math.cos(I),G=Math.sin(I);A.x=y*G,A.y=m*M,A.z=y*k,d.push(A.x,A.y,A.z),h.push(0,M,0),E.x=k*.5+.5,E.y=G*.5*M+.5,f.push(E.x,E.y),g++}for(let V=0;V<r;V++){let te=w+V,I=D+V;T===!0?u.push(I,I+1,te):u.push(I+1,I,te),P+=3}l.addGroup(p,P,T===!0?1:2),p+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Wc=class i extends Ze{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let o=[],s=[];a(r),l(n),u(),this.setAttribute("position",new $e(o,3)),this.setAttribute("normal",new $e(o.slice(),3)),this.setAttribute("uv",new $e(s,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let _=new L,T=new L,w=new L;for(let E=0;E<t.length;E+=3)f(t[E+0],_),f(t[E+1],T),f(t[E+2],w),c(_,T,w,v)}function c(v,_,T,w){let E=w+1,A=[];for(let P=0;P<=E;P++){A[P]=[];let y=v.clone().lerp(T,P/E),M=_.clone().lerp(T,P/E),D=E-P;for(let V=0;V<=D;V++)V===0&&P===E?A[P][V]=y:A[P][V]=y.clone().lerp(M,V/D)}for(let P=0;P<E;P++)for(let y=0;y<2*(E-P)-1;y++){let M=Math.floor(y/2);y%2===0?(h(A[P][M+1]),h(A[P+1][M]),h(A[P][M])):(h(A[P][M+1]),h(A[P+1][M+1]),h(A[P+1][M]))}}function l(v){let _=new L;for(let T=0;T<o.length;T+=3)_.x=o[T+0],_.y=o[T+1],_.z=o[T+2],_.normalize().multiplyScalar(v),o[T+0]=_.x,o[T+1]=_.y,o[T+2]=_.z}function u(){let v=new L;for(let _=0;_<o.length;_+=3){v.x=o[_+0],v.y=o[_+1],v.z=o[_+2];let T=m(v)/2/Math.PI+.5,w=p(v)/Math.PI+.5;s.push(T,1-w)}g(),d()}function d(){for(let v=0;v<s.length;v+=6){let _=s[v+0],T=s[v+2],w=s[v+4],E=Math.max(_,T,w),A=Math.min(_,T,w);E>.9&&A<.1&&(_<.2&&(s[v+0]+=1),T<.2&&(s[v+2]+=1),w<.2&&(s[v+4]+=1))}}function h(v){o.push(v.x,v.y,v.z)}function f(v,_){let T=v*3;_.x=e[T+0],_.y=e[T+1],_.z=e[T+2]}function g(){let v=new L,_=new L,T=new L,w=new L,E=new Ie,A=new Ie,P=new Ie;for(let y=0,M=0;y<o.length;y+=9,M+=6){v.set(o[y+0],o[y+1],o[y+2]),_.set(o[y+3],o[y+4],o[y+5]),T.set(o[y+6],o[y+7],o[y+8]),E.set(s[M+0],s[M+1]),A.set(s[M+2],s[M+3]),P.set(s[M+4],s[M+5]),w.copy(v).add(_).add(T).divideScalar(3);let D=m(w);x(E,M+0,v,D),x(A,M+2,_,D),x(P,M+4,T,D)}}function x(v,_,T,w){w<0&&v.x===1&&(s[_]=v.x-1),T.x===0&&T.z===0&&(s[_]=w/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}};var Xc=new L,qc=new L,wd=new L,Yc=new ji,ns=class extends Ze{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),o=Math.cos(fr*t),s=e.getIndex(),a=e.getAttribute("position"),c=s?s.count:a.count,l=[0,0,0],u=["a","b","c"],d=new Array(3),h={},f=[];for(let g=0;g<c;g+=3){s?(l[0]=s.getX(g),l[1]=s.getX(g+1),l[2]=s.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:x,b:m,c:p}=Yc;if(x.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),p.fromBufferAttribute(a,l[2]),Yc.getNormal(wd),d[0]=`${Math.round(x.x*r)},${Math.round(x.y*r)},${Math.round(x.z*r)}`,d[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,d[2]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let v=0;v<3;v++){let _=(v+1)%3,T=d[v],w=d[_],E=Yc[u[v]],A=Yc[u[_]],P=`${T}_${w}`,y=`${w}_${T}`;y in h&&h[y]?(wd.dot(h[y].normal)<=o&&(f.push(E.x,E.y,E.z),f.push(A.x,A.y,A.z)),h[y]=null):P in h||(h[P]={index0:l[v],index1:l[_],normal:wd.clone()})}}for(let g in h)if(h[g]){let{index0:x,index1:m}=h[g];Xc.fromBufferAttribute(a,x),qc.fromBufferAttribute(a,m),f.push(Xc.x,Xc.y,Xc.z),f.push(qc.x,qc.y,qc.z)}this.setAttribute("position",new $e(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};var ta=class i extends Wc{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],o=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,o,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var jc=class i extends Ze{constructor(e=.5,t=1,n=32,r=1,o=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:o,thetaLength:s},n=Math.max(3,n),r=Math.max(1,r);let a=[],c=[],l=[],u=[],d=e,h=(t-e)/r,f=new L,g=new Ie;for(let x=0;x<=r;x++){for(let m=0;m<=n;m++){let p=o+m/n*s;f.x=d*Math.cos(p),f.y=d*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}d+=h}for(let x=0;x<r;x++){let m=x*(n+1);for(let p=0;p<n;p++){let v=p+m,_=v,T=v+n+1,w=v+n+2,E=v+1;a.push(_,T,E),a.push(T,w,E)}}this.setIndex(a),this.setAttribute("position",new $e(c,3)),this.setAttribute("normal",new $e(l,3)),this.setAttribute("uv",new $e(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var na=class i extends Ze{constructor(e=1,t=32,n=16,r=0,o=Math.PI*2,s=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:o,thetaStart:s,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(s+a,Math.PI),l=0,u=[],d=new L,h=new L,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let v=[],_=p/n,T=0;p===0&&s===0?T=.5/t:p===n&&c===Math.PI&&(T=-.5/t);for(let w=0;w<=t;w++){let E=w/t;d.x=-e*Math.cos(r+E*o)*Math.sin(s+_*a),d.y=e*Math.cos(s+_*a),d.z=e*Math.sin(r+E*o)*Math.sin(s+_*a),g.push(d.x,d.y,d.z),h.copy(d).normalize(),x.push(h.x,h.y,h.z),m.push(E+T,1-_),v.push(l++)}u.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){let _=u[p][v+1],T=u[p][v],w=u[p+1][v],E=u[p+1][v+1];(p!==0||s>0)&&f.push(_,T,E),(p!==n-1||c<Math.PI)&&f.push(T,w,E)}this.setIndex(f),this.setAttribute("position",new $e(g,3)),this.setAttribute("normal",new $e(x,3)),this.setAttribute("uv",new $e(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Kc=class i extends Ze{constructor(e=1,t=.4,n=12,r=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:o},n=Math.floor(n),r=Math.floor(r);let s=[],a=[],c=[],l=[],u=new L,d=new L,h=new L;for(let f=0;f<=n;f++)for(let g=0;g<=r;g++){let x=g/r*o,m=f/n*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(x),d.y=(e+t*Math.cos(m))*Math.sin(x),d.z=t*Math.sin(m),a.push(d.x,d.y,d.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),h.subVectors(d,u).normalize(),c.push(h.x,h.y,h.z),l.push(g/r),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=r;g++){let x=(r+1)*f+g-1,m=(r+1)*(f-1)+g-1,p=(r+1)*(f-1)+g,v=(r+1)*f+g;s.push(x,m,v),s.push(m,p,v)}this.setIndex(s),this.setAttribute("position",new $e(a,3)),this.setAttribute("normal",new $e(c,3)),this.setAttribute("uv",new $e(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var en=class extends It{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ja,this.normalScale=new Ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Un=class extends en{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ie(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ct(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ge(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ge(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ge(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function ia(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function t_(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function n_(i){function e(r,o){return i[r]-i[o]}let t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function Rd(i,e,t){let n=i.length,r=new i.constructor(n);for(let o=0,s=0;s!==n;++o){let a=t[o]*e;for(let c=0;c!==e;++c)r[s++]=i[a+c]}return r}function Cd(i,e,t,n){let r=1,o=i[0];for(;o!==void 0&&o[n]===void 0;)o=i[r++];if(o===void 0)return;let s=o[n];if(s!==void 0)if(Array.isArray(s))do s=o[n],s!==void 0&&(e.push(o.time),t.push.apply(t,s)),o=i[r++];while(o!==void 0);else if(s.toArray!==void 0)do s=o[n],s!==void 0&&(e.push(o.time),s.toArray(t,t.length)),o=i[r++];while(o!==void 0);else do s=o[n],s!==void 0&&(e.push(o.time),t.push(s)),o=i[r++];while(o!==void 0)}var Nn=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],o=t[n-1];n:{e:{let s;t:{i:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<o)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(o=r,r=t[++n],e<r)break e}s=t.length;break t}if(!(e>=o)){let a=t[1];e<a&&(n=2,o=a);for(let c=n-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=o,o=t[--n-1],e>=o)break e}s=n,n=0;break t}break n}for(;n<s;){let a=n+s>>>1;e<t[a]?s=a:n=a+1}if(r=t[n],o=t[n-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,o,r)}return this.interpolate_(n,o,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,o=e*r;for(let s=0;s!==r;++s)t[s]=n[o+s];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}};var $c=class extends Nn{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Gu,endingEnd:Gu}}intervalChanged_(e,t,n){let r=this.parameterPositions,o=e-2,s=e+1,a=r[o],c=r[s];if(a===void 0)switch(this.getSettings_().endingStart){case Vu:o=e,a=2*t-n;break;case Wu:o=r.length-2,a=t+r[o]-r[o+1];break;default:o=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Vu:s=e,c=2*n-t;break;case Wu:s=1,c=n+r[1]-r[0];break;default:s=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=o*u,this._offsetNext=s*u}interpolate_(e,t,n,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(n-t)/(r-t),x=g*g,m=x*g,p=-h*m+2*h*x-h*g,v=(1+h)*m+(-1.5-2*h)*x+(-.5+h)*g+1,_=(-1-f)*m+(1.5+f)*x+.5*g,T=f*m-f*x;for(let w=0;w!==a;++w)o[w]=p*s[u+w]+v*s[l+w]+_*s[c+w]+T*s[d+w];return o}};var Zc=class extends Nn{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(r-t),d=1-u;for(let h=0;h!==a;++h)o[h]=s[l+h]*d+s[c+h]*u;return o}};var Jc=class extends Nn{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}};var Vt=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ia(t,this.TimeBufferType),this.values=ia(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ia(e.times,Array),values:ia(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Jc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Zc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new $c(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case zi:t=this.InterpolantFactoryMethodDiscrete;break;case ki:t=this.InterpolantFactoryMethodLinear;break;case $a:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return zi;case this.InterpolantFactoryMethodLinear:return ki;case this.InterpolantFactoryMethodSmooth:return $a}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,o=0,s=r-1;for(;o!==r&&n[o]<e;)++o;for(;s!==-1&&n[s]>t;)--s;if(++s,o!==0||s!==r){o>=s&&(s=Math.max(s,1),o=s-1);let a=this.getValueSize();this.times=n.slice(o,s),this.values=this.values.slice(o*a,s*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,o=n.length;o===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let a=0;a!==o;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(s!==null&&s>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,s),e=!1;break}s=c}if(r!==void 0&&t_(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===$a,o=e.length-1,s=1;for(let a=1;a<o;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let d=a*n,h=d-n,f=d+n;for(let g=0;g!==n;++g){let x=t[d+g];if(x!==t[h+g]||x!==t[f+g]){c=!0;break}}}if(c){if(a!==s){e[s]=e[a];let d=a*n,h=s*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++s}}if(o>0){e[s]=e[o];for(let a=o*n,c=s*n,l=0;l!==n;++l)t[c+l]=t[a+l];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=t.slice(0,s*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Vt.prototype.TimeBufferType=Float32Array;Vt.prototype.ValueBufferType=Float32Array;Vt.prototype.DefaultInterpolation=ki;var er=class extends Vt{};er.prototype.ValueTypeName="bool";er.prototype.ValueBufferType=Array;er.prototype.DefaultInterpolation=zi;er.prototype.InterpolantFactoryMethodLinear=void 0;er.prototype.InterpolantFactoryMethodSmooth=void 0;var ra=class extends Vt{};ra.prototype.ValueTypeName="color";var di=class extends Vt{};di.prototype.ValueTypeName="number";var Qc=class extends Nn{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=(n-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)Jt.slerpFlat(o,0,s,l-a,s,l,c);return o}};var Kn=class extends Vt{InterpolantFactoryMethodLinear(e){return new Qc(this.times,this.values,this.getValueSize(),e)}};Kn.prototype.ValueTypeName="quaternion";Kn.prototype.DefaultInterpolation=ki;Kn.prototype.InterpolantFactoryMethodSmooth=void 0;var tr=class extends Vt{};tr.prototype.ValueTypeName="string";tr.prototype.ValueBufferType=Array;tr.prototype.DefaultInterpolation=zi;tr.prototype.InterpolantFactoryMethodLinear=void 0;tr.prototype.InterpolantFactoryMethodSmooth=void 0;var hi=class extends Vt{};hi.prototype.ValueTypeName="vector";var oa=class{constructor(e,t=-1,n,r=Rp){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=zt(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let s=0,a=n.length;s!==a;++s)t.push(LM(n[s]).scale(r));let o=new this(e.name,e.duration,t,e.blendMode);return o.uuid=e.uuid,o}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let o=0,s=n.length;o!==s;++o)t.push(Vt.toJSON(n[o]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let o=t.length,s=[];for(let a=0;a<o;a++){let c=[],l=[];c.push((a+o-1)%o,a,(a+1)%o),l.push(0,1,0);let u=n_(c);c=Rd(c,1,u),l=Rd(l,1,u),!r&&c[0]===0&&(c.push(o),l.push(l[0])),s.push(new di(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,s)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},o=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],u=l.name.match(o);if(u&&u.length>1){let d=u[1],h=r[d];h||(r[d]=h=[]),h.push(l)}}let s=[];for(let a in r)s.push(this.CreateFromMorphTargetSequence(a,r[a],t,n));return s}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(d,h,f,g,x){if(f.length!==0){let m=[],p=[];Cd(f,m,p,g),m.length!==0&&x.push(new d(h,m,p))}},r=[],o=e.name||"default",s=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let d=0;d<l.length;d++){let h=l[d].keys;if(!(!h||h.length===0))if(h[0].morphTargets){let f={},g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let x=0;x<h[g].morphTargets.length;x++)f[h[g].morphTargets[x]]=-1;for(let x in f){let m=[],p=[];for(let v=0;v!==h[g].morphTargets.length;++v){let _=h[g];m.push(_.time),p.push(_.morphTarget===x?1:0)}r.push(new di(".morphTargetInfluence["+x+"]",m,p))}c=f.length*s}else{let f=".bones["+t[d].name+"]";n(hi,f+".position",h,"pos",r),n(Kn,f+".quaternion",h,"rot",r),n(hi,f+".scale",h,"scl",r)}}return r.length===0?null:new this(o,c,r,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,r=e.length;n!==r;++n){let o=this.tracks[n];t=Math.max(t,o.times[o.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function CM(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return di;case"vector":case"vector2":case"vector3":case"vector4":return hi;case"color":return ra;case"quaternion":return Kn;case"bool":case"boolean":return er;case"string":return tr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function LM(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=CM(i.type);if(i.times===void 0){let t=[],n=[];Cd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var fi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};var is=class{constructor(e,t,n){let r=this,o=!1,s=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,o===!1&&r.onStart!==void 0&&r.onStart(u,s,a),o=!0},this.itemEnd=function(u){s++,r.onProgress!==void 0&&r.onProgress(u,s,a),s===a&&(o=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){let f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}},Ld=new is;var un=class{constructor(e){this.manager=e!==void 0?e:Ld,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,o){n.load(e,r,t,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};un.DEFAULT_MATERIAL_NAME="__DEFAULT";var nr={},Pd=class extends Error{constructor(e,t){super(e),this.response=t}},ir=class extends un{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let o=fi.get(e);if(o!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(o),this.manager.itemEnd(e)},0),o;if(nr[e]!==void 0){nr[e].push({onLoad:t,onProgress:n,onError:r});return}nr[e]=[],nr[e].push({onLoad:t,onProgress:n,onError:r});let s=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(s).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=nr[e],d=l.body.getReader(),h=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),f=h?parseInt(h):0,g=f!==0,x=0,m=new ReadableStream({start(p){v();function v(){d.read().then(({done:_,value:T})=>{if(_)p.close();else{x+=T.byteLength;let w=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let E=0,A=u.length;E<A;E++){let P=u[E];P.onProgress&&P.onProgress(w)}p.enqueue(T),v()}})}}});return new Response(m)}else throw new Pd(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{let d=/charset="?([^;"\s]*)"?/i.exec(a),h=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(h);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{fi.add(e,l);let u=nr[e];delete nr[e];for(let d=0,h=u.length;d<h;d++){let f=u[d];f.onLoad&&f.onLoad(l)}}).catch(l=>{let u=nr[e];if(u===void 0)throw this.manager.itemError(e),l;delete nr[e];for(let d=0,h=u.length;d<h;d++){let f=u[d];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var el=class extends un{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let o=this,s=fi.get(e);if(s!==void 0)return o.manager.itemStart(e),setTimeout(function(){t&&t(s),o.manager.itemEnd(e)},0),s;let a=pr("img");function c(){u(),fi.add(e,this),t&&t(this),o.manager.itemEnd(e)}function l(d){u(),r&&r(d),o.manager.itemError(e),o.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),o.manager.itemStart(e),a.src=e,a}};var sa=class extends un{constructor(e){super(e)}load(e,t,n,r){let o=new pt,s=new el(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(a){o.image=a,o.needsUpdate=!0,t!==void 0&&t(o)},n,r),o}};var Ti=class extends We{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ge(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}};var Id=new De,r_=new L,o_=new L,Rr=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ie(512,512),this.map=null,this.mapPass=null,this.matrix=new De,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Tr,this._frameExtents=new Ie(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;r_.setFromMatrixPosition(e.matrixWorld),t.position.copy(r_),o_.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(o_),t.updateMatrixWorld(),Id.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Id),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Id)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var tl=class extends Rr{constructor(){super(new ht(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=Gi*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,o=e.distance||t.far;(n!==t.fov||r!==t.aspect||o!==t.far)&&(t.fov=n,t.aspect=r,t.far=o,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}};var Cr=class extends Ti{constructor(e,t,n=0,r=Math.PI/3,o=0,s=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(We.DEFAULT_UP),this.updateMatrix(),this.target=new We,this.distance=n,this.angle=r,this.penumbra=o,this.decay=s,this.map=null,this.shadow=new tl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var s_=new De,aa=new L,Dd=new L,nl=class extends Rr{constructor(){super(new ht(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ie(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,r=this.matrix,o=e.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),aa.setFromMatrixPosition(e.matrixWorld),n.position.copy(aa),Dd.copy(n.position),Dd.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Dd),n.updateMatrixWorld(),r.makeTranslation(-aa.x,-aa.y,-aa.z),s_.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(s_)}};var pi=class extends Ti{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new nl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}};var il=class extends Rr{constructor(){super(new $i(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}};var Si=class extends Ti{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(We.DEFAULT_UP),this.updateMatrix(),this.target=new We,this.shadow=new il}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var ca=class extends Ti{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var rr=class{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,r=e.length;n<r;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var la=class extends un{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let o=this,s=fi.get(e);if(s!==void 0){if(o.manager.itemStart(e),s.then){s.then(l=>{t&&t(l),o.manager.itemEnd(e)}).catch(l=>{r&&r(l)});return}return setTimeout(function(){t&&t(s),o.manager.itemEnd(e)},0),s}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(o.options,{colorSpaceConversion:"none"}))}).then(function(l){return fi.add(e,l),t&&t(l),o.manager.itemEnd(e),l}).catch(function(l){r&&r(l),fi.remove(e),o.manager.itemError(e),o.manager.itemEnd(e)});fi.add(e,c),o.manager.itemStart(e)}};var ua=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=a_(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=a_();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function a_(){return(typeof performance>"u"?Date:performance).now()}var Nd="\\[\\]\\.:\\/",PM=new RegExp("["+Nd+"]","g"),Bd="[^"+Nd+"]",IM="[^"+Nd.replace("\\.","")+"]",DM=/((?:WC+[\/:])*)/.source.replace("WC",Bd),UM=/(WCOD+)?/.source.replace("WCOD",IM),NM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Bd),BM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Bd),FM=new RegExp("^"+DM+UM+NM+BM+"$"),OM=["material","materials","bones","map"],Ud=class{constructor(e,t,n){let r=n||mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,o=n.length;r!==o;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},mt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(PM,"")}static parseTrackName(e){let t=FM.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let o=n.nodeName.substring(r+1);OM.indexOf(o)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=o)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(o){for(let s=0;s<o.length;s++){let a=o[s];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,o=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let s=e[r];if(s===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(o!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[o]!==void 0&&(o=e.morphTargetDictionary[o])}c=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=o}else s.fromArray!==void 0&&s.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(c=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};mt.Composite=Ud;mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};mt.prototype.GetterByBindingType=[mt.prototype._getValue_direct,mt.prototype._getValue_array,mt.prototype._getValue_arrayElement,mt.prototype._getValue_toArray];mt.prototype.SetterByBindingTypeAndVersioning=[[mt.prototype._setValue_direct,mt.prototype._setValue_direct_setNeedsUpdate,mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_array,mt.prototype._setValue_array_setNeedsUpdate,mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_arrayElement,mt.prototype._setValue_arrayElement_setNeedsUpdate,mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_fromArray,mt.prototype._setValue_fromArray_setNeedsUpdate,mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var da=class{constructor(e,t,n=0,r=1/0){this.ray=new Xn(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Mr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Fd(e,this,n,t),n.sort(c_),n}intersectObjects(e,t=!0,n=[]){for(let r=0,o=e.length;r<o;r++)Fd(e[r],this,n,t);return n.sort(c_),n}};function c_(i,e){return i.distance-e.distance}function Fd(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){let r=i.children;for(let o=0,s=r.length;o<s;o++)Fd(r[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");function Hd(i,e){if(e===Xu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Eo||e===zs){let t=i.getIndex();if(t===null){let s=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)s.push(c);i.setIndex(s),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,r=[];if(e===Eo)for(let s=1;s<=n;s++)r.push(t.getX(0)),r.push(t.getX(s)),r.push(t.getX(s+1));else for(let s=0;s<n;s++)s%2===0?(r.push(t.getX(s)),r.push(t.getX(s+1)),r.push(t.getX(s+2))):(r.push(t.getX(s+2)),r.push(t.getX(s+1)),r.push(t.getX(s)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let o=i.clone();return o.setIndex(r),o.clearGroups(),o}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var os=class extends un{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new qd(t)}),this.register(function(t){return new th(t)}),this.register(function(t){return new nh(t)}),this.register(function(t){return new ih(t)}),this.register(function(t){return new jd(t)}),this.register(function(t){return new Kd(t)}),this.register(function(t){return new $d(t)}),this.register(function(t){return new Zd(t)}),this.register(function(t){return new Xd(t)}),this.register(function(t){return new Jd(t)}),this.register(function(t){return new Yd(t)}),this.register(function(t){return new eh(t)}),this.register(function(t){return new Qd(t)}),this.register(function(t){return new Vd(t)}),this.register(function(t){return new rh(t)}),this.register(function(t){return new oh(t)})}load(e,t,n,r){let o=this,s;if(this.resourcePath!=="")s=this.resourcePath;else if(this.path!==""){let l=rr.extractUrlBase(e);s=rr.resolveURL(l,this.path)}else s=rr.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){r?r(l):console.error(l),o.manager.itemError(e),o.manager.itemEnd(e)},c=new ir(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{o.parse(l,s,function(u){t(u),o.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let o,s={},a={},c=new TextDecoder;if(typeof e=="string")o=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===f_){try{s[rt.KHR_BINARY_GLTF]=new sh(e)}catch(d){r&&r(d);return}o=JSON.parse(s[rt.KHR_BINARY_GLTF].content)}else o=JSON.parse(c.decode(e));else o=e;if(o.asset===void 0||o.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new fh(o,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let d=this.pluginCallbacks[u](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,s[d.name]=!0}if(o.extensionsUsed)for(let u=0;u<o.extensionsUsed.length;++u){let d=o.extensionsUsed[u],h=o.extensionsRequired||[];switch(d){case rt.KHR_MATERIALS_UNLIT:s[d]=new Wd;break;case rt.KHR_DRACO_MESH_COMPRESSION:s[d]=new ah(o,this.dracoLoader);break;case rt.KHR_TEXTURE_TRANSFORM:s[d]=new ch;break;case rt.KHR_MESH_QUANTIZATION:s[d]=new lh;break;default:h.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(s),l.setPlugins(a),l.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,o){n.parse(e,t,r,o)})}};function HM(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var rt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Vd=class{constructor(e){this.parser=e,this.name=rt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let o=t[n];o.extensions&&o.extensions[this.name]&&o.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,o.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,r=t.cache.get(n);if(r)return r;let o=t.json,c=((o.extensions&&o.extensions[this.name]||{}).lights||[])[e],l,u=new ge(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],ft);let d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Si(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new pi(u),l.distance=d;break;case"spot":l=new Cr(u),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Pr(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),r=Promise.resolve(l),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,o=n.json.nodes[e],a=(o.extensions&&o.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},Wd=class{constructor(){this.name=rt.KHR_MATERIALS_UNLIT}getMaterialType(){return Dt}extendParams(e,t,n){let r=[];e.color=new ge(1,1,1),e.opacity=1;let o=t.pbrMetallicRoughness;if(o){if(Array.isArray(o.baseColorFactor)){let s=o.baseColorFactor;e.color.setRGB(s[0],s[1],s[2],ft),e.opacity=s[3]}o.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",o.baseColorTexture,tt))}return Promise.all(r)}},Xd=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=r.extensions[this.name].emissiveStrength;return o!==void 0&&(t.emissiveIntensity=o),Promise.resolve()}},qd=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Un}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];if(s.clearcoatFactor!==void 0&&(t.clearcoat=s.clearcoatFactor),s.clearcoatTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatMap",s.clearcoatTexture)),s.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=s.clearcoatRoughnessFactor),s.clearcoatRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatRoughnessMap",s.clearcoatRoughnessTexture)),s.clearcoatNormalTexture!==void 0&&(o.push(n.assignTexture(t,"clearcoatNormalMap",s.clearcoatNormalTexture)),s.clearcoatNormalTexture.scale!==void 0)){let a=s.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ie(a,a)}return Promise.all(o)}},Yd=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Un}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];return s.iridescenceFactor!==void 0&&(t.iridescence=s.iridescenceFactor),s.iridescenceTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceMap",s.iridescenceTexture)),s.iridescenceIor!==void 0&&(t.iridescenceIOR=s.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),s.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=s.iridescenceThicknessMinimum),s.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=s.iridescenceThicknessMaximum),s.iridescenceThicknessTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceThicknessMap",s.iridescenceThicknessTexture)),Promise.all(o)}},jd=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Un}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[];t.sheenColor=new ge(0,0,0),t.sheenRoughness=0,t.sheen=1;let s=r.extensions[this.name];if(s.sheenColorFactor!==void 0){let a=s.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],ft)}return s.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=s.sheenRoughnessFactor),s.sheenColorTexture!==void 0&&o.push(n.assignTexture(t,"sheenColorMap",s.sheenColorTexture,tt)),s.sheenRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"sheenRoughnessMap",s.sheenRoughnessTexture)),Promise.all(o)}},Kd=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Un}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];return s.transmissionFactor!==void 0&&(t.transmission=s.transmissionFactor),s.transmissionTexture!==void 0&&o.push(n.assignTexture(t,"transmissionMap",s.transmissionTexture)),Promise.all(o)}},$d=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Un}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];t.thickness=s.thicknessFactor!==void 0?s.thicknessFactor:0,s.thicknessTexture!==void 0&&o.push(n.assignTexture(t,"thicknessMap",s.thicknessTexture)),t.attenuationDistance=s.attenuationDistance||1/0;let a=s.attenuationColor||[1,1,1];return t.attenuationColor=new ge().setRGB(a[0],a[1],a[2],ft),Promise.all(o)}},Zd=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Un}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=r.extensions[this.name];return t.ior=o.ior!==void 0?o.ior:1.5,Promise.resolve()}},Jd=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Un}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];t.specularIntensity=s.specularFactor!==void 0?s.specularFactor:1,s.specularTexture!==void 0&&o.push(n.assignTexture(t,"specularIntensityMap",s.specularTexture));let a=s.specularColorFactor||[1,1,1];return t.specularColor=new ge().setRGB(a[0],a[1],a[2],ft),s.specularColorTexture!==void 0&&o.push(n.assignTexture(t,"specularColorMap",s.specularColorTexture,tt)),Promise.all(o)}},Qd=class{constructor(e){this.parser=e,this.name=rt.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Un}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];return t.bumpScale=s.bumpFactor!==void 0?s.bumpFactor:1,s.bumpTexture!==void 0&&o.push(n.assignTexture(t,"bumpMap",s.bumpTexture)),Promise.all(o)}},eh=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Un}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];return s.anisotropyStrength!==void 0&&(t.anisotropy=s.anisotropyStrength),s.anisotropyRotation!==void 0&&(t.anisotropyRotation=s.anisotropyRotation),s.anisotropyTexture!==void 0&&o.push(n.assignTexture(t,"anisotropyMap",s.anisotropyTexture)),Promise.all(o)}},th=class{constructor(e){this.parser=e,this.name=rt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let o=r.extensions[this.name],s=t.options.ktx2Loader;if(!s){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,o.source,s)}},nh=class{constructor(e){this.parser=e,this.name=rt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,r=n.json,o=r.textures[e];if(!o.extensions||!o.extensions[t])return null;let s=o.extensions[t],a=r.images[s.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,s.source,c);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},ih=class{constructor(e){this.parser=e,this.name=rt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,r=n.json,o=r.textures[e];if(!o.extensions||!o.extensions[t])return null;let s=o.extensions[t],a=r.images[s.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,s.source,c);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},rh=class{constructor(e){this.name=rt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let r=n.extensions[this.name],o=this.parser.getDependency("buffer",r.buffer),s=this.parser.options.meshoptDecoder;if(!s||!s.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return o.then(function(a){let c=r.byteOffset||0,l=r.byteLength||0,u=r.count,d=r.byteStride,h=new Uint8Array(a,c,l);return s.decodeGltfBufferAsync?s.decodeGltfBufferAsync(u,d,h,r.mode,r.filter).then(function(f){return f.buffer}):s.ready.then(function(){let f=new ArrayBuffer(u*d);return s.decodeGltfBuffer(new Uint8Array(f),u,d,h,r.mode,r.filter),f})})}else return null}},oh=class{constructor(e){this.name=rt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let l of r.primitives)if(l.mode!==$n.TRIANGLES&&l.mode!==$n.TRIANGLE_STRIP&&l.mode!==$n.TRIANGLE_FAN&&l.mode!==void 0)return null;let s=n.extensions[this.name].attributes,a=[],c={};for(let l in s)a.push(this.parser.getDependency("accessor",s[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let u=l.pop(),d=u.isGroup?u.children:[u],h=l[0].count,f=[];for(let g of d){let x=new De,m=new L,p=new Jt,v=new L(1,1,1),_=new io(g.geometry,g.material,h);for(let T=0;T<h;T++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,T),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,T),c.SCALE&&v.fromBufferAttribute(c.SCALE,T),_.setMatrixAt(T,x.compose(m,p,v));for(let T in c)if(T==="_COLOR_0"){let w=c[T];_.instanceColor=new bi(w.array,w.itemSize,w.normalized)}else T!=="TRANSLATION"&&T!=="ROTATION"&&T!=="SCALE"&&g.geometry.setAttribute(T,c[T]);We.prototype.copy.call(_,g),this.parser.assignFinalMaterial(_),f.push(_)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}},f_="glTF",ha=12,l_={JSON:1313821514,BIN:5130562},sh=class{constructor(e){this.name=rt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ha),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==f_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let r=this.header.length-ha,o=new DataView(e,ha),s=0;for(;s<r;){let a=o.getUint32(s,!0);s+=4;let c=o.getUint32(s,!0);if(s+=4,c===l_.JSON){let l=new Uint8Array(e,ha+s,a);this.content=n.decode(l)}else if(c===l_.BIN){let l=ha+s;this.body=e.slice(l,l+a)}s+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},ah=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=rt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,o=e.extensions[this.name].bufferView,s=e.extensions[this.name].attributes,a={},c={},l={};for(let u in s){let d=dh[u]||u.toLowerCase();a[d]=s[u]}for(let u in e.attributes){let d=dh[u]||u.toLowerCase();if(s[u]!==void 0){let h=n.accessors[e.attributes[u]],f=rs[h.componentType];l[d]=f.name,c[d]=h.normalized===!0}}return t.getDependency("bufferView",o).then(function(u){return new Promise(function(d,h){r.decodeDracoFile(u,function(f){for(let g in f.attributes){let x=f.attributes[g],m=c[g];m!==void 0&&(x.normalized=m)}d(f)},a,l,ft,h)})})}},ch=class{constructor(){this.name=rt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},lh=class{constructor(){this.name=rt.KHR_MESH_QUANTIZATION}},rl=class extends Nn{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,o=e*r*3+r;for(let s=0;s!==r;s++)t[s]=n[o+s];return t}interpolate_(e,t,n,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=r-t,d=(n-t)/u,h=d*d,f=h*d,g=e*l,x=g-l,m=-2*f+3*h,p=f-h,v=1-m,_=p-h+d;for(let T=0;T!==a;T++){let w=s[x+T+a],E=s[x+T+c]*u,A=s[g+T+a],P=s[g+T]*u;o[T]=v*w+_*E+m*A+p*P}return o}},zM=new Jt,uh=class extends rl{interpolate_(e,t,n,r){let o=super.interpolate_(e,t,n,r);return zM.fromArray(o).normalize().toArray(o),o}},$n={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},rs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},u_={9728:bt,9729:Nt,9984:Hs,9985:Fa,9986:yo,9987:Gn},d_={33071:Ot,33648:Gr,10497:ii},zd={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},dh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Lr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},kM={CUBICSPLINE:void 0,LINEAR:ki,STEP:zi},kd={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function GM(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new en({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:$t})),i.DefaultMaterial}function oo(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Pr(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function VM(i,e,t){let n=!1,r=!1,o=!1;for(let l=0,u=e.length;l<u;l++){let d=e[l];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(r=!0),d.COLOR_0!==void 0&&(o=!0),n&&r&&o)break}if(!n&&!r&&!o)return Promise.resolve(i);let s=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){let d=e[l];if(n){let h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):i.attributes.position;s.push(h)}if(r){let h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):i.attributes.normal;a.push(h)}if(o){let h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):i.attributes.color;c.push(h)}}return Promise.all([Promise.all(s),Promise.all(a),Promise.all(c)]).then(function(l){let u=l[0],d=l[1],h=l[2];return n&&(i.morphAttributes.position=u),r&&(i.morphAttributes.normal=d),o&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function WM(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function XM(i){let e,t=i.extensions&&i.extensions[rt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Gd(t.attributes):e=i.indices+":"+Gd(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,r=i.targets.length;n<r;n++)e+=":"+Gd(i.targets[n]);return e}function Gd(i){let e="",t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function hh(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function qM(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var YM=new De,fh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new HM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=!1,o=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,r=navigator.userAgent.indexOf("Firefox")>-1,o=r?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||r&&o<98?this.textureLoader=new sa(this.options.manager):this.textureLoader=new la(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ir(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,o=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(s){return s._markDefs&&s._markDefs()}),Promise.all(this._invokeAll(function(s){return s.beforeRoot&&s.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(s){let a={scene:s[0][r.scene||0],scenes:s[0],animations:s[1],cameras:s[2],asset:r.asset,parser:n,userData:{}};return oo(o,a,r),Pr(a,r),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,o=t.length;r<o;r++){let s=t[r].joints;for(let a=0,c=s.length;a<c;a++)e[s[a]].isBone=!0}for(let r=0,o=e.length;r<o;r++){let s=e[r];s.mesh!==void 0&&(this._addNodeRef(this.meshCache,s.mesh),s.skin!==void 0&&(n[s.mesh].isSkinnedMesh=!0)),s.camera!==void 0&&this._addNodeRef(this.cameraCache,s.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),o=(s,a)=>{let c=this.associations.get(s);c!=null&&this.associations.set(a,c);for(let[l,u]of s.children.entries())o(u,a.children[l])};return o(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let o=e(t[r]);o&&n.push(o)}return n}getDependency(e,t){let n=e+":"+t,r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(o){return o.loadNode&&o.loadNode(t)});break;case"mesh":r=this._invokeOne(function(o){return o.loadMesh&&o.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(o){return o.loadBufferView&&o.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(o){return o.loadMaterial&&o.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(o){return o.loadTexture&&o.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(o){return o.loadAnimation&&o.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(o){return o!=this&&o.getDependency&&o.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(o,s){return n.getDependency(e,s)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[rt.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(o,s){n.load(rr.resolveURL(t.uri,r.path),o,void 0,function(){s(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let r=t.byteLength||0,o=t.byteOffset||0;return n.slice(o,o+r)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let s=zd[r.type],a=rs[r.componentType],c=r.normalized===!0,l=new a(r.count*s);return Promise.resolve(new Ye(l,s,c))}let o=[];return r.bufferView!==void 0?o.push(this.getDependency("bufferView",r.bufferView)):o.push(null),r.sparse!==void 0&&(o.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),o.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(o).then(function(s){let a=s[0],c=zd[r.type],l=rs[r.componentType],u=l.BYTES_PER_ELEMENT,d=u*c,h=r.byteOffset||0,f=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,g=r.normalized===!0,x,m;if(f&&f!==d){let p=Math.floor(h/f),v="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+p+":"+r.count,_=t.cache.get(v);_||(x=new l(a,p*f,r.count*f/u),_=new eo(x,f/u),t.cache.add(v,_)),m=new to(_,c,h%f/u,g)}else a===null?x=new l(r.count*c):x=new l(a,h,r.count*c),m=new Ye(x,c,g);if(r.sparse!==void 0){let p=zd.SCALAR,v=rs[r.sparse.indices.componentType],_=r.sparse.indices.byteOffset||0,T=r.sparse.values.byteOffset||0,w=new v(s[1],_,r.sparse.count*p),E=new l(s[2],T,r.sparse.count*c);a!==null&&(m=new Ye(m.array.slice(),m.itemSize,m.normalized));for(let A=0,P=w.length;A<P;A++){let y=w[A];if(m.setX(y,E[A*c]),c>=2&&m.setY(y,E[A*c+1]),c>=3&&m.setZ(y,E[A*c+2]),c>=4&&m.setW(y,E[A*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){let t=this.json,n=this.options,o=t.textures[e].source,s=t.images[o],a=this.textureLoader;if(s.uri){let c=n.manager.getHandler(s.uri);c!==null&&(a=c)}return this.loadTextureImage(e,o,a)}loadTextureImage(e,t,n){let r=this,o=this.json,s=o.textures[e],a=o.images[t],c=(a.uri||a.bufferView)+":"+s.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=s.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let h=(o.samplers||{})[s.sampler]||{};return u.magFilter=u_[h.magFilter]||Nt,u.minFilter=u_[h.minFilter]||Gn,u.wrapS=d_[h.wrapS]||ii,u.wrapT=d_[h.wrapT]||ii,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,r=this.json,o=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let s=r.images[e],a=self.URL||self.webkitURL,c=s.uri||"",l=!1;if(s.bufferView!==void 0)c=n.getDependency("bufferView",s.bufferView).then(function(d){l=!0;let h=new Blob([d],{type:s.mimeType});return c=a.createObjectURL(h),c});else if(s.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(d){return new Promise(function(h,f){let g=h;t.isImageBitmapLoader===!0&&(g=function(x){let m=new pt(x);m.needsUpdate=!0,h(m)}),t.load(rr.resolveURL(d,o.path),g,void 0,f)})}).then(function(d){return l===!0&&a.revokeObjectURL(c),d.userData.mimeType=s.mimeType||qM(s.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,r){let o=this;return this.getDependency("texture",n.index).then(function(s){if(!s)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(s=s.clone(),s.channel=n.texCoord),o.extensions[rt.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[rt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=o.associations.get(s);s=o.extensions[rt.KHR_TEXTURE_TRANSFORM].extendTexture(s,a),o.associations.set(s,c)}}return r!==void 0&&(s.colorSpace=r),e[t]=s,s})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,o=t.attributes.color!==void 0,s=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Qi,It.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new ui,It.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(r||o||s){let a="ClonedMaterial:"+n.uuid+":";r&&(a+="derivative-tangents:"),o&&(a+="vertex-colors:"),s&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),o&&(c.vertexColors=!0),s&&(c.flatShading=!0),r&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return en}loadMaterial(e){let t=this,n=this.json,r=this.extensions,o=n.materials[e],s,a={},c=o.extensions||{},l=[];if(c[rt.KHR_MATERIALS_UNLIT]){let d=r[rt.KHR_MATERIALS_UNLIT];s=d.getMaterialType(),l.push(d.extendParams(a,o,t))}else{let d=o.pbrMetallicRoughness||{};if(a.color=new ge(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){let h=d.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],ft),a.opacity=h[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",d.baseColorTexture,tt)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),s=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}o.doubleSided===!0&&(a.side=Pt);let u=o.alphaMode||kd.OPAQUE;if(u===kd.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===kd.MASK&&(a.alphaTest=o.alphaCutoff!==void 0?o.alphaCutoff:.5)),o.normalTexture!==void 0&&s!==Dt&&(l.push(t.assignTexture(a,"normalMap",o.normalTexture)),a.normalScale=new Ie(1,1),o.normalTexture.scale!==void 0)){let d=o.normalTexture.scale;a.normalScale.set(d,d)}if(o.occlusionTexture!==void 0&&s!==Dt&&(l.push(t.assignTexture(a,"aoMap",o.occlusionTexture)),o.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=o.occlusionTexture.strength)),o.emissiveFactor!==void 0&&s!==Dt){let d=o.emissiveFactor;a.emissive=new ge().setRGB(d[0],d[1],d[2],ft)}return o.emissiveTexture!==void 0&&s!==Dt&&l.push(t.assignTexture(a,"emissiveMap",o.emissiveTexture,tt)),Promise.all(l).then(function(){let d=new s(a);return o.name&&(d.name=o.name),Pr(d,o),t.associations.set(d,{materials:e}),o.extensions&&oo(r,d,o),d})}createUniqueName(e){let t=mt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function o(a){return n[rt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return h_(c,a,t)})}let s=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],u=XM(l),d=r[u];if(d)s.push(d.promise);else{let h;l.extensions&&l.extensions[rt.KHR_DRACO_MESH_COMPRESSION]?h=o(l):h=h_(new Ze,l,t),r[u]={primitive:l,promise:h},s.push(h)}}return Promise.all(s)}loadMesh(e){let t=this,n=this.json,r=this.extensions,o=n.meshes[e],s=o.primitives,a=[];for(let c=0,l=s.length;c<l;c++){let u=s[c].material===void 0?GM(this.cache):this.getDependency("material",s[c].material);a.push(u)}return a.push(t.loadGeometries(s)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],d=[];for(let f=0,g=u.length;f<g;f++){let x=u[f],m=s[f],p,v=l[f];if(m.mode===$n.TRIANGLES||m.mode===$n.TRIANGLE_STRIP||m.mode===$n.TRIANGLE_FAN||m.mode===void 0)p=o.isSkinnedMesh===!0?new Ks(x,v):new ke(x,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===$n.TRIANGLE_STRIP?p.geometry=Hd(p.geometry,zs):m.mode===$n.TRIANGLE_FAN&&(p.geometry=Hd(p.geometry,Eo));else if(m.mode===$n.LINES)p=new Ji(x,v);else if(m.mode===$n.LINE_STRIP)p=new Zi(x,v);else if(m.mode===$n.LINE_LOOP)p=new Qs(x,v);else if(m.mode===$n.POINTS)p=new wr(x,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&WM(p,o),p.name=t.createUniqueName(o.name||"mesh_"+e),Pr(p,o),m.extensions&&oo(r,p,m),t.assignFinalMaterial(p),d.push(p)}for(let f=0,g=d.length;f<g;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return o.extensions&&oo(r,d[0],o),d[0];let h=new Tt;o.extensions&&oo(r,h,o),t.associations.set(h,{meshes:e});for(let f=0,g=d.length;f<g;f++)h.add(d[f]);return h})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new ht(oe.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new $i(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Pr(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let r=0,o=t.joints.length;r<o;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){let o=r.pop(),s=r,a=[],c=[];for(let l=0,u=s.length;l<u;l++){let d=s[l];if(d){a.push(d);let h=new De;o!==null&&h.fromArray(o.array,l*16),c.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new $s(a,c)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],o=r.name?r.name:"animation_"+e,s=[],a=[],c=[],l=[],u=[];for(let d=0,h=r.channels.length;d<h;d++){let f=r.channels[d],g=r.samplers[f.sampler],x=f.target,m=x.node,p=r.parameters!==void 0?r.parameters[g.input]:g.input,v=r.parameters!==void 0?r.parameters[g.output]:g.output;x.node!==void 0&&(s.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",v)),l.push(g),u.push(x))}return Promise.all([Promise.all(s),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(d){let h=d[0],f=d[1],g=d[2],x=d[3],m=d[4],p=[];for(let v=0,_=h.length;v<_;v++){let T=h[v],w=f[v],E=g[v],A=x[v],P=m[v];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();let y=n._createAnimationTracks(T,w,E,A,P);if(y)for(let M=0;M<y.length;M++)p.push(y[M])}return new oa(o,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(o){let s=n._getNodeRef(n.meshCache,r.mesh,o);return r.weights!==void 0&&s.traverse(function(a){if(a.isMesh)for(let c=0,l=r.weights.length;c<l;c++)a.morphTargetInfluences[c]=r.weights[c]}),s})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],o=n._loadNodeShallow(e),s=[],a=r.children||[];for(let l=0,u=a.length;l<u;l++)s.push(n.getDependency("node",a[l]));let c=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([o,Promise.all(s),c]).then(function(l){let u=l[0],d=l[1],h=l[2];h!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(h,YM)});for(let f=0,g=d.length;f<g;f++)u.add(d[f]);return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let o=t.nodes[e],s=o.name?r.createUniqueName(o.name):"",a=[],c=r._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),o.camera!==void 0&&a.push(r.getDependency("camera",o.camera).then(function(l){return r._getNodeRef(r.cameraCache,o.camera,l)})),r._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(o.isBone===!0?u=new no:l.length>1?u=new Tt:l.length===1?u=l[0]:u=new We,u!==l[0])for(let d=0,h=l.length;d<h;d++)u.add(l[d]);if(o.name&&(u.userData.name=o.name,u.name=s),Pr(u,o),o.extensions&&oo(n,u,o),o.matrix!==void 0){let d=new De;d.fromArray(o.matrix),u.applyMatrix4(d)}else o.translation!==void 0&&u.position.fromArray(o.translation),o.rotation!==void 0&&u.quaternion.fromArray(o.rotation),o.scale!==void 0&&u.scale.fromArray(o.scale);return r.associations.has(u)||r.associations.set(u,{}),r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,o=new Tt;n.name&&(o.name=r.createUniqueName(n.name)),Pr(o,n),n.extensions&&oo(t,o,n);let s=n.nodes||[],a=[];for(let c=0,l=s.length;c<l;c++)a.push(r.getDependency("node",s[c]));return Promise.all(a).then(function(c){for(let u=0,d=c.length;u<d;u++)o.add(c[u]);let l=u=>{let d=new Map;for(let[h,f]of r.associations)(h instanceof It||h instanceof pt)&&d.set(h,f);return u.traverse(h=>{let f=r.associations.get(h);f!=null&&d.set(h,f)}),d};return r.associations=l(o),o})}_createAnimationTracks(e,t,n,r,o){let s=[],a=e.name?e.name:e.uuid,c=[];Lr[o.path]===Lr.weights?e.traverse(function(h){h.morphTargetInfluences&&c.push(h.name?h.name:h.uuid)}):c.push(a);let l;switch(Lr[o.path]){case Lr.weights:l=di;break;case Lr.rotation:l=Kn;break;case Lr.position:case Lr.scale:l=hi;break;default:n.itemSize===1?l=di:l=hi;break}let u=r.interpolation!==void 0?kM[r.interpolation]:ki,d=this._getArrayFromAccessor(n);for(let h=0,f=c.length;h<f;h++){let g=new l(c[h]+"."+Lr[o.path],t.array,d,u);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),s.push(g)}return s}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=hh(t.constructor),r=new Float32Array(t.length);for(let o=0,s=t.length;o<s;o++)r[o]=t[o]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let r=this instanceof Kn?uh:rl;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function jM(i,e,t){let n=e.attributes,r=new ut;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(r.set(new L(c[0],c[1],c[2]),new L(l[0],l[1],l[2])),a.normalized){let u=hh(rs[a.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let o=e.targets;if(o!==void 0){let a=new L,c=new L;for(let l=0,u=o.length;l<u;l++){let d=o[l];if(d.POSITION!==void 0){let h=t.json.accessors[d.POSITION],f=h.min,g=h.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),h.normalized){let x=hh(rs[h.componentType]);c.multiplyScalar(x)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(a)}i.boundingBox=r;let s=new At;r.getCenter(s.center),s.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=s}function h_(i,e,t){let n=e.attributes,r=[];function o(s,a){return t.getDependency("accessor",s).then(function(c){i.setAttribute(a,c)})}for(let s in n){let a=dh[s]||s.toLowerCase();a in i.attributes||r.push(o(n[s],a))}if(e.indices!==void 0&&!i.index){let s=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});r.push(s)}return Ke.workingColorSpace!==ft&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ke.workingColorSpace}" not supported.`),Pr(i,e),jM(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?VM(i,e.targets,t):i})}var ph=new WeakMap,ss=class extends un{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,r){let o=new ir(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,s=>{this.parse(s,t,r)},n,r)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,tt).catch(n)}decodeDracoFile(e,t,n,r,o=ft,s=()=>{}){let a={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:r||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:o};return this.decodeGeometry(e,a).then(t).catch(s)}decodeGeometry(e,t){let n=JSON.stringify(t);if(ph.has(e)){let c=ph.get(e);if(c.key===n)return c.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let r,o=this.workerNextTaskID++,s=e.byteLength,a=this._getWorker(o,s).then(c=>(r=c,new Promise((l,u)=>{r._callbacks[o]={resolve:l,reject:u},r.postMessage({type:"decode",id:o,taskConfig:t,buffer:e},[e])}))).then(c=>this._createGeometry(c.geometry));return a.catch(()=>!0).then(()=>{r&&o&&this._releaseTask(r,o)}),ph.set(e,{key:n,promise:a}),a}_createGeometry(e){let t=new Ze;e.index&&t.setIndex(new Ye(e.index.array,1));for(let n=0;n<e.attributes.length;n++){let r=e.attributes[n],o=r.name,s=r.array,a=r.itemSize,c=new Ye(s,a);o==="color"&&(this._assignVertexColorSpace(c,r.vertexColorSpace),c.normalized=!(s instanceof Float32Array)),t.setAttribute(o,c)}return t}_assignVertexColorSpace(e,t){if(t!==tt)return;let n=new ge;for(let r=0,o=e.count;r<o;r++)n.fromBufferAttribute(e,r).convertSRGBToLinear(),e.setXYZ(r,n.r,n.g,n.b)}_loadLibrary(e,t){let n=new ir(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((r,o)=>{n.load(e,r,void 0,o)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;let e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{let r=n[0];e||(this.decoderConfig.wasmBinary=n[1]);let o=KM.toString(),s=["/* draco decoder */",r,"","/* worker */",o.substring(o.indexOf("{")+1,o.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([s]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){let r=new Worker(this.workerSourceURL);r._callbacks={},r._taskCosts={},r._taskLoad=0,r.postMessage({type:"init",decoderConfig:this.decoderConfig}),r.onmessage=function(o){let s=o.data;switch(s.type){case"decode":r._callbacks[s.id].resolve(s);break;case"error":r._callbacks[s.id].reject(s);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+s.type+'"')}},this.workerPool.push(r)}else this.workerPool.sort(function(r,o){return r._taskLoad>o._taskLoad?-1:1});let n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}};function KM(){let i,e;onmessage=function(s){let a=s.data;switch(a.type){case"init":i=a.decoderConfig,e=new Promise(function(u){i.onModuleLoaded=function(d){u({draco:d})},DracoDecoderModule(i)});break;case"decode":let c=a.buffer,l=a.taskConfig;e.then(u=>{let d=u.draco,h=new d.Decoder;try{let f=t(d,h,new Int8Array(c),l),g=f.attributes.map(x=>x.array.buffer);f.index&&g.push(f.index.array.buffer),self.postMessage({type:"decode",id:a.id,geometry:f},g)}catch(f){console.error(f),self.postMessage({type:"error",id:a.id,error:f.message})}finally{d.destroy(h)}});break}};function t(s,a,c,l){let u=l.attributeIDs,d=l.attributeTypes,h,f,g=a.GetEncodedGeometryType(c);if(g===s.TRIANGULAR_MESH)h=new s.Mesh,f=a.DecodeArrayToMesh(c,c.byteLength,h);else if(g===s.POINT_CLOUD)h=new s.PointCloud,f=a.DecodeArrayToPointCloud(c,c.byteLength,h);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!f.ok()||h.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+f.error_msg());let x={index:null,attributes:[]};for(let m in u){let p=self[d[m]],v,_;if(l.useUniqueIDs)_=u[m],v=a.GetAttributeByUniqueId(h,_);else{if(_=a.GetAttributeId(h,s[u[m]]),_===-1)continue;v=a.GetAttribute(h,_)}let T=r(s,a,h,m,p,v);m==="color"&&(T.vertexColorSpace=l.vertexColorSpace),x.attributes.push(T)}return g===s.TRIANGULAR_MESH&&(x.index=n(s,a,h)),s.destroy(h),x}function n(s,a,c){let u=c.num_faces()*3,d=u*4,h=s._malloc(d);a.GetTrianglesUInt32Array(c,d,h);let f=new Uint32Array(s.HEAPF32.buffer,h,u).slice();return s._free(h),{array:f,itemSize:1}}function r(s,a,c,l,u,d){let h=d.num_components(),g=c.num_points()*h,x=g*u.BYTES_PER_ELEMENT,m=o(s,u),p=s._malloc(x);a.GetAttributeDataArrayForAllPoints(c,d,m,x,p);let v=new u(s.HEAPF32.buffer,p,g).slice();return s._free(p),{name:l,array:v,itemSize:h}}function o(s,a){switch(a){case Float32Array:return s.DT_FLOAT32;case Int8Array:return s.DT_INT8;case Int16Array:return s.DT_INT16;case Int32Array:return s.DT_INT32;case Uint8Array:return s.DT_UINT8;case Uint16Array:return s.DT_UINT16;case Uint32Array:return s.DT_UINT32}}}var ol=class extends Qr{constructor(e=null){super();let t=new Yn;t.deleteAttribute("uv");let n=new en({side:Mt}),r=new en,o=5;e!==null&&e._useLegacyLights===!1&&(o=900);let s=new pi(16777215,o,28,2);s.position.set(.418,16.199,.3),this.add(s);let a=new ke(t,n);a.position.set(-.757,13.219,.717),a.scale.set(31.713,28.305,28.591),this.add(a);let c=new ke(t,r);c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),this.add(c);let l=new ke(t,r);l.position.set(-5.607,-.754,-.758),l.rotation.set(0,.994,0),l.scale.set(1.97,1.534,3.955),this.add(l);let u=new ke(t,r);u.position.set(6.167,.857,7.803),u.rotation.set(0,.561,0),u.scale.set(3.927,6.285,3.687),this.add(u);let d=new ke(t,r);d.position.set(-2.017,.018,6.124),d.rotation.set(0,.333,0),d.scale.set(2.002,4.566,2.064),this.add(d);let h=new ke(t,r);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);let f=new ke(t,r);f.position.set(-2.193,-.369,-5.547),f.rotation.set(0,.516,0),f.scale.set(3.875,3.487,2.986),this.add(f);let g=new ke(t,as(50));g.position.set(-16.116,14.37,8.208),g.scale.set(.1,2.428,2.739),this.add(g);let x=new ke(t,as(50));x.position.set(-16.109,18.021,-8.207),x.scale.set(.1,2.425,2.751),this.add(x);let m=new ke(t,as(17));m.position.set(14.904,12.198,-1.832),m.scale.set(.15,4.265,6.331),this.add(m);let p=new ke(t,as(43));p.position.set(-.462,8.89,14.52),p.scale.set(4.38,5.441,.088),this.add(p);let v=new ke(t,as(20));v.position.set(3.235,11.486,-12.541),v.scale.set(2.5,2,.1),this.add(v);let _=new ke(t,as(100));_.position.set(0,20,0),_.scale.set(1,.1,1),this.add(_)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function as(i){let e=new Dt;return e.color.setScalar(i),e}var Ir=(i,e)=>{let t=parseFloat(new URLSearchParams(location.search).get(i));return Number.isFinite(t)?t:e},Ai={safeTopRatio:Ir("coinTop",.13),gapRatio:Ir("coinGap",.045),fillRatio:Ir("coinFill",.72),bandAnchor:Ir("coinAnchor",.47),coinWidthRatio:Ir("coinWide",.4),maxSizeRatio:Ir("coinSize",.42),minSizeRatio:Ir("coinMin",.2),centerYRatio:Ir("coinY",.31)},sl=-2,al=sl-4.3,he={camera:{fov:38,x:0,y:.6,z:5.8},lights:{ambient:{color:16774367,intensity:.25},key:{color:16771248,intensity:2.2,x:3.5,y:4.5,z:4.5},fill:{color:11059432,intensity:.5,x:-4,y:1.5,z:3},rim:{color:16766826,intensity:1.5,x:-2.5,y:3.5,z:-4},front:{color:16773576,intensity:1,x:0,y:.8,z:5.5}},exposure:1.08,coin:{scale:2.15,swaySpeedY:.45,tiltBase:-.05,tiltOscillation:.025,tiltSpeed:.5,floatAmount:.04,floatSpeed:.7,baseY:1.05,color:"#ffd76a",metalness:1,roughness:.22,envMapIntensity:1.05,emissive:"#3d2508",emissiveIntensity:.05},door:{widthVsCoin:2.75,groundY:.15,baseX:0,baseZ:0,heroBaseZ:-.85,doorDepthSquash:.55,maxDepthWorld:3,shadowWidthMul:1.3,shadowDepthMul:2.2,color:"#ffd76a",metalness:1,roughness:.22,envMapIntensity:1.3,emissive:"#3d2508",emissiveIntensity:.05,leaf:{hero:{metalness:.12,roughness:.92,envMapIntensity:.12},meet:{metalness:.88,roughness:.5,envMapIntensity:.54},cross:{metalness:.95,roughness:.38,envMapIntensity:.72},meetOrn:{metalness:.95,roughness:.28,envMapIntensity:.88},crossOrn:{metalness:1,roughness:.23,envMapIntensity:1.05},meetDark:{metalness:.55,roughness:.72,envMapIntensity:.18},crossDark:{metalness:.65,roughness:.64,envMapIntensity:.24}},frameAnim:{hero:{metalness:.06,roughness:.9,envMapIntensity:.24,bumpScale:.045},meet:{metalness:.04,roughness:.88,envMapIntensity:.22,bumpScale:.03}},spots:{key:{color:16769973,intensity:120,angle:.45,penumbra:.5,decay:1.2,distance:0,x:1.2,y:5.5,z:2.5,tx:0,ty:.2,tz:0},rim:{color:9484799,intensity:45,angle:.6,penumbra:.7,decay:1.2,distance:0,x:-4.5,y:4,z:-4.5,tx:0,ty:-.2,tz:0},under:{color:16759424,intensity:12,angle:.9,penumbra:.8,decay:1.6,distance:0,x:0,y:-2,z:2.2,tx:0,ty:-.3,tz:0}},fog:725021,fogDensity:.08,transition:"doorway",roomCamZ:sl,roomCamY:.62,roomLook:{x:0,y:.55,z:sl-1.5},roomLight:{color:16760435,intensity:11,x:0,y:.9,z:sl+.05},veilFog:.06,exitFog:.16,exitFogSink:.14,fovKick:4,roomSwarm:{x:0,y:.55,leadOut:1.2,lead:2,scale:.35},funnel:{z:-.89,cx:0,cy:1.3,halfW:.42,halfH:.85,window:[.3,.52,.86,.98],depth:1.5,squeeze:.75,zSqueeze:.6},aimDoorT:[0,.45],aimRoomT:[.55,.95],leafFadeT:[.84,.94]},doorText:{bottomOffset:"9vh",horizontalOffset:"0px",maxWidth:"min(47rem, 90vw)",titleSize:"var(--fs-kicker)",textSize:"var(--fs-display)",gap:"1.4rem"},interaction:{hoverRadius:.075,hoverDelayMs:90,touchRadiusMul:2.2},room:{figure:{x:0,z:al},orbit:{count:12,trail:58,trailStep:.085,headSize:.15,tailSize:.08,minRadius:.46,maxRadius:.95,minY:.44,maxY:1.12,tilt:34,speed:.24,precession:.028,opacity:.82,neutralDim:.78},swarm:{ambientFloor:.62,stageFloor:.62,stageFalloff:.38,figureFloor:.6,chroma:1.16,nearFade:[.35,1.2]},accentIntensity:26,fillIntensity:10}};he.door.widthVsCoin=2.42,he.door.fogDensity=.026,he.door.doorDepthSquash=.72,he.door.maxDepthWorld=4.8,he.camera.fov=32,he.camera.y=1.55,he.camera.z=7.7,he.door.approachCamY=.62,he.door.approachCamZ=he.camera.z,he.exposure=.94,he.door.spots.key={color:16769973,intensity:15,angle:.72,penumbra:.62,decay:1.35,distance:0,x:-3.8,y:3.5,z:4.4,tx:0,ty:.2,tz:0},he.door.spots.rim={color:10465995,intensity:6.5,angle:.8,penumbra:.75,decay:1.35,distance:0,x:3.5,y:1.6,z:2,tx:0,ty:.1,tz:-.35},he.door.spots.under={color:16761455,intensity:4.4,angle:.7,penumbra:.85,decay:1.6,distance:0,x:0,y:.5,z:2.9,tx:0,ty:.25,tz:0};var p_=[{id:"soporte",label:"Pedestal",subtitle:"Base de la pieza central",glb:"figures/soporte.glb",available:!0,x:0,y:0,z:al,scale:.7,stretchY:1.6,color:10135229,finish:{metalness:.05,roughness:.7,color:4344931}},{id:"balanza",label:"Balanza",subtitle:"Equilibrio hawkish / dovish",glb:"figures/balanza.glb",available:!0,x:0,y:0,z:al,standsOn:"soporte",centerOn:"base",scale:1.15,color:16766826,finish:{metalness:0,roughness:.82,color:13089188}},{id:"inflacion",label:"Vela de precios",subtitle:"Presi\xF3n inflacionaria",glb:"figures/inflacion.glb",available:!1,x:-4.8,y:0,z:-3.2,scale:1,color:16747100},{id:"brote",label:"Brote",subtitle:"Crecimiento y holgura",glb:"figures/brote.glb",available:!1,x:4.8,y:0,z:-3.2,scale:1,color:9090296},{id:"acta",label:"Acta",subtitle:"Fuente trazable",glb:"figures/acta.glb",available:!1,x:0,y:0,z:-6.4,scale:.9,color:13620964},{id:"corpus",label:"Corpus",subtitle:"182 reuniones de referencia",glb:"figures/corpus.glb",available:!1,x:-4.6,y:0,z:-5.6,scale:.8,color:13620964},{id:"campana",label:"Campana",subtitle:"Inicio y cierre de sesi\xF3n",glb:"figures/campana.glb",available:!1,x:4.6,y:0,z:-5.6,scale:.8,color:16766826}];function m_(i,{onReady:e=null,debug:t=!1,dracoLoader:n=null}={}){let r=new Map,o=new Tt;o.name="dioramas",i.add(o);let s=n||(()=>{let m=new ss;return m.setDecoderPath("js/vendor/draco/"),m})(),a=new os;a.setDRACOLoader(s);let c=new en({color:9081766,metalness:.55,roughness:.35,transparent:!0,opacity:.6}),l=new Dt({color:16766826,wireframe:!0,transparent:!0,opacity:.22}),u=new Dt({color:16766826,transparent:!0,opacity:.08,side:Pt});function d(m,p=.06){m.updateMatrixWorld(!0);let v=new ut().setFromObject(m),_=v.min.y+(v.max.y-v.min.y)*p,T=[],w=[],E=new L;if(m.traverse(P=>{let y=P.isMesh?P.geometry?.attributes?.position:null;if(y)for(let M=0;M<y.count;M++)E.fromBufferAttribute(y,M).applyMatrix4(P.matrixWorld),E.y<=_&&(T.push(E.x),w.push(E.z))}),T.length<8)return null;let A=P=>{P.sort((D,V)=>D-V);let y=P[Math.floor(P.length*.05)],M=P[Math.min(P.length-1,Math.floor(P.length*.95))];return(y+M)/2};return{x:A(T),z:A(w)}}function h(m){let p=new ke(new ta(.2,0),c);p.material=c.clone(),p.userData={...m,pending:!0};let v=new ke(new ta(.27,1),l),_=new ke(new jc(.31,.38,32),u.clone());return _.rotation.x=-Math.PI/2,p.add(v),p.add(_),p}function f(){return document.getElementById("figureCabinet")}p_.forEach(m=>{if(!t&&!m.available)return;let p=new Tt;p.name=`figure--${m.id}`,p.position.set(m.x,m.y,m.z),p.visible=!0,o.add(p);let v={def:m,root:p,model:null,status:"searching"};r.set(m.id,v);let _=w=>{let E=w.scene;E.updateMatrixWorld(!0);let A=new ut().setFromObject(E),P=A.getSize(new L),y=Math.max(P.x,P.y,P.z)||1,M=m.scale/y;E.scale.setScalar(M),m.stretchY&&(E.scale.y*=m.stretchY),A.setFromObject(E);let D=A.getCenter(new L),V=D.x,te=D.z;if(m.centerOn==="base"){let I=d(E,m.footprintSlab??.06);I&&(V=I.x,te=I.z)}E.position.x-=V,E.position.z-=te,E.position.y-=A.min.y,A.setFromObject(E),v.height=A.max.y-A.min.y,E.traverse(I=>{if(!I.isMesh||!I.material)return;(Array.isArray(I.material)?I.material:[I.material]).filter(Boolean).forEach(G=>{let ee=m.finish,N=ee?.metalness??.82,X=ee?.roughness??.24;"metalness"in G&&(G.metalness=N),"roughness"in G&&(G.roughness=X),G.color=G.color||new ge,ee?.color!=null?G.color.set(ee.color):I.name.toLowerCase().includes("gold")||I.name.toLowerCase().includes("oro")?G.color.set(16766826):(I.name.toLowerCase().includes("blue")||I.name.toLowerCase().includes("azul"))&&G.color.set(9090296),G.needsUpdate=!0})}),p.clear(),p.add(E),v.model=E,v.status="loaded",g(),x(m,"ready"),e?.(v)},T=()=>{v.status="pending";let w=h(m);p.add(w),v.placeholder=w,x(m,"pending"),e?.(v)};m.available?(t&&x(m,"searching"),a.loadAsync(m.glb).then(_).catch(()=>{t&&T()})):t&&T()});function g(){r.forEach(m=>{let p=m.def.standsOn?r.get(m.def.standsOn):null;if(!p)return;let v=p.height??0;m.root.position.y=(m.def.y??0)+(p.def.y??0)+v})}function x(m,p){let v=f();if(!v)return;let _=v.querySelector(`[data-figure="${m.id}"]`);_||(_=document.createElement("div"),_.className="figure-row",_.dataset.figure=m.id,_.innerHTML=`<span class="figure-row-dot"></span><span class="figure-row-name">${m.label}</span><span class="figure-row-status">\u2026</span>`,v.appendChild(_));let T=_.querySelector(".figure-row-status");T&&(p==="ready"?(_.classList.add("is-ready"),T.textContent="listo"):p==="pending"?(_.classList.add("is-pending"),T.textContent="por modelar"):(_.classList.add("is-searching"),T.textContent="buscando\u2026"))}return{group:o,figures:r,defs:p_,restack:g}}function x_(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),o={},s={},a=i[0].morphTargetsRelative,c=new Ze,l=0;for(let u=0;u<i.length;++u){let d=i[u],h=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;o[f]===void 0&&(o[f]=[]),o[f].push(d.attributes[f]),h++}if(h!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in d.morphAttributes){if(!r.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;s[f]===void 0&&(s[f]=[]),s[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,u),l+=f}}if(t){let u=0,d=[];for(let h=0;h<i.length;++h){let f=i[h].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+u);u+=i[h].attributes.position.count}c.setIndex(d)}for(let u in o){let d=g_(o[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,d)}for(let u in s){let d=s[u][0].length;if(d===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let h=0;h<d;++h){let f=[];for(let x=0;x<s[u].length;++x)f.push(s[u][x][h]);let g=g_(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function g_(i){let e,t,n,r=-1,o=0;for(let l=0;l<i.length;++l){let u=i[l];if(u.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;o+=u.array.length}let s=new e(o),a=0;for(let l=0;l<i.length;++l)s.set(i[l].array,a),a+=i[l].array.length;let c=new Ye(s,t,n);return r!==void 0&&(c.gpuType=r),c}var Ut=3.5,Wt=6.2,so=Ut/2,mh=.12,cl=.2,dl=.16,__=.36,hl=5,y_=3.35,ll=Ut/2+.06+.26+.14,ul=2.35,Mn=dl*hl;function mi(i,e,t,n={}){return new en({color:i,metalness:e,roughness:t,...n})}var gh={stone:mi(6709594,.05,.9),stone_dark:mi(4867650,.05,.92),granite:mi(2762532,.1,.6),marble:mi(9207920,.05,.3),medal:mi(13211455,1,.35),bronze:mi(9071164,1,.38),bronze_dark:mi(4864032,1,.55),bronze_matte:mi(6966828,.9,.6),glow:new en({color:2363653,emissive:16749632,emissiveIntensity:.6,roughness:1,metalness:0})},v_={bronze:mi(9071164,1,.38),bronze_dark:mi(4864032,1,.55),bronze_matte:mi(6966828,.9,.6)};function E_(){let i=new Map,e=new Map,t={},n=(T,w)=>{if(!T)return w;let E=T==="Door_L"?-Ut/2:Ut/2;return new De().makeTranslation(-E,0,-Mn).multiply(w)},r=(T,w,E)=>`${T}|${w}|${E||""}`;function o(T,w,E,A,P){let y=A.clone();y.applyMatrix4(n(E,P||new De));let M=r(T,w,E);i.has(M)||i.set(M,[]),i.get(M).push(y)}let s=(T,w,E,A=0,P=0,y=0)=>{let M=new De,D=new Jt().setFromEuler(new Er(A,P,y));return M.compose(new L(T,w,E),D,new L(1,1,1)),M};function a(T,w,E,A,P,y,M,D,V,te){o(T,w,E,new Yn(M,D,V),s(A,P,y,...te||[0,0,0]))}function c(T,w,E,A,P,y,M,D,V="Z",te=20,I=null){let k={Z:[0,0,0],Y:[Math.PI/2,0,0],X:[0,0,Math.PI/2]}[V];o(T,w,E,new ea(M,M,D,te),s(A,P,y,...I||k))}function l(T,w,E,A,P,y,M,D,V="Z",te=20){let I=V==="Y"?[Math.PI/2,0,0]:V==="X"?[0,Math.PI/2,0]:[0,0,0];o(T,w,E,new Kc(M,D,10,te),s(A,P,y,...I))}function u(T,w,E,A,P,y,M,D,V,te,I=10,k=7){let G=new na(.5,I,k),ee=s(A,P,y,...te||[0,0,0]),N=new De().makeScale(M,D,V);ee.multiply(N),o(T,w,E,G,ee)}function d(T,w,E,A){e.has(T)||e.set(T,[]),e.get(T).push(n(T,s(w,E,A)))}function h(T,w,E,A,P,y,M){let D=-mh/2;a("bronze_matte","leaf",w,E,D-.01,A,P,.02,y);let V=.07,te=.05;a("bronze","leaf",w,E,D-te/2+.01,A+y/2-V/2,P,te,V),a("bronze","leaf",w,E,D-te/2+.01,A-y/2+V/2,P,te,V),a("bronze","leaf",w,E-P/2+V/2,D-te/2+.01,A,V,te,y-2*V),a("bronze","leaf",w,E+P/2-V/2,D-te/2+.01,A,V,te,y-2*V);let I=.016,k=I*4.2,G=E-P/2+V+I,ee=E+P/2-V-I,N=A-y/2+V+I,X=A+y/2-V-I,q=Math.max(2,Math.round((ee-G)/k)),J=Math.max(2,Math.round((X-N)/k));for(let H=0;H<=q;H++){let $=G+(ee-G)*H/q;d(w,$,D-.008,N),d(w,$,D-.008,X)}for(let H=1;H<J;H++){let $=N+(X-N)*H/J;d(w,G,D-.008,$),d(w,ee,D-.008,$)}let fe=D;if(M==="rosette"){let H=Math.min(P,y)*.62;a("bronze","leaf",w,E,fe-.02,A,H,.04,H),a("bronze_dark","leaf",w,E,fe-.045,A,H*.78,.02,H*.78),c("bronze","leaf",w,E,fe-.075,A,H*.16,.05,"Y",16),u("bronze","leaf",w,E,fe-.1,A,H*.14,H*.14,H*.14);for(let $=0;$<8;$++){let me=$*2*Math.PI/8;u("bronze","leaf",w,E+Math.cos(me)*H*.24,fe-.07,A+Math.sin(me)*H*.24,H*.18,.04,H*.32,[0,-me+Math.PI/2,0],8,6)}for(let[$,me]of[[-1,-1],[1,-1],[-1,1],[1,1]])u("bronze","leaf",w,E+$*H*.33,fe-.06,A+me*H*.33,H*.2,.04,H*.12,[0,Math.atan2(me,$)+Math.PI/2,0],8,6)}else if(M==="knocker"){let H=fe-.02,$=A+.1;u("bronze","leaf",w,E,H-.02,$+.12,.056,.04,.19,null,12,8);for(let me of[-1,1])u("bronze","leaf",w,E+me*.05,H-.02,$+.1,.044,.036,.14,[0,me*-.52,0],12,8),u("bronze","leaf",w,E+me*.078,H-.02,$+.06,.044,.032,.06,[0,me*-1.3,0],8,6),u("bronze","leaf",w,E+me*.035,H-.02,$-.02,.032,.03,.07,[0,me*.52,0],8,6);a("bronze","leaf",w,E,H-.025,$+.02,.11,.03,.03),u("bronze","leaf",w,E,H-.02,$-.03,.036,.03,.09,null,8,6),c("bronze_dark","leaf",w,E,H-.05,$-.06,.018,.06,"X",12),l("bronze","leaf",w,E,H-.05,$-.19,.13,.024,"Y",20),a("bronze","leaf",w,E,H-.05,$-.32,.05,.05,.05)}}function f(T,w){let E=Math.sign(w)*Ut/2,A=new We;A.name=`${T}_Pivot`,A.position.set(E,0,Mn),A.userData.openSign=w<0?1:-1;let P=T,y=Mn,M=y+Wt/2;a("bronze","leaf",P,w,0,M,so,mh,Wt);let D=-mh/2,V=so-2*cl;a("bronze","leaf",P,w,D-.015,y+.32,so-.04,.03,.62);let te=y+.65+cl+1.45/2,I=te+1.45/2+cl+2.05/2,k=I+2.05/2+cl+1.05/2;h(`${P}_Bottom`,P,w,te,V,1.45,"rosette"),h(`${P}_Middle`,P,w,I,V,2.05,"knocker"),h(`${P}_Top`,P,w,k,V,1.05,"rosette");let G=w-Math.sign(w)*(so/2-.1);a("bronze_dark","leaf",P,G,D-.01,y+2.95,.06,.02,.3);let ee=w+Math.sign(w)*(so/2+.02);for(let N of[.7,2.4,4.1,5.7])c("bronze_dark","leaf",P,ee,D+.02,y+N,.035,.28,"Z",10);return t[T]=A,A}function g(T,w,E,A){let P="facade";a("stone",P,null,w,-.28/2-.05,E+1.1/2,.95+.16,.28+.1,1.1),a("stone",P,null,w,-.28/2-.08,E+1.1+.06,.95+.26,.28+.16,.12);let V=E+1.1+.12,te=1,I=A-te-V;a("stone",P,null,w,-.28/2,V+I/2,.95,.28,I);for(let G of[-.95*.28,0,.95*.28])a("stone_dark",P,null,w+G,-.28-.005,V+I/2,.95*.12,.02,I-.5);let k=V+I;a("stone",P,null,w,-.28/2-.02,k+.04,.95+.06,.28+.04,.08),o("stone",P,null,new ea(.95*.56,.95*.38,.6,14),s(w,-.28/2,k+.36,Math.PI/2));for(let[G,ee,N]of[[.26,5,-.2],[.5,4,-.08]])for(let X=0;X<ee;X++){let q=w-.475+.95*(X+.5)/ee;u("stone",P,null,q,-.28+.02,k+G,.17,.1,.44,[N,0,0],8,6)}for(let G of[-1,1])l("stone",P,null,w+G*(.95/2-.06),-.28-.1,k+.66,.12,.05,"Y",14);a("stone",P,null,w,-.28/2-.06,k+te-.07,.95+.36,.28+.16,.14)}{let E=Mn+Wt+1.15+1.1,A=E+.5,P=Mn+Wt+.75,y=(8.6-Ut)/2;for(let M of[-1,1])a("stone","facade",null,M*(Ut/2+y/2),.5,A/2,y,1,A);a("stone","facade",null,0,.5,(P+A)/2,Ut+.02,1,A-P),a("granite","facade",null,0,-.1,Mn/2,8.6,.2,Mn);for(let M of[-1,1])g(`Pilaster_${M}`,M*y_,Mn,E);a("stone","facade",null,0,-.3,E+.25,8.6,.6,.5)}{let T=Mn,w=.55,E=.3,A=.75;for(let te of[-1,1]){let I=te*(Ut/2+w/2);a("stone","frame",null,I,-E/2,T+Wt/2,w,E,Wt),a("stone","frame",null,te*(Ut/2+.16),-E-.015,T+Wt/2,.2,.03,Wt)}a("stone","frame",null,0,-E/2,T+Wt+A/2,Ut+2*w,E,A),a("stone","frame",null,0,-E-.015,T+Wt+.08,Ut+.48,.03,.16),a("stone","frame",null,0,-E-.12,T+Wt+A+.08,Ut+2*w+.4,.24+E,.16);let P=.06;a("bronze","frame",null,0,-E/2-.02,T+Wt+P/2,Ut+2*P,E+.04,P);for(let te of[-1,1])a("bronze","frame",null,te*(Ut/2+P/2),-E/2-.02,T+Wt/2,P,E+.04,Wt);let y=Ut/2+w,D=y_-.95/2-.08-y+.02,V=Wt+A+.16;for(let te of[-1,1])a("stone","frame",null,te*(y+D/2-.01),-E/2+.031,T+V/2,D,E-.06,V);c("medal","medal",null,-ll,-E-.02,T+ul+.35,.1,.03,"Z",24),l("medal","medal",null,-ll,-E-.045,T+ul+.35,.08,.01,"Y",24),c("medal","medal",null,ll,-E-.02,T+ul+.35,.1,.03,"Z",24),l("medal","medal",null,ll,-E-.045,T+ul+.35,.08,.01,"Y",24)}{let T=Ut+1.1+.9,w=__*hl+.6;for(let A=0;A<hl;A++){let P=__*(hl-A)+.6,y=dl*(A+.5);a("granite","frame",null,0,-P/2,y,T,P,dl),a("granite","frame",null,0,-P-.015,y+dl/2-.02,T,.03,.04)}let E=.45;for(let A of[-1,1]){let P=A*(T/2+E/2);a("stone","frame",null,P,-w/2,Mn/2+.06,E,w,Mn+.12),a("stone","frame",null,P,-w/2,Mn+.16,E+.08,w+.08,.08)}a("bronze_dark","frame",null,0,-.05,Mn+.01,Ut+.1,.3,.02)}{let T=Mn,w=5,E=5,A=Wt+1;a("stone_dark","interior",null,0,w/2+.1,T-.05,E,w,.1),a("stone_dark","interior",null,0,w/2,T+A+.05,E,w,.1);for(let P of[-1,1])a("stone_dark","interior",null,P*(E/2+.05),w/2,T+A/2,.1,w,A);a("stone_dark","interior",null,0,.3,T+Wt+.5,E,.4,1);for(let P of[-1,1])a("stone_dark","interior",null,P*(Ut/2+(E-Ut)/4),.3,T+Wt/2,(E-Ut)/2,.4,Wt);a("glow","glow",null,0,w-.15,T+3.25,4.7,.05,6.7)}let x=f("Door_L",-so/2),m=f("Door_R",so/2),p=new Tt;p.name="CentralBankDoor";let v={Door_L:x,Door_R:m};for(let[T,w]of i){let[E,A,P]=T.split("|"),y=x_(w,!1);if(!y)continue;let M=(A==="leaf"?v_:gh)[E]||gh[E],D=new ke(y,M);D.name=`${A}_${E}${P?"_"+P:""}`,D.userData.role=A,D.userData.matName=E,D.matrixAutoUpdate=!1,D.matrix.identity(),(P?v[P]:p).add(D)}let _=new na(.012,6,4);for(let[T,w]of e){let E=new io(_,v_.bronze,w.length);w.forEach((A,P)=>E.setMatrixAt(P,A)),E.instanceMatrix.needsUpdate=!0,E.name=`leaf_beads_${T}`,E.userData.role="leaf",E.userData.matName="bronze",v[T].add(E)}return p.add(x,m),p.updateMatrixWorld(!0),{group:p,pivotL:x,pivotR:m,glowMat:gh.glow}}pl();fa();var xl=[],vh=[],Eh=[],pa=!1,cs=!1,S_=!1,$M=4e3,ZM=350,JM=800;function A_(i=ZM){return new Promise(e=>{if(S_){setTimeout(e,0);return}typeof requestIdleCallback=="function"?requestIdleCallback(()=>e(),{timeout:i}):setTimeout(e,Math.min(i,200))})}function T_(i){A_(JM).then(i)}function w_(){if(!pa)if(pa=!0,document.readyState==="complete")T_(_l);else{let i=()=>T_(_l);window.addEventListener("load",i,{once:!0}),setTimeout(i,$M)}}async function _l(){for(;xl.length;){await A_();let i=xl.shift();try{await i()}catch(e){console.warn("Tarea diferida del arranque incompleta:",e)}}for(cs=!0;vh.length;){let i=vh.shift();try{i()}catch(e){console.warn("Aviso tras el arranque diferido:",e)}}for(;Eh.length;)Eh.shift()()}function R_(){S_=!0,pa||(pa=!0,_l())}function C_(){return cs?Promise.resolve():new Promise(i=>Eh.push(i))}function ls(i){xl.push(i),cs?(cs=!1,_l()):w_()}function L_(i){cs?i():vh.push(i)}var P_=()=>({pending:xl.length,started:pa,finished:cs});w_();Th();var us=null;function $l(){return us||(window.d3?(us=Promise.resolve(window.d3),us):(us=new Promise((i,e)=>{let t=document.createElement("script");t.src="js/vendor/d3.min.js",t.async=!0,t.onload=()=>i(window.d3),t.onerror=()=>e(new Error("No se pudo cargar js/vendor/d3.min.js")),document.head.appendChild(t)}),us))}gsap.registerPlugin(ScrollTrigger,CustomEase,SplitText);CustomEase.create("cinematicIn","0.22,1,0.36,1");CustomEase.create("cinematicOut","0.61,1,0.88,1");CustomEase.create("cinematicInOut","0.65,0,0.35,1");CustomEase.create("cinematicSilk","0.45,0.05,0.55,0.95");CustomEase.create("cinematicSnap","0.16,1,0.3,1");"scrollRestoration"in history&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("load",()=>{window.scrollY!==0&&window.scrollTo(0,0)});window.addEventListener("pageshow",i=>{i.persisted&&window.scrollTo(0,0)});var Ls=/[?&]debug\b/.test(location.search);if(!Ls)["debugPanel","timelineScrubber","figureCabinet"].forEach(i=>{let e=document.getElementById(i);e&&(e.style.display="none")});else{let i=document.getElementById("figureCabinet");i&&(i.style.display="block")}var Jn=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,ob=Jn?0:1;await Promise.race([new Promise(i=>requestAnimationFrame(()=>requestAnimationFrame(i))),new Promise(i=>setTimeout(i,100))]);var Ra=document.getElementById("canvas"),Qn=document.getElementById("load"),zh=document.getElementById("haloWrap"),El=document.getElementById("objectReflection"),W_=document.getElementById("scrollHint"),by=document.getElementById("hero"),Ml=document.querySelector(".hero-title"),As=1;function X_(i){i!==As&&(As=i,i===1?(zh.classList.remove("hidden-stage"),W_.classList.remove("hidden")):(zh.classList.add("hidden-stage"),W_.classList.add("hidden")),wn.children.length>0&&(wn.visible=i===1&&Ur>.01),document.body.style.cursor=i===1?"grab":"")}var Ty=new IntersectionObserver(i=>{i.forEach(e=>{e.isIntersecting&&(e.target===by?X_(1):X_(2))})},{threshold:.45});Ty.observe(by);document.querySelectorAll(".stage-hook, .stage-voices, .stage-acts, .stage-counters, .stage-pipeline, .stage-timeline, .stage-quotes, .stage-closing, #stageObjective, #stageHook, #stageAxes, #stageRoomContainer").forEach(i=>Ty.observe(i));var lt=new Qr,ho=.7;lt.fog=new js(he.door?.fog??658970,0);var Gl=tn(),Et=new ht(he.camera.fov,Gl.width/Gl.height,.1,100);Et.position.set(he.camera.x,he.camera.y,he.camera.z);Et.lookAt(0,.95,-.25);var et=null,Zl=/HeadlessChrome|Headless/.test(navigator.userAgent),Sy=typeof navigator.cpuPerformance=="number"?navigator.cpuPerformance:0,Vl=typeof navigator.deviceMemory=="number"&&navigator.deviceMemory<=4||Sy===1,yi=Math.min(window.devicePixelRatio||1,Vl?1:1.25),Rn=yi,ws=!1,Ay=0;try{et=new Ys({canvas:Ra,antialias:!Vl,alpha:!0,powerPreference:"high-performance"}),et.setPixelRatio(Rn),et.setSize(Gl.width,Gl.height),et.outputColorSpace=tt,et.toneMapping=Ba,et.toneMappingExposure=he.exposure,et.shadowMap.enabled=!1,et.debug.checkShaderErrors=Ls}catch{et=null}et||(Qn.innerHTML='<span style="opacity:.9">Tu dispositivo no soporta WebGL. Se muestra una versi&oacute;n simplificada.</span>');et&&(Ra.addEventListener("webglcontextlost",i=>{i.preventDefault(),!ws&&(Qn.innerHTML='<span style="opacity:.9">Conexi&oacute;n WebGL perdida. Recargue la p&aacute;gina.</span>',Qn.style.display="flex")},!1),Ra.addEventListener("webglcontextrestored",()=>{ws||window.location.reload()},!1));var kh="",mf=!1,sb=/intel.*(hd graphics|uhd graphics|iris.{0,6}(xe|plus|pro)|gen[5-9])|adreno.*\b(3\d\d|4\d\d|5[01]\d|6[01]\d|64\d)\b|powervr|mali-t\d{2}|swiftshader|llvmpipe/i;if(et)try{let i=et.getContext(),e=i.getExtension("WEBGL_debug_renderer_info");e&&(kh=String(i.getParameter(e.UNMASKED_RENDERER_WEBGL)||"")),mf=sb.test(kh)}catch{}if(mf&&!Zl){yi=Math.min(yi,1),Rn=yi;let i=tn();et.setPixelRatio(Rn),et.setSize(i.width,i.height,!1)}et&&typeof navigator.getBattery=="function"&&!Zl&&navigator.getBattery().then(i=>{i&&!i.charging&&i.level<=.2&&yi>1&&(yi=Math.min(yi,1),ff(Math.min(Rn,yi)))}).catch(()=>{});window.__D3_PERF={get gpu(){return kh},get tier(){return et?mf||Vl?"lite":"high":"none"},lowMem:Vl,cpuTier:Sy,headless:Zl,get armed(){return La},get frames(){return Jy},get samples(){return uo.length},get dpr(){return Rn},get cap(){return yi},get poster(){return ws},get avgMs(){return Ay}};if(et){let i=new Sr(et);lt.environment=i.fromScene(new ol,.04).texture,i.dispose()}var q_=["map","normalMap","roughnessMap","metalnessMap","aoMap","emissiveMap","bumpMap","alphaMap","displacementMap","lightMap","envMap"],Y_=new Set,ab=0,ya=null,Gh=!1,bl=()=>new Promise(i=>setTimeout(i,0));function wy(){return et?ya?(Gh=!0,ya):(ya=cb(),ya):Promise.resolve()}async function cb(){do{Gh=!1;try{await lb()}catch(i){console.warn("Precalentado de la escena incompleto:",i)}}while(Gh);ya=null}async function lb(){let i=`warmUpScene ${++ab}`;try{performance.mark(`${i} start`)}catch{}let e=Pi?Pi.visible:null,t=[],n=new Set;try{lt.traverse(s=>{let a=Array.isArray(s.material)?s.material:s.material?[s.material]:[];for(let c=0;c<a.length;c++){let l=a[c];l&&l.transparent&&l.side===Pt&&l.forceSinglePass===!1&&(t.push(l),l.forceSinglePass=!0)}}),await bl();for(let s of e===null?[!0]:[e,!e])Pi&&(Pi.visible=s),et.compile(lt,Et),lt.traverse(a=>{let c=Array.isArray(a.material)?a.material:a.material?[a.material]:[];for(let l=0;l<c.length;l++){let u=c[l];if(!u)continue;let d=et.properties.get(u)?.currentProgram;d&&n.add(d)}}),await bl();let r=0;for(let s of n){try{s.getUniforms()}catch{}++r%6===0&&await bl()}let o=[];lt.traverse(s=>{let a=Array.isArray(s.material)?s.material:s.material?[s.material]:[];for(let c=0;c<a.length;c++){let l=a[c];if(l)for(let u=0;u<q_.length;u++){let d=l[q_[u]];!d||!d.isTexture||Y_.has(d.uuid)||(Y_.add(d.uuid),o.push(d))}}});for(let s=0;s<o.length;s++)et.initTexture(o[s]),s%4===3&&await bl()}catch(r){console.warn("Precalentado de la escena incompleto:",r)}finally{for(let r=0;r<t.length;r++)t[r].forceSinglePass=!1;Pi&&(Pi.visible=e);try{performance.mark(`${i} end`),performance.measure("warmUpScene",`${i} start`,`${i} end`)}catch{}}}var gt=he.lights,Ry=new ca(gt.ambient.color,gt.ambient.intensity);lt.add(Ry);var gf=new Si(gt.key.color,gt.key.intensity);gf.position.set(gt.key.x,gt.key.y,gt.key.z);var xf=new Si(gt.fill.color,gt.fill.intensity);xf.position.set(gt.fill.x,gt.fill.y,gt.fill.z);var _f=new Si(gt.rim.color,gt.rim.intensity);_f.position.set(gt.rim.x,gt.rim.y,gt.rim.z);var yf=new Si(gt.front.color,gt.front.intensity);yf.position.set(gt.front.x,gt.front.y,gt.front.z);lt.add(gf,xf,_f,yf);var Cy=new pi(16773576,.4,8);lt.add(Cy);var gs=new ss,ub="https://www.gstatic.com/draco/versioned/decoders/1.5.6/",db="https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/",Ah=i=>(gs.dispose(),gs.decoderPending=null,gs.setDecoderPath(i),gs.preload().decoderPending);Ah("js/vendor/draco/").catch(()=>(console.warn("Draco local no disponible \u2014 usando CDN gstatic"),Ah(ub))).catch(()=>(console.warn("Draco CDN primario no disponible \u2014 usando mirror jsDelivr"),Ah(db))).catch(i=>console.warn("Ning\xFAn decodificador Draco disponible:",i));var Xt=m_(lt,{dracoLoader:gs,debug:Ls,onReady:()=>setTimeout(wy,0)}),xs=new Cr(16767400,0,9,.55,.62,1.4);xs.position.set(0,2.8,-3);var Jl=new We;Jl.position.set(0,.6,-4.8);xs.target=Jl;lt.add(xs);lt.add(Jl);var Ma=new pi(10466520,0,8,1.8);Ma.position.set(-2.4,1.4,-2.4);lt.add(Ma);var Ci=[];function hb(){let i=he.door.spots,e=new Tt;e.name="doorLights";let t=n=>{let r=new Cr(n.color,n.intensity,n.distance,n.angle,n.penumbra,n.decay);r.position.set(n.x,n.y,n.z);let o=new We;return o.position.set(n.tx,n.ty,n.tz),r.target=o,e.add(r),e.add(o),Ci.push(r),r};return t(i.key),t(i.rim),t(i.under),lt.add(e),e.visible=!1,e}var Pi=hb(),Ql=document.createElement("canvas");Ql.width=256;Ql.height=256;var vf=Ql.getContext("2d"),eu=vf.createRadialGradient(128,128,0,128,128,128);eu.addColorStop(0,"rgba(0, 0, 0, 0.9)");eu.addColorStop(.4,"rgba(0, 0, 0, 0.5)");eu.addColorStop(1,"rgba(0, 0, 0, 0)");vf.fillStyle=eu;vf.fillRect(0,0,256,256);var fb=new ro(Ql),ur=new ke(new $r(1,1),new Dt({map:fb,transparent:!0,opacity:.8,depthWrite:!1,blending:Us}));ur.rotation.x=-Math.PI/2;ur.position.set(0,0,0);lt.add(ur);var wn=new Tt;lt.add(wn);var Cl=[],Vh=null,Wh=0,Ef=0,Rs={diameter:0,centerY:0,band:null};function pb(){return Ml?Number.isFinite(Ml.offsetTop)?Ml.offsetTop:Ml.getBoundingClientRect().top+(window.scrollY||0):NaN}function mb(){let{width:i,height:e}=tn(),t=oe.clamp(e*Ai.safeTopRatio,56,112),n=pb(),o=(Number.isFinite(n)&&n>0&&n<e*1.5?n:e*.78)-Math.max(18,e*Ai.gapRatio);return{w:i,h:e,top:t,bottom:o,height:Math.max(0,o-t)}}function Mf(){let i=mb(),{w:e,h:t}=i;if(!!0){let l=oe.clamp(.028*e,16,34);return{diameter:Math.min(Math.max(l*9,Math.min(e,t)*(M_()?.46:.4)),Math.min(e*.5,680),i.height>0?i.height*.82:1/0),centerY:t*.41,band:i}}let n=Math.max(Math.min(e,t)*Ai.minSizeRatio,Math.min(i.height*Ai.fillRatio,e*Ai.coinWidthRatio,t*Ai.maxSizeRatio)),r=n/2,o=i.top+r,s=i.bottom-r,a=i.top+i.height*Ai.bandAnchor,c=s>=o?oe.clamp(a,o,s):(i.top+i.bottom)/2;return{diameter:n,centerY:c,band:i}}function gb(){return Mf().diameter}function Ly(){let{height:i}=tn(),e=Math.tan(he.camera.fov*Math.PI/360),t=he.camera.z,n=i/(2*e*t);return oe.clamp(gb()/(he.coin.scale*n),.25,3.4)}function Py(){let{height:i}=tn(),e=i*Ai.centerYRatio,t=Math.tan(he.camera.fov*Math.PI/360),n=i/(2*t*he.camera.z);return oe.clamp(ho+(i*.5-e)/n,.15,2.5)}function Iy(){Rs=Mf(),Ef=Rs.diameter,Vh&&Wh&&Vh.scale.setScalar(Wh*Ly()),he.coin.baseY=Py()}function xb(){return he.coin.scale*Ly()}Rs=Mf();Ef=Rs.diameter;he.coin.baseY=Py();var Ca=new is;Ca.onLoad=()=>{R_(),Promise.all([wy(),C_()]).finally(()=>{setTimeout(()=>{et&&Qn.classList.add("hidden"),ev()},300)})};Ca.onError=i=>console.warn("Error cargando recurso:",i);setTimeout(()=>{Qn&&!Qn.classList.contains("hidden")&&(Qn.innerHTML='<span style="opacity:.9">La carga est&aacute; tomando m&aacute;s tiempo del esperado. Verifique su conexi&oacute;n a internet.</span>')},15e3);setTimeout(()=>{Qn&&!Qn.classList.contains("hidden")&&Qn.classList.add("hidden"),ev()},3e4);var bf=new os(Ca);bf.setDRACOLoader(gs);bf.load("monedav5-draco.glb",i=>{let e=i.scene;e.rotation.y=-Math.PI/2;let t=new ut().setFromObject(e);if(!t.isEmpty()){let n=t.getCenter(new L);e.position.sub(n);let r=t.getSize(new L);Wh=he.coin.scale/Math.max(r.x,r.y,r.z),Vh=e,Iy()}e.traverse(n=>{!n.isMesh||!n.material||[n.material].flat().forEach(r=>{!r||!("metalness"in r)||(r.side=$t,r.metalness=he.coin.metalness,r.roughness=he.coin.roughness,r.envMapIntensity=he.coin.envMapIntensity,r.emissiveIntensity=.14,r.envMapIntensity=1.25,r.needsUpdate=!0,Cl.push(r))})}),wn.add(e)},void 0,i=>{console.error("Error cargando GLB:",i),Qn.innerHTML='<span style="opacity:.9">No se pudo cargar la moneda</span>',setTimeout(()=>Qn.classList.add("hidden"),1200)});var ot=new Tt;lt.add(ot);ot.visible=!1;var Wl=new pi(he.door?.roomLight?.color??16760435,0,16,1.8);Wl.position.set(he.door?.roomLight?.x??0,he.door?.roomLight?.y??.9,he.door?.roomLight?.z??-.45);lt.add(Wl);var Ii=new Tt;ot.add(Ii);var cr=null,Xh=[],po=null,fo=null,qh=null,Yh=null,jh=null,Kh=[],_b=[],$h=[],ba=[],Zn={vis:-1,colorT:-1,crossT:-1,scatter:-1,exitT:-1,fade:-1};function Tf(){if(!cr||!po)return;let i=he.door,e=tn(),t=e.width/Math.max(e.height,1),n=oe.clamp(1.9/t,.78,1),r=xb()*(i.widthVsCoin??1.4)*n,o=r/Math.max(po.width,.001),a=!!fo&&cr===fo?1:oe.clamp(i.doorDepthSquash??1,.05,1),c=po.depth*o*a,l=Math.min(1,(i.maxDepthWorld??1/0)/Math.max(c,1e-6));Ii.scale.set(o,o,o*a*l),ur.scale.set(r*(i.shadowWidthMul??1.3),c*l*(i.shadowDepthMul??2.2),1)}function yb(i){i.updateMatrixWorld(!0);let e=new ut().setFromObject(i);if(e.isEmpty())return null;let t=e.getCenter(new L);i.position.sub(t),i.updateMatrixWorld(!0);let n=new ut().setFromObject(i),r=n.getSize(new L);return po={width:Math.max(r.x,.001),depth:Math.max(r.z,.001)},Aa=Math.max(r.y,.001),Sa=n.min.y,Yl=n.max.y,cr=i,Tf(),n}function Dy(){let i=he.doorText;if(!i)return;let e=document.getElementById("stageObjectiveContainer"),t=document.getElementById("stageObjectiveTitle"),n=document.getElementById("stageObjectiveParagraph");e&&(i.bottomOffset&&(e.style.paddingBottom=i.bottomOffset),i.horizontalOffset&&(e.style.transform=`translateX(${i.horizontalOffset})`)),t&&(i.titleSize&&(t.style.fontSize=i.titleSize),i.gap&&(t.style.marginBottom=i.gap),t.style.color="var(--color-gold)",t.style.letterSpacing="0.34em"),n&&(i.textSize&&(n.style.fontSize=i.textSize),i.maxWidth&&(n.style.maxWidth=i.maxWidth),n.style.lineHeight="1.38",n.style.fontWeight="500")}Dy();function tu(i,e){let t=document.createElement("canvas");t.width=t.height=i;let n=t.getContext("2d");e(n,i);let r=new ro(t);return r.wrapS=r.wrapT=ii,r.anisotropy=8,r.colorSpace=tt,r.needsUpdate=!0,r}function vb(){return tu(512,(i,e)=>{i.fillStyle="#243044",i.fillRect(0,0,e,e);for(let t=0;t<5200;t++){let n=.04+Math.random()*.16;i.fillStyle=Math.random()>.45?`rgba(210,224,240,${n})`:`rgba(4,8,14,${n*1.5})`,i.fillRect(Math.random()*e,Math.random()*e,1+Math.random()*4,1+Math.random()*3)}i.globalAlpha=.22;for(let t=0;t<e;t+=28)i.fillStyle=t%56===0?"#121820":"#3a4c62",i.fillRect(0,t,e,2);i.globalAlpha=1})}function Eb(){return tu(256,(i,e)=>{i.fillStyle="#1a222e",i.fillRect(0,0,e,e),i.strokeStyle="#c5b48a",i.lineWidth=9,i.lineJoin="miter",i.lineCap="square";let t=64;for(let n=0;n<e;n+=t)for(let r=0;r<e;r+=t)i.beginPath(),i.moveTo(r+8,n+18),i.lineTo(r+46,n+18),i.lineTo(r+46,n+50),i.lineTo(r+22,n+50),i.lineTo(r+22,n+34),i.lineTo(r+8,n+34),i.closePath(),i.stroke()})}function Mb(){return tu(512,(i,e)=>{let t=i.createLinearGradient(0,0,e,e);t.addColorStop(0,"#f0c875"),t.addColorStop(.48,"#d8a653"),t.addColorStop(1,"#fff0b1"),i.fillStyle=t,i.fillRect(0,0,e,e);for(let n=0;n<4200;n++){let r=.025+Math.random()*.1;i.fillStyle=Math.random()>.52?`rgba(255,238,178,${r})`:`rgba(72,43,13,${r*1.2})`;let o=Math.random()*e,s=Math.random()*e;i.fillRect(o,s,1+Math.random()*2.5,3+Math.random()*16)}i.globalAlpha=.18,i.strokeStyle="#211307",i.lineWidth=1;for(let n=6;n<e;n+=18+Math.random()*8)i.beginPath(),i.moveTo(n,0),i.lineTo(n+Math.sin(n)*5,e),i.stroke();i.globalAlpha=1})}function bb(){return tu(512,(i,e)=>{let t=i.createRadialGradient(e*.5,e*.45,0,e*.5,e*.48,e*.52);t.addColorStop(0,"rgba(255, 192, 94, 0.75)"),t.addColorStop(.3,"rgba(255, 150, 46, 0.26)"),t.addColorStop(.58,"rgba(146, 76, 20, 0.08)"),t.addColorStop(1,"rgba(0, 0, 0, 0)"),i.fillStyle=t,i.fillRect(0,0,e,e)})}var Zh=vb();Zh.repeat.set(2.4,3);var Tb=Mb();Tb.repeat.set(1.4,4.6);var Sb=Eb();Sb.repeat.set(6,8);var Jh=bb();Jh.wrapS=Jh.wrapT=Ot;var Qh=new Dt({map:Jh,transparent:!0,opacity:0,depthWrite:!1,depthTest:!1,blending:dr,toneMapped:!1}),Di=new ke(new $r(1,1),Qh);Di.name="doorEditorialAura";Di.renderOrder=-5;Di.visible=!1;ot.add(Di);var Ta=[],ef=[],Ll=[],Ab=[],Pl=[],j_=[],Xl=[],Uy=new ge("#07090f"),wb=new ge("#6b4f28"),Rb=new ge("#d9a94f"),Cb=new ge("#201307"),Lb=new ge("#2d1b08"),Pb=new ge("#c9973f"),Ib=new ge("#ffd76a"),ql={stone:{hero:new ge("#6e7d92"),meet:new ge("#3a4048")},dark:{hero:new ge("#4c5666"),meet:new ge("#252b33")},granite:{hero:new ge("#2a2724"),meet:new ge("#22201e")},medal:{hero:new ge("#c9973f"),meet:new ge("#c9973f")}},Db=new ge(13951218),Ub=new ge(15265526),Nb=new ge(7242140),Bb=new ge(9081763);function K_(i){return i==="stone_dark"?"dark":i==="granite"?"granite":"stone"}var Il=null,Dl=null,Ul=null,Sa=-1.15,Yl=1.15,Aa=0;{let i=E_(),e=i.group;qh=e,e.rotation.x=-Math.PI/2,Il=i.pivotL,Dl=i.pivotR,Ul=i.glowMat,e.updateMatrixWorld(!0);let t=new ut().setFromObject(e);if(!t.isEmpty()){let n=new ut;e.traverse(a=>{a.userData.role==="leaf"&&n.expandByObject(a)});let o=(n.isEmpty()?t:n).getCenter(new L);e.position.sub(o),e.updateMatrixWorld(!0);let s=t.getSize(new L);po={width:Math.max(s.x,.001),depth:Math.max(s.z,.001)},Aa=Math.max(s.y,.001),Sa=t.min.y-o.y,Yl=t.max.y-o.y,cr=e,Tf()}e.traverse(n=>{if(!n.isMesh||!n.material)return;let r=n.material;if(!("metalness"in r))return;let o=n.userData.role,s=o==="leaf",a=o==="glow",c=o==="facade",l=o==="medal",u=o==="frame";if(c&&Ab.push(n),(n.userData.role==="interior"||n.userData.role==="glow")&&Pl.push(n),s){j_.includes(n)||j_.push(n);let d=n.userData.matName||"";if(d!=="bronze_dark"&&(r.map=null,r.bumpMap=null,r.bumpScale=0),!n.isInstancedMesh&&d!=="bronze_dark"&&n.geometry&&!n.userData.edgeLinesAdded){let h=new ui({color:1444611,transparent:!0,opacity:.42,depthTest:!0,depthWrite:!1}),f=new Ji(new ns(n.geometry,38),h);f.name=`${n.name}_edgeLines`,f.renderOrder=3,n.add(f),ef.push(h),n.userData.edgeLinesAdded=!0}}if((c||u)&&n.geometry&&!n.userData.edgeLinesAdded){let d=K_(n.userData.matName||"stone"),h=d==="dark"?.22:d==="granite"?.28:.12,f=new ui({color:d==="stone"?3945255:1117449,transparent:!0,opacity:h,depthTest:!0,depthWrite:!1}),g=new Ji(new ns(n.geometry,36),f);g.name=`${n.name}_stoneEdges`,g.renderOrder=2,n.add(g),Ll.push({m:f,baseOpacity:h}),n.userData.edgeLinesAdded=!0}if(a){r.transparent=!0,r.opacity=0,r.depthWrite=!1,r.depthTest=!0,r.side=Pt,r.blending=dr,r.needsUpdate=!0;return}if(r.side=$t,s)if(!0){if(r.color.copy(Uy),r.metalness=.12,r.roughness=.92,r.envMapIntensity=.12,r.emissive||(r.emissive=new ge),r.emissive.set("#000000"),r.emissiveIntensity=0,!Ta.some(d=>d.m===r)){let d=n.userData.matName||"",h=d==="bronze_dark"?"dark":d==="bronze_matte"?"base":"orn";Ta.push({m:r,tone:h})}}else r.color.set("#ffd76a"),r.metalness=1,r.roughness=.22,r.envMapIntensity=1.3,r.emissive||(r.emissive=new ge),r.emissive.set("#3d2508"),r.emissiveIntensity=.05;else if(l)r.color.set("#c9973f"),r.metalness=1,r.roughness=.35,r.envMapIntensity=.9,r.emissive||(r.emissive=new ge),r.emissive.set("#000000"),r.emissiveIntensity=0;else if(!0){let d=K_(n.userData.matName||"stone"),h=ql[d]||ql.stone;r.color.copy(h.hero),r.metalness=d==="granite"?.1:.04,r.roughness=d==="granite"?.68:.86,r.map=Zh,r.bumpMap=Zh,r.bumpScale=d==="dark"?.02:.04,r.envMapIntensity=d==="granite"?.2:.26,r.emissive||(r.emissive=new ge),r.emissive.set("#000000"),r.emissiveIntensity=0,Xl.some(f=>f.m===r)||Xl.push({m:r,tone:d})}else r.color.set("#0d0f16"),r.metalness=.15,r.roughness=.75,r.envMapIntensity=.3,r.emissive||(r.emissive=new ge),r.emissive.set("#000000"),r.emissiveIntensity=0;r.needsUpdate=!0,Xh.includes(r)||Xh.push(r),ba.includes(r)||ba.push(r)}),Ii.add(e)}var $_=new ge("#2e3741"),Fb=new ge("#5c6874"),Ob=new ge("#232a32"),Hb=new ge("#9f6118"),zb=new ge("#d9a23a"),kb=new ge("#f2d16a"),Gb=new ge("#d6a030"),Z_=new ge("#090502"),Ny=new ge("#24251e"),Vb=new ge("#f1f0e7"),Wb=new ge("#211706"),Xb=new ge("#05070a"),qb=new ge("#39434e");function wa(i,e,t){let n=oe.clamp((t-i)/Math.max(e-i,1e-6),0,1);return n*n*(3-2*n)}function Yb(i,e,t=!1,n=0){if(!t||e<-.86||e>.84||n<-.15||n>.24)return 0;let r=wa(-.86,-.72,e)*(1-wa(.74,.86,e));return oe.clamp(.86+.14*r,0,1)}function wh(i,e=!1,t=new ge){let n=i.x,r=i.y,o=i.z,s=Math.abs(n),a=r<-.62||r<-.48&&s>.42,c=r>.82,l=s>.47&&s<.86&&r>-.64&&r<.84,u=Yb(n,r,e,o);if(e){let h=oe.clamp(.42+.34*(r+.85)/1.7+(n>0?.03:0),0,.86);t.copy(Hb).lerp(zb,h),t.lerp(Gb,.16),t.lerp(kb,.16+.1*u);let f=(1-wa(0,.035,s))*wa(-.7,-.54,r)*(1-wa(.64,.82,r));return t.lerp(Z_,f*.18),.94}let d=oe.clamp(.24+.18*(r+.9)/1.8+.05*(1-Math.min(s,1)),0,.46);return t.copy($_).lerp(Fb,d),u>.01&&t.lerp(qb,.62),l&&t.lerp($_,.38),c&&t.lerp(Z_,.3),a&&t.lerp(Ob,.78),u>.01?.16:.08}function jb(i="frame"){let e=new en({color:Ny.clone(),vertexColors:!0,metalness:.1,roughness:.82,envMapIntensity:.72,emissive:0,emissiveIntensity:0,transparent:!0,opacity:0,depthWrite:!0,side:Pt});return e.userData.bcchKind=i,e.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
attribute float bcchDoorMask;
varying float vBcchDoorMask;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vBcchDoorMask = bcchDoorMask;`),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
varying float vBcchDoorMask;`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor = mix(0.92, 0.38, vBcchDoorMask);`).replace("#include <metalnessmap_fragment>",`#include <metalnessmap_fragment>
metalnessFactor = mix(0.035, 0.82, vBcchDoorMask);`)},e.customProgramCacheKey=()=>"bcch-door-openable-recolor-v13",e}function Tl(i,e=0,t=0){if(!i.length)return null;let n=new Float32Array(i.length*9),r=new Float32Array(i.length*9),o=new Float32Array(i.length*9),s=new Float32Array(i.length*3),a=0,c=0,l=0,u=0;for(let h of i)for(let f of h)n[a++]=f.p.x-e,n[a++]=f.p.y,n[a++]=f.p.z-t,r[c++]=f.n.x,r[c++]=f.n.y,r[c++]=f.n.z,o[l++]=f.c.r,o[l++]=f.c.g,o[l++]=f.c.b,s[u++]=f.mask;let d=new Ze;return d.setAttribute("position",new Ye(n,3)),d.setAttribute("normal",new Ye(r,3)),d.setAttribute("color",new Ye(o,3)),d.setAttribute("bcchDoorMask",new Ye(s,1)),d.computeBoundingSphere(),d}function Sl(i,e,t="frame"){if(!i)return null;let n=jb(t),r=new ke(i,n);if(r.name=e,r.renderOrder=5,r.userData.role="bcchDoor",i.attributes.position?.count>0){let o=t==="leaf"||t==="medal",s=new ui({color:o?1181699:328707,transparent:!0,opacity:0,depthTest:!0,depthWrite:!1}),a=new Ji(new ns(i,o?26:34),s);a.name=`${e}_edgeLines`,a.renderOrder=6,r.add(a),$h.push({m:s,baseOpacity:o?.22:.15,kind:t})}return Xh.push(n),Kh.push(n),t==="aperture"&&_b.push(n),r}var Sn={axisX:-.0153,slabZ:[-.34,-.14],slabY:[-.9267,.8333],slabX:1,ballY:.0986,pilasterInnerX:.5053,gap:.02,splay:.06};function Kb(i,e){let t=new Tt;t.name="Puerta_bcch_Openable";let n=e.clone();n.x+=Sn.axisX;let r=[],o=[],s=[],a=(W,Q)=>({p:W,n:Q,c:new ge,mask:0}),c=W=>Math.abs(W-Sn.slabZ[0])<.003||Math.abs(W-Sn.slabZ[1])<.003;i.updateMatrixWorld(!0),i.traverse(W=>{if(!W.isMesh||!W.geometry)return;let Q=W.geometry,ce=Q.attributes.position,pe=Q.attributes.normal;if(!ce||!pe)return;let K=new Fe().getNormalMatrix(W.matrixWorld),S=/Puerta_Izquierda/i.test(W.name),Z=/Puerta_Derecha/i.test(W.name),U=Q.index,O=U?U.count/3:ce.count/3;for(let B=0;B<O;B++){let xe=(U?[U.getX(B*3),U.getX(B*3+1),U.getX(B*3+2)]:[B*3,B*3+1,B*3+2]).map(R=>a(new L().fromBufferAttribute(ce,R).applyMatrix4(W.matrixWorld).sub(n),new L().fromBufferAttribute(pe,R).applyMatrix3(K).normalize()));if(S){o.push(xe);continue}if(Z){s.push(xe);continue}xe.every(R=>c(R.p.z))||r.push(xe)}});let l=(W,Q)=>{let ce=W.map(pe=>pe.p[Q]);return Math.max(...ce)-Math.min(...ce)},u=(W,Q)=>{let ce=1/0,pe=-1/0,K=[];for(let Z of W)if(Q(Z)){K.push(Z);for(let U of Z)ce=Math.min(ce,U.p.x),pe=Math.max(pe,U.p.x)}if(!K.length)return 0;let S=-(ce+pe)*.5;if(Math.abs(S)>1e-4)for(let Z of K)for(let U of Z)U.p.x+=S;return S},d={cornice:u(r,W=>W.every(Q=>Q.p.y>=Sn.slabY[1]+.002)&&(l(W,"x")>.5||l(W,"z")>.5)),capitals:u(r,W=>W.every(Q=>Q.p.y>=.63-.001&&Q.p.y<=.845&&Math.abs(Q.p.x)<.53)),steps:u(r,W=>W.every(Q=>Q.p.y<=-.7038+.001&&Q.p.z>=-.27))},h=(W,Q)=>{let ce=Q<0?1/0:-1/0;for(let pe of W)for(let K of pe)Math.abs(K.p.y-Sn.ballY)<.07||(ce=Q<0?Math.min(ce,K.p.x):Math.max(ce,K.p.x));return ce},f=h(o,-1),g=h(s,1),x=(W,Q,ce)=>{let pe=[],K=[];for(let S of W)(S.some(U=>ce<0?U.p.x<Q-1e-4:U.p.x>Q+1e-4)?K:pe).push(S);return{keep:pe,medal:K}},m=x(o,f,-1),p=x(s,g,1);o.length=0,o.push(...m.keep),s.length=0,s.push(...p.keep);let v=[],_=new ut,T=(W,Q)=>{_.makeEmpty();for(let Ee of W)for(let se of Ee)_.expandByPoint(se.p);if(_.isEmpty())return;let ce=_.getSize(new L),pe=Math.min(ce.x,ce.y)*.5,K=Math.max(ce.z,.02),S=(_.min.y+_.max.y)*.5,Z=Q<0?f+d.leaves-Sn.gap:g+d.leaves+Sn.gap,U=Q*Sn.pilasterInnerX,O=(Z+U)*.5,B=Sn.slabZ[1],le=B+K,xe=28,R=Ee=>Array.from({length:xe},(se,Ue)=>{let Se=Ue/xe*Math.PI*2;return new L(O+Math.cos(Se)*pe,S+Math.sin(Se)*pe,Ee)}),b=R(le),z=R(B),ae=new L(O,S,le),ue=new L(O,S,B),de=new L(0,0,1),Me=new L(0,0,-1);for(let Ee=0;Ee<xe;Ee++){let se=(Ee+1)%xe;v.push([a(ae.clone(),de.clone()),a(b[Ee].clone(),de.clone()),a(b[se].clone(),de.clone())]),v.push([a(ue.clone(),Me.clone()),a(z[se].clone(),Me.clone()),a(z[Ee].clone(),Me.clone())]);let Ue=new L(b[Ee].x-O,b[Ee].y-S,0).normalize(),Se=new L(b[se].x-O,b[se].y-S,0).normalize();v.push([a(z[Ee].clone(),Ue.clone()),a(b[se].clone(),Se.clone()),a(b[Ee].clone(),Ue.clone())]),v.push([a(z[Ee].clone(),Ue.clone()),a(z[se].clone(),Se.clone()),a(b[se].clone(),Se.clone())])}let ye=le+K*.35,ve=R(ye).map(Ee=>Ee.sub(new L(O,S,0)).multiplyScalar(.55).add(new L(O,S,0))),_e=new L(O,S,ye);for(let Ee=0;Ee<xe;Ee++){let se=(Ee+1)%xe;v.push([a(_e.clone(),de.clone()),a(ve[Ee].clone(),de.clone()),a(ve[se].clone(),de.clone())]);let Ue=new L(ve[Ee].x-O,ve[Ee].y-S,0).normalize(),Se=new L(ve[se].x-O,ve[se].y-S,0).normalize(),Pe=new L(ve[Ee].x,ve[Ee].y,le),Re=new L(ve[se].x,ve[se].y,le);v.push([a(Pe,Ue.clone()),a(ve[se].clone(),Se.clone()),a(ve[Ee].clone(),Ue.clone())]),v.push([a(Pe.clone(),Ue.clone()),a(Re,Se.clone()),a(ve[se].clone(),Se.clone())])}};d.leaves=-(f+g)*.5,T(m.medal,-1),T(p.medal,1);for(let W of[o,s])for(let Q of W)for(let ce of Q)ce.p.x+=d.leaves;f+=d.leaves,g+=d.leaves;let w=1/0,E=-1/0;for(let W of[o,s])for(let Q of W)for(let ce of Q)w=Math.min(w,ce.p.z),E=Math.max(E,ce.p.y);let A=w,P=f,y=g,M=new We,D=new We;M.name="Puerta_bcch_LeftPivot",D.name="Puerta_bcch_RightPivot",M.position.set(P,0,A),D.position.set(y,0,A),M.userData.openSign=1,D.userData.openSign=-1;let V=Sn.gap,te=Sn.splay,I=f-V,k=g+V,[G,ee]=Sn.slabZ,[N,X]=Sn.slabY,q=Sn.slabX,J=(W,Q,ce,pe)=>{let K=[W,Q,ce,pe].map(Z=>new L(...Z)),S=new L().crossVectors(new L().subVectors(K[1],K[0]),new L().subVectors(K[2],K[0])).normalize();r.push([a(K[0].clone(),S.clone()),a(K[1].clone(),S.clone()),a(K[2].clone(),S.clone())],[a(K[0].clone(),S.clone()),a(K[2].clone(),S.clone()),a(K[3].clone(),S.clone())])},fe=W=>{let Q=W*q,ce=W<0?I:k,pe=ce+W*te,K=[Q,ee],S=[ce,ee],Z=[pe,G],U=[Q,G],O=(B,le)=>W<0?J([B[0],N,B[1]],[le[0],N,le[1]],[le[0],X,le[1]],[B[0],X,B[1]]):J([le[0],N,le[1]],[B[0],N,B[1]],[B[0],X,B[1]],[le[0],X,le[1]]);O(K,S),O(S,Z),O(Z,U),O(U,K),W<0?(J([K[0],X,K[1]],[S[0],X,S[1]],[Z[0],X,Z[1]],[U[0],X,U[1]]),J([U[0],N,U[1]],[Z[0],N,Z[1]],[S[0],N,S[1]],[K[0],N,K[1]])):(J([S[0],X,S[1]],[K[0],X,K[1]],[U[0],X,U[1]],[Z[0],X,Z[1]]),J([Z[0],N,Z[1]],[U[0],N,U[1]],[K[0],N,K[1]],[S[0],N,S[1]]))};fe(-1),fe(1),J([I-te,N,G],[k+te,N,G],[k,N,ee],[I,N,ee]);for(let W of r)for(let Q of W)Q.mask=wh(Q.p,!1,Q.c);for(let W of[o,s])for(let Q of W)for(let ce of Q)ce.mask=wh(ce.p,!0,ce.c);for(let W of v)for(let Q of W)Q.mask=wh(Q.p,!0,Q.c);let H=Sl(Tl(r),"Puerta_bcch_frame","frame"),$=Sl(Tl(o,P,A),"Puerta_bcch_left_leaf","leaf"),me=Sl(Tl(s,y,A),"Puerta_bcch_right_leaf","leaf"),Y=Sl(Tl(v),"Puerta_bcch_medals","medal");return H&&t.add(H),Y&&t.add(Y),$&&M.add($),me&&D.add(me),t.add(M,D),Yh=M,jh=D,t.userData.bcchDoor={hingeL:P,hingeR:y,hingeZ:A,edgeL:f,edgeR:g,leafTop:E,openL:I,openR:k,shifts:d},t}bf.load("Puerta_bcch_v3.glb?v=16",i=>{let t=new ut().setFromObject(i.scene).getCenter(new L),n=Kb(i.scene,t);n.visible=!1,fo=n,yb(n),Ii.add(n)},void 0,i=>{console.warn("No se pudo cargar Puerta_bcch_v3.glb; se usa la puerta procedural:",i)});var $b=new ua,co=he.coin,Rh=-1,By=0,Fy=0,xa=0,ds=0,Oy=0,Hy=0,nu=!1,tf=0,nf=0,Nl=0,Bl=0;function Sf(i,e){let t=tn();By=i/t.width*2-1,Fy=e/t.height*2-1,nu&&(Nl+=(i-tf)*.005,Bl+=(e-nf)*.005,tf=i,nf=e)}function iu(i,e){nu=!0,tf=i,nf=e}function ru(){nu=!1}var Af=i=>!!(i.target&&i.target.closest&&i.target.closest("a, button, .quote-card, .signal-card, [data-quote], #quotePanel, #timelineContainer, .closing-cta, .jargon-term, .axes-data-mark, .voice-explorer, .voice-card, .voice-detail, .voice-profile-panel, .acts-browser, .act-list-item, .act-term-chip, .act-evidence-row, .act-open-evidence"));window.addEventListener("pointermove",i=>{i.pointerType==="touch"||Af(i)||(Oy=i.clientX,Hy=i.clientY,Sf(i.clientX,i.clientY))});var Dr=null;window.addEventListener("pointerdown",i=>{if(!Af(i)){if(i.pointerType==="touch"){Dr={id:i.pointerId,x:i.clientX,y:i.clientY,at:performance.now()};return}iu(i.clientX,i.clientY,i)}});window.addEventListener("pointerup",i=>{if(Dr&&i.pointerType==="touch"&&i.pointerId===Dr.id){let e=i.clientX-Dr.x,t=i.clientY-Dr.y,n=e*e+t*t<100&&performance.now()-Dr.at<600;Dr=null,n&&!Af(i)&&iu(i.clientX,i.clientY,i)}ru()});window.addEventListener("pointercancel",()=>{Dr=null,ru()});window.addEventListener("blur",ru);document.addEventListener("visibilitychange",ru);var Al=new L,dt=(window.QUOTES||[]).slice(),On=new Tt;lt.add(On);var zy=Math.max(dt.length,0),Yt=zy||1,Fl=new Float32Array(Yt*3),_s=new Float32Array(Yt*3),ys=new Float32Array(Yt*3),vs=new Float32Array(Yt*3),Es=new Float32Array(Yt*3),Ms=new Float32Array(Yt*3),bs=new Float32Array(Yt*3),Ui=new Float32Array(Yt*3),J_=new Int16Array(Yt),Q_=new Int16Array(Yt),ey=new Int16Array(Yt),ty=new Int16Array(Yt),rf=dt.map(i=>{let e=String(i?.date||"").match(/^(\d{4})/),t=Number(e?e[1]:i?.year);return/^\d{4}-\d{2}-\d{2}$/.test(String(i?.date||""))?i.date:`${Number.isFinite(t)?t:0}-01-01`}),Nr=he.room?.swarm??{},xn=he.door?.funnel??null,jl=xn?new Float32Array(Yt*2):null,Bn=xn?new L:null,ny=xn?new De:null,iy=new L,Ch=new Float32Array(Yt).fill(1),ky=new ge(16766826),Gy=new ge(9090296),Vy=new ge(13620964);function wf(i,e){if(!e||e===1)return i;let t=.299*i.r+.587*i.g+.114*i.b;return new ge(oe.clamp(t+(i.r-t)*e,0,1),oe.clamp(t+(i.g-t)*e,0,1),oe.clamp(t+(i.b-t)*e,0,1))}var Zb=wf(ky,Nr.chroma),Jb=wf(Gy,Nr.chroma),Qb=wf(Vy,Nr.chroma);for(let i=0;i<Yt;i++){let e=dt[i],t=e?e.label:"neutral",n=Qb;t==="hawkish"?n=Zb:t==="dovish"&&(n=Jb),Ui[i*3+0]=n.r,Ui[i*3+1]=n.g,Ui[i*3+2]=n.b;let r=i/Yt*Math.PI*2+(vt(i,1)-.5)*.5,o=2.1+vt(i,2)*1.5,s=(vt(i,3)-.5)*1.6,a=Math.cos(r)*o,c=s,l=Math.sin(r)*o;_s[i*3+0]=a,_s[i*3+1]=c,_s[i*3+2]=l,Fl[i*3+0]=a,Fl[i*3+1]=c,Fl[i*3+2]=l;let u=vt(i,4)*Math.PI*2,d=3.8+vt(i,5)*5.5;ys[i*3+0]=Math.cos(u)*d,ys[i*3+1]=(vt(i,6)-.5)*6.5,ys[i*3+2]=(vt(i,7)-.5)*4.5-1,xn&&(jl[i*2]=(xn.cx??0)+(vt(i,8)-.5)*2*(xn.halfW??.42),jl[i*2+1]=(xn.cy??1.3)+(vt(i,9)-.5)*2*(xn.halfH??.85))}var eT=dt.length,tT=new Set(dt.map(i=>i.participant)).size,Lh=document.querySelectorAll("[data-counter]");Lh.length>=4&&(Lh[2].querySelector(".counter-number").dataset.target=eT.toString(),Lh[3].querySelector(".counter-number").dataset.target=tT.toString());function nT(){let i=document.createElement("canvas");i.width=64,i.height=64;let e=i.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.25,"rgba(255,255,255,0.85)"),t.addColorStop(.7,"rgba(255,255,255,0.2)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle="#fff",e.fillRect(0,0,64,64),e.globalCompositeOperation="destination-in",e.fillStyle=t,e.fillRect(0,0,64,64);let n=new ro(i);return n.colorSpace=tt,n}var Ph=null;function Wy(){return Ph||(Ph=nT()),Ph}var lr=new Ze;lr.setAttribute("position",new Ye(Fl,3));lr.setAttribute("color",new Ye(new Float32Array(Ui),3));lr.boundingSphere=new At(new L,12);var Xy=.14,of=new Qi({size:Xy,sizeAttenuation:!0,vertexColors:!0,map:Wy(),transparent:!0,alphaTest:.06,opacity:.82,blending:dr,depthTest:!1,depthWrite:!1,fog:!1}),qy=new wr(lr,of);On.add(qy);var An={roomWarm:-1,voiceFocusMix:-1,actFocusMix:-1,quoteStageMix:-1,focusName:null,activeQuoteIndex:-1,selectedActDate:null},_n=he.room?.orbit??{},mo=Math.max(0,_n.count??12),go=Math.max(2,_n.trail??58),Pa=mo*go,sf=[];{let i={hawkish:[],dovish:[],neutral:[]};dt.forEach((t,n)=>{let r=["hawkish","dovish","neutral"].includes(t?.label)?t.label:"neutral";i[r].push(n)});let e=["hawkish","dovish","neutral"];for(let t=0;sf.length<mo&&t<mo*3;t++){let n=i[e[t%3]];if(!n.length)continue;let r=Math.floor(t/3),o=n[Math.round((r+.5)*(n.length/Math.max(1,Math.ceil(mo/3))))%n.length];o!=null&&sf.push(o)}}var ei=new Tt;ei.name="roomOrbitals";ei.position.set(he.room?.figure?.x??0,0,he.room?.figure?.z??-4.8);ei.visible=!1;lt.add(ei);var xo=sf.map((i,e)=>{let t=_n.minRadius??.46,n=t+vt(e,11)*((_n.maxRadius??.95)-t),r=oe.degToRad((vt(e,12)-.5)*2*(_n.tilt??34));return{quoteIndex:i,radius:n,ecc:.86+vt(e,13)*.26,y:(_n.minY??.26)+vt(e,14)*((_n.maxY??1.14)-(_n.minY??.26)),tilt:r,node:vt(e,15)*Math.PI*2,phase:vt(e,16)*Math.PI*2,speed:(_n.speed??.24)/Math.pow(n/.6,1.15)*(vt(e,17)>.5?1:-1),bob:.05+vt(e,18)*.07}}),Ol=new Float32Array(Pa*3),Hl=new Float32Array(Pa*3),af=new Float32Array(Pa),cf=new Float32Array(Pa),Yy=new Float32Array(Pa);xo.forEach((i,e)=>{let t=dt[i.quoteIndex],n=["hawkish","dovish","neutral"].includes(t?.label)?t.label:"neutral",r=n==="hawkish"?ky:n==="dovish"?Gy:Vy,o=n==="neutral"?_n.neutralDim??.78:1;for(let s=0;s<go;s++){let a=e*go+s;if(Hl[a*3+0]=r.r*o,Hl[a*3+1]=r.g*o,Hl[a*3+2]=r.b*o,Yy[a]=e,s===0)af[a]=_n.headSize??.175,cf[a]=1;else{let c=1-(s-1)/Math.max(1,go-2);af[a]=(_n.tailSize??.095)*(.34+.66*c),cf[a]=Math.pow(c,1.65)*.72}}});var Or=new Ze;Or.setAttribute("position",new Ye(Ol,3));Or.setAttribute("aColor",new Ye(Hl,3));Or.setAttribute("aSize",new Ye(af,1));Or.setAttribute("aFade",new Ye(cf,1));Or.setAttribute("aOwner",new Ye(Yy,1));Or.boundingSphere=new At(new L(0,.7,0),2.4);var ou=new ln({uniforms:{uMap:{value:Wy()},uOpacity:{value:0},uScale:{value:450},uFocus:{value:-1}},vertexShader:`
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
  `,transparent:!0,depthTest:!0,depthWrite:!1,blending:dr}),Rf=new wr(Or,ou);Rf.frustumCulled=!1;ei.add(Rf);function Kl(){if(!et)return;let i=et.getSize(new Ie);ou.uniforms.uScale.value=i.y*et.getPixelRatio()*.5}Kl();var wl=new L;function iT(i,e,t){let n=i.phase+i.speed*e,r=i.node+(_n.precession??.028)*e,o=Math.cos(n)*i.radius,s=Math.sin(n)*i.radius*i.ecc,a=Math.cos(i.tilt),c=Math.sin(i.tilt),l=-s*c,u=s*a,d=Math.cos(r),h=Math.sin(r);return t.set(o*d+u*h,i.y+l+Math.sin(e*.5+i.phase)*i.bob,-o*h+u*d),t}var jy=0;function rT(i,e){if(jy=e,ou.uniforms.uOpacity.value=e*(_n.opacity??.95),sT(e>.35&&mo>0),e<.004||mo===0){ei.visible=!1;return}ei.visible=!0;let t=_n.trailStep??.07;for(let n=0;n<mo;n++){let r=xo[n];for(let o=0;o<go;o++){iT(r,i-o*t,wl);let s=(n*go+o)*3;Ol[s]=wl.x,Ol[s+1]=wl.y,Ol[s+2]=wl.z}}Or.attributes.position.needsUpdate=!0}var Ts=document.getElementById("roomVoiceNav"),ry=document.getElementById("roomVoiceNavList"),oy=null;function oT(){if(!Ts||!ry||xo.length===0)return;let i=document.createDocumentFragment();xo.forEach((e,t)=>{let n=dt[e.quoteIndex];if(!n)return;let r=document.createElement("li");r.className="room-voice-nav-item";let o=document.createElement("button");o.type="button",o.className="room-voice-btn",o.dataset.quoteIndex=String(e.quoteIndex),o.dataset.tone=n.label||"neutral";let s=n.participant||"Participante an\xF3nimo",a=n.formatted_date||n.date||(n.year?"A\xF1o "+n.year:"fecha no especificada"),c=n.label||"neutral";o.appendChild(document.createTextNode(s));let l=document.createElement("span");l.className="room-voice-meta",l.textContent=`${a} \xB7 ${c}`,o.appendChild(l),o.setAttribute("aria-label",`${s}, ${a}, tono ${c}. Abrir la cita.`),o.addEventListener("focus",()=>{_h(e.quoteIndex),Cs()}),o.addEventListener("click",()=>{gi(e.quoteIndex),xi.card=o,Hr(e.quoteIndex,o.getBoundingClientRect());let u=document.getElementById("quotePanelClose");u&&u.focus({preventScroll:!0})}),r.appendChild(o),i.appendChild(r)}),ry.appendChild(i),Ts.addEventListener("focusout",e=>{Ts.contains(e.relatedTarget)||ml()||(yh(),Cs())})}function sT(i){!Ts||i===oy||(oy=i,!i&&Ts.contains(document.activeElement)&&document.activeElement.blur(),Ts.hidden=!i)}oT();function aT(){if(typeof wi.index!="number"||wi.index<0)return-1;for(let i=0;i<xo.length;i++)if(xo[i].quoteIndex===wi.index)return i;return-1}var zl=new da,Ih=new Ie,Dh=new L;function cT(i=1){let e=he.interaction?.hoverRadius??.075,t=On.scale?.x||1;zl.params.Points.threshold=e*t*i}function Ky(i,e,t=1){if(!zy)return-1;let n=tn();cT(t),Ih.x=i/n.width*2-1,Ih.y=-(e/n.height)*2+1,zl.setFromCamera(Ih,Et);let r=zl.intersectObject(qy,!1),o=jy>.35&&ei.visible?zl.intersectObject(Rf,!1):[];if(r.length===0&&o.length===0)return-1;let s=-1,a=1/0,c=(l,u)=>{Dh.copy(l.point).project(Et);let d=(Dh.x*.5+.5)*n.width,h=(-Dh.y*.5+.5)*n.height,f=d-i,g=h-e,x=f*f+g*g;x<a&&(a=x,s=u)};for(let l=0;l<r.length;l++)c(r[l],r[l].index);for(let l=0;l<o.length;l++){let u=Math.floor(o[l].index/go),d=xo[u]?.quoteIndex;d!=null&&c(o[l],d)}return s}function lT(i){let e=document.getElementById("quotePanel");if(!e)return;if(window.matchMedia&&window.matchMedia("(max-width: 768px)").matches){e.style.left="",e.style.top="",e.style.right="";return}let t=or(),n=e.offsetWidth||380,r=e.offsetHeight||220,o=16,s=i&&typeof i.x=="number"?i.x:Oy,a=i&&typeof i.y=="number"?i.y:Hy,c=s+22,l=a-r/2;c+n>t.width-o&&(c=s-n-22),c<o&&(c=o),l=oe.clamp(l,o,Math.max(o,t.height-r-o)),e.style.left=c+"px",e.style.top=l+"px",e.style.right="auto"}function Cf(i){if(document.querySelectorAll(".axes-data-mark.is-focus").forEach(t=>t.classList.remove("is-focus")),i<0)return;let e=document.querySelector(`#d3-canvas .axes-data-mark[data-quote-index="${i}"]`);e&&e.classList.add("is-focus")}function Hr(i,e){let t=dt[i];if(!t)return;wi.index=i,Cf(i),document.getElementById("qpWho").textContent=t.participant||"Participante an\xF3nimo";let n=document.getElementById("qpTag");n.textContent=(t.label||"neutral").charAt(0).toUpperCase()+(t.label||"neutral").slice(1),n.className="tag "+(t.label||"neutral"),document.getElementById("qpWhen").textContent=t.formatted_date||t.date||"Fecha no especificada",document.getElementById("qpText").textContent="\u201C"+(t.text||"Sin texto disponible")+"\u201D";let r=document.getElementById("qpSource");if(r){let a=t.formatted_date||t.date||t.year||"fecha no especificada";r.textContent=t.source?`Fuente: ${t.source}`:`Contexto de maqueta \xB7 ${a}`,r.href=t.source_url||"#stageActs",t.source_url?(r.target="_blank",r.rel="noreferrer"):(r.removeAttribute("target"),r.removeAttribute("rel"))}document.getElementById("qpYear").textContent=t.year?"A\xF1o "+t.year:"A\xF1o no especificado";let o=document.getElementById("qpScore");if(o){let a=typeof t.score=="number"?t.score:null;a==null?o.style.display="none":(o.style.display="flex",document.getElementById("qpScoreBar").style.width=(oe.clamp(a,0,1)*100).toFixed(0)+"%",document.getElementById("qpScoreVal").textContent=a.toFixed(2))}let s=document.getElementById("quotePanel");s.hidden=!1,s.setAttribute("aria-hidden","false"),s.classList.add("visible"),lT(e),xi.card&&document.activeElement===xi.card&&document.getElementById("quotePanelClose").focus({preventScroll:!0})}var sy=!1,ay=0,Uh=null;function Cs(){let i=b_();i>=0?Hr(i):Ps()}function uT(i,e){if(!Fr.classList.contains("visible"))return!1;let t=Fr.getBoundingClientRect();return i>=t.left&&i<=t.right&&e>=t.top&&e<=t.bottom}function dT(i,e){let t=performance.now();if(t-ay<32)return;ay=t;let n=Ky(i,e),r=n>=0;if(r!==sy&&(sy=r,document.body.style.cursor=r?"pointer":As===1?"grab":""),!ml())if(r){if(uT(i,e)||n===bn.hover&&bn.hover>=0)return;Uh&&clearTimeout(Uh),Uh=setTimeout(()=>{_h(n),Cs()},he.interaction?.hoverDelayMs??90)}else bn.hover>=0?(yh(),Cs()):Fr.classList.contains("visible")&&Ps()}var hT=Sf;Sf=function(i,e){hT(i,e),dT(i,e)};var fT=iu;iu=function(i,e,t){let n=Ky(i,e,t?.pointerType==="touch"?he.interaction?.touchRadiusMul??2.2:1);if(n>=0){gi(n),Hr(n);return}ml()&&Ps(),fT(i,e)};var gn=0,$y=0,Ur=1,Fn=1,nn=1,pT=["axes","voices","acts","timeline","quotes"],lf={axes:0,voices:0,acts:0,timeline:0,quotes:0},mn={axes:0,voices:0,acts:0,timeline:0,quotes:0},ar=null,hs=0,uf=!1,Ss=(i,e)=>{i in lf&&(lf[i]=oe.clamp(Number(e)||0,0,1))};window.addEventListener("particle-act-focus",i=>{ar=i.detail?.date||null});var qt=he.door&&he.door.transition==="doorway"?"doorway":"classic";qt==="classic"&&document.body.classList.add("mode-classic");var Ft=0,Br=0,lo=0,Nh=new L(0,.7,0),Zy=new L(he.door?.roomLook?.x??0,he.door?.roomLook?.y??.45,he.door?.roomLook?.z??-2),cy=document.getElementById("roomTitle"),mT=new ht,kl=new ut,ly=new L,Rl=he.door?.roomLook?.y??.45,Lf=!0;function uy(i){let{width:e,height:t}=tn(),n=mT;return n.fov=he.camera.fov,n.aspect=e/t,n.near=.1,n.far=100,n.position.set(he.camera.x,he.door?.roomCamY??.62,he.door?.roomCamZ??-.5),n.up.set(0,1,0),n.lookAt(he.door?.roomLook?.x??0,i,he.door?.roomLook?.z??-2),n.updateMatrixWorld(!0),n.updateProjectionMatrix(),ly.set(he.room?.figure?.x??0,kl.min.y,he.room?.figure?.z??-4.8).project(n),(1-ly.y)*.5*t}function gT(){if(Lf=!1,!Xt||!cy)return;let i=Xt.figures.get("soporte")?.root;if(!i)return;let e=Xt.group,t=e.scale.x,n=e.position.y;if(e.scale.setScalar(1),e.position.y=0,e.updateMatrixWorld(!0),kl.setFromObject(i),e.scale.setScalar(t),e.position.y=n,e.updateMatrixWorld(!0),kl.isEmpty()||!Number.isFinite(kl.min.y))return;let{height:r}=tn(),o=cy.offsetTop;if(!Number.isFinite(o)||o<=0)return;let s=o-Math.max(24,r*(Ai.gapRatio??.045)),a=Rl,c=Rl+.15,l=uy(a),d=(uy(c)-l)/(c-a);!Number.isFinite(d)||Math.abs(d)<1||(Zy.y=oe.clamp(a+(s-l)/d,Rl-.7,Rl+.35))}var dy=new L(0,ho,0),hy=new L,fs=[{id:"hero",pos:[0,.72,7.15],look:[0,.95,-.25]},{id:"stageObjective",pos:[0,.7,4.45],look:[0,.78,-.55]},{id:"stageHook",pos:[0,.6,5.8],look:[0,.7,0]},{id:"stageAxes",pos:[0,.6,5.8],look:[0,.7,0]},{id:"stageWordEvolution",pos:[1.3,.74,5.1],look:[0,.68,0]},{id:"stageVoices",pos:[1.1,.74,5.2],look:[0,.68,0]},{id:"stageActs",pos:[-1.1,.74,5.2],look:[0,.68,0]},{id:"stageCounters",pos:[0,.68,5.5],look:[0,.7,0]},{id:"stagePipeline",pos:[1.5,.8,4.9],look:[0,.66,0]},{id:"stageTimeline",pos:[-1.5,.8,4.9],look:[0,.66,0]},{id:"stageQuotes",pos:[0,.72,5.4],look:[0,.7,0]},{id:"stageClosing",pos:[0,.6,5.8],look:[0,.7,0]}],Li=[];function df(){if(!0){let n=he.coin.baseY;he.camera.y=n+.38,fs[0].pos=[0,he.camera.y,he.camera.z],fs[0].look=[0,n,0];let r=he.door.approachCamY??.62,o=he.door.approachCamZ??he.camera.z;fs[1].pos=[0,r,o],fs[1].look=[0,r,0]}let i=document.documentElement.scrollHeight-window.innerHeight,e=[],t=fs.length;for(let n=0;n<t;n++){let r=fs[n],o=document.getElementById(r.id),s;if(o&&i>0){let a=o.getBoundingClientRect(),c=a.top+window.scrollY+a.height/2;s=oe.clamp((c-window.innerHeight*.5)/i,0,1)}else s=t>1?n/(t-1):0;if(r.id==="stageObjective"){let a=document.getElementById("hero"),c=a?a.offsetHeight:window.innerHeight;s=oe.clamp(c/Math.max(i,1e-4),0,1)}e.push({id:r.id,p:s,pos:r.pos,look:r.look})}if(i>0){let n=e.find(o=>o.id==="stageObjective"),r=document.getElementById("stageRoom");if(n&&r){let o=r.getBoundingClientRect().top+window.scrollY-window.innerHeight*.85,s=oe.clamp(o/i,0,1),a=e.indexOf(n);e.splice(a+1,0,{id:"doorwayHold",p:Math.max(s,n.p+.001),pos:n.pos,look:n.look})}}for(let n=1;n<e.length;n++)e[n].p<e[n-1].p&&(e[n].p=e[n-1].p+.001);Li=e}var ps=new L,ms=new L;function xT(i){if(Jn)return ps.set(he.camera.x,ho,he.camera.z),ms.set(0,ho,0),{pos:ps,look:ms};let e=oe.clamp(i,0,1);if(!Li.length)return ps.set(he.camera.x,ho,he.camera.z),ms.set(0,ho,0),{pos:ps,look:ms};let t=Li[0],n=Li[Li.length-1];for(let s=0;s<Li.length-1;s++)if(e>=Li[s].p&&e<=Li[s+1].p){t=Li[s],n=Li[s+1];break}let r=Math.max(n.p-t.p,1e-4),o=oe.smoothstep((e-t.p)/r,0,1);return ps.set(oe.lerp(t.pos[0],n.pos[0],o),oe.lerp(t.pos[1],n.pos[1],o),oe.lerp(t.pos[2],n.pos[2],o)),ms.set(oe.lerp(t.look[0],n.look[0],o),oe.lerp(t.look[1],n.look[1],o),oe.lerp(t.look[2],n.look[2],o)),{pos:ps,look:ms}}var fy=new L,py=new L;ls(async()=>{let{initVoiceExplorer:i}=await Promise.resolve().then(()=>(U_(),D_));i({quotes:dt,openQuote:Hr,closeQuotePanel:Ps})});var uo=[],_a=0,Jy=0,hf=!1;document.addEventListener("visibilitychange",()=>{document.hidden&&(hf=!0)});var La=!1,Qy=0,Bh=0;function ev(){La||(La=!0,Qy=performance.now())}function ff(i){if(!et||Math.abs(i-Rn)<.05)return;Rn=i,et.setPixelRatio(Rn);let e=tn();et.setSize(e.width,e.height,!1),typeof Kl=="function"&&Kl()}function _T(){if(ws||!et)return;ws=!0;try{et.render(lt,Et)}catch{}let i=null;try{i=Ra.toDataURL("image/png")}catch{}let e=!1;if(i&&i.length>1e3)try{let t=document.createElement("img");t.id="canvasPoster",t.src=i,t.alt="",t.setAttribute("aria-hidden","true"),t.style.cssText="display:block; position:fixed; inset:0; width:100%; height:100%; z-index:2; object-fit:fill; pointer-events:none;",Ra.replaceWith(t),e=!0}catch{}if(gsap.ticker.remove(tv),e)try{let n=et.getContext().getExtension("WEBGL_lose_context");n&&n.loseContext()}catch{}document.body.dataset.perfPoster="1",console.info("[perf] Modo p\xF3ster: la escena 3D queda como imagen fija (DPR 0,75 no fue suficiente). El relato sigue en el DOM.")}function tv(){Jy++;let i=performance.now(),e=_a>0?Math.min(i-_a,100):1e3/60;if(_a>0&&La)if(hf)hf=!1;else{let K=i-_a;K<2e3&&uo.push(K)}_a=i;let t=$b.getElapsedTime(),n=oe.smoothstep(Br,0,1),r=Ft,o=Ft*(1-n);if(Pl.length){let K=Ft<.55;for(let S=0;S<Pl.length;S++)Pl[S].visible=K}if(Il&&Dl){let K=oe.smoothstep(Ft,.14,.72),S=oe.degToRad(85)*K;Il.rotation.z=S*(Il.userData.openSign||1),Dl.rotation.z=S*(Dl.userData.openSign||-1)}if(Yh&&jh){let K=oe.smoothstep(Ft,.04,.42),S=oe.degToRad(78)*K;Yh.rotation.y=S,jh.rotation.y=-S}if(Ul){let K=oe.smoothstep(Ft,.02,.22),S=1-oe.smoothstep(Ft,.32,.52),Z=K*S;Ul.opacity=.1*Z,Ul.emissiveIntensity=.03+.42*Z}if(pT.forEach(K=>{mn[K]=sr(mn[K],lf[K],Jn?1:.14,e)}),xa=sr(xa,By,.06,e),ds=sr(ds,Fy,.06,e),nu||(Nl=sr(Nl,0,.05,e),Bl=sr(Bl,0,.05,e)),wn.children.length>0){Rh<0&&(Rh=t);let K=t-Rh,S=Math.min(K/(Jn?1.2:1.8),1),Z=1-Math.pow(1-S,3),U=Jn?.12:1;wn.rotation.y=K*co.swaySpeedY*Z*U+xa*.08*U+Nl,wn.rotation.x=-.11+.018*Math.sin(K*co.tiltSpeed*U)+ds*-.12*U+Bl,wn.position.y=co.baseY+co.floatAmount*Math.sin(K*co.floatSpeed*U)*U,Cy.position.set(xa*2.5,he.coin.baseY+ds*-1.8,4),wn.getWorldPosition(Al),Al.project(Et);let O=tn(),B=(Al.x*.5+.5)*O.width,le=(-Al.y*.5+.5)*O.height;if(zh.style.transform=`translate3d(${B}px, ${le}px, 0)`,Ur=oe.clamp(1-gn/.45,0,1),El)if(!0)El.style.opacity="0";else{let xe=Math.max(20,Ef*.48);El.style.transform=`translate3d(${B}px, ${le+xe}px, 0) scale(${.82+Ur*.18})`,El.style.opacity=(Ur*.46).toFixed(3)}if(wn.visible=As===1&&Ur>.01,wn.position.z=.55,wn.visible){let xe=Ur<.999;for(let R=0;R<Cl.length;R++)Cl[R].transparent=xe,Cl[R].opacity=Ur}}let s=Fn;if(ot.children.length>0){Fn=sr(Fn,nn,.12,e),nn===0&&Fn<.03&&(Fn=0);let K=0,S=qt==="doorway"?oe.smoothstep(Br,0,.18):0;if(s=Fn*(1-K)*(1-S),ot.visible=s>.001&&!!cr,!ot.visible)Pi&&(Pi.visible=!1),ur.visible=!1,Di&&(Di.visible=!1),lt.fog&&(lt.fog.density=0);else{let Z=Fn*Fn*(3-2*Fn),U=1-oe.smoothstep(gn,.18,.88),O=1-U;ot.rotation.y=xa*.05*Z*O,ot.position.x=he.door.baseX,ot.position.z=he.door.heroBaseZ??he.door.baseZ??0;let B=oe.lerp(1.25/Math.max(he.door.widthVsCoin,.001),1,1-oe.smoothstep(gn,.18,.88));if(ot.scale.setScalar((.94+.06*Z)*B),U>.001&&cr&&Aa>0){let _e=tn(),Ee=Aa*Ii.scale.y*ot.scale.y,se=Math.max(Et.position.distanceTo(ot.position),.1),Ue=Ee*_e.height/(2*se*Math.tan(oe.degToRad(Et.fov*.5)));py.copy(ot.position).project(Et);let Se=(-py.y*.5+.5)*_e.height,Pe=2*Math.max(80,Math.min(Se-_e.height*.02,(Rs?.band?.bottom??_e.height*.72)-Se));Ue>Pe&&ot.scale.multiplyScalar(1-U*(1-Pe/Ue))}let le=cr?Sa*Ii.scale.y*ot.scale.x:0,xe=(he.door.groundY??0)-le;ot.rotation.x=-.12*U+ds*-.03*Z*O,ot.position.y=oe.lerp(xe,he.coin.baseY,U)+ds*-.06*Z*O;let R=fo?1:0,b=fo?0:1,z=oe.smoothstep(gn,.18,.88);fo&&(fo.visible=s>.001),qh&&(qh.visible=s>.001&&b>.001);let ae=1,ue=1-oe.smoothstep(Ft,.86,.96),[de,Me]=he.door?.leafFadeT??[.84,.94],ye=Math.abs(s-Zn.vis)>1e-4||Math.abs(z-Zn.colorT)>1e-4||Math.abs(Ft-Zn.crossT)>1e-4||Math.abs(gn-Zn.scatter)>1e-4||Math.abs(Br-Zn.exitT)>1e-4||Math.abs(Fn-Zn.fade)>1e-4;if(Zn.vis=s,Zn.colorT=z,Zn.crossT=Ft,Zn.scatter=gn,Zn.exitT=Br,Zn.fade=Fn,ye)for(let _e=0;_e<Kh.length;_e++){let Ee=Kh[_e],se=Ee.userData?.bcchKind||"frame",Ue=se==="leaf",Se=Ue||se==="medal",Pe=se==="aperture",Re=oe.smoothstep(z,.1,1),Ce=Ue?1-oe.smoothstep(Ft,de,Me):1,Oe=Ue?Ce:(Pe?ae:1)*ue,nt=s*R*Oe;Ee.transparent=nt<.999,Ee.opacity=nt,Ee.color.copy(Ny).lerp(Vb,z),Ee.envMapIntensity=Se?oe.lerp(.22,.58,Re):oe.lerp(.1,.24,Re),Ee.emissive&&(Ee.emissive.copy(Se?Wb:Xb),Ee.emissiveIntensity=(Se?.006:.0015)*Re)}if(ye){for(let _e=0;_e<$h.length;_e++){let Ee=$h[_e],se=Ee.kind==="leaf"?1-oe.smoothstep(Ft,de,Me):(Ee.kind==="aperture"?ae:1)*ue;Ee.m.opacity=Ee.baseOpacity*s*R*se*(.55+.45*z)}for(let _e=0;_e<ba.length;_e++){let Ee=s*b;ba[_e].transparent=Ee<.999,ba[_e].opacity=Ee}for(let _e=0;_e<ef.length;_e++)ef[_e].opacity=.42*s*b;for(let _e=0;_e<Ll.length;_e++)Ll[_e].m.opacity=Ll[_e].baseOpacity*s*b}if(ye&&!0&&Ta.length){let _e=oe.smoothstep(gn,.28,.9),Ee=oe.smoothstep(Ft,.1,.6);for(let se=0;se<Ta.length;se++){let Ue=Ta[se],Se=Ue.m,Pe=he.door.leaf,Re=Ue.tone==="orn",Ce=Ue.tone==="dark",Oe=Re?Pe.meetOrn:Ce&&Pe.meetDark||Pe.meet,nt=Re?Pe.crossOrn:Ce&&Pe.crossDark||Pe.cross,St=Re?Pb:Ce?Cb:wb,je=Re?Ib:Ce?Lb:Rb;Se.color.copy(Uy).lerp(St,_e).lerp(je,Ee),Se.metalness=oe.lerp(oe.lerp(Pe.hero.metalness,Oe.metalness,_e),nt.metalness,Ee),Se.roughness=oe.lerp(oe.lerp(Pe.hero.roughness,Oe.roughness,_e),nt.roughness,Ee),Se.envMapIntensity=oe.lerp(oe.lerp(Pe.hero.envMapIntensity,Oe.envMapIntensity,_e),nt.envMapIntensity,Ee)}for(let se=0;se<Xl.length;se++){let Ue=Xl[se],Se=Ue.m,Pe=ql[Ue.tone]||ql.stone;Se.color.copy(Pe.hero).lerp(Pe.meet,_e);let Re=he.door.frameAnim,Ce=Ue.tone==="dark"?.72:Ue.tone==="granite"?.82:1;if(Se.metalness=oe.lerp(Re.hero.metalness,Re.meet.metalness,_e)*Ce,Se.roughness=oe.lerp(Re.hero.roughness,Re.meet.roughness,_e),Se.envMapIntensity=oe.lerp(Re.hero.envMapIntensity,Re.meet.envMapIntensity,_e)*Ce,Se.bumpScale!=null){let Oe=Ue.tone==="dark"?.55:1;Se.bumpScale=oe.lerp(Re.hero.bumpScale,Re.meet.bumpScale,_e)*Oe}Se.emissive&&(Se.emissive.setRGB(0,0,0),Se.emissiveIntensity=0)}Ci[0]&&(Ci[0].color.copy(Db).lerp(Ub,_e),Ci[0].intensity=oe.lerp(8.5,13.5,_e)),Ci[1]&&(Ci[1].color.copy(Nb).lerp(Bb,_e),Ci[1].intensity=oe.lerp(4.8,7.5,_e)),Ci[2]&&(Ci[2].intensity=oe.lerp(2.4,4.2,_e))}let ve=s>.01&&!!cr;if(Pi&&(Pi.visible=ve),ur.visible=ve&&!(gn<.55),ur.material.opacity=.8*Z*(1-K),lt.fog&&(lt.fog.density=ve?he.door.fogDensity*Z:0),ur.position.set(ot.position.x,ot.position.y+le,ot.position.z),Di&&cr&&po){let _e=(Sa+Yl)*.5*Ii.scale.y;Di.position.set(0,_e+.08,-.34),Di.scale.set(po.width*Ii.scale.x*1.78,Math.max(Aa*Ii.scale.y*1.08,1),1);let Ee=1-oe.smoothstep(Ft,.12,.36),se=oe.smoothstep(gn,.48,.92)*Ee;Qh.opacity=ve?.18*Z*se:0,Di.visible=Qh.opacity>.002}ve&&(fy.set(ot.position.x,ot.position.y,ot.position.z),Ci.forEach(_e=>{_e.target.position.copy(fy),_e.target.updateMatrixWorld()}))}}let a=he.door?.roomSwarm??{x:0,y:.55,lead:2,leadOut:1.2,scale:.35},c=qt==="doorway"&&o>0?oe.smoothstep((o-.25)/.5,0,1):0,l=oe.lerp(1,a.scale??.35,c),u=oe.lerp(a.leadOut??1.2,a.lead??2,c);On.position.set(oe.lerp(0,a.x??0,c),oe.lerp(0,a.y??.55,c),On.position.z),On.scale.setScalar(l),of.size=Xy*l;let d=t*.12+gn*.8,h=c*Math.sin(t*.35)*.06,f=Math.max(mn.axes,mn.timeline,mn.voices*lo,mn.acts*hs);On.rotation.y=d*(1-c)*(1-f)+h;let g=qt==="doorway"?oe.smoothstep((o-.3)/.5,0,1):0,x=Tn.participant||Tn.rendered;lo=sr(lo,Tn.participant?1:0,Jn?1:.08,e),hs=sr(hs,ar?1:0,Jn?1:.08,e),!Tn.participant&&lo<.005&&(Tn.rendered=null);let m=wi.index>=0?wi.index:-1,p=mn.voices*lo,v=mn.acts*hs,_=mn.quotes,T=Math.abs(g-An.roomWarm)>1e-4||Math.abs(lo-An.voiceFocusMix)>.001||Math.abs(hs-An.actFocusMix)>.001||Math.abs(_-An.quoteStageMix)>.001||x!==An.focusName||m!==An.activeQuoteIndex||ar!==An.selectedActDate;An.roomWarm=g,An.voiceFocusMix=lo,An.actFocusMix=hs,An.quoteStageMix=_,An.focusName=x,An.activeQuoteIndex=m,An.selectedActDate=ar;let w=Nr.nearFade??null,E=!1;if(w){let K=lr.attributes.position.array;for(let S=0;S<Yt;S++){iy.set(K[S*3],K[S*3+1],K[S*3+2]).applyMatrix4(On.matrixWorld);let Z=oe.smoothstep(iy.distanceTo(Et.position),w[0],w[1]);Math.abs(Z-Ch[S])>.01&&(Ch[S]=Z,E=!0)}}if(T||E){let K=lr.attributes.color.array;for(let S=0;S<Yt;S++){let Z=S*3,U=dt[S],O=!!(x&&U&&U.participant===x),B=!!(ar&&rf[S]===ar),le=S===m,xe=x?oe.lerp(1,O?1:.1,p):1,R=ar?oe.lerp(1,B?1:.16,v):1,b=m>=0?Math.max(.55,_*.82):0,z=m>=0?oe.lerp(1,le?1.15:.28,b):1,ae=xe*R*z,ue=g*.22,de=oe.lerp(Ui[Z],1,ue),Me=oe.lerp(Ui[Z+1],.8,ue),ye=oe.lerp(Ui[Z+2],.52,ue),ve=oe.clamp(Math.max(ae,.22),0,1),_e=Math.max(1,ae),Ee=Math.max(Ui[Z]*.34,.14),se=Math.max(Ui[Z+1]*.34,.16),Ue=Math.max(Ui[Z+2]*.34,.2),Se=Ch[S];K[Z]=oe.lerp(Ee,de,ve)*_e*Se,K[Z+1]=oe.lerp(se,Me,ve)*_e*Se,K[Z+2]=oe.lerp(Ue,ye,ve)*_e*Se}lr.attributes.color.needsUpdate=!0}let A=lr.attributes.position.array,P=oe.lerp(gn,.06,c),y=uf?mn.axes:0,M=uf?mn.timeline:0,D=bh(Jn?1:.16,e),V=Math.max(y,M,p,v),te=xn?.window??null,I=te?oe.smoothstep(Ft,te[0],te[1])*(1-oe.smoothstep(Ft,te[2],te[3])):0;I>0&&(On.updateMatrixWorld(!0),ny.copy(On.matrixWorld).invert());for(let K=0;K<Yt;K++){let S=K*3,Z=_s[S],U=_s[S+1],O=_s[S+2],B=ys[S],le=ys[S+1],xe=ys[S+2],R=oe.lerp(Z,B,P),b=oe.lerp(U,le,P),z=oe.lerp(O,xe,P),ae=Math.sin(t*.9+K*.5)*.08*ob*(1-V),ue=R+ae,de=b+ae,Me=z,ye=dt[K];if(y>0&&(ue=oe.lerp(ue,vs[S],y),de=oe.lerp(de,vs[S+1],y),Me=oe.lerp(Me,vs[S+2],y)),M>0&&(ue=oe.lerp(ue,bs[S],M),de=oe.lerp(de,bs[S+1],M),Me=oe.lerp(Me,bs[S+2],M)),p>0&&x&&ye?.participant===x&&(ue=oe.lerp(ue,Es[S],p),de=oe.lerp(de,Es[S+1],p),Me=oe.lerp(Me,Es[S+2],p)),v>0&&ar&&rf[K]===ar&&(ue=oe.lerp(ue,Ms[S],v),de=oe.lerp(de,Ms[S+1],v),Me=oe.lerp(Me,Ms[S+2],v)),I>0){Bn.set(ue,de,Me).applyMatrix4(On.matrixWorld);let ve=1-oe.smoothstep(Math.abs(Bn.z-xn.z)/xn.depth,0,1);if(ve>.002){let _e=ve*(xn.squeeze??.75)*I;Bn.x+=(jl[K*2]-Bn.x)*_e,Bn.y+=(jl[K*2+1]-Bn.y)*_e,Bn.z>xn.z&&(Bn.z+=(xn.z-Bn.z)*ve*(xn.zSqueeze??.6)*I),Bn.applyMatrix4(ny),ue=Bn.x,de=Bn.y,Me=Bn.z}}A[S]+=(ue-A[S])*D,A[S+1]+=(de-A[S+1])*D,A[S+2]+=(Me-A[S+2])*D}lr.attributes.position.needsUpdate=!0;let G=1-(ot.children.length>0?s:0)*.85;gf.intensity=gt.key.intensity*G,xf.intensity=gt.fill.intensity*G,_f.intensity=gt.rim.intensity*G,yf.intensity=gt.front.intensity*G,Ry.intensity=gt.ambient.intensity*G;let ee=xT($y),N=1-oe.smoothstep(gn,.18,.88);if(N>0){let K=he.door.approachCamY??.62,S=he.door.approachCamZ??he.camera.z;ee.pos.set(0,oe.lerp(K,he.camera.y,N),oe.lerp(S,he.camera.z,N));let Z=tn().height,U=Math.max(he.camera.z-.55,.001),O=Z/(2*Math.tan(he.camera.fov*Math.PI/360)*U),B=he.coin.baseY+(Rs.centerY-Z/2)/Math.max(O,1e-6);ee.look.set(0,oe.lerp(K,B,N),0)}if(qt==="doorway"&&r>.001){let K=he.door.approachCamY??.62,S=he.door.approachCamZ??he.camera.z,Z=oe.smoothstep(r,0,1);Et.position.set(oe.lerp(0,he.camera.x,Z),oe.lerp(K,he.door.roomCamY??.62,Z),oe.lerp(S,he.door.roomCamZ??-.5,Z)),n>.001&&Et.position.lerp(ee.pos,n),On.position.z=oe.lerp(0,Et.position.z-u,c);let[U,O]=he.door.aimDoorT??[0,.45],[B,le]=he.door.aimRoomT??[.55,.95],xe=oe.smoothstep((r-U)/Math.max(O-U,.001),0,1),R=oe.smoothstep((r-B)/Math.max(le-B,.001),0,1);dy.set(0,he.door.approachCamY??.62,0),hy.set(ot.position.x,ot.position.y+(Sa+Yl)*.5*Ii.scale.y*ot.scale.x,ot.position.z),Nh.copy(dy).lerp(hy,xe).lerp(Zy,R),n>.001&&Nh.lerp(ee.look,n),Et.lookAt(Nh)}else Et.position.copy(ee.pos),Et.lookAt(ee.look);if(Wl){let K=qt==="doorway"?oe.smoothstep(o,.1,.45):0;Wl.intensity=K*(he.door?.roomLight?.intensity??10)}let X=he.camera.fov+(qt==="doorway"?Math.sin(Math.PI*oe.clamp(r,0,1))*(he.door?.fovKick??4):0);Math.abs(Et.fov-X)>.01&&(Et.fov=X,Et.updateProjectionMatrix());let q=qt==="doorway"?Math.sin(Math.PI*oe.clamp((r-.6)/.4,0,1)):0,J=1-oe.smoothstep(n,.95,1),fe=qt==="doorway"?oe.smoothstep(n,0,.5)*J:0,H=qt==="doorway"?oe.smoothstep(n,.55,.9)*J:0;if(lt.fog){let K=q*(he.door?.veilFog??0),S=fe*(he.door?.exitFog??.16)+H*(he.door?.exitFogSink??.14);lt.fog.density=Math.max(lt.fog.density,K,S)}let $=Math.max(va,mn.voices*.72,mn.acts*.64,mn.timeline*.78,mn.quotes*.7),me=Math.max(Nr.stageFloor??.62,1-(Nr.stageFalloff??.38)*$),Y=Math.max(Nr.ambientFloor??.62,.82-.3*gn),W=qt==="doorway"?1-(1-(Nr.figureFloor??.6))*oe.smoothstep((c-.1)/.5,0,1):1;of.opacity=Y*(1-.5*q)*me*W;let Q=qt==="doorway"?oe.smoothstep((Ft-.04)/.3,0,1):As!==1?1:0,ce=qt==="doorway"?oe.smoothstep(n,.85,.95):0,pe=1-oe.smoothstep(n,.25,.85);if(Xt)if(Lf&&gT(),Xt.group.visible=Q>.01&&ce<.99,!Xt.group.visible)xs.intensity=0,Ma.intensity=0,ei.visible=!1,Xt.group.scale.setScalar(.86+.14*Q),Xt.group.position.y=(1-Q)*.5;else{Xt.group.scale.setScalar(.86+.14*Q),Xt.group.position.y=(1-Q)*.5;let K=!1,S=Ft>.6&&n<.001;Xt.figures.forEach(b=>{b.placeholder&&(b.placeholder.visible=S,b.placeholder.rotation.y=t*.18*Q,b.placeholder.position.y=Math.sin(t*.6+b.def.x)*.04*Q),b.model&&(K=!0)});let Z=K?Q*pe*(1-ce):0,U=Xt.figures.get("balanza"),O=U?.def,B=(O?.x??0)+Xt.group.position.x,le=O?.z??he.room?.figure?.z??-4.8,xe=Xt.group.position.y+.55*(O?.scale??1.15)+(U?.root?.position.y??0);xs.intensity=Z*(he.room?.accentIntensity??14),xs.position.set(B+.9,3.1,le+2.2),Jl.position.set(B,xe,le),Ma.position.set(B-2.2,1.5,le+2.1),Ma.intensity=Z*(he.room?.fillIntensity??4);let R=Xt.figures.get("soporte");ei.position.set(B,Xt.group.position.y+(R?.height??0)*.25,le),ei.scale.setScalar(Xt.group.scale.x),ou.uniforms.uFocus.value=aT(),rT(Jn?0:t,Z)}if(et&&(et.render(lt,Et),La&&!Jn&&!Zl&&uo.length>=90)){let K=0;for(let Z=0;Z<uo.length;Z++)K+=uo[Z];let S=K/uo.length;uo.length=0,Ay=S,S>26&&Rn>.75?ff(Math.max(.75,Rn-.25)):S<12&&Rn<yi&&ff(Math.min(yi,Rn+.25)),Rn<=.76&&S>42&&i-Qy>15e3?(Bh++,Bh>=3&&_T()):Bh=0}}gsap.ticker.add(tv);var Fr=document.getElementById("quotePanel"),my=null;function Ps(){Fr.classList.remove("visible"),Fr.setAttribute("aria-hidden","true"),clearTimeout(my),my=setTimeout(()=>{Fr.classList.contains("visible")||(Fr.hidden=!0)},360),gl(),wi.index=-1,Cf(-1),xi.card&&(xi.card.focus({preventScroll:!0}),xi.card=null)}document.getElementById("quotePanelClose").addEventListener("click",Ps);window.addEventListener("keydown",i=>{i.key==="Escape"&&Fr.classList.contains("visible")&&Ps()});function Pf(){let{width:i,height:e}=or();Et.aspect=i/e,Et.updateProjectionMatrix(),et&&!ws&&(et.setPixelRatio(Rn),et.setSize(i,e)),Kl(),Iy(),Lf=!0,Tf(),Dy()}window.addEventListener("resize",Pf);window.visualViewport&&window.visualViewport.addEventListener("resize",Pf);var va=0,Ri=new ht;function yT(){let{width:i,height:e}=tn();return Ri.aspect=i/e,Ri.fov=he.camera.fov,Ri.near=Et.near,Ri.far=Et.far,Ri.position.set(he.camera.x,he.camera.y,he.camera.z),Ri.up.set(0,1,0),Ri.lookAt(0,ho,0),Ri.updateProjectionMatrix(),Ri.updateMatrixWorld(!0),Ri}function vT(i,e){let{xScale:t,yScale:n}=ao.scales;if(!t||!n)return new L(0,0,0);let r=t(i),o=n(e),s=tn(),a=r/s.width*2-1,c=-(o/s.height)*2+1,l=yT(),d=new L(a,c,.5).unproject(l).sub(l.position).normalize(),h=-l.position.z/d.z;return l.position.clone().add(d.multiplyScalar(h))}function nv(){if(!dt.length||!ao.scales.xScale||!ao.scales.yScale)return;let i=new Map,e=new Map;dt.forEach((t,n)=>{let r=t?.participant||"Participante an\xF3nimo",o=rf[n];i.has(r)||i.set(r,[]),e.has(o)||e.set(o,[]),i.get(r).push(n),e.get(o).push(n)}),i.forEach(t=>{t.forEach((n,r)=>{J_[n]=r,Q_[n]=t.length})}),e.forEach(t=>{t.forEach((n,r)=>{ey[n]=r,ty[n]=t.length})}),dt.forEach((t,n)=>{let r=n*3,o=/^\d{4}-\d{2}-\d{2}$/.test(String(t?.date||""))?new Date(`${t.date}T00:00:00Z`):new Date(`${Number(t?.year)||2e3}-01-01T00:00:00Z`),s=yl(t),a=vT(o,s);vs[r]=a.x,vs[r+1]=a.y,vs[r+2]=.06+(vt(n,12)-.5)*.06;let c=t?.label==="hawkish"?.22:t?.label==="dovish"?-.22:0,l=Math.max(Q_[n],1),u=J_[n];Es[r]=(u-(l-1)/2)*.18,Es[r+1]=.66+c+(vt(n,13)-.5)*.12,Es[r+2]=-1.35+(vt(n,14)-.5)*.28;let d=Math.max(ty[n],1),h=ey[n];Ms[r]=(h-(d-1)/2)*.22,Ms[r+1]=.6+c*.8+(vt(n,15)-.5)*.15,Ms[r+2]=-1.05+(vt(n,16)-.5)*.22;let f=String(t?.date||"").match(/^(\d{4})/),x=(oe.clamp(Number(f?f[1]:t?.year)||2e3,2e3,2015)-2e3)/15;bs[r]=-2.65+x*5.3+(vt(n,17)-.5)*.11,bs[r+1]=.66+s*1.05+(vt(n,18)-.5)*.12,bs[r+2]=-.32+(vt(n,19)-.5)*.18}),uf=!0}var ET=null,iv=()=>ET||=Promise.resolve().then(()=>(B_(),N_));ls(async()=>{let[{initD3Axes:i}]=await Promise.all([iv(),$l()]);i({quotes:dt,openQuote:Hr})});nv();var gy;function rv(){clearTimeout(gy),gy=setTimeout(async()=>{if(nv(),!P_().finished){df();return}try{let[{initD3Axes:i},{initWordEvolution:e}]=await Promise.all([iv(),av(),$l()]);i({quotes:dt,openQuote:Hr}),e(dt),wi.index>=0&&Cf(wi.index),df()}catch(i){console.warn("Reconstrucci\xF3n de las secciones de datos incompleta:",i)}},150)}window.addEventListener("resize",rv);window.visualViewport&&window.visualViewport.addEventListener("resize",rv);function MT(){let i=document.getElementById("hookContent");if(!i)return;let e=gsap.utils.toArray(i.querySelectorAll(".signal-card")),t=i.querySelector(".hook-divider > span"),n=i.querySelector(".hook-footnote");gsap.timeline({scrollTrigger:{trigger:"#stageHook",start:"top 45%",end:"bottom bottom",scrub:1}}).fromTo("#stageHook h2[data-hook]",{opacity:0,y:16,filter:"blur(8px)"},{opacity:1,y:0,filter:"blur(0px)",duration:.1,ease:"none"},.08).fromTo(".hook-lead",{opacity:0,y:18,filter:"blur(8px)"},{opacity:1,y:0,filter:"blur(0px)",duration:.14,ease:"none"},.14).fromTo(".hook-caption",{opacity:0,y:12},{opacity:1,y:0,duration:.12,ease:"none"},.26).fromTo(t,{scaleX:0},{scaleX:1,duration:.14,ease:"none"},.38).fromTo(e,{opacity:0,y:28},{opacity:1,y:0,duration:.16,ease:"none",stagger:.08},.46).fromTo(n,{opacity:0,y:14},{opacity:1,y:0,duration:.14,ease:"none"},.7).to(["#stageHook h2[data-hook]",i],{opacity:0,y:-18,duration:.12,ease:"none"},.86)}MT();function bT(){let i=(e,t)=>{document.querySelector(e)&&ScrollTrigger.create({trigger:e,start:"top 82%",end:"bottom 18%",scrub:!0,onUpdate:n=>{let r=n.progress,o=oe.smoothstep(r/.18,0,1),s=oe.smoothstep((r-.82)/.18,0,1);Ss(t,Math.min(o,1-s))},onLeave:()=>Ss(t,0),onLeaveBack:()=>Ss(t,0)})};i("#stageVoices","voices"),i("#stageActs","acts"),i("#stageTimeline","timeline"),i("#stageQuotes","quotes")}var TT=document.getElementById("tsProgress"),ST=document.getElementById("tsBar"),AT=document.getElementById("tsMarker"),wT=document.getElementById("tsSection"),Fh=[{label:"hero",start:0},{label:"door",start:.04},...qt==="doorway"?[{label:"sala",start:.13}]:[],{label:"hook",start:.29},{label:"axes",start:.38},{label:"voices",start:.52},{label:"acts",start:.61},{label:"counters",start:.69},{label:"pipeline",start:.75},{label:"timeline",start:.83},{label:"quotes",start:.91},{label:"closing",start:.98}],xy=document.getElementById("progressBar"),Oh=document.getElementById("sectionIndicator"),_y,Ea=-1;function ov(){Ea=-1}window.addEventListener("resize",ov);ScrollTrigger.addEventListener("refresh",ov);var yy=-1;function sv(){let i=window.scrollY||document.documentElement.scrollTop;Ea<0&&(Ea=document.documentElement.scrollHeight-tn().height);let e=Ea>0?i/Ea:0;$y=e;let t=Math.round(e*100);if(t!==yy&&(yy=t,xy.style.transform="scaleX("+t/100+")",xy.setAttribute("aria-valuenow",String(t))),!Ls)return;TT.textContent=t+"%",ST.style.height=t+"%",AT.style.top=t+"%";let n="hero";for(let r=Fh.length-1;r>=0;r--)if(e>=Fh[r].start){n=Fh[r].label;break}wT.textContent=n,Oh.textContent=n,Oh.style.opacity="0.6",clearTimeout(_y),_y=setTimeout(()=>{Oh.style.opacity="0"},1500)}window.addEventListener("scroll",sv,{passive:!0});sv();bT();var RT=null,av=()=>RT||=Promise.resolve().then(()=>(O_(),F_));ls(async()=>{let[{initWordEvolution:i}]=await Promise.all([av(),$l()]);i(dt)});ls(async()=>{let{initActBrowser:i}=await Promise.resolve().then(()=>(z_(),H_));i({quotes:dt,openQuote:Hr})});Ls&&(window.__diag={get state(){return{stage:As,scatter:Number(gn.toFixed(3)),coinVisible:wn.visible,coinChildren:wn.children.length,coinFade:Number(Ur.toFixed(3)),crossT:Number(Ft.toFixed(3)),exitT:Number(Br.toFixed(3)),y:Math.round(window.scrollY)}}},window.__objs={doorGroup:ot,doorFloor:ur,swarm:On,orbitGroup:ei,figureGroup:Xt?Xt.group:null,scene:lt,camera:Et});var If=new Lenis({duration:Jn?0:1.2,easing:i=>Math.min(1,1.001-Math.pow(2,-10*i)),smoothWheel:!Jn});If.on("scroll",ScrollTrigger.update);gsap.ticker.add(i=>{If.raf(i*1e3)});gsap.ticker.lagSmoothing(0);document.querySelector(".closing-cta")?.addEventListener("click",i=>{i.preventDefault(),If.scrollTo(0,{duration:1.8,easing:e=>1-Math.pow(1-e,3)})});var Df=gsap.timeline({scrollTrigger:{trigger:".hero",start:"top top",end:"55% top",scrub:!0}});Df.to(".hero-title",{opacity:0,y:-60,ease:"cinematicSilk"},0);Df.to(".scroll-hint",{opacity:0,ease:"cinematicSilk"},0);Df.to("#haloWrap",{opacity:0,ease:"cinematicSilk"},0);ScrollTrigger.create({trigger:".hero",start:"top top",end:"bottom top",scrub:!0,onUpdate:i=>{gn=i.progress,!!0&&i.progress<.25&&(nn=0,Fn=0,ot&&(ot.visible=!1))},onLeaveBack:()=>{if(!0){nn=1;return}nn=0,Fn=0,ot&&(ot.visible=!1)}});qt==="doorway"&&ScrollTrigger.create({trigger:"#stageObjective",start:"top 70%",end:"top 15%",scrub:!0,onUpdate:i=>{if(!0){nn=1;return}nn=oe.clamp(i.progress,0,1)}});ScrollTrigger.create({trigger:"#stageObjective",start:"top top",end:"bottom top",scrub:!0,onUpdate:i=>{let e=i.progress;if(qt==="doorway"){nn=1;return}e<=0?nn=0:e<.15?nn=e/.15:e<=.35?nn=1:e<.55?nn=Math.max(0,1-(e-.35)/.2):nn=0},onLeave:()=>{qt!=="doorway"&&(nn=0)},onLeaveBack:()=>{qt!=="doorway"&&(nn=0)}});if(qt==="doorway"){ScrollTrigger.create({trigger:"#stageRoom",start:"top 85%",end:"+=250%",scrub:!0,onUpdate:o=>{Ft=o.progress}}),ScrollTrigger.create({trigger:"#stageHook",start:"top 80%",end:"top 30%",scrub:!0,onUpdate:o=>{Br=o.progress},onLeave:()=>{Br=1},onLeaveBack:()=>{Br=0}}),ScrollTrigger.create({trigger:"#stageHook",start:"top 85%",end:"top 20%",scrub:!0,onUpdate:o=>{nn=1-oe.clamp(o.progress,0,1)},onLeave:()=>{nn=0},onEnterBack:()=>{nn=1}}),ScrollTrigger.create({trigger:"#stageRoom",start:"top 100%",end:"bottom 0%",onLeave:()=>{gl(),Cs()},onLeaveBack:()=>{gl(),Cs()}});let i=document.getElementById("roomTitle"),e=document.getElementById("roomLead"),t=document.getElementById("roomSub"),n=document.getElementById("roomHint");if(n&&window.matchMedia&&window.matchMedia("(pointer: coarse)").matches){n.textContent="Toca una voz para leer lo que dijo \xB7 toca el fondo para cerrar";let o=document.querySelector(".axes-reading-trace");o&&(o.textContent="toca un punto \u2192 fecha \xB7 voz \xB7 fragmento")}let r=document.getElementById("stageRoomContainer");if(i&&e&&t&&n){let o={v:0},s=()=>{r&&r.style.setProperty("--room-scrim",o.v.toFixed(3))},a=1/285;gsap.timeline({scrollTrigger:{trigger:"#stageRoom",start:"top top",end:"bottom bottom",scrub:!0}}).fromTo(o,{v:0},{v:1,duration:16*a,ease:"none",onUpdate:s},180*a).fromTo(i,{opacity:0,y:18},{opacity:1,y:0,duration:16*a,ease:"none"},183*a).fromTo(e,{opacity:0,y:18},{opacity:1,y:0,duration:16*a,ease:"none"},193*a).fromTo(t,{opacity:0,y:14},{opacity:1,y:0,duration:14*a,ease:"none"},203*a).fromTo(n,{opacity:0,y:12},{opacity:1,y:0,duration:12*a,ease:"none"},213*a).to(i,{opacity:0,y:-14,duration:10*a,ease:"none"},255*a).to(e,{opacity:0,y:-14,duration:10*a,ease:"none"},259*a).to(t,{opacity:0,y:-12,duration:10*a,ease:"none"},263*a).to(o,{v:.5,duration:10*a,ease:"none",onUpdate:s},263*a).to(n,{opacity:0,y:-10,duration:6*a,ease:"none"},279*a).to(o,{v:0,duration:6*a,ease:"none",onUpdate:s},279*a)}}var Hh=document.querySelector(".voices-intro"),vy=document.getElementById("voiceExplorer");Hh&&vy&&gsap.timeline({scrollTrigger:{trigger:"#stageVoices",start:"top 85%",end:"bottom bottom",scrub:!0}}).fromTo(Hh,{opacity:0,y:18},{opacity:1,y:0,duration:.12,ease:"none"},.04).fromTo(vy,{opacity:0,y:24},{opacity:1,y:0,duration:.14,ease:"none"},.16).to(Hh,{opacity:0,y:-14,duration:.08,ease:"none"},.9);var CT=gsap.timeline({scrollTrigger:{trigger:"#stageObjective",start:"top top",end:"bottom bottom",scrub:!0}});CT.fromTo("[data-objective]",{opacity:0,y:30},{opacity:1,y:0,duration:.22,ease:"cinematicOut",stagger:.05},.06).to("[data-objective]",{opacity:0,y:-25,duration:.2,ease:"cinematicIn"},.8);var LT=document.querySelectorAll("#stageHook h2[data-hook]");LT.forEach((i,e)=>{let t=new SplitText(i,{type:"chars,words",charsClass:"char-reveal",wordsClass:"word-reveal"});gsap.fromTo(t.chars,{opacity:0,y:20,rotationX:-40},{opacity:1,y:0,rotationX:0,duration:.6,stagger:.02,ease:"cinematicOut",scrollTrigger:{trigger:i,start:"top 70%",end:"top 40%",toggleActions:"play none none reverse"}})});var PT=document.querySelectorAll("[data-counter]");PT.forEach(i=>{let e=i.querySelector(".counter-number"),t=e.dataset.target,n=t.startsWith("[TODO");gsap.fromTo(i,{opacity:0,y:24},{opacity:1,y:0,duration:.6,ease:"cinematicOut",scrollTrigger:{trigger:i,start:"top 85%",toggleActions:"play none none reverse",onEnter:()=>{if(n)return;let r=parseInt(t,10),o={val:0};gsap.to(o,{val:r,duration:1.5,ease:"cinematicSilk",onUpdate:()=>{e.textContent=Math.round(o.val)}})}}})});(function(){let e=document.getElementById("pipeTrack"),t=e?.closest(".pipe-viewport");if(!e||!t)return;let n=document.getElementById("seedGrid"),r=[],o=dt.filter(U=>["hawkish","dovish","neutral"].includes(U.label));o.forEach((U,O)=>{let B=document.createElement("i");B.className=`seed-dot ${U.label}`,B.dataset.th=(.04+O/Math.max(o.length,1)*.76).toFixed(3),B.title=`${U.label} \xB7 ${U.participant||"Participante an\xF3nimo"} \xB7 ${U.date||U.year||"fecha no especificada"}`,n.appendChild(B),r.push(B)});let s=o.length,a=document.getElementById("corpusGrid"),c=document.getElementById("corpusHead"),l=document.getElementById("corpusYear"),u=document.getElementById("corpusPct"),d=document.getElementById("corpusCoverageNote"),h=Array.from({length:16},(U,O)=>2e3+O),f=U=>{let O=String(U.date||"").match(/^(\d{4})/);return Number(O?O[1]:U.year)},g=dt.filter(U=>h.includes(f(U))),x=new Map(h.map(U=>[U,[]]));g.forEach(U=>x.get(f(U)).push(U));let m=h.filter(U=>x.get(U).length===0),p=dt.length-g.length,v=[],_=-1,T=U=>{let O=[];return U.forEach(B=>{let le=O[O.length-1];le&&B===le[1]+1?le[1]=B:O.push([B,B])}),O.map(([B,le])=>B===le?String(B):`${B}\u2013${le}`).join(", ")};function w(){if(a.innerHTML="",a.style.setProperty("--cols",h.length),v=[],h.forEach(U=>{let O=document.createElement("span");if(O.className="corpus-col",O.dataset.year=String(U),x.get(U).forEach(B=>{let le=document.createElement("i"),xe=["hawkish","dovish","neutral"].includes(B.label)?B.label:"neutral";le.className=`corpus-dot ${xe==="hawkish"?"h":xe==="dovish"?"d":"n"}`,O.appendChild(le)}),!x.get(U).length){let B=document.createElement("i");B.className="corpus-empty",B.setAttribute("aria-hidden","true"),O.appendChild(B)}a.appendChild(O),v.push(O)}),_=-1,d){let U=[];m.length&&U.push(`sin muestra: ${T(m)}`),p&&U.push(`${p} fuera de 2000\u20132015`),d.textContent=U.length?` \xB7 ${U.join(" \xB7 ")}`:""}}w();let E=document.getElementById("wordCount"),A=document.querySelectorAll("#stagePipeline .doc-line > span"),P=document.querySelector("#stagePipeline .frag"),y=document.getElementById("verdictStamp"),M=document.getElementById("confBar"),D=document.getElementById("confVal"),V=document.getElementById("seedCount"),te=document.querySelectorAll("#pipeRail .rail-node"),I=document.querySelectorAll("#pipeRail .rail-seg i"),k=gsap.utils.clamp(0,1),G=(U,O,B)=>{let le=B-O;return le<=1e-6?U>=B?1:0:k((U-O)/le)},ee=U=>1-Math.pow(1-U,3),N=U=>Math.round(U).toLocaleString("es-CL"),X=dt.reduce((U,O)=>U+String(O.text||"").trim().split(/\s+/).filter(Boolean).length,0),q=dt.find(U=>U.label==="hawkish")||dt[0],J=["hawkish","dovish","neutral"].includes(q?.label)?q.label:"neutral",fe=Number.isFinite(Number(q?.score))?Number(q.score):0,H={hawkish:"Hawkish",dovish:"Dovish",neutral:"Neutral"},$=String(q?.text||"Sin texto disponible").replace(/\s+/g," ").trim();P&&(P.textContent=`\xAB${$.length>150?`${$.slice(0,150)}\u2026`:$}\xBB`),y&&(y.textContent=H[J]);let me=e.querySelectorAll(".pipe-panel"),Y=()=>{let U=e.scrollWidth-t.clientWidth,O=t.clientWidth,B=O*.78,le=O*.5;if(!(U>0)||!(O>0)||!me.length){let R=1/(me.length||1);return Array.from(me).map((b,z)=>({start:z*R,end:Math.min(1,(z+1)*R)}))}return Array.from(me).map(xe=>{let R=xe.offsetLeft+xe.offsetWidth/2,b=(R-B)/U,z=(R-le)/U;return{start:k(b),end:k(z)}})},W=Y(),Q=document.getElementById("debugPanel"),ce=document.getElementById("debugSection"),pe=document.getElementById("debugProgress"),K=document.getElementById("debugPanelInfo"),S=document.getElementById("debugBar");function Z(U){let O=G(U,W[0].start,W[0].end);A.forEach((ye,ve)=>{let _e=ee(G(O,.04+ve*.08,.3+ve*.08));ye.style.transform=`translateY(${(1-_e)*110}%)`}),E.textContent=N(X*ee(G(O,.2,.9)));let B=G(U,W[1].start,W[1].end);r.forEach(ye=>ye.classList.toggle("lit",B>+ye.dataset.th)),V.textContent=N(s*ee(G(B,.12,.92)));let le=G(U,W[2].start,W[2].end);P.style.opacity=ee(G(le,.08,.4));let xe=ee(G(le,.5,.75));y.style.opacity=xe,y.style.transform=`scale(${1.9-.9*xe}) rotate(${-9+6*xe}deg)`;let R=ee(G(le,.55,.95));M.style.width=R*fe*100+"%",D.textContent=(R*fe).toFixed(2);let b=G(U,W[3].start,W[3].end),z=G(b,.1,.95),ae=Math.floor(z*(h.length+1));ae!==_&&(v.forEach((ye,ve)=>ye.classList.toggle("lit",ve<ae)),_=ae),c.style.left=z*100+"%",c.style.opacity=b>.02&&z<.999?1:0;let ue=Math.min(h.length-1,Math.round(z*(h.length-1)));l.textContent=h[ue];let de=h.slice(0,ae).reduce((ye,ve)=>ye+x.get(ve).length,0);u.textContent=Math.min(100,Math.round(de/Math.max(g.length,1)*100))+"%";let Me=0;for(let ye=W.length-1;ye>=0;ye--)if(U>=W[ye].start){Me=ye;break}if(te.forEach((ye,ve)=>ye.classList.toggle("active",ve<=Me)),I.forEach((ye,ve)=>{ve<Me?ye.style.transform="scaleX(1)":ve===Me?ye.style.transform=`scaleX(${G(U,W[ve].start,W[ve].end)})`:ye.style.transform="scaleX(0)"}),Ls&&Q){Q.classList.add("visible"),ce.textContent="Pipeline",pe.textContent=Math.round(U*100)+"%";let ye=["01 \xB7 Fuente","02 \xB7 Muestra / criterio","03 \xB7 Clasificaci\xF3n guiada","04 \xB7 Revisi\xF3n / trazabilidad"];K.textContent=ye[Me]||"\u2014",S.style.transform="scaleX("+U+")"}}gsap.to(e,{x:()=>-(e.scrollWidth-t.clientWidth),ease:"none",scrollTrigger:{trigger:".pipeline-pin-wrapper",start:"top top",end:()=>"+="+(e.scrollWidth-t.clientWidth),pin:!0,scrub:1,invalidateOnRefresh:!0,anticipatePin:1,onRefresh:()=>{W=Y()},onUpdate:U=>Z(U.progress)}}),Z(0),window.addEventListener("resize",()=>{ScrollTrigger.refresh()})})();ls(async()=>{let[{initTimeline:i}]=await Promise.all([Promise.resolve().then(()=>(V_(),G_)),$l()]);i(dt)});gsap.timeline({scrollTrigger:{trigger:"#stageAxes",start:"top 60%",end:"bottom top",scrub:!0}}).fromTo("#d3-canvas",{opacity:0},{opacity:1,duration:.15,ease:"none"},0).to("#d3-canvas",{opacity:0,duration:.15,ease:"none",immediateRender:!1},.85);ScrollTrigger.create({trigger:"#stageAxes",start:"top 60%",end:"bottom top",scrub:!0,onUpdate:i=>{let e=i.progress,t=gsap.utils.clamp(0,1,e/.15),n=gsap.utils.clamp(0,1,(1-e)/.15);va=Math.min(t,n),Ss("axes",va)},onLeave:()=>{va=0,Ss("axes",0)},onLeaveBack:()=>{va=0,Ss("axes",0)}});var IT=document.querySelectorAll("[data-quote]");IT.forEach(i=>{gsap.fromTo(i,{opacity:0,y:24},{opacity:1,y:0,duration:.8,ease:"cinematicOut",scrollTrigger:{trigger:i,start:"top 80%",toggleActions:"play none none reverse"}}),i.addEventListener("click",()=>{let e=i.dataset.quoteParticipant,t=parseInt(i.dataset.quoteYear,10),n=dt.findIndex(r=>r.participant===e&&r.year===t);if(n<0&&(n=dt.findIndex(r=>r.participant===e)),n>=0){xi.card=i,gi(n);let r=i.getBoundingClientRect();Hr(n,{x:r.left+r.width/2,y:r.top+r.height/2})}}),i.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),i.click())})});document.querySelectorAll("[data-closing]").forEach(i=>{let e=i.textContent.replace(/\s+/g," ").trim(),t=new SplitText(i,{type:"chars,words",charsClass:"char-reveal",wordsClass:"word-reveal",aria:"none"});t.words.forEach(r=>r.setAttribute("aria-hidden","true"));let n=document.createElement("span");n.className="sr-only",n.textContent=e,i.appendChild(n),gsap.fromTo(t.chars,{opacity:0,y:15,rotationX:-30},{opacity:1,y:0,rotationX:0,duration:.5,stagger:.015,ease:"cinematicOut",scrollTrigger:{trigger:i,start:"top 85%",toggleActions:"play none none reverse"}})});var DT=[{trigger:"#stageObjective",color:"#0c1020"},{trigger:"#stageRoom",color:"#0b0f1c"},{trigger:"#stageHook",color:"#0a0e1a"},{trigger:"#stageAxes",color:"#0d1225"},{trigger:"#stageVoices",color:"#0b101c"},{trigger:"#stageCounters",color:"#0a0e1a"},{trigger:"#stagePipeline",color:"#0c1020"},{trigger:"#stageTimeline",color:"#0a0e1a"},{trigger:"#stageQuotes",color:"#0d1225"},{trigger:"#stageClosing",color:"#0a0e1a"}];DT.forEach(({trigger:i,color:e})=>{ScrollTrigger.create({trigger:i,start:"top center",end:"bottom center",onToggle:t=>{t.isActive&&(gsap.to("html",{backgroundColor:e,duration:1.2,ease:"power2.inOut"}),gsap.to("body",{backgroundColor:e,duration:1.2,ease:"power2.inOut"}))}})});var Ey=document.documentElement,UT=[{trigger:"#hero",alpha:.16},{trigger:"#stageObjective",alpha:.14},{trigger:"#stageRoom",alpha:.07},{trigger:"#stageHook",alpha:.025},{trigger:"#stageAxes",alpha:.015},{trigger:"#stageVoices",alpha:.035},{trigger:"#stageCounters",alpha:.025},{trigger:"#stagePipeline",alpha:.018},{trigger:"#stageTimeline",alpha:.035},{trigger:"#stageQuotes",alpha:.018},{trigger:"#stageClosing",alpha:.08}];function pf(i,e=!1){if(e){Ey.style.setProperty("--ambient-alpha",String(i));return}gsap.to(Ey,{"--ambient-alpha":i,duration:1.25,ease:"power2.inOut",overwrite:"auto"})}pf(.16,!0);UT.forEach(({trigger:i,alpha:e})=>{ScrollTrigger.create({trigger:i,start:"top center",end:"bottom center",onEnter:()=>pf(e),onEnterBack:()=>pf(e)})});document.querySelectorAll(".quote-card").forEach(i=>{i.addEventListener("mouseenter",()=>{gsap.to(i,{scale:1.02,duration:.3,ease:"power2.out",boxShadow:i.classList.contains("hawkish")?"0 0 60px rgba(255,215,106,0.15)":"0 0 60px rgba(138,180,248,0.15)"})}),i.addEventListener("mouseleave",()=>{gsap.to(i,{scale:1,duration:.3,ease:"power2.out",boxShadow:i.classList.contains("hawkish")?"0 0 40px rgba(255,215,106,0.05)":"0 0 40px rgba(138,180,248,0.05)"})})});var NT=()=>ScrollTrigger.refresh(),BT=()=>{Pf(),df(),NT()},My=0,FT=150;function su(){clearTimeout(My),My=setTimeout(BT,FT)}document.fonts&&document.fonts.ready&&document.fonts.ready.then(su);window.addEventListener("load",su);Ca.onLoad=(()=>{let i=Ca.onLoad;return()=>{i(),su()}})();L_(su);
