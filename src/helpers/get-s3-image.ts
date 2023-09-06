const urlRegex =
  /(https:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/g;

const getS3Image = (image: string | undefined) => {
  if (image && String(image).match(urlRegex)) return image;

  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/s3/${image}`;
};

export default getS3Image;
