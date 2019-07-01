import React from 'react'
import styled from 'styled-components'

const BrowserDetectContainer = styled('div')`
.browser-container {
  position: relative;
  height: 100vh;
  background: #f6f6f6;
  .browser-inner {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
}
.browser-inner {
  max-width: 767px;
  width: 100%;
  line-height: 1.4;
  padding: 110px 40px;
  text-align: center;
  background: #fff;
  -webkit-box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.1);
}

.browser-inner .browser {
  position: relative;
  height: 180px;
}

.browser-inner .browser h1 {
  font-family: 'Roboto', sans-serif;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: 700;
  margin: 0px;
  color: #262626;
}
`

const OldBrowserPage = () => {
  return (
    <BrowserDetectContainer>
      <div className="browser-container">
        <div className="browser-inner">
          <div className="browser">
            <h1>
              We've noticed that you're using an unsupported version of Internet Explorer. For the best experience please <a href="http://windows.microsoft.com/en-au/internet-explorer/download-ie">upgrade</a> or <a href="http://browsehappy.com/" rel="nofollow">use another browser</a>
            </h1>
          </div>
        </div>
      </div>
    </BrowserDetectContainer>
  )
}
export default OldBrowserPage

