
export const getGithubOAuthUrl = () => {
    const clientId = "Ov23ligTzzgAyRB1KXuw";
    const redirectUri = "http://localhost:3000/auth/github/callback";
    const scopes = ["read:user", "user:email"];
    const state = "123";

    /*const generateRandomState = () => {
         [...Array(30)]
            .map(() => Math.random().toString(36)[2])
            .join("");
            }
        */

    return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(" ")}&state=${state}`;
    };

export const redirectToGithub = () => {
    window.location.href = getGithubOAuthUrl();
    }