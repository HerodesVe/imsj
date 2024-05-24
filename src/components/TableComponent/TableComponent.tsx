import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './TableComponent.module.css';
import moment from 'moment';

interface Column {
  campo: string;
  label: string;
  format?: (value: any) => string;
}

interface TableComponentProps {
  columns: Column[];
  data: { [key: string]: any }[];
  renderButton?: (row: { [key: string]: any }) => React.ReactNode;
  itemsPerPage?: number;
}

const TableComponent: React.FC<TableComponentProps> = ({ columns, data, renderButton, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = data.slice(offset, offset + itemsPerPage);

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.label}</th>
            ))}
            {renderButton && <th></th>}
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => {
                const value = getNestedValue(row, column.campo);
                const formattedValue = column.format ? column.format(value) : value;
                return <td key={colIndex}>{formattedValue}</td>;
              })}
              {renderButton && <td>{renderButton(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'Anterior'}
        nextLabel={'Siguiente'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(data.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
      />
    </div>
  );
};

export default TableComponent;
