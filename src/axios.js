import axios from "axios";

// In the case of a GHE account, you'll need auth options. otherwise, no.
const options =
  process.env.GITHUB_PERSONAL_ACCESS_TOKEN && process.env.GITHUB_COOKIE
    ? {
        headers: {
          Authorization: `bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
          Cookie: process.env.GITHUB_COOKIE,
        },
      }
    : {};

const instance = axios.create(options);

export default instance;
