import React from 'react';
import styles from '../CSS/Tut.module.css';

const HeroSection = () => {
  const scrollToVideoSearch = () => {
    const element = document.getElementById('video-search');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles['hero-content']}>
          <h1>Your Safety, Your Right.</h1>
          <p>Empowering women with knowledge, resources, and community support for a safer tomorrow.</p>
          <a
            href="#video-search"
            className={styles['cta-button']}
            onClick={(e) => {
              e.preventDefault();
              scrollToVideoSearch();
            }}
          >
            Start Learning
          </a>
        </div>
        <div className={styles['hero-visual']}>
          <div className={styles['women-img']}>
            <img style={{ height: '100%' }} src="/images/women.png" alt="Women empowerment" />
          </div>
          <img src="/images/unnamed.png" alt="Safety icon" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
