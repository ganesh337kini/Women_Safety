import React from 'react';
import styles from '../CSS/Tut.module.css';

const TutorialSection = ({ openTutorial }) => {
  return (
    <section id="tutorials" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles['section-title']}>Tutorials & Training</h2>
        <p className={styles['section-subtitle']}>
          Learn essential skills to protect yourself in various situations
        </p>

        <div className={styles['tutorial-grid']}>
          <div className={styles['tutorial-card']} onClick={() => openTutorial('self-defense')}>
            <div className={styles['tutorial-icon']}>🥋</div>
            <h3>Self-Defense Basics</h3>
            <p>Learn fundamental self-defense techniques and situational awareness skills.</p>
            <button className={styles['tutorial-button']}>Start Tutorial</button>
          </div>

          <div className={styles['tutorial-card']} onClick={() => openTutorial('digital-safety')}>
            <div className={styles['tutorial-icon']}>🔒</div>
            <h3>Digital Safety</h3>
            <p>Protect your online presence, social media accounts, and avoid digital threats.</p>
            <button className={styles['tutorial-button']}>Start Tutorial</button>
          </div>

          <div className={styles['tutorial-card']} onClick={() => openTutorial('everyday-safety')}>
            <div className={styles['tutorial-icon']}>🚶‍♀️</div>
            <h3>Everyday Safety Tips</h3>
            <p>Essential safety practices for traveling, workplace, and daily activities.</p>
            <button className={styles['tutorial-button']}>Start Tutorial</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TutorialSection;
