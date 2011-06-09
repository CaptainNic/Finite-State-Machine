/* Finite State Machine
 * 
 * By Nicolas Patrick Breidinger
 * 06/07/2011
 */

var FSM = function (initialState) {
    this.consts = {};
    this.vars = {};
    this.transitions = {};
    this.initialState = initialState;
    this.currentState = this.initialState;
};

// Resets FSM to initialState with the option of clearing all data
FSM.prototype.reset = function (willClearData) {
    this.currentState = this.initialState;
    if (willClearData) {
        this.data = null;
    }
};

// Adds a new transition for the given action-state pair
FSM.prototype.setTransition = function (action, state, callback, nextState) {
    if (!nextState) {
        nextState = state;
    }
    this.transitions[[action, state]] = [callback, nextState];
};

// Sets the default transition to be used when an unknown action-state pair occurs
FSM.prototype.getTransition = function (action, state) {
    if (this.transitions[[action, state]]) {
        return this.transitions[[action, state]];
    } else {
        throw Error("Unknown transition: (" + action + ", " + state + "). Default transition is not defined.");
    }
};

// Process an action in the current state
FSM.prototype.act = function (action) {
    result = this.getTransition(action, this.currentState);
    this.action = result[0];        // set action to callback function
    if (this.action) {
        this.action.call(this);
    }
    this.currentState = result[1]; // set currentState to next state
};