import { useContract, useValidDirectListings } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS, PACK_ADDRESS } from "../const/addresses";
import styles from "../styles/Home.module.css";
import { PackNFTCard } from "../components/PackNFT";

export default function Shop() {
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: directListings, isLoading: loadingDirectListings } =
    useValidDirectListings(marketplace, {
      tokenContract: PACK_ADDRESS,
    });
  console.log("DirectPack", directListings);

  return (
    <div className={styles.container}>
      <h1>Shop Packs</h1>
      <div className={styles.grid}>
        {!loadingDirectListings ? (
          directListings?.map((listing, index) => (
            <div key={index}>
              <PackNFTCard tokenId={listing.asset.id} listingId={listing.id} />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
