import { Link } from 'react-router-dom';
import italy from './images/italy.jpeg';

function Hero() {
    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                    <img className="object-cover object-center rounded" src={italy} alt="Hero"/>
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Dump your photo album 
                    <br class="hidden lg:inline-block"/> Get Chroma Share</h1>
                    <p className="mb-8 leading-relaxed">Most photo album apps that exist today allow for only the most basic forms of organization. 
                    ChromaShare allows you to organize and share your photos through tags, color composition, and metadata such as location, title, and time. 
                    You can share your favorite pictures with your friends, or keep them private. </p>
                    <div className="flex justify-center">
                        <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"><Link to="/signup">Get started</Link></button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;