import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
	display:flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 500px;
`;
const BackLinkButton = styled(Link)`
	display: flex;
	align-items:center; 
	justify-content: center;
	margin-top: 5rem;
	width: 25rem;
	background-color: orange;
	color: white;
	border-radius: 1rem;
	border:none;
	height: 2.7rem;
	font-size : 1rem;
	font-weight: bold;
	cursor: pointer;
	padding-top: 0.2rem;
`;

const NotFound = () => {
	return (
		<Container>
			<h1>불가능한 접근입니다.</h1>
			<BackLinkButton to ='/'>돌아가기</BackLinkButton>
		</Container>

	);
};

export default NotFound;