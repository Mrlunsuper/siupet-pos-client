const authService = {
    isLogin () {
        return !!localStorage.getItem('user');
    },
    logout () {
        localStorage.removeItem('user')
    }
}
export default authService;