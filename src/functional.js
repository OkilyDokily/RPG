const clonedeep = require('lodash/clonedeep');


const functional = storeState();


functional(addFunction(addFunction,"addFunction"));
functional(addFunction(storeState,"storeState"));
functional(addFunction(changeState,"changeState"));
functional(addFunction(replaceState,"replaceState"));


function addFunction(func,name) {
  return function (state) {
    let obj = clonedeep(state);
    obj[name] = func;
    return clonedeep(obj);
  };
}
function storeState(obj = {}) {
  let state = clonedeep(obj);
  return function (modifyState = null) {
    let newState = clonedeep(state);
    if (modifyState == null) return newState;
    state = modifyState(newState);
    return newState;
  };
}

function changeState(prop, func) {
  return function (state) {
    let obj = clonedeep(state);
    obj[prop] = func(obj[prop] || 0);
    return clonedeep(obj);
  };
}

export function replaceState(state) {
  return function () {
    return clonedeep(state);
  };
}

export default functional;
