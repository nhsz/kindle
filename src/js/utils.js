const normalize = keywords => keywords.trim().toLowerCase();

const match = (keywords, attribute) => attribute.toLowerCase().includes(keywords);

const descendingOrder = comparison => comparison * -1;

const sortCriteria = (key, order = 'asc') => {
  return (a, b) => {
    let comparison = 0;

    if (a[key] < b[key]) {
      comparison = -1;
    }

    if (a[key] > b[key]) {
      comparison = 1;
    }

    if (order === 'desc') {
      return descendingOrder(comparison);
    }

    return comparison;
  };
};

export { normalize, match, sortCriteria };
