import React, { useRef } from 'react';
import { getTemplateById } from '../templates';
import { Download, Printer, Eye, ZoomIn, ZoomOut, CheckCircle2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';

export const ResumePreview = ({ resumeData, zoom, setZoom }) => {
  const previewRef = useRef(null);
  const templateConfig = getTemplateById(resumeData?.templateId);
  const TemplateComponent = templateConfig.component;

  // Real selectable text PDF generation using html2pdf
  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    const opt = {
      margin: 0,
      filename: `${(resumeData?.title || 'resume').toLowerCase().replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(previewRef.current).save();
    } catch (err) {
      console.error('PDF export error:', err);
      // Fallback to native print
      window.print();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="preview-pane-container">
      {/* Top Preview Controls */}
      <div className="preview-toolbar">
        <div className="toolbar-info">
          <span className="badge">
            <CheckCircle2 size={12} /> Live Preview
          </span>
          <span className="current-template-tag">
            Template: <strong>{templateConfig.name}</strong>
          </span>
        </div>

        <div className="toolbar-actions">
          {/* Zoom controls */}
          <div className="zoom-controls">
            <button 
              className="zoom-btn" 
              onClick={() => setZoom(prev => Math.max(0.6, prev - 0.1))}
              title="Zoom out"
            >
              <ZoomOut size={15} />
            </button>
            <span className="zoom-level">{Math.round(zoom * 100)}%</span>
            <button 
              className="zoom-btn" 
              onClick={() => setZoom(prev => Math.min(1.3, prev + 0.1))}
              title="Zoom in"
            >
              <ZoomIn size={15} />
            </button>
          </div>

          <button onClick={handlePrint} className="btn btn-secondary btn-sm" title="Print resume">
            <Printer size={15} /> Print
          </button>

          <button onClick={handleDownloadPDF} className="btn btn-primary btn-sm">
            <Download size={15} /> Download PDF
          </button>
        </div>
      </div>

      {/* Scaled Preview Canvas */}
      <div className="preview-canvas-wrapper">
        <div 
          className="preview-scale-box"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
        >
          <div id="resume-document-to-export" ref={previewRef}>
            <TemplateComponent data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
};
