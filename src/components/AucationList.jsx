import PropTypes from 'prop-types';
import AucationItem from './AucationItem'; // Component for a single aucation item

function AucationList({ aucations, onDeleteAucation }) {
  // Check if there are any aucations to display
  if (!aucations || aucations.length === 0) {
    return <p>No aucations available.</p>;
  }

  // Generate a list of AucationItem components
  const aucationElements = aucations.map((aucation) => (
    <AucationItem
      key={aucation.id}
      aucation={aucation}
      onDeleteAucation={onDeleteAucation}
    />
  ));

  // Return the list wrapped in a container
  return <div>{aucationElements}</div>;
}

AucationList.propTypes = {
  aucations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // Define other aucation properties if necessary
    })
  ).isRequired,
  onDeleteAucation: PropTypes.func,
};

export default AucationList;
