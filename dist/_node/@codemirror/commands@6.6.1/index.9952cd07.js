import{Annotation as Ce,Facet as Me,combineConfig as Kt,StateField as $t,Transaction as Z,ChangeSet as jt,ChangeDesc as Qt,EditorSelection as h,StateEffect as Le,Text as Ee,findClusterBreak as b,countColumn as X,CharCategory as x}from"../state@6.4.1/index.66d24d9c.js";import{EditorView as C,Direction as Zt}from"../view@6.33.0/index.836a6482.js";import{IndentContext as be,getIndentation as Te,indentString as R,matchBrackets as M,syntaxTree as Y,getIndentUnit as _,indentUnit as Xt}from"../language@6.10.2/index.372ccf5f.js";import{NodeProp as ee}from"../../@lezer/common@1.2.1/index.ec92ec4c.js";const Oe=e=>{let{state:t}=e,r=t.doc.lineAt(t.selection.main.from),n=te(e.state,r.from);return n.line?Ie(e):n.block?Ve(e):!1};function D(e,t){return({state:r,dispatch:n})=>{if(r.readOnly)return!1;let s=e(t,r);return s?(n(r.update(s)),!0):!1}}const Ie=D(ne,0),Yt=D(ne,1),_t=D(ne,2),Re=D(V,0),en=D(V,1),tn=D(V,2),Ve=D((e,t)=>V(e,t,rn(t)),0);function te(e,t){let r=e.languageDataAt("commentTokens",t);return r.length?r[0]:{}}const T=50;function nn(e,{open:t,close:r},n,s){let o=e.sliceDoc(n-T,n),a=e.sliceDoc(s,s+T),l=/\s*$/.exec(o)[0].length,i=/^\s*/.exec(a)[0].length,u=o.length-l;if(o.slice(u-t.length,u)==t&&a.slice(i,i+r.length)==r)return{open:{pos:n-l,margin:l&&1},close:{pos:s+i,margin:i&&1}};let c,f;s-n<=2*T?c=f=e.sliceDoc(n,s):(c=e.sliceDoc(n,n+T),f=e.sliceDoc(s-T,s));let d=/^\s*/.exec(c)[0].length,v=/\s*$/.exec(f)[0].length,g=f.length-v-r.length;return c.slice(d,d+t.length)==t&&f.slice(g,g+r.length)==r?{open:{pos:n+d+t.length,margin:/\s/.test(c.charAt(d+t.length))?1:0},close:{pos:s-v-r.length,margin:/\s/.test(f.charAt(g-1))?1:0}}:null}function rn(e){let t=[];for(let r of e.selection.ranges){let n=e.doc.lineAt(r.from),s=r.to<=n.to?n:e.doc.lineAt(r.to),o=t.length-1;o>=0&&t[o].to>n.from?t[o].to=s.to:t.push({from:n.from+/^\s*/.exec(n.text)[0].length,to:s.to})}return t}function V(e,t,r=t.selection.ranges){let n=r.map(o=>te(t,o.from).block);if(!n.every(o=>o))return null;let s=r.map((o,a)=>nn(t,n[a],o.from,o.to));if(e!=2&&!s.every(o=>o))return{changes:t.changes(r.map((o,a)=>s[a]?[]:[{from:o.from,insert:n[a].open+" "},{from:o.to,insert:" "+n[a].close}]))};if(e!=1&&s.some(o=>o)){let o=[];for(let a=0,l;a<s.length;a++)if(l=s[a]){let i=n[a],{open:u,close:c}=l;o.push({from:u.pos-i.open.length,to:u.pos+u.margin},{from:c.pos-c.margin,to:c.pos+i.close.length})}return{changes:o}}return null}function ne(e,t,r=t.selection.ranges){let n=[],s=-1;for(let{from:o,to:a}of r){let l=n.length,i=1e9,u=te(t,o).line;if(u){for(let c=o;c<=a;){let f=t.doc.lineAt(c);if(f.from>s&&(o==a||a>f.from)){s=f.from;let d=/^\s*/.exec(f.text)[0].length,v=d==f.length,g=f.text.slice(d,d+u.length)==u?d:-1;d<f.text.length&&d<i&&(i=d),n.push({line:f,comment:g,token:u,indent:d,empty:v,single:!1})}c=f.to+1}if(i<1e9)for(let c=l;c<n.length;c++)n[c].indent<n[c].line.text.length&&(n[c].indent=i);n.length==l+1&&(n[l].single=!0)}}if(e!=2&&n.some(o=>o.comment<0&&(!o.empty||o.single))){let o=[];for(let{line:l,token:i,indent:u,empty:c,single:f}of n)(f||!c)&&o.push({from:l.from+u,insert:i+" "});let a=t.changes(o);return{changes:a,selection:t.selection.map(a,1)}}else if(e!=1&&n.some(o=>o.comment>=0)){let o=[];for(let{line:a,comment:l,token:i}of n)if(l>=0){let u=a.from+l,c=u+i.length;a.text[c-a.from]==" "&&c++,o.push({from:u,to:c})}return{changes:o}}return null}const re=Ce.define(),Ne=Ce.define(),Ue=Me.define(),Fe=Me.define({combine(e){return Kt(e,{minDepth:100,newGroupDelay:500,joinToEvent:(t,r)=>r},{minDepth:Math.max,newGroupDelay:Math.min,joinToEvent:(t,r)=>(n,s)=>t(n,s)||r(n,s)})}}),N=$t.define({create(){return S.empty},update(e,t){let r=t.state.facet(Fe),n=t.annotation(re);if(n){let i=p.fromTransaction(t,n.selection),u=n.side,c=u==0?e.undone:e.done;return i?c=G(c,c.length,r.minDepth,i):c=ze(c,t.startState.selection),new S(u==0?n.rest:c,u==0?c:n.rest)}let s=t.annotation(Ne);if((s=="full"||s=="before")&&(e=e.isolate()),t.annotation(Z.addToHistory)===!1)return t.changes.empty?e:e.addMapping(t.changes.desc);let o=p.fromTransaction(t),a=t.annotation(Z.time),l=t.annotation(Z.userEvent);return o?e=e.addChanges(o,a,l,r,t):t.selection&&(e=e.addSelection(t.startState.selection,a,l,r.newGroupDelay)),(s=="full"||s=="after")&&(e=e.isolate()),e},toJSON(e){return{done:e.done.map(t=>t.toJSON()),undone:e.undone.map(t=>t.toJSON())}},fromJSON(e){return new S(e.done.map(p.fromJSON),e.undone.map(p.fromJSON))}});function on(e={}){return[N,Fe.of(e),C.domEventHandlers({beforeinput(t,r){let n=t.inputType=="historyUndo"?oe:t.inputType=="historyRedo"?F:null;return n?(t.preventDefault(),n(r)):!1}})]}const sn=N;function U(e,t){return function({state:r,dispatch:n}){if(!t&&r.readOnly)return!1;let s=r.field(N,!1);if(!s)return!1;let o=s.pop(e,r,t);return o?(n(o),!0):!1}}const oe=U(0,!1),F=U(1,!1),Ge=U(0,!0),Je=U(1,!0);function Pe(e){return function(t){let r=t.field(N,!1);if(!r)return 0;let n=e==0?r.done:r.undone;return n.length-(n.length&&!n[0].changes?1:0)}}const an=Pe(0),ln=Pe(1);class p{constructor(t,r,n,s,o){this.changes=t,this.effects=r,this.mapped=n,this.startSelection=s,this.selectionsAfter=o}setSelAfter(t){return new p(this.changes,this.effects,this.mapped,this.startSelection,t)}toJSON(){var t,r,n;return{changes:(t=this.changes)===null||t===void 0?void 0:t.toJSON(),mapped:(r=this.mapped)===null||r===void 0?void 0:r.toJSON(),startSelection:(n=this.startSelection)===null||n===void 0?void 0:n.toJSON(),selectionsAfter:this.selectionsAfter.map(s=>s.toJSON())}}static fromJSON(t){return new p(t.changes&&jt.fromJSON(t.changes),[],t.mapped&&Qt.fromJSON(t.mapped),t.startSelection&&h.fromJSON(t.startSelection),t.selectionsAfter.map(h.fromJSON))}static fromTransaction(t,r){let n=k;for(let s of t.startState.facet(Ue)){let o=s(t);o.length&&(n=n.concat(o))}return!n.length&&t.changes.empty?null:new p(t.changes.invert(t.startState.doc),n,void 0,r||t.startState.selection,k)}static selection(t){return new p(void 0,k,void 0,void 0,t)}}function G(e,t,r,n){let s=t+1>r+20?t-r-1:0,o=e.slice(s,t);return o.push(n),o}function cn(e,t){let r=[],n=!1;return e.iterChangedRanges((s,o)=>r.push(s,o)),t.iterChangedRanges((s,o,a,l)=>{for(let i=0;i<r.length;){let u=r[i++],c=r[i++];l>=u&&a<=c&&(n=!0)}}),n}function un(e,t){return e.ranges.length==t.ranges.length&&e.ranges.filter((r,n)=>r.empty!=t.ranges[n].empty).length===0}function He(e,t){return e.length?t.length?e.concat(t):e:t}const k=[],fn=200;function ze(e,t){if(e.length){let r=e[e.length-1],n=r.selectionsAfter.slice(Math.max(0,r.selectionsAfter.length-fn));return n.length&&n[n.length-1].eq(t)?e:(n.push(t),G(e,e.length-1,1e9,r.setSelAfter(n)))}else return[p.selection([t])]}function hn(e){let t=e[e.length-1],r=e.slice();return r[e.length-1]=t.setSelAfter(t.selectionsAfter.slice(0,t.selectionsAfter.length-1)),r}function se(e,t){if(!e.length)return e;let r=e.length,n=k;for(;r;){let s=dn(e[r-1],t,n);if(s.changes&&!s.changes.empty||s.effects.length){let o=e.slice(0,r);return o[r-1]=s,o}else t=s.mapped,r--,n=s.selectionsAfter}return n.length?[p.selection(n)]:k}function dn(e,t,r){let n=He(e.selectionsAfter.length?e.selectionsAfter.map(l=>l.map(t)):k,r);if(!e.changes)return p.selection(n);let s=e.changes.map(t),o=t.mapDesc(e.changes,!0),a=e.mapped?e.mapped.composeDesc(o):o;return new p(s,Le.mapEffects(e.effects,t),a,e.startSelection.map(o),n)}const mn=/^(input\.type|delete)($|\.)/;class S{constructor(t,r,n=0,s=void 0){this.done=t,this.undone=r,this.prevTime=n,this.prevUserEvent=s}isolate(){return this.prevTime?new S(this.done,this.undone):this}addChanges(t,r,n,s,o){let a=this.done,l=a[a.length-1];return l&&l.changes&&!l.changes.empty&&t.changes&&(!n||mn.test(n))&&(!l.selectionsAfter.length&&r-this.prevTime<s.newGroupDelay&&s.joinToEvent(o,cn(l.changes,t.changes))||n=="input.type.compose")?a=G(a,a.length-1,s.minDepth,new p(t.changes.compose(l.changes),He(Le.mapEffects(t.effects,l.changes),l.effects),l.mapped,l.startSelection,k)):a=G(a,a.length,s.minDepth,t),new S(a,k,r,n)}addSelection(t,r,n,s){let o=this.done.length?this.done[this.done.length-1].selectionsAfter:k;return o.length>0&&r-this.prevTime<s&&n==this.prevUserEvent&&n&&/^select($|\.)/.test(n)&&un(o[o.length-1],t)?this:new S(ze(this.done,t),this.undone,r,n)}addMapping(t){return new S(se(this.done,t),se(this.undone,t),this.prevTime,this.prevUserEvent)}pop(t,r,n){let s=t==0?this.done:this.undone;if(s.length==0)return null;let o=s[s.length-1],a=o.selectionsAfter[0]||r.selection;if(n&&o.selectionsAfter.length)return r.update({selection:o.selectionsAfter[o.selectionsAfter.length-1],annotations:re.of({side:t,rest:hn(s),selection:a}),userEvent:t==0?"select.undo":"select.redo",scrollIntoView:!0});if(o.changes){let l=s.length==1?k:s.slice(0,s.length-1);return o.mapped&&(l=se(l,o.mapped)),r.update({changes:o.changes,selection:o.startSelection,effects:o.effects,annotations:re.of({side:t,rest:l,selection:a}),filter:!1,userEvent:t==0?"undo":"redo",scrollIntoView:!0})}else return null}}S.empty=new S(k,k);const pn=[{key:"Mod-z",run:oe,preventDefault:!0},{key:"Mod-y",mac:"Mod-Shift-z",run:F,preventDefault:!0},{linux:"Ctrl-Shift-z",run:F,preventDefault:!0},{key:"Mod-u",run:Ge,preventDefault:!0},{key:"Alt-u",mac:"Mod-Shift-u",run:Je,preventDefault:!0}];function L(e,t){return h.create(e.ranges.map(t),e.mainIndex)}function A(e,t){return e.update({selection:t,scrollIntoView:!0,userEvent:"select"})}function w({state:e,dispatch:t},r){let n=L(e.selection,r);return n.eq(e.selection,!0)?!1:(t(A(e,n)),!0)}function O(e,t){return h.cursor(t?e.to:e.from)}function J(e,t){return w(e,r=>r.empty?e.moveByChar(r,t):O(r,t))}function m(e){return e.textDirectionAt(e.state.selection.main.head)==Zt.LTR}const ae=e=>J(e,!m(e)),le=e=>J(e,m(e)),gn=e=>J(e,!0),yn=e=>J(e,!1);function P(e,t){return w(e,r=>r.empty?e.moveByGroup(r,t):O(r,t))}const We=e=>P(e,!m(e)),qe=e=>P(e,m(e)),kn=e=>P(e,!0),wn=e=>P(e,!1),Ke=typeof Intl<"u"&&Intl.Segmenter?new Intl.Segmenter(void 0,{granularity:"word"}):null;function $e(e,t,r){let n=e.state.charCategorizer(t.from),s=x.Space,o=t.from,a=0,l=!1,i=!1,u=!1,c=d=>{if(l)return!1;o+=r?d.length:-d.length;let v=n(d),g;if(v==x.Word&&d.charCodeAt(0)<128&&/[\W_]/.test(d)&&(v=-1),s==x.Space&&(s=v),s!=v)return!1;if(s==x.Word)if(d.toLowerCase()==d){if(!r&&i)return!1;u=!0}else if(u){if(r)return!1;l=!0}else{if(i&&r&&n(g=e.state.sliceDoc(o,o+1))==x.Word&&g.toLowerCase()==g)return!1;i=!0}return a++,!0},f=e.moveByChar(t,r,d=>(c(d),c));if(Ke&&s==x.Word&&f.from==t.from+a*(r?1:-1)){let d=Math.min(t.head,f.head),v=Math.max(t.head,f.head),g=e.state.sliceDoc(d,v);if(g.length>1&&/[\u4E00-\uffff]/.test(g)){let I=Array.from(Ke.segment(g));if(I.length>1)return r?h.cursor(t.head+I[1].index,-1):h.cursor(f.head+I[I.length-1].index,1)}}return f}function je(e,t){return w(e,r=>r.empty?$e(e,r,t):O(r,t))}const vn=e=>je(e,!0),An=e=>je(e,!1);function Sn(e,t,r){if(t.type.prop(r))return!0;let n=t.to-t.from;return n&&(n>2||/[^\s,.;:]/.test(e.sliceDoc(t.from,t.to)))||t.firstChild}function H(e,t,r){let n=Y(e).resolveInner(t.head),s=r?ee.closedBy:ee.openedBy;for(let i=t.head;;){let u=r?n.childAfter(i):n.childBefore(i);if(!u)break;Sn(e,u,s)?n=u:i=r?u.to:u.from}let o=n.type.prop(s),a,l;return o&&(a=r?M(e,n.from,1):M(e,n.to,-1))&&a.matched?l=r?a.end.to:a.end.from:l=r?n.to:n.from,h.cursor(l,r?-1:1)}const Qe=e=>w(e,t=>H(e.state,t,!m(e))),Ze=e=>w(e,t=>H(e.state,t,m(e)));function Xe(e,t){return w(e,r=>{if(!r.empty)return O(r,t);let n=e.moveVertically(r,t);return n.head!=r.head?n:e.moveToLineBoundary(r,t)})}const ie=e=>Xe(e,!1),ce=e=>Xe(e,!0);function Ye(e){let t=e.scrollDOM.clientHeight<e.scrollDOM.scrollHeight-2,r=0,n=0,s;if(t){for(let o of e.state.facet(C.scrollMargins)){let a=o(e);a?.top&&(r=Math.max(a?.top,r)),a?.bottom&&(n=Math.max(a?.bottom,n))}s=e.scrollDOM.clientHeight-r-n}else s=(e.dom.ownerDocument.defaultView||window).innerHeight;return{marginTop:r,marginBottom:n,selfScroll:t,height:Math.max(e.defaultLineHeight,s-5)}}function _e(e,t){let r=Ye(e),{state:n}=e,s=L(n.selection,a=>a.empty?e.moveVertically(a,t,r.height):O(a,t));if(s.eq(n.selection))return!1;let o;if(r.selfScroll){let a=e.coordsAtPos(n.selection.main.head),l=e.scrollDOM.getBoundingClientRect(),i=l.top+r.marginTop,u=l.bottom-r.marginBottom;a&&a.top>i&&a.bottom<u&&(o=C.scrollIntoView(s.main.head,{y:"start",yMargin:a.top-i}))}return e.dispatch(A(n,s),{effects:o}),!0}const ue=e=>_e(e,!1),z=e=>_e(e,!0);function B(e,t,r){let n=e.lineBlockAt(t.head),s=e.moveToLineBoundary(t,r);if(s.head==t.head&&s.head!=(r?n.to:n.from)&&(s=e.moveToLineBoundary(t,r,!1)),!r&&s.head==n.from&&n.length){let o=/^\s*/.exec(e.state.sliceDoc(n.from,Math.min(n.from+100,n.to)))[0].length;o&&t.head!=n.from+o&&(s=h.cursor(n.from+o))}return s}const et=e=>w(e,t=>B(e,t,!0)),tt=e=>w(e,t=>B(e,t,!1)),nt=e=>w(e,t=>B(e,t,!m(e))),rt=e=>w(e,t=>B(e,t,m(e))),ot=e=>w(e,t=>h.cursor(e.lineBlockAt(t.head).from,1)),st=e=>w(e,t=>h.cursor(e.lineBlockAt(t.head).to,-1));function at(e,t,r){let n=!1,s=L(e.selection,o=>{let a=M(e,o.head,-1)||M(e,o.head,1)||o.head>0&&M(e,o.head-1,1)||o.head<e.doc.length&&M(e,o.head+1,-1);if(!a||!a.end)return o;n=!0;let l=a.start.from==o.head?a.end.to:a.end.from;return r?h.range(o.anchor,l):h.cursor(l)});return n?(t(A(e,s)),!0):!1}const lt=({state:e,dispatch:t})=>at(e,t,!1),Bn=({state:e,dispatch:t})=>at(e,t,!0);function y(e,t){let r=L(e.state.selection,n=>{let s=t(n);return h.range(n.anchor,s.head,s.goalColumn,s.bidiLevel||void 0)});return r.eq(e.state.selection)?!1:(e.dispatch(A(e.state,r)),!0)}function W(e,t){return y(e,r=>e.moveByChar(r,t))}const fe=e=>W(e,!m(e)),he=e=>W(e,m(e)),Dn=e=>W(e,!0),xn=e=>W(e,!1);function q(e,t){return y(e,r=>e.moveByGroup(r,t))}const it=e=>q(e,!m(e)),ct=e=>q(e,m(e)),Cn=e=>q(e,!0),Mn=e=>q(e,!1);function ut(e,t){return y(e,r=>$e(e,r,t))}const Ln=e=>ut(e,!0),En=e=>ut(e,!1),ft=e=>y(e,t=>H(e.state,t,!m(e))),ht=e=>y(e,t=>H(e.state,t,m(e)));function dt(e,t){return y(e,r=>e.moveVertically(r,t))}const de=e=>dt(e,!1),me=e=>dt(e,!0);function mt(e,t){return y(e,r=>e.moveVertically(r,t,Ye(e).height))}const pe=e=>mt(e,!1),ge=e=>mt(e,!0),pt=e=>y(e,t=>B(e,t,!0)),gt=e=>y(e,t=>B(e,t,!1)),yt=e=>y(e,t=>B(e,t,!m(e))),kt=e=>y(e,t=>B(e,t,m(e))),wt=e=>y(e,t=>h.cursor(e.lineBlockAt(t.head).from)),vt=e=>y(e,t=>h.cursor(e.lineBlockAt(t.head).to)),ye=({state:e,dispatch:t})=>(t(A(e,{anchor:0})),!0),ke=({state:e,dispatch:t})=>(t(A(e,{anchor:e.doc.length})),!0),we=({state:e,dispatch:t})=>(t(A(e,{anchor:e.selection.main.anchor,head:0})),!0),ve=({state:e,dispatch:t})=>(t(A(e,{anchor:e.selection.main.anchor,head:e.doc.length})),!0),At=({state:e,dispatch:t})=>(t(e.update({selection:{anchor:0,head:e.doc.length},userEvent:"select"})),!0),St=({state:e,dispatch:t})=>{let r=j(e).map(({from:n,to:s})=>h.range(n,Math.min(s+1,e.doc.length)));return t(e.update({selection:h.create(r),userEvent:"select"})),!0},Bt=({state:e,dispatch:t})=>{let r=L(e.selection,n=>{var s;let o=Y(e).resolveStack(n.from,1);for(let a=o;a;a=a.next){let{node:l}=a;if((l.from<n.from&&l.to>=n.to||l.to>n.to&&l.from<=n.from)&&!((s=l.parent)===null||s===void 0)&&s.parent)return h.range(l.to,l.from)}return n});return t(A(e,r)),!0},Dt=({state:e,dispatch:t})=>{let r=e.selection,n=null;return r.ranges.length>1?n=h.create([r.main]):r.main.empty||(n=h.create([h.cursor(r.main.head)])),n?(t(A(e,n)),!0):!1};function E(e,t){if(e.state.readOnly)return!1;let r="delete.selection",{state:n}=e,s=n.changeByRange(o=>{let{from:a,to:l}=o;if(a==l){let i=t(o);i<a?(r="delete.backward",i=K(e,i,!1)):i>a&&(r="delete.forward",i=K(e,i,!0)),a=Math.min(a,i),l=Math.max(l,i)}else a=K(e,a,!1),l=K(e,l,!0);return a==l?{range:o}:{changes:{from:a,to:l},range:h.cursor(a,a<o.head?-1:1)}});return s.changes.empty?!1:(e.dispatch(n.update(s,{scrollIntoView:!0,userEvent:r,effects:r=="delete.selection"?C.announce.of(n.phrase("Selection deleted")):void 0})),!0)}function K(e,t,r){if(e instanceof C)for(let n of e.state.facet(C.atomicRanges).map(s=>s(e)))n.between(t,t,(s,o)=>{s<t&&o>t&&(t=r?o:s)});return t}const Ae=(e,t,r)=>E(e,n=>{let s=n.from,{state:o}=e,a=o.doc.lineAt(s),l,i;if(r&&!t&&s>a.from&&s<a.from+200&&!/[^ \t]/.test(l=a.text.slice(0,s-a.from))){if(l[l.length-1]=="	")return s-1;let u=X(l,o.tabSize),c=u%_(o)||_(o);for(let f=0;f<c&&l[l.length-1-f]==" ";f++)s--;i=s}else i=b(a.text,s-a.from,t,t)+a.from,i==s&&a.number!=(t?o.doc.lines:1)?i+=t?1:-1:!t&&/[\ufe00-\ufe0f]/.test(a.text.slice(i-a.from,s-a.from))&&(i=b(a.text,i-a.from,!1,!1)+a.from);return i}),$=e=>Ae(e,!1,!0),bn=e=>Ae(e,!1,!1),Se=e=>Ae(e,!0,!1),xt=(e,t)=>E(e,r=>{let n=r.head,{state:s}=e,o=s.doc.lineAt(n),a=s.charCategorizer(n);for(let l=null;;){if(n==(t?o.to:o.from)){n==r.head&&o.number!=(t?s.doc.lines:1)&&(n+=t?1:-1);break}let i=b(o.text,n-o.from,t)+o.from,u=o.text.slice(Math.min(n,i)-o.from,Math.max(n,i)-o.from),c=a(u);if(l!=null&&c!=l)break;(u!=" "||n!=r.head)&&(l=c),n=i}return n}),Be=e=>xt(e,!1),Ct=e=>xt(e,!0),Mt=e=>E(e,t=>{let r=e.lineBlockAt(t.head).to;return t.head<r?r:Math.min(e.state.doc.length,t.head+1)}),Tn=e=>E(e,t=>{let r=e.lineBlockAt(t.head).from;return t.head>r?r:Math.max(0,t.head-1)}),Lt=e=>E(e,t=>{let r=e.moveToLineBoundary(t,!1).head;return t.head>r?r:Math.max(0,t.head-1)}),Et=e=>E(e,t=>{let r=e.moveToLineBoundary(t,!0).head;return t.head<r?r:Math.min(e.state.doc.length,t.head+1)}),On=({state:e,dispatch:t})=>{if(e.readOnly)return!1;let r=[];for(let n=0,s="",o=e.doc.iter();;){if(o.next(),o.lineBreak||o.done){let a=s.search(/\s+$/);if(a>-1&&r.push({from:n-(s.length-a),to:n}),o.done)break;s=""}else s=o.value;n+=o.value.length}return r.length?(t(e.update({changes:r,userEvent:"delete"})),!0):!1},bt=({state:e,dispatch:t})=>{if(e.readOnly)return!1;let r=e.changeByRange(n=>({changes:{from:n.from,to:n.to,insert:Ee.of(["",""])},range:h.cursor(n.from)}));return t(e.update(r,{scrollIntoView:!0,userEvent:"input"})),!0},Tt=({state:e,dispatch:t})=>{if(e.readOnly)return!1;let r=e.changeByRange(n=>{if(!n.empty||n.from==0||n.from==e.doc.length)return{range:n};let s=n.from,o=e.doc.lineAt(s),a=s==o.from?s-1:b(o.text,s-o.from,!1)+o.from,l=s==o.to?s+1:b(o.text,s-o.from,!0)+o.from;return{changes:{from:a,to:l,insert:e.doc.slice(s,l).append(e.doc.slice(a,s))},range:h.cursor(l)}});return r.changes.empty?!1:(t(e.update(r,{scrollIntoView:!0,userEvent:"move.character"})),!0)};function j(e){let t=[],r=-1;for(let n of e.selection.ranges){let s=e.doc.lineAt(n.from),o=e.doc.lineAt(n.to);if(!n.empty&&n.to==o.from&&(o=e.doc.lineAt(n.to-1)),r>=s.number){let a=t[t.length-1];a.to=o.to,a.ranges.push(n)}else t.push({from:s.from,to:o.to,ranges:[n]});r=o.number+1}return t}function Ot(e,t,r){if(e.readOnly)return!1;let n=[],s=[];for(let o of j(e)){if(r?o.to==e.doc.length:o.from==0)continue;let a=e.doc.lineAt(r?o.to+1:o.from-1),l=a.length+1;if(r){n.push({from:o.to,to:a.to},{from:o.from,insert:a.text+e.lineBreak});for(let i of o.ranges)s.push(h.range(Math.min(e.doc.length,i.anchor+l),Math.min(e.doc.length,i.head+l)))}else{n.push({from:a.from,to:o.from},{from:o.to,insert:e.lineBreak+a.text});for(let i of o.ranges)s.push(h.range(i.anchor-l,i.head-l))}}return n.length?(t(e.update({changes:n,scrollIntoView:!0,selection:h.create(s,e.selection.mainIndex),userEvent:"move.line"})),!0):!1}const It=({state:e,dispatch:t})=>Ot(e,t,!1),Rt=({state:e,dispatch:t})=>Ot(e,t,!0);function Vt(e,t,r){if(e.readOnly)return!1;let n=[];for(let s of j(e))r?n.push({from:s.from,insert:e.doc.slice(s.from,s.to)+e.lineBreak}):n.push({from:s.to,insert:e.lineBreak+e.doc.slice(s.from,s.to)});return t(e.update({changes:n,scrollIntoView:!0,userEvent:"input.copyline"})),!0}const Nt=({state:e,dispatch:t})=>Vt(e,t,!1),Ut=({state:e,dispatch:t})=>Vt(e,t,!0),Ft=e=>{if(e.state.readOnly)return!1;let{state:t}=e,r=t.changes(j(t).map(({from:s,to:o})=>(s>0?s--:o<t.doc.length&&o++,{from:s,to:o}))),n=L(t.selection,s=>{let o;if(e.lineWrapping){let a=e.lineBlockAt(s.head),l=e.coordsAtPos(s.head,s.assoc||1);l&&(o=a.bottom+e.documentTop-l.bottom+e.defaultLineHeight/2)}return e.moveVertically(s,!0,o)}).map(r);return e.dispatch({changes:r,selection:n,scrollIntoView:!0,userEvent:"delete.line"}),!0},In=({state:e,dispatch:t})=>(t(e.update(e.replaceSelection(e.lineBreak),{scrollIntoView:!0,userEvent:"input"})),!0),Rn=({state:e,dispatch:t})=>(t(e.update(e.changeByRange(r=>{let n=/^\s*/.exec(e.doc.lineAt(r.from).text)[0];return{changes:{from:r.from,to:r.to,insert:e.lineBreak+n},range:h.cursor(r.from+n.length+1)}}),{scrollIntoView:!0,userEvent:"input"})),!0);function Vn(e,t){if(/\(\)|\[\]|\{\}/.test(e.sliceDoc(t-1,t+1)))return{from:t,to:t};let r=Y(e).resolveInner(t),n=r.childBefore(t),s=r.childAfter(t),o;return n&&s&&n.to<=t&&s.from>=t&&(o=n.type.prop(ee.closedBy))&&o.indexOf(s.name)>-1&&e.doc.lineAt(n.to).from==e.doc.lineAt(s.from).from&&!/\S/.test(e.sliceDoc(n.to,s.from))?{from:n.to,to:s.from}:null}const Gt=Pt(!1),Jt=Pt(!0);function Pt(e){return({state:t,dispatch:r})=>{if(t.readOnly)return!1;let n=t.changeByRange(s=>{let{from:o,to:a}=s,l=t.doc.lineAt(o),i=!e&&o==a&&Vn(t,o);e&&(o=a=(a<=l.to?l:t.doc.lineAt(a)).to);let u=new be(t,{simulateBreak:o,simulateDoubleBreak:!!i}),c=Te(u,o);for(c==null&&(c=X(/^\s*/.exec(t.doc.lineAt(o).text)[0],t.tabSize));a<l.to&&/\s/.test(l.text[a-l.from]);)a++;i?{from:o,to:a}=i:o>l.from&&o<l.from+100&&!/\S/.test(l.text.slice(0,o))&&(o=l.from);let f=["",R(t,c)];return i&&f.push(R(t,u.lineIndent(l.from,-1))),{changes:{from:o,to:a,insert:Ee.of(f)},range:h.cursor(o+1+f[1].length)}});return r(t.update(n,{scrollIntoView:!0,userEvent:"input"})),!0}}function De(e,t){let r=-1;return e.changeByRange(n=>{let s=[];for(let a=n.from;a<=n.to;){let l=e.doc.lineAt(a);l.number>r&&(n.empty||n.to>l.from)&&(t(l,s,n),r=l.number),a=l.to+1}let o=e.changes(s);return{changes:s,range:h.range(o.mapPos(n.anchor,1),o.mapPos(n.head,1))}})}const Ht=({state:e,dispatch:t})=>{if(e.readOnly)return!1;let r=Object.create(null),n=new be(e,{overrideIndentation:o=>r[o]??-1}),s=De(e,(o,a,l)=>{let i=Te(n,o.from);if(i==null)return;/\S/.test(o.text)||(i=0);let u=/^\s*/.exec(o.text)[0],c=R(e,i);(u!=c||l.from<o.from+u.length)&&(r[o.from]=i,a.push({from:o.from,to:o.from+u.length,insert:c}))});return s.changes.empty||t(e.update(s,{userEvent:"indent"})),!0},Q=({state:e,dispatch:t})=>e.readOnly?!1:(t(e.update(De(e,(r,n)=>{n.push({from:r.from,insert:e.facet(Xt)})}),{userEvent:"input.indent"})),!0),xe=({state:e,dispatch:t})=>e.readOnly?!1:(t(e.update(De(e,(r,n)=>{let s=/^\s*/.exec(r.text)[0];if(!s)return;let o=X(s,e.tabSize),a=0,l=R(e,Math.max(0,o-_(e)));for(;a<s.length&&a<l.length&&s.charCodeAt(a)==l.charCodeAt(a);)a++;n.push({from:r.from+a,to:r.from+s.length,insert:l.slice(a)})}),{userEvent:"delete.dedent"})),!0),zt=e=>(e.setTabFocusMode(),!0),Nn=e=>(e.setTabFocusMode(2e3),!0),Un=({state:e,dispatch:t})=>e.selection.ranges.some(r=>!r.empty)?Q({state:e,dispatch:t}):(t(e.update(e.replaceSelection("	"),{scrollIntoView:!0,userEvent:"input"})),!0),Wt=[{key:"Ctrl-b",run:ae,shift:fe,preventDefault:!0},{key:"Ctrl-f",run:le,shift:he},{key:"Ctrl-p",run:ie,shift:de},{key:"Ctrl-n",run:ce,shift:me},{key:"Ctrl-a",run:ot,shift:wt},{key:"Ctrl-e",run:st,shift:vt},{key:"Ctrl-d",run:Se},{key:"Ctrl-h",run:$},{key:"Ctrl-k",run:Mt},{key:"Ctrl-Alt-h",run:Be},{key:"Ctrl-o",run:bt},{key:"Ctrl-t",run:Tt},{key:"Ctrl-v",run:z}],qt=[{key:"ArrowLeft",run:ae,shift:fe,preventDefault:!0},{key:"Mod-ArrowLeft",mac:"Alt-ArrowLeft",run:We,shift:it,preventDefault:!0},{mac:"Cmd-ArrowLeft",run:nt,shift:yt,preventDefault:!0},{key:"ArrowRight",run:le,shift:he,preventDefault:!0},{key:"Mod-ArrowRight",mac:"Alt-ArrowRight",run:qe,shift:ct,preventDefault:!0},{mac:"Cmd-ArrowRight",run:rt,shift:kt,preventDefault:!0},{key:"ArrowUp",run:ie,shift:de,preventDefault:!0},{mac:"Cmd-ArrowUp",run:ye,shift:we},{mac:"Ctrl-ArrowUp",run:ue,shift:pe},{key:"ArrowDown",run:ce,shift:me,preventDefault:!0},{mac:"Cmd-ArrowDown",run:ke,shift:ve},{mac:"Ctrl-ArrowDown",run:z,shift:ge},{key:"PageUp",run:ue,shift:pe},{key:"PageDown",run:z,shift:ge},{key:"Home",run:tt,shift:gt,preventDefault:!0},{key:"Mod-Home",run:ye,shift:we},{key:"End",run:et,shift:pt,preventDefault:!0},{key:"Mod-End",run:ke,shift:ve},{key:"Enter",run:Gt},{key:"Mod-a",run:At},{key:"Backspace",run:$,shift:$},{key:"Delete",run:Se},{key:"Mod-Backspace",mac:"Alt-Backspace",run:Be},{key:"Mod-Delete",mac:"Alt-Delete",run:Ct},{mac:"Mod-Backspace",run:Lt},{mac:"Mod-Delete",run:Et}].concat(Wt.map(e=>({mac:e.key,run:e.run,shift:e.shift}))),Fn=[{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:Qe,shift:ft},{key:"Alt-ArrowRight",mac:"Ctrl-ArrowRight",run:Ze,shift:ht},{key:"Alt-ArrowUp",run:It},{key:"Shift-Alt-ArrowUp",run:Nt},{key:"Alt-ArrowDown",run:Rt},{key:"Shift-Alt-ArrowDown",run:Ut},{key:"Escape",run:Dt},{key:"Mod-Enter",run:Jt},{key:"Alt-l",mac:"Ctrl-l",run:St},{key:"Mod-i",run:Bt,preventDefault:!0},{key:"Mod-[",run:xe},{key:"Mod-]",run:Q},{key:"Mod-Alt-\\",run:Ht},{key:"Shift-Mod-k",run:Ft},{key:"Shift-Mod-\\",run:lt},{key:"Mod-/",run:Oe},{key:"Alt-A",run:Re},{key:"Ctrl-m",mac:"Shift-Alt-m",run:zt}].concat(qt),Gn={key:"Tab",run:Q,shift:xe};export{en as blockComment,tn as blockUncomment,Ut as copyLineDown,Nt as copyLineUp,yn as cursorCharBackward,gn as cursorCharForward,ae as cursorCharLeft,le as cursorCharRight,ke as cursorDocEnd,ye as cursorDocStart,wn as cursorGroupBackward,kn as cursorGroupForward,We as cursorGroupLeft,qe as cursorGroupRight,tt as cursorLineBoundaryBackward,et as cursorLineBoundaryForward,nt as cursorLineBoundaryLeft,rt as cursorLineBoundaryRight,ce as cursorLineDown,st as cursorLineEnd,ot as cursorLineStart,ie as cursorLineUp,lt as cursorMatchingBracket,z as cursorPageDown,ue as cursorPageUp,An as cursorSubwordBackward,vn as cursorSubwordForward,Qe as cursorSyntaxLeft,Ze as cursorSyntaxRight,Fn as defaultKeymap,$ as deleteCharBackward,bn as deleteCharBackwardStrict,Se as deleteCharForward,Be as deleteGroupBackward,Ct as deleteGroupForward,Ft as deleteLine,Lt as deleteLineBoundaryBackward,Et as deleteLineBoundaryForward,Mt as deleteToLineEnd,Tn as deleteToLineStart,On as deleteTrailingWhitespace,Wt as emacsStyleKeymap,on as history,sn as historyField,pn as historyKeymap,xe as indentLess,Q as indentMore,Ht as indentSelection,Gn as indentWithTab,Jt as insertBlankLine,In as insertNewline,Gt as insertNewlineAndIndent,Rn as insertNewlineKeepIndent,Un as insertTab,Ue as invertedEffects,Ne as isolateHistory,Yt as lineComment,_t as lineUncomment,Rt as moveLineDown,It as moveLineUp,F as redo,ln as redoDepth,Je as redoSelection,At as selectAll,xn as selectCharBackward,Dn as selectCharForward,fe as selectCharLeft,he as selectCharRight,ve as selectDocEnd,we as selectDocStart,Mn as selectGroupBackward,Cn as selectGroupForward,it as selectGroupLeft,ct as selectGroupRight,St as selectLine,gt as selectLineBoundaryBackward,pt as selectLineBoundaryForward,yt as selectLineBoundaryLeft,kt as selectLineBoundaryRight,me as selectLineDown,vt as selectLineEnd,wt as selectLineStart,de as selectLineUp,Bn as selectMatchingBracket,ge as selectPageDown,pe as selectPageUp,Bt as selectParentSyntax,En as selectSubwordBackward,Ln as selectSubwordForward,ft as selectSyntaxLeft,ht as selectSyntaxRight,Dt as simplifySelection,bt as splitLine,qt as standardKeymap,Nn as temporarilySetTabFocusMode,Re as toggleBlockComment,Ve as toggleBlockCommentByLine,Oe as toggleComment,Ie as toggleLineComment,zt as toggleTabFocusMode,Tt as transposeChars,oe as undo,an as undoDepth,Ge as undoSelection};