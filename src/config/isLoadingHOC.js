import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="loaderHolder">
      <div className="loaderMain">
        <TailSpin
          height="80"
          width="80"
          color="#ffffff"
          ariaLabel="tail-spin-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};

const IsLoadingHOC = (WrappedComponent) => {
  function HOC(props) {
    const [isLoading, setLoading] = useState(false);

    const setLoadingState = (isComponentLoading) => {
      setLoading(isComponentLoading);
    };

    return (
      <>
        {isLoading && <Loading />}
        <WrappedComponent
          {...props}
          isLoading={isLoading}
          setLoading={setLoadingState}
        />
      </>
    );
  }
  return HOC;
};

export default IsLoadingHOC;
