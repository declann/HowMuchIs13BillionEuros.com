// AGPL DN

import { MergeView, unifiedMergeView, updateOriginalDoc, originalDocChangeEffect, getOriginalDoc } from "@codemirror/merge"
import { EditorView  } from 'codemirror'
import { EditorView as  EditorView_old } from 'codemirror' // needed for merge view ?!
//import { basicSetup } from "codemirror"
import { basicSetup } from "codemirror"
import { ViewPlugin, Decoration, WidgetType } from '@codemirror/view';

import { EditorState } from "@codemirror/state"
import { linter, lintGutter } from "@codemirror/lint"
import { ChangeSet } from "@codemirror/state"

import { Text } from "@codemirror/state"

import * as eslint from "eslint-linter-browserify";
import { javascript, esLint, javascriptLanguage } from "@codemirror/lang-javascript";
import { foldGutter, indentOnInput, syntaxHighlighting, defaultHighlightStyle, bracketMatching, foldKeymap, syntaxTree, foldAll } from '@codemirror/language';
import globals from "globals";

import { introspection as getIntrospection, compile_new, bundleIntoOne, packageCalculang_new, calls_fromDefinition } from "https://cdn.jsdelivr.net/gh/declann/calculang-js-browser-dev@55c8ed1/calculang.js"

import { instance } from "@viz-js/viz";
import {html} from "htl";

import snippetbuilder from 'codemirror-6-snippetbuilder';

import jssnippetarray from './snippetarray.js'

// Alt? import {Inspector} from "observablehq:runtime";
// https://github.com/observablehq/framework/blob/main/src/client/inspect.js#L3
import { Inspector } from "@observablehq/inspector"

import { range } from 'underscore'




const lintConfig = ({
  // 'config' in editor.mjs: direct copy
  // eslint configuration
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2022, // ?  2022 here: https://github.com/UziTech/eslint-linter-browserify/blob/4844787ed5fe4f9173fc694d7df9bc161b15fb46/example/script.js
      sourceType: "module"
    },
    /*env: {
      // ?
      browser: true,
      node: true
    },*/
    globals: { ...globals.node }
  },
  rules: {
    //semi: ["warn", "always"],
    //"no-undef": ["error", "never"], // this is a key rule for calculang, but is easier to use on JS (because of intentional undefined inputs in _in convention)
    "func-style": ["error", "expression"],
    "consistent-return": ["error"], // not as good as forcing a return ..
    // no-unused-expressions works in some cases but not others?
    // bug whenever a = () => {b()}, but b()*3 works
    "no-unused-expressions": ["error"], // doesn't catch when there are calls because doesn't know about purity ..
    "prefer-const": "warn",
    "no-restricted-syntax": [
      // docs https://eslint.org/docs/latest/rules/no-restricted-syntax
      "error",
      {
        message: "calculang: don't pollute the _ namespace",
        selector:
          "ImportDeclaration[source.value=/cul_scope_/] > ImportSpecifier[local.name=/_$/]"
        // converted to esm => match cul_scope_x rather than .cul
      } // test with import {create as confetti_} from "https://cdn.jsdelivr.net/npm/canvas-confetti/+esm?cul_scope_id=3";
    ]

  }
  // "extends": "eslint:recommended" not working; not sure I want
})


let doc = `
// FizzBuzz https://calculang.dev/examples-viewer?id=fizzbuzz

export const fizz = () => (i() % 3 == 0 ? 'Fizz' : '');
export const buzz = () => (i() % 5 == 0 ? 'Buzz' : '');

export const fizzbuzz = () => {
  if (fizz() + buzz() != '')
    return fizz() + buzz();
  return i();
};

//export const two_times_fizzbuzz = () => 2 * fizzbuzz();

// is is an input (by convention):
export const i = () => i_in;

// change i to a value, like 12
// then change it back
// This is input inference working!

// Also infers when an input is SUMMARISED: (notice _in syntax)

//export const fizzbuzz_10 = () => fizzbuzz({ i_in : 10 });
// \`fizzbuzz\` depends on i_in, but \`fizzbuzz_10\` is independent of i_in

// another example of recursive formulas:
// (memoization is a singular provided optimisation)

// export const year = () => year_in;

/*export const balance = () => {
  if (year() < 0) return 0;
  return balance({ year_in: year() - 1 }) + 100;  
};*/

// interesting to compare these formulas to formulas written in spreadsheets!

// Input inference helps us to write more concise, meaningful
// pure-functional calculations

// Concise is nice!
// But conciseness is not the purpose...

// (flexibility, reusability ♻️ is)

// to appreciate this, we need to look at modularity
`

let inhibit = false


const readonly = false;
const decorations = true;



// from calculang-at-fosdem

//////////// plugin 1: decoration & cul navigation for function-level

const formulaDecorations =
  (div, set_formulae_visible) => {
    //set(options.formulae_visible, [""]) // this was doing a lot of jank!!
    const formulaDecorations = ViewPlugin.fromClass(
      class {

        constructor(view) {
          this.decorations = formulaDecoration(div, view);
        }

        update(update) {
          if (update.docChanged || update.viewportChanged)
            this.decorations = formulaDecoration(div, update.view);
        }
      },
      {
        decorations: (v) => v.decorations,

        eventHandlers: {
          mousedown: (e, view) => { // HMMM I'll need to resolve that calls get precedence!!! Should be working:
            let classList = [...e.target.classList, ...e.target.parentElement.classList] // very open, be aware of bugs ?!
            if (e.target.classList.contains("cul_call")) // TODO
              1;//set(viewof formulae_shown, [target.textContent]); TODO
            else if (
              //e.target.classList.contains("deposits") ||
              //e.target.parentElement.classList.contains("deposits")
              classList.filter(d => d.includes("calculang_f_")).length
            )
              /////// at-fosdem: set(options.formulae_visible, [classList.find(d => d.includes("calculang_f_")).slice("calculang_f_".length)]);
              //debugger;
              // mitigate overlapping event fires (call and formula)
              if (classList.includes('calculang_call') || classList.includes('calculang_tooltip') || classList.includes('tooltiptext')) return;
              else set_formulae_visible([classList.find(d => d.includes("calculang_f_")).slice("calculang_f_".length)])
              // May 2024: maybe jitter below is/was due to overlapping event fires?
              /////// causes unnecessary jitter when we already see f document.querySelector('.'+classList.find(d => d.includes("calculang_f_"))).scrollIntoView(scrollIntoViewOpts)
              //trying it 
              //document.querySelector('.'+classList.find(d => d.includes("calculang_f_"))).scrollIntoView(scrollIntoViewOpts)


          }
        }
      }
    );

    return [formulaDecorations];
  }


// Decoration.lines
const formulaDecoration = (div, view) => {
  if (div.introspection.cul_functions == undefined) return Decoration.set([]);

  return Decoration.set(
  //formula_line_details
  //const formula_line_details =
  /////Object.values(/*calculang_source_*/introspection.cul_functions)
  [...div.introspection.cul_functions.values()]
  .filter((d) => d.reason.includes("definition") && d.name.slice(-3) != '_in' && d.cul_scope_id == div.scope)
  .map(({ name, loc, reason }) => ({
    name,
    lineStart: loc?.start.line,
    lineEnd: loc?.end.line,
    overwritten/*AND not imported => strikethrough*/: name.slice(-1) == '_' && !(/*calculang_source_*/[...introspection.cul_functions.values()].filter(d => d.imported == name && d.cul_source_scope_id == div.scope)).length // and not explicit imported/used in parent defn
  }))
    .map((d) =>
      range(d.lineStart, d.lineEnd + 0.1).map((e) =>
        Decoration.line({
          attributes: {
            class: "calculang" + " " + "calculang_f_"+d.name + (d.overwritten ? ' calculang_overwritten' : '') /* +style available */ // leaving scope and other potential conflicts out
          }
        }).range(view.state.doc.line(e).from)
      )
    )
    .flat())}


// C&Ped above
// const formula_line_details = Object.values(/*calculang_source_*/introspection.cul_functions)
//   .filter((d) => d.reason.includes("definition") && d.name.slice(-3) != '_in' && d.cul_scope_id == cul_scope_id)
//   .map(({ name, loc, reason }) => ({
//     name,
//     lineStart: loc?.start.line,
//     lineEnd: loc?.end.line,
//     overwritten: name.slice(-1) == '_' && !(Object.values(/*calculang_source_*/introspection.cul_functions).filter(d => d.imported == name && d.cul_source_scope_id == cul_scope_id)).length // and not explicit imported/used in parent defn
//   }))

// const formula_line_details_0 = Object.values(/*calculang_source_*/introspection.cul_functions)
//   .filter((d) => d.reason.includes("definition") && d.name.slice(-3) != '_in' && d.cul_scope_id == 0)
//   .map(({ name, loc, reason }) => ({
//     name,
//     lineStart: loc?.start.line,
//     lineEnd: loc?.end.line,
//     overwritten: name.slice(-1) == '_' && !(Object.values(/*calculang_source_*/introspection.cul_functions).filter(d => d.imported == name)).length // and not explicit imported/used in parent defn
//   }))



// from calculang-at-fosdem
///////////////////////////
let calculang_identifier_decorations = (set_formulae_visible, set_hover, div) => {
  return ViewPlugin.fromClass(class {
    constructor(view) {
      //introspection = introspection2(view.state.doc.toString())
      //introspection = await getIntrospection("entrypoint.cul.js", div.fs)
      
      this.decorations = identifier_decorations(view, div);
    }

    async update(u) {
      div.fs = ({...div.fs, [div.filename]: u.state.doc.toString() })
      console.log('calculang_identifier_decorations UPDATE HAPPENED')
      let introspection_new
      try { // without a try inevitable errors break plugin (though should be off when not readonly !)
        // TODO wrap in readonly
        introspection_new = await getIntrospection("entry.cul.js", div.fs)
        //introspection_new = introspection2(u.state.doc.toString())
        //console.log('TTT', introspection2(u.state.doc.toString()))
      } catch (e) { introspection_new = introspection }
      div.introspection = introspection_new
      if (1 || u.docChanged || u.viewportChanged) // I need to capture fold changes too !
        this.decorations = identifier_decorations(u.view, div);
      /*if (1 || update.docChanged) {
        this.decorations = identifier_decorations(view);
        this.dom.textContent = update.state.doc.length
      }*/
    }

    destroy() { this.dom.remove() }
  },
    {
      decorations: (v) => v.decorations,



      eventHandlers: {
        mousemove: (e, view) => {
          let classList = [...e.target.classList, ...e.target.parentElement.classList] // very open, be aware of bugs ?!
                      let c = classList.filter(d => d.includes("calculang_call_"))
          let cc= 'badvalue';
          if (c.length) cc = c[0].slice("calculang_call_".length)

          if (e.target.classList.contains("calculang_call") || classList.includes("calculang_title")) { // TODO only if the containing formula is visible, I have options.formulae_visible:
          //console.log('HIHIHIEE')
          //debugger;
            //set(viewof hover, cc) // too many triggers !
            set_hover(cc)
            
          }
        },
        mousedown: (e, view) => {
          let classList = [...e.target.classList, ...e.target.parentElement.classList] // very open, be aware of bugs ?!
                      let c = classList.filter(d => d.includes("calculang_call_") && d != "calculang_call_input")
          let cc= 'badvalue';
          if (c.length) cc = c[0].slice("calculang_call_".length)

          if (e.target.classList.contains("calculang_call") || classList.includes("calculang_title")) { // TODO only if the containing formula is visible, I have options.formulae_visible:
          //console.log('HIHIHIEE')
          //debugger;
            //set(options.formulae_visible, [cc])
            //debugger;
            set_formulae_visible([cc])
            document.querySelector('.calculang_f_'+cc).scrollIntoView(scrollIntoViewOpts)
          }

          else if (
            //e.target.classList.contains("deposits") ||
            //e.target.parentElement.classList.contains("deposits")
            classList.filter(d => d.includes("calculang_f_")).length
          ) { // this is setting when you click in the area of a formula - no need to scroll
            //set(options.formulae_visible, [classList.find(d => d.includes("calculang_f_")).slice("calculang_f_".length)]);
            set_formulae_visible([classList.find(d => d.includes("calculang_f_")).slice("calculang_f_".length)]);
            //document.querySelector('.'+classList.find(d => d.includes("calculang_f_"))).scrollIntoView(scrollIntoViewOpts)
          }
        }
      }


      
    }
  )
}

let formulae_all

// Decoration.marks specified by ranges
const identifier_decorations = (view,div) => {
  if (div.introspection.cul_functions == undefined) return Decoration.set([]);
  let decorations = [];
  //introspection = introspection2(view.state.doc.toString())
  const inputs = [...div.introspection.cul_functions.values()].filter(d => d.reason == 'input definition').map(d => d.name).sort()
  try {
    formulae_all = [...div.introspection.cul_functions.values()].filter(d => d.reason == 'definition' && inputs.indexOf(d.name/*+'_in'*/) == -1).map(d => d.name)//["line", "result", "wave","semi_circle", "x", "n", "radius"]
  } catch (e) { }

  //for (let { from, to } of view.visibleRanges) {
  console.log(view.state)
  console.log(view.visibleRanges)
  //for (let { from, to } of [{from: 0, to: 1000}]) {
  //debugger;
  //debugger;
  for (let { from, to } of view.visibleRanges) {
    //for (let { from, to } of [{from:0, to:5000}]) {
    //cmImports.language.syntaxTreeAvailable(view.state, )
    //cmImports.language.forceParsing(view, )

    syntaxTree(view.state).iterate({
      from,
      to,
      enter: (node) => {
        if (node.name == "VariableDefinition") {
          let name = view.state.doc.sliceString(node.from, node.to);
          if (formulae_all.includes(name)) {
            //debugger
            decorations.push(
              Decoration.mark({ class: "calculang_title" + (inputs.includes(name + "_in") ? " calculang_title_input" : "") }).range(
                node.from,
                node.to
              )
            );
          }
          if (formulae_all.includes(name + '_')) {
            decorations.push(
              Decoration.mark({ class: "calculang_title calculang_title_renamed" }).range(
                node.from,
                node.to
              )
            );
          }
        }

        if (node.name == "VariableName") {
          let name = view.state.doc.sliceString(node.from, node.to);
          if (formulae_all.includes(name)) {
            if (inputs.includes(name + "_in"))
              decorations.push(
                Decoration.mark({ class: `calculang_call calculang_call_input calculang_call_${name}` }).range(
                  node.from,
                  node.to
                )
              );
            else
              decorations.push(
                Decoration.mark({ class: `calculang_call calculang_call_${name}` }).range(node.from, node.to)
              );
          }
        }
      }
    });
  }
  return Decoration.set(decorations);
}
///////////////////////////


////////// from -fosdem



// ex- calls_with_mjs, relates to that in generator
//calls = calculang_source_introspection.cul_links
  //.filter(d => !d.from.includes('undefined')).filter((d) => d.reason == "call" && cul_scope_id == +d.to.split("_")[0]) // bugs for double digit scopes


// ex CheckboxWidget
class AnswersWorkingsOverlayWidget extends WidgetType {
  constructor(div, v, call, call_i, type, set_formulae_visible, setCursor, setFormula) {
    //a = v;
    super();
    this.div = div;
    this.v = v;
    this.call = call;
    this.call_i = call_i;
    this.type = type;
    this.set_formulae_visible = set_formulae_visible;
    this.setCursor = setCursor;
    this.setFormula = setFormula;
    //this.evals = type == "definition" ? mjs_q_eval : fns_with_mjs_q_eval;
    //this.info = type == "definition" ? fns_with_mjs : calls_with_mjs_qualified;
  }

  toDOM() {
    // mjs_q_eval; use this to test flicker/parse issues for plugins setting values (now set setparately by DOM calls)
    let wrap = document.createElement("span");
    //wrap.className = "tooltip";
    //wrap.textContent = "101.19";
    wrap.setAttribute("aria-hidden", "true"); // not in a good place, todo fix
    wrap.className = "calculang_tooltip";
    if (this.type == "definition") {
      // ex-99999 todo calculate here Also instead? and do same in reaction to inputs?
      return html`<span class="calculang_tooltip answer" id="c-a-${this.v}"><!--<input type="checkbox"></input>--><span id="a-${this.v}" class="tooltiptext" anchor="c-a-${this.v}">${/*fmt2*/ /* TODO bring fmt fn in */(window.fns_annotations[this.v].v)/*fmt2(
        window.fns_with_mjs_q_eval[modelname][cul_scope_id][this.v].name, window.fns_with_mjs_q_eval[modelname][cul_scope_id][this.v].value//999
      )*/}</span></span>`;
    }
    return html`<span onclick=${() => {
      this.div.setScope(+window.calls_annotations[this.v].fromDefinition.split('_')[0])
      this.setFormula(window.calls_annotations[this.v].fromDefinition.split('_').slice(1).join('_'))
      this.set_formulae_visible([window.calls_annotations[this.v].from.split('_').slice(1).join('_')])
      document.querySelector('.calculang_f_'+window.calls_annotations[this.v].fromDefinition.split('_').slice(1).join('_')).scrollIntoView(scrollIntoViewOpts)
      //console.log(window.calls_annotations[this.v])
      //console.log(this.set_formulae_visible, this.setCursor)
      Object.entries(window.calls_annotations[this.v].cursor).forEach(([k,v]) => {
        this.setCursor(k, v)
      })
      // ex click handler
      /* TODO*/ //set(viewof formulae_visible, [ // I'm supposed to use options.formulae_visible !!
        //calls[this.v].from.slice(2)
      //]);
      //document.querySelector('.calculang_f_'+calls[this.v].from.slice(2)/*BUG for >9 scopes!*/).scrollIntoView(scrollIntoViewOpts)
      //if (window.mjs_q_eval[modelname][cul_scope_id][this.v].handler) window.mjs_q_eval[modelname][cul_scope_id][this.v].handler();

    }} class="calculang_tooltip" id="c-w-${this.call_i}"><!--&nbsp;<input type="checkbox"></input>--><span id="w-${this.call_i}" class="tooltiptext" anchor="c-w-${this.call_i}">${'⌛'/*fmt2( window.mjs_q_eval[modelname][cul_scope_id][this.call_i].name,
     window.mjs_q_eval[modelname][cul_scope_id][this.call_i].value
    )*/}</span></span>`;
    return wrap;
  }

  ignoreEvent() {
    return false;
  }
}

function workings(div, view, set_formulae_visible, setCursor, setFormula) {
  if (div.introspection.cul_functions == undefined) return Decoration.set([]);
  //debugger;
  return Decoration.set(
    [
      ...[...div.introspection.cul_links.values()] // maintain consistent order with calls_annotations, small inconsistency now x_indefined ?
      .filter(d => !d.from.includes('undefined')).filter((d) => d.reason == "call").map((d,i) => ({...d, i})).filter(d => div.scope == +d.to.split("_")[0]) // bugs for double digit scopes
    .map((d) =>
        Decoration.widget({
          widget: new AnswersWorkingsOverlayWidget(div, d.i, d, d.i, "call", set_formulae_visible, setCursor, setFormula),
          side: 1
        }).range(
          d.loc.start.index +
            d.from.length -
            0 - Math.floor(d.from.length/2) // this split is wrong for interest_rate for example!
        )
      )
    ]
  );
}


function answers(div, view) {
    if (div.introspection.cul_functions == undefined) return Decoration.set([]);

  //debugger;
  return Decoration.set(
    [
      ...[...div.introspection.cul_functions.values()].filter(d => d.reason == 'definition' || d.reason == 'definition (renamed)').map((d,i) => ({...d, i})).filter(d => d.cul_scope_id == div.scope).map((d) =>
        Decoration.widget({
          widget: new AnswersWorkingsOverlayWidget(div, d.i, d, d.i, "definition"),
          side: 1
        }).range(
          //                    }).range(view.state.doc.line(e).from)

          view.state.doc.line(d.loc.start.line).to
          //d.from.length -
          /* todo take midpoint start-end */
        )
      )
    ] /* todo take midpoint start-end */
  );
}


const overlay_answers =  (div) => {
  //debugger;
  return [
  // prevent input events coming from the contenteditable div that
  // propagates and triggers a cell refresh; we shall handle it ourselves.
  ViewPlugin.fromClass(
    class {
      constructor(view) {
        //debugger;
        this.decorations = answers(div, view);
      }
      update(update) {
        //debugger;

        // updates cause difficulty clicking numbers - thankfully not needed
        if (update.docChanged/* || update.viewportChanged*/)
          this.decorations = answers(div, update.view);

        // not necessary for read-only
      }
    },
    {
      decorations: (v) => v.decorations,
      eventHandlers: {}
    }
  )]}

const overlay_workings = (div, set_formulae_visible, setCursor, setFormula) => [
  // prevent input events coming from the contenteditable div that
  // propagates and triggers a cell refresh; we shall handle it ourselves.
  ViewPlugin.fromClass(
    class {
      constructor(view) {
        this.decorations = workings(div, view, set_formulae_visible, setCursor, setFormula);
      }

      update(update) {

        if (update.docChanged/* || update.viewportChanged*/)
        this.decorations = workings(div, update.view, set_formulae_visible, setCursor, setFormula);

        // updates cause difficulty clicking numbers - thankfully not needed
        // not necessary for read-only
        //if (update.docChanged || update.viewportChanged)
         //this.decorations = workings(update.view);
      }
    },
    {
      decorations: (v) => v.decorations
    }
  )

]




//////////////////


// https://codemirror.net/try/?example=Merge%20View
export const a = ({ parent, div, set_formulae_visible, set_hover, setCursor, setFormula }) => {
  
  return new EditorView({
  //a: {
  doc: div.fs['entry.cul.js'],
  extensions: [
    basicSetup, // todo turn off line numbers
    //EditorView.lineWrapping,
    javascript(),

    //overlay_workings(div, set_formulae_visible, setCursor, setFormula),
    //overlay_answers(div),

    !decorations ? EditorState.readOnly.of(readonly) : calculang_identifier_decorations(set_formulae_visible, set_hover, div),

    // plugin 1
    formulaDecorations(div, set_formulae_visible),

    lintGutter(),
    javascriptLanguage.data.of({
      autocomplete: snippetbuilder({
        source: jssnippetarray
      })
    }),
    linter(view => {
      let o = esLint(new eslint.Linter(), lintConfig)(view).filter(d => !(d.source == 'eslint:no-undef' && d.message.includes("_in'")));
      if (o.length == 0) {
        //div.fs = ({...div.fs, [div.filename]: view.state.doc.toString() })
        
        console.log('LINTED')
        div.compile()
        
      }
      // TODO also put introspection update in linter pass (or o/w debounced)?
      return o;
    }),
    EditorView.updateListener.of(view => {
      if (view.docChanged) {
        console.log('change!')
        //if (inhibit == false)
          div.fs = ({...div.fs, [div.filename]: view.state.doc.toString() })
        // COMPILE HERE INSTEAD OF IN LINT WORKS, BUT IS PROBABLY WASTEFUL. GOOD FOR DEMONSTRATION? MAKE CONFIGURABLE?
        //div.compile() // WORKS: OK for demos, but move to lint for perf for larger models
          //div.setFS({ "entry.cul.js": view.state.doc.toString() })
        //inhibit = false
      }
    })
  ],
  parent
})}


export const b = ({ parent }) => new EditorView_old({
  //a: {
  doc: '',
  extensions: [
    basicSetup,
    //EditorView.lineWrapping,
    javascript(),
    lintGutter(), // just for less jank on tab switch
    unifiedMergeView({ original: doc, mergeControls: false, gutter:false, diffConfig:{ scanLimit: 50000} })
  ],
  /*},
  b: {
    doc: doc,//.replace(/t/g, "T") + "\nSix",
    extensions: [
      basicSetup,
      //EditorView.editable.of(false),
      //EditorState.readOnly.of(true)
    ]
  },*/
  parent//: document.body
})

export const ab = ({setModel, setIntrospection, setCompilations, set_formulae_visible, setCursor, setFormula}) => {
  const div = document.createElement('div')


  const d = div.appendChild(html.fragment`
    <input type="radio" id="input-tab" name="tabs" checked="checked">
    <label for="input-tab">💬</label>
    <div class="tab" id="input-div"><select id="filename"><option>PLACEHOLDER</option></select></div>
    <input type="radio" id="interim-tab" name="tabs">
    <label for="interim-tab">⚡</label>
    <div class="tab" id="interim-div"><i id="scope">scope 0</i></div>
    <input type="radio" id="output-tab" name="tabs">
    <label for="output-tab">🌟</label>
    <div class="tab" id="output-div"></div>
    <input type="radio" id="module-relationships" name="tabs">
    <label for="module-relationships">♻️</label>
    <div class="tab" id="module-relationships-div"><i id="filename">entry.cul.js</i></div>
    <input type="radio" id="help-tab" name="tabs">
    <label for="help-tab">❓</label>
    <div class="tab" id="help-div" style="padding: 1em">
      <p>💬 calculang input</p>
      <p>⚡ manipulation by calculang compiler</p>
      <p>🌟 javascript module, and <a href="https://calculang.dev/#tools">introspection information</a></p>
      <p>♻️ calculang modularity graph</p>
      <p>This website uses jsDelivr Content Delivery Networks to distribute resources</p>
    </div>
    <input type="radio" id="minimize-tab" name="tabs">
    <label for="minimize-tab">❌</label><!-- ↑❎ -->
    <div class="tab" id="minimize-div"></div>
    `)

    div.append(d)

  div.querySelector('#filename').addEventListener('input', (e) => {div.setScope(+e.target.value)})

  const g = div.querySelector('#module-relationships-div')

  div.filename = 'entry.cul.js'
  div.scope = 0
  div.model = {}
  div.introspection = {}

  div.setFS = async (d) => {
    inhibit = true;
    if (1) {
      div.scope = 0
      div.fs = d;//({"entry.cul.js": d})
      // recompile
      // update a, update ab
      aa.dispatch(//aa.state.update(
        {
          changes: { from: 0, to: aa.state.doc.length, insert: div.fs['entry.cul.js'] }
        }
      )
    } inhibit = false

    await div.compile()
  }

  div.setScope = d => {
    div.scope = d
    div.filename = [...div.introspection.cul_scope_ids_to_resource.values()][div.scope].split("?")[0]
    //document.getElementById('filename').textContent = div.filename
    document.getElementById('scope').textContent = 'scope ' + div.scope
    bb.dispatch(//aa.state.update(
      {
        changes: { from: 0, to: bb.state.doc.length, insert: div.compiled[div.scope].code }
      }
    )
    aa.dispatch(//aa.state.update(
      {
        changes: { from: 0, to: aa.state.doc.length, insert: div.fs[div.filename] }
      }
    )
    console.log('filename', div.filename)

    updateOriginal(div.fs[div.filename])

 


  }

  div.setFS({'entry.cul.js': doc})
  div.id = 'tabs-container'
  //div.fs = ({'entry.cul.js': doc})
  //

  // I could group into a big html`` call if editor can go into  easily


   
  const aa = a({ parent: div.querySelector('#input-div'), div, set_formulae_visible, setCursor, setFormula });
  const bb = b({ parent: div.querySelector('#interim-div') });


  div.compile = async () => {
    updateOriginal(div.fs[div.filename]) // TODO take this out of hot compile path


    div.introspection = await getIntrospection("entry.cul.js", div.fs)
    div.inspector.fulfilled(div.introspection)
    setIntrospection(div.introspection)
    div.compiled = await compile_new("entry.cul.js", div.fs, div.introspection)


    try {
      div.model = await packageCalculang_new(bundleIntoOne(div.compiled,div.introspection, true))
      div.inspector_compiled.fulfilled(div.model)
      setModel(div.model)
      setCompilations(div.compiled)
      } catch(e) {console.error('ERR', e)}

      try {
      div.inspector_compiled2.fulfilled(await bundleIntoOne(div.compiled,div.introspection, true))
      } catch(e) {console.error('ERR', e)}

    //debugger;

    const show_query_string = false;

    const scope_id_graph_links = [...div.introspection.cul_scope_ids_to_resource.entries()]
  .filter(([cul_scope_id]) => cul_scope_id != 0)
  .map(
    ([cul_scope_id, resource]) =>
      new URLSearchParams(resource.split("?").pop()).get("cul_scope_id") +
      " -> " +
      new URLSearchParams(resource).get("cul_parent_scope_id")
  )

  const selectElement = document.getElementById('filename');
  const currentValue = selectElement.value;

  //selectElement.innerHTML = '';

  const options = [...div.introspection.cul_scope_ids_to_resource.entries()]; // TODO, recreating all
  let optionsHTML = options.map(([cul_scope_id,filename]) => `<option ${cul_scope_id==div.scope ? 'selected' : ''} value="${cul_scope_id}">[${cul_scope_id}] ${cul_scope_id == 0 ? filename + ' (entrypoint)' : filename.slice(0,filename.indexOf('?'))}</option>`).join('');
  //debugger;
  selectElement.innerHTML = optionsHTML
  console.log('innerHTMLed')
  /*options.forEach(([cul_scope_id,filename]) => {
    const option = document.createElement('option');
    option.text = `[${cul_scope_id}] ${cul_scope_id == 0 ? filename + ' (entrypoint)' : filename.slice(0,filename.indexOf('?'))}`;
    option.value = cul_scope_id;
    selectElement.add(option);
  });*/

  //selectElement.value = div.scope;



    const scope_id_graph_nodes = [
      ...div.introspection.cul_scope_ids_to_resource.entries()
    ].map(
      (d) =>
        `${d[0]} [${
          d[0] == 0
            ? 'color="green" style="filled" '
            : 'color="yellow" style="filled" '
        }label="[${d[0]}]: ${
          show_query_string
            ? d[1].replaceAll("-nomemo", "")
            : d[1].replaceAll("-nomemo", "").split("?")[0]
        }"]`
    )

    instance().then(viz => {
      g.firstChild.replaceWith(viz.renderSVGElement(`digraph {
        bgcolor="#90EE90"
        ${/*rankdir="RL"*/";"}
        rankdir="BT";
        node [shape="box"]
        ${scope_id_graph_nodes.join("\n")}
        ${scope_id_graph_links.join("\n")}
        }`))
    })


    // THIS OFF MASSIVELY IMPROVES PERF FOR LARGE DOCS LIKE LL
    // redundant?
    bb.dispatch(//aa.state.update(
      {
        changes: { from: 0, to: bb.state.doc.length, insert: div.compiled[div.scope].code }
      }
    )
  }






let view = bb;

function updateOriginal(newContent) {
  // THIS OFF MASSIVELY IMPROVES PERF FOR LARGE DOCS LIKE LL
  const newDoc = Text.of(newContent.split("\n"));

  const changes = ChangeSet.of({
    from: 0,
    to: 0,//originalDoc.length, ????????
    insert: newContent
  });

  view.dispatch({
    effects: updateOriginalDoc.of({ doc: newDoc, changes })
  });
}

const n = document.createElement('div')
const n2 = document.createElement('div')
const n3 = document.createElement('div')
const n4 = document.createElement('div')

div.inspector = new Inspector(n);
div.inspector.fulfilled(div.introspection)
div.inspector_compiled = new Inspector(n2);
div.inspector_compiled.fulfilled(div.compiled)
div.inspector_compiled2 = new Inspector(n4);
div.inspector_compiled2.fulfilled(div.compiled)

n3.appendChild(html`<br/>ℹ️ <b>introspection`)
n3.appendChild(n)
n3.appendChild(html`<br/>🇫 <b><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules">Javascript Module</a>`)
n3.appendChild(n2)

//n3.appendChild(html`<br/>📜 <b>Javascript Code`)
//n3.appendChild(n4)

const o = div.querySelector('#output-div')


o.appendChild(n3)
//Inspector.into(n).fulfilled({hi: 'world'})


return div
}
