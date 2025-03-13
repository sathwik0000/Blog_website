import { useState, useEffect } from "react";
import raxios from "../axios";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await raxios.get("/posts");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Function to remove all HTML tags from event content
  const stripHtmlTags = (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, ""); // Removes all HTML tags
  };

  return (
    <div style={styles.container}>
     

      {loading ? (
        <p style={styles.loadingText}>Loading events...</p>
      ) : events.length > 0 ? (
        <div style={styles.eventGrid}>
          {events.map((event) => (
            <div key={event.id} style={styles.eventCard}>
              <div style={styles.eventHeader}>
                <h3 style={styles.eventTitle}>{event.title}</h3>
  
              </div>
              <p style={styles.eventContent}>{stripHtmlTags(event.content)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noEvents}>🚀 No events available.</p>
      )}
    </div>
  );
};

// **Styles**
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
  },
  header: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  eventGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  eventCard: {
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    color: "#fff",
    textAlign: "left",
    transition: "transform 0.3s ease-in-out",
  },
  eventTitle: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  eventContent: {
    fontSize: "16px",
    lineHeight: "1.5",
    marginTop: "10px",
  },
  eventDate: {
    fontWeight: "bold",
    background: "rgba(255, 255, 255, 0.2)",
    padding: "5px 10px",
    borderRadius: "8px",
  },
  loadingText: {
    fontSize: "18px",
    color: "#777",
  },
  noEvents: {
    fontSize: "18px",
    color: "#ff5e62",
    fontWeight: "bold",
  },
};

export default Home;
