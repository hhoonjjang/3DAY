let addItem = async function () {
  try {
    const item = await axios.get("/api/item/add", {});
    console.log(item);
  } catch (err) {
    console.error(err);
  }
};
addItem();
