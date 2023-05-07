import {useState} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {isLogin,logout} from '../utils/utils';
import {IAuthForm} from '../interfaces/IAuthForm';
import * as Api from '../lib/Api';

const InputForm = styled.form`
  display: flex;
  align-items: center;
`;
const InputWapper = styled.div`
  display: flex;
`;
const InputLine = styled.div`
  margin-right: 10px;
`;
const IdInput = styled.input`
  height: 34px;
  width: 170px;
  padding-left: 10px;
  border: 1px solid #666;
  border-radius: 2px;
  font-size: 13px;
`;
const PasswordInput = styled.input`
  height: 34px;
  width: 170px;
  padding-left: 10px;
  border: 1px solid #666;
  border-radius: 2px;
  font-size: 13px;
`;
const SignInButton = styled.button`
  margin-right: 20px;
  height: 34px;
  width: 72px;
  text-align: center;
  color: #fff;
  padding: 7px 16px;
  border: none;
  border-radius: 2px;
  background-color: #e72f4b;
`;
const SignUpButton = styled(Link)`
  margin 33px 0;
  text-align: center;
  color: #fff;
  padding: 7px 16px;
  border: none;
  border-radius: 2px;
  background-color: #666;
  font-size: 12px;
`;

const SignIn = () => {
  const [userInfo, setUserInfo] = useState('');
  const [loginCheck, setLoginCheck] = useState(false);
  const { 
    register,
    handleSubmit, 
    formState:{isSubmitting},
    reset
  } = useForm<IAuthForm>({ mode: 'onChange' });

  const onSubmit : SubmitHandler<IAuthForm> = data => login(data);
  const login = async ({ schoolNumber, password}:IAuthForm) => {
		try {
			const loginData = { schoolNumber, password} ;
			await Api.post(`/login`, loginData).then((res) => {
        //{schoolNumber,name,userType,token}
				const {token} = res.data.result;
        localStorage.setItem('token',token);
        //localStorage.setItem('userType',userType);
        setLoginCheck(isLogin);
        //setUserInfo(`${schoolNumber}(${name})님`);
        //alert(`${userInfo}님 로그인 되었습니다.`);
			});
      reset();
		} catch (e) {
			alert(e);
		}
	};
  const LogoutHandler = () =>{
    logout();
    setLoginCheck(isLogin);
    setUserInfo('');
  }
  return (
    <>
    {!loginCheck ?
    <InputForm onSubmit={handleSubmit(onSubmit)}>
        <InputWapper>
          <InputLine>
            <IdInput
              type='text'
              placeholder='아이디'
              {...register('schoolNumber', { required: true })} />
          </InputLine>
          <InputLine>
            <PasswordInput
              type='password'
              placeholder='비밀번호'
              {...register('password', { required: true })} />
          </InputLine>
        </InputWapper>
        <SignInButton type='submit' disabled={isSubmitting}>로그인</SignInButton>
        <SignUpButton to='/signup'>회원가입</SignUpButton>
    </InputForm>
    
    : <div>{userInfo}<SignInButton onClick={LogoutHandler}>로그아웃</SignInButton></div>
    }
    </>
  )
}

export default SignIn;