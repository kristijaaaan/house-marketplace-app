import { useState } from "react";
import { useUser } from "./useUser";
import { useLogout } from "./useLogout";
import { useUpdateUser } from "./useUpdateUser";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import { Link } from "react-router-dom";
import { useListings } from "./useListings";
import ListingItem from "../components/ListingItem";

function Profile() {
  const [changeDetails, setChangeDetails] = useState(false);
  const { updateUser } = useUpdateUser();
  const {
    user: {
      id,
      email,
      user_metadata: { name: currentName },
    },
  } = useUser();
  const [name, setName] = useState(currentName);
  const { logout } = useLogout();
  const { listings, isLoading } = useListings();
  const myListings = listings?.filter((listing) => listing.userRef === id);

  function onSubmit() {
    if (!name) return;
    updateUser({ name });
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button className="logOut" onClick={logout}>
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prev) => !prev);
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>

        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              id="email"
              className="profileEmail"
              disabled={true}
              defaultValue={email}
            />
          </form>
        </div>

        <Link to="/create-listing" className="createListing">
          <img src={homeIcon} alt="home" />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>

        {!isLoading && myListings.length > 0 && (
          <>
            <p className="listingText">Your Listings</p>
            <ul className="listingsList">
              {myListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing}
                  id={listing.id}
                  onDelete={true}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default Profile;
