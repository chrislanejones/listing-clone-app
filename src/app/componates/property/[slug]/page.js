import Link from "next/link";
import ImageCard from "../../ImageCard";

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
          width={300}
          height={150}
        />
      ))}
    </div>
  );
};

export default Property;
