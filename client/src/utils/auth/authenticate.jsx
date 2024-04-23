export const authenticate = () => {
    const token = localStorage.getItem("token");
    return token && token !== undefined  ? true : false
}