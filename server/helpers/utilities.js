const randString = (prefix) => `${prefix}${Math.random().toString(36).substring(7)}`.toUpperCase();

export default randString;
