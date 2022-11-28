import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import './Header.css'
import {
  BiMenu,
  BiSearch,
  BiBarChartAlt,
  BiChalkboard,
  BiTrain,
} from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

Modal.setAppElement('#root')
export const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [value, setValue] = useState('')
  // const [userData, setUserData] = useState([])
  const navigate = useNavigate()
  const handleSearch = (e: { key: string }) => {
    if (value && e.key === 'Enter') {
      navigate('/search', { state: value, replace: true })
    }
  }
  const SignOut = () => {
   JSON.stringify(localStorage.removeItem('dataKey'));
  //  setUserData([])
  };
  const user = JSON.parse(localStorage.getItem('dataKey') as string) || null;
  // setUserData(user)

  // useEffect(() => {
  // if(localStorage.getItem('dataKey') !== null){
  //   const user = JSON.parse(localStorage.getItem('dataKey') as string);
  //   // setUserData(user)
  // }
  // }, [userData]) 
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
          <Link to="./" className="logo">
            Watch.io
          </Link>
        </div>
        <div className="search">
          <BiSearch className="search-icon" color="#595959" size="1.5rem" />
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
        {/* <Link to="./signUp">
            <div className="btn">
              <button>Sign Up</button>
            </div>
        </Link> */}
        {user ? 
           <Link to="/" onClick={ SignOut }>
           <div className="btn">
             <button>Log Out</button>
           </div>
         </Link> :
          <Link to="./signUp">
            <div className="btn">
              <button>Sign Up</button>
            </div>
          </Link>
        }
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
              <Link to="./" className="logo-sidebar">
                Watch.io
              </Link>
            </div>
            <div className="btn-list">
              <ul>
                <li>
                  <div className="link_button">
                    <Link
                      to="./"
                      className="btn-link"
                      onClick={() => setModalIsOpen(false)}
                    >
                      <BiBarChartAlt
                        color="#ffffff"
                        size="1.4rem"
                        className="link_icon"
                      />
                      <span className="span-link">Trending</span>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="link_button">
                    <Link
                      to="./movies"
                      className="btn-link"
                      onClick={() => setModalIsOpen(false)}
                    >
                      <BiChalkboard
                        color="#ffffff"
                        size="1.4rem"
                        className="link_icon"
                      />
                      <span className="span-link">Movies</span>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="link_button">
                    <Link
                      to="./series"
                      className="btn-link"
                      onClick={() => setModalIsOpen(false)}
                    >
                      <BiTrain
                        color="#ffffff"
                        size="1.2rem"
                        className="link_icon"
                      />
                      <span className="span-link">Tv Series</span>
                    </Link>
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
