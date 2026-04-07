import { Route, Routes } from 'react-router-dom'
import { routes } from './router/routes.jsx'
import ScrollMemory from './components/ScrollMemory.jsx'
import DifyAnimate from './components/DifyAnimate.jsx'

export default function App() {
  return (
    <>
      <ScrollMemory />
      <DifyAnimate />
      <Routes>
        {routes.map((r) => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
      </Routes>
    </>
  )
}
