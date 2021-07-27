import { getReviewState } from './github.mjs'
import renderDate from '../../util/js/human_date.mjs'


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
  flex-shrink: 0;
  width: 100px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 15px;
}

div.author {
  margin-left: 15px;
  width: 75px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow:hidden;
  flex-shrink: 0;
}

div.outer {
  display: flex;
  height: 15px;
  overflow: hidden;
}

div.reviewers {
  flex-shrink: 1;
  height: 15px;
  display: inline-block;
  width: 200px;
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
  margin-left: 10px;
}

div.suffix {
  height: 15px;
  display: inline-block;
  overflow: hidden;
  color: #666;
  margin-left: 20px;
  flex-shrink: 10;
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

@media only screen and (max-width: 1024px) {
  span.repo_name {
    display: none;
  }

  div.info {
    display:none;
  }

  div.reviewers {
    width: 100px;
  }
}
</style>`

          this.props = ['review'];
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
      
      const attributes = ['review'];


function formatUsername(username) {
if (!username) return username;

if (username.endsWith("[bot]")) {
return username.slice(0, -5)
}
return username.slice(0, 15)
}

this.state = {
pr: { base: { repo: {} }, user: {} },
author: "",
reviewState: [],
reviewers: [],
link: "#",
suffix: "",
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
link: (pr) => pr?._links?.html?.href,
author: (pr) => formatUsername(pr.user.login),
suffix: (pr) => {
if (pr.merged_at) {
return `merged ${renderDate(new Date(pr.updated_at))}`
} else {
return `updated ${renderDate(new Date(pr.updated_at))}`
}
},
hasReviewers: (review) => review == "true",
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
this.setElementAttribute(__el0, 'target', `_blank`);
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
this.setElementAttribute(__el4, 'class', `repo_name`);

const __el5 = document.createElement('span');
__el5.__rawAttributes ||= {}
__el5.innerHTML = `${this.state.pr.base.repo.name}`;

            if(true) {
                __el4.appendChild(__el5);
            }
            
            if(true) {
                __el3.appendChild(__el4);
            }
            
            if(true) {
                __el2.appendChild(__el3);
            }
            const __el6 = document.createElement('div');
__el6.__rawAttributes ||= {}
this.setElementAttribute(__el6, 'class', `author`);

const __el7 = document.createElement('span');
__el7.__rawAttributes ||= {}
__el7.innerHTML = `${this.state.author}`;

            if(true) {
                __el6.appendChild(__el7);
            }
            
            if(true) {
                __el2.appendChild(__el6);
            }
            const __el8 = document.createElement('div');
__el8.__rawAttributes ||= {}

const __el10 = document.createElement('div');
__el10.__rawAttributes ||= {}
this.setElementAttribute(__el10, 'class', `reviewers`);

const __el11_elements = {};for(const __el11__key of Object.keys(this.state.reviewers)) {
__el11_elements[__el11__key] = {};
const item = this.state.reviewers[__el11__key];
const key = __el11__key;
const __el12 = document.createElement('span');
__el11_elements[__el11__key].__el12 = __el12;
__el11_elements[__el11__key].__el12.__rawAttributes ||= {}
this.setElementAttribute(__el11_elements[__el11__key].__el12, 'class', `reviewer ${item.approved}`);

const __el13 = document.createElement('span');
__el11_elements[__el11__key].__el13 = __el13;
__el11_elements[__el11__key].__el13.__rawAttributes ||= {}
__el13.innerHTML = `${item.name}`;

            if(true) {
                __el12.appendChild(__el11_elements[__el11__key].__el13);
            }
            
            if(true) {
                __el10.appendChild(__el11_elements[__el11__key].__el12);
            }
            }

            if(this.state.hasReviewers) {
                __el8.appendChild(__el10);
            }
            
            if(true) {
                __el2.appendChild(__el8);
            }
            const __el14 = document.createElement('div');
__el14.__rawAttributes ||= {}
this.setElementAttribute(__el14, 'class', `title`);

const __el15 = document.createElement('span');
__el15.__rawAttributes ||= {}
__el15.innerHTML = `${this.state.pr.title}`;

            if(true) {
                __el14.appendChild(__el15);
            }
            
            if(true) {
                __el2.appendChild(__el14);
            }
            const __el17 = document.createElement('div');
__el17.__rawAttributes ||= {}
this.setElementAttribute(__el17, 'class', `suffix`);

const __el18 = document.createElement('span');
__el18.__rawAttributes ||= {}
__el18.innerHTML = `${this.state.suffix}`;

            if(true) {
                __el17.appendChild(__el18);
            }
            
            if(this.state.suffix) {
                __el2.appendChild(__el17);
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
              __el5.innerHTML = `${this.state.pr.base.repo.name}`
              break;
            
            case 2:
              __el7.innerHTML = `${this.state.author}`
              break;
            
            case 3:
              
                            if(this.state.hasReviewers) {
                                __el8.appendChild(__el10);
                            } else {
                                __el10.remove();
                            }
                        
              break;
            
            case 4:
              
                    for(const __el11__key of Object.keys(__el11_elements)) {
                        if(!this.state.reviewers[__el11__key]) {
                            __el11_elements[__el11__key].__el12.remove();

                            delete __el11_elements[__el11__key];
                        }
                    }
              break;
            
            case 5:
              for(const __el11__key of Object.keys(__el11_elements)) {const item = this.state.reviewers[__el11__key];
this.setElementAttribute(__el11_elements[__el11__key].__el12, 'class', `reviewer ${item.approved}`);
}
              break;
            
            case 6:
              for(const __el11__key of Object.keys(__el11_elements)) {const item = this.state.reviewers[__el11__key];
__el11_elements[__el11__key].__el13.innerHTML = `${item.name}`
}
              break;
            
            case 7:
              
                        for(const __el11__key of Object.keys(this.state.reviewers)) {
                            if(!__el11_elements[__el11__key]) {
                                const key = __el11__key;
                                const item = this.state.reviewers[__el11__key];
                                __el11_elements[__el11__key] = {};
                                const __el12 = document.createElement('span');
__el11_elements[__el11__key].__el12 = __el12;
__el11_elements[__el11__key].__el12.__rawAttributes ||= {}
this.setElementAttribute(__el11_elements[__el11__key].__el12, 'class', `reviewer ${item.approved}`);

const __el13 = document.createElement('span');
__el11_elements[__el11__key].__el13 = __el13;
__el11_elements[__el11__key].__el13.__rawAttributes ||= {}
__el13.innerHTML = `${item.name}`;

            if(true) {
                __el12.appendChild(__el11_elements[__el11__key].__el13);
            }
            
            if(true) {
                __el10.appendChild(__el11_elements[__el11__key].__el12);
            }
            


                            }
                        }
              break;
            
            case 8:
              __el15.innerHTML = `${this.state.pr.title}`
              break;
            
            case 9:
              
                            if(this.state.suffix) {
                                __el2.appendChild(__el17);
                            } else {
                                __el17.remove();
                            }
                        
              break;
            
            case 10:
              __el18.innerHTML = `${this.state.suffix}`
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
        
        case 'this.state.author':
           this.render([2]);
           break;
        
        case 'this.state.reviewers':
           this.render([4,5,6,7]);
           break;
        
        case 'item.approved':
           this.render([5]);
           break;
        
        case 'this.state.hasReviewers':
           this.render([3]);
           break;
        
        case 'this.state.suffix':
           this.render([9,10]);
           break;
        
        case 'this.state.link':
           this.render([0]);
           break;
        
        case 'item.name':
           this.render([6]);
           break;
        
        case 'this.state.pr':
           this.render([1,8]);
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
      return ['review']
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

