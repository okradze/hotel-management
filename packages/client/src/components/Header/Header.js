import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import OutsideClickHandler from 'react-outside-click-handler'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { Context } from '../../context/AuthContext'
import LOGOUT from './gql'
import Loader from '../Loader'
import HomeSvg from '../../svg/Home'
import ChartSvg from '../../svg/Chart'
import './Header.scss'

const Header = ({ history }) => {
    const [dropdownIsOpen, setDropdownIsOpen] = React.useState(false)
    const { setUser } = React.useContext(Context)
    const client = useApolloClient()
    const [logout, { loading }] = useMutation(LOGOUT, {
        onCompleted: handleCompleted,
    })

    function handleCompleted(data) {
        if (data.logout === true) {
            setUser(null)
            client.clearStore().then(() => {
                history.push('/login')
            })
        }
    }

    return (
        <header className="Header--full">
            <div className="container ">
                <div className="Header">
                    <nav className="nav" role="navigation">
                        <ul className="nav__list">
                            <li className="nav__item">
                                <NavLink className="nav__link" to="/dashboard">
                                    <HomeSvg svgClass="nav__icon" />
                                    მთავარი
                                </NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink
                                    className="nav__link nav__link--last"
                                    to="/stats"
                                >
                                    <ChartSvg svgClass="nav__icon" />
                                    სტატისტიკა
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                    <OutsideClickHandler
                        onOutsideClick={() => {
                            setDropdownIsOpen(false)
                        }}
                    >
                        <div
                            role="button"
                            onKeyPress={e => {
                                if (e.which === 13) {
                                    setDropdownIsOpen(!dropdownIsOpen)
                                }
                            }}
                            onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
                            tabIndex="0"
                            className="dropdown"
                        >
                            <div className="dropdown__icon">
                                {dropdownIsOpen && (
                                    <ul className="dropdown__content">
                                        <li className="dropdown__item">
                                            <button
                                                onClick={logout}
                                                type="button"
                                                className="button--transparent"
                                            >
                                                {loading ? (
                                                    <>
                                                        <Loader />
                                                        <span>გასვლა</span>
                                                    </>
                                                ) : (
                                                    'გასვლა'
                                                )}
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </OutsideClickHandler>
                </div>
            </div>
        </header>
    )
}

export default withRouter(Header)
