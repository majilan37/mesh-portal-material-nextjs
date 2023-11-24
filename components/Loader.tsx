"use client";

import React from "react";

function Loader() {
  React.useEffect(() => {
    async function getLoader() {
      const { tailChase } = await import("ldrs");
      tailChase.register();
    }
    getLoader();
  }, []);

  return <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>;
}

export default Loader;
