"use client";

import React from 'react'
import { useState } from 'react';

export default function EmailGenerator() {
    const [prompts, setPrompts] = useState(null);
    const [mainInput, setMainInput] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [company, setCompany] = useState('');
    const [solution, setSolution] = useState('');
    const [metric, setMetric] = useState('');

    async function addPrompt(name, role, company, solution, metric) {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/email`, {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                role: role,
                company: company,
                solution: solution,
                metric: metric,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            const json = await res.json();
            const copy = [...prompts, json]
            setPrompts(copy)
        }
    }

    async function submitPrompt() {

    }

    function handleMainInputChange(e) {
        setMainInput(e.target.value)
        console.log(e.target.value);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            if (mainInput.length > 0) {
                addPrompt(mainInput);
                setMainInput('');
            }
        }
    }

    return (
        <div>
            <div>Email Generation Tool</div>
            <div>
                <p>I would like to draft an email to</p>
                <input type="text" placeholder="Enter name" value={name} className="input input-bordered w-full max-w-xs" onChange={(e) => handleMainInputChange(e)} onKeyDown={handleKeyDown} />
                <p>the</p>
                <input type="text" placeholder="Enter role" value={role} className="input input-bordered w-full max-w-xs" onChange={(e) => handleMainInputChange(e)} onKeyDown={handleKeyDown} />
                <p>at</p>
                <input type="text" placeholder="Enter company" value={company} className="input input-bordered w-full max-w-xs" onChange={(e) => handleMainInputChange(e)} onKeyDown={handleKeyDown} />
                <p>regarding using</p>
                <input type="text" placeholder="Enter solution" value={solution} className="input input-bordered w-full max-w-xs" onChange={(e) => handleMainInputChange(e)} onKeyDown={handleKeyDown} />
                <p>to</p>
                <input type="text" placeholder="Enter metric" value={metric} className="input input-bordered w-full max-w-xs" onChange={(e) => handleMainInputChange(e)} onKeyDown={handleKeyDown} />
            </div>
            <button onClick={() => submitPrompt()} className="btn">Submit Prompt</button>
        </div>
    )
}