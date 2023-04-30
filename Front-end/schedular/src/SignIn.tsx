import { useForm } from "react-hook-form";
import styled from "styled-components";


const SignIn = () => {
  type SignInValue = {
    userNumber: string;
    userPassword: string;
  }

  const { 
    register,
    handleSubmit, 
    formState:{errors, isSubmitting},
    reset,  
  } 
    = useForm<SignInValue>({ mode: 'onChange' });

  const onSubmit = (data: SignInValue) => {
    console.log(data);
    reset();
  }

    
  return (
    <InputForm onSubmit={handleSubmit(onSubmit)}>
        <InputWapper>
          <InputLine>
            <IdInput
              type="text"
              placeholder="아이디"
              {...register("userNumber", { required: true })} />
          </InputLine>
          <InputLine>
            <PasswordInput
              type="password"
              placeholder="비밀번호"
              {...register("userPassword", { required: true })} />
          </InputLine>
        </InputWapper>
          <SignInButton
            type="submit"
            disabled={isSubmitting}>
              로그인
          </SignInButton>
    </InputForm>
   )
  }


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

export default SignIn