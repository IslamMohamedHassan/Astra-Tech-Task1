import React from 'react'
import { Helmet } from 'react-helmet-async'

function About() {
  return <>
    <Helmet>
      <title>About</title>
    </Helmet>
    <div className='d-flex justify-content-center align-items-center h-100 fs-1 fw-bolder'>
      <h2>About</h2>
    </div>
  </>
}

export default About