import Navbar from "./Navbar";
import React from 'react';
import Search from "./Search";

function Home() {
  React.state = {
    listphotos: [
      {
        id: 0,
        image: "https://dummyimage.com/1920x1080",
        title: "title of picture",
        description: "description of picture"
      },
      {
        id: 1,
        image: "https://dummyimage.com/600x360",
        title: "title of picture 1",
        description: "description of picture 1"
      },
      {
        id: 2,
        image: "https://dummyimage.com/600x360",
        title: "title of picture 1",
        description: "description of picture 1"
      },
      {
        id: 3,
        image: "https://dummyimage.com/600x360",
        title: "title of picture 1",
        description: "description of picture 1"
      },
      {
        id: 4,
        image: "https://dummyimage.com/600x360",
        title: "title of picture 1",
        description: "description of picture 1"
      },
    ]
  };

  return (
    <section className="text-gray-600 body-font max-w-7xl mx-auto">
      <Navbar />
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Explore ChromaShare photos</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">See what others are sharing on ChromaShare. Add pictures to your favorites to save them for later. Use the search bar below to search photos by tags, colors and more.</p>
          <Search/>
        </div>
        <div className="flex flex-wrap -m-4">
          <React.Fragment>
            {React.state.listphotos.map(listphotos => (
              <div className="lg:w-1/3 sm:w-1/2 p-4">
                <div className="flex relative">
                  <img alt="image" className="absolute inset-0 w-full h-full object-cover object-center" src={listphotos.image} />
                  <div className="px-8 py-24 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{listphotos.title}</h1>
                    <p className="leading-relaxed">{listphotos.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        </div>
      </div>
    </section>
  );
}

export default Home;