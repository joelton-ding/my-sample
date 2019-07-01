import React from 'react'
import { observer } from 'mobx-react'
import MenuStore from '../store/MenuStore'

const HeaderMenu = observer(({ menuData }) => {
    return (
        <ul className="nav-links">
            {menuData.map((firstLV, index) => {
                const { expand, subList } = firstLV
                // if (check subList is not undefined and length > 0) {
                //   if expand is true {
                //     class open
                //   } else {
                //     class close
                //   }
                // }else{
                //   hidden class
                // }
                let classN = ''
                if (subList !== undefined && subList.length > 0) {
                    if (expand === true) {
                        classN = 'open'
                    } else {
                        classN = 'close'
                    }
                } else {
                    classN = 'hidden'
                }
                return (
                    <li className={classN} onClick={() => {
                        // if (firstLV.expand === true) {
                        //   firstLV.expand = false
                        // } else {
                        //   firstLV.expand = true
                        // }
                        firstLV.expand = !firstLV.expand
                        console.log('click expand minus')
                    }}
                        key={index}><a href={firstLV.url}>{firstLV.title}</a>
                        <ul className="nav-sub">
                            <MenuSecondLV item={firstLV} />
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
})

// Second Level LI
const MenuSecondLV = observer(({ item }) => {
    //Get the data from subList
    const { subList = [], expand } = item;
    //Check subList wether is empty
    if (subList.length > 0) {
        console.log(subList + '=====')
        //Check is open
        if (expand) {
            return (
                <React.Fragment>
                    {subList.map((sLV, index) => {
                        return <li key={index}><a href={sLV.url}>{sLV.title}</a>
                            <ul className="nav-sub-third">
                                <MenuThirdLV thirdData={sLV} />
                            </ul>
                        </li>
                    })}
                </React.Fragment>
            )
        } else {
            return null
        }
    } else {
        return null
    }
})

//Third LI
const MenuThirdLV = observer(({ thirdData }) => {
    const { thirdList } = thirdData
    return (
        <React.Fragment>
            {thirdList.map((list, index) => {
                return <li key={index}>{list.title}</li>
            })}
        </React.Fragment>
    )
})

const Header = () => {
    let { state: { effect, menuData }, actions: { AddEffect } } = MenuStore
    console.log(JSON.stringify(MenuStore))
    return (
        <header>
            <div className="header-content clearfix">
                <div className="logo-content">
                    <h1 className="logo"><a href="#1">Logo</a></h1>
                </div>
                <div className="nav-content">
                    <nav className={effect} >
                        <div className="hamburger" onClick={() => {
                            AddEffect()
                            console.log('hamburger click')
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
