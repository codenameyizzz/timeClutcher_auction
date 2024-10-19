import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  asyncDetailAucation,
  asyncEditAucation,
} from "../states/aucations/action";

function AucationEditPage() {
  // Inisialisasi dispatch dan navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Dapatkan id dari URL
  const { id } = useParams();

  // Ambil detailAucation dari Redux store
  const { detailAucation } = useSelector((state) => state);

  // State lokal untuk form input
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startBid, setStartBid] = useState("");
  const [closedAt, setClosedAt] = useState("");

  // Ambil detail aucation saat komponen dimuat
  useEffect(() => {
    if (id) {
      dispatch(asyncDetailAucation(id));
    }
  }, [id, dispatch]);

  // Update state lokal saat detailAucation berubah
  useEffect(() => {
    if (detailAucation) {
      setTitle(detailAucation.title);
      setDescription(detailAucation.description);
      setStartBid(detailAucation.start_bid);
      setClosedAt(detailAucation.closed_at);
    }
  }, [detailAucation]);

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  // Fungsi untuk submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      asyncEditAucation(
        {
          id,
          title,
          description,
          start_bid: startBid,
          closed_at: closedAt,
        },
        navigate
      )
    );
  };

  return (
    <div className="container pt-1">
      <h2>Edit Aucation</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Judul</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleInputChange(setTitle)}
          />
        </div>
        <div className="mb-3">
          <label>Deskripsi</label>
          <textarea
            className="form-control"
            value={description}
            onChange={handleInputChange(setDescription)}
          />
        </div>
        <div className="mb-3">
          <label>Start Bid</label>
          <input
            type="number"
            className="form-control"
            value={startBid}
            onChange={handleInputChange(setStartBid)}
          />
        </div>
        <div className="mb-3">
          <label>Tanggal Penutupan</label>
          <input
            type="datetime-local"
            className="form-control"
            value={closedAt}
            onChange={handleInputChange(setClosedAt)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}

export default AucationEditPage;
