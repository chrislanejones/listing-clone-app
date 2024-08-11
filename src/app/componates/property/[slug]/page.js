import Link from "next/link";
import ImageCard from "../../ImageCard";
import { list } from "postcss";

// "https://api.hygraph.com/v1/properties"
const getProperty = async (slug) => {
  const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT;
  if (!HYGRAPH_ENDPOINT) {
    throw new error("HYGRAPH_ENDPOINT is not set");
  }
  const response = await fetch(HYGRAPH_ENDPOINT, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: ` query Property($slug: String) {
          propery( where: {slug: $slug}) {
          id,
            name,
            description,
            rentalPrice,
            parking,
            pool,
            petFriendly,
            inUnitDryer,
            elevator,
            beds,
          images {
            id,
            url,
            fileName,
          }
            managingBroker {
            name,
            phoneNumber
            }
        }
      }`,
      variables: {
        slug: slug,
      },
    }),
  });
  const json = await response.json();
  return json.data.property;
};

const Home = async ({ params }) => {
  const property = await getProperty(params.slug);
  return (
    <div className="property">
      {property.images.map((images) => (
        <ImageCard
          key={image.id}
          url={image.url}
          fileName={image.fileName}
          width={2000}
          height={550}
        />
      ))}
      <div className="property-info-container">
        <h1>{property.name}</h1>
        <h2>
          <span>{property.price} Beds</span>
          <span>${property.rentalPrice}</span>
        </h2>
        <br />
        <h2>Overview</h2>
        <p>{property.description}</p>
        <br />
        <h2>Amenites:</h2>
        <ul>
          {property.parking && <l1>Private Parking</l1>}
          {property.pool && <li>Pool</li>}
          {property.petFriendly && <li>Pet Friendly</li>}
          {property.inUnitDryer && <li>In-Unit Dryer</li>}
          {property.elevator && <li>Elevator</li>}
        </ul>
        <h3>Licenced Brokerage</h3>
        <p>managing Broker: {property.managingBroker.name}</p>
        <p>Phone Number: {property.managingBroker.phoneNumber}</p>
        <br/>
        <Link href={/}><button>Go back</button></Link>
      </div>
    </div>
  );
};

export default Property;
