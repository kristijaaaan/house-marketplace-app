import { useParams } from "react-router-dom";
import { useListings } from "./useListings";
import ListingItem from "../components/ListingItem";

function Category() {
  const params = useParams();
  const { listings, isLoading } = useListings();
  const finalListings = listings?.filter(
    (listing) => listing.type === params.categoryName
  );

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Places for {params.categoryName}</p>
      </header>

      <main>
        <ul className="categoryListings">
          {finalListings?.map((listing) => (
            <ListingItem key={listing.id} listing={listing} id={listing.id} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Category;
