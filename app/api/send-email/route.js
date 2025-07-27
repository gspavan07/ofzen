import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    const { name, email, role, certId, issueDate, type, subject, message } =
      await request.json();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        ${message.replace(/\n/g, "<br>")}
      </div>
    `;

    if (type === "completion") {
      // Generate certificate PDF
      const certResponse = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/generate-certificate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            role,
            certId,
            issueDate,
            format: "pdf",
          }),
        }
      );

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html: htmlContent,
        attachments: certResponse.ok
          ? [
              {
                filename: `ofzen-cert-${certId}.pdf`,
                content: await certResponse.arrayBuffer(),
                contentType: "application/pdf",
              },
            ]
          : [],
      };

      await transporter.sendMail(mailOptions);
      return Response.json({ success: true });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
