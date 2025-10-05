import React from 'react';
import styles from '../CSS/Tut.module.css';

const StoriesSection = () => {
  return (
    <section id="stories" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles['section-title']}>Inspiring Stories</h2>
        <p className={styles['section-subtitle']}>Real women, real courage, real change</p>

        <div className={styles['stories-grid']}>
          <div className={styles['story-card']}>
            <p className={styles['story-text']}>
              After taking the self-defense course, I feel more confident walking alone at night.
              The techniques I learned helped me get out of an uncomfortable situation safely.
            </p>
            <div className={styles['story-author']}>- Sarah M., Teacher</div>
          </div>

          <div className={styles['story-card']}>
            <p className={styles['story-text']}>
              The digital safety workshop opened my eyes to online threats I never knew existed. Now
              I help other women in my community stay safe online.
            </p>
            <div className={styles['story-author']}>- Maria L., Student</div>
          </div>

          <div className={styles['story-card']}>
            <p className={styles['story-text']}>
              Learning about my workplace rights gave me the courage to report harassment. The support
              I received helped me reclaim my professional space.
            </p>
            <div className={styles['story-author']}>- Jennifer K., Engineer</div>
          </div>

          <div className={styles['story-card']}>
            <p className={styles['story-text']}>
              This community showed me that I'm not alone. Together, we're creating safer spaces for
              all women in our neighborhood.
            </p>
            <div className={styles['story-author']}>- Priya S., Entrepreneur</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
