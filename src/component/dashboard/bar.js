import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function BarStatistics({ compras }) {
    let total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    compras.map((compra) => total[compra.mes] = compra.total)

    let fecha_actual = new Date().getFullYear()

    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
            {
                label: 'Compras',
                backgroundColor: 'rgba(99,255,132,0.2)',
                borderColor: 'rgba(99,255,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(99,255,132,0.4)',
                hoverBorderColor: 'rgba(99,255,132,1)',
                data: total
            }
        ]
    };

    return (
        <div className="h-80 rounded-lg bg-white pt-4 pb-10 px-6">
            <h2 className="font-semibold font-poppins flex justify-between">
                <p className="">Gráfica de compras por meses</p>
                <span className="font-sans text-lg">{fecha_actual}</span>
            </h2>
            <Bar
                data={data}
                width={100}
                height={50}
                options={{
                    maintainAspectRatio: false
                }}
            />
        </div>
    );
}
