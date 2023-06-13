import styled from 'styled-components';
import InfoProps from '../interfaces/SubmitButtonForm'

const ButtonForm = styled.input`
    display: block;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    text-align: center; 
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;
    margin : auto;
    background: ${props => props.color};
    width: ${props => props.width};
    height: ${props => props.height};
`;


const SubmitButton = ({name,width,height,color}: InfoProps) => {
    return (<><ButtonForm type='submit' value={name} width={width} height={height} color={color}/></>);
}

export default SubmitButton;