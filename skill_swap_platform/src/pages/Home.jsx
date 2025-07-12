import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";

const usersData = [
  {
    id: 1,
    name: "Sarah Johnson",
    profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    skillsOffered: ["Photoshop", "Graphic Design", "UI/UX Design"],
    availability: "Evenings"
  },
  {
    id: 2,
    name: "Michael Chen",
    profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    skillsOffered: ["JavaScript", "React", "Node.js"],
    availability: "Weekends"
  },
  {
    id: 3,
    name: "Lisa Wang",
    profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    skillsOffered: ["SEO", "Content Writing", "Marketing"],
    availability: "Mornings"
  },
  {
    id: 4,
    name: "David Kim",
    profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    skillsOffered: ["Photography", "Photoshop", "Video Editing"],
    availability: "Evenings"
  }
];

const SkillCard = ({ user }) => {
  const navigate = useNavigate();

  const handleRequest = () => {
    alert(`Request sent to ${user.name}`);
  };

  return (
    <div style={styles.skillCard} onClick={() => navigate(`/profile/${user.id}`)}>
      <div style={styles.profileSection}>
        <img src={user.profilePhoto} alt={user.name} style={styles.profilePhoto} />
        <div>
          <h3 style={styles.userName}>{user.name}</h3>
          <span style={styles.badge}>{user.availability}</span>
        </div>
      </div>
      <div>
        <h4 style={styles.skillsTitle}>🎯 Skills</h4>
        <div style={styles.skillTags}>
          {user.skillsOffered.map((skill, index) => (
            <span key={index} style={styles.skillTag}>{skill}</span>
          ))}
        </div>
      </div>
      <button onClick={(e) => { e.stopPropagation(); handleRequest(); }} style={styles.requestBtn}>
        🤝 Request
      </button>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div style={styles.pagination}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} style={styles.pageBtn}>⬅️</button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          style={{
            ...styles.pageBtn,
            backgroundColor: p === currentPage ? "#1e40af" : "#fff",
            color: p === currentPage ? "#fff" : "#1f2937"
          }}
        >
          {p}
        </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} style={styles.pageBtn}>➡️</button>
    </div>
  );
};

const Home = () => {
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 2;

  useEffect(() => {
    let result = usersData;
    if (searchQuery.trim()) {
      result = result.filter(user =>
        user.skillsOffered.some(skill =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    if (availabilityFilter) {
      result = result.filter(user => user.availability === availabilityFilter);
    }
    setFilteredUsers(result);
    setCurrentPage(1);
  }, [searchQuery, availabilityFilter]);

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const availabilityOptions = [...new Set(usersData.map(u => u.availability))];

  return (
    <div style={styles.wrapper}>
      <Navbar />
      <header style={styles.hero}>
        <h1 style={styles.title}>🌟 Skill Swap Platform</h1>
        <p style={styles.subtitle}>Exchange talents, empower each other 💡</p>
        <p style={styles.userCount}>{filteredUsers.length} skilled people found</p>
      </header>

      <section style={styles.filters}>
        <input
          placeholder="🔍 Search skills (e.g. React, Design...)"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={styles.input}
        />
        <select
          value={availabilityFilter}
          onChange={e => setAvailabilityFilter(e.target.value)}
          style={styles.select}
        >
          <option value="">All Availabilities</option>
          {availabilityOptions.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </section>

      <div style={styles.grid}>
        {currentUsers.length ? (
          currentUsers.map(user => <SkillCard key={user.id} user={user} />)
        ) : (
          <p>No matching users found.</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const styles = {
  wrapper: {
    fontFamily: 'Poppins, sans-serif',
    padding: "32px",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  },
  hero: {
    textAlign: "center",
    padding: "40px 20px",
    background: "linear-gradient(90deg, #1e40af, #10b981)",
    borderRadius: "12px",
    color: "white",
    marginBottom: "32px"
  },
  title: { fontSize: "36px", marginBottom: "8px" },
  subtitle: { fontSize: "18px", marginBottom: "16px" },
  userCount: { fontSize: "14px", opacity: 0.9 },
  filters: {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
    flexWrap: "wrap"
  },
  input: {
    flex: 1,
    minWidth: "250px",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "2px solid #e2e8f0"
  },
  select: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "2px solid #e2e8f0"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginBottom: "32px"
  },
  skillCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
    transition: "all 0.3s ease",
    cursor: "pointer"
  },
  profileSection: {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px"
  },
  profilePhoto: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    marginRight: "14px",
    objectFit: "cover"
  },
  userName: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 6px"
  },
  badge: {
    fontSize: "12px",
    backgroundColor: "#d1fae5",
    color: "#047857",
    padding: "2px 8px",
    borderRadius: "8px"
  },
  skillsTitle: {
    fontSize: "14px",
    color: "#1f2937",
    fontWeight: "500",
    marginBottom: "8px"
  },
  skillTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px"
  },
  skillTag: {
    backgroundColor: "#1e40af",
    color: "white",
    padding: "5px 12px",
    fontSize: "12px",
    borderRadius: "10px"
  },
  requestBtn: {
    marginTop: "16px",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer"
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    gap: "8px"
  },
  pageBtn: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #1e40af",
    backgroundColor: "#fff",
    color: "#1e40af",
    cursor: "pointer"
  }
};

export default Home;
