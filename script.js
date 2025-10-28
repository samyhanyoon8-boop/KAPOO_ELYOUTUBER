// الحساب الأساسي للتليجرام (بدّل لو حابب)
const TELEGRAM_USERNAME = 'k_a_p_oo2'; // بدون @
const TELEGRAM_LINK_BASE = `https://t.me/${TELEGRAM_USERNAME}`;

/* فتح روابط عادية */
function openLink(url) {
  window.open(url, "_blank");
}

function openInfoPage() {
  const newWindow = window.open("", "_blank");
  newWindow.document.write(`
    <html lang="ar" dir="rtl">
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>معلومات كابو</title>
    <style>body{background:linear-gradient(135deg,#000,#1a1a1a);color:white;font-family:Tajawal;padding:40px;text-align:center}h2{color:#ffcc00}p{line-height:1.8}button{margin-top:20px;padding:10px 20px;background:#ffcc00;border-radius:10px;border:none;cursor:pointer}</style>
    </head>
    <body>
      <h2>اهلا وسهلا بكم في موقع كابو اليوتيوبر 🎬</h2>
      <p>الموقع دا مخصص للتعريف الشخصي.<br>برجاء الاشتراك في القنوات لمتابعة المزيد من الشرح 💛</p>
      <button onclick="window.close()">🔙 رجوع</button>
    </body></html>
  `);
  newWindow.document.close();
}

/* ---- فتح صفحة المتجر مع إمكانية تمرير id لفتح المودال مباشرة ----
   openStorePage()  -> يفتح صفحة المتجر عادية
   openStorePage('p_site') -> يفتح صفحة المتجر ثم يفتح مودال طلب المنتج p_site */
function openStorePage(productId) {
  const newWindow = window.open("", "_blank");

  // قائمة المنتجات (محدثة ومتوافقة مع أزرارك السريعة)
  const products = [
    { id: 'p_site', title: "طريقة عمل موقع", price: "15ج", qty: "" },
    { id: 'p_whatsapp', title: "رقم واتس", price: "9ج", qty: "" },
    { id: 'p_tusers', title: "يوزرات تلي", price: "15ج", qty: "" },
    { id: 'p_60pb', title: "60 شدة ايدي ببجي", price: "45ج", qty: "" },
    { id: 'p_azdhar', title: "ازدهار أول ايدي", price: "45ج", qty: "" },
    { id: 'p_topup', title: "شحن رصيد ونت (سعر حسب الشركة)", price: "سعر حسب الشركة", qty: "" },
    { id: 'p_app', title: "عمل تطبيق مجال", price: "15ج", qty: "" },
    { id: 'p_audit', title: "فحص أمني للقنوات (خدمة قانونية)", price: "20ج", qty: "" }
  ];

  // ندرج صفحة المتجر كاملة (مع سكربت داخلي يتحقق من location.hash لفتح منتج محدد)
  let html = `
  <html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>متجر كابو</title>
    <style>
      body{background:linear-gradient(135deg,#000,#1a1a1a);color:#fff;font-family:Tajawal;padding:20px;margin:0}
      .store-header{text-align:center}
      h1{color:#ffcc00;margin:6px 0 4px;text-shadow:0 0 12px #ffcc00}
      p.desc{color:#ddd;margin:0}
      .warning{background:rgba(255,50,50,0.06);border-left:4px solid #ffcc00;padding:12px;border-radius:8px;margin:12px 0;color:#ffdca8}
      .products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:18px;margin-top:16px}
      .card{background:rgba(255,255,255,0.03);border-radius:12px;padding:14px;box-shadow:0 8px 28px rgba(0,0,0,0.6);text-align:right}
      .card h3{color:#ffdd7a;margin:2px 0 8px}
      .price{font-weight:800;margin-bottom:6px}
      .qty{color:#ddd;font-size:0.95em;margin-bottom:10px}
      .buy-btn{display:inline-block;width:100%;padding:10px;background:#ffcc00;color:#000;border-radius:8px;text-decoration:none;text-align:center;font-weight:800;cursor:pointer}
      .buy-btn:hover{transform:translateY(-4px);box-shadow:0 10px 25px rgba(255,170,0,0.18)}
      .notes{color:#cfcfcf;text-align:center;margin-top:14px}
      .back{display:inline-block;margin-top:18px;padding:8px 14px;background:rgba(255,255,255,0.06);color:#fff;border-radius:8px;text-decoration:none}
      /* modal styles */
      .modal{position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,0.65);z-index:9999}
      .modal.show{display:flex}
      .modal-box{background:#111;padding:18px;border-radius:12px;width:94%;max-width:520px;position:relative}
      .modal-box h3{color:#ffcc00;margin:0 0 8px}
      .msg{background:rgba(255,255,255,0.03);padding:10px;border-radius:8px;word-break:break-word}
      .actions{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}
      .small-btn{padding:10px 12px;border-radius:8px;border:none;cursor:pointer;font-weight:700}
      .copy-btn{background:#ffcc00;color:#000}
      .open-btn{background:#ffaa00;color:#000}
      .try-btn{background:#444;color:#fff}
      .close-x{position:absolute;left:12px;top:10px;background:transparent;border:none;color:#fff;font-size:18px;cursor:pointer}
    </style>
  </head>
  <body>
    <div class="store-header">
      <h1>متجر كابو 🛒</h1>
      <p class="desc">اختر المنتج واضغط "شراء الآن" — سيتم تحويلك لحساب التليجرام الأساسي للتواصل وإتمام الطلب.</p>
    </div>

    <div class="warning">
      ⚠️ <strong>تحذير مهم:</strong> بعض الخدمات قد تكون حساسة. تأكد من القانون والمحافظة على الأخلاق. أي معاملات تتم عبر التليجرام هي بين البائع والمشتري ومسؤولية المستخدم.
    </div>

    <div class="products-grid">
  `;

  // توليد البطاقات
  products.forEach(prod => {
    html += `
      <div class="card">
        <h3>${escapeHtml(prod.title)}</h3>
        <div class="price">السعر: ${escapeHtml(prod.price)}</div>
        ${prod.qty ? `<div class="qty">${escapeHtml(prod.qty)}</div>` : ''}
        <div><button class="buy-btn" onclick="buyProduct('${escapeJs(prod.id)}')">🛒 شراء الآن</button></div>
      </div>
    `;
  });

  html += `
    </div>

    <div style="text-align:center;">
      <a class="back" href="#" onclick="window.close();return false;">🔙 اغلاق المتجر</a>
      <div class="notes">ملاحظة: الضغط على "شراء الآن" يفتح نافذة للنسخ والفتح للتواصل مع الحساب الأساسي.</div>
    </div>

    <!-- مودال -->
    <div id="modal" class="modal" aria-hidden="true">
      <div class="modal-box" role="dialog" aria-modal="true">
        <button class="close-x" onclick="closeModal()">✖</button>
        <h3>تأكيد الطلب</h3>
        <div class="msg" id="modalMsg">...</div>
        <div class="actions">
          <button class="small-btn copy-btn" id="copyBtn">📋 نسخ &amp; فتح التليجرام</button>
          <button class="small-btn open-btn" id="openBtn">🚀 حاول الإرسال تلقائيًا</button>
          <button class="small-btn try-btn" id="cancelBtn" onclick="closeModal()">إلغاء</button>
        </div>
        <div style="margin-top:10px;color:#ddd;font-size:0.95em">إذا لم يُرسل النص تلقائيًا، الصق الرسالة في محادثة التليجرام ثم أرسلها.</div>
      </div>
    </div>

    <script>
      // المنتجّات المتطابقة داخل نافذة المتجر
      const PRODUCTS = ${JSON.stringify(products)};

      const TELEGRAM_USERNAME = '${TELEGRAM_USERNAME}';
      const TELEGRAM_LINK_BASE = 'https://t.me/' + TELEGRAM_USERNAME;

      function escapeHtmlInner(s){ return (s||'').toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

      // فتح المودال مع تجهيز الرسالة
      function buyProduct(prodId){
        const prod = PRODUCTS.find(p => p.id === prodId);
        if(!prod) return;
        const displayMsg = 'طلب منتج من متجر كابو\\nالمنتج: ' + prod.title + '\\nالسعر: ' + prod.price + '\\nالمرسل: [ضع اسمك هنا أو رقمك]';
        document.getElementById('modalMsg').textContent = displayMsg;
        document.getElementById('modal').classList.add('show');

        document.getElementById('copyBtn').onclick = async function(){
          try {
            await navigator.clipboard.writeText(displayMsg.replace(/\\n/g,'\\n'));
            window.open(TELEGRAM_LINK_BASE, '_blank');
          } catch(e){
            window.open(TELEGRAM_LINK_BASE + '?text=' + encodeURIComponent(displayMsg), '_blank');
          }
        };

        document.getElementById('openBtn').onclick = function(){
          const urlWithText = TELEGRAM_LINK_BASE + '?text=' + encodeURIComponent(displayMsg);
          window.open(urlWithText, '_blank');
        };
      }

      function closeModal(){
        document.getElementById('modal').classList.remove('show');
      }

      // إذا فتحنا الصفحة مع هاش (#p_site مثلا) - افتح مباشرة مودال المنتج
      window.addEventListener('DOMContentLoaded', function(){
        try {
          const h = (location.hash || '').replace('#','');
          if(h) {
            // مدّة صغيرة عشان العناصر يتعرضوا أولًا
            setTimeout(function(){
              buyProduct(h);
            }, 250);
          }
        } catch(e){}
      });

      // دوال مساعدة
      function escapeHtml(s){ return (s||'').toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
    </script>

  </body>
  </html>
  `;

  newWindow.document.write(html);
  newWindow.document.close();

  // لو فيه productId، نضع هاش علشان صفحة المتجر تشغّل المودال مباشرة
  if (productId) {
    try {
      // وضع الهَاش بعد كتابة المحتوى
      newWindow.location.hash = productId;
    } catch(e) {
      // أحيانًا المتصفح يمنع التعديل الفوري - لكن عادة يعمل
    }
  }
}

/* دوال مساعدة للصفحة الرئيسية (escape) */
function escapeHtml(text){
  if (!text) return '';
  return String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function escapeJs(text){
  if (!text) return '';
  return String(text).replace(/'/g,"\\'").replace(/"/g,'\\"').replace(/\\n/g,' ').replace(/\\r/g,' ');
}
