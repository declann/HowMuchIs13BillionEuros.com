import{ViewPlugin as We,gutter as ie,Decoration as x,GutterMarker as se,EditorView as M,WidgetType as $}from"../view@6.33.0/index.836a6482.js";import{Facet as Ye,StateEffect as S,StateField as N,Prec as F,RangeSet as U,RangeSetBuilder as y,Compartment as ae,Text as le,EditorState as J,ChangeSet as fe,EditorSelection as Xe}from"../state@6.4.1/index.66d24d9c.js";import{StyleModule as Ze}from"../../style-mod@4.1.2/index.988d93ad.js";import{language as $e,highlightingFor as Je}from"../language@6.10.2/index.372ccf5f.js";import{highlightTree as Ke}from"../../@lezer/highlight@1.2.1/index.2f4ba012.js";class v{constructor(e,r,i,n){this.fromA=e,this.toA=r,this.fromB=i,this.toB=n}offset(e,r){return new v(this.fromA+e,this.toA+e,this.fromB+r,this.toB+r)}}function E(t,e,r,i,n,o){if(t==i)return[];let s=_(t,e,r,i,n,o),a=ee(t,e+s,r,i,n+s,o);e+=s,r-=a,n+=s,o-=a;let f=r-e,h=o-n;if(!f||!h)return[new v(e,r,n,o)];if(f>h){let c=t.slice(e,r).indexOf(i.slice(n,o));if(c>-1)return[new v(e,e+c,n,n),new v(e+c+h,r,o,o)]}else if(h>f){let c=i.slice(n,o).indexOf(t.slice(e,r));if(c>-1)return[new v(e,e,n,n+c),new v(r,r,n+c+f,o)]}if(f==1||h==1)return[new v(e,r,n,o)];let l=de(t,e,r,i,n,o);if(l){let[c,d,u]=l;return E(t,e,c,i,n,d).concat(E(t,c+u,r,i,d+u,o))}return Qe(t,e,r,i,n,o)}let V=1e9;function Qe(t,e,r,i,n,o){let s=r-e,a=o-n;if(V<1e9&&Math.min(s,a)>V*16)return Math.min(s,a)>V*64?[new v(e,r,n,o)]:ue(t,e,r,i,n,o);let f=Math.ceil((s+a)/2);K.reset(f),Q.reset(f);let h=(u,m)=>t.charCodeAt(e+u)==i.charCodeAt(n+m),l=(u,m)=>t.charCodeAt(r-u-1)==i.charCodeAt(o-m-1),c=(s-a)%2!=0?Q:null,d=c?null:K;for(let u=0;u<f;u++){if(u>V)return ue(t,e,r,i,n,o);let m=K.advance(u,s,a,f,c,!1,h)||Q.advance(u,s,a,f,d,!0,l);if(m)return _e(t,e,r,e+m[0],i,n,o,n+m[1])}return[new v(e,r,n,o)]}class ce{constructor(){this.vec=[]}reset(e){this.len=e<<1;for(let r=0;r<this.len;r++)this.vec[r]=-1;this.vec[e+1]=0,this.start=this.end=0}advance(e,r,i,n,o,s,a){for(let f=-e+this.start;f<=e-this.end;f+=2){let h=n+f,l=f==-e||f!=e&&this.vec[h-1]<this.vec[h+1]?this.vec[h+1]:this.vec[h-1]+1,c=l-f;for(;l<r&&c<i&&a(l,c);)l++,c++;if(this.vec[h]=l,l>r)this.end+=2;else if(c>i)this.start+=2;else if(o){let d=n+(r-i)-f;if(d>=0&&d<this.len&&o.vec[d]!=-1)if(s){let u=o.vec[d];if(u>=r-l)return[u,n+u-d]}else{let u=r-o.vec[d];if(l>=u)return[l,c]}}}return null}}const K=new ce,Q=new ce;function _e(t,e,r,i,n,o,s,a){let f=!1;return!T(t,i)&&++i==r&&(f=!0),!T(n,a)&&++a==s&&(f=!0),f?[new v(e,r,o,s)]:E(t,e,i,n,o,a).concat(E(t,i,r,n,a,s))}function he(t,e){let r=1,i=Math.min(t,e);for(;r<i;)r=r<<1;return r}function _(t,e,r,i,n,o){if(e==r||e==o||t.charCodeAt(e)!=i.charCodeAt(n))return 0;let s=he(r-e,o-n);for(let a=e,f=n;;){let h=a+s,l=f+s;if(h>r||l>o||t.slice(a,h)!=i.slice(f,l)){if(s==1)return a-e-(T(t,a)?0:1);s=s>>1}else{if(h==r||l==o)return h-e;a=h,f=l}}}function ee(t,e,r,i,n,o){if(e==r||n==o||t.charCodeAt(r-1)!=i.charCodeAt(o-1))return 0;let s=he(r-e,o-n);for(let a=r,f=o;;){let h=a-s,l=f-s;if(h<e||l<n||t.slice(h,a)!=i.slice(l,f)){if(s==1)return r-a-(T(t,a)?0:1);s=s>>1}else{if(h==e||l==n)return r-h;a=h,f=l}}}function te(t,e,r,i,n,o,s,a){let f=i.slice(n,o),h=null;for(;;){if(h||s<a)return h;for(let l=e+s;;){T(t,l)||l++;let c=l+s;if(T(t,c)||(c+=c==l+1?1:-1),c>=r)break;let d=t.slice(l,c),u=-1;for(;(u=f.indexOf(d,u+1))!=-1;){let m=_(t,c,r,i,n+u+d.length,o),g=ee(t,e,l,i,n,n+u),p=d.length+m+g;(!h||h[2]<p)&&(h=[l-g,n+u-g,p])}l=c}if(a<0)return h;s=s>>1}}function de(t,e,r,i,n,o){let s=r-e,a=o-n;if(s<a){let f=de(i,n,o,t,e,r);return f&&[f[1],f[0],f[2]]}return s<4||a*2<s?null:te(t,e,r,i,n,o,Math.floor(s/4),-1)}function ue(t,e,r,i,n,o){let s=r-e,a=o-n,f;if(s<a){let d=te(i,n,o,t,e,r,Math.floor(s/6),50);f=d&&[d[1],d[0],d[2]]}else f=te(t,e,r,i,n,o,Math.floor(a/6),50);if(!f)return[new v(e,r,n,o)];let[h,l,c]=f;return E(t,e,h,i,n,l).concat(E(t,h+c,r,i,l+c,o))}function me(t,e){for(let r=1;r<t.length;r++){let i=t[r-1],n=t[r];i.toA>n.fromA-e&&i.toB>n.fromB-e&&(t[r-1]=new v(i.fromA,n.toA,i.fromB,n.toB),t.splice(r--,1))}}function et(t,e,r){for(;;){me(r,1);let i=!1;for(let n=0;n<r.length;n++){let o=r[n],s,a;(s=_(t,o.fromA,o.toA,e,o.fromB,o.toB))&&(o=r[n]=new v(o.fromA+s,o.toA,o.fromB+s,o.toB)),(a=ee(t,o.fromA,o.toA,e,o.fromB,o.toB))&&(o=r[n]=new v(o.fromA,o.toA-a,o.fromB,o.toB-a));let f=o.toA-o.fromA,h=o.toB-o.fromB;if(f&&h)continue;let l=o.fromA-(n?r[n-1].toA:0),c=(n<r.length-1?r[n+1].fromA:t.length)-o.toA;if(!l||!c)continue;let d=f?t.slice(o.fromA,o.toA):e.slice(o.fromB,o.toB);l<=d.length&&t.slice(o.fromA-l,o.fromA)==d.slice(d.length-l)?(r[n]=new v(o.fromA-l,o.toA-l,o.fromB-l,o.toB-l),i=!0):c<=d.length&&t.slice(o.toA,o.toA+c)==d.slice(0,c)&&(r[n]=new v(o.fromA+c,o.toA+c,o.fromB+c,o.toB+c),i=!0)}if(!i)break}return r}function tt(t,e,r){for(let i=0,n=0;n<t.length;n++){let o=t[n],s=o.toA-o.fromA,a=o.toB-o.fromB;if(s&&a||s>3||a>3){let f=n==t.length-1?e.length:t[n+1].fromA,h=o.fromA-i,l=f-o.toA,c=be(e,o.fromA,Math.min(h,5)),d=ve(e,o.toA,Math.min(l,5)),u=o.fromA-c,m=d-o.toA;if(!s||!a){let g=Math.max(s,a),[p,k,A]=s?[e,o.fromA,o.toA]:[r,o.fromB,o.toB],b,B;u&&m?(g>u&&e.slice(c,o.fromA)==p.slice(A-u,A)?(o=t[n]=new v(c,c+s,o.fromB-u,o.toB-u),c=o.fromA,d=ve(e,o.toA,Math.min(f-o.toA,5))):g>m&&e.slice(o.toA,d)==p.slice(k,k+m)&&(o=t[n]=new v(d-s,d,o.fromB+m,o.toB+m),d=o.toA,c=be(e,o.fromA,Math.min(o.fromA-i,5))),u=o.fromA-c,m=d-o.toA):!u&&!m&&(B=o.fromA-(b=rt(e,o.fromA,h)))&&e.slice(b,o.fromA)==p.slice(A-B,A)&&(o=t[n]=new v(b,b+s,o.fromB-B,o.toB-B))}(u||m)&&(o=t[n]=new v(o.fromA-u,o.toA+m,o.fromB-u,o.toB+m)),i=o.toA}}return me(t,3),t}let L;try{L=new RegExp("[\\p{Alphabetic}\\p{Number}]","u")}catch{}function ge(t){return t>48&&t<58||t>64&&t<91||t>96&&t<123}function pe(t,e){if(e==t.length)return 0;let r=t.charCodeAt(e);return r<192?ge(r)?1:0:L?!Be(r)||e==t.length-1?L.test(String.fromCharCode(r))?1:0:L.test(t.slice(e,e+2))?2:0:0}function Ae(t,e){if(!e)return 0;let r=t.charCodeAt(e-1);return r<192?ge(r)?1:0:L?!Ce(r)||e==1?L.test(String.fromCharCode(r))?1:0:L.test(t.slice(e-2,e))?2:0:0}function ve(t,e,r){if(e==t.length||!Ae(t,e))return e;for(let i=e,n=e+r;;){let o=pe(t,i);if(!o)return i;if(i+=o,i>n)return e}}function be(t,e,r){if(!e||!pe(t,e))return e;for(let i=e,n=e-r;;){let o=Ae(t,i);if(!o)return i;if(i-=o,i<n)return e}}function rt(t,e,r){for(let i=e,n=e-r;;){let o=i?t.charCodeAt(i-1):10;if(o==10)return i;if(i--,i<n||o!=32&&o!=9)return e}}const Be=t=>t>=55296&&t<=56319,Ce=t=>t>=56320&&t<=57343;function T(t,e){return!e||e==t.length||!Be(t.charCodeAt(e-1))||!Ce(t.charCodeAt(e))}function we(t,e,r){var i;return V=((i=r?.scanLimit)!==null&&i!==void 0?i:1e9)>>1,et(t,e,E(t,0,t.length,e,0,e.length))}function re(t,e,r){return tt(we(t,e,r),t,e)}const w=Ye.define({combine:t=>t[0]}),j=S.define(),C=N.define({create(t){return null},update(t,e){for(let r of e.effects)r.is(j)&&(t=r.value);return t}});function ot(t){let e=t.field(C,!1);if(!e)return null;let r=t.facet(w);return{chunks:e,side:r?r.side:null}}let ke=t=>({state:e,dispatch:r})=>{let i=e.field(C,!1),n=e.facet(w);if(!i||!i.length||!n)return!1;let{head:o}=e.selection.main,s=0;for(let l=i.length-1;l>=0;l--){let c=i[l],[d,u]=n.side=="b"?[c.fromB,c.toB]:[c.fromA,c.toA];if(u<o){s=l+1;break}if(d<=o){if(i.length==1)return!1;s=l+(t<0?0:1);break}}let a=i[(s+(t<0?i.length-1:0))%i.length],[f,h]=n.side=="b"?[a.fromB,a.toB]:[a.fromA,a.toA];return r(e.update({selection:{anchor:f},userEvent:"select.byChunk",effects:M.scrollIntoView(Xe.range(h,f))})),!0};const nt=ke(1),it=ke(-1);class D{constructor(e,r,i,n,o){this.changes=e,this.fromA=r,this.toA=i,this.fromB=n,this.toB=o}offset(e,r){return e||r?new D(this.changes,this.fromA+e,this.toA+e,this.fromB+r,this.toB+r):this}get endA(){return Math.max(this.fromA,this.toA-1)}get endB(){return Math.max(this.fromB,this.toB-1)}static build(e,r,i){return De(re(e.toString(),r.toString(),i),e,r,0,0)}static updateA(e,r,i,n,o){return Le(Ee(e,n,!0,i.length),e,r,i,o)}static updateB(e,r,i,n,o){return Le(Ee(e,n,!1,r.length),e,r,i,o)}}function xe(t,e,r,i){let n=r.lineAt(t),o=i.lineAt(e);return n.to==t&&o.to==e&&t<r.length&&e<i.length?[t+1,e+1]:[n.from,o.from]}function Me(t,e,r,i){let n=r.lineAt(t),o=i.lineAt(e);return n.from==t&&o.from==e?[t,e]:[n.to+1,o.to+1]}function De(t,e,r,i,n){let o=[];for(let s=0;s<t.length;s++){let a=t[s],[f,h]=xe(a.fromA+i,a.fromB+n,e,r),[l,c]=Me(a.toA+i,a.toB+n,e,r),d=[a.offset(-f+i,-h+n)];for(;s<t.length-1;){let u=t[s+1],[m,g]=xe(u.fromA+i,u.fromB+n,e,r);if(m>l+1&&g>c+1)break;d.push(u.offset(-f+i,-h+n)),[l,c]=Me(u.toA+i,u.toB+n,e,r),s++}o.push(new D(d,f,Math.max(f,l),h,Math.max(h,c)))}return o}const I=1e3;function Oe(t,e,r,i){let n=0,o=t.length;for(;;){if(n==o){let l=0,c=0;n&&({toA:l,toB:c}=t[n-1]);let d=e-(r?l:c);return[l+d,c+d]}let s=n+o>>1,a=t[s],[f,h]=r?[a.fromA,a.toA]:[a.fromB,a.toB];if(f>e)o=s;else if(h<=e)n=s+1;else return i?[a.fromA,a.fromB]:[a.toA,a.toB]}}function Ee(t,e,r,i){let n=[];return e.iterChangedRanges((o,s,a,f)=>{let h=0,l=r?e.length:i,c=0,d=r?i:e.length;o>I&&([h,c]=Oe(t,o-I,r,!0)),s<e.length-I&&([l,d]=Oe(t,s+I,r,!1));let u=f-a-(s-o),m,[g,p]=r?[u,0]:[0,u];n.length&&(m=n[n.length-1]).toA>=h?n[n.length-1]={fromA:m.fromA,fromB:m.fromB,toA:l,toB:d,diffA:m.diffA+g,diffB:m.diffB+p}:n.push({fromA:h,toA:l,fromB:c,toB:d,diffA:g,diffB:p})}),n}function Le(t,e,r,i,n){if(!t.length)return e;let o=[];for(let s=0,a=0,f=0,h=0;;s++){let l=s==t.length?null:t[s],c=l?l.fromA+a:r.length,d=l?l.fromB+f:i.length;for(;h<e.length;){let p=e[h];if(p.toA+a>c||p.toB+f>d)break;o.push(p.offset(a,f)),h++}if(!l)break;let u=l.toA+a+l.diffA,m=l.toB+f+l.diffB,g=re(r.sliceString(c,u),i.sliceString(d,m),n);for(let p of De(g,r,i,c,d))o.push(p);for(a+=l.diffA,f+=l.diffB;h<e.length;){let p=e[h];if(p.fromA+a>u&&p.fromB+f>m)break;h++}}return o}const Se={scanLimit:500},P=We.fromClass(class{constructor(t){({deco:this.deco,gutter:this.gutter}=Re(t))}update(t){(t.docChanged||t.viewportChanged||st(t.startState,t.state)||at(t.startState,t.state))&&({deco:this.deco,gutter:this.gutter}=Re(t.view))}},{decorations:t=>t.deco}),z=F.low(ie({class:"cm-changeGutter",markers:t=>{var e;return((e=t.plugin(P))===null||e===void 0?void 0:e.gutter)||U.empty}}));function st(t,e){return t.field(C,!1)!=e.field(C,!1)}function at(t,e){return t.facet(w)!=e.facet(w)}const ye=x.line({class:"cm-changedLine"}),lt=x.mark({class:"cm-changedText"}),ft=x.mark({tagName:"ins",class:"cm-insertedLine"}),ct=x.mark({tagName:"del",class:"cm-deletedLine"}),Te=new class extends se{constructor(){super(...arguments),this.elementClass="cm-changedLineGutter"}};function ht(t,e,r,i,n,o){let s=r?t.fromA:t.fromB,a=r?t.toA:t.toB,f=0;if(s!=a){n.add(s,s,ye),n.add(s,a,r?ct:ft),o&&o.add(s,s,Te);for(let h=e.iterRange(s,a-1),l=s;!h.next().done;){if(h.lineBreak){l++,n.add(l,l,ye),o&&o.add(l,l,Te);continue}let c=l+h.value.length;if(i)for(;f<t.changes.length;){let d=t.changes[f],u=s+(r?d.fromA:d.fromB),m=s+(r?d.toA:d.toB),g=Math.max(l,u),p=Math.min(c,m);if(g<p&&n.add(g,p,lt),m<c)f++;else break}l=c}}}function Re(t){let e=t.state.field(C),{side:r,highlightChanges:i,markGutter:n}=t.state.facet(w),o=r=="a",s=new y,a=n?new y:null,{from:f,to:h}=t.viewport;for(let l of e){if((o?l.fromA:l.fromB)>=h)break;(o?l.toA:l.toB)>f&&ht(l,t.state.doc,o,i,s,a)}return{deco:s.finish(),gutter:a&&a.finish()}}class W extends ${constructor(e){super(),this.height=e}eq(e){return this.height==e.height}toDOM(){let e=document.createElement("div");return e.className="cm-mergeSpacer",e.style.height=this.height+"px",e}updateDOM(e){return e.style.height=this.height+"px",!0}get estimatedHeight(){return this.height}ignoreEvent(){return!1}}const Y=S.define({map:(t,e)=>t.map(e)}),H=N.define({create:()=>x.none,update:(t,e)=>{for(let r of e.effects)if(r.is(Y))return r.value;return t.map(e.changes)},provide:t=>M.decorations.from(t)}),X=.01;function dt(t,e,r){let i=new y,n=new y,o=t.state.field(H).iter(),s=e.state.field(H).iter(),a=0,f=0,h=0,l=0;for(let m=0;;m++){let g=m<r.length?r[m]:null;if(a<(g?g.fromA:t.state.doc.length)){let p=t.lineBlockAt(a).top+h,k=e.lineBlockAt(f).top+l,A=p-k;A<-X?(h-=A,i.add(a,a,x.widget({widget:new W(-A),block:!0,side:-1}))):A>X&&(l+=A,n.add(f,f,x.widget({widget:new W(A),block:!0,side:-1})))}if(!g)break;for(a=g.toA,f=g.toB;o.value&&o.from<a;)h-=o.value.spec.widget.height,o.next();for(;s.value&&s.from<f;)l-=s.value.spec.widget.height,s.next()}for(;o.value;)h-=o.value.spec.widget.height,o.next();for(;s.value;)l-=s.value.spec.widget.height,s.next();let c=t.contentHeight+h-(e.contentHeight+l);c<X?i.add(t.state.doc.length,t.state.doc.length,x.widget({widget:new W(-c),block:!0,side:1})):c>X&&n.add(e.state.doc.length,e.state.doc.length,x.widget({widget:new W(c),block:!0,side:1}));let d=i.finish(),u=n.finish();U.eq([d],[t.state.field(H)])||t.dispatch({effects:Y.of(d)}),U.eq([u],[e.state.field(H)])||e.dispatch({effects:Y.of(u)})}const oe=S.define({map:(t,e)=>e.mapPos(t)});class ut extends ${constructor(e){super(),this.lines=e}eq(e){return this.lines==e.lines}toDOM(e){let r=document.createElement("div");return r.className="cm-collapsedLines",r.textContent="\u299A "+e.state.phrase("$ unchanged lines",this.lines)+" \u299A",r.addEventListener("click",i=>{let n=e.posAtDOM(i.target);e.dispatch({effects:oe.of(n)});let{side:o,sibling:s}=e.state.facet(w);s&&s().dispatch({effects:oe.of(mt(n,e.state.field(C),o=="a"))})}),r}ignoreEvent(e){return e instanceof MouseEvent}get estimatedHeight(){return 27}}function mt(t,e,r){let i=0,n=0;for(let o=0;;o++){let s=o<e.length?e[o]:null;if(!s||(r?s.fromA:s.fromB)>=t)return n+(t-i);[i,n]=r?[s.toA,s.toB]:[s.toB,s.toA]}}const gt=N.define({create(t){return x.none},update(t,e){t=t.map(e.changes);for(let r of e.effects)r.is(oe)&&(t=t.update({filter:i=>i!=r.value}));return t},provide:t=>M.decorations.from(t)});function Ge({margin:t=3,minSize:e=4}){return gt.init(r=>pt(r,t,e))}function pt(t,e,r){let i=new y,n=t.facet(w).side=="a",o=t.field(C),s=1;for(let a=0;;a++){let f=a<o.length?o[a]:null,h=a?s+e:1,l=f?t.doc.lineAt(n?f.fromA:f.fromB).number-1-e:t.doc.lines,c=l-h+1;if(c>=r&&i.add(t.doc.line(h).from,t.doc.line(l).to,x.replace({widget:new ut(c),block:!0})),!f)break;s=t.doc.lineAt(Math.min(t.doc.length,n?f.toA:f.toB)).number}return i.finish()}const At=M.styleModule.of(new Ze({".cm-mergeView":{overflowY:"auto"},".cm-mergeViewEditors":{display:"flex",alignItems:"stretch"},".cm-mergeViewEditor":{flexGrow:1,flexBasis:0,overflow:"hidden"},".cm-merge-revert":{width:"1.6em",flexGrow:0,flexShrink:0,position:"relative"},".cm-merge-revert button":{position:"absolute",display:"block",width:"100%",boxSizing:"border-box",textAlign:"center",background:"none",border:"none",font:"inherit",cursor:"pointer"}})),Ne=M.baseTheme({".cm-mergeView & .cm-scroller, .cm-mergeView &":{height:"auto !important",overflowY:"visible !important"},"&.cm-merge-a .cm-changedLine, .cm-deletedChunk":{backgroundColor:"rgba(160, 128, 100, .08)"},"&.cm-merge-b .cm-changedLine":{backgroundColor:"rgba(100, 160, 128, .08)"},"&light.cm-merge-a .cm-changedText, &light .cm-deletedChunk .cm-deletedText":{background:"linear-gradient(#ee443366, #ee443366) bottom/100% 2px no-repeat"},"&dark.cm-merge-a .cm-changedText, &dark .cm-deletedChunk .cm-deletedText":{background:"linear-gradient(#ffaa9966, #ffaa9966) bottom/100% 2px no-repeat"},"&light.cm-merge-b .cm-changedText":{background:"linear-gradient(#22bb2266, #22bb2266) bottom/100% 2px no-repeat"},"&dark.cm-merge-b .cm-changedText":{background:"linear-gradient(#88ff8866, #88ff8866) bottom/100% 2px no-repeat"},".cm-insertedLine, .cm-deletedLine":{textDecoration:"none"},".cm-deletedChunk":{paddingLeft:"6px","& .cm-chunkButtons":{position:"absolute",insetInlineEnd:"5px"},"& button":{border:"none",cursor:"pointer",color:"white",margin:"0 2px",borderRadius:"3px","&[name=accept]":{background:"#2a2"},"&[name=reject]":{background:"#d43"}}},".cm-collapsedLines":{padding:"5px 5px 5px 10px",cursor:"pointer"},"&light .cm-collapsedLines":{color:"#444",background:"linear-gradient(to bottom, transparent 0, #f3f3f3 30%, #f3f3f3 70%, transparent 100%)"},"&dark .cm-collapsedLines":{color:"#ddd",background:"linear-gradient(to bottom, transparent 0, #222 30%, #222 70%, transparent 100%)"},".cm-changeGutter":{width:"3px",paddingLeft:"1px"},"&light.cm-merge-a .cm-changedLineGutter, &light .cm-deletedLineGutter":{background:"#e43"},"&dark.cm-merge-a .cm-changedLineGutter, &dark .cm-deletedLineGutter":{background:"#fa9"},"&light.cm-merge-b .cm-changedLineGutter":{background:"#2b2"},"&dark.cm-merge-b .cm-changedLineGutter":{background:"#8f8"}}),Ve=new ae,Z=new ae;class vt{constructor(e){this.revertDOM=null,this.revertToA=!1,this.revertToLeft=!1,this.measuring=-1,this.diffConf=e.diffConfig||Se;let r=[F.low(P),Ne,At,H,M.updateListener.of(c=>{this.measuring<0&&(c.heightChanged||c.viewportChanged)&&!c.transactions.some(d=>d.effects.some(u=>u.is(Y)))&&this.measure()})],i=[w.of({side:"a",sibling:()=>this.b,highlightChanges:e.highlightChanges!==!1,markGutter:e.gutter!==!1})];e.gutter!==!1&&i.push(z);let n=J.create({doc:e.a.doc,selection:e.a.selection,extensions:[e.a.extensions||[],M.editorAttributes.of({class:"cm-merge-a"}),Z.of(i),r]}),o=[w.of({side:"b",sibling:()=>this.a,highlightChanges:e.highlightChanges!==!1,markGutter:e.gutter!==!1})];e.gutter!==!1&&o.push(z);let s=J.create({doc:e.b.doc,selection:e.b.selection,extensions:[e.b.extensions||[],M.editorAttributes.of({class:"cm-merge-b"}),Z.of(o),r]});this.chunks=D.build(n.doc,s.doc,this.diffConf);let a=[C.init(()=>this.chunks),Ve.of(e.collapseUnchanged?Ge(e.collapseUnchanged):[])];n=n.update({effects:S.appendConfig.of(a)}).state,s=s.update({effects:S.appendConfig.of(a)}).state,this.dom=document.createElement("div"),this.dom.className="cm-mergeView",this.editorDOM=this.dom.appendChild(document.createElement("div")),this.editorDOM.className="cm-mergeViewEditors";let f=e.orientation||"a-b",h=document.createElement("div");h.className="cm-mergeViewEditor";let l=document.createElement("div");l.className="cm-mergeViewEditor",this.editorDOM.appendChild(f=="a-b"?h:l),this.editorDOM.appendChild(f=="a-b"?l:h),this.a=new M({state:n,parent:h,root:e.root,dispatchTransactions:c=>this.dispatch(c,this.a)}),this.b=new M({state:s,parent:l,root:e.root,dispatchTransactions:c=>this.dispatch(c,this.b)}),this.setupRevertControls(!!e.revertControls,e.revertControls=="b-to-a",e.renderRevertControl),e.parent&&e.parent.appendChild(this.dom),this.scheduleMeasure()}dispatch(e,r){if(e.some(i=>i.docChanged)){let i=e[e.length-1],n=e.reduce((s,a)=>s.compose(a.changes),fe.empty(e[0].startState.doc.length));this.chunks=r==this.a?D.updateA(this.chunks,i.newDoc,this.b.state.doc,n,this.diffConf):D.updateB(this.chunks,this.a.state.doc,i.newDoc,n,this.diffConf),r.update([...e,i.state.update({effects:j.of(this.chunks)})]);let o=r==this.a?this.b:this.a;o.update([o.state.update({effects:j.of(this.chunks)})]),this.scheduleMeasure()}else r.update(e)}reconfigure(e){if("diffConfig"in e&&(this.diffConf=e.diffConfig),"orientation"in e){let o=e.orientation!="b-a";if(o!=(this.editorDOM.firstChild==this.a.dom.parentNode)){let s=this.a.dom.parentNode,a=this.b.dom.parentNode;s.remove(),a.remove(),this.editorDOM.insertBefore(o?s:a,this.editorDOM.firstChild),this.editorDOM.appendChild(o?a:s),this.revertToLeft=!this.revertToLeft,this.revertDOM&&(this.revertDOM.textContent="")}}if("revertControls"in e||"renderRevertControl"in e){let o=!!this.revertDOM,s=this.revertToA,a=this.renderRevert;"revertControls"in e&&(o=!!e.revertControls,s=e.revertControls=="b-to-a"),"renderRevertControl"in e&&(a=e.renderRevertControl),this.setupRevertControls(o,s,a)}let r="highlightChanges"in e,i="gutter"in e,n="collapseUnchanged"in e;if(r||i||n){let o=[],s=[];if(r||i){let a=this.a.state.facet(w),f=i?e.gutter!==!1:a.markGutter,h=r?e.highlightChanges!==!1:a.highlightChanges;o.push(Z.reconfigure([w.of({side:"a",sibling:()=>this.b,highlightChanges:h,markGutter:f}),f?z:[]])),s.push(Z.reconfigure([w.of({side:"b",sibling:()=>this.a,highlightChanges:h,markGutter:f}),f?z:[]]))}if(n){let a=Ve.reconfigure(e.collapseUnchanged?Ge(e.collapseUnchanged):[]);o.push(a),s.push(a)}this.a.dispatch({effects:o}),this.b.dispatch({effects:s})}this.scheduleMeasure()}setupRevertControls(e,r,i){this.revertToA=r,this.revertToLeft=this.revertToA==(this.editorDOM.firstChild==this.a.dom.parentNode),this.renderRevert=i,!e&&this.revertDOM?(this.revertDOM.remove(),this.revertDOM=null):e&&!this.revertDOM?(this.revertDOM=this.editorDOM.insertBefore(document.createElement("div"),this.editorDOM.firstChild.nextSibling),this.revertDOM.addEventListener("mousedown",n=>this.revertClicked(n)),this.revertDOM.className="cm-merge-revert"):this.revertDOM&&(this.revertDOM.textContent="")}scheduleMeasure(){if(this.measuring<0){let e=this.dom.ownerDocument.defaultView||window;this.measuring=e.requestAnimationFrame(()=>{this.measuring=-1,this.measure()})}}measure(){dt(this.a,this.b,this.chunks),this.revertDOM&&this.updateRevertButtons()}updateRevertButtons(){let e=this.revertDOM,r=e.firstChild,i=this.a.viewport,n=this.b.viewport;for(let o=0;o<this.chunks.length;o++){let s=this.chunks[o];if(s.fromA>i.to||s.fromB>n.to)break;if(s.fromA<i.from||s.fromB<n.from)continue;let a=this.a.lineBlockAt(s.fromA).top+"px";for(;r&&+r.dataset.chunk<o;)r=He(r);r&&r.dataset.chunk==String(o)?(r.style.top!=a&&(r.style.top=a),r=r.nextSibling):e.insertBefore(this.renderRevertButton(a,o),r)}for(;r;)r=He(r)}renderRevertButton(e,r){let i;if(this.renderRevert)i=this.renderRevert();else{i=document.createElement("button");let n=this.a.state.phrase("Revert this chunk");i.setAttribute("aria-label",n),i.setAttribute("title",n),i.textContent=this.revertToLeft?"\u21DC":"\u21DD"}return i.style.top=e,i.setAttribute("data-chunk",String(r)),i}revertClicked(e){let r=e.target,i;for(;r&&r.parentNode!=this.revertDOM;)r=r.parentNode;if(r&&(i=this.chunks[r.dataset.chunk])){let[n,o,s,a,f,h]=this.revertToA?[this.b,this.a,i.fromB,i.toB,i.fromA,i.toA]:[this.a,this.b,i.fromA,i.toA,i.fromB,i.toB],l=n.state.sliceDoc(s,Math.max(s,a-1));s!=a&&h<=o.state.doc.length&&(l+=n.state.lineBreak),o.dispatch({changes:{from:f,to:Math.min(o.state.doc.length,h),insert:l},userEvent:"revert"}),e.preventDefault()}}destroy(){this.a.destroy(),this.b.destroy(),this.measuring>-1&&(this.dom.ownerDocument.defaultView||window).cancelAnimationFrame(this.measuring),this.dom.remove()}}function He(t){let e=t.nextSibling;return t.remove(),e}const bt=new class extends se{constructor(){super(...arguments),this.elementClass="cm-deletedLineGutter"}},Bt=F.low(ie({class:"cm-changeGutter",markers:t=>{var e;return((e=t.plugin(P))===null||e===void 0?void 0:e.gutter)||U.empty},widgetMarker:(t,e)=>e instanceof Ue?bt:null}));function Ct(t){let e=typeof t.original=="string"?le.of(t.original.split(/\r?\n/)):t.original,r=t.diffConfig||Se;return[F.low(P),xt,Ne,M.editorAttributes.of({class:"cm-merge-b"}),J.transactionExtender.of(i=>{let n=i.effects.find(a=>a.is(q));if(!i.docChanged&&!n)return null;let o=i.startState.field(C),s=n?D.updateA(o,n.value.doc,i.newDoc,n.value.changes,r):D.updateB(o,i.startState.field(R),i.newDoc,i.changes,r);return{effects:j.of(s)}}),w.of({highlightChanges:t.highlightChanges!==!1,markGutter:t.gutter!==!1,syntaxHighlightDeletions:t.syntaxHighlightDeletions!==!1,mergeControls:t.mergeControls!==!1,side:"b"}),R.init(()=>e),t.gutter!==!1?Bt:[],C.init(i=>D.build(e,i.doc,r))]}const q=S.define();function wt(t,e){return q.of({doc:e.apply(qe(t)),changes:e})}const R=N.define({create:()=>le.empty,update(t,e){for(let r of e.effects)r.is(q)&&(t=r.value.doc);return t}});function qe(t){return t.field(R)}const Fe=new WeakMap;class Ue extends ${constructor(e){super(),this.buildDOM=e,this.dom=null}eq(e){return this.dom==e.dom}toDOM(e){return this.dom||(this.dom=this.buildDOM(e))}}function kt(t,e){let r=Fe.get(e.changes);if(r)return r;let i=o=>{let{highlightChanges:s,syntaxHighlightDeletions:a,mergeControls:f}=t.facet(w),h=o.state.field(R).sliceString(e.fromA,e.endA),l=a&&t.facet($e),c=document.createElement("div");if(c.className="cm-deletedChunk",f){let k=c.appendChild(document.createElement("div"));k.className="cm-chunkButtons";let A=k.appendChild(document.createElement("button"));A.name="accept",A.textContent=t.phrase("Accept"),A.onmousedown=B=>{B.preventDefault(),je(o,o.posAtDOM(c))};let b=k.appendChild(document.createElement("button"));b.name="reject",b.textContent=t.phrase("Reject"),b.onmousedown=B=>{B.preventDefault(),Ie(o,o.posAtDOM(c))}}let d=c.appendChild(document.createElement("del")),u=e.changes,m=0,g=!1;function p(k,A,b){for(let B=k;B<A;){let O=A,ne=b+(g?" cm-deletedText":"");if(s&&m<u.length){let G=g?u[m].toA:u[m].fromA;G<=O&&(O=G,g&&m++,g=!g)}if(O>B){let G=document.createTextNode(h.slice(B,O));if(ne){let ze=c.appendChild(document.createElement("span"));ze.className=ne,d.appendChild(G)}else d.appendChild(G)}B=O}}if(l){let k=l.parser.parse(h),A=0;Ke(k,{style:b=>Je(t,b)},(b,B,O)=>{b>A&&p(A,b,""),p(b,B,O),A=B}),p(A,h.length,"")}else p(0,h.length,"");return c},n=x.widget({block:!0,side:-1,widget:new Ue(i)});return Fe.set(e.changes,n),n}function je(t,e){let{state:r}=t,i=e??r.selection.main.head,n=t.state.field(C).find(f=>f.fromB<=i&&f.endB>=i);if(!n)return!1;let o=t.state.sliceDoc(n.fromB,Math.max(n.fromB,n.toB-1)),s=t.state.field(R);n.fromB!=n.toB&&n.toA<=s.length&&(o+=t.state.lineBreak);let a=fe.of({from:n.fromA,to:Math.min(s.length,n.toA),insert:o},s.length);return t.dispatch({effects:q.of({doc:a.apply(s),changes:a}),userEvent:"accept"}),!0}function Ie(t,e){let{state:r}=t,i=e??r.selection.main.head,n=r.field(C).find(s=>s.fromB<=i&&s.endB>=i);if(!n)return!1;let o=r.field(R).sliceString(n.fromA,Math.max(n.fromA,n.toA-1));return n.fromA!=n.toA&&n.toB<=r.doc.length&&(o+=r.lineBreak),t.dispatch({changes:{from:n.fromB,to:Math.min(r.doc.length,n.toB),insert:o},userEvent:"revert"}),!0}function Pe(t){let e=new y;for(let r of t.field(C))e.add(r.fromB,r.fromB,kt(t,r));return e.finish()}const xt=N.define({create:t=>Pe(t),update(t,e){return e.state.field(C,!1)!=e.startState.field(C,!1)?Pe(e.state):t},provide:t=>M.decorations.from(t)});export{v as Change,D as Chunk,vt as MergeView,je as acceptChunk,we as diff,ot as getChunks,qe as getOriginalDoc,nt as goToNextChunk,it as goToPreviousChunk,wt as originalDocChangeEffect,re as presentableDiff,Ie as rejectChunk,Ct as unifiedMergeView,q as updateOriginalDoc};