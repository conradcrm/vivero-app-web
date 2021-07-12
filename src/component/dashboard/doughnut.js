import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function Doughnuts({ dataModule, module }) {

    let tags = dataModule.map(item => item.module)
    let total = dataModule.map(item => item.total)
    let back;
    if("categorias"!== module){
        back =[
            '#AF6384',
            '#BF6384',
            '#FF6281',
            '#46A2EB',
            '#RFCE56',
            '#CFCE56',
            '#DF6384',
            '#56A2EB',
            '#EFCE56',
            '#36A2EB',
            '#AFFE36',
            '#36324B',
            '#56A2EB',
            '#EFCE56',
            '#36A2EB',
            '#AFFE36',
            '#36324B',
        ]
    }
    else{
        back =[
            '#FF6384',
            '#BF6384',
            '#36A2EB',
            '#AFCE56',
            '#34CE56',
            '#2F6384',
            '#36A2EB',
            '#AFCE56',
            '#FFCE56',
            '#36324B',
            '#36324B',
            '#36324B',
            '#36324B',
            '#36A2EB',
            '#AFCE56',
            '#34CE56',
            '#2F6384',
            '#36A2EB',
            '#AFCE56',
            '#FFCE56',
            '#36324B',
            '#36324B',
            '#36324B',
            '#36324B',
        ]  
    }
    const data = {
        labels: tags,
        datasets: [{
            data: total,
            backgroundColor: back,
            hoverBackgroundColor: back
        }]
    };

    return (
        <div className="my-6 bg-white">
            <Doughnut data={data} />
        </div>
    );
}
