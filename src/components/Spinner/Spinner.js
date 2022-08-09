import React from 'react'
import spinnerImg from '../../assets/img/spinner.gif'

const Spinner = () => {
  return (
    <React.Fragment>
        <div>
            <img src={spinnerImg} alt='loading' className='d-block m-auto' style={{width: '150px'}}/>
        </div>
    </React.Fragment>
  )
}

export default Spinner
