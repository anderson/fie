import { object } from 'underscore';

export class Util {
  static addEventListener(eventName, selector, callback) {
    document.querySelector('[fie-body=true]').addEventListener(eventName, event => {
      if (event.target.matches(selector)) {
        callback(event);
      }
    });
  }

  static execJS(functionName, args = []) {
    try {
      // If the string already contains parentheses, it's a complete function call
      // Ex: "notificacaoSonora('68fa9b547e3111dc878d0ee5')"
      if (functionName.includes('(') && functionName.includes(')')) {
        // Use Function constructor to evaluate the expression more safely
        const func = new Function(`return ${functionName}`);
        func.call(window);
        return;
      }

      // If it contains a dot but no parentheses, split into object.method
      // Ex: "Fie.triggerFieReadyEvent"
      if (functionName.includes('.')) {
        const parts = functionName.split('.');
        let obj = window;

        // Navigate through objects until the last one
        for (let i = 0; i < parts.length - 1; i++) {
          obj = obj[parts[i]];
          if (!obj) {
            console.error(`Object "${parts[i]}" not found in "${functionName}"`);
            return;
          }
        }

        // Get the final method
        const method = parts[parts.length - 1];
        if (typeof obj[method] === 'function') {
          obj[method](...args);
        } else {
          console.error(`Function "${functionName}" is not defined or is not a function`);
        }
      }
      // Simple global function
      // Ex: "minhaFuncao"
      else {
        if (typeof window[functionName] === 'function') {
          window[functionName](...args);
        } else {
          console.error(`Function "${functionName}" is not defined or is not a function`);
        }
      }
    } catch (error) {
      console.error(`Error executing function "${functionName}":`, error);
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