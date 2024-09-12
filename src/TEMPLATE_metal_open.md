
<!-- AGPL DN -->

```js
import { introspection as getIntrospection, compile_new, bundleIntoOne, packageCalculang_new, calls_fromDefinition } from "https://cdn.jsdelivr.net/gh/calculang/calculang@dev/packages/standalone/index.js"

compilations

const compiled = compilations

const esm = compiled[0]
```


```js
const scrollIntoViewOpts = {behaviour:'smooth', block:'center'}

```



```js
display(html`<style>

/*.vega-embed {
  width: 100%;
  height: 100%;
}*/
  
  .answer {
    color: blue !important;
    font-weight: bold;
    font-size: 1.5em !important;
    left: 80px !important;
    top: 10px;
}
  .answer .tooltiptext  {
    /*border: 2px dashed black;*/
    background: #af5a;
    padding: 10px;
    border-radius: 15px;
  
  }

  .answer .tooltiptext::after {
    /*color: red;*/
    border: none;
  }
  
.answer:hover {
  /*font-size:2em !important;*/
}
  
  body {
  font-family: system-ui;
}

pre {
  line-height: 25px;
}

.calculang_tooltip {
  color: #19f;
  position: relative;

}

.tooltiptext {
  position: absolute;
  bottom: calc(100% - 15px);
  left: anchor(center);
  transform: translateX(-50%);
  width: max-content;
}

.tooltiptext {
  cursor: zoom-in;
}


.calculang_tooltip.answer .tooltiptext {
  bottom: 0;
} 

calculang_tooltip.answer {
    background-color: lightorange;
}


pre {
  cursor:default
}
  </style>
  `)

display(html`<style></style>` ?? html`<style>/* DN DISABLED NAVIGATION STYLES */

.inputs {
  padding: 20px;
}

button.btn {
  background-color: antiquewhite;
  color: blue;
  padding:0;
}

.calculang {
  line-height: 40px;
    -webkit-transition: all 0.2s linear;
    -moz-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;
  
}
div.calculang.cm-line:has(span.calculang_title) {
  margin-top:20px;
}

.calculang.calculang_overwritten { /* not getting picked up ? */
  text-decoration: line-through;
  font-weight: bold;
}

${formulae_hidden.length ? `.calculang {
    background: #aaf3;
}` : ''}


${formulae_hidden.map(d => `.calculang_f_${d} + .calculang_f_${d}`).join(', ')} {
  filter: blur(7px);
  line-height: 5px;
  opacity: 0.5;
} /* + selector to exclude first! https://coderwall.com/p/uugurw/css-selector-trick-select-all-elements-except-the-first */
${formulae_hidden.map(d => `.calculang_f_${d}`).join(', ')} {
  opacity: 0.5;
  background: white;
}${formulae_hidden.map(d => `.calculang_f_${d} .calculang_tooltip`).join(', ')} {
  opacity: 0.1;
  background: white;
}
${formulae_hidden.map(d => `.calculang_f_${d} > .calculang_title`).join(', ')} {
  background-color: lightgreen;
  font-size: 0.5em;
}



.tooltiptext {/* not all tooltiptexts go under a calculang call span! (single-length ones dont) */
  /*color: red;*/
  font-weight: bold;

}

.calculang .calculang_title span {
  padding: 3px;
  background: #af54;
  font-size: 1.5em;
  font-weight: bold;
  border: 1px solid grey;
    -webkit-transition: all 0.2s linear;
    -moz-transition: all 0.2s linear;
    -o-transition: all 0.2s linear;
    transition: all 0.2s linear;

}
</style>
`)
```

<style>
.calculang_overwritten {
  text-decoration: line-through;
  font-weight: normal;
}
.calculang_title span {
  background: lightblue;
  border-bottom: 1px solid blue;
}
.calculang_title.calculang_title_input span {
  background: pink;
  border-bottom: 1px solid hotpink;
}

span.calculang_call { 
  white-space:nowrap;
  /*cursor: zoom-in;*/
  background-color: lightblue;
}

.calculang_call.calculang_call_input {
  /*cursor: none;*/
  background-color: pink;
}

.calculang_call.calculang_call_input .tooltiptext {
  color: #f53 !important;;
}


.calculang_title.calculang_title_renamed {
  text-decoration: line-through;
  text-decoration-style: dashed;
}
</style>

```js
import { SourceMapConsumer } from 'npm:source-map-js';

const map = new SourceMapConsumer(esm.map);

//const esm = compiled[0]


const maps = compiled.map(d => d.map)
const mapsc = maps.map(d => new SourceMapConsumer(d))


//const cul_scope_id = 0
//debugger;
const calls_annotations = 
  calls_fromDefinition(introspection).filter(d => d.reason == 'call' && d.from != '0_undefined')
  .map (d => ({...d, cul_scope_id: +d.from/*from/to are consistent due to bringing everything into common scope*/.split('_')[0]}))
        .map((d) => ({
        ...d,
        mjs_loc: {
          start: mapsc[d.cul_scope_id].generatedPositionFor({
            ...d.loc.start,
            source: maps[d.cul_scope_id].sources[0] //`${only_entrypoint_no_cul_js}-nomemo.cul.js` // todo update !
          }),
          end: mapsc[d.cul_scope_id].generatedPositionFor({
            ...d.loc.end,
            source: maps[d.cul_scope_id].sources[0] //`${only_entrypoint_no_cul_js}-nomemo.cul.js`
          })
        }
      }))
      .map((d) => ({
        ...d,
        mjs: compiled[d.cul_scope_id].code
          .split("\n")
        [d.mjs_loc.start.line - 1].substring(
          d.mjs_loc.start.column,
          d.mjs_loc.end.column
        )
      })) // assuming completely on one line
      .map(d => ({...d, mjs: d.mjs.slice(-1) == ')' ? d.mjs : d.mjs+')'}))/*issue for simple-loan final call for some reason??*/
//       .map(d => {
//         if (!(CONFIG.USE_HIGHLIGHTING || 0)) return d;
//         //return d; I did stop this for some reason? DOESNT WORK FOR LIFE
//   const selection_fn = new Function("model", "{"+Object.keys(cursor).join(",")+"}", `Object.assign(window, model); try { return ({value:${d.mjs}, cursor: ${d.mjs.slice(d.from.length-2)}}) } catch(e) { console.error('trap2', e)}`) // using hacky way to get cursor, for calculang-at-fosdem I used babel: `is` function
//   return {...d, ...selection_fn(model, cursor)} // try important due to cursor often not setup initially (e.g. awaiting)
// })
```

```js

//debugger
const fns_annotations = [...introspection.cul_functions.values()].filter(
        (d) =>
          d.reason == "definition" || d.reason == 'definition (renamed)' /*&&
          d.cul_scope_id == cul_scope_id*/
      )
      .map(d => {
        //if (d.name == 'leftness') debugger;
        //debugger;
        const dd = {...d}
        //debugger;
        dd.inputs = [...introspection.cul_input_map.get(d.cul_scope_id+'_'+d.name)]

        const selection_fn = new Function("model", "{"+dd.inputs.join(",")+"}", `Object.assign(window, model); try { return s${dd.cul_scope_id}_${d.name}({${dd.inputs.join(",")}}) } catch(e) { console.error('trap', e) }`)

        dd.v = selection_fn(model, cursor)

        return dd //return selection_fn(model, c)
      })

window.fns_annotations = fns_annotations;
```

```js



const selection_start = map.generatedPositionFor({...selection.from, source:"unknown"})
const selection_end = map.generatedPositionFor({...selection.to, source:"unknown"})

const esm_split = esm.code.split('\n')
```

```js
const formulae_all = [...introspection.cul_functions.values()].filter(d => d.reason == 'definition').map(d => d.name)

const formulae_hidden = formulae_all.filter((d) => !formulae_visible.includes(d))


```


```js

// todo fmt hints or templates? like a type or unit?
// is this a big bottleneck?
const fmt2 = (name, value) => {
  name = name?.toLowerCase();
  if (name == 'emissions_my_lifetime_proportion') return d3.format(',.2%')(value)
  if (name == 'x' || name == 'y') return d3.format(',.4f')(value)
  if (name == "map") return "[[..]]"
  if (Array.isArray(value)) return "[..]"
  /*if (modelname == 'fizzbuzz') return typeof value == 'number' ? d3.format(',.0f')(value) : value // works well for fizzbuzz
      if (name == 'now' || name == 'date') return d3.timeFormat("%Y-%m-%d")(value)

  if (modelname == 'emissions_my_lifetime') {
    if (name == 'now') return d3.timeFormat("%Y-%m-%d")(value)
    if (name == "emissions_my_lifetime_proportion") return d3.format(".3%")(value)
    if (typeof value == 'number')
    return d3.format(".5k")(value)
  }*/
  if (name == "v") return d3.format(",.5f")(value)
  if (name == "v_pow_term_left") return d3.format(",.5f")(value)
  if (name.includes("_hit_object")) return "{..}"//`{x: ${value.x.toFixed(2)}, y: ${value.y.toFixed(2)}, v: ${value.v}, step_in: ${value.step_in}}`
  if (name.includes("_co")) return d3.format(",.0f")(value)
  if (name.includes("rate") && name.includes("interest")) return d3.format(".3%")(value)
  if (name.includes("rate") || name.includes("percent") || name.includes("fraction")) return d3.format(".2%")(value)
  if ((name.includes("year")) || name.includes("term") || name.includes("duration") || name.includes("frame")) return d3.format(".0f")(value)
  if (name.includes("object") || typeof value != 'number') return JSON.stringify(value)

  return d3.format(fmt_fmt)(value)
}

```

```js
/*cul_scope_id;
console.log('CUL SCOPE ID', cul_scope_id); // 
*/

// DOM not updated at this point in scope change !!
fns_annotations.forEach((d,i) => {
  // error => breaks follow ups
  if (0) { // TEMP Answers instead of tooltips
  if (document.getElementById(d.name)) // TODO replace with fmt2?
  document.getElementById(d.name).innerHTML = JSON.stringify(d.v) /*d3.format(',.2f')(d.v)*/ + "<div class='cm-tooltip-arrow' />"
  }
  else {
    //debugger;
    let e = document.getElementById('a-'+i)
    if (e)
    e.textContent = fmt2(d.name, d.v)//fmt(v);
  }
});
```

```js
window.calls_annotations = calls_annotations;

calls_annotations.forEach((d, i) => {
  // error => breaks follow ups
  if (document.getElementById('w-'+i))
  document.getElementById('w-'+i).textContent = fmt2(d.from.split('_').slice(1).join('_'), d.value)//JSON.stringify(d.v) /*d3.format(',.2f')(d.v)*/ + "<div class='cm-tooltip-arrow' />"
});
```

```js
const cursor = {...cursor0} // TODO add extra when I do reactive

window.cursor = cursor
```

<details style="display: none;opacity:0.3; font-size:0.4em"><summary>opts</summary>

```js
const fmt_fmt = view(Inputs.text({value:",.2f", label: 'fallback format string'}))
const actions = view(Inputs.toggle({label:'vega actions', value: false}))
```

</details>



<style>

  body {margin: 0}

  #tabs-container {
    /*border: 4px dotted rgba(200,0,0,0.2);
    border-radius: 40px;
    background: rgba(0,100,100,0.01);*/
    /*border-right: 5px solid red;*/
    display: flex;
    /*flex-wrap: nowrap;*/
  }

  #tabs-container input[type="radio"] {
    display: none;
  }

  #tabs-container label {
    padding: 8px 12px;
    margin: 2px;
    border: 1px solid gray;
  }

  #tabs-container .tab {
    width: 100%;
    /*background: gray;*/
    /*border: 1px solid grey;*/
    border-top: none;
    order: 0;
    /*display: none;*/ /* OPTIONAL */
  }

  #tabs-container input[type="radio"] + label:hover {
    /*font-size: 1.3em;*/
background: linear-gradient(skyblue, lightgreen);    /*border-radius: 4px;*/
  }


  #tabs-container input[type="radio"] + label {
background: linear-gradient(skyblue, #9198e5);    /*border-radius: 4px;*/
    border-radius: 10px 10px 0 0;
    /*border: 1px solid black;*/
    border-bottom: none;
    /*display:flex;
    flex-direction: column;
    align-items: bottom;*/
    /*margin: auto 0;*/
    align-self: flex-end;
  }
  #tabs-container input[type="radio"]:checked + label {
    font-size: 1.5em;
    background:white;
    padding: 3px 14px;
    border: 2px solid black;
    border-bottom: none;
  }

  #tabs-container input[type="radio"]:checked + label + .tab {
    /*display: block;*/ /* OPTIONAL */
    background: white;
    
  }


</style>

```js
const tabs = true;

display(html`
<style>
${tabs && `#tabs-container input[type="radio"]:checked + label + .tab {
  display: block;
}
#tabs-container .tab {
  display: none;
}
#tabs-container .tab {
  order: 1;
}
#tabs-container {
  flex-wrap: wrap;
}

`}
</style>
`)
```

<style>
          /*.cm-editor { overflow: "auto" }*/



  .cm-changedText {
    /*background: linear-gradient(rgba(200,250,200,0.9), rgba(200,100,200,0.9)) bottom/100% 14px no-repeat !important*/
    background: lightgreen !important;
    color: blue;
    //background: linear-gradient(rgba(2,0,36,0) 0%, rgba(9,9,121,0.5) 35%, rgba(0,212,255,0.1) 100%)
 !important;

  }

  #c {
    /*border: 4px dotted rgba(200,0,0,0.2);
    border-radius: 40px;
    background: rgba(0,100,100,0.01);*/
  }

  #divB .cm-line {
    background-color: rgba(25,20,100,0.04) !important;
  }

  /*.cm-insertedLine > span:not(.cm-changedText) {
  }
  .cm-insertedLine {
    background: rgba(25,20,20,0.1);//opacity: 0.1;
  }
  .cm-line {
    background: rgba(25,20,20,0.1);//opacity: 0.1;
  }*/
</style>

<style>
  /* CODEMIRROR STYLES */
    .cm-changedLineGutter {
    display: none;
  }

  .cm-deletedChunk {
    opacity:0.5;
    display:none;
  }

  #module-relationships {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
   #module-relationships svg {
    border: 0.1px dotted gray;
    padding: 6px;
   }
   #module-relationships svg {
    width: 100px;

   }
</style>


<div class="container">

<div class="box-1">


```js
const cursor0 = Mutable({}) // every input should be in, but with what values?

const setCursor = (k,v) => {
  //if (k == 'ray_angle_in') debugger;
  //if (k == 'keys_stream_function_in') debugger;
  cursor0.value = {...cursor0.value, [k]:v};
}
```


```js
const formula = Mutable("")

const setFormula = (v) => {
  formula.value = v
}
```


```js
import {ab} from './components/editor.js'

const selection = Mutable({from:{line:1,column:1}, to:{line:1,column:2}})


const formulae_visible = Mutable([]); // chg to all ? formulae_all
const hover = Mutable(""); // chg to all ? formulae_all

function set_formulae_visible (d) {
  formulae_visible.value = [...d]
}

function set_hover (d) {
  hover.value = d
}


const x = ab({setModel, setIntrospection, setCompilations,
              set_formulae_visible, set_hover,
              setCursor,
              setFormula})

display(x)
```
```js
import { calcuvizspec, calcudata } from "https://cdn.jsdelivr.net/gh/declann/calculang-js-browser-dev@main/helpers.js"

import {calcuvegadata} from './components/calcuvegadata.js'



```

```js
x.compile();
//await x.setScope(0);
```

```js
const model = Mutable({});
const old_model = Mutable({});

function setModel(v) {
  old_model.value = model.value;
  model.value = v;
}
```

```js
const compilations = Mutable([]);

function setCompilations(v) {
  compilations.value = [...v];
}
```

```js
const introspection = Mutable({});

function setIntrospection(v) {
  introspection.value = v;
}
```

```js
echos;

// wrap echoed source code by details tag
// this causes problems in FF mobile??
/*document.querySelectorAll('.observablehq-pre-container:has(> pre[data-language="js"])').forEach(el => {
  // no echos on dev server:
  if (window.location.origin.includes('127.0.0.1')) {
    el.remove();
    return;
  }
  let wrapper = document.createElement('details');
  wrapper.className = 'code'
  let summary = document.createElement('summary')
  summary.textContent = "code 👀"
  wrapper.appendChild(summary)
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
});*/
```

</div>

<div class="box-2" id ="aa">

```js

// these need more thought in a modular world
// or i am overthinking it
const inputs = [...introspection.cul_functions.values()].filter(d => d.reason == 'input definition' /* Breaks show demand curve && d.cul_scope_id == 0*/).map(d => d.name).sort()

//display(Object.values(introspection.cul_functions))
//display([...introspection.cul_functions.values()])

const formulae = [...introspection.cul_functions.values()].filter(d => d.reason == 'definition').map(d => d.name)


const formulae_not_inputs = [...introspection.cul_functions.values()].filter(d => d.reason == 'definition' && inputs.indexOf(d.name+'_in') == -1).map(d => d.name)
//display(formulae_not_inputs)



```