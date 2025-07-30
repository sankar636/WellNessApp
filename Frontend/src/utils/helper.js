export const getInitials = (username) => {
    if (!username || typeof username !== "string") return "";

    const words = username.split(" ")
    const firstInitial = words[0]?.charAt(0) || "";
    const secondInitial = words[1]?.charAt(0) || "";
    return (firstInitial + secondInitial).toUpperCase()
} 

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return regex.test(email)
}