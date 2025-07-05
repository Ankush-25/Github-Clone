import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepo, setSuggestedRepo] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    try {
      const userId = localStorage.getItem("userId");
      const fetchRepositories = async () => {
        const response = await fetch(
          `http://localhost:3000/repo/Current/${userId}`
        );
        const data = await response.json();
        setRepositories(data.repositories);
      };
      fetchRepositories();
    } catch (error) {
      console.error("Error while Fetching all repositories of user!");
    }
    try {
      const fetchSuggestedRepositories = async () => {
        const response = await fetch(`http://localhost:3000/repo/all`);
        const data = await response.json();
        setSuggestedRepo(data);
      };
      fetchSuggestedRepositories();
    } catch (error) {
      console.error("Error while Fetching all repositories!");
    }
  }, []);
  useEffect(() => {
    if (searchQuery == "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>(repo.name.toLowerCase().includes(searchQuery.toLowerCase())));
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);
  return (
    <section id="Dashboard">
      <aside>
        <h3>Suggested Repositories</h3>
        {suggestedRepo.map((repo) => (
          <div key={repo._id}>
            <h4>{repo.name}</h4>
            <h4>{repo.description}</h4>
          </div>
        ))}
      </aside>
      <main>
        <h3>Your Repositories</h3>
        <input
          id="Search"
          type="text"
          value={searchQuery}
          placeholder="Search Repo"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {searchResults.length > 0 ? (
          searchResults.map((repo) => (
            <div key={repo._id}>
              <h4>{repo.name}</h4>
              <h4>{repo.description}</h4>
            </div>
          ))
        ) : (
          <p>No repositories found.</p>
        )}
      </main>
      <aside>
        <h3>Upcomming Events</h3>
        <ul>
          <li>Tech Confrence -15 Dec</li>
          <li>Developer Meetup - 1 July</li>
          <li>React Submit - jan 5 </li>
        </ul>
      </aside>
    </section>
  );
};

export default Dashboard;
