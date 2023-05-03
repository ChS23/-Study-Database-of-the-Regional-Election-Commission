import React, {useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {getGroupAgeInParty} from '../../helpers/apiAnalytics';
import Select from 'react-select';
import {updatePartyDict} from '../../helpers/apiCandidates';


export default function AgeGroupPie() {

    const [data, setData] = useState([]);
    const [partyDict, setPartyDict] = useState([]);

    useEffect(() => {
        ChartJS.register(ArcElement, Tooltip, Legend);
        updatePartyDict().then((res) => {
            setPartyDict(res);
        })
        // handleChange({label: '', value: '1'})
        console.log(data);
    }, [])


    async function handleChange (e) {
        const res = await getGroupAgeInParty(e.value);
        console.log(res);
        setData (
            {
                labels: Object.keys(res),
                datasets: [
                    {
                        label: 'Всего человек',
                        data: Object.values(res),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1,
                    }
                ]
            }
        )
        console.log(data);
    }

    return (
        <div className='w-full h-full'>
            <div className='flex flex-wrap text-stone-200 text-lg ml-10 items-center'>
                {/* choise input party select */}
                <span>Выберите партию:</span>
                <Select
                    className='w-64 ml-4'
                    onChange={handleChange} 
                    options={partyDict}
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            backgroundColor: 'transparent',
                            color: 'white',
                          }),
                        menu: (provided, state) => ({
                          ...provided,
                          maxHeight: "auto",
                          overflowY: "auto",
                          color: "black",
                          opacity: 1,
                        }),
                        singleValue: (provided, state) => ({
                            ...provided,
                            color: 'white',
                            border: 'none',
                        }),
                    }
                    }
                />
            </div>
            {/* centered pie */}
            <div className='flex justify-center items-center text-stone-200 mb-14'>
                {data.length <2 ? <div>Партия не выбрана</div> : <Pie data={data} options={
                    {
                        width: 800,
                        height: 600,
                        responsive: false,
                        plugins: {
                          legend: {
                            position: "right",
                          },
                        }
                    }
                } className=''/>}
            </div>
        </div>
    );
}