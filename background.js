    (() => {
      const canvas = document.getElementById('chroma-canvas');
      const ctx = canvas.getContext('2d');
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const pointer = { x: .5, y: .5, active: false };
      const colors = [[120, 85, 255], [208, 106, 255], [255, 116, 205], [103, 220, 255]];
      let width = 0;
      let height = 0;
      let dpr = 1;

      function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      function blend(index, time) {
        const a = colors[((index % colors.length) + colors.length) % colors.length];
        const b = colors[(((index + 1) % colors.length) + colors.length) % colors.length];
        const mix = (Math.sin(time * .00032 + index * 1.8) + 1) * .5;
        return [a[0] * (1 - mix) + b[0] * mix, a[1] * (1 - mix) + b[1] * mix, a[2] * (1 - mix) + b[2] * mix];
      }

      function draw(time) {
        const t = reducedMotion ? 0 : time;
        ctx.fillStyle = '#080912';
        ctx.fillRect(0, 0, width, height);
        const gap = Math.max(7, Math.min(9, width / 145));
        const columns = Math.ceil(width / gap) + 2;
        const rows = Math.ceil(height / gap) + 2;
        for (let row = -1; row < rows; row += 1) {
          const y = row * gap;
          for (let column = -1; column < columns; column += 1) {
            const x = column * gap;
            let intensity = .14;
            for (let stream = 0; stream < 4; stream += 1) {
              const center = height * (.2 + stream * .2) + Math.sin(x * .006 + t * .00042 + stream * 2.2) * (38 + stream * 10) + Math.sin(x * .002 - t * .0002) * 25;
              intensity += Math.max(0, 1 - Math.abs(y - center) / (38 + stream * 10)) * (.82 - stream * .05);
            }
            if (pointer.active) {
              const distance = Math.hypot(x - pointer.x * width, (y - pointer.y * height) * .72);
              intensity += Math.max(0, 1 - distance / 240) * .18;
            }
            intensity = Math.min(1, intensity);
            const color = blend(Math.floor((column + row) / 20), t);
            ctx.beginPath();
            ctx.fillStyle = `rgba(${color[0] | 0}, ${color[1] | 0}, ${color[2] | 0}, ${.18 + intensity * .82})`;
            ctx.arc(x, y, .75 + intensity * 2.05, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        if (!reducedMotion) requestAnimationFrame(draw);
      }

      window.addEventListener('resize', resize);
      window.addEventListener('pointermove', event => { pointer.x = event.clientX / width; pointer.y = event.clientY / height; pointer.active = true; }, { passive: true });
      resize();
      draw(0);
    })();
