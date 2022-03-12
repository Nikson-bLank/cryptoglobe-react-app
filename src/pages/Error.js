import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
      <section>
          <Link to= "/">
              Back Home
          </Link>
    <h1>
        Oops ! wrong page 
    </h1>
    </section>
  )
}

export default Error