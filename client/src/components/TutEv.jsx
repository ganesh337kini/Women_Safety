import React from 'react';
import styles from '../CSS/Tut.module.css';

const EventsSection = () => {
  return (
    <section id="events" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles['section-title']}>Upcoming Events</h2>
        <p className={styles['section-subtitle']}>
          Join our community workshops and awareness programs
        </p>

        <div className={styles['events-list']}>
          <div className={styles['event-item']}>
            <div>
              <h4>Self-Defense Workshop</h4>
              <p>Learn basic self-defense techniques in a supportive environment</p>
            </div>
            <div className={styles['event-date']}>Dec 15</div>
          </div>

          <div className={styles['event-item']}>
            <div>
              <h4>Digital Privacy Webinar</h4>
              <p>Protect your online presence and personal information</p>
            </div>
            <div className={styles['event-date']}>Dec 22</div>
          </div>

          <div className={styles['event-item']}>
            <div>
              <h4>Know Your Rights Seminar</h4>
              <p>Understanding legal protections and workplace rights</p>
            </div>
            <div className={styles['event-date']}>Jan 5</div>
          </div>

          <div className={styles['event-item']}>
            <div>
              <h4>Community Support Circle</h4>
              <p>Monthly gathering for sharing experiences and support</p>
            </div>
            <div className={styles['event-date']}>Jan 12</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
