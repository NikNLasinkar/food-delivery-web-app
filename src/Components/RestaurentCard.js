import { CDN_LINK } from "../utils/constants";

const RestaurentCard = (props) => {
    const {resData} = props;

    const {cloudinaryImageId, name, avgRating, cuisines, costForTwo} = resData?.info;
    const {deliveryTime} = resData?.info?.sla;

    //console.log(props);
    return (
        <div className="m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-300" >
            <img className="rounded-lg" alt="res-logo" src={CDN_LINK+cloudinaryImageId}/>
            <h3 className="font-bold py-4 text-xl">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating}</h4>
            <h4>{costForTwo}</h4>
            <h4>{deliveryTime} minutes</h4>
        </div>
    );
};

export const withisOpenLabel = (RestaurentCard) => {
    return (props) => {
        return (
            <div>
                <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Closed</label>
                <RestaurentCard {...props}/>
            </div>
        );
    };
};

export default RestaurentCard;