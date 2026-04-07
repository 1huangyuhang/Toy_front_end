import HomePage from '../pages/HomePage.jsx'
import CasesPage from '../pages/CasesPage.jsx'
import ProductsPage from '../pages/ProductsPage.jsx'
import SolutionsPage from '../pages/SolutionsPage.jsx'
import AboutPage from '../pages/AboutPage.jsx'
import ContactPage from '../pages/ContactPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'

export const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/solutions', element: <SolutionsPage /> },
  { path: '/cases', element: <CasesPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
]

