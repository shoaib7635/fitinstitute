import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import Cards from './Cards';
import { useLocation } from 'react-router-dom';

const AddDummyProducts = ({ setProduct }) => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const selectedCategory = location.state?.category || "";

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'Products'));
      const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // ✅ Apply filter correctly here
      const filtered = selectedCategory
        ? productList.filter(p => p.category === selectedCategory)
        : productList;

      setProducts(filtered); // ✅ This was the missing part
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="flex mt-8 gap-4 flex-wrap">
      {products.map(product => (
        <Cards
          key={product.id}
          image={product.imageUrl}
          title={product.title}
          text={product.description}
          btnText="Buy Now"
          price={product.price}
          link="/details"
          onClick={() => setProduct(product)}
        />
      ))}
    </div>
  );
};

export default AddDummyProducts;
