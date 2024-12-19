const API_BASE_URL = 'http://localhost:3000/nups';

export const fetchNUPs = async (pagina = 1, tamanho = 100) => {
    const response = await fetch(`${API_BASE_URL}?pagina=${pagina}&tamanho=${tamanho}`);
    if (!response.ok) {
        throw new Error('Erro ao buscar NUPs');
    }
    return response.json();
};

export const sendBatchToPeDePano = async ({ login, listaNups}) => {
    const response = await fetch(`${API_BASE_URL}/enviar-lote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, listaNups }),
    });

    if (!response.ok) {
        throw new Error('Erro ao enviar lote para a API Pé-de-Pano');
    }

    return response.json();
};


