import { observable, action } from 'mobx'

const listData = [
  {
    id: 1,
    title: 'About Us',
    expand: false,
    url: 'about-us',
    subList: [
      { title: 'Menu 1', expand: false, },
      { title: 'Menu 2', expand: false, },
      { title: 'Menu 3', expand: false, }
    ]
  },
  {
    id: 2,
    title: 'Investor Relations',
    expand: false,
    subList: [{
      title: 'Corporate Info',
      expand: false,
      thirdList: [{
        title: 'Corporate Profile',
        url: 'corporate-profile'
      },
      {
        title: 'Our Story',
        url: 'our-story',
      }]
    },
    {
      title: 'Google',
      url: 'https://www.google.com/'
    },
    {
      title: 'Financial Info',
      url: '',
      expand: false,
      thirdList: [{
        title: 'Financials',
        url: 'financials'
      },
      {
        title: 'Financial Highlights',
        url: 'financial-highlights',
      }]
    }, {
      title: 'Information Request',
      url: '',
      expand: false,
      thirdList: [{
        title: 'Email Alert',
        url: 'email-alert'
      },
      {
        title: 'Financial Highlights',
        url: 'financial-highlights',
      }]
    }]
  },
  {
    id: 3,
    expand: false,
    title: 'Our Services',
  },
  {
    id: 4,
    title: 'Contact Us',
    expand: false,
    subList: [
      { title: 'Menu 1', expand: false },
      { title: 'Menu 2', expand: false },
      { title: 'Menu 3', expand: false }
    ]
  }
]

const state = observable({
  lvOneClick: false,
  lvTwoClick: false,
  lvThreeClick: false,
  visible: false,
  effect: "nav",
  menuData: listData, // Header menu 1st list
  firstLevelChoose: '',
  secondLevelChoose: ''
})

const actions = {}

actions.FirstLevelClick = action((titleName) => {
  console.log('FirstLevelClick titleName', titleName)
  state.menuData.map(item => {
    if (item['subList'] && item['subList'].length > 0) {
      if (item.title === titleName && item.expand === false) {
        return item.expand = true
      } else {
        return item.expand = false
      }
    } else {
      return item.expand = false
    }
  })
})

actions.SecondLevelClick = action((titleName) => {
  // console.log('SecondLevelClick click titleName', titleName)
  // let secondLevelObj = null;
  state.menuData.map((lvOneObj) => {
    if (lvOneObj['subList'] && lvOneObj['subList'].length > 0) {
      lvOneObj['subList'].map(lvTwoObj => {
        if (lvTwoObj['title'] === titleName) {
          return lvTwoObj.expand = lvTwoObj.expand ? false : true;
          // secondLevelObj = lvTwoObj
        } else {
          return lvTwoObj.expand = false
        }
      })
      return null
    } else {
      return null
    }
  })

  // console.log('second chosen one ', JSON.parse(JSON.stringify(secondLevelObj)))
  console.log('state.menuData', JSON.parse(JSON.stringify(state.menuData)))
})

actions.FirstLevelChoose = action((labelName) => {
  // console.log('FirstLevel click triggered', labelName)
  if (state.firstLevelChoose && state.firstLevelChoose === labelName) {
    state.firstLevelChoose = null
  } else {
    state.firstLevelChoose = labelName
  }
})

actions.SecondLevelChoose = action((labelName) => {
  // console.log('SecondLevel click triggered', labelName)
  state.secondLevelChoose = labelName
})

actions.AddEffect = action(() => {
  state.visible = !state.visible
  state.effect = state.visible ? "nav open" : "nav"
})

export default { state, actions }