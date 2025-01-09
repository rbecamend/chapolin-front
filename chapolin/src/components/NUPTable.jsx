import React, { useState } from 'react';
import { sendBatchToPeDePano } from '../services/api';

const NUPTable = ({ nups, setNups }) => {
    const [login, setLogin] = useState({ cpf: '', senha: '' });

    const handleSendBatch = async () => {
        try {
            const result = await sendBatchToPeDePano({
                login,
                listaNups: nups.map((nup) => nup.nup),
            });

            console.log('Resultado do envio:', result);

            // Atualizar os estados das NUPs com base no resultado
            const atualizados = nups.map((nup) => {
                if (result.sucesso.includes(nup.nup)) {
                    return { ...nup, estado: true }; // NUPs com sucesso são atualizados
                }
                return nup; // Os que falharam permanecem inalterados
            });

            setNups(atualizados);

            alert('Lote enviado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar lote:', error);
            alert('Erro ao enviar lote.');
        }
    };

    return (
        <div className="nup-table">
            <div className="table-container">
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>NUP</th>
                        <th>Estado</th>
                    </tr>
                    </thead>
                    <tbody>
                    {nups.map((nup) => (
                        <tr key={nup.id}>
                            <td>{nup.id}</td>
                            <td>{nup.nup}</td>
                            <td>{nup.estado ? 'Cadastrado' : 'Não Cadastrado'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="batch-settings">
                <input
                    type="text"
                    placeholder="CPF"
                    value={login.cpf}
                    onChange={(e) => setLogin({ ...login, cpf: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={login.senha}
                    onChange={(e) => setLogin({ ...login, senha: e.target.value })}
                />
            </div>
            <button className="send-button" onClick={handleSendBatch}>
                Enviar Lote
            </button>
        </div>
    );
};

export default NUPTable;
