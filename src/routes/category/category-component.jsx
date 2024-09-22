import { useContext, useState, useEffect, Fragment } from "react";
import { CategoryContainer, Title } from "./category-styles";
//import { title } from "./category-styles2";
import { useParams, useNavigate } from "react-router-dom";
import Panel from "../../components/panel/panel-component";
import { after } from "underscore";
import { NavLink } from "../navigation/navigation-styles";
import {ART}  from "../../assets/ART_DATA.js"
import './category-styles2.css';


export default function Category() {

//!!!!!!!!!!!!!!!!!!!!
//WHY WOULD THIS USE USESTATE BECAUSE, IT IS SET TO PRODUCTS AND CHANGES NOT DEPENDING ON THE LAST VALUE
//SET TO PRODUCTS
let infoArray = [];
//DIDN'T UEE USESTATE BECAUSE IT ACTS INTERNALLY ONLY IN THIS FUNCTION
//ISN'T USED BETWEEN RENDERING
let artPiecesOfCategoryArray = [];
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //let [infoArray, setInfoArray] = useState
  const route = useParams();
  let imageCategoryToShow = route.category;
  let locallyStoredProducts = [];
  let [products, setProducts] = useState(ART);
  artPiecesOfCategoryArray = products.filter(
    (element) => element.category === imageCategoryToShow
  );
  useEffect(() => {
   const productsArrayStored = JSON.parse(localStorage.getItem("products"));
    const panelsArrayStored = JSON.parse(localStorage.getItem("panel"));
    if (productsArrayStored) {
      setProducts(productsArrayStored);
    }
    if (panelsArrayStored) {
      setPanelInformation(panelsArrayStored);
    }
  }, []);
  const onComplete = after(products.length, () => {
  });
  let [panelInformation, setPanelInformation] = useState([]);
  useEffect(() => {}, []);
  const [stars, setStars] = useState([]);
  let [showPanel, setShowPanel] = useState(false);
  let count = 0;
  let IsElementSameID = false;
  //amount of stars is what was selected from that interface
  const setPanelInfo = (amtountOfChecks, product) => {
    let panelInformationListLeftElements = [];
    let panelArrayWithDeletedElement = [];
    if (amtountOfChecks == 1) {
      setElement(
        product.id,
        product.name,
        product.imageUrl,
        product.price,
        true,
        false,
        false,
        false,
        product.category,
        "One Check"
      );
    } else if (amtountOfChecks == 2) {
      setElement(
        product.id,
        product.name,
        product.imageUrl,
        product.price,
        true,
        false,
        false,
        false,
        product.category,
        "Two Checks"
      );
    } else if (amtountOfChecks == 3) {
      setElement(
        product.id,
        product.name,
        product.imageUrl,
        product.price,
        true,
        false,
        false,
        false,
        product.category,
        "Three Checks"
      );
    } else if (amtountOfChecks == 4) {
      setElement(
        product.id,
        product.name,
        product.imageUrl,
        product.price,
        true,
        false,
        false,
        false,
        product.category,
        "Four Checks"
      );
    } else {
      let arrayWithoutElement = panelInformation.filter(
        (panelElement) => panelElement.id != product.id
      );
      setPanelInformation(arrayWithoutElement);
      localStorage.setItem(`panel`, JSON.stringify(arrayWithoutElement));
    }
  };

  //keep art pieces organized using there id
  function redistributeTheIds(id, panelInformation) {
    let currentid = -1;
    let missingIDIndex = -1;
    let arrayOfIDS = [];
    for (let i = 0; i < panelInformation.length; i++) {
      let IDVariable = panelInformation[i].id;
      arrayOfIDS[i] = IDVariable;
    }
    return arrayOfIDS;
  }
  const setElement = (
    id,
    name,
    url,
    price,
    option1,
    option2,
    option3,
    option4,
    category,
    amountstars
  ) => {
    let panelInformationElementToAdd = {
      id: id,
      name: name,
      imageUrl: url,
      price: price,
      options: [
        { option: "option1", checked: option1 },
        { option: "option2", checked: option2 },
        { option: "option3", checked: option3 },
        { option: "option4", checked: option4 },
      ],
      category: category,
      amtstars: amountstars,
    };
    let panelInformation2 = panelInformation.filter(
      (panelElement) => panelElement.id === id
    );
    //there are no elements in array for panel with this new info
    if (panelInformation2.length == 0) {
      let arrayFOrPanel = [...panelInformation, panelInformationElementToAdd];
      setPanelInformation(arrayFOrPanel);
      localStorage.setItem(`panel`, JSON.stringify(arrayFOrPanel));
    } else {
      ///there is an element with this check, and stars have changed
      let arrayOfIDs = [];
      const panelInformationChanged = panelInformation.map((pan, index) => {
        arrayOfIDs = redistributeTheIds(id, panelInformation);
        let indexOfElement = arrayOfIDs[index];
        if (indexOfElement === id) {
          return panelInformationElementToAdd;
        } else {
          return pan;
        }
      });
      setPanelInformation(panelInformationChanged);
      localStorage.setItem(`panel`, JSON.stringify(panelInformationChanged));
    }
  };


  const setCheckboxes = (check1, check2, check3, check4, infoArray, id) => {
    infoArray[id - 1].options[0].checked = check1;
    infoArray[id - 1].options[1].checked = check2;
    infoArray[id - 1].options[2].checked = check3;
    infoArray[id - 1].options[3].checked = check4;
    return infoArray;
  };


  const computeStars = (e, index, howManyChecked, id, product) => {
    let infoArray = [...products];
    let checked = e.target.checked;
    let amtStars = 0;
    //index of four stars satring at zero
    index = index - 1;
    id = id + 1;
    //index is which star, zero through three
    //infoarray was set to products above, in this function
    //how the check boxes work:
    //for any checked box, all boxes before this box will be checked
    //reclicking on a checked box will result in that box and all boxes to the right to be unchecked and the left to be checked.
    //check boxes start all false
    //appply to first box
    if (index === 0) {
      //all check boxes start as false
      //if there is a check on second box and than box one is checked, the check will result in box one being checked
      if (infoArray[id - 1].options[1].checked == true) {
        amtStars = 1;
        setCheckboxes(true, false, false, false, infoArray, id);
      }
      //all check boxes start as false
      //apply check to second box
      //check box one is checked and than index checks one.  so, results in no checks
      else if (infoArray[id - 1].options[0].checked == true) {
        amtStars = 0;
        setCheckboxes(false, false, false, false, infoArray, id);
      } else {
        amtStars = 1;
        //all check boxes start as false
        //apply check to second box
        //three falses,  so it will be a simple check on first box
        setCheckboxes(true, false, false, false, infoArray, id);
      }
    }
    //check boxes start all false
    //apply check to second box
    if (index === 1) {
      if (infoArray[id - 1].options[2].checked == true) {
        amtStars = 2;
        //all check boxes start as false
        //if third box is true and box two is than checked there will be two stars
        setCheckboxes(true, true, false, false, infoArray, id);
      }
      //all check boxes start as false
      //if second box is false and box two is than starred, there will be two stars
      else if (infoArray[id - 1].options[1].checked == false) {
        amtStars = 2;
        setCheckboxes(true, true, false, false, infoArray, id);
      }
      //all check boxes start as false
      //isn't checked on third box and is checked on second box (using else)
      //box two is than changed with index that reverts box two to false
      else {
        amtStars = 0;
        setCheckboxes(false, false, false, false, infoArray, id);
      }
    }
    //all check boxes start as false
    //apply check to third box
    if (index === 2) {
      //all check boxes start as false
      //if box four is checked, and three is checked with index, there will be three checks
      if (infoArray[id - 1].options[3].checked == true) {
        amtStars = 3;
        setCheckboxes(true, true, true, false, infoArray, id);
      }
      //all check boxes start as false
      //if box three is checked and index is applied with third box, all false
      else if (infoArray[id - 1].options[2].checked == true) {
        amtStars = 0;
        setCheckboxes(false, false, false, false, infoArray, id);
      } else {
        //all check boxes start as false
        //by negation of above, fourth star is false, and and third check is false
        //index applied, three trues and a false
        amtStars = 3;
        setCheckboxes(true, true, true, false, infoArray, id);
      }
    }
    //all check boxes start as false
    //apply check to fourth box
    if (index === 3) {
      //all check boxes start as false
      //index is three so will be all stars, all stars with last element checked with index will be all false
      if (infoArray[id - 1].options[3].checked == true) {
        amtStars = 0;
        setCheckboxes(false, false, false, false, infoArray, id);
      }
      //all check boxes start as false
      //there is a check on fourth box, so is all true.
      else {
        amtStars = 4;
        setCheckboxes(true, true, true, true, infoArray, id);
      }
    }
    setProducts(infoArray);
    let var1 = JSON.parse(localStorage.getItem("products"));
    setPanelInfo(amtStars, product);
    localStorage.setItem(`products`, JSON.stringify(infoArray));
  };



 

return (
  <div>
    <div className = "title">
    Would you like to rate these works?
    </div>
    
    <button
      className="buttonShow"
      onClick={() => {
        //
        setShowPanel((showPanel) => !showPanel);
      }}
    >
      Show Panel
    </button>
    <br></br>
    <br></br>
    <br></br>
    <NavLink to="/">Home Page</NavLink>
    <br></br>
    <br></br>
    <br></br>
    <Fragment>
      <CategoryContainer>
        {artPiecesOfCategoryArray.map((product) => {
          let ID = product.id;
          return (
            <div key={product.imageUrl}>
              <div>
                <h2>{product.name}</h2>
                <h3>${product.price}.00</h3>
                <div>
                  <img
                    type="Image"
                    src={product.imageUrl}
                    onLoad={onComplete}
                    onError={onComplete}
                    alt={product.name}
                    width={220}
                  />
                </div>
              </div>
              <div>
                {product.options.map((opt, optIndex) => {
                  let newOptIndex = optIndex + 1;
                  return (
                    <input
                      key={optIndex}
                      checked={opt.checked}
                      type={`checkbox`}
                      name={newOptIndex}
                      onChange={(e) =>
                        computeStars(e, newOptIndex, newOptIndex, ID, product)
                      }
                    />
                  );
                })}
                {showPanel && (
                  <Panel
                    key={panelInformation.id}
                    category={panelInformation}
                  />
                )}
              </div>
            </div>
          );
        })}
      </CategoryContainer>
    </Fragment>
  </div>
);
}