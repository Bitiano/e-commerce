export function filterUsers(users, query) {
    return users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
}