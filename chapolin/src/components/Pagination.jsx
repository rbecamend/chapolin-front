pagination.jsx

import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                Anterior
            </button>
            <span>Página {currentPage} {totalPages ? `de ${totalPages}` : ''}</span>
            <button disabled={totalPages && currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                Próxima
            </button>
        </div>
    );
};

export default Pagination;
