import { Link } from 'react-router';
import { Right_side } from './right_side';
import './header.css'

function Header() {


    return (
        <div className="header">

            <div className="left-section">
                <Link to="/" className="header-link">
                    <div className='logo-container'>
                        <img className="logo" src="images/2_title.png" />
                    </div>
                    <img className="mobile-logo" src="images/mobile-logo-white.png" />
                </Link>
            </div>

            <div className="middle-section">
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search"
                />

                <button className="search-button">
                    <img
                        className="search-icon"
                        src="images/icons/search-icon.png"
                    />
                </button>
            </div>

            <div className="right-section">
                <Right_side></Right_side>



            </div>
        </div>
    )
}

export default Header