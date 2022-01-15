const randString = (prefix) => `${prefix}${Math.random().toString(36).substring(7)}`.toUpperCase();

export const dateToday = () => {
    const today = new Date();
    const day = today.getDay();
    const month = today.getMonth();
    const year = today.getFullYear();

    return `${year}-${month}-${day}`
}

export default randString;
