export function addUser(user) {
    return {
      type: "ADD_USER",
      payload: user
    }
}

export function deleteUser(id) {
    return {
      type: "DELETE_USER",
      payload: id
    }
}