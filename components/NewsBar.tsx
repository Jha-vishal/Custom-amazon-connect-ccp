import type React from "react"

interface NewsBarProps {
  onToggle: () => void
  isVisible: boolean
}

const NewsBar: React.FC<NewsBarProps> = ({ onToggle, isVisible }) => {
  return (
    <div className="news-container">
      <div className="news-content">
        <div className="switch-holder">
          <div className="switch-label">
            <span>Click here for E-911 Info</span>
          </div>
          <div className="switch-toggle">
            <input type="checkbox" id="e911Toggle" checked={isVisible} onChange={onToggle} />
            <label htmlFor="e911Toggle"></label>
          </div>
        </div>
        <div className="news-banner">
          <marquee behavior="scroll" direction="left">
            <b>Important:</b> To ensure your session ends correctly and prevent potential login issues or unauthorized
            access, always use the Logout button instead of closing the browser or tab directly.
          </marquee>
        </div>
      </div>
    </div>
  )
}

export default NewsBar

