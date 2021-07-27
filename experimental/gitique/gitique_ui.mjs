import { getUser, getPulls, getMerged } from './github.mjs'
import './settings_ui.mjs'
import './pr_row.mjs'


class GitiqueUi extends HTMLElement {
    constructor() {
          super();
          this.componentDidMount = () => {};

          this.shadow = this.attachShadow({mode:'open'});
          this.shadow.innerHTML = `<style></style>`

          this.props = [];
          this.state = {};
          this.stateMappers = {};

          this.__mappings = {};
          this.__selectors = {};

          this.refs = {};
          this.currentlySettingState = false;
          this.pendingStateDifferences = new Set([]);

          for (const k of this.props) {
            this.state[k] = this.getAttribute(k);
          }
          for (const k of Object.keys(this.__rawAttributes || {})) {
            this.state[k] = this.__rawAttributes[k]
          }

          this.initialize();
    }

    connectedCallback() {
      this.componentDidMount();
    }

    setRawAttribute(name, value) {
      this.setState({
        [name]: value,
      })
    }

    setInitialState(state) {
      for (const key of Object.keys(state)) {
        if (!(key in this.state)) this.state[key] = state[key];
      }
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.setState({
        [name]: newValue,
      })
    }

    _hasStateChanged(oldState, newState) {
      if (typeof oldState !== typeof newState) return true;

      // Not smart enough to introspect into objects so just assume different
      if (typeof oldState === "object") return true;

      return oldState != newState
    }

    renderStateDifferences() {
      const unrenderedStateDifferences = new Set(this.pendingStateDifferences);
      let iterations = 0;
      while(this.pendingStateDifferences.size > 0) {
        iterations += 1;
        if (iterations > 1024) {
          console.error("setState trigger depth exceeded!");
          break;
        }

        const unmappedStateDifferences = this.pendingStateDifferences
        this.pendingStateDifferences = new Set()
        this.triggerAllMappings(unmappedStateDifferences);

        for (const k of unmappedStateDifferences) {
          unrenderedStateDifferences.add(k)
        }
      }

      for (const k of unrenderedStateDifferences) {
        this.triggerRenders("this.state." + k);
      }

      this.currentlySettingState = false;
    }

    initialize() {
      this.setState = (newState) => {
          let isOuter = !this.currentlySettingState;
          if (isOuter) {
            this.currentlySettingState = true;
          }

          for (const k of Object.keys(newState)) {
            if (this._hasStateChanged(this.state[k], newState[k])) {
              this.state[k] = newState[k];
              this.pendingStateDifferences.add(k);
            }
          }

          if (!isOuter) {
            return
          }

          setTimeout(this.renderStateDifferences.bind(this), 16);
      }
      
      // Do something here



const MAX_PRS_PER_SECTION = 15;
const RECENCY_LIMIT = 86400 * 10 * 1000; // 10 days

this.state = {
pulls: [],
reviews: [],
myMerged: [],
otherMerged: [],
settingsVisible: true,
}

const userPromise = getUser()

getPulls().then(async (prs) => {
let user = await userPromise;
const pulls = prs.filter((p) => p.user.login == user.login)
const reviews = prs.filter((p) => {
const updatedRecently = (Date.now() - Date.parse(p.updated_at)) < RECENCY_LIMIT
return p.user.login != user.login && updatedRecently
}).slice(0, MAX_PRS_PER_SECTION)

this.setState({
pulls,
reviews,
})
})

getMerged().then(async (merged) => {
let user = await userPromise;
const myMerged = merged.filter((p) => p.user.login == user.login).slice(0,MAX_PRS_PER_SECTION)
const otherMerged = merged.filter((p) => p.user.login != user.login).slice(0,MAX_PRS_PER_SECTION)

this.setState({
myMerged, otherMerged
})
})

function hideSettings() {
this.setState({ settingsVisible: false })
}

function showSettings() {
this.setState({ settingsVisible: true })
}



      const __el0 = document.createElement('strong');
__el0.__rawAttributes ||= {}

const __el1 = document.createElement('span');
__el1.__rawAttributes ||= {}
__el1.innerHTML = `in progress`;

            if(true) {
                __el0.appendChild(__el1);
            }
            
            if(true) {
                this.shadow.appendChild(__el0);
            }
            
const __el2 = document.createElement('ul');
__el2.__rawAttributes ||= {}

const __el3_elements = {};for(const __el3__key of Object.keys(this.state.pulls)) {
__el3_elements[__el3__key] = {};
const item = this.state.pulls[__el3__key];
const key = __el3__key;
const __el4 = document.createElement('pr-row');
__el3_elements[__el3__key].__el4 = __el4;
__el3_elements[__el3__key].__el4.__rawAttributes ||= {}
this.setElementAttribute(__el3_elements[__el3__key].__el4, 'pr', item);

            if(true) {
                __el2.appendChild(__el3_elements[__el3__key].__el4);
            }
            }

            if(true) {
                this.shadow.appendChild(__el2);
            }
            
const __el5 = document.createElement('strong');
__el5.__rawAttributes ||= {}

const __el6 = document.createElement('span');
__el6.__rawAttributes ||= {}
__el6.innerHTML = `review requests`;

            if(true) {
                __el5.appendChild(__el6);
            }
            
            if(true) {
                this.shadow.appendChild(__el5);
            }
            
const __el7 = document.createElement('ul');
__el7.__rawAttributes ||= {}

const __el8_elements = {};for(const __el8__key of Object.keys(this.state.reviews)) {
__el8_elements[__el8__key] = {};
const item = this.state.reviews[__el8__key];
const key = __el8__key;
const __el9 = document.createElement('pr-row');
__el8_elements[__el8__key].__el9 = __el9;
__el8_elements[__el8__key].__el9.__rawAttributes ||= {}
this.setElementAttribute(__el8_elements[__el8__key].__el9, 'pr', item);

            if(true) {
                __el7.appendChild(__el8_elements[__el8__key].__el9);
            }
            }

            if(true) {
                this.shadow.appendChild(__el7);
            }
            
const __el10 = document.createElement('strong');
__el10.__rawAttributes ||= {}

const __el11 = document.createElement('span');
__el11.__rawAttributes ||= {}
__el11.innerHTML = `submitted by me`;

            if(true) {
                __el10.appendChild(__el11);
            }
            
            if(true) {
                this.shadow.appendChild(__el10);
            }
            
const __el12 = document.createElement('ul');
__el12.__rawAttributes ||= {}

const __el13_elements = {};for(const __el13__key of Object.keys(this.state.myMerged)) {
__el13_elements[__el13__key] = {};
const item = this.state.myMerged[__el13__key];
const key = __el13__key;
const __el14 = document.createElement('pr-row');
__el13_elements[__el13__key].__el14 = __el14;
__el13_elements[__el13__key].__el14.__rawAttributes ||= {}
this.setElementAttribute(__el13_elements[__el13__key].__el14, 'pr', item);

            if(true) {
                __el12.appendChild(__el13_elements[__el13__key].__el14);
            }
            }

            if(true) {
                this.shadow.appendChild(__el12);
            }
            
const __el15 = document.createElement('strong');
__el15.__rawAttributes ||= {}

const __el16 = document.createElement('span');
__el16.__rawAttributes ||= {}
__el16.innerHTML = `submitted by others`;

            if(true) {
                __el15.appendChild(__el16);
            }
            
            if(true) {
                this.shadow.appendChild(__el15);
            }
            
const __el17 = document.createElement('ul');
__el17.__rawAttributes ||= {}

const __el18_elements = {};for(const __el18__key of Object.keys(this.state.otherMerged)) {
__el18_elements[__el18__key] = {};
const item = this.state.otherMerged[__el18__key];
const key = __el18__key;
const __el19 = document.createElement('pr-row');
__el18_elements[__el18__key].__el19 = __el19;
__el18_elements[__el18__key].__el19.__rawAttributes ||= {}
this.setElementAttribute(__el18_elements[__el18__key].__el19, 'pr', item);

            if(true) {
                __el17.appendChild(__el18_elements[__el18__key].__el19);
            }
            }

            if(true) {
                this.shadow.appendChild(__el17);
            }
            
const __el20 = document.createElement('div');
__el20.__rawAttributes ||= {}

const __el21 = document.createElement('p');
__el21.__rawAttributes ||= {}

const __el22 = document.createElement('strong');
__el22.__rawAttributes ||= {}

const __el23 = document.createElement('span');
__el23.__rawAttributes ||= {}
__el23.innerHTML = `settings`;

            if(true) {
                __el22.appendChild(__el23);
            }
            
            if(true) {
                __el21.appendChild(__el22);
            }
            
            if(true) {
                __el20.appendChild(__el21);
            }
            const __el24 = document.createElement('settings-ui');
__el24.__rawAttributes ||= {}

            if(true) {
                __el20.appendChild(__el24);
            }
            
            if(true) {
                this.shadow.appendChild(__el20);
            }
            


      this.render = (keys) => {
        for (const k of keys) {
          switch(k) {
            
            case 0:
              
                    for(const __el3__key of Object.keys(__el3_elements)) {
                        if(!this.state.pulls[__el3__key]) {
                            __el3_elements[__el3__key].__el4.remove();

                            delete __el3_elements[__el3__key];
                        }
                    }
              break;
            
            case 1:
              for(const __el3__key of Object.keys(__el3_elements)) {const item = this.state.pulls[__el3__key];
this.setElementAttribute(__el3_elements[__el3__key].__el4, 'pr', item);

}
              break;
            
            case 2:
              
                        for(const __el3__key of Object.keys(this.state.pulls)) {
                            if(!__el3_elements[__el3__key]) {
                                const key = __el3__key;
                                const item = this.state.pulls[__el3__key];
                                __el3_elements[__el3__key] = {};
                                const __el4 = document.createElement('pr-row');
__el3_elements[__el3__key].__el4 = __el4;
__el3_elements[__el3__key].__el4.__rawAttributes ||= {}
this.setElementAttribute(__el3_elements[__el3__key].__el4, 'pr', item);

            if(true) {
                __el2.appendChild(__el3_elements[__el3__key].__el4);
            }
            


                            }
                        }
              break;
            
            case 3:
              
                    for(const __el8__key of Object.keys(__el8_elements)) {
                        if(!this.state.reviews[__el8__key]) {
                            __el8_elements[__el8__key].__el9.remove();

                            delete __el8_elements[__el8__key];
                        }
                    }
              break;
            
            case 4:
              for(const __el8__key of Object.keys(__el8_elements)) {const item = this.state.reviews[__el8__key];
this.setElementAttribute(__el8_elements[__el8__key].__el9, 'pr', item);

}
              break;
            
            case 5:
              
                        for(const __el8__key of Object.keys(this.state.reviews)) {
                            if(!__el8_elements[__el8__key]) {
                                const key = __el8__key;
                                const item = this.state.reviews[__el8__key];
                                __el8_elements[__el8__key] = {};
                                const __el9 = document.createElement('pr-row');
__el8_elements[__el8__key].__el9 = __el9;
__el8_elements[__el8__key].__el9.__rawAttributes ||= {}
this.setElementAttribute(__el8_elements[__el8__key].__el9, 'pr', item);

            if(true) {
                __el7.appendChild(__el8_elements[__el8__key].__el9);
            }
            


                            }
                        }
              break;
            
            case 6:
              
                    for(const __el13__key of Object.keys(__el13_elements)) {
                        if(!this.state.myMerged[__el13__key]) {
                            __el13_elements[__el13__key].__el14.remove();

                            delete __el13_elements[__el13__key];
                        }
                    }
              break;
            
            case 7:
              for(const __el13__key of Object.keys(__el13_elements)) {const item = this.state.myMerged[__el13__key];
this.setElementAttribute(__el13_elements[__el13__key].__el14, 'pr', item);

}
              break;
            
            case 8:
              
                        for(const __el13__key of Object.keys(this.state.myMerged)) {
                            if(!__el13_elements[__el13__key]) {
                                const key = __el13__key;
                                const item = this.state.myMerged[__el13__key];
                                __el13_elements[__el13__key] = {};
                                const __el14 = document.createElement('pr-row');
__el13_elements[__el13__key].__el14 = __el14;
__el13_elements[__el13__key].__el14.__rawAttributes ||= {}
this.setElementAttribute(__el13_elements[__el13__key].__el14, 'pr', item);

            if(true) {
                __el12.appendChild(__el13_elements[__el13__key].__el14);
            }
            


                            }
                        }
              break;
            
            case 9:
              
                    for(const __el18__key of Object.keys(__el18_elements)) {
                        if(!this.state.otherMerged[__el18__key]) {
                            __el18_elements[__el18__key].__el19.remove();

                            delete __el18_elements[__el18__key];
                        }
                    }
              break;
            
            case 10:
              for(const __el18__key of Object.keys(__el18_elements)) {const item = this.state.otherMerged[__el18__key];
this.setElementAttribute(__el18_elements[__el18__key].__el19, 'pr', item);

}
              break;
            
            case 11:
              
                        for(const __el18__key of Object.keys(this.state.otherMerged)) {
                            if(!__el18_elements[__el18__key]) {
                                const key = __el18__key;
                                const item = this.state.otherMerged[__el18__key];
                                __el18_elements[__el18__key] = {};
                                const __el19 = document.createElement('pr-row');
__el18_elements[__el18__key].__el19 = __el19;
__el18_elements[__el18__key].__el19.__rawAttributes ||= {}
this.setElementAttribute(__el18_elements[__el18__key].__el19, 'pr', item);

            if(true) {
                __el17.appendChild(__el18_elements[__el18__key].__el19);
            }
            


                            }
                        }
              break;
            
            default:
              break;
          }
        }
      }

      

      this.initializeStateMappers();
    }

    initializeStateMappers() {
      for (const k of Object.keys(this.stateMappers)) {
        const args = getArguments(this.stateMappers[k]);
        for(const arg of args) {
          if(!this.__mappings[arg]) {
            this.__mappings[arg] = [];
          }
          this.__mappings[arg].push(k);
        }

        this.__selectors[k] = (state) => {
          let output = [];
          for(const arg of args) {
            output.push(state[arg]);
          }
          return output;
        }
      }

      this.triggerAllMappings(Object.keys(this.__mappings))
    }

    render(keys) {}

    triggerAllMappings(keys) {
      let allMappings = new Set([])

      for(const key of keys) {
        if (!this.__mappings[key]) continue;

        for(const m of this.__mappings[key]) {
          allMappings.add(m);
        }
      }
      
      for (const m of allMappings) {
        this.setState({
          [m]: this.stateMappers[m](...this.__selectors[m](this.state))
        })
      }
    }

    triggerRenders(key) {
      switch(key) {
        
        case 'this.state.myMerged':
           this.render([6,7,8]);
           break;
        
        case 'this.state.otherMerged':
           this.render([9,10,11]);
           break;
        
        case 'this.state.reviews':
           this.render([3,4,5]);
           break;
        
        case 'item':
           this.render([1,4,7,10]);
           break;
        
        case 'this.state.pulls':
           this.render([0,1,2]);
           break;
        
        default:
          break;
      }
    }

    setElementAttribute(element, key, value) {
      if (typeof value === "string") {
        element.setAttribute(key, value);
      } else if (typeof value === "boolean") {
        if (value) {
          element.setAttribute(key, true);
        } else {
          element.removeAttribute(key);
        }
      } else {
        element.__rawAttributes[key] = value;
        if(element.setRawAttribute) element.setRawAttribute(key, value);
      }
    }
    
    static get observedAttributes() {
      return []
    }
}

customElements.define('gitique-ui', GitiqueUi);

function getArguments(func) {
    const ARROW = true;
    const FUNC_ARGS = ARROW ? /^(function)?\s*[^\(]*\(\s*([^\)]*)\)/m : /^(function)\s*[^\(]*\(\s*([^\)]*)\)/m;
    const FUNC_ARG_SPLIT = /,/;
    const FUNC_ARG = /^\s*(_?)(.+?)\1\s*$/;
    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

    return ((func || '').toString().replace(STRIP_COMMENTS, '').match(FUNC_ARGS) || ['', '', ''])[2]
        .split(FUNC_ARG_SPLIT)
        .map(function(arg) {
            return arg.replace(FUNC_ARG, function(all, underscore, name) {
                return name.split('=')[0].trim();
            });
        })
        .filter(String);
}

