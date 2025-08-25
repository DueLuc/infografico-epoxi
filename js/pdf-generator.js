document.getElementById('download-pdf-button').addEventListener('click', async () => {
  const button = document.getElementById('download-pdf-button');
  const originalText = button.textContent;
  button.textContent = 'Gerando seu Guia PDF...';
  button.disabled = true;

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: 'letter'
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const margin = 0.5; // polegadas

  // --- Seções a serem impressas, uma por página ---
  const sectionsToPrint = [
    '#legislacao',
    '#perigos',
    '#protecao',
    '#classificacao',
    '#ciclo-de-vida',
    '#destinacao',
    '#graficos',
    '#faq'
  ];

  try {
    // --- PÁGINA 1 (Capa) ---
    console.log("Gerando página de capa...");
    const coverElement = document.querySelector('header.text-center');
    let canvas = await html2canvas(coverElement, { scale: 2, useCORS: true });
    let imgData = canvas.toDataURL('image/jpeg', 0.95);
    
    const logoImg = document.querySelector('nav img');
    const logoCanvas = await html2canvas(logoImg, { scale: 2, useCORS: true, backgroundColor: null });
    const logoDataUrl = logoCanvas.toDataURL('image/png');

    pdf.addImage(logoDataUrl, 'PNG', margin, margin, 2, 0.5);

    const coverAspectRatio = canvas.width / canvas.height;
    const coverImgWidth = pdfWidth - (margin * 2);
    const coverImgHeight = coverImgWidth / coverAspectRatio;

    pdf.addImage(imgData, 'JPEG', margin, margin + 1, coverImgWidth, coverImgHeight);

    // --- PÁGINAS DE CONTEÚDO ---
    for (const selector of sectionsToPrint) {
      console.log(`Processando seção: ${selector}`);
      const element = document.querySelector(selector);
      if (element) {
        pdf.addPage();
        pdf.addImage(logoDataUrl, 'PNG', margin, margin, 2, 0.5);

        canvas = await html2canvas(element, { scale: 2, useCORS: true });
        imgData = canvas.toDataURL('image/jpeg', 0.95);

        const contentWidth = pdfWidth - (margin * 2);
        const contentHeight = pdfHeight - (margin * 2) - 0.7; // Subtrai espaço para header
        const canvasAspectRatio = canvas.width / canvas.height;
        
        let imgWidth = contentWidth;
        let imgHeight = imgWidth / canvasAspectRatio;

        if (imgHeight > contentHeight) {
          imgHeight = contentHeight;
          imgWidth = imgHeight * canvasAspectRatio;
        }

        const x = (pdfWidth - imgWidth) / 2; // Centraliza horizontalmente
        const y = margin + 0.7;

        pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
      }
    }

    pdf.save('guia-gerenciamento-residuos-epoxi.pdf');

  } catch (error) {
    console.error("Ocorreu um erro final ao gerar o PDF:", error);
    alert("Não foi possível gerar o PDF. Verifique o console para mais detalhes.");
  } finally {
    button.textContent = originalText;
    button.disabled = false;
  }
});
