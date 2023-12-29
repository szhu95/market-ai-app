"use client";
import Image from 'next/image'
import { useState } from 'react';
import Link from 'next/link'

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/email" >Email Generator Tool</Link>
      <Link href="/social">Social Media Kudos Post Generator Tool</Link>
    </main>
  )
}
