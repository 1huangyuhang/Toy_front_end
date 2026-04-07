import { useState } from 'react'
import SiteNav from './SiteNav.jsx'
import SiteFooter from './SiteFooter.jsx'
import { Link } from 'react-router-dom'
import FooterReveal from '../animation/FooterReveal.jsx'
import SmartHeader from '../animation/SmartHeader.jsx'
import ReadingProgress from '../animation/ReadingProgress.jsx'

export default function SiteLayout({ children }) {
  const [menuExpanded, setMenuExpanded] = useState(false)
  return (
    <>
      <ReadingProgress />
      <SmartHeader menuExpanded={menuExpanded}>
        <div className="container flex items-center justify-between gap-5 max-md:flex-col">
          <Link className="logo" to="/" aria-label="体育加AI 首页">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40Z"
                fill="#0032FF"
              />
              <path d="M12 18L18 24L12 30V18Z" fill="white" />
              <path d="M28 18L22 24L28 30V18Z" fill="white" />
            </svg>
            <span className="text-2xl font-bold text-primary">体育加AI</span>
          </Link>
          <SiteNav onExpandedChange={setMenuExpanded} />
        </div>
      </SmartHeader>

      <main>{children}</main>
      <FooterReveal>
        <SiteFooter />
      </FooterReveal>
    </>
  )
}

