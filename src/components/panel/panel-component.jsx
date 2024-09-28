import { DropDown } from "./panel-styles";
import { useState } from "react";


function Panel({category}) {
  const [items, setItems] = useState([]);
  return (
    <div>
      <DropDown>
        <div>
         {category &&
            category.map((item, index) => (
             <div key={index}>
                <p>{item.name1}</p>
                <br></br>
                <img src={item.imageUrl} width="100" height="106" />
                <p>${item.price}.00</p>
                <p>{item.amtstars}</p>
                <p>----</p>
              </div>
            ))}
        </div>
      </DropDown>
    </div>
  );
}
export default Panel;
