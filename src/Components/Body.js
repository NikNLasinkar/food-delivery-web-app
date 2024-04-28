import RestaurentCard from "./RestaurentCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";


const Body = () =>{
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurent, setFilteredRestaurent] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(()=> {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();

        //console.log(json);
        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurent(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    // if (listOfRestaurants.length === 0){
    //     return <Shimmer />;
    // } 
    
    return listOfRestaurants?.length === 0 ? <Shimmer /> : (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text" className="search-box" value={searchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }}/>
                    <button onClick={() => {
                        console.log(searchText);

                        const filteredRestaurent = listOfRestaurants.filter(
                            (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );

                        setFilteredRestaurent(filteredRestaurent);
                    }
                    }>Search</button>
                </div>
                <button 
                className="filter-btn"
                onClick={()=>{
                    const filteredList = listOfRestaurants.filter(
                        (res) => parseFloat(res.info.avgRating) > 4
                    );
                    setFilteredRestaurent(filteredList); 
                    console.log(filteredList);
                }}
                >
                  Top Rated Restaurents
                </button>
            </div>
            <div className="res-container">
                {filteredRestaurent.map((restaurent) => (
                    <Link key={restaurent.info.id} to={"/restaurants/"+ restaurent.info.id}><RestaurentCard resData={restaurent} /></Link>
                ))}  
            </div>
        </div>
    );
};
    
export default Body;