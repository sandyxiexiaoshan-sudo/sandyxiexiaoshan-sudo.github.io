import { Download, Printer } from 'lucide-react'
import { site } from '@/data/site'

export function DownloadButton({ className = '' }: { className?: string }) {
  const base =
    'inline-flex items-center gap-2 rounded border border-[rgba(0,168,255,0.35)] bg-[rgba(0,168,255,0.1)] px-4 py-2 text-sm font-medium text-[var(--color-accent)] transition hover:bg-[rgba(0,168,255,0.2)]'

  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'noopener,noreferrer')

    if (!printWindow) {
      window.open(site.resumePdfPath, '_blank', 'noopener,noreferrer')
      return
    }

    printWindow.document.write(`
      <!doctype html>
      <html lang="zh-CN">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>打印简历</title>
          <style>
            @page { margin: 0; }
            html, body {
              margin: 0;
              min-height: 100%;
              background: #fff;
            }
            img {
              display: block;
              width: 100%;
              max-width: 100%;
              height: auto;
            }
            @media print {
              img {
                width: 100%;
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <img src="${site.resumePdfPath}" alt="Sandy Xie 简历" />
          <script>
            const image = document.querySelector('img');
            image.addEventListener('load', () => {
              window.focus();
              window.print();
            });
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={site.resumePdfPath} download="sandy-resume.pdf" className={base}>
        <Download size={16} />
        下载 PDF 简历
      </a>
      <button type="button" onClick={handlePrint} className={base}>
        <Printer size={16} />
        打印 / 另存 PDF
      </button>
    </div>
  )
}
