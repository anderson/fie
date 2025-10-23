import { object } from 'underscore';

export class Util {
  static addEventListener(eventName, selector, callback) {
    document.querySelector('[fie-body=true]').addEventListener(eventName, event => {
      if (event.target.matches(selector)) {
        callback(event);
      }
    });
  }

  // Corrected Util.execJS implementation
  static execJS(functionName, args = []) {
    // 1. Get a reference to the global object (window in a browser)
    //    This ensures we look for the function in the correct scope.
    const globalContext = typeof window !== 'undefined' ? window : global;
    
    // 2. Safely retrieve the function by name from the global context
    const targetFunction = globalContext[functionName];
  
    // 3. Check if the retrieved value is actually a function before calling it
    if (typeof targetFunction === 'function') {
      targetFunction(...args);
    } else {
      // 4. Log an error if the function is not found or not callable
      console.error(`Attempted to execute non-existent or non-callable function: ${functionName}`);
    }
  }

  static get viewVariables() {
    const variableElements = document.querySelectorAll('[fie-variable]:not([fie-variable=""])');
    
    return object(Array.from(variableElements).map(variableElement => {
      const variableName = variableElement.getAttribute('fie-variable');
      const variableValue = variableElement.getAttribute('fie-value');
      return [variableName, variableValue];
    }));
  }
}
