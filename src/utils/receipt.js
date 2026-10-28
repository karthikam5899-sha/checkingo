function formatReceiptDate(value) {
  if (!value) return "—";
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function escapePdfText(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/[\\()]/g, "\\$&");
}

function formatReceiptCurrency(amount) {
  return `INR ${Number(amount || 0).toLocaleString("en-IN")}`;
}

function createPdf(booking) {
  const lines = [
    "CHECK IN GO",
    "BOOKING RECEIPT",
    "",
    `Receipt date: ${formatReceiptDate((booking.bookedAt || "").slice(0, 10))}`,
    `Booking reference: ${booking.id}`,
    `Reservation status: ${booking.status}`,
    "",
    `Guest: ${booking.guestName || "Guest"}`,
    `Email: ${booking.guestEmail || "Not provided"}`,
    `Phone: ${booking.guestPhone || "Not provided"}`,
    "",
    `Stay: ${booking.hotelName}`,
    `Location: ${booking.hotelLocation}`,
    `Room: ${booking.roomName}`,
    `Check-in: ${formatReceiptDate(booking.checkIn)}`,
    `Check-out: ${formatReceiptDate(booking.checkOut)}`,
    `Guests: ${booking.guests}`,
    `Nights: ${booking.nights}`,
    "",
    `Price per night: ${formatReceiptCurrency(booking.pricePerNight)}`,
    `Room subtotal: ${formatReceiptCurrency(booking.subtotal ?? (booking.pricePerNight || 0) * (booking.nights || 1))}`,
    `Estimated taxes and fees (demo): ${booking.fees === undefined ? "Not itemized" : formatReceiptCurrency(booking.fees)}`,
    `Total: ${formatReceiptCurrency(booking.total)}`,
    `Payment mode: ${booking.paymentMethod || "Not recorded"}`,
    `Payment status: ${booking.paymentStatus || "Demo only - no payment processed"}`,
    "",
    "Demo receipt only. Estimated fees are illustrative; actual charges may differ. No payment was collected."
  ];

  const textCommands = lines.map((line, index) => {
    const fontSize = index === 0 ? 20 : index === 1 ? 14 : 10;
    const y = 790 - index * 26;
    return `BT /F1 ${fontSize} Tf 52 ${y} Td (${escapePdfText(line)}) Tj ET`;
  }).join("\n");
  const stream = `${textCommands}\n`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${new TextEncoder().encode(stream).length} >>\nstream\n${stream}endstream`
  ];

  let document = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(new TextEncoder().encode(document).length);
    document += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = new TextEncoder().encode(document).length;
  document += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  document += offsets.slice(1).map(offset => `${String(offset).padStart(10, "0")} 00000 n \n`).join("");
  document += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Blob([document], { type: "application/pdf" });
}

export function downloadBookingReceipt(booking) {
  const url = URL.createObjectURL(createPdf(booking));
  const link = document.createElement("a");
  link.href = url;
  link.download = `check-in-go-receipt-${String(booking.id).replace(/[^a-zA-Z0-9-]/g, "")}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
