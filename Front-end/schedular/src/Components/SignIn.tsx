import { useForm } from 'react-hook-form';
import styled from 'styled-components';

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

const SignIn = () => {
  type SignInValue = {
    SchoolNumber: string;
    Password: string;
  }

  const { 
    register,
    handleSubmit, 
    formState:{isSubmitting},
    reset,  
  } = useForm<SignInValue>({ mode: 'onChange' });

  const onSubmit = (data: SignInValue) => {
    console.log(data);
    reset();
  }

  return (
    <InputForm onSubmit={handleSubmit(onSubmit)}>
        <InputWapper>
          <InputLine>
            <IdInput
              type='text'
              placeholder='아이디'
              {...register('SchoolNumber', { required: true })} />
          </InputLine>
          <InputLine>
            <PasswordInput
              type='password'
              placeholder='비밀번호'
              {...register('Password', { required: true })} />
          </InputLine>
        </InputWapper>
          <SignInButton
            type='submit'
            disabled={isSubmitting}>
              로그인
          </SignInButton>
    </InputForm>
    )
  }

export default SignIn