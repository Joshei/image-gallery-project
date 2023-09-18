import { CategoriesContext } from '../../contexts/categories-context';
import { useContext, useState, Fragment } from 'react';
import { CategoryContainer } from './category-styles';
import { useParams } from 'react-router-dom';
import Panel from '../../components/panel/panel-component'
import { findAllByTestId } from '@testing-library/react';

var star1 = "++++"

export const getLatestStoredNotifications = () => {
  if (localStorage.getItem(`products`)) {
    let storedProducts = makeCopyOfProductsWithCustomData(JSON.parse(localStorage.getItem(`products`)));
    return storedProducts;
  } else {
    return [];
  }
}

// We add category as a secondary parameter in the function
export const makeCopyOfProductsWithCustomData = (arrayOfProducts, category) => {

  let index = 0;
  if (arrayOfProducts) {
    if (arrayOfProducts.length > 0) {
      console.log("aop: ",arrayOfProducts);
      return arrayOfProducts.map(prod => {
        index++
        return {
          ...prod, index,
          category: prod.category || category, // Adding the category as a backup property in our custom objects
          options: prod.options || [
            { option: `option1`, checked: false },
            { option: `option2`, checked: false },
            { option: `option3`, checked: false },
            { option: `option4`, checked: false }
          ]
        }
      })
    } else {
      return arrayOfProducts
    }
  } else {
    return arrayOfProducts;
  }
}

export const setCheckedOptionForProducts = (arrayOfProducts, option, product) => {
  if (arrayOfProducts.length > 0) {
    return arrayOfProducts.map(prod => {
      if (prod.id === product.id) {
        return {
          ...prod,
          options: prod.options.map(opt => {
            if (opt.option === option.option) {
              opt.checked = opt.checked;
              return opt;
            } else {
              return opt;
            }
          })
        }
      } else {
        return prod;
      }
    });
  }
}

export default function Category() {
  const [items, setItems] = useState(false)
  const [stars, setStars] = useState([])
  let { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const productsForCategoryFromDB = categoriesMap[category];

  let storedProducts = getLatestStoredNotifications();
  // Create an array of only the IDs of products
  let storedProductIDs = [];
  if (storedProducts.length > 0) storedProductIDs = storedProducts.map(productInStoredProducts => productInStoredProducts.id);

  // We need to take the generated products from the database and push them into a new array
  if (productsForCategoryFromDB && productsForCategoryFromDB.length > 0) {
    productsForCategoryFromDB.forEach(productForCategoryFromDB => {
      // If the product already exists in our array, we don't want it
      if (storedProductIDs.length > 0 && storedProductIDs.includes(productForCategoryFromDB.id)) {
        return; // So just return to do nothing
      } else {
        // But if the id is not in our storage, let's push it in so we can track it
        storedProducts.push(productForCategoryFromDB);
      }
    })
  }

  // We need to take the updated array and create a copy with our custom data
  // Since we added a new parameter, let's make sure we pass that in
  const initialProducts = makeCopyOfProductsWithCustomData(storedProducts, category);
  // Now that we have the custom array with all the data we need
  // We can render our products on the page, but we will need to filter out the ones not matching the current category later on
  const [products, setProducts] = useState(initialProducts);
  // And lets store the final generated array of products with everything we need back into our localstorage to sync it up
  localStorage.setItem(`products`, JSON.stringify(initialProducts));
  let count = 0;
  
  const computeStars = (option, product, index, id2, indexCount, id ) => {
    //alert("zz: ", id );
    //contains the product information for PanelInfoArray - and doesnt work.
    let PanelInfoArray = JSON.parse(localStorage.getItem("products") || "[]");
    console.log(PanelInfoArray, "local storage panel")

   // let id = product.index 
    console.log("id99: " ,id)
    //get index of id with map


    console.log(option, product, index, id, "option values")
    console.log("indexCount:", indexCount)
    let amtStars = 0
    //alert(id);
    //console.log(id, "wrong: ")
    if (index === 0) {

      console.log("++ ", PanelInfoArray[id-1].options[1].checked);
      
      if (PanelInfoArray[id-1].options[1].checked == true) {

        alert("2");
        PanelInfoArray[id-1].options[0].checked = true
        PanelInfoArray[id-1].options[1].checked = false
        PanelInfoArray[id-1].options[2].checked = false
        PanelInfoArray[id - 1].options[3].checked = false
        amtStars = 1

        
    }
    
    else  if (PanelInfoArray[id-1].options[0].checked == true) {
        alert("1");
        PanelInfoArray[id-1].options[0].checked = false
        PanelInfoArray[id-1].options[1].checked = false
        PanelInfoArray[id-1].options[2].checked = false
        PanelInfoArray[id - 1].options[3].checked = false
        amtStars = 0

      }
     
      else {

        alert("3");
        PanelInfoArray[id-1].options[0].checked = true
        PanelInfoArray[id-1].options[1].checked = false
        PanelInfoArray[id-1].options[2].checked = false
        PanelInfoArray[id-1].options[3].checked = false
        amtStars = 1


      }

    }

    if (index === 1) {

      if (PanelInfoArray[id-1].options[2].checked == true) {

        alert("2a");
        PanelInfoArray[id-1].options[0].checked = true
        PanelInfoArray[id-1].options[1].checked = true
        PanelInfoArray[id-1].options[2].checked = false
        PanelInfoArray[id-1].options[3].checked = false
        amtStars = 2
        
    }
    
      else if (PanelInfoArray[id-1].options[1].checked == false) {
        alert("1a");
        PanelInfoArray[id-1].options[0].checked = true
        PanelInfoArray[id-1].options[1].checked = true
        PanelInfoArray[id-1].options[2].checked = false
        PanelInfoArray[id-1].options[3].checked = false
        amtStars = 2
      }
      
      else {

        alert("3a");
        PanelInfoArray[id-1].options[0].checked = false
        PanelInfoArray[id-1].options[1].checked = false
        PanelInfoArray[id-1].options[2].checked = false
        PanelInfoArray[id-1].options[3].checked = false
        amtStars = 0


      }

    }

    if (index === 2) {

      if (PanelInfoArray[id-1].options[3].checked == true) {
        alert("1b");
        PanelInfoArray[id-1].options[0].checked = true
        PanelInfoArray[id-1].options[1].checked = true
        PanelInfoArray[id-1].options[2].checked = true
        PanelInfoArray[id-1].options[3].checked = false
        amtStars = 3
      }
      else if (PanelInfoArray[id-1].options[2].checked == true) {

        alert("2b");
        PanelInfoArray[id-1].options[0].checked = false
        PanelInfoArray[id-1].options[1].checked = false
        PanelInfoArray[id-1].options[2].checked = false
        PanelInfoArray[id-1].options[3].checked = false
        amtStars = 0
        
      }
      else {

        alert("3b");
        PanelInfoArray[id-1].options[0].checked = true
        PanelInfoArray[id-1].options[1].checked = true
        PanelInfoArray[id-1].options[2].checked = true
        PanelInfoArray[id-1].options[3].checked = false
        amtStars = 3


      }

    }

    if (index === 3) {

      if (PanelInfoArray[id-1].options[3].checked == true) {

        alert("2c");
        PanelInfoArray[id-1].options[0].checked = false
        PanelInfoArray[id-1].options[1].checked = false
        PanelInfoArray[id-1].options[2].checked = false
        PanelInfoArray[id-1].options[3].checked = false
        amtStars = 0
        
    }
    
      else  {
        alert("1c");
        PanelInfoArray[id-1].options[0].checked = true
        PanelInfoArray[id-1].options[1].checked = true
        PanelInfoArray[id-1].options[2].checked = true
        PanelInfoArray[id-1].options[3].checked = true
        amtStars = 4
      }
      
      

    }

    alert("2");


    localStorage.setItem(`products`, JSON.stringify(PanelInfoArray));

    /*

      star = 1;
      if (todos.value1 == false) {
        setTodos((prevState) => ({ ...prevState, value1: true }))
        setTodos((prevState) => ({ ...prevState, value2: false }))
        setTodos((prevState) => ({ ...prevState, value3: false }))
        setTodos((prevState) => ({ ...prevState, value4: false }))

        amtStars = "1 Star";
        //alert("here1");
        
      }

    
    console.log("index: ", index)
    if (option.option == "option1") {
      if (option.checked == false) {
        
      }

    let PanelInfoArray = JSON.parse(localStorage.getItem("products") || "[]");
    console.log("PIA: ", PanelInfoArray[0].options[0].option)
    console.log("PIA: ", PanelInfoArray[0].options[0].checked)
    PanelInfoArray[1].options[1].checked = true
    localStorage.setItem(`products`, JSON.stringify(PanelInfoArray));
    console.log("ls: ", PanelInfoArray);
    setItems(true);


    }
    */

    handleCheck(option, product, amtStars)
  }
  
 
  let panelArray2 = []
  

  const handleCheck = (option, product, amtStars) => {

    let amtString = ""
    switch (amtStars) {
      case 1:
        amtString = "One Star"
        break;
      case 2:
        amtString = "Two Stars"
        break;
      case 3:
        amtString = "Three Stars"
        break;
      case 4:
        amtString = "Four Stars"
        break;
      default:
        amtString = "Zero Stars"

    }
    
    let amtstars = 1;
    //if (option.option == "option1" && option.checked == false)
    //{
      
    //  }
    
    let updatedProducts = [];
    if (getLatestStoredNotifications().length > 0) {
      updatedProducts = setCheckedOptionForProducts(getLatestStoredNotifications(), option, product);
    } else {
      updatedProducts = setCheckedOptionForProducts(initialProducts, option, product);
    }
    localStorage.setItem(`products`, JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    //const PanelInfoArray = ["a", "b"];
    
    var panelArray = JSON.parse(localStorage.getItem("panel") || "[]");

    
    var panel = {
      amtstars: amtString,
      id: product.id,
      name1: product.name,
      url: product.imageUrl,
      price: product.price
    };
    
    panelArray2 = panelArray.filter((contact) => contact.id !== product.id);
    
    if(amtString != "Zero Stars"){
    panelArray2.push(panel);
    }
    console.log({ panelArray2 })
    
    localStorage.setItem("panel", JSON.stringify(panelArray2));
    
    //star1 = panelArray2[0].name1;
    console.log({ panelArray2 })
    
    //setStars((stars) => [...stars, { amtstars: "aa", id: "ba" }])
    //console.log({ stars});
    //
    
    
    
    
  }

  //{ panelArray2 = panelArray2.filter((item) => item.id !== products.id) }
  
    

  let star = "stars+"

  //let x = stars.filter((item3) => item3.id === products.id) 
  //{ stars.map(star => star.id) }
  //console.log("xxx: ", x)
  
  let indexCount = 0;
  return (
                    
    <div>
      <h4>Rate an image:</h4>
      <Fragment>
        <CategoryContainer>


          {/*panelArray2.filter(item => item.id === products.id*/}
            
        
          { stars.map(star => { return (<div>{star.amtstars}</div>)}) }
          
          {products &&
            // Use filter to keep only the products with the matching category we want
            products.filter(prod => prod.category === category).map((product) => {
             
              {indexCount = indexCount + 1}
              
              
              let ID = product.id;
              let productID = `product-${product.id}`;
              let productDetailsID = `${productID}-details`;
              return (
                <div id={productID} className={`product`} key={product.name}>
                  <div id={`drop`}>{product.id}</div>
                  <div id={productDetailsID}>
                    <h2>{product.name}</h2>
                    <h3>${product.price}.00</h3>

                   

                    <div className={`images`}>
                      <img src={product.imageUrl} alt={product.name} width={90} />
                    </div>
                  </div>
                  <div className="optionsContainer">
                    {product.options.map((opt, optIndex) => {
                      let newOptIndex = optIndex + 1;
                      let productOptionValue = `option${newOptIndex}`;
                      let productOptionID = `${productID}-option-${newOptIndex}`;
                      
                      
                      
                      return (
                        
                        <input key={optIndex} id={productOptionID}
                          checked={opt.checked} type={`checkbox`} value={productOptionValue}
                          name={newOptIndex} onChange={(event) => computeStars(opt, product,optIndex, ID, indexCount, product.index)} />
                      )

                      
                    })}

                    
                    
                   <ul >
                      {/*panelArray2.map(product2 => { return (<li>{product2.url}</li>) })*/}
                      </ul>
                    {/* <Panel key={id} category={product} productID={productID} /> */}
                    {<Panel stars={star1 } key={product.id} category={product} productID={productID} />}
                  </div>
                </div>
              )
            })
          
          
          }
        </CategoryContainer>
      </Fragment>
    </div>
  );
};

