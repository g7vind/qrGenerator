const input = document.getElementById('qr-text');
const btn = document.getElementById('generate-btn');
const divi = document.querySelector('.qr-part'); // Use querySelector to select the .qr-part directly
let isGenerated = false;
var prevData = null;
btn.addEventListener('click', () => {
  const data = input.value.trim();
  let qrSrc = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
  if (data.length > 0) {
    if (prevData == null) {
      prevData = data;
    }
    if (data == prevData && isGenerated) {
      alert("Qr already generated for this text");
    } else {
      divi.classList.add("active");
      divi.innerHTML = '';
      qrSrc += data;
      const qrimg = document.createElement('img');
      qrimg.src = qrSrc;
      qrimg.alt = "QR Code";
      divi.appendChild(qrimg);
      const downBtn = document.createElement('button');
      downBtn.textContent = "Download";
      downBtn.id = "download-btn";
      divi.appendChild(downBtn);
      const dwnBtn = document.getElementById('download-btn');
      dwnBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = qrimg.src;
        link.download = "qr.png";
        fetch(qrimg.src)
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            link.href = url;
            link.click();
            window.URL.revokeObjectURL(url);
          });
      });
      prevData = data;
      isGenerated = true;
    }
  } else {
    alert("please enter some text to generate");
  }
});

input.addEventListener('keyup', () => {
  if (input.value.length === 0) {
    divi.classList.remove("active");
    divi.innerHTML = '';
    isGenerated = false;
  }
});
