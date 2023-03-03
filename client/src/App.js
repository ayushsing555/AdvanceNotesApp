import React from 'react'
import Nav from './Component/Nav'
import { Routes, Route } from 'react-router-dom'
import Signup from './Component/Signup';
import Signin from './Component/Signin';
import Addnote from './Component/Addnote';
import Viewnote from './Component/Viewnote';
import Singlenote from './Component/Singlenote';
import Important from './Component/Important';
const App = () => {
  return (
    <>
      <Nav/>
      <hr></hr>
      <Routes>
         <Route path='/signup' element={<Signup/>}/>
         <Route path='/signin' element={<Signin/>}/>
         <Route path='/addnote' element={<Addnote/>}/>
         <Route path='/viewnote'element={<Viewnote/>}/>
         <Route path='/singlenote/:id' element={<Singlenote/>}/>
         <Route path='/important' element={<Important/>}></Route>
      </Routes>
    </>
  )
}

export default App