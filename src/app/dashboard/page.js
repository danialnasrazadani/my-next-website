'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import styles from '../../styles/dashboard.module.css';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(true);

  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: false, margin: '-100px' });

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user]);

  // ========= این useEffect اضافه شده =========
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 3000); // بعد از ۳ ثانیه نوتیفیکیشن بسته می‌شود
    return () => clearTimeout(timer);
  }, []);
  // ==========================================

  if (!user) return null;

  const products = [
    { title: 'محصول یک', icon: '/images/picture1.png', desc: 'لورم ایپسوم متن ساختگی...' },
    { title: 'محصول دو', icon: '/icons/profile.svg', desc: 'لورم ایپسوم متن ساختگی...' },
    { title: 'محصول سه', icon: '/icons/settings.svg', desc: 'لورم ایپسوم متن ساختگی...' },
    { title: 'محصول چهار', icon: '/icons/messages.svg', desc: 'لورم ایپسوم متن ساختگی...' },
    { title: 'محصول پنج', icon: '/icons/notifications.svg', desc: 'لورم ایپسوم متن ساختگی...' },
    { title: 'محصول شش', icon: '/icons/help.svg', desc: 'لورم ایپسوم متن ساختگی...' },
  ];

  function ImageSlider() {
    const images = [
      '/images/slide1.jpg',
      '/images/slide2.jpg',
      '/images/slide3.jpg',
      '/images/slide4.jpg',
      '/images/slide5.jpg',
      '/images/slide6.jpg'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className={styles.sliderContainer}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'linear' }}
            className={styles.sliderImage}
          />
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* نوتیفیکیشن خوش آمدگویی */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className={styles.notification}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <button
              className={styles.closeNotification}
              onClick={() => setShowNotification(false)}
            >
              &times;
            </button>
            <span>
              به پنل کاربری خود خوش آمدید {user.username || user.email}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* اسلایدشو */}
      <ImageSlider />

      {/* بخش محصولات */}
      <section className={styles.extraSection}>
        <div className={styles.buttonGrid}>
          {products.map((product, index) => (
            <motion.div
              key={index}
              className={styles.buttonWrapper}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, margin: '-100px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className={styles.descriptionBox}>{product.desc}</div>
              <button className={styles.gridButton}>
                <div className={styles.iconCircle}>
                  <img src={product.icon} alt={product.title} className={styles.buttonIcon} />
                </div>
                <p>{product.title}</p>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* فرم تماس */}
      <motion.section
        className={styles.extraSection2}
        ref={formRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isFormInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: false }}
      >
        <div className={styles.wrapper}>
          <h3>با ما همراه باشید</h3>
          <p>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
          </p>

          <div className={styles.gridContainer}>
            <div className={styles.row}>
              <input type="text" placeholder="نام" className={styles.under} />
              <input type="text" placeholder="نام خانوادگی" className={styles.under} />
            </div>
            <div className={styles.row}>
              <input type="text" placeholder="شماره تماس" className={styles.under} />
              <input type="text" placeholder="پست الکترونیک" className={styles.under} />
            </div>
            <div className={styles.row}>
              <input type="text" placeholder="موضوع" className={styles.underFull} />
            </div>
            <div className={styles.row}>
              <input type="text" placeholder="...برای ما بنویسید" className={styles.underFull} />
            </div>
          </div>

          <button className={styles.submitBtn}>ارسال</button>
        </div>
      </motion.section>
    </div>
  );
}
