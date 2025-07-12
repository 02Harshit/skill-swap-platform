import React, { useState } from 'react';
import { User, Search, Menu, X, Bell } from 'lucide-react';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom'; // ✅ Import this

const Navbar = ({ user, onLogout, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // ✅ Navigation hook

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // ✅ Redirect to /login
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          {/* Logo */}
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <span className={styles.logoText}>SS</span>
            </div>
            <span className={styles.brandName}>Skill Swap</span>
          </div>

          {/* Desktop Menu */}
          <div className={styles.desktopMenu}>
            {user ? (
              <>
                <button className={styles.notificationBtn}>
                  <Bell className={styles.notificationIcon} />
                  <span className={styles.notificationBadge}>3</span>
                </button>
                <div className={styles.userInfo}>
                  <img
                    src={user.profilePhoto || 'https://via.placeholder.com/32'}
                    alt={user.name}
                    className={styles.userAvatar}
                  />
                  <span className={styles.userName}>{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className={`${styles.btn} ${styles.logoutBtn}`}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLoginRedirect}
                className={`${styles.btn} ${styles.loginBtn}`}
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className={styles.mobileMenuBtn}>
            <button onClick={toggleMenu} className={styles.menuToggle}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className={styles.mobileSearch}>
          <div className={styles.searchInputWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search skills"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            {user ? (
              <>
                <div className={styles.mobileUserInfo}>
                  <img
                    src={user.profilePhoto || 'https://via.placeholder.com/40'}
                    alt={user.name}
                    className={styles.mobileUserAvatar}
                  />
                  <div className={styles.mobileUserDetails}>
                    <p className={styles.mobileUserName}>{user.name}</p>
                    <p className={styles.mobileUserEmail}>{user.email}</p>
                  </div>
                </div>
                <button className={styles.mobileNotificationBtn}>
                  <Bell size={20} />
                  <span>Notifications</span>
                </button>
                <button
                  onClick={onLogout}
                  className={`${styles.btn} ${styles.mobileLogoutBtn}`}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLoginRedirect}
                className={`${styles.btn} ${styles.mobileLoginBtn}`}
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
