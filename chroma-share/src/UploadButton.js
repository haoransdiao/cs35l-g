import { Component } from "react";
import axios from 'axios';

class UploadButton extends Component {

    state = {
        selectedFile: null
    };

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    // On file upload (click the upload button)
    onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file
        console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        axios.post("api/uploadfile", formData);
    };

    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div className="justify-center flex flex-col sm:flex-row sm:items-center mx-auto pb-8">
                    <p>Selected file: {this.state.selectedFile.name}</p>
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
            <div>
                <div className="justify-center flex flex-col sm:flex-row sm:items-center mx-auto pb-8">
                    <h1 className="sm:pr-8 text-2xl font-medium title-font text-gray-900">Select the image to upload</h1>
                    {/* <button onClick={this.onFileUpload} className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0">Choose File</button> */}
                    {/* <input type="file" onChange={this.onFileChange} className="font-medium text-gray-600" /> */}
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
        );
    }
}

export default UploadButton;