import React from 'react';

// components
import Column from './Column';

const Columns = (props) => {
  let columns = props.columns.map((column, index) => {
    return(
      <Column
        name={props.name}
        key={index}
        columnId={column.key}
        title={column.title}
        notes={column.notes}
        titleSet={column.titleSet}
      />
    );
  });
  return(<div>{columns}</div>);
};

export default Columns;
