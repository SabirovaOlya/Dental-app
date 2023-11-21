import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from '../../utils/contants/routes'

function Router() {
  return (
    <div>
      <Routes>
        {
          routes?.map((item, index)=>(
            <Route
              path={item?.path}
              element={item?.element}
              key={item?.id}
            />
          ))
        }
      </Routes>
    </div>
  )
}

export default Router