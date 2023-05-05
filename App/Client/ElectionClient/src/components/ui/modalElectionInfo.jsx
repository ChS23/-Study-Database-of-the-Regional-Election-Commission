import React, { useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {getCountCandidatsPartyFromElections} from '../../helpers/apiAnalytics';
import { useState } from 'react';


export default function ModalElectionInfo(props) {

    const { id, onClose } = props;
    const [countMembers, setCountMembers] = useState({});


    useEffect(() => {
        ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
        getCountCandidatsPartyFromElections(id).then((res) => {
            // console.log(res);
            if (res == null) {
                setCountMembers({});
            } else {
                setCountMembers(res);
            }
        });
        console.log(Object.keys(countMembers).length);
    }, [])


    const options = {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
        //   title: {
        //     display: true,
        //     text: 'Сколько участовало в выборах от каждой партии',
        //   },
        },
    };


    const labels = ['Единая Россия', 'КПРФ', 'ЛДПР', 'Народная партия', 'Партия Великое Отечество', 'Партия Роста', 'Российская объединенная демократическая партия', 'Справедливая Россия', 'Яблоко'];

    const data = () => {
        if (Object.keys(countMembers).length > 0) {
            return (
                {
                labels: labels,
                datasets: [
                {
                    label: 'Количество участников',
                    data: labels.map((label) => countMembers[label]),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                }
                ],
            })
        }
    }

    // if (Object.keys(countMembers).length > 0) { 
    //     const data = {
    //         labels: labels,
    //         datasets: [
    //             {
    //                 label: 'Количество участников',
    //                 data: labels.map((label) => countMembers[label]),
    //                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //                 borderColor: 'rgba(75, 192, 192, 1)',
    //             }
    //         ],
    //     }
    // }


    return (
        <div className={`fixed inset-0 ${id!=-1 ? '' : 'pointer-events-none'}`}>
            <div 
                className={`fixed inset-0 bg-black ${id!=-1 ? 'opacity-50' : 'pointer-events-none opacity-0'} transition-opacity duration-300 ease-in-out`} 
                onClick={onClose} 
            />
            
            <div className={`fixed right-0 h-full bg-gray-900 text-stone-200 shadow-lg w-full max-w-screen-sm p-4 ${id!=-1 ? 'opacity-100' : 'pointer-events-none opacity-0'} transition-opacity duration-300 ease-in-out`}>
                {countMembers.length > 0 ? <Bar data={data} options={options}/> : <div>Загрузка...</div>}
            </div>
        </div>
    )
}