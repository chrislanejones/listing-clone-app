import Link from "next/link";
import React from "react";

const Card = (propertyName, slug, rentalPrice, beds, image) => {
  return (
    <Link href={`/property/${slug}`}>
      <div>{propertyName}</div>
    </Link>
  );
};

export default Card;
