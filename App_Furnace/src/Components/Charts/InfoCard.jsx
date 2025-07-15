import React from 'react';
import { Settings } from 'lucide-react';

const InfoCard = ({ machineData, onOpenRejectionForm }) => {
    const detailsData = [
        { label: 'Name', value: machineData.name },
        { label: 'Active', value: machineData.active ? '✓' : '✗' },
        { label: 'MAC ID', value: machineData.macId },
        { label: 'MAC No', value: machineData.macNo },
    ];

    return (
        <div className=" bg-white rounded-lg shadow-md p-2 border">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Machine details</h2>
                <button
                    onClick={onOpenRejectionForm}
                    className="flex justify-center text-red-500 items-center p-2 rounded-lg text-xs hover:text-red-700 transition-colors"
                >
                    <Settings className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-2 text-xs">
                {detailsData.map((detail, index) => (
                    <div key={index} className="flex border-b py-1">
                        <span className="w-1/3 text-gray-600 font-bold">{detail.label}:</span>
                        <span className="w-2/3">{detail.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoCard;