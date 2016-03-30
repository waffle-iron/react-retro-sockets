import React from 'react';
import Column from './Column.jsx';

const Columns = (props) => {
  var columns = props.columns.map((column,index) => {
    return (
      <Column
        key={index}
        columnId={column.key}
        title={column.title}
        postIts={column.postIts}
        titleSet={column.titleSet}
      />
    );
  });
  return (
    <div>
    {columns}
    </div>
  );
};

export default Columns;
