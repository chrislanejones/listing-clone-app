import Link from "next/link";
import React from "react";
import ImageCard from "./ImageCard";

const Card = ({ propertyName, slug, rentalPrice, beds, image }) => {
  return (
    <Link href={`/property/${slug}`}>
      <div className="card">
        <ImageCard
          url={image.url}
          alt={image.fileName}
          width={300}
          height={150}
        />
        <div className="text-container">
          <h3>${rentalPrice} / month</h3>
          <h3>${beds} Beds</h3>
          <p>{propertyName}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
