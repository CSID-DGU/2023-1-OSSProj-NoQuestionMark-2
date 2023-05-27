import styled from 'styled-components';
import { useNavigate } from 'react-router';

const Button = styled.button``;
const NotFound = () => {
	const navigate = useNavigate();

	return (
		<>
			<h1>불가능한 접근입니다.</h1>
			<Button onClick={() => navigate(-1)}>돌아가기</Button>
		</>
	);
};

export default NotFound;