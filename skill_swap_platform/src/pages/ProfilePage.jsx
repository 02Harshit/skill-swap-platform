import React, { useState } from 'react';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: '',
    location: '',
    skillsOffered: [],
    skillsWanted: [],
    availability: 'Weekends',
    profileType: 'Public',
    profilePhoto: '',
  });

  const [offeredInput, setOfferedInput] = useState('');
  const [wantedInput, setWantedInput] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const addSkill = (type, value) => {
    if (value.trim() === '') return;
    setUserData((prev) => ({
      ...prev,
      [type]: [...prev[type], value.trim()],
    }));
    type === 'skillsOffered' ? setOfferedInput('') : setWantedInput('');
  };

  const removeSkill = (type, index) => {
    setUserData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Saved Data:', userData);
    // Add save logic here (e.g., API call)
  };

  const handleDiscard = () => {
    window.location.reload(); // Simple reset for now
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <div className={styles.photoSection}>
          <div className={styles.avatarCircle}>
            {userData.profilePhoto ? (
              <img src={userData.profilePhoto} alt="Profile" className={styles.avatarPreview} />
            ) : (
              <div className={styles.avatarPlaceholder}>Profile Photo</div>
            )}
          </div>
          <label className={styles.uploadBtn}>
            Add/Edit
            <input type="file" accept="image/*" onChange={handlePhotoChange} hidden />
          </label>
          {userData.profilePhoto && (
            <button className={styles.removeBtn} onClick={() => setUserData({ ...userData, profilePhoto: '' })}>
              Remove
            </button>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Name</label>
          <input name="name" value={userData.name} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Location</label>
          <input name="location" value={userData.location} onChange={handleChange} />
        </div>

        <div className={styles.skillsRow}>
          <div className={styles.skillCol}>
            <label>Skills Offered</label>
            <div className={styles.skillTags}>
              {userData.skillsOffered.map((skill, idx) => (
                <span key={idx} className={styles.skillTag}>
                  {skill} <button onClick={() => removeSkill('skillsOffered', idx)}>x</button>
                </span>
              ))}
            </div>
            <input
              value={offeredInput}
              onChange={(e) => setOfferedInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill('skillsOffered', offeredInput)}
              placeholder="Add a skill and press Enter"
            />
          </div>

          <div className={styles.skillCol}>
            <label>Skills Wanted</label>
            <div className={styles.skillTags}>
              {userData.skillsWanted.map((skill, idx) => (
                <span key={idx} className={styles.skillTag}>
                  {skill} <button onClick={() => removeSkill('skillsWanted', idx)}>x</button>
                </span>
              ))}
            </div>
            <input
              value={wantedInput}
              onChange={(e) => setWantedInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill('skillsWanted', wantedInput)}
              placeholder="Add a skill and press Enter"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Availability</label>
          <select name="availability" value={userData.availability} onChange={handleChange}>
            <option>Weekends</option>
            <option>Weekdays</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Profile</label>
          <select name="profileType" value={userData.profileType} onChange={handleChange}>
            <option>Public</option>
            <option>Private</option>
          </select>
        </div>

        <div className={styles.buttonRow}>
          <button className={styles.saveBtn} onClick={handleSave}>Save</button>
          <button className={styles.discardBtn} onClick={handleDiscard}>Discard</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
