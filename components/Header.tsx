'use client';
import React from 'react';

export default function Header() {
  return (
    <header id="site-header" className='header-container w-full bg-black text-green-400'>
      <a href='/' className="logo"> @itsbigfarl</a>
      {/* <div className="contact">+(856) BIG-FARL</div> */}
      <a className="contact" href="tel:+1 (205) 725-9940">(856) BIG-FARL.</a>
    </header>
  );
}
