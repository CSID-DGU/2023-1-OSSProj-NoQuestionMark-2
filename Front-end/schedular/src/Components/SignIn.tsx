import {useState, useEffect} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {logout} from '../utils/utils';
import {IAuthForm} from '../interfaces/IAuthForm';
import {UserInfo} from '../interfaces/GlobalState';
import * as Api from '../lib/Api';
import { useRecoilState } from 'recoil';
import { isLoginCheck,userInfoState } from 'recoil/Atom'
import axios from 'axios';

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
  border-radius: 3px;
  background-color: #e72f4b;
  cursor: pointer;
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
  cursor: pointer;
`;
const LogoutWapper = styled.div`
  display:flex;
  align-items: center;
  padding-left: 20px;
  font-size: 15px;
  font-weight: bold;
`;
const LogoutButton = styled.button`
  margin: 0 20px;
  height: 34px;
  width: 80px;
  text-align: center;
  color: #fff;
  padding: 7px 5px;
  border: none;
  border-radius: 3px;
  background-color: #286090;
  cursor: pointer;
`;

const SignIn = () => {
  const navigate = useNavigate();
  const [loginCheck, setLoginCheck] = useRecoilState(isLoginCheck);
  const [userInfo, setUserInfo] = useRecoilState<UserInfo>(userInfoState);
  const [loginMessage,setLoginMessage] = useState(''); 

  useEffect(()=> {
    setLoginMessage(`${userInfo.schoolNumber}(${userInfo.userName})`)
  },[loginCheck])

  // memo정민: react-hook-form을 사용하여 폼 상태를 관리
  const {
    register,
    handleSubmit, 
    formState:{isSubmitting},
    reset
  } = useForm<IAuthForm>({ mode: 'onBlur' });
  
  // memo정민: react-hook-form을 사용한 폼 제출 핸들러 정의
  const onSubmit : SubmitHandler<IAuthForm> = data => login(data);
  const login = async ({ schoolNumber, password}:IAuthForm) => {
		try {
			const loginData = { schoolNumber, password} ;
			await Api.post(`/login`, loginData).then((res) => {
  
				const {schoolNumber,userName,userType,token,schedule,subjects} = res.data.result;
        localStorage.setItem('token',token);
        localStorage.setItem('userType',userType);
        setLoginCheck(!loginCheck);
        setUserInfo({schoolNumber,userName,userType});
        alert(`${schoolNumber}(${userName})님 로그인 되었습니다.`);
        navigate('/');
			});
		} catch (e) {
			if(axios.isAxiosError(e)){
        console.log(e.response);
        alert(e.response?.data);
      }
		}
	};
  const LogoutHandler = () =>{
    logout();
    setLoginCheck(!loginCheck);
    setUserInfo({schoolNumber: null,userName : null,userType: null});
    reset();
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
    
    : <LogoutWapper>{loginMessage}님<LogoutButton onClick={LogoutHandler}>로그아웃</LogoutButton></LogoutWapper>
    }
    </>
  )
}

export default SignIn;