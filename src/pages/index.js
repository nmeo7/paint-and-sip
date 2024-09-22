import { useEffect } from "react";
import { useCollection } from "../services/query";
import { Box } from "./Box";

// pages/index.js
export default function Home() {
  const {result} = useCollection('orders')

  useEffect(() => {
    console.log(result)
  })

    return (
      <div>
        <h1>Welcome to My Static Site</h1>
        <p>This is the home page.</p>
        <a href="/about">Go to About Page</a>
        <Box/>
      </div>
    );
  }