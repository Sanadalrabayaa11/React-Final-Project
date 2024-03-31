import axios from "axios";
import { useEffect, useState } from "react";

function useResource(url) {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);

  // const controller = new AbortController();
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        url
        // {
        // signal: controller.signal
        // }
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProducts();
    // return()=>{
    //     controller.abort();
    // };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { products, loader };
}

export default useResource;
