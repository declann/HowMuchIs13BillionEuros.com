---
title: How much is 13 billion euros? Scrubbable experiment
toc: false
sidebar: false
#theme: [air, wide]
---


```js
function draggable_input({input, value=13, step=1}) {
  const ff = input.slice(0,-3)
  const el = document.createElement('span')
  el.type = "number"
  el.value = value
  el.dataset.value = value
  el.textContent = fmt(ff, value)
  el.pattern = "[0-9]+"
  el.classList.add('input-scrubbable-number')
  el.classList.add('f')
  el.classList.add('input')
  el.classList.add(ff)
  el.oninput = (e) => {
    //setCursor(f, input.valueAsNumber)
    set(+el.dataset.value)
    console.log(e)
  }

  function set(v) {
    //debugger
    ///setCursor(f, v)
    value = v
  }

  let state = {
    eventToCoordinates(event) { return {x: event.clientX, y: event.clientY}; },
    dragging: null,
    get pos() {debugger
        return {x: /*el.dataset.value*/window.cursor[input]/* this covers when an input appears twice: dont reset when the dragged one is switched *//step ?? 0, y: 0};
    },
    set pos(p) { 
        // This is a constrained drag that ignores the
        // y value. The x value gets turned into the
        // number.
        //el.value = el.valueAsNumber = Math.round(clamp(p.x, 0, 1000));
        el.dataset.value = /*Math.round(*//*p.dx*step+p.oldx*/Math.max(p.x*step,0)//)//Math.round(clamp(p.x, 0, 1000));
        el.textContent = fmt(ff, el.dataset.value)
    },
  }
  makeDraggable(state, el, step, input);


  return Object.defineProperty(el, "value", {get: () => value, set});
}

function clamp(x, lo, hi) { return x < lo ? lo : x > hi ? hi : x; }

function makeDraggable(state, el, step, input) {
    // from https://www.redblobgames.com/making-of/draggable/
    function start(event) {
        if (event.button !== 0) return; // left button only
        let {x, y} = state.eventToCoordinates(event);
        state.dragging = {dx: state.pos.x - x, dy: state.pos.y - y};
        el.setPointerCapture(event.pointerId);
    }

    function end(_event) {
        state.dragging = null;
    }

    function move(event) {
        if (!state.dragging) return;
        let {x, y} = state.eventToCoordinates(event);
        state.pos = {x: x + state.dragging.dx, y: y + state.dragging.dy, dx: state.dragging.dx, oldx:x, state};
        setCursor(input, +el.dataset.value)
    }

    el.addEventListener('pointerdown', start);
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
    el.addEventListener('pointermove', move)
    el.addEventListener('touchstart', (e) => e.preventDefault());
}
```

<!-- I like Framework for the next calculang gallery because reactivity and Markdown for the applications should be nice for contributions  -->
<!-- But for certain things: such as here, I hack my own reactivity and custom dom changes: see `fns_annotations`. -->
<!-- and stray a bit from convenient Markdown -->
<!-- Here it's because I want to be able to highlight numbers that change but I don't want to highlight every number when the model changes, only those that moved (in top-level Framework reactive variable terms when `model` changes all calls to it do too) -->
<!-- I need to review this - I might be missing a trick? -->

<!-- @include: /home/declan/repos/howmuchis13billioneuros.com/src/TEMPLATE_metal_open.md -->



<div style="padding:10px; background: aliceblue; border: 1px solid black; border-radius: 20px; margin: 10px; max-width: unset" id="main">

```js

/*document.querySelectorAll('.tablet_cost').forEach(d => {
  d.textContent = model.tablet_cost(cursor) + Math.random()
  })*/
fns_annotations.forEach(d => {
  document.querySelectorAll('.'+d.name).forEach(e => {
    //if (e.textContent != fmt(d.name, d.v)) { // LOST PRECISION for this comparison.....
    if (e.dataset.v != d.v) { // bad comparison?
      e.classList.remove('introduce')
      e.focus()
      e.textContent = fmt(d.name,d.v)
      e.dataset.v = d.v
      e.value = d.v
      e.classList.add('introduce')
    }
  })
});

```

```js

function fmt(formula, v) {
  if (formula == 'tablet_cost') return '€ ' + d3.format(',.0f')(v);
  if (formula == 'tablets_per_person') return d3.format(',.1f')(v);
  if (formula == 'tablets_per_primary_pupil') return d3.format(',.1f')(v);
  if (formula == 'one_off_gift_cost') return '€ ' + d3.format(',.0f')(v);
  if (formula == 'one_off_gifts_per_person') return d3.format(',.2f')(v);
  if (formula == 'oasis_tickets_cost') return '€ ' + d3.format(',.0f')(v);

  if (formula == 'oasis_tickets_per_person') return d3.format(',.1f')(v);
  if (formula == 'oasis_gigs') return d3.format(',.0f')(v)
  if (formula == 'croke_park_capacity') return d3.format(',.3s')(v);
  if (formula == 'bike_shed_cost') return '€ ' + d3.format(',.3s')(v);
  if (formula == 'bike_sheds') return d3.format(',.0f')(v);
  if (formula == 'national_childrens_hospital_cost') return '€ ' + d3.format(',.2f')(v/1_000_000_000) + 'Bn';
  if (formula == 'national_childrens_hospitals') return d3.format(',.1f')(v);
  if (formula == 'special_needs_assistant_cost') return '€ ' + d3.format(',.0f')(v);
  if (formula == 'special_needs_assistants_years') return d3.format(',.0f')(v);

  if (formula == 'heat_pump_grant_cost') return '€ ' + d3.format(',.0f')(v);
  if (formula == 'heat_pump_grants') return d3.format(',.3s')(v);
  if (formula == 'house_cost') return '€ ' + d3.format(',.3s')(v);
  if (formula == 'houses') return d3.format(',.0f')(v);

  if (formula == 'house_occupants') return d3.format(',.2f')(v);
  if (formula == 'house_pc') return d3.format('.2%')(v);
  if (formula == 'amount_over_tax_revenue_2023') return d3.format('.1%')(v);
  if (formula == 'amount_over_total_expenditure_2023') return d3.format('.1%')(v);
  if (formula == 'tax_revenue_2023') return '€ ' + d3.format(',.2f')(v/1_000_000_000) + 'Bn';
  if (formula == 'total_expenditure_2023') return '€ ' + d3.format(',.2f')(v/1_000_000_000) + 'Bn';
  if (formula == 'national_debt') return '€ ' + d3.format(',.2f')(v/1_000_000_000) + 'Bn';
  if (formula == 'amount_over_national_debt') return d3.format('.1%')(v);

  if (formula == 'population') return d3.format(',.3s')(v);

  if (formula == 'bike_shed_bikes') return d3.format(',.0f')(v);
  if (formula == 'bikes_per_bike_shed') return d3.format(',.1f')(v);


  //if (formula == 'amount') return '€ ' + Math.round(v*100/1_000_000_000)/100 + 'Bn';
  if (formula == 'amount') return '€ ' + d3.format(',.2f')(v/1_000_000_000) + 'Bn';

  else return v
}
```

<style>
@keyframes fadeIn {
  0% { opacity: 0.5;background: #39ff14; }
  50% { background: #39ff14; opacity: 1; }
  80% { } /*dark theme should be black, but minor*/
  100% { opacity: 0.8; background:aliceblue /* not transparent, so borders never overlap */ }
}

.introduce {
  animation: fadeIn ease 2s;
  animation-fill-mode: forwards;  
}

.input {
  background: steelblue !important;
  color: white;
}

.f {
  font-weight: bold;
  border: 1px solid lightgrey;
  padding: 4px;
  border-radius:5px;
  /*overflow-wrap: break-word*/
  text-wrap: nowrap;
  }
</style>


```js
// for default values sync here with draggable_input calls (drag uses that value)
setCursor('amount_in', 13_000_000_000);
setCursor('tablet_cost_in', 900);
setCursor('one_off_gift_cost_in', 2000);
setCursor('oasis_tickets_cost_in', 347);
setCursor('bike_shed_cost_in', 336000);
setCursor('croke_park_capacity_in', 82300);
setCursor('bikes_per_bike_shed_in', 18);
setCursor('national_childrens_hospital_cost_in', 2_240_000_000);
setCursor('special_needs_assistant_cost_in', 34472);
setCursor('heat_pump_grant_cost_in', 6500);
setCursor('house_cost_in', 300000);
setCursor('house_occupants_in', 2.74);
setCursor('primary_school_enrolments_in', 558_143);
setCursor('population_in',5_149_139)
```

<style>
.amount-option {
  border-bottom: 2px dotted orange;
  border-bottom-style: dotted;
  padding: 0 0.2em;
  font-style: italic;
  text-wrap: nowrap;
  color: #0a008b;
  cursor: pointer;
}
.selected-amount-option {
    border-bottom: 3px dotted orange;
  border-bottom-style: dotted;

  font-weight: bold;
}
</style>

```js
const option = Mutable(13)
function setOption(v) {
  option.value = v
}
```

```js
html`There's been a <strong><a href="https://duckduckgo.com/?t=h_&q=apple+tax+ireland&iar=news&ia=news">a lot of chatter</a></strong> in the Irish news about <a onclick=${() => {setCursor('amount_in', 1.3e10); setOption(13)}}><span class="amount-option ${Math.abs(cursor.amount_in-1.3e10)<1?"selected-amount-option" : ""}">13 Billion euros</span></a> or <a onclick=${() => {setCursor('amount_in', 1.4e10); setOption(14)}}><span class="amount-option ${Math.abs(cursor.amount_in-1.4e10)<1?"selected-amount-option" : ""}">14 Billion euros</span></a>.`
```


<span style="padding:1px;font-style:italic; margin-bottom:1em; /*background: lightgreen*/ font-weight:bold;">But how much is ${draggable_input({input:'amount_in', value: 13_000_000_000, step:10_000_000})} ?</span> 🤯


<p style="line-height:1em; border: 1px solid lightgrey; padding:3px; background: lightyellow; display:inline-block">
<span style="font-size:0.8em">Check my <i><a href="https://en.wikipedia.org/wiki/Back-of-the-envelope_calculation">back of the envelope calculations</a></i> and - if you want to - <strong>make them your own</strong> by dragging <span class="input f" style="padding:0px; opacity:0.8; font-style:italic">numbers ↔️</span></span>
</p>



<!--<h4 style="font-style:italic;  margin-bottom:1em;">${fmt('amount',cursor.amount_in)} is...</h4>-->

<style>
.input-scrubbable-number {
  text-wrap: nowrap;
  position: relative;
  z-index:10;
    /*font-size: 125%;
    width: 3em;
    border: none;
    border-bottom: 1px dashed hsl(0 50% 45%);
    border-radius: 4px;*/
    /*background: hsl(0 50% 50%);*/
    /*color: white;*/
    /*text-align: center;*/
    cursor: ew-resize;
    user-select: none;
}
</style>



<style>
ul {
  margin-bottom: 1.5em;
}

ul > li > ul {
  margin-top: 0.2em;
}

p, li, ul {
  max-width: unset !important;
}

  ul {
  list-style-type: none;
}
</style>

<div style="margin-left:7px;">

In ${draggable_input({input:'national_childrens_hospital_cost_in', value: 2_240_000_000, step:20000000})} [National Childrens Hospitals](https://www.irishtimes.com/health/2024/02/13/national-childrens-hospital-cost-rises-to-over-2bn-donnelly-confirms/)❓
  - <span class="f national_childrens_hospitals"></span> National Childrens Hospitals ${model.national_childrens_hospitals(cursor) ==Infinity ? "" : new Array(Math.floor(model.national_childrens_hospitals(cursor)) + 1).join("🏥")}👧🏻

In ${draggable_input({input:'bike_shed_cost_in', value: 336000, step:2000})} [bike sheds](https://www.irishtimes.com/life-style/2024/09/06/its-not-even-a-shed-a-summary-of-the-leinster-house-bike-shelter-controversy/)❓
  - <span class="f bike_sheds"></span> bike sheds 🚴<div style="height:0.5em" />
  - Using ${draggable_input({input:'bikes_per_bike_shed_in', value: 18, step:.1})}x 🚴 per shed, these can store <span class="f bike_shed_bikes"></span> bikes 🚴

In ${draggable_input({input:'one_off_gift_cost_in', value:2000, step:6})} one-off gifts❓
  - <span class="f one_off_gifts_per_person"></span>x ${draggable_input({input:'one_off_gift_cost_in', value:2000, step:3})} gifts for each person in Ireland 🎁

In ${draggable_input({input:'house_cost_in', value: 300000, step:1000})} houses❓
  - Fully funded: <span class="f houses"></span> of them 🏡<div style="height:0.5em" />
  - Using an average occupancy of ${draggable_input({input:'house_occupants_in', value: 2.74, step:.01})} people: enough on it's own to house <span class="f house_pc"></span> of a ${draggable_input({input:'population_in', value: 5_149_139, step:10000})} population

In ${draggable_input({input:'oasis_tickets_cost_in', value: 347, step:1})} [Oasis tickets](https://duckduckgo.com/?q=oasis+tickets+croke+park&t=h_&iar=news&ia=news)❓
  - <span class="f oasis_tickets_per_person"></span> tickets each for every person in Ireland! 💃${model.oasis_tickets_per_person(cursor) == Infinity ? "" : new Array(Math.floor(model.oasis_tickets_per_person(cursor)) + 1).join("🎟️")}🕺<div style="height:0.5em" />
  - Oasis might need to play <span class="f oasis_gigs"></span> gigs together in [Croke Park](https://crokepark.ie/stadium/about) at ${draggable_input({input:'croke_park_capacity_in', value: 82300, step:100})} capacity, to honor this volume of tickets 🎶🧑‍🤝‍🧑🎶

<!--In Special Needs Assistants at a salary of ${draggable_input({input:'special_needs_assistant_cost_in', value: 34472, step:100})} pa❓
  - <span class="f special_needs_assistants_years"></span> years of salary at this rate ✨-->

In ${draggable_input({input:'heat_pump_grant_cost_in', value: 6500, step:50})} heat pump grants❓
  - <span class="f heat_pump_grants"></span>x ${draggable_input({input:'heat_pump_grant_cost_in', value: 6500, step:100})} heat pump grants 🔥

</div>

<span style="font-style:italic; margin: 0 0; margin-bottom:1em;">It's a <u>lot</u> of money! 💰</span>

But **for other context**, ${draggable_input({input:'amount_in', value: 13_000_000_000, step:10_000_000})} is <span class="f amount_over_total_expenditure_2023"></span> of Ireland's <span class="f total_expenditure_2023"></span> [total expenditure in 2023](https://whereyourmoneygoes.gov.ie/en/2023/), and <span class="f amount_over_national_debt"></span> of Ireland's <span class="f national_debt"></span> national debt. <!-- I want to include this link https://www.ntma.ie/business-areas/funding-and-debt-management/statistics but you need to download or link to the spreadsheet for the National Debt figure I am using and not Gross, so I won't do that in my html. -->

🤷

</div>

<style>
#calculang-info {
  background: lightyellow;
  margin: 50px;
  padding: 0 1em;
  border: 4px dashed lightgreen;
  font-size: 0.8em;
  border-radius: 20px;
  text-align: justify;
  text-justify: inter-word;
}
#calculang-info > #end {
  font-style: italic;
}
</style>

<div id="calculang-info">

<p>These <a href="https://en.wikipedia.org/wiki/Back-of-the-envelope_calculation"><i>back-of-the-envelope calculations</i></a> are made using <a href="https://calculang.dev">calculang</a>: a language for calculations for <i>structure, flexibility and communication</i> about numbers.</p>

You can check (and change!) their formulas under the tab for '💬' (top left)


<p><strong>"Scrubbable numbers"</strong> as an interaction technique for models - inside narrative text, is something first championed by <a href="https://worrydream.com/">Bret Victor</a>. I recommend reading the <a href="https://worrydream.com/ClimateChange/#media-debate">Model-driven debate</a> section of his <a href="https://worrydream.com/ClimateChange/">climate essay</a>.</p>

<p><i>This was a little, hurried exercise by <a href="https://calcwithdec.dev/about">Declan</a>.</i> <strong>Please don't use these numbers for decision making</strong> ⚠️</p>

<a href="https://github.com/declann/howmuchis13billioneuros.com"><img width="25px" height="25px" src="./brand-git.png" /></a> <a style="margin-left:12px; border:1px solid lightblue; background: aliceblue; border-radius:2px; padding: 4px" href="https://calcwithdec.dev">CalcWithDec.dev</a>


</div>


```js
await x.setFS({
  "entry.cul.js": await FileAttachment('./cul/how-much-scrubbable.cul.js').text()
});
```

```js
const echos = [] // this is used to prevent echoed code blocks from appearing when they are changed during development
```


```js
/*(new ResizeObserver(entries => {
  //debugger
      const contentBoxSize = entries[0].contentBoxSize[0];
      document.getElementById('ans').style.width = contentBoxSize.inlineSize-10+'px'
      //document.getElementById('ans').style.height = ''//contentBoxSize.blockSize-10+'px'
            //document.getElementById('ans').textContent = contentBoxSize.inlineSize
})).observe(document.getElementById('aa'));*/
```


<!-- @include: /home/declan/repos/howmuchis13billioneuros.com/src/TEMPLATE_metal_close.md -->

