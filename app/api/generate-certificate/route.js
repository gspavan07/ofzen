import path from "path";
import fs from "fs";
import QRCode from "qrcode";
import puppeteer from "puppeteer";

export async function POST(request) {
  try {
    const {
      name,
      role,
      certId,
      issueDate,
      format = "data",
    } = await request.json();

    // Generate QR code
    const verifyUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/verify?id=${certId}`;
    const qrCodeUrl = await QRCode.toDataURL(verifyUrl, {
      width: 200,
      margin: 1,
      color: { dark: "#000000", light: "#FFFFFF" },
    });

    if (format === "data") {
      return Response.json({
        name,
        role,
        certId,
        issueDate,
        qrCodeUrl,
      });
    }

    const certificateHTML = `
    <!DOCTYPE html>
<html>
<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .bg {
      position: absolute;
      width: 1700px;
      overflow: hidden;
    }
    .certificate {
      background: transparent;
      padding: 60px;
      height: 88vh;
      width: 100%;
      text-align: center;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .logo {
      width: 230px;
      height: auto;
      position: absolute;
      top: 95px;
      left: 80px;

    }
    .msme_logo {
      width: 180px;
      height: auto;
      position: absolute;
      top: 60px;
      right: 80px;
    }
    .title {
      text-transform: uppercase;
      color: #34495e;
      font-size: 50px;
      margin: 0;
      font-weight: bold;
      font-family: 'EB Garamond', serif;
    }
    .subtitle {
      text-transform: uppercase;
      color: #000;
      font-weight: bolder;
      font-size: 40px;
      margin: 10px 0 20px 0;
      font-family: 'EB Garamond', serif;
    }
    .name {
      font-size: 42px;
      font-weight: bold;
      margin: 10px 0;
      font-family: 'Playfair Display', serif;
    }
    .desc {
      font-size: 18px;
      color: #34495e;
      width: 65%;
      text-align: center;
      margin: 30px 0;
    }
    .footer {
      position: absolute;
      bottom: 20px;
      color: #7f8c8d;
      font-size: 16px;
    }
      .sign img {
      position: absolute;
      width: 110px;
      right: 130px;
      bottom: 180px;
    }

    .sign_name {
      position: absolute;
      right: 110px;
      bottom: 130px;
      font-size: 20px;
      color: #2c3e50;
      font-weight: bold;
    }

    .sign p {
      position: absolute;
      right: 110px;
      bottom: 110px;
      font-size: 16px;
      color: #5b5c5d;
    }
    .cert-id {
      position: absolute;
      bottom: 40px;
      right: 80px;
      color: #bdc3c7;
      font-size: 14px;
    }
    .verify {
      position: absolute;
      bottom: 40px;
      left: 135px;
      color: #bdc3c7;
      font-size: 14px;
    }
    .cert-id {
      position: absolute;
      bottom: 40px;
      right: 80px;
      color: #bdc3c7;
      font-size: 14px;
    }
    .qr-code {
      position: absolute;
      bottom: 60px;
      left: 80px;
      width: 200px;
      height: 200px;
    }
  </style>
</head>
<body>
  <img class="bg" src="data:image/png;base64,${fs
    .readFileSync(path.join(process.cwd(), "public/Ofzen-CERT.png"))
    .toString("base64")}" alt="company_logo">
    <img class="msme_logo" src="data:image/png;base64,${fs
      .readFileSync(path.join(process.cwd(), "public/msme_logo.png"))
      .toString("base64")}" alt="msme_logo">
  <div class="certificate">
    <img class="logo" src="data:image/png;base64,${fs
      .readFileSync(path.join(process.cwd(), "public/logo.png"))
      .toString("base64")}" alt="">
    <div class="title">Internship Completion</div>
    <p class="subtitle">Certificate</p>
    <p style="font-size: 20px; color: #34495e; margin: 30px 0 10px 0;">
      This is to certify that
    </p>
    <div class="name">${name}</div>
    <p class="desc">
      Has successfully completed an internship as ${role}, exhibiting strong technical
      proficiency and a keen understanding of modern web technologies. Their contributions reflected
      professionalism, problem-solving ability, and attention to detail.
    </p>
    <div class="footer">
      <p><strong>Issue Date:</strong> ${issueDate}</p>
      <p style="margin-top: 10px; font-style: italic;">
        "Excellence in Digital Innovation"
      </p>
    </div>
    <div class="sign">
      <img src="data:image/png;base64,${fs
        .readFileSync(path.join(process.cwd(), "public/CTOSIGN.png"))
        .toString("base64")}" alt="cto signature">
      <h2 class="sign_name">Pavan Gollapalli</h2>
      <p>CTO, Ofzen</p>
    </div>
    <img src="${qrCodeUrl}" class="qr-code" alt="QR Code" />
    <div class="cert-id">Certificate ID: ofzen-cert-${certId}</div>
    <div class="verify">Scan To Verify</div>
  </div>
</body>
</html>`;

    if (format === "pdf") {
      const browser = await puppeteer.launch({ 
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      });
      const page = await browser.newPage();
      await page.setContent(certificateHTML);
      await page.setViewport({ width: 1200, height: 800 });

      const pdfBuffer = await page.pdf({
        width: "1200px",
        height: "800px",
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        pageRanges: "1",
      });

      await browser.close();

      return new Response(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="ofzen-cert-${certId}.pdf"`,
        },
      });
    }

    return new Response(certificateHTML, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.error("Certificate generation error:", error);
    return Response.json(
      { error: "Failed to generate certificate" },
      { status: 500 }
    );
  }
}
