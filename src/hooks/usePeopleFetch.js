import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers(page=1) {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=${page}`);
    setIsLoading(false);
    setUsers(prevUsers => [...prevUsers,...response.data.results]);
  }

  return { users, isLoading, fetchUsers };
};
