import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { popupToggle, goToPageOurList } from '../../../actions/action'
import Video from '../../UI/video'
import FormTran from '../../FormTran'
import Welcome from '../../Welcome'
import Popup from '../../UI/Popup/Popup'
import './Registration.scss'

const Registration = (props) => {
  return (
    <React.Fragment>
      <Video>
        <section className="Intro">
          <div className="Container">
            <div className="Intro-Inner">
              <Welcome />
              <FormTran
                activePupop={props.popupToggle}
              />
            </div>
          </div>
        </section>
      </Video>
      {
        props.popupActive ? <Popup
          title="Регистрация прошла успешно"
          activePupop={props.popupToggle}
          handleClickPopupButton={props.goToPageOurList} /> : null
      }
    </React.Fragment>
  )
}

const RegistrationContainer = (props) => {
  if (props.goToOurList) {
    return <Redirect to="/user-list" />
  }
  
  return <Registration {...props}/>
}

const mapStateToProps = (state) => ({
  goToOurList: state.goToPageOurList,
  popupActive: state.popupActive
})

const mapDispatchToProps = (dispatch) => ({
  popupToggle: () => dispatch(popupToggle),
  goToPageOurList: () => {
    dispatch(goToPageOurList)
    setTimeout(() => { dispatch(goToPageOurList) }, 0)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer)