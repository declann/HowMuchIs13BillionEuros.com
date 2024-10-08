
/*

https://github.com/nathanchapman/vscode-javascript-snippets/blob/main/snippets/global.code-snippets

*/

const jssnippetarray = {
	"cul input": {
		"scope": "javascript",
		"prefix": "culin",
		"body": 
			"export const ${1:inputname} = () => ${1:inputname}_in"
		
	},
	"cul function": { // make make a block and expression type?
		"scope": "javascript",
		"prefix": "cul",
		"body": "export const ${1:formulaname} = () => ${99:0 // formula body}"
	},
  /////
	"cul function expression": {
		"scope": "javascript",
		"prefix": "cule",
		"body": "export const ${1:formulaname} = () => ${99:0 // formula body}"
	},
	"cul function block": { 
		"scope": "javascript",
		"prefix": "culb",
		"body": "export const ${1:formulaname} = () => {\n" +
      "  ${99:return 0 // formula body}\n" +
    "}"
	},
  /////
	"cul prev": {
		"scope": "javascript",
		"prefix": "prev",
		"body": 
			"${1:call}({${2:input}_in:${2:input}() - 1})"
	},




	/*"cul accumulator": {
		"scope": "javascript",
		"prefix": "culacc",
		"body": 
			`export const $1 = () => {
			  if ($2() == 0) return 0;
			  else return $1({ $2_in: $2() - 1 }) + d$1();
			}
			
			export const d$1 = () => $3`
		
	},*/

  ///////////////////////////
  
  // Declarations
  /*"var statement": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "v",
    "body": "var ${99:// Type here}",
    "description": "var statement"
  },
  "var assignment": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "v=",
    "body": "var ${1:name} = ${2:value}",
    "description": "var assignment"
  },
  "let statement": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "l",
    "body": "let ${99:// Type here}",
    "description": "let statement"
  },
  "let assignment": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "l=",
    "body": "let ${1:name} = ${2:value}",
    "description": "let assignment"
  },
  "destructuring let assignment": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "dl=",
    "body": "let {${1:name}} = ${2:value}",
    "description": "destructuring let assignment"
  },
  "const statement": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "co",
    "body": "const ${99:// Type here}",
    "description": "const statement"
  },
  "const assignment": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "co=",
    "body": "const ${1:name} = ${2:value}",
    "description": "const assignment"
  },
  "destructuring const assignment": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "dco=",
    "body": "const {${1:name}} = ${2:value}",
    "description": "destructuring const assignment"
  },*/
  // Flow Control
  "if statement": { // maybe add ifr (if-return)?
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "if",
    "body": "if (${1:condition}) {\n\t${99:// Type here}\n}",
    "description": "if statement"
  },
  "else statement": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "el",
    "body": "else {\n\t${99:// Type here}\n}",
    "description": "else statement"
  },
  "if/else statement": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "ifel",
    "body": "if (${1:condition}) {\n\t${99:// Type here}\n} else {\n\t\n}",
    "description": "if/else statement"
  },
  "else if statement": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "elif",
    "body": "else if (${1:condition}) {\n\t${99:// Type here}\n}",
    "description": "else if statement"
  },
  "ternary operator": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "ter",
    "body": "${1:condition} ? ${2:expression} : ${3:expression}",
    "description": "ternary operator"
  },
  "for loop": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "fl",
    "body": "for (let ${1:i} = 0, ${2:len} = ${3:iterable}.length; ${1:i} < ${2:len}; ${1:i}++) {\n\t${99:// Type here}\n}",
    "description": "for loop"
  },
  "reverse for loop": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "rfl",
    "body": "for (let ${1:i} = ${2:iterable}.length - 1; ${1:i} >= 0; ${1:i}--) {\n\t${99:// Type here}\n}",
    "description": "reverse for loop"
  },
  "for in loop": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "fi",
    "body": "for (let ${1:key} in ${2:array}) {\n\tif (${2:array}.hasOwnProperty(${1:key})) {\n\t\t${99:// Type here}\n\t}\n}",
    "description": "for in loop"
  },
  "for of loop (ES6)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "fo",
    "body": "for (let ${1:key} of ${2:array}) {\n\t${99:// Type here}\n}",
    "description": "for of loop (ES6)"
  },
  "while loop": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "wl",
    "body": "while (${1:condition}) {\n\t${99:// Type here}\n}",
    "description": "while loop"
  },
  "try/catch": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "tc",
    "body": "try {\n\t${0:// Type here}\n} catch (${1:err}) {\n\t\n}",
    "description": "try/catch"
  },
  "try/finally": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "tf",
    "body": "try {\n\t${0:// Type here}\n} finally {\n\t\n}",
    "description": "try/finally"
  },
  "try/catch/finally": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "tcf",
    "body": "try {\n\t${0:// Type here}\n} catch (${1:err}) {\n\t\n} finally {\n\t\n}",
    "description": "try/catch/finally"
  },
  "switch case": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "sw",
    "body": "switch (${1:expr}) {\n\tcase ${2:value}:\n\t\treturn ${99:value}\n\tdefault:\n\t\treturn\n}",
    "description": "switch case"
  },
  // Functions
  /*
  "anonymous function": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "f",
    "body": "function (${1:arguments}) {\n\t${99:// Type here}\n}",
    "description": "anonymous function"
  },
  "named function": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "fn",
    "body": "function ${1:name}(${2:arguments}) {\n\t${99:// Type here}\n}",
    "description": "named function"
  },
  "immediately-invoked function expression (IIFE)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "iife",
    "body": "((${1:arguments}) => {\n\t${99:// Type here}\n})(${2})",
    "description": "immediately-invoked function expression (IIFE)"
  },
  "function apply": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "fa",
    "body": "${1:fn}.apply(${2:this}, ${3:arguments})",
    "description": "function apply"
  },
  "function call": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "fc",
    "body": "${1:fn}.call(${2:this}, ${3:arguments})",
    "description": "function call"
  },
  "function bind": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "fb",
    "body": "${1:fn}.bind(${2:this}, ${3:arguments})",
    "description": "function bind"
  },
  "arrow function (ES6)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "af",
    "body": "(${1:arguments}) => ${2:statement}",
    "description": "arrow function (ES6)"
  },
  "arrow function with body (ES6)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "afb",
    "body": "(${1:arguments}) => {\n\t${99:// Type here}\n}",
    "description": "arrow function with body (ES6)"
  },
  "generator function (ES6)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "gf",
    "body": "function* (${1:arguments}) {\n\t${99:// Type here}\n}",
    "description": "generator function (ES6)"
  },
  "named generator function (ES6)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "gfn",
    "body": "function* ${1:name}(${2:arguments}) {\n\t${99:// Type here}\n}",
    "description": "named generator function (ES6)"
  },*/
  // Iterables
  /*
  "sequence of 0..n": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "seq",
    "body": "[...Array(${1:length}).keys()]${99:// Type here}",
    "description": "sequence of 0..n"
  },
  "forEach loop": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "fe",
    "body": "${1}.forEach((${2:item}) => {\n\t${99:// Type here}\n})",
    "description": "forEach loop"
  },*/
  "map": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "map",
    "body": "${1}.map((${2:item}) => {\n\t${99:// Type here}\n})",
    "description": "map"
  },
  "reduce": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "reduce",
    "body": "${1}.reduce((${2:previous}, ${3:current}) => {\n\t${99:// Type here}\n}${4:, initial})",
    "description": "reduce"
  },
  "filter": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "filter",
    "body": "${1}.filter(${2:item} => {\n\t${99:// Type here}\n})",
    "description": "filter"
  },
  "find": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "find",
    "body": "${1}.find(${2:item} => {\n\t${99:// Type here}\n})",
    "description": "find"
  },/*
  // Objects and Classes
  "object literal": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "ol",
    "body": "{\n\tkv${99:// Type here}\n}",
    "description": "object literal"
  },
  "same-line object literal": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "slol",
    "body": "{ kv${99:// Type here} }",
    "description": "same-line object literal"
  },
  "key/value pair": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "kv",
    "body": "${1:key}: ${2:value},",
    "description": "key/value pair"
  },
  "class (ES6)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "c",
    "body": "class ${1:name} {\n\tconstructor(${2:arguments}) {\n\t\t${99:// Type here}\n\t}\n}",
    "description": "class (ES6)"
  },
  "child class (ES6)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "cex",
    "body": "class ${1:name} extends ${2:base} {\n\tconstructor(${3:arguments}) {\n\t\tsuper(${3:arguments})\n\t\t${99:// Type here}\n\t}\n}",
    "description": "child class (ES6)"
  },
  "class constructor (ES6)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "ctor",
    "body": "constructor(${1:arguments}) {\n\tsuper(${1:arguments})${99:// Type here}\n}",
    "description": "class constructor (ES6)"
  },
  "method (ES6 syntax)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "m",
    "body": "${1:method}(${2:arguments}) {\n\t${99:// Type here}\n}",
    "description": "method (ES6 syntax)"
  },
  "getter (ES6 syntax)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "get",
    "body": "get ${1:property}() {\n\t${99:// Type here}\n}",
    "description": "getter (ES6 syntax)"
  },
  "setter (ES6 syntax)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "set",
    "body": "set ${1:property}(${2:value}) {\n\t${99:// Type here}\n}",
    "description": "setter (ES6 syntax)"
  },
  "getter and setter (ES6 syntax)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "gs",
    "body": "get ${1:property}() {\n\t${99:// Type here}\n}\nset ${1:property}(${2:value}) {\n\t\n}",
    "description": "getter and setter (ES6 syntax)"
  },
  "prototypal constructor": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "pctor",
    "body": "var ${1:Class} = function(${2:arguments}) {\n\t${99:// Type here}\n}",
    "description": "prototypal constructor"
  },
  "prototype method": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "proto",
    "body": "${1:Class}.prototype.${2:method} = function(${3:arguments}) {\n\t${99:// Type here}\n}",
    "description": "prototype method"
  },
  "Object.assign": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "oa",
    "body": "Object.assign(${1:dest}, ${2:source})",
    "description": "Object.assign"
  },
  "Object.assign copy (shallow clone)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "oc",
    "body": "Object.assign({}, ${1:original}, ${2:source})",
    "description": "Object.assign copy (shallow clone)"
  },
  // Returning values
  "return": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "r",
    "body": "return ${99:// Type here}",
    "description": "return"
  },
  "return Promise (ES6)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "rp",
    "body": "return new Promise((resolve, reject) => {\n\t${99:// Type here}\n})",
    "description": "return Promise (ES6)"
  },
  "return complex value (such as JSX components)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "rc",
    "body": "return (\n\t${99:// Type here}\n)",
    "description": "return complex value (such as JSX components)"
  },
  // Types
  "typeof": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "tof",
    "body": "typeof ${1:source} === '${2:undefined}'",
    "description": "typeof"
  },
  "instanceof": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "iof",
    "body": "${1:source} instanceof ${2:Object}",
    "description": "instanceof"
  },
  // Promises
  "promise": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "pr",
    "body": "new Promise((resolve, reject) => {\n\t${99:// Type here}\n})",
    "description": "Promise (ES6)"
  },
  "promise.then": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "then",
    "body": "${1:promise}.then((${2:value}) => {\n\t${99:// Type here}\n})",
    "description": "Promise.then"
  },
  "promise.catch": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "catch",
    "body": "${1:promise}.catch((${2:err}) => {\n\t${99:// Type here}\n})",
    "description": "Promise.catch"
  },
  // ES6 Modules
  "export (ES6)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "ex",
    "body": "export ${1:member}",
    "description": "export (ES6)"
  },
  "export default (ES6)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "exd",
    "body": "export default ${1:member}",
    "description": "export default (ES6)"
  },
  "import module (ES6)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "im",
    "body": "import ${1:*} from '${2:module}'",
    "description": "import module (ES6)"
  },
  "import module as (ES6)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "ima",
    "body": "import ${1:*} as ${2:name} from '${3:module}'",
    "description": "import module as (ES6)"
  },
  // Node.js
  "Node.js style callback": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "cb",
    "body": "(err, ${1:value}) => {${99:// Type here}}",
    "description": "Node.js style callback"
  },
  "require": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "re",
    "body": "require('${1:module}')",
    "description": "require"
  },
  "require local": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "rel",
    "body": "require('./${1:module}')",
    "description": "require local"
  },
  "require assignment": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "req",
    "body": "const ${1:module} = require('${1:module}')",
    "description": "require assignment"
  },
  "require assignment local": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "reql",
    "body": "const ${1:module} = require('./${1:module}')",
    "description": "require assignment local"
  },
  "destructuring require assignment": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "dreq",
    "body": "const {${1:module}} = require('${1:module}')",
    "description": "destructuring require assignment"
  },
  "destructuring require assignment local": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "dreql",
    "body": "const {${1:module}} = require('./${1:module}')",
    "description": "destructuring require assignment local"
  },
  "exports.member": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "em",
    "body": "exports.${1:member} = ${2:value}",
    "description": "exports.member"
  },
  "module.exports": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "me",
    "body": "module.exports = ${1:name}",
    "description": "module.exports"
  },
  "module exports object": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "meo",
    "body": "module.exports = {\n\t${1:member}\n}",
    "description": "module exports object"
  },
  "event handler": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "on",
    "body": "${1:emitter}.on('${2:event}', (${3:arguments}) => {\n\t${99:// Type here}\n})",
    "description": "event handler"
  },
  // Testing (Jest, Mocha, Jasmine, etc.)
  "describe": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "desc",
    "body": "describe('${1:description}', () => {\n\t${99:// Type here}\n})",
    "description": "describe"
  },
  "context": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "cont",
    "body": "context('${1:description}', () => {\n\t${99:// Type here}\n})",
    "description": "context"
  },
  "test (synchronous)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "it",
    "body": "it('${1:description}', () => {\n\t${99:// Type here}\n})",
    "description": "test (synchronous)"
  },
  "test (asynchronous)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "ita",
    "body": "it('${1:description}', async () => {\n\t${99:// Type here}\n})",
    "description": "test (asynchronous)"
  },
  "test (callback)": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "itc",
    "body": "it('${1:description}', (done) => {\n\t${99:// Type here}\n\tdone()\n})",
    "description": "test (callback)"
  },
  "before test suite": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "bf",
    "body": "before(() => {\n\t${99:// Type here}\n})",
    "description": "before test suite"
  },
  "before each test": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "bfe",
    "body": "beforeEach(() => {\n\t${99:// Type here}\n})",
    "description": "before each test"
  },
  "after test suite": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "aft",
    "body": "after(() => {\n\t${99:// Type here}\n})",
    "description": "after test suite"
  },
  "after each test": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "afe",
    "body": "afterEach(() => {\n\t${99:// Type here}\n})",
    "description": "after each test"
  },*/
  // Console
  "console.log": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "cl",
    "body": "console.log(${99:// Type here})",
    "description": "console.log"
  },
  "console.error": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "ce",
    "body": "console.error(${99:// Type here})",
    "description": "console.error"
  },
  "console.warn": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "cw",
    "body": "console.warn(${99:// Type here})",
    "description": "console.warn"
  },
  "console.log labeled": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "cll",
    "body": "console.log('${99:// Type here}', ${99:// Type here})",
    "description": "console.log labeled"
  },
  "console.error labeled": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "cel",
    "body": "console.error('${99:// Type here}', ${99:// Type here})",
    "description": "console.error labeled"
  },
  "console.warn labeled": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "cwl",
    "body": "console.warn('${99:// Type here}', ${99:// Type here})",
    "description": "console.warn labeled"
  },/*
  // Timers
  "setTimeout": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "st",
    "body": "setTimeout(() => {\n\t${99:// Type here}\n}, ${1:delay})",
    "description": "setTimeout"
  },
  "setInterval": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "si",
    "body": "setInterval(() => {\n\t${99:// Type here}\n}, ${1:delay})",
    "description": "setInterval"
  },
  "setImmediate": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "sim",
    "body": "setImmediate(() => {\n\t${99:// Type here}\n})",
    "description": "setImmediate"
  },
  "process nextTick": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "nt",
    "body": "process.nextTick(() => {\n\t${99:// Type here}\n})",
    "description": "process nextTick"
  },
  // Miscellaneous
  "insert 'use strict' statement": {
    "scope": "javascript,typescript,javascriptreact,typescriptreact",
    "prefix": "us",
    "body": "'use strict'",
    "description": "insert 'use strict' statement"
  }*/
}

export default jssnippetarray