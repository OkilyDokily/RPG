const clonedeep = require('lodash/clonedeep');


const functional = storeState();

functional(addFunction(addFunction));
functional(addFunction(storeState));
functional(addFunction(changeState));
functional(addFunction(replaceState));


function addFunction(func) {
  return function (state) {
    let obj = clonedeep(state);
    obj[func.name] = func;
    return clonedeep(obj);
  };
}
function storeState(obj = {}) {
  let state = clonedeep(obj);
  return function (modifyState) {
    let newState = clonedeep(state);
    state = modifyState(newState);
    return newState;
  };
}

function changeState(prop, func) {
  return function (state) {
    let obj = clonedeep(state);
    state[prop] = func(state[prop] || 0);
    return clonedeep(obj);
  }
}

export function replaceState(state) {
  return function () {
    return clonedeep(state);
  };
};

export default functional;
