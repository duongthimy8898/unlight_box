export const logout = async () => {
  try {
    // await axios.post("/api/logout", {
    //   refreshToken: localStorage.getItem("refresh_token"),
    // });
  } catch (err) {
    console.warn("Logout API error:", err);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};
