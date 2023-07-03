import React from 'react'
import { Link } from 'react-router-dom'

export function LgButton({ path, label }) {
  return (
    <div className="lg-button">
      <Link to={path} className="text-center">
        {label}
      </Link>
    </div>
  )
}

export function TwinButton({ path1, label1, path2, label2 }) {
  return (
    
    <div className="md-button">
      <Link to={path1} className="button text-center first-btn">
        {label1}
      </Link>
      <button onClick={path2} className="button text-center second-btn">
        {label2}
      </button>
    </div>
  )
}
