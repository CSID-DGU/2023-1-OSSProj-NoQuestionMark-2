import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SubmitButton from '../Components/SubmitButton';
import * as Api from '../lib/Api';
import {IAuthForm} from '../interfaces/IAuthForm';

const Container = styled.div`
    flex-direction: column;
    margin: 5rem auto;
`;
const Form = styled.form`
    height: 100%;
    width: 100%;
    margin: 3rem auto;
`;
const Grid = styled.div`
    display: grid;
    grid-template-columns: 0.2fr 0.8fr;
    grid-gap: 0.5rem;
    justify-content : left;
    text-align: right;
    width: 50%;
    margin: 2rem auto;
    padding: 1rem 0rem 1rem 7rem;
`;
const RadioGroup = styled.div`
    display: felx;
    flex-direction: row;
    padding: 0 1rem;
    align-items: center;
    margin: 0.3rem;
`;
const RadioButton = styled.div`
    &:not(first-child) {
        margin-right : 6rem;
    }
    accent-color: red;
`;
const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    padding: 0 1rem;
    margin: 0.3rem;
`;
const Input = styled.input`
    width: 95%;
    height: 2.3rem;
    padding: 3px 12px;
    border: none;
    border-radius: 5px;
    background-color: #ffe8cc;
`;
const Label = styled.label`
    margin: 0.8rem;
`;


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
    
    const join = async ({ name, schoolNumber, email, password, userType}:IAuthForm) => {
		try {
			const joinData = { name, schoolNumber, email, password,userType };
			await Api.post(`/signup`, joinData).then((res) => {
                let {schoolNumber, name} = res.data.result;
				alert(`정상적으로 ${schoolNumber}(${name}) 회원가입 되었습니다.`);
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
                    <Label htmlFor='name'>이름</Label>
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
                                pattern: { 
                                    // memo지혜 : 정규식 패턴
                                    value: /^[A-za-z가-힣]{2,6}$/,
                                    // memo지혜: 에러 메세지
                                    message: '가능한 문자: 영문 대소문자, 글자 단위 한글', 
                                },
                            }
                        )}
                    />
                    {errors.name && <small role='alert'>{errors.name.message}</small>}
                    </InputDiv>
                    
                    <Label htmlFor='schoolNumber'>학번</Label>
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
                    
                    <Label htmlFor='email'>e-mail</Label>
                    <InputDiv>
                        <Input
                            id='email'
                            type='text'
                            placeholder='dongguk@email.com'
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

                    <Label>신분</Label>                
                    <RadioGroup>
                        <RadioButton>
                            <input type='radio' id='student' value='STUDENT' defaultChecked {...register('userType')}/> 
                            <label htmlFor='student'>학생</label>
                        </RadioButton>

                        <RadioButton>
                            <input type='radio' id='prof' value='PROFESSOR' {...register('userType')}/> 
                            <label htmlFor='prof'>교수</label>
                        </RadioButton>
                        
                        <RadioButton>
                            <input type='radio' id='prof' value='PROFESSOR' {...register('userType')}/> 
                            <label htmlFor='prof'>교직원</label>
                        </RadioButton>
                    </RadioGroup>
                    
                    <Label htmlFor='password'>비밀번호</Label>
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
                    <Label htmlFor='password'>비밀번호 확인</Label>
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
                        {errors.passwordConfirm && <small role='alert'>{errors.passwordConfirm.message}</small>}
                    </InputDiv>
                </Grid>
                <SubmitButton name='가입하기' width='15rem' height='3rem' color='#EB9332'/>
            </Form>
        </Container>
    );
}

export default SignUp;