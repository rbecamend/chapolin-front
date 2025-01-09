import React, { useState, useEffect } from 'react';
import { fetchNUPs, sendBatchToPeDePano } from '../services/api';
import Pagination from '../components/Pagination';
import NUPTable from '../components/NUPTable';
import Logs from '../components/Logs';

const Dashboard = () => {
    const [nups, setNups] = useState([]); // Lista de NUPs na página atual
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const [totalPages, setTotalPages] = useState(1); // Total de páginas
    const [logs, setLogs] = useState([]); // Logs de envio

    // Função para carregar NUPs do backend
    const loadNUPs = async (page) => {
        try {
            const data = await fetchNUPs(page); // Chamada da API para buscar NUPs
            setNups(data.nups);

            // Atualiza o total de páginas com base na resposta
            if (data.nups.length < 100) {
                setTotalPages(page);
            } else {
                setTotalPages((prev) => Math.max(prev, page + 1));
            }
        } catch (error) {
            console.error('Erro ao carregar NUPs:', error);
            setLogs((prevLogs) => [
                ...prevLogs,
                { success: false, message: 'Erro ao carregar NUPs.' },
            ]);
        }
    };

    // Função para enviar o lote de NUPs
    const handleSendBatch = async () => {
        try {
            const nupIds = nups.map((nup) => nup.nup); // Extrai os NUPs da página atual
            const result = await sendBatchToPeDePano({ listaNups: nupIds });

            // Gerar logs de sucesso
            const successLogs = result.sucesso.map((nup) => ({
                success: true,
                message: `NUP ${nup} enviado com sucesso.`,
            }));

            // Gerar logs de erro
            const errorLogs = result.erros.map((nup) => ({
                success: false,
                message: `Erro ao enviar NUP ${nup}.`,
            }));

            // Atualiza os logs e recarrega os NUPs
            setLogs((prevLogs) => [...prevLogs, ...successLogs, ...errorLogs]);
            loadNUPs(currentPage); // Recarrega a página atual após envio
        } catch (error) {
            console.error('Erro ao enviar lote:', error);
            setLogs((prevLogs) => [
                ...prevLogs,
                { success: false, message: 'Erro geral ao enviar lote.' },
            ]);
        }
    };

    // Carregar NUPs ao montar o componente e ao mudar de página
    useEffect(() => {
        loadNUPs(currentPage);
    }, [currentPage]);

    return (
        <div className="dashboard">
            <h1>Chapolin - Gestão de NUPs</h1>
            <NUPTable nups={nups} onSendBatch={handleSendBatch} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            <Logs logs={logs} />
        </div>
    );
};

export default Dashboard;
