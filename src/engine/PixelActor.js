// PixelActor.js
// Menggambar karakter bergaya pixel (blocky) langsung lewat Graphics API,
// jadi project bisa langsung jalan tanpa perlu file sprite eksternal dulu.
// Nanti file ini bisa diganti untuk load spritesheet PNG asli (lihat README).

export default function drawPixelActor(scene, x, y, { skin = 0xffcf9e, outfit = 0x2b6fb3, hair = 0x3a2a1a, scale = 4 } = {}) {
  const g = scene.add.graphics({ x, y });
  const px = scale; // ukuran 1 "pixel" blok

  const blocks = [
    // [col, row, warna]  -- grid 8x10 sederhana bentuk karakter chibi
    [3, 0, hair], [4, 0, hair],
    [2, 1, hair], [3, 1, skin], [4, 1, skin], [5, 1, hair],
    [2, 2, hair], [3, 2, skin], [4, 2, skin], [5, 2, hair],
    [3, 3, skin], [4, 3, skin],
    [2, 4, outfit], [3, 4, outfit], [4, 4, outfit], [5, 4, outfit],
    [2, 5, outfit], [3, 5, outfit], [4, 5, outfit], [5, 5, outfit],
    [2, 6, outfit], [5, 6, outfit],
    [2, 7, 0x222222], [3, 7, outfit], [4, 7, outfit], [5, 7, 0x222222],
    [2, 8, 0x111111], [5, 8, 0x111111],
  ];

  blocks.forEach(([col, row, color]) => {
    g.fillStyle(color, 1);
    g.fillRect(col * px, row * px, px, px);
  });

  return g;
}
