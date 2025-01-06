import React from 'react';

const Logs = ({ logs }) => {
    return (
        <div className="logs-container">
            <h2>Logs</h2>
            <ul>
                {logs.map((log, index) => (
                    <li key={index} className={log.success ? 'success-log' : 'error-log'}>
                        {log.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Logs;

