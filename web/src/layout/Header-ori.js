import React from 'react'
// import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import MenuStore from '../store/MenuStore'

//Second LI
const SubMenu = observer(({ item }) => {
  console.log('SubMenu1111', item.expand)
  if (item.expand === true) {
    console.log('SubMenu2222', item)
    if (!item.subList) {
      return null;
    }
    return item.subList && item.subList.map((sub, subIndex) => {
      console.log('subList', sub)
      return <li key={subIndex}><a href="#1">{sub.title}</a></li>
    })
  } else {
    console.log('SubMenu3333', item)
    return null
  }
})

const HeaderView = observer(({ item, index }) => {
  let cName = ''

  const { subList } = item;
  if (subList && subList.length > 0) {
    if (item.expand) {
      cName = 'open'
    } else {
      cName = ''
    }
  } else {
    cName = 'hidden'
  }
  console.log('subList===', typeof subList)

  return (<React.Fragment>
    <li key={item.id} className={cName} onClick={() => {
      console.log('before onClick', item.expand);
      item.expand = !item.expand;
      console.log('after onClick', item.expand);

    }}><a href="#1">{item.title}</a>
      <ul className="nav-sub">
        <SubMenu item={item} />
      </ul>
    </li>
  </React.Fragment>)
})

const Header = () => {
  let { state: { effect, menuData }, actions: { AddEffect } } = MenuStore
  console.log(MenuStore)
  console.log('menuData==', menuData)

  return (
    <header>
      <div className="header-content clearfix">
        <div className="logo-content">
          <h1 className="logo"><a href="#1">Logo</a></h1>
        </div>
        <div className="nav-content">
          <nav className={effect}>
            <div className="hamburger" onClick={() => { AddEffect() }}>
              <div className="line1" />
              <div className="line2" />
              <div className="line3" />
            </div>
            <ul className="nav-links">
              {menuData.map((item, index) => {
                return <HeaderView item={item} index={index} />
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header >
  )
}

export default observer(Header)
