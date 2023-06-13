// memo지혜 : 토큰유무를 확인하는 함수
export const getToken = () => {
	return localStorage.getItem('token');
};
// memo지혜 : 토큰유무를 확인하는 함수
export const getUserType = () => {
	return localStorage.getItem('userType');
};
// memo지혜 : 로그아웃 함수
export const logout = () => {
	localStorage.clear();
	alert('로그아웃 되었습니다.');
	if (window.location.pathname === '/calendar')
        window.location.href = '/';
};
// memo지혜 : 로그인유무를 확인하는 함수
export const isLogin = () => {
	const token = getToken();
	return token ? true : false;
};