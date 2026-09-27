import React, { useState } from 'react';
import { Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { Modal, Button, useToast } from './ui';
import { PrototypeDefinition } from '../prototypes/registry';
import { useI18n } from '../i18n/I18nContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  prototype: PrototypeDefinition;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  prototype,
}) => {
  const { toast } = useToast();
  const { currentLang } = useI18n();
  const [copied, setCopied] = useState(false);

  // Build clean URL without test hub
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?mock=${prototype.id}&pure=true&lang=${currentLang}`
    : `?mock=${prototype.id}&pure=true&lang=${currentLang}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast('Enllaç net copiat al porta-retalls!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpen = () => {
    window.open(shareUrl, '_blank');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Compartir Mock Directament"
      maxWidth="md"
    >
      <div className="space-y-4 text-xs sm:text-sm text-slate-600">
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Aquest enllaç permet que qui el rebi vegi exclusivament la web del mock, completament neta i sense cap eina de desenvolupament o proves.
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Enllaç directe (Mode Net / Vista Client):
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg text-slate-700 select-all focus:outline-none"
            />
            <Button size="sm" onClick={handleCopy} className="shrink-0">
              {copied ? <Check className="w-4 h-4 mr-1 text-white" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? 'Copiat!' : 'Copiar'}
            </Button>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
          <p><strong>Configuració de l'enllaç:</strong></p>
          <p>• Mock seleccionat: <code className="text-brand-600">{prototype.title}</code></p>
          <p>• Idioma actiu del mock: <code className="text-brand-600 uppercase">{currentLang}</code></p>
          <p>• Paràmetre <code className="text-brand-600 font-mono">pure=true</code>: desactiva automàticament la barra del hub i els selectors de proves.</p>
        </div>

        <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
          <Button variant="outline" size="sm" onClick={onClose}>
            Tancar
          </Button>
          <Button size="sm" variant="secondary" onClick={handleOpen}>
            <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
            Provar en nova pestanya
          </Button>
        </div>
      </div>
    </Modal>
  );
};
