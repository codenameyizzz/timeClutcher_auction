import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2"; // SweetAlert for confirmation dialogs
import React from "react";

import {
  asyncDetailAucation,
  asyncDeleteAucation,
  asyncChangeAucationCover,
  asyncAddBid,
  asyncDeleteBid,
} from "../states/aucations/action";
import AucationDetail from "../components/AucationDetail";

function AucationDetailPage() {
  // Initialize hooks and variables
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local state for cover selection and bid amount
  const [selectedCover, setSelectedCover] = React.useState(null);
  const [bidAmount, setBidAmount] = React.useState("");

  // Extract necessary data from Redux store
  const { authLogin, detailAucation, loading } = useSelector((state) => ({
    detailAucation: state.detailAucation,
    loading: state.loading,
    authLogin: state.authLogin,
  }));

  // Fetch aucation details when component mounts or id changes
  React.useEffect(() => {
    if (id) {
      dispatch(asyncDetailAucation(id));
    }
  }, [id, dispatch]);

  // Calculate highest bid and user's bid
  const highestBid = detailAucation?.bids.length
    ? Math.max(...detailAucation.bids.map((bid) => bid.bid))
    : null;

  const myBid = detailAucation?.my_bid ? detailAucation.my_bid.bid : null;

  // Handler to delete the aucation
  const handleDelete = () => {
    Swal.fire({
      title: "Hapus Lelang",
      text: `Apakah kamu yakin ingin menghapus lelang: ${detailAucation.title}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Tetap Hapus",
      customClass: {
        confirmButton: "btn btn-danger me-3 mb-4",
        cancelButton: "btn btn-secondary mb-4",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(asyncDeleteAucation(id));
        navigate("/"); // Navigate back to homepage after deletion
      }
    });
  };

  // Handler for cover file selection
  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedCover(file);
    }
  };

  // Handler to change the aucation cover
  const handleChangeCover = () => {
    if (selectedCover) {
      dispatch(asyncChangeAucationCover({ id, cover: selectedCover }))
        .then(() => {
          Swal.fire("Success", "Aucation cover updated successfully", "success");
          navigate("/"); // Return to the homepage after success
        })
        .catch((error) => {
          Swal.fire("Error", error.message, "error");
        });
    } else {
      Swal.fire("Error", "Please select a cover to upload", "error");
    }
  };

  // Handler to add a bid
  const handleAddBid = async () => {
    if (bidAmount > 0) {
      await dispatch(asyncAddBid({ id, bid: bidAmount }));
      Swal.fire("Success", "Bid successfully added", "success");
      await dispatch(asyncDetailAucation(id)); // Reload aucation details
    } else {
      Swal.fire("Error", "Please enter a valid bid amount", "error");
    }
  };

  // Handler to delete the user's bid
  const handleDeleteBid = () => {
    Swal.fire({
      title: "Hapus Tawaran",
      text: `Apakah kamu yakin ingin menghapus tawaranmu pada lelang ini?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus Tawaran",
      customClass: {
        confirmButton: "btn btn-danger me-3 mb-4",
        cancelButton: "btn btn-secondary mb-4",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(asyncDeleteBid({ id }));
      }
    });
  };

  // Display loading indicator if data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the component
  return (
    <section>
      <div className="container pt-1">
        {detailAucation ? (
          <>
            <AucationDetail aucation={detailAucation} />

            {highestBid !== null && (
              <div className="mt-3">
                <h5>Bid Tertinggi: Rp {highestBid.toLocaleString()}</h5>
              </div>
            )}

            {myBid !== null && (
              <div className="mt-3">
                <h5>Tawaran Anda: Rp {myBid.toLocaleString()}</h5>
                <button
                  onClick={handleDeleteBid}
                  className="btn btn-danger mt-2"
                >
                  Hapus Tawaran
                </button>
              </div>
            )}

            {authLogin && detailAucation.user_id === authLogin.id ? (
              <>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-danger mt-3"
                >
                  Hapus Lelang
                </button>
                <Link
                  to={`/aucations/edit/${id}`}
                  className="btn btn-primary mt-3 ms-2"
                >
                  Edit Lelang
                </Link>

                {/* Input to change the cover */}
                <div className="mb-3 mt-3">
                  <label htmlFor="coverInput" className="form-label">
                    Ubah Cover Lelang:
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="coverInput"
                    onChange={handleCoverChange}
                  />
                  <button
                    onClick={handleChangeCover}
                    className="btn btn-primary mt-2"
                  >
                    Ubah Cover
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-3">
                <h5>Tambah Tawaran</h5>
                <input
                  type="number"
                  className="form-control"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Masukkan jumlah tawaran"
                />
                <button onClick={handleAddBid} className="btn btn-success mt-2">
                  Tambah Bid
                </button>
              </div>
            )}
          </>
        ) : (
          <div>Aucation not found.</div>
        )}
      </div>
    </section>
  );
}

export default AucationDetailPage;
