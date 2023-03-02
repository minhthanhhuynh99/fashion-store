import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser } from '../../redux/Silice/UsersSlice';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import "./Profile.scss"
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import  storage  from "../../config/configFireBase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { countDown } from '../../redux/Silice/count';
const Profile = () => {
    const top = () => {
        window.scrollTo(0, 0)
      }
    top()
    const negative = useNavigate()
    const user = useSelector(state => state.userList.users);
    const [url,setUrl] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUsers())
    },[])

    const [isLogin, setIsLogin] = useState(() => {
        const save = localStorage.getItem('userLogin') ? JSON.parse(localStorage.getItem('userLogin')) : [];
        return save;
      });

    const userLogin = user.find(item => item.email === isLogin.email)
    const {id} = useParams()
    const [name, setName] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");

    
    const handleUpdate = (e) =>{
        e.preventDefault()
        negative(`update/${userLogin.id}`)
    }
    const handleSave = (e) =>{
            e.preventDefault();
            dispatch(updateUser({
                fullName: fullName,
                name: name,
                password: password,
                confirmPassword: confirmPassword,
                phone: phone,
                address: address,
                country:country,
                id:id,
            }))
            toast.success("Bạn Cập Nhật Hồ Sơ Thành Công!")
    }

    const [file, setFile] = useState();
    const [percent, setPercent] = useState(0);

    function handleChange(e) {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setFile(file);
    }

    const handleUpload = () => {
        if (!file) {
            toast.warn("Bạn vui lòng chọn ảnh!")
        }

        const storageRef = ref(storage, `/files/${file.name}`);


        const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
            "state_changed",
            (snapshot) => {
            const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );


            setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    dispatch(updateUser({
                        id:userLogin.id,
                        avatar: url
                    }))
                    setTimeout(()=>{
                        dispatch(countDown())
                        toast.success("Bạn đã thay đổi ảnh đại diện thành công");
                    },1000)
                });
            }
        );
    };


    
    return (
        <>
        <Header/>
        <div className='profile-page'>
             {userLogin?[userLogin].map(item =>{
                return (
                    <div className='profile-content'>
                    <h2>Edit Profile</h2>
                    <div className='profile-map'>
                        <div className='profile-avatar'>
                        {!file?<img src={item.avatar} alt="" />:<img src={file.preview} alt="" />}

                        <div className='round'> 
                            <i class="ri-camera-fill"></i>
                            <input type="file" onChange={handleChange} accept="/image/*" />
                        </div>
                        <button onClick={handleUpload}>Save Avatar</button>
                        </div>
                        <form action="" className='profile-form' onSubmit={handleUpdate}>
                            <div className='wrapper-form'>
                                <div className='profile-control'>
                                    <p htmlFor="">Email <span>*</span></p>
                                    <input type="text" className='disable-input' disabled placeholder={item.email} onChange={e => setEmail(e.target.value)} value={email}/>
                                </div>
                                <div className='profile-control'>
                                    <p htmlFor="">Name</p>
                                    <input type="text" placeholder={item.name} onChange={e => setName(e.target.value)} value={name}/>
                                </div>
                                <div className='profile-control'>
                                    <p htmlFor="">Full Name</p>
                                    <input type="text" placeholder={item.fullName} onChange={e => setFullName(e.target.value)} value={fullName}/>
                                </div>
                                <div className='profile-control'>
                                    <p htmlFor="">Password</p>
                                    <input type="text" placeholder={item.password} onChange={e => setPassword(e.target.value)} value={password}/>
                                </div>
                                <div className='profile-control'>
                                    <p htmlFor="">Confirm PassWord</p>
                                    <input type="text" placeholder={item.confirmPassword} onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword}/>
                                </div>
                                <div className='profile-control'>
                                    <p htmlFor="">Phone</p>
                                    <input type="number" placeholder={item.phone} onChange={e => setPhone(e.target.value)} value={phone}/>
                                </div>
                                <div className='profile-control'>
                                    <p htmlFor="">Address</p>
                                    <input type="text" placeholder={item.address} onChange={e => setAddress(e.target.value)} value={address}/>
                                </div>
                                <div className='profile-control'>
                                    <p htmlFor="">Country</p>
                                    <input type="text" placeholder={item.country} onChange={e => setCountry(e.target.value)} value={country}/>
                                </div>
                                <div className='profile-control-btn'>
                                    {!id? 
                                    <button type='submit'onClick={handleUpdate}>Update</button>
                                    :
                                    <button type='submit'onClick={handleSave}>save</button>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                )
                
            }):''}
        </div>
        <Footer/>
        </>
    );
};

export default Profile;

