import React from 'react';
import styles from '../CSS/Tut.module.css';

const Modal = ({ show, onClose, type, tutorialType }) => {
  const tutorialContent = {
    'self-defense': {
      title: 'Self-Defense Basics',
      content: (
        <div>
          <h3>Self-Defense Fundamentals</h3>
          <div className={styles.step}>
            <h4>Step 1: Situational Awareness</h4>
            <p>Stay alert to your surroundings. Avoid distractions like phones when walking alone. Trust your instincts if something feels wrong.</p>
          </div>
          <div className={styles.step}>
            <h4>Step 2: Basic Stance</h4>
            <p>Stand with feet shoulder-width apart, knees slightly bent. Keep your hands up and ready. Maintain balance and be ready to move.</p>
          </div>
          <div className={styles.step}>
            <h4>Step 3: Target Vulnerable Areas</h4>
            <p>Focus on eyes, nose, throat, groin, and knees. Use your voice - yell loudly to attract attention and disorient the attacker.</p>
          </div>
          <div className={styles.step}>
            <h4>Step 4: Escape Techniques</h4>
            <p>Your goal is to escape, not fight. Create distance, make noise, and run to safety. Practice these moves regularly.</p>
          </div>
          <p><strong>Remember:</strong> The best self-defense is avoiding dangerous situations when possible.</p>
        </div>
      )
    },
    'digital-safety': {
      title: 'Digital Safety Guide',
      content: (
        <div>
          <h3>Protecting Your Digital Life</h3>
          <div className={styles.step}>
            <h4>Step 1: Strong Passwords</h4>
            <p>Use unique passwords for each account. Include uppercase, lowercase, numbers, and symbols. Consider using a password manager.</p>
          </div>
          <div className={styles.step}>
            <h4>Step 2: Privacy Settings</h4>
            <p>Review and adjust privacy settings on all social media platforms. Limit who can see your posts, photos, and personal information.</p>
          </div>
          <div className={styles.step}>
            <h4>Step 3: Recognize Scams</h4>
            <p>Be wary of unsolicited messages, fake profiles, and requests for personal information. Verify identities before sharing anything.</p>
          </div>
          <div className={styles.step}>
            <h4>Step 4: Safe Online Dating</h4>
            <p>Meet in public places, tell friends your plans, don't share personal details too quickly, and trust your instincts.</p>
          </div>
          <p><strong>Remember:</strong> If something feels suspicious online, it probably is. Trust your instincts.</p>
        </div>
      )
    },
    'everyday-safety': {
      title: 'Everyday Safety Tips',
      content: (
        <div>
          <h3>Daily Safety Practices</h3>
          <div className={styles.step}>
            <h4>Step 1: Travel Safety</h4>
            <p>Share your location with trusted contacts. Use well-lit, populated routes. Keep emergency contacts easily accessible.</p>
          </div>
          <div className={styles.step}>
            <h4>Step 2: Workplace Safety</h4>
            <p>Know your company's harassment policy. Document incidents. Report inappropriate behavior to HR or management.</p>
          </div>
          <div className={styles.step}>
            <h4>Step 3: Safe Transportation</h4>
            <p>Verify ride-share details before getting in. Sit behind the driver. Share trip details with friends or family.</p>
          </div>
          <div className={styles.step}>
            <h4>Step 4: Home Security</h4>
            <p>Lock doors and windows. Don't advertise when you're away. Install good lighting around entrances.</p>
          </div>
          <p><strong>Remember:</strong> Small safety habits can make a big difference in your overall security.</p>
        </div>
      )
    }
  };

  const getModalContent = () => {
    if (type === 'tutorial' && tutorialContent[tutorialType]) {
      return (
        <div>
          <h3>{tutorialContent[tutorialType].title}</h3>
          {tutorialContent[tutorialType].content}
        </div>
      );
    }

    if (type === 'join') {
      return (
        <div>
          <h3>Join Our Mission</h3>
          <p>Choose how you'd like to get involved:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
            <button className={styles['cta-button']} onClick={() => alert('Thank you for your interest in volunteering! We will contact you soon.')}>
              Volunteer with Us
            </button>
            <button className={styles['cta-button']} onClick={() => alert('You will receive updates about upcoming training sessions!')}>
              Attend Training
            </button>
            <button className={styles['cta-button']} onClick={() => alert('Thank you for helping spread awareness!')}>
              Spread Awareness
            </button>
            <button className={styles['cta-button']} onClick={() => alert('Thank you for joining our newsletter!')}>
              Join Newsletter
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`${styles.modal} ${show ? styles.show : ''}`} onClick={onClose}>
      <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
        <button className={styles['modal-close']} onClick={onClose}>&times;</button>
        {getModalContent()}
      </div>
    </div>
  );
};

export default Modal;
