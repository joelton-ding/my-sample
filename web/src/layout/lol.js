import React from 'react'
import { observer } from 'mobx-react'
import MenuStore from '../store/MenuStore'

const HeaderMenu = observer(() => {
    let { state: { menuData } } = MenuStore
    console.log('menuData==', menuData)

    return (
        <ul className="nav-links">
            {menuData.map((firstLV, index) => {
                return (
                    <li key={index}><a href={firstLV.url}>{firstLV.title}</a>
                        <ul className="nav-sub">
                            <MenuSecondLV />
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
})

// Second Level LI
const MenuSecondLV = observer(() => {
    let { state: { menuData } } = MenuStore
    console.log(menuData + 'asd')
    return (
        <React.Fragment>
            {subList.map() => {
      return <li><a href="#1">aaaa</a></li>
            }}
    </React.Fragment>
    )
})

const Header = () => {
    let { state: { effect, menuData }, actions: { AddEffect } } = MenuStore
    // console.log(MenuStore)
    return (
        <header>
            <div className="header-content clearfix">
                <div className="logo-content">
                    <h1 className="logo"><a href="#1">Logo</a></h1>
                </div>
                <div className="nav-content">
                    <nav className={effect} >
                        <div className="hamburger" onClick={() => { AddEffect() }}>
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
