const convertTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString("en-EN");
};

export default convertTimestamp;
