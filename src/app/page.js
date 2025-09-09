'use client';
import { motion } from 'framer-motion';
import styles from '../styles/landing.module.css';

export default function LandingPage() {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.header
        className={styles.hero}
        initial={{ y: -150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* تصویر بک‌گراند متحرک */}
        <motion.div
          className={styles.borderimg}
          animate={{ y: [20, -20, 20] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        >
          <img src="/images/img.jpg" alt="تصویر" />
        </motion.div>

        {/* محتوا */}
        <div className={styles.contentleft}>
          <motion.h1
            animate={{ y: [20, -20, 20] }} // حرکت آرام بالا و پایین
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          >
            خوش آمدید به سایت ما!
          </motion.h1>

          <motion.a
            href="/newpage"
            className={styles.gradientbtn}
            animate={{ y: [20, -20, 20] }} // حرکت مشابه h1
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          >
            برو به صفحه جدید
          </motion.a>
        </div>
      </motion.header>

      <section className={styles.features}>
        {/* بخش ویژگی‌ها */}
      </section>
    </motion.div>
  );
}
