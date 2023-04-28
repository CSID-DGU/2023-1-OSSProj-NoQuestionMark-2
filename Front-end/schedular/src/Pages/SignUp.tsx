import { useForm, SubmitHandler } from 'react-hook-form';
import SubmitButton from '../Components/SubmitButton';

interface IAuthForm {
    userName: string;
    userNumber: string;
    userEmail: string;
    userPassword: string;
    passwordConfirm: string;
    userIdentity: string;
}

const getValue = (id : string) : (string | null) =>{
    const pw = (document.querySelector(`#${id}`) as HTMLInputElement | null)?.value;
    return pw || '';
}

const SignUp = () => {

    const {     
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IAuthForm>({mode : 'onBlur'});
    
    const onSubmit: SubmitHandler<IAuthForm> = data => console.log(data);

    return (
        <div>
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='userName'>이름</label>
                <input 
                    id = 'userName'
                    type = 'text'
                    placeholder='이름을 입력해주세요.'
                    {...register('userName', {    
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
                {errors.userName && <small role='alert'>{errors.userName.message}</small>}

                <br />
                <label htmlFor='userNumber'>학번</label>
                <input 
                    id = 'userNumber'
                    type = 'text'
                    placeholder='학번을 입력해주세요.'
                    {...register('userNumber', {
                        required: '학번을 입력해주세요.',
                        pattern: {
                            value: /[0-9]{10}/,
                            message: '학번 형식(숫자,10자리)에 맞지 않습니다.',
                        },
                    })} 
                />
                {errors.userNumber && <small role='alert'>{errors.userNumber.message}</small>}

                <br />
                <label htmlFor='email'>e-mail</label>
                <input
                    id='email'
                    type='text'
                    placeholder='test@email.com'
                    {...register('userEmail', {
                        required: '이메일을 입력해주세요.',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: '이메일 형식에 맞지 않습니다.',
                        },
                    })}
                />
                {errors.userEmail && <small role='alert'>{errors.userEmail.message}</small>}
                <br />

                <div>
                    <label>신분</label>
                    <input type='radio' id='student' value='STUDENT' defaultChecked {...register('userIdentity')}/> 
                    <label htmlFor='student'>학생</label>

                    <input type='radio' id='prof' value='PROFESSOR' {...register('userIdentity')}/> 
                    <label htmlFor='prof'>교수</label>
                </div>
                
                <label htmlFor='password'>비밀번호</label>
                <input
                    id='password'
                    type='password'
                    placeholder='*******'
                    {...register('userPassword', {
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
                {errors.userPassword && <small role='alert'>{errors.userPassword.message}</small>}
                <br />

                <label htmlFor='password'>비밀번호 확인</label>
                <input
                    type='password'
                    placeholder='*******'
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
                <br />
                <SubmitButton name='가입하기' />
            </form>
        </div>
    );
}

export default SignUp;