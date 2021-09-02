import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer, { AMOUNT, CAL, ClearCart, Decrease, DISPLAY, Increse, LOADING, RemoveItem } from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initState ={
  loading:false,
  cart:cartItems,
  total:0,
  amount:0,
}

const AppProvider = ({ children }) => {
  const [state,dispatch] = useReducer(reducer,initState)
  const clearCart = ()=>{
    dispatch({type:ClearCart})
  }
  const removeItem = (id)=>{
    dispatch({type:RemoveItem,payload:id})
  }
  const increaseAmount = (id)=>{
    dispatch({type:Increse,payload:id})
  }
  const decreaseAmount = (id)=>{
    dispatch({type:Decrease,payload:id})
  }
  const fetchData = async()=>{
    dispatch({type:LOADING})
    const getData = await fetch(url)
    const data = await getData.json();
    dispatch({type:DISPLAY,payload:data})
  }
  const controlAmount = (id,type)=>{
    dispatch({type:AMOUNT,payload:{id,type}})
  }
  useEffect(()=>{
    fetchData();
  },[])
  useEffect(()=>{
    dispatch({type:CAL})
  },[state.cart])
  return (
    <AppContext.Provider value={{...state,clearCart,removeItem,increaseAmount,decreaseAmount,controlAmount}}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
