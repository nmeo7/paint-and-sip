'use client';

import "./globals.css";
import Link from "next/link";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import logo from './images/logo.png'
import { AppProps } from "next/app";

interface ContextType {
  opened: Boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

// Create the context with `null` as the initial value
const MyContext = createContext<ContextType | null>(null);

export default function RootLayout({ Component, pageProps }: AppProps) {
  const [opened, setOpened] = useState(false)

  const handleToggle = () => setOpened(!!opened)

  return (
    <div>
    <div style={{ position: 'fixed', width: '100%', height: '100vh', overflowY: 'auto' }} >
        <MyContext.Provider value={{ opened, setOpened } }>
      <div style={{  textAlign: 'center', paddingTop: '32px' }} >
        <img alt='' src={logo.src} />
      </div>
    <div className={`menu ${opened ? ' opened' : ''}`}  >
      <div className='spacer'/>
      <div> <Link href='/' ><img alt='' width='24px' height='24px' src={logo.src} /></Link></div>
      <div style={{ flex: '1' }} ><Link href='/hello' >EVENTS</Link></div>
      <div style={{ flex: '1' }} ><Link href='/hello' >INSPIRATIONS</Link></div>
      <div style={{ flex: '1' }} ><Link href='/hello' >BOOKING</Link></div>
      <div style={{ display: 'flex', gap: '16px' }} ><Link href='/#about' >ABOUT</Link> 
      <Link href='/#about'><img alt='' width='24px' height='24px' src={logo.src} /></Link>
      <Link href='/#about'><img alt='' width='24px' height='24px'  src={logo.src} /></Link>
      <Link href='/#about'><img alt='' width='24px' height='24px'  src={logo.src} /></Link>
      </div>
      <div className='spacer'/>
    </div>
    <span className='hamburger' onClick={handleToggle}>
          <span className={`hamburgerIcon ${opened ? ' active' : ''}`} />
          <span className={`hamburgerIcon ${opened ? ' active' : ''}`} />
          <span className={`hamburgerIcon ${opened ? ' active' : ''}`} />
        </span>
        {<Component {...pageProps} />}
        </MyContext.Provider></div></div>
  );
}
