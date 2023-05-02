export const getToken = () => {
	return localStorage.getItem('token');
};
export const getUserType = () => {
	return localStorage.getItem('userType');
};

export const logout = () => {
	localStorage.clear();
	alert('로그아웃 되었습니다.');
	if (
		window.location.pathname === '/calendar'
	) {
		window.location.href = '/';
	}
};

export const isLogin = () => {
	const token = getToken();
	return token ? true : false;
};