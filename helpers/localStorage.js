function localStorageWrap (KEY) {

    const hasLS = typeof window !== "undefined" && window.localStorage
  
    function persist (key, s) {
  
      const state = getState()
      let save
  
      // s.__time = (new Date()).getTime()
  
      state[key] = s
  
      try {
        save = JSON.stringify(state)
        localStorage.setItem(KEY, save)
      }
      catch(e) {
        console.error(e)
      }
  
      return s
  
    }
  
    function populate (key) {

      return getState()[key]
  
      // timelimit = timelimit || Infinity
  
      // var state = getState()[key]
      //   , now = (new Date()).getTime()
  
      // if (state && state.__time > now - timelimit)
      //   return state
  
    }
  
    function getState() {
  
      let state
  
      try {
        state = JSON.parse(localStorage.getItem(KEY))
  
        if (!state)
          localStorage.setItem(KEY, "{}")
  
      }
      catch(e) {
        console.error(e)
      }
  
      return state || {}
  
    }
  
    if (hasLS)
      return {
        persist : persist 
        , populate : populate 
        , getState : getState 
      }
    else
      return {
        persist : function (a, b) { return b }
        , populate : function () { return {} }
        , getState : function () { return {} }
      }
  
  }
  
  const ts = localStorageWrap("JAMES")
  
  const persist = localStorageWrap.persist = ts.persist
  const populate = localStorageWrap.populate = ts.populate
  const getState = localStorageWrap.getState = ts.getState

  export {
      localStorageWrap as default
      , persist
      , populate
      , getState
  }