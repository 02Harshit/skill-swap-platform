import React from 'react';
import { MapPin, Clock, Star, User } from 'lucide-react';
import styles from './UserCard.module.css';

const UserCard = ({ user, onRequest, currentUser, isRequesting }) => {
  const {
    id,
    name,
    location,
    profilePhoto,
    skillsOffered = [],
    skillsWanted = [],
    availability = [],
    rating = 0,
    reviewCount = 0,
    isPublic = true
  } = user;

  const handleRequest = () => {
    if (!currentUser) {
      alert('Please login to request skill swaps');
      return;
    }
    onRequest(user);
  };

  if (!isPublic) {
    return null;
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`${styles.star} ${i < Math.floor(rating) ? styles.starFilled : styles.starEmpty}`}
      />
    ));
  };

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.userSection}>
          <div className={styles.avatarContainer}>
            <img
              src={profilePhoto || 'https://via.placeholder.com/60'}
              alt={name}
              className={styles.avatar}
            />
            <div className={styles.onlineIndicator}></div>
          </div>
          <div className={styles.userInfo}>
            <h3 className={styles.userName}>{name}</h3>
            {location && (
              <div className={styles.location}>
                <MapPin className={styles.locationIcon} />
                <span>{location}</span>
              </div>
            )}
            <div className={styles.rating}>
              <div className={styles.starsContainer}>
                {renderStars(rating)}
              </div>
              <span className={styles.ratingText}>
                {rating.toFixed(1)} ({reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className={styles.skillsSection}>
        {/* Skills Offered */}
        <div className={styles.skillGroup}>
          <h4 className={styles.skillGroupTitle}>Skills Offered</h4>
          <div className={styles.skillTags}>
            {skillsOffered.slice(0, 4).map((skill, index) => (
              <span key={index} className={`${styles.skillTag} ${styles.skillOffered}`}>
                {skill}
              </span>
            ))}
            {skillsOffered.length > 4 && (
              <span className={`${styles.skillTag} ${styles.skillMore}`}>
                +{skillsOffered.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className={styles.skillGroup}>
          <h4 className={styles.skillGroupTitle}>Skills Wanted</h4>
          <div className={styles.skillTags}>
            {skillsWanted.slice(0, 4).map((skill, index) => (
              <span key={index} className={`${styles.skillTag} ${styles.skillWanted}`}>
                {skill}
              </span>
            ))}
            {skillsWanted.length > 4 && (
              <span className={`${styles.skillTag} ${styles.skillMore}`}>
                +{skillsWanted.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Availability */}
        {availability.length > 0 && (
          <div className={styles.skillGroup}>
            <h4 className={styles.skillGroupTitle}>Availability</h4>
            <div className={styles.availability}>
              <Clock className={styles.availabilityIcon} />
              <span>{availability.join(', ')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerInfo}>
          <User className={styles.footerIcon} />
          <span className={styles.footerText}>
            {skillsOffered.length} skills offered
          </span>
        </div>
        <button
          onClick={handleRequest}
          disabled={isRequesting || (currentUser && currentUser.id === id)}
          className={`${styles.requestBtn} ${
            isRequesting || (currentUser && currentUser.id === id)
              ? styles.requestBtnDisabled
              : styles.requestBtnActive
          }`}
        >
          {isRequesting ? 'Requesting...' : 'Request Swap'}
        </button>
      </div>
    </div>
  );
};

export default UserCard;