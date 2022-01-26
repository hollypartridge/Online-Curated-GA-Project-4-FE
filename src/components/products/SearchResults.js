import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { getAllProducts } from '../lib/api';
import Error from '../common/Error';
import Loading from '../common/Loading';

function SearchResults() {
  const [params] = useSearchParams();
  const [searchQuery] = React.useState(params.get('search'));
  const [products, setProducts] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const [isError, setIsError] = React.useState(false);
  const isLoading = !products && !isError;

  console.log({ searchQuery });

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data);
      } catch (err) {
        setIsError(true);
      }
    };
    getData();
  }, []);

  React.useEffect(() => {
    const seachResults = products.filter((product) => {
      if (searchQuery) {
        return product.designer.toLowerCase() === searchQuery;
      }
    });
    setSearchResults(seachResults);
  }, [products, params, searchQuery]);

  return (
    <div className="index-gallery">
      {isError && <Error />}
      {isLoading && <Loading />}
      {products &&
        searchResults.map((product) => (
          <div key={product.id} className="gallery">
            <Link key={product.id} to={`/shop/${product.id}`}>
              <img src={product.image} alt={product.name} />
              <p>{product.designer}</p>
              <p>{product.name}</p>
              <p>£{product.price}</p>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default SearchResults;
