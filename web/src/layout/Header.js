import React from 'react'
import { observer } from 'mobx-react'
import MenuStore from '../store/MenuStore'

const HeaderMenu = observer(({ menuData }) => {
  return (
    <ul className="nav-links">
      {menuData.map((item, index) => {
        const { subList, expand } = item
        let classN = 'hidden'
        if (subList && subList.length > 0) {
          classN = expand === true ? 'open' : 'close'
        }
        return (
          <li
            className={classN}
            key={index}
          >
            <a
              href={item.url}
              onMouseOver={() => {
                MenuStore.actions.FirstLevelClick(item.title)
              }}
            >{item.title}</a>
            {
              classN === 'open' &&
              <ul className="nav-sub">
                <MenuSecond item={JSON.parse(JSON.stringify(item))} />
              </ul>
            }
          </li>
        )
      })}
    </ul>
  )
})

// Second Level LI
const MenuSecond = observer(({ item }) => {
  let topObject = JSON.parse(JSON.stringify(item))
  let jsxSecondDisplay = topObject.subList.map((obj, index) => {
    const { thirdList, expand, url } = obj
    let finalUrl = !!url && url.length > 0 ? url : null
    let iconStyle = 'hidden'
    if (thirdList && thirdList.length > 0) {
      iconStyle = expand === true ? 'open' : 'close'
    }
    // console.log('MenuSecond classN', obj, iconStyle)
    return (
      <li
        className={iconStyle}
        key={index}
      >
        <a
          href={finalUrl}
          onMouseOver={() => { MenuStore.actions.SecondLevelClick(obj.title) }}
        >{obj.title}</a>
        {
          iconStyle === 'open' &&
          <ul className="nav-sub-third">
            <MenuThird item={obj} />
          </ul>
        }
      </li>
    )
  })
  return (<React.Fragment>{jsxSecondDisplay}</React.Fragment>)
})

const MenuThird = observer((param) => {
  let secondObj = JSON.parse(JSON.stringify(param['item']))
  console.log('MenuThird secondObj', secondObj)
  const { expand, thirdList } = secondObj
  let jsxThirdItems = null;
  if (expand === true) {
    if (thirdList && thirdList.length > 0) {
      jsxThirdItems = thirdList.map((item, index) => {
        console.log('thirdList.map item', item)
        return <li key={index}><a href={item.url}>{item.title}</a></li>
      })
    }
  }
  return (<React.Fragment>{jsxThirdItems}</React.Fragment>)
})

const Header = () => {
  let { state: { effect, menuData }, actions: { AddEffect } } = MenuStore
  // console.log(JSON.parse(JSON.stringify(MenuStore)))
  return (
    <header>
      <div className="header-content clearfix">
        <div className="logo-content">
          <h1 className="logo"><a href="/">Logo</a></h1>
        </div>
        <div className="nav-content">
          <nav className={effect} >
            <div
              className="hamburger" onClick={() => {
                AddEffect()
              }}>
              <div className="line1" />
              <div className="line2" />
              <div className="line3" />
            </div>
            <HeaderMenu menuData={menuData} />
          </nav>
        </div>
      </div>
    </header >
  )
}

export default observer(Header)
