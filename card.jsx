import React from 'react';
import { createRoot } from 'react-dom/client';
import HoloCard from './vendor/react-bits/HoloCard.jsx';

createRoot(document.getElementById('card-root')).render(
  <HoloCard
    image="./vendor/react-bits/mew.webp"
    alt="Mew holographic card"
    preset="glitter"
    foilColor="#e2e6ec"
    intensity={0.85}
    scale={1}
    edgeSparkle={0.8}
    frame={4}
    glare={0.5}
    tiltMax={14}
    hoverScale={1.04}
    radius={14}
    width={320}
    idle
    shadow
  />
);
