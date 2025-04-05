import React from "react";

interface TableProps {
    data: Array<Record<string, any>>;
    columns: string[];
}

export const Table: React.FC<TableProps> = ({ data, columns }) => {
    return (
        <table>
            <thead>
            <tr>
                {columns.map((column, index) => (
                    <th key={index}>{column}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {columns.map((column, colIndex) => (
                        <td key={colIndex}>{row[column]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};