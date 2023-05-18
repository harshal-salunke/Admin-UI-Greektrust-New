import config from "./config";

export const getTotalPages = (length) => {
  return Math.ceil(length / 10);
};

export const getCustomRecordIndex = (page) => {
  return (page - 1) * config.PAGE_SIZE;
};
