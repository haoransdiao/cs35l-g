import { Component } from "react";
import Navbar from "./Navbar";
import $ from 'jquery';

class Signup extends Component {

    state= {
        username:"",
        email:"",
        password:"",
    }

    onUsernameChange = event => {
        this.setState({username: event.target.value})
    }

    onEmailChange = event => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = event => {
        this.setState({password: event.target.value})
    }

    // On file upload (click the upload button)
    onClickNext = () => {

        //validation

        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        console.log(data);

        $.ajax({
            url: "api/signup",
            type: "POST",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                console.log("success");
            }
        })
    };

    render() {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="Navbar">
                    <Navbar />
                </div>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto flex flex-wrap justify-center">
                        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:justify-center w-full mt-10 md:mt-0">
                            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
                            <div className="relative mb-4">
                                <label className="leading-7 text-sm text-gray-600">Username</label>
                                <input onChange={this.onUsernameChange} type="text" id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="relative mb-4">
                                <label className="leading-7 text-sm text-gray-600">Email</label>
                                <input onChange={this.onEmailChange} type="text" id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="relative mb-4">
                                <label className="leading-7 text-sm text-gray-600">Password</label>
                                <input onChange={this.onPasswordChange} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <button onClick={this.onClickNext} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Next</button>
                            <p className="text-xs text-gray-500 mt-3">We promise we won't spam you with marketing emails</p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Signup;