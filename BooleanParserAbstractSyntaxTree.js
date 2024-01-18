/**
 * A Lexer that is capable of building a token stream from boolean statements with the following operators:
 * AND, OR, NOT, (, ), and "
 */
const Lexer = class {
  constructor() {}

  /**
   * swaps exact match phrases (i.e. one or many terms in between double quotes) with variables
   * @param query   boolean syntax strings to be variablized 
   * @param exacts  a reference to a map that will hold the contents of the variablized exact match strings
   * @return        the variables boolean syntax string
   */
  _variablizeExacts(query, exacts) {
    let chars = [...query];
    let capture = false;
    let phrase = '';
    let orig = '';
    for (var i = 0; i < chars.length; i++) {
      var c = chars[i];
      if (c == '"') {
        if (capture) {
          exacts.push(phrase);
          orig += '$$' + (exacts.length - 1);
          phrase = '';
        }
        capture = !capture;
        continue;
      }
      if (capture) {
        phrase += c;
      } else {
        orig += c;
      }
    }
    return orig;
  }

  // validate syntax for correctness
  validate(query) {
    let clean = "" || query.replace(/(")([^"]*)(")/gi, '""');
    let evens = {
      '"': 0,
      '(': 0,
      ')': 0
    };
    let total = 0;
    for (var symb in evens) {
      var i = clean.indexOf(symb);
      if (i >= 0) {
        while (i >= 0) {
          evens[symb] += 1;
          i = clean.indexOf(symb, i + 1);
        }
      }
      total += evens[symb];
    }
    return total % 2 == 0;
  }

  // converts a phrase into a boolean token stream
  tokenize(query) {

    // preserve exact match phrases
    let exacts = [];
    query = this._variablizeExacts(query, exacts);

    // add whitespace between all special chars
    let tokens = query.replace(/([\\)\\("])/g, ' $1 ')
      .replace(/\s{2,}/g, ' ')
      .trim()
      .split(' ');

    // bring back the origin exact match phrases 
    let stack = [];
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      if (t.match(/^\$\$[0-9]+$/)) {
        t = exacts[parseInt(t.replace('$$', ''))];
      }
      stack.push(t);
    }

    return stack;
  }

};

/**
 * Represents a node in the abstract syntax tree
 */
const Node = class {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.children = [];
  }
  addChild(child) {
    child.parent = this;
    this.children.push(child);
  }
  isRoot() {
    return null == this.parent;
  }
  getLeft(){
    return this.children.length ? this.children[0] : null;
  } 
  getRight(){
    return this.children.length > 0 ? this.children[1] : null;
  } 
  getRoot() {
    let x = this;
    while (!x.isRoot()) {
      x = x.parent;
    }
    return x;
  }

};

/**
 * A Parser that will convert boolean syntax into an Abstract Syntax Tree
 */
const Parser = class {

  constructor(lexer) {
    this.lexer = lexer;
  }

  parse(query) {

    // only work with validate boolean syntax
    if (!this.lexer.validate(query)) {
      throw "Invalid boolean statement";
    }

    // tokenize the expression
    let tokens = this.lexer.tokenize(query);
    console.log(tokens)

    let root = null;
    let substack = [];
    var iter = tokens.entries();
    var cur = iter.next();
    while (cur != null && !cur.done) {

      var t = cur.value[1];
      switch (t) {
        case 'AND':
        case 'OR':
        case 'NOT':
          let operator = new Node(t);
          var oldroot = root;
          if (oldroot) {
            operator.addChild(oldroot);
          }
          root = operator;
          break;

        case '(':
          substack.push(root);
          root = null;
          break;

        case ')':
          var oldroot = substack.pop();
          oldroot.addChild(root);
          root = oldroot;
          break;

          // Terms/phrases
        default:
          let term = new Node(t);
          if (!root) {
            root = term;
          } else {
            root.addChild(term);
          }
          break;
      }

      cur = iter.next();
    }
    return root;
  }

}

// converts a query into an ast
let lexer = new Lexer();
let parser = new Parser(lexer);

var phrase = 'Bill OR (John AND Jim) OR (NOT Simon AND Mike)';
var ast = parser.parse(phrase);
console.log(ast);
