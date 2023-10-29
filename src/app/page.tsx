import ContainerComponent from "@/app/components/ContainerComponent";
import EmptyStateComponent from "@/app/components/EmptyStateComponent";
import getListings from "@/app/actions/getListsings";
import ListingCardComponent from "@/app/components/listings/ListingCardComponent";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Listing } from "@prisma/client";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyStateComponent showReset />;
  }

  return (
    <ContainerComponent>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xlll:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: Listing) => (
          <ListingCardComponent
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </ContainerComponent>
  );
}
