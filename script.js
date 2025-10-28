function openLink(url) {
  window.open(url, "_blank");
}

function openInfoPage() {
  const newWindow = window.open("", "_blank");
  newWindow.document.write(`
    <html lang="ar" dir="rtl">
    <head>
      <title>معلومات كابو</title>
      <style>
        body {
          background: linear-gradient(135deg, #000000, #1a1a1a);
          color: white;
          font-family: "Tajawal", sans-serif;
          text-align: center;
          padding: 50px;
        }
        h2 {
          color: #ffcc00;
          text-shadow: 0 0 10px #ffcc00;
        }
        p {
          font-size: 1.2em;
          line-height: 1.8;
        }
        button {
          margin-top: 20px;
          padding: 10px 20px;
          background: #ffcc00;
          color: black;
          border: none;
          border-radius: 10px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }
        button:hover {
          background: #ffaa00;
          transform: scale(1.1);
        }
      </style>
    </head>
    <body>
      <h2>اهلا وسهلا بكم في موقع كابو اليوتيوبر 🎬</h2>
      <p>الموقع دا مخصص للتعريف الشخصي.<br>
      برجاء الاشتراك في القنوات لمتابعة المزيد من الشرح 💛</p>
      <button onclick="window.close()">🔙 رجوع</button>
    </body>
    </html>
  `);
}