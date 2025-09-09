'use client';
import '../styles/globals.css';
import styles from '../styles/header.module.css';
import Link from 'next/link';
import { AuthProvider, useAuth } from './context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

function Header() {
  const { user, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);

  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) footer.scrollIntoView({ behavior: 'smooth' });
  };

  const [openDropdown, setOpenDropdown] = useState(null);
  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Link href="/" className={styles.logo}>
        MyLogo
      </Link>

      <nav className={styles.navLinks}>
        <Link href="/" className={styles.navLink}>
          خانه
        </Link>

        {user && (
          <div className={styles.navItem}>
            <span className={styles.arrowIcon}></span>
            <button onClick={() => toggleDropdown('products')}>محصولات</button>
            {openDropdown === 'products' && (
              <div className={styles.dropdownMenu}>
                <a onClick={scrollToFooter}>محصول 1</a>
                <a onClick={scrollToFooter}>محصول 2</a>
                <a onClick={scrollToFooter}>محصول 3</a>
                <a onClick={scrollToFooter}>محصول 4</a>
                <a onClick={scrollToFooter}>محصول 5</a>
                <a onClick={scrollToFooter}>محصول 6</a>
              </div>
            )}
          </div>
        )}

        <div className={styles.navItem}>
          <span className={styles.arrowIcon}></span>
          <button onClick={() => toggleDropdown('about')}>درباره ما</button>
          {openDropdown === 'about' && (
            <div className={styles.dropdownMenu}>
              <a onClick={scrollToFooter}>تیم ما</a>
              <a onClick={scrollToFooter}>ماموریت ما</a>
              <a onClick={scrollToFooter}>تاریخچه</a>
              <a onClick={scrollToFooter}>نوستالژی</a>
            </div>
          )}
        </div>

        <div className={styles.navItem}>
          <span className={styles.arrowIcon}></span>
          <button onClick={() => toggleDropdown('contact')}>ارتباط با ما</button>
          {openDropdown === 'contact' && (
            <div className={styles.dropdownMenu}>
              <a onClick={scrollToFooter}>ایمیل</a>
              <a onClick={scrollToFooter}>تلفن</a>
              <a onClick={scrollToFooter}>موقعیت</a>
              <a onClick={scrollToFooter}>ارسال رزومه</a>
            </div>
          )}
        </div>

        <Link href="/education" className={styles.navLink}>
          آموزش
        </Link>
      </nav>

      <div className={styles.authSection}>
        {user ? (
          <div
            className={styles.userPanel}
            onMouseEnter={() => setOpenMenu(true)}
            onMouseLeave={() => setOpenMenu(false)}
          >
            <img
              src="/images/avatar.png"
              alt="User Avatar"
              className={styles.avatar}
            />
            <span className={styles.username}>{user.username || user.email}</span>

            <AnimatePresence>
              {openMenu && (
                <motion.div
                  className={styles.dropdownMenuHover}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <button onClick={logout} className={styles.dropdownButton}>
                    Logout
                  </button>
                  <button className={styles.dropdownButton}>Profile</button>
                  <button className={styles.dropdownButton}>Settings</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link href="/login" className={styles.authButton}>
            Login
          </Link>
        )}
      </div>
    </motion.header>
  );
}

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="fa" dir="rtl">
        <body>
          <motion.div
            className="motion-bg"
            animate={{ y: [40, -70, 40] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />

          <Header />

          <main className="main-container">{children}</main>

          <footer id="footer" className="footer">
            © 2025 My App
          </footer>
        </body>
      </html>
    </AuthProvider>
  );
}
