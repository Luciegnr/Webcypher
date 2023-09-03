const setAccessToken = (token) => {
    localStorage.setItem('accessToken', token);
};

const getAccessToken = () => localStorage.getItem('accessToken');

const logout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/connexion';
};

export { setAccessToken, getAccessToken, logout };
