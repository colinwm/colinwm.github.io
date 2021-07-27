

class SettingsUi extends HTMLElement {
    constructor() {
          super();
          this.componentDidMount = () => {};

          this.shadow = this.attachShadow({mode:'open'});
          this.shadow.innerHTML = `<style>input {
  margin-left: 10px;
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

this.state = {
token: window.localStorage.getItem('token') || "",
repos: JSON.parse(window.localStorage.getItem('repos') || "[]")
}

function save() {
window.localStorage.setItem('token', this.refs.token.value)
this.setState({
token: this.refs.token.value,
})
window.localStorage.removeItem('user')
window.localStorage.removeItem('pulls')
window.localStorage.removeItem('merged')
window.location.reload();
}

function remove(index) {
this.state.repos.splice(index, 1)
this.setState({repos: this.state.repos})
saveRepos()
window.location.reload();
}

function addRepo() {
this.state.repos.push(this.refs.add_repo.value);
this.setState({repos: this.state.repos})
this.refs.add_repo.value = ""
saveRepos()
window.location.reload();
}

const saveRepos = () => {
window.localStorage.setItem('repos', JSON.stringify(this.state.repos))
window.localStorage.removeItem('pulls')
window.localStorage.removeItem('merged')
}



      const __el0 = document.createElement('p');
__el0.__rawAttributes ||= {}

const __el1 = document.createElement('span');
__el1.__rawAttributes ||= {}
__el1.innerHTML = `github PAT token`;

            if(true) {
                __el0.appendChild(__el1);
            }
            const __el2 = document.createElement('input');
__el2.__rawAttributes ||= {}
this.setElementAttribute(__el2, 'type', `text`);
this.setElementAttribute(__el2, 'value', this.state.token);

            if(true) {
                __el0.appendChild(__el2);
            }
            
            if(true) {
                this.shadow.appendChild(__el0);
            }
            
const __el3 = document.createElement('p');
__el3.__rawAttributes ||= {}

const __el4 = document.createElement('i');
__el4.__rawAttributes ||= {}

const __el5 = document.createElement('span');
__el5.__rawAttributes ||= {}
__el5.innerHTML = `Note:`;

            if(true) {
                __el4.appendChild(__el5);
            }
            
            if(true) {
                __el3.appendChild(__el4);
            }
            const __el6 = document.createElement('span');
__el6.__rawAttributes ||= {}
__el6.innerHTML = `&nbsp; give repos and user access to this PAT`;

            if(true) {
                __el3.appendChild(__el6);
            }
            
            if(true) {
                this.shadow.appendChild(__el3);
            }
            
const __el7 = document.createElement('p');
__el7.__rawAttributes ||= {}

const __el8 = document.createElement('button');
__el8.__rawAttributes ||= {}
__el8.addEventListener('click', save.bind(this));

const __el9 = document.createElement('span');
__el9.__rawAttributes ||= {}
__el9.innerHTML = `save`;

            if(true) {
                __el8.appendChild(__el9);
            }
            
            if(true) {
                __el7.appendChild(__el8);
            }
            
            if(true) {
                this.shadow.appendChild(__el7);
            }
            
const __el10 = document.createElement('p');
__el10.__rawAttributes ||= {}

const __el11 = document.createElement('span');
__el11.__rawAttributes ||= {}
__el11.innerHTML = `repos`;

            if(true) {
                __el10.appendChild(__el11);
            }
            
            if(true) {
                this.shadow.appendChild(__el10);
            }
            
const __el12 = document.createElement('ul');
__el12.__rawAttributes ||= {}

const __el13_elements = {};for(const __el13__key of Object.keys(this.state.repos)) {
__el13_elements[__el13__key] = {};
const item = this.state.repos[__el13__key];
const key = __el13__key;
const __el14 = document.createElement('li');
__el13_elements[__el13__key].__el14 = __el14;
__el13_elements[__el13__key].__el14.__rawAttributes ||= {}

const __el15 = document.createElement('span');
__el13_elements[__el13__key].__el15 = __el15;
__el13_elements[__el13__key].__el15.__rawAttributes ||= {}
__el15.innerHTML = `${item} &nbsp;`;

            if(true) {
                __el14.appendChild(__el13_elements[__el13__key].__el15);
            }
            const __el16 = document.createElement('a');
__el13_elements[__el13__key].__el16 = __el16;
__el13_elements[__el13__key].__el16.__rawAttributes ||= {}
this.setElementAttribute(__el13_elements[__el13__key].__el16, 'href', `#`);
__el13_elements[__el13__key].__el16.addEventListener('click', remove.bind(this, key).bind(this));

const __el17 = document.createElement('span');
__el13_elements[__el13__key].__el17 = __el17;
__el13_elements[__el13__key].__el17.__rawAttributes ||= {}
__el17.innerHTML = `(remove)`;

            if(true) {
                __el16.appendChild(__el13_elements[__el13__key].__el17);
            }
            
            if(true) {
                __el14.appendChild(__el13_elements[__el13__key].__el16);
            }
            
            if(true) {
                __el12.appendChild(__el13_elements[__el13__key].__el14);
            }
            }

            if(true) {
                this.shadow.appendChild(__el12);
            }
            
const __el18 = document.createElement('p');
__el18.__rawAttributes ||= {}

const __el19 = document.createElement('span');
__el19.__rawAttributes ||= {}
__el19.innerHTML = `add repo`;

            if(true) {
                __el18.appendChild(__el19);
            }
            const __el20 = document.createElement('input');
__el20.__rawAttributes ||= {}
this.setElementAttribute(__el20, 'type', `text`);

            if(true) {
                __el18.appendChild(__el20);
            }
            
            if(true) {
                this.shadow.appendChild(__el18);
            }
            
const __el21 = document.createElement('p');
__el21.__rawAttributes ||= {}

const __el22 = document.createElement('i');
__el22.__rawAttributes ||= {}

const __el23 = document.createElement('span');
__el23.__rawAttributes ||= {}
__el23.innerHTML = `Note:`;

            if(true) {
                __el22.appendChild(__el23);
            }
            
            if(true) {
                __el21.appendChild(__el22);
            }
            const __el24 = document.createElement('span');
__el24.__rawAttributes ||= {}
__el24.innerHTML = `&nbsp; add any repos you'd like to track`;

            if(true) {
                __el21.appendChild(__el24);
            }
            
            if(true) {
                this.shadow.appendChild(__el21);
            }
            
const __el25 = document.createElement('p');
__el25.__rawAttributes ||= {}

const __el26 = document.createElement('button');
__el26.__rawAttributes ||= {}
__el26.addEventListener('click', addRepo.bind(this));

const __el27 = document.createElement('span');
__el27.__rawAttributes ||= {}
__el27.innerHTML = `add`;

            if(true) {
                __el26.appendChild(__el27);
            }
            
            if(true) {
                __el25.appendChild(__el26);
            }
            
            if(true) {
                this.shadow.appendChild(__el25);
            }
            


      this.render = (keys) => {
        for (const k of keys) {
          switch(k) {
            
            case 0:
              this.setElementAttribute(__el2, 'value', this.state.token);

              break;
            
            case 1:
              
                    for(const __el13__key of Object.keys(__el13_elements)) {
                        if(!this.state.repos[__el13__key]) {
                            __el13_elements[__el13__key].__el14.remove();

                            delete __el13_elements[__el13__key];
                        }
                    }
              break;
            
            case 2:
              for(const __el13__key of Object.keys(__el13_elements)) {const item = this.state.repos[__el13__key];
__el13_elements[__el13__key].__el15.innerHTML = `${item} &nbsp;`
}
              break;
            
            case 3:
              
                        for(const __el13__key of Object.keys(this.state.repos)) {
                            if(!__el13_elements[__el13__key]) {
                                const key = __el13__key;
                                const item = this.state.repos[__el13__key];
                                __el13_elements[__el13__key] = {};
                                const __el14 = document.createElement('li');
__el13_elements[__el13__key].__el14 = __el14;
__el13_elements[__el13__key].__el14.__rawAttributes ||= {}

const __el15 = document.createElement('span');
__el13_elements[__el13__key].__el15 = __el15;
__el13_elements[__el13__key].__el15.__rawAttributes ||= {}
__el15.innerHTML = `${item} &nbsp;`;

            if(true) {
                __el14.appendChild(__el13_elements[__el13__key].__el15);
            }
            const __el16 = document.createElement('a');
__el13_elements[__el13__key].__el16 = __el16;
__el13_elements[__el13__key].__el16.__rawAttributes ||= {}
this.setElementAttribute(__el13_elements[__el13__key].__el16, 'href', `#`);
__el13_elements[__el13__key].__el16.addEventListener('click', remove.bind(this, key).bind(this));

const __el17 = document.createElement('span');
__el13_elements[__el13__key].__el17 = __el17;
__el13_elements[__el13__key].__el17.__rawAttributes ||= {}
__el17.innerHTML = `(remove)`;

            if(true) {
                __el16.appendChild(__el13_elements[__el13__key].__el17);
            }
            
            if(true) {
                __el14.appendChild(__el13_elements[__el13__key].__el16);
            }
            
            if(true) {
                __el12.appendChild(__el13_elements[__el13__key].__el14);
            }
            


                            }
                        }
              break;
            
            default:
              break;
          }
        }
      }

      
      this.refs.token = __el2;
      
      this.refs.add_repo = __el20;
      

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
        
        case 'item':
           this.render([2]);
           break;
        
        case 'this.state.token':
           this.render([0]);
           break;
        
        case 'this.state.repos':
           this.render([1,2,3]);
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

customElements.define('settings-ui', SettingsUi);

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

