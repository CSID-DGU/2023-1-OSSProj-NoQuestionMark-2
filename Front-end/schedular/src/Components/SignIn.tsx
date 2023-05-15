import {useState, useEffect} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {logout} from '../utils/utils';
import {IAuthForm} from '../interfaces/IAuthForm';
import * as Api from '../lib/Api';
import { useRecoilState } from 'recoil';
import { isLoginCheck,userInfoState,UserInfo } from 'recoil/Atom'

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
  const navigate = useNavigate();
  const [loginCheck, setLoginCheck] = useRecoilState(isLoginCheck);
  const [userInfo, setUserInfo] = useRecoilState<UserInfo>(userInfoState);
  const [loginMessage,setLoginMessage] = useState(''); 

  useEffect(()=> {
    setLoginMessage(`${userInfo.schoolNumber}(${userInfo.userName})`)
  },[loginCheck])

  const {
    register,
    handleSubmit, 
    formState:{isSubmitting},
    reset
  } = useForm<IAuthForm>({ mode: 'onBlur' });

  const onSubmit : SubmitHandler<IAuthForm> = data => login(data);
  const login = async ({ schoolNumber, password}:IAuthForm) => {
		try {
			const loginData = { schoolNumber, password} ;
			await Api.post(`/login`, loginData).then((res) => {
				const {schoolNumber,userName,userType,token,schedule,subjects} = res.data.result;
        localStorage.setItem('token',token);
        localStorage.setItem('userType',userType);
        setLoginCheck(!loginCheck);
        setUserInfo(
          {
            schoolNumber : schoolNumber,
            userName : userName,
          }
        );
        alert(`${schoolNumber}(${userName})님 로그인 되었습니다.`);
        navigate('/');
			});
		} catch (e) {
			alert(e);
		}
	};
  const LogoutHandler = () =>{
    logout();
    setLoginCheck(!loginCheck);
    setUserInfo({schoolNumber: '',userName : ''});
    navigate('/');
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
    
    : <div>{loginMessage}<SignInButton onClick={LogoutHandler}>로그아웃</SignInButton></div>
    }
    </>
  )
}

export default SignIn;