import RestaurantCard, {withisOpenLabel} from "./RestaurantCard";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from '../utils/useOnlineStatus';
import { list } from "postcss";
import UserContext from "../utils/UserContext";

const Body = () =>{
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState('');

    console.log(listOfRestaurants);

    const RestaurantCardisOpen = withisOpenLabel(RestaurantCard);
    useEffect(()=> {
        fetchData();
    }, []);
    
   

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();

        console.log(json);
        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false)
      return (
        <h1 style={{ textAlign: 'center', marginTop: '100px' }}>
          Looks like you're offline! Please check your internet connection
        </h1>
      );

    const {loggedInUser, setUserName } = useContext(UserContext);
      

    // if (listOfRestaurants.length === 0){
    //     return <Shimmer />;
    // } 
    
    return listOfRestaurants.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="body">
          {/* <div className="search-container">
            <input type="text" placeholder="Search Food or Restaurant" />
            <button>Search</button>
          </div> */}
          <div className="flex justify-between">
            <div className="p-4 m-4 search">
              <input
                type="text"
                placeholder="Search a restaurant you want..."
                className="px-4 py-2 border border-transparent shadow-md font-medium bg-gray-100 rounded-md focus:border-0 focus:outline-0 w-[300px] placeholder:font-medium focus:border-b-2 focus:border-green-500"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <button
                className="px-4 py-2 m-4 bg-green-100 rounded-lg shadow-md hover:bg-green-300 duration-[.3s] font-medium"
                onClick={() => {
                  // * Filter the restaurant cards and update the UI
                  // * searchText
                  console.log(searchText);
    
                  const filteredRestaurant = listOfRestaurants.filter((res) =>
                    res.info.name.toLowerCase().includes(searchText.toLowerCase())
                  );
    
                  setFilteredRestaurant(filteredRestaurant);
                }}
              >
                Search
              </button>
            </div>
            <div className="flex items-center p-4 m-4 search">
              <button
                className="px-4 py-2 m-4 bg-gray-100 shadow-md hover:bg-gray-200 duration-[.3s] rounded-lg font-medium"
                onClick={() => {
                  // * Filter logic
                  const filteredList = listOfRestaurants.filter(
                    (res) => parseFloat(res.info.avgRating) > 4
                  );
    
                  setFilteredRestaurant(filteredList);
                  console.log("Hii");
                  console.log(filteredList);
                }}
              >
                Top Rated Restaurants
              </button>
            </div>
            <div className="flex items-center p-4 m-4 search">
              <label htmlFor="name" className="font-medium">
                User Name:{' '}
              </label>
              <input
                id="name"
                className="px-4 py-2 border border-transparent shadow-md bg-gray-100 rounded-md focus:border-0 focus:outline-0 w-[200px] ml-[20px] focus:border-b-2 focus:border-green-500"
                value={loggedInUser}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            {/* // * looping through the <RestaurentCard /> components Using Array.map() method */}
    
            {filteredRestaurant.map((restaurant) => (
              <Link
                style={{
                  textDecoration: 'none',
                  color: '#000',
                }}
                key={restaurant.info.id}
                to={'/restaurants/' + restaurant.info.id}
              >
                {restaurant.info.isOpen ? (
                  <RestaurantCard resData={restaurant} />
                ) : (
                  <RestaurantCardisOpen resData={restaurant} />
                )}
              </Link>
            ))}
          </div>
        </div>
      );
    };
    
export default Body;