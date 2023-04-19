import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const checkCreated = (time: string) => {
  const duration = dayjs().diff(dayjs(time), "day", true);
  return duration < 7;
};

export default checkCreated;
