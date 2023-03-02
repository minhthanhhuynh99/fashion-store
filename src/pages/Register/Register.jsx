import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link , useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { addNewUser } from '../../redux/Silice/UsersSlice';
import './Register.scss';



const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("Danang");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("male");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorFullName, setErrorFullName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirm, setErrorConfirm] = useState("");
    const [errorPhone, setErrorPhone] = useState("");
    const [errorAddress, setErrorAddress] = useState("");
    const avatar = "https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const IsValidate = () => {
        let isproceed = true;
        if (email === null || email === '') {
            isproceed = false;
            setErrorEmail("Vui lòng nhập vào ô Email*")
        }else{setErrorEmail("")}
        if (name === null || name === '') {
            isproceed = false;
            setErrorName("Vui lòng nhập vào ô Name*")
        }else{setErrorName("")}
        if (fullName === null || fullName === '') {
            isproceed = false;
            setErrorFullName("Vui lòng nhập vào ô Full Name*")
        }else{setErrorFullName("")}
        if (password === null || password === '' ) {
            isproceed = false;
            setErrorPassword("Vui lòng nhập vào ô Password*")
        }else{setErrorPassword("")}
        if (confirmPassword === null || confirmPassword === '') {
            isproceed = false;
            setErrorConfirm("Vui lòng nhập vào ô Password*")
        }else{setErrorConfirm("")}
        if (phone === null || phone === '') {
            isproceed = false;
            setErrorPhone("Vui lòng nhập vào ô Phone*")
        }else{setErrorPhone("")}
        if (address === null || address === '') {
            isproceed = false;
            setErrorAddress("Vui lòng nhập vào ô Address*")
        }else{setErrorAddress("")}
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
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {email,password,confirmPassword,name,fullName,phone,country,address,gender,avatar}
        if(IsValidate()){
            dispatch(addNewUser(user))
            toast.success("Bạn đã tạo tài khoản thành công")
            navigate("/")
        }
    }

    return (
        <section className='register__content'>
            <form action=""  className="register-form" onSubmit={handleSubmit}>
                <div className='register__title'>Registration</div>
                <div className='register__detail'>
                    <div className="input-box">
                        <span className='span-email' >Email</span> <a href="/" className='error error-email'>{errorEmail}</a>
                        <input value={email} onChange={e => setEmail(e.target.value)}  />
                    </div>
                    <div className="input-box">
                        <span className='span-pass'>Password </span> <a href="/" className='error error-pass'>{errorPassword}</a>
                        <input type="password"  value={password} onChange={e => setPassword(e.target.value)}  />
                    </div>
                    <div className="input-box">
                        <span className='span-cfpass'>Confirm Password</span> <a href="/" className='error error-cfpass'>{errorConfirm}</a>
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="input-box">
                        <span className='span-name' htmlFor="">Name</span> <a href="/" className='error error-name'>{errorName}</a>
                        <input  value={name} onChange={e => setName(e.target.value)}  />
                    </div>
                    <div className="input-box">
                        <span className='span-full' htmlFor="">Full Name</span> <a href="/" className='error error-full'>{errorFullName}</a>
                        <input  value={fullName} onChange={e => setFullName(e.target.value)}  />
                    </div>
                    <div className="input-box">
                        <span className='span-phone'  htmlFor="">Phone</span> <a href="/" className='error error-phone'>{errorPhone}</a>
                        <input   value={phone} onChange={e => setPhone(e.target.value)}  />
                    </div>
                    <div className="input-box">
                        <span  htmlFor="">Country </span>
                        <select value={country} onChange={e => setCountry(e.target.value)} >
                            <option value="Hanoi">Hà Nội</option>
                            <option value="Danang">Đà Nẵng</option>
                            <option value="HoChiMinh">Hồ Chí Minh</option>
                        </select>
                    </div>
                    <div className="input-box">
                        <span className='span-add' htmlFor="">Address</span><a href="/" className='error error-add'>{errorAddress}</a>
                        <textarea cols="10" rows="10" value={address} onChange={e => setAddress(e.target.value)}></textarea>
                    </div>
                
                </div>
                <div className="input-box">
                        <span  htmlFor="">Gender</span>
                        <br />
                        <input className='radio-box' type="radio"  value="male" name='gender' checked={gender === 'male'} onChange={e => setGender(e.target.value)}/>
                        <span  htmlFor="">Name</span>
                        <br />
                        <input className='radio-box' type="radio"   value="female" name='gender' checked={gender === 'female'} onChange={e => setGender(e.target.value)}/>
                        <span  htmlFor="">Nữ</span>
                </div>
                <div className='button-box'>
                    <button type='submit' className='register-btn'>Register</button>
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                </div>
            </form>
        </section>
    );
};


export default Register;



