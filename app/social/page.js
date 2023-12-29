"use client";

import React from 'react'
import { useState } from 'react';

export default function SocialMediaGenerator() {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [achievement, setAchievement] = useState('');
    const [metric, setMetric] = useState('');

    async function addPost(name, company, achievement, metric) {
        if (name == '' || company == '' || achievement == '' || metric == '') {
            return;
        }
        setPosts('');
        setLoading(true);
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/socials`, {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                company: company,
                achievement: achievement,
                metric: metric,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            const json = await res.json();
            // const copy = [...posts, json]
            setLoading(false);
            setPosts(json)
            setName('');
            setCompany('');
            setAchievement('');
            setMetric('');
        }
    }

    function handleNameChange(e) {

        setName(e.target.value)
        console.log(e.target.value);
    }

    function handleCompanyChange(e) {

        setCompany(e.target.value)
        console.log(e.target.value);
    }

    function handleAchievementChange(e) {

        setAchievement(e.target.value)
        console.log(e.target.value);
    }

    function handleMetricChange(e) {

        setMetric(e.target.value)
        console.log(e.target.value);
    }

    return (
        <div>
            <div className="header"><b>Kudos Post Generation Tool</b></div>
            <div>
                <p><b>Prompt: </b></p>
                <p>I would like to draft a social media post to highlight
                    <input type="text" placeholder="Enter name" value={name} className="input input-bordered w-full max-w-xs" onChange={(e) => handleNameChange(e)} />
                    at
                    <input type="text" placeholder="Enter company" value={company} className="input input-bordered w-full max-w-xs" onChange={(e) => handleCompanyChange(e)} />
                    for accomplishing
                    <input type="text" placeholder="Enter achievement" value={achievement} className="input input-bordered w-full max-w-xs" onChange={(e) => handleAchievementChange(e)} />
                    by
                    <input type="text" placeholder="Enter metric" value={metric} className="input input-bordered w-full max-w-xs" onChange={(e) => handleMetricChange(e)} />
                </p>
            </div>
            {loading == false ? <button onClick={() => addPost(name, company, achievement, metric)} className="btn">Submit Prompt</button> : <button className="btn">
                <span className="loading loading-spinner"></span>
                loading
            </button>}
            {posts == null || loading == true  ? '' : <div className="response">{String(posts?.post)}</div>}
        </div>
    )
}