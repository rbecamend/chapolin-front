import React, { useState, useEffect } from 'react';
import { fetchNUPs, sendBatchToPeDePano } from '../services/api';
import Pagination from '../components/Pagination';
import NUPTable from '../components/NUPTable';
import Logs from '../components/Logs';

const Dashboard = () => {
    const [nups, setNups] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [logs, setLogs] = useState([]);

    const loadNUPs = async (page) => {
        try {
            const data = await fetchNUPs(page);
            setNups(data.nups);
            setTotalPages(Math.ceil(data.total / data.tamanho));
        } catch (error) {
            console.error('Erro ao carregar NUPs:', error);
        }
    };

    const handleSendBatch = async () => {
        try {
            const nupIds = nups.map((nup) => nup.nup);
            const result = await sendBatchToPeDePano(nupIds);

            const successLogs = result.sucesso.map((item) => ({
                success: true,
                message: `NUP ${item.nup} enviado com sucesso.`,
            }));

            const errorLogs = result.erros.map((item) => ({
                success: false,
                message: `Erro ao enviar NUP ${item.nup}: ${item.erro}`,
            }));

            setLogs([...logs, ...successLogs, ...errorLogs]);
            loadNUPs(currentPage);
        } catch (error) {
            console.error('Erro ao enviar lote:', error);
            setLogs([...logs, { success: false, message: 'Erro geral ao enviar lote.' }]);
        }
    };

    useEffect(() => {
        loadNUPs(currentPage);
    }, [currentPage]);

    return (
        <div className="dashboard">
            <h1>Chapolin - Gestão de Nups</h1>
            <NUPTable nups={nups} onSendBatch={handleSendBatch} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            <Logs logs={logs} />
        </div>
    );
};

export default Dashboard;
