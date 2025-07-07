import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react'

// Initial state
const initialState = {
  currentPage: 'home',
  isLoading: false,
  user: null,
  preferences: {
    reducedMotion: false,
    theme: 'dark',
    currency: 'INR'
  },
  portfolio: {
    totalValue: 0,
    goals: [],
    investments: []
  },
  calculatorData: {
    sip: {
      amount: 1000,
      duration: 10,
      expectedReturn: 12
    },
    goal: {
      targetAmount: 1000000,
      timeHorizon: 10,
      currentAge: 25
    }
  }
}

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
  UPDATE_CALCULATOR_DATA: 'UPDATE_CALCULATOR_DATA',
  SET_USER: 'SET_USER',
  UPDATE_PORTFOLIO: 'UPDATE_PORTFOLIO'
}

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload }
    
    case actionTypes.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload }
    
    case actionTypes.UPDATE_PREFERENCES:
      return { 
        ...state, 
        preferences: { ...state.preferences, ...action.payload } 
      }
    
    case actionTypes.UPDATE_CALCULATOR_DATA:
      return {
        ...state,
        calculatorData: {
          ...state.calculatorData,
          [action.payload.type]: {
            ...state.calculatorData[action.payload.type],
            ...action.payload.data
          }
        }
      }
    
    case actionTypes.SET_USER:
      return { ...state, user: action.payload }
    
    case actionTypes.UPDATE_PORTFOLIO:
      return {
        ...state,
        portfolio: { ...state.portfolio, ...action.payload }
      }
    
    default:
      return state
  }
}

// Create context
const AppContext = createContext()

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    dispatch({
      type: actionTypes.UPDATE_PREFERENCES,
      payload: { reducedMotion: mediaQuery.matches }
    })

    const handleChange = (e) => {
      dispatch({
        type: actionTypes.UPDATE_PREFERENCES,
        payload: { reducedMotion: e.matches }
      })
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Memoize actions to prevent infinite re-renders
  const actions = useMemo(() => ({
    setLoading: (isLoading) => {
      dispatch({ type: actionTypes.SET_LOADING, payload: isLoading })
    },

    setCurrentPage: (page) => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: page })
    },

    updatePreferences: (preferences) => {
      dispatch({ type: actionTypes.UPDATE_PREFERENCES, payload: preferences })
    },

    updateCalculatorData: (type, data) => {
      dispatch({ 
        type: actionTypes.UPDATE_CALCULATOR_DATA, 
        payload: { type, data } 
      })
    },

    setUser: (user) => {
      dispatch({ type: actionTypes.SET_USER, payload: user })
    },

    updatePortfolio: (portfolio) => {
      dispatch({ type: actionTypes.UPDATE_PORTFOLIO, payload: portfolio })
    }
  }), [])

  const value = useMemo(() => ({
    state,
    actions
  }), [state, actions])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export default AppContext 