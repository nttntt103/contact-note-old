import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <React.Fragment>
      <nav className='navbar navbar-dark bg-dark navbar-expand-sm'>
        <div className="container fw-bold">
          <Link to={'/'} className='navbar-brand'>
            <i class="fa-solid fa-file-pen text-warning mx-2"></i>
            Contact <span className='text-warning'>Note</span>
          </Link>
        </div>
      </nav>
    </React.Fragment>
  )
}

export default NavBar
