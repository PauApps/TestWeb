import React, { useState, useEffect } from 'react';
import { FileDown, Layers, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Modal, Button, Badge, useToast } from './ui';
import { PrototypeDefinition } from '../prototypes/registry';
import { exportPrototypeToPdf, captureMockScreenshot } from '../utils/pdfExport';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  prototype: PrototypeDefinition;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  prototype,
}) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [screenshot, setScreenshot] = useState<string>('');

  // Capture screenshot when modal opens
  useEffect(() => {
    if (isOpen) {
      captureMockScreenshot().then((data) => {
        if (data) setScreenshot(data);
      });
    }
  }, [isOpen, prototype.id]);

  const handleDownloadPdf = async () => {
    try {
      setIsGenerating(true);
      setProgressMsg('Preparant document...');
      await exportPrototypeToPdf(prototype, screenshot, (status) => {
        setProgressMsg(status);
      });
      toast(`PDF "${prototype.id}-dossier-professional.pdf" descarregat amb èxit!`, 'success');
    } catch (err) {
      console.error('Error generant PDF:', err);
      toast('Error en generar el PDF', 'error');
    } finally {
      setIsGenerating(false);
      setProgressMsg('');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Dossier de Disseny & Exportació PDF"
      maxWidth="xl"
    >
      <div className="space-y-5 text-slate-800 text-xs sm:text-sm max-h-[75vh] overflow-y-auto pr-1">
        {/* Header Summary Card */}
        <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-white">{prototype.title}</h3>
              <Badge variant="info">{prototype.category}</Badge>
            </div>
            <p className="text-slate-400 text-xs mt-1">{prototype.description}</p>
          </div>
          <Button
            size="sm"
            onClick={handleDownloadPdf}
            isLoading={isGenerating}
            className="bg-brand-600 hover:bg-brand-700 text-white shrink-0 shadow-sm"
          >
            <FileDown className="w-4 h-4 mr-1.5" />
            {isGenerating ? progressMsg || 'Generant...' : 'Descarregar PDF'}
          </Button>
        </div>

        {/* Progress Alert if generating */}
        {isGenerating && (
          <div className="p-3 bg-brand-50 border border-brand-200 text-brand-800 rounded-xl flex items-center gap-3 animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin text-brand-600 shrink-0" />
            <span className="font-medium text-xs">{progressMsg}</span>
          </div>
        )}

        {/* Visual Mockup Screenshot Preview */}
        <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <ImageIcon className="w-4 h-4 text-emerald-600" />
              <span>Captura Visual del Mock (S'inclou a la Portada del PDF)</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Alta Resolució (Proporcional)
            </span>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-300 shadow-sm bg-white mt-2">
            <div className="bg-slate-100 px-3 py-2 border-b border-slate-200 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
              </div>
              <div className="flex-1 bg-white px-2.5 py-0.5 rounded text-[10px] text-slate-500 font-mono text-center truncate">
                https://mock.local/{prototype.id}
              </div>
            </div>

            <div className="h-64 overflow-hidden bg-slate-50 flex items-start justify-center">
              {screenshot ? (
                <img
                  src={screenshot}
                  alt="Captura de la web"
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="py-12 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Capturant previsualització de la web...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 1. Overview */}
        <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <FileText className="w-4 h-4 text-brand-600" />
            <span>1. Visió Global del Mock</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
            {prototype.overview || prototype.description}
          </p>
        </div>

        {/* 2. Sections */}
        <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>2. Apartats i Seccions del Mock</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {prototype.sections && prototype.sections.length > 0 ? (
              prototype.sections.map((sec, idx) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                    {idx + 1}. {sec.title}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 leading-relaxed">{sec.description}</div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">Sense apartats definits.</p>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-2 flex justify-between items-center border-t border-slate-200">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Tancar
          </Button>
          <Button size="sm" onClick={handleDownloadPdf} isLoading={isGenerating}>
            <FileDown className="w-3.5 h-3.5 mr-1.5" />
            {isGenerating ? progressMsg || 'Generant PDF...' : 'Descarregar PDF'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
