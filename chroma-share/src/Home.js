import Navbarlogged from "./Navbarlogged";
import React, { Component } from 'react';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

class Home extends Component {
    state = {
        search: "",
        listphotos: [
            {
                id: 0,
                image: "https://dummyimage.com/1920x1080",
                title: "title of picture",
                description: "description of picture",
                tags: "sport nature etc"
            },
            {
                id: 1,
                image: "https://dummyimage.com/600x360",
                title: "title of picture 1",
                description: "description of picture 1",
                tags: "sport etc"
            },
            {
                id: 2,
                image: "https://dummyimage.com/600x360",
                title: "title of picture 1",
                description: "description of picture 1",
                tags: "nature etc"
            },
            {
                id: 3,
                image: "https://dummyimage.com/600x360",
                title: "title of picture 1",
                description: "description of picture 1",
                tags: "sport nature etc"
            },
            {
                id: 4,
                image: "https://dummyimage.com/600x360",
                title: "title of picture 1",
                description: "description of picture 1",
                tags: "sport nature etc"
            },
        ],

    };

    onSubmitSearch = (event) => {
        if (this.state.search === "" || this.state.search === null)
            return;

        this.props.navigate("/search?keyword=" + this.state.search);
    };

    onChangeSearch = (event) => {
        this.setState({ search: event.target.value });
    };

    render() {
        return (
            <section className="text-gray-600 body-font max-w-7xl mx-auto">
                <Navbarlogged />
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Explore ChromaShare photos</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">See what others are sharing on ChromaShare. Use the search bar below to search photos by tags, colors and more.</p>
                        <section className="text-gray-600 body-font">
                            <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
                                <div className="lg:flex-grow flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                                    <div className="flex w-full md:justify-center justify-center items-end">
                                        <div className="relative mr-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
                                            <input onChange={this.onChangeSearch} type="text" id="hero-field" name="hero-field" className="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                        <button onClick={this.onSubmitSearch} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Go</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        <React.Fragment>
                            {this.state.listphotos.map(listphotos => (
                                <div className="lg:w-1/3 sm:w-1/2 p-4" key={listphotos.id}>
                                    <div className="flex relative">
                                        <img alt="image" className="absolute inset-0 w-full h-full object-cover object-center" src={listphotos.image} />
                                        <div className="px-8 py-24 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{listphotos.title}</h1>
                                            <p className="leading-relaxed">{listphotos.description}</p>
                                            <p className="leading-relaxed">{listphotos.tags}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    </div>
                </div>
                <Footer />
            </section>
        );
    }

}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <Home {...props} navigate={navigate} />
}

export default WithNavigate
