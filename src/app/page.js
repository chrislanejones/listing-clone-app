import Card from "./componates/Card";
import ImageCard from "./componates/ImageCard";
import Map from "./componates/Map";
import Navbar from "./componates/NavBar";
import SearchBar from "./componates/SearchBar";

// "https://api.hygraph.com/v1/properties"
const getProperties = async () => {
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
      query: ` 
      query Properties {
          properties {
            beds
            description
            images {
              fileName
              url
            }
            location {
              latitude
              longitude
            }
            managingBroker {
              name
              phoneNumber
            }
            name
            rentalPrice
            slug
            id
          }
        }
      `,
    }),
  });
  const json = await response.json();
  return json.data.properties;
};

const Home = async () => {
  const properties = await getProperties();
  console.log(properties);
  return (
    <>
      <Navbar />
      <SearchBar />
      <main>
        <article>
          <Map />
        </article>
        <article className="Listings">
          <h2>Rental Listings</h2>
          <div className="card-container">
            {properties.map((property) => (
              <Card
                key={property.id}
                propertyName={property.name}
                slug={property.slug}
                rentalPrice={property.rentalPrice}
                beds={property.beds}
                image={property.images[0]}
              />
            ))}
          </div>
        </article>
      </main>
    </>
  );
};

export default Home;
