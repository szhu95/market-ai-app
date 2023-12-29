"use client";
import Image from 'next/image'
import { useState } from 'react';
import Link from 'next/link'

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/email" className="focus:bg-primary-blue focus:text-white hover:bg-primary-blue hover:text-white">Email Generator Tool</Link>
      <Link href="/social" className="padding-x focus:bg-primary-blue focus:text-white hover:bg-primary-blue hover:text-white">Social Media Post Generator Tool</Link>
    </main>
  )
}
