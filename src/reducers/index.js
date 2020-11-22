const initialUser = {
  userName: {
    value: "",
    isValidate: true,
    errorMessage: '',
    touched: false
  },
  userGender: {
    value: ''
  },
  userCreditCard: {
    value: "",
    isValidate: true,
    errorMessage: '',
    touched: false
  },
  withLoyaltyProgram: {
    value: false
  },
  userCoupon: {
    value: "",
    isValidate: true,
    errorMessage: '',
    touched: false
  },
  date: new Date()
}

const initialState = {
  user: initialUser,
  users: [
    {
      userName: 'Лиза Нуркова',
      userGender: 'Женский',
      userCreditCard: '4747-6548-5468-1323',
      withLoyaltyProgram: false,
      userCoupon: '',
      date: new Date()
    },
    {
      userName: 'Вадим Иванов',
      userGender: 'Мужской',
      userCreditCard: '4756-6532-5218-1893',
      withLoyaltyProgram: true,
      userCoupon: '58623645',
      date: new Date()
    },
    {
      userName: 'Люда Петровна',
      userGender: 'Женский',
      userCreditCard: '6578-3456-8763-5156',
      withLoyaltyProgram: true,
      userCoupon: '93849383',
      date: new Date()
    }
  ],
  popupActive: false,
  goToPageOurList: false
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'HANDLE_CHANGE': {
      const target = action.payload.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;

      return {
        ...state,
        user: {
          ...state.user,
          [name]: { ...state.user[name], value: value }
        }
      }
    }

    case 'HANDLE_FOCUS': {
      const target = action.payload.target;
      return {
        ...state,
        user: {
          ...state.user,
          [target.name]: { ...state.user[target.name], isValidate: true }
        }
      }
    }

    case 'HANDLE_BLUR': {
      const target = action.payload.target
      return {
        ...state,
        user: {
          ...state.user,
          [target.name]: { ...state.user[target.name], touched: true }
        }
      }
    }

    case 'IS_VALIDATE': {

      const { payload: target } = action
      const { name, value } = target
      const regExpUserName = /^[А-ЯЁ][а-яё]*\s[А-ЯЁ][а-яё]*$/
      const regExpUserCreditCard = /\d{4}-\d{4}-\d{4}-\d{4}/
      const regExpUserCoupon = /^[0-9]{8}$/

      if (name === 'userName') {
        if (!regExpUserName.test(value) && value !== '') {
          return {
            ...state,
            user: {
              ...state.user,
              [target.name]: {
                ...state.user[target.name],
                isValidate: false,
                errorMessage: 'Введите имя и фамилия заглавными буквами'
              }
            }
          }
        } else {
          return {
            ...state,
            user: {
              ...state.user,
              [target.name]: {
                ...state.user[target.name],
                isValidate: true,
                errorMessage: ''
              }
            }
          }
        }
      }

      if (name === "userCreditCard") {
        if (!regExpUserCreditCard.test(value) && value !== '') {
          return {
            ...state,
            user: {
              ...state.user,
              [target.name]: {
                ...state.user[target.name],
                isValidate: false,
                errorMessage: "Введите номер карты"
              }
            }
          }
        } else {
          return {
            ...state,
            user: {
              ...state.user,
              [target.name]: {
                ...state.user[target.name],
                isValidate: true,
                errorMessage: ""
              }
            }
          }
        }
      }

      if (name === "userCoupon") {
        if (!regExpUserCoupon.test(value) && value !== '') {
          return {
            ...state,
            user: {
              ...state.user,
              [target.name]: {
                ...state.user[target.name],
                isValidate: false,
                errorMessage: "Введите номер купона"
              }
            }
          }
        } else {
          return {
            ...state,
            user: {
              ...state.user,
              [target.name]: {
                ...state.user[target.name],
                isValidate: true,
                errorMessage: ""
              }
            }
          }
        }
      }
      break
    }

    case 'USER_CLEAR_FROM': {
      return { ...state, user: initialUser }
    }
    case 'ADD_USER': {
      return { ...state, users: [...state.users, action.payload] }
    }

    case 'POPUP_TOGGLE': {
      return { ...state, popupActive: !state.popupActive }
    }

    case 'GO_TO_PAGE_OUR_LIST': {
      return { ...state, goToPageOurList: !state.goToPageOurList }
    }

    default:
      return state
  }
}

export default rootReducer
