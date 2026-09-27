import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { PrototypeDefinition } from '../prototypes/registry';

// Capture crisp, unsquished screenshot of the mock (viewport / hero area)
export async function captureMockScreenshot(): Promise<string> {
  const mainEl = document.querySelector('main');
  if (!mainEl) return '';

  try {
    // Capture the top desktop viewport (1200 x 800) so it reflects real desktop view without squishing
    const canvas = await html2canvas(mainEl as HTMLElement, {
      useCORS: true,
      allowTaint: true,
      scale: 2, // High resolution retina
      logging: false,
      windowWidth: 1280,
      width: 1200,
      height: 780, // Viewport height: captures header, hero, photo and CTAs proportionally
      x: 0,
      y: 0,
      backgroundColor: '#ffffff',
    });
    return canvas.toDataURL('image/jpeg', 0.95);
  } catch (err) {
    console.warn('Error capturing screenshot', err);
    return '';
  }
}

export async function exportPrototypeToPdf(
  prototype: PrototypeDefinition,
  screenshotUrl?: string,
  onProgress?: (msg: string) => void
): Promise<void> {
  if (onProgress) onProgress('Capturant pantalla del mock...');

  let screenshot = screenshotUrl;
  if (!screenshot) {
    screenshot = await captureMockScreenshot();
  }

  if (onProgress) onProgress('Construint document PDF...');

  // Create temporary container for 2 clean A4 pages
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '794px'; // A4 at 96 DPI
  container.style.backgroundColor = '#ffffff';
  container.style.zIndex = '-100';
  container.style.fontFamily = "'Inter', system-ui, -apple-system, sans-serif";
  document.body.appendChild(container);

  const pageStyle = `
    width: 794px;
    height: 1123px;
    padding: 36px 44px;
    box-sizing: border-box;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    color: #1e293b;
  `;

  // --- PÀGINA 1: PORTADA & CAPTURA VISUAL DE LA WEB ---
  const page1 = document.createElement('div');
  page1.style.cssText = pageStyle;
  page1.innerHTML = `
    <div style="flex: 1; display: flex; flex-direction: column;">
      <!-- Header Institucional -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 24px;">🧪</span>
          <div>
            <div style="font-weight: 800; font-size: 15px; letter-spacing: -0.02em; color: #0f172a;">PROVES SPA HUB</div>
            <div style="font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; font-weight: 600;">Fitxa Tècnica & Dossier de Disseny</div>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 10px; font-weight: 700; color: #0369a1; background: #f0f9ff; padding: 4px 12px; border-radius: 9999px; border: 1px solid #bae6fd; display: inline-block;">
            ${prototype.category}
          </div>
          <div style="font-size: 9px; color: #94a3b8; margin-top: 4px;">Data: ${new Date().toLocaleDateString()}</div>
        </div>
      </div>

      <!-- Títol del Projecte -->
      <div style="margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="background: #10b981; color: white; font-size: 9px; font-weight: 800; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">
            ${prototype.badge || 'PROTOTIP VALIDAT'}
          </span>
          <span style="font-size: 11px; color: #64748b;">Ref: ${prototype.id}</span>
        </div>
        <h1 style="font-size: 24px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0; line-height: 1.25;">
          ${prototype.title}
        </h1>
        <p style="font-size: 12px; color: #475569; margin: 0; line-height: 1.5;">
          ${prototype.description}
        </p>
      </div>

      <!-- Visió Global i Objectius -->
      <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 18px; margin-bottom: 20px;">
        <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #0369a1; margin-bottom: 4px; display: flex; align-items: center; gap: 5px;">
          <span>🎯</span> Visió Global del Projecte
        </div>
        <p style="font-size: 11px; color: #334155; margin: 0; line-height: 1.55;">
          ${prototype.overview || prototype.description}
        </p>
      </div>

      <!-- Marc de Navegador Web amb Captura Real Proporcional -->
      <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.07); display: flex; flex-direction: column;">
        <!-- Browser Chrome Bar -->
        <div style="background: #f1f5f9; border-bottom: 1px solid #e2e8f0; padding: 8px 14px; display: flex; align-items: center; gap: 12px;">
          <div style="display: flex; gap: 6px;">
            <div style="width: 9px; height: 9px; border-radius: 50%; background: #ef4444;"></div>
            <div style="width: 9px; height: 9px; border-radius: 50%; background: #f59e0b;"></div>
            <div style="width: 9px; height: 9px; border-radius: 50%; background: #10b981;"></div>
          </div>
          <div style="flex: 1; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 3px 10px; font-size: 9px; color: #64748b; font-family: monospace; text-align: center;">
            https://mock.local/${prototype.id}
          </div>
          <div style="font-size: 8px; font-weight: 700; color: #059669; background: #ecfdf5; padding: 2px 8px; border-radius: 4px; border: 1px solid #a7f3d0;">
            VISTA REAL
          </div>
        </div>

        <!-- Imatge del Mockup sense deformar (Proporcional 16:10) -->
        <div style="height: 520px; overflow: hidden; background: #ffffff; display: flex; justify-content: center; align-items: flex-start;">
          ${
            screenshot
              ? `<img src="${screenshot}" style="width: 100%; height: 100%; object-fit: cover; object-position: top center;" alt="Captura de la web" />`
              : `<div style="padding: 60px; text-align: center; color: #94a3b8; font-size: 12px;">Captura visual de la pàgina web</div>`
          }
        </div>
      </div>
    </div>

    <!-- Peu Pàgina 1 -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 12px; margin-top: 14px; font-size: 9px; color: #94a3b8;">
      <div>Proves SPA Hub • Dossier de Disseny</div>
      <div style="font-weight: 600;">Pàgina 1 de 2</div>
    </div>
  `;
  container.appendChild(page1);

  // --- PÀGINA 2: ARQUITECTURA I SECCIONS (SENSE CAP REFERÈNCIA A IA) ---
  const page2 = document.createElement('div');
  page2.style.cssText = pageStyle;
  page2.innerHTML = `
    <div style="flex: 1; display: flex; flex-direction: column;">
      <!-- Capçalera Pàgina 2 -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 20px;">
        <div style="font-weight: 800; font-size: 13px; color: #0f172a;">${prototype.title}</div>
        <div style="font-size: 9px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">2. Apartats i Estructura</div>
      </div>

      <div style="margin-bottom: 16px;">
        <h2 style="font-size: 19px; font-weight: 800; color: #0f172a; margin: 0 0 4px 0;">
          Apartats i Funcionalitats de la Web
        </h2>
        <p style="font-size: 11px; color: #64748b; margin: 0;">
          Desglossament detallat de cadascun dels blocs que componen aquest projecte:
        </p>
      </div>

      <!-- Graella d'Apartats -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
        ${(prototype.sections || [])
          .map(
            (sec, i) => `
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
              <span style="background: #0284c7; color: #ffffff; font-size: 9px; font-weight: 800; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                ${i + 1}
              </span>
              <div style="font-size: 11.5px; font-weight: 700; color: #0f172a;">${sec.title}</div>
            </div>
            <div style="font-size: 10px; color: #475569; line-height: 1.5; padding-left: 28px;">
              ${sec.description}
            </div>
          </div>
        `
          )
          .join('')}
      </div>

      <!-- Caixa d'Especificacions Tècniques i Funcionalitats Clau -->
      <div style="margin-top: auto; background: #0f172a; border-radius: 14px; padding: 18px 22px; color: #ffffff;">
        <div style="font-size: 11px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
          <span>⚙️</span> Especificacions Tècniques i Interactivitat
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; font-size: 10px;">
          <div>
            <span style="color: #94a3b8; display: block; margin-bottom: 2px;">Framework & Llenguatge:</span>
            <strong style="color: #f8fafc; font-size: 11px;">React 18 & TypeScript</strong>
          </div>
          <div>
            <span style="color: #94a3b8; display: block; margin-bottom: 2px;">Arquitectura d'Estils:</span>
            <strong style="color: #f8fafc; font-size: 11px;">Tailwind CSS 3 (Responsive)</strong>
          </div>
          <div>
            <span style="color: #94a3b8; display: block; margin-bottom: 2px;">Iconografia:</span>
            <strong style="color: #f8fafc; font-size: 11px;">Lucide Icons Vectorials</strong>
          </div>
          <div>
            <span style="color: #94a3b8; display: block; margin-bottom: 2px;">Internacionalització:</span>
            <strong style="color: #f8fafc; font-size: 11px;">Multi-idioma (IATA / LTR & RTL)</strong>
          </div>
          <div>
            <span style="color: #94a3b8; display: block; margin-bottom: 2px;">Interactivitat Formulari:</span>
            <strong style="color: #f8fafc; font-size: 11px;">Modal reactiu amb Toast feedback</strong>
          </div>
          <div>
            <span style="color: #94a3b8; display: block; margin-bottom: 2px;">Mode de Presentació:</span>
            <strong style="color: #f8fafc; font-size: 11px;">Vista Client (?pure=true)</strong>
          </div>
        </div>
      </div>
    </div>

    <!-- Peu Pàgina 2 -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 12px; margin-top: 14px; font-size: 9px; color: #94a3b8;">
      <div>Proves SPA Hub • Dossier de Disseny</div>
      <div style="font-weight: 600;">Pàgina 2 de 2</div>
    </div>
  `;
  container.appendChild(page2);

  // Generar PDF amb jsPDF
  if (onProgress) onProgress('Renderitzant document en alta resolució...');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  try {
    const pages = [page1, page2];

    for (let i = 0; i < pages.length; i++) {
      if (onProgress) onProgress(`Renderitzant pàgina ${i + 1} de ${pages.length}...`);

      const canvas = await html2canvas(pages[i], {
        scale: 2, // Resolució Retina 2x nítida
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      if (i > 0) {
        doc.addPage();
      }

      doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    }

    if (onProgress) onProgress('Descarregant fitxer PDF...');
    doc.save(`${prototype.id}-dossier-professional.pdf`);
  } finally {
    document.body.removeChild(container);
  }
}
