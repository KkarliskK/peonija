import Cookies from 'js-cookie';
import '../style/Register.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Register() {

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [mobile, setMobile] = useState('');
    const [mobileError, setMobileError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [repeatPass, setRepeatPass] = useState('');
    const [repeatPassError, setRepeatPassError] = useState(false);
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);

    const navigate = useNavigate();
    if (Cookies.get('token') != undefined) {
        navigate('/');
    }
    
    const register = e =>{
        e.preventDefault();
    
        axios
            .post('http://localhost:8000/api/register', {
                name: name,
                username: username,
                email: email,
                mobile: mobile,
                password: password,
            })
            .then(function (response) {
                Cookies.set('token', response.data.token);
                navigate('/');
            })
            .catch(function (error){
                console.log(error);
            });
    }

  return (
    <>
      <div className={`flex w-full bg-black`}>Reģistrējies</div>
      <form onSubmit={register}>
        <input 
            type='text'
            placeholder='Vārds'
            value={name}
            onChange={e => setName(e.target.value)}
        />
        {nameError && <p className={css.error}>Vārda lauks nedrīkst palikt tukšs.</p>}
        <input 
            type='text'
            placeholder='Lietotājvārds'
            value={username}
            onChange={e => setUsername(e.target.value)}
        />
        {usernameError && <p className={css.error}>Lietotājvārda lauks nedrīkst palikt tukšs.</p>}
        <input 
            type='text'
            placeholder='E-pasts'
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
        {emailError && <p className={css.error}>Epasta lauks nedrīkst palikt tukšs.</p>}
        <input 
            type='mobile'
            placeholder='Telefona nummurs'
            value={mobile}
            onChange={e => setMobile(e.target.value)}
        />
        {mobileError && <p className={css.error}>Telefona nr. lauks nedrīkst palikt tukšs.</p>}
        <input 
            type='password'
            placeholder='Parole'
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
        {passwordError && <p className={css.error}>Paroles lauks nedrīkst palikt tukšs.</p>}
        <input 
            type='password'
            placeholder='Parole atkārtoti'
            value={repeatPass}
            onChange={e => setRepeatPass(e.target.value)}
        />
        {repeatPassError && <p className={css.error}>Atkārtotas paroles lauks nedrīkst palikt tukšs.</p>}
        {repeatPasswordError && <p className={css.error}>Paroles nesakrīt.</p>}

        <button>Izveidot Kontu</button>
      </form>
    </>
  )
}

export default Register