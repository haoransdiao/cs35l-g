import Navbarlogged from "./Navbarlogged";
import Footer from "./Footer";
import { Component } from "react";
import $ from 'jquery';
import Cookies from 'js-cookie';

class Upload extends Component {

    state = {
        image: null,
        imageName: "",
        imageType: "",
        title: "",
        description: "",
        isPublic: false,
    };

    onFileChange = event => {
        this.encodeImageFileAsURL(event);
    };

    onTitleChange = event => {
        this.setState({ title: event.target.value })
    };

    onDescriptionChange = event => {
        this.setState({ description: event.target.value })
    }

    onPublicChange = event => {
        this.setState({isPublic: !this.state.isPublic})
    }

    // On file upload (click the upload button)
    onFileUpload = () => {

        //validation

        const data = {
            title: this.state.title,
            notes: this.state.description,
            type: this.state.imageType,
            data: this.state.image,
            is_public: this.state.isPublic,
            token: Cookies.get('token')
        }

        console.log(data);

        $.ajax({
            url: "api/uploadimage",
            type: "POST",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                console.log("success");
            }
        })
    };

    encodeImageFileAsURL = (event) => {
        var file = event.target.files[0]
        var reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                imageType: file.type,
                image: reader.result,
                imageName: file.name,
            });
        }
        reader.readAsDataURL(file);
    };

    fileData = () => {

        if (this.state.image) {

            return (
                <div className="justify-center flex flex-col sm:flex-row sm:items-center mx-auto pb-8">
                    <p>Selected file: {this.state.imageName}</p>
                </div>
            );
        } else {
            return (
                <div className="justify-center flex flex-col sm:flex-row sm:items-center mx-auto pb-8">
                    <p>Choose before Pressing the Upload button</p>
                </div>
            );
        }
    };

    render() {
        return (
            <div className="max-w-7xl mx-auto">
                <Navbarlogged />
                <section className="text-gray-700 body-font">
                    <div className="container px-5 pt-24 pb-12">
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-center text-2xl font-medium title-font text-gray-900 py-12">Insert below title, description and tags for your picture.</p>

                    </div>
                </section>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-0 mx-auto">
                        <div className="lg:w-1/2 md:w-2/3 mx-auto">
                            <div className=" -m-2">
                                <div>
                                    <div className="justify-center flex flex-col sm:flex-row sm:items-center mx-auto pb-8">
                                        <h1 className="sm:pr-8 text-2xl font-medium title-font text-gray-900">Select the image to upload</h1>
                                        <label className="w-32 flex flex-col items-center px-4 py-4 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-gray-900">
                                            <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                            </svg>
                                            <span className="mt-2 text-sm leading-normal">Select a file</span>
                                            <input type='file' onChange={this.onFileChange} className="hidden" />
                                        </label>
                                    </div>
                                    {this.fileData()}
                                </div>
                                <div className="p-2 w-full">
                                    <div className="relative">
                                        <label className="leading-7 text-sm text-gray-600">Title</label>
                                        <input onChange={this.onTitleChange} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div className="relative">
                                        <label className="leading-7 text-sm text-gray-600">Description</label>
                                        <textarea onChange={this.onDescriptionChange} id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-24 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div>
                                        <label className="inline-flex items-center">
                                            <input onChange={this.onPublicChange} type="checkbox" className="form-checkbox" />
                                            <span className="ml-2">Public Photo</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="py-12 w-full">
                                    <button onClick={this.onFileUpload} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Upload</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}

export default Upload;