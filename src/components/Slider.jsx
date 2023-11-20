import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";
import { useListings } from "../pages/useListings";

function Slider() {
  const navigate = useNavigate();
  const { listings, isLoading } = useListings();

  return (
    <>
      <p className="exploreHeading">Recomended</p>

      {!isLoading && (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          style={{ height: "300px" }}
        >
          {listings.map((listing) => (
            <SwiperSlide
              key={listing.id}
              onClick={() =>
                navigate(`/category/${listing.type}/${listing.id}`)
              }
            >
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  // backgroundSize: "cover",
                }}
                className="swiperSlideDiv"
              >
                <p className="swiperSlideText">{listing.name}</p>
                <p className="swiperSlidePrice">
                  ${listing.discountedPrice ?? listing.regularPrice}
                  {listing.type === "rent" && " / Month"}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

export default Slider;
