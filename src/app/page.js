import Grid from "./componates/Grid";
import Navbar from "./componates/NavBar";

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
  return (
    <>
      <Navbar />
      <Grid properties={properties} />
    </>
  );
};

export default Home;
