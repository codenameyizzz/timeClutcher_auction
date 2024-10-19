import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetAucations } from "../states/aucations/action"; // Hapus asyncDeleteAucation jika tidak digunakan di sini
import AucationList from "../components/AucationList";
import Swal from "sweetalert2"; // Menggunakan SweetAlert untuk notifikasi

function HomePage() {
  const dispatch = useDispatch();
  const { authLogin = null, aucations = [] } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncGetAucations()); // Ambil semua aucations ketika komponen dimuat
  }, [dispatch]);

  return (
    <section>
      <div className="container pt-1">
        <div className="card mb-4">
          <div className="card-body">
            <h3>Hello, {authLogin?.name}</h3>
          </div>
        </div>

        {aucations.length > 0 ? (
          <AucationList aucations={aucations} />
        ) : (
          <p>No aucations available</p>
        )}
      </div>
    </section>
  );
}

export default HomePage;
