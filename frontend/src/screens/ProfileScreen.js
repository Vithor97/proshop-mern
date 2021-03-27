import React, {useState, useEffect} from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'

const ProfileScreen = ({ history}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector((state)=> state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    //pegar dados do reducer userUpdateProfile
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile



    useEffect(()=>{ 

        if(!userInfo){   
            history.push('/login')
        }
        else{
            console.log("------------user-----" )
            console.log(user)
            console.log("u------------------" )

            // if(success){
                
            //     console.log("success") 
            //     dispatch(getUserDetails('profile'))
            //     return
            // }

            if(!user || !user.name || success){
                console.log("Ta iiiiio")
                dispatch(getUserDetails('profile'))
                dispatch({type: USER_UPDATE_PROFILE_RESET})
            } else{
                console.log("Ta passando baixo")
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])



    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Senhas não são iguais')
        }
        else {
            //dispatch(updateUserProfile({id: user._id, name, email, password }))
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
       
    }
    
    return (
        <Row>
            <Col md={3}>
            <h1>User Profile</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            
            {success && <Message variant='success'>Perfil Atualizado</Message>}

            {loading && <Loader/>}

            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' 
                                placeholder='Enter name' 
                                value={name} 
                                onChange={(e)=>setName(e.target.value)}>
                                
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control type='email' 
                                placeholder='Enter email' 
                                value={email} 
                                onChange={(e)=>setEmail(e.target.value)}>
                                
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' 
                                placeholder='Enter password' 
                                value={password} 
                                onChange={(e)=>setPassword(e.target.value)}>
                                
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Confirm password' 
                        value={confirmPassword} 
                        onChange={(e)=>setConfirmPassword(e.target.value)}>            
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
            </Col>
            <Col md={9}>
                <h2>My orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen;
