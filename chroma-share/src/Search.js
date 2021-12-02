import React, { Component } from 'react';
import Navbarlogged from './Navbarlogged';
import Footer from './Footer';
import $ from 'jquery';
import { useLocation } from "react-router-dom";

class Search extends Component {

  state = {
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




  componentDidMount() {
    
    const data = {
      token: "",
      keyword: this.props.keyword,
    }
    
    // $.ajax({
    //   url: "api/search",
    //   type: "POST",
    //   data: data,
    //   contentType: "application/json; charset=utf-8",
    //   dataType: "json",
    //   success: function (res) {

    //     console.log(res);

    //     let json = JSON.parse(res);    
    // }
    //     })
  };

  

  render() {
    return (
      <section className="text-gray-600 body-font max-w-7xl mx-auto">
        <Navbarlogged />
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Your result for: {this.props.keyword}</h1>
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

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function WithNavigate(props) {
  let query = useQuery();
  let keyword = query.get("keyword")
  return <Search {...props} keyword={keyword} />
}

export default WithNavigate