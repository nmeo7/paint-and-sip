'use client'

import Image from "next/image";
import logo from './images/logo.png'
import axios from "axios";
import { useState } from "react";
import { styled } from "styled-components";

const Menu1 = styled.div`
transform: rotate(90deg);
width: 100vh; height: 64px; background: #dfe; position: fixed; 
top: 0; left: 100%; transform-origin: left top; padding: 24px;
display: flex;
gap: 16px;
@media only screen and (max-width: 720px) {
  transform: rotate(0);
  width: 100%; height: 100%;
  top: 0; left: 0; flex-direction: column; align-items: center;
  display: none;
  &.opened {
    display: flex;
  }
}
`

const Spacer = styled.div`
display: none;
@media only screen and (max-width: 720px) {
  flex: 3;
  display: block;  
}
`

export default function Home() {

  const [prompt, setPrompt] = useState('')

  const generateImage = async (prompt: string) => {
    console.log('sending prompt...', prompt)
    if (!prompt) return;
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt: prompt,
          n: 1,  // Number of images to generate
          size: '1024x1024',  // Image size
        },
        {
          headers: {
            'Authorization': `Bearer `,
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Extract image URL from response
      const imageUrl = response.data.data[0].url;
      console.log('Image URL:', imageUrl);
    } catch (error) {
      // console.error('Error generating image:', error.response ? error.response.data : error.message);
    }
  };

  return ( 
    <div style={{ margin: 'auto' }} >
      <img alt='' style={{ width: '100%' }} src={logo.src} />
      <div style={{ display: 'flex', gap: '32px', padding: '32px 64px', placeContent: 'center', maxWidth: '100%', overflowX: 'auto' }} >
        <div>
          <img alt='' style={{ borderRadius: '50%', width: '96px', height: '96px', objectFit: 'cover', textAlign: 'center' }} src={logo.src} />
          <p style={{ textAlign: 'center' }}>🎨🖼️ Private</p>
        </div>
        <div>
          <img alt='' style={{ borderRadius: '50%', width: '96px', height: '96px', objectFit: 'cover', textAlign: 'center' }} src={logo.src} />
          <p style={{ textAlign: 'center' }}>🍸🍹 Bicu</p>
        </div>
        <div>
          <img alt='' style={{ borderRadius: '50%', width: '96px', height: '96px', objectFit: 'cover' , textAlign: 'center'}} src={logo.src} />
          <p style={{ textAlign: 'center' }}>☕ Soho</p>
        </div>
        <div>
          <img alt='' style={{ borderRadius: '50%', width: '96px', height: '96px', objectFit: 'cover', textAlign: 'center', border: '4px solid #7e7' }} src={logo.src} />
          <p style={{ textAlign: 'center' }}>👩‍🎨 Corporates</p>
        </div>
      </div>
      <div>
        <h2>Browse through our past events</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' , flexWrap: 'wrap', margin: 'auto' }} >
        {
          [1, 2, 3, 4, 5, 6, ].map((a, i) => <div key={a} style={{ padding: '16px', background: ['cyan', 'magenta', 'pink', 'thistle', 'teal', 'turquoise', 'violet'][i % 7], placeContent: 'center', display: 'grid', gridColumn: (i == 2 || i == 8) ? '1 / 3' : '', gridRow: (i == 3 ? '3 / 5' : '') || (i == 6 ? '5 / 7' : '') }} >
            <img alt='' width='240px' src={logo.src} />
            <div style={{ width: '240px' }} >
              <h3>{i}. Title of the event</h3>
              <p style={{ color: '#aaa' }} >Some details about the event like date and place, etc.</p>
            </div>
          </div>)
        }
        </div>
      </div>
      <div>
        <h2>Testimonials</h2>
        <div style={{ display: 'flex', gridTemplateColumns: '1fr 1fr', margin: 'auto', overflow: 'auto' }} >
        {
          [1, 2, 3, 4, 5, 6, ].map((a, i) => <div key={a} style={{ width: '100%', minWidth:'720px', padding: '16px', placeContent: 'center', display: 'grid',  gridColumn: (i == 2 || i == 8) ? '1 / 3' : '', gridRow: (i == 3 ? '3 / 5' : '') || (i == 6 ? '5 / 7' : '') }} >
            <img alt='' width='240px' src={logo.src} />
            <div style={{ width: '240px' }} >
              <h3 style={{ color: '#ccc', fontSize:'40px' }}>Client name</h3>
              <p style={{ color: '#aaa' }} >This was the best experience so far - also some tweets</p>
            </div>
          </div>)
        }
        {/* These comments will be tweets, or direct comments from customers */}
        </div>
      </div>
      <div id='about' style={{ display: 'grid', gridTemplateColumns: '1fr', placeContent: 'center', height: '100vh' }} >
        <h2>About</h2>
        <div >
          Paint & Sip is an event organized monthly and held at Bicu Lounge. We update/post on our IG page a week before our sessions so people can book their sessions so people can book their spots since they are limited.
        </div>
        <div>
          <img alt='richard & neza' />
        </div>
      </div>
      <div style={{ display: 'flex', height: '320px', alignItems: 'center', margin: '32px 64px', width: '960px' }} >
        <div style={{ flex: '1' }} >
          <h2 style={{ display: 'inline-block', padding: '16px', borderRadius: '16px', background: 'aliceblue' }} >
          {`Start your ADVENTURE >`}
          </h2>
          </div>
        <img alt='' src={logo.src} height='320px' />
      </div>
      <div  style={{ display: 'grid', gridTemplateColumns: '1fr', placeContent: 'center', height: '100vh' }} >
        <h2>Inspirations</h2>
        <div>
          <p>
<input placeholder="Integrated with GPT Dall'e to respond to your propmt" onChange={e => setPrompt(e.target.value)} />
          </p>
        <select>
          <option>Cheerful</option>
          <option>Calm</option>
          <option>Nature</option>
          <option>Futuristic</option>
          <option>Calm</option>
        </select>
        <button onClick={() => generateImage(prompt)} >send prompt</button>
        </div>
      </div>
      <div  style={{ display: 'grid', gridTemplateColumns: '1fr', placeContent: 'center', height: '240px', background: '#777' }} >
        Powered by nez.ai
        </div>
    </div>
  )
}
