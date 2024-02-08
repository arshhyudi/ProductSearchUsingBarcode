
import { useState } from 'react';
import './App.css';
import axios from 'axios';
const  App=()=> {
  const[barcode, setBarcode ] = useState("");
  const [productInfo, setProductInfo] = useState(null);

  const handleBarcodeChange =(e)=>{
    setBarcode(e.target.value);
  }
  const handleGetData  = async ()=>{
    try {
      const respone = await axios.get(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`)
      console.log(respone)
     setProductInfo(respone.data.product)
    } 
    catch (error) {
      console.error('Error fetching product information:', error);
    }
  }

  return (
    <div className="container">
     <label>
      Enter Products Barcode :
      <input type='text' value={barcode} onChange={handleBarcodeChange}/>
     </label>
     <button onClick={handleGetData}>Get data</button>
     {
      productInfo &&(
        <div className='product-info'>
          <h2>Product Information</h2>
          <p>
            Barcode :{productInfo.code}
          </p>
          <div>
            <img src={productInfo.image_url} alt='Products'/>
            <div>
              <p>Name:{productInfo.product_name}</p>
              <p>Country of Origin:{productInfo.countries_tags}</p>
              <p>Energy : {productInfo.nutriments.energy}kg</p>
            </div>
          </div>
        </div>
      )
     }
    </div>
  );
}

export default App;
