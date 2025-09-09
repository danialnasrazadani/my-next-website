'use client';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from '../../styles/login.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import usersData from '../../data/users.json';

export default function LoginPage() {
  const [method, setMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // اصلاح: دادن method به تابع login
    login(method === 'email' ? email : username, password, method);
  };

  const handleReset = () => {
    const userExists = usersData.some(u => u.email === resetEmail);
    if (userExists) setResetMessage('لینک بازیابی برای ایمیل شما ارسال شد.');
    else setResetMessage('ایمیل وارد شده موجود نیست.');
  };

  return (
    <>
      <AnimatePresence>
        {!showReset && (
          <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h1>ورود به حساب</h1>
            <div className={styles.toggleButtons}>
              <button
                type="button"
                className={method === 'email' ? styles.active : ''}
                onClick={() => setMethod('email')}
              >
                ورود با ایمیل
              </button>
              <button
                type="button"
                className={method === 'username' ? styles.active : ''}
                onClick={() => setMethod('username')}
              >
                ورود با نام کاربری
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {method === 'email' ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ایمیل"
                  required
                />
              ) : (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="نام کاربری"
                  required
                />
              )}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={styles.submitBtn}
              >
                ورود
              </motion.button>
            </form>

            <div className={styles.forgotSection}>
              <span onClick={() => setShowReset(true)}>فراموشی رمز عبور؟</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal تمام صفحه برای بازیابی رمز عبور */}
      <AnimatePresence>
        {showReset && (
          <motion.div
            className={styles.resetOverlayFull}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.resetPanelFull}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>بازیابی رمز عبور</h2>
              <input
                type="email"
                placeholder="ایمیل"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
              <button onClick={handleReset} className={styles.submitBtn}>
                ارسال لینک
              </button>
              {resetMessage && <p style={{ marginTop: '10px', color: 'green' }}>{resetMessage}</p>}
              <button onClick={() => setShowReset(false)} className={styles.submitBtn}>
                بازگشت
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
