import { useEffect, useState } from "react";

// If you don't have a version of React that supports
// hooks, you can use a class-based version of this
// component in ProgressProviderUsingClass.js

function ProgressProvider(props:any) {
    const {valueStart,valueEnd,children}=props;
      const [value, setValue] = useState(valueStart);
    useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);

  return  children(value);
  
}

export default ProgressProvider


