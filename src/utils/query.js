const query = (key) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
};

export default query;
