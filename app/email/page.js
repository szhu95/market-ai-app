"use client";

import React from 'react'
import { useState } from 'react';

export default function EmailGenerator() {
    const [prompts, setPrompts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [company, setCompany] = useState('');
    const [solution, setSolution] = useState('');
    const [metric, setMetric] = useState('');

    async function addPrompt(name, role, company, solution, metric) {
        setPrompts('');
        setLoading(true);
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/prompts`, {
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
            setLoading(false);
            setPrompts(json);
            setName('');
            setRole('');
            setCompany('');
            setSolution('');
            setMetric('');
        }
    }

    function handleNameChange(e) {

        setName(e.target.value)
        console.log(e.target.value);
    }


    function handleRoleChange(e) {

        setRole(e.target.value)
        console.log(e.target.value);
    }

    function handleCompanyChange(e) {

        setCompany(e.target.value)
        console.log(e.target.value);
    }

    function handleSolutionChange(e) {

        setSolution(e.target.value)
        console.log(e.target.value);
    }

    function handleMetricChange(e) {

        setMetric(e.target.value)
        console.log(e.target.value);
    }

    return (
        <div>
            <div>Email Generation Tool</div>
            <div>
                <p>I would like to draft an email to</p>
                <input type="text" placeholder="Enter name" value={name} className="input input-bordered w-full max-w-xs" onChange={(e) => handleNameChange(e)} />
                <p>the</p>
                <input type="text" placeholder="Enter role" value={role} className="input input-bordered w-full max-w-xs" onChange={(e) => handleRoleChange(e)} />
                <p>at</p>
                <input type="text" placeholder="Enter company" value={company} className="input input-bordered w-full max-w-xs" onChange={(e) => handleCompanyChange(e)} />
                <p>regarding using</p>
                <input type="text" placeholder="Enter solution" value={solution} className="input input-bordered w-full max-w-xs" onChange={(e) => handleSolutionChange(e)} />
                <p>to</p>
                <input type="text" placeholder="Enter metric" value={metric} className="input input-bordered w-full max-w-xs" onChange={(e) => handleMetricChange(e)} />
            </div>
            {loading == false ? <button onClick={() => addPrompt(name, role, company, solution, metric)} className="btn">Submit Prompt</button> : <button className="btn">
                <span className="loading loading-spinner"></span>
                loading
            </button>}
            {prompts == null ? '' : <div>{JSON.stringify(prompts?.email)}</div>}
        </div>
    )
}