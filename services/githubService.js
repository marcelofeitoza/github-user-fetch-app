import axios from 'axios';

export const fetchGithub = async (username) => {
  // https://api.github.com/users/marcelofeitoza
  try {
    // where the api call goes
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const data = response.data;
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchUserRepositories = async (username) => {
  // https://api.github.com/users/marcelofeitoza/repos
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    const data = response.data;
    return data;
  } catch (e) {
    console.log(e);
  }
};

