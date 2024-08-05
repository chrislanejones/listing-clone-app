import Card from "./componates/Card";
import Map from "./componates/Map";
import Navbar from "./componates/NavBar";
import SearchBar from "./componates/SearchBar";

// "https://api.hygraph.com/v1/properties"
const getProperties = async () => {
  const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT;
};

const Home = () => {
  return (
    <>
      <Navbar />
      <SearchBar />
      <main>
        <article>
          <Map />
        </article>
        <article className="listings">
          <h2>Rental Listings</h2>
          <div className="card-container">
            <Card />
          </div>
        </article>
      </main>
    </>
  );
};

export default Home;
