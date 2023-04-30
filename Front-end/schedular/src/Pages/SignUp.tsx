import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SubmitButton from '../Components/SubmitButton';
import * as Api from '../lib/Api';

const Container = styled.div`
    flex-direction: column;
    margin : 5rem auto;
`;
const Form = styled.form`
    height: 100vh;
    width : 100vw;
`;
const Grid = styled.div`
    display: grid;
    grid-template-columns: 0.2fr 0.8fr;
    grid-gap: 0.5rem;
    justify-content : left;
    text-align: right;

    width: 50%;
    margin: 1rem auto;
    border: 1px solid black;
    padding: 2rem 2rem;
`;
const RadioGroup = styled.div`
    display: felx;
    flex-direction: row;
    padding: 0 1rem;
    align-items: center;
`;
const RadioButton = styled.div`
    &:first-child {
        margin-right : 2rem;
    }
`;
const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
`;
const Input = styled.input`
    width: 100%;
    height: 1.8rem;
`;

interface IAuthForm {
    name: string;
    schoolNumber: string;
    email: string;
    password: string;
    passwordConfirm: string;
    userType: string;
};

const SignUp = () => {

    const navigate = useNavigate();
    const {     
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IAuthForm>({mode : 'onBlur'});
    
    const onSubmit: SubmitHandler<IAuthForm> = data => join(data);
    
    const getValue = (id : string) : (string | null) =>{
        const pw = (document.querySelector(`#${id}`) as HTMLInputElement | null)?.value;
        return pw || '';
    }
    
    const join = async ({ name, schoolNumber, email, password,userType }:IAuthForm) => {
		try {
			const joinData = { name, schoolNumber, email, password,userType };
			await Api.post(`/signin`, joinData).then((res) => {
                //console.log(res.data.resultCode);
	            //console.log(res.data.result);
                console.log(res);
				alert(`정상적으로 회원 가입되었습니다.`);
				navigate('/');
			});
		} catch (e) {
			alert(e);
		}
	};

    return (
        <Container>
            <h1>회원가입</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Grid>
                
                <label htmlFor='name'>이름</label>
                <InputDiv>
                <Input 
                    id = 'name'
                    type = 'text'
                    placeholder='이름을 입력해주세요.'
                    {...register('name', {    
                            required: '이름을 입력해주세요.',
                            minLength: { 
                                value: 2,
                                message: '2글자 이상 입력해주세요.'
                            },
                            pattern: { // input의 정규식 패턴
                                value: /^[A-za-z가-힣]{2,6}$/,
                                message: '가능한 문자: 영문 대소문자, 글자 단위 한글', // 에러 메세지
                            },
                        }
                    )}
                />
                {errors.name && <small role='alert'>{errors.name.message}</small>}

                </InputDiv>
                
                <label htmlFor='schoolNumber'>학번</label>
                <InputDiv>
                <Input 
                    id = 'schoolNumber'
                    type = 'text'
                    placeholder='학번을 입력해주세요.'
                    {...register('schoolNumber', {
                        required: '학번을 입력해주세요.',
                        pattern: {
                            value: /[0-9]{10}/,
                            message: '학번 형식(숫자,10자리)에 맞지 않습니다.',
                        },
                    })} 
                />
                
                {errors.schoolNumber && <small role='alert'>{errors.schoolNumber.message}</small>}
                </InputDiv>
                
                <label htmlFor='email'>e-mail</label>
                <InputDiv>
                <Input
                    id='email'
                    type='text'
                    placeholder='test@email.com'
                    {...register('email', {
                        required: '이메일을 입력해주세요.',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: '이메일 형식에 맞지 않습니다.',
                        },
                    })}
                />
                {errors.email && <small role='alert'>{errors.email.message}</small>}
                </InputDiv>

                <label>신분</label>                
                <RadioGroup>
                    <RadioButton>
                        <input type='radio' id='student' value='STUDENT' defaultChecked {...register('userType')}/> 
                        <label htmlFor='student'>학생</label>
                    </RadioButton>

                    <RadioButton>
                        <input type='radio' id='prof' value='PROFESSOR' {...register('userType')}/> 
                        <label htmlFor='prof'>교수</label>
                    </RadioButton>
                </RadioGroup>
                
                <label htmlFor='password'>비밀번호</label>
                <InputDiv>
                <Input
                    id='password'
                    type='password'
                    placeholder='********'
                    {...register('password', {
                        required: '비밀번호는 필수 입력입니다.',
                        minLength: {
                            value: 8,
                            message: '8자리 이상 비밀번호를 사용하세요.',
                        },
                        pattern : {
                            value : /(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?=\S+$).{8,20}/,
                            message : '소문자, 숫자, 특수문자 조합의 8~20자'
                        }
                    })}
                />
                {errors.password && <small role='alert'>{errors.password.message}</small>}
                </InputDiv>
                <label htmlFor='password'>비밀번호 확인</label>
                <InputDiv>
                <Input
                    type='password'
                    placeholder='********'
                    {...register('passwordConfirm', {
                        required: '비밀번호는 필수 입력입니다.',
                        minLength: {
                            value: 8,
                            message: '8자리 이상 비밀번호를 사용하세요.',
                        },
                        pattern : {
                            value : /(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?=\S+$).{8,20}/,
                            message : '소문자, 숫자, 특수문자 조합의 8~20자'
                        },
                        validate: {
                            check: (val) => {
                                if (getValue('password') !== val) {
                                    return '비밀번호가 일치하지 않습니다.';
                                }
                            },
                        },
                    })}
                />
                {errors.passwordConfirm && (
                    <small role='alert'>{errors.passwordConfirm.message}</small>
                )}
                </InputDiv>
                </Grid>
                <SubmitButton name='가입하기' width='15rem' height='3rem'/>
            </Form>
        </Container>
    );
}

export default SignUp;