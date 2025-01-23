import Navigation from './Navigation';
import reactLogo from '../assets/svg/react.svg';
import '../assets/scss/Header.scss';

export default function Header() {
    return (
        <header className="site-header">
            <div className="site-header__top">
                <div className="site-header__logo-container">
                    <span>
                        <img src={reactLogo} className="site-header__logo" alt="Site Logo" />
                    </span>
                    <span className="site-header__logo-text">Bloggen</span>
                </div>

                <div>
                    <Navigation />
                </div>

                <div>DT210G</div>
            </div>
        </header>
    );
}
