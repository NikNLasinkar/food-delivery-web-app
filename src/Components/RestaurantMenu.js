import { useEffect, useState} from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurentMenu = () => {
    const { resId } = useParams();

    const resInfo = useRestaurantMenu(resId);

    const [showIndex, setShowIndex] = useState();

   // console.log(resInfo);
   if(resInfo === null) return <Shimmer />;

    const { name, cuisines,  costForTwoMessage } = 
    resInfo?.cards[2]?.card?.card?.info;

      const {itemCards}  = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
      const categories = 
      resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) =>
            c.card?.["card"]?.["@type"] ===
             "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );

        
    return (
        <div className="text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">
                {cuisines.join(", ")} - {costForTwoMessage}
            </p> 
            {/* {categories accordions} */}
            {categories.map((category, index) => (
                // controlled components
                <RestaurantCategory 
                key={category?.card?.card?.title} 
                data={category?.card?.card} 
                showItems={index === showIndex && true } 
                setShowIndex={()=>setShowIndex(index)}
                />
            ))}
        </div>
    );
};

export default RestaurentMenu;