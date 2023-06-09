import { Navigate } from 'react-router-dom';
import { isLogin } from '../utils/utils';

type Props = {
	children: JSX.Element;
}

// memo지혜 : 비로그인 상태일 때만 페이지 이동
const NonMemberRoute : React.FC<Props> = ({ children }) => {
	if (isLogin()) {
		return <Navigate to="/notfound" />;
	} else {
		return children;
	}
};

// memo지혜 : 로그인 상태일 때만 페이지 이동
const MemberRoute : React.FC<Props> = ({ children }) => {
	if (isLogin()) {
		return children;
	} else {
		return <Navigate to="/notfound" />;
	}
};
export { NonMemberRoute, MemberRoute };