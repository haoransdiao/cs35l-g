import Navbar from "./Navbar";

function About() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="Navbar">
                <Navbar />
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-col text-center w-full mb-20">
                            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">OUR TEAM</h1>
                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">A group of Software Developers from UCLA</p>
                        </div>
                        <div className="flex flex-wrap -m-4">
                            <div className="p-4 lg:w-1/4 md:w-1/2">
                                <div className="h-full flex flex-col items-center text-center">
                                    <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src="https://dummyimage.com/200x200" />
                                    <div className="w-full">
                                        <h2 className="title-font font-medium text-lg text-gray-900">Simone Zamparini</h2>
                                        <h3 className="text-gray-500 mb-3">Front-End Developer</h3>                                        
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 lg:w-1/4 md:w-1/2">
                                <div className="h-full flex flex-col items-center text-center">
                                    <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src="https://dummyimage.com/201x201" />
                                    <div className="w-full">
                                        <h2 className="title-font font-medium text-lg text-gray-900">Holden Caulfield</h2>
                                        <h3 className="text-gray-500 mb-3">UI Developer</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 lg:w-1/4 md:w-1/2">
                                <div className="h-full flex flex-col items-center text-center">
                                    <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src="https://dummyimage.com/202x202" />
                                    <div className="w-full">
                                        <h2 className="title-font font-medium text-lg text-gray-900">Atticus Finch</h2>
                                        <h3 className="text-gray-500 mb-3">UI Developer</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 lg:w-1/4 md:w-1/2">
                                <div className="h-full flex flex-col items-center text-center">
                                    <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src="https://dummyimage.com/203x203" />
                                    <div className="w-full">
                                        <h2 className="title-font font-medium text-lg text-gray-900">Henry Letham</h2>
                                        <h3 className="text-gray-500 mb-3">UI Developer</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
export default About;

