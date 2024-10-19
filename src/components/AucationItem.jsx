import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6"; // Importing the trash icon from react-icons
import Swal from "sweetalert2"; // Importing SweetAlert2 for confirmation dialogs

function AucationItem({ aucation, onDeleteAucation }) {
  // Function to handle delete confirmation
  const handleDelete = () => {
    Swal.fire({
      title: "Hapus Lelang",
      text: `Apakah kamu yakin ingin menghapus lelang: ${aucation.title}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Tetap Hapus",
      customClass: {
        confirmButton: "btn btn-danger me-3 mb-4", // Styling for confirm button
        cancelButton: "btn btn-secondary mb-4", // Styling for cancel button
      },
      buttonsStyling: false, // Disables default SweetAlert2 button styling
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteAucation(aucation.id); // Calls the delete function if confirmed
      }
    });
  };

  return (
    <div className="card mb-3">
      <div className="row g-0">
        {/* Section for the cover image */}
        {aucation.cover && (
          <div className="col-md-4">
            <img
              src={aucation.cover}
              className="img-fluid rounded-start"
              alt={aucation.title}
              style={{ maxHeight: "200px", objectFit: "cover" }} // Optional: limit image height
            />
          </div>
        )}
        <div className="col-md-8">
          <div className="card-body">
            <Link to={`/aucations/${aucation.id}`}>
              <h5>{aucation.title}</h5>
            </Link>
            <p>{aucation.description}</p>
            <p>Starting Bid: {aucation.start_bid}</p>
            <p>
              Closing Date:{" "}
              {new Date(aucation.closed_at).toLocaleDateString()}
            </p>
            <p>Total Bids: {aucation.bids.length}</p>

            {/* Only show delete button if onDeleteAucation is provided */}
            {onDeleteAucation && (
              <button
                type="button"
                onClick={handleDelete} // Calls handleDelete when clicked
                className="btn btn-sm btn-outline-danger"
              >
                <FaTrash /> Hapus
              </button>
            )}
          </div>
        </div>
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
    cover: PropTypes.string, // URL of the cover image
    bids: PropTypes.array, // Array of bids (added this if it's used)
  }).isRequired,
  onDeleteAucation: PropTypes.func, // Made optional
};

export default AucationItem;
