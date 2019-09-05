export function normalize (keywords) {
  return keywords.trim().toLowerCase();
}

export function match (keywords, attribute) {
  return attribute.toLowerCase().includes(keywords);
}

export function sortCriteria (key, order = 'asc') {
  return function (a, b) {
    let comparison = 0;

    if (a[key] < b[key]) {
      comparison = -1;
    }

    if (a[key] > b[key]) {
      comparison = 1;
    }

    return order === 'desc' ? comparison * -1 : comparison;
  };
}
