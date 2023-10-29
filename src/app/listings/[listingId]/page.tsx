import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import EmptyStateComponent from "@/app/components/EmptyStateComponent";
import ListingClient from "./ListingClient";

interface ListingParams {
  listingId?: string;
}

export default async function ListingPage({
  params,
}: {
  params: ListingParams;
}) {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyStateComponent />;
  }

  return (
    <ListingClient
      listing={listing}
      reservations={reservations}
      currentUser={currentUser}
    />
  );
}
