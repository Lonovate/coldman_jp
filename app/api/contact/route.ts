import nodemailer from "nodemailer";

type ContactBody = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  subService: string;
  message?: string;
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function buildCustomerEmail(data: ContactBody): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f4f4f4; }
    .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 30px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 24px; }
    .body { padding: 30px; }
    .body h2 { color: #1e3a8a; font-size: 20px; margin-top: 0; }
    .body p { color: #555; line-height: 1.6; font-size: 15px; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 25px 0; }
    .footer { background: #f9fafb; padding: 20px 30px; text-align: center; color: #9ca3af; font-size: 13px; }
    .highlight { color: #2563eb; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Coldman JP</h1>
    </div>
    <div class="body">
      <h2>Thank you for contacting us, ${data.firstName}!</h2>
      <p>
        We have received your service request for <span class="highlight">${data.service} - ${data.subService}</span>.
        A team member will be reaching out to you shortly to assist you.
      </p>
      <p>
        If you need immediate assistance, feel free to call us at <span class="highlight">(787) 525-6934</span>
        or send us a WhatsApp message.
      </p>
      <p>Thank you for choosing Coldman JP!</p>

      <hr class="divider" />

      <h2>Gracias por contactarnos, ${data.firstName}!</h2>
      <p>
        Hemos recibido tu solicitud de servicio para <span class="highlight">${data.service} - ${data.subService}</span>.
        Un miembro de nuestro equipo se estará comunicando contigo en breve para asistirte.
      </p>
      <p>
        Si necesitas asistencia inmediata, no dudes en llamarnos al <span class="highlight">(787) 525-6934</span>
        o enviarnos un mensaje por WhatsApp.
      </p>
      <p>¡Gracias por elegir Coldman JP!</p>
    </div>
    <div class="footer">
      Coldman JP LLC &bull; (787) 525-6934 &bull; coldmanjp.llc@gmail.com
    </div>
  </div>
</body>
</html>`;
}

function buildInternalEmail(data: ContactBody): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f4f4f4; }
    .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 30px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 24px; }
    .body { padding: 30px; }
    .body h2 { color: #1e3a8a; font-size: 20px; margin-top: 0; }
    .body p { color: #555; line-height: 1.6; font-size: 15px; }
    .info-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    .info-table td { padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    .info-table td:first-child { font-weight: bold; color: #374151; width: 40%; }
    .info-table td:last-child { color: #555; }
    .divider { border: none; border-top: 2px solid #2563eb; margin: 30px 0; }
    .footer { background: #f9fafb; padding: 20px 30px; text-align: center; color: #9ca3af; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nueva Solicitud de Servicio</h1>
    </div>
    <div class="body">
      <h2>Informaci&oacute;n del Cliente</h2>
      <table class="info-table">
        <tr><td>Nombre</td><td>${data.firstName} ${data.lastName}</td></tr>
        <tr><td>Correo Electr&oacute;nico</td><td>${data.email}</td></tr>
        <tr><td>Tel&eacute;fono</td><td>${data.phone}</td></tr>
        <tr><td>Servicio</td><td>${data.service}</td></tr>
        <tr><td>Servicio Espec&iacute;fico</td><td>${data.subService}</td></tr>
        <tr><td>Mensaje</td><td>${data.message || "N/A"}</td></tr>
      </table>

      <hr class="divider" />

      <h2>Client Information</h2>
      <table class="info-table">
        <tr><td>Name</td><td>${data.firstName} ${data.lastName}</td></tr>
        <tr><td>Email</td><td>${data.email}</td></tr>
        <tr><td>Phone</td><td>${data.phone}</td></tr>
        <tr><td>Service</td><td>${data.service}</td></tr>
        <tr><td>Specific Service</td><td>${data.subService}</td></tr>
        <tr><td>Message</td><td>${data.message || "N/A"}</td></tr>
      </table>
    </div>
    <div class="footer">
      Coldman JP LLC &mdash; Notificaci&oacute;n autom&aacute;tica del formulario web
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json();

    if (
      !body.firstName ||
      !body.lastName ||
      !body.email ||
      !body.phone ||
      !body.service ||
      !body.subService
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send thank-you email to customer
    await transporter.sendMail({
      from: `"Coldman JP" <${process.env.SMTP_USER}>`,
      to: body.email,
      subject: "Coldman JP - Thank you for your request / Gracias por tu solicitud",
      html: buildCustomerEmail(body),
    });

    // Send internal notification email
    await transporter.sendMail({
      from: `"Coldman JP Web" <${process.env.SMTP_USER}>`,
      to: "Isedd.pacheco@gmail.com",
      subject: `Nueva Solicitud: ${body.service} - ${body.subService} | ${body.firstName} ${body.lastName}`,
      html: buildInternalEmail(body),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return Response.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
