import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generateCertificate = async ({ name, score, darkMode }) => {
  const certificateElement = document.createElement("div");

  certificateElement.style.width = "1000px";
  certificateElement.style.height = "700px";
  certificateElement.style.padding = "60px";
  certificateElement.style.boxSizing = "border-box";
  certificateElement.style.textAlign = "center";
  certificateElement.style.fontFamily = "'Georgia', serif";
  certificateElement.style.position = "absolute";
  certificateElement.style.left = "-9999px";
  certificateElement.style.background = darkMode
    ? "#0f172a"
    : "linear-gradient(135deg, #f8fafc, #e2e8f0)";
  certificateElement.style.border = "12px solid #1e3a8a";
  certificateElement.style.borderRadius = "20px";
  certificateElement.style.color = darkMode ? "#ffffff" : "#0f172a";

  certificateElement.innerHTML = `
    <div style="border: 4px solid #d4af37; padding: 40px; height: 100%; border-radius: 12px; display: flex; flex-direction: column; justify-content: space-between;">
      
      <div>
        <h1 style="font-size: 42px; margin-bottom: 10px; letter-spacing: 2px; color: #1e3a8a;">
          CERTIFICATE OF ACHIEVEMENT
        </h1>

        <div style="width: 120px; height: 4px; background-color: #d4af37; margin: 20px auto;"></div>

        <p style="font-size: 20px; margin-top: 30px;">This certificate is proudly presented to</p>

        <h2 style="font-size: 48px; margin: 20px 0; font-weight: bold; color: #b45309;">
          ${name}
        </h2>

        <p style="font-size: 20px;">For successfully completing assigned tasks with excellence.</p>

        <p style="font-size: 22px; margin-top: 20px;">
          Final Score: <strong>${score}</strong>
        </p>
      </div>

      <div style="display: flex; justify-content: space-between; margin-top: 50px;">
        
        <div style="text-align: left;">
          <div style="border-top: 2px solid #000; width: 200px;"></div>
          <p style="margin-top: 8px;">Authorized Signature</p>
        </div>

        <div style="text-align: right;">
          <div style="border-top: 2px solid #000; width: 200px;"></div>
          <p style="margin-top: 8px;">Date: ${new Date().toLocaleDateString()}</p>
        </div>

      </div>

    </div>
  `;

  document.body.appendChild(certificateElement);

  const canvas = await html2canvas(certificateElement, {
    scale: 2
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("landscape", "px", [1000, 700]);
  pdf.addImage(imgData, "PNG", 0, 0, 1000, 700);
  pdf.save(`${name}_Certificate.pdf`);

  document.body.removeChild(certificateElement);
};