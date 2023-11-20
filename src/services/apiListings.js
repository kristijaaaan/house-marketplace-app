import supabase from "./supabase";

export async function getListing(listingId) {
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", listingId)
    .single();

  if (error) throw new Error("Listing could not be loaded");

  return data;
}

export async function getListings() {
  const { data, error } = await supabase.from("listings").select("*");

  if (error) throw new Error("Listings could not be loaded");

  return data;
}

export async function createListing(newListing) {
  const imageName = `${Math.round(Math.random() * 9999999)}-${
    newListing.imageUrls[0].name
  }`.replaceAll("/", "");

  const imagePath = `https://sphutbwepbqtsnqoqgiz.supabase.co/storage/v1/object/public/images/${imageName}`;

  // 1. CREATE LISTING
  const { data, error } = await supabase
    .from("listings")
    .insert([{ ...newListing, imageUrls: [imagePath] }])
    .select();

  if (error) throw new Error("Listing could not be created");

  // 2. UPLOAD IMAGES
  const { error: storageError } = await supabase.storage
    .from("images")
    .upload(imageName, newListing.imageUrls[0]);

  if (storageError) throw new Error("Image could not be uploaded");

  return data;
}

export async function deleteListing(listingId) {
  const { error } = await supabase
    .from("listings")
    .delete()
    .eq("id", listingId);

  if (error) throw new Error("Listing could not be deleted");
}

// a
