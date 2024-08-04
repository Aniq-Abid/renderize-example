class AutoLoad{#a=[{}];#b;#c=null;#d;#e;#f;#g;#h;#i;#j;#k=null;#l=null;#m;#n=[];#o=null;#p;#q;#r;#s;#t=null;#u=null;#v;#w;#x;#y;#z=!0;#A="main";#B;#C;#D=0;#E=0;#F;#G=1;#H;#I;#J;#K=!0;#L=!0;#M=!0;#N;#O;#P;#Q;#R;#S;#T=!0;#U;#V;#W=[];constructor(t,e){this.#d=e,this.#d.style.overflow="hidden",Array.isArray(t)?"[object Object]"!==Object.prototype.toString.call(t[0])?this.#W.push("Invalid Data | Data is Not An Array Object | Data must be Array Object"):(this.#a=t,this.dataLength=this.#a.length):this.#W.push("Invalid Data | Data is Not An Array | Data must be Array Object")}config(t={}){this.#b=this.#a,this.#H=t.perLoad||20,this.#N=t.lazyloadImageColor||"#eee",this.#U=t.autoloadWhen||10,this.#h=t.gridGap||"10px",this.#j=t.gridItemMinWidth||"200px",this.#i=t.gridItemWidth||"fit",t.gridItemMinWidth&&t.gridItemMinWidth.endsWith("%")&&this.errors.push("In gridItemMinWidth % percentage is not allowed"),t.gridItemWidth&&t.gridItemWidth.endsWith("%")&&this.errors.push("In gridItemWidth % percentage is not allowed"),this.#q=t.listGap||"10px",this.#s=t.listItemMinWidth||"500px",this.#r=t.listItemWidth||"fit",t.listItemMinWidth&&t.listItemMinWidth.endsWith("%")&&this.errors.push("In listItemMinWidth % percentage is not allowed"),t.listItemWidth&&t.listItemWidth.endsWith("%")&&this.errors.push("In listItemWidth % percentage is not allowed"),this.searchIn=t.searchIn||"all",this.searchCaseSensitive=t.searchCaseSensitive||!1,this.#y=document.createElement("div"),this.#y.id="ViewSearchContainer",this.#d.append(this.#y),this.#v=t.listContainerClass||"data-view-list",this.#w=t.gridContainerClass||"data-view-grid",this.#x=t.tableClass||"data-view-table";let e={LEFT:"justify-content: flex-start;",RIGHT:"justify-content: flex-end;",CENTER:"justify-content: center;",BETWEEN:"justify-content: space-between;",AROUND:"justify-content: space-around;",EVENLY:"justify-content: space-evenly;"};this.#O=e[t.position]||e.LEFT,this.#I=this.#X(),this.columns=Object.keys(this.#a[0]),this.selected=[],this.inSelection=!1,this.#F={grid:1,list:1,table:1},this.#B={grid:0,list:0,table:0},this.#C={grid:0,list:0,table:0},this.#c=new Templator({lazyloadImageColor:this.#N}),this.#R=new IntersectionObserver(t=>{let e=t.length;for(let i=0;i<e;i++)if(t[i].isIntersecting){let s=t[i].target;s.src=s.dataset.viewLoadimg,s.style.visibility="visible",this.#R.unobserve(s)}},{rootMargin:"120px"}),this.#T&&(this.#S=new IntersectionObserver(t=>{let e=t[0];e.isIntersecting&&("main"==this.#A?this.#F[this.#f]<this.#I?(this.beforeAutoload&&this.beforeAutoload(),this.#Y(!1),this.#S.unobserve(e.target),this.autoloaded=!0,this.#F[this.#f]++):this.autoloaded=!1:"search"==this.#A&&(this.#G<this.#J?(this.beforeAutoload&&this.beforeAutoload(),this.#Y(!1),this.autoloaded=!0,this.#G++):this.autoloaded=!1))},{rootMargin:t.autoloadMargin||"0px"})),setTimeout(()=>{this.#y.style.display="grid",this.#y.style.position="relative",this.apiSearching=t.apiSearching||!1,this.searchApi=t.searchApi||"",this.searchApiOptions=t.searchApiOptions||{},!this.apiSearching||(""==this.searchApi?this.#W.push("Search API Url not provided for fetching data."):"string"!=typeof this.searchApi?this.#W.push("Invalid Search API Url"):this.searchApi.startsWith("http")||this.searchApi.startsWith("https")||this.#W.push("Invalid Search API Url .Protocol not Provided")),this.#P=t.autoFetch||!1,this.#Q=t.autoFetchWhen||40,this.dataApiUrl=t.dataApiUrl||"",this.dataApiOptions=t.dataApiOptions||{},!this.#P||(""==this.dataApiUrl?this.#W.push("Data API Url not provided for fetching data."):"string"!=typeof this.dataApiUrl?this.#W.push("Invalid Data API Url"):this.dataApiUrl.startsWith("http")||this.dataApiUrl.startsWith("https")||this.#W.push("Invalid Data API Url .Protocol not Provided")),this.#V=t.autoCleanupWhen||100,window.addEventListener("resize",()=>{this.#e==this.#g?this.#Z():this.#e==this.#p&&this.#$()})},500)}get errors(){return this.#W}get register(){let t=this;return{templator(e){t.#c.register(e)}}}get viewContainer(){return this.#e}set listItemTemplate(t){if(this.#W.length>0)return;if(!(t=t.trim()).startsWith("<"))return this.#W.push("Invalid List Item Template"),"";let e=t.indexOf("<"),i=t.indexOf(" ",e),s=-1!==i?i:t.indexOf(">",e),r=t.slice(e+1,s).toLowerCase();if(r=-1!=r.lastIndexOf(">")?r.slice(0,-2):r,!t.endsWith(`</${r}>`))return this.#W.push("Invalid List Item Template"),"";this.#u=r,this.#t=this.#c.oneTimeParse(t),this.#p=document.createElement("div"),this.#p.id="ViewListContainer",this.#p.className=this.#v,this.#p.style.display="none",this.#p.style.gap=this.#q,this.#p.style.position="relative",this.#d.append(this.#p),this.#$()}set gridItemTemplate(t){if(this.#W.length>0)return;if(!(t=t.trim()).startsWith("<")||t.startsWith("< "))return this.#W.push("Invalid Grid Item Template"),"";let e=t.indexOf("<"),i=t.indexOf(" ",e),s=-1!==i?i:t.indexOf(">",e),r=t.slice(e+1,s).toLowerCase();if(r=-1!=r.lastIndexOf(">")?r.slice(0,-2):r,!t.endsWith(`</${r}>`))return this.#W.push("Invalid Grid Item Template"),"";this.#l=r,this.#k=this.#c.oneTimeParse(t),this.#g=document.createElement("div"),this.#g.id="ViewGridContainer",this.#g.className=this.#w,this.#g.style.display="none",this.#g.style.gap=this.#h,this.#g.style.position="relative",this.#d.append(this.#g),this.#Z()}set tableRowHtml(t){if(!(this.#W.length>0)){if(!(t=t.trim()).startsWith("<"))return this.#W.push("Invalid Table Row Template"),"";this.#o=this.#c.oneTimeParse(t),this.#m=document.createElement("table"),this.#m.id="ViewTableContainer",this.#m.style.position="relative",this.#m.className=this.#x,this.#m.createTBody(),this.#m.style.display="none",this.#d.append(this.#m)}}set tableColumns(t){if(null==this.#o)return this.#W.push("Please Set Table Row Template First."),null;this.#n=t;let e=this.#m.createTHead(),i="<tr>";for(let s=0;s<this.#n.length;s++)i+=`<th>${this.#n[s]}</th>`;i+="</tr>",e.innerHTML=i}set view(t){if(this.#f==t)return"This view is already set.";if(this.inSelection)return"You are in Selection Mode";let e=this.#f;if(this.#f=t,"search"==this.#A){"table"==this.#f?(this.#y.style.display="none",this.#e=this.#m,this.#e.style.display="table"):(this.#m&&(this.#m.style.display="none"),this.#_(this.#f),this.#e=this.#y,this.#e.style.display="grid"),this.#D=0,this.#E=0,this.#G=1,this.#Y();return}switch(t){case"grid":if(null==this.#k)return this.#W.push("Please Set Grid Item Template First."),null;this.#p&&(this.#p.style.display="none"),this.#m&&(this.#m.style.display="none"),this.#g.style.display="grid",this.#e=this.#g,this.#K&&(this.#C[this.#f]=this.#B[this.#f],this.#Y()),this.#z=!0;break;case"list":if(null==this.#t)return this.#W.push("Please Set List Item Template First."),null;this.#g&&(this.#g.style.display="none"),this.#m&&(this.#m.style.display="none"),this.#p.style.display="grid",this.#e=this.#p,this.#L&&(this.#C[this.#f]=this.#B[this.#f],this.#Y()),this.#z=!0;break;case"table":if(null==this.#o)return this.#W.push("Please Set Table Row Template First."),null;this.#g&&(this.#g.style.display="none"),this.#p&&(this.#p.style.display="none"),this.#m.style.display="table",this.#e=this.#m,this.#M&&(this.#C[this.#f]=this.#B[this.#f],this.#Y())}this.#C[e]>=this.#V&&this.cleanUp(e)}cleanUp(t){this.#B[t]=0,this.#C[t]=0,this.#F[t]=0,"grid"==t?(this.#g.innerHTML="",this.#K=!0):"list"==t?(this.#p.innerHTML="",this.#L=!0):"table"==t&&(this.#m.tBodies[0].innerHTML="",this.#M=!0)}async search(t){if(this.inSelection)return"You are in Selection Mode";if(""==t){let e;"grid"==this.#f?(this.#e=this.#g,this.#g.style.display="grid",e=this.#K):"list"==this.#f?(this.#e=this.#p,this.#p.style.display="grid",e=this.#L):"table"==this.#f&&(this.#e=this.#m,this.#m.style.display="table",e=this.#M),this.#y.style.display="none",this.#b=this.#a,this.#G=1,this.#A="main",e&&this.#Y(),this.#y.innerHTML="",this.searchQuery=null;return}if(this.#z&&(this.#z=!1,this.#_()),this.apiSearching){let i=this.searchApi.replace(/{(.*?)}/g,(e,i)=>{if("query"==i)return t;if("searchCaseSensitive"==i)return this.searchCaseSensitive;if("column"==i)return this.searchIn;if("last"==i||"last:index"==i)return this.dataLength-1;if("last:counter"==i)return this.dataLength;if(i.startsWith("last:"))return this.#a[this.dataLength-1][i.slice(5)]?.toString().replace(/ /g,"%20");if("perLoad"==i)return this.#H}),s=await fetch(i,this.searchApiOptions);try{s=await s.json(),this.afterSearching?this.#b=this.afterSearching(s):this.#b=s}catch(r){this.afterSearching&&(this.errors.push(r),this.afterSearching(r))}}else this.#b=this.#a.filter(e=>"all"==this.searchIn?this.searchCaseSensitive?JSON.stringify(e).includes(t):JSON.stringify(e).toLowerCase().includes(t.toLowerCase()):this.searchCaseSensitive?String(e[this.searchIn]).includes(t):String(e[this.searchIn]).toLowerCase().includes(t.toLowerCase()));this.#e!=this.#y&&("grid"==this.#f?this.#g.style.display="none":"list"==this.#f?this.#p.style.display="none":"table"==this.#f&&(this.#m.style.display="none"),"table"==this.#f?(this.#e=this.#m,this.#e.style.display="table"):(this.#e=this.#y,this.#e.style.display="grid")),this.#D=0,this.#E=0,this.#G=1,this.#A="search",this.#Y(),this.searchQuery=t,this.#J=this.#X()}render(t="grid"){switch(this.#f=t,t){case"grid":if(null==this.#k)return this.#W.push("Please Set Grid Item Template First."),null;this.#g.style.display="grid",this.#e=this.#g;break;case"list":if(null==this.#t)return this.#W.push("Please Set List Item Template First."),null;this.#p.style.display="grid",this.#e=this.#p;break;case"table":if(null==this.#o)return this.#W.push("Please Set Table Row Template First."),null;null==this.#m.tHead&&this.#W.push("Please Set Table Headings First With tableColumns Which Is Setter Method."),this.#m.style.display="table",this.#e=this.#m,this.#z=!1}this.#Y()}async #aa(){let t,e,i;if("main"==this.#A?(t=this.#C[this.#f],e=this.dataLength,i=this.dataApiUrl):(t=this.#E,e=this.#b.length,i=this.searchApi.replace(/{(.*?)}/g,(t,e)=>"query"==e?this.searchQuery:"searchCaseSensitive"==e?this.searchCaseSensitive:"column"==e?this.searchIn:void 0)),e-(t+1)<=this.#Q&&e>=this.#H){this.beforeAutofetch&&this.beforeAutofetch();let s=i.replace(/{(.*?)}/g,(t,e)=>{if("last"==e||"last:index"==e)return this.dataLength-1;if("last:counter"==e)return this.dataLength;if(e.startsWith("last:"))return this.#a[this.dataLength-1][e.slice(5)]?.toString().replace(/ /g,"%20");if("perLoad"==e)return this.#H}),r=await fetch(s,this.dataApiOptions);try{r=await r.json();let a;a=this.afterAutofetch?this.afterAutofetch(r):r,"main"==this.#A?(this.#a=this.#a.concat(a),this.#b=this.#a):this.#b=this.#b.concat(a),!this.autoloaded&&(this.#Y(!1),this.autoloaded=!0,"main"==this.#A?this.#F[this.#f]++:this.#G++),"main"==this.#A?(this.#I=this.#X(),this.dataLength+=a.length):this.#J=this.#X()}catch(n){this.afterAutofetch&&this.afterAutofetch(n),this.errors.push(n)}}}#Y(h=!0){if(this.errors.length>0)return;let l,o,d;if("main"==this.#A?(o=h?this.#B[this.#f]:++this.#C[this.#f],d=this.#C[this.#f]):"search"==this.#A&&(o=h?this.#D:++this.#E,d=this.#E),"grid"==this.#f){if(null==this.#k)return this.#W.push("Please Set Grid Item Template First."),null;l=this.#k}else if("list"==this.#f){if(null==this.#t)return this.#W.push("Please Set List Item Template First."),null;l=this.#t}else if("table"==this.#f){if(null==this.#o)return this.#W.push("Please Set Table Row Template First."),null;l=this.#o}let c=this.#H+d,p,g=document.createDocumentFragment(),u=document.createElement("tbody");for(p=o;p<c&&void 0!=this.#b[p];p++)u.insertAdjacentHTML("beforeend",this.#c.parseOnEveryRow(l,this.#b[p],p)),g.appendChild(u.firstChild);"search"==this.#A?this.#E=--p:this.#C[this.#f]=--p;let m=this.#e;"table"==this.#f&&(m=m.tBodies[0]),h&&(m.innerHTML=""),m.appendChild(g),this.afterAutoload&&this.afterAutoload(),setTimeout(()=>{"main"==this.#A?"grid"==this.#f?this.#K=!1:"list"==this.#f?this.#L=!1:"table"==this.#f&&(this.#M=!1):"table"==this.#f&&(this.#M=!0);let t=document.querySelectorAll(`#${this.#e.id} img[data-view-loadimg]`),e=t.length;for(let i=0;i<e;i++)this.#R.observe(t[i]);if("table"==this.#f){let s=Array.from(this.#e.rows);s.at(-this.#U)?this.#S.observe(s.at(-this.#U)):this.#S.observe(s.at(-1))}else{let r=Array.from(this.#e.children);r.at(-this.#U)?this.#S.observe(r.at(-this.#U)):r.at(-1)&&this.#S.observe(r.at(-1))}},70),this.#P&&setTimeout(()=>{this.#aa()},110),this.inSelection&&setTimeout(()=>{this.#ab(o,this.#C[this.#f])},80)}#ab(C,w){let f=this.selectionOptions;if(this.#e==this.#m){let v=this.#e.rows;if(0==C){var y=v[0].insertCell(0);y.innerHTML=`<input type="checkbox" class="${f.class}" selection="all">`}for(let b=C;b<=w&&void 0!=v[b+1];b++){var y=v[b+1].insertCell(0);y.innerHTML=`<input type="checkbox" class="${f.class}" selection="${b}">`}}else{let $=this.#e.children;if(void 0==$[C]){let I=this.#e.querySelectorAll("input[selection]"),R=I.length,S=I.length+this.#H;for(let T=R;T<=S&&void 0!=$[T];T++)$[T].insertAdjacentHTML("afterbegin",`<input type="checkbox" class="${f.class}" selection="${T}" style="position: absolute;top: ${f.top};right:${f.right};bottom:${f.bottom};left: ${f.left};z-index: 5;">`)}else for(let _=C;_<=w&&void 0!=$[_];_++)$[_].insertAdjacentHTML("afterbegin",`<input type="checkbox" class="${f.class}" selection="${_}" style="position: absolute;top: ${f.top};right:${f.right};bottom:${f.bottom};left: ${f.left};z-index: 5;">`)}}startSelection(t=!1,e={}){e.top=e?.top||"10px",e.right=e?.right||"auto",e.bottom=e?.bottom||"auto",e.left=e?.left||"10px",e.class=e?.class||"selection",this.selectionOptions=e,this.inSelection=!0,this.#e.rows?this.#ab(0,this.#e.rows.length-1):this.#ab(0,this.#e.children.length-1),this.#d.onclick=e=>{e.target.getAttribute("selection")||e.preventDefault();let i;if(i=this.#e==this.#g?e.target.closest(`#ViewGridContainer > ${this.#l}`):this.#e==this.#p?e.target.closest(`#ViewListContainer > ${this.#u}`):e.target.closest("tbody tr")){let s=i.querySelector("input[selection]");if(!s)return;e.target!=s&&(s.checked=!s.checked);let r=Number(s.getAttribute("selection"));s.checked?(this.selected.push({index:r,data:this.#b[r]}),s.setAttribute("checked",!0)):(s.removeAttribute("checked"),this.selected.splice(this.selected.findIndex(t=>t.index==r),1)),!1!=t&&t({index:r,element:i,checked:s.checked})}else{let a=this.#e.querySelector("input[selection=all]");if(a){let n=this.#e.querySelectorAll("input[selection]"),h=n.length-1;if(a.checked)for(let l=0;l<h;l++){let o=n[l+1];this.selected.push({index:l,data:this.#b[l]}),o.setAttribute("checked",!0),o.checked=!0}else for(let d=0;d<h;d++){let c=n[d+1];c.removeAttribute("checked"),c.checked=!1,this.selected.splice(this.selected.findIndex(t=>t.index==d),1)}!1!=t&&t({checked:a.checked})}}}}stopSelection(){this.selected=[],this.inSelection=!1;let t=this.#e.querySelectorAll("input[selection]"),e=t.length;if(this.#e.rows)for(let i=0;i<e;i++)t[i].parentElement.remove();else for(let s=0;s<e;s++)t[s].remove();this.#d.onclick=null}updateData(t){this.#a=t(this.#a)}#_(W=null){this.#e.id==this.#g.id||"grid"==W?(this.#y.style.gap=this.#h,this.#Z(this.#y)):this.#e.id==this.#p.id||"list"==W?(this.#y.style.gap=this.#q,this.#$(this.#y)):this.#y.style.gridTemplateColumns="repeat(1,1fr)"}#Z(A=this.#g){let L="";if("fit"==this.#i){L=`
                #${A.id} > ${this.#l}{
                    min-width:${this.#j};
                }
                `;let x=Math.floor(this.#d.offsetWidth/(parseInt(this.#j.match(/\d*/)[0])+parseInt(this.#h.match(/\d*/)[0])));A.style.gridTemplateColumns=`repeat(${x},1fr)`}else{L=`
                #${A.id}{
                    ${this.#O}
                }
                #${A.id} > ${this.#l}{
                    min-width:${this.#j};
                    width:100%;
                    max-width:${this.#i};
                }
                `;let P=Math.floor(this.#d.offsetWidth/parseInt(this.#i.match(/\d*/)[0]));A.style.gridTemplateColumns=`repeat(${P},${this.#i})`}if(null==document.getElementById("DataViewStyle")){let M=document.createElement("style");M.id="DataViewStyle",M.textContent+=L,this.#d.append(M)}else document.getElementById("DataViewStyle").textContent+=L}#$(O=this.#p){let D="";if("fit"==this.#r){D=`
                #${O.id} > ${this.#u}{
                    min-width:${this.#s};
                }
                `;let H=Math.floor(this.#d.offsetWidth/(parseInt(this.#s.match(/\d*/)[0])+parseInt(this.#q.match(/\d*/)[0])));O.style.gridTemplateColumns=`repeat(${H},1fr)`}else{D=`
                #${O.id}{
                    ${this.#O}
                }
                #${O.id} > ${this.#u}{
                    min-width:${this.#s};
                    width:100%;
                    max-width:${this.#r};
                }
                `;let k=Math.floor(this.#d.offsetWidth/parseInt(this.#r.match(/\d*/)[0]));O.style.gridTemplateColumns=`repeat(${k},${this.#r})`}if(null==document.getElementById("DataViewStyle")){let E=document.createElement("style");E.id="DataViewStyle",E.textContent+=D,this.#d.append(E)}else document.getElementById("DataViewStyle").textContent+=D}#X(){return Math.ceil(this.#b.length/this.#H)}}class Templator{#ac;#N;#ad;#ae;#af;templator=null;constructor(t){this.#ac={formatNum:this.formatNum},this.#N=t.lazyloadImageColor,this.#ad=/{%(.[^{%]*?)%}/g,this.#ae=/\{%if\s+(.*?)\s+%}(.*?){%else%}(.*?){%endif%}/gs,this.#af={upper:t=>t.toUpperCase(),lower:t=>t.toLowerCase(),firstCap:t=>t[0].toUpperCase()+t.slice(1).toLowerCase(),length:(t,e)=>t.slice(0,Number(e)),formatNum:t=>this.formatNum(t)}}register(t){this.templator=new t(this.#ac)}oneTimeParse(t){let e=t;null!=this.templator&&void 0!=this.templator.oneTimeParse&&(e=this.templator.oneTimeParse(e));let i=new Date;return(e=t.replace(/{{(.*?)}}/g,(t,e)=>{let[s,r]=e.split(":"),[,...a]=void 0!=r?r.split("|"):"",n=t;switch(s){case"date":switch(r){case"y":n=i.getFullYear();break;case"m":n=i.getMonth()+1;break;case"d":n=i.getDate();break;default:n=`${i.getDate()}-${i.getMonth()+1}-${i.getFullYear()}`}break;case"time":let h=new Date;switch(r){case"h":n=h.getHours();break;case"m":n=h.getMinutes();break;case"s":n=h.getSeconds();break;default:n=`${h.getHours()}:${h.getMinutes()}:${h.getSeconds()}`}}return n})).replace(/{{loadimage\|(.*?)>}}/g,(t,e)=>{let[i,s]=e.split("|"),r="";return s?.startsWith("<img")||(r=`width:${s};`,s=e.split("|")[2]),s?.match(/style=('|")(.*?)/)?s=`${s.slice(0,s.match(/style="?'?(.*?)/).index+7)}width:100%;height:100%;visibility:hidden;${s.slice(s.match(/style="?'?(.*?)/).index+7)}>`:s+=' style="width:100%;height:100%;visibility:hidden;">',`<div style="${r}height:${i};background:${this.#N};">${s=s.replace(/src=('|")(.*?)('|")/,(t,e,i)=>`data-view-loadimg="${i}"`)}</div>`})}parseOnEveryRow(t,e,i){let s=t;return null!=this.templator&&void 0!=this.templator.parseOnEveryRow&&(s=this.templator.parseOnEveryRow(s,e,i)),s=(s=s.replace(this.#ae,(t,i,s,r)=>{let[,a]=i.split(":");if(void 0==e[a])return;let n=a.match(/\[([^)]+)\]/),h=n?e[a.slice(0,n?.index)][n[1]]:e[a];return h?s:r?r.trim():""})).replace(this.#ad,(t,s)=>{let[r,a,n]=s.split(":"),[h,l]=void 0!=a?a.split("|"):"";switch(r){case"counter":return i+1;case"column":let o=h.match(/\[([^)]+)\]/),d;if(void 0==(d=o?(d=e[h.slice(0,o?.index)])?d[o[1]]:d:e[h]))return"";if(this.#af[l])return this.#af[l](d,n);return d}})}formatNum(t){let e=t.toString().split("");return 5==e.length&&"."!=e[2]?e.splice(2,0,","):"."!=e[3]&&e.length>3&&e.splice(3,0,","),-1!=e.indexOf(".")&&e.length>e.indexOf(".")+2&&(e.length=e.indexOf(".")+2),e.join("")}}export default AutoLoad;