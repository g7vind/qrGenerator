const input = document.getElementById('qr-text');
const btn = document.getElementById('generate-btn');
const divi = document.querySelector('.qr-part');
let isGenerated = false;
let prevData = null;

btn.addEventListener('click', () => {
  const data = input.value.trim();

  if (data.length > 0) {
    divi.classList.add("active");
    divi.classList.remove("exit");
    divi.innerHTML = '';
    
    if (prevData === null || data !== prevData) {
      const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`;
      const qrimg = document.createElement('img');
      qrimg.src = qrSrc;
      qrimg.alt = "QR Code";
      divi.appendChild(qrimg);
      const downBtn = document.createElement('button');
      downBtn.textContent = "Download";
      downBtn.id = "download-btn";
      divi.appendChild(downBtn);
      downBtn.addEventListener('click', () => {
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
    alert("Please enter some text to generate");
  }
});

input.addEventListener('keyup', () => {
  if (input.value.length === 0) {
    divi.classList.remove("active");
    divi.classList.add("exit");
    setTimeout(() => {
      divi.innerHTML = '';
    }, 300);
    isGenerated = false;
  }
});
