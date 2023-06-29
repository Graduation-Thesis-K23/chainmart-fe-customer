const urlRegex =
  /(https:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/g;

const getS3Image = (image: string) => {
  if (image.match(urlRegex)) return image;
  return "http://localhost:3000/api/s3/" + image;
};

export default getS3Image;
