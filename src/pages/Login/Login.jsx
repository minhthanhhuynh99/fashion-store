import React, { useEffect, useState } from 'react';
import {Link , useNavigate} from 'react-router-dom';
import './Login.scss';
import logoLogin from '../../assets/images/logoform.png'
import SliderForm from '../../components/UI/sliderForm/SliderForm';
import  {sliderData}  from '../../data/slideData';
import { toast } from 'react-toastify';
import { useSelector ,useDispatch} from 'react-redux';
import { fetchUsers } from '../../redux/Silice/UsersSlice';


const Login = () => {
    
    const users = useSelector(state=>state.userList.users)
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const navigate = useNavigate();

    //check validate

    const IsValidate = () => {
        let isproceed = true;
        if (email === null || email === '') {
            isproceed = false;
            setErrorEmail("Vui lòng nhập vào ô Email*")
        }else{setErrorEmail("")}
        if (password === null || password === '' ) {
            isproceed = false;
            setErrorPassword("Vui lòng nhập vào ô Password*")
        }else{setErrorPassword("")}
        if(!isproceed){
            
        }else{
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){
                
            }else{
                isproceed = false;
                setErrorEmail('Vui lòng nhập email hợp lệ*')
            }
            
        }
        return isproceed;
        
    }
    
    const checkUser = users.find(item=>item.email ===email)
    const handleLogin = (e) => {
        e.preventDefault()
        if(IsValidate()){
            if(checkUser.email !== email || checkUser.password !== password){
                toast.error("Tài khoản bạn đang nhập không tồn tại, Nếu chưa có tài khoản vui lòng đăng ký")
            }else{
                localStorage.setItem("userLogin", JSON.stringify({
                    fullName: checkUser.fullName,
                    email: checkUser.email,
                }))
                localStorage.setItem("orderUser", JSON.stringify({
                    
                }))
                setEmail("")
                setPassword("")
                toast.success("Successful login")
                toast.success("Hello" + " " + checkUser.fullName)
                navigate("/")
            }
        }
    }
    useEffect(()=>{
    dispatch(fetchUsers())
    },[])
    return (
      <div className='main'>
        <div className='box'>
            <div className='inner-box'>
                <div className='form-wrap'>
                    <form className='form' action="" onSubmit={handleLogin} >
                        <div className='logo-login'>
                            <img src={logoLogin} alt="" />
                            <h3>Fashion</h3>
                        </div>
                        <div className='heading-form'>
                            <h2>Welcome Back</h2>
                            <h6>Not register yet?</h6>
                            <Link to="/register" className='toggle'>Create account to Register</Link>
                        </div>

                        <div className='actual-form'>
                            <div className='input-wrap'>
                                <input type="email"  className='input-field' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label className='label-mail' htmlFor="">Email</label>
                                <a href="" className='error-mail'>{errorEmail}</a>
                            </div>
                            <div className='input-wrap'>
                                <input type="password"  className='input-field'value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <label className='label-pass' htmlFor="">Password</label>
                                <a href="" className='error-pass'>{errorPassword}</a>
                            </div>
                            <button type='submit' className='login-btn'>Login</button>
                        </div>
                    </form>
                </div>
                <div className='carousel'>
                    <SliderForm sliders={sliderData}/>
                </div>
            </div>
        </div>
      </div>
    );
};

export default Login;