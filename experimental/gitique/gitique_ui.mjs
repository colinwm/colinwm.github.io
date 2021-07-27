import { getUser, getPulls, getMerged } from './github.mjs'
import './settings_ui.mjs'
import './pr_row.mjs'


class GitiqueUi extends HTMLElement {
    constructor() {
          super();
          this.componentDidMount = () => {};

          this.shadow = this.attachShadow({mode:'open'});
          this.shadow.innerHTML = `<style>ul {
  padding-left: 0;
}

.container {
  max-width: 1024px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>`

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
const RECENCY_LIMIT = 86400 * 14 * 1000; // 14 days

this.state = {
pulls: [],
reviews: [],
myMerged: [],
otherMerged: [],
settingsVisible: true,
hasPulls: false,
hasReviews: false,
hasMyMerged: false,
hasOtherMerged: false,
}

this.stateMappers = {
hasOtherMerged: (otherMerged) => otherMerged?.length > 0,
hasMyMerged: (myMerged) => myMerged?.length > 0,
hasReviews: (reviews) => reviews?.length > 0,
hasPulls: (pulls) => pulls?.length > 0,
}

const userPromise = getUser()

const updatePulls = async (prs) => {
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
}

// First, make a request forcing cache. Then follow it with a non-forced request
getPulls(true).then((prs) => updatePulls(prs))
.then(() => getPulls())
.then((prs) => updatePulls(prs))

const updateMerged = async (merged) => {
let user = await userPromise;
const myMerged = merged.filter((p) => p.user.login == user.login).slice(0,MAX_PRS_PER_SECTION)
const otherMerged = merged.filter((p) => p.user.login != user.login).slice(0,MAX_PRS_PER_SECTION)

this.setState({
myMerged, otherMerged
})
}

getMerged(true).then((merged) => updateMerged(merged))
.then(() => getMerged())
.then((merged) => updateMerged(merged))

function hideSettings() {
this.setState({ settingsVisible: false })
}

function showSettings() {
this.setState({ settingsVisible: true })
}



      const __el0 = document.createElement('div');
__el0.__rawAttributes ||= {}
this.setElementAttribute(__el0, 'class', `container`);

const __el1 = document.createElement('div');
__el1.__rawAttributes ||= {}

const __el3 = document.createElement('strong');
__el3.__rawAttributes ||= {}

const __el4 = document.createElement('span');
__el4.__rawAttributes ||= {}
__el4.innerHTML = `in progress`;

            if(true) {
                __el3.appendChild(__el4);
            }
            
            if(this.state.hasPulls) {
                __el1.appendChild(__el3);
            }
            
            if(true) {
                __el0.appendChild(__el1);
            }
            const __el5 = document.createElement('ul');
__el5.__rawAttributes ||= {}

const __el6_elements = {};for(const __el6__key of Object.keys(this.state.pulls)) {
__el6_elements[__el6__key] = {};
const item = this.state.pulls[__el6__key];
const key = __el6__key;
const __el7 = document.createElement('pr-row');
__el6_elements[__el6__key].__el7 = __el7;
__el6_elements[__el6__key].__el7.__rawAttributes ||= {}
this.setElementAttribute(__el6_elements[__el6__key].__el7, 'review', `true`);
this.setElementAttribute(__el6_elements[__el6__key].__el7, 'pr', item);

            if(true) {
                __el5.appendChild(__el6_elements[__el6__key].__el7);
            }
            }

            if(true) {
                __el0.appendChild(__el5);
            }
            const __el8 = document.createElement('div');
__el8.__rawAttributes ||= {}

const __el10 = document.createElement('strong');
__el10.__rawAttributes ||= {}

const __el11 = document.createElement('span');
__el11.__rawAttributes ||= {}
__el11.innerHTML = `review requests`;

            if(true) {
                __el10.appendChild(__el11);
            }
            
            if(this.state.hasReviews) {
                __el8.appendChild(__el10);
            }
            
            if(true) {
                __el0.appendChild(__el8);
            }
            const __el12 = document.createElement('ul');
__el12.__rawAttributes ||= {}

const __el13_elements = {};for(const __el13__key of Object.keys(this.state.reviews)) {
__el13_elements[__el13__key] = {};
const item = this.state.reviews[__el13__key];
const key = __el13__key;
const __el14 = document.createElement('pr-row');
__el13_elements[__el13__key].__el14 = __el14;
__el13_elements[__el13__key].__el14.__rawAttributes ||= {}
this.setElementAttribute(__el13_elements[__el13__key].__el14, 'review', `true`);
this.setElementAttribute(__el13_elements[__el13__key].__el14, 'pr', item);

            if(true) {
                __el12.appendChild(__el13_elements[__el13__key].__el14);
            }
            }

            if(true) {
                __el0.appendChild(__el12);
            }
            const __el15 = document.createElement('div');
__el15.__rawAttributes ||= {}

const __el17 = document.createElement('strong');
__el17.__rawAttributes ||= {}

const __el18 = document.createElement('span');
__el18.__rawAttributes ||= {}
__el18.innerHTML = `submitted by me`;

            if(true) {
                __el17.appendChild(__el18);
            }
            
            if(this.state.hasMyMerged) {
                __el15.appendChild(__el17);
            }
            
            if(true) {
                __el0.appendChild(__el15);
            }
            const __el19 = document.createElement('ul');
__el19.__rawAttributes ||= {}

const __el20_elements = {};for(const __el20__key of Object.keys(this.state.myMerged)) {
__el20_elements[__el20__key] = {};
const item = this.state.myMerged[__el20__key];
const key = __el20__key;
const __el21 = document.createElement('pr-row');
__el20_elements[__el20__key].__el21 = __el21;
__el20_elements[__el20__key].__el21.__rawAttributes ||= {}
this.setElementAttribute(__el20_elements[__el20__key].__el21, 'pr', item);

            if(true) {
                __el19.appendChild(__el20_elements[__el20__key].__el21);
            }
            }

            if(true) {
                __el0.appendChild(__el19);
            }
            const __el22 = document.createElement('div');
__el22.__rawAttributes ||= {}

const __el24 = document.createElement('strong');
__el24.__rawAttributes ||= {}

const __el25 = document.createElement('span');
__el25.__rawAttributes ||= {}
__el25.innerHTML = `submitted by others`;

            if(true) {
                __el24.appendChild(__el25);
            }
            
            if(this.state.hasOtherMerged) {
                __el22.appendChild(__el24);
            }
            
            if(true) {
                __el0.appendChild(__el22);
            }
            const __el26 = document.createElement('ul');
__el26.__rawAttributes ||= {}

const __el27_elements = {};for(const __el27__key of Object.keys(this.state.otherMerged)) {
__el27_elements[__el27__key] = {};
const item = this.state.otherMerged[__el27__key];
const key = __el27__key;
const __el28 = document.createElement('pr-row');
__el27_elements[__el27__key].__el28 = __el28;
__el27_elements[__el27__key].__el28.__rawAttributes ||= {}
this.setElementAttribute(__el27_elements[__el27__key].__el28, 'pr', item);

            if(true) {
                __el26.appendChild(__el27_elements[__el27__key].__el28);
            }
            }

            if(true) {
                __el0.appendChild(__el26);
            }
            const __el29 = document.createElement('div');
__el29.__rawAttributes ||= {}

const __el30 = document.createElement('p');
__el30.__rawAttributes ||= {}

const __el31 = document.createElement('strong');
__el31.__rawAttributes ||= {}

const __el32 = document.createElement('span');
__el32.__rawAttributes ||= {}
__el32.innerHTML = `settings`;

            if(true) {
                __el31.appendChild(__el32);
            }
            
            if(true) {
                __el30.appendChild(__el31);
            }
            const __el33 = document.createElement('span');
__el33.__rawAttributes ||= {}
__el33.innerHTML = `&nbsp;(only stored in localstorage)`;

            if(true) {
                __el30.appendChild(__el33);
            }
            
            if(true) {
                __el29.appendChild(__el30);
            }
            const __el34 = document.createElement('settings-ui');
__el34.__rawAttributes ||= {}

            if(true) {
                __el29.appendChild(__el34);
            }
            
            if(true) {
                __el0.appendChild(__el29);
            }
            
            if(true) {
                this.shadow.appendChild(__el0);
            }
            


      this.render = (keys) => {
        for (const k of keys) {
          switch(k) {
            
            case 0:
              
                            if(this.state.hasPulls) {
                                __el1.appendChild(__el3);
                            } else {
                                __el3.remove();
                            }
                        
              break;
            
            case 1:
              
                    for(const __el6__key of Object.keys(__el6_elements)) {
                        if(!this.state.pulls[__el6__key]) {
                            __el6_elements[__el6__key].__el7.remove();

                            delete __el6_elements[__el6__key];
                        }
                    }
              break;
            
            case 2:
              for(const __el6__key of Object.keys(__el6_elements)) {const item = this.state.pulls[__el6__key];
this.setElementAttribute(__el6_elements[__el6__key].__el7, 'pr', item);

}
              break;
            
            case 3:
              
                        for(const __el6__key of Object.keys(this.state.pulls)) {
                            if(!__el6_elements[__el6__key]) {
                                const key = __el6__key;
                                const item = this.state.pulls[__el6__key];
                                __el6_elements[__el6__key] = {};
                                const __el7 = document.createElement('pr-row');
__el6_elements[__el6__key].__el7 = __el7;
__el6_elements[__el6__key].__el7.__rawAttributes ||= {}
this.setElementAttribute(__el6_elements[__el6__key].__el7, 'review', `true`);
this.setElementAttribute(__el6_elements[__el6__key].__el7, 'pr', item);

            if(true) {
                __el5.appendChild(__el6_elements[__el6__key].__el7);
            }
            


                            }
                        }
              break;
            
            case 4:
              
                            if(this.state.hasReviews) {
                                __el8.appendChild(__el10);
                            } else {
                                __el10.remove();
                            }
                        
              break;
            
            case 5:
              
                    for(const __el13__key of Object.keys(__el13_elements)) {
                        if(!this.state.reviews[__el13__key]) {
                            __el13_elements[__el13__key].__el14.remove();

                            delete __el13_elements[__el13__key];
                        }
                    }
              break;
            
            case 6:
              for(const __el13__key of Object.keys(__el13_elements)) {const item = this.state.reviews[__el13__key];
this.setElementAttribute(__el13_elements[__el13__key].__el14, 'pr', item);

}
              break;
            
            case 7:
              
                        for(const __el13__key of Object.keys(this.state.reviews)) {
                            if(!__el13_elements[__el13__key]) {
                                const key = __el13__key;
                                const item = this.state.reviews[__el13__key];
                                __el13_elements[__el13__key] = {};
                                const __el14 = document.createElement('pr-row');
__el13_elements[__el13__key].__el14 = __el14;
__el13_elements[__el13__key].__el14.__rawAttributes ||= {}
this.setElementAttribute(__el13_elements[__el13__key].__el14, 'review', `true`);
this.setElementAttribute(__el13_elements[__el13__key].__el14, 'pr', item);

            if(true) {
                __el12.appendChild(__el13_elements[__el13__key].__el14);
            }
            


                            }
                        }
              break;
            
            case 8:
              
                            if(this.state.hasMyMerged) {
                                __el15.appendChild(__el17);
                            } else {
                                __el17.remove();
                            }
                        
              break;
            
            case 9:
              
                    for(const __el20__key of Object.keys(__el20_elements)) {
                        if(!this.state.myMerged[__el20__key]) {
                            __el20_elements[__el20__key].__el21.remove();

                            delete __el20_elements[__el20__key];
                        }
                    }
              break;
            
            case 10:
              for(const __el20__key of Object.keys(__el20_elements)) {const item = this.state.myMerged[__el20__key];
this.setElementAttribute(__el20_elements[__el20__key].__el21, 'pr', item);

}
              break;
            
            case 11:
              
                        for(const __el20__key of Object.keys(this.state.myMerged)) {
                            if(!__el20_elements[__el20__key]) {
                                const key = __el20__key;
                                const item = this.state.myMerged[__el20__key];
                                __el20_elements[__el20__key] = {};
                                const __el21 = document.createElement('pr-row');
__el20_elements[__el20__key].__el21 = __el21;
__el20_elements[__el20__key].__el21.__rawAttributes ||= {}
this.setElementAttribute(__el20_elements[__el20__key].__el21, 'pr', item);

            if(true) {
                __el19.appendChild(__el20_elements[__el20__key].__el21);
            }
            


                            }
                        }
              break;
            
            case 12:
              
                            if(this.state.hasOtherMerged) {
                                __el22.appendChild(__el24);
                            } else {
                                __el24.remove();
                            }
                        
              break;
            
            case 13:
              
                    for(const __el27__key of Object.keys(__el27_elements)) {
                        if(!this.state.otherMerged[__el27__key]) {
                            __el27_elements[__el27__key].__el28.remove();

                            delete __el27_elements[__el27__key];
                        }
                    }
              break;
            
            case 14:
              for(const __el27__key of Object.keys(__el27_elements)) {const item = this.state.otherMerged[__el27__key];
this.setElementAttribute(__el27_elements[__el27__key].__el28, 'pr', item);

}
              break;
            
            case 15:
              
                        for(const __el27__key of Object.keys(this.state.otherMerged)) {
                            if(!__el27_elements[__el27__key]) {
                                const key = __el27__key;
                                const item = this.state.otherMerged[__el27__key];
                                __el27_elements[__el27__key] = {};
                                const __el28 = document.createElement('pr-row');
__el27_elements[__el27__key].__el28 = __el28;
__el27_elements[__el27__key].__el28.__rawAttributes ||= {}
this.setElementAttribute(__el27_elements[__el27__key].__el28, 'pr', item);

            if(true) {
                __el26.appendChild(__el27_elements[__el27__key].__el28);
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
           this.render([9,10,11]);
           break;
        
        case 'this.state.otherMerged':
           this.render([13,14,15]);
           break;
        
        case 'this.state.reviews':
           this.render([5,6,7]);
           break;
        
        case 'item':
           this.render([2,6,10,14]);
           break;
        
        case 'this.state.hasReviews':
           this.render([4]);
           break;
        
        case 'this.state.hasPulls':
           this.render([0]);
           break;
        
        case 'this.state.pulls':
           this.render([1,2,3]);
           break;
        
        case 'this.state.hasOtherMerged':
           this.render([12]);
           break;
        
        case 'this.state.hasMyMerged':
           this.render([8]);
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

