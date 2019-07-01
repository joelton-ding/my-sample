import React from 'react'
import styled from 'styled-components'

const ErrorContainer = styled('div')`
  .not-found-container {
    position: relative;
    height: 100vh;
    background: #f6f6f6;
    .notfound {
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
  }
  .notfound {
    max-width: 767px;
    width: 100%;
    line-height: 1.4;
    padding: 110px 40px;
    text-align: center;
    background: #fff;
    -webkit-box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.1);
    box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.1);
  }

  .notfound .notfound-404 {
    position: relative;
    height: 180px;
  }

  .notfound .notfound-404 h1 {
    font-family: 'Roboto', sans-serif;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 165px;
    font-weight: 700;
    margin: 0px;
    color: #262626;
    text-transform: uppercase;
  }

  .notfound .notfound-404 h1 > span {
    color: #f3ba0e;
  }

  .notfound h2 {
    font-family: 'robotobold', sans-serif;
    font-size: 22px;
    font-weight: 400;
    text-transform: uppercase;
    color: #151515;
    margin-top: 0px;
    margin-bottom: 25px;
  }
  .back {
    background: #f3ba0e;
    padding: 15px;
    font-size: 16px;
    width: 200px;
    margin: 0 auto;
    border-radius: 30px;
  }
  .back a {
    color: #fff;
  }

  @media only screen and (max-width: 767px) {
    .notfound h2 {
      font-size: 18px;
    }
  }

  @media only screen and (max-width: 480px) {
    .notfound .notfound-404 h1 {
      font-size: 141px;
    }
  }
`

const NotFoundPage = () => {
  return (
    <ErrorContainer>
      <div className="not-found-container">
        <div className="notfound">
          <div className="notfound-404">
            <h1>
              4<span>0</span>4
            </h1>
          </div>
          <h2>The page you requested could not found</h2>
          <p className="back">
            <a href="/">Back to Homepage</a>
          </p>
        </div>
      </div>
    </ErrorContainer>
  )
}
export default NotFoundPage
