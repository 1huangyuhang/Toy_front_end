import HomePage from '../views/HomePage.jsx'
import CasesPage from '../views/CasesPage.jsx'
import AboutPage from '../views/AboutPage.jsx'
import ContactPage from '../views/ContactPage.jsx'
import LoginPage from '../views/LoginPage.jsx'
import RegisterPage from '../views/RegisterPage.jsx'

export const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/cases', element: <CasesPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
]

