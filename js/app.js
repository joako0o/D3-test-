/* app.js — GENERADO por scripts/build-js.mjs. No editar: se pisa al correr
   `npm run build:js` (que `npm start` ejecuta solo).
   Fuentes: js/*.js (ver js/README.md) + three@0.160.0 (tree-shaken).
   Edítalas y corre `npm run build:js`. */
var Ev=Object.defineProperty;var Fi=(i,e,t)=>()=>{if(t)throw t[0];try{return i&&(e=i(i=0)),e}catch(n){throw t=[n],n}};var Us=(i,e)=>{for(var t in e)Ev(i,t,{get:e[t],enumerable:!0})};function Ai(){let i=document.documentElement,e=window.visualViewport;return{width:Math.max(i?.clientWidth||e?.width||window.innerWidth,1),height:Math.max(i?.clientHeight||e?.height||window.innerHeight,1)}}function R_(){return Ai().width<=767}function nn(){return gl===null&&(gl=Object.freeze(Ai())),gl}function vh(){gl=null}var gl,xl=Fi(()=>{gl=null;typeof window<"u"&&(window.addEventListener("resize",vh),window.addEventListener("orientationchange",vh),window.visualViewport&&window.visualViewport.addEventListener("resize",vh))});function C_(){return Sn.pinned>=0?Sn.pinned:Sn.hover}function _l(){return Sn.pinned>=0}function Eh(i){Sn.hover=i}function Mh(){Sn.hover=-1}function mi(i){Sn.pinned=i,Sn.hover=-1}function yl(){Sn.pinned=-1,Sn.hover=-1}var Sn,wn,co,gi,Ri,pa=Fi(()=>{Sn={hover:-1,pinned:-1};wn={participant:null,rendered:null,quoteIndex:-1},co={scales:{}},gi={card:null},Ri={index:-1}});var Et,Sh,Ml,wh,sr,Ah=Fi(()=>{Et=(i,e=0)=>{let t=Math.sin((i+1)*12.9898+e*78.233)*43758.5453;return t-Math.floor(t)},Sh=(i,e,t)=>Math.min(Math.max(i,e),t),Ml=i=>{let e=i?.label||"neutral",t=Sh(Number(i?.score)||.7,0,1),n=String(i?.date||"").length+String(i?.text||"").length,r=Math.sin(n*9301+49297)*233280,o=r-Math.floor(r);return e==="hawkish"?.3+t*.4:e==="dovish"?-(.3+t*.4):(o-.5)*.18},wh=(i,e)=>{if(i>=1)return 1;if(i<=0)return 0;let t=Math.min(e,100)/(1e3/60);return 1-Math.pow(1-i,t)},sr=(i,e,t,n)=>i+(e-i)*wh(t,n)});var O_,xi,Rh,bl=Fi(()=>{O_=[{id:"inflation",short:"Inflaci\xF3n",label:"Inflaci\xF3n y precios",terms:["inflaci\xF3n","inflacionario","ipc","precios","subyacente","expectativas","meta"]},{id:"activity",short:"Actividad",label:"Actividad y crecimiento",terms:["crecimiento","pib","actividad","demanda","consumo","inversi\xF3n","producto","brecha"]},{id:"monetary",short:"Tasas",label:"Pol\xEDtica monetaria",terms:["tasa","tpm","pol\xEDtica monetaria","est\xEDmulo","neutralidad","liquidez","mantener","subir","bajar"]},{id:"external",short:"Externo",label:"Escenario internacional",terms:["externo","internacional","estados unidos","ee.uu","global","mundial","china","europa","mercados externos"]},{id:"financial",short:"Mercados",label:"Mercados y tipo de cambio",terms:["mercados financieros","tipo de cambio","tasas forward","forward","activos","bonos","financiero","d\xF3lar","peso"]},{id:"commodities",short:"Commodities",label:"Commodities y energ\xEDa",terms:["materias primas","petr\xF3leo","cobre","energ\xEDa","alimentos","commodities"]},{id:"labor",short:"Laboral",label:"Empleo y holguras",terms:["empleo","desempleo","salarios","salario","holgura","trabajadores"]},{id:"fiscal",short:"Fiscal",label:"Pol\xEDtica fiscal",terms:["fiscal","gasto","presupuesto","presupuestos","gobierno","impuesto","d\xE9ficit"]}],xi=i=>String(i||"").toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g,""),Rh=(i,e)=>i.includes(xi(e))});var H_={};Us(H_,{initVoiceExplorer:()=>ab});function ab({quotes:i,openQuote:e,closeQuotePanel:t}){let n=document.getElementById("voiceRail"),r=document.getElementById("voiceDirectoryMeta"),o=document.getElementById("voiceDetailEmpty"),s=document.getElementById("voiceDetailContent"),a=document.getElementById("voiceDetailName"),c=document.getElementById("voiceDetailMeta"),l=document.getElementById("voiceDetailSummary"),u=document.getElementById("voiceDetailQuote"),d=document.getElementById("voiceDetailCitation"),h=document.getElementById("voiceDetailOpen"),f=document.getElementById("voiceProfileOpen"),g=document.getElementById("voiceProfilePanel"),x=document.getElementById("voiceProfileClose"),m=document.getElementById("voiceProfileTitle"),p=document.getElementById("voiceProfileSubtitle"),v=document.getElementById("voiceRadar"),_=document.getElementById("voiceTopicList"),T=document.getElementById("voiceProfileEvidenceQuote"),A=document.getElementById("voiceProfileEvidenceCitation");if(!n||!r||!o||!s||!h||!f||!g||!x||!v||!_||!T||!A||!i.length)return;let E=j=>{let W=String(j.date||"").match(/^(\d{4})/);return Number(W?W[1]:j.year)},w=new Map,P=0;i.forEach((j,W)=>{let ee=E(j);if(!Number.isFinite(ee)||ee<2e3||ee>2015){P+=1;return}let ce=j.participant||"Participante an\xF3nimo";w.has(ce)||w.set(ce,[]),w.get(ce).push({q:j,index:W,normalizedText:xi(j.text)})});let y=Array.from(w,([j,W])=>{let ee={hawkish:0,dovish:0,neutral:0},ce=W.map(({q:pe})=>E(pe)).filter(Number.isFinite);return W.forEach(({q:pe})=>{let $=pe.label in ee?pe.label:"neutral";ee[$]+=1}),{name:j,rows:W,count:W.length,toneCounts:ee,minYear:ce.length?Math.min(...ce):"\u2014",maxYear:ce.length?Math.max(...ce):"\u2014"}}).sort((j,W)=>W.count-j.count||j.name.localeCompare(W.name,"es"));r.textContent=`Muestra visual \xB7 ${y.length} voces \xB7 ${i.length-P} fragmentos${P?` \xB7 ${P} fuera del per\xEDodo`:""}`,n.innerHTML="";let M=[],D=null,V={hawkish:"hawkish (restrictiva)",dovish:"dovish (expansiva)",neutral:"neutral"},ie="http://www.w3.org/2000/svg",I=(j,W={})=>{let ee=document.createElementNS(ie,j);return Object.entries(W).forEach(([ce,pe])=>ee.setAttribute(ce,String(pe))),ee},k=j=>{if(!j||!j.length)return null;let W=j.slice().sort((ee,ce)=>{let pe=String(ee.q.date||ee.q.year||""),$=String(ce.q.date||ce.q.year||"");return pe.localeCompare($)||ee.index-ce.index});return W[Math.floor((W.length-1)/2)]},G=j=>O_.map(W=>{let ee=j.rows.filter(pe=>W.terms.some($=>Rh(pe.normalizedText,$))),ce=W.terms.map(pe=>({term:pe,count:j.rows.filter($=>Rh($.normalizedText,pe)).length})).filter(pe=>pe.count>0).sort((pe,$)=>$.count-pe.count||pe.term.localeCompare($.term,"es"));return{definition:W,rows:ee,value:j.count?ee.length/j.count*100:0,termCounts:ce}});function te(j,W){v.innerHTML="";let ee=150,ce=128,pe=82,$=j.length,S=B=>-Math.PI/2+B/$*Math.PI*2,J=(B,le,xe=pe*(le/100))=>{let R=S(B);return[ee+Math.cos(R)*xe,ce+Math.sin(R)*xe]},U=B=>j.map((le,xe)=>J(xe,100,B).join(",")).join(" ");[.25,.5,.75,1].forEach(B=>{v.appendChild(I("polygon",{class:"radar-ring",points:U(pe*B)}))}),j.forEach((B,le)=>{let[xe,R]=J(le,100);v.appendChild(I("line",{class:"radar-axis",x1:ee,y1:ce,x2:xe,y2:R}))});let O=I("polygon",{class:"radar-shape",points:j.map((B,le)=>J(le,B.value).join(",")).join(" ")});v.appendChild(O),j.forEach((B,le)=>{let[xe,R]=J(le,B.value);v.appendChild(I("circle",{class:"radar-point",cx:xe,cy:R,r:3.5}));let[b,z]=J(le,100,pe+23),se=I("text",{class:"radar-label",x:b,y:z+(z<ce?-2:4),"text-anchor":b<ee-8?"end":b>ee+8?"start":"middle"});se.textContent=B.definition.short,v.appendChild(se)}),v.appendChild(I("circle",{cx:ee,cy:ce,r:2,fill:"rgba(255,255,255,0.65)"})),v.setAttribute("aria-label",`Perfil tem\xE1tico de ${W}. Cada eje muestra el porcentaje de sus fragmentos con una menci\xF3n directa.`),gsap.fromTo(O,{opacity:0,scale:.92,transformOrigin:`${ee}px ${ce}px`},{opacity:1,scale:1,duration:.55,ease:"cinematicOut"})}let N=null,X=null;function q(j,W){let ee=k(W)||k(j.rows);ee&&(T.textContent=`\u201C${ee.q.text||"Sin texto disponible"}\u201D`,A.textContent=`\u2014 ${ee.q.participant||j.name}, ${ee.q.formatted_date||ee.q.date||ee.q.year||"fecha no especificada"}`)}function Q(j,W=null){if(!j)return;let ee=G(j);m.textContent=j.name,p.textContent=`${j.count} ${j.count===1?"intervenci\xF3n":"intervenciones"} \xB7 ${j.minYear}\u2013${j.maxYear} \xB7 cada eje = proporci\xF3n de fragmentos con menci\xF3n directa`,te(ee,j.name),_.innerHTML="",ee.forEach(pe=>{let $=document.createElement("button");$.type="button",$.className="voice-topic-row"+(pe.definition.id===W?" is-active":""),$.setAttribute("aria-pressed",String(pe.definition.id===W)),$.setAttribute("aria-label",`${pe.definition.label}: ${Math.round(pe.value)} por ciento de los fragmentos`),$.innerHTML=`
        <span class="voice-topic-row-top"><span></span><strong></strong></span>
        <span class="voice-topic-meter"><i></i></span>
        <span class="voice-topic-terms"></span>`,$.querySelector(".voice-topic-row-top span").textContent=pe.definition.label,$.querySelector(".voice-topic-row-top strong").textContent=`${Math.round(pe.value)}%`,$.querySelector(".voice-topic-meter i").style.width=`${pe.value}%`,$.querySelector(".voice-topic-terms").textContent=pe.termCounts.length?pe.termCounts.slice(0,3).map(S=>S.term).join(" \xB7 "):"sin coincidencia directa en la muestra",$.addEventListener("click",()=>Q(j,pe.definition.id)),_.appendChild($)});let ce=ee.find(pe=>pe.definition.id===W);q(j,ce?.rows||j.rows)}function fe(j){j&&(Q(j),X=document.activeElement,g.hidden=!1,g.setAttribute("aria-hidden","false"),document.body.classList.add("voice-profile-modal-open"),requestAnimationFrame(()=>g.classList.add("is-open")),x.focus({preventScroll:!0}))}function H(){g.hidden||(g.classList.remove("is-open"),g.setAttribute("aria-hidden","true"),document.body.classList.remove("voice-profile-modal-open"),clearTimeout(N),N=setTimeout(()=>{g.hidden=!0,X&&typeof X.focus=="function"&&X.focus({preventScroll:!0}),X=null},340))}x.addEventListener("click",H),g.querySelectorAll("[data-voice-profile-close]").forEach(j=>j.addEventListener("click",H)),window.addEventListener("keydown",j=>{j.key==="Escape"&&!g.hidden&&(j.preventDefault(),H())});function Z(j){if(!j){o.hidden=!1,s.hidden=!0,wn.quoteIndex=-1;return}let W=k(j.rows),ee=[`${j.toneCounts.hawkish} ${V.hawkish}`,`${j.toneCounts.dovish} ${V.dovish}`,`${j.toneCounts.neutral} neutral${j.toneCounts.neutral===1?"":"es"}`].join(" \xB7 ");o.hidden=!0,s.hidden=!1,a.textContent=j.name,c.textContent=`${j.count} ${j.count===1?"intervenci\xF3n":"intervenciones"} en la muestra \xB7 ${j.minYear}\u2013${j.maxYear}`,l.textContent=`Se\xF1ales detectadas en sus fragmentos: ${ee}.`,u.textContent=`\u201C${W.q.text||"Sin texto disponible"}\u201D`,d.textContent=`\u2014 ${W.q.participant||j.name}, ${W.q.formatted_date||W.q.date||W.q.year||"fecha no especificada"}`,wn.quoteIndex=W.index}function me(j){D=D===j?null:j,wn.participant=D,D&&(wn.rendered=D),M.forEach(({card:W,voice:ee})=>{let ce=ee.name===D;W.setAttribute("aria-pressed",String(ce))}),Z(D?y.find(W=>W.name===D):null),typeof t=="function"&&t()}f.addEventListener("click",()=>{let j=D?y.find(W=>W.name===D):null;fe(j)}),y.forEach((j,W)=>{let ee=document.createElement("div");ee.setAttribute("role","listitem"),ee.className="voice-card-item";let ce=document.createElement("button");ce.type="button",ce.className="voice-card",ce.setAttribute("aria-pressed","false"),ce.setAttribute("aria-label",`Seleccionar ${j.name}: ${j.count} ${j.count===1?"intervenci\xF3n":"intervenciones"} entre ${j.minYear} y ${j.maxYear}.`),ce.innerHTML=`
      <span class="voice-card-index"></span>
      <span class="voice-card-name"></span>
      <span class="voice-card-meta"></span>
      <span class="voice-card-years"></span>
      <span class="voice-signal-bar" aria-hidden="true">
        <i class="hawkish"></i><i class="dovish"></i><i class="neutral"></i>
      </span>`,ce.querySelector(".voice-card-index").textContent=String(W+1).padStart(2,"0"),ce.querySelector(".voice-card-name").textContent=j.name,ce.querySelector(".voice-card-meta").textContent=`${j.count} ${j.count===1?"intervenci\xF3n":"intervenciones"}`,ce.querySelector(".voice-card-years").textContent=`${j.minYear}\u2013${j.maxYear}`,["hawkish","dovish","neutral"].forEach(pe=>{ce.querySelector(`.voice-signal-bar .${pe}`).style.width=`${j.toneCounts[pe]/j.count*100}%`}),ce.addEventListener("click",()=>me(j.name)),ee.appendChild(ce),n.appendChild(ee),M.push({card:ce,voice:j})}),h.addEventListener("click",()=>{wn.quoteIndex<0||(mi(wn.quoteIndex),e(wn.quoteIndex,{x:window.innerWidth*.54,y:window.innerHeight*.62}))})}var z_=Fi(()=>{pa();bl()});var k_={};Us(k_,{initD3Axes:()=>cb});function cb({quotes:i,openQuote:e}){let t=document.getElementById("d3-canvas");if(!t)return;t.innerHTML="";let n=Ai(),r=n.width,o=n.height,s=d3.select(t).append("svg").attr("width",r).attr("height",o).attr("role","img").attr("aria-label","Mapa de intervenciones: cada punto conserva su fecha, participante y fragmento").style("position","absolute").style("inset","0"),a={top:o*(r<640?.34:.28),right:r*.15,bottom:o*.18,left:r*.15},c=r-a.left-a.right,l=o-a.top-a.bottom,u=d3.scaleTime().domain([new Date(2e3,0,1),new Date(2015,11,31)]).range([a.left,r-a.right]),d=d3.scaleLinear().domain([-1,1]).range([a.top+l,a.top]);co.scales={xScale:u,yScale:d};let h=a.top+l/2,f=s.append("g");f.append("rect").attr("class","axes-plot-field").attr("x",a.left).attr("y",a.top).attr("width",c).attr("height",l).attr("rx",Math.min(8,r*.01));let g=r<500?4:r<900?6:8;f.append("g").attr("class","axes-grid").selectAll(".axes-grid-vertical").data(u.ticks(g)).join("line").attr("class","axes-grid-vertical").attr("x1",M=>u(M)).attr("x2",M=>u(M)).attr("y1",a.top).attr("y2",a.top+l),[-.5,.5].forEach(M=>{f.append("line").attr("class","axes-grid-guide").attr("x1",a.left).attr("x2",r-a.right).attr("y1",d(M)).attr("y2",d(M))}),f.append("line").attr("class","axes-zero-line").attr("x1",a.left).attr("x2",r-a.right).attr("y1",h).attr("y2",h);let m=new Date(2e3,0,1).getTime(),p=new Date(2015,11,31).getTime(),v=i.map((M,D)=>({q:M,index:D,date:new Date(M.date)})).filter(({date:M})=>M.getTime()>=m&&M.getTime()<=p);s.append("g").attr("class","axes-data-layer").selectAll(".axes-data-point").data(v,M=>M.index).join(M=>{let D=M.append("g").attr("class","axes-data-mark");return D.append("circle").attr("class","axes-data-hit").attr("r",14).attr("fill","transparent").attr("pointer-events","all"),D.append("circle").attr("class","axes-data-halo"),D.append("circle").attr("class","axes-data-point"),D}).attr("transform",({q:M,date:D})=>`translate(${u(D)}, ${d(Ml(M))})`).attr("data-quote-index",({index:M})=>M).attr("class",({q:M})=>`axes-data-mark axes-data-mark--${M.label||"neutral"}`).attr("tabindex","0").attr("role","button").attr("aria-label",({q:M})=>`Abrir intervenci\xF3n ${M.label||"neutral"} de ${M.participant||"participante an\xF3nimo"}, ${M.formatted_date||M.date||M.year||"fecha no especificada"}`).on("keydown",(M,D)=>{M.key!=="Enter"&&M.key!==" "||(M.preventDefault(),gi.card=M.currentTarget,mi(D.index),e(D.index,{x:window.innerWidth*.55,y:window.innerHeight*.58}))}).on("click",(M,D)=>{M.stopPropagation(),gi.card=M.currentTarget,mi(D.index),e(D.index,{x:M.clientX,y:M.clientY})}).each(function({q:M}){let V=2.8+Sh(Number(M.score)||.7,0,1)*2.1,ie=d3.select(this);ie.select(".axes-data-halo").attr("r",V*1.9).attr("class",`axes-data-halo axes-data-halo--${M.label||"neutral"}`),ie.select(".axes-data-point").attr("r",V).attr("class",`axes-data-point axes-data-point--${M.label||"neutral"}`)});let A=d3.axisBottom(u).ticks(g).tickSizeOuter(0).tickFormat(d3.timeFormat("%Y")),E=f.append("g").attr("class","axes-x-axis").attr("transform",`translate(0, ${h})`).call(A);E.selectAll("text").attr("dy","1.55em").style("fill","rgba(255,255,255,0.48)").style("font-family","var(--font-body)").style("font-size",r<500?"10px":"12px").style("letter-spacing","0.2px"),E.selectAll(".domain, .tick line").style("stroke","rgba(255,255,255,0.13)");let w=r<640,P=w?10:a.left-16,y=w?"start":"end";return s.append("text").attr("x",P).attr("y",a.top-12).attr("text-anchor",y).style("fill","rgba(255,215,106,0.82)").style("font-size",r<500?"11px":"13px").style("letter-spacing","2px").style("text-transform","uppercase").text("Hawkish \u2191"),s.append("text").attr("x",P).attr("y",a.top+l+20).attr("text-anchor",y).style("fill","rgba(138,180,248,0.82)").style("font-size",r<500?"11px":"13px").style("letter-spacing","2px").style("text-transform","uppercase").text("Dovish \u2193"),co.scales}var G_=Fi(()=>{pa();xl();Ah()});var V_={};Us(V_,{initWordEvolution:()=>ub});function lb(){xa.forEach(i=>{try{i()}catch{}}),xa.length=0}function ub(i=ga){ga=i;let e=document.getElementById("wordEvolutionSvg"),t=document.querySelector(".word-evolution-intro"),n=document.getElementById("wordEvolutionBoard"),r=document.getElementById("wordEvolutionYear"),o=document.getElementById("wordEvolutionReadout");if(!e||!t||!n||!r||!o||!ga.length||!window.d3)return;lb(),d3.select(e).selectAll("*").remove(),e.removeAttribute("viewBox");let s=d3.range(2e3,2016),a=["hawkish","dovish"],c=["inflaci\xF3n","precios","expectativas","tasa","tasas","aumento","subir","mantener","bajar","alza","riesgo","crecimiento","actividad","demanda","producto","contexto","escenario","internacional","mercado","mercados","empresas","hogares","endeudamiento","petr\xF3leo","cobre","energ\xEDa","alimentos","empleo","salarios","fiscal","gasto","presupuesto","d\xE9ficit","consumo","inversi\xF3n","exportaciones","importaciones"].map(xi),l=new Set(c),u=new Set(["para","como","desde","entre","sobre","esta","este","estas","estos","tambi\xE9n","tambien","cada","cuando","donde","se\xF1ala","senala","indica","se\xF1or","senor","presidente","consejero","gerente","gerencia","divisi\xF3n","division","estudios","reuni\xF3n","reunion","anterior","opci\xF3n","opciones","oportunidad","respecto","puntos","base","parte","lugar","forma","manera","mayor","menor","dado","considera","elementos","siguiente","siguientes","adem\xE1s","ademas","aunque","ellos","ellas","ello","hasta","hace","tiene","tienen","puede","podr\xEDa","podria","ser\xEDa","seria","chile","banco","central","pol\xEDtica","politica","monetaria","fragmento","intervenci\xF3n","intervencion","acta","actas","muestra"].map(xi)),d=new Set(ga.flatMap(q=>xi(q.participant).match(/[a-zñ]{4,}/g)||[])),h={hawkish:new Map,dovish:new Map},f={hawkish:new Map,dovish:new Map},g={inflacion:"inflaci\xF3n",precios:"precios",expectativas:"expectativas",tasa:"tasa",tasas:"tasas",aumento:"aumento",subir:"subir",mantener:"mantener",bajar:"bajar",alza:"alza",riesgo:"riesgo",crecimiento:"crecimiento",actividad:"actividad",demanda:"demanda",producto:"producto",contexto:"contexto",escenario:"escenario",internacional:"internacional",mercado:"mercado",mercados:"mercados",empresas:"empresas",hogares:"hogares",endeudamiento:"endeudamiento",petroleo:"petr\xF3leo",cobre:"cobre",energia:"energ\xEDa",alimentos:"alimentos",empleo:"empleo",salarios:"salarios",fiscal:"fiscal",gasto:"gasto",presupuesto:"presupuesto",deficit:"d\xE9ficit",consumo:"consumo",inversion:"inversi\xF3n",exportaciones:"exportaciones",importaciones:"importaciones"},x=q=>{let Q=String(q.date||"").match(/^(\d{4})/);return Number(Q?Q[1]:q.year)};ga.forEach(q=>{let Q=a.includes(q.label)?q.label:null,fe=x(q);if(!Q||!s.includes(fe))return;h[Q].set(fe,(h[Q].get(fe)||0)+1),new Set((xi(q.text).match(/[a-zñ]{4,}/g)||[]).filter(Z=>l.has(Z)&&!u.has(Z)&&!d.has(Z))).forEach(Z=>{f[Q].has(Z)||f[Q].set(Z,new Map);let me=f[Q].get(Z);me.set(fe,(me.get(fe)||0)+1)})});let m={};a.forEach(q=>{m[q]=[...f[q].entries()].map(([Q,fe])=>({term:Q,total:[...fe.values()].reduce((H,Z)=>H+Z,0),yearly:fe})).sort((Q,fe)=>fe.total-Q.total||Q.term.localeCompare(fe.term,"es")).slice(0,3)});let p=e.parentElement,v=p?.getBoundingClientRect(),_=Math.max(280,Math.round(v?.width||e.clientWidth||1e3)),T=Math.max(180,Math.round(v?.height||e.clientHeight||450)),A=_<520||T<240,E=A?{top:T<220?31:36,right:_<360?74:84,bottom:T<220?25:30,left:_<360?34:48}:{top:42,right:128,bottom:42,left:72},w=A?T<220?25:34:42,P=(T-E.top-E.bottom-w)/2,y=d3.scaleLinear().domain([2e3,2015]).range([E.left,_-E.right]),M=d3.select(e).attr("viewBox",`0 0 ${_} ${T}`).attr("preserveAspectRatio","xMidYMid meet"),D=M.append("g").attr("class","word-chart-group"),V=M.append("line").attr("class","word-cursor").attr("x1",y(2e3)).attr("x2",y(2e3)).attr("y1",E.top-4).attr("y2",T-E.bottom+3),ie=[],I=(q,Q,fe)=>{let H=Q.yearly.get(fe)||0,Z=h[q].get(fe)||0;return Z?H/Z*100:0};a.forEach((q,Q)=>{let fe=E.top+Q*(P+w),H=fe+P,Z=m[q],me=Math.max(20,...Z.flatMap(O=>s.map(B=>I(q,O,B)))),j=d3.scaleLinear().domain([0,me]).range([H,fe]),W=D.append("g").attr("class",`word-lane word-lane--${q}`);W.append("text").attr("class",`word-lane-label ${q}`).attr("x",E.left).attr("y",fe-14).text(q==="hawkish"?"Hawkish \xB7 restrictiva":"Dovish \xB7 expansiva"),[0,me/2,me].forEach(O=>{W.append("line").attr("class",O===0?"word-zero-line":"word-grid-line").attr("x1",E.left).attr("x2",_-E.right).attr("y1",j(O)).attr("y2",j(O))}),W.append("text").attr("class","word-axis-label").attr("x",E.left-10).attr("y",H+4).attr("text-anchor","end").text("0%"),W.append("text").attr("class","word-axis-label").attr("x",E.left-10).attr("y",fe+4).attr("text-anchor","end").text(`${Math.round(me)}%`);let ee=A?13:15,ce=fe+(A?9:11),pe=H-(A?3:4),$=new Map,S=Z.map((O,B)=>{let le=I(q,O,2015);return{rank:B,desired:j(le)+(B-1)*ee}}).sort((O,B)=>O.desired-B.desired),J=ce;S.forEach(O=>{let B=Math.max(J,Math.min(pe,O.desired));$.set(O.rank,B),J=B+ee});let U=J-ee-pe;U>0&&S.forEach(O=>$.set(O.rank,$.get(O.rank)-U)),Z.forEach((O,B)=>{let le=s.map(se=>({year:se,value:I(q,O,se)})),xe=d3.line().x(se=>y(se.year)).y(se=>j(se.value)).curve(d3.curveMonotoneX),R=W.append("path").attr("class",`word-path ${q}`).attr("d",xe(le)).attr("stroke-width",B===0?2.7:1.8).style("opacity",B===0?1:B===1?.68:.42),b=R.node();if(b){let se=b.getTotalLength();R.attr("stroke-dasharray",se).attr("stroke-dashoffset",se).attr("data-length",se)}le.forEach(se=>{W.append("circle").attr("class",`word-point ${q}`).attr("cx",y(se.year)).attr("cy",j(se.value)).attr("r",B===0?2.8:2).style("opacity",B===0?.95:B===1?.58:.36)});let z=le[le.length-1];W.append("text").attr("class",`word-end-label ${q}`).attr("x",y(z.year)+8).attr("y",$.get(B)+4).text(g[O.term]||O.term),ie.push({label:q,term:O.term,values:le,path:b})})}),s.forEach(q=>{(A?[2e3,2005,2010,2015].includes(q):(q-2e3)%3===0||q===2015)&&M.append("text").attr("class","word-axis-label").attr("x",y(q)).attr("y",T-12).attr("text-anchor","middle").text(q)});let k=(q,Q=1)=>{let fe=Math.round(d3.max([2e3,Math.min(2015,q)]));r.textContent=fe,V.attr("x1",y(fe)).attr("x2",y(fe)),ie.forEach(Z=>{if(!Z.path)return;let me=Number(Z.path.getAttribute("data-length")||0);Z.path.style.strokeDashoffset=String(me*(1-Q))});let H=a.map(Z=>{let me=ie.filter(j=>j.label===Z).map(j=>{let W=j.values.find(ee=>ee.year===fe);return`${g[j.term]||j.term} ${Math.round(W?.value||0)}%`}).join(" \xB7 ");return`${Z==="hawkish"?"Hawkish":"Dovish"}: ${me||"sin registros"}`}).join("   /   ");o.textContent=H||"No hay t\xE9rminos suficientes en la muestra disponible."};k(2e3,0);let G=q=>{let Q=e.getBoundingClientRect(),fe=(q.clientX-Q.left)/Q.width*_;k(y.invert(fe),1)},te=()=>k(2e3+15*.5,1);e.addEventListener("pointermove",G),p?.addEventListener("pointerleave",te),xa.push(()=>{e.removeEventListener("pointermove",G),p?.removeEventListener("pointerleave",te)});let N=gsap.timeline({scrollTrigger:{trigger:"#stageWordEvolution",start:"top 85%",end:"bottom bottom",scrub:!0}}).fromTo(t,{opacity:0,y:18},{opacity:1,y:0,duration:.12,ease:"none"},.04).fromTo(n,{opacity:0,y:24},{opacity:1,y:0,duration:.15,ease:"none"},.16).to(t,{opacity:0,y:-14,duration:.08,ease:"none"},.9);xa.push(()=>{try{N.scrollTrigger?.kill()}catch{}try{N.kill()}catch{}});let X=ScrollTrigger.create({trigger:"#stageWordEvolution",start:"top 85%",end:"bottom bottom",scrub:!0,onUpdate:q=>{let Q=d3.min([1,d3.max([0,(q.progress-.08)/.52])]);k(2e3+q.progress*15,Q)}});xa.push(()=>X.kill())}var ga,xa,W_=Fi(()=>{bl();ga=[],xa=[]});var X_={};Us(X_,{initActBrowser:()=>db});function db({quotes:i,openQuote:e}){let t=document.getElementById("actsList"),n=document.getElementById("actsIndexMeta"),r=document.getElementById("actYearFilter"),o=document.getElementById("actDate"),s=document.getElementById("actDateSub"),a=document.getElementById("actEra"),c=document.getElementById("actSignalName"),l=document.getElementById("actSignalCount"),u=document.getElementById("actSignalExplanation"),d=document.getElementById("actParticipants"),h=document.getElementById("actTermNetwork"),f=document.getElementById("actTermList"),g=document.getElementById("actEvidenceList"),x=document.getElementById("actEvidenceMeta"),m=document.getElementById("actEvidenceQuote"),p=document.getElementById("actEvidenceCitation"),v=document.getElementById("actOpenEvidence"),_=document.getElementById("actsBrowser"),T=document.querySelector(".acts-intro");if(!t||!n||!r||!o||!s||!a||!c||!l||!u||!d||!h||!f||!g||!x||!m||!p||!v||!_||!T||!i.length)return;let A=[{key:"inflacion",label:"inflaci\xF3n"},{key:"precios",label:"precios"},{key:"expectativas",label:"expectativas"},{key:"tasa",label:"tasa"},{key:"tasas",label:"tasas"},{key:"aumento",label:"aumento"},{key:"alza",label:"alza"},{key:"subir",label:"subir"},{key:"mantener",label:"mantener"},{key:"bajar",label:"bajar"},{key:"riesgo",label:"riesgo"},{key:"crecimiento",label:"crecimiento"},{key:"actividad",label:"actividad"},{key:"demanda",label:"demanda"},{key:"producto",label:"producto"},{key:"contexto",label:"contexto"},{key:"escenario",label:"escenario"},{key:"internacional",label:"internacional"},{key:"mercado",label:"mercado"},{key:"mercados",label:"mercados"},{key:"petr\xF3leo",label:"petr\xF3leo"},{key:"cobre",label:"cobre"},{key:"energ\xEDa",label:"energ\xEDa"},{key:"alimentos",label:"alimentos"},{key:"empleo",label:"empleo"},{key:"salarios",label:"salarios"},{key:"gasto",label:"gasto"},{key:"presupuesto",label:"presupuesto"},{key:"d\xE9ficit",label:"d\xE9ficit"},{key:"consumo",label:"consumo"},{key:"inversi\xF3n",label:"inversi\xF3n"}].map(S=>({...S,normalized:xi(S.key)})),E=[{id:"E1",name:"Despegue",from:2e3,to:2003},{id:"E2",name:"Fiebre",from:2004,to:2007},{id:"E3",name:"Crisis",from:2008,to:2009},{id:"E4",name:"Normalizaci\xF3n",from:2010,to:2014},{id:"E5",name:"Giro",from:2015,to:2015}],w="http://www.w3.org/2000/svg",P=(S,J={})=>{let U=document.createElementNS(w,S);return Object.entries(J).forEach(([O,B])=>U.setAttribute(O,String(B))),U},y=S=>{let J=String(S.date||"").match(/^(\d{4})/);return Number(J?J[1]:S.year)},M=(S,J)=>{let U=S&&/^\d{4}-\d{2}-\d{2}$/.test(S)?new Date(`${S}T00:00:00Z`):null;return!U||Number.isNaN(U.getTime())?J?`A\xF1o ${J}`:"Fecha no especificada":new Intl.DateTimeFormat("es-CL",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(U)},D=()=>window.matchMedia&&window.matchMedia("(max-width: 430px)").matches,V=(S,J)=>{if(!D())return M(S,J);let U=S&&/^\d{4}-\d{2}-\d{2}$/.test(S)?new Date(`${S}T00:00:00Z`):null;if(!U||Number.isNaN(U.getTime()))return M(S,J);let O=new Intl.DateTimeFormat("es-CL",{day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}).formatToParts(U),B=Object.fromEntries(O.filter(le=>le.type!=="literal").map(le=>[le.type,le.value]));return`${B.day} ${B.month} ${B.year}`},ie=(S,J)=>D()?V(S,J):M(S,J),I=S=>E.find(J=>S>=J.from&&S<=J.to)||{id:"\u2014",name:"fuera de per\xEDodo"},k=S=>A.filter(J=>S.normalizedText.includes(J.normalized)),G=S=>["hawkish","dovish","neutral"].includes(S.label)?S.label:"neutral",te={hawkish:"Hawkish",dovish:"Dovish",neutral:"Neutral",mixed:"Mixta"},N={hawkish:"restrictiva",dovish:"expansiva",neutral:"sin orientaci\xF3n dominante"},X=new Map,q=0;i.forEach((S,J)=>{let U=y(S);if(!Number.isFinite(U)||U<2e3||U>2015){q+=1;return}let O=/^\d{4}-\d{2}-\d{2}$/.test(String(S.date||""))?S.date:`${U}-01-01`;X.has(O)||X.set(O,[]),X.get(O).push({q:S,index:J,normalizedText:xi(S.text)})});let Q=[...X.entries()].map(([S,J])=>{let U=y(J[0].q),O={hawkish:0,dovish:0,neutral:0},B=new Set,le=new Map;J.forEach(b=>{let z=G(b.q);O[z]+=1,B.add(b.q.participant||"Participante an\xF3nimo"),k(b).forEach(se=>le.set(se.normalized,{label:se.label,count:(le.get(se.normalized)?.count||0)+1}))});let xe=Object.entries(O).filter(([,b])=>b>0).sort((b,z)=>z[1]-b[1]),R=xe.length>1&&xe[0][1]===xe[1][1]?"mixed":xe[0]?.[0]||"neutral";return{id:S,date:S,year:U,rows:J,count:J.length,participants:[...B],toneCounts:O,dominantTone:R,terms:[...le.entries()].map(([b,z])=>({key:b,...z})).sort((b,z)=>z.count-b.count||b.label.localeCompare(z.label,"es"))}}).sort((S,J)=>S.date.localeCompare(J.date));if(!Q.length)return;n.textContent=`Muestra visible: ${Q.length} actas \xB7 ${Q.reduce((S,J)=>S+J.count,0)} fragmentos${q?` \xB7 ${q} fuera del per\xEDodo`:""}`,[...new Set(Q.map(S=>S.year))].sort((S,J)=>S-J).forEach(S=>{let J=document.createElement("option");J.value=String(S),J.textContent=S,r.appendChild(J)});let fe=null,H=0,Z=null,me=[],j=S=>{h.innerHTML="";let J=S?k(S).slice(0,4):[],U=S?G(S.q):"neutral",O=48,B=43,le=125,R=J.length>1?(492-le)/(J.length-1):0;h.appendChild(P("text",{class:"act-network-caption",x:O,y:12,"text-anchor":"middle"})).textContent="SE\xD1AL",h.appendChild(P("circle",{class:`act-network-signal ${U}`,cx:O,cy:B,r:22}));let b=P("text",{class:"act-network-caption",x:O,y:B+3,"text-anchor":"middle"});if(b.textContent=te[U].toUpperCase(),h.appendChild(b),!J.length){let z=P("text",{class:"act-network-term",x:108,y:B+4});z.textContent="sin t\xE9rmino de la taxonom\xEDa visible en este fragmento",h.appendChild(z),h.setAttribute("aria-label",`La etiqueta ${te[U]} no tiene t\xE9rminos de la taxonom\xEDa visible en este fragmento`);return}J.forEach((z,se)=>{let ue=J.length===1?280:le+R*se,de=se%2===0?29:65;h.appendChild(P("line",{class:"act-network-link",x1:O+22,y1:B,x2:ue-8,y2:de-3})),h.appendChild(P("circle",{class:"act-network-signal",cx:ue-8,cy:de-3,r:3.5}));let ve=P("text",{class:"act-network-term",x:ue,y:de,"text-anchor":"middle"});ve.textContent=z.label,h.appendChild(ve)}),h.setAttribute("aria-label",`${te[U]} conectada con ${J.map(z=>z.label).join(", ")}`)},W=(S,J,U=null)=>{if(!S?.rows.length)return;fe=S,H=Math.max(0,Math.min(J,S.rows.length-1)),Z=U;let O=S.rows[H],B=k(O),le=G(O.q),xe=B.slice(0,D()?3:5).map(b=>b.label),R=xe.length?`\xAB${xe.join("\xBB, \xAB")}\xBB`:"ning\xFAn t\xE9rmino de la taxonom\xEDa visible";u.textContent=D()?`${R} acompa\xF1an la etiqueta ${te[le]} (${N[le]}).`:`Este fragmento re\xFAne ${R}; en esta lectura exploratoria, esa evidencia l\xE9xica acompa\xF1a la etiqueta ${te[le]} (${N[le]}).`,j(O),[...g.querySelectorAll(".act-evidence-row")].forEach(b=>{b.setAttribute("aria-current",String(Number(b.dataset.rowIndex)===H))}),[...f.querySelectorAll(".act-term-chip")].forEach(b=>{b.setAttribute("aria-pressed",String(b.dataset.termKey===Z))}),m.textContent=`\u201C${O.q.text||"Sin texto disponible"}\u201D`,p.textContent=`\u2014 ${O.q.participant||"Participante an\xF3nimo"}, ${O.q.formatted_date||M(S.date,S.year)}`,v.dataset.quoteIndex=String(O.index)},ee=S=>{if(!S)return;fe=S,H=Math.min(H,S.rows.length-1),Z=null;let J=I(S.year);o.textContent=V(S.date,S.year),s.textContent=`${S.count} ${S.count===1?"fragmento":"fragmentos"} \xB7 ${S.participants.length} ${S.participants.length===1?"participante":"participantes"}`,a.textContent=`${J.id} \xB7 ${J.name}`,c.textContent=te[S.dominantTone],c.className=`act-signal-name ${S.dominantTone}`;let U=S.dominantTone==="mixed"?Math.max(...Object.values(S.toneCounts)):S.toneCounts[S.dominantTone]||0;if(l.textContent=`${U}/${S.count} fragmentos`,["hawkish","dovish","neutral"].forEach(O=>{let B=document.getElementById(`act${O.charAt(0).toUpperCase()}${O.slice(1)}Bar`);B&&(B.style.width=`${S.toneCounts[O]/S.count*100}%`)}),d.innerHTML="",S.participants.forEach(O=>{let B=document.createElement("span");B.className="act-participant",B.textContent=O,d.appendChild(B)}),f.innerHTML="",S.terms.length)S.terms.slice(0,7).forEach(O=>{let B=document.createElement("button");B.type="button",B.className="act-term-chip",B.dataset.termKey=O.key,B.setAttribute("aria-pressed","false"),B.innerHTML="<span></span><small></small>",B.querySelector("span").textContent=O.label,B.querySelector("small").textContent=O.count,B.addEventListener("click",()=>{let le=S.rows.findIndex(xe=>k(xe).some(R=>R.normalized===O.key));W(S,le>=0?le:0,O.key)}),f.appendChild(B)});else{let O=document.createElement("span");O.className="acts-index-meta",O.textContent="sin t\xE9rminos directos en la muestra",f.appendChild(O)}g.innerHTML="",x.textContent=`${S.count} ${S.count===1?"fragmento":"fragmentos"}`,S.rows.forEach((O,B)=>{let le=document.createElement("button");le.type="button",le.className="act-evidence-row",le.dataset.rowIndex=String(B),le.setAttribute("role","listitem"),le.setAttribute("aria-current","false");let xe=document.createElement("span");xe.className="act-evidence-person",xe.textContent=O.q.participant||"Participante an\xF3nimo";let R=document.createElement("span");R.className=`act-evidence-tone ${G(O.q)}`,R.textContent=te[G(O.q)],le.append(xe,R),le.addEventListener("click",()=>W(S,B)),g.appendChild(le)}),W(S,H),me.forEach(({button:O,act:B})=>O.setAttribute("aria-current",String(B.id===S.id)))},ce=S=>{if(!S)return;H=0,ee(S),window.dispatchEvent(new CustomEvent("particle-act-focus",{detail:{date:S.date}}));let J=me.find(({act:B})=>B.id===S.id);if(!J)return;let U=t.getBoundingClientRect(),O=J.button.getBoundingClientRect();O.top<U.top?t.scrollTop+=O.top-U.top:O.bottom>U.bottom&&(t.scrollTop+=O.bottom-U.bottom)},pe=(S=r.value)=>{let J=S==="all"?Q:Q.filter(U=>String(U.year)===String(S));if(t.innerHTML="",me.length=0,!J.length){let U=document.createElement("div");U.className="acts-empty",U.textContent="No hay actas disponibles para este a\xF1o.",t.appendChild(U);return}J.forEach(U=>{let O=document.createElement("button");O.type="button",O.className="act-list-item",O.setAttribute("role","listitem"),O.setAttribute("aria-current",String(fe?.id===U.id)),O.setAttribute("aria-label",`Abrir acta del ${M(U.date,U.year)}, ${U.count} fragmentos`);let B=document.createElement("i");B.className=`act-tone-dot ${U.dominantTone}`,B.setAttribute("aria-hidden","true");let le=document.createElement("span"),xe=document.createElement("span");xe.className="act-list-date",xe.textContent=ie(U.date,U.year);let R=document.createElement("span");R.className="act-list-meta",R.textContent=`${U.count} ${U.count===1?"fragmento":"fragmentos"} \xB7 ${U.participants.length} ${U.participants.length===1?"voz":"voces"}`,le.append(xe,R);let b=document.createElement("span");b.className="act-list-signal",b.textContent=te[U.dominantTone],O.append(B,le,b),O.addEventListener("click",()=>ce(U)),t.appendChild(O),me.push({button:O,act:U})})};v.addEventListener("click",()=>{let S=Number(v.dataset.quoteIndex);!Number.isFinite(S)||!i[S]||(mi(S),e(S,{x:window.innerWidth*.62,y:window.innerHeight*.62}))}),r.addEventListener("change",()=>{pe(r.value);let S=Q.find(J=>r.value==="all"||String(J.year)===r.value);S&&ce(S)}),pe("all");let $=Q.find(S=>S.date==="2010-05-13")||Q.slice().sort((S,J)=>J.count-S.count||S.date.localeCompare(J.date))[0]||Q[0];ce($),gsap.timeline({scrollTrigger:{trigger:"#stageActs",start:"top 85%",end:"bottom bottom",scrub:!0}}).fromTo(T,{opacity:0,y:18},{opacity:1,y:0,duration:.13,ease:"none"},.04).fromTo(_,{opacity:0,y:24},{opacity:1,y:0,duration:.16,ease:"none"},.16).to(T,{opacity:0,y:-14,duration:.08,ease:"none"},.9)}var q_=Fi(()=>{pa();bl()});var j_={};Us(j_,{initTimeline:()=>hb});function hb(i=[]){Y_=i;let e=document.querySelector("[data-timeline-title]");gsap.fromTo(e,{opacity:0,y:20},{opacity:1,y:0,duration:.8,ease:"cinematicOut",scrollTrigger:{trigger:e,start:"top 80%",toggleActions:"play none none reverse"}});let t=!1,n,r;function o(){let a=document.getElementById("timelineContainer");if(!a)return;t&&d3.select(a).selectAll("*").remove(),t=!0;let c=Ai(),l=c.height<620,u=Math.min(1060,c.width-40),d=l?Math.max(230,Math.min(300,c.height-132)):320,h=l?{top:24,right:18,bottom:44,left:42}:{top:40,right:30,bottom:60,left:50},f=u-h.left-h.right,g=d-h.top-h.bottom,x=d3.select(a).append("svg").attr("width",u).attr("height",d).attr("viewBox",`0 0 ${u} ${d}`).attr("role","img").attr("aria-label","\xCDndice exploratorio de orientaci\xF3n por a\xF1o, agregado desde los fragmentos visibles").attr("aria-describedby","timelineNote").style("max-width","100%").style("height","auto"),m=x.append("g").attr("transform",`translate(${h.left},${h.top})`),p=d3.range(2e3,2016),v=new Map(p.map(N=>[N,{year:N,hawkish:0,dovish:0,neutral:0,total:0}])),_=N=>{let X=String(N.date||"").match(/^(\d{4})/);return Number(X?X[1]:N.year)};Y_.forEach(N=>{let X=_(N),q=v.get(X);if(!q)return;let Q=["hawkish","dovish","neutral"].includes(N.label)?N.label:"neutral";q[Q]+=1,q.total+=1});let T=p.filter(N=>v.get(N).total>0).map(N=>{let X=v.get(N);return{...X,date:new Date(N,6,1),value:(X.hawkish-X.dovish)/X.total,hasSample:!0}}),A=p.filter(N=>v.get(N).total===0),E=N=>{let X=[];return N.forEach(q=>{let Q=X[X.length-1];Q&&q===Q[1]+1?Q[1]=q:X.push([q,q])}),X.map(([q,Q])=>q===Q?String(q):`${q}\u2013${Q}`).join(", ")},w=new Date(2e3,0,1),P=new Date(2015,11,31),y=d3.scaleTime().domain([w,P]).range([0,f]),M=d3.scaleLinear().domain([-1,1]).range([g,0]);m.append("g").attr("transform",`translate(0,${g})`).call(d3.axisBottom(y).ticks(d3.timeYear.every(u<520?4:2)).tickFormat(d3.timeFormat("%Y"))).selectAll("text").style("fill","#e8ecf5").style("font-size","clamp(14px, 1.25vw, 16px)"),m.selectAll(".domain, .tick line").style("stroke","rgba(255,255,255,0.12)"),m.append("g").call(d3.axisLeft(M).ticks(5).tickFormat(N=>N>0?`+${N}`:N)).selectAll("text").style("fill","#e8ecf5").style("font-size","clamp(14px, 1.25vw, 16px)"),m.selectAll(".domain").style("stroke","none"),m.selectAll(".tick line").style("stroke","rgba(255,255,255,0.06)"),m.append("line").attr("x1",0).attr("x2",f).attr("y1",M(0)).attr("y2",M(0)).style("stroke","rgba(255,255,255,0.15)").style("stroke-dasharray","4,4");let D=x.append("defs").append("linearGradient").attr("id","lineGrad").attr("x1","0%").attr("x2","100%");D.append("stop").attr("offset","0%").attr("stop-color","#8ab4f8"),D.append("stop").attr("offset","50%").attr("stop-color","#ffd76a"),D.append("stop").attr("offset","100%").attr("stop-color","#8ab4f8");let V=p.map(N=>v.get(N).total>0?T.find(X=>X.year===N):{year:N,date:new Date(N,6,1),value:null,hasSample:!1}),ie=d3.line().defined(N=>N.hasSample).x(N=>y(N.date)).y(N=>M(N.value)).curve(d3.curveLinear);n=m.append("path").datum(V).attr("fill","none").attr("stroke","url(#lineGrad)").attr("stroke-width",2.5).attr("d",ie),r=n.node().getTotalLength(),n.attr("stroke-dasharray",r).attr("stroke-dashoffset",r);let I=N=>N.value>0?"#ffd76a":N.value<0?"#8ab4f8":"#cfd6e4";if(m.append("g").attr("class","timeline-points").selectAll("circle").data(T).enter().append("circle").attr("class","timeline-point").attr("cx",N=>y(N.date)).attr("cy",N=>M(N.value)).attr("r",4).style("fill",I).style("stroke","#0a0e1a").style("stroke-width",2).style("opacity",.95).append("title").text(N=>`${N.year}: \xEDndice ${N.value>=0?"+":""}${N.value.toFixed(2)} \xB7 ${N.total} fragmentos (H ${N.hawkish} / D ${N.dovish} / N ${N.neutral})`),m.append("text").attr("class","timeline-direction timeline-direction--high").attr("x",0).attr("y",11).text("hawkish +"),m.append("text").attr("class","timeline-direction timeline-direction--low").attr("x",0).attr("y",g-8).text("dovish \u2212"),A.length){let N=m.append("g").attr("class","timeline-absence");N.selectAll("line").data(A).enter().append("line").attr("x1",X=>y(new Date(X,6,1))).attr("x2",X=>y(new Date(X,6,1))).attr("y1",g-3).attr("y2",g+8),N.append("text").attr("x",d3.mean(A,X=>y(new Date(X,6,1)))).attr("y",g+36).attr("text-anchor","middle").text(`sin muestra: ${E(A)}`)}let G=[{date:new Date(2008,8),label:"Crisis financiera externa"}],te=m.selectAll(".ev").data(G).enter().append("g").attr("class","ev");te.append("line").attr("x1",N=>y(N.date)).attr("x2",N=>y(N.date)).attr("y1",0).attr("y2",g).style("stroke","rgba(255,215,106,0.25)").style("stroke-dasharray","3,3"),te.append("text").attr("x",N=>y(N.date)).attr("y",-8).attr("text-anchor","middle").style("font-size","clamp(14px, 1.25vw, 16px)").style("fill","#ffd76a").style("opacity",.7).text(N=>N.label),gsap.to(a,{opacity:1,duration:.3})}ScrollTrigger.create({trigger:"#stageTimeline",start:"top 80%",onEnter:o,onEnterBack:o});let s;window.addEventListener("resize",()=>{clearTimeout(s),s=setTimeout(()=>{t&&o()},200)}),ScrollTrigger.create({trigger:"#stageTimeline",start:"top top",end:"+=120%",pin:".timeline-pin-wrapper",scrub:1,onUpdate:a=>{n&&n.attr("stroke-dashoffset",r*(1-a.progress))}})}var Y_,K_=Fi(()=>{xl();Y_=[]});var qf=0,pu=1,Yf=2;var Fa=1,jf=2,ei=3,Zt=0,bt=1,It=2;var kn=0,Oi=1,fr=2,mu=3,Ns=4,Kf=5,Hi=100,$f=101,Zf=102,gu=103,xu=104,Jf=200,Qf=201,ep=202,tp=203,Bs=204,Fs=205,np=206,ip=207,rp=208,op=209,sp=210,ap=211,cp=212,lp=213,up=214,dp=0,hp=1,fp=2,vo=3,pp=4,mp=5,gp=6,xp=7,Oa=0,_p=1,yp=2,Gn=0,vp=1,Ep=2,Mp=3,Ha=4,bp=5,Tp=6,_u="attached",Sp="detached",yu=300,ti=301,Ei=302,Os=303,Hs=304,pr=306,ni=1e3,Ot=1001,Vr=1002,Tt=1003,zs=1004;var Eo=1005;var Bt=1006,za=1007;var Vn=1008;var In=1009,wp=1010,Ap=1011,Mo=1012,ka=1013,Dn=1014,mn=1015,zi=1016,Ga=1017,Va=1018,Wn=1020,Rp=1021,Ht=1023,Cp=1024,Lp=1025,ii=1026,Mi=1027,Pp=1028,Wa=1029,Ip=1030,Xa=1031,qa=1033,Ya=33776,ja=33777,Ka=33778,$a=33779,vu=35840,Eu=35841,Mu=35842,bu=35843,Za=36196,Tu=37492,Su=37496,wu=37808,Au=37809,Ru=37810,Cu=37811,Lu=37812,Pu=37813,Iu=37814,Du=37815,Uu=37816,Nu=37817,Bu=37818,Fu=37819,Ou=37820,Hu=37821,Ja=36492,zu=36494,ku=36495,Dp=36283,Gu=36284,Vu=36285,Wu=36286;var ki=2300,Gi=2301,Qa=2302,Xu=2400,qu=2401,Yu=2402,Up=2500;var ju=0,ks=1,bo=2,ec=3e3,ri=3001,Np=3200,Bp=3201,tc=0,Fp=1,Jt="",nt="srgb",pt="srgb-linear",To="display-p3",Wr="display-p3-linear",So="linear",ct="srgb",wo="rec709",Ao="p3";var Xr=7680;var Ku=519,Op=512,Hp=513,zp=514,nc=515,kp=516,Gp=517,Vp=518,Wp=519,Gs=35044;var $u="300 es",Vs=1035,En=2e3,qr=2001;var Mn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let o=r.indexOf(t);o!==-1&&r.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let o=0,s=r.length;o<s;o++)r[o].call(this,e);e.target=null}}};var sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Xp=1234567,mr=Math.PI/180,Vi=180/Math.PI;function zt(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]+"-"+sn[e&255]+sn[e>>8&255]+"-"+sn[e>>16&15|64]+sn[e>>24&255]+"-"+sn[t&63|128]+sn[t>>8&255]+"-"+sn[t>>16&255]+sn[t>>24&255]+sn[n&255]+sn[n>>8&255]+sn[n>>16&255]+sn[n>>24&255]).toLowerCase()}function Lt(i,e,t){return Math.max(e,Math.min(t,i))}function ic(i,e){return(i%e+e)%e}function Mv(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function bv(i,e,t){return i!==e?(t-i)/(e-i):0}function Ro(i,e,t){return(1-t)*i+t*e}function Tv(i,e,t,n){return Ro(i,e,1-Math.exp(-t*n))}function Sv(i,e=1){return e-Math.abs(ic(i,e*2)-e)}function wv(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Av(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Rv(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Cv(i,e){return i+Math.random()*(e-i)}function Lv(i){return i*(.5-Math.random())}function Pv(i){i!==void 0&&(Xp=i);let e=Xp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Iv(i){return i*mr}function Dv(i){return i*Vi}function rc(i){return(i&i-1)===0&&i!==0}function Uv(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Co(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Nv(i,e,t,n,r){let o=Math.cos,s=Math.sin,a=o(t/2),c=s(t/2),l=o((e+n)/2),u=s((e+n)/2),d=o((e-n)/2),h=s((e-n)/2),f=o((n-e)/2),g=s((n-e)/2);switch(r){case"XYX":i.set(a*u,c*d,c*h,a*l);break;case"YZY":i.set(c*h,a*u,c*d,a*l);break;case"ZXZ":i.set(c*d,c*h,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Xn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function lt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var ne={DEG2RAD:mr,RAD2DEG:Vi,generateUUID:zt,clamp:Lt,euclideanModulo:ic,mapLinear:Mv,inverseLerp:bv,lerp:Ro,damp:Tv,pingpong:Sv,smoothstep:wv,smootherstep:Av,randInt:Rv,randFloat:Cv,randFloatSpread:Lv,seededRandom:Pv,degToRad:Iv,radToDeg:Dv,isPowerOfTwo:rc,ceilPowerOfTwo:Uv,floorPowerOfTwo:Co,setQuaternionFromProperEuler:Nv,normalize:lt,denormalize:Xn};var Ie=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),o=this.x-e.x,s=this.y-e.y;return this.x=o*n-s*r+e.x,this.y=o*r+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};var Oe=class i{constructor(e,t,n,r,o,s,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,o,s,a,c,l)}set(e,t,n,r,o,s,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=o,u[5]=c,u[6]=n,u[7]=s,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,o=this.elements,s=n[0],a=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],f=n[5],g=n[8],x=r[0],m=r[3],p=r[6],v=r[1],_=r[4],T=r[7],A=r[2],E=r[5],w=r[8];return o[0]=s*x+a*v+c*A,o[3]=s*m+a*_+c*E,o[6]=s*p+a*T+c*w,o[1]=l*x+u*v+d*A,o[4]=l*m+u*_+d*E,o[7]=l*p+u*T+d*w,o[2]=h*x+f*v+g*A,o[5]=h*m+f*_+g*E,o[8]=h*p+f*T+g*w,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],s=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*s*u-t*a*l-n*o*u+n*a*c+r*o*l-r*s*c}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],s=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*s-a*l,h=a*c-u*o,f=l*o-s*c,g=t*d+n*h+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=d*x,e[1]=(r*l-u*n)*x,e[2]=(a*n-r*s)*x,e[3]=h*x,e[4]=(u*t-r*c)*x,e[5]=(r*o-a*t)*x,e[6]=f*x,e[7]=(n*c-l*t)*x,e[8]=(s*t-n*o)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,o,s,a){let c=Math.cos(o),l=Math.sin(o);return this.set(n*c,n*l,-n*(c*s+l*a)+s+e,-r*l,r*c,-r*(-l*s+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Zu.makeScale(e,t)),this}rotate(e){return this.premultiply(Zu.makeRotation(-e)),this}translate(e,t){return this.premultiply(Zu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Zu=new Oe;function oc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function gr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Yp(){let i=gr("canvas");return i.style.display="block",i}var qp={};function xr(i){i in qp||(qp[i]=!0,console.warn(i))}var jp=new Oe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Kp=new Oe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),sc={[pt]:{transfer:So,primaries:wo,toReference:i=>i,fromReference:i=>i},[nt]:{transfer:ct,primaries:wo,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Wr]:{transfer:So,primaries:Ao,toReference:i=>i.applyMatrix3(Kp),fromReference:i=>i.applyMatrix3(jp)},[To]:{transfer:ct,primaries:Ao,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Kp),fromReference:i=>i.applyMatrix3(jp).convertLinearToSRGB()}},Bv=new Set([pt,Wr]),$e={enabled:!0,_workingColorSpace:pt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Bv.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;let n=sc[e].toReference,r=sc[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return sc[i].primaries},getTransfer:function(i){return i===Jt?So:sc[i].transfer}};function _r(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ac(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Lo,Po=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Lo===void 0&&(Lo=gr("canvas")),Lo.width=e.width,Lo.height=e.height;let n=Lo.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Lo}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=gr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),o=r.data;for(let s=0;s<o.length;s++)o[s]=_r(o[s]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(_r(t[n]/255)*255):t[n]=_r(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}};var Fv=0,Io=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fv++}),this.uuid=zt(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let o;if(Array.isArray(r)){o=[];for(let s=0,a=r.length;s<a;s++)r[s].isDataTexture?o.push(Ju(r[s].image)):o.push(Ju(r[s]))}else o=Ju(r);n.url=o}return t||(e.images[this.uuid]=n),n}};function Ju(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Po.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Ov=0,mt=class i extends Mn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Ot,r=Ot,o=Bt,s=Vn,a=Ht,c=In,l=i.DEFAULT_ANISOTROPY,u=Jt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ov++}),this.uuid=zt(),this.name="",this.source=new Io(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=o,this.minFilter=s,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ie(0,0),this.repeat=new Ie(1,1),this.center=new Ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(xr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===ri?nt:Jt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==yu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ni:e.x=e.x-Math.floor(e.x);break;case Ot:e.x=e.x<0?0:1;break;case Vr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ni:e.y=e.y-Math.floor(e.y);break;case Ot:e.y=e.y<0?0:1;break;case Vr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return xr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===nt?ri:ec}set encoding(e){xr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ri?nt:Jt}};mt.DEFAULT_IMAGE=null;mt.DEFAULT_MAPPING=yu;mt.DEFAULT_ANISOTROPY=1;var rt=class i{constructor(e=0,t=0,n=0,r=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,o=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r+s[12]*o,this.y=s[1]*t+s[5]*n+s[9]*r+s[13]*o,this.z=s[2]*t+s[6]*n+s[10]*r+s[14]*o,this.w=s[3]*t+s[7]*n+s[11]*r+s[15]*o,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,o,c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(l+1)/2,T=(f+1)/2,A=(p+1)/2,E=(u+h)/4,w=(d+x)/4,P=(g+m)/4;return _>T&&_>A?_<.01?(n=0,r=.707106781,o=.707106781):(n=Math.sqrt(_),r=E/n,o=w/n):T>A?T<.01?(n=.707106781,r=0,o=.707106781):(r=Math.sqrt(T),n=E/r,o=P/r):A<.01?(n=.707106781,r=.707106781,o=0):(o=Math.sqrt(A),n=w/o,r=P/o),this.set(n,r,o,t),this}let v=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-x)/v,this.z=(h-u)/v,this.w=Math.acos((l+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};var cc=class extends Mn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t);let r={width:e,height:t,depth:1};n.encoding!==void 0&&(xr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===ri?nt:Jt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new mt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Io(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}};var bn=class extends cc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}};var Do=class extends mt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=Ot,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var lc=class extends mt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=Ot,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Qt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,o,s,a){let c=n[r+0],l=n[r+1],u=n[r+2],d=n[r+3],h=o[s+0],f=o[s+1],g=o[s+2],x=o[s+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(d!==x||c!==h||l!==f||u!==g){let m=1-a,p=c*h+l*f+u*g+d*x,v=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){let A=Math.sqrt(_),E=Math.atan2(A,p*v);m=Math.sin(m*E)/A,a=Math.sin(a*E)/A}let T=a*v;if(c=c*m+h*T,l=l*m+f*T,u=u*m+g*T,d=d*m+x*T,m===1-a){let A=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=A,l*=A,u*=A,d*=A}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,o,s){let a=n[r],c=n[r+1],l=n[r+2],u=n[r+3],d=o[s],h=o[s+1],f=o[s+2],g=o[s+3];return e[t]=a*g+u*d+c*f-l*h,e[t+1]=c*g+u*h+l*d-a*f,e[t+2]=l*g+u*f+a*h-c*d,e[t+3]=u*g-a*d-c*h-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,o=e._z,s=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(r/2),d=a(o/2),h=c(n/2),f=c(r/2),g=c(o/2);switch(s){case"XYZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"YZX":this._x=h*u*d+l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d-h*f*g;break;case"XZY":this._x=h*u*d-l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],o=t[8],s=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=n+a+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-c)*f,this._y=(o-l)*f,this._z=(s-r)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(u-c)/f,this._x=.25*f,this._y=(r+s)/f,this._z=(o+l)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(o-l)/f,this._x=(r+s)/f,this._y=.25*f,this._z=(c+u)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(s-r)/f,this._x=(o+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Lt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,o=e._z,s=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+s*a+r*l-o*c,this._y=r*u+s*c+o*a-n*l,this._z=o*u+s*l+n*c-r*a,this._w=s*u-n*a-r*c-o*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,r=this._y,o=this._z,s=this._w,a=s*e._w+n*e._x+r*e._y+o*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=n,this._y=r,this._z=o,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-t;return this._w=f*s+t*this._w,this._x=f*n+t*this._x,this._y=f*r+t*this._y,this._z=f*o+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),d=Math.sin((1-t)*u)/l,h=Math.sin(t*u)/l;return this._w=s*d+this._w*h,this._x=n*d+this._x*h,this._y=r*d+this._y*h,this._z=o*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),o=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(o),n*Math.cos(o),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};var L=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($p.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($p.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*r,this.y=o[1]*t+o[4]*n+o[7]*r,this.z=o[2]*t+o[5]*n+o[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,o=e.elements,s=1/(o[3]*t+o[7]*n+o[11]*r+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*r+o[12])*s,this.y=(o[1]*t+o[5]*n+o[9]*r+o[13])*s,this.z=(o[2]*t+o[6]*n+o[10]*r+o[14])*s,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,o=e.x,s=e.y,a=e.z,c=e.w,l=2*(s*r-a*n),u=2*(a*t-o*r),d=2*(o*n-s*t);return this.x=t+c*l+s*d-a*u,this.y=n+c*u+a*l-o*d,this.z=r+c*d+o*u-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r,this.y=o[1]*t+o[5]*n+o[9]*r,this.z=o[2]*t+o[6]*n+o[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,o=e.z,s=t.x,a=t.y,c=t.z;return this.x=r*c-o*a,this.y=o*s-n*c,this.z=n*a-r*s,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Qu.copy(this).projectOnVector(e),this.sub(Qu)}reflect(e){return this.sub(Qu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Qu=new L,$p=new Qt;var dt=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(oi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(oi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=oi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let o=n.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=o.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,oi):oi.fromBufferAttribute(o,s),oi.applyMatrix4(e.matrixWorld),this.expandByPoint(oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),uc.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),uc.copy(n.boundingBox)),uc.applyMatrix4(e.matrixWorld),this.union(uc)}let r=e.children;for(let o=0,s=r.length;o<s;o++)this.expandByObject(r[o],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,oi),oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ws),dc.subVectors(this.max,Ws),Uo.subVectors(e.a,Ws),No.subVectors(e.b,Ws),Bo.subVectors(e.c,Ws),yr.subVectors(No,Uo),vr.subVectors(Bo,No),Yr.subVectors(Uo,Bo);let t=[0,-yr.z,yr.y,0,-vr.z,vr.y,0,-Yr.z,Yr.y,yr.z,0,-yr.x,vr.z,0,-vr.x,Yr.z,0,-Yr.x,-yr.y,yr.x,0,-vr.y,vr.x,0,-Yr.y,Yr.x,0];return!ed(t,Uo,No,Bo,dc)||(t=[1,0,0,0,1,0,0,0,1],!ed(t,Uo,No,Bo,dc))?!1:(hc.crossVectors(yr,vr),t=[hc.x,hc.y,hc.z],ed(t,Uo,No,Bo,dc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Wi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Wi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Wi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Wi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Wi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Wi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Wi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Wi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Wi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Wi=[new L,new L,new L,new L,new L,new L,new L,new L],oi=new L,uc=new dt,Uo=new L,No=new L,Bo=new L,yr=new L,vr=new L,Yr=new L,Ws=new L,dc=new L,hc=new L,jr=new L;function ed(i,e,t,n,r){for(let o=0,s=i.length-3;o<=s;o+=3){jr.fromArray(i,o);let a=r.x*Math.abs(jr.x)+r.y*Math.abs(jr.y)+r.z*Math.abs(jr.z),c=e.dot(jr),l=t.dot(jr),u=n.dot(jr);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var Hv=new dt,Xs=new L,td=new L,At=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Hv.setFromPoints(e).getCenter(n);let r=0;for(let o=0,s=e.length;o<s;o++)r=Math.max(r,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xs.subVectors(e,this.center);let t=Xs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Xs,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(td.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xs.copy(e.center).add(td)),this.expandByPoint(Xs.copy(e.center).sub(td))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}};var Xi=new L,nd=new L,fc=new L,Er=new L,id=new L,pc=new L,rd=new L,qn=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Xi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Xi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Xi.copy(this.origin).addScaledVector(this.direction,t),Xi.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){nd.copy(e).add(t).multiplyScalar(.5),fc.copy(t).sub(e).normalize(),Er.copy(this.origin).sub(nd);let o=e.distanceTo(t)*.5,s=-this.direction.dot(fc),a=Er.dot(this.direction),c=-Er.dot(fc),l=Er.lengthSq(),u=Math.abs(1-s*s),d,h,f,g;if(u>0)if(d=s*c-a,h=s*a-c,g=o*u,d>=0)if(h>=-g)if(h<=g){let x=1/u;d*=x,h*=x,f=d*(d+s*h+2*a)+h*(s*d+h+2*c)+l}else h=o,d=Math.max(0,-(s*h+a)),f=-d*d+h*(h+2*c)+l;else h=-o,d=Math.max(0,-(s*h+a)),f=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-s*o+a)),h=d>0?-o:Math.min(Math.max(-o,-c),o),f=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-o,-c),o),f=h*(h+2*c)+l):(d=Math.max(0,-(s*o+a)),h=d>0?o:Math.min(Math.max(-o,-c),o),f=-d*d+h*(h+2*c)+l);else h=s>0?-o:o,d=Math.max(0,-(s*h+a)),f=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(nd).addScaledVector(fc,h),f}intersectSphere(e,t){Xi.subVectors(e.center,this.origin);let n=Xi.dot(this.direction),r=Xi.dot(Xi)-n*n,o=e.radius*e.radius;if(r>o)return null;let s=Math.sqrt(o-r),a=n-s,c=n+s;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,o,s,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(o=(e.min.y-h.y)*u,s=(e.max.y-h.y)*u):(o=(e.max.y-h.y)*u,s=(e.min.y-h.y)*u),n>s||o>r||((o>n||isNaN(n))&&(n=o),(s<r||isNaN(r))&&(r=s),d>=0?(a=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Xi)!==null}intersectTriangle(e,t,n,r,o){id.subVectors(t,e),pc.subVectors(n,e),rd.crossVectors(id,pc);let s=this.direction.dot(rd),a;if(s>0){if(r)return null;a=1}else if(s<0)a=-1,s=-s;else return null;Er.subVectors(this.origin,e);let c=a*this.direction.dot(pc.crossVectors(Er,pc));if(c<0)return null;let l=a*this.direction.dot(id.cross(Er));if(l<0||c+l>s)return null;let u=-a*Er.dot(rd);return u<0?null:this.at(u/s,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};var Ue=class i{constructor(e,t,n,r,o,s,a,c,l,u,d,h,f,g,x,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,o,s,a,c,l,u,d,h,f,g,x,m)}set(e,t,n,r,o,s,a,c,l,u,d,h,f,g,x,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=o,p[5]=s,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,r=1/Fo.setFromMatrixColumn(e,0).length(),o=1/Fo.setFromMatrixColumn(e,1).length(),s=1/Fo.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,o=e.z,s=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(o),d=Math.sin(o);if(e.order==="XYZ"){let h=s*u,f=s*d,g=a*u,x=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=f+g*l,t[5]=h-x*l,t[9]=-a*c,t[2]=x-h*l,t[6]=g+f*l,t[10]=s*c}else if(e.order==="YXZ"){let h=c*u,f=c*d,g=l*u,x=l*d;t[0]=h+x*a,t[4]=g*a-f,t[8]=s*l,t[1]=s*d,t[5]=s*u,t[9]=-a,t[2]=f*a-g,t[6]=x+h*a,t[10]=s*c}else if(e.order==="ZXY"){let h=c*u,f=c*d,g=l*u,x=l*d;t[0]=h-x*a,t[4]=-s*d,t[8]=g+f*a,t[1]=f+g*a,t[5]=s*u,t[9]=x-h*a,t[2]=-s*l,t[6]=a,t[10]=s*c}else if(e.order==="ZYX"){let h=s*u,f=s*d,g=a*u,x=a*d;t[0]=c*u,t[4]=g*l-f,t[8]=h*l+x,t[1]=c*d,t[5]=x*l+h,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=s*c}else if(e.order==="YZX"){let h=s*c,f=s*l,g=a*c,x=a*l;t[0]=c*u,t[4]=x-h*d,t[8]=g*d+f,t[1]=d,t[5]=s*u,t[9]=-a*u,t[2]=-l*u,t[6]=f*d+g,t[10]=h-x*d}else if(e.order==="XZY"){let h=s*c,f=s*l,g=a*c,x=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+x,t[5]=s*u,t[9]=f*d-g,t[2]=g*d-f,t[6]=a*u,t[10]=x*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zv,e,kv)}lookAt(e,t,n){let r=this.elements;return Un.subVectors(e,t),Un.lengthSq()===0&&(Un.z=1),Un.normalize(),Mr.crossVectors(n,Un),Mr.lengthSq()===0&&(Math.abs(n.z)===1?Un.x+=1e-4:Un.z+=1e-4,Un.normalize(),Mr.crossVectors(n,Un)),Mr.normalize(),mc.crossVectors(Un,Mr),r[0]=Mr.x,r[4]=mc.x,r[8]=Un.x,r[1]=Mr.y,r[5]=mc.y,r[9]=Un.y,r[2]=Mr.z,r[6]=mc.z,r[10]=Un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,o=this.elements,s=n[0],a=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],v=n[3],_=n[7],T=n[11],A=n[15],E=r[0],w=r[4],P=r[8],y=r[12],M=r[1],D=r[5],V=r[9],ie=r[13],I=r[2],k=r[6],G=r[10],te=r[14],N=r[3],X=r[7],q=r[11],Q=r[15];return o[0]=s*E+a*M+c*I+l*N,o[4]=s*w+a*D+c*k+l*X,o[8]=s*P+a*V+c*G+l*q,o[12]=s*y+a*ie+c*te+l*Q,o[1]=u*E+d*M+h*I+f*N,o[5]=u*w+d*D+h*k+f*X,o[9]=u*P+d*V+h*G+f*q,o[13]=u*y+d*ie+h*te+f*Q,o[2]=g*E+x*M+m*I+p*N,o[6]=g*w+x*D+m*k+p*X,o[10]=g*P+x*V+m*G+p*q,o[14]=g*y+x*ie+m*te+p*Q,o[3]=v*E+_*M+T*I+A*N,o[7]=v*w+_*D+T*k+A*X,o[11]=v*P+_*V+T*G+A*q,o[15]=v*y+_*ie+T*te+A*Q,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],o=e[12],s=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15];return g*(+o*c*d-r*l*d-o*a*h+n*l*h+r*a*f-n*c*f)+x*(+t*c*f-t*l*h+o*s*h-r*s*f+r*l*u-o*c*u)+m*(+t*l*d-t*a*f-o*s*d+n*s*f+o*a*u-n*l*u)+p*(-r*a*u-t*c*d+t*a*h+r*s*d-n*s*h+n*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],s=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],v=d*m*l-x*h*l+x*c*f-a*m*f-d*c*p+a*h*p,_=g*h*l-u*m*l-g*c*f+s*m*f+u*c*p-s*h*p,T=u*x*l-g*d*l+g*a*f-s*x*f-u*a*p+s*d*p,A=g*d*c-u*x*c-g*a*h+s*x*h+u*a*m-s*d*m,E=t*v+n*_+r*T+o*A;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/E;return e[0]=v*w,e[1]=(x*h*o-d*m*o-x*r*f+n*m*f+d*r*p-n*h*p)*w,e[2]=(a*m*o-x*c*o+x*r*l-n*m*l-a*r*p+n*c*p)*w,e[3]=(d*c*o-a*h*o-d*r*l+n*h*l+a*r*f-n*c*f)*w,e[4]=_*w,e[5]=(u*m*o-g*h*o+g*r*f-t*m*f-u*r*p+t*h*p)*w,e[6]=(g*c*o-s*m*o-g*r*l+t*m*l+s*r*p-t*c*p)*w,e[7]=(s*h*o-u*c*o+u*r*l-t*h*l-s*r*f+t*c*f)*w,e[8]=T*w,e[9]=(g*d*o-u*x*o-g*n*f+t*x*f+u*n*p-t*d*p)*w,e[10]=(s*x*o-g*a*o+g*n*l-t*x*l-s*n*p+t*a*p)*w,e[11]=(u*a*o-s*d*o-u*n*l+t*d*l+s*n*f-t*a*f)*w,e[12]=A*w,e[13]=(u*x*r-g*d*r+g*n*h-t*x*h-u*n*m+t*d*m)*w,e[14]=(g*a*r-s*x*r-g*n*c+t*x*c+s*n*m-t*a*m)*w,e[15]=(s*d*r-u*a*r+u*n*c-t*d*c-s*n*h+t*a*h)*w,this}scale(e){let t=this.elements,n=e.x,r=e.y,o=e.z;return t[0]*=n,t[4]*=r,t[8]*=o,t[1]*=n,t[5]*=r,t[9]*=o,t[2]*=n,t[6]*=r,t[10]*=o,t[3]*=n,t[7]*=r,t[11]*=o,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),o=1-n,s=e.x,a=e.y,c=e.z,l=o*s,u=o*a;return this.set(l*s+n,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+n,u*c-r*s,0,l*c-r*a,u*c+r*s,o*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,o,s){return this.set(1,n,o,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,o=t._x,s=t._y,a=t._z,c=t._w,l=o+o,u=s+s,d=a+a,h=o*l,f=o*u,g=o*d,x=s*u,m=s*d,p=a*d,v=c*l,_=c*u,T=c*d,A=n.x,E=n.y,w=n.z;return r[0]=(1-(x+p))*A,r[1]=(f+T)*A,r[2]=(g-_)*A,r[3]=0,r[4]=(f-T)*E,r[5]=(1-(h+p))*E,r[6]=(m+v)*E,r[7]=0,r[8]=(g+_)*w,r[9]=(m-v)*w,r[10]=(1-(h+x))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements,o=Fo.set(r[0],r[1],r[2]).length(),s=Fo.set(r[4],r[5],r[6]).length(),a=Fo.set(r[8],r[9],r[10]).length();this.determinant()<0&&(o=-o),e.x=r[12],e.y=r[13],e.z=r[14],si.copy(this);let l=1/o,u=1/s,d=1/a;return si.elements[0]*=l,si.elements[1]*=l,si.elements[2]*=l,si.elements[4]*=u,si.elements[5]*=u,si.elements[6]*=u,si.elements[8]*=d,si.elements[9]*=d,si.elements[10]*=d,t.setFromRotationMatrix(si),n.x=o,n.y=s,n.z=a,this}makePerspective(e,t,n,r,o,s,a=En){let c=this.elements,l=2*o/(t-e),u=2*o/(n-r),d=(t+e)/(t-e),h=(n+r)/(n-r),f,g;if(a===En)f=-(s+o)/(s-o),g=-2*s*o/(s-o);else if(a===qr)f=-s/(s-o),g=-s*o/(s-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,o,s,a=En){let c=this.elements,l=1/(t-e),u=1/(n-r),d=1/(s-o),h=(t+e)*l,f=(n+r)*u,g,x;if(a===En)g=(s+o)*d,x=-2*d;else if(a===qr)g=o*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Fo=new L,si=new Ue,zv=new L(0,0,0),kv=new L(1,1,1),Mr=new L,mc=new L,Un=new L;var Zp=new Ue,Jp=new Qt,br=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,o=r[0],s=r[4],a=r[8],c=r[1],l=r[5],u=r[9],d=r[2],h=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-s,o)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Lt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(Lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-Lt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(Lt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Lt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Zp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Jp.setFromEuler(this),this.setFromQuaternion(Jp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};br.DEFAULT_ORDER="XYZ";var Tr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}};var Gv=0,Qp=new L,Oo=new Qt,qi=new Ue,gc=new L,qs=new L,Vv=new L,Wv=new Qt,em=new L(1,0,0),tm=new L(0,1,0),nm=new L(0,0,1),Xv={type:"added"},qv={type:"removed"},Xe=class i extends Mn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gv++}),this.uuid=zt(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new L,t=new br,n=new Qt,r=new L(1,1,1);function o(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ue},normalMatrix:{value:new Oe}}),this.matrix=new Ue,this.matrixWorld=new Ue,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Oo.setFromAxisAngle(e,t),this.quaternion.multiply(Oo),this}rotateOnWorldAxis(e,t){return Oo.setFromAxisAngle(e,t),this.quaternion.premultiply(Oo),this}rotateX(e){return this.rotateOnAxis(em,e)}rotateY(e){return this.rotateOnAxis(tm,e)}rotateZ(e){return this.rotateOnAxis(nm,e)}translateOnAxis(e,t){return Qp.copy(e).applyQuaternion(this.quaternion),this.position.add(Qp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(em,e)}translateY(e){return this.translateOnAxis(tm,e)}translateZ(e){return this.translateOnAxis(nm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?gc.copy(e):gc.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qi.lookAt(qs,gc,this.up):qi.lookAt(gc,qs,this.up),this.quaternion.setFromRotationMatrix(qi),r&&(qi.extractRotation(r.matrixWorld),Oo.setFromRotationMatrix(qi),this.quaternion.premultiply(Oo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Xv)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(qv)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),qi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qi.multiply(e.parent.matrixWorld)),e.applyMatrix4(qi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let o=0,s=r.length;o<s;o++)r[o].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qs,e,Vv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qs,Wv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++){let o=t[n];(o.matrixWorldAutoUpdate===!0||e===!0)&&o.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let r=this.children;for(let o=0,s=r.length;o<s;o++){let a=r[o];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function o(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=o(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let d=c[l];o(e.shapes,d)}else o(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(o(e.materials,this.material[c]));r.material=a}else r.material=o(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];r.animations.push(o(e.animations,c))}}if(t){let a=s(e.geometries),c=s(e.materials),l=s(e.textures),u=s(e.images),d=s(e.shapes),h=s(e.skeletons),f=s(e.animations),g=s(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=r,n;function s(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}};Xe.DEFAULT_UP=new L(0,1,0);Xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ai=new L,Yi=new L,od=new L,ji=new L,Ho=new L,zo=new L,im=new L,sd=new L,ad=new L,cd=new L,xc=!1,Ki=class i{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),ai.subVectors(e,t),r.cross(ai);let o=r.lengthSq();return o>0?r.multiplyScalar(1/Math.sqrt(o)):r.set(0,0,0)}static getBarycoord(e,t,n,r,o){ai.subVectors(r,t),Yi.subVectors(n,t),od.subVectors(e,t);let s=ai.dot(ai),a=ai.dot(Yi),c=ai.dot(od),l=Yi.dot(Yi),u=Yi.dot(od),d=s*l-a*a;if(d===0)return o.set(0,0,0),null;let h=1/d,f=(l*c-a*u)*h,g=(s*u-a*c)*h;return o.set(1-f-g,g,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,ji)===null?!1:ji.x>=0&&ji.y>=0&&ji.x+ji.y<=1}static getUV(e,t,n,r,o,s,a,c){return xc===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),xc=!0),this.getInterpolation(e,t,n,r,o,s,a,c)}static getInterpolation(e,t,n,r,o,s,a,c){return this.getBarycoord(e,t,n,r,ji)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(o,ji.x),c.addScaledVector(s,ji.y),c.addScaledVector(a,ji.z),c)}static isFrontFacing(e,t,n,r){return ai.subVectors(n,t),Yi.subVectors(e,t),ai.cross(Yi).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ai.subVectors(this.c,this.b),Yi.subVectors(this.a,this.b),ai.cross(Yi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,o){return xc===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),xc=!0),i.getInterpolation(e,this.a,this.b,this.c,t,n,r,o)}getInterpolation(e,t,n,r,o){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,o)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,o=this.c,s,a;Ho.subVectors(r,n),zo.subVectors(o,n),sd.subVectors(e,n);let c=Ho.dot(sd),l=zo.dot(sd);if(c<=0&&l<=0)return t.copy(n);ad.subVectors(e,r);let u=Ho.dot(ad),d=zo.dot(ad);if(u>=0&&d<=u)return t.copy(r);let h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return s=c/(c-u),t.copy(n).addScaledVector(Ho,s);cd.subVectors(e,o);let f=Ho.dot(cd),g=zo.dot(cd);if(g>=0&&f<=g)return t.copy(o);let x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(zo,a);let m=u*g-f*d;if(m<=0&&d-u>=0&&f-g>=0)return im.subVectors(o,r),a=(d-u)/(d-u+(f-g)),t.copy(r).addScaledVector(im,a);let p=1/(m+x+h);return s=x*p,a=h*p,t.copy(n).addScaledVector(Ho,s).addScaledVector(zo,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}};var rm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Sr={h:0,s:0,l:0},_c={h:0,s:0,l:0};function ld(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var ge=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=$e.workingColorSpace){if(e=ic(e,1),t=Lt(t,0,1),n=Lt(n,0,1),t===0)this.r=this.g=this.b=n;else{let o=n<=.5?n*(1+t):n+t-n*t,s=2*n-o;this.r=ld(s,o,e+1/3),this.g=ld(s,o,e),this.b=ld(s,o,e-1/3)}return $e.toWorkingColorSpace(this,r),this}setStyle(e,t=nt){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let o,s=r[1],a=r[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let o=r[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nt){let n=rm[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_r(e.r),this.g=_r(e.g),this.b=_r(e.b),this}copyLinearToSRGB(e){return this.r=ac(e.r),this.g=ac(e.g),this.b=ac(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nt){return $e.fromWorkingColorSpace(cn.copy(this),e),Math.round(Lt(cn.r*255,0,255))*65536+Math.round(Lt(cn.g*255,0,255))*256+Math.round(Lt(cn.b*255,0,255))}getHexString(e=nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(cn.copy(this),t);let n=cn.r,r=cn.g,o=cn.b,s=Math.max(n,r,o),a=Math.min(n,r,o),c,l,u=(a+s)/2;if(a===s)c=0,l=0;else{let d=s-a;switch(l=u<=.5?d/(s+a):d/(2-s-a),s){case n:c=(r-o)/d+(r<o?6:0);break;case r:c=(o-n)/d+2;break;case o:c=(n-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(cn.copy(this),t),e.r=cn.r,e.g=cn.g,e.b=cn.b,e}getStyle(e=nt){$e.fromWorkingColorSpace(cn.copy(this),e);let t=cn.r,n=cn.g,r=cn.b;return e!==nt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Sr),this.setHSL(Sr.h+e,Sr.s+t,Sr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Sr),e.getHSL(_c);let n=Ro(Sr.h,_c.h,t),r=Ro(Sr.s,_c.s,t),o=Ro(Sr.l,_c.l,t);return this.setHSL(n,r,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,o=e.elements;return this.r=o[0]*t+o[3]*n+o[6]*r,this.g=o[1]*t+o[4]*n+o[7]*r,this.b=o[2]*t+o[5]*n+o[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},cn=new ge;ge.NAMES=rm;var Yv=0,Dt=class extends Mn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yv++}),this.uuid=zt(),this.name="",this.type="Material",this.blending=Oi,this.side=Zt,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bs,this.blendDst=Fs,this.blendEquation=Hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ge(0,0,0),this.blendAlpha=0,this.depthFunc=vo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ku,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xr,this.stencilZFail=Xr,this.stencilZPass=Xr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Oi&&(n.blending=this.blending),this.side!==Zt&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Bs&&(n.blendSrc=this.blendSrc),this.blendDst!==Fs&&(n.blendDst=this.blendDst),this.blendEquation!==Hi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ku&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Xr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Xr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(o){let s=[];for(let a in o){let c=o[a];delete c.metadata,s.push(c)}return s}if(t){let o=r(e.textures),s=r(e.images);o.length>0&&(n.textures=o),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let o=0;o!==r;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Ut=class extends Dt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Oa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Ft=new L,yc=new Ie,Ke=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Gs,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,o=this.itemSize;r<o;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)yc.fromBufferAttribute(this,t),yc.applyMatrix3(e),this.setXY(t,yc.x,yc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Xn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Xn(t,this.array)),t}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Xn(t,this.array)),t}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Xn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Xn(t,this.array)),t}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),r=lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,o){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),r=lt(r,this.array),o=lt(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Gs&&(e.usage=this.usage),e}};var ko=class extends Ke{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Go=class extends Ke{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ze=class extends Ke{constructor(e,t,n){super(new Float32Array(e),t,n)}};var jv=0,Yn=new Ue,ud=new Xe,Vo=new L,Nn=new dt,Ys=new dt,en=new L,Je=class i extends Mn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jv++}),this.uuid=zt(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(oc(e)?Go:ko)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let o=new Oe().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Yn.makeRotationFromQuaternion(e),this.applyMatrix4(Yn),this}rotateX(e){return Yn.makeRotationX(e),this.applyMatrix4(Yn),this}rotateY(e){return Yn.makeRotationY(e),this.applyMatrix4(Yn),this}rotateZ(e){return Yn.makeRotationZ(e),this.applyMatrix4(Yn),this}translate(e,t,n){return Yn.makeTranslation(e,t,n),this.applyMatrix4(Yn),this}scale(e,t,n){return Yn.makeScale(e,t,n),this.applyMatrix4(Yn),this}lookAt(e){return ud.lookAt(e),ud.updateMatrix(),this.applyMatrix4(ud.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vo).negate(),this.translate(Vo.x,Vo.y,Vo.z),this}setFromPoints(e){let t=[];for(let n=0,r=e.length;n<r;n++){let o=e[n];t.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new Ze(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new dt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let o=t[n];Nn.setFromBufferAttribute(o),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,Nn.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,Nn.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(Nn.min),this.boundingBox.expandByPoint(Nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new At);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(Nn.setFromBufferAttribute(e),t)for(let o=0,s=t.length;o<s;o++){let a=t[o];Ys.setFromBufferAttribute(a),this.morphTargetsRelative?(en.addVectors(Nn.min,Ys.min),Nn.expandByPoint(en),en.addVectors(Nn.max,Ys.max),Nn.expandByPoint(en)):(Nn.expandByPoint(Ys.min),Nn.expandByPoint(Ys.max))}Nn.getCenter(n);let r=0;for(let o=0,s=e.count;o<s;o++)en.fromBufferAttribute(e,o),r=Math.max(r,n.distanceToSquared(en));if(t)for(let o=0,s=t.length;o<s;o++){let a=t[o],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)en.fromBufferAttribute(a,l),c&&(Vo.fromBufferAttribute(e,l),en.add(Vo)),r=Math.max(r,n.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,r=t.position.array,o=t.normal.array,s=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ke(new Float32Array(4*a),4));let c=this.getAttribute("tangent").array,l=[],u=[];for(let M=0;M<a;M++)l[M]=new L,u[M]=new L;let d=new L,h=new L,f=new L,g=new Ie,x=new Ie,m=new Ie,p=new L,v=new L;function _(M,D,V){d.fromArray(r,M*3),h.fromArray(r,D*3),f.fromArray(r,V*3),g.fromArray(s,M*2),x.fromArray(s,D*2),m.fromArray(s,V*2),h.sub(d),f.sub(d),x.sub(g),m.sub(g);let ie=1/(x.x*m.y-m.x*x.y);isFinite(ie)&&(p.copy(h).multiplyScalar(m.y).addScaledVector(f,-x.y).multiplyScalar(ie),v.copy(f).multiplyScalar(x.x).addScaledVector(h,-m.x).multiplyScalar(ie),l[M].add(p),l[D].add(p),l[V].add(p),u[M].add(v),u[D].add(v),u[V].add(v))}let T=this.groups;T.length===0&&(T=[{start:0,count:n.length}]);for(let M=0,D=T.length;M<D;++M){let V=T[M],ie=V.start,I=V.count;for(let k=ie,G=ie+I;k<G;k+=3)_(n[k+0],n[k+1],n[k+2])}let A=new L,E=new L,w=new L,P=new L;function y(M){w.fromArray(o,M*3),P.copy(w);let D=l[M];A.copy(D),A.sub(w.multiplyScalar(w.dot(D))).normalize(),E.crossVectors(P,D);let ie=E.dot(u[M])<0?-1:1;c[M*4]=A.x,c[M*4+1]=A.y,c[M*4+2]=A.z,c[M*4+3]=ie}for(let M=0,D=T.length;M<D;++M){let V=T[M],ie=V.start,I=V.count;for(let k=ie,G=ie+I;k<G;k+=3)y(n[k+0]),y(n[k+1]),y(n[k+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ke(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);let r=new L,o=new L,s=new L,a=new L,c=new L,l=new L,u=new L,d=new L;if(e)for(let h=0,f=e.count;h<f;h+=3){let g=e.getX(h+0),x=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),o.fromBufferAttribute(t,x),s.fromBufferAttribute(t,m),u.subVectors(s,o),d.subVectors(r,o),u.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,f=t.count;h<f;h+=3)r.fromBufferAttribute(t,h+0),o.fromBufferAttribute(t,h+1),s.fromBufferAttribute(t,h+2),u.subVectors(s,o),d.subVectors(r,o),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)en.fromBufferAttribute(e,t),en.normalize(),e.setXYZ(t,en.x,en.y,en.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,d=a.normalized,h=new l.constructor(c.length*u),f=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*u;for(let p=0;p<u;p++)h[g++]=l[f++]}return new Ke(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,n);t.setAttribute(a,l)}let o=this.morphAttributes;for(let a in o){let c=[],l=o[a];for(let u=0,d=l.length;u<d;u++){let h=l[u],f=e(h,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let a=0,c=s.length;a<c;a++){let l=s[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},o=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){let f=l[d];u.push(f.toJSON(e.data))}u.length>0&&(r[c]=u,o=!0)}o&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let o=e.morphAttributes;for(let l in o){let u=[],d=o[l];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let l=0,u=s.length;l<u;l++){let d=s[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};var om=new Ue,Kr=new qn,vc=new At,sm=new L,Wo=new L,Xo=new L,qo=new L,dd=new L,Ec=new L,Mc=new Ie,bc=new Ie,Tc=new Ie,am=new L,cm=new L,lm=new L,Sc=new L,wc=new L,Ge=class extends Xe{constructor(e=new Je,t=new Ut){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){let a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,o=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(o&&a){Ec.set(0,0,0);for(let c=0,l=o.length;c<l;c++){let u=a[c],d=o[c];u!==0&&(dd.fromBufferAttribute(d,e),s?Ec.addScaledVector(dd,u):Ec.addScaledVector(dd.sub(t),u))}t.add(Ec)}return t}raycast(e,t){let n=this.geometry,r=this.material,o=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),vc.copy(n.boundingSphere),vc.applyMatrix4(o),Kr.copy(e.ray).recast(e.near),!(vc.containsPoint(Kr.origin)===!1&&(Kr.intersectSphere(vc,sm)===null||Kr.origin.distanceToSquared(sm)>(e.far-e.near)**2))&&(om.copy(o).invert(),Kr.copy(e.ray).applyMatrix4(om),!(n.boundingBox!==null&&Kr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Kr)))}_computeIntersections(e,t,n){let r,o=this.geometry,s=this.material,a=o.index,c=o.attributes.position,l=o.attributes.uv,u=o.attributes.uv1,d=o.attributes.normal,h=o.groups,f=o.drawRange;if(a!==null)if(Array.isArray(s))for(let g=0,x=h.length;g<x;g++){let m=h[g],p=s[m.materialIndex],v=Math.max(m.start,f.start),_=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let T=v,A=_;T<A;T+=3){let E=a.getX(T),w=a.getX(T+1),P=a.getX(T+2);r=Ac(this,p,e,n,l,u,d,E,w,P),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let v=a.getX(m),_=a.getX(m+1),T=a.getX(m+2);r=Ac(this,s,e,n,l,u,d,v,_,T),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(s))for(let g=0,x=h.length;g<x;g++){let m=h[g],p=s[m.materialIndex],v=Math.max(m.start,f.start),_=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let T=v,A=_;T<A;T+=3){let E=T,w=T+1,P=T+2;r=Ac(this,p,e,n,l,u,d,E,w,P),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let v=m,_=m+1,T=m+2;r=Ac(this,s,e,n,l,u,d,v,_,T),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function Kv(i,e,t,n,r,o,s,a){let c;if(e.side===bt?c=n.intersectTriangle(s,o,r,!0,a):c=n.intersectTriangle(r,o,s,e.side===Zt,a),c===null)return null;wc.copy(a),wc.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(wc);return l<t.near||l>t.far?null:{distance:l,point:wc.clone(),object:i}}function Ac(i,e,t,n,r,o,s,a,c,l){i.getVertexPosition(a,Wo),i.getVertexPosition(c,Xo),i.getVertexPosition(l,qo);let u=Kv(i,e,t,n,Wo,Xo,qo,Sc);if(u){r&&(Mc.fromBufferAttribute(r,a),bc.fromBufferAttribute(r,c),Tc.fromBufferAttribute(r,l),u.uv=Ki.getInterpolation(Sc,Wo,Xo,qo,Mc,bc,Tc,new Ie)),o&&(Mc.fromBufferAttribute(o,a),bc.fromBufferAttribute(o,c),Tc.fromBufferAttribute(o,l),u.uv1=Ki.getInterpolation(Sc,Wo,Xo,qo,Mc,bc,Tc,new Ie),u.uv2=u.uv1),s&&(am.fromBufferAttribute(s,a),cm.fromBufferAttribute(s,c),lm.fromBufferAttribute(s,l),u.normal=Ki.getInterpolation(Sc,Wo,Xo,qo,am,cm,lm,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new L,materialIndex:0};Ki.getNormal(Wo,Xo,qo,d.normal),u.face=d}return u}var jn=class i extends Je{constructor(e=1,t=1,n=1,r=1,o=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:o,depthSegments:s};let a=this;r=Math.floor(r),o=Math.floor(o),s=Math.floor(s);let c=[],l=[],u=[],d=[],h=0,f=0;g("z","y","x",-1,-1,n,t,e,s,o,0),g("z","y","x",1,-1,n,t,-e,s,o,1),g("x","z","y",1,1,e,n,t,r,s,2),g("x","z","y",1,-1,e,n,-t,r,s,3),g("x","y","z",1,-1,e,t,n,r,o,4),g("x","y","z",-1,-1,e,t,-n,r,o,5),this.setIndex(c),this.setAttribute("position",new Ze(l,3)),this.setAttribute("normal",new Ze(u,3)),this.setAttribute("uv",new Ze(d,2));function g(x,m,p,v,_,T,A,E,w,P,y){let M=T/w,D=A/P,V=T/2,ie=A/2,I=E/2,k=w+1,G=P+1,te=0,N=0,X=new L;for(let q=0;q<G;q++){let Q=q*D-ie;for(let fe=0;fe<k;fe++){let H=fe*M-V;X[x]=H*v,X[m]=Q*_,X[p]=I,l.push(X.x,X.y,X.z),X[x]=0,X[m]=0,X[p]=E>0?1:-1,u.push(X.x,X.y,X.z),d.push(fe/w),d.push(1-q/P),te+=1}}for(let q=0;q<P;q++)for(let Q=0;Q<w;Q++){let fe=h+Q+k*q,H=h+Q+k*(q+1),Z=h+(Q+1)+k*(q+1),me=h+(Q+1)+k*q;c.push(fe,H,me),c.push(H,Z,me),N+=6}a.addGroup(f,N,y),f+=N,h+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function $i(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function ln(i){let e={};for(let t=0;t<i.length;t++){let n=$i(i[t]);for(let r in n)e[r]=n[r]}return e}function um(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Rc(i){return i.getRenderTarget()===null?i.outputColorSpace:$e.workingColorSpace}var dm={clone:$i,merge:ln};var hm=`
void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;var fm=`
void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}
`;var un=class extends Dt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hm,this.fragmentShader=fm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=um(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}};var Yo=class extends Xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ue,this.projectionMatrix=new Ue,this.projectionMatrixInverse=new Ue,this.coordinateSystem=En}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};var ft=class extends Yo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Vi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(mr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vi*2*Math.atan(Math.tan(mr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,o,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(mr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,o=-.5*r,s=this.view;if(this.view!==null&&this.view.enabled){let c=s.fullWidth,l=s.fullHeight;o+=s.offsetX*r/c,t-=s.offsetY*n/l,r*=s.width/c,n*=s.height/l}let a=this.filmOffset;a!==0&&(o+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var jo=-90,Ko=1,Cc=class extends Xe{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new ft(jo,Ko,e,t);r.layers=this.layers,this.add(r);let o=new ft(jo,Ko,e,t);o.layers=this.layers,this.add(o);let s=new ft(jo,Ko,e,t);s.layers=this.layers,this.add(s);let a=new ft(jo,Ko,e,t);a.layers=this.layers,this.add(a);let c=new ft(jo,Ko,e,t);c.layers=this.layers,this.add(c);let l=new ft(jo,Ko,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,o,s,a,c]=t;for(let l of t)this.remove(l);if(e===En)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===qr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[o,s,a,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,o),e.setRenderTarget(n,1,r),e.render(t,s),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}};var $o=class extends mt{constructor(e,t,n,r,o,s,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:ti,super(e,t,n,r,o,s,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Lc=class extends bn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(xr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ri?nt:Jt),this.texture=new $o(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Bt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new jn(5,5,5),o=new un({name:"CubemapFromEquirect",uniforms:$i(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:bt,blending:kn});o.uniforms.tEquirect.value=t;let s=new Ge(r,o),a=t.minFilter;return t.minFilter===Vn&&(t.minFilter=Bt),new Cc(1,10,this).update(e,s),t.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,n,r){let o=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,r);e.setRenderTarget(o)}};var hd=new L,$v=new L,Zv=new Oe,ci=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=hd.subVectors(n,t).cross($v.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(hd),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Zv.getNormalMatrix(e),r=this.coplanarPoint(hd).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}};var $r=new At,Pc=new L,wr=class{constructor(e=new ci,t=new ci,n=new ci,r=new ci,o=new ci,s=new ci){this.planes=[e,t,n,r,o,s]}set(e,t,n,r,o,s){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(o),a[5].copy(s),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=En){let n=this.planes,r=e.elements,o=r[0],s=r[1],a=r[2],c=r[3],l=r[4],u=r[5],d=r[6],h=r[7],f=r[8],g=r[9],x=r[10],m=r[11],p=r[12],v=r[13],_=r[14],T=r[15];if(n[0].setComponents(c-o,h-l,m-f,T-p).normalize(),n[1].setComponents(c+o,h+l,m+f,T+p).normalize(),n[2].setComponents(c+s,h+u,m+g,T+v).normalize(),n[3].setComponents(c-s,h-u,m-g,T-v).normalize(),n[4].setComponents(c-a,h-d,m-x,T-_).normalize(),t===En)n[5].setComponents(c+a,h+d,m+x,T+_).normalize();else if(t===qr)n[5].setComponents(a,d,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$r.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),$r.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($r)}intersectsSprite(e){return $r.center.set(0,0,0),$r.radius=.7071067811865476,$r.applyMatrix4(e.matrixWorld),this.intersectsSphere($r)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Pc.x=r.normal.x>0?e.max.x:e.min.x,Pc.y=r.normal.y>0?e.max.y:e.min.y,Pc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Pc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Ic(){let i=null,e=!1,t=null,n=null;function r(o,s){t(o,s),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){i=o}}}function pm(i,e){let t=e.isWebGL2,n=new WeakMap;function r(l,u){let d=l.array,h=l.usage,f=d.byteLength,g=i.createBuffer();i.bindBuffer(u,g),i.bufferData(u,d,h),l.onUploadCallback();let x;if(d instanceof Float32Array)x=i.FLOAT;else if(d instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)x=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=i.UNSIGNED_SHORT;else if(d instanceof Int16Array)x=i.SHORT;else if(d instanceof Uint32Array)x=i.UNSIGNED_INT;else if(d instanceof Int32Array)x=i.INT;else if(d instanceof Int8Array)x=i.BYTE;else if(d instanceof Uint8Array)x=i.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)x=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:x,bytesPerElement:d.BYTES_PER_ELEMENT,version:l.version,size:f}}function o(l,u,d){let h=u.array,f=u._updateRange,g=u.updateRanges;if(i.bindBuffer(d,l),f.count===-1&&g.length===0&&i.bufferSubData(d,0,h),g.length!==0){for(let x=0,m=g.length;x<m;x++){let p=g[x];t?i.bufferSubData(d,p.start*h.BYTES_PER_ELEMENT,h,p.start,p.count):i.bufferSubData(d,p.start*h.BYTES_PER_ELEMENT,h.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}f.count!==-1&&(t?i.bufferSubData(d,f.offset*h.BYTES_PER_ELEMENT,h,f.offset,f.count):i.bufferSubData(d,f.offset*h.BYTES_PER_ELEMENT,h.subarray(f.offset,f.offset+f.count)),f.count=-1),u.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);u&&(i.deleteBuffer(u.buffer),n.delete(l))}function c(l,u){if(l.isGLBufferAttribute){let h=n.get(l);(!h||h.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let d=n.get(l);if(d===void 0)n.set(l,r(l,u));else if(d.version<l.version){if(d.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");o(d.buffer,l,u),d.version=l.version}}return{get:s,remove:a,update:c}}var Zr=class i extends Je{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let o=e/2,s=t/2,a=Math.floor(n),c=Math.floor(r),l=a+1,u=c+1,d=e/a,h=t/c,f=[],g=[],x=[],m=[];for(let p=0;p<u;p++){let v=p*h-s;for(let _=0;_<l;_++){let T=_*d-o;g.push(T,-v,0),x.push(0,0,1),m.push(_/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){let _=v+l*p,T=v+l*(p+1),A=v+1+l*(p+1),E=v+1+l*p;f.push(_,T,E),f.push(T,A,E)}this.setIndex(f),this.setAttribute("position",new Ze(g,3)),this.setAttribute("normal",new Ze(x,3)),this.setAttribute("uv",new Ze(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var mm=`
#ifdef USE_ALPHAHASH

	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;

#endif
`;var gm=`
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
`;var xm=`
#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;

#endif
`;var _m=`
#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`;var ym=`
#ifdef USE_ALPHATEST

	if ( diffuseColor.a < alphaTest ) discard;

#endif
`;var vm=`
#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif
`;var Em=`
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
`;var Mm=`
#ifdef USE_AOMAP

	uniform sampler2D aoMap;
	uniform float aoMapIntensity;

#endif
`;var bm=`
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
`;var Tm=`
#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif
`;var Sm=`
vec3 transformed = vec3( position );

#ifdef USE_ALPHAHASH

	vPosition = vec3( position );

#endif
`;var wm=`
vec3 objectNormal = vec3( normal );

#ifdef USE_TANGENT

	vec3 objectTangent = vec3( tangent.xyz );

#endif
`;var Am=`

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

`;var Rm=`

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

`;var Cm=`
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
`;var Lm=`
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
`;var Pm=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif
`;var Im=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

#endif
`;var Dm=`
#if NUM_CLIPPING_PLANES > 0

	vClipPosition = - mvPosition.xyz;

#endif
`;var Um=`
#if defined( USE_COLOR_ALPHA )

	diffuseColor *= vColor;

#elif defined( USE_COLOR )

	diffuseColor.rgb *= vColor;

#endif
`;var Nm=`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR )

	varying vec3 vColor;

#endif
`;var Bm=`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )

	varying vec3 vColor;

#endif
`;var Fm=`
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
`;var Om=`
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
`;var Hm=`
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
`;var zm=`

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
`;var km=`
#ifdef USE_DISPLACEMENTMAP

	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;

#endif
`;var Gm=`
#ifdef USE_DISPLACEMENTMAP

	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );

#endif
`;var Vm=`
#ifdef USE_EMISSIVEMAP

	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );

	totalEmissiveRadiance *= emissiveColor.rgb;

#endif
`;var Wm=`
#ifdef USE_EMISSIVEMAP

	uniform sampler2D emissiveMap;

#endif
`;var Xm=`
gl_FragColor = linearToOutputTexel( gl_FragColor );
`;var qm=`

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
`;var Ym=`
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
`;var jm=`
#ifdef USE_ENVMAP

	uniform float envMapIntensity;
	uniform float flipEnvMap;

	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif
`;var Km=`
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
`;var $m=`
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
`;var Zm=`
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
`;var Jm=`
#ifdef USE_FOG

	vFogDepth = - mvPosition.z;

#endif
`;var Qm=`
#ifdef USE_FOG

	varying float vFogDepth;

#endif
`;var eg=`
#ifdef USE_FOG

	#ifdef FOG_EXP2

		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );

	#else

		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );

	#endif

	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

#endif
`;var tg=`
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
`;var ng=`

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
`;var ig=`
#ifdef USE_LIGHTMAP

	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;

	reflectedLight.indirectDiffuse += lightMapIrradiance;

#endif
`;var rg=`
#ifdef USE_LIGHTMAP

	uniform sampler2D lightMap;
	uniform float lightMapIntensity;

#endif
`;var og=`
LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;
`;var sg=`
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
`;var ag=`
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
`;var cg=`
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
`;var lg=`
ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;
`;var ug=`
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
`;var dg=`
BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;
`;var hg=`
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
`;var fg=`
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
`;var pg=`

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
`;var mg=`
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
`;var gg=`
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
`;var xg=`
#if defined( RE_IndirectDiffuse )

	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif

#if defined( RE_IndirectSpecular )

	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif
`;var _g=`
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	// Doing a strict comparison with == 1.0 can cause noise artifacts
	// on some platforms. See issue #17623.
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;

#endif
`;var yg=`
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`;var vg=`
#ifdef USE_LOGDEPTHBUF

	#ifdef USE_LOGDEPTHBUF_EXT

		varying float vFragDepth;
		varying float vIsPerspective;

	#else

		uniform float logDepthBufFC;

	#endif

#endif
`;var Eg=`
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
`;var Mg=`
#ifdef USE_MAP

	vec4 sampledDiffuseColor = texture2D( map, vMapUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// use inline sRGB decode until browsers properly support SRGB8_APLHA8 with video textures

		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif

	diffuseColor *= sampledDiffuseColor;

#endif
`;var bg=`
#ifdef USE_MAP

	uniform sampler2D map;

#endif
`;var Tg=`
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
`;var Sg=`
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
`;var wg=`
float metalnessFactor = metalness;

#ifdef USE_METALNESSMAP

	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );

	// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	metalnessFactor *= texelMetalness.b;

#endif
`;var Ag=`
#ifdef USE_METALNESSMAP

	uniform sampler2D metalnessMap;

#endif
`;var Rg=`
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
`;var Cg=`
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
`;var Lg=`
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
`;var Pg=`
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
`;var Ig=`
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

`;var Dg=`

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
`;var Ug=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`;var Ng=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`;var Bg=`
#ifndef FLAT_SHADED // normal is computed with derivatives when FLAT_SHADED

	vNormal = normalize( transformedNormal );

	#ifdef USE_TANGENT

		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );

	#endif

#endif
`;var Fg=`
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
`;var Og=`
#ifdef USE_CLEARCOAT

	vec3 clearcoatNormal = nonPerturbedNormal;

#endif
`;var Hg=`
#ifdef USE_CLEARCOAT_NORMALMAP

	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;

	clearcoatNormal = normalize( tbn2 * clearcoatMapN );

#endif
`;var zg=`

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
`;var kg=`

#ifdef USE_IRIDESCENCEMAP

	uniform sampler2D iridescenceMap;

#endif

#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform sampler2D iridescenceThicknessMap;

#endif
`;var Gg=`
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif

gl_FragColor = vec4( outgoingLight, diffuseColor.a );
`;var Vg=`
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
`;var Wg=`
#ifdef PREMULTIPLIED_ALPHA

	// Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.
	gl_FragColor.rgb *= gl_FragColor.a;

#endif
`;var Xg=`
vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_BATCHING

	mvPosition = batchingMatrix * mvPosition;

#endif

#ifdef USE_INSTANCING

	mvPosition = instanceMatrix * mvPosition;

#endif

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;
`;var qg=`
#ifdef DITHERING

	gl_FragColor.rgb = dithering( gl_FragColor.rgb );

#endif
`;var Yg=`
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
`;var jg=`
float roughnessFactor = roughness;

#ifdef USE_ROUGHNESSMAP

	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );

	// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	roughnessFactor *= texelRoughness.g;

#endif
`;var Kg=`
#ifdef USE_ROUGHNESSMAP

	uniform sampler2D roughnessMap;

#endif
`;var $g=`
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
`;var Zg=`

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
`;var Jg=`

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


`;var Qg=`
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
`;var e0=`
#ifdef USE_SKINNING

	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );

#endif
`;var t0=`
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
`;var n0=`
#ifdef USE_SKINNING

	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );

	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;

	transformed = ( bindMatrixInverse * skinned ).xyz;

#endif
`;var i0=`
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
`;var r0=`
float specularStrength;

#ifdef USE_SPECULARMAP

	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;

#else

	specularStrength = 1.0;

#endif
`;var o0=`
#ifdef USE_SPECULARMAP

	uniform sampler2D specularMap;

#endif
`;var s0=`
#if defined( TONE_MAPPING )

	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );

#endif
`;var a0=`
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
`;var c0=`
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
`;var l0=`
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
`;var u0=`
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
`;var d0=`
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
`;var h0=`
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
`;var f0=`
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
`;var p0=`
varying vec2 vUv;
uniform mat3 uvTransform;

void main() {

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	gl_Position = vec4( position.xy, 1.0, 1.0 );

}
`,m0=`
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
`;var g0=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,x0=`

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
`;var _0=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,y0=`
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
`;var v0=`
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
`,E0=`
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
`;var M0=`
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
`,b0=`
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
`;var T0=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

}
`,S0=`
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
`;var w0=`
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
`,A0=`
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
`;var R0=`
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
`,C0=`
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
`;var L0=`
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
`,P0=`
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
`;var I0=`
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
`,D0=`
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
`;var U0=`
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
`,N0=`
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
`;var B0=`
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
`,F0=`
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
`;var O0=`
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
`,H0=`
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
`;var z0=`
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
`,k0=`
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
`;var G0=`
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
`,V0=`
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
`;var W0=`
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
`,X0=`
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
`;var q0=`
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
`,Y0=`
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
`;var qe={alphahash_fragment:mm,alphahash_pars_fragment:gm,alphamap_fragment:xm,alphamap_pars_fragment:_m,alphatest_fragment:ym,alphatest_pars_fragment:vm,aomap_fragment:Em,aomap_pars_fragment:Mm,batching_pars_vertex:bm,batching_vertex:Tm,begin_vertex:Sm,beginnormal_vertex:wm,bsdfs:Am,iridescence_fragment:Rm,bumpmap_pars_fragment:Cm,clipping_planes_fragment:Lm,clipping_planes_pars_fragment:Pm,clipping_planes_pars_vertex:Im,clipping_planes_vertex:Dm,color_fragment:Um,color_pars_fragment:Nm,color_pars_vertex:Bm,color_vertex:Fm,common:Om,cube_uv_reflection_fragment:Hm,defaultnormal_vertex:zm,displacementmap_pars_vertex:km,displacementmap_vertex:Gm,emissivemap_fragment:Vm,emissivemap_pars_fragment:Wm,colorspace_fragment:Xm,colorspace_pars_fragment:qm,envmap_fragment:Ym,envmap_common_pars_fragment:jm,envmap_pars_fragment:Km,envmap_pars_vertex:$m,envmap_physical_pars_fragment:cg,envmap_vertex:Zm,fog_vertex:Jm,fog_pars_vertex:Qm,fog_fragment:eg,fog_pars_fragment:tg,gradientmap_pars_fragment:ng,lightmap_fragment:ig,lightmap_pars_fragment:rg,lights_lambert_fragment:og,lights_lambert_pars_fragment:sg,lights_pars_begin:ag,lights_toon_fragment:lg,lights_toon_pars_fragment:ug,lights_phong_fragment:dg,lights_phong_pars_fragment:hg,lights_physical_fragment:fg,lights_physical_pars_fragment:pg,lights_fragment_begin:mg,lights_fragment_maps:gg,lights_fragment_end:xg,logdepthbuf_fragment:_g,logdepthbuf_pars_fragment:yg,logdepthbuf_pars_vertex:vg,logdepthbuf_vertex:Eg,map_fragment:Mg,map_pars_fragment:bg,map_particle_fragment:Tg,map_particle_pars_fragment:Sg,metalnessmap_fragment:wg,metalnessmap_pars_fragment:Ag,morphcolor_vertex:Rg,morphnormal_vertex:Cg,morphtarget_pars_vertex:Lg,morphtarget_vertex:Pg,normal_fragment_begin:Ig,normal_fragment_maps:Dg,normal_pars_fragment:Ug,normal_pars_vertex:Ng,normal_vertex:Bg,normalmap_pars_fragment:Fg,clearcoat_normal_fragment_begin:Og,clearcoat_normal_fragment_maps:Hg,clearcoat_pars_fragment:zg,iridescence_pars_fragment:kg,opaque_fragment:Gg,packing:Vg,premultiplied_alpha_fragment:Wg,project_vertex:Xg,dithering_fragment:qg,dithering_pars_fragment:Yg,roughnessmap_fragment:jg,roughnessmap_pars_fragment:Kg,shadowmap_pars_fragment:$g,shadowmap_pars_vertex:Zg,shadowmap_vertex:Jg,shadowmask_pars_fragment:Qg,skinbase_vertex:e0,skinning_pars_vertex:t0,skinning_vertex:n0,skinnormal_vertex:i0,specularmap_fragment:r0,specularmap_pars_fragment:o0,tonemapping_fragment:s0,tonemapping_pars_fragment:a0,transmission_fragment:c0,transmission_pars_fragment:l0,uv_pars_fragment:u0,uv_pars_vertex:d0,uv_vertex:h0,worldpos_vertex:f0,background_vert:p0,background_frag:m0,backgroundCube_vert:g0,backgroundCube_frag:x0,cube_vert:_0,cube_frag:y0,depth_vert:v0,depth_frag:E0,distanceRGBA_vert:M0,distanceRGBA_frag:b0,equirect_vert:T0,equirect_frag:S0,linedashed_vert:w0,linedashed_frag:A0,meshbasic_vert:R0,meshbasic_frag:C0,meshlambert_vert:L0,meshlambert_frag:P0,meshmatcap_vert:I0,meshmatcap_frag:D0,meshnormal_vert:U0,meshnormal_frag:N0,meshphong_vert:B0,meshphong_frag:F0,meshphysical_vert:O0,meshphysical_frag:H0,meshtoon_vert:z0,meshtoon_frag:k0,points_vert:G0,points_frag:V0,shadow_vert:W0,shadow_frag:X0,sprite_vert:q0,sprite_frag:Y0};var Me={common:{diffuse:{value:new ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new Ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new ge(16777215)},opacity:{value:1},center:{value:new Ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}};var Kn={basic:{uniforms:ln([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:ln([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new ge(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:ln([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new ge(0)},specular:{value:new ge(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:ln([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:ln([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new ge(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:ln([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:ln([Me.points,Me.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:ln([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:ln([Me.common,Me.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:ln([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:ln([Me.sprite,Me.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:ln([Me.common,Me.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:ln([Me.lights,Me.fog,{color:{value:new ge(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};Kn.physical={uniforms:ln([Kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new Ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new Ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new ge(0)},specularColor:{value:new ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new Ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};var Dc={r:0,b:0,g:0};function j0(i,e,t,n,r,o,s){let a=new ge(0),c=o===!0?0:1,l,u,d=null,h=0,f=null;function g(m,p){let v=!1,_=p.isScene===!0?p.background:null;_&&_.isTexture&&(_=(p.backgroundBlurriness>0?t:e).get(_)),_===null?x(a,c):_&&_.isColor&&(x(_,1),v=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(i.autoClear||v)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),_&&(_.isCubeTexture||_.mapping===pr)?(u===void 0&&(u=new Ge(new jn(1,1,1),new un({name:"BackgroundCubeMaterial",uniforms:$i(Kn.backgroundCube.uniforms),vertexShader:Kn.backgroundCube.vertexShader,fragmentShader:Kn.backgroundCube.fragmentShader,side:bt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,E,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=$e.getTransfer(_.colorSpace)!==ct,(d!==_||h!==_.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,d=_,h=_.version,f=i.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Ge(new Zr(2,2),new un({name:"BackgroundMaterial",uniforms:$i(Kn.background.uniforms),vertexShader:Kn.background.vertexShader,fragmentShader:Kn.background.fragmentShader,side:Zt,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=$e.getTransfer(_.colorSpace)!==ct,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||h!==_.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,d=_,h=_.version,f=i.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function x(m,p){m.getRGB(Dc,Rc(i)),n.buffers.color.setClear(Dc.r,Dc.g,Dc.b,p,s)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),c=p,x(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,x(a,c)},render:g}}function K0(i,e,t,n){let r=i.getParameter(i.MAX_VERTEX_ATTRIBS),o=n.isWebGL2?null:e.get("OES_vertex_array_object"),s=n.isWebGL2||o!==null,a={},c=m(null),l=c,u=!1;function d(I,k,G,te,N){let X=!1;if(s){let q=x(te,G,k);l!==q&&(l=q,f(l.object)),X=p(I,te,G,N),X&&v(I,te,G,N)}else{let q=k.wireframe===!0;(l.geometry!==te.id||l.program!==G.id||l.wireframe!==q)&&(l.geometry=te.id,l.program=G.id,l.wireframe=q,X=!0)}N!==null&&t.update(N,i.ELEMENT_ARRAY_BUFFER),(X||u)&&(u=!1,P(I,k,G,te),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function h(){return n.isWebGL2?i.createVertexArray():o.createVertexArrayOES()}function f(I){return n.isWebGL2?i.bindVertexArray(I):o.bindVertexArrayOES(I)}function g(I){return n.isWebGL2?i.deleteVertexArray(I):o.deleteVertexArrayOES(I)}function x(I,k,G){let te=G.wireframe===!0,N=a[I.id];N===void 0&&(N={},a[I.id]=N);let X=N[k.id];X===void 0&&(X={},N[k.id]=X);let q=X[te];return q===void 0&&(q=m(h()),X[te]=q),q}function m(I){let k=[],G=[],te=[];for(let N=0;N<r;N++)k[N]=0,G[N]=0,te[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:G,attributeDivisors:te,object:I,attributes:{},index:null}}function p(I,k,G,te){let N=l.attributes,X=k.attributes,q=0,Q=G.getAttributes();for(let fe in Q)if(Q[fe].location>=0){let Z=N[fe],me=X[fe];if(me===void 0&&(fe==="instanceMatrix"&&I.instanceMatrix&&(me=I.instanceMatrix),fe==="instanceColor"&&I.instanceColor&&(me=I.instanceColor)),Z===void 0||Z.attribute!==me||me&&Z.data!==me.data)return!0;q++}return l.attributesNum!==q||l.index!==te}function v(I,k,G,te){let N={},X=k.attributes,q=0,Q=G.getAttributes();for(let fe in Q)if(Q[fe].location>=0){let Z=X[fe];Z===void 0&&(fe==="instanceMatrix"&&I.instanceMatrix&&(Z=I.instanceMatrix),fe==="instanceColor"&&I.instanceColor&&(Z=I.instanceColor));let me={};me.attribute=Z,Z&&Z.data&&(me.data=Z.data),N[fe]=me,q++}l.attributes=N,l.attributesNum=q,l.index=te}function _(){let I=l.newAttributes;for(let k=0,G=I.length;k<G;k++)I[k]=0}function T(I){A(I,0)}function A(I,k){let G=l.newAttributes,te=l.enabledAttributes,N=l.attributeDivisors;G[I]=1,te[I]===0&&(i.enableVertexAttribArray(I),te[I]=1),N[I]!==k&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,k),N[I]=k)}function E(){let I=l.newAttributes,k=l.enabledAttributes;for(let G=0,te=k.length;G<te;G++)k[G]!==I[G]&&(i.disableVertexAttribArray(G),k[G]=0)}function w(I,k,G,te,N,X,q){q===!0?i.vertexAttribIPointer(I,k,G,N,X):i.vertexAttribPointer(I,k,G,te,N,X)}function P(I,k,G,te){if(n.isWebGL2===!1&&(I.isInstancedMesh||te.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();let N=te.attributes,X=G.getAttributes(),q=k.defaultAttributeValues;for(let Q in X){let fe=X[Q];if(fe.location>=0){let H=N[Q];if(H===void 0&&(Q==="instanceMatrix"&&I.instanceMatrix&&(H=I.instanceMatrix),Q==="instanceColor"&&I.instanceColor&&(H=I.instanceColor)),H!==void 0){let Z=H.normalized,me=H.itemSize,j=t.get(H);if(j===void 0)continue;let W=j.buffer,ee=j.type,ce=j.bytesPerElement,pe=n.isWebGL2===!0&&(ee===i.INT||ee===i.UNSIGNED_INT||H.gpuType===ka);if(H.isInterleavedBufferAttribute){let $=H.data,S=$.stride,J=H.offset;if($.isInstancedInterleavedBuffer){for(let U=0;U<fe.locationSize;U++)A(fe.location+U,$.meshPerAttribute);I.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let U=0;U<fe.locationSize;U++)T(fe.location+U);i.bindBuffer(i.ARRAY_BUFFER,W);for(let U=0;U<fe.locationSize;U++)w(fe.location+U,me/fe.locationSize,ee,Z,S*ce,(J+me/fe.locationSize*U)*ce,pe)}else{if(H.isInstancedBufferAttribute){for(let $=0;$<fe.locationSize;$++)A(fe.location+$,H.meshPerAttribute);I.isInstancedMesh!==!0&&te._maxInstanceCount===void 0&&(te._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let $=0;$<fe.locationSize;$++)T(fe.location+$);i.bindBuffer(i.ARRAY_BUFFER,W);for(let $=0;$<fe.locationSize;$++)w(fe.location+$,me/fe.locationSize,ee,Z,me*ce,me/fe.locationSize*$*ce,pe)}}else if(q!==void 0){let Z=q[Q];if(Z!==void 0)switch(Z.length){case 2:i.vertexAttrib2fv(fe.location,Z);break;case 3:i.vertexAttrib3fv(fe.location,Z);break;case 4:i.vertexAttrib4fv(fe.location,Z);break;default:i.vertexAttrib1fv(fe.location,Z)}}}}E()}function y(){V();for(let I in a){let k=a[I];for(let G in k){let te=k[G];for(let N in te)g(te[N].object),delete te[N];delete k[G]}delete a[I]}}function M(I){if(a[I.id]===void 0)return;let k=a[I.id];for(let G in k){let te=k[G];for(let N in te)g(te[N].object),delete te[N];delete k[G]}delete a[I.id]}function D(I){for(let k in a){let G=a[k];if(G[I.id]===void 0)continue;let te=G[I.id];for(let N in te)g(te[N].object),delete te[N];delete G[I.id]}}function V(){ie(),u=!0,l!==c&&(l=c,f(l.object))}function ie(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:d,reset:V,resetDefaultState:ie,dispose:y,releaseStatesOfGeometry:M,releaseStatesOfProgram:D,initAttributes:_,enableAttribute:T,disableUnusedAttributes:E}}function $0(i,e,t,n){let r=n.isWebGL2,o;function s(u){o=u}function a(u,d){i.drawArrays(o,u,d),t.update(d,o,1)}function c(u,d,h){if(h===0)return;let f,g;if(r)f=i,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](o,u,d,h),t.update(d,o,h)}function l(u,d,h){if(h===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<h;g++)this.render(u[g],d[g]);else{f.multiDrawArraysWEBGL(o,u,0,d,0,h);let g=0;for(let x=0;x<h;x++)g+=d[x];t.update(g,o,1)}}this.setMode=s,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function Z0(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let w=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let s=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",a=t.precision!==void 0?t.precision:"highp",c=o(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);let l=s||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),h=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),x=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),p=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),_=h>0,T=s||e.has("OES_texture_float"),A=_&&T,E=s?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:s,drawBuffers:l,getMaxAnisotropy:r,getMaxPrecision:o,precision:a,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:h,maxTextureSize:f,maxCubemapSize:g,maxAttributes:x,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:v,vertexTextures:_,floatFragmentTextures:T,floatVertexTextures:A,maxSamples:E}}function J0(i){let e=this,t=null,n=0,r=!1,o=!1,s=new ci,a=new Oe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||n!==0||r;return r=h,n=d.length,f},this.beginShadows=function(){o=!0,u(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!r||g===null||g.length===0||o&&!m)o?u(null):l();else{let v=o?0:n,_=v*4,T=p.clippingState||null;c.value=T,T=u(g,h,_,f);for(let A=0;A!==_;++A)T[A]=t[A];p.clippingState=T,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let p=f+x*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,T=f;_!==x;++_,T+=4)s.copy(d[_]).applyMatrix4(v,a),s.normal.toArray(m,T),m[T+3]=s.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Q0(i){let e=new WeakMap;function t(s,a){return a===Os?s.mapping=ti:a===Hs&&(s.mapping=Ei),s}function n(s){if(s&&s.isTexture){let a=s.mapping;if(a===Os||a===Hs)if(e.has(s)){let c=e.get(s).texture;return t(c,s.mapping)}else{let c=s.image;if(c&&c.height>0){let l=new Lc(c.height/2);return l.fromEquirectangularTexture(i,s),e.set(s,l),s.addEventListener("dispose",r),t(l.texture,s.mapping)}else return null}}return s}function r(s){let a=s.target;a.removeEventListener("dispose",r);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}var Zi=class extends Yo{constructor(e=-1,t=1,n=1,r=-1,o=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=o,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,o,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,o=n-e,s=n+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,s=o+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(o,s,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Jo=4,ex=[.125,.215,.35,.446,.526,.582],Qr=20,fd=new Zi,tx=new ge,pd=null,md=0,gd=0,Jr=(1+Math.sqrt(5))/2,Zo=1/Jr,nx=[new L(1,1,1),new L(-1,1,1),new L(1,1,-1),new L(-1,1,-1),new L(0,Jr,Zo),new L(0,Jr,-Zo),new L(Zo,0,Jr),new L(-Zo,0,Jr),new L(Jr,Zo,0),new L(-Jr,Zo,0)],Ar=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){pd=this._renderer.getRenderTarget(),md=this._renderer.getActiveCubeFace(),gd=this._renderer.getActiveMipmapLevel(),this._setSize(256);let o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,r,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ox(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rx(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(pd,md,gd),e.scissorTest=!1,Uc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ti||e.mapping===Ei?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),pd=this._renderer.getRenderTarget(),md=this._renderer.getActiveCubeFace(),gd=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:zi,format:Ht,colorSpace:pt,depthBuffer:!1},r=ix(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ix(e,t,n);let{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=mE(o)),this._blurMaterial=gE(o,e,t)}return r}_compileMaterial(e){let t=new Ge(this._lodPlanes[0],e);this._renderer.compile(t,fd)}_sceneToCubeUV(e,t,n,r){let a=new ft(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(tx),u.toneMapping=Gn,u.autoClear=!1;let f=new Ut({name:"PMREM.Background",side:bt,depthWrite:!1,depthTest:!1}),g=new Ge(new jn,f),x=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,x=!0):(f.color.copy(tx),x=!0);for(let p=0;p<6;p++){let v=p%3;v===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):v===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let _=this._cubeSize;Uc(r,v*_,p>2?_:0,_,_),u.setRenderTarget(r),x&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===ti||e.mapping===Ei;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ox()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rx());let o=r?this._cubemapMaterial:this._equirectMaterial,s=new Ge(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=e;let c=this._cubeSize;Uc(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(s,fd)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),s=nx[(r-1)%nx.length];this._blur(e,r-1,r,o,s)}t.autoClear=n}_blur(e,t,n,r,o){let s=this._pingPongRenderTarget;this._halfBlur(e,s,t,n,r,"latitudinal",o),this._halfBlur(s,e,n,n,r,"longitudinal",o)}_halfBlur(e,t,n,r,o,s,a){let c=this._renderer,l=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new Ge(this._lodPlanes[r],l),h=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(o)?Math.PI/(2*f):2*Math.PI/(2*Qr-1),x=o/g,m=isFinite(o)?1+Math.floor(u*x):Qr;m>Qr&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Qr}`);let p=[],v=0;for(let w=0;w<Qr;++w){let P=w/x,y=Math.exp(-P*P/2);p.push(y),w===0?v+=y:w<m&&(v+=2*y)}for(let w=0;w<p.length;w++)p[w]=p[w]/v;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=s==="latitudinal",a&&(h.poleAxis.value=a);let{_lodMax:_}=this;h.dTheta.value=g,h.mipInt.value=_-n;let T=this._sizeLods[r],A=3*T*(r>_-Jo?r-_+Jo:0),E=4*(this._cubeSize-T);Uc(t,A,E,3*T,2*T),c.setRenderTarget(t),c.render(d,fd)}};function mE(i){let e=[],t=[],n=[],r=i,o=i-Jo+1+ex.length;for(let s=0;s<o;s++){let a=Math.pow(2,r);t.push(a);let c=1/a;s>i-Jo?c=ex[s-i+Jo-1]:s===0&&(c=0),n.push(c);let l=1/(a-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,x=3,m=2,p=1,v=new Float32Array(x*g*f),_=new Float32Array(m*g*f),T=new Float32Array(p*g*f);for(let E=0;E<f;E++){let w=E%3*2/3-1,P=E>2?0:-1,y=[w,P,0,w+2/3,P,0,w+2/3,P+1,0,w,P,0,w+2/3,P+1,0,w,P+1,0];v.set(y,x*g*E),_.set(h,m*g*E);let M=[E,E,E,E,E,E];T.set(M,p*g*E)}let A=new Je;A.setAttribute("position",new Ke(v,x)),A.setAttribute("uv",new Ke(_,m)),A.setAttribute("faceIndex",new Ke(T,p)),e.push(A),r>Jo&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ix(i,e,t){let n=new bn(i,e,t);return n.texture.mapping=pr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Uc(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function gE(i,e,t){let n=new Float32Array(Qr),r=new L(0,1,0);return new un({name:"SphericalGaussianBlur",defines:{n:Qr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:xd(),fragmentShader:`

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
		`,blending:kn,depthTest:!1,depthWrite:!1})}function rx(){return new un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xd(),fragmentShader:`

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
		`,blending:kn,depthTest:!1,depthWrite:!1})}function ox(){return new un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function xd(){return`

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
	`}function sx(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Os||c===Hs,u=c===ti||c===Ei;if(l||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=e.get(a);return t===null&&(t=new Ar(i)),d=l?t.fromEquirectangular(a,d):t.fromCubemap(a,d),e.set(a,d),d.texture}else{if(e.has(a))return e.get(a).texture;{let d=a.image;if(l&&d&&d.height>0||u&&d&&r(d)){t===null&&(t=new Ar(i));let h=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",o),h.texture}else return null}}}return a}function r(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function o(a){let c=a.target;c.removeEventListener("dispose",o);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:s}}function ax(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function cx(i,e,t,n){let r={},o=new WeakMap;function s(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let g in h.attributes)e.remove(h.attributes[g]);for(let g in h.morphAttributes){let x=h.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)e.remove(x[m])}h.removeEventListener("dispose",s),delete r[h.id];let f=o.get(h);f&&(e.remove(f),o.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return r[h.id]===!0||(h.addEventListener("dispose",s),r[h.id]=!0,t.memory.geometries++),h}function c(d){let h=d.attributes;for(let g in h)e.update(h[g],i.ARRAY_BUFFER);let f=d.morphAttributes;for(let g in f){let x=f[g];for(let m=0,p=x.length;m<p;m++)e.update(x[m],i.ARRAY_BUFFER)}}function l(d){let h=[],f=d.index,g=d.attributes.position,x=0;if(f!==null){let v=f.array;x=f.version;for(let _=0,T=v.length;_<T;_+=3){let A=v[_+0],E=v[_+1],w=v[_+2];h.push(A,E,E,w,w,A)}}else if(g!==void 0){let v=g.array;x=g.version;for(let _=0,T=v.length/3-1;_<T;_+=3){let A=_+0,E=_+1,w=_+2;h.push(A,E,E,w,w,A)}}else return;let m=new(oc(h)?Go:ko)(h,1);m.version=x;let p=o.get(d);p&&e.remove(p),o.set(d,m)}function u(d){let h=o.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&l(d)}else l(d);return o.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function lx(i,e,t,n){let r=n.isWebGL2,o;function s(f){o=f}let a,c;function l(f){a=f.type,c=f.bytesPerElement}function u(f,g){i.drawElements(o,g,a,f*c),t.update(g,o,1)}function d(f,g,x){if(x===0)return;let m,p;if(r)m=i,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](o,g,a,f*c,x),t.update(g,o,x)}function h(f,g,x){if(x===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<x;p++)this.render(f[p]/c,g[p]);else{m.multiDrawElementsWEBGL(o,g,0,a,f,0,x);let p=0;for(let v=0;v<x;v++)p+=g[v];t.update(p,o,1)}}this.setMode=s,this.setIndex=l,this.render=u,this.renderInstances=d,this.renderMultiDraw=h}function ux(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,s,a){switch(t.calls++,s){case i.TRIANGLES:t.triangles+=a*(o/3);break;case i.LINES:t.lines+=a*(o/2);break;case i.LINE_STRIP:t.lines+=a*(o-1);break;case i.LINE_LOOP:t.lines+=a*o;break;case i.POINTS:t.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function xE(i,e){return i[0]-e[0]}function _E(i,e){return Math.abs(e[1])-Math.abs(i[1])}function dx(i,e,t){let n={},r=new Float32Array(8),o=new WeakMap,s=new rt,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,u,d){let h=l.morphTargetInfluences;if(e.isWebGL2===!0){let f=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=f!==void 0?f.length:0,x=o.get(u);if(x===void 0||x.count!==g){let I=function(){V.dispose(),o.delete(u),u.removeEventListener("dispose",I)};x!==void 0&&x.texture.dispose();let v=u.morphAttributes.position!==void 0,_=u.morphAttributes.normal!==void 0,T=u.morphAttributes.color!==void 0,A=u.morphAttributes.position||[],E=u.morphAttributes.normal||[],w=u.morphAttributes.color||[],P=0;v===!0&&(P=1),_===!0&&(P=2),T===!0&&(P=3);let y=u.attributes.position.count*P,M=1;y>e.maxTextureSize&&(M=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let D=new Float32Array(y*M*4*g),V=new Do(D,y,M,g);V.type=mn,V.needsUpdate=!0;let ie=P*4;for(let k=0;k<g;k++){let G=A[k],te=E[k],N=w[k],X=y*M*4*k;for(let q=0;q<G.count;q++){let Q=q*ie;v===!0&&(s.fromBufferAttribute(G,q),D[X+Q+0]=s.x,D[X+Q+1]=s.y,D[X+Q+2]=s.z,D[X+Q+3]=0),_===!0&&(s.fromBufferAttribute(te,q),D[X+Q+4]=s.x,D[X+Q+5]=s.y,D[X+Q+6]=s.z,D[X+Q+7]=0),T===!0&&(s.fromBufferAttribute(N,q),D[X+Q+8]=s.x,D[X+Q+9]=s.y,D[X+Q+10]=s.z,D[X+Q+11]=N.itemSize===4?s.w:1)}}x={count:g,texture:V,size:new Ie(y,M)},o.set(u,x),u.addEventListener("dispose",I)}let m=0;for(let v=0;v<h.length;v++)m+=h[v];let p=u.morphTargetsRelative?1:1-m;d.getUniforms().setValue(i,"morphTargetBaseInfluence",p),d.getUniforms().setValue(i,"morphTargetInfluences",h),d.getUniforms().setValue(i,"morphTargetsTexture",x.texture,t),d.getUniforms().setValue(i,"morphTargetsTextureSize",x.size)}else{let f=h===void 0?0:h.length,g=n[u.id];if(g===void 0||g.length!==f){g=[];for(let _=0;_<f;_++)g[_]=[_,0];n[u.id]=g}for(let _=0;_<f;_++){let T=g[_];T[0]=_,T[1]=h[_]}g.sort(_E);for(let _=0;_<8;_++)_<f&&g[_][1]?(a[_][0]=g[_][0],a[_][1]=g[_][1]):(a[_][0]=Number.MAX_SAFE_INTEGER,a[_][1]=0);a.sort(xE);let x=u.morphAttributes.position,m=u.morphAttributes.normal,p=0;for(let _=0;_<8;_++){let T=a[_],A=T[0],E=T[1];A!==Number.MAX_SAFE_INTEGER&&E?(x&&u.getAttribute("morphTarget"+_)!==x[A]&&u.setAttribute("morphTarget"+_,x[A]),m&&u.getAttribute("morphNormal"+_)!==m[A]&&u.setAttribute("morphNormal"+_,m[A]),r[_]=E,p+=E):(x&&u.hasAttribute("morphTarget"+_)===!0&&u.deleteAttribute("morphTarget"+_),m&&u.hasAttribute("morphNormal"+_)===!0&&u.deleteAttribute("morphNormal"+_),r[_]=0)}let v=u.morphTargetsRelative?1:1-p;d.getUniforms().setValue(i,"morphTargetBaseInfluence",v),d.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:c}}function hx(i,e,t,n){let r=new WeakMap;function o(c){let l=n.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==l&&(e.update(d),r.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){let h=c.skeleton;r.get(h)!==l&&(h.update(),r.set(h,l))}return d}function s(){r=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:o,dispose:s}}var Qo=class extends mt{constructor(e,t,n,r,o,s,a,c,l,u){if(u=u!==void 0?u:ii,u!==ii&&u!==Mi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===ii&&(n=Dn),n===void 0&&u===Mi&&(n=Wn),super(null,r,o,s,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Tt,this.minFilter=c!==void 0?c:Tt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}};var yx=new mt,vx=new Qo(1,1);vx.compareFunction=nc;var Ex=new Do,Mx=new lc,bx=new $o,fx=[],px=[],mx=new Float32Array(16),gx=new Float32Array(9),xx=new Float32Array(4);function es(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,o=fx[r];if(o===void 0&&(o=new Float32Array(r),fx[r]=o),e!==0){n.toArray(o,0);for(let s=1,a=0;s!==e;++s)a+=t,i[s].toArray(o,a)}return o}function kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Nc(i,e){let t=px[e];t===void 0&&(t=new Int32Array(e),px[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function yE(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function vE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2fv(this.addr,e),Gt(t,e)}}function EE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;i.uniform3fv(this.addr,e),Gt(t,e)}}function ME(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4fv(this.addr,e),Gt(t,e)}}function bE(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(kt(t,n))return;xx.set(n),i.uniformMatrix2fv(this.addr,!1,xx),Gt(t,n)}}function TE(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(kt(t,n))return;gx.set(n),i.uniformMatrix3fv(this.addr,!1,gx),Gt(t,n)}}function SE(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(kt(t,n))return;mx.set(n),i.uniformMatrix4fv(this.addr,!1,mx),Gt(t,n)}}function wE(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function AE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2iv(this.addr,e),Gt(t,e)}}function RE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3iv(this.addr,e),Gt(t,e)}}function CE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4iv(this.addr,e),Gt(t,e)}}function LE(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function PE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2uiv(this.addr,e),Gt(t,e)}}function IE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3uiv(this.addr,e),Gt(t,e)}}function DE(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4uiv(this.addr,e),Gt(t,e)}}function UE(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let o=this.type===i.SAMPLER_2D_SHADOW?vx:yx;t.setTexture2D(e||o,r)}function NE(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Mx,r)}function BE(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||bx,r)}function FE(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Ex,r)}function OE(i){switch(i){case 5126:return yE;case 35664:return vE;case 35665:return EE;case 35666:return ME;case 35674:return bE;case 35675:return TE;case 35676:return SE;case 5124:case 35670:return wE;case 35667:case 35671:return AE;case 35668:case 35672:return RE;case 35669:case 35673:return CE;case 5125:return LE;case 36294:return PE;case 36295:return IE;case 36296:return DE;case 35678:case 36198:case 36298:case 36306:case 35682:return UE;case 35679:case 36299:case 36307:return NE;case 35680:case 36300:case 36308:case 36293:return BE;case 36289:case 36303:case 36311:case 36292:return FE}}function HE(i,e){i.uniform1fv(this.addr,e)}function zE(i,e){let t=es(e,this.size,2);i.uniform2fv(this.addr,t)}function kE(i,e){let t=es(e,this.size,3);i.uniform3fv(this.addr,t)}function GE(i,e){let t=es(e,this.size,4);i.uniform4fv(this.addr,t)}function VE(i,e){let t=es(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function WE(i,e){let t=es(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function XE(i,e){let t=es(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function qE(i,e){i.uniform1iv(this.addr,e)}function YE(i,e){i.uniform2iv(this.addr,e)}function jE(i,e){i.uniform3iv(this.addr,e)}function KE(i,e){i.uniform4iv(this.addr,e)}function $E(i,e){i.uniform1uiv(this.addr,e)}function ZE(i,e){i.uniform2uiv(this.addr,e)}function JE(i,e){i.uniform3uiv(this.addr,e)}function QE(i,e){i.uniform4uiv(this.addr,e)}function eM(i,e,t){let n=this.cache,r=e.length,o=Nc(t,r);kt(n,o)||(i.uniform1iv(this.addr,o),Gt(n,o));for(let s=0;s!==r;++s)t.setTexture2D(e[s]||yx,o[s])}function tM(i,e,t){let n=this.cache,r=e.length,o=Nc(t,r);kt(n,o)||(i.uniform1iv(this.addr,o),Gt(n,o));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||Mx,o[s])}function nM(i,e,t){let n=this.cache,r=e.length,o=Nc(t,r);kt(n,o)||(i.uniform1iv(this.addr,o),Gt(n,o));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||bx,o[s])}function iM(i,e,t){let n=this.cache,r=e.length,o=Nc(t,r);kt(n,o)||(i.uniform1iv(this.addr,o),Gt(n,o));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||Ex,o[s])}function rM(i){switch(i){case 5126:return HE;case 35664:return zE;case 35665:return kE;case 35666:return GE;case 35674:return VE;case 35675:return WE;case 35676:return XE;case 5124:case 35670:return qE;case 35667:case 35671:return YE;case 35668:case 35672:return jE;case 35669:case 35673:return KE;case 5125:return $E;case 36294:return ZE;case 36295:return JE;case 36296:return QE;case 35678:case 36198:case 36298:case 36306:case 35682:return eM;case 35679:case 36299:case 36307:return tM;case 35680:case 36300:case 36308:case 36293:return nM;case 36289:case 36303:case 36311:case 36292:return iM}}var yd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=OE(t.type)}},vd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rM(t.type)}},Ed=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let o=0,s=r.length;o!==s;++o){let a=r[o];a.setValue(e,t[a.id],n)}}},_d=/(\w+)(\])?(\[|\.)?/g;function _x(i,e){i.seq.push(e),i.map[e.id]=e}function oM(i,e,t){let n=i.name,r=n.length;for(_d.lastIndex=0;;){let o=_d.exec(n),s=_d.lastIndex,a=o[1],c=o[2]==="]",l=o[3];if(c&&(a=a|0),l===void 0||l==="["&&s+2===r){_x(t,l===void 0?new yd(a,i,e):new vd(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new Ed(a),_x(t,d)),t=d}}}var Rr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let o=e.getActiveUniform(t,r),s=e.getUniformLocation(t,o.name);oM(o,s,this)}}setValue(e,t,n,r){let o=this.map[t];o!==void 0&&o.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let o=0,s=t.length;o!==s;++o){let a=t[o],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,o=e.length;r!==o;++r){let s=e[r];s.id in t&&n.push(s)}return n}};function Md(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var sM=37297,aM=0;function cM(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let s=r;s<o;s++){let a=s+1;n.push(`${a===e?">":" "} ${a}: ${t[s]}`)}return n.join(`
`)}function lM(i){let e=$e.getPrimaries($e.workingColorSpace),t=$e.getPrimaries(i),n;switch(e===t?n="":e===Ao&&t===wo?n="LinearDisplayP3ToLinearSRGB":e===wo&&t===Ao&&(n="LinearSRGBToLinearDisplayP3"),i){case pt:case Wr:return[n,"LinearTransferOETF"];case nt:case To:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Tx(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let s=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+cM(i.getShaderSource(e),s)}else return r}function uM(i,e){let t=lM(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function dM(i,e){let t;switch(e){case vp:t="Linear";break;case Ep:t="Reinhard";break;case Mp:t="OptimizedCineon";break;case Ha:t="ACESFilmic";break;case Tp:t="AgX";break;case bp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function hM(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ts).join(`
`)}function fM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(ts).join(`
`)}function pM(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function mM(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let o=i.getActiveAttrib(e,r),s=o.name,a=1;o.type===i.FLOAT_MAT2&&(a=2),o.type===i.FLOAT_MAT3&&(a=3),o.type===i.FLOAT_MAT4&&(a=4),t[s]={type:o.type,location:i.getAttribLocation(e,s),locationSize:a}}return t}function ts(i){return i!==""}function Sx(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function wx(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var gM=/^[ \t]*#include +<([\w\d./]+)>/gm;function bd(i){return i.replace(gM,_M)}var xM=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function _M(i,e){let t=qe[e];if(t===void 0){let n=xM.get(e);if(n!==void 0)t=qe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return bd(t)}var yM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ax(i){return i.replace(yM,vM)}function vM(i,e,t,n){let r="";for(let o=parseInt(e);o<parseInt(t);o++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function Rx(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function EM(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Fa?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===jf?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ei&&(e="SHADOWMAP_TYPE_VSM"),e}function MM(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ti:case Ei:e="ENVMAP_TYPE_CUBE";break;case pr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function bM(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Ei&&(e="ENVMAP_MODE_REFRACTION"),e}function TM(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Oa:e="ENVMAP_BLENDING_MULTIPLY";break;case _p:e="ENVMAP_BLENDING_MIX";break;case yp:e="ENVMAP_BLENDING_ADD";break}return e}function SM(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Cx(i,e,t,n){let r=i.getContext(),o=t.defines,s=t.vertexShader,a=t.fragmentShader,c=EM(t),l=MM(t),u=bM(t),d=TM(t),h=SM(t),f=t.isWebGL2?"":hM(t),g=fM(t),x=pM(o),m=r.createProgram(),p,v,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(ts).join(`
`),p.length>0&&(p+=`
`),v=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(ts).join(`
`),v.length>0&&(v+=`
`)):(p=[Rx(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ts).join(`
`),v=[f,Rx(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gn?"#define TONE_MAPPING":"",t.toneMapping!==Gn?qe.tonemapping_pars_fragment:"",t.toneMapping!==Gn?dM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,uM("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ts).join(`
`)),s=bd(s),s=Sx(s,t),s=wx(s,t),a=bd(a),a=Sx(a,t),a=wx(a,t),s=Ax(s),a=Ax(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===$u?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===$u?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);let T=_+p+s,A=_+v+a,E=Md(r,r.VERTEX_SHADER,T),w=Md(r,r.FRAGMENT_SHADER,A);r.attachShader(m,E),r.attachShader(m,w),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function P(V){if(i.debug.checkShaderErrors){let ie=r.getProgramInfoLog(m).trim(),I=r.getShaderInfoLog(E).trim(),k=r.getShaderInfoLog(w).trim(),G=!0,te=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,m,E,w);else{let N=Tx(r,E,"vertex"),X=Tx(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+ie+`
`+N+`
`+X)}else ie!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ie):(I===""||k==="")&&(te=!1);te&&(V.diagnostics={runnable:G,programLog:ie,vertexShader:{log:I,prefix:p},fragmentShader:{log:k,prefix:v}})}r.deleteShader(E),r.deleteShader(w),y=new Rr(r,m),M=mM(r,m)}let y;this.getUniforms=function(){return y===void 0&&P(this),y};let M;this.getAttributes=function(){return M===void 0&&P(this),M};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=r.getProgramParameter(m,sM)),D},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=aM++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=E,this.fragmentShader=w,this}var wM=0,Bc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),o=this._getShaderStage(n),s=this._getShaderCacheForMaterial(e);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(o)===!1&&(s.add(o),o.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Td(e),t.set(e,n)),n}},Td=class{constructor(e){this.id=wM++,this.code=e,this.usedTimes=0}};function Lx(i,e,t,n,r,o,s){let a=new Tr,c=new Bc,l=[],u=r.isWebGL2,d=r.logarithmicDepthBuffer,h=r.vertexTextures,f=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return y===0?"uv":`uv${y}`}function m(y,M,D,V,ie){let I=V.fog,k=ie.geometry,G=y.isMeshStandardMaterial?V.environment:null,te=(y.isMeshStandardMaterial?t:e).get(y.envMap||G),N=te&&te.mapping===pr?te.image.height:null,X=g[y.type];y.precision!==null&&(f=r.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));let q=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Q=q!==void 0?q.length:0,fe=0;k.morphAttributes.position!==void 0&&(fe=1),k.morphAttributes.normal!==void 0&&(fe=2),k.morphAttributes.color!==void 0&&(fe=3);let H,Z,me,j;if(X){let fn=Kn[X];H=fn.vertexShader,Z=fn.fragmentShader}else H=y.vertexShader,Z=y.fragmentShader,c.update(y),me=c.getVertexShaderID(y),j=c.getFragmentShaderID(y);let W=i.getRenderTarget(),ee=ie.isInstancedMesh===!0,ce=ie.isBatchedMesh===!0,pe=!!y.map,$=!!y.matcap,S=!!te,J=!!y.aoMap,U=!!y.lightMap,O=!!y.bumpMap,B=!!y.normalMap,le=!!y.displacementMap,xe=!!y.emissiveMap,R=!!y.metalnessMap,b=!!y.roughnessMap,z=y.anisotropy>0,se=y.clearcoat>0,ue=y.iridescence>0,de=y.sheen>0,ve=y.transmission>0,_e=z&&!!y.anisotropyMap,ye=se&&!!y.clearcoatMap,De=se&&!!y.clearcoatNormalMap,Se=se&&!!y.clearcoatRoughnessMap,Y=ue&&!!y.iridescenceMap,Le=ue&&!!y.iridescenceThicknessMap,Re=de&&!!y.sheenColorMap,Pe=de&&!!y.sheenRoughnessMap,Te=!!y.specularMap,be=!!y.specularColorMap,Ne=!!y.specularIntensityMap,Ye=ve&&!!y.transmissionMap,at=ve&&!!y.thicknessMap,He=!!y.gradientMap,Ee=!!y.alphaMap,F=y.alphaTest>0,we=!!y.alphaHash,Ae=!!y.extensions,ke=!!k.attributes.uv1,Fe=!!k.attributes.uv2,_t=!!k.attributes.uv3,yt=Gn;return y.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(yt=i.toneMapping),{isWebGL2:u,shaderID:X,shaderType:y.type,shaderName:y.name,vertexShader:H,fragmentShader:Z,defines:y.defines,customVertexShaderID:me,customFragmentShaderID:j,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:ce,instancing:ee,instancingColor:ee&&ie.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:W===null?i.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:pt,map:pe,matcap:$,envMap:S,envMapMode:S&&te.mapping,envMapCubeUVHeight:N,aoMap:J,lightMap:U,bumpMap:O,normalMap:B,displacementMap:h&&le,emissiveMap:xe,normalMapObjectSpace:B&&y.normalMapType===Fp,normalMapTangentSpace:B&&y.normalMapType===tc,metalnessMap:R,roughnessMap:b,anisotropy:z,anisotropyMap:_e,clearcoat:se,clearcoatMap:ye,clearcoatNormalMap:De,clearcoatRoughnessMap:Se,iridescence:ue,iridescenceMap:Y,iridescenceThicknessMap:Le,sheen:de,sheenColorMap:Re,sheenRoughnessMap:Pe,specularMap:Te,specularColorMap:be,specularIntensityMap:Ne,transmission:ve,transmissionMap:Ye,thicknessMap:at,gradientMap:He,opaque:y.transparent===!1&&y.blending===Oi,alphaMap:Ee,alphaTest:F,alphaHash:we,combine:y.combine,mapUv:pe&&x(y.map.channel),aoMapUv:J&&x(y.aoMap.channel),lightMapUv:U&&x(y.lightMap.channel),bumpMapUv:O&&x(y.bumpMap.channel),normalMapUv:B&&x(y.normalMap.channel),displacementMapUv:le&&x(y.displacementMap.channel),emissiveMapUv:xe&&x(y.emissiveMap.channel),metalnessMapUv:R&&x(y.metalnessMap.channel),roughnessMapUv:b&&x(y.roughnessMap.channel),anisotropyMapUv:_e&&x(y.anisotropyMap.channel),clearcoatMapUv:ye&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:De&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:Le&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&x(y.sheenRoughnessMap.channel),specularMapUv:Te&&x(y.specularMap.channel),specularColorMapUv:be&&x(y.specularColorMap.channel),specularIntensityMapUv:Ne&&x(y.specularIntensityMap.channel),transmissionMapUv:Ye&&x(y.transmissionMap.channel),thicknessMapUv:at&&x(y.thicknessMap.channel),alphaMapUv:Ee&&x(y.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(B||z),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUv1s:ke,vertexUv2s:Fe,vertexUv3s:_t,pointsUvs:ie.isPoints===!0&&!!k.attributes.uv&&(pe||Ee),fog:!!I,useFog:y.fog===!0,fogExp2:I&&I.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:ie.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:fe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:yt,useLegacyLights:i._useLegacyLights,decodeVideoTexture:pe&&y.map.isVideoTexture===!0&&$e.getTransfer(y.map.colorSpace)===ct,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===It,flipSided:y.side===bt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:Ae&&y.extensions.derivatives===!0,extensionFragDepth:Ae&&y.extensions.fragDepth===!0,extensionDrawBuffers:Ae&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:Ae&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Ae&&y.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function p(y){let M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(let D in y.defines)M.push(D),M.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(v(M,y),_(M,y),M.push(i.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function v(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapCubeUVHeight),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.morphAttributeCount),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function _(y,M){a.disableAll(),M.isWebGL2&&a.enable(0),M.supportsVertexTextures&&a.enable(1),M.instancing&&a.enable(2),M.instancingColor&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),y.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.skinning&&a.enable(4),M.morphTargets&&a.enable(5),M.morphNormals&&a.enable(6),M.morphColors&&a.enable(7),M.premultipliedAlpha&&a.enable(8),M.shadowMapEnabled&&a.enable(9),M.useLegacyLights&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),y.push(a.mask)}function T(y){let M=g[y.type],D;if(M){let V=Kn[M];D=dm.clone(V.uniforms)}else D=y.uniforms;return D}function A(y,M){let D;for(let V=0,ie=l.length;V<ie;V++){let I=l[V];if(I.cacheKey===M){D=I,++D.usedTimes;break}}return D===void 0&&(D=new Cx(i,M,y,o),l.push(D)),D}function E(y){if(--y.usedTimes===0){let M=l.indexOf(y);l[M]=l[l.length-1],l.pop(),y.destroy()}}function w(y){c.remove(y)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:T,acquireProgram:A,releaseProgram:E,releaseShaderCache:w,programs:l,dispose:P}}function Px(){let i=new WeakMap;function e(o){let s=i.get(o);return s===void 0&&(s={},i.set(o,s)),s}function t(o){i.delete(o)}function n(o,s,a){i.get(o)[s]=a}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function AM(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Ix(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Dx(){let i=[],e=0,t=[],n=[],r=[];function o(){e=0,t.length=0,n.length=0,r.length=0}function s(d,h,f,g,x,m){let p=i[e];return p===void 0?(p={id:d.id,object:d,geometry:h,material:f,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},i[e]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=x,p.group=m),e++,p}function a(d,h,f,g,x,m){let p=s(d,h,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?r.push(p):t.push(p)}function c(d,h,f,g,x,m){let p=s(d,h,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?r.unshift(p):t.unshift(p)}function l(d,h){t.length>1&&t.sort(d||AM),n.length>1&&n.sort(h||Ix),r.length>1&&r.sort(h||Ix)}function u(){for(let d=e,h=i.length;d<h;d++){let f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:r,init:o,push:a,unshift:c,finish:u,sort:l}}function Ux(){let i=new WeakMap;function e(n,r){let o=i.get(n),s;return o===void 0?(s=new Dx,i.set(n,[s])):r>=o.length?(s=new Dx,o.push(s)):s=o[r],s}function t(){i=new WeakMap}return{get:e,dispose:t}}function RM(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new ge};break;case"SpotLight":t={position:new L,direction:new L,color:new ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new ge,groundColor:new ge};break;case"RectAreaLight":t={color:new ge,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function CM(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var LM=0;function PM(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Nx(i,e){let t=new RM,n=CM(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new L);let o=new L,s=new Ue,a=new Ue;function c(u,d){let h=0,f=0,g=0;for(let V=0;V<9;V++)r.probe[V].set(0,0,0);let x=0,m=0,p=0,v=0,_=0,T=0,A=0,E=0,w=0,P=0,y=0;u.sort(PM);let M=d===!0?Math.PI:1;for(let V=0,ie=u.length;V<ie;V++){let I=u[V],k=I.color,G=I.intensity,te=I.distance,N=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=k.r*G*M,f+=k.g*G*M,g+=k.b*G*M;else if(I.isLightProbe){for(let X=0;X<9;X++)r.probe[X].addScaledVector(I.sh.coefficients[X],G);y++}else if(I.isDirectionalLight){let X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity*M),I.castShadow){let q=I.shadow,Q=n.get(I);Q.shadowBias=q.bias,Q.shadowNormalBias=q.normalBias,Q.shadowRadius=q.radius,Q.shadowMapSize=q.mapSize,r.directionalShadow[x]=Q,r.directionalShadowMap[x]=N,r.directionalShadowMatrix[x]=I.shadow.matrix,T++}r.directional[x]=X,x++}else if(I.isSpotLight){let X=t.get(I);X.position.setFromMatrixPosition(I.matrixWorld),X.color.copy(k).multiplyScalar(G*M),X.distance=te,X.coneCos=Math.cos(I.angle),X.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),X.decay=I.decay,r.spot[p]=X;let q=I.shadow;if(I.map&&(r.spotLightMap[w]=I.map,w++,q.updateMatrices(I),I.castShadow&&P++),r.spotLightMatrix[p]=q.matrix,I.castShadow){let Q=n.get(I);Q.shadowBias=q.bias,Q.shadowNormalBias=q.normalBias,Q.shadowRadius=q.radius,Q.shadowMapSize=q.mapSize,r.spotShadow[p]=Q,r.spotShadowMap[p]=N,E++}p++}else if(I.isRectAreaLight){let X=t.get(I);X.color.copy(k).multiplyScalar(G),X.halfWidth.set(I.width*.5,0,0),X.halfHeight.set(0,I.height*.5,0),r.rectArea[v]=X,v++}else if(I.isPointLight){let X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity*M),X.distance=I.distance,X.decay=I.decay,I.castShadow){let q=I.shadow,Q=n.get(I);Q.shadowBias=q.bias,Q.shadowNormalBias=q.normalBias,Q.shadowRadius=q.radius,Q.shadowMapSize=q.mapSize,Q.shadowCameraNear=q.camera.near,Q.shadowCameraFar=q.camera.far,r.pointShadow[m]=Q,r.pointShadowMap[m]=N,r.pointShadowMatrix[m]=I.shadow.matrix,A++}r.point[m]=X,m++}else if(I.isHemisphereLight){let X=t.get(I);X.skyColor.copy(I.color).multiplyScalar(G*M),X.groundColor.copy(I.groundColor).multiplyScalar(G*M),r.hemi[_]=X,_++}}v>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Me.LTC_FLOAT_1,r.rectAreaLTC2=Me.LTC_FLOAT_2):(r.rectAreaLTC1=Me.LTC_HALF_1,r.rectAreaLTC2=Me.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Me.LTC_FLOAT_1,r.rectAreaLTC2=Me.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=Me.LTC_HALF_1,r.rectAreaLTC2=Me.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=f,r.ambient[2]=g;let D=r.hash;(D.directionalLength!==x||D.pointLength!==m||D.spotLength!==p||D.rectAreaLength!==v||D.hemiLength!==_||D.numDirectionalShadows!==T||D.numPointShadows!==A||D.numSpotShadows!==E||D.numSpotMaps!==w||D.numLightProbes!==y)&&(r.directional.length=x,r.spot.length=p,r.rectArea.length=v,r.point.length=m,r.hemi.length=_,r.directionalShadow.length=T,r.directionalShadowMap.length=T,r.pointShadow.length=A,r.pointShadowMap.length=A,r.spotShadow.length=E,r.spotShadowMap.length=E,r.directionalShadowMatrix.length=T,r.pointShadowMatrix.length=A,r.spotLightMatrix.length=E+w-P,r.spotLightMap.length=w,r.numSpotLightShadowsWithMaps=P,r.numLightProbes=y,D.directionalLength=x,D.pointLength=m,D.spotLength=p,D.rectAreaLength=v,D.hemiLength=_,D.numDirectionalShadows=T,D.numPointShadows=A,D.numSpotShadows=E,D.numSpotMaps=w,D.numLightProbes=y,r.version=LM++)}function l(u,d){let h=0,f=0,g=0,x=0,m=0,p=d.matrixWorldInverse;for(let v=0,_=u.length;v<_;v++){let T=u[v];if(T.isDirectionalLight){let A=r.directional[h];A.direction.setFromMatrixPosition(T.matrixWorld),o.setFromMatrixPosition(T.target.matrixWorld),A.direction.sub(o),A.direction.transformDirection(p),h++}else if(T.isSpotLight){let A=r.spot[g];A.position.setFromMatrixPosition(T.matrixWorld),A.position.applyMatrix4(p),A.direction.setFromMatrixPosition(T.matrixWorld),o.setFromMatrixPosition(T.target.matrixWorld),A.direction.sub(o),A.direction.transformDirection(p),g++}else if(T.isRectAreaLight){let A=r.rectArea[x];A.position.setFromMatrixPosition(T.matrixWorld),A.position.applyMatrix4(p),a.identity(),s.copy(T.matrixWorld),s.premultiply(p),a.extractRotation(s),A.halfWidth.set(T.width*.5,0,0),A.halfHeight.set(0,T.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),x++}else if(T.isPointLight){let A=r.point[f];A.position.setFromMatrixPosition(T.matrixWorld),A.position.applyMatrix4(p),f++}else if(T.isHemisphereLight){let A=r.hemi[m];A.direction.setFromMatrixPosition(T.matrixWorld),A.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:r}}function Bx(i,e){let t=new Nx(i,e),n=[],r=[];function o(){n.length=0,r.length=0}function s(d){n.push(d)}function a(d){r.push(d)}function c(d){t.setup(n,d)}function l(d){t.setupView(n,d)}return{init:o,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:c,setupLightsView:l,pushLight:s,pushShadow:a}}function Fx(i,e){let t=new WeakMap;function n(o,s=0){let a=t.get(o),c;return a===void 0?(c=new Bx(i,e),t.set(o,[c])):s>=a.length?(c=new Bx(i,e),a.push(c)):c=a[s],c}function r(){t=new WeakMap}return{get:n,dispose:r}}var Fc=class extends Dt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Np,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}};var Oc=class extends Dt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Ox=`
void main() {

	gl_Position = vec4( position, 1.0 );

}
`,Hx=`
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
`;function zx(i,e,t){let n=new wr,r=new Ie,o=new Ie,s=new rt,a=new Fc({depthPacking:Bp}),c=new Oc,l={},u=t.maxTextureSize,d={[Zt]:bt,[bt]:Zt,[It]:It},h=new un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ie},radius:{value:4}},vertexShader:Ox,fragmentShader:Hx}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let g=new Je;g.setAttribute("position",new Ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ge(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fa;let p=this.type;this.render=function(E,w,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;let y=i.getRenderTarget(),M=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),V=i.state;V.setBlending(kn),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);let ie=p!==ei&&this.type===ei,I=p===ei&&this.type!==ei;for(let k=0,G=E.length;k<G;k++){let te=E[k],N=te.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;r.copy(N.mapSize);let X=N.getFrameExtents();if(r.multiply(X),o.copy(N.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(o.x=Math.floor(u/X.x),r.x=o.x*X.x,N.mapSize.x=o.x),r.y>u&&(o.y=Math.floor(u/X.y),r.y=o.y*X.y,N.mapSize.y=o.y)),N.map===null||ie===!0||I===!0){let Q=this.type!==ei?{minFilter:Tt,magFilter:Tt}:{};N.map!==null&&N.map.dispose(),N.map=new bn(r.x,r.y,Q),N.map.texture.name=te.name+".shadowMap",N.camera.updateProjectionMatrix()}i.setRenderTarget(N.map),i.clear();let q=N.getViewportCount();for(let Q=0;Q<q;Q++){let fe=N.getViewport(Q);s.set(o.x*fe.x,o.y*fe.y,o.x*fe.z,o.y*fe.w),V.viewport(s),N.updateMatrices(te,Q),n=N.getFrustum(),T(w,P,N.camera,te,this.type)}N.isPointLightShadow!==!0&&this.type===ei&&v(N,P),N.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(y,M,D)};function v(E,w){let P=e.update(x);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new bn(r.x,r.y)),h.uniforms.shadow_pass.value=E.map.texture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(w,null,P,h,x,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(w,null,P,f,x,null)}function _(E,w,P,y){let M=null,D=P.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(D!==void 0)M=D;else if(M=P.isPointLight===!0?c:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){let V=M.uuid,ie=w.uuid,I=l[V];I===void 0&&(I={},l[V]=I);let k=I[ie];k===void 0&&(k=M.clone(),I[ie]=k,w.addEventListener("dispose",A)),M=k}if(M.visible=w.visible,M.wireframe=w.wireframe,y===ei?M.side=w.shadowSide!==null?w.shadowSide:w.side:M.side=w.shadowSide!==null?w.shadowSide:d[w.side],M.alphaMap=w.alphaMap,M.alphaTest=w.alphaTest,M.map=w.map,M.clipShadows=w.clipShadows,M.clippingPlanes=w.clippingPlanes,M.clipIntersection=w.clipIntersection,M.displacementMap=w.displacementMap,M.displacementScale=w.displacementScale,M.displacementBias=w.displacementBias,M.wireframeLinewidth=w.wireframeLinewidth,M.linewidth=w.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let V=i.properties.get(M);V.light=P}return M}function T(E,w,P,y,M){if(E.visible===!1)return;if(E.layers.test(w.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&M===ei)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,E.matrixWorld);let ie=e.update(E),I=E.material;if(Array.isArray(I)){let k=ie.groups;for(let G=0,te=k.length;G<te;G++){let N=k[G],X=I[N.materialIndex];if(X&&X.visible){let q=_(E,X,y,M);E.onBeforeShadow(i,E,w,P,ie,q,N),i.renderBufferDirect(P,null,ie,q,E,N),E.onAfterShadow(i,E,w,P,ie,q,N)}}}else if(I.visible){let k=_(E,I,y,M);E.onBeforeShadow(i,E,w,P,ie,k,null),i.renderBufferDirect(P,null,ie,k,E,null),E.onAfterShadow(i,E,w,P,ie,k,null)}}let V=E.children;for(let ie=0,I=V.length;ie<I;ie++)T(V[ie],w,P,y,M)}function A(E){E.target.removeEventListener("dispose",A);for(let P in l){let y=l[P],M=E.target.uuid;M in y&&(y[M].dispose(),delete y[M])}}}function kx(i,e,t){let n=t.isWebGL2;function r(){let F=!1,we=new rt,Ae=null,ke=new rt(0,0,0,0);return{setMask:function(Fe){Ae!==Fe&&!F&&(i.colorMask(Fe,Fe,Fe,Fe),Ae=Fe)},setLocked:function(Fe){F=Fe},setClear:function(Fe,_t,yt,Kt,fn){fn===!0&&(Fe*=Kt,_t*=Kt,yt*=Kt),we.set(Fe,_t,yt,Kt),ke.equals(we)===!1&&(i.clearColor(Fe,_t,yt,Kt),ke.copy(we))},reset:function(){F=!1,Ae=null,ke.set(-1,0,0,0)}}}function o(){let F=!1,we=null,Ae=null,ke=null;return{setTest:function(Fe){Fe?ce(i.DEPTH_TEST):pe(i.DEPTH_TEST)},setMask:function(Fe){we!==Fe&&!F&&(i.depthMask(Fe),we=Fe)},setFunc:function(Fe){if(Ae!==Fe){switch(Fe){case dp:i.depthFunc(i.NEVER);break;case hp:i.depthFunc(i.ALWAYS);break;case fp:i.depthFunc(i.LESS);break;case vo:i.depthFunc(i.LEQUAL);break;case pp:i.depthFunc(i.EQUAL);break;case mp:i.depthFunc(i.GEQUAL);break;case gp:i.depthFunc(i.GREATER);break;case xp:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ae=Fe}},setLocked:function(Fe){F=Fe},setClear:function(Fe){ke!==Fe&&(i.clearDepth(Fe),ke=Fe)},reset:function(){F=!1,we=null,Ae=null,ke=null}}}function s(){let F=!1,we=null,Ae=null,ke=null,Fe=null,_t=null,yt=null,Kt=null,fn=null;return{setTest:function(vt){F||(vt?ce(i.STENCIL_TEST):pe(i.STENCIL_TEST))},setMask:function(vt){we!==vt&&!F&&(i.stencilMask(vt),we=vt)},setFunc:function(vt,pn,vi){(Ae!==vt||ke!==pn||Fe!==vi)&&(i.stencilFunc(vt,pn,vi),Ae=vt,ke=pn,Fe=vi)},setOp:function(vt,pn,vi){(_t!==vt||yt!==pn||Kt!==vi)&&(i.stencilOp(vt,pn,vi),_t=vt,yt=pn,Kt=vi)},setLocked:function(vt){F=vt},setClear:function(vt){fn!==vt&&(i.clearStencil(vt),fn=vt)},reset:function(){F=!1,we=null,Ae=null,ke=null,Fe=null,_t=null,yt=null,Kt=null,fn=null}}}let a=new r,c=new o,l=new s,u=new WeakMap,d=new WeakMap,h={},f={},g=new WeakMap,x=[],m=null,p=!1,v=null,_=null,T=null,A=null,E=null,w=null,P=null,y=new ge(0,0,0),M=0,D=!1,V=null,ie=null,I=null,k=null,G=null,te=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,X=0,q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(q)[1]),N=X>=1):q.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),N=X>=2);let Q=null,fe={},H=i.getParameter(i.SCISSOR_BOX),Z=i.getParameter(i.VIEWPORT),me=new rt().fromArray(H),j=new rt().fromArray(Z);function W(F,we,Ae,ke){let Fe=new Uint8Array(4),_t=i.createTexture();i.bindTexture(F,_t),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let yt=0;yt<Ae;yt++)n&&(F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY)?i.texImage3D(we,0,i.RGBA,1,1,ke,0,i.RGBA,i.UNSIGNED_BYTE,Fe):i.texImage2D(we+yt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Fe);return _t}let ee={};ee[i.TEXTURE_2D]=W(i.TEXTURE_2D,i.TEXTURE_2D,1),ee[i.TEXTURE_CUBE_MAP]=W(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(ee[i.TEXTURE_2D_ARRAY]=W(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ee[i.TEXTURE_3D]=W(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),ce(i.DEPTH_TEST),c.setFunc(vo),xe(!1),R(pu),ce(i.CULL_FACE),B(kn);function ce(F){h[F]!==!0&&(i.enable(F),h[F]=!0)}function pe(F){h[F]!==!1&&(i.disable(F),h[F]=!1)}function $(F,we){return f[F]!==we?(i.bindFramebuffer(F,we),f[F]=we,n&&(F===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=we),F===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=we)),!0):!1}function S(F,we){let Ae=x,ke=!1;if(F)if(Ae=g.get(we),Ae===void 0&&(Ae=[],g.set(we,Ae)),F.isWebGLMultipleRenderTargets){let Fe=F.texture;if(Ae.length!==Fe.length||Ae[0]!==i.COLOR_ATTACHMENT0){for(let _t=0,yt=Fe.length;_t<yt;_t++)Ae[_t]=i.COLOR_ATTACHMENT0+_t;Ae.length=Fe.length,ke=!0}}else Ae[0]!==i.COLOR_ATTACHMENT0&&(Ae[0]=i.COLOR_ATTACHMENT0,ke=!0);else Ae[0]!==i.BACK&&(Ae[0]=i.BACK,ke=!0);ke&&(t.isWebGL2?i.drawBuffers(Ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Ae))}function J(F){return m!==F?(i.useProgram(F),m=F,!0):!1}let U={[Hi]:i.FUNC_ADD,[$f]:i.FUNC_SUBTRACT,[Zf]:i.FUNC_REVERSE_SUBTRACT};if(n)U[gu]=i.MIN,U[xu]=i.MAX;else{let F=e.get("EXT_blend_minmax");F!==null&&(U[gu]=F.MIN_EXT,U[xu]=F.MAX_EXT)}let O={[Jf]:i.ZERO,[Qf]:i.ONE,[ep]:i.SRC_COLOR,[Bs]:i.SRC_ALPHA,[sp]:i.SRC_ALPHA_SATURATE,[rp]:i.DST_COLOR,[np]:i.DST_ALPHA,[tp]:i.ONE_MINUS_SRC_COLOR,[Fs]:i.ONE_MINUS_SRC_ALPHA,[op]:i.ONE_MINUS_DST_COLOR,[ip]:i.ONE_MINUS_DST_ALPHA,[ap]:i.CONSTANT_COLOR,[cp]:i.ONE_MINUS_CONSTANT_COLOR,[lp]:i.CONSTANT_ALPHA,[up]:i.ONE_MINUS_CONSTANT_ALPHA};function B(F,we,Ae,ke,Fe,_t,yt,Kt,fn,vt){if(F===kn){p===!0&&(pe(i.BLEND),p=!1);return}if(p===!1&&(ce(i.BLEND),p=!0),F!==Kf){if(F!==v||vt!==D){if((_!==Hi||E!==Hi)&&(i.blendEquation(i.FUNC_ADD),_=Hi,E=Hi),vt)switch(F){case Oi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fr:i.blendFunc(i.ONE,i.ONE);break;case mu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ns:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Oi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fr:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case mu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ns:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}T=null,A=null,w=null,P=null,y.set(0,0,0),M=0,v=F,D=vt}return}Fe=Fe||we,_t=_t||Ae,yt=yt||ke,(we!==_||Fe!==E)&&(i.blendEquationSeparate(U[we],U[Fe]),_=we,E=Fe),(Ae!==T||ke!==A||_t!==w||yt!==P)&&(i.blendFuncSeparate(O[Ae],O[ke],O[_t],O[yt]),T=Ae,A=ke,w=_t,P=yt),(Kt.equals(y)===!1||fn!==M)&&(i.blendColor(Kt.r,Kt.g,Kt.b,fn),y.copy(Kt),M=fn),v=F,D=!1}function le(F,we){F.side===It?pe(i.CULL_FACE):ce(i.CULL_FACE);let Ae=F.side===bt;we&&(Ae=!Ae),xe(Ae),F.blending===Oi&&F.transparent===!1?B(kn):B(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),c.setFunc(F.depthFunc),c.setTest(F.depthTest),c.setMask(F.depthWrite),a.setMask(F.colorWrite);let ke=F.stencilWrite;l.setTest(ke),ke&&(l.setMask(F.stencilWriteMask),l.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),l.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),z(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ce(i.SAMPLE_ALPHA_TO_COVERAGE):pe(i.SAMPLE_ALPHA_TO_COVERAGE)}function xe(F){V!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),V=F)}function R(F){F!==qf?(ce(i.CULL_FACE),F!==ie&&(F===pu?i.cullFace(i.BACK):F===Yf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pe(i.CULL_FACE),ie=F}function b(F){F!==I&&(N&&i.lineWidth(F),I=F)}function z(F,we,Ae){F?(ce(i.POLYGON_OFFSET_FILL),(k!==we||G!==Ae)&&(i.polygonOffset(we,Ae),k=we,G=Ae)):pe(i.POLYGON_OFFSET_FILL)}function se(F){F?ce(i.SCISSOR_TEST):pe(i.SCISSOR_TEST)}function ue(F){F===void 0&&(F=i.TEXTURE0+te-1),Q!==F&&(i.activeTexture(F),Q=F)}function de(F,we,Ae){Ae===void 0&&(Q===null?Ae=i.TEXTURE0+te-1:Ae=Q);let ke=fe[Ae];ke===void 0&&(ke={type:void 0,texture:void 0},fe[Ae]=ke),(ke.type!==F||ke.texture!==we)&&(Q!==Ae&&(i.activeTexture(Ae),Q=Ae),i.bindTexture(F,we||ee[F]),ke.type=F,ke.texture=we)}function ve(){let F=fe[Q];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function _e(){try{i.compressedTexImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ye(){try{i.compressedTexImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function De(){try{i.texSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Se(){try{i.texSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Y(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Le(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Re(){try{i.texStorage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Pe(){try{i.texStorage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Te(){try{i.texImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function be(){try{i.texImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ne(F){me.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),me.copy(F))}function Ye(F){j.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),j.copy(F))}function at(F,we){let Ae=d.get(we);Ae===void 0&&(Ae=new WeakMap,d.set(we,Ae));let ke=Ae.get(F);ke===void 0&&(ke=i.getUniformBlockIndex(we,F.name),Ae.set(F,ke))}function He(F,we){let ke=d.get(we).get(F);u.get(we)!==ke&&(i.uniformBlockBinding(we,ke,F.__bindingPointIndex),u.set(we,ke))}function Ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Q=null,fe={},f={},g=new WeakMap,x=[],m=null,p=!1,v=null,_=null,T=null,A=null,E=null,w=null,P=null,y=new ge(0,0,0),M=0,D=!1,V=null,ie=null,I=null,k=null,G=null,me.set(0,0,i.canvas.width,i.canvas.height),j.set(0,0,i.canvas.width,i.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:ce,disable:pe,bindFramebuffer:$,drawBuffers:S,useProgram:J,setBlending:B,setMaterial:le,setFlipSided:xe,setCullFace:R,setLineWidth:b,setPolygonOffset:z,setScissorTest:se,activeTexture:ue,bindTexture:de,unbindTexture:ve,compressedTexImage2D:_e,compressedTexImage3D:ye,texImage2D:Te,texImage3D:be,updateUBOMapping:at,uniformBlockBinding:He,texStorage2D:Re,texStorage3D:Pe,texSubImage2D:De,texSubImage3D:Se,compressedTexSubImage2D:Y,compressedTexSubImage3D:Le,scissor:Ne,viewport:Ye,reset:Ee}}function Gx(i,e,t,n,r,o,s){let a=r.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap,d,h=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,b){return f?new OffscreenCanvas(R,b):gr("canvas")}function x(R,b,z,se){let ue=1;if((R.width>se||R.height>se)&&(ue=se/Math.max(R.width,R.height)),ue<1||b===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){let de=b?Co:Math.floor,ve=de(ue*R.width),_e=de(ue*R.height);d===void 0&&(d=g(ve,_e));let ye=z?g(ve,_e):d;return ye.width=ve,ye.height=_e,ye.getContext("2d").drawImage(R,0,0,ve,_e),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+ve+"x"+_e+")."),ye}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function m(R){return rc(R.width)&&rc(R.height)}function p(R){return a?!1:R.wrapS!==Ot||R.wrapT!==Ot||R.minFilter!==Tt&&R.minFilter!==Bt}function v(R,b){return R.generateMipmaps&&b&&R.minFilter!==Tt&&R.minFilter!==Bt}function _(R){i.generateMipmap(R)}function T(R,b,z,se,ue=!1){if(a===!1)return b;if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let de=b;if(b===i.RED&&(z===i.FLOAT&&(de=i.R32F),z===i.HALF_FLOAT&&(de=i.R16F),z===i.UNSIGNED_BYTE&&(de=i.R8)),b===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(de=i.R8UI),z===i.UNSIGNED_SHORT&&(de=i.R16UI),z===i.UNSIGNED_INT&&(de=i.R32UI),z===i.BYTE&&(de=i.R8I),z===i.SHORT&&(de=i.R16I),z===i.INT&&(de=i.R32I)),b===i.RG&&(z===i.FLOAT&&(de=i.RG32F),z===i.HALF_FLOAT&&(de=i.RG16F),z===i.UNSIGNED_BYTE&&(de=i.RG8)),b===i.RGBA){let ve=ue?So:$e.getTransfer(se);z===i.FLOAT&&(de=i.RGBA32F),z===i.HALF_FLOAT&&(de=i.RGBA16F),z===i.UNSIGNED_BYTE&&(de=ve===ct?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(de=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(de=i.RGB5_A1)}return(de===i.R16F||de===i.R32F||de===i.RG16F||de===i.RG32F||de===i.RGBA16F||de===i.RGBA32F)&&e.get("EXT_color_buffer_float"),de}function A(R,b,z){return v(R,z)===!0||R.isFramebufferTexture&&R.minFilter!==Tt&&R.minFilter!==Bt?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function E(R){return R===Tt||R===zs||R===Eo?i.NEAREST:i.LINEAR}function w(R){let b=R.target;b.removeEventListener("dispose",w),y(b),b.isVideoTexture&&u.delete(b)}function P(R){let b=R.target;b.removeEventListener("dispose",P),D(b)}function y(R){let b=n.get(R);if(b.__webglInit===void 0)return;let z=R.source,se=h.get(z);if(se){let ue=se[b.__cacheKey];ue.usedTimes--,ue.usedTimes===0&&M(R),Object.keys(se).length===0&&h.delete(z)}n.remove(R)}function M(R){let b=n.get(R);i.deleteTexture(b.__webglTexture);let z=R.source,se=h.get(z);delete se[b.__cacheKey],s.memory.textures--}function D(R){let b=R.texture,z=n.get(R),se=n.get(b);if(se.__webglTexture!==void 0&&(i.deleteTexture(se.__webglTexture),s.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let ue=0;ue<6;ue++){if(Array.isArray(z.__webglFramebuffer[ue]))for(let de=0;de<z.__webglFramebuffer[ue].length;de++)i.deleteFramebuffer(z.__webglFramebuffer[ue][de]);else i.deleteFramebuffer(z.__webglFramebuffer[ue]);z.__webglDepthbuffer&&i.deleteRenderbuffer(z.__webglDepthbuffer[ue])}else{if(Array.isArray(z.__webglFramebuffer))for(let ue=0;ue<z.__webglFramebuffer.length;ue++)i.deleteFramebuffer(z.__webglFramebuffer[ue]);else i.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&i.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&i.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let ue=0;ue<z.__webglColorRenderbuffer.length;ue++)z.__webglColorRenderbuffer[ue]&&i.deleteRenderbuffer(z.__webglColorRenderbuffer[ue]);z.__webglDepthRenderbuffer&&i.deleteRenderbuffer(z.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let ue=0,de=b.length;ue<de;ue++){let ve=n.get(b[ue]);ve.__webglTexture&&(i.deleteTexture(ve.__webglTexture),s.memory.textures--),n.remove(b[ue])}n.remove(b),n.remove(R)}let V=0;function ie(){V=0}function I(){let R=V;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),V+=1,R}function k(R){let b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function G(R,b){let z=n.get(R);if(R.isVideoTexture&&le(R),R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){let se=R.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{me(z,R,b);return}}t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+b)}function te(R,b){let z=n.get(R);if(R.version>0&&z.__version!==R.version){me(z,R,b);return}t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+b)}function N(R,b){let z=n.get(R);if(R.version>0&&z.__version!==R.version){me(z,R,b);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+b)}function X(R,b){let z=n.get(R);if(R.version>0&&z.__version!==R.version){j(z,R,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+b)}let q={[ni]:i.REPEAT,[Ot]:i.CLAMP_TO_EDGE,[Vr]:i.MIRRORED_REPEAT},Q={[Tt]:i.NEAREST,[zs]:i.NEAREST_MIPMAP_NEAREST,[Eo]:i.NEAREST_MIPMAP_LINEAR,[Bt]:i.LINEAR,[za]:i.LINEAR_MIPMAP_NEAREST,[Vn]:i.LINEAR_MIPMAP_LINEAR},fe={[Op]:i.NEVER,[Wp]:i.ALWAYS,[Hp]:i.LESS,[nc]:i.LEQUAL,[zp]:i.EQUAL,[Vp]:i.GEQUAL,[kp]:i.GREATER,[Gp]:i.NOTEQUAL};function H(R,b,z){if(z?(i.texParameteri(R,i.TEXTURE_WRAP_S,q[b.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,q[b.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,q[b.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Q[b.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Q[b.minFilter])):(i.texParameteri(R,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(R,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(b.wrapS!==Ot||b.wrapT!==Ot)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(R,i.TEXTURE_MAG_FILTER,E(b.magFilter)),i.texParameteri(R,i.TEXTURE_MIN_FILTER,E(b.minFilter)),b.minFilter!==Tt&&b.minFilter!==Bt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),b.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,fe[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let se=e.get("EXT_texture_filter_anisotropic");if(b.magFilter===Tt||b.minFilter!==Eo&&b.minFilter!==Vn||b.type===mn&&e.has("OES_texture_float_linear")===!1||a===!1&&b.type===zi&&e.has("OES_texture_half_float_linear")===!1)return;(b.anisotropy>1||n.get(b).__currentAnisotropy)&&(i.texParameterf(R,se.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy)}}function Z(R,b){let z=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",w));let se=b.source,ue=h.get(se);ue===void 0&&(ue={},h.set(se,ue));let de=k(b);if(de!==R.__cacheKey){ue[de]===void 0&&(ue[de]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,z=!0),ue[de].usedTimes++;let ve=ue[R.__cacheKey];ve!==void 0&&(ue[R.__cacheKey].usedTimes--,ve.usedTimes===0&&M(b)),R.__cacheKey=de,R.__webglTexture=ue[de].texture}return z}function me(R,b,z){let se=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(se=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(se=i.TEXTURE_3D);let ue=Z(R,b),de=b.source;t.bindTexture(se,R.__webglTexture,i.TEXTURE0+z);let ve=n.get(de);if(de.version!==ve.__version||ue===!0){t.activeTexture(i.TEXTURE0+z);let _e=$e.getPrimaries($e.workingColorSpace),ye=b.colorSpace===Jt?null:$e.getPrimaries(b.colorSpace),De=b.colorSpace===Jt||_e===ye?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);let Se=p(b)&&m(b.image)===!1,Y=x(b.image,Se,!1,r.maxTextureSize);Y=xe(b,Y);let Le=m(Y)||a,Re=o.convert(b.format,b.colorSpace),Pe=o.convert(b.type),Te=T(b.internalFormat,Re,Pe,b.colorSpace,b.isVideoTexture);H(se,b,Le);let be,Ne=b.mipmaps,Ye=a&&b.isVideoTexture!==!0&&Te!==Za,at=ve.__version===void 0||ue===!0,He=A(b,Y,Le);if(b.isDepthTexture)Te=i.DEPTH_COMPONENT,a?b.type===mn?Te=i.DEPTH_COMPONENT32F:b.type===Dn?Te=i.DEPTH_COMPONENT24:b.type===Wn?Te=i.DEPTH24_STENCIL8:Te=i.DEPTH_COMPONENT16:b.type===mn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),b.format===ii&&Te===i.DEPTH_COMPONENT&&b.type!==Mo&&b.type!==Dn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),b.type=Dn,Pe=o.convert(b.type)),b.format===Mi&&Te===i.DEPTH_COMPONENT&&(Te=i.DEPTH_STENCIL,b.type!==Wn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),b.type=Wn,Pe=o.convert(b.type))),at&&(Ye?t.texStorage2D(i.TEXTURE_2D,1,Te,Y.width,Y.height):t.texImage2D(i.TEXTURE_2D,0,Te,Y.width,Y.height,0,Re,Pe,null));else if(b.isDataTexture)if(Ne.length>0&&Le){Ye&&at&&t.texStorage2D(i.TEXTURE_2D,He,Te,Ne[0].width,Ne[0].height);for(let Ee=0,F=Ne.length;Ee<F;Ee++)be=Ne[Ee],Ye?t.texSubImage2D(i.TEXTURE_2D,Ee,0,0,be.width,be.height,Re,Pe,be.data):t.texImage2D(i.TEXTURE_2D,Ee,Te,be.width,be.height,0,Re,Pe,be.data);b.generateMipmaps=!1}else Ye?(at&&t.texStorage2D(i.TEXTURE_2D,He,Te,Y.width,Y.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Y.width,Y.height,Re,Pe,Y.data)):t.texImage2D(i.TEXTURE_2D,0,Te,Y.width,Y.height,0,Re,Pe,Y.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Ye&&at&&t.texStorage3D(i.TEXTURE_2D_ARRAY,He,Te,Ne[0].width,Ne[0].height,Y.depth);for(let Ee=0,F=Ne.length;Ee<F;Ee++)be=Ne[Ee],b.format!==Ht?Re!==null?Ye?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Ee,0,0,0,be.width,be.height,Y.depth,Re,be.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Ee,Te,be.width,be.height,Y.depth,0,be.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage3D(i.TEXTURE_2D_ARRAY,Ee,0,0,0,be.width,be.height,Y.depth,Re,Pe,be.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Ee,Te,be.width,be.height,Y.depth,0,Re,Pe,be.data)}else{Ye&&at&&t.texStorage2D(i.TEXTURE_2D,He,Te,Ne[0].width,Ne[0].height);for(let Ee=0,F=Ne.length;Ee<F;Ee++)be=Ne[Ee],b.format!==Ht?Re!==null?Ye?t.compressedTexSubImage2D(i.TEXTURE_2D,Ee,0,0,be.width,be.height,Re,be.data):t.compressedTexImage2D(i.TEXTURE_2D,Ee,Te,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage2D(i.TEXTURE_2D,Ee,0,0,be.width,be.height,Re,Pe,be.data):t.texImage2D(i.TEXTURE_2D,Ee,Te,be.width,be.height,0,Re,Pe,be.data)}else if(b.isDataArrayTexture)Ye?(at&&t.texStorage3D(i.TEXTURE_2D_ARRAY,He,Te,Y.width,Y.height,Y.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Y.width,Y.height,Y.depth,Re,Pe,Y.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,Te,Y.width,Y.height,Y.depth,0,Re,Pe,Y.data);else if(b.isData3DTexture)Ye?(at&&t.texStorage3D(i.TEXTURE_3D,He,Te,Y.width,Y.height,Y.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Y.width,Y.height,Y.depth,Re,Pe,Y.data)):t.texImage3D(i.TEXTURE_3D,0,Te,Y.width,Y.height,Y.depth,0,Re,Pe,Y.data);else if(b.isFramebufferTexture){if(at)if(Ye)t.texStorage2D(i.TEXTURE_2D,He,Te,Y.width,Y.height);else{let Ee=Y.width,F=Y.height;for(let we=0;we<He;we++)t.texImage2D(i.TEXTURE_2D,we,Te,Ee,F,0,Re,Pe,null),Ee>>=1,F>>=1}}else if(Ne.length>0&&Le){Ye&&at&&t.texStorage2D(i.TEXTURE_2D,He,Te,Ne[0].width,Ne[0].height);for(let Ee=0,F=Ne.length;Ee<F;Ee++)be=Ne[Ee],Ye?t.texSubImage2D(i.TEXTURE_2D,Ee,0,0,Re,Pe,be):t.texImage2D(i.TEXTURE_2D,Ee,Te,Re,Pe,be);b.generateMipmaps=!1}else Ye?(at&&t.texStorage2D(i.TEXTURE_2D,He,Te,Y.width,Y.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Re,Pe,Y)):t.texImage2D(i.TEXTURE_2D,0,Te,Re,Pe,Y);v(b,Le)&&_(se),ve.__version=de.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function j(R,b,z){if(b.image.length!==6)return;let se=Z(R,b),ue=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+z);let de=n.get(ue);if(ue.version!==de.__version||se===!0){t.activeTexture(i.TEXTURE0+z);let ve=$e.getPrimaries($e.workingColorSpace),_e=b.colorSpace===Jt?null:$e.getPrimaries(b.colorSpace),ye=b.colorSpace===Jt||ve===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let De=b.isCompressedTexture||b.image[0].isCompressedTexture,Se=b.image[0]&&b.image[0].isDataTexture,Y=[];for(let Ee=0;Ee<6;Ee++)!De&&!Se?Y[Ee]=x(b.image[Ee],!1,!0,r.maxCubemapSize):Y[Ee]=Se?b.image[Ee].image:b.image[Ee],Y[Ee]=xe(b,Y[Ee]);let Le=Y[0],Re=m(Le)||a,Pe=o.convert(b.format,b.colorSpace),Te=o.convert(b.type),be=T(b.internalFormat,Pe,Te,b.colorSpace),Ne=a&&b.isVideoTexture!==!0,Ye=de.__version===void 0||se===!0,at=A(b,Le,Re);H(i.TEXTURE_CUBE_MAP,b,Re);let He;if(De){Ne&&Ye&&t.texStorage2D(i.TEXTURE_CUBE_MAP,at,be,Le.width,Le.height);for(let Ee=0;Ee<6;Ee++){He=Y[Ee].mipmaps;for(let F=0;F<He.length;F++){let we=He[F];b.format!==Ht?Pe!==null?Ne?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,F,0,0,we.width,we.height,Pe,we.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,F,be,we.width,we.height,0,we.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,F,0,0,we.width,we.height,Pe,Te,we.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,F,be,we.width,we.height,0,Pe,Te,we.data)}}}else{He=b.mipmaps,Ne&&Ye&&(He.length>0&&at++,t.texStorage2D(i.TEXTURE_CUBE_MAP,at,be,Y[0].width,Y[0].height));for(let Ee=0;Ee<6;Ee++)if(Se){Ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,0,0,Y[Ee].width,Y[Ee].height,Pe,Te,Y[Ee].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,be,Y[Ee].width,Y[Ee].height,0,Pe,Te,Y[Ee].data);for(let F=0;F<He.length;F++){let Ae=He[F].image[Ee].image;Ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,F+1,0,0,Ae.width,Ae.height,Pe,Te,Ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,F+1,be,Ae.width,Ae.height,0,Pe,Te,Ae.data)}}else{Ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,0,0,Pe,Te,Y[Ee]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,be,Pe,Te,Y[Ee]);for(let F=0;F<He.length;F++){let we=He[F];Ne?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,F+1,0,0,Pe,Te,we.image[Ee]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,F+1,be,Pe,Te,we.image[Ee])}}}v(b,Re)&&_(i.TEXTURE_CUBE_MAP),de.__version=ue.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function W(R,b,z,se,ue,de){let ve=o.convert(z.format,z.colorSpace),_e=o.convert(z.type),ye=T(z.internalFormat,ve,_e,z.colorSpace);if(!n.get(b).__hasExternalTextures){let Se=Math.max(1,b.width>>de),Y=Math.max(1,b.height>>de);ue===i.TEXTURE_3D||ue===i.TEXTURE_2D_ARRAY?t.texImage3D(ue,de,ye,Se,Y,b.depth,0,ve,_e,null):t.texImage2D(ue,de,ye,Se,Y,0,ve,_e,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),B(b)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,se,ue,n.get(z).__webglTexture,0,O(b)):(ue===i.TEXTURE_2D||ue>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ue<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,se,ue,n.get(z).__webglTexture,de),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ee(R,b,z){if(i.bindRenderbuffer(i.RENDERBUFFER,R),b.depthBuffer&&!b.stencilBuffer){let se=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(z||B(b)){let ue=b.depthTexture;ue&&ue.isDepthTexture&&(ue.type===mn?se=i.DEPTH_COMPONENT32F:ue.type===Dn&&(se=i.DEPTH_COMPONENT24));let de=O(b);B(b)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,de,se,b.width,b.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,de,se,b.width,b.height)}else i.renderbufferStorage(i.RENDERBUFFER,se,b.width,b.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,R)}else if(b.depthBuffer&&b.stencilBuffer){let se=O(b);z&&B(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,se,i.DEPTH24_STENCIL8,b.width,b.height):B(b)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,se,i.DEPTH24_STENCIL8,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,R)}else{let se=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let ue=0;ue<se.length;ue++){let de=se[ue],ve=o.convert(de.format,de.colorSpace),_e=o.convert(de.type),ye=T(de.internalFormat,ve,_e,de.colorSpace),De=O(b);z&&B(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,De,ye,b.width,b.height):B(b)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,De,ye,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,ye,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ce(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),G(b.depthTexture,0);let se=n.get(b.depthTexture).__webglTexture,ue=O(b);if(b.depthTexture.format===ii)B(b)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0);else if(b.depthTexture.format===Mi)B(b)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function pe(R){let b=n.get(R),z=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");ce(b.__webglFramebuffer,R)}else if(z){b.__webglDepthbuffer=[];for(let se=0;se<6;se++)t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[se]),b.__webglDepthbuffer[se]=i.createRenderbuffer(),ee(b.__webglDepthbuffer[se],R,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer=i.createRenderbuffer(),ee(b.__webglDepthbuffer,R,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function $(R,b,z){let se=n.get(R);b!==void 0&&W(se.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&pe(R)}function S(R){let b=R.texture,z=n.get(R),se=n.get(b);R.addEventListener("dispose",P),R.isWebGLMultipleRenderTargets!==!0&&(se.__webglTexture===void 0&&(se.__webglTexture=i.createTexture()),se.__version=b.version,s.memory.textures++);let ue=R.isWebGLCubeRenderTarget===!0,de=R.isWebGLMultipleRenderTargets===!0,ve=m(R)||a;if(ue){z.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(a&&b.mipmaps&&b.mipmaps.length>0){z.__webglFramebuffer[_e]=[];for(let ye=0;ye<b.mipmaps.length;ye++)z.__webglFramebuffer[_e][ye]=i.createFramebuffer()}else z.__webglFramebuffer[_e]=i.createFramebuffer()}else{if(a&&b.mipmaps&&b.mipmaps.length>0){z.__webglFramebuffer=[];for(let _e=0;_e<b.mipmaps.length;_e++)z.__webglFramebuffer[_e]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(de)if(r.drawBuffers){let _e=R.texture;for(let ye=0,De=_e.length;ye<De;ye++){let Se=n.get(_e[ye]);Se.__webglTexture===void 0&&(Se.__webglTexture=i.createTexture(),s.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&R.samples>0&&B(R)===!1){let _e=de?b:[b];z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ye=0;ye<_e.length;ye++){let De=_e[ye];z.__webglColorRenderbuffer[ye]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[ye]);let Se=o.convert(De.format,De.colorSpace),Y=o.convert(De.type),Le=T(De.internalFormat,Se,Y,De.colorSpace,R.isXRRenderTarget===!0),Re=O(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Re,Le,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,z.__webglColorRenderbuffer[ye])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),ee(z.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ue){t.bindTexture(i.TEXTURE_CUBE_MAP,se.__webglTexture),H(i.TEXTURE_CUBE_MAP,b,ve);for(let _e=0;_e<6;_e++)if(a&&b.mipmaps&&b.mipmaps.length>0)for(let ye=0;ye<b.mipmaps.length;ye++)W(z.__webglFramebuffer[_e][ye],R,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,ye);else W(z.__webglFramebuffer[_e],R,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);v(b,ve)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){let _e=R.texture;for(let ye=0,De=_e.length;ye<De;ye++){let Se=_e[ye],Y=n.get(Se);t.bindTexture(i.TEXTURE_2D,Y.__webglTexture),H(i.TEXTURE_2D,Se,ve),W(z.__webglFramebuffer,R,Se,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,0),v(Se,ve)&&_(i.TEXTURE_2D)}t.unbindTexture()}else{let _e=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(a?_e=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(_e,se.__webglTexture),H(_e,b,ve),a&&b.mipmaps&&b.mipmaps.length>0)for(let ye=0;ye<b.mipmaps.length;ye++)W(z.__webglFramebuffer[ye],R,b,i.COLOR_ATTACHMENT0,_e,ye);else W(z.__webglFramebuffer,R,b,i.COLOR_ATTACHMENT0,_e,0);v(b,ve)&&_(_e),t.unbindTexture()}R.depthBuffer&&pe(R)}function J(R){let b=m(R)||a,z=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let se=0,ue=z.length;se<ue;se++){let de=z[se];if(v(de,b)){let ve=R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,_e=n.get(de).__webglTexture;t.bindTexture(ve,_e),_(ve),t.unbindTexture()}}}function U(R){if(a&&R.samples>0&&B(R)===!1){let b=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],z=R.width,se=R.height,ue=i.COLOR_BUFFER_BIT,de=[],ve=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=n.get(R),ye=R.isWebGLMultipleRenderTargets===!0;if(ye)for(let De=0;De<b.length;De++)t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let De=0;De<b.length;De++){de.push(i.COLOR_ATTACHMENT0+De),R.depthBuffer&&de.push(ve);let Se=_e.__ignoreDepthValues!==void 0?_e.__ignoreDepthValues:!1;if(Se===!1&&(R.depthBuffer&&(ue|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&(ue|=i.STENCIL_BUFFER_BIT)),ye&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,_e.__webglColorRenderbuffer[De]),Se===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[ve]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[ve])),ye){let Y=n.get(b[De]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Y,0)}i.blitFramebuffer(0,0,z,se,0,0,z,se,ue,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,de)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ye)for(let De=0;De<b.length;De++){t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.RENDERBUFFER,_e.__webglColorRenderbuffer[De]);let Se=n.get(b[De]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.TEXTURE_2D,Se,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}}function O(R){return Math.min(r.maxSamples,R.samples)}function B(R){let b=n.get(R);return a&&R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function le(R){let b=s.render.frame;u.get(R)!==b&&(u.set(R,b),R.update())}function xe(R,b){let z=R.colorSpace,se=R.format,ue=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===Vs||z!==pt&&z!==Jt&&($e.getTransfer(z)===ct?a===!1?e.has("EXT_sRGB")===!0&&se===Ht?(R.format=Vs,R.minFilter=Bt,R.generateMipmaps=!1):b=Po.sRGBToLinear(b):(se!==Ht||ue!==In)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),b}this.allocateTextureUnit=I,this.resetTextureUnits=ie,this.setTexture2D=G,this.setTexture2DArray=te,this.setTexture3D=N,this.setTextureCube=X,this.rebindTextures=$,this.setupRenderTarget=S,this.updateRenderTargetMipmap=J,this.updateMultisampleRenderTarget=U,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=W,this.useMultisampledRTT=B}function Vx(i,e,t){let n=t.isWebGL2;function r(o,s=Jt){let a,c=$e.getTransfer(s);if(o===In)return i.UNSIGNED_BYTE;if(o===Ga)return i.UNSIGNED_SHORT_4_4_4_4;if(o===Va)return i.UNSIGNED_SHORT_5_5_5_1;if(o===wp)return i.BYTE;if(o===Ap)return i.SHORT;if(o===Mo)return i.UNSIGNED_SHORT;if(o===ka)return i.INT;if(o===Dn)return i.UNSIGNED_INT;if(o===mn)return i.FLOAT;if(o===zi)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(o===Rp)return i.ALPHA;if(o===Ht)return i.RGBA;if(o===Cp)return i.LUMINANCE;if(o===Lp)return i.LUMINANCE_ALPHA;if(o===ii)return i.DEPTH_COMPONENT;if(o===Mi)return i.DEPTH_STENCIL;if(o===Vs)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(o===Pp)return i.RED;if(o===Wa)return i.RED_INTEGER;if(o===Ip)return i.RG;if(o===Xa)return i.RG_INTEGER;if(o===qa)return i.RGBA_INTEGER;if(o===Ya||o===ja||o===Ka||o===$a)if(c===ct)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(o===Ya)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(o===ja)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(o===Ka)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(o===$a)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(o===Ya)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(o===ja)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(o===Ka)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(o===$a)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(o===vu||o===Eu||o===Mu||o===bu)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(o===vu)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(o===Eu)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(o===Mu)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(o===bu)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(o===Za)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(o===Tu||o===Su)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(o===Tu)return c===ct?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(o===Su)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(o===wu||o===Au||o===Ru||o===Cu||o===Lu||o===Pu||o===Iu||o===Du||o===Uu||o===Nu||o===Bu||o===Fu||o===Ou||o===Hu)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(o===wu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(o===Au)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(o===Ru)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(o===Cu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(o===Lu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(o===Pu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(o===Iu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(o===Du)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(o===Uu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(o===Nu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(o===Bu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(o===Fu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(o===Ou)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(o===Hu)return c===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(o===Ja||o===zu||o===ku)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(o===Ja)return c===ct?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(o===zu)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(o===ku)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(o===Dp||o===Gu||o===Vu||o===Wu)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(o===Ja)return a.COMPRESSED_RED_RGTC1_EXT;if(o===Gu)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(o===Vu)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(o===Wu)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return o===Wn?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[o]!==void 0?i[o]:null}return{convert:r}}var Hc=class extends ft{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}};var St=class extends Xe{constructor(){super(),this.isGroup=!0,this.type="Group"}};var DM={type:"move"},ns=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new St,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new St,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new St,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,o=null,s=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&h>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&o!==null&&(r=o),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(DM)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new St;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}};var zc=class extends Mn{constructor(e,t){super();let n=this,r=null,o=1,s=null,a="local-floor",c=1,l=null,u=null,d=null,h=null,f=null,g=null,x=t.getContextAttributes(),m=null,p=null,v=[],_=[],T=new Ie,A=null,E=new ft;E.layers.enable(1),E.viewport=new rt;let w=new ft;w.layers.enable(2),w.viewport=new rt;let P=[E,w],y=new Hc;y.layers.enable(1),y.layers.enable(2);let M=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let Z=v[H];return Z===void 0&&(Z=new ns,v[H]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(H){let Z=v[H];return Z===void 0&&(Z=new ns,v[H]=Z),Z.getGripSpace()},this.getHand=function(H){let Z=v[H];return Z===void 0&&(Z=new ns,v[H]=Z),Z.getHandSpace()};function V(H){let Z=_.indexOf(H.inputSource);if(Z===-1)return;let me=v[Z];me!==void 0&&(me.update(H.inputSource,H.frame,l||s),me.dispatchEvent({type:H.type,data:H.inputSource}))}function ie(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",ie),r.removeEventListener("inputsourceschange",I);for(let H=0;H<v.length;H++){let Z=_[H];Z!==null&&(_[H]=null,v[H].disconnect(Z))}M=null,D=null,e.setRenderTarget(m),f=null,h=null,d=null,r=null,p=null,fe.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){o=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){a=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(H){l=H},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(H){if(r=H,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",ie),r.addEventListener("inputsourceschange",I),x.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(T),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let Z={antialias:r.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:o};f=new XRWebGLLayer(r,t,Z),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new bn(f.framebufferWidth,f.framebufferHeight,{format:Ht,type:In,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let Z=null,me=null,j=null;x.depth&&(j=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=x.stencil?Mi:ii,me=x.stencil?Wn:Dn);let W={colorFormat:t.RGBA8,depthFormat:j,scaleFactor:o};d=new XRWebGLBinding(r,t),h=d.createProjectionLayer(W),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),p=new bn(h.textureWidth,h.textureHeight,{format:Ht,type:In,depthTexture:new Qo(h.textureWidth,h.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});let ee=e.properties.get(p);ee.__ignoreDepthValues=h.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,s=await r.requestReferenceSpace(a),fe.setContext(r),fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function I(H){for(let Z=0;Z<H.removed.length;Z++){let me=H.removed[Z],j=_.indexOf(me);j>=0&&(_[j]=null,v[j].disconnect(me))}for(let Z=0;Z<H.added.length;Z++){let me=H.added[Z],j=_.indexOf(me);if(j===-1){for(let ee=0;ee<v.length;ee++)if(ee>=_.length){_.push(me),j=ee;break}else if(_[ee]===null){_[ee]=me,j=ee;break}if(j===-1)break}let W=v[j];W&&W.connect(me)}}let k=new L,G=new L;function te(H,Z,me){k.setFromMatrixPosition(Z.matrixWorld),G.setFromMatrixPosition(me.matrixWorld);let j=k.distanceTo(G),W=Z.projectionMatrix.elements,ee=me.projectionMatrix.elements,ce=W[14]/(W[10]-1),pe=W[14]/(W[10]+1),$=(W[9]+1)/W[5],S=(W[9]-1)/W[5],J=(W[8]-1)/W[0],U=(ee[8]+1)/ee[0],O=ce*J,B=ce*U,le=j/(-J+U),xe=le*-J;Z.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(xe),H.translateZ(le),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();let R=ce+le,b=pe+le,z=O-xe,se=B+(j-xe),ue=$*pe/b*R,de=S*pe/b*R;H.projectionMatrix.makePerspective(z,se,ue,de,R,b),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function N(H,Z){Z===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(Z.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(r===null)return;y.near=w.near=E.near=H.near,y.far=w.far=E.far=H.far,(M!==y.near||D!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),M=y.near,D=y.far);let Z=H.parent,me=y.cameras;N(y,Z);for(let j=0;j<me.length;j++)N(me[j],Z);me.length===2?te(y,E,w):y.projectionMatrix.copy(E.projectionMatrix),X(H,y,Z)};function X(H,Z,me){me===null?H.matrix.copy(Z.matrixWorld):(H.matrix.copy(me.matrixWorld),H.matrix.invert(),H.matrix.multiply(Z.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(Z.projectionMatrix),H.projectionMatrixInverse.copy(Z.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Vi*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(h===null&&f===null))return c},this.setFoveation=function(H){c=H,h!==null&&(h.fixedFoveation=H),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=H)};let q=null;function Q(H,Z){if(u=Z.getViewerPose(l||s),g=Z,u!==null){let me=u.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let j=!1;me.length!==y.cameras.length&&(y.cameras.length=0,j=!0);for(let W=0;W<me.length;W++){let ee=me[W],ce=null;if(f!==null)ce=f.getViewport(ee);else{let $=d.getViewSubImage(h,ee);ce=$.viewport,W===0&&(e.setRenderTargetTextures(p,$.colorTexture,h.ignoreDepthValues?void 0:$.depthStencilTexture),e.setRenderTarget(p))}let pe=P[W];pe===void 0&&(pe=new ft,pe.layers.enable(W),pe.viewport=new rt,P[W]=pe),pe.matrix.fromArray(ee.transform.matrix),pe.matrix.decompose(pe.position,pe.quaternion,pe.scale),pe.projectionMatrix.fromArray(ee.projectionMatrix),pe.projectionMatrixInverse.copy(pe.projectionMatrix).invert(),pe.viewport.set(ce.x,ce.y,ce.width,ce.height),W===0&&(y.matrix.copy(pe.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),j===!0&&y.cameras.push(pe)}}for(let me=0;me<v.length;me++){let j=_[me],W=v[me];j!==null&&W!==void 0&&W.update(j,Z,l||s)}q&&q(H,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}let fe=new Ic;fe.setAnimationLoop(Q),this.setAnimationLoop=function(H){q=H},this.dispose=function(){}}};function Wx(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Rc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,v,_,T){p.isMeshBasicMaterial||p.isMeshLambertMaterial?o(m,p):p.isMeshToonMaterial?(o(m,p),d(m,p)):p.isMeshPhongMaterial?(o(m,p),u(m,p)):p.isMeshStandardMaterial?(o(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,T)):p.isMeshMatcapMaterial?(o(m,p),g(m,p)):p.isMeshDepthMaterial?o(m,p):p.isMeshDistanceMaterial?(o(m,p),x(m,p)):p.isMeshNormalMaterial?o(m,p):p.isLineBasicMaterial?(s(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,v,_):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function o(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===bt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===bt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let v=e.get(p).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;let _=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*_,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function s(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=_*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===bt&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Xx(i,e,t,n){let r={},o={},s=[],a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(v,_){let T=_.program;n.uniformBlockBinding(v,T)}function l(v,_){let T=r[v.id];T===void 0&&(g(v),T=u(v),r[v.id]=T,v.addEventListener("dispose",m));let A=_.program;n.updateUBOMapping(v,A);let E=e.render.frame;o[v.id]!==E&&(h(v),o[v.id]=E)}function u(v){let _=d();v.__bindingPointIndex=_;let T=i.createBuffer(),A=v.__size,E=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,A,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,T),T}function d(){for(let v=0;v<a;v++)if(s.indexOf(v)===-1)return s.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){let _=r[v.id],T=v.uniforms,A=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let E=0,w=T.length;E<w;E++){let P=Array.isArray(T[E])?T[E]:[T[E]];for(let y=0,M=P.length;y<M;y++){let D=P[y];if(f(D,E,y,A)===!0){let V=D.__offset,ie=Array.isArray(D.value)?D.value:[D.value],I=0;for(let k=0;k<ie.length;k++){let G=ie[k],te=x(G);typeof G=="number"||typeof G=="boolean"?(D.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,V+I,D.__data)):G.isMatrix3?(D.__data[0]=G.elements[0],D.__data[1]=G.elements[1],D.__data[2]=G.elements[2],D.__data[3]=0,D.__data[4]=G.elements[3],D.__data[5]=G.elements[4],D.__data[6]=G.elements[5],D.__data[7]=0,D.__data[8]=G.elements[6],D.__data[9]=G.elements[7],D.__data[10]=G.elements[8],D.__data[11]=0):(G.toArray(D.__data,I),I+=te.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,_,T,A){let E=v.value,w=_+"_"+T;if(A[w]===void 0)return typeof E=="number"||typeof E=="boolean"?A[w]=E:A[w]=E.clone(),!0;{let P=A[w];if(typeof E=="number"||typeof E=="boolean"){if(P!==E)return A[w]=E,!0}else if(P.equals(E)===!1)return P.copy(E),!0}return!1}function g(v){let _=v.uniforms,T=0,A=16;for(let w=0,P=_.length;w<P;w++){let y=Array.isArray(_[w])?_[w]:[_[w]];for(let M=0,D=y.length;M<D;M++){let V=y[M],ie=Array.isArray(V.value)?V.value:[V.value];for(let I=0,k=ie.length;I<k;I++){let G=ie[I],te=x(G),N=T%A;N!==0&&A-N<te.boundary&&(T+=A-N),V.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=T,T+=te.storage}}}let E=T%A;return E>0&&(T+=A-E),v.__size=T,v.__cache={},this}function x(v){let _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=48,_.storage=48):v.isMatrix4?(_.boundary=64,_.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),_}function m(v){let _=v.target;_.removeEventListener("dispose",m);let T=s.indexOf(_.__bindingPointIndex);s.splice(T,1),i.deleteBuffer(r[_.id]),delete r[_.id],delete o[_.id]}function p(){for(let v in r)i.deleteBuffer(r[v]);s=[],r={},o={}}return{bind:c,update:l,dispose:p}}var js=class{constructor(e={}){let{canvas:t=Yp(),context:n=null,depth:r=!0,stencil:o=!0,alpha:s=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let h;n!==null?h=n.getContextAttributes().alpha:h=s;let f=new Uint32Array(4),g=new Int32Array(4),x=null,m=null,p=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=nt,this._useLegacyLights=!1,this.toneMapping=Gn,this.toneMappingExposure=1;let _=this,T=!1,A=0,E=0,w=null,P=-1,y=null,M=new rt,D=new rt,V=null,ie=new ge(0),I=0,k=t.width,G=t.height,te=1,N=null,X=null,q=new rt(0,0,k,G),Q=new rt(0,0,k,G),fe=!1,H=new wr,Z=!1,me=!1,j=null,W=new Ue,ee=new Ie,ce=new L,pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function $(){return w===null?te:1}let S=n;function J(C,K){for(let oe=0;oe<C.length;oe++){let ae=C[oe],re=t.getContext(ae,K);if(re!==null)return re}return null}try{let C={alpha:!0,depth:r,stencil:o,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"160"}`),t.addEventListener("webglcontextlost",Ee,!1),t.addEventListener("webglcontextrestored",F,!1),t.addEventListener("webglcontextcreationerror",we,!1),S===null){let K=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&K.shift(),S=J(K,C),S===null)throw J(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&S instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),S.getShaderPrecisionFormat===void 0&&(S.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let U,O,B,le,xe,R,b,z,se,ue,de,ve,_e,ye,De,Se,Y,Le,Re,Pe,Te,be,Ne,Ye;function at(){U=new ax(S),O=new Z0(S,U,e),U.init(O),be=new Vx(S,U,O),B=new kx(S,U,O),le=new ux(S),xe=new Px,R=new Gx(S,U,B,xe,O,be,le),b=new Q0(_),z=new sx(_),se=new pm(S,O),Ne=new K0(S,U,se,O),ue=new cx(S,se,le,Ne),de=new hx(S,ue,se,le),Re=new dx(S,O,R),Se=new J0(xe),ve=new Lx(_,b,z,U,O,Ne,Se),_e=new Wx(_,xe),ye=new Ux,De=new Fx(U,O),Le=new j0(_,b,z,B,de,h,c),Y=new zx(_,de,O),Ye=new Xx(S,le,O,B),Pe=new $0(S,U,le,O),Te=new lx(S,U,le,O),le.programs=ve.programs,_.capabilities=O,_.extensions=U,_.properties=xe,_.renderLists=ye,_.shadowMap=Y,_.state=B,_.info=le}at();let He=new zc(_,S);this.xr=He,this.getContext=function(){return S},this.getContextAttributes=function(){return S.getContextAttributes()},this.forceContextLoss=function(){let C=U.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){let C=U.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(C){C!==void 0&&(te=C,this.setSize(k,G,!1))},this.getSize=function(C){return C.set(k,G)},this.setSize=function(C,K,oe=!0){if(He.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=C,G=K,t.width=Math.floor(C*te),t.height=Math.floor(K*te),oe===!0&&(t.style.width=C+"px",t.style.height=K+"px"),this.setViewport(0,0,C,K)},this.getDrawingBufferSize=function(C){return C.set(k*te,G*te).floor()},this.setDrawingBufferSize=function(C,K,oe){k=C,G=K,te=oe,t.width=Math.floor(C*oe),t.height=Math.floor(K*oe),this.setViewport(0,0,C,K)},this.getCurrentViewport=function(C){return C.copy(M)},this.getViewport=function(C){return C.copy(q)},this.setViewport=function(C,K,oe,ae){C.isVector4?q.set(C.x,C.y,C.z,C.w):q.set(C,K,oe,ae),B.viewport(M.copy(q).multiplyScalar(te).floor())},this.getScissor=function(C){return C.copy(Q)},this.setScissor=function(C,K,oe,ae){C.isVector4?Q.set(C.x,C.y,C.z,C.w):Q.set(C,K,oe,ae),B.scissor(D.copy(Q).multiplyScalar(te).floor())},this.getScissorTest=function(){return fe},this.setScissorTest=function(C){B.setScissorTest(fe=C)},this.setOpaqueSort=function(C){N=C},this.setTransparentSort=function(C){X=C},this.getClearColor=function(C){return C.copy(Le.getClearColor())},this.setClearColor=function(){Le.setClearColor.apply(Le,arguments)},this.getClearAlpha=function(){return Le.getClearAlpha()},this.setClearAlpha=function(){Le.setClearAlpha.apply(Le,arguments)},this.clear=function(C=!0,K=!0,oe=!0){let ae=0;if(C){let re=!1;if(w!==null){let Ce=w.texture.format;re=Ce===qa||Ce===Xa||Ce===Wa}if(re){let Ce=w.texture.type,Be=Ce===In||Ce===Dn||Ce===Mo||Ce===Wn||Ce===Ga||Ce===Va,ze=Le.getClearColor(),Ve=Le.getClearAlpha(),Qe=ze.r,We=ze.g,je=ze.b;Be?(f[0]=Qe,f[1]=We,f[2]=je,f[3]=Ve,S.clearBufferuiv(S.COLOR,0,f)):(g[0]=Qe,g[1]=We,g[2]=je,g[3]=Ve,S.clearBufferiv(S.COLOR,0,g))}else ae|=S.COLOR_BUFFER_BIT}K&&(ae|=S.DEPTH_BUFFER_BIT),oe&&(ae|=S.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),S.clear(ae)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ee,!1),t.removeEventListener("webglcontextrestored",F,!1),t.removeEventListener("webglcontextcreationerror",we,!1),ye.dispose(),De.dispose(),xe.dispose(),b.dispose(),z.dispose(),de.dispose(),Ne.dispose(),Ye.dispose(),ve.dispose(),He.dispose(),He.removeEventListener("sessionstart",fn),He.removeEventListener("sessionend",vt),j&&(j.dispose(),j=null),pn.stop()};function Ee(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function F(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let C=le.autoReset,K=Y.enabled,oe=Y.autoUpdate,ae=Y.needsUpdate,re=Y.type;at(),le.autoReset=C,Y.enabled=K,Y.autoUpdate=oe,Y.needsUpdate=ae,Y.type=re}function we(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Ae(C){let K=C.target;K.removeEventListener("dispose",Ae),ke(K)}function ke(C){Fe(C),xe.remove(C)}function Fe(C){let K=xe.get(C).programs;K!==void 0&&(K.forEach(function(oe){ve.releaseProgram(oe)}),C.isShaderMaterial&&ve.releaseShaderCache(C))}this.renderBufferDirect=function(C,K,oe,ae,re,Ce){K===null&&(K=pe);let Be=re.isMesh&&re.matrixWorld.determinant()<0,ze=xv(C,K,oe,ae,re);B.setMaterial(ae,Be);let Ve=oe.index,Qe=1;if(ae.wireframe===!0){if(Ve=ue.getWireframeAttribute(oe),Ve===void 0)return;Qe=2}let We=oe.drawRange,je=oe.attributes.position,Pt=We.start*Qe,Pn=(We.start+We.count)*Qe;Ce!==null&&(Pt=Math.max(Pt,Ce.start*Qe),Pn=Math.min(Pn,(Ce.start+Ce.count)*Qe)),Ve!==null?(Pt=Math.max(Pt,0),Pn=Math.min(Pn,Ve.count)):je!=null&&(Pt=Math.max(Pt,0),Pn=Math.min(Pn,je.count));let $t=Pn-Pt;if($t<0||$t===1/0)return;Ne.setup(re,ae,ze,oe,Ve);let Bi,Rt=Pe;if(Ve!==null&&(Bi=se.get(Ve),Rt=Te,Rt.setIndex(Bi)),re.isMesh)ae.wireframe===!0?(B.setLineWidth(ae.wireframeLinewidth*$()),Rt.setMode(S.LINES)):Rt.setMode(S.TRIANGLES);else if(re.isLine){let et=ae.linewidth;et===void 0&&(et=1),B.setLineWidth(et*$()),re.isLineSegments?Rt.setMode(S.LINES):re.isLineLoop?Rt.setMode(S.LINE_LOOP):Rt.setMode(S.LINE_STRIP)}else re.isPoints?Rt.setMode(S.POINTS):re.isSprite&&Rt.setMode(S.TRIANGLES);if(re.isBatchedMesh)Rt.renderMultiDraw(re._multiDrawStarts,re._multiDrawCounts,re._multiDrawCount);else if(re.isInstancedMesh)Rt.renderInstances(Pt,$t,re.count);else if(oe.isInstancedBufferGeometry){let et=oe._maxInstanceCount!==void 0?oe._maxInstanceCount:1/0,uu=Math.min(oe.instanceCount,et);Rt.renderInstances(Pt,$t,uu)}else Rt.render(Pt,$t)};function _t(C,K,oe){C.transparent===!0&&C.side===It&&C.forceSinglePass===!1?(C.side=bt,C.needsUpdate=!0,Ba(C,K,oe),C.side=Zt,C.needsUpdate=!0,Ba(C,K,oe),C.side=It):Ba(C,K,oe)}this.compile=function(C,K,oe=null){oe===null&&(oe=C),m=De.get(oe),m.init(),v.push(m),oe.traverseVisible(function(re){re.isLight&&re.layers.test(K.layers)&&(m.pushLight(re),re.castShadow&&m.pushShadow(re))}),C!==oe&&C.traverseVisible(function(re){re.isLight&&re.layers.test(K.layers)&&(m.pushLight(re),re.castShadow&&m.pushShadow(re))}),m.setupLights(_._useLegacyLights);let ae=new Set;return C.traverse(function(re){let Ce=re.material;if(Ce)if(Array.isArray(Ce))for(let Be=0;Be<Ce.length;Be++){let ze=Ce[Be];_t(ze,oe,re),ae.add(ze)}else _t(Ce,oe,re),ae.add(Ce)}),v.pop(),m=null,ae},this.compileAsync=function(C,K,oe=null){let ae=this.compile(C,K,oe);return new Promise(re=>{function Ce(){if(ae.forEach(function(Be){xe.get(Be).currentProgram.isReady()&&ae.delete(Be)}),ae.size===0){re(C);return}setTimeout(Ce,10)}U.get("KHR_parallel_shader_compile")!==null?Ce():setTimeout(Ce,10)})};let yt=null;function Kt(C){yt&&yt(C)}function fn(){pn.stop()}function vt(){pn.start()}let pn=new Ic;pn.setAnimationLoop(Kt),typeof self<"u"&&pn.setContext(self),this.setAnimationLoop=function(C){yt=C,He.setAnimationLoop(C),C===null?pn.stop():pn.start()},He.addEventListener("sessionstart",fn),He.addEventListener("sessionend",vt),this.render=function(C,K){if(K!==void 0&&K.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),He.enabled===!0&&He.isPresenting===!0&&(He.cameraAutoUpdate===!0&&He.updateCamera(K),K=He.getCamera()),C.isScene===!0&&C.onBeforeRender(_,C,K,w),m=De.get(C,v.length),m.init(),v.push(m),W.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),H.setFromProjectionMatrix(W),me=this.localClippingEnabled,Z=Se.init(this.clippingPlanes,me),x=ye.get(C,p.length),x.init(),p.push(x),vi(C,K,0,_.sortObjects),x.finish(),_.sortObjects===!0&&x.sort(N,X),this.info.render.frame++,Z===!0&&Se.beginShadows();let oe=m.state.shadowsArray;if(Y.render(oe,C,K),Z===!0&&Se.endShadows(),this.info.autoReset===!0&&this.info.reset(),Le.render(x,C),m.setupLights(_._useLegacyLights),K.isArrayCamera){let ae=K.cameras;for(let re=0,Ce=ae.length;re<Ce;re++){let Be=ae[re];zf(x,C,Be,Be.viewport)}}else zf(x,C,K);w!==null&&(R.updateMultisampleRenderTarget(w),R.updateRenderTargetMipmap(w)),C.isScene===!0&&C.onAfterRender(_,C,K),Ne.resetDefaultState(),P=-1,y=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,p.pop(),p.length>0?x=p[p.length-1]:x=null};function vi(C,K,oe,ae){if(C.visible===!1)return;if(C.layers.test(K.layers)){if(C.isGroup)oe=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(K);else if(C.isLight)m.pushLight(C),C.castShadow&&m.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||H.intersectsSprite(C)){ae&&ce.setFromMatrixPosition(C.matrixWorld).applyMatrix4(W);let Be=de.update(C),ze=C.material;ze.visible&&x.push(C,Be,ze,oe,ce.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||H.intersectsObject(C))){let Be=de.update(C),ze=C.material;if(ae&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),ce.copy(C.boundingSphere.center)):(Be.boundingSphere===null&&Be.computeBoundingSphere(),ce.copy(Be.boundingSphere.center)),ce.applyMatrix4(C.matrixWorld).applyMatrix4(W)),Array.isArray(ze)){let Ve=Be.groups;for(let Qe=0,We=Ve.length;Qe<We;Qe++){let je=Ve[Qe],Pt=ze[je.materialIndex];Pt&&Pt.visible&&x.push(C,Be,Pt,oe,ce.z,je)}}else ze.visible&&x.push(C,Be,ze,oe,ce.z,null)}}let Ce=C.children;for(let Be=0,ze=Ce.length;Be<ze;Be++)vi(Ce[Be],K,oe,ae)}function zf(C,K,oe,ae){let re=C.opaque,Ce=C.transmissive,Be=C.transparent;m.setupLightsView(oe),Z===!0&&Se.setGlobalState(_.clippingPlanes,oe),Ce.length>0&&gv(re,Ce,K,oe),ae&&B.viewport(M.copy(ae)),re.length>0&&Na(re,K,oe),Ce.length>0&&Na(Ce,K,oe),Be.length>0&&Na(Be,K,oe),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function gv(C,K,oe,ae){if((oe.isScene===!0?oe.overrideMaterial:null)!==null)return;let Ce=O.isWebGL2;j===null&&(j=new bn(1,1,{generateMipmaps:!0,type:U.has("EXT_color_buffer_half_float")?zi:In,minFilter:Vn,samples:Ce?4:0})),_.getDrawingBufferSize(ee),Ce?j.setSize(ee.x,ee.y):j.setSize(Co(ee.x),Co(ee.y));let Be=_.getRenderTarget();_.setRenderTarget(j),_.getClearColor(ie),I=_.getClearAlpha(),I<1&&_.setClearColor(16777215,.5),_.clear();let ze=_.toneMapping;_.toneMapping=Gn,Na(C,oe,ae),R.updateMultisampleRenderTarget(j),R.updateRenderTargetMipmap(j);let Ve=!1;for(let Qe=0,We=K.length;Qe<We;Qe++){let je=K[Qe],Pt=je.object,Pn=je.geometry,$t=je.material,Bi=je.group;if($t.side===It&&Pt.layers.test(ae.layers)){let Rt=$t.side;$t.side=bt,$t.needsUpdate=!0,kf(Pt,oe,ae,Pn,$t,Bi),$t.side=Rt,$t.needsUpdate=!0,Ve=!0}}Ve===!0&&(R.updateMultisampleRenderTarget(j),R.updateRenderTargetMipmap(j)),_.setRenderTarget(Be),_.setClearColor(ie,I),_.toneMapping=ze}function Na(C,K,oe){let ae=K.isScene===!0?K.overrideMaterial:null;for(let re=0,Ce=C.length;re<Ce;re++){let Be=C[re],ze=Be.object,Ve=Be.geometry,Qe=ae===null?Be.material:ae,We=Be.group;ze.layers.test(oe.layers)&&kf(ze,K,oe,Ve,Qe,We)}}function kf(C,K,oe,ae,re,Ce){C.onBeforeRender(_,K,oe,ae,re,Ce),C.modelViewMatrix.multiplyMatrices(oe.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),re.onBeforeRender(_,K,oe,ae,C,Ce),re.transparent===!0&&re.side===It&&re.forceSinglePass===!1?(re.side=bt,re.needsUpdate=!0,_.renderBufferDirect(oe,K,ae,re,C,Ce),re.side=Zt,re.needsUpdate=!0,_.renderBufferDirect(oe,K,ae,re,C,Ce),re.side=It):_.renderBufferDirect(oe,K,ae,re,C,Ce),C.onAfterRender(_,K,oe,ae,re,Ce)}function Ba(C,K,oe){K.isScene!==!0&&(K=pe);let ae=xe.get(C),re=m.state.lights,Ce=m.state.shadowsArray,Be=re.state.version,ze=ve.getParameters(C,re.state,Ce,K,oe),Ve=ve.getProgramCacheKey(ze),Qe=ae.programs;ae.environment=C.isMeshStandardMaterial?K.environment:null,ae.fog=K.fog,ae.envMap=(C.isMeshStandardMaterial?z:b).get(C.envMap||ae.environment),Qe===void 0&&(C.addEventListener("dispose",Ae),Qe=new Map,ae.programs=Qe);let We=Qe.get(Ve);if(We!==void 0){if(ae.currentProgram===We&&ae.lightsStateVersion===Be)return Vf(C,ze),We}else ze.uniforms=ve.getUniforms(C),C.onBuild(oe,ze,_),C.onBeforeCompile(ze,_),We=ve.acquireProgram(ze,Ve),Qe.set(Ve,We),ae.uniforms=ze.uniforms;let je=ae.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(je.clippingPlanes=Se.uniform),Vf(C,ze),ae.needsLights=yv(C),ae.lightsStateVersion=Be,ae.needsLights&&(je.ambientLightColor.value=re.state.ambient,je.lightProbe.value=re.state.probe,je.directionalLights.value=re.state.directional,je.directionalLightShadows.value=re.state.directionalShadow,je.spotLights.value=re.state.spot,je.spotLightShadows.value=re.state.spotShadow,je.rectAreaLights.value=re.state.rectArea,je.ltc_1.value=re.state.rectAreaLTC1,je.ltc_2.value=re.state.rectAreaLTC2,je.pointLights.value=re.state.point,je.pointLightShadows.value=re.state.pointShadow,je.hemisphereLights.value=re.state.hemi,je.directionalShadowMap.value=re.state.directionalShadowMap,je.directionalShadowMatrix.value=re.state.directionalShadowMatrix,je.spotShadowMap.value=re.state.spotShadowMap,je.spotLightMatrix.value=re.state.spotLightMatrix,je.spotLightMap.value=re.state.spotLightMap,je.pointShadowMap.value=re.state.pointShadowMap,je.pointShadowMatrix.value=re.state.pointShadowMatrix),ae.currentProgram=We,ae.uniformsList=null,We}function Gf(C){if(C.uniformsList===null){let K=C.currentProgram.getUniforms();C.uniformsList=Rr.seqWithValue(K.seq,C.uniforms)}return C.uniformsList}function Vf(C,K){let oe=xe.get(C);oe.outputColorSpace=K.outputColorSpace,oe.batching=K.batching,oe.instancing=K.instancing,oe.instancingColor=K.instancingColor,oe.skinning=K.skinning,oe.morphTargets=K.morphTargets,oe.morphNormals=K.morphNormals,oe.morphColors=K.morphColors,oe.morphTargetsCount=K.morphTargetsCount,oe.numClippingPlanes=K.numClippingPlanes,oe.numIntersection=K.numClipIntersection,oe.vertexAlphas=K.vertexAlphas,oe.vertexTangents=K.vertexTangents,oe.toneMapping=K.toneMapping}function xv(C,K,oe,ae,re){K.isScene!==!0&&(K=pe),R.resetTextureUnits();let Ce=K.fog,Be=ae.isMeshStandardMaterial?K.environment:null,ze=w===null?_.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:pt,Ve=(ae.isMeshStandardMaterial?z:b).get(ae.envMap||Be),Qe=ae.vertexColors===!0&&!!oe.attributes.color&&oe.attributes.color.itemSize===4,We=!!oe.attributes.tangent&&(!!ae.normalMap||ae.anisotropy>0),je=!!oe.morphAttributes.position,Pt=!!oe.morphAttributes.normal,Pn=!!oe.morphAttributes.color,$t=Gn;ae.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&($t=_.toneMapping);let Bi=oe.morphAttributes.position||oe.morphAttributes.normal||oe.morphAttributes.color,Rt=Bi!==void 0?Bi.length:0,et=xe.get(ae),uu=m.state.lights;if(Z===!0&&(me===!0||C!==y)){let zn=C===y&&ae.id===P;Se.setState(ae,C,zn)}let Ct=!1;ae.version===et.__version?(et.needsLights&&et.lightsStateVersion!==uu.state.version||et.outputColorSpace!==ze||re.isBatchedMesh&&et.batching===!1||!re.isBatchedMesh&&et.batching===!0||re.isInstancedMesh&&et.instancing===!1||!re.isInstancedMesh&&et.instancing===!0||re.isSkinnedMesh&&et.skinning===!1||!re.isSkinnedMesh&&et.skinning===!0||re.isInstancedMesh&&et.instancingColor===!0&&re.instanceColor===null||re.isInstancedMesh&&et.instancingColor===!1&&re.instanceColor!==null||et.envMap!==Ve||ae.fog===!0&&et.fog!==Ce||et.numClippingPlanes!==void 0&&(et.numClippingPlanes!==Se.numPlanes||et.numIntersection!==Se.numIntersection)||et.vertexAlphas!==Qe||et.vertexTangents!==We||et.morphTargets!==je||et.morphNormals!==Pt||et.morphColors!==Pn||et.toneMapping!==$t||O.isWebGL2===!0&&et.morphTargetsCount!==Rt)&&(Ct=!0):(Ct=!0,et.__version=ae.version);let kr=et.currentProgram;Ct===!0&&(kr=Ba(ae,K,re));let Wf=!1,Ds=!1,du=!1,on=kr.getUniforms(),Gr=et.uniforms;if(B.useProgram(kr.program)&&(Wf=!0,Ds=!0,du=!0),ae.id!==P&&(P=ae.id,Ds=!0),Wf||y!==C){on.setValue(S,"projectionMatrix",C.projectionMatrix),on.setValue(S,"viewMatrix",C.matrixWorldInverse);let zn=on.map.cameraPosition;zn!==void 0&&zn.setValue(S,ce.setFromMatrixPosition(C.matrixWorld)),O.logarithmicDepthBuffer&&on.setValue(S,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(ae.isMeshPhongMaterial||ae.isMeshToonMaterial||ae.isMeshLambertMaterial||ae.isMeshBasicMaterial||ae.isMeshStandardMaterial||ae.isShaderMaterial)&&on.setValue(S,"isOrthographic",C.isOrthographicCamera===!0),y!==C&&(y=C,Ds=!0,du=!0)}if(re.isSkinnedMesh){on.setOptional(S,re,"bindMatrix"),on.setOptional(S,re,"bindMatrixInverse");let zn=re.skeleton;zn&&(O.floatVertexTextures?(zn.boneTexture===null&&zn.computeBoneTexture(),on.setValue(S,"boneTexture",zn.boneTexture,R)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}re.isBatchedMesh&&(on.setOptional(S,re,"batchingTexture"),on.setValue(S,"batchingTexture",re._matricesTexture,R));let hu=oe.morphAttributes;if((hu.position!==void 0||hu.normal!==void 0||hu.color!==void 0&&O.isWebGL2===!0)&&Re.update(re,oe,kr),(Ds||et.receiveShadow!==re.receiveShadow)&&(et.receiveShadow=re.receiveShadow,on.setValue(S,"receiveShadow",re.receiveShadow)),ae.isMeshGouraudMaterial&&ae.envMap!==null&&(Gr.envMap.value=Ve,Gr.flipEnvMap.value=Ve.isCubeTexture&&Ve.isRenderTargetTexture===!1?-1:1),Ds&&(on.setValue(S,"toneMappingExposure",_.toneMappingExposure),et.needsLights&&_v(Gr,du),Ce&&ae.fog===!0&&_e.refreshFogUniforms(Gr,Ce),_e.refreshMaterialUniforms(Gr,ae,te,G,j),Rr.upload(S,Gf(et),Gr,R)),ae.isShaderMaterial&&ae.uniformsNeedUpdate===!0&&(Rr.upload(S,Gf(et),Gr,R),ae.uniformsNeedUpdate=!1),ae.isSpriteMaterial&&on.setValue(S,"center",re.center),on.setValue(S,"modelViewMatrix",re.modelViewMatrix),on.setValue(S,"normalMatrix",re.normalMatrix),on.setValue(S,"modelMatrix",re.matrixWorld),ae.isShaderMaterial||ae.isRawShaderMaterial){let zn=ae.uniformsGroups;for(let fu=0,vv=zn.length;fu<vv;fu++)if(O.isWebGL2){let Xf=zn[fu];Ye.update(Xf,kr),Ye.bind(Xf,kr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return kr}function _v(C,K){C.ambientLightColor.needsUpdate=K,C.lightProbe.needsUpdate=K,C.directionalLights.needsUpdate=K,C.directionalLightShadows.needsUpdate=K,C.pointLights.needsUpdate=K,C.pointLightShadows.needsUpdate=K,C.spotLights.needsUpdate=K,C.spotLightShadows.needsUpdate=K,C.rectAreaLights.needsUpdate=K,C.hemisphereLights.needsUpdate=K}function yv(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(C,K,oe){xe.get(C.texture).__webglTexture=K,xe.get(C.depthTexture).__webglTexture=oe;let ae=xe.get(C);ae.__hasExternalTextures=!0,ae.__hasExternalTextures&&(ae.__autoAllocateDepthBuffer=oe===void 0,ae.__autoAllocateDepthBuffer||U.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ae.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(C,K){let oe=xe.get(C);oe.__webglFramebuffer=K,oe.__useDefaultFramebuffer=K===void 0},this.setRenderTarget=function(C,K=0,oe=0){w=C,A=K,E=oe;let ae=!0,re=null,Ce=!1,Be=!1;if(C){let Ve=xe.get(C);Ve.__useDefaultFramebuffer!==void 0?(B.bindFramebuffer(S.FRAMEBUFFER,null),ae=!1):Ve.__webglFramebuffer===void 0?R.setupRenderTarget(C):Ve.__hasExternalTextures&&R.rebindTextures(C,xe.get(C.texture).__webglTexture,xe.get(C.depthTexture).__webglTexture);let Qe=C.texture;(Qe.isData3DTexture||Qe.isDataArrayTexture||Qe.isCompressedArrayTexture)&&(Be=!0);let We=xe.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(We[K])?re=We[K][oe]:re=We[K],Ce=!0):O.isWebGL2&&C.samples>0&&R.useMultisampledRTT(C)===!1?re=xe.get(C).__webglMultisampledFramebuffer:Array.isArray(We)?re=We[oe]:re=We,M.copy(C.viewport),D.copy(C.scissor),V=C.scissorTest}else M.copy(q).multiplyScalar(te).floor(),D.copy(Q).multiplyScalar(te).floor(),V=fe;if(B.bindFramebuffer(S.FRAMEBUFFER,re)&&O.drawBuffers&&ae&&B.drawBuffers(C,re),B.viewport(M),B.scissor(D),B.setScissorTest(V),Ce){let Ve=xe.get(C.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ve.__webglTexture,oe)}else if(Be){let Ve=xe.get(C.texture),Qe=K||0;S.framebufferTextureLayer(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,Ve.__webglTexture,oe||0,Qe)}P=-1},this.readRenderTargetPixels=function(C,K,oe,ae,re,Ce,Be){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=xe.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Be!==void 0&&(ze=ze[Be]),ze){B.bindFramebuffer(S.FRAMEBUFFER,ze);try{let Ve=C.texture,Qe=Ve.format,We=Ve.type;if(Qe!==Ht&&be.convert(Qe)!==S.getParameter(S.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let je=We===zi&&(U.has("EXT_color_buffer_half_float")||O.isWebGL2&&U.has("EXT_color_buffer_float"));if(We!==In&&be.convert(We)!==S.getParameter(S.IMPLEMENTATION_COLOR_READ_TYPE)&&!(We===mn&&(O.isWebGL2||U.has("OES_texture_float")||U.has("WEBGL_color_buffer_float")))&&!je){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=C.width-ae&&oe>=0&&oe<=C.height-re&&S.readPixels(K,oe,ae,re,be.convert(Qe),be.convert(We),Ce)}finally{let Ve=w!==null?xe.get(w).__webglFramebuffer:null;B.bindFramebuffer(S.FRAMEBUFFER,Ve)}}},this.copyFramebufferToTexture=function(C,K,oe=0){let ae=Math.pow(2,-oe),re=Math.floor(K.image.width*ae),Ce=Math.floor(K.image.height*ae);R.setTexture2D(K,0),S.copyTexSubImage2D(S.TEXTURE_2D,oe,0,0,C.x,C.y,re,Ce),B.unbindTexture()},this.copyTextureToTexture=function(C,K,oe,ae=0){let re=K.image.width,Ce=K.image.height,Be=be.convert(oe.format),ze=be.convert(oe.type);R.setTexture2D(oe,0),S.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,oe.flipY),S.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,oe.premultiplyAlpha),S.pixelStorei(S.UNPACK_ALIGNMENT,oe.unpackAlignment),K.isDataTexture?S.texSubImage2D(S.TEXTURE_2D,ae,C.x,C.y,re,Ce,Be,ze,K.image.data):K.isCompressedTexture?S.compressedTexSubImage2D(S.TEXTURE_2D,ae,C.x,C.y,K.mipmaps[0].width,K.mipmaps[0].height,Be,K.mipmaps[0].data):S.texSubImage2D(S.TEXTURE_2D,ae,C.x,C.y,Be,ze,K.image),ae===0&&oe.generateMipmaps&&S.generateMipmap(S.TEXTURE_2D),B.unbindTexture()},this.copyTextureToTexture3D=function(C,K,oe,ae,re=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Ce=C.max.x-C.min.x+1,Be=C.max.y-C.min.y+1,ze=C.max.z-C.min.z+1,Ve=be.convert(ae.format),Qe=be.convert(ae.type),We;if(ae.isData3DTexture)R.setTexture3D(ae,0),We=S.TEXTURE_3D;else if(ae.isDataArrayTexture||ae.isCompressedArrayTexture)R.setTexture2DArray(ae,0),We=S.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}S.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,ae.flipY),S.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ae.premultiplyAlpha),S.pixelStorei(S.UNPACK_ALIGNMENT,ae.unpackAlignment);let je=S.getParameter(S.UNPACK_ROW_LENGTH),Pt=S.getParameter(S.UNPACK_IMAGE_HEIGHT),Pn=S.getParameter(S.UNPACK_SKIP_PIXELS),$t=S.getParameter(S.UNPACK_SKIP_ROWS),Bi=S.getParameter(S.UNPACK_SKIP_IMAGES),Rt=oe.isCompressedTexture?oe.mipmaps[re]:oe.image;S.pixelStorei(S.UNPACK_ROW_LENGTH,Rt.width),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,Rt.height),S.pixelStorei(S.UNPACK_SKIP_PIXELS,C.min.x),S.pixelStorei(S.UNPACK_SKIP_ROWS,C.min.y),S.pixelStorei(S.UNPACK_SKIP_IMAGES,C.min.z),oe.isDataTexture||oe.isData3DTexture?S.texSubImage3D(We,re,K.x,K.y,K.z,Ce,Be,ze,Ve,Qe,Rt.data):oe.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),S.compressedTexSubImage3D(We,re,K.x,K.y,K.z,Ce,Be,ze,Ve,Rt.data)):S.texSubImage3D(We,re,K.x,K.y,K.z,Ce,Be,ze,Ve,Qe,Rt),S.pixelStorei(S.UNPACK_ROW_LENGTH,je),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,Pt),S.pixelStorei(S.UNPACK_SKIP_PIXELS,Pn),S.pixelStorei(S.UNPACK_SKIP_ROWS,$t),S.pixelStorei(S.UNPACK_SKIP_IMAGES,Bi),re===0&&ae.generateMipmaps&&S.generateMipmap(We),B.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?R.setTextureCube(C,0):C.isData3DTexture?R.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?R.setTexture2DArray(C,0):R.setTexture2D(C,0),B.unbindTexture()},this.resetState=function(){A=0,E=0,w=null,B.reset(),Ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===To?"display-p3":"srgb",t.unpackColorSpace=$e.workingColorSpace===Wr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===nt?ri:ec}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ri?nt:pt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}};var Ks=class i{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ge(e),this.density=t}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var eo=class extends Xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}};var to=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Gs,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=zt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,o=this.stride;r<o;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=zt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}};var gn=new L,no=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyMatrix4(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.applyNormalMatrix(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gn.fromBufferAttribute(this,t),gn.transformDirection(e),this.setXYZ(t,gn.x,gn.y,gn.z);return this}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Xn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Xn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Xn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Xn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),r=lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,o){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),r=lt(r,this.array),o=lt(o,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=o,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return new Ke(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var qx=new L,Yx=new rt,jx=new rt,UM=new L,Kx=new Ue,kc=new L,wd=new At,$x=new Ue,Ad=new qn,$s=class extends Ge{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=_u,this.bindMatrix=new Ue,this.bindMatrixInverse=new Ue,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new dt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,kc),this.boundingBox.expandByPoint(kc)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new At),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,kc),this.boundingSphere.expandByPoint(kc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wd.copy(this.boundingSphere),wd.applyMatrix4(r),e.ray.intersectsSphere(wd)!==!1&&($x.copy(r).invert(),Ad.copy(e.ray).applyMatrix4($x),!(this.boundingBox!==null&&Ad.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ad)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new rt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let o=1/e.manhattanLength();o!==1/0?e.multiplyScalar(o):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===_u?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Sp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;Yx.fromBufferAttribute(r.attributes.skinIndex,e),jx.fromBufferAttribute(r.attributes.skinWeight,e),qx.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let o=0;o<4;o++){let s=jx.getComponent(o);if(s!==0){let a=Yx.getComponent(o);Kx.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(UM.copy(qx).applyMatrix4(Kx),s)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}};var io=class extends Xe{constructor(){super(),this.isBone=!0,this.type="Bone"}};var Gc=class extends mt{constructor(e=null,t=1,n=1,r,o,s,a,c,l=Tt,u=Tt,d,h){super(null,s,a,c,l,u,r,o,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Zx=new Ue,NM=new Ue,Zs=class i{constructor(e=[],t=[]){this.uuid=zt(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,r=this.bones.length;n<r;n++)this.boneInverses.push(new Ue)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ue;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let o=0,s=e.length;o<s;o++){let a=e[o]?e[o].matrixWorld:NM;Zx.multiplyMatrices(a,t[o]),Zx.toArray(n,o*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Gc(t,e,e,Ht,mn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let o=e.bones[n],s=t[o];s===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",o),s=new io),this.bones.push(s),this.boneInverses.push(new Ue().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,o=t.length;r<o;r++){let s=t[r];e.bones.push(s.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}};var bi=class extends Ke{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}};var is=new Ue,Jx=new Ue,Vc=[],Qx=new dt,BM=new Ue,Js=new Ge,Qs=new At,ro=class extends Ge{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new bi(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,BM)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new dt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,is),Qx.copy(e.boundingBox).applyMatrix4(is),this.boundingBox.union(Qx)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new At),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,is),Qs.copy(e.boundingSphere).applyMatrix4(is),this.boundingSphere.union(Qs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Js.geometry=this.geometry,Js.material=this.material,Js.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qs.copy(this.boundingSphere),Qs.applyMatrix4(n),e.ray.intersectsSphere(Qs)!==!1))for(let o=0;o<r;o++){this.getMatrixAt(o,is),Jx.multiplyMatrices(n,is),Js.matrixWorld=Jx,Js.raycast(e,Vc);for(let s=0,a=Vc.length;s<a;s++){let c=Vc[s];c.instanceId=o,c.object=this,t.push(c)}Vc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new bi(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var li=class extends Dt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}};var e_=new L,t_=new L,n_=new Ue,Rd=new qn,Wc=new At,Ji=class extends Xe{constructor(e=new Je,t=new li){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,o=t.count;r<o;r++)e_.fromBufferAttribute(t,r-1),t_.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=e_.distanceTo(t_);e.setAttribute("lineDistance",new Ze(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,o=e.params.Line.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wc.copy(n.boundingSphere),Wc.applyMatrix4(r),Wc.radius+=o,e.ray.intersectsSphere(Wc)===!1)return;n_.copy(r).invert(),Rd.copy(e.ray).applyMatrix4(n_);let a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new L,u=new L,d=new L,h=new L,f=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){let p=Math.max(0,s.start),v=Math.min(g.count,s.start+s.count);for(let _=p,T=v-1;_<T;_+=f){let A=g.getX(_),E=g.getX(_+1);if(l.fromBufferAttribute(m,A),u.fromBufferAttribute(m,E),Rd.distanceSqToSegment(l,u,h,d)>c)continue;h.applyMatrix4(this.matrixWorld);let P=e.ray.origin.distanceTo(h);P<e.near||P>e.far||t.push({distance:P,point:d.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{let p=Math.max(0,s.start),v=Math.min(m.count,s.start+s.count);for(let _=p,T=v-1;_<T;_+=f){if(l.fromBufferAttribute(m,_),u.fromBufferAttribute(m,_+1),Rd.distanceSqToSegment(l,u,h,d)>c)continue;h.applyMatrix4(this.matrixWorld);let E=e.ray.origin.distanceTo(h);E<e.near||E>e.far||t.push({distance:E,point:d.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){let a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}};var i_=new L,r_=new L,Qi=class extends Ji{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,o=t.count;r<o;r+=2)i_.fromBufferAttribute(t,r),r_.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+i_.distanceTo(r_);e.setAttribute("lineDistance",new Ze(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var ea=class extends Ji{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}};var er=class extends Dt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ge(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}};var o_=new Ue,Cd=new qn,Xc=new At,qc=new L,Cr=class extends Xe{constructor(e=new Je,t=new er){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,o=e.params.Points.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xc.copy(n.boundingSphere),Xc.applyMatrix4(r),Xc.radius+=o,e.ray.intersectsSphere(Xc)===!1)return;o_.copy(r).invert(),Cd.copy(e.ray).applyMatrix4(o_);let a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,d=n.attributes.position;if(l!==null){let h=Math.max(0,s.start),f=Math.min(l.count,s.start+s.count);for(let g=h,x=f;g<x;g++){let m=l.getX(g);qc.fromBufferAttribute(d,m),s_(qc,m,c,r,e,t,this)}}else{let h=Math.max(0,s.start),f=Math.min(d.count,s.start+s.count);for(let g=h,x=f;g<x;g++)qc.fromBufferAttribute(d,g),s_(qc,g,c,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){let a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}};function s_(i,e,t,n,r,o,s){let a=Cd.distanceSqToPoint(i);if(a<t){let c=new L;Cd.closestPointToPoint(i,c),c.applyMatrix4(n);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;o.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:s})}}var oo=class extends mt{constructor(e,t,n,r,o,s,a,c,l){super(e,t,n,r,o,s,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ta=class i extends Je{constructor(e=1,t=1,n=1,r=32,o=1,s=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:o,openEnded:s,thetaStart:a,thetaLength:c};let l=this;r=Math.floor(r),o=Math.floor(o);let u=[],d=[],h=[],f=[],g=0,x=[],m=n/2,p=0;v(),s===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new Ze(d,3)),this.setAttribute("normal",new Ze(h,3)),this.setAttribute("uv",new Ze(f,2));function v(){let T=new L,A=new L,E=0,w=(t-e)/n;for(let P=0;P<=o;P++){let y=[],M=P/o,D=M*(t-e)+e;for(let V=0;V<=r;V++){let ie=V/r,I=ie*c+a,k=Math.sin(I),G=Math.cos(I);A.x=D*k,A.y=-M*n+m,A.z=D*G,d.push(A.x,A.y,A.z),T.set(k,w,G).normalize(),h.push(T.x,T.y,T.z),f.push(ie,1-M),y.push(g++)}x.push(y)}for(let P=0;P<r;P++)for(let y=0;y<o;y++){let M=x[y][P],D=x[y+1][P],V=x[y+1][P+1],ie=x[y][P+1];u.push(M,D,ie),u.push(D,V,ie),E+=6}l.addGroup(p,E,0),p+=E}function _(T){let A=g,E=new Ie,w=new L,P=0,y=T===!0?e:t,M=T===!0?1:-1;for(let V=1;V<=r;V++)d.push(0,m*M,0),h.push(0,M,0),f.push(.5,.5),g++;let D=g;for(let V=0;V<=r;V++){let I=V/r*c+a,k=Math.cos(I),G=Math.sin(I);w.x=y*G,w.y=m*M,w.z=y*k,d.push(w.x,w.y,w.z),h.push(0,M,0),E.x=k*.5+.5,E.y=G*.5*M+.5,f.push(E.x,E.y),g++}for(let V=0;V<r;V++){let ie=A+V,I=D+V;T===!0?u.push(I,I+1,ie):u.push(I+1,I,ie),P+=3}l.addGroup(p,P,T===!0?1:2),p+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Yc=class i extends Je{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let o=[],s=[];a(r),l(n),u(),this.setAttribute("position",new Ze(o,3)),this.setAttribute("normal",new Ze(o.slice(),3)),this.setAttribute("uv",new Ze(s,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let _=new L,T=new L,A=new L;for(let E=0;E<t.length;E+=3)f(t[E+0],_),f(t[E+1],T),f(t[E+2],A),c(_,T,A,v)}function c(v,_,T,A){let E=A+1,w=[];for(let P=0;P<=E;P++){w[P]=[];let y=v.clone().lerp(T,P/E),M=_.clone().lerp(T,P/E),D=E-P;for(let V=0;V<=D;V++)V===0&&P===E?w[P][V]=y:w[P][V]=y.clone().lerp(M,V/D)}for(let P=0;P<E;P++)for(let y=0;y<2*(E-P)-1;y++){let M=Math.floor(y/2);y%2===0?(h(w[P][M+1]),h(w[P+1][M]),h(w[P][M])):(h(w[P][M+1]),h(w[P+1][M+1]),h(w[P+1][M]))}}function l(v){let _=new L;for(let T=0;T<o.length;T+=3)_.x=o[T+0],_.y=o[T+1],_.z=o[T+2],_.normalize().multiplyScalar(v),o[T+0]=_.x,o[T+1]=_.y,o[T+2]=_.z}function u(){let v=new L;for(let _=0;_<o.length;_+=3){v.x=o[_+0],v.y=o[_+1],v.z=o[_+2];let T=m(v)/2/Math.PI+.5,A=p(v)/Math.PI+.5;s.push(T,1-A)}g(),d()}function d(){for(let v=0;v<s.length;v+=6){let _=s[v+0],T=s[v+2],A=s[v+4],E=Math.max(_,T,A),w=Math.min(_,T,A);E>.9&&w<.1&&(_<.2&&(s[v+0]+=1),T<.2&&(s[v+2]+=1),A<.2&&(s[v+4]+=1))}}function h(v){o.push(v.x,v.y,v.z)}function f(v,_){let T=v*3;_.x=e[T+0],_.y=e[T+1],_.z=e[T+2]}function g(){let v=new L,_=new L,T=new L,A=new L,E=new Ie,w=new Ie,P=new Ie;for(let y=0,M=0;y<o.length;y+=9,M+=6){v.set(o[y+0],o[y+1],o[y+2]),_.set(o[y+3],o[y+4],o[y+5]),T.set(o[y+6],o[y+7],o[y+8]),E.set(s[M+0],s[M+1]),w.set(s[M+2],s[M+3]),P.set(s[M+4],s[M+5]),A.copy(v).add(_).add(T).divideScalar(3);let D=m(A);x(E,M+0,v,D),x(w,M+2,_,D),x(P,M+4,T,D)}}function x(v,_,T,A){A<0&&v.x===1&&(s[_]=v.x-1),T.x===0&&T.z===0&&(s[_]=A/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.details)}};var jc=new L,Kc=new L,Ld=new L,$c=new Ki,rs=class extends Je{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),o=Math.cos(mr*t),s=e.getIndex(),a=e.getAttribute("position"),c=s?s.count:a.count,l=[0,0,0],u=["a","b","c"],d=new Array(3),h={},f=[];for(let g=0;g<c;g+=3){s?(l[0]=s.getX(g),l[1]=s.getX(g+1),l[2]=s.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:x,b:m,c:p}=$c;if(x.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),p.fromBufferAttribute(a,l[2]),$c.getNormal(Ld),d[0]=`${Math.round(x.x*r)},${Math.round(x.y*r)},${Math.round(x.z*r)}`,d[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,d[2]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let v=0;v<3;v++){let _=(v+1)%3,T=d[v],A=d[_],E=$c[u[v]],w=$c[u[_]],P=`${T}_${A}`,y=`${A}_${T}`;y in h&&h[y]?(Ld.dot(h[y].normal)<=o&&(f.push(E.x,E.y,E.z),f.push(w.x,w.y,w.z)),h[y]=null):P in h||(h[P]={index0:l[v],index1:l[_],normal:Ld.clone()})}}for(let g in h)if(h[g]){let{index0:x,index1:m}=h[g];jc.fromBufferAttribute(a,x),Kc.fromBufferAttribute(a,m),f.push(jc.x,jc.y,jc.z),f.push(Kc.x,Kc.y,Kc.z)}this.setAttribute("position",new Ze(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};var na=class i extends Yc{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],o=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,o,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}};var Zc=class i extends Je{constructor(e=.5,t=1,n=32,r=1,o=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:o,thetaLength:s},n=Math.max(3,n),r=Math.max(1,r);let a=[],c=[],l=[],u=[],d=e,h=(t-e)/r,f=new L,g=new Ie;for(let x=0;x<=r;x++){for(let m=0;m<=n;m++){let p=o+m/n*s;f.x=d*Math.cos(p),f.y=d*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}d+=h}for(let x=0;x<r;x++){let m=x*(n+1);for(let p=0;p<n;p++){let v=p+m,_=v,T=v+n+1,A=v+n+2,E=v+1;a.push(_,T,E),a.push(T,A,E)}}this.setIndex(a),this.setAttribute("position",new Ze(c,3)),this.setAttribute("normal",new Ze(l,3)),this.setAttribute("uv",new Ze(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var ia=class i extends Je{constructor(e=1,t=32,n=16,r=0,o=Math.PI*2,s=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:o,thetaStart:s,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(s+a,Math.PI),l=0,u=[],d=new L,h=new L,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let v=[],_=p/n,T=0;p===0&&s===0?T=.5/t:p===n&&c===Math.PI&&(T=-.5/t);for(let A=0;A<=t;A++){let E=A/t;d.x=-e*Math.cos(r+E*o)*Math.sin(s+_*a),d.y=e*Math.cos(s+_*a),d.z=e*Math.sin(r+E*o)*Math.sin(s+_*a),g.push(d.x,d.y,d.z),h.copy(d).normalize(),x.push(h.x,h.y,h.z),m.push(E+T,1-_),v.push(l++)}u.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){let _=u[p][v+1],T=u[p][v],A=u[p+1][v],E=u[p+1][v+1];(p!==0||s>0)&&f.push(_,T,E),(p!==n-1||c<Math.PI)&&f.push(T,A,E)}this.setIndex(f),this.setAttribute("position",new Ze(g,3)),this.setAttribute("normal",new Ze(x,3)),this.setAttribute("uv",new Ze(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Jc=class i extends Je{constructor(e=1,t=.4,n=12,r=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:o},n=Math.floor(n),r=Math.floor(r);let s=[],a=[],c=[],l=[],u=new L,d=new L,h=new L;for(let f=0;f<=n;f++)for(let g=0;g<=r;g++){let x=g/r*o,m=f/n*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(x),d.y=(e+t*Math.cos(m))*Math.sin(x),d.z=t*Math.sin(m),a.push(d.x,d.y,d.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),h.subVectors(d,u).normalize(),c.push(h.x,h.y,h.z),l.push(g/r),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=r;g++){let x=(r+1)*f+g-1,m=(r+1)*(f-1)+g-1,p=(r+1)*(f-1)+g,v=(r+1)*f+g;s.push(x,m,v),s.push(m,p,v)}this.setIndex(s),this.setAttribute("position",new Ze(a,3)),this.setAttribute("normal",new Ze(c,3)),this.setAttribute("uv",new Ze(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var tn=class extends Dt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tc,this.normalScale=new Ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Bn=class extends tn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ie(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ge(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ge(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ge(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function ra(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function a_(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function c_(i){function e(r,o){return i[r]-i[o]}let t=i.length,n=new Array(t);for(let r=0;r!==t;++r)n[r]=r;return n.sort(e),n}function Pd(i,e,t){let n=i.length,r=new i.constructor(n);for(let o=0,s=0;s!==n;++o){let a=t[o]*e;for(let c=0;c!==e;++c)r[s++]=i[a+c]}return r}function Id(i,e,t,n){let r=1,o=i[0];for(;o!==void 0&&o[n]===void 0;)o=i[r++];if(o===void 0)return;let s=o[n];if(s!==void 0)if(Array.isArray(s))do s=o[n],s!==void 0&&(e.push(o.time),t.push.apply(t,s)),o=i[r++];while(o!==void 0);else if(s.toArray!==void 0)do s=o[n],s!==void 0&&(e.push(o.time),s.toArray(t,t.length)),o=i[r++];while(o!==void 0);else do s=o[n],s!==void 0&&(e.push(o.time),t.push(s)),o=i[r++];while(o!==void 0)}var Fn=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],o=t[n-1];n:{e:{let s;t:{i:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<o)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(o=r,r=t[++n],e<r)break e}s=t.length;break t}if(!(e>=o)){let a=t[1];e<a&&(n=2,o=a);for(let c=n-2;;){if(o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(r=o,o=t[--n-1],e>=o)break e}s=n,n=0;break t}break n}for(;n<s;){let a=n+s>>>1;e<t[a]?s=a:n=a+1}if(r=t[n],o=t[n-1],o===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,o,r)}return this.interpolate_(n,o,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,o=e*r;for(let s=0;s!==r;++s)t[s]=n[o+s];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}};var Qc=class extends Fn{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Xu,endingEnd:Xu}}intervalChanged_(e,t,n){let r=this.parameterPositions,o=e-2,s=e+1,a=r[o],c=r[s];if(a===void 0)switch(this.getSettings_().endingStart){case qu:o=e,a=2*t-n;break;case Yu:o=r.length-2,a=t+r[o]-r[o+1];break;default:o=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case qu:s=e,c=2*n-t;break;case Yu:s=1,c=n+r[1]-r[0];break;default:s=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=o*u,this._offsetNext=s*u}interpolate_(e,t,n,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(n-t)/(r-t),x=g*g,m=x*g,p=-h*m+2*h*x-h*g,v=(1+h)*m+(-1.5-2*h)*x+(-.5+h)*g+1,_=(-1-f)*m+(1.5+f)*x+.5*g,T=f*m-f*x;for(let A=0;A!==a;++A)o[A]=p*s[u+A]+v*s[l+A]+_*s[c+A]+T*s[d+A];return o}};var el=class extends Fn{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(r-t),d=1-u;for(let h=0;h!==a;++h)o[h]=s[l+h]*d+s[c+h]*u;return o}};var tl=class extends Fn{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}};var Vt=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ra(t,this.TimeBufferType),this.values=ra(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ra(e.times,Array),values:ra(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new tl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new el(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Qc(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ki:t=this.InterpolantFactoryMethodDiscrete;break;case Gi:t=this.InterpolantFactoryMethodLinear;break;case Qa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ki;case this.InterpolantFactoryMethodLinear:return Gi;case this.InterpolantFactoryMethodSmooth:return Qa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,o=0,s=r-1;for(;o!==r&&n[o]<e;)++o;for(;s!==-1&&n[s]>t;)--s;if(++s,o!==0||s!==r){o>=s&&(s=Math.max(s,1),o=s-1);let a=this.getValueSize();this.times=n.slice(o,s),this.values=this.values.slice(o*a,s*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,o=n.length;o===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let a=0;a!==o;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(s!==null&&s>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,s),e=!1;break}s=c}if(r!==void 0&&a_(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Qa,o=e.length-1,s=1;for(let a=1;a<o;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let d=a*n,h=d-n,f=d+n;for(let g=0;g!==n;++g){let x=t[d+g];if(x!==t[h+g]||x!==t[f+g]){c=!0;break}}}if(c){if(a!==s){e[s]=e[a];let d=a*n,h=s*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++s}}if(o>0){e[s]=e[o];for(let a=o*n,c=s*n,l=0;l!==n;++l)t[c+l]=t[a+l];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=t.slice(0,s*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Vt.prototype.TimeBufferType=Float32Array;Vt.prototype.ValueBufferType=Float32Array;Vt.prototype.DefaultInterpolation=Gi;var tr=class extends Vt{};tr.prototype.ValueTypeName="bool";tr.prototype.ValueBufferType=Array;tr.prototype.DefaultInterpolation=ki;tr.prototype.InterpolantFactoryMethodLinear=void 0;tr.prototype.InterpolantFactoryMethodSmooth=void 0;var oa=class extends Vt{};oa.prototype.ValueTypeName="color";var ui=class extends Vt{};ui.prototype.ValueTypeName="number";var nl=class extends Fn{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=(n-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)Qt.slerpFlat(o,0,s,l-a,s,l,c);return o}};var $n=class extends Vt{InterpolantFactoryMethodLinear(e){return new nl(this.times,this.values,this.getValueSize(),e)}};$n.prototype.ValueTypeName="quaternion";$n.prototype.DefaultInterpolation=Gi;$n.prototype.InterpolantFactoryMethodSmooth=void 0;var nr=class extends Vt{};nr.prototype.ValueTypeName="string";nr.prototype.ValueBufferType=Array;nr.prototype.DefaultInterpolation=ki;nr.prototype.InterpolantFactoryMethodLinear=void 0;nr.prototype.InterpolantFactoryMethodSmooth=void 0;var di=class extends Vt{};di.prototype.ValueTypeName="vector";var sa=class{constructor(e,t=-1,n,r=Up){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=zt(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let s=0,a=n.length;s!==a;++s)t.push(OM(n[s]).scale(r));let o=new this(e.name,e.duration,t,e.blendMode);return o.uuid=e.uuid,o}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let o=0,s=n.length;o!==s;++o)t.push(Vt.toJSON(n[o]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let o=t.length,s=[];for(let a=0;a<o;a++){let c=[],l=[];c.push((a+o-1)%o,a,(a+1)%o),l.push(0,1,0);let u=c_(c);c=Pd(c,1,u),l=Pd(l,1,u),!r&&c[0]===0&&(c.push(o),l.push(l[0])),s.push(new ui(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,s)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let r=e;n=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<n.length;r++)if(n[r].name===t)return n[r];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},o=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],u=l.name.match(o);if(u&&u.length>1){let d=u[1],h=r[d];h||(r[d]=h=[]),h.push(l)}}let s=[];for(let a in r)s.push(this.CreateFromMorphTargetSequence(a,r[a],t,n));return s}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(d,h,f,g,x){if(f.length!==0){let m=[],p=[];Id(f,m,p,g),m.length!==0&&x.push(new d(h,m,p))}},r=[],o=e.name||"default",s=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let d=0;d<l.length;d++){let h=l[d].keys;if(!(!h||h.length===0))if(h[0].morphTargets){let f={},g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let x=0;x<h[g].morphTargets.length;x++)f[h[g].morphTargets[x]]=-1;for(let x in f){let m=[],p=[];for(let v=0;v!==h[g].morphTargets.length;++v){let _=h[g];m.push(_.time),p.push(_.morphTarget===x?1:0)}r.push(new ui(".morphTargetInfluence["+x+"]",m,p))}c=f.length*s}else{let f=".bones["+t[d].name+"]";n(di,f+".position",h,"pos",r),n($n,f+".quaternion",h,"rot",r),n(di,f+".scale",h,"scl",r)}}return r.length===0?null:new this(o,c,r,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,r=e.length;n!==r;++n){let o=this.tracks[n];t=Math.max(t,o.times[o.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function FM(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ui;case"vector":case"vector2":case"vector3":case"vector4":return di;case"color":return oa;case"quaternion":return $n;case"bool":case"boolean":return tr;case"string":return nr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function OM(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=FM(i.type);if(i.times===void 0){let t=[],n=[];Id(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var hi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};var os=class{constructor(e,t,n){let r=this,o=!1,s=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,o===!1&&r.onStart!==void 0&&r.onStart(u,s,a),o=!0},this.itemEnd=function(u){s++,r.onProgress!==void 0&&r.onProgress(u,s,a),s===a&&(o=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){let f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}},Dd=new os;var dn=class{constructor(e){this.manager=e!==void 0?e:Dd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,o){n.load(e,r,t,o)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};dn.DEFAULT_MATERIAL_NAME="__DEFAULT";var ir={},Ud=class extends Error{constructor(e,t){super(e),this.response=t}},rr=class extends dn{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let o=hi.get(e);if(o!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(o),this.manager.itemEnd(e)},0),o;if(ir[e]!==void 0){ir[e].push({onLoad:t,onProgress:n,onError:r});return}ir[e]=[],ir[e].push({onLoad:t,onProgress:n,onError:r});let s=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(s).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=ir[e],d=l.body.getReader(),h=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),f=h?parseInt(h):0,g=f!==0,x=0,m=new ReadableStream({start(p){v();function v(){d.read().then(({done:_,value:T})=>{if(_)p.close();else{x+=T.byteLength;let A=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let E=0,w=u.length;E<w;E++){let P=u[E];P.onProgress&&P.onProgress(A)}p.enqueue(T),v()}})}}});return new Response(m)}else throw new Ud(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{let d=/charset="?([^;"\s]*)"?/i.exec(a),h=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(h);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{hi.add(e,l);let u=ir[e];delete ir[e];for(let d=0,h=u.length;d<h;d++){let f=u[d];f.onLoad&&f.onLoad(l)}}).catch(l=>{let u=ir[e];if(u===void 0)throw this.manager.itemError(e),l;delete ir[e];for(let d=0,h=u.length;d<h;d++){let f=u[d];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var il=class extends dn{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let o=this,s=hi.get(e);if(s!==void 0)return o.manager.itemStart(e),setTimeout(function(){t&&t(s),o.manager.itemEnd(e)},0),s;let a=gr("img");function c(){u(),hi.add(e,this),t&&t(this),o.manager.itemEnd(e)}function l(d){u(),r&&r(d),o.manager.itemError(e),o.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),o.manager.itemStart(e),a.src=e,a}};var aa=class extends dn{constructor(e){super(e)}load(e,t,n,r){let o=new mt,s=new il(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(a){o.image=a,o.needsUpdate=!0,t!==void 0&&t(o)},n,r),o}};var Ti=class extends Xe{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ge(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}};var Nd=new Ue,u_=new L,d_=new L,Lr=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ie(512,512),this.map=null,this.mapPass=null,this.matrix=new Ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wr,this._frameExtents=new Ie(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;u_.setFromMatrixPosition(e.matrixWorld),t.position.copy(u_),d_.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(d_),t.updateMatrixWorld(),Nd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Nd),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Nd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var rl=class extends Lr{constructor(){super(new ft(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=Vi*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,o=e.distance||t.far;(n!==t.fov||r!==t.aspect||o!==t.far)&&(t.fov=n,t.aspect=r,t.far=o,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}};var Pr=class extends Ti{constructor(e,t,n=0,r=Math.PI/3,o=0,s=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Xe.DEFAULT_UP),this.updateMatrix(),this.target=new Xe,this.distance=n,this.angle=r,this.penumbra=o,this.decay=s,this.map=null,this.shadow=new rl}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var h_=new Ue,ca=new L,Bd=new L,ol=class extends Lr{constructor(){super(new ft(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ie(4,2),this._viewportCount=6,this._viewports=[new rt(2,1,1,1),new rt(0,1,1,1),new rt(3,1,1,1),new rt(1,1,1,1),new rt(3,0,1,1),new rt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,r=this.matrix,o=e.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),ca.setFromMatrixPosition(e.matrixWorld),n.position.copy(ca),Bd.copy(n.position),Bd.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Bd),n.updateMatrixWorld(),r.makeTranslation(-ca.x,-ca.y,-ca.z),h_.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(h_)}};var fi=class extends Ti{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new ol}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}};var sl=class extends Lr{constructor(){super(new Zi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}};var Si=class extends Ti{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Xe.DEFAULT_UP),this.updateMatrix(),this.target=new Xe,this.shadow=new sl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var la=class extends Ti{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var or=class{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,r=e.length;n<r;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var ua=class extends dn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let o=this,s=hi.get(e);if(s!==void 0){if(o.manager.itemStart(e),s.then){s.then(l=>{t&&t(l),o.manager.itemEnd(e)}).catch(l=>{r&&r(l)});return}return setTimeout(function(){t&&t(s),o.manager.itemEnd(e)},0),s}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(o.options,{colorSpaceConversion:"none"}))}).then(function(l){return hi.add(e,l),t&&t(l),o.manager.itemEnd(e),l}).catch(function(l){r&&r(l),hi.remove(e),o.manager.itemError(e),o.manager.itemEnd(e)});hi.add(e,c),o.manager.itemStart(e)}};var da=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=f_(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=f_();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function f_(){return(typeof performance>"u"?Date:performance).now()}var Od="\\[\\]\\.:\\/",HM=new RegExp("["+Od+"]","g"),Hd="[^"+Od+"]",zM="[^"+Od.replace("\\.","")+"]",kM=/((?:WC+[\/:])*)/.source.replace("WC",Hd),GM=/(WCOD+)?/.source.replace("WCOD",zM),VM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Hd),WM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Hd),XM=new RegExp("^"+kM+GM+VM+WM+"$"),qM=["material","materials","bones","map"],Fd=class{constructor(e,t,n){let r=n||gt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,o=n.length;r!==o;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},gt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(HM,"")}static parseTrackName(e){let t=XM.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let o=n.nodeName.substring(r+1);qM.indexOf(o)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=o)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(o){for(let s=0;s<o.length;s++){let a=o[s];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,o=n.length;r!==o;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,o=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let s=e[r];if(s===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(o!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[o]!==void 0&&(o=e.morphTargetDictionary[o])}c=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=o}else s.fromArray!==void 0&&s.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(c=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};gt.Composite=Fd;gt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};gt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};gt.prototype.GetterByBindingType=[gt.prototype._getValue_direct,gt.prototype._getValue_array,gt.prototype._getValue_arrayElement,gt.prototype._getValue_toArray];gt.prototype.SetterByBindingTypeAndVersioning=[[gt.prototype._setValue_direct,gt.prototype._setValue_direct_setNeedsUpdate,gt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_array,gt.prototype._setValue_array_setNeedsUpdate,gt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_arrayElement,gt.prototype._setValue_arrayElement_setNeedsUpdate,gt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[gt.prototype._setValue_fromArray,gt.prototype._setValue_fromArray_setNeedsUpdate,gt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ha=class{constructor(e,t,n=0,r=1/0){this.ray=new qn(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Tr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return zd(e,this,n,t),n.sort(p_),n}intersectObjects(e,t=!0,n=[]){for(let r=0,o=e.length;r<o;r++)zd(e[r],this,n,t);return n.sort(p_),n}};function p_(i,e){return i.distance-e.distance}function zd(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){let r=i.children;for(let o=0,s=r.length;o<s;o++)zd(r[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");function Gd(i,e){if(e===ju)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===bo||e===ks){let t=i.getIndex();if(t===null){let s=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)s.push(c);i.setIndex(s),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,r=[];if(e===bo)for(let s=1;s<=n;s++)r.push(t.getX(0)),r.push(t.getX(s)),r.push(t.getX(s+1));else for(let s=0;s<n;s++)s%2===0?(r.push(t.getX(s)),r.push(t.getX(s+1)),r.push(t.getX(s+2))):(r.push(t.getX(s+2)),r.push(t.getX(s+1)),r.push(t.getX(s)));r.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let o=i.clone();return o.setIndex(r),o.clearGroups(),o}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var as=class extends dn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Kd(t)}),this.register(function(t){return new rh(t)}),this.register(function(t){return new oh(t)}),this.register(function(t){return new sh(t)}),this.register(function(t){return new Zd(t)}),this.register(function(t){return new Jd(t)}),this.register(function(t){return new Qd(t)}),this.register(function(t){return new eh(t)}),this.register(function(t){return new jd(t)}),this.register(function(t){return new th(t)}),this.register(function(t){return new $d(t)}),this.register(function(t){return new ih(t)}),this.register(function(t){return new nh(t)}),this.register(function(t){return new qd(t)}),this.register(function(t){return new ah(t)}),this.register(function(t){return new ch(t)})}load(e,t,n,r){let o=this,s;if(this.resourcePath!=="")s=this.resourcePath;else if(this.path!==""){let l=or.extractUrlBase(e);s=or.resolveURL(l,this.path)}else s=or.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){r?r(l):console.error(l),o.manager.itemError(e),o.manager.itemEnd(e)},c=new rr(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{o.parse(l,s,function(u){t(u),o.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let o,s={},a={},c=new TextDecoder;if(typeof e=="string")o=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===y_){try{s[ot.KHR_BINARY_GLTF]=new lh(e)}catch(d){r&&r(d);return}o=JSON.parse(s[ot.KHR_BINARY_GLTF].content)}else o=JSON.parse(c.decode(e));else o=e;if(o.asset===void 0||o.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new gh(o,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let d=this.pluginCallbacks[u](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,s[d.name]=!0}if(o.extensionsUsed)for(let u=0;u<o.extensionsUsed.length;++u){let d=o.extensionsUsed[u],h=o.extensionsRequired||[];switch(d){case ot.KHR_MATERIALS_UNLIT:s[d]=new Yd;break;case ot.KHR_DRACO_MESH_COMPRESSION:s[d]=new uh(o,this.dracoLoader);break;case ot.KHR_TEXTURE_TRANSFORM:s[d]=new dh;break;case ot.KHR_MESH_QUANTIZATION:s[d]=new hh;break;default:h.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(s),l.setPlugins(a),l.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,o){n.parse(e,t,r,o)})}};function YM(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var ot={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},qd=class{constructor(e){this.parser=e,this.name=ot.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let o=t[n];o.extensions&&o.extensions[this.name]&&o.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,o.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,r=t.cache.get(n);if(r)return r;let o=t.json,c=((o.extensions&&o.extensions[this.name]||{}).lights||[])[e],l,u=new ge(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],pt);let d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Si(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new fi(u),l.distance=d;break;case"spot":l=new Pr(u),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Dr(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),r=Promise.resolve(l),t.cache.add(n,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,o=n.json.nodes[e],a=(o.extensions&&o.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},Yd=class{constructor(){this.name=ot.KHR_MATERIALS_UNLIT}getMaterialType(){return Ut}extendParams(e,t,n){let r=[];e.color=new ge(1,1,1),e.opacity=1;let o=t.pbrMetallicRoughness;if(o){if(Array.isArray(o.baseColorFactor)){let s=o.baseColorFactor;e.color.setRGB(s[0],s[1],s[2],pt),e.opacity=s[3]}o.baseColorTexture!==void 0&&r.push(n.assignTexture(e,"map",o.baseColorTexture,nt))}return Promise.all(r)}},jd=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=r.extensions[this.name].emissiveStrength;return o!==void 0&&(t.emissiveIntensity=o),Promise.resolve()}},Kd=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];if(s.clearcoatFactor!==void 0&&(t.clearcoat=s.clearcoatFactor),s.clearcoatTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatMap",s.clearcoatTexture)),s.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=s.clearcoatRoughnessFactor),s.clearcoatRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"clearcoatRoughnessMap",s.clearcoatRoughnessTexture)),s.clearcoatNormalTexture!==void 0&&(o.push(n.assignTexture(t,"clearcoatNormalMap",s.clearcoatNormalTexture)),s.clearcoatNormalTexture.scale!==void 0)){let a=s.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ie(a,a)}return Promise.all(o)}},$d=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];return s.iridescenceFactor!==void 0&&(t.iridescence=s.iridescenceFactor),s.iridescenceTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceMap",s.iridescenceTexture)),s.iridescenceIor!==void 0&&(t.iridescenceIOR=s.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),s.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=s.iridescenceThicknessMinimum),s.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=s.iridescenceThicknessMaximum),s.iridescenceThicknessTexture!==void 0&&o.push(n.assignTexture(t,"iridescenceThicknessMap",s.iridescenceThicknessTexture)),Promise.all(o)}},Zd=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[];t.sheenColor=new ge(0,0,0),t.sheenRoughness=0,t.sheen=1;let s=r.extensions[this.name];if(s.sheenColorFactor!==void 0){let a=s.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],pt)}return s.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=s.sheenRoughnessFactor),s.sheenColorTexture!==void 0&&o.push(n.assignTexture(t,"sheenColorMap",s.sheenColorTexture,nt)),s.sheenRoughnessTexture!==void 0&&o.push(n.assignTexture(t,"sheenRoughnessMap",s.sheenRoughnessTexture)),Promise.all(o)}},Jd=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];return s.transmissionFactor!==void 0&&(t.transmission=s.transmissionFactor),s.transmissionTexture!==void 0&&o.push(n.assignTexture(t,"transmissionMap",s.transmissionTexture)),Promise.all(o)}},Qd=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];t.thickness=s.thicknessFactor!==void 0?s.thicknessFactor:0,s.thicknessTexture!==void 0&&o.push(n.assignTexture(t,"thicknessMap",s.thicknessTexture)),t.attenuationDistance=s.attenuationDistance||1/0;let a=s.attenuationColor||[1,1,1];return t.attenuationColor=new ge().setRGB(a[0],a[1],a[2],pt),Promise.all(o)}},eh=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){let r=this.parser.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=r.extensions[this.name];return t.ior=o.ior!==void 0?o.ior:1.5,Promise.resolve()}},th=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];t.specularIntensity=s.specularFactor!==void 0?s.specularFactor:1,s.specularTexture!==void 0&&o.push(n.assignTexture(t,"specularIntensityMap",s.specularTexture));let a=s.specularColorFactor||[1,1,1];return t.specularColor=new ge().setRGB(a[0],a[1],a[2],pt),s.specularColorTexture!==void 0&&o.push(n.assignTexture(t,"specularColorMap",s.specularColorTexture,nt)),Promise.all(o)}},nh=class{constructor(e){this.parser=e,this.name=ot.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];return t.bumpScale=s.bumpFactor!==void 0?s.bumpFactor:1,s.bumpTexture!==void 0&&o.push(n.assignTexture(t,"bumpMap",s.bumpTexture)),Promise.all(o)}},ih=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Bn}extendMaterialParams(e,t){let n=this.parser,r=n.json.materials[e];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();let o=[],s=r.extensions[this.name];return s.anisotropyStrength!==void 0&&(t.anisotropy=s.anisotropyStrength),s.anisotropyRotation!==void 0&&(t.anisotropyRotation=s.anisotropyRotation),s.anisotropyTexture!==void 0&&o.push(n.assignTexture(t,"anisotropyMap",s.anisotropyTexture)),Promise.all(o)}},rh=class{constructor(e){this.parser=e,this.name=ot.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let o=r.extensions[this.name],s=t.options.ktx2Loader;if(!s){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,o.source,s)}},oh=class{constructor(e){this.parser=e,this.name=ot.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,r=n.json,o=r.textures[e];if(!o.extensions||!o.extensions[t])return null;let s=o.extensions[t],a=r.images[s.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,s.source,c);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},sh=class{constructor(e){this.parser=e,this.name=ot.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,r=n.json,o=r.textures[e];if(!o.extensions||!o.extensions[t])return null;let s=o.extensions[t],a=r.images[s.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,s.source,c);if(r.extensionsRequired&&r.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},ah=class{constructor(e){this.name=ot.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let r=n.extensions[this.name],o=this.parser.getDependency("buffer",r.buffer),s=this.parser.options.meshoptDecoder;if(!s||!s.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return o.then(function(a){let c=r.byteOffset||0,l=r.byteLength||0,u=r.count,d=r.byteStride,h=new Uint8Array(a,c,l);return s.decodeGltfBufferAsync?s.decodeGltfBufferAsync(u,d,h,r.mode,r.filter).then(function(f){return f.buffer}):s.ready.then(function(){let f=new ArrayBuffer(u*d);return s.decodeGltfBuffer(new Uint8Array(f),u,d,h,r.mode,r.filter),f})})}else return null}},ch=class{constructor(e){this.name=ot.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let l of r.primitives)if(l.mode!==Zn.TRIANGLES&&l.mode!==Zn.TRIANGLE_STRIP&&l.mode!==Zn.TRIANGLE_FAN&&l.mode!==void 0)return null;let s=n.extensions[this.name].attributes,a=[],c={};for(let l in s)a.push(this.parser.getDependency("accessor",s[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let u=l.pop(),d=u.isGroup?u.children:[u],h=l[0].count,f=[];for(let g of d){let x=new Ue,m=new L,p=new Qt,v=new L(1,1,1),_=new ro(g.geometry,g.material,h);for(let T=0;T<h;T++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,T),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,T),c.SCALE&&v.fromBufferAttribute(c.SCALE,T),_.setMatrixAt(T,x.compose(m,p,v));for(let T in c)if(T==="_COLOR_0"){let A=c[T];_.instanceColor=new bi(A.array,A.itemSize,A.normalized)}else T!=="TRANSLATION"&&T!=="ROTATION"&&T!=="SCALE"&&g.geometry.setAttribute(T,c[T]);Xe.prototype.copy.call(_,g),this.parser.assignFinalMaterial(_),f.push(_)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}},y_="glTF",fa=12,m_={JSON:1313821514,BIN:5130562},lh=class{constructor(e){this.name=ot.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,fa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==y_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let r=this.header.length-fa,o=new DataView(e,fa),s=0;for(;s<r;){let a=o.getUint32(s,!0);s+=4;let c=o.getUint32(s,!0);if(s+=4,c===m_.JSON){let l=new Uint8Array(e,fa+s,a);this.content=n.decode(l)}else if(c===m_.BIN){let l=fa+s;this.body=e.slice(l,l+a)}s+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},uh=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ot.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,o=e.extensions[this.name].bufferView,s=e.extensions[this.name].attributes,a={},c={},l={};for(let u in s){let d=ph[u]||u.toLowerCase();a[d]=s[u]}for(let u in e.attributes){let d=ph[u]||u.toLowerCase();if(s[u]!==void 0){let h=n.accessors[e.attributes[u]],f=ss[h.componentType];l[d]=f.name,c[d]=h.normalized===!0}}return t.getDependency("bufferView",o).then(function(u){return new Promise(function(d,h){r.decodeDracoFile(u,function(f){for(let g in f.attributes){let x=f.attributes[g],m=c[g];m!==void 0&&(x.normalized=m)}d(f)},a,l,pt,h)})})}},dh=class{constructor(){this.name=ot.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},hh=class{constructor(){this.name=ot.KHR_MESH_QUANTIZATION}},al=class extends Fn{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,o=e*r*3+r;for(let s=0;s!==r;s++)t[s]=n[o+s];return t}interpolate_(e,t,n,r){let o=this.resultBuffer,s=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=r-t,d=(n-t)/u,h=d*d,f=h*d,g=e*l,x=g-l,m=-2*f+3*h,p=f-h,v=1-m,_=p-h+d;for(let T=0;T!==a;T++){let A=s[x+T+a],E=s[x+T+c]*u,w=s[g+T+a],P=s[g+T]*u;o[T]=v*A+_*E+m*w+p*P}return o}},jM=new Qt,fh=class extends al{interpolate_(e,t,n,r){let o=super.interpolate_(e,t,n,r);return jM.fromArray(o).normalize().toArray(o),o}},Zn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ss={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},g_={9728:Tt,9729:Bt,9984:zs,9985:za,9986:Eo,9987:Vn},x_={33071:Ot,33648:Vr,10497:ni},Vd={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ph={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ir={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},KM={CUBICSPLINE:void 0,LINEAR:Gi,STEP:ki},Wd={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function $M(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new tn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Zt})),i.DefaultMaterial}function so(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Dr(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function ZM(i,e,t){let n=!1,r=!1,o=!1;for(let l=0,u=e.length;l<u;l++){let d=e[l];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(r=!0),d.COLOR_0!==void 0&&(o=!0),n&&r&&o)break}if(!n&&!r&&!o)return Promise.resolve(i);let s=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){let d=e[l];if(n){let h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):i.attributes.position;s.push(h)}if(r){let h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):i.attributes.normal;a.push(h)}if(o){let h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):i.attributes.color;c.push(h)}}return Promise.all([Promise.all(s),Promise.all(a),Promise.all(c)]).then(function(l){let u=l[0],d=l[1],h=l[2];return n&&(i.morphAttributes.position=u),r&&(i.morphAttributes.normal=d),o&&(i.morphAttributes.color=h),i.morphTargetsRelative=!0,i})}function JM(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,r=t.length;n<r;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function QM(i){let e,t=i.extensions&&i.extensions[ot.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Xd(t.attributes):e=i.indices+":"+Xd(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,r=i.targets.length;n<r;n++)e+=":"+Xd(i.targets[n]);return e}function Xd(i){let e="",t=Object.keys(i).sort();for(let n=0,r=t.length;n<r;n++)e+=t[n]+":"+i[t[n]]+";";return e}function mh(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function eb(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var tb=new Ue,gh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new YM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=!1,o=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,r=navigator.userAgent.indexOf("Firefox")>-1,o=r?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||r&&o<98?this.textureLoader=new aa(this.options.manager):this.textureLoader=new ua(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new rr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,o=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(s){return s._markDefs&&s._markDefs()}),Promise.all(this._invokeAll(function(s){return s.beforeRoot&&s.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(s){let a={scene:s[0][r.scene||0],scenes:s[0],animations:s[1],cameras:s[2],asset:r.asset,parser:n,userData:{}};return so(o,a,r),Dr(a,r),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let r=0,o=t.length;r<o;r++){let s=t[r].joints;for(let a=0,c=s.length;a<c;a++)e[s[a]].isBone=!0}for(let r=0,o=e.length;r<o;r++){let s=e[r];s.mesh!==void 0&&(this._addNodeRef(this.meshCache,s.mesh),s.skin!==void 0&&(n[s.mesh].isSkinnedMesh=!0)),s.camera!==void 0&&this._addNodeRef(this.cameraCache,s.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),o=(s,a)=>{let c=this.associations.get(s);c!=null&&this.associations.set(a,c);for(let[l,u]of s.children.entries())o(u,a.children[l])};return o(n,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let o=e(t[r]);o&&n.push(o)}return n}getDependency(e,t){let n=e+":"+t,r=this.cache.get(n);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(o){return o.loadNode&&o.loadNode(t)});break;case"mesh":r=this._invokeOne(function(o){return o.loadMesh&&o.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(o){return o.loadBufferView&&o.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(o){return o.loadMaterial&&o.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(o){return o.loadTexture&&o.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(o){return o.loadAnimation&&o.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(o){return o!=this&&o.getDependency&&o.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(o,s){return n.getDependency(e,s)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ot.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(o,s){n.load(or.resolveURL(t.uri,r.path),o,void 0,function(){s(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let r=t.byteLength||0,o=t.byteOffset||0;return n.slice(o,o+r)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let s=Vd[r.type],a=ss[r.componentType],c=r.normalized===!0,l=new a(r.count*s);return Promise.resolve(new Ke(l,s,c))}let o=[];return r.bufferView!==void 0?o.push(this.getDependency("bufferView",r.bufferView)):o.push(null),r.sparse!==void 0&&(o.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),o.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(o).then(function(s){let a=s[0],c=Vd[r.type],l=ss[r.componentType],u=l.BYTES_PER_ELEMENT,d=u*c,h=r.byteOffset||0,f=r.bufferView!==void 0?n.bufferViews[r.bufferView].byteStride:void 0,g=r.normalized===!0,x,m;if(f&&f!==d){let p=Math.floor(h/f),v="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+p+":"+r.count,_=t.cache.get(v);_||(x=new l(a,p*f,r.count*f/u),_=new to(x,f/u),t.cache.add(v,_)),m=new no(_,c,h%f/u,g)}else a===null?x=new l(r.count*c):x=new l(a,h,r.count*c),m=new Ke(x,c,g);if(r.sparse!==void 0){let p=Vd.SCALAR,v=ss[r.sparse.indices.componentType],_=r.sparse.indices.byteOffset||0,T=r.sparse.values.byteOffset||0,A=new v(s[1],_,r.sparse.count*p),E=new l(s[2],T,r.sparse.count*c);a!==null&&(m=new Ke(m.array.slice(),m.itemSize,m.normalized));for(let w=0,P=A.length;w<P;w++){let y=A[w];if(m.setX(y,E[w*c]),c>=2&&m.setY(y,E[w*c+1]),c>=3&&m.setZ(y,E[w*c+2]),c>=4&&m.setW(y,E[w*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){let t=this.json,n=this.options,o=t.textures[e].source,s=t.images[o],a=this.textureLoader;if(s.uri){let c=n.manager.getHandler(s.uri);c!==null&&(a=c)}return this.loadTextureImage(e,o,a)}loadTextureImage(e,t,n){let r=this,o=this.json,s=o.textures[e],a=o.images[t],c=(a.uri||a.bufferView)+":"+s.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=s.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let h=(o.samplers||{})[s.sampler]||{};return u.magFilter=g_[h.magFilter]||Bt,u.minFilter=g_[h.minFilter]||Vn,u.wrapS=x_[h.wrapS]||ni,u.wrapT=x_[h.wrapT]||ni,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,r=this.json,o=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let s=r.images[e],a=self.URL||self.webkitURL,c=s.uri||"",l=!1;if(s.bufferView!==void 0)c=n.getDependency("bufferView",s.bufferView).then(function(d){l=!0;let h=new Blob([d],{type:s.mimeType});return c=a.createObjectURL(h),c});else if(s.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(d){return new Promise(function(h,f){let g=h;t.isImageBitmapLoader===!0&&(g=function(x){let m=new mt(x);m.needsUpdate=!0,h(m)}),t.load(or.resolveURL(d,o.path),g,void 0,f)})}).then(function(d){return l===!0&&a.revokeObjectURL(c),d.userData.mimeType=s.mimeType||eb(s.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,r){let o=this;return this.getDependency("texture",n.index).then(function(s){if(!s)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(s=s.clone(),s.channel=n.texCoord),o.extensions[ot.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[ot.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=o.associations.get(s);s=o.extensions[ot.KHR_TEXTURE_TRANSFORM].extendTexture(s,a),o.associations.set(s,c)}}return r!==void 0&&(s.colorSpace=r),e[t]=s,s})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,o=t.attributes.color!==void 0,s=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new er,Dt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new li,Dt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(r||o||s){let a="ClonedMaterial:"+n.uuid+":";r&&(a+="derivative-tangents:"),o&&(a+="vertex-colors:"),s&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),o&&(c.vertexColors=!0),s&&(c.flatShading=!0),r&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return tn}loadMaterial(e){let t=this,n=this.json,r=this.extensions,o=n.materials[e],s,a={},c=o.extensions||{},l=[];if(c[ot.KHR_MATERIALS_UNLIT]){let d=r[ot.KHR_MATERIALS_UNLIT];s=d.getMaterialType(),l.push(d.extendParams(a,o,t))}else{let d=o.pbrMetallicRoughness||{};if(a.color=new ge(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){let h=d.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],pt),a.opacity=h[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",d.baseColorTexture,nt)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),s=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}o.doubleSided===!0&&(a.side=It);let u=o.alphaMode||Wd.OPAQUE;if(u===Wd.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Wd.MASK&&(a.alphaTest=o.alphaCutoff!==void 0?o.alphaCutoff:.5)),o.normalTexture!==void 0&&s!==Ut&&(l.push(t.assignTexture(a,"normalMap",o.normalTexture)),a.normalScale=new Ie(1,1),o.normalTexture.scale!==void 0)){let d=o.normalTexture.scale;a.normalScale.set(d,d)}if(o.occlusionTexture!==void 0&&s!==Ut&&(l.push(t.assignTexture(a,"aoMap",o.occlusionTexture)),o.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=o.occlusionTexture.strength)),o.emissiveFactor!==void 0&&s!==Ut){let d=o.emissiveFactor;a.emissive=new ge().setRGB(d[0],d[1],d[2],pt)}return o.emissiveTexture!==void 0&&s!==Ut&&l.push(t.assignTexture(a,"emissiveMap",o.emissiveTexture,nt)),Promise.all(l).then(function(){let d=new s(a);return o.name&&(d.name=o.name),Dr(d,o),t.associations.set(d,{materials:e}),o.extensions&&so(r,d,o),d})}createUniqueName(e){let t=gt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function o(a){return n[ot.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return __(c,a,t)})}let s=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],u=QM(l),d=r[u];if(d)s.push(d.promise);else{let h;l.extensions&&l.extensions[ot.KHR_DRACO_MESH_COMPRESSION]?h=o(l):h=__(new Je,l,t),r[u]={primitive:l,promise:h},s.push(h)}}return Promise.all(s)}loadMesh(e){let t=this,n=this.json,r=this.extensions,o=n.meshes[e],s=o.primitives,a=[];for(let c=0,l=s.length;c<l;c++){let u=s[c].material===void 0?$M(this.cache):this.getDependency("material",s[c].material);a.push(u)}return a.push(t.loadGeometries(s)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],d=[];for(let f=0,g=u.length;f<g;f++){let x=u[f],m=s[f],p,v=l[f];if(m.mode===Zn.TRIANGLES||m.mode===Zn.TRIANGLE_STRIP||m.mode===Zn.TRIANGLE_FAN||m.mode===void 0)p=o.isSkinnedMesh===!0?new $s(x,v):new Ge(x,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Zn.TRIANGLE_STRIP?p.geometry=Gd(p.geometry,ks):m.mode===Zn.TRIANGLE_FAN&&(p.geometry=Gd(p.geometry,bo));else if(m.mode===Zn.LINES)p=new Qi(x,v);else if(m.mode===Zn.LINE_STRIP)p=new Ji(x,v);else if(m.mode===Zn.LINE_LOOP)p=new ea(x,v);else if(m.mode===Zn.POINTS)p=new Cr(x,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&JM(p,o),p.name=t.createUniqueName(o.name||"mesh_"+e),Dr(p,o),m.extensions&&so(r,p,m),t.assignFinalMaterial(p),d.push(p)}for(let f=0,g=d.length;f<g;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return o.extensions&&so(r,d[0],o),d[0];let h=new St;o.extensions&&so(r,h,o),t.associations.set(h,{meshes:e});for(let f=0,g=d.length;f<g;f++)h.add(d[f]);return h})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new ft(ne.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type==="orthographic"&&(t=new Zi(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Dr(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let r=0,o=t.joints.length;r<o;r++)n.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(r){let o=r.pop(),s=r,a=[],c=[];for(let l=0,u=s.length;l<u;l++){let d=s[l];if(d){a.push(d);let h=new Ue;o!==null&&h.fromArray(o.array,l*16),c.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Zs(a,c)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],o=r.name?r.name:"animation_"+e,s=[],a=[],c=[],l=[],u=[];for(let d=0,h=r.channels.length;d<h;d++){let f=r.channels[d],g=r.samplers[f.sampler],x=f.target,m=x.node,p=r.parameters!==void 0?r.parameters[g.input]:g.input,v=r.parameters!==void 0?r.parameters[g.output]:g.output;x.node!==void 0&&(s.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",v)),l.push(g),u.push(x))}return Promise.all([Promise.all(s),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(d){let h=d[0],f=d[1],g=d[2],x=d[3],m=d[4],p=[];for(let v=0,_=h.length;v<_;v++){let T=h[v],A=f[v],E=g[v],w=x[v],P=m[v];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();let y=n._createAnimationTracks(T,A,E,w,P);if(y)for(let M=0;M<y.length;M++)p.push(y[M])}return new sa(o,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency("mesh",r.mesh).then(function(o){let s=n._getNodeRef(n.meshCache,r.mesh,o);return r.weights!==void 0&&s.traverse(function(a){if(a.isMesh)for(let c=0,l=r.weights.length;c<l;c++)a.morphTargetInfluences[c]=r.weights[c]}),s})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],o=n._loadNodeShallow(e),s=[],a=r.children||[];for(let l=0,u=a.length;l<u;l++)s.push(n.getDependency("node",a[l]));let c=r.skin===void 0?Promise.resolve(null):n.getDependency("skin",r.skin);return Promise.all([o,Promise.all(s),c]).then(function(l){let u=l[0],d=l[1],h=l[2];h!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(h,tb)});for(let f=0,g=d.length;f<g;f++)u.add(d[f]);return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let o=t.nodes[e],s=o.name?r.createUniqueName(o.name):"",a=[],c=r._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),o.camera!==void 0&&a.push(r.getDependency("camera",o.camera).then(function(l){return r._getNodeRef(r.cameraCache,o.camera,l)})),r._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(o.isBone===!0?u=new io:l.length>1?u=new St:l.length===1?u=l[0]:u=new Xe,u!==l[0])for(let d=0,h=l.length;d<h;d++)u.add(l[d]);if(o.name&&(u.userData.name=o.name,u.name=s),Dr(u,o),o.extensions&&so(n,u,o),o.matrix!==void 0){let d=new Ue;d.fromArray(o.matrix),u.applyMatrix4(d)}else o.translation!==void 0&&u.position.fromArray(o.translation),o.rotation!==void 0&&u.quaternion.fromArray(o.rotation),o.scale!==void 0&&u.scale.fromArray(o.scale);return r.associations.has(u)||r.associations.set(u,{}),r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,o=new St;n.name&&(o.name=r.createUniqueName(n.name)),Dr(o,n),n.extensions&&so(t,o,n);let s=n.nodes||[],a=[];for(let c=0,l=s.length;c<l;c++)a.push(r.getDependency("node",s[c]));return Promise.all(a).then(function(c){for(let u=0,d=c.length;u<d;u++)o.add(c[u]);let l=u=>{let d=new Map;for(let[h,f]of r.associations)(h instanceof Dt||h instanceof mt)&&d.set(h,f);return u.traverse(h=>{let f=r.associations.get(h);f!=null&&d.set(h,f)}),d};return r.associations=l(o),o})}_createAnimationTracks(e,t,n,r,o){let s=[],a=e.name?e.name:e.uuid,c=[];Ir[o.path]===Ir.weights?e.traverse(function(h){h.morphTargetInfluences&&c.push(h.name?h.name:h.uuid)}):c.push(a);let l;switch(Ir[o.path]){case Ir.weights:l=ui;break;case Ir.rotation:l=$n;break;case Ir.position:case Ir.scale:l=di;break;default:n.itemSize===1?l=ui:l=di;break}let u=r.interpolation!==void 0?KM[r.interpolation]:Gi,d=this._getArrayFromAccessor(n);for(let h=0,f=c.length;h<f;h++){let g=new l(c[h]+"."+Ir[o.path],t.array,d,u);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),s.push(g)}return s}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=mh(t.constructor),r=new Float32Array(t.length);for(let o=0,s=t.length;o<s;o++)r[o]=t[o]*n;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let r=this instanceof $n?fh:al;return new r(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function nb(i,e,t){let n=e.attributes,r=new dt;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(r.set(new L(c[0],c[1],c[2]),new L(l[0],l[1],l[2])),a.normalized){let u=mh(ss[a.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let o=e.targets;if(o!==void 0){let a=new L,c=new L;for(let l=0,u=o.length;l<u;l++){let d=o[l];if(d.POSITION!==void 0){let h=t.json.accessors[d.POSITION],f=h.min,g=h.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),h.normalized){let x=mh(ss[h.componentType]);c.multiplyScalar(x)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(a)}i.boundingBox=r;let s=new At;r.getCenter(s.center),s.radius=r.min.distanceTo(r.max)/2,i.boundingSphere=s}function __(i,e,t){let n=e.attributes,r=[];function o(s,a){return t.getDependency("accessor",s).then(function(c){i.setAttribute(a,c)})}for(let s in n){let a=ph[s]||s.toLowerCase();a in i.attributes||r.push(o(n[s],a))}if(e.indices!==void 0&&!i.index){let s=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});r.push(s)}return $e.workingColorSpace!==pt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${$e.workingColorSpace}" not supported.`),Dr(i,e),nb(i,e,t),Promise.all(r).then(function(){return e.targets!==void 0?ZM(i,e.targets,t):i})}var xh=new WeakMap,cs=class extends dn{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,r){let o=new rr(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,s=>{this.parse(s,t,r)},n,r)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,nt).catch(n)}decodeDracoFile(e,t,n,r,o=pt,s=()=>{}){let a={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:r||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:o};return this.decodeGeometry(e,a).then(t).catch(s)}decodeGeometry(e,t){let n=JSON.stringify(t);if(xh.has(e)){let c=xh.get(e);if(c.key===n)return c.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let r,o=this.workerNextTaskID++,s=e.byteLength,a=this._getWorker(o,s).then(c=>(r=c,new Promise((l,u)=>{r._callbacks[o]={resolve:l,reject:u},r.postMessage({type:"decode",id:o,taskConfig:t,buffer:e},[e])}))).then(c=>this._createGeometry(c.geometry));return a.catch(()=>!0).then(()=>{r&&o&&this._releaseTask(r,o)}),xh.set(e,{key:n,promise:a}),a}_createGeometry(e){let t=new Je;e.index&&t.setIndex(new Ke(e.index.array,1));for(let n=0;n<e.attributes.length;n++){let r=e.attributes[n],o=r.name,s=r.array,a=r.itemSize,c=new Ke(s,a);o==="color"&&(this._assignVertexColorSpace(c,r.vertexColorSpace),c.normalized=!(s instanceof Float32Array)),t.setAttribute(o,c)}return t}_assignVertexColorSpace(e,t){if(t!==nt)return;let n=new ge;for(let r=0,o=e.count;r<o;r++)n.fromBufferAttribute(e,r).convertSRGBToLinear(),e.setXYZ(r,n.r,n.g,n.b)}_loadLibrary(e,t){let n=new rr(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((r,o)=>{n.load(e,r,void 0,o)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;let e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{let r=n[0];e||(this.decoderConfig.wasmBinary=n[1]);let o=ib.toString(),s=["/* draco decoder */",r,"","/* worker */",o.substring(o.indexOf("{")+1,o.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([s]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){let r=new Worker(this.workerSourceURL);r._callbacks={},r._taskCosts={},r._taskLoad=0,r.postMessage({type:"init",decoderConfig:this.decoderConfig}),r.onmessage=function(o){let s=o.data;switch(s.type){case"decode":r._callbacks[s.id].resolve(s);break;case"error":r._callbacks[s.id].reject(s);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+s.type+'"')}},this.workerPool.push(r)}else this.workerPool.sort(function(r,o){return r._taskLoad>o._taskLoad?-1:1});let n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}};function ib(){let i,e;onmessage=function(s){let a=s.data;switch(a.type){case"init":i=a.decoderConfig,e=new Promise(function(u){i.onModuleLoaded=function(d){u({draco:d})},DracoDecoderModule(i)});break;case"decode":let c=a.buffer,l=a.taskConfig;e.then(u=>{let d=u.draco,h=new d.Decoder;try{let f=t(d,h,new Int8Array(c),l),g=f.attributes.map(x=>x.array.buffer);f.index&&g.push(f.index.array.buffer),self.postMessage({type:"decode",id:a.id,geometry:f},g)}catch(f){console.error(f),self.postMessage({type:"error",id:a.id,error:f.message})}finally{d.destroy(h)}});break}};function t(s,a,c,l){let u=l.attributeIDs,d=l.attributeTypes,h,f,g=a.GetEncodedGeometryType(c);if(g===s.TRIANGULAR_MESH)h=new s.Mesh,f=a.DecodeArrayToMesh(c,c.byteLength,h);else if(g===s.POINT_CLOUD)h=new s.PointCloud,f=a.DecodeArrayToPointCloud(c,c.byteLength,h);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!f.ok()||h.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+f.error_msg());let x={index:null,attributes:[]};for(let m in u){let p=self[d[m]],v,_;if(l.useUniqueIDs)_=u[m],v=a.GetAttributeByUniqueId(h,_);else{if(_=a.GetAttributeId(h,s[u[m]]),_===-1)continue;v=a.GetAttribute(h,_)}let T=r(s,a,h,m,p,v);m==="color"&&(T.vertexColorSpace=l.vertexColorSpace),x.attributes.push(T)}return g===s.TRIANGULAR_MESH&&(x.index=n(s,a,h)),s.destroy(h),x}function n(s,a,c){let u=c.num_faces()*3,d=u*4,h=s._malloc(d);a.GetTrianglesUInt32Array(c,d,h);let f=new Uint32Array(s.HEAPF32.buffer,h,u).slice();return s._free(h),{array:f,itemSize:1}}function r(s,a,c,l,u,d){let h=d.num_components(),g=c.num_points()*h,x=g*u.BYTES_PER_ELEMENT,m=o(s,u),p=s._malloc(x);a.GetAttributeDataArrayForAllPoints(c,d,m,x,p);let v=new u(s.HEAPF32.buffer,p,g).slice();return s._free(p),{name:l,array:v,itemSize:h}}function o(s,a){switch(a){case Float32Array:return s.DT_FLOAT32;case Int8Array:return s.DT_INT8;case Int16Array:return s.DT_INT16;case Int32Array:return s.DT_INT32;case Uint8Array:return s.DT_UINT8;case Uint16Array:return s.DT_UINT16;case Uint32Array:return s.DT_UINT32}}}var cl=class extends eo{constructor(e=null){super();let t=new jn;t.deleteAttribute("uv");let n=new tn({side:bt}),r=new tn,o=5;e!==null&&e._useLegacyLights===!1&&(o=900);let s=new fi(16777215,o,28,2);s.position.set(.418,16.199,.3),this.add(s);let a=new Ge(t,n);a.position.set(-.757,13.219,.717),a.scale.set(31.713,28.305,28.591),this.add(a);let c=new Ge(t,r);c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),this.add(c);let l=new Ge(t,r);l.position.set(-5.607,-.754,-.758),l.rotation.set(0,.994,0),l.scale.set(1.97,1.534,3.955),this.add(l);let u=new Ge(t,r);u.position.set(6.167,.857,7.803),u.rotation.set(0,.561,0),u.scale.set(3.927,6.285,3.687),this.add(u);let d=new Ge(t,r);d.position.set(-2.017,.018,6.124),d.rotation.set(0,.333,0),d.scale.set(2.002,4.566,2.064),this.add(d);let h=new Ge(t,r);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);let f=new Ge(t,r);f.position.set(-2.193,-.369,-5.547),f.rotation.set(0,.516,0),f.scale.set(3.875,3.487,2.986),this.add(f);let g=new Ge(t,ls(50));g.position.set(-16.116,14.37,8.208),g.scale.set(.1,2.428,2.739),this.add(g);let x=new Ge(t,ls(50));x.position.set(-16.109,18.021,-8.207),x.scale.set(.1,2.425,2.751),this.add(x);let m=new Ge(t,ls(17));m.position.set(14.904,12.198,-1.832),m.scale.set(.15,4.265,6.331),this.add(m);let p=new Ge(t,ls(43));p.position.set(-.462,8.89,14.52),p.scale.set(4.38,5.441,.088),this.add(p);let v=new Ge(t,ls(20));v.position.set(3.235,11.486,-12.541),v.scale.set(2.5,2,.1),this.add(v);let _=new Ge(t,ls(100));_.position.set(0,20,0),_.scale.set(1,.1,1),this.add(_)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function ls(i){let e=new Ut;return e.color.setScalar(i),e}var Ur=(i,e)=>{let t=parseFloat(new URLSearchParams(location.search).get(i));return Number.isFinite(t)?t:e},wi={safeTopRatio:Ur("coinTop",.13),gapRatio:Ur("coinGap",.045),fillRatio:Ur("coinFill",.78),bandAnchor:Ur("coinAnchor",.47),coinWidthRatio:Ur("coinWide",.4),maxSizeRatio:Ur("coinSize",.42),minSizeRatio:Ur("coinMin",.2),centerYRatio:Ur("coinY",.31)},ll=-2,ul=ll-4.3,he={camera:{fov:38,x:0,y:.6,z:5.8},lights:{ambient:{color:16774367,intensity:.25},key:{color:16771248,intensity:2.2,x:3.5,y:4.5,z:4.5},fill:{color:11059432,intensity:.5,x:-4,y:1.5,z:3},rim:{color:16766826,intensity:1.5,x:-2.5,y:3.5,z:-4},front:{color:16773576,intensity:1,x:0,y:.8,z:5.5}},exposure:1.08,coin:{scale:2.15,swaySpeedY:.45,tiltBase:-.05,tiltOscillation:.025,tiltSpeed:.5,floatAmount:.04,floatSpeed:.7,baseY:1.05,color:"#ffd76a",metalness:1,roughness:.22,envMapIntensity:1.05,emissive:"#3d2508",emissiveIntensity:.05},door:{widthVsCoin:2.75,groundY:.15,baseX:0,baseZ:0,heroBaseZ:-.85,doorDepthSquash:.55,maxDepthWorld:3,shadowWidthMul:1.3,shadowDepthMul:2.2,color:"#ffd76a",metalness:1,roughness:.22,envMapIntensity:1.3,emissive:"#3d2508",emissiveIntensity:.05,leaf:{hero:{metalness:.12,roughness:.92,envMapIntensity:.12},meet:{metalness:.88,roughness:.5,envMapIntensity:.54},cross:{metalness:.95,roughness:.38,envMapIntensity:.72},meetOrn:{metalness:.95,roughness:.28,envMapIntensity:.88},crossOrn:{metalness:1,roughness:.23,envMapIntensity:1.05},meetDark:{metalness:.55,roughness:.72,envMapIntensity:.18},crossDark:{metalness:.65,roughness:.64,envMapIntensity:.24}},frameAnim:{hero:{metalness:.06,roughness:.9,envMapIntensity:.24,bumpScale:.045},meet:{metalness:.04,roughness:.88,envMapIntensity:.22,bumpScale:.03}},spots:{key:{color:16769973,intensity:120,angle:.45,penumbra:.5,decay:1.2,distance:0,x:1.2,y:5.5,z:2.5,tx:0,ty:.2,tz:0},rim:{color:9484799,intensity:45,angle:.6,penumbra:.7,decay:1.2,distance:0,x:-4.5,y:4,z:-4.5,tx:0,ty:-.2,tz:0},under:{color:16759424,intensity:12,angle:.9,penumbra:.8,decay:1.6,distance:0,x:0,y:-2,z:2.2,tx:0,ty:-.3,tz:0}},fog:725021,fogDensity:.08,transition:"doorway",roomCamZ:ll,roomCamY:.62,roomLook:{x:0,y:.55,z:ll-1.5},roomLight:{color:16760435,intensity:11,x:0,y:.9,z:ll+.05},veilFog:.06,exitFog:.16,exitFogSink:.14,fovKick:4,roomSwarm:{x:0,y:.55,leadOut:1.2,lead:2,scale:.35},funnel:{z:-.89,cx:0,cy:1.3,halfW:.42,halfH:.85,window:[.3,.52,.86,.98],depth:1.5,squeeze:.75,zSqueeze:.6},aimDoorT:[0,.45],aimRoomT:[.55,.95],leafFadeT:[.84,.94]},doorText:{bottomOffset:"9vh",horizontalOffset:"0px",maxWidth:"min(47rem, 90vw)",titleSize:"var(--fs-kicker)",textSize:"var(--fs-display)",gap:"1.4rem"},interaction:{hoverRadius:.075,hoverDelayMs:90,touchRadiusMul:2.2},room:{figure:{x:0,z:ul},orbit:{count:12,trail:58,trailStep:.085,headSize:.15,tailSize:.08,minRadius:.46,maxRadius:.95,minY:.44,maxY:1.12,tilt:34,speed:.24,precession:.028,opacity:.82,neutralDim:.78},swarm:{ambientFloor:.62,stageFloor:.62,stageFalloff:.38,figureFloor:.6,chroma:1.16,nearFade:[.35,1.2]},accentIntensity:26,fillIntensity:10}};he.door.widthVsCoin=4.2,he.door.fogDensity=.026,he.door.doorDepthSquash=.72,he.door.maxDepthWorld=4.8,he.camera.fov=32,he.camera.y=1.55,he.camera.z=7.7,he.door.approachCamY=.62,he.door.approachCamZ=he.camera.z,he.exposure=.94,he.door.spots.key={color:16769973,intensity:15,angle:.72,penumbra:.62,decay:1.35,distance:0,x:-3.8,y:3.5,z:4.4,tx:0,ty:.2,tz:0},he.door.spots.rim={color:10465995,intensity:6.5,angle:.8,penumbra:.75,decay:1.35,distance:0,x:3.5,y:1.6,z:2,tx:0,ty:.1,tz:-.35},he.door.spots.under={color:16761455,intensity:4.4,angle:.7,penumbra:.85,decay:1.6,distance:0,x:0,y:.5,z:2.9,tx:0,ty:.25,tz:0};var v_=[{id:"soporte",label:"Pedestal",subtitle:"Base de la pieza central",glb:"figures/soporte.glb",available:!0,x:0,y:0,z:ul,scale:.7,stretchY:1.6,color:10135229,finish:{metalness:.05,roughness:.7,color:4344931}},{id:"balanza",label:"Balanza",subtitle:"Equilibrio hawkish / dovish",glb:"figures/balanza.glb",available:!0,x:0,y:0,z:ul,standsOn:"soporte",centerOn:"base",scale:1,color:16766826,finish:{metalness:0,roughness:.82,color:13089188}},{id:"inflacion",label:"Vela de precios",subtitle:"Presi\xF3n inflacionaria",glb:"figures/inflacion.glb",available:!1,x:-4.8,y:0,z:-3.2,scale:1,color:16747100},{id:"brote",label:"Brote",subtitle:"Crecimiento y holgura",glb:"figures/brote.glb",available:!1,x:4.8,y:0,z:-3.2,scale:1,color:9090296},{id:"acta",label:"Acta",subtitle:"Fuente trazable",glb:"figures/acta.glb",available:!1,x:0,y:0,z:-6.4,scale:.9,color:13620964},{id:"corpus",label:"Corpus",subtitle:"182 reuniones de referencia",glb:"figures/corpus.glb",available:!1,x:-4.6,y:0,z:-5.6,scale:.8,color:13620964},{id:"campana",label:"Campana",subtitle:"Inicio y cierre de sesi\xF3n",glb:"figures/campana.glb",available:!1,x:4.6,y:0,z:-5.6,scale:.8,color:16766826}];function E_(i,{onReady:e=null,debug:t=!1,dracoLoader:n=null}={}){let r=new Map,o=new St;o.name="dioramas",i.add(o);let s=n||(()=>{let m=new cs;return m.setDecoderPath("js/vendor/draco/"),m})(),a=new as;a.setDRACOLoader(s);let c=new tn({color:9081766,metalness:.55,roughness:.35,transparent:!0,opacity:.6}),l=new Ut({color:16766826,wireframe:!0,transparent:!0,opacity:.22}),u=new Ut({color:16766826,transparent:!0,opacity:.08,side:It});function d(m,p=.06){m.updateMatrixWorld(!0);let v=new dt().setFromObject(m),_=v.min.y+(v.max.y-v.min.y)*p,T=[],A=[],E=new L;if(m.traverse(P=>{let y=P.isMesh?P.geometry?.attributes?.position:null;if(y)for(let M=0;M<y.count;M++)E.fromBufferAttribute(y,M).applyMatrix4(P.matrixWorld),E.y<=_&&(T.push(E.x),A.push(E.z))}),T.length<8)return null;let w=P=>{P.sort((D,V)=>D-V);let y=P[Math.floor(P.length*.05)],M=P[Math.min(P.length-1,Math.floor(P.length*.95))];return(y+M)/2};return{x:w(T),z:w(A)}}function h(m){let p=new Ge(new na(.2,0),c);p.material=c.clone(),p.userData={...m,pending:!0};let v=new Ge(new na(.27,1),l),_=new Ge(new Zc(.31,.38,32),u.clone());return _.rotation.x=-Math.PI/2,p.add(v),p.add(_),p}function f(){return document.getElementById("figureCabinet")}v_.forEach(m=>{if(!t&&!m.available)return;let p=new St;p.name=`figure--${m.id}`,p.position.set(m.x,m.y,m.z),p.visible=!0,o.add(p);let v={def:m,root:p,model:null,status:"searching"};r.set(m.id,v);let _=A=>{let E=A.scene;E.updateMatrixWorld(!0);let w=new dt().setFromObject(E),P=w.getSize(new L),y=Math.max(P.x,P.y,P.z)||1,M=m.scale/y;E.scale.setScalar(M),m.stretchY&&(E.scale.y*=m.stretchY),w.setFromObject(E);let D=w.getCenter(new L),V=D.x,ie=D.z;if(m.centerOn==="base"){let I=d(E,m.footprintSlab??.06);I&&(V=I.x,ie=I.z)}E.position.x-=V,E.position.z-=ie,E.position.y-=w.min.y,w.setFromObject(E),v.height=w.max.y-w.min.y,E.traverse(I=>{if(!I.isMesh||!I.material)return;(Array.isArray(I.material)?I.material:[I.material]).filter(Boolean).forEach(G=>{let te=m.finish,N=te?.metalness??.82,X=te?.roughness??.24;"metalness"in G&&(G.metalness=N),"roughness"in G&&(G.roughness=X),G.color=G.color||new ge,te?.color!=null?G.color.set(te.color):I.name.toLowerCase().includes("gold")||I.name.toLowerCase().includes("oro")?G.color.set(16766826):(I.name.toLowerCase().includes("blue")||I.name.toLowerCase().includes("azul"))&&G.color.set(9090296),G.needsUpdate=!0})}),p.clear(),p.add(E),v.model=E,v.status="loaded",g(),x(m,"ready"),e?.(v)},T=()=>{v.status="pending";let A=h(m);p.add(A),v.placeholder=A,x(m,"pending"),e?.(v)};m.available?(t&&x(m,"searching"),a.loadAsync(m.glb).then(_).catch(()=>{t&&T()})):t&&T()});function g(){r.forEach(m=>{let p=m.def.standsOn?r.get(m.def.standsOn):null;if(!p)return;let v=p.height??0;m.root.position.y=(m.def.y??0)+(p.def.y??0)+v})}function x(m,p){let v=f();if(!v)return;let _=v.querySelector(`[data-figure="${m.id}"]`);_||(_=document.createElement("div"),_.className="figure-row",_.dataset.figure=m.id,_.innerHTML=`<span class="figure-row-dot"></span><span class="figure-row-name">${m.label}</span><span class="figure-row-status">\u2026</span>`,v.appendChild(_));let T=_.querySelector(".figure-row-status");T&&(p==="ready"?(_.classList.add("is-ready"),T.textContent="listo"):p==="pending"?(_.classList.add("is-pending"),T.textContent="por modelar"):(_.classList.add("is-searching"),T.textContent="buscando\u2026"))}return{group:o,figures:r,defs:v_,restack:g}}function b_(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),o={},s={},a=i[0].morphTargetsRelative,c=new Je,l=0;for(let u=0;u<i.length;++u){let d=i[u],h=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;o[f]===void 0&&(o[f]=[]),o[f].push(d.attributes[f]),h++}if(h!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in d.morphAttributes){if(!r.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;s[f]===void 0&&(s[f]=[]),s[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,u),l+=f}}if(t){let u=0,d=[];for(let h=0;h<i.length;++h){let f=i[h].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+u);u+=i[h].attributes.position.count}c.setIndex(d)}for(let u in o){let d=M_(o[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,d)}for(let u in s){let d=s[u][0].length;if(d===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let h=0;h<d;++h){let f=[];for(let x=0;x<s[u].length;++x)f.push(s[u][x][h]);let g=M_(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function M_(i){let e,t,n,r=-1,o=0;for(let l=0;l<i.length;++l){let u=i[l];if(u.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;o+=u.array.length}let s=new e(o),a=0;for(let l=0;l<i.length;++l)s.set(i[l].array,a),a+=i[l].array.length;let c=new Ke(s,t,n);return r!==void 0&&(c.gpuType=r),c}var Nt=3.5,Wt=6.2,ao=Nt/2,_h=.12,dl=.2,pl=.16,T_=.36,ml=5,S_=3.35,hl=Nt/2+.06+.26+.14,fl=2.35,Tn=pl*ml;function pi(i,e,t,n={}){return new tn({color:i,metalness:e,roughness:t,...n})}var yh={stone:pi(6709594,.05,.9),stone_dark:pi(4867650,.05,.92),granite:pi(2762532,.1,.6),marble:pi(9207920,.05,.3),medal:pi(13211455,1,.35),bronze:pi(9071164,1,.38),bronze_dark:pi(4864032,1,.55),bronze_matte:pi(6966828,.9,.6),glow:new tn({color:2363653,emissive:16749632,emissiveIntensity:.6,roughness:1,metalness:0})},w_={bronze:pi(9071164,1,.38),bronze_dark:pi(4864032,1,.55),bronze_matte:pi(6966828,.9,.6)};function A_(){let i=new Map,e=new Map,t={},n=(T,A)=>{if(!T)return A;let E=T==="Door_L"?-Nt/2:Nt/2;return new Ue().makeTranslation(-E,0,-Tn).multiply(A)},r=(T,A,E)=>`${T}|${A}|${E||""}`;function o(T,A,E,w,P){let y=w.clone();y.applyMatrix4(n(E,P||new Ue));let M=r(T,A,E);i.has(M)||i.set(M,[]),i.get(M).push(y)}let s=(T,A,E,w=0,P=0,y=0)=>{let M=new Ue,D=new Qt().setFromEuler(new br(w,P,y));return M.compose(new L(T,A,E),D,new L(1,1,1)),M};function a(T,A,E,w,P,y,M,D,V,ie){o(T,A,E,new jn(M,D,V),s(w,P,y,...ie||[0,0,0]))}function c(T,A,E,w,P,y,M,D,V="Z",ie=20,I=null){let k={Z:[0,0,0],Y:[Math.PI/2,0,0],X:[0,0,Math.PI/2]}[V];o(T,A,E,new ta(M,M,D,ie),s(w,P,y,...I||k))}function l(T,A,E,w,P,y,M,D,V="Z",ie=20){let I=V==="Y"?[Math.PI/2,0,0]:V==="X"?[0,Math.PI/2,0]:[0,0,0];o(T,A,E,new Jc(M,D,10,ie),s(w,P,y,...I))}function u(T,A,E,w,P,y,M,D,V,ie,I=10,k=7){let G=new ia(.5,I,k),te=s(w,P,y,...ie||[0,0,0]),N=new Ue().makeScale(M,D,V);te.multiply(N),o(T,A,E,G,te)}function d(T,A,E,w){e.has(T)||e.set(T,[]),e.get(T).push(n(T,s(A,E,w)))}function h(T,A,E,w,P,y,M){let D=-_h/2;a("bronze_matte","leaf",A,E,D-.01,w,P,.02,y);let V=.07,ie=.05;a("bronze","leaf",A,E,D-ie/2+.01,w+y/2-V/2,P,ie,V),a("bronze","leaf",A,E,D-ie/2+.01,w-y/2+V/2,P,ie,V),a("bronze","leaf",A,E-P/2+V/2,D-ie/2+.01,w,V,ie,y-2*V),a("bronze","leaf",A,E+P/2-V/2,D-ie/2+.01,w,V,ie,y-2*V);let I=.016,k=I*4.2,G=E-P/2+V+I,te=E+P/2-V-I,N=w-y/2+V+I,X=w+y/2-V-I,q=Math.max(2,Math.round((te-G)/k)),Q=Math.max(2,Math.round((X-N)/k));for(let H=0;H<=q;H++){let Z=G+(te-G)*H/q;d(A,Z,D-.008,N),d(A,Z,D-.008,X)}for(let H=1;H<Q;H++){let Z=N+(X-N)*H/Q;d(A,G,D-.008,Z),d(A,te,D-.008,Z)}let fe=D;if(M==="rosette"){let H=Math.min(P,y)*.62;a("bronze","leaf",A,E,fe-.02,w,H,.04,H),a("bronze_dark","leaf",A,E,fe-.045,w,H*.78,.02,H*.78),c("bronze","leaf",A,E,fe-.075,w,H*.16,.05,"Y",16),u("bronze","leaf",A,E,fe-.1,w,H*.14,H*.14,H*.14);for(let Z=0;Z<8;Z++){let me=Z*2*Math.PI/8;u("bronze","leaf",A,E+Math.cos(me)*H*.24,fe-.07,w+Math.sin(me)*H*.24,H*.18,.04,H*.32,[0,-me+Math.PI/2,0],8,6)}for(let[Z,me]of[[-1,-1],[1,-1],[-1,1],[1,1]])u("bronze","leaf",A,E+Z*H*.33,fe-.06,w+me*H*.33,H*.2,.04,H*.12,[0,Math.atan2(me,Z)+Math.PI/2,0],8,6)}else if(M==="knocker"){let H=fe-.02,Z=w+.1;u("bronze","leaf",A,E,H-.02,Z+.12,.056,.04,.19,null,12,8);for(let me of[-1,1])u("bronze","leaf",A,E+me*.05,H-.02,Z+.1,.044,.036,.14,[0,me*-.52,0],12,8),u("bronze","leaf",A,E+me*.078,H-.02,Z+.06,.044,.032,.06,[0,me*-1.3,0],8,6),u("bronze","leaf",A,E+me*.035,H-.02,Z-.02,.032,.03,.07,[0,me*.52,0],8,6);a("bronze","leaf",A,E,H-.025,Z+.02,.11,.03,.03),u("bronze","leaf",A,E,H-.02,Z-.03,.036,.03,.09,null,8,6),c("bronze_dark","leaf",A,E,H-.05,Z-.06,.018,.06,"X",12),l("bronze","leaf",A,E,H-.05,Z-.19,.13,.024,"Y",20),a("bronze","leaf",A,E,H-.05,Z-.32,.05,.05,.05)}}function f(T,A){let E=Math.sign(A)*Nt/2,w=new Xe;w.name=`${T}_Pivot`,w.position.set(E,0,Tn),w.userData.openSign=A<0?1:-1;let P=T,y=Tn,M=y+Wt/2;a("bronze","leaf",P,A,0,M,ao,_h,Wt);let D=-_h/2,V=ao-2*dl;a("bronze","leaf",P,A,D-.015,y+.32,ao-.04,.03,.62);let ie=y+.65+dl+1.45/2,I=ie+1.45/2+dl+2.05/2,k=I+2.05/2+dl+1.05/2;h(`${P}_Bottom`,P,A,ie,V,1.45,"rosette"),h(`${P}_Middle`,P,A,I,V,2.05,"knocker"),h(`${P}_Top`,P,A,k,V,1.05,"rosette");let G=A-Math.sign(A)*(ao/2-.1);a("bronze_dark","leaf",P,G,D-.01,y+2.95,.06,.02,.3);let te=A+Math.sign(A)*(ao/2+.02);for(let N of[.7,2.4,4.1,5.7])c("bronze_dark","leaf",P,te,D+.02,y+N,.035,.28,"Z",10);return t[T]=w,w}function g(T,A,E,w){let P="facade";a("stone",P,null,A,-.28/2-.05,E+1.1/2,.95+.16,.28+.1,1.1),a("stone",P,null,A,-.28/2-.08,E+1.1+.06,.95+.26,.28+.16,.12);let V=E+1.1+.12,ie=1,I=w-ie-V;a("stone",P,null,A,-.28/2,V+I/2,.95,.28,I);for(let G of[-.95*.28,0,.95*.28])a("stone_dark",P,null,A+G,-.28-.005,V+I/2,.95*.12,.02,I-.5);let k=V+I;a("stone",P,null,A,-.28/2-.02,k+.04,.95+.06,.28+.04,.08),o("stone",P,null,new ta(.95*.56,.95*.38,.6,14),s(A,-.28/2,k+.36,Math.PI/2));for(let[G,te,N]of[[.26,5,-.2],[.5,4,-.08]])for(let X=0;X<te;X++){let q=A-.475+.95*(X+.5)/te;u("stone",P,null,q,-.28+.02,k+G,.17,.1,.44,[N,0,0],8,6)}for(let G of[-1,1])l("stone",P,null,A+G*(.95/2-.06),-.28-.1,k+.66,.12,.05,"Y",14);a("stone",P,null,A,-.28/2-.06,k+ie-.07,.95+.36,.28+.16,.14)}{let E=Tn+Wt+1.15+1.1,w=E+.5,P=Tn+Wt+.75,y=(8.6-Nt)/2;for(let M of[-1,1])a("stone","facade",null,M*(Nt/2+y/2),.5,w/2,y,1,w);a("stone","facade",null,0,.5,(P+w)/2,Nt+.02,1,w-P),a("granite","facade",null,0,-.1,Tn/2,8.6,.2,Tn);for(let M of[-1,1])g(`Pilaster_${M}`,M*S_,Tn,E);a("stone","facade",null,0,-.3,E+.25,8.6,.6,.5)}{let T=Tn,A=.55,E=.3,w=.75;for(let ie of[-1,1]){let I=ie*(Nt/2+A/2);a("stone","frame",null,I,-E/2,T+Wt/2,A,E,Wt),a("stone","frame",null,ie*(Nt/2+.16),-E-.015,T+Wt/2,.2,.03,Wt)}a("stone","frame",null,0,-E/2,T+Wt+w/2,Nt+2*A,E,w),a("stone","frame",null,0,-E-.015,T+Wt+.08,Nt+.48,.03,.16),a("stone","frame",null,0,-E-.12,T+Wt+w+.08,Nt+2*A+.4,.24+E,.16);let P=.06;a("bronze","frame",null,0,-E/2-.02,T+Wt+P/2,Nt+2*P,E+.04,P);for(let ie of[-1,1])a("bronze","frame",null,ie*(Nt/2+P/2),-E/2-.02,T+Wt/2,P,E+.04,Wt);let y=Nt/2+A,D=S_-.95/2-.08-y+.02,V=Wt+w+.16;for(let ie of[-1,1])a("stone","frame",null,ie*(y+D/2-.01),-E/2+.031,T+V/2,D,E-.06,V);c("medal","medal",null,-hl,-E-.02,T+fl+.35,.1,.03,"Z",24),l("medal","medal",null,-hl,-E-.045,T+fl+.35,.08,.01,"Y",24),c("medal","medal",null,hl,-E-.02,T+fl+.35,.1,.03,"Z",24),l("medal","medal",null,hl,-E-.045,T+fl+.35,.08,.01,"Y",24)}{let T=Nt+1.1+.9,A=T_*ml+.6;for(let w=0;w<ml;w++){let P=T_*(ml-w)+.6,y=pl*(w+.5);a("granite","frame",null,0,-P/2,y,T,P,pl),a("granite","frame",null,0,-P-.015,y+pl/2-.02,T,.03,.04)}let E=.45;for(let w of[-1,1]){let P=w*(T/2+E/2);a("stone","frame",null,P,-A/2,Tn/2+.06,E,A,Tn+.12),a("stone","frame",null,P,-A/2,Tn+.16,E+.08,A+.08,.08)}a("bronze_dark","frame",null,0,-.05,Tn+.01,Nt+.1,.3,.02)}{let T=Tn,A=5,E=5,w=Wt+1;a("stone_dark","interior",null,0,A/2+.1,T-.05,E,A,.1),a("stone_dark","interior",null,0,A/2,T+w+.05,E,A,.1);for(let P of[-1,1])a("stone_dark","interior",null,P*(E/2+.05),A/2,T+w/2,.1,A,w);a("stone_dark","interior",null,0,.3,T+Wt+.5,E,.4,1);for(let P of[-1,1])a("stone_dark","interior",null,P*(Nt/2+(E-Nt)/4),.3,T+Wt/2,(E-Nt)/2,.4,Wt);a("glow","glow",null,0,A-.15,T+3.25,4.7,.05,6.7)}let x=f("Door_L",-ao/2),m=f("Door_R",ao/2),p=new St;p.name="CentralBankDoor";let v={Door_L:x,Door_R:m};for(let[T,A]of i){let[E,w,P]=T.split("|"),y=b_(A,!1);if(!y)continue;let M=(w==="leaf"?w_:yh)[E]||yh[E],D=new Ge(y,M);D.name=`${w}_${E}${P?"_"+P:""}`,D.userData.role=w,D.userData.matName=E,D.matrixAutoUpdate=!1,D.matrix.identity(),(P?v[P]:p).add(D)}let _=new ia(.012,6,4);for(let[T,A]of e){let E=new ro(_,w_.bronze,A.length);A.forEach((w,P)=>E.setMatrixAt(P,w)),E.instanceMatrix.needsUpdate=!0,E.name=`leaf_beads_${T}`,E.userData.role="leaf",E.userData.matName="bronze",v[T].add(E)}return p.add(x,m),p.updateMatrixWorld(!0),{group:p,pivotL:x,pivotR:m,glowMat:yh.glow}}xl();pa();var vl=[],bh=[],Th=[],ma=!1,us=!1,P_=!1,rb=4e3,ob=350,sb=800;function I_(i=ob){return new Promise(e=>{if(P_){setTimeout(e,0);return}typeof requestIdleCallback=="function"?requestIdleCallback(()=>e(),{timeout:i}):setTimeout(e,Math.min(i,200))})}function L_(i){I_(sb).then(i)}function D_(){if(!ma)if(ma=!0,document.readyState==="complete")L_(El);else{let i=()=>L_(El);window.addEventListener("load",i,{once:!0}),setTimeout(i,rb)}}async function El(){for(;vl.length;){await I_();let i=vl.shift();try{await i()}catch(e){console.warn("Tarea diferida del arranque incompleta:",e)}}for(us=!0;bh.length;){let i=bh.shift();try{i()}catch(e){console.warn("Aviso tras el arranque diferido:",e)}}for(;Th.length;)Th.shift()()}function U_(){P_=!0,ma||(ma=!0,El())}function N_(){return us?Promise.resolve():new Promise(i=>Th.push(i))}function ds(i){vl.push(i),us?(us=!1,El()):D_()}function B_(i){us?i():bh.push(i)}var F_=()=>({pending:vl.length,started:ma,finished:us});D_();Ah();var hs=null;function Ql(){return hs||(window.d3?(hs=Promise.resolve(window.d3),hs):(hs=new Promise((i,e)=>{let t=document.createElement("script");t.src="js/vendor/d3.min.js",t.async=!0,t.onload=()=>i(window.d3),t.onerror=()=>e(new Error("No se pudo cargar js/vendor/d3.min.js")),document.head.appendChild(t)}),hs))}gsap.registerPlugin(ScrollTrigger,CustomEase,SplitText);CustomEase.create("cinematicIn","0.22,1,0.36,1");CustomEase.create("cinematicOut","0.61,1,0.88,1");CustomEase.create("cinematicInOut","0.65,0,0.35,1");CustomEase.create("cinematicSilk","0.45,0.05,0.55,0.95");CustomEase.create("cinematicSnap","0.16,1,0.3,1");"scrollRestoration"in history&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("load",()=>{window.scrollY!==0&&window.scrollTo(0,0)});window.addEventListener("pageshow",i=>{i.persisted&&window.scrollTo(0,0)});var yo=/[?&]debug\b/.test(location.search);if(!yo)["debugPanel","timelineScrubber","figureCabinet"].forEach(i=>{let e=document.getElementById(i);e&&(e.style.display="none")});else{let i=document.getElementById("figureCabinet");i&&(i.style.display="block")}var Jn=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,fb=Jn?0:1;await Promise.race([new Promise(i=>requestAnimationFrame(()=>requestAnimationFrame(i))),new Promise(i=>setTimeout(i,100))]);var La=document.getElementById("canvas"),yi=document.getElementById("load"),Cy=!1;function yf(){Cy=!0,yi&&yi.classList.add("hidden")}var Wh=document.getElementById("haloWrap"),Tl=document.getElementById("objectReflection"),$_=document.getElementById("scrollHint"),Ly=document.getElementById("hero"),va=document.querySelector(".hero-title");function vf(){let i=va?.querySelector("h1");if(!i)return;let e=Math.max(window.devicePixelRatio||1,1),t=window.innerWidth/e;if(t<=900){let n=ne.clamp(t*.04,16,24);i.style.setProperty("font-size",`${n}px`,"important"),i.style.setProperty("line-height","1.16","important")}else i.style.removeProperty("font-size"),i.style.removeProperty("line-height")}vf();function Ef(){let i=document.getElementById("stageObjectiveTitle"),e=document.getElementById("stageObjectiveParagraph"),t=Math.max(window.devicePixelRatio||1,1),n=window.innerWidth/t;if(n<=900||window.innerHeight<=760){let o=ne.clamp(n*.04,15,20),s=ne.clamp(n*.032,14,17);i?.style.setProperty("font-size",`${o}px`,"important"),e?.style.setProperty("font-size",`${s}px`,"important"),e?.style.setProperty("line-height","1.32","important")}else i?.style.removeProperty("font-size"),e?.style.removeProperty("font-size"),e?.style.removeProperty("line-height")}Ef();window.addEventListener("resize",vf);window.addEventListener("resize",Ef);window.visualViewport&&window.visualViewport.addEventListener("resize",vf);var Rs=1;function Z_(i){i!==Rs&&(Rs=i,i===1?(Wh.classList.remove("hidden-stage"),$_.classList.remove("hidden")):(Wh.classList.add("hidden-stage"),$_.classList.add("hidden")),Cn.children.length>0&&(Cn.visible=i===1&&Fr>.01),document.body.style.cursor=i===1?"grab":"")}var Py=new IntersectionObserver(i=>{i.forEach(e=>{e.isIntersecting&&(e.target===Ly?Z_(1):Z_(2))})},{threshold:.45});Py.observe(Ly);document.querySelectorAll(".stage-hook, .stage-voices, .stage-acts, .stage-counters, .stage-pipeline, .stage-timeline, .stage-quotes, .stage-closing, #stageObjective, #stageHook, #stageAxes, #stageRoomContainer").forEach(i=>Py.observe(i));var ut=new eo,fo=.7;ut.fog=new Ks(he.door?.fog??658970,0);var Xl=nn(),Mt=new ft(he.camera.fov,Xl.width/Xl.height,.1,100);Mt.position.set(he.camera.x,he.camera.y,he.camera.z);Mt.lookAt(0,.95,-.25);var tt=null,Da=/HeadlessChrome|Headless/.test(navigator.userAgent),Iy=typeof navigator.cpuPerformance=="number"?navigator.cpuPerformance:0,ql=typeof navigator.deviceMemory=="number"&&navigator.deviceMemory<=4||Iy===1,_i=Math.min(window.devicePixelRatio||1,ql?1:1.25),Ln=_i,Cs=!1,Dy=0;try{tt=new js({canvas:La,antialias:!ql,alpha:!0,powerPreference:"high-performance"}),tt.setPixelRatio(Ln),tt.setSize(Xl.width,Xl.height),tt.outputColorSpace=nt,tt.toneMapping=Ha,tt.toneMappingExposure=he.exposure,tt.shadowMap.enabled=!1,tt.debug.checkShaderErrors=yo}catch{tt=null}tt||(yi.innerHTML='<span style="opacity:.9">Tu dispositivo no soporta WebGL. Se muestra una versi&oacute;n simplificada.</span>');tt&&(La.addEventListener("webglcontextlost",i=>{i.preventDefault(),!Cs&&(yi.innerHTML='<span style="opacity:.9">Conexi&oacute;n WebGL perdida. Recargue la p&aacute;gina.</span>',yi.style.display="flex")},!1),La.addEventListener("webglcontextrestored",()=>{Cs||window.location.reload()},!1));var Xh="",Mf=!1,pb=/intel.*(hd graphics|uhd graphics|iris.{0,6}(xe|plus|pro)|gen[5-9])|adreno.*\b(3\d\d|4\d\d|5[01]\d|6[01]\d|64\d)\b|powervr|mali-t\d{2}|swiftshader|llvmpipe/i;if(tt)try{let i=tt.getContext(),e=i.getExtension("WEBGL_debug_renderer_info");e&&(Xh=String(i.getParameter(e.UNMASKED_RENDERER_WEBGL)||"")),Mf=pb.test(Xh)}catch{}if(Mf&&!Da){_i=Math.min(_i,1),Ln=_i;let i=nn();tt.setPixelRatio(Ln),tt.setSize(i.width,i.height,!1)}tt&&typeof navigator.getBattery=="function"&&!Da&&navigator.getBattery().then(i=>{i&&!i.charging&&i.level<=.2&&_i>1&&(_i=Math.min(_i,1),xf(Math.min(Ln,_i)))}).catch(()=>{});window.__D3_PERF={get gpu(){return Xh},get tier(){return tt?Mf||ql?"lite":"high":"none"},lowMem:ql,cpuTier:Iy,headless:Da,get armed(){return Ia},get frames(){return sv},get samples(){return ho.length},get dpr(){return Ln},get cap(){return _i},get poster(){return Cs},get avgMs(){return Dy}};if(tt){let i=new Ar(tt);ut.environment=i.fromScene(new cl,.04).texture,i.dispose()}var J_=["map","normalMap","roughnessMap","metalnessMap","aoMap","emissiveMap","bumpMap","alphaMap","displacementMap","lightMap","envMap"],Q_=new Set,mb=0,Ea=null,qh=!1,Sl=()=>new Promise(i=>setTimeout(i,0));function Uy(){return tt?Ea?(qh=!0,Ea):(Ea=gb(),Ea):Promise.resolve()}async function gb(){do{qh=!1;try{await xb()}catch(i){console.warn("Precalentado de la escena incompleto:",i)}}while(qh);Ea=null}async function xb(){let i=`warmUpScene ${++mb}`;try{performance.mark(`${i} start`)}catch{}let e=Ii?Ii.visible:null,t=[],n=new Set;try{ut.traverse(o=>{let s=Array.isArray(o.material)?o.material:o.material?[o.material]:[];for(let a=0;a<s.length;a++){let c=s[a];c&&c.transparent&&c.side===It&&c.forceSinglePass===!1&&(t.push(c),c.forceSinglePass=!0)}}),await Sl();for(let o of e===null?[!0]:[e,!e])Ii&&(Ii.visible=o),tt.compile(ut,Mt),ut.traverse(s=>{let a=Array.isArray(s.material)?s.material:s.material?[s.material]:[];for(let c=0;c<a.length;c++){let l=a[c];if(!l)continue;let u=tt.properties.get(l)?.currentProgram;u&&n.add(u)}}),await Sl();for(let o of n){try{o.getUniforms()}catch{}await Sl()}let r=[];ut.traverse(o=>{let s=Array.isArray(o.material)?o.material:o.material?[o.material]:[];for(let a=0;a<s.length;a++){let c=s[a];if(c)for(let l=0;l<J_.length;l++){let u=c[J_[l]];!u||!u.isTexture||Q_.has(u.uuid)||(Q_.add(u.uuid),r.push(u))}}});for(let o=0;o<r.length;o++)tt.initTexture(r[o]),o%4===3&&await Sl()}catch(r){console.warn("Precalentado de la escena incompleto:",r)}finally{for(let r=0;r<t.length;r++)t[r].forceSinglePass=!1;Ii&&(Ii.visible=e);try{performance.mark(`${i} end`),performance.measure("warmUpScene",`${i} start`,`${i} end`)}catch{}}}var xt=he.lights,Ny=new la(xt.ambient.color,xt.ambient.intensity);ut.add(Ny);var bf=new Si(xt.key.color,xt.key.intensity);bf.position.set(xt.key.x,xt.key.y,xt.key.z);var Tf=new Si(xt.fill.color,xt.fill.intensity);Tf.position.set(xt.fill.x,xt.fill.y,xt.fill.z);var Sf=new Si(xt.rim.color,xt.rim.intensity);Sf.position.set(xt.rim.x,xt.rim.y,xt.rim.z);var wf=new Si(xt.front.color,xt.front.intensity);wf.position.set(xt.front.x,xt.front.y,xt.front.z);ut.add(bf,Tf,Sf,wf);var By=new fi(16773576,.4,8);ut.add(By);var _s=new cs,_b="https://www.gstatic.com/draco/versioned/decoders/1.5.6/",yb="https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/",Ch=i=>(_s.dispose(),_s.decoderPending=null,_s.setDecoderPath(i),_s.preload().decoderPending);Ch("js/vendor/draco/").catch(()=>(console.warn("Draco local no disponible \u2014 usando CDN gstatic"),Ch(_b))).catch(()=>(console.warn("Draco CDN primario no disponible \u2014 usando mirror jsDelivr"),Ch(yb))).catch(i=>console.warn("Ning\xFAn decodificador Draco disponible:",i));var Xt=E_(ut,{dracoLoader:_s,debug:yo,onReady:()=>setTimeout(Uy,0)}),ys=new Pr(16767400,0,9,.55,.62,1.4);ys.position.set(0,2.8,-3);var eu=new Xe;eu.position.set(0,.6,-4.8);ys.target=eu;ut.add(ys);ut.add(eu);var Ta=new fi(10466520,0,8,1.8);Ta.position.set(-2.4,1.4,-2.4);ut.add(Ta);var Li=[];function vb(){let i=he.door.spots,e=new St;e.name="doorLights";let t=n=>{let r=new Pr(n.color,n.intensity,n.distance,n.angle,n.penumbra,n.decay);r.position.set(n.x,n.y,n.z);let o=new Xe;return o.position.set(n.tx,n.ty,n.tz),r.target=o,e.add(r),e.add(o),Li.push(r),r};return t(i.key),t(i.rim),t(i.under),ut.add(e),e.visible=!1,e}var Ii=vb(),tu=document.createElement("canvas");tu.width=256;tu.height=256;var Af=tu.getContext("2d"),nu=Af.createRadialGradient(128,128,0,128,128,128);nu.addColorStop(0,"rgba(0, 0, 0, 0.9)");nu.addColorStop(.4,"rgba(0, 0, 0, 0.5)");nu.addColorStop(1,"rgba(0, 0, 0, 0)");Af.fillStyle=nu;Af.fillRect(0,0,256,256);var Eb=new oo(tu),dr=new Ge(new Zr(1,1),new Ut({map:Eb,transparent:!0,opacity:.8,depthWrite:!1,blending:Ns}));dr.rotation.x=-Math.PI/2;dr.position.set(0,0,0);ut.add(dr);var Cn=new St;ut.add(Cn);var Il=[],Yh=null,jh=0,Rf=0,Ls={diameter:0,centerY:0,band:null};function Mb(){return va?Number.isFinite(va.offsetTop)?va.offsetTop:va.getBoundingClientRect().top+(window.scrollY||0):NaN}function bb(){let{width:i,height:e}=nn(),t=ne.clamp(e*wi.safeTopRatio,56,112),n=Mb(),o=(Number.isFinite(n)&&n>0&&n<e*1.5?n:e*.78)-Math.max(18,e*wi.gapRatio);return{w:i,h:e,top:t,bottom:o,height:Math.max(0,o-t)}}function Cf(){let i=bb(),{w:e,h:t}=i;if(!!0){let l=ne.clamp(.028*e,16,34);return{diameter:Math.min(Math.max(l*9,Math.min(e,t)*(R_()?.46:.4)),Math.min(e*.5,680),i.height>0?i.height*.82:1/0),centerY:t*.41,band:i}}let n=Math.max(Math.min(e,t)*wi.minSizeRatio,Math.min(i.height*wi.fillRatio,e*wi.coinWidthRatio,t*wi.maxSizeRatio)),r=n/2,o=i.top+r,s=i.bottom-r,a=i.top+i.height*wi.bandAnchor,c=s>=o?ne.clamp(a,o,s):(i.top+i.bottom)/2;return{diameter:n,centerY:c,band:i}}function Tb(){return Cf().diameter}function Fy(){let{height:i}=nn(),e=Math.tan(he.camera.fov*Math.PI/360),t=he.camera.z,n=i/(2*e*t);return ne.clamp(Tb()/(he.coin.scale*n),.25,3.4)}function Oy(){let{height:i}=nn(),e=i*wi.centerYRatio,t=Math.tan(he.camera.fov*Math.PI/360),n=i/(2*t*he.camera.z);return ne.clamp(fo+(i*.5-e)/n,.15,2.5)}function Hy(){Ls=Cf(),Rf=Ls.diameter,Yh&&jh&&Yh.scale.setScalar(jh*Fy()),he.coin.baseY=Oy()}function Sb(){return he.coin.scale*Fy()}Ls=Cf();Rf=Ls.diameter;he.coin.baseY=Oy();var Pa=new os;Pa.onLoad=()=>{U_(),Promise.all([Uy(),N_()]).finally(()=>{setTimeout(()=>{tt&&yf(),cv()},300)})};Pa.onError=i=>console.warn("Error cargando recurso:",i);setTimeout(()=>{yi&&!yi.classList.contains("hidden")&&(yi.innerHTML='<span style="opacity:.9">La carga est&aacute; tomando m&aacute;s tiempo del esperado. Verifique su conexi&oacute;n a internet.</span>')},15e3);setTimeout(()=>{yi&&!yi.classList.contains("hidden")&&yf(),cv()},3e4);var Lf=new as(Pa);Lf.setDRACOLoader(_s);Lf.load("monedav5-draco.glb",i=>{let e=i.scene;e.rotation.y=-Math.PI/2;let t=new dt().setFromObject(e);if(!t.isEmpty()){let n=t.getCenter(new L);e.position.sub(n);let r=t.getSize(new L);jh=he.coin.scale/Math.max(r.x,r.y,r.z),Yh=e,Hy()}e.traverse(n=>{!n.isMesh||!n.material||[n.material].flat().forEach(r=>{!r||!("metalness"in r)||(r.side=Zt,r.metalness=he.coin.metalness,r.roughness=he.coin.roughness,r.envMapIntensity=he.coin.envMapIntensity,r.emissiveIntensity=.14,r.envMapIntensity=1.25,r.needsUpdate=!0,Il.push(r))})}),Cn.add(e)},void 0,i=>{console.error("Error cargando GLB:",i),yi.innerHTML='<span style="opacity:.9">No se pudo cargar la moneda</span>',setTimeout(yf,1200)});var it=new St;ut.add(it);it.visible=!1;var Yl=new fi(he.door?.roomLight?.color??16760435,0,16,1.8);Yl.position.set(he.door?.roomLight?.x??0,he.door?.roomLight?.y??.9,he.door?.roomLight?.z??-.45);ut.add(Yl);var Di=new St;it.add(Di);var cr=null,Kh=[],mo=null,po=null,$h=null,Zh=null,Jh=null,Qh=[],wb=[],ef=[],Sa=[],rn={vis:-1,colorT:-1,crossT:-1,scatter:-1,exitT:-1,fade:-1};function Pf(){if(!cr||!mo)return;let i=he.door,e=nn(),t=e.width/Math.max(e.height,1),n=ne.clamp(1.9/t,.78,1),r=Sb()*(i.widthVsCoin??1.4)*n,o=r/Math.max(mo.width,.001),a=!!po&&cr===po?1:ne.clamp(i.doorDepthSquash??1,.05,1),c=mo.depth*o*a,l=Math.min(1,(i.maxDepthWorld??1/0)/Math.max(c,1e-6));Di.scale.set(o,o,o*a*l),dr.scale.set(r*(i.shadowWidthMul??1.3),c*l*(i.shadowDepthMul??2.2),1)}function Ab(i){i.updateMatrixWorld(!0);let e=new dt().setFromObject(i);if(e.isEmpty())return null;let t=e.getCenter(new L);i.position.sub(t),i.updateMatrixWorld(!0);let n=new dt().setFromObject(i),r=n.getSize(new L);return mo={width:Math.max(r.x,.001),depth:Math.max(r.z,.001)},Ra=Math.max(r.y,.001),Aa=n.min.y,$l=n.max.y,cr=i,Pf(),n}function zy(){let i=he.doorText;if(!i)return;let e=document.getElementById("stageObjectiveContainer"),t=document.getElementById("stageObjectiveTitle"),n=document.getElementById("stageObjectiveParagraph");e&&(i.bottomOffset&&(e.style.paddingBottom=i.bottomOffset),i.horizontalOffset&&(e.style.transform=`translateX(${i.horizontalOffset})`)),t&&(i.titleSize&&(t.style.fontSize=i.titleSize),i.gap&&(t.style.marginBottom=i.gap),t.style.color="var(--color-gold)",t.style.letterSpacing="0.34em"),n&&(i.textSize&&(n.style.fontSize=i.textSize),i.maxWidth&&(n.style.maxWidth=i.maxWidth),n.style.lineHeight="1.38",n.style.fontWeight="500"),Ef()}zy();function iu(i,e){let t=document.createElement("canvas");t.width=t.height=i;let n=t.getContext("2d");e(n,i);let r=new oo(t);return r.wrapS=r.wrapT=ni,r.anisotropy=8,r.colorSpace=nt,r.needsUpdate=!0,r}function Rb(){return iu(512,(i,e)=>{i.fillStyle="#243044",i.fillRect(0,0,e,e);for(let t=0;t<5200;t++){let n=.04+Math.random()*.16;i.fillStyle=Math.random()>.45?`rgba(210,224,240,${n})`:`rgba(4,8,14,${n*1.5})`,i.fillRect(Math.random()*e,Math.random()*e,1+Math.random()*4,1+Math.random()*3)}i.globalAlpha=.22;for(let t=0;t<e;t+=28)i.fillStyle=t%56===0?"#121820":"#3a4c62",i.fillRect(0,t,e,2);i.globalAlpha=1})}function Cb(){return iu(256,(i,e)=>{i.fillStyle="#1a222e",i.fillRect(0,0,e,e),i.strokeStyle="#c5b48a",i.lineWidth=9,i.lineJoin="miter",i.lineCap="square";let t=64;for(let n=0;n<e;n+=t)for(let r=0;r<e;r+=t)i.beginPath(),i.moveTo(r+8,n+18),i.lineTo(r+46,n+18),i.lineTo(r+46,n+50),i.lineTo(r+22,n+50),i.lineTo(r+22,n+34),i.lineTo(r+8,n+34),i.closePath(),i.stroke()})}function Lb(){return iu(512,(i,e)=>{let t=i.createLinearGradient(0,0,e,e);t.addColorStop(0,"#f0c875"),t.addColorStop(.48,"#d8a653"),t.addColorStop(1,"#fff0b1"),i.fillStyle=t,i.fillRect(0,0,e,e);for(let n=0;n<4200;n++){let r=.025+Math.random()*.1;i.fillStyle=Math.random()>.52?`rgba(255,238,178,${r})`:`rgba(72,43,13,${r*1.2})`;let o=Math.random()*e,s=Math.random()*e;i.fillRect(o,s,1+Math.random()*2.5,3+Math.random()*16)}i.globalAlpha=.18,i.strokeStyle="#211307",i.lineWidth=1;for(let n=6;n<e;n+=18+Math.random()*8)i.beginPath(),i.moveTo(n,0),i.lineTo(n+Math.sin(n)*5,e),i.stroke();i.globalAlpha=1})}function Pb(){return iu(512,(i,e)=>{let t=i.createRadialGradient(e*.5,e*.45,0,e*.5,e*.48,e*.52);t.addColorStop(0,"rgba(255, 192, 94, 0.75)"),t.addColorStop(.3,"rgba(255, 150, 46, 0.26)"),t.addColorStop(.58,"rgba(146, 76, 20, 0.08)"),t.addColorStop(1,"rgba(0, 0, 0, 0)"),i.fillStyle=t,i.fillRect(0,0,e,e)})}var tf=Rb();tf.repeat.set(2.4,3);var Ib=Lb();Ib.repeat.set(1.4,4.6);var Db=Cb();Db.repeat.set(6,8);var nf=Pb();nf.wrapS=nf.wrapT=Ot;var rf=new Ut({map:nf,transparent:!0,opacity:0,depthWrite:!1,depthTest:!1,blending:fr,toneMapped:!1}),Ui=new Ge(new Zr(1,1),rf);Ui.name="doorEditorialAura";Ui.renderOrder=-5;Ui.visible=!1;it.add(Ui);var wa=[],of=[],Dl=[],Ub=[],Ul=[],ey=[],jl=[],ky=new ge("#07090f"),Nb=new ge("#6b4f28"),Bb=new ge("#d9a94f"),Fb=new ge("#201307"),Ob=new ge("#2d1b08"),Hb=new ge("#c9973f"),zb=new ge("#ffd76a"),Kl={stone:{hero:new ge("#6e7d92"),meet:new ge("#3a4048")},dark:{hero:new ge("#4c5666"),meet:new ge("#252b33")},granite:{hero:new ge("#2a2724"),meet:new ge("#22201e")},medal:{hero:new ge("#c9973f"),meet:new ge("#c9973f")}},kb=new ge(13951218),Gb=new ge(15265526),Vb=new ge(7242140),Wb=new ge(9081763);function ty(i){return i==="stone_dark"?"dark":i==="granite"?"granite":"stone"}var Nl=null,Bl=null,Fl=null,Aa=-1.15,$l=1.15,Ra=0;{let i=A_(),e=i.group;$h=e,e.rotation.x=-Math.PI/2,Nl=i.pivotL,Bl=i.pivotR,Fl=i.glowMat,e.updateMatrixWorld(!0);let t=new dt().setFromObject(e);if(!t.isEmpty()){let n=new dt;e.traverse(a=>{a.userData.role==="leaf"&&n.expandByObject(a)});let o=(n.isEmpty()?t:n).getCenter(new L);e.position.sub(o),e.updateMatrixWorld(!0);let s=t.getSize(new L);mo={width:Math.max(s.x,.001),depth:Math.max(s.z,.001)},Ra=Math.max(s.y,.001),Aa=t.min.y-o.y,$l=t.max.y-o.y,cr=e,Pf()}e.traverse(n=>{if(!n.isMesh||!n.material)return;let r=n.material;if(!("metalness"in r))return;let o=n.userData.role,s=o==="leaf",a=o==="glow",c=o==="facade",l=o==="medal",u=o==="frame";if(c&&Ub.push(n),(n.userData.role==="interior"||n.userData.role==="glow")&&Ul.push(n),s){ey.includes(n)||ey.push(n);let d=n.userData.matName||"";if(d!=="bronze_dark"&&(r.map=null,r.bumpMap=null,r.bumpScale=0),!n.isInstancedMesh&&d!=="bronze_dark"&&n.geometry&&!n.userData.edgeLinesAdded){let h=new li({color:1444611,transparent:!0,opacity:.42,depthTest:!0,depthWrite:!1}),f=new Qi(new rs(n.geometry,38),h);f.name=`${n.name}_edgeLines`,f.renderOrder=3,n.add(f),of.push(h),n.userData.edgeLinesAdded=!0}}if((c||u)&&n.geometry&&!n.userData.edgeLinesAdded){let d=ty(n.userData.matName||"stone"),h=d==="dark"?.22:d==="granite"?.28:.12,f=new li({color:d==="stone"?3945255:1117449,transparent:!0,opacity:h,depthTest:!0,depthWrite:!1}),g=new Qi(new rs(n.geometry,36),f);g.name=`${n.name}_stoneEdges`,g.renderOrder=2,n.add(g),Dl.push({m:f,baseOpacity:h}),n.userData.edgeLinesAdded=!0}if(a){r.transparent=!0,r.opacity=0,r.depthWrite=!1,r.depthTest=!0,r.side=It,r.blending=fr,r.needsUpdate=!0;return}if(r.side=Zt,s)if(!0){if(r.color.copy(ky),r.metalness=.12,r.roughness=.92,r.envMapIntensity=.12,r.emissive||(r.emissive=new ge),r.emissive.set("#000000"),r.emissiveIntensity=0,!wa.some(d=>d.m===r)){let d=n.userData.matName||"",h=d==="bronze_dark"?"dark":d==="bronze_matte"?"base":"orn";wa.push({m:r,tone:h})}}else r.color.set("#ffd76a"),r.metalness=1,r.roughness=.22,r.envMapIntensity=1.3,r.emissive||(r.emissive=new ge),r.emissive.set("#3d2508"),r.emissiveIntensity=.05;else if(l)r.color.set("#c9973f"),r.metalness=1,r.roughness=.35,r.envMapIntensity=.9,r.emissive||(r.emissive=new ge),r.emissive.set("#000000"),r.emissiveIntensity=0;else if(!0){let d=ty(n.userData.matName||"stone"),h=Kl[d]||Kl.stone;r.color.copy(h.hero),r.metalness=d==="granite"?.1:.04,r.roughness=d==="granite"?.68:.86,r.map=tf,r.bumpMap=tf,r.bumpScale=d==="dark"?.02:.04,r.envMapIntensity=d==="granite"?.2:.26,r.emissive||(r.emissive=new ge),r.emissive.set("#000000"),r.emissiveIntensity=0,jl.some(f=>f.m===r)||jl.push({m:r,tone:d})}else r.color.set("#0d0f16"),r.metalness=.15,r.roughness=.75,r.envMapIntensity=.3,r.emissive||(r.emissive=new ge),r.emissive.set("#000000"),r.emissiveIntensity=0;r.needsUpdate=!0,Kh.includes(r)||Kh.push(r),Sa.includes(r)||Sa.push(r)}),Di.add(e),it.visible=!0}var ny=new ge("#2e3741"),Xb=new ge("#5c6874"),qb=new ge("#232a32"),Yb=new ge("#9f6118"),jb=new ge("#d9a23a"),Kb=new ge("#f2d16a"),$b=new ge("#d6a030"),iy=new ge("#090502"),Gy=new ge("#24251e"),Zb=new ge("#f1f0e7"),Jb=new ge("#211706"),Qb=new ge("#05070a"),eT=new ge("#39434e");function Ca(i,e,t){let n=ne.clamp((t-i)/Math.max(e-i,1e-6),0,1);return n*n*(3-2*n)}function tT(i,e,t=!1,n=0){if(!t||e<-.86||e>.84||n<-.15||n>.24)return 0;let r=Ca(-.86,-.72,e)*(1-Ca(.74,.86,e));return ne.clamp(.86+.14*r,0,1)}function Lh(i,e=!1,t=new ge){let n=i.x,r=i.y,o=i.z,s=Math.abs(n),a=r<-.62||r<-.48&&s>.42,c=r>.82,l=s>.47&&s<.86&&r>-.64&&r<.84,u=tT(n,r,e,o);if(e){let h=ne.clamp(.42+.34*(r+.85)/1.7+(n>0?.03:0),0,.86);t.copy(Yb).lerp(jb,h),t.lerp($b,.16),t.lerp(Kb,.16+.1*u);let f=(1-Ca(0,.035,s))*Ca(-.7,-.54,r)*(1-Ca(.64,.82,r));return t.lerp(iy,f*.18),.94}let d=ne.clamp(.24+.18*(r+.9)/1.8+.05*(1-Math.min(s,1)),0,.46);return t.copy(ny).lerp(Xb,d),u>.01&&t.lerp(eT,.62),l&&t.lerp(ny,.38),c&&t.lerp(iy,.3),a&&t.lerp(qb,.78),u>.01?.16:.08}function nT(i="frame"){let e=new tn({color:Gy.clone(),vertexColors:!0,metalness:.1,roughness:.82,envMapIntensity:.72,emissive:0,emissiveIntensity:0,transparent:!0,opacity:0,depthWrite:!0,side:It});return e.userData.bcchKind=i,e.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
attribute float bcchDoorMask;
varying float vBcchDoorMask;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vBcchDoorMask = bcchDoorMask;`),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
varying float vBcchDoorMask;`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor = mix(0.92, 0.38, vBcchDoorMask);`).replace("#include <metalnessmap_fragment>",`#include <metalnessmap_fragment>
metalnessFactor = mix(0.035, 0.82, vBcchDoorMask);`)},e.customProgramCacheKey=()=>"bcch-door-openable-recolor-v13",e}function wl(i,e=0,t=0){if(!i.length)return null;let n=new Float32Array(i.length*9),r=new Float32Array(i.length*9),o=new Float32Array(i.length*9),s=new Float32Array(i.length*3),a=0,c=0,l=0,u=0;for(let h of i)for(let f of h)n[a++]=f.p.x-e,n[a++]=f.p.y,n[a++]=f.p.z-t,r[c++]=f.n.x,r[c++]=f.n.y,r[c++]=f.n.z,o[l++]=f.c.r,o[l++]=f.c.g,o[l++]=f.c.b,s[u++]=f.mask;let d=new Je;return d.setAttribute("position",new Ke(n,3)),d.setAttribute("normal",new Ke(r,3)),d.setAttribute("color",new Ke(o,3)),d.setAttribute("bcchDoorMask",new Ke(s,1)),d.computeBoundingSphere(),d}function Al(i,e,t="frame"){if(!i)return null;let n=nT(t),r=new Ge(i,n);if(r.name=e,r.renderOrder=5,r.userData.role="bcchDoor",i.attributes.position?.count>0){let o=t==="leaf"||t==="medal",s=new li({color:o?1181699:328707,transparent:!0,opacity:0,depthTest:!0,depthWrite:!1}),a=new Qi(new rs(i,o?26:34),s);a.name=`${e}_edgeLines`,a.renderOrder=6,r.add(a),ef.push({m:s,baseOpacity:o?.22:.15,kind:t})}return Kh.push(n),Qh.push(n),t==="aperture"&&wb.push(n),r}var An={axisX:-.0153,slabZ:[-.34,-.14],slabY:[-.9267,.8333],slabX:1,ballY:.0986,pilasterInnerX:.5053,gap:.02,splay:.06};function iT(i,e){let t=new St;t.name="Puerta_bcch_Openable";let n=e.clone();n.x+=An.axisX;let r=[],o=[],s=[],a=(W,ee)=>({p:W,n:ee,c:new ge,mask:0}),c=W=>Math.abs(W-An.slabZ[0])<.003||Math.abs(W-An.slabZ[1])<.003;i.updateMatrixWorld(!0),i.traverse(W=>{if(!W.isMesh||!W.geometry)return;let ee=W.geometry,ce=ee.attributes.position,pe=ee.attributes.normal;if(!ce||!pe)return;let $=new Oe().getNormalMatrix(W.matrixWorld),S=/Puerta_Izquierda/i.test(W.name),J=/Puerta_Derecha/i.test(W.name),U=ee.index,O=U?U.count/3:ce.count/3;for(let B=0;B<O;B++){let xe=(U?[U.getX(B*3),U.getX(B*3+1),U.getX(B*3+2)]:[B*3,B*3+1,B*3+2]).map(R=>a(new L().fromBufferAttribute(ce,R).applyMatrix4(W.matrixWorld).sub(n),new L().fromBufferAttribute(pe,R).applyMatrix3($).normalize()));if(S){o.push(xe);continue}if(J){s.push(xe);continue}xe.every(R=>c(R.p.z))||r.push(xe)}});let l=(W,ee)=>{let ce=W.map(pe=>pe.p[ee]);return Math.max(...ce)-Math.min(...ce)},u=(W,ee)=>{let ce=1/0,pe=-1/0,$=[];for(let J of W)if(ee(J)){$.push(J);for(let U of J)ce=Math.min(ce,U.p.x),pe=Math.max(pe,U.p.x)}if(!$.length)return 0;let S=-(ce+pe)*.5;if(Math.abs(S)>1e-4)for(let J of $)for(let U of J)U.p.x+=S;return S},d={cornice:u(r,W=>W.every(ee=>ee.p.y>=An.slabY[1]+.002)&&(l(W,"x")>.5||l(W,"z")>.5)),capitals:u(r,W=>W.every(ee=>ee.p.y>=.63-.001&&ee.p.y<=.845&&Math.abs(ee.p.x)<.53)),steps:u(r,W=>W.every(ee=>ee.p.y<=-.7038+.001&&ee.p.z>=-.27))},h=(W,ee)=>{let ce=ee<0?1/0:-1/0;for(let pe of W)for(let $ of pe)Math.abs($.p.y-An.ballY)<.07||(ce=ee<0?Math.min(ce,$.p.x):Math.max(ce,$.p.x));return ce},f=h(o,-1),g=h(s,1),x=(W,ee,ce)=>{let pe=[],$=[];for(let S of W)(S.some(U=>ce<0?U.p.x<ee-1e-4:U.p.x>ee+1e-4)?$:pe).push(S);return{keep:pe,medal:$}},m=x(o,f,-1),p=x(s,g,1);o.length=0,o.push(...m.keep),s.length=0,s.push(...p.keep);let v=[],_=new dt,T=(W,ee)=>{_.makeEmpty();for(let Se of W)for(let Y of Se)_.expandByPoint(Y.p);if(_.isEmpty())return;let ce=_.getSize(new L),pe=Math.min(ce.x,ce.y)*.5,$=Math.max(ce.z,.02),S=(_.min.y+_.max.y)*.5,J=ee<0?f+d.leaves-An.gap:g+d.leaves+An.gap,U=ee*An.pilasterInnerX,O=(J+U)*.5,B=An.slabZ[1],le=B+$,xe=28,R=Se=>Array.from({length:xe},(Y,Le)=>{let Re=Le/xe*Math.PI*2;return new L(O+Math.cos(Re)*pe,S+Math.sin(Re)*pe,Se)}),b=R(le),z=R(B),se=new L(O,S,le),ue=new L(O,S,B),de=new L(0,0,1),ve=new L(0,0,-1);for(let Se=0;Se<xe;Se++){let Y=(Se+1)%xe;v.push([a(se.clone(),de.clone()),a(b[Se].clone(),de.clone()),a(b[Y].clone(),de.clone())]),v.push([a(ue.clone(),ve.clone()),a(z[Y].clone(),ve.clone()),a(z[Se].clone(),ve.clone())]);let Le=new L(b[Se].x-O,b[Se].y-S,0).normalize(),Re=new L(b[Y].x-O,b[Y].y-S,0).normalize();v.push([a(z[Se].clone(),Le.clone()),a(b[Y].clone(),Re.clone()),a(b[Se].clone(),Le.clone())]),v.push([a(z[Se].clone(),Le.clone()),a(z[Y].clone(),Re.clone()),a(b[Y].clone(),Re.clone())])}let _e=le+$*.35,ye=R(_e).map(Se=>Se.sub(new L(O,S,0)).multiplyScalar(.55).add(new L(O,S,0))),De=new L(O,S,_e);for(let Se=0;Se<xe;Se++){let Y=(Se+1)%xe;v.push([a(De.clone(),de.clone()),a(ye[Se].clone(),de.clone()),a(ye[Y].clone(),de.clone())]);let Le=new L(ye[Se].x-O,ye[Se].y-S,0).normalize(),Re=new L(ye[Y].x-O,ye[Y].y-S,0).normalize(),Pe=new L(ye[Se].x,ye[Se].y,le),Te=new L(ye[Y].x,ye[Y].y,le);v.push([a(Pe,Le.clone()),a(ye[Y].clone(),Re.clone()),a(ye[Se].clone(),Le.clone())]),v.push([a(Pe.clone(),Le.clone()),a(Te,Re.clone()),a(ye[Y].clone(),Re.clone())])}};d.leaves=-(f+g)*.5,T(m.medal,-1),T(p.medal,1);for(let W of[o,s])for(let ee of W)for(let ce of ee)ce.p.x+=d.leaves;f+=d.leaves,g+=d.leaves;let A=1/0,E=-1/0;for(let W of[o,s])for(let ee of W)for(let ce of ee)A=Math.min(A,ce.p.z),E=Math.max(E,ce.p.y);let w=A,P=f,y=g,M=new Xe,D=new Xe;M.name="Puerta_bcch_LeftPivot",D.name="Puerta_bcch_RightPivot",M.position.set(P,0,w),D.position.set(y,0,w),M.userData.openSign=1,D.userData.openSign=-1;let V=An.gap,ie=An.splay,I=f-V,k=g+V,[G,te]=An.slabZ,[N,X]=An.slabY,q=An.slabX,Q=(W,ee,ce,pe)=>{let $=[W,ee,ce,pe].map(J=>new L(...J)),S=new L().crossVectors(new L().subVectors($[1],$[0]),new L().subVectors($[2],$[0])).normalize();r.push([a($[0].clone(),S.clone()),a($[1].clone(),S.clone()),a($[2].clone(),S.clone())],[a($[0].clone(),S.clone()),a($[2].clone(),S.clone()),a($[3].clone(),S.clone())])},fe=W=>{let ee=W*q,ce=W<0?I:k,pe=ce+W*ie,$=[ee,te],S=[ce,te],J=[pe,G],U=[ee,G],O=(B,le)=>W<0?Q([B[0],N,B[1]],[le[0],N,le[1]],[le[0],X,le[1]],[B[0],X,B[1]]):Q([le[0],N,le[1]],[B[0],N,B[1]],[B[0],X,B[1]],[le[0],X,le[1]]);O($,S),O(S,J),O(J,U),O(U,$),W<0?(Q([$[0],X,$[1]],[S[0],X,S[1]],[J[0],X,J[1]],[U[0],X,U[1]]),Q([U[0],N,U[1]],[J[0],N,J[1]],[S[0],N,S[1]],[$[0],N,$[1]])):(Q([S[0],X,S[1]],[$[0],X,$[1]],[U[0],X,U[1]],[J[0],X,J[1]]),Q([J[0],N,J[1]],[U[0],N,U[1]],[$[0],N,$[1]],[S[0],N,S[1]]))};fe(-1),fe(1),Q([I-ie,N,G],[k+ie,N,G],[k,N,te],[I,N,te]);for(let W of r)for(let ee of W)ee.mask=Lh(ee.p,!1,ee.c);for(let W of[o,s])for(let ee of W)for(let ce of ee)ce.mask=Lh(ce.p,!0,ce.c);for(let W of v)for(let ee of W)ee.mask=Lh(ee.p,!0,ee.c);let H=Al(wl(r),"Puerta_bcch_frame","frame"),Z=Al(wl(o,P,w),"Puerta_bcch_left_leaf","leaf"),me=Al(wl(s,y,w),"Puerta_bcch_right_leaf","leaf"),j=Al(wl(v),"Puerta_bcch_medals","medal");return H&&t.add(H),j&&t.add(j),Z&&M.add(Z),me&&D.add(me),t.add(M,D),Zh=M,Jh=D,t.userData.bcchDoor={hingeL:P,hingeR:y,hingeZ:w,edgeL:f,edgeR:g,leafTop:E,openL:I,openR:k,shifts:d},t}Lf.load("Puerta_bcch_v3.glb?v=16",i=>{let t=new dt().setFromObject(i.scene).getCenter(new L),n=iT(i.scene,t);n.visible=!1,po=n,Ab(n),Di.add(n),rn.vis=-1,rn.colorT=-1,rn.crossT=-1,rn.scatter=-1,rn.exitT=-1,rn.fade=-1,it.visible=!0},void 0,i=>{console.warn("No se pudo cargar Puerta_bcch_v3.glb; se usa la puerta procedural:",i)});var rT=new da,lo=he.coin,Ph=-1,Vy=0,Wy=0,_a=0,fs=0,Xy=0,qy=0,ru=!1,sf=0,af=0,Ol=0,Hl=0;function If(i,e){let t=nn();Vy=i/t.width*2-1,Wy=e/t.height*2-1,ru&&(Ol+=(i-sf)*.005,Hl+=(e-af)*.005,sf=i,af=e)}function ou(i,e){ru=!0,sf=i,af=e}function su(){ru=!1}var Df=i=>!!(i.target&&i.target.closest&&i.target.closest("a, button, .quote-card, .signal-card, [data-quote], #quotePanel, #timelineContainer, .closing-cta, .jargon-term, .axes-data-mark, .voice-explorer, .voice-card, .voice-detail, .voice-profile-panel, .acts-browser, .act-list-item, .act-term-chip, .act-evidence-row, .act-open-evidence"));window.addEventListener("pointermove",i=>{i.pointerType==="touch"||Df(i)||(Xy=i.clientX,qy=i.clientY,If(i.clientX,i.clientY))});var Br=null;window.addEventListener("pointerdown",i=>{if(!Df(i)){if(i.pointerType==="touch"){Br={id:i.pointerId,x:i.clientX,y:i.clientY,at:performance.now()};return}ou(i.clientX,i.clientY,i)}});window.addEventListener("pointerup",i=>{if(Br&&i.pointerType==="touch"&&i.pointerId===Br.id){let e=i.clientX-Br.x,t=i.clientY-Br.y,n=e*e+t*t<100&&performance.now()-Br.at<600;Br=null,n&&!Df(i)&&ou(i.clientX,i.clientY,i)}su()});window.addEventListener("pointercancel",()=>{Br=null,su()});window.addEventListener("blur",su);document.addEventListener("visibilitychange",su);var Rl=new L,ht=(window.QUOTES||[]).slice(),Hn=new St;ut.add(Hn);var Yy=Math.max(ht.length,0),jt=Yy||1,zl=new Float32Array(jt*3),vs=new Float32Array(jt*3),Es=new Float32Array(jt*3),Ms=new Float32Array(jt*3),bs=new Float32Array(jt*3),Ts=new Float32Array(jt*3),Ss=new Float32Array(jt*3),Ni=new Float32Array(jt*3),ry=new Int16Array(jt),oy=new Int16Array(jt),sy=new Int16Array(jt),ay=new Int16Array(jt),cf=ht.map(i=>{let e=String(i?.date||"").match(/^(\d{4})/),t=Number(e?e[1]:i?.year);return/^\d{4}-\d{2}-\d{2}$/.test(String(i?.date||""))?i.date:`${Number.isFinite(t)?t:0}-01-01`}),Or=he.room?.swarm??{},yn=he.door?.funnel??null,Zl=yn?new Float32Array(jt*2):null,On=yn?new L:null,cy=yn?new Ue:null,ly=new L,Ih=new Float32Array(jt).fill(1),jy=new ge(16766826),Ky=new ge(9090296),$y=new ge(13620964);function Uf(i,e){if(!e||e===1)return i;let t=.299*i.r+.587*i.g+.114*i.b;return new ge(ne.clamp(t+(i.r-t)*e,0,1),ne.clamp(t+(i.g-t)*e,0,1),ne.clamp(t+(i.b-t)*e,0,1))}var oT=Uf(jy,Or.chroma),sT=Uf(Ky,Or.chroma),aT=Uf($y,Or.chroma);for(let i=0;i<jt;i++){let e=ht[i],t=e?e.label:"neutral",n=aT;t==="hawkish"?n=oT:t==="dovish"&&(n=sT),Ni[i*3+0]=n.r,Ni[i*3+1]=n.g,Ni[i*3+2]=n.b;let r=i/jt*Math.PI*2+(Et(i,1)-.5)*.5,o=2.1+Et(i,2)*1.5,s=(Et(i,3)-.5)*1.6,a=Math.cos(r)*o,c=s,l=Math.sin(r)*o;vs[i*3+0]=a,vs[i*3+1]=c,vs[i*3+2]=l,zl[i*3+0]=a,zl[i*3+1]=c,zl[i*3+2]=l;let u=Et(i,4)*Math.PI*2,d=3.8+Et(i,5)*5.5;Es[i*3+0]=Math.cos(u)*d,Es[i*3+1]=(Et(i,6)-.5)*6.5,Es[i*3+2]=(Et(i,7)-.5)*4.5-1,yn&&(Zl[i*2]=(yn.cx??0)+(Et(i,8)-.5)*2*(yn.halfW??.42),Zl[i*2+1]=(yn.cy??1.3)+(Et(i,9)-.5)*2*(yn.halfH??.85))}var cT=ht.length,lT=new Set(ht.map(i=>i.participant)).size,Dh=document.querySelectorAll("[data-counter]");Dh.length>=4&&(Dh[2].querySelector(".counter-number").dataset.target=cT.toString(),Dh[3].querySelector(".counter-number").dataset.target=lT.toString());function uT(){let i=document.createElement("canvas");i.width=64,i.height=64;let e=i.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.25,"rgba(255,255,255,0.85)"),t.addColorStop(.7,"rgba(255,255,255,0.2)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle="#fff",e.fillRect(0,0,64,64),e.globalCompositeOperation="destination-in",e.fillStyle=t,e.fillRect(0,0,64,64);let n=new oo(i);return n.colorSpace=nt,n}var Uh=null;function Zy(){return Uh||(Uh=uT()),Uh}var lr=new Je;lr.setAttribute("position",new Ke(zl,3));lr.setAttribute("color",new Ke(new Float32Array(Ni),3));lr.boundingSphere=new At(new L,12);var Jy=.14,lf=new er({size:Jy,sizeAttenuation:!0,vertexColors:!0,map:Zy(),transparent:!0,alphaTest:.06,opacity:.82,blending:fr,depthTest:!0,depthWrite:!1,fog:!1}),Qy=new Cr(lr,lf);Hn.add(Qy);var Rn={roomWarm:-1,voiceFocusMix:-1,actFocusMix:-1,quoteStageMix:-1,focusName:null,activeQuoteIndex:-1,selectedActDate:null},vn=he.room?.orbit??{},go=Math.max(0,vn.count??12),xo=Math.max(2,vn.trail??58),Ua=go*xo,uf=[];{let i={hawkish:[],dovish:[],neutral:[]};ht.forEach((t,n)=>{let r=["hawkish","dovish","neutral"].includes(t?.label)?t.label:"neutral";i[r].push(n)});let e=["hawkish","dovish","neutral"];for(let t=0;uf.length<go&&t<go*3;t++){let n=i[e[t%3]];if(!n.length)continue;let r=Math.floor(t/3),o=n[Math.round((r+.5)*(n.length/Math.max(1,Math.ceil(go/3))))%n.length];o!=null&&uf.push(o)}}var Qn=new St;Qn.name="roomOrbitals";Qn.position.set(he.room?.figure?.x??0,0,he.room?.figure?.z??-4.8);Qn.visible=!1;ut.add(Qn);var _o=uf.map((i,e)=>{let t=vn.minRadius??.46,n=t+Et(e,11)*((vn.maxRadius??.95)-t),r=ne.degToRad((Et(e,12)-.5)*2*(vn.tilt??34));return{quoteIndex:i,radius:n,ecc:.86+Et(e,13)*.26,y:(vn.minY??.26)+Et(e,14)*((vn.maxY??1.14)-(vn.minY??.26)),tilt:r,node:Et(e,15)*Math.PI*2,phase:Et(e,16)*Math.PI*2,speed:(vn.speed??.24)/Math.pow(n/.6,1.15)*(Et(e,17)>.5?1:-1),bob:.05+Et(e,18)*.07}}),kl=new Float32Array(Ua*3),Gl=new Float32Array(Ua*3),df=new Float32Array(Ua),hf=new Float32Array(Ua),ev=new Float32Array(Ua);_o.forEach((i,e)=>{let t=ht[i.quoteIndex],n=["hawkish","dovish","neutral"].includes(t?.label)?t.label:"neutral",r=n==="hawkish"?jy:n==="dovish"?Ky:$y,o=n==="neutral"?vn.neutralDim??.78:1;for(let s=0;s<xo;s++){let a=e*xo+s;if(Gl[a*3+0]=r.r*o,Gl[a*3+1]=r.g*o,Gl[a*3+2]=r.b*o,ev[a]=e,s===0)df[a]=vn.headSize??.175,hf[a]=1;else{let c=1-(s-1)/Math.max(1,xo-2);df[a]=(vn.tailSize??.095)*(.34+.66*c),hf[a]=Math.pow(c,1.65)*.72}}});var Hr=new Je;Hr.setAttribute("position",new Ke(kl,3));Hr.setAttribute("aColor",new Ke(Gl,3));Hr.setAttribute("aSize",new Ke(df,1));Hr.setAttribute("aFade",new Ke(hf,1));Hr.setAttribute("aOwner",new Ke(ev,1));Hr.boundingSphere=new At(new L(0,.7,0),2.4);var au=new un({uniforms:{uMap:{value:Zy()},uOpacity:{value:0},uScale:{value:450},uFocus:{value:-1}},vertexShader:`
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
  `,transparent:!0,depthTest:!0,depthWrite:!1,blending:fr}),Nf=new Cr(Hr,au);Nf.frustumCulled=!1;Qn.add(Nf);function Jl(){if(!tt)return;let i=tt.getSize(new Ie);au.uniforms.uScale.value=i.y*tt.getPixelRatio()*.5}Jl();var Cl=new L;function dT(i,e,t){let n=i.phase+i.speed*e,r=i.node+(vn.precession??.028)*e,o=Math.cos(n)*i.radius,s=Math.sin(n)*i.radius*i.ecc,a=Math.cos(i.tilt),c=Math.sin(i.tilt),l=-s*c,u=s*a,d=Math.cos(r),h=Math.sin(r);return t.set(o*d+u*h,i.y+l+Math.sin(e*.5+i.phase)*i.bob,-o*h+u*d),t}var tv=0;function hT(i,e){if(tv=e,au.uniforms.uOpacity.value=e*(vn.opacity??.95),pT(e>.35&&go>0),e<.004||go===0){Qn.visible=!1;return}Qn.visible=!0;let t=vn.trailStep??.07;for(let n=0;n<go;n++){let r=_o[n];for(let o=0;o<xo;o++){dT(r,i-o*t,Cl);let s=(n*xo+o)*3;kl[s]=Cl.x,kl[s+1]=Cl.y,kl[s+2]=Cl.z}}Hr.attributes.position.needsUpdate=!0}var ws=document.getElementById("roomVoiceNav"),uy=document.getElementById("roomVoiceNavList"),dy=null;function fT(){if(!ws||!uy||_o.length===0)return;let i=document.createDocumentFragment();_o.forEach((e,t)=>{let n=ht[e.quoteIndex];if(!n)return;let r=document.createElement("li");r.className="room-voice-nav-item";let o=document.createElement("button");o.type="button",o.className="room-voice-btn",o.dataset.quoteIndex=String(e.quoteIndex),o.dataset.tone=n.label||"neutral";let s=n.participant||"Participante an\xF3nimo",a=n.formatted_date||n.date||(n.year?"A\xF1o "+n.year:"fecha no especificada"),c=n.label||"neutral";o.appendChild(document.createTextNode(s));let l=document.createElement("span");l.className="room-voice-meta",l.textContent=`${a} \xB7 ${c}`,o.appendChild(l),o.setAttribute("aria-label",`${s}, ${a}, tono ${c}. Abrir la cita.`),o.addEventListener("focus",()=>{Eh(e.quoteIndex),Ps()}),o.addEventListener("click",()=>{mi(e.quoteIndex),gi.card=o,zr(e.quoteIndex,o.getBoundingClientRect());let u=document.getElementById("quotePanelClose");u&&u.focus({preventScroll:!0})}),r.appendChild(o),i.appendChild(r)}),uy.appendChild(i),ws.addEventListener("focusout",e=>{ws.contains(e.relatedTarget)||_l()||(Mh(),Ps())})}function pT(i){!ws||i===dy||(dy=i,!i&&ws.contains(document.activeElement)&&document.activeElement.blur(),ws.hidden=!i)}fT();function mT(){if(typeof Ri.index!="number"||Ri.index<0)return-1;for(let i=0;i<_o.length;i++)if(_o[i].quoteIndex===Ri.index)return i;return-1}var Vl=new ha,Nh=new Ie,Bh=new L;function gT(i=1){let e=he.interaction?.hoverRadius??.075,t=Hn.scale?.x||1;Vl.params.Points.threshold=e*t*i}function nv(i,e,t=1){if(!Yy)return-1;let n=nn();gT(t),Nh.x=i/n.width*2-1,Nh.y=-(e/n.height)*2+1,Vl.setFromCamera(Nh,Mt);let r=Vl.intersectObject(Qy,!1),o=tv>.35&&Qn.visible?Vl.intersectObject(Nf,!1):[];if(r.length===0&&o.length===0)return-1;let s=-1,a=1/0,c=(l,u)=>{Bh.copy(l.point).project(Mt);let d=(Bh.x*.5+.5)*n.width,h=(-Bh.y*.5+.5)*n.height,f=d-i,g=h-e,x=f*f+g*g;x<a&&(a=x,s=u)};for(let l=0;l<r.length;l++)c(r[l],r[l].index);for(let l=0;l<o.length;l++){let u=Math.floor(o[l].index/xo),d=_o[u]?.quoteIndex;d!=null&&c(o[l],d)}return s}function xT(){let i=document.getElementById("quotePanel");if(!i)return;let e=Ai(),t=Math.max(180,e.height-24);i.style.maxHeight=`${t}px`,i.classList.remove("is-compact","is-ultra-compact"),i.scrollHeight>t&&i.classList.add("is-compact"),i.scrollHeight>t&&i.classList.add("is-ultra-compact")}function iv(i){let e=document.getElementById("quotePanel");if(!e)return;xT();let t=Ai(),n=e.offsetWidth||t.width*.38,r=e.offsetHeight||t.height*.34,o=Math.max(12,Math.min(t.width,t.height)*.025),s=Math.max(10,Math.min(t.width,t.height)*.018),a=ne.clamp(i&&typeof i.x=="number"?i.x:Xy,0,t.width),c=ne.clamp(i&&typeof i.y=="number"?i.y:qy,0,t.height),l=[{name:"right",left:a+s,top:c-r/2},{name:"left",left:a-n-s,top:c-r/2},{name:"below",left:a-n/2,top:c+s},{name:"above",left:a-n/2,top:c-r-s}],u=g=>g.left>=o&&g.top>=o&&g.left+n<=t.width-o&&g.top+r<=t.height-o,d=l.find(u)||l.map(g=>({...g,overflow:Math.max(0,o-g.left)+Math.max(0,o-g.top)+Math.max(0,g.left+n-t.width+o)+Math.max(0,g.top+r-t.height+o)})).sort((g,x)=>g.overflow-x.overflow)[0],h=ne.clamp(d.left,o,Math.max(o,t.width-n-o)),f=ne.clamp(d.top,o,Math.max(o,t.height-r-o));e.style.left=`${h}px`,e.style.top=`${f}px`,e.style.right="auto",e.style.bottom="auto",e.dataset.placement=d.name}function Bf(i){if(document.querySelectorAll(".axes-data-mark.is-focus").forEach(t=>t.classList.remove("is-focus")),i<0)return;let e=document.querySelector(`#d3-canvas .axes-data-mark[data-quote-index="${i}"]`);e&&e.classList.add("is-focus")}function zr(i,e){let t=ht[i];if(!t)return;Ri.index=i,Bf(i),document.getElementById("qpWho").textContent=t.participant||"Participante an\xF3nimo";let n=document.getElementById("qpTag");n.textContent=(t.label||"neutral").charAt(0).toUpperCase()+(t.label||"neutral").slice(1),n.className="tag "+(t.label||"neutral"),document.getElementById("qpWhen").textContent=t.formatted_date||t.date||"Fecha no especificada",document.getElementById("qpText").textContent="\u201C"+(t.text||"Sin texto disponible")+"\u201D",document.getElementById("qpYear").textContent=t.year?"A\xF1o "+t.year:"A\xF1o no especificado";let r=document.getElementById("qpScore");if(r){let u=typeof t.score=="number"?t.score:null;if(u==null)r.style.display="none";else{r.style.display="flex";let d=document.getElementById("qpScoreBar"),h=ne.clamp(Math.abs(u),0,1)*50;d.style.width=h.toFixed(0)+"%",d.parentElement.classList.toggle("negative",u<0),d.parentElement.classList.toggle("positive",u>0),d.parentElement.classList.toggle("neutral",u===0),document.getElementById("qpScoreVal").textContent=u.toFixed(2)}}let o=document.getElementById("quotePanel"),s=t.label||"neutral",a=typeof t.score=="number"?t.score:0,c=s==="hawkish"?"var(--color-gold)":s==="dovish"?"var(--color-dovish)":"rgba(223, 229, 240, 0.96)",l=1.9+Math.min(Math.abs(a),1)*1.4;o.dataset.tone=s,o.style.setProperty("--quote-border-color",c),o.style.setProperty("--quote-border-width",`${l.toFixed(2)}px`),o.hidden=!1,o.setAttribute("aria-hidden","false"),o.classList.add("visible"),iv(e),gi.card&&document.activeElement===gi.card&&document.getElementById("quotePanelClose").focus({preventScroll:!0})}var hy=!1,fy=0,Fh=null;function Ps(){let i=C_();i>=0?zr(i):Is()}function _T(i,e){if(!hr.classList.contains("visible"))return!1;let t=hr.getBoundingClientRect();return i>=t.left&&i<=t.right&&e>=t.top&&e<=t.bottom}function yT(i,e){let t=performance.now();if(t-fy<32)return;fy=t;let n=nv(i,e),r=n>=0;if(r!==hy&&(hy=r,document.body.style.cursor=r?"pointer":Rs===1?"grab":""),!_l())if(r){if(_T(i,e)||n===Sn.hover&&Sn.hover>=0)return;Fh&&clearTimeout(Fh),Fh=setTimeout(()=>{Eh(n),Ps()},he.interaction?.hoverDelayMs??90)}else Sn.hover>=0?(Mh(),Ps()):hr.classList.contains("visible")&&Is()}var vT=If;If=function(i,e){vT(i,e),yT(i,e)};var ET=ou;ou=function(i,e,t){let n=nv(i,e,t?.pointerType==="touch"?he.interaction?.touchRadiusMul??2.2:1);if(n>=0){mi(n),zr(n);return}_l()&&Is(),ET(i,e)};var hn=0,rv=0,Fr=1,_n=1,Yt=1,MT=["axes","voices","acts","timeline","quotes"],ff={axes:0,voices:0,acts:0,timeline:0,quotes:0},xn={axes:0,voices:0,acts:0,timeline:0,quotes:0},ar=null,ps=0,pf=!1,As=(i,e)=>{i in ff&&(ff[i]=ne.clamp(Number(e)||0,0,1))};window.addEventListener("particle-act-focus",i=>{ar=i.detail?.date||null});var qt=he.door&&he.door.transition==="doorway"?"doorway":"classic";qt==="classic"&&document.body.classList.add("mode-classic");var wt=0,Ll=1,Oh=0,ur=0,uo=0,Hh=new L(0,.7,0),ov=new L(he.door?.roomLook?.x??0,he.door?.roomLook?.y??.45,he.door?.roomLook?.z??-2),py=document.getElementById("roomTitle"),bT=new ft,Wl=new dt,my=new L,Pl=he.door?.roomLook?.y??.45,Ff=!0;function gy(i){let{width:e,height:t}=nn(),n=bT;return n.fov=he.camera.fov,n.aspect=e/t,n.near=.1,n.far=100,n.position.set(he.camera.x,he.door?.roomCamY??.62,he.door?.roomCamZ??-.5),n.up.set(0,1,0),n.lookAt(he.door?.roomLook?.x??0,i,he.door?.roomLook?.z??-2),n.updateMatrixWorld(!0),n.updateProjectionMatrix(),my.set(he.room?.figure?.x??0,Wl.min.y,he.room?.figure?.z??-4.8).project(n),(1-my.y)*.5*t}function TT(){if(Ff=!1,!Xt||!py)return;let i=Xt.figures.get("soporte")?.root;if(!i)return;let e=Xt.group,t=e.scale.x,n=e.position.y;if(e.scale.setScalar(1),e.position.y=0,e.updateMatrixWorld(!0),Wl.setFromObject(i),e.scale.setScalar(t),e.position.y=n,e.updateMatrixWorld(!0),Wl.isEmpty()||!Number.isFinite(Wl.min.y))return;let{height:r}=nn(),o=py.offsetTop;if(!Number.isFinite(o)||o<=0)return;let s=o-Math.max(24,r*(wi.gapRatio??.045)),a=Pl,c=Pl+.15,l=gy(a),d=(gy(c)-l)/(c-a);!Number.isFinite(d)||Math.abs(d)<1||(ov.y=ne.clamp(a+(s-l)/d,Pl-.7,Pl+.35))}var xy=new L(0,fo,0),_y=new L,ms=[{id:"hero",pos:[0,.72,7.15],look:[0,.95,-.25]},{id:"stageObjective",pos:[0,.7,4.45],look:[0,.78,-.55]},{id:"stageHook",pos:[0,.6,5.8],look:[0,.7,0]},{id:"stageAxes",pos:[0,.6,5.8],look:[0,.7,0]},{id:"stageWordEvolution",pos:[1.3,.74,5.1],look:[0,.68,0]},{id:"stageVoices",pos:[1.1,.74,5.2],look:[0,.68,0]},{id:"stageActs",pos:[-1.1,.74,5.2],look:[0,.68,0]},{id:"stageCounters",pos:[0,.68,5.5],look:[0,.7,0]},{id:"stagePipeline",pos:[1.5,.8,4.9],look:[0,.66,0]},{id:"stageTimeline",pos:[-1.5,.8,4.9],look:[0,.66,0]},{id:"stageQuotes",pos:[0,.72,5.4],look:[0,.7,0]},{id:"stageClosing",pos:[0,.6,5.8],look:[0,.7,0]}],Pi=[];function mf(){if(!0){let n=he.coin.baseY;he.camera.y=n+.38,ms[0].pos=[0,he.camera.y,he.camera.z],ms[0].look=[0,n,0];let r=he.door.approachCamY??.62,o=he.door.approachCamZ??he.camera.z;ms[1].pos=[0,r,o],ms[1].look=[0,r,0]}let i=document.documentElement.scrollHeight-window.innerHeight,e=[],t=ms.length;for(let n=0;n<t;n++){let r=ms[n],o=document.getElementById(r.id),s;if(o&&i>0){let a=o.getBoundingClientRect(),c=a.top+window.scrollY+a.height/2;s=ne.clamp((c-window.innerHeight*.5)/i,0,1)}else s=t>1?n/(t-1):0;if(r.id==="stageObjective"){let a=document.getElementById("hero"),c=a?a.offsetHeight:window.innerHeight;s=ne.clamp(c/Math.max(i,1e-4),0,1)}e.push({id:r.id,p:s,pos:r.pos,look:r.look})}if(i>0){let n=e.find(o=>o.id==="stageObjective"),r=document.getElementById("stageRoom");if(n&&r){let o=r.getBoundingClientRect().top+window.scrollY-window.innerHeight*.85,s=ne.clamp(o/i,0,1),a=e.indexOf(n);e.splice(a+1,0,{id:"doorwayHold",p:Math.max(s,n.p+.001),pos:n.pos,look:n.look})}}for(let n=1;n<e.length;n++)e[n].p<e[n-1].p&&(e[n].p=e[n-1].p+.001);Pi=e}var gs=new L,xs=new L;function ST(i){if(Jn)return gs.set(he.camera.x,fo,he.camera.z),xs.set(0,fo,0),{pos:gs,look:xs};let e=ne.clamp(i,0,1);if(!Pi.length)return gs.set(he.camera.x,fo,he.camera.z),xs.set(0,fo,0),{pos:gs,look:xs};let t=Pi[0],n=Pi[Pi.length-1];for(let s=0;s<Pi.length-1;s++)if(e>=Pi[s].p&&e<=Pi[s+1].p){t=Pi[s],n=Pi[s+1];break}let r=Math.max(n.p-t.p,1e-4),o=ne.smoothstep((e-t.p)/r,0,1);return gs.set(ne.lerp(t.pos[0],n.pos[0],o),ne.lerp(t.pos[1],n.pos[1],o),ne.lerp(t.pos[2],n.pos[2],o)),xs.set(ne.lerp(t.look[0],n.look[0],o),ne.lerp(t.look[1],n.look[1],o),ne.lerp(t.look[2],n.look[2],o)),{pos:gs,look:xs}}var yy=new L,vy=new L;ds(async()=>{let{initVoiceExplorer:i}=await Promise.resolve().then(()=>(z_(),H_));i({quotes:ht,openQuote:zr,closeQuotePanel:Is})});var ho=[],ya=0,sv=0,gf=!1;document.addEventListener("visibilitychange",()=>{document.hidden&&(gf=!0)});var Ia=!1,av=0,zh=0;function cv(){Ia||(Ia=!0,av=performance.now())}function xf(i){if(!tt||Math.abs(i-Ln)<.05)return;Ln=i,tt.setPixelRatio(Ln);let e=nn();tt.setSize(e.width,e.height,!1),typeof Jl=="function"&&Jl()}function wT(){if(Cs||!tt)return;Cs=!0;try{tt.render(ut,Mt)}catch{}let i=null;try{i=La.toDataURL("image/png")}catch{}let e=!1;if(i&&i.length>1e3)try{let t=document.createElement("img");t.id="canvasPoster",t.src=i,t.alt="",t.setAttribute("aria-hidden","true"),t.style.cssText="display:block; position:fixed; inset:0; width:100%; height:100%; z-index:2; object-fit:fill; pointer-events:none;",La.replaceWith(t),e=!0}catch{}if(gsap.ticker.remove(lv),e)try{let n=tt.getContext().getExtension("WEBGL_lose_context");n&&n.loseContext()}catch{}document.body.dataset.perfPoster="1",console.info("[perf] Modo p\xF3ster: la escena 3D queda como imagen fija (DPR 0,75 no fue suficiente). El relato sigue en el DOM.")}function lv(){sv++;let i=performance.now(),e=ya>0?Math.min(i-ya,100):1e3/60;if(ya>0&&Ia)if(gf)gf=!1;else{let $=i-ya;$<2e3&&ho.push($)}ya=i;let t=rT.getElapsedTime(),n=ne.smoothstep(ur,0,1),r=wt,o=wt*(1-n);if(Ul.length){let $=wt<.55;for(let S=0;S<Ul.length;S++)Ul[S].visible=$}if(Nl&&Bl){let $=ne.smoothstep(wt,.14,.72),S=ne.degToRad(85)*$;Nl.rotation.z=S*(Nl.userData.openSign||1),Bl.rotation.z=S*(Bl.userData.openSign||-1)}if(Zh&&Jh){let $=ne.smoothstep(wt,.04,.42),S=ne.degToRad(78)*$;Zh.rotation.y=S,Jh.rotation.y=-S}if(Fl){let $=ne.smoothstep(wt,.02,.22),S=1-ne.smoothstep(wt,.32,.52),J=$*S;Fl.opacity=.1*J,Fl.emissiveIntensity=.03+.42*J}if(MT.forEach($=>{xn[$]=sr(xn[$],ff[$],Jn?1:.14,e)}),_a=sr(_a,Vy,.06,e),fs=sr(fs,Wy,.06,e),ru||(Ol=sr(Ol,0,.05,e),Hl=sr(Hl,0,.05,e)),Cn.children.length>0){Ph<0&&(Ph=t);let $=t-Ph,S=Math.min($/(Jn?1.2:1.8),1),J=1-Math.pow(1-S,3),U=Jn?.12:1;Cn.rotation.y=$*lo.swaySpeedY*J*U+_a*.08*U+Ol,Cn.rotation.x=-.11+.018*Math.sin($*lo.tiltSpeed*U)+fs*-.12*U+Hl,Cn.position.y=lo.baseY+lo.floatAmount*Math.sin($*lo.floatSpeed*U)*U,By.position.set(_a*2.5,he.coin.baseY+fs*-1.8,4),Cn.getWorldPosition(Rl),Rl.project(Mt);let O=nn(),B=(Rl.x*.5+.5)*O.width,le=(-Rl.y*.5+.5)*O.height;if(Wh.style.transform=`translate3d(${B}px, ${le}px, 0)`,Fr=ne.clamp(1-hn/.45,0,1),Tl)if(!0)Tl.style.opacity="0";else{let xe=Math.max(20,Rf*.48);Tl.style.transform=`translate3d(${B}px, ${le+xe}px, 0) scale(${.82+Fr*.18})`,Tl.style.opacity=(Fr*.46).toFixed(3)}if(Cn.visible=Rs===1&&Fr>.01,Cn.position.z=.55,Cn.visible){let xe=Fr<.999;for(let R=0;R<Il.length;R++)Il[R].transparent=xe,Il[R].opacity=Fr}}let s=_n;if(it.children.length>0){hn<.02&&ur<.01&&(Yt=1,_n=Math.max(_n,.98)),_n=sr(_n,Yt,.12,e),Yt===0&&_n<.03&&(_n=0);let $=0,S=qt==="doorway"?ne.smoothstep(ur,0,.18):0;if(s=_n*(1-$)*(1-S),it.visible=s>.001&&!!cr,!it.visible)Ii&&(Ii.visible=!1),dr.visible=!1,Ui&&(Ui.visible=!1),ut.fog&&(ut.fog.density=0);else{let J=_n*_n*(3-2*_n),U=1-ne.smoothstep(hn,.18,.88),O=1-U;it.rotation.y=_a*.05*J*O,it.position.x=he.door.baseX,it.position.z=he.door.heroBaseZ??he.door.baseZ??0;let B=ne.lerp(1.25/Math.max(he.door.widthVsCoin,.001),1,1-ne.smoothstep(hn,.18,.88)),le=ne.lerp(1.55,1,U),xe=(.94+.06*J)*B*le;if(wt<.001?Ll=1:Oh<=.001&&wt>.001&&(Ll=it.scale.x/Math.max(xe,1e-6)),wt<Oh-.01&&(Ll=1),it.scale.setScalar(xe*Ll),Oh=wt,wt<.01&&cr&&Ra>0){let Y=nn(),Le=Ra*Di.scale.y*it.scale.y,Re=Math.max(Mt.position.distanceTo(it.position),.1),Pe=Le*Y.height/(2*Re*Math.tan(ne.degToRad(Mt.fov*.5)));vy.copy(it.position).project(Mt);let Te=(-vy.y*.5+.5)*Y.height,be=2*Math.max(80,Math.min(Te-Y.height*.02,(Ls?.band?.bottom??Y.height*.72)-Te)),Ye=Y.width/Math.max(window.devicePixelRatio||1,1)<=900||Y.height<=760,at=Y.height*(Ye?.3:.52),He=ne.lerp(at,be,U);Pe>He&&it.scale.multiplyScalar(He/Pe)}let R=cr?Aa*Di.scale.y*it.scale.x:0,b=(he.door.groundY??0)-R;it.rotation.x=-.12*U+fs*-.03*J*O,it.position.y=ne.lerp(b,he.coin.baseY,U)+fs*-.06*J*O;let z=po?1:0,se=po?0:1,ue=ne.smoothstep(hn,.18,.88);po&&(po.visible=s>.001),$h&&($h.visible=s>.001&&se>.001);let de=1,ve=1-ne.smoothstep(wt,.86,.96),[_e,ye]=he.door?.leafFadeT??[.84,.94],De=Math.abs(s-rn.vis)>1e-4||Math.abs(ue-rn.colorT)>1e-4||Math.abs(wt-rn.crossT)>1e-4||Math.abs(hn-rn.scatter)>1e-4||Math.abs(ur-rn.exitT)>1e-4||Math.abs(_n-rn.fade)>1e-4;if(rn.vis=s,rn.colorT=ue,rn.crossT=wt,rn.scatter=hn,rn.exitT=ur,rn.fade=_n,De)for(let Y=0;Y<Qh.length;Y++){let Le=Qh[Y],Re=Le.userData?.bcchKind||"frame",Pe=Re==="leaf",Te=Pe||Re==="medal",be=Re==="aperture",Ne=ne.smoothstep(ue,.1,1),Ye=Pe?1-ne.smoothstep(wt,_e,ye):1,at=Pe?Ye:(be?de:1)*ve,He=s*z*at;Le.transparent=He<.999,Le.opacity=He,Le.color.copy(Gy).lerp(Zb,ue),Le.envMapIntensity=Te?ne.lerp(.22,.58,Ne):ne.lerp(.1,.24,Ne),Le.emissive&&(Le.emissive.copy(Te?Jb:Qb),Le.emissiveIntensity=(Te?.006:.0015)*Ne)}if(De){for(let Y=0;Y<ef.length;Y++){let Le=ef[Y],Re=Le.kind==="leaf"?1-ne.smoothstep(wt,_e,ye):(Le.kind==="aperture"?de:1)*ve;Le.m.opacity=Le.baseOpacity*s*z*Re*(.55+.45*ue)}for(let Y=0;Y<Sa.length;Y++){let Le=s*se;Sa[Y].transparent=Le<.999,Sa[Y].opacity=Le}for(let Y=0;Y<of.length;Y++)of[Y].opacity=.42*s*se;for(let Y=0;Y<Dl.length;Y++)Dl[Y].m.opacity=Dl[Y].baseOpacity*s*se}if(De&&!0&&wa.length){let Y=ne.smoothstep(hn,.28,.9),Le=ne.smoothstep(wt,.1,.6);for(let Re=0;Re<wa.length;Re++){let Pe=wa[Re],Te=Pe.m,be=he.door.leaf,Ne=Pe.tone==="orn",Ye=Pe.tone==="dark",at=Ne?be.meetOrn:Ye&&be.meetDark||be.meet,He=Ne?be.crossOrn:Ye&&be.crossDark||be.cross,Ee=Ne?Hb:Ye?Fb:Nb,F=Ne?zb:Ye?Ob:Bb;Te.color.copy(ky).lerp(Ee,Y).lerp(F,Le),Te.metalness=ne.lerp(ne.lerp(be.hero.metalness,at.metalness,Y),He.metalness,Le),Te.roughness=ne.lerp(ne.lerp(be.hero.roughness,at.roughness,Y),He.roughness,Le),Te.envMapIntensity=ne.lerp(ne.lerp(be.hero.envMapIntensity,at.envMapIntensity,Y),He.envMapIntensity,Le)}for(let Re=0;Re<jl.length;Re++){let Pe=jl[Re],Te=Pe.m,be=Kl[Pe.tone]||Kl.stone;Te.color.copy(be.hero).lerp(be.meet,Y);let Ne=he.door.frameAnim,Ye=Pe.tone==="dark"?.72:Pe.tone==="granite"?.82:1;if(Te.metalness=ne.lerp(Ne.hero.metalness,Ne.meet.metalness,Y)*Ye,Te.roughness=ne.lerp(Ne.hero.roughness,Ne.meet.roughness,Y),Te.envMapIntensity=ne.lerp(Ne.hero.envMapIntensity,Ne.meet.envMapIntensity,Y)*Ye,Te.bumpScale!=null){let at=Pe.tone==="dark"?.55:1;Te.bumpScale=ne.lerp(Ne.hero.bumpScale,Ne.meet.bumpScale,Y)*at}Te.emissive&&(Te.emissive.setRGB(0,0,0),Te.emissiveIntensity=0)}Li[0]&&(Li[0].color.copy(kb).lerp(Gb,Y),Li[0].intensity=ne.lerp(8.5,13.5,Y)),Li[1]&&(Li[1].color.copy(Vb).lerp(Wb,Y),Li[1].intensity=ne.lerp(4.8,7.5,Y)),Li[2]&&(Li[2].intensity=ne.lerp(2.4,4.2,Y))}let Se=s>.01&&!!cr;if(Ii&&(Ii.visible=Se),dr.visible=Se&&!(hn<.55),dr.material.opacity=.8*J*(1-$),ut.fog&&(ut.fog.density=Se?he.door.fogDensity*J:0),dr.position.set(it.position.x,it.position.y+R,it.position.z),Ui&&cr&&mo){let Y=(Aa+$l)*.5*Di.scale.y;Ui.position.set(0,Y+.08,-.34),Ui.scale.set(mo.width*Di.scale.x*1.78,Math.max(Ra*Di.scale.y*1.08,1),1);let Le=1-ne.smoothstep(wt,.12,.36),Re=ne.smoothstep(hn,.48,.92)*Le;rf.opacity=Se?.18*J*Re:0,Ui.visible=rf.opacity>.002}Se&&(yy.set(it.position.x,it.position.y,it.position.z),Li.forEach(Y=>{Y.target.position.copy(yy),Y.target.updateMatrixWorld()}))}}let a=he.door?.roomSwarm??{x:0,y:.55,lead:2,leadOut:1.2,scale:.35},c=qt==="doorway"&&o>0?ne.smoothstep((o-.25)/.5,0,1):0,l=ne.lerp(1,a.scale??.35,c),u=ne.lerp(a.leadOut??1.2,a.lead??2,c);Hn.position.set(ne.lerp(0,a.x??0,c),ne.lerp(0,a.y??.55,c),Hn.position.z),Hn.scale.setScalar(l),lf.size=Jy*l;let d=t*.12+hn*.8,h=c*Math.sin(t*.35)*.06,f=Math.max(xn.axes,xn.timeline,xn.voices*uo,xn.acts*ps);Hn.rotation.y=d*(1-c)*(1-f)+h;let g=qt==="doorway"?ne.smoothstep((o-.3)/.5,0,1):0,x=wn.participant||wn.rendered;uo=sr(uo,wn.participant?1:0,Jn?1:.08,e),ps=sr(ps,ar?1:0,Jn?1:.08,e),!wn.participant&&uo<.005&&(wn.rendered=null);let m=Ri.index>=0?Ri.index:-1,p=xn.voices*uo,v=xn.acts*ps,_=xn.quotes,T=Math.abs(g-Rn.roomWarm)>1e-4||Math.abs(uo-Rn.voiceFocusMix)>.001||Math.abs(ps-Rn.actFocusMix)>.001||Math.abs(_-Rn.quoteStageMix)>.001||x!==Rn.focusName||m!==Rn.activeQuoteIndex||ar!==Rn.selectedActDate;Rn.roomWarm=g,Rn.voiceFocusMix=uo,Rn.actFocusMix=ps,Rn.quoteStageMix=_,Rn.focusName=x,Rn.activeQuoteIndex=m,Rn.selectedActDate=ar;let A=Or.nearFade??null,E=!1;if(A){let $=lr.attributes.position.array;for(let S=0;S<jt;S++){ly.set($[S*3],$[S*3+1],$[S*3+2]).applyMatrix4(Hn.matrixWorld);let J=ne.smoothstep(ly.distanceTo(Mt.position),A[0],A[1]);Math.abs(J-Ih[S])>.01&&(Ih[S]=J,E=!0)}}if(T||E){let $=lr.attributes.color.array;for(let S=0;S<jt;S++){let J=S*3,U=ht[S],O=!!(x&&U&&U.participant===x),B=!!(ar&&cf[S]===ar),le=S===m,xe=x?ne.lerp(1,O?1:.1,p):1,R=ar?ne.lerp(1,B?1:.16,v):1,b=m>=0?Math.max(.55,_*.82):0,z=m>=0?ne.lerp(1,le?1.15:.28,b):1,se=xe*R*z,ue=g*.22,de=ne.lerp(Ni[J],1,ue),ve=ne.lerp(Ni[J+1],.8,ue),_e=ne.lerp(Ni[J+2],.52,ue),ye=ne.clamp(Math.max(se,.22),0,1),De=Math.max(1,se),Se=Math.max(Ni[J]*.34,.14),Y=Math.max(Ni[J+1]*.34,.16),Le=Math.max(Ni[J+2]*.34,.2),Re=Ih[S];$[J]=ne.lerp(Se,de,ye)*De*Re,$[J+1]=ne.lerp(Y,ve,ye)*De*Re,$[J+2]=ne.lerp(Le,_e,ye)*De*Re}lr.attributes.color.needsUpdate=!0}let w=lr.attributes.position.array,P=ne.lerp(hn,.06,c),y=pf?xn.axes:0,M=pf?xn.timeline:0,D=wh(Jn?1:.16,e),V=Math.max(y,M,p,v),ie=yn?.window??null,I=ie?ne.smoothstep(wt,ie[0],ie[1])*(1-ne.smoothstep(wt,ie[2],ie[3])):0;I>0&&(Hn.updateMatrixWorld(!0),cy.copy(Hn.matrixWorld).invert());for(let $=0;$<jt;$++){let S=$*3,J=vs[S],U=vs[S+1],O=vs[S+2],B=Es[S],le=Es[S+1],xe=Es[S+2],R=ne.lerp(J,B,P),b=ne.lerp(U,le,P),z=ne.lerp(O,xe,P),se=Math.sin(t*.9+$*.5)*.08*fb*(1-V),ue=R+se,de=b+se,ve=z,_e=ht[$];if(y>0&&(ue=ne.lerp(ue,Ms[S],y),de=ne.lerp(de,Ms[S+1],y),ve=ne.lerp(ve,Ms[S+2],y)),M>0&&(ue=ne.lerp(ue,Ss[S],M),de=ne.lerp(de,Ss[S+1],M),ve=ne.lerp(ve,Ss[S+2],M)),p>0&&x&&_e?.participant===x&&(ue=ne.lerp(ue,bs[S],p),de=ne.lerp(de,bs[S+1],p),ve=ne.lerp(ve,bs[S+2],p)),v>0&&ar&&cf[$]===ar&&(ue=ne.lerp(ue,Ts[S],v),de=ne.lerp(de,Ts[S+1],v),ve=ne.lerp(ve,Ts[S+2],v)),I>0){On.set(ue,de,ve).applyMatrix4(Hn.matrixWorld);let ye=1-ne.smoothstep(Math.abs(On.z-yn.z)/yn.depth,0,1);if(ye>.002){let De=ye*(yn.squeeze??.75)*I;On.x+=(Zl[$*2]-On.x)*De,On.y+=(Zl[$*2+1]-On.y)*De,On.z>yn.z&&(On.z+=(yn.z-On.z)*ye*(yn.zSqueeze??.6)*I),On.applyMatrix4(cy),ue=On.x,de=On.y,ve=On.z}}w[S]+=(ue-w[S])*D,w[S+1]+=(de-w[S+1])*D,w[S+2]+=(ve-w[S+2])*D}lr.attributes.position.needsUpdate=!0;let G=1-(it.children.length>0?s:0)*.85;bf.intensity=xt.key.intensity*G,Tf.intensity=xt.fill.intensity*G,Sf.intensity=xt.rim.intensity*G,wf.intensity=xt.front.intensity*G,Ny.intensity=xt.ambient.intensity*G;let te=ST(rv),N=1-ne.smoothstep(hn,.18,.88);if(N>0){let $=he.door.approachCamY??.62,S=he.door.approachCamZ??he.camera.z;te.pos.set(0,ne.lerp($,he.camera.y,N),ne.lerp(S,he.camera.z,N));let J=nn().height,U=Math.max(he.camera.z-.55,.001),O=J/(2*Math.tan(he.camera.fov*Math.PI/360)*U),B=he.coin.baseY+(Ls.centerY-J/2)/Math.max(O,1e-6);te.look.set(0,ne.lerp($,B,N),0)}if(qt==="doorway"&&r>.001){let $=he.door.approachCamY??.62,S=he.door.approachCamZ??he.camera.z,J=ne.smoothstep(r,0,1),U=ne.smoothstep(r,.04,.38),O=ne.smoothstep(r,.38,.72),B=ne.lerp(0,0,O);Mt.position.set(ne.lerp(0,he.camera.x,J),ne.lerp($,he.door.roomCamY??.62,J)+B,ne.lerp(S,he.door.roomCamZ??-.5,J)),n>.001&&Mt.position.lerp(te.pos,n),Hn.position.z=ne.lerp(0,Mt.position.z-u,c);let[le,xe]=he.door.aimDoorT??[0,.45],[R,b]=he.door.aimRoomT??[.55,.95],z=ne.smoothstep((r-le)/Math.max(xe-le,.001),0,1),se=ne.smoothstep((r-R)/Math.max(b-R,.001),0,1);xy.set(0,he.door.approachCamY??.62,0),_y.set(it.position.x,it.position.y+(Aa+$l)*.5*Di.scale.y*it.scale.x,it.position.z),Hh.copy(xy).lerp(_y,z).lerp(ov,se),n>.001&&Hh.lerp(te.look,n),Mt.lookAt(Hh)}else Mt.position.copy(te.pos),Mt.lookAt(te.look);if(Yl){let $=qt==="doorway"?ne.smoothstep(o,.1,.45):0;Yl.intensity=$*(he.door?.roomLight?.intensity??10)}let X=he.camera.fov+(qt==="doorway"?Math.sin(Math.PI*ne.clamp(r,0,1))*(he.door?.fovKick??4):0);Math.abs(Mt.fov-X)>.01&&(Mt.fov=X,Mt.updateProjectionMatrix());let q=qt==="doorway"?Math.sin(Math.PI*ne.clamp((r-.6)/.4,0,1)):0,Q=1-ne.smoothstep(n,.95,1),fe=qt==="doorway"?ne.smoothstep(n,0,.5)*Q:0,H=qt==="doorway"?ne.smoothstep(n,.55,.9)*Q:0;if(ut.fog){let $=q*(he.door?.veilFog??0),S=fe*(he.door?.exitFog??.16)+H*(he.door?.exitFogSink??.14);ut.fog.density=Math.max(ut.fog.density,$,S)}let Z=Math.max(Ma,xn.voices*.72,xn.acts*.64,xn.timeline*.78,xn.quotes*.7),me=Math.max(Or.stageFloor??.62,1-(Or.stageFalloff??.38)*Z),j=Math.max(Or.ambientFloor??.62,.82-.3*hn),W=qt==="doorway"?1-(1-(Or.figureFloor??.6))*ne.smoothstep((c-.1)/.5,0,1):1;lf.opacity=j*(1-.5*q)*me*W;let ee=qt==="doorway"?ne.smoothstep((wt-.04)/.3,0,1):Rs!==1?1:0,ce=qt==="doorway"?ne.smoothstep(n,.85,.95):0,pe=1-ne.smoothstep(n,.25,.85);if(Xt)if(Ff&&TT(),Xt.group.visible=ee>.01&&ce<.99,!Xt.group.visible)ys.intensity=0,Ta.intensity=0,Qn.visible=!1,Xt.group.scale.setScalar(.86+.14*ee),Xt.group.position.y=(1-ee)*.5;else{Xt.group.scale.setScalar(.86+.14*ee),Xt.group.position.y=(1-ee)*.5;let $=!1,S=wt>.6&&n<.001;Xt.figures.forEach(b=>{b.placeholder&&(b.placeholder.visible=S,b.placeholder.rotation.y=t*.18*ee,b.placeholder.position.y=Math.sin(t*.6+b.def.x)*.04*ee),b.model&&($=!0)});let J=$?ee*pe*(1-ce):0,U=Xt.figures.get("balanza"),O=U?.def,B=(O?.x??0)+Xt.group.position.x,le=O?.z??he.room?.figure?.z??-4.8,xe=Xt.group.position.y+.55*(O?.scale??1.15)+(U?.root?.position.y??0);ys.intensity=J*(he.room?.accentIntensity??14),ys.position.set(B+.9,3.1,le+2.2),eu.position.set(B,xe,le),Ta.position.set(B-2.2,1.5,le+2.1),Ta.intensity=J*(he.room?.fillIntensity??4);let R=Xt.figures.get("soporte");Qn.position.set(B,Xt.group.position.y+(R?.height??0)*.25,le),Qn.scale.setScalar(Xt.group.scale.x),au.uniforms.uFocus.value=mT(),hT(Jn?0:t,J)}if(tt&&Cy&&(tt.render(ut,Mt),Ia&&!Jn&&!Da&&ho.length>=90)){let $=0;for(let J=0;J<ho.length;J++)$+=ho[J];let S=$/ho.length;ho.length=0,Dy=S,S>26&&Ln>.75?xf(Math.max(.75,Ln-.25)):S<12&&Ln<_i&&xf(Math.min(_i,Ln+.25)),Ln<=.76&&S>42&&i-av>15e3?(zh++,zh>=3&&wT()):zh=0}}gsap.ticker.add(lv);var hr=document.getElementById("quotePanel"),Ey=null;function Is(){hr.classList.remove("visible"),hr.setAttribute("aria-hidden","true"),clearTimeout(Ey),Ey=setTimeout(()=>{hr.classList.contains("visible")||(hr.hidden=!0)},360),yl(),Ri.index=-1,Bf(-1),gi.card&&(gi.card.focus({preventScroll:!0}),gi.card=null)}document.getElementById("quotePanelClose").addEventListener("click",Is);window.addEventListener("resize",()=>{hr.classList.contains("visible")&&iv()});window.addEventListener("keydown",i=>{i.key==="Escape"&&hr.classList.contains("visible")&&Is()});function Of(){let{width:i,height:e}=Ai();Mt.aspect=i/e,Mt.updateProjectionMatrix(),tt&&!Cs&&(tt.setPixelRatio(Ln),tt.setSize(i,e)),Jl(),Hy(),Ff=!0,Pf(),zy()}window.addEventListener("resize",Of);window.visualViewport&&window.visualViewport.addEventListener("resize",Of);var Ma=0,Ci=new ft;function AT(){let{width:i,height:e}=nn();return Ci.aspect=i/e,Ci.fov=he.camera.fov,Ci.near=Mt.near,Ci.far=Mt.far,Ci.position.set(he.camera.x,he.camera.y,he.camera.z),Ci.up.set(0,1,0),Ci.lookAt(0,fo,0),Ci.updateProjectionMatrix(),Ci.updateMatrixWorld(!0),Ci}function RT(i,e){let{xScale:t,yScale:n}=co.scales;if(!t||!n)return new L(0,0,0);let r=t(i),o=n(e),s=nn(),a=r/s.width*2-1,c=-(o/s.height)*2+1,l=AT(),d=new L(a,c,.5).unproject(l).sub(l.position).normalize(),h=-l.position.z/d.z;return l.position.clone().add(d.multiplyScalar(h))}function uv(){if(!ht.length||!co.scales.xScale||!co.scales.yScale)return;let i=new Map,e=new Map;ht.forEach((t,n)=>{let r=t?.participant||"Participante an\xF3nimo",o=cf[n];i.has(r)||i.set(r,[]),e.has(o)||e.set(o,[]),i.get(r).push(n),e.get(o).push(n)}),i.forEach(t=>{t.forEach((n,r)=>{ry[n]=r,oy[n]=t.length})}),e.forEach(t=>{t.forEach((n,r)=>{sy[n]=r,ay[n]=t.length})}),ht.forEach((t,n)=>{let r=n*3,o=/^\d{4}-\d{2}-\d{2}$/.test(String(t?.date||""))?new Date(`${t.date}T00:00:00Z`):new Date(`${Number(t?.year)||2e3}-01-01T00:00:00Z`),s=Ml(t),a=RT(o,s);Ms[r]=a.x,Ms[r+1]=a.y,Ms[r+2]=.06+(Et(n,12)-.5)*.06;let c=t?.label==="hawkish"?.22:t?.label==="dovish"?-.22:0,l=Math.max(oy[n],1),u=ry[n];bs[r]=(u-(l-1)/2)*.18,bs[r+1]=.66+c+(Et(n,13)-.5)*.12,bs[r+2]=-1.35+(Et(n,14)-.5)*.28;let d=Math.max(ay[n],1),h=sy[n];Ts[r]=(h-(d-1)/2)*.22,Ts[r+1]=.6+c*.8+(Et(n,15)-.5)*.15,Ts[r+2]=-1.05+(Et(n,16)-.5)*.22;let f=String(t?.date||"").match(/^(\d{4})/),x=(ne.clamp(Number(f?f[1]:t?.year)||2e3,2e3,2015)-2e3)/15;Ss[r]=-2.65+x*5.3+(Et(n,17)-.5)*.11,Ss[r+1]=.66+s*1.05+(Et(n,18)-.5)*.12,Ss[r+2]=-.32+(Et(n,19)-.5)*.18}),pf=!0}var CT=null,dv=()=>CT||=Promise.resolve().then(()=>(G_(),k_));ds(async()=>{let[{initD3Axes:i}]=await Promise.all([dv(),Ql()]);i({quotes:ht,openQuote:zr})});uv();var My;function hv(){clearTimeout(My),My=setTimeout(async()=>{if(uv(),!F_().finished){mf();return}try{let[{initD3Axes:i},{initWordEvolution:e}]=await Promise.all([dv(),mv(),Ql()]);i({quotes:ht,openQuote:zr}),e(ht),Ri.index>=0&&Bf(Ri.index),mf()}catch(i){console.warn("Reconstrucci\xF3n de las secciones de datos incompleta:",i)}},150)}window.addEventListener("resize",hv);window.visualViewport&&window.visualViewport.addEventListener("resize",hv);function LT(){let i=document.getElementById("hookContent");if(!i)return;let e=gsap.utils.toArray(i.querySelectorAll(".signal-card")),t=i.querySelector(".hook-divider > span"),n=i.querySelector(".hook-footnote");gsap.timeline({scrollTrigger:{trigger:"#stageHook",start:"top 45%",end:"bottom bottom",scrub:1}}).fromTo("#stageHook h2[data-hook]",{opacity:0,y:16,filter:"blur(8px)"},{opacity:1,y:0,filter:"blur(0px)",duration:.1,ease:"none"},.08).fromTo(".hook-lead",{opacity:0,y:18,filter:"blur(8px)"},{opacity:1,y:0,filter:"blur(0px)",duration:.14,ease:"none"},.14).fromTo(".hook-caption",{opacity:0,y:12},{opacity:1,y:0,duration:.12,ease:"none"},.26).fromTo(t,{scaleX:0},{scaleX:1,duration:.14,ease:"none"},.38).fromTo(e,{opacity:0,y:28},{opacity:1,y:0,duration:.16,ease:"none",stagger:.08},.46).fromTo(n,{opacity:0,y:14},{opacity:1,y:0,duration:.14,ease:"none"},.7).to(["#stageHook h2[data-hook]",i],{opacity:0,y:-18,duration:.12,ease:"none"},.86)}LT();function PT(){let i=(e,t)=>{document.querySelector(e)&&ScrollTrigger.create({trigger:e,start:"top 82%",end:"bottom 18%",scrub:!0,onUpdate:n=>{let r=n.progress,o=ne.smoothstep(r/.18,0,1),s=ne.smoothstep((r-.82)/.18,0,1);As(t,Math.min(o,1-s))},onLeave:()=>As(t,0),onLeaveBack:()=>As(t,0)})};i("#stageVoices","voices"),i("#stageActs","acts"),i("#stageTimeline","timeline"),i("#stageQuotes","quotes")}var IT=document.getElementById("tsProgress"),DT=document.getElementById("tsBar"),UT=document.getElementById("tsMarker"),NT=document.getElementById("tsSection"),kh=[{label:"hero",start:0},{label:"door",start:.04},...qt==="doorway"?[{label:"sala",start:.13}]:[],{label:"hook",start:.29},{label:"axes",start:.38},{label:"voices",start:.52},{label:"acts",start:.61},{label:"counters",start:.69},{label:"pipeline",start:.75},{label:"timeline",start:.83},{label:"quotes",start:.91},{label:"closing",start:.98}],by=document.getElementById("progressBar"),Gh=document.getElementById("sectionIndicator"),Ty,ba=-1;function fv(){ba=-1}window.addEventListener("resize",fv);ScrollTrigger.addEventListener("refresh",fv);var Sy=-1;function pv(){let i=window.scrollY||document.documentElement.scrollTop;ba<0&&(ba=document.documentElement.scrollHeight-nn().height);let e=ba>0?i/ba:0;rv=e;let t=Math.round(e*100);if(t!==Sy&&(Sy=t,by.style.transform="scaleX("+t/100+")",by.setAttribute("aria-valuenow",String(t))),!yo)return;IT.textContent=t+"%",DT.style.height=t+"%",UT.style.top=t+"%";let n="hero";for(let r=kh.length-1;r>=0;r--)if(e>=kh[r].start){n=kh[r].label;break}NT.textContent=n,Gh.textContent=n,Gh.style.opacity="0.6",clearTimeout(Ty),Ty=setTimeout(()=>{Gh.style.opacity="0"},1500)}window.addEventListener("scroll",pv,{passive:!0});pv();PT();var BT=null,mv=()=>BT||=Promise.resolve().then(()=>(W_(),V_));ds(async()=>{let[{initWordEvolution:i}]=await Promise.all([mv(),Ql()]);i(ht)});ds(async()=>{let{initActBrowser:i}=await Promise.resolve().then(()=>(q_(),X_));i({quotes:ht,openQuote:zr})});yo&&(window.__diag={get state(){return{stage:Rs,scatter:Number(hn.toFixed(3)),coinVisible:Cn.visible,coinChildren:Cn.children.length,coinFade:Number(Fr.toFixed(3)),crossT:Number(wt.toFixed(3)),exitT:Number(ur.toFixed(3)),y:Math.round(window.scrollY)}}},window.__objs={doorGroup:it,doorFloor:dr,swarm:Hn,orbitGroup:Qn,figureGroup:Xt?Xt.group:null,scene:ut,camera:Mt});var cu=new Lenis({duration:Jn?0:1.2,easing:i=>Math.min(1,1.001-Math.pow(2,-10*i)),smoothWheel:!Jn});cu.on("scroll",ScrollTrigger.update);gsap.ticker.add(i=>{cu.raf(i*1e3)});gsap.ticker.lagSmoothing(0);(yo||Da)&&(window.lenis=cu);document.querySelector(".closing-cta")?.addEventListener("click",i=>{i.preventDefault(),cu.scrollTo(0,{duration:1.8,easing:e=>1-Math.pow(1-e,3)})});var Hf=gsap.timeline({scrollTrigger:{trigger:".hero",start:"top top",end:"55% top",scrub:!0}});Hf.to(".hero-title",{opacity:0,y:-60,ease:"cinematicSilk"},0);Hf.to(".scroll-hint",{opacity:0,ease:"cinematicSilk"},0);Hf.to("#haloWrap",{opacity:0,ease:"cinematicSilk"},0);ScrollTrigger.create({trigger:".hero",start:"top top",end:"bottom top",scrub:!0,onUpdate:i=>{hn=i.progress,!!0&&i.progress<.25&&(Yt=0,_n=0,it&&(it.visible=!1))},onLeaveBack:()=>{if(!0){Yt=1;return}Yt=0,_n=0,it&&(it.visible=!1)}});qt==="doorway"&&ScrollTrigger.create({trigger:"#stageObjective",start:"top 70%",end:"top 15%",scrub:!0,onUpdate:i=>{if(!0){Yt=1;return}Yt=ne.clamp(i.progress,0,1)}});ScrollTrigger.create({trigger:"#stageObjective",start:"top top",end:"bottom top",scrub:!0,onUpdate:i=>{let e=i.progress;if(qt==="doorway"){Yt=1;return}e<=0?Yt=0:e<.15?Yt=e/.15:e<=.35?Yt=1:e<.55?Yt=Math.max(0,1-(e-.35)/.2):Yt=0},onLeave:()=>{qt!=="doorway"&&(Yt=0)},onLeaveBack:()=>{qt!=="doorway"&&(Yt=0)}});if(qt==="doorway"){ScrollTrigger.create({trigger:"#stageRoom",start:"top 85%",end:"+=250%",scrub:!0,onUpdate:r=>{wt=r.progress}}),ScrollTrigger.create({trigger:"#stageHook",start:"top 80%",end:"top 30%",scrub:!0,onUpdate:r=>{ur=r.progress},onLeave:()=>{ur=1},onLeaveBack:()=>{ur=0}}),ScrollTrigger.create({trigger:"#stageHook",start:"top 85%",end:"top 20%",scrub:!0,onUpdate:r=>{Yt=1-ne.clamp(r.progress,0,1)},onLeave:()=>{Yt=0},onEnterBack:()=>{Yt=1}}),ScrollTrigger.create({trigger:"#stageRoom",start:"top 100%",end:"bottom 0%",onLeave:()=>{yl(),Ps()},onLeaveBack:()=>{yl(),Ps()}});let i=document.getElementById("roomTitle"),e=document.getElementById("roomLead"),t=document.getElementById("roomSub");if(window.matchMedia&&window.matchMedia("(pointer: coarse)").matches){let r=document.querySelector(".axes-reading-trace");r&&(r.textContent="toca un punto \u2192 fecha \xB7 voz \xB7 fragmento")}let n=document.getElementById("stageRoomContainer");if(i&&e&&t){let r={v:0},o=()=>{n&&n.style.setProperty("--room-scrim",r.v.toFixed(3))},s=1/285;gsap.timeline({scrollTrigger:{trigger:"#stageRoom",start:"top top",end:"bottom bottom",scrub:!0}}).fromTo(r,{v:0},{v:1,duration:16*s,ease:"none",onUpdate:o},72*s).fromTo(i,{opacity:0,y:18},{opacity:1,y:0,duration:14*s,ease:"none"},78*s).fromTo(e,{opacity:0,y:18},{opacity:1,y:0,duration:14*s,ease:"none"},90*s).fromTo(t,{opacity:0,y:14},{opacity:1,y:0,duration:14*s,ease:"none"},104*s).to(i,{opacity:0,y:-14,duration:10*s,ease:"none"},255*s).to(e,{opacity:0,y:-14,duration:10*s,ease:"none"},259*s).to(t,{opacity:0,y:-12,duration:10*s,ease:"none"},263*s).to(r,{v:.5,duration:10*s,ease:"none",onUpdate:o},263*s).to(r,{v:0,duration:6*s,ease:"none",onUpdate:o},279*s)}}var Vh=document.querySelector(".voices-intro"),wy=document.getElementById("voiceExplorer");Vh&&wy&&gsap.timeline({scrollTrigger:{trigger:"#stageVoices",start:"top 85%",end:"bottom bottom",scrub:!0}}).fromTo(Vh,{opacity:0,y:18},{opacity:1,y:0,duration:.12,ease:"none"},.04).fromTo(wy,{opacity:0,y:24},{opacity:1,y:0,duration:.14,ease:"none"},.16).to(Vh,{opacity:0,y:-14,duration:.08,ease:"none"},.9);var FT=gsap.timeline({scrollTrigger:{trigger:"#stageObjective",start:"top top",end:"bottom bottom",scrub:!0}});FT.fromTo("[data-objective]",{opacity:0,y:30},{opacity:1,y:0,duration:.22,ease:"cinematicOut",stagger:.05},.06).to("[data-objective]",{opacity:0,y:-25,duration:.2,ease:"cinematicIn"},.8);var OT=document.querySelectorAll("#stageHook h2[data-hook]");OT.forEach((i,e)=>{let t=new SplitText(i,{type:"chars,words",charsClass:"char-reveal",wordsClass:"word-reveal"});gsap.fromTo(t.chars,{opacity:0,y:20,rotationX:-40},{opacity:1,y:0,rotationX:0,duration:.6,stagger:.02,ease:"cinematicOut",scrollTrigger:{trigger:i,start:"top 70%",end:"top 40%",toggleActions:"play none none reverse"}})});var HT=document.querySelectorAll("[data-counter]");HT.forEach(i=>{let e=i.querySelector(".counter-number"),t=e.dataset.target,n=t.startsWith("[TODO");gsap.fromTo(i,{opacity:0,y:24},{opacity:1,y:0,duration:.6,ease:"cinematicOut",scrollTrigger:{trigger:i,start:"top 85%",toggleActions:"play none none reverse",onEnter:()=>{if(n)return;let r=parseInt(t,10),o={val:0};gsap.to(o,{val:r,duration:1.5,ease:"cinematicSilk",onUpdate:()=>{e.textContent=Math.round(o.val)}})}}})});(function(){let e=document.getElementById("pipeTrack"),t=e?.closest(".pipe-viewport");if(!e||!t)return;let n=document.getElementById("seedGrid"),r=[],o=ht.filter(U=>["hawkish","dovish","neutral"].includes(U.label));o.forEach((U,O)=>{let B=document.createElement("i");B.className=`seed-dot ${U.label}`,B.dataset.th=(.04+O/Math.max(o.length,1)*.76).toFixed(3),B.title=`${U.label} \xB7 ${U.participant||"Participante an\xF3nimo"} \xB7 ${U.date||U.year||"fecha no especificada"}`,n.appendChild(B),r.push(B)});let s=o.length,a=document.getElementById("corpusGrid"),c=document.getElementById("corpusHead"),l=document.getElementById("corpusYear"),u=document.getElementById("corpusPct"),d=document.getElementById("corpusCoverageNote"),h=Array.from({length:16},(U,O)=>2e3+O),f=U=>{let O=String(U.date||"").match(/^(\d{4})/);return Number(O?O[1]:U.year)},g=ht.filter(U=>h.includes(f(U))),x=new Map(h.map(U=>[U,[]]));g.forEach(U=>x.get(f(U)).push(U));let m=h.filter(U=>x.get(U).length===0),p=ht.length-g.length,v=[],_=-1,T=U=>{let O=[];return U.forEach(B=>{let le=O[O.length-1];le&&B===le[1]+1?le[1]=B:O.push([B,B])}),O.map(([B,le])=>B===le?String(B):`${B}\u2013${le}`).join(", ")};function A(){if(a.innerHTML="",a.style.setProperty("--cols",h.length),v=[],h.forEach(U=>{let O=document.createElement("span");if(O.className="corpus-col",O.dataset.year=String(U),x.get(U).forEach(B=>{let le=document.createElement("i"),xe=["hawkish","dovish","neutral"].includes(B.label)?B.label:"neutral";le.className=`corpus-dot ${xe==="hawkish"?"h":xe==="dovish"?"d":"n"}`,O.appendChild(le)}),!x.get(U).length){let B=document.createElement("i");B.className="corpus-empty",B.setAttribute("aria-hidden","true"),O.appendChild(B)}a.appendChild(O),v.push(O)}),_=-1,d){let U=[];m.length&&U.push(`sin muestra: ${T(m)}`),p&&U.push(`${p} fuera de 2000\u20132015`),d.textContent=U.length?` \xB7 ${U.join(" \xB7 ")}`:""}}A();let E=document.getElementById("wordCount"),w=document.querySelectorAll("#stagePipeline .doc-line > span"),P=document.querySelector("#stagePipeline .frag"),y=document.getElementById("verdictStamp"),M=document.getElementById("confBar"),D=document.getElementById("confVal"),V=document.getElementById("seedCount"),ie=document.querySelectorAll("#pipeRail .rail-node"),I=document.querySelectorAll("#pipeRail .rail-seg i"),k=gsap.utils.clamp(0,1),G=(U,O,B)=>{let le=B-O;return le<=1e-6?U>=B?1:0:k((U-O)/le)},te=U=>1-Math.pow(1-U,3),N=U=>Math.round(U).toLocaleString("es-CL"),X=ht.reduce((U,O)=>U+String(O.text||"").trim().split(/\s+/).filter(Boolean).length,0),q=ht.find(U=>U.label==="hawkish")||ht[0],Q=["hawkish","dovish","neutral"].includes(q?.label)?q.label:"neutral",fe=Number.isFinite(Number(q?.score))?Number(q.score):0,H={hawkish:"Hawkish",dovish:"Dovish",neutral:"Neutral"},Z=String(q?.text||"Sin texto disponible").replace(/\s+/g," ").trim();P&&(P.textContent=`\xAB${Z.length>150?`${Z.slice(0,150)}\u2026`:Z}\xBB`),y&&(y.textContent=H[Q]);let me=e.querySelectorAll(".pipe-panel"),j=()=>{let U=e.scrollWidth-t.clientWidth,O=t.clientWidth,B=O*.78,le=O*.5;if(!(U>0)||!(O>0)||!me.length){let R=1/(me.length||1);return Array.from(me).map((b,z)=>({start:z*R,end:Math.min(1,(z+1)*R)}))}return Array.from(me).map(xe=>{let R=xe.offsetLeft+xe.offsetWidth/2,b=(R-B)/U,z=(R-le)/U;return{start:k(b),end:k(z)}})},W=j(),ee=document.getElementById("debugPanel"),ce=document.getElementById("debugSection"),pe=document.getElementById("debugProgress"),$=document.getElementById("debugPanelInfo"),S=document.getElementById("debugBar");function J(U){let O=G(U,W[0].start,W[0].end);w.forEach((_e,ye)=>{let De=te(G(O,.04+ye*.08,.3+ye*.08));_e.style.transform=`translateY(${(1-De)*110}%)`}),E.textContent=N(X*te(G(O,.2,.9)));let B=G(U,W[1].start,W[1].end);r.forEach(_e=>_e.classList.toggle("lit",B>+_e.dataset.th)),V.textContent=N(s*te(G(B,.12,.92)));let le=G(U,W[2].start,W[2].end);P.style.opacity=te(G(le,.08,.4));let xe=te(G(le,.5,.75));y.style.opacity=xe,y.style.transform=`scale(${1.9-.9*xe}) rotate(${-9+6*xe}deg)`;let R=te(G(le,.55,.95));M.style.width=R*fe*100+"%",D.textContent=(R*fe).toFixed(2);let b=G(U,W[3].start,W[3].end),z=G(b,.1,.95),se=Math.floor(z*(h.length+1));se!==_&&(v.forEach((_e,ye)=>_e.classList.toggle("lit",ye<se)),_=se),c.style.left=z*100+"%",c.style.opacity=b>.02&&z<.999?1:0;let ue=Math.min(h.length-1,Math.round(z*(h.length-1)));l.textContent=h[ue];let de=h.slice(0,se).reduce((_e,ye)=>_e+x.get(ye).length,0);u.textContent=Math.min(100,Math.round(de/Math.max(g.length,1)*100))+"%";let ve=0;for(let _e=W.length-1;_e>=0;_e--)if(U>=W[_e].start){ve=_e;break}if(ie.forEach((_e,ye)=>_e.classList.toggle("active",ye<=ve)),I.forEach((_e,ye)=>{ye<ve?_e.style.transform="scaleX(1)":ye===ve?_e.style.transform=`scaleX(${G(U,W[ye].start,W[ye].end)})`:_e.style.transform="scaleX(0)"}),yo&&ee){ee.classList.add("visible"),ce.textContent="Pipeline",pe.textContent=Math.round(U*100)+"%";let _e=["01 \xB7 Fuente","02 \xB7 Muestra / criterio","03 \xB7 Clasificaci\xF3n guiada","04 \xB7 Revisi\xF3n / trazabilidad"];$.textContent=_e[ve]||"\u2014",S.style.transform="scaleX("+U+")"}}gsap.to(e,{x:()=>-(e.scrollWidth-t.clientWidth),ease:"none",scrollTrigger:{trigger:".pipeline-pin-wrapper",start:"top top",end:()=>"+="+(e.scrollWidth-t.clientWidth),pin:!0,scrub:1,invalidateOnRefresh:!0,anticipatePin:1,onRefresh:()=>{W=j()},onUpdate:U=>J(U.progress)}}),J(0),window.addEventListener("resize",()=>{ScrollTrigger.refresh()})})();ds(async()=>{let[{initTimeline:i}]=await Promise.all([Promise.resolve().then(()=>(K_(),j_)),Ql()]);i(ht)});gsap.timeline({scrollTrigger:{trigger:"#stageAxes",start:"top 60%",end:"bottom top",scrub:!0}}).fromTo("#d3-canvas",{opacity:0},{opacity:1,duration:.15,ease:"none"},0).to("#d3-canvas",{opacity:0,duration:.15,ease:"none",immediateRender:!1},.85);ScrollTrigger.create({trigger:"#stageAxes",start:"top 60%",end:"bottom top",scrub:!0,onUpdate:i=>{let e=i.progress,t=gsap.utils.clamp(0,1,e/.15),n=gsap.utils.clamp(0,1,(1-e)/.15);Ma=Math.min(t,n),As("axes",Ma)},onLeave:()=>{Ma=0,As("axes",0)},onLeaveBack:()=>{Ma=0,As("axes",0)}});var zT=document.querySelectorAll("[data-quote]");zT.forEach(i=>{gsap.fromTo(i,{opacity:0,y:24},{opacity:1,y:0,duration:.8,ease:"cinematicOut",scrollTrigger:{trigger:i,start:"top 80%",toggleActions:"play none none reverse"}}),i.addEventListener("click",()=>{let e=i.dataset.quoteParticipant,t=parseInt(i.dataset.quoteYear,10),n=ht.findIndex(r=>r.participant===e&&r.year===t);if(n<0&&(n=ht.findIndex(r=>r.participant===e)),n>=0){gi.card=i,mi(n);let r=i.getBoundingClientRect();zr(n,{x:r.left+r.width/2,y:r.top+r.height/2})}}),i.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),i.click())})});document.querySelectorAll("[data-closing]").forEach(i=>{let e=i.textContent.replace(/\s+/g," ").trim(),t=new SplitText(i,{type:"chars,words",charsClass:"char-reveal",wordsClass:"word-reveal",aria:"none"});t.words.forEach(r=>r.setAttribute("aria-hidden","true"));let n=document.createElement("span");n.className="sr-only",n.textContent=e,i.appendChild(n),gsap.fromTo(t.chars,{opacity:0,y:15,rotationX:-30},{opacity:1,y:0,rotationX:0,duration:.5,stagger:.015,ease:"cinematicOut",scrollTrigger:{trigger:i,start:"top 85%",toggleActions:"play none none reverse"}})});var kT=[{trigger:"#stageObjective",color:"#0c1020"},{trigger:"#stageRoom",color:"#0b0f1c"},{trigger:"#stageHook",color:"#0a0e1a"},{trigger:"#stageAxes",color:"#0d1225"},{trigger:"#stageVoices",color:"#0b101c"},{trigger:"#stageCounters",color:"#0a0e1a"},{trigger:"#stagePipeline",color:"#0c1020"},{trigger:"#stageTimeline",color:"#0a0e1a"},{trigger:"#stageQuotes",color:"#0d1225"},{trigger:"#stageClosing",color:"#0a0e1a"}];kT.forEach(({trigger:i,color:e})=>{ScrollTrigger.create({id:`bg${i}`,trigger:i,start:"top center",end:"bottom center",onToggle:t=>{t.isActive&&(gsap.to("html",{backgroundColor:e,duration:1.2,ease:"power2.inOut"}),gsap.to("body",{backgroundColor:e,duration:1.2,ease:"power2.inOut"}))}})});var Nr=document.getElementById("ambientGlow"),Ay=Nr||document.documentElement,GT=[{trigger:"#hero",alpha:.16},{trigger:"#stageObjective",alpha:.14},{trigger:"#stageRoom",alpha:.07},{trigger:"#stageHook",alpha:.025},{trigger:"#stageAxes",alpha:.015},{trigger:"#stageVoices",alpha:.035},{trigger:"#stageCounters",alpha:.025},{trigger:"#stagePipeline",alpha:.018},{trigger:"#stageTimeline",alpha:.035},{trigger:"#stageQuotes",alpha:.018},{trigger:"#stageClosing",alpha:.08}];function _f(i,e=!1){if(e){Nr?Nr.style.opacity=String(i):Ay.style.setProperty("--ambient-alpha",String(i));return}let t=()=>Nr&&Nr.classList.remove("is-fading");Nr&&Nr.classList.add("is-fading"),gsap.to(Ay,{...Nr?{opacity:i}:{"--ambient-alpha":i},duration:1.25,ease:"power2.inOut",overwrite:"auto",onComplete:t,onInterrupt:t})}_f(.16,!0);GT.forEach(({trigger:i,alpha:e})=>{ScrollTrigger.create({id:`ambient${i}`,trigger:i,start:"top center",end:"bottom center",onEnter:()=>_f(e),onEnterBack:()=>_f(e)})});document.querySelectorAll(".quote-card").forEach(i=>{i.addEventListener("mouseenter",()=>{gsap.to(i,{scale:1.02,duration:.3,ease:"power2.out",boxShadow:i.classList.contains("hawkish")?"0 0 60px rgba(255,215,106,0.15)":"0 0 60px rgba(138,180,248,0.15)"})}),i.addEventListener("mouseleave",()=>{gsap.to(i,{scale:1,duration:.3,ease:"power2.out",boxShadow:i.classList.contains("hawkish")?"0 0 40px rgba(255,215,106,0.05)":"0 0 40px rgba(138,180,248,0.05)"})})});var VT=()=>ScrollTrigger.refresh(),WT=()=>{Of(),mf(),VT()},Ry=0,XT=150;function lu(){clearTimeout(Ry),Ry=setTimeout(WT,XT)}document.fonts&&document.fonts.ready&&document.fonts.ready.then(lu);window.addEventListener("load",lu);Pa.onLoad=(()=>{let i=Pa.onLoad;return()=>{i(),lu()}})();B_(lu);
