import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link, useParams } from "react-router-dom";
import shareIcon from "../assets/svg/shareIcon.svg";
import { useListing } from "./useListing";
import { useUser } from "./useUser";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

function Listing() {
  const { listingId } = useParams();
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const { listing, isLoading } = useListing(listingId);
  const { user } = useUser();
  const position = [listing?.geolocation?.lat, listing?.geolocation?.lng];
  const images = listing?.imageUrls;

  return (
    <main>
      {!isLoading && (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          style={{ height: "300px" }}
        >
          {images.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  background: `url(${url}) center no-repeat`,
                  // backgroundSize: "cover",
                }}
                className="swiperSlideDiv"
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => setShareLinkCopied(false), 2000);
        }}
      >
        <img src={shareIcon} alt="share icon" />
      </div>

      {shareLinkCopied && <p className="linkCopied">Link copied</p>}

      <div className="listingDetails">
        <p className="listingName">
          {listing?.name} - $
          {listing?.offer ? listing?.discountedPrice : listing?.regularPrice}
        </p>
        <p className="listingLocation">{listing?.location}</p>
        <p className="listingType">For {listing?.type}</p>
        {listing?.offer && (
          <p className="discountPrice">
            ${listing?.regularPrice - listing?.discountedPrice} discount
          </p>
        )}

        <ul className="listingDetailsList">
          <li>
            {listing?.bedrooms > 1
              ? `${listing?.bedrooms} bedrooms`
              : "1 bedroom"}
          </li>
          <li>
            {listing?.bathrooms > 1
              ? `${listing?.bathrooms} bathrooms`
              : "1 bathroom"}
          </li>
          <li>{listing?.parking && "parking spot"}</li>
          <li>{listing?.furnished && "furnished"}</li>
        </ul>

        <p className="listingLocationTitle">Location</p>

        <div className="leafletContainer">
          {!isLoading && (
            <MapContainer
              style={{ height: "100%", width: "100%" }}
              center={position}
              zoom={6}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>{listing?.location}</Popup>
              </Marker>
            </MapContainer>
          )}
        </div>

        {user?.id !== listing?.userRef && (
          <Link
            to={`/contact/${listing?.userRef}?listingName=${listing?.name}`}
            className="primaryButton"
          >
            Contact landlord
          </Link>
        )}
      </div>
    </main>
  );
}

export default Listing;
