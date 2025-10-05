import React from 'react';
import styles from '../CSS/Tut.module.css';

const RightsSection = () => {
  return (
    <section id="rights" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles['section-title']}>Know Your Rights</h2>
        <p className={styles['section-subtitle']}>
          Understanding your legal protections and workplace rights
        </p>

        <div className={styles['info-cards']}>
          <div className={styles['info-card']}>
            <h4>⚖️ Legal Protection Laws</h4>
            <p>
              Title VII protects against workplace harassment and discrimination. You have the right
              to a safe work environment free from sexual harassment.
            </p>
          </div>

          <div className={styles['info-card']}>
            <h4>🏢 Workplace Rights</h4>
            <p>
              Employers must provide harassment-free workplaces, investigate complaints, and protect
              against retaliation for reporting incidents.
            </p>
          </div>

          <div className={styles['info-card']}>
            <h4>🚫 Myth: "It's not that serious"</h4>
            <p>
              <strong>Fact:</strong> Any unwanted behavior that makes you uncomfortable is valid.
              Trust your instincts and seek support.
            </p>
          </div>

          <div className={styles['info-card']}>
            <h4>✋ Myth: "You should handle it alone"</h4>
            <p>
              <strong>Fact:</strong> Seeking help is a sign of strength. Support systems and resources
              exist to help you.
            </p>
          </div>

          <div className={styles['info-card']}>
            <h4>💪 Consent Education</h4>
            <p>
              Consent must be clear, ongoing, and can be withdrawn at any time. "No" means no,
              regardless of circumstances.
            </p>
          </div>

          <div className={styles['info-card']}>
            <h4>🎯 Bystander Intervention</h4>
            <p>
              You can help others by safely intervening, creating distractions, or getting help when
              witnessing harassment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightsSection;
