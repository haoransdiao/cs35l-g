import Navbarlogged from "./Navbarlogged";
import Footer from "./Footer";
import UploadButton from "./UploadButton";

function Upload() {
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
                        <UploadButton/>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label className="leading-7 text-sm text-gray-600">Title</label>
                                    <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label className="leading-7 text-sm text-gray-600">Description</label>
                                    <textarea id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-24 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div className="py-12 w-full">
                                <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Upload;