import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetAucations } from "../states/aucations/action";
import AucationItem from "../components/AucationItem"; // Import AucationItem

function HomePage() {
  const dispatch = useDispatch();
  const { authLogin = null, aucations = [] } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncGetAucations());
  }, [dispatch]);

  return (
    <section>
      <div className="container pt-1">
        <div className="card mb-4">
          <div className="card-body">
            <h3>Hello, {authLogin?.name}</h3>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {aucations.map((aucation) => (
            <div key={aucation.id} className="col">
              <AucationItem aucation={aucation} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
