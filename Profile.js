import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import Navabarlogged from "./Navbarlogged";
import Footer from './Footer';
import Signup from './Signup';
import Upload from './Upload';
import $ from 'jquery';
import Home from './Home';
import Search from "./Search";
import DefaultUserPic from "../uploads/team-mate.pg"; //Change this to the actual directory the image for the profile is uploaded to 
const axios = require('axios'); //change this bc using Jquery 

class UserProfile extends React.Component {
    constuctor(props){
        super(props);
        this.state={
            user_id:this.Signup.id,
            username:this.Signup.username,
            profileImage:this.props.profileImage, //find the location of this 
            msg:this.props.msg,
            uploadedFile:null
        }
    }
    fetchUserDetails=(user_id)=>{

        axios.get("http://localhost:5000/userapi/getUserDetails/"+user_id,{
            headers: {
                "content-type": "application/json"
            }  
}).then(res=>{
    console.log(res);
    this.setState({email:res.data.results[0].email});
    this.setState({profileImage:res.data.results[0].profileImage})
})
.catch(err=>console.log(err))
}
changeProfileImage=(event)=>{
    this.setState({uploadedFile:event.target.files[0]});

}

UpdateProfileHandler=(e)=>{
    e.preventDefault();
    //create object of form data
    const formData = new FormData();
    formData.append("profileImage", this.state.uploadedFile);
    formData.append("user_id", this.state.user_id);

    //update profile
    axios.post("http://localhost:5000/userapi/update-profile/",formData,{
        header: {
            "content-type": "application/json"

        }
    
    }).then(res=>{
        console.log(res);
        this.setState({msg:res.data.message});
        this.setState({profileImage:res.data.results.profileImage});

    })
    .catch(err=>console.log(err))

}

componentDidMount(){
    this.fetchUserDetails(this.state.user_id);
}

render(){

    if(this.state.profileImmage){
        var imagestr = this.state.profileImage;
        imagestr = imagestr.replace("public/", "");
        var profilePic = "http://localhost:5000/"+imagestr;

    }
    else{
        profilePic = DefaultUserPic;

    }
    return( 
        <Container>
        <Row>
       <Col>
       <img src={profilePic} alt="profils pic" />
       </Col>
        <Col>
            <h1>User Profile</h1>
            <Form className="form">     
    <p>{this.state.msg}</p>
  <Form.Group controlId="formCategory1">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" defaultValue={this.state.username}/>
  
  </Form.Group>
  <Form.Group controlId="formCategory2">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" defaultValue={this.state.email} />
  
  </Form.Group>
 
  <Form.Group controlId="formCategory4">
    <Form.Label>Profile Image</Form.Label>
    <Form.Control type="file" name="profileImage" onChange={this.changeProfileImage}/>
    </Form.Group>
  <Button variant="primary" onClick={this.UpdateProfileHandler}>Update Profile</Button>
  </Form>
   </Col>

       </Row>
        </Container>
    )

}
}

const mapStatetoProps=(state)=>{
    return{
        user_id:state.user.userDetails.userid,
        username:state.user.userDetails.username,
        email:state.user.email,
        profileImage: state.user.profileImage,
        msg:state.user.msg
    }
}


export default connect(mapStatetoProps)(UserProfile);
