import React from 'react'
import { observer } from 'mobx-react'
import MenuStore from '../store/MenuStore'

const HeaderMenu = observer(({ menuData }) => {
    // console.log('menuData 11111', JSON.parse(JSON.stringify(menuData)))
    return (
        <ul className="nav-links">
            {menuData.map((item, index) => {
                const { subList, expand } = item
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
                    <li
                        className={classN}
                        key={index}
                        onClick={() => {
                            item.expand = !item.expand
                        }}
                    >
                        <a href={item.url}>{item.title}</a>
                        <ul className={classN}>
                            <MenuSecond item={item} />
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
})

//Second Level LI
const MenuSecond = observer((param) => {
    let { actions: { SecondLevelChoose } } = MenuStore
    // console.log('MenuSecond param.item', JSON.parse(JSON.stringify(param.item)))
    // console.log('MenuSecond param.isopen', param.isopen)
    let topObject = JSON.parse(JSON.stringify(param.item))

    let jsxSecondDisplay = null
    if (param.isopen === 'true') {
        if (topObject['subList'] && topObject['subList'].length > 0) {
            jsxSecondDisplay = topObject.subList.map((item, index) => {
                console.log('MenuSecond subList item', JSON.parse(JSON.stringify(item)))
                let classN = ''
                let chooseSecondLabel = MenuStore.state.secondLevelChoose
                if (chooseSecondLabel && chooseSecondLabel === item.title) {
                    classN = 'open'
                } else {
                    classN = 'close'
                }
                return (
                    <li
                        key={index}
                        className={classN}
                        onClick={() => {
                            SecondLevelChoose(item.title)
                        }}
                    >
                        <a href="#1">{item.title}</a>
                        <ul className="nav-sub-third">
                            <MenuThird item={item['thirdList']} isOpen={classN === 'open' ? 'true' : 'false'} />
                        </ul>
                    </li>
                )
            })
        }
    }
    return (<React.Fragment>{jsxSecondDisplay}</React.Fragment>)
})

const MenuThird = observer((param) => {
    console.log(param)
    console.log('Third param.item', param['item'])
    console.log('Third param.isOPen', param['isOpen'])

    let jsxThirdDisplay = null
    if (param.isOpen === 'true') {
        let thirdList = param['item']
        let jsxThirdItem = null;
        if (thirdList && thirdList.length > 0) {
            jsxThirdItem = thirdList.map((item, index) => {
                return <li key={index}><a>{item.title}</a></li>
            })
        } return <span>{jsxThirdItem}</span>
    } return (<React.Fragment>{jsxThirdDisplay}</React.Fragment>)
})


// Second Level LI
// const MenuSecondLV = observer(({item}) => {
//   const { subList = [], expand } = item;
//   if (subList && subList.length > 0) {
//     console.log(JSON.parse(JSON.stringify(subList)) + '=====')
//     if (expand) {
//       return (
//         <React.Fragment>
//           {
//             subList.map((sLV, index) => {
//               console.log('sLV: ', JSON.parse(JSON.stringify(sLV)))
//               return (
//                 <li key={index}>
//                   <a href={sLV.url}>{sLV.title}</a>
//                   {
//                     sLV['thirdList'] && sLV['thirdList'].length > 0 &&
//                     <ul className="nav-sub-third">
//                       <MenuThirdLV thirdData={sLV} />
//                     </ul>
//                   }
//                 </li>
//               )
//             })
//           }
//         </React.Fragment>
//       )
//     } else {
//       return null
//     }
//   } else {
//     return null
//   }
// })

//Third LI
// const MenuThirdLV = observer(({ thirdData }) => {
//   const { thirdList } = thirdData
//   if (thirdList && thirdList.length > 0) {
//     return (
//       <React.Fragment>
//         {thirdList.map((list, index) => {
//           return <li key={index}>{list.title}</li>
//         })}
//       </React.Fragment>
//     )
//   }
// })

const Header = () => {
    let { state: { effect, menuData }, actions: { AddEffect } } = MenuStore
    // console.log(JSON.parse(JSON.stringify(MenuStore)))
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
