import ResturantCards, { withPromotedLabel } from "./ResturantCards";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { withPromotedLabel, withFlatTag } from "./ResturantCards";
import UserContext from "../utils/UserContext";
// Create a function of search on click or Enter
import Shimmer from "./Shimmer";

// Body Component
const Body = () => {
  const { loggedinUser, setUserName } = useContext(UserContext);
  const [isloading, setIsLoading] = useState(true)

  // State Variable -> Super Powerful Variable
  const [list_of_resturant, setList_of_resturant] = useState([]);
  const [searchText, setsearchText] = useState("");
  const FilterRestaurants = () => {
    FilteredRes = list_of_resturant.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setList_of_resturant(FilteredRes);
  };

  // Creating a Card with Promoted Label
  const RestaurantCardPromoted = withPromotedLabel(ResturantCards);
  const RestaurantFlatDiscount = withFlatTag(ResturantCards);

  // UseEffect Hooks
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.2124007&lng=78.1772053&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    const cardData =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setList_of_resturant(cardData);
    setIsLoading(false);
  };

  // Checking Online Status
  if (!useOnlineStatus())
    return (
      <div className="center">
        <h1>You are Offline Bro !!! 😐😐😐</h1>
      </div>
    );   
    
    return  isloading ?  <Shimmer/>:(
      <div className="body">
        <div className="p-5 md:p-10 flex flex-col md:gap-0 sm:gap-3">
         <div className="search-box flex flex-col md:flex-row md:gap-0 gap-5">
         <div className="search-container flex flex-col md:flex-row m-auto w-full justify-center">
            <input
              type="text"
              name="search"
              id=""
              placeholder="Search Here"
              className="px-5 py-2 md:py-1 md:w-96 border outline-[2px] focus:bg-transparent focus:outline-none focus:border-lime-500"
              value={searchText}
              onChange={(e) => {
                setsearchText(e.target.value);
                e.target.value === ""
                  ? fetchData()
                  : setList_of_resturant(list_of_resturant);
              }}
            />
            <button
              onClick={() => FilterRestaurants()}
              className="search-item-btn bg-green-500 px-6 py-2 md:px-7 md:py-1 text-white rounded font-medium md:w-66 relative md:right-6 sm:right-0"
            >
              Search
            </button>
          </div>
         </div>
        <div className="top-rated-restaurants w-full md:m-0 sm:m-auto flex sm:justify-center md:justify-start">
        <button
            className="top-rated bg-red-500 px-6 py-2 md:px-4 md:py-1 text-white rounded font-medium self-start md:self-center w-4/5 md:w-56 m-auto md:m-0"
            onClick={() => {
              FilteredList = list_of_resturant.filter(
                (res) => res.info.avgRating > 4
              );
              setList_of_resturant(FilteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>

          <div className="change-user hidden">
            <label htmlFor="username">Username : </label>
            <input
              type="text"
              name="username"
              id="username"
              className="border border-gray-500 px-2"
              value={loggedinUser}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>

        <div className="resturant-container flex flex-wrap gap-10 justify-center p-10 pt-0">
          {
            // Mapping All the Data
              list_of_resturant.map((resturant) => (
              <Link
                key={resturant.info.id}
                to={"/restaurants/" + resturant.info.id}
              >
                {/* Card with Promoted Stamp */}
                {/* { resturant.info.promoted ? <RestaurantCardPromoted ResData={resturant} /> :  <ResturantCards ResData={resturant} />} */}

                {/* Card with Discount Stamp */}
                {resturant.info.aggregatedDiscountInfoV3 ? (
                  <RestaurantFlatDiscount ResData={resturant} />
                ) : (
                  <ResturantCards ResData={resturant} />
                )}
              </Link>
            ))
          }
        </div>
      </div>
    );
};

export default Body;
