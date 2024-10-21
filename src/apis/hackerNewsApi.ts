import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0/';

interface Item {
  id: number;
  by: string;
  title?: string;
  score?: number;
  time: number;
  type: 'story' | 'comment' | 'job' | 'poll' | 'pollopt';
  url?: string;
  descendants?: number;
  kids?: number[];
  text?: string;
}

interface User {
  id: string;
  created: number;
  karma: number;
  about?: string;
  submitted?: number[];
}

type StoryIds = number[];

type Updates = {
  items: number[];
  profiles: string[];
};

// Function to fetch a specific item by ID using .then()
export const getItem = async (id: number) => {
  return await axios
    .get<Item>(`${BASE_URL}item/${id}.json?print=pretty`)
    .then((response) => response)
    .catch((error) => {
      console.error('Error fetching item:', error);
      throw error;
    });
};

// Function to fetch top stories using .then()
export const getTopStories = async () => {
  return await axios
    .get<StoryIds>(`${BASE_URL}topstories.json?print=pretty`)
    .then((response) => response)
    .catch((error) => {
      console.error('Error fetching top stories:', error);
      throw error;
    });
};

// Function to fetch new stories using .then()
export const getNewStories = async () => {
  return await axios
    .get<StoryIds>(`${BASE_URL}newstories.json?print=pretty`)
    .then((response) => response)
    .catch((error) => {
      console.error('Error fetching new stories:', error);
      throw error;
    });
};

// Function to fetch best stories using .then()
export const getBestStories = async () => {
  return await axios
    .get<StoryIds>(`${BASE_URL}beststories.json?print=pretty`)
    .then((response) => response)
    .catch((error) => {
      console.error('Error fetching best stories:', error);
      throw error;
    });
};

// Function to fetch Ask HN stories using .then()
export const getAskStories = async () => {
  return await axios
    .get<StoryIds>(`${BASE_URL}askstories.json?print=pretty`)
    .then((response) => response)
    .catch((error) => {
      console.error('Error fetching Ask HN stories:', error);
      throw error;
    });
};

// Function to fetch Show HN stories using .then()
export const getShowStories = async () => {
  return await axios
    .get<StoryIds>(`${BASE_URL}showstories.json?print=pretty`)
    .then((response) => response)
    .catch((error) => {
      console.error('Error fetching Show HN stories:', error);
      throw error;
    });
};

// Function to fetch Job stories using .then()
export const getJobStories = async () => {
  return await axios
    .get<StoryIds>(`${BASE_URL}jobstories.json?print=pretty`)
    .then((response) => response)
    .catch((error) => {
      console.error('Error fetching Job stories:', error);
      throw error;
    });
};

// Function to fetch user information by username using .then()
export const getUser = async (username: string) => {
  return await axios
    .get<User>(`${BASE_URL}user/${username}.json?print=pretty`)
    .then((response) => response)
    .catch((error) => {
      console.error('Error fetching user:', error);
      throw error;
    });
};

// Function to get updated items and profiles using .then()
export const getUpdates = async () => {
  return await axios
    .get<Updates>(`${BASE_URL}updates.json?print=pretty`)
    .then((response) => response)
    .catch((error) => {
      console.error('Error fetching updates:', error);
      throw error;
    });
};
