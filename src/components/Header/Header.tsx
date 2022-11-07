import { useState } from 'react'
import Modal from 'react-modal'
import './Header.css'
import {
  BiMenu,
  BiSearch,
  BiBarChartAlt,
  BiChalkboard,
  BiUser,
  BiTrain,
} from 'react-icons/bi'
import { AiFillHome } from 'react-icons/ai'
// import ReactSwitch from 'react-switch'

Modal.setAppElement('#root')
export const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <div>
      <div className="header">
        <div className="head-one">
          <BiMenu
            color="#595959"
            size="2rem"
            className="menu-bar"
            onClick={() => setModalIsOpen(true)}
          />
          <h1 className="logo">Watch.io</h1>
        </div>
        <div className="search">
          <BiSearch className="search-icon" color="#595959" size="2.5rem" />
          <input type="text" className="search-input" placeholder="Search" />
        </div>
        <div className="btn">
          <button>Sign Up</button>
        </div>
        {/* <div className="switch">
          <label>Mode</label>
          <ReactSwitch
            onChange={toggleTheme}
            checked={theme === "light"}
            className="switch-icon"
            width={50}
            height={20}
          />
        </div> */}
      </div>
      <div>
        <Modal
          overlayClassName="overlay-modal"
          className="modal"
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <div className="">
            <div className="modal-head">
              <button className="menu-bar-sideBar">
                <BiMenu
                  color="#595959"
                  size="2rem"
                  onClick={() => setModalIsOpen(false)}
                />
              </button>
              <h1 className="logo-sideBar">Watch.io</h1>
            </div>
            <div className="btn-list">
              <ul>
                <li>
                  <div className="link_button">
                    <button className="btn-link">
                      <AiFillHome
                        color="#ffffff"
                        size="1.2rem"
                        className="link_icon"
                      />
                      <span className="span-button">Home</span>
                    </button>
                  </div>
                </li>
                <li>
                  <div className="link_button">
                    <button className="btn-link">
                      <BiBarChartAlt
                        color="#ffffff"
                        size="1.2rem"
                        className="link_icon"
                      />
                      <span className="span-button">Trending</span>
                    </button>
                  </div>
                </li>
                <li>
                  <div className="link_button">
                    <button className="btn-link">
                      <BiChalkboard
                        color="#ffffff"
                        size="1.2rem"
                        className="link_icon"
                      />
                      <span className="span-button">Tv Shows</span>
                    </button>
                  </div>
                </li>
                <li>
                  <div className="link_button">
                    <button className="btn-link">
                      <BiTrain
                        color="#ffffff"
                        size="1.2rem"
                        className="link_icon"
                      />
                      <span className="span-button">Animation</span>
                    </button>
                  </div>
                </li>
                <li>
                  <div className="link_button">
                    <button className="btn-link">
                      <BiUser
                        color="#ffffff"
                        size="1.2rem"
                        className="link_icon"
                      />
                      <span className="span-button">Log Out</span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}
