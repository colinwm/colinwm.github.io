import { getReviewState } from './github.mjs'


class PrRow extends HTMLElement {
    constructor() {
          super();
          this.componentDidMount = () => {};

          this.shadow = this.attachShadow({mode:'open'});
          this.shadow.innerHTML = `<style>li {
  list-style-type:none;
  margin-bottom: 2px;
}

div.info {
  min-width: 200px;
  color: #444;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

div.outer {
  height: 15px;
}

div.reviewers {
  height: 15px;
  display: inline-block;
  min-width: 200px;
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 10px;
}


div.title {
  height: 15px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 10px;
}

span.reviewer {
  margin-left: 10px;
}

span.reviewer.APPROVED {
  color: #2b9348;
  font-weight: bold;
}

a.invisible {
  color: inherit;
  text-decoration: inherit;
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

function formatUsername(username) {
if (username.endsWith("[bot]")) {
return username.slice(0, -5)
}
return username.slice(0, 15)
}

this.state = {
pr: { user: {} },
reviewState: [],
link: "#",
reviewers: [],
hasReviewers: false,
}

this.stateMappers = {
reviewState: (pr) => {
if (!pr.number) {
return {}
}

if (pr.merged_at == null) {
getReviewState(pr).then((reviewState) => {
this.setState({reviewState})
})
}
return {}
},
reviewers: (reviewState) => {
if (!reviewState || !reviewState.length) return [];

const reviews = {}
for(const review of reviewState)  {
if (review.user.login == this.state.pr.user.login) continue;
reviews[review.user.login] = mergeReviews(reviews[review.user.login], review)
}

const output = [];
for (const reviewer of Object.keys(reviews)) {
output.push({
name: formatUsername(reviewer),
approved: reviews[reviewer],
})
}
return output
},
hasReviewers: (reviewers) => reviewers.length > 0,
link: (pr) => pr?._links?.html?.href,
}

function mergeReviews(a, b) {
if (!a) return b.state;
if (!b) return a;

if (a.state == "APPROVED" || b.state == "APPROVED") {
return "APPROVED"
} else {
return "COMMENTED"
}
}



      const __el0 = document.createElement('a');
__el0.__rawAttributes ||= {}
this.setElementAttribute(__el0, 'class', `invisible`);
this.setElementAttribute(__el0, 'href', this.state.link);

const __el1 = document.createElement('li');
__el1.__rawAttributes ||= {}

const __el2 = document.createElement('div');
__el2.__rawAttributes ||= {}
this.setElementAttribute(__el2, 'class', `outer`);

const __el3 = document.createElement('div');
__el3.__rawAttributes ||= {}
this.setElementAttribute(__el3, 'class', `info`);

const __el4 = document.createElement('span');
__el4.__rawAttributes ||= {}
__el4.innerHTML = `#${this.state.pr.number} by ${this.state.pr.user.login}`;

            if(true) {
                __el3.appendChild(__el4);
            }
            
            if(true) {
                __el2.appendChild(__el3);
            }
            const __el5 = document.createElement('div');
__el5.__rawAttributes ||= {}
this.setElementAttribute(__el5, 'class', `reviewers`);

const __el6_elements = {};for(const __el6__key of Object.keys(this.state.reviewers)) {
__el6_elements[__el6__key] = {};
const item = this.state.reviewers[__el6__key];
const key = __el6__key;
const __el7 = document.createElement('span');
__el6_elements[__el6__key].__el7 = __el7;
__el6_elements[__el6__key].__el7.__rawAttributes ||= {}
this.setElementAttribute(__el6_elements[__el6__key].__el7, 'class', `reviewer ${item.approved}`);

const __el8 = document.createElement('span');
__el6_elements[__el6__key].__el8 = __el8;
__el6_elements[__el6__key].__el8.__rawAttributes ||= {}
__el8.innerHTML = `${item.name}`;

            if(true) {
                __el7.appendChild(__el6_elements[__el6__key].__el8);
            }
            
            if(true) {
                __el5.appendChild(__el6_elements[__el6__key].__el7);
            }
            }

            if(true) {
                __el2.appendChild(__el5);
            }
            const __el9 = document.createElement('div');
__el9.__rawAttributes ||= {}
this.setElementAttribute(__el9, 'class', `title`);

const __el10 = document.createElement('span');
__el10.__rawAttributes ||= {}
__el10.innerHTML = `${this.state.pr.title}`;

            if(true) {
                __el9.appendChild(__el10);
            }
            
            if(true) {
                __el2.appendChild(__el9);
            }
            
            if(true) {
                __el1.appendChild(__el2);
            }
            
            if(true) {
                __el0.appendChild(__el1);
            }
            
            if(true) {
                this.shadow.appendChild(__el0);
            }
            


      this.render = (keys) => {
        for (const k of keys) {
          switch(k) {
            
            case 0:
              this.setElementAttribute(__el0, 'href', this.state.link);

              break;
            
            case 1:
              __el4.innerHTML = `#${this.state.pr.number} by ${this.state.pr.user.login}`
              break;
            
            case 2:
              
                    for(const __el6__key of Object.keys(__el6_elements)) {
                        if(!this.state.reviewers[__el6__key]) {
                            __el6_elements[__el6__key].__el7.remove();

                            delete __el6_elements[__el6__key];
                        }
                    }
              break;
            
            case 3:
              for(const __el6__key of Object.keys(__el6_elements)) {const item = this.state.reviewers[__el6__key];
this.setElementAttribute(__el6_elements[__el6__key].__el7, 'class', `reviewer ${item.approved}`);
}
              break;
            
            case 4:
              for(const __el6__key of Object.keys(__el6_elements)) {const item = this.state.reviewers[__el6__key];
__el6_elements[__el6__key].__el8.innerHTML = `${item.name}`
}
              break;
            
            case 5:
              
                        for(const __el6__key of Object.keys(this.state.reviewers)) {
                            if(!__el6_elements[__el6__key]) {
                                const key = __el6__key;
                                const item = this.state.reviewers[__el6__key];
                                __el6_elements[__el6__key] = {};
                                const __el7 = document.createElement('span');
__el6_elements[__el6__key].__el7 = __el7;
__el6_elements[__el6__key].__el7.__rawAttributes ||= {}
this.setElementAttribute(__el6_elements[__el6__key].__el7, 'class', `reviewer ${item.approved}`);

const __el8 = document.createElement('span');
__el6_elements[__el6__key].__el8 = __el8;
__el6_elements[__el6__key].__el8.__rawAttributes ||= {}
__el8.innerHTML = `${item.name}`;

            if(true) {
                __el7.appendChild(__el6_elements[__el6__key].__el8);
            }
            
            if(true) {
                __el5.appendChild(__el6_elements[__el6__key].__el7);
            }
            


                            }
                        }
              break;
            
            case 6:
              __el10.innerHTML = `${this.state.pr.title}`
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
        
        case 'this.state.pr':
           this.render([1,1,6]);
           break;
        
        case 'this.state.reviewers':
           this.render([2,3,4,5]);
           break;
        
        case 'item.approved':
           this.render([3]);
           break;
        
        case 'this.state.link':
           this.render([0]);
           break;
        
        case 'item.name':
           this.render([4]);
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

customElements.define('pr-row', PrRow);

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

