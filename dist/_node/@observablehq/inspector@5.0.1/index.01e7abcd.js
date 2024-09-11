import{format as K}from"../../isoformat@0.2.1/index.0882e9d9.js";function q(e,t,n){n=n||{};var o=e.ownerDocument,r=o.defaultView.CustomEvent;typeof r=="function"?r=new r(t,{detail:n}):(r=o.createEvent("Event"),r.initEvent(t,!1,!1),r.detail=n),e.dispatchEvent(r)}function A(e){return Array.isArray(e)||e instanceof Int8Array||e instanceof Int16Array||e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof Uint16Array||e instanceof Uint32Array||e instanceof Float32Array||e instanceof Float64Array}function I(e){return e===(e|0)+""}function m(e){const t=document.createElement("span");return t.className="observablehq--cellname",t.textContent=`${e} = `,t}const G=Symbol.prototype.toString;function y(e){return G.call(e)}const{getOwnPropertySymbols:J,prototype:{hasOwnProperty:V}}=Object,{toStringTag:X}=Symbol,D={},v=J;function N(e,t){return V.call(e,t)}function T(e){return e[X]||e.constructor&&e.constructor.name||"Object"}function f(e,t){try{const n=e[t];return n&&n.constructor,n}catch{return D}}const Y=[{symbol:"@@__IMMUTABLE_INDEXED__@@",name:"Indexed",modifier:!0},{symbol:"@@__IMMUTABLE_KEYED__@@",name:"Keyed",modifier:!0},{symbol:"@@__IMMUTABLE_LIST__@@",name:"List",arrayish:!0},{symbol:"@@__IMMUTABLE_MAP__@@",name:"Map"},{symbol:"@@__IMMUTABLE_ORDERED__@@",name:"Ordered",modifier:!0,prefix:!0},{symbol:"@@__IMMUTABLE_RECORD__@@",name:"Record"},{symbol:"@@__IMMUTABLE_SET__@@",name:"Set",arrayish:!0,setish:!0},{symbol:"@@__IMMUTABLE_STACK__@@",name:"Stack",arrayish:!0}];function O(e){try{let t=Y.filter(({symbol:a})=>e[a]===!0);if(!t.length)return;const n=t.find(a=>!a.modifier),o=n.name==="Map"&&t.find(a=>a.modifier&&a.prefix),r=t.some(a=>a.arrayish),c=t.some(a=>a.setish);return{name:`${o?o.name:""}${n.name}`,symbols:t,arrayish:r&&!c,setish:c}}catch{return null}}const{getPrototypeOf:M,getOwnPropertyDescriptors:Q}=Object,U=M({});function z(e,t,n,o){let r=A(e),c,a,l,d;e instanceof Map?e instanceof e.constructor?(c=`Map(${e.size})`,a=W):(c="Map()",a=C):e instanceof Set?e instanceof e.constructor?(c=`Set(${e.size})`,a=Z):(c="Set()",a=C):r?(c=`${e.constructor.name}(${e.length})`,a=te):(d=O(e))?(c=`Immutable.${d.name}${d.name==="Record"?"":`(${e.size})`}`,r=d.arrayish,a=d.arrayish?ne:d.setish?ee:re):o?(c=T(e),a=oe):(c=T(e),a=C);const s=document.createElement("span");s.className="observablehq--expanded",n&&s.appendChild(m(n));const p=s.appendChild(document.createElement("a"));p.innerHTML=`<svg width=8 height=8 class='observablehq--caret'>
    <path d='M4 7L0 1h8z' fill='currentColor' />
  </svg>`,p.appendChild(document.createTextNode(`${c}${r?" [":" {"}`)),p.addEventListener("mouseup",function(i){i.stopPropagation(),L(s,w(e,null,n,o))}),a=a(e);for(let i=0;!(l=a.next()).done&&i<20;++i)s.appendChild(l.value);if(!l.done){const i=s.appendChild(document.createElement("a"));i.className="observablehq--field",i.style.display="block",i.appendChild(document.createTextNode("  \u2026 more")),i.addEventListener("mouseup",function(b){b.stopPropagation(),s.insertBefore(l.value,s.lastChild.previousSibling);for(let $=0;!(l=a.next()).done&&$<19;++$)s.insertBefore(l.value,s.lastChild.previousSibling);l.done&&s.removeChild(s.lastChild.previousSibling),q(s,"load")})}return s.appendChild(document.createTextNode(r?"]":"}")),s}function*W(e){for(const[t,n]of e)yield ae(t,n);yield*C(e)}function*Z(e){for(const t of e)yield R(t);yield*C(e)}function*ee(e){for(const t of e)yield R(t)}function*te(e){for(let t=0,n=e.length;t<n;++t)t in e&&(yield h(t,f(e,t),"observablehq--index"));for(const t in e)!I(t)&&N(e,t)&&(yield h(t,f(e,t),"observablehq--key"));for(const t of v(e))yield h(y(t),f(e,t),"observablehq--symbol")}function*ne(e){let t=0;for(const n=e.size;t<n;++t)yield h(t,e.get(t),!0)}function*oe(e){for(const n in Q(e))yield h(n,f(e,n),"observablehq--key");for(const n of v(e))yield h(y(n),f(e,n),"observablehq--symbol");const t=M(e);t&&t!==U&&(yield B(t))}function*C(e){for(const n in e)N(e,n)&&(yield h(n,f(e,n),"observablehq--key"));for(const n of v(e))yield h(y(n),f(e,n),"observablehq--symbol");const t=M(e);t&&t!==U&&(yield B(t))}function*re(e){for(const[t,n]of e)yield h(t,n,"observablehq--key")}function B(e){const t=document.createElement("div"),n=t.appendChild(document.createElement("span"));return t.className="observablehq--field",n.className="observablehq--prototype-key",n.textContent="  <prototype>",t.appendChild(document.createTextNode(": ")),t.appendChild(u(e,void 0,void 0,void 0,!0)),t}function h(e,t,n){const o=document.createElement("div"),r=o.appendChild(document.createElement("span"));return o.className="observablehq--field",r.className=n,r.textContent=`  ${e}`,o.appendChild(document.createTextNode(": ")),o.appendChild(u(t)),o}function ae(e,t){const n=document.createElement("div");return n.className="observablehq--field",n.appendChild(document.createTextNode("  ")),n.appendChild(u(e)),n.appendChild(document.createTextNode(" => ")),n.appendChild(u(t)),n}function R(e){const t=document.createElement("div");return t.className="observablehq--field",t.appendChild(document.createTextNode("  ")),t.appendChild(u(e)),t}function F(e){const t=window.getSelection();return t.type==="Range"&&(t.containsNode(e,!0)||e.contains(t.anchorNode)||e.contains(t.focusNode))}function w(e,t,n,o){let r=A(e),c,a,l,d;if(e instanceof Map?e instanceof e.constructor?(c=`Map(${e.size})`,a=se):(c="Map()",a=E):e instanceof Set?e instanceof e.constructor?(c=`Set(${e.size})`,a=ce):(c="Set()",a=E):r?(c=`${e.constructor.name}(${e.length})`,a=de):(d=O(e))?(c=`Immutable.${d.name}${d.name==="Record"?"":`(${e.size})`}`,r=d.arrayish,a=d.arrayish?le:d.setish?ie:ue):(c=T(e),a=E),t){const i=document.createElement("span");return i.className="observablehq--shallow",n&&i.appendChild(m(n)),i.appendChild(document.createTextNode(c)),i.addEventListener("mouseup",function(b){F(i)||(b.stopPropagation(),L(i,w(e)))}),i}const s=document.createElement("span");s.className="observablehq--collapsed",n&&s.appendChild(m(n));const p=s.appendChild(document.createElement("a"));p.innerHTML=`<svg width=8 height=8 class='observablehq--caret'>
    <path d='M7 4L1 8V0z' fill='currentColor' />
  </svg>`,p.appendChild(document.createTextNode(`${c}${r?" [":" {"}`)),s.addEventListener("mouseup",function(i){F(s)||(i.stopPropagation(),L(s,z(e,null,n,o)))},!0),a=a(e);for(let i=0;!(l=a.next()).done&&i<20;++i)i>0&&s.appendChild(document.createTextNode(", ")),s.appendChild(l.value);return l.done||s.appendChild(document.createTextNode(", \u2026")),s.appendChild(document.createTextNode(r?"]":"}")),s}function*se(e){for(const[t,n]of e)yield pe(t,n);yield*E(e)}function*ce(e){for(const t of e)yield u(t,!0);yield*E(e)}function*ie(e){for(const t of e)yield u(t,!0)}function*le(e){let t=-1,n=0;for(const o=e.size;n<o;++n)n>t+1&&(yield _(n-t-1)),yield u(e.get(n),!0),t=n;n>t+1&&(yield _(n-t-1))}function*de(e){let t=-1,n=0;for(const o=e.length;n<o;++n)n in e&&(n>t+1&&(yield _(n-t-1)),yield u(f(e,n),!0),t=n);n>t+1&&(yield _(n-t-1));for(const o in e)!I(o)&&N(e,o)&&(yield x(o,f(e,o),"observablehq--key"));for(const o of v(e))yield x(y(o),f(e,o),"observablehq--symbol")}function*E(e){for(const t in e)N(e,t)&&(yield x(t,f(e,t),"observablehq--key"));for(const t of v(e))yield x(y(t),f(e,t),"observablehq--symbol")}function*ue(e){for(const[t,n]of e)yield x(t,n,"observablehq--key")}function _(e){const t=document.createElement("span");return t.className="observablehq--empty",t.textContent=e===1?"empty":`empty \xD7 ${e}`,t}function x(e,t,n){const o=document.createDocumentFragment(),r=o.appendChild(document.createElement("span"));return r.className=n,r.textContent=e,o.appendChild(document.createTextNode(": ")),o.appendChild(u(t,!0)),o}function pe(e,t){const n=document.createDocumentFragment();return n.appendChild(u(e,!0)),n.appendChild(document.createTextNode(" => ")),n.appendChild(u(t,!0)),n}function fe(e){return K(e,"Invalid Date")}var me=Error.prototype.toString;function he(e){return e.stack||me.call(e)}var be=RegExp.prototype.toString;function ye(e){return be.call(e)}const S=20;function ve(e,t,n,o){if(t===!1){if(j(e,/["\n]/g)<=j(e,/`|\${/g)){const s=document.createElement("span");o&&s.appendChild(m(o));const p=s.appendChild(document.createElement("span"));return p.className="observablehq--string",p.textContent=JSON.stringify(e),s}const a=e.split(`
`);if(a.length>S&&!n){const s=document.createElement("div");o&&s.appendChild(m(o));const p=s.appendChild(document.createElement("span"));p.className="observablehq--string",p.textContent="`"+P(a.slice(0,S).join(`
`));const i=s.appendChild(document.createElement("span")),b=a.length-S;return i.textContent=`Show ${b} truncated line${b>1?"s":""}`,i.className="observablehq--string-expand",i.addEventListener("mouseup",function($){$.stopPropagation(),L(s,u(e,t,!0,o))}),s}const l=document.createElement("span");o&&l.appendChild(m(o));const d=l.appendChild(document.createElement("span"));return d.className=`observablehq--string${n?" observablehq--expanded":""}`,d.textContent="`"+P(e)+"`",l}const r=document.createElement("span");o&&r.appendChild(m(o));const c=r.appendChild(document.createElement("span"));return c.className="observablehq--string",c.textContent=JSON.stringify(e.length>100?`${e.slice(0,50)}\u2026${e.slice(-49)}`:e),r}function P(e){return e.replace(/[\\`\x00-\x09\x0b-\x19]|\${/g,Ce)}function Ce(e){var t=e.charCodeAt(0);switch(t){case 8:return"\\b";case 9:return"\\t";case 11:return"\\v";case 12:return"\\f";case 13:return"\\r"}return t<16?"\\x0"+t.toString(16):t<32?"\\x"+t.toString(16):"\\"+e}function j(e,t){for(var n=0;t.exec(e);)++n;return n}var Ee=Function.prototype.toString,xe={prefix:"async \u0192"},ge={prefix:"async \u0192*"},H={prefix:"class"},$e={prefix:"\u0192"},qe={prefix:"\u0192*"};function Ne(e,t){var n,o,r=Ee.call(e);switch(e.constructor&&e.constructor.name){case"AsyncFunction":n=xe;break;case"AsyncGeneratorFunction":n=ge;break;case"GeneratorFunction":n=qe;break;default:n=/^class\b/.test(r)?H:$e;break}return n===H?g(n,"",t):(o=/^(?:async\s*)?(\w+)\s*=>/.exec(r))?g(n,"("+o[1]+")",t):(o=/^(?:async\s*)?\(\s*(\w+(?:\s*,\s*\w+)*)?\s*\)/.exec(r))?g(n,o[1]?"("+o[1].replace(/\s*,\s*/g,", ")+")":"()",t):(o=/^(?:async\s*)?function(?:\s*\*)?(?:\s*\w+)?\s*\(\s*(\w+(?:\s*,\s*\w+)*)?\s*\)/.exec(r))?g(n,o[1]?"("+o[1].replace(/\s*,\s*/g,", ")+")":"()",t):g(n,"(\u2026)",t)}function g(e,t,n){var o=document.createElement("span");o.className="observablehq--function",n&&o.appendChild(m(n));var r=o.appendChild(document.createElement("span"));return r.className="observablehq--keyword",r.textContent=e.prefix,o.appendChild(document.createTextNode(t)),o}const{prototype:{toString:_e}}=Object;function u(e,t,n,o,r){let c=typeof e;switch(c){case"boolean":case"undefined":{e+="";break}case"number":{e=e===0&&1/e<0?"-0":e+"";break}case"bigint":{e=e+"n";break}case"symbol":{e=y(e);break}case"function":return Ne(e,o);case"string":return ve(e,t,n,o);default:{if(e===null){c=null,e="null";break}if(e instanceof Date){c="date",e=fe(e);break}if(e===D){c="forbidden",e="[forbidden]";break}switch(_e.call(e)){case"[object RegExp]":{c="regexp",e=ye(e);break}case"[object Error]":case"[object DOMException]":{c="error",e=he(e);break}default:return(n?z:w)(e,t,o,r)}break}}const a=document.createElement("span");o&&a.appendChild(m(o));const l=a.appendChild(document.createElement("span"));return l.className=`observablehq--${c}`,l.textContent=e,a}function L(e,t){e.classList.contains("observablehq--inspect")&&t.classList.add("observablehq--inspect"),e.parentNode.replaceChild(t,e),q(t,"load")}const Le=/\s+\(\d+:\d+\)$/m;class k{constructor(t){if(!t)throw new Error("invalid node");this._node=t,t.classList.add("observablehq")}pending(){const{_node:t}=this;t.classList.remove("observablehq--error"),t.classList.add("observablehq--running")}fulfilled(t,n){const{_node:o}=this;if((!Te(t)||t.parentNode&&t.parentNode!==o)&&(t=u(t,!1,o.firstChild&&o.firstChild.classList&&o.firstChild.classList.contains("observablehq--expanded"),n),t.classList.add("observablehq--inspect")),o.classList.remove("observablehq--running","observablehq--error"),o.firstChild!==t)if(o.firstChild){for(;o.lastChild!==o.firstChild;)o.removeChild(o.lastChild);o.replaceChild(t,o.firstChild)}else o.appendChild(t);q(o,"update")}rejected(t,n){const{_node:o}=this;for(o.classList.remove("observablehq--running"),o.classList.add("observablehq--error");o.lastChild;)o.removeChild(o.lastChild);var r=document.createElement("div");r.className="observablehq--inspect",n&&r.appendChild(m(n)),r.appendChild(document.createTextNode((t+"").replace(Le,""))),o.appendChild(r),q(o,"error",{error:t})}}k.into=function(e){if(typeof e=="string"&&(e=document.querySelector(e),e==null))throw new Error("container not found");return function(){return new k(e.appendChild(document.createElement("div")))}};function Te(e){return(e instanceof Element||e instanceof Text)&&e instanceof e.constructor}export{k as Inspector};
