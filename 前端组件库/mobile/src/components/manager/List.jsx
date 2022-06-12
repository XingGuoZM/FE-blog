import { useEffect } from "react";
import Cell from "./Cell";
const data = [1, 2, 3, 4, 5];
export default function List() {
  useEffect(() => {
    console.log("render List");
  }, []);
  return (
    <div>
      {data.map((item) => (
        <Cell key={item} item={item} />
      ))}
    </div>
  );
}
