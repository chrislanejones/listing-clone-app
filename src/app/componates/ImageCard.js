import Image from "next/image";

Image;

const ImageCard = ({ url, fileName, width, height }) => {
  return (
    <Image
      className="image"
      src={url}
      alt={fileName}
      width={width}
      height={height}
      priority
    />
  );
};

export default ImageCard;
