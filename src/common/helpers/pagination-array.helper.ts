import * as _ from 'lodash';

export function getPaginatedItems(items, page, limit) {
  const offset = (page - 1) * limit;
  const pagedItems = _.drop(items, offset).slice(0, limit);

  return {
    page,
    limit,
    total: items.length,
    total_pages: Math.ceil(items.length / limit),
    data: pagedItems,
  };
}
