import React from 'react';
import PropTypes from 'prop-types';

import { getSelectedDimensions } from '../utils/SelectedCellUtils';
import CellMask from './CellMask';
import * as columnUtils from '../ColumnUtils';

const isLockedColumn = (columns, {idx}) => columnUtils.getColumn(columns, idx).locked;

const getLeftPosition = (isGroupedRow, isFrozenColumn, scrollLeft, cellLeft) => {
  if (isGroupedRow) {
    return scrollLeft;
  } else if (isFrozenColumn) {
    return scrollLeft + cellLeft;
  }
  return cellLeft;
};

export const getCellMaskDimensions = ({ selectedPosition, columns, isGroupedRow, scrollLeft, rowHeight}) => {
  const dimensions = getSelectedDimensions({ selectedPosition, columns, rowHeight });
  const width = isGroupedRow ? '100%' : dimensions.width;
  const locked = isLockedColumn(columns, selectedPosition);
  const left = getLeftPosition(isGroupedRow, locked, scrollLeft, dimensions.left);
  return {...dimensions, ...{width, left} };
};

function SelectionMask({top, children, ...rest}) {
  const dimensions = getCellMaskDimensions(rest);
  return (
    <CellMask
      {...dimensions}
      top={top || dimensions.top}
      className="rdg-selected rdg-cell-mask"
    >
      {children}
    </CellMask>
  );
}

SelectionMask.propTypes = {
  selectedPosition: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  rowHeight: PropTypes.number.isRequired
};

export default SelectionMask;
