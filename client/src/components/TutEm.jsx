import React from 'react';
import styles from '../CSS/Tut.module.css';

const EmergencySection = () => {
  return (
    <section id="emergency" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles['section-title']}>Emergency Resources Hub</h2>
        <p className={styles['section-subtitle']}>Quick access to help when you need it most</p>

        <div className={styles['emergency-grid']}>
          <div className={styles['emergency-card']}>
            <h3>🚨 Emergency Police</h3>
            <div className={styles['emergency-number']}>911</div>
            <p>Immediate police assistance</p>
          </div>

          <div className={styles['emergency-card']}>
            <h3>💜 Domestic Violence Hotline</h3>
            <div className={styles['emergency-number']}>1-800-799-7233</div>
            <p>24/7 confidential support</p>
          </div>

          <div className={styles['emergency-card']}>
            <h3>🌐 Cyber Crime Reporting</h3>
            <div className={styles['emergency-number']}>1-855-292-3372</div>
            <p>Report online harassment</p>
          </div>

          <div className={styles['emergency-card']}>
            <h3>📱 SOS Features</h3>
            <div className={styles['emergency-number']}>Guide</div>
            <p>Learn to use phone emergency features</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencySection;
