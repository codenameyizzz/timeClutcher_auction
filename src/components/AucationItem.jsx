import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";

function AucationItem({ aucation, onDeleteAucation }) {
  // Handle delete confirmation
  const handleDelete = () => {
    Swal.fire({
      title: "Hapus Lelang",
      text: `Apakah kamu yakin ingin menghapus lelang: ${aucation.title}?`,
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
        onDeleteAucation(aucation.id);
      }
    });
  };

  return (
    <div
      className="card shadow-sm"
      style={{
        height: "100%",
        minHeight: "400px",
        borderRadius: "15px", // Increased border-radius for softer edges
        overflow: "hidden", // Ensure the border-radius applies to the image too
      }}
    >
      <div className="card-img-top" style={{ height: "250px", overflow: "hidden" }}>
        <img
          src={aucation.cover}
          alt={aucation.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures image fills the area properly
          }}
        />
      </div>
      <div className="card-body d-flex flex-column" style={{ gap: "10px" }}>
        <Link to={`/aucations/${aucation.id}`} className="flex-grow-1">
          <h5 className="card-title" style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
            {aucation.title}
          </h5>
        </Link>
        <p className="card-text flex-grow-1" style={{ fontSize: "0.9rem", color: "#555" }}>
          {aucation.description}
        </p>
        <div style={{ fontSize: "0.95rem" }}>
          <span className="badge bg-info text-dark me-2">Starting Bid</span> Rp {aucation.start_bid.toLocaleString("id-ID")}
        </div>
        <div style={{ fontSize: "0.95rem" }}>
          <span className="badge bg-warning text-dark me-2">Closing Date</span> {new Date(aucation.closed_at).toLocaleDateString()}
        </div>
        <div style={{ fontSize: "0.95rem" }}>
          <span className="badge bg-secondary text-white me-2">Total Bids</span> {aucation.bids.length}
        </div>

        {/* Delete Button */}
        {onDeleteAucation && (
          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-sm btn-outline-danger mt-auto"
            style={{ alignSelf: "flex-end" }}
          >
            <FaTrash /> Hapus
          </button>
        )}
      </div>
    </div>
  );
}

AucationItem.propTypes = {
  aucation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    start_bid: PropTypes.number.isRequired,
    closed_at: PropTypes.string.isRequired,
    cover: PropTypes.string,
    bids: PropTypes.array,
  }).isRequired,
  onDeleteAucation: PropTypes.func,
};

export default AucationItem;