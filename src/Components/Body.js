import RestaurentCard, {withisOpenLabel} from "./RestaurentCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from '../utils/useOnlineStatus';
import { list } from "postcss";

const Body = () =>{
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurent, setFilteredRestaurent] = useState([]);
    const [searchText, setSearchText] = useState('');

    console.log(listOfRestaurants);

    const RestaurentCardisOpen = withisOpenLabel(RestaurentCard);
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
        setFilteredRestaurent(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false)
      return (
        <h1 style={{ textAlign: 'center', marginTop: '100px' }}>
          Looks like you're offline! Please check your internet connection
        </h1>
      );
      

    // if (listOfRestaurants.length === 0){
    //     return <Shimmer />;
    // } 
    
    return listOfRestaurants?.length === 0 ? <Shimmer /> : (
        <div className="body">
            <div className="filter flex">
                <div className="search m-4 p-4">
                    <input type="text" className="border border-solid border-black" value={searchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }}/>
                    <button className="px-4 py-2 bg-green-100 m-4 rounded-xl" onClick={() => {
                        console.log(searchText);

                        const filteredRestaurent = listOfRestaurants.filter(
                            (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );

                        setFilteredRestaurent(filteredRestaurent);
                    }
                    }>Search</button>
                </div>
                <div className="search m-4 p-4 flex items-center">
                    <button 
                    className="px-4 py-2 bg-gray-100 rounded-xl"
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
                
            </div>
            <div className="flex flex-wrap">
                {filteredRestaurent.map((restaurent) => (
                    <Link key={restaurent.info.id} to={"/restaurants/"+ restaurent.info.id}>
                        {restaurent.info.isOpen ? (
                             <RestaurentCard resData={restaurent} />
                        ) : (
                            <RestaurentCardisOpen resData={restaurent} />
                        )}
                    </Link>
                ))}  
            </div>
        </div>
    );
};
    
export default Body;