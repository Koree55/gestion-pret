import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, Calendar, User, Package, ArrowRight, Check, X, Trash2, Clock, Phone, Mail, Building2, Wrench, FileText, Download, AlertTriangle, Send, Eye, ChevronDown, ChevronUp, History } from 'lucide-react';

// Panel Component
const SlidePanel = ({ isOpen, onClose, title, children, width = 'w-80' }) => {
  if (!isOpen) return null;
  
  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      <div className={`fixed right-0 top-0 h-full ${width} bg-white/95 backdrop-blur-xl shadow-2xl z-50 border-l border-white/20`} onClick={e => e.stopPropagation()}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
            <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </div>
      </div>
    </>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, children, width = 'max-w-md' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className={`bg-white rounded-xl shadow-xl ${width} w-full max-h-[90vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );
};

// Compact Modal
const CompactModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-xs w-full p-4" onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );
};

// PDF Preview Modal
const PDFPreviewModal = ({ isOpen, onClose, title, content, onDownload }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={onDownload} 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all"
            >
              <Download size={14} />
              Télécharger PDF
            </button>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={16} className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-60px)] bg-gray-50">
          <div className="bg-white shadow-lg rounded-lg p-8 mx-auto" style={{ maxWidth: '595px', minHeight: '842px' }}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

// Email Preview Modal
const EmailPreviewModal = ({ isOpen, onClose, emailData, onSend }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-orange-500/10 to-red-500/10">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-orange-500" size={18} />
            <h3 className="font-semibold text-gray-800">Email de relance</h3>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={16} className="text-gray-500" />
          </button>
        </div>
        <div className="p-4 space-y-3">
          <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 w-12">À :</span>
              <span className="font-medium text-gray-800">{emailData?.to}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 w-12">Objet :</span>
              <span className="font-medium text-gray-800">{emailData?.subject}</span>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-line">
            {emailData?.body}
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={onClose} className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-200 transition-all">
              Annuler
            </button>
            <button onClick={onSend} className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 rounded-lg font-medium text-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
              <Send size={14} />Envoyer le mail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState('appareils');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');
  const [historyFilter, setHistoryFilter] = useState('tous');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [notification, setNotification] = useState(null);
  const [appareils, setAppareils] = useState([]);
  const [historique, setHistorique] = useState([]);
  const [formData, setFormData] = useState({ nom: '', numero: '' });
  const [loanForm, setLoanForm] = useState({ 
    emprunteur: '', 
    telephoneEmprunteur: '', 
    emailEmprunteur: '', 
    entrepriseEmprunteur: '',
    client: '',
    telephoneClient: '',
    emailClient: '',
    entrepriseClient: '',
    dateRetour: '', 
    notes: '' 
  });
  const [deviceToDelete, setDeviceToDelete] = useState(null);
  const [pdfPreview, setPdfPreview] = useState({ isOpen: false, type: '', data: null });
  const [emailPreview, setEmailPreview] = useState({ isOpen: false, data: null });
  const [returnDevice, setReturnDevice] = useState(null);
  const [returnNotes, setReturnNotes] = useState('');
  const [returnCondition, setReturnCondition] = useState('bon');
  const [expandedHistory, setExpandedHistory] = useState({});

  // Company info for documents
  const companyInfo = {
    name: 'Votre Entreprise',
    address: '123 Rue de l\'Entreprise, 75000 Paris',
    phone: '01 23 45 67 89',
    email: 'contact@entreprise.fr',
    siret: '123 456 789 00012'
  };

  // Charger html2pdf au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('appareils-pret');
    const savedHistory = localStorage.getItem('appareils-pret-historique');
    if (saved) setAppareils(JSON.parse(saved));
    else setAppareils([
      { id: 1, nom: 'MacBook Pro 14"', numero: 'MPB-001', statut: 'disponible', emprunteur: null, dateEmprunt: null, dateRetour: null },
      { id: 2, nom: 'iPad Pro 12.9"', numero: 'IPD-002', statut: 'emprunté', emprunteur: 'Marie Dubois', telephoneEmprunteur: '06 12 34 56 78', emailEmprunteur: 'marie.dubois@email.com', entrepriseEmprunteur: 'Tech Solutions', client: 'Jean Martin', telephoneClient: '06 98 76 54 32', emailClient: 'jean.martin@client.com', entrepriseClient: 'Client Corp', dateEmprunt: '2026-01-10', dateRetour: '2026-01-12' },
      { id: 3, nom: 'Projecteur Epson', numero: 'PRJ-003', statut: 'disponible', emprunteur: null, dateEmprunt: null, dateRetour: null },
    ]);
    if (savedHistory) setHistorique(JSON.parse(savedHistory));
  }, []);

  useEffect(() => { if (appareils.length > 0) localStorage.setItem('appareils-pret', JSON.stringify(appareils)); }, [appareils]);
  useEffect(() => { if (historique.length > 0) localStorage.setItem('appareils-pret-historique', JSON.stringify(historique)); }, [historique]);

  // Background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let time = 0;

    class FloatingParticle {
      constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 2 + 0.5; this.speedX = Math.random() * 0.1 - 0.05; this.speedY = Math.random() * 0.15 - 0.05; this.opacity = Math.random() * 0.3 + 0.1; this.phase = Math.random() * Math.PI * 2; }
      update() { this.x += this.speedX + Math.sin(time * 0.0005 + this.phase) * 0.05; this.y += this.speedY; if (this.y > canvas.height) { this.y = -10; this.x = Math.random() * canvas.width; } if (this.x < 0) this.x = canvas.width; if (this.x > canvas.width) this.x = 0; }
      draw() { ctx.fillStyle = `rgba(150, 220, 255, ${this.opacity})`; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
    }
    const particles = Array.from({ length: 100 }, () => new FloatingParticle());

    function drawSlowWaves(t) {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a1628'); gradient.addColorStop(0.3, '#0d2847'); gradient.addColorStop(0.6, '#104e7a'); gradient.addColorStop(1, '#1565a3');
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let layer = 0; layer < 5; layer++) {
        ctx.beginPath(); ctx.moveTo(0, canvas.height);
        for (let x = 0; x <= canvas.width; x += 15) {
          const y = Math.sin((x * (0.003 + layer * 0.0005)) + (t * 0.0003) + (layer * 0.8)) * 25 + Math.sin((x * (0.005 + layer * 0.0003)) + (t * 0.0002) + (layer * 0.5)) * 15 + canvas.height * (0.4 + layer * 0.12);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height); ctx.closePath();
        const layerGradient = ctx.createLinearGradient(0, canvas.height * 0.4, 0, canvas.height);
        layerGradient.addColorStop(0, `rgba(20, 120, 180, ${0.1 - layer * 0.015})`); layerGradient.addColorStop(1, `rgba(10, 80, 140, ${0.2 - layer * 0.03})`);
        ctx.fillStyle = layerGradient; ctx.fill();
      }
    }

    class SlowBubble {
      constructor() { this.reset(); }
      reset() { this.x = Math.random() * canvas.width; this.y = canvas.height + Math.random() * 200; this.size = Math.random() * 15 + 3; this.speed = Math.random() * 0.3 + 0.1; this.wobbleSpeed = Math.random() * 0.01 + 0.005; this.wobble = Math.random() * Math.PI * 2; this.opacity = Math.random() * 0.2 + 0.1; }
      update() { this.y -= this.speed; this.wobble += this.wobbleSpeed; this.x += Math.sin(this.wobble) * 0.3; if (this.y + this.size < -50) this.reset(); }
      draw() { ctx.strokeStyle = `rgba(180, 230, 255, ${this.opacity})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.stroke(); }
    }
    const bubbles = Array.from({ length: 20 }, () => new SlowBubble());

    function animate() {
      time++;
      drawSlowWaves(time);
      particles.forEach(p => { p.update(); p.draw(); });
      bubbles.forEach(b => { b.update(); b.draw(); });
      requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showNotification = (message, type = 'success') => { setNotification({ message, type }); setTimeout(() => setNotification(null), 3000); };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatDateLong = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Get overdue loans
  const getOverdueLoans = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appareils.filter(app => {
      if (app.statut !== 'emprunté' || !app.dateRetour) return false;
      const returnDate = new Date(app.dateRetour);
      returnDate.setHours(0, 0, 0, 0);
      return returnDate < today;
    });
  };

  const getDaysLate = (dateRetour) => {
    const today = new Date();
    const returnDate = new Date(dateRetour);
    return Math.floor((today - returnDate) / (1000 * 60 * 60 * 24));
  };

  // Generate PDF and download
  const generateAndDownloadPDF = async (type, data) => {
    const { device, loan, historyEntry, notes, condition } = data;
    const today = new Date().toISOString().split('T')[0];
    const docNumber = type === 'contract' ? `CTR-${Date.now().toString().slice(-8)}` : `RET-${Date.now().toString().slice(-8)}`;
    
    const conditionLabels = {
      'bon': 'Bon état - Conforme à la remise',
      'usure': 'Usure normale',
      'dommage': 'Dommages constatés',
      'defaillant': 'Défaillant / Non fonctionnel'
    };

    let htmlContent = '';
    
    if (type === 'contract') {
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Contrat de Prêt - ${device.nom}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 11px; line-height: 1.5; color: #1f2937; padding: 40px; max-width: 210mm; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #4f46e5; }
            .header h1 { color: #4f46e5; font-size: 18px; margin-bottom: 5px; }
            .header p { color: #6b7280; font-size: 10px; }
            .title { text-align: center; margin-bottom: 25px; }
            .title h2 { font-size: 16px; text-transform: uppercase; letter-spacing: 1px; color: #1f2937; }
            .title .doc-number { color: #6b7280; font-size: 10px; margin-top: 5px; }
            .section { margin-bottom: 20px; }
            .section-title { font-size: 12px; font-weight: 600; color: #4f46e5; margin-bottom: 10px; text-transform: uppercase; }
            .box { background: #f9fafb; border-radius: 8px; padding: 15px; }
            .box-indigo { background: #eef2ff; }
            .party { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb; }
            .party:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
            .party-title { font-weight: 600; margin-bottom: 5px; }
            .party-info { color: #4b5563; }
            table { width: 100%; }
            table td { padding: 5px 0; }
            table td:first-child { color: #6b7280; width: 120px; }
            table td:last-child { font-weight: 500; }
            .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .conditions { font-size: 10px; }
            .conditions p { margin-bottom: 8px; }
            .signatures { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
            .signatures .date { font-size: 10px; color: #6b7280; margin-bottom: 20px; }
            .sig-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
            .sig-box { }
            .sig-box .sig-title { font-size: 10px; font-weight: 500; margin-bottom: 60px; }
            .sig-box .sig-line { border-top: 1px solid #9ca3af; padding-top: 5px; }
            .sig-box .sig-label { font-size: 9px; color: #6b7280; }
            .notes-box { background: #f9fafb; border-radius: 8px; padding: 12px; font-size: 10px; color: #4b5563; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${companyInfo.name}</h1>
            <p>${companyInfo.address}</p>
            <p>Tél: ${companyInfo.phone} | Email: ${companyInfo.email}</p>
            <p>SIRET: ${companyInfo.siret}</p>
          </div>
          
          <div class="title">
            <h2>Contrat de Prêt de Matériel</h2>
            <div class="doc-number">N° ${docNumber}</div>
          </div>
          
          <div class="section">
            <div class="section-title">Entre les parties</div>
            <div class="box">
              <div class="party">
                <div class="party-title">Le Prêteur :</div>
                <div class="party-info">${companyInfo.name}<br>${companyInfo.address}</div>
              </div>
              <div class="party">
                <div class="party-title">L'Emprunteur :</div>
                <div class="party-info">
                  ${loan.emprunteur}
                  ${loan.entrepriseEmprunteur ? `<br>Entreprise: ${loan.entrepriseEmprunteur}` : ''}
                  ${loan.telephoneEmprunteur ? `<br>Tél: ${loan.telephoneEmprunteur}` : ''}
                  ${loan.emailEmprunteur ? `<br>Email: ${loan.emailEmprunteur}` : ''}
                </div>
              </div>
              ${loan.client ? `
              <div class="party">
                <div class="party-title">Le Client :</div>
                <div class="party-info">
                  ${loan.client}
                  ${loan.entrepriseClient ? `<br>Entreprise: ${loan.entrepriseClient}` : ''}
                  ${loan.telephoneClient ? `<br>Tél: ${loan.telephoneClient}` : ''}
                  ${loan.emailClient ? `<br>Email: ${loan.emailClient}` : ''}
                </div>
              </div>
              ` : ''}
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Objet du prêt</div>
            <div class="box box-indigo">
              <table>
                <tr><td>Désignation :</td><td>${device.nom}</td></tr>
                <tr><td>N° Inventaire :</td><td style="font-family: monospace;">${device.numero}</td></tr>
              </table>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Durée du prêt</div>
            <div class="box">
              <div class="grid-2">
                <div>
                  <div style="color: #6b7280; font-size: 10px;">Date de début :</div>
                  <div style="font-weight: 500;">${formatDateLong(today)}</div>
                </div>
                <div>
                  <div style="color: #6b7280; font-size: 10px;">Date de retour prévue :</div>
                  <div style="font-weight: 500;">${formatDateLong(loan.dateRetour)}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Conditions</div>
            <div class="conditions">
              <p>1. L'emprunteur s'engage à utiliser le matériel avec soin et à le restituer dans l'état où il l'a reçu.</p>
              <p>2. L'emprunteur est responsable de tout dommage ou perte survenant pendant la période de prêt.</p>
              <p>3. Le matériel ne peut être prêté à un tiers sans accord écrit préalable du prêteur.</p>
              <p>4. En cas de retard de restitution, l'emprunteur sera contacté pour régularisation.</p>
              <p>5. Le prêteur se réserve le droit de demander la restitution anticipée du matériel.</p>
            </div>
          </div>
          
          ${loan.notes ? `
          <div class="section">
            <div class="section-title">Remarques</div>
            <div class="notes-box">${loan.notes}</div>
          </div>
          ` : ''}
          
          <div class="signatures">
            <div class="date">Fait à Paris, le ${formatDateLong(today)}</div>
            <div class="sig-grid">
              <div class="sig-box">
                <div class="sig-title">Le Prêteur :</div>
                <div class="sig-line">
                  <div class="sig-label">Signature et cachet</div>
                </div>
              </div>
              <div class="sig-box">
                <div class="sig-title">L'Emprunteur :</div>
                <div class="sig-line">
                  <div class="sig-label">Signature précédée de "Lu et approuvé"</div>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      // Return form
      const deviceData = historyEntry || device;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Fiche de Restitution - ${device.nom}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 11px; line-height: 1.5; color: #1f2937; padding: 40px; max-width: 210mm; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #059669; }
            .header h1 { color: #059669; font-size: 18px; margin-bottom: 5px; }
            .header p { color: #6b7280; font-size: 10px; }
            .title { text-align: center; margin-bottom: 25px; }
            .title h2 { font-size: 16px; text-transform: uppercase; letter-spacing: 1px; color: #1f2937; }
            .title .doc-number { color: #6b7280; font-size: 10px; margin-top: 5px; }
            .section { margin-bottom: 20px; }
            .section-title { font-size: 12px; font-weight: 600; color: #059669; margin-bottom: 10px; text-transform: uppercase; }
            .box { background: #f9fafb; border-radius: 8px; padding: 15px; }
            .box-green { background: #ecfdf5; }
            table { width: 100%; }
            table td { padding: 5px 0; }
            table td:first-child { color: #6b7280; width: 120px; }
            table td:last-child { font-weight: 500; }
            .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; }
            .date-box { text-align: center; }
            .date-box .label { color: #6b7280; font-size: 10px; margin-bottom: 3px; }
            .date-box .value { font-weight: 500; }
            .date-box .value.green { color: #059669; }
            .condition-item { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
            .condition-check { width: 16px; height: 16px; border: 2px solid #d1d5db; border-radius: 4px; display: flex; align-items: center; justify-content: center; }
            .condition-check.checked { background: #059669; border-color: #059669; color: white; }
            .condition-label { color: #4b5563; }
            .condition-label.checked { font-weight: 500; color: #1f2937; }
            .notes-box { background: #f9fafb; border-radius: 8px; padding: 12px; font-size: 10px; color: #4b5563; min-height: 60px; }
            .signatures { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
            .signatures .date { font-size: 10px; color: #6b7280; margin-bottom: 20px; }
            .sig-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
            .sig-box .sig-title { font-size: 10px; font-weight: 500; margin-bottom: 60px; }
            .sig-box .sig-line { border-top: 1px solid #9ca3af; padding-top: 5px; }
            .sig-box .sig-label { font-size: 9px; color: #6b7280; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${companyInfo.name}</h1>
            <p>${companyInfo.address}</p>
            <p>Tél: ${companyInfo.phone} | Email: ${companyInfo.email}</p>
          </div>
          
          <div class="title">
            <h2>Fiche de Restitution</h2>
            <div class="doc-number">N° ${docNumber}</div>
          </div>
          
          <div class="section">
            <div class="section-title">Matériel restitué</div>
            <div class="box box-green">
              <table>
                <tr><td>Désignation :</td><td>${device.nom}</td></tr>
                <tr><td>N° Inventaire :</td><td style="font-family: monospace;">${device.numero}</td></tr>
              </table>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Emprunteur</div>
            <div class="box">
              <table>
                <tr><td>Nom :</td><td>${deviceData.emprunteur || device.emprunteur}</td></tr>
                ${(deviceData.entrepriseEmprunteur || device.entrepriseEmprunteur) ? `<tr><td>Entreprise :</td><td>${deviceData.entrepriseEmprunteur || device.entrepriseEmprunteur}</td></tr>` : ''}
                ${(deviceData.telephoneEmprunteur || device.telephoneEmprunteur) ? `<tr><td>Téléphone :</td><td>${deviceData.telephoneEmprunteur || device.telephoneEmprunteur}</td></tr>` : ''}
                ${(deviceData.emailEmprunteur || device.emailEmprunteur) ? `<tr><td>Email :</td><td>${deviceData.emailEmprunteur || device.emailEmprunteur}</td></tr>` : ''}
              </table>
            </div>
          </div>
          
          ${(deviceData.client || device.client) ? `
          <div class="section">
            <div class="section-title">Client</div>
            <div class="box">
              <table>
                <tr><td>Nom :</td><td>${deviceData.client || device.client}</td></tr>
                ${(deviceData.entrepriseClient || device.entrepriseClient) ? `<tr><td>Entreprise :</td><td>${deviceData.entrepriseClient || device.entrepriseClient}</td></tr>` : ''}
                ${(deviceData.telephoneClient || device.telephoneClient) ? `<tr><td>Téléphone :</td><td>${deviceData.telephoneClient || device.telephoneClient}</td></tr>` : ''}
                ${(deviceData.emailClient || device.emailClient) ? `<tr><td>Email :</td><td>${deviceData.emailClient || device.emailClient}</td></tr>` : ''}
              </table>
            </div>
          </div>
          ` : ''}
          
          <div class="section">
            <div class="section-title">Dates</div>
            <div class="box">
              <div class="grid-3">
                <div class="date-box">
                  <div class="label">Date d'emprunt :</div>
                  <div class="value">${formatDateLong(deviceData.dateEmprunt || device.dateEmprunt)}</div>
                </div>
                <div class="date-box">
                  <div class="label">Retour prévu :</div>
                  <div class="value">${formatDateLong(deviceData.dateRetourPrevue || device.dateRetour)}</div>
                </div>
                <div class="date-box">
                  <div class="label">Retour effectif :</div>
                  <div class="value green">${formatDateLong(today)}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">État du matériel</div>
            <div class="box">
              ${Object.entries(conditionLabels).map(([key, label]) => `
                <div class="condition-item">
                  <div class="condition-check ${condition === key ? 'checked' : ''}">${condition === key ? '✓' : ''}</div>
                  <div class="condition-label ${condition === key ? 'checked' : ''}">${label}</div>
                </div>
              `).join('')}
            </div>
          </div>
          
          ${notes ? `
          <div class="section">
            <div class="section-title">Observations</div>
            <div class="notes-box">${notes}</div>
          </div>
          ` : ''}
          
          <div class="signatures">
            <div class="date">Fait à Paris, le ${formatDateLong(today)}</div>
            <div class="sig-grid">
              <div class="sig-box">
                <div class="sig-title">Le Prêteur :</div>
                <div class="sig-line">
                  <div class="sig-label">Signature</div>
                </div>
              </div>
              <div class="sig-box">
                <div class="sig-title">L'Emprunteur :</div>
                <div class="sig-line">
                  <div class="sig-label">Signature</div>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    }
    
    // Ouvrir une nouvelle fenêtre avec le contenu HTML pour impression/sauvegarde PDF
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    if (!printWindow) {
      throw new Error('Popup bloquée. Veuillez autoriser les popups pour ce site.');
    }

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Attendre que le contenu soit chargé puis lancer l'impression
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
    
    return true;
  };

  // Generate loan contract PDF content
  const generateContractContent = (device, loan) => {
    const today = formatDateLong(new Date().toISOString().split('T')[0]);
    const contractNumber = `CTR-${Date.now().toString().slice(-8)}`;
    
    return (
      <div className="text-gray-800 text-sm leading-relaxed">
        {/* Header */}
        <div className="text-center mb-6 pb-4 border-b-2 border-indigo-600">
          <h1 className="text-xl font-bold text-indigo-700 mb-1">{companyInfo.name}</h1>
          <p className="text-xs text-gray-500">{companyInfo.address}</p>
          <p className="text-xs text-gray-500">Tél: {companyInfo.phone} | Email: {companyInfo.email}</p>
          <p className="text-xs text-gray-500">SIRET: {companyInfo.siret}</p>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">Contrat de Prêt de Matériel</h2>
          <p className="text-xs text-gray-500 mt-1">N° {contractNumber}</p>
        </div>

        {/* Parties */}
        <div className="mb-6">
          <h3 className="font-semibold text-indigo-700 mb-2 text-sm">ENTRE LES PARTIES</h3>
          <div className="bg-gray-50 rounded-lg p-3 space-y-3">
            <div>
              <p className="font-medium">Le Prêteur :</p>
              <p className="text-gray-600">{companyInfo.name}</p>
              <p className="text-gray-600 text-xs">{companyInfo.address}</p>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <p className="font-medium">L'Emprunteur :</p>
              <p className="text-gray-600">{loan.emprunteur}</p>
              {loan.entrepriseEmprunteur && <p className="text-gray-600 text-xs">Entreprise: {loan.entrepriseEmprunteur}</p>}
              {loan.telephoneEmprunteur && <p className="text-gray-600 text-xs">Tél: {loan.telephoneEmprunteur}</p>}
              {loan.emailEmprunteur && <p className="text-gray-600 text-xs">Email: {loan.emailEmprunteur}</p>}
            </div>
            {loan.client && (
              <div className="border-t border-gray-200 pt-3">
                <p className="font-medium">Le Client :</p>
                <p className="text-gray-600">{loan.client}</p>
                {loan.entrepriseClient && <p className="text-gray-600 text-xs">Entreprise: {loan.entrepriseClient}</p>}
                {loan.telephoneClient && <p className="text-gray-600 text-xs">Tél: {loan.telephoneClient}</p>}
                {loan.emailClient && <p className="text-gray-600 text-xs">Email: {loan.emailClient}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Object */}
        <div className="mb-6">
          <h3 className="font-semibold text-indigo-700 mb-2 text-sm">OBJET DU PRÊT</h3>
          <div className="bg-indigo-50 rounded-lg p-3">
            <table className="w-full text-xs">
              <tbody>
                <tr><td className="py-1 text-gray-600 w-32">Désignation :</td><td className="font-medium">{device.nom}</td></tr>
                <tr><td className="py-1 text-gray-600">N° Inventaire :</td><td className="font-medium font-mono">{device.numero}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Duration */}
        <div className="mb-6">
          <h3 className="font-semibold text-indigo-700 mb-2 text-sm">DURÉE DU PRÊT</h3>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-gray-600">Date de début :</p>
                <p className="font-medium">{formatDateLong(new Date().toISOString().split('T')[0])}</p>
              </div>
              <div>
                <p className="text-gray-600">Date de retour prévue :</p>
                <p className="font-medium">{formatDateLong(loan.dateRetour)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Conditions */}
        <div className="mb-6">
          <h3 className="font-semibold text-indigo-700 mb-2 text-sm">CONDITIONS</h3>
          <div className="text-xs text-gray-700 space-y-2">
            <p>1. L'emprunteur s'engage à utiliser le matériel avec soin et à le restituer dans l'état où il l'a reçu.</p>
            <p>2. L'emprunteur est responsable de tout dommage ou perte survenant pendant la période de prêt.</p>
            <p>3. Le matériel ne peut être prêté à un tiers sans accord écrit préalable du prêteur.</p>
            <p>4. En cas de retard de restitution, l'emprunteur sera contacté pour régularisation.</p>
            <p>5. Le prêteur se réserve le droit de demander la restitution anticipée du matériel.</p>
          </div>
        </div>

        {/* Notes */}
        {loan.notes && (
          <div className="mb-6">
            <h3 className="font-semibold text-indigo-700 mb-2 text-sm">REMARQUES</h3>
            <p className="text-xs text-gray-600 bg-gray-50 rounded-lg p-3">{loan.notes}</p>
          </div>
        )}

        {/* Signatures */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-4">Fait à Paris, le {today}</p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-medium mb-8">Le Prêteur :</p>
              <div className="border-t border-gray-400 pt-1">
                <p className="text-xs text-gray-500">Signature et cachet</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium mb-8">L'Emprunteur :</p>
              <div className="border-t border-gray-400 pt-1">
                <p className="text-xs text-gray-500">Signature précédée de "Lu et approuvé"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Generate return form PDF content
  const generateReturnFormContent = (device, historyEntry, notes, condition) => {
    const today = formatDateLong(new Date().toISOString().split('T')[0]);
    const formNumber = `RET-${Date.now().toString().slice(-8)}`;
    
    const conditionLabels = {
      'bon': 'Bon état - Conforme à la remise',
      'usure': 'Usure normale',
      'dommage': 'Dommages constatés',
      'defaillant': 'Défaillant / Non fonctionnel'
    };

    return (
      <div className="text-gray-800 text-sm leading-relaxed">
        {/* Header */}
        <div className="text-center mb-6 pb-4 border-b-2 border-emerald-600">
          <h1 className="text-xl font-bold text-emerald-700 mb-1">{companyInfo.name}</h1>
          <p className="text-xs text-gray-500">{companyInfo.address}</p>
          <p className="text-xs text-gray-500">Tél: {companyInfo.phone} | Email: {companyInfo.email}</p>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">Fiche de Restitution</h2>
          <p className="text-xs text-gray-500 mt-1">N° {formNumber}</p>
        </div>

        {/* Equipment Info */}
        <div className="mb-6">
          <h3 className="font-semibold text-emerald-700 mb-2 text-sm">MATÉRIEL RESTITUÉ</h3>
          <div className="bg-emerald-50 rounded-lg p-3">
            <table className="w-full text-xs">
              <tbody>
                <tr><td className="py-1 text-gray-600 w-32">Désignation :</td><td className="font-medium">{device.nom}</td></tr>
                <tr><td className="py-1 text-gray-600">N° Inventaire :</td><td className="font-medium font-mono">{device.numero}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Borrower Info */}
        <div className="mb-6">
          <h3 className="font-semibold text-emerald-700 mb-2 text-sm">EMPRUNTEUR</h3>
          <div className="bg-gray-50 rounded-lg p-3">
            <table className="w-full text-xs">
              <tbody>
                <tr><td className="py-1 text-gray-600 w-32">Nom :</td><td className="font-medium">{historyEntry?.emprunteur || device.emprunteur}</td></tr>
                {(historyEntry?.entrepriseEmprunteur || device.entrepriseEmprunteur) && <tr><td className="py-1 text-gray-600">Entreprise :</td><td className="font-medium">{historyEntry?.entrepriseEmprunteur || device.entrepriseEmprunteur}</td></tr>}
                {(historyEntry?.telephoneEmprunteur || device.telephoneEmprunteur) && <tr><td className="py-1 text-gray-600">Téléphone :</td><td className="font-medium">{historyEntry?.telephoneEmprunteur || device.telephoneEmprunteur}</td></tr>}
                {(historyEntry?.emailEmprunteur || device.emailEmprunteur) && <tr><td className="py-1 text-gray-600">Email :</td><td className="font-medium">{historyEntry?.emailEmprunteur || device.emailEmprunteur}</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* Client Info */}
        {(historyEntry?.client || device.client) && (
          <div className="mb-6">
            <h3 className="font-semibold text-emerald-700 mb-2 text-sm">CLIENT</h3>
            <div className="bg-gray-50 rounded-lg p-3">
              <table className="w-full text-xs">
                <tbody>
                  <tr><td className="py-1 text-gray-600 w-32">Nom :</td><td className="font-medium">{historyEntry?.client || device.client}</td></tr>
                  {(historyEntry?.entrepriseClient || device.entrepriseClient) && <tr><td className="py-1 text-gray-600">Entreprise :</td><td className="font-medium">{historyEntry?.entrepriseClient || device.entrepriseClient}</td></tr>}
                  {(historyEntry?.telephoneClient || device.telephoneClient) && <tr><td className="py-1 text-gray-600">Téléphone :</td><td className="font-medium">{historyEntry?.telephoneClient || device.telephoneClient}</td></tr>}
                  {(historyEntry?.emailClient || device.emailClient) && <tr><td className="py-1 text-gray-600">Email :</td><td className="font-medium">{historyEntry?.emailClient || device.emailClient}</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Dates */}
        <div className="mb-6">
          <h3 className="font-semibold text-emerald-700 mb-2 text-sm">DATES</h3>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-gray-600">Date d'emprunt :</p>
                <p className="font-medium">{formatDateLong(historyEntry?.dateEmprunt || device.dateEmprunt)}</p>
              </div>
              <div>
                <p className="text-gray-600">Retour prévu :</p>
                <p className="font-medium">{formatDateLong(historyEntry?.dateRetourPrevue || device.dateRetour)}</p>
              </div>
              <div>
                <p className="text-gray-600">Retour effectif :</p>
                <p className="font-medium text-emerald-600">{today}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Condition */}
        <div className="mb-6">
          <h3 className="font-semibold text-emerald-700 mb-2 text-sm">ÉTAT DU MATÉRIEL</h3>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="space-y-2">
              {Object.entries(conditionLabels).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2 text-xs">
                  <div className={`w-4 h-4 border-2 rounded ${condition === key ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'} flex items-center justify-center`}>
                    {condition === key && <Check size={10} className="text-white" />}
                  </div>
                  <span className={condition === key ? 'font-medium' : 'text-gray-600'}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="mb-6">
            <h3 className="font-semibold text-emerald-700 mb-2 text-sm">OBSERVATIONS</h3>
            <p className="text-xs text-gray-600 bg-gray-50 rounded-lg p-3 min-h-16">{notes}</p>
          </div>
        )}

        {/* Signatures */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-4">Fait à Paris, le {today}</p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-medium mb-8">Le Prêteur :</p>
              <div className="border-t border-gray-400 pt-1">
                <p className="text-xs text-gray-500">Signature</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium mb-8">L'Emprunteur :</p>
              <div className="border-t border-gray-400 pt-1">
                <p className="text-xs text-gray-500">Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Generate reminder email
  const generateReminderEmail = (device) => {
    const daysLate = getDaysLate(device.dateRetour);
    const clientInfo = device.client ? `\n\nClient concerné : ${device.client}${device.entrepriseClient ? ` (${device.entrepriseClient})` : ''}` : '';
    return {
      to: device.emailEmprunteur || 'email@exemple.fr',
      subject: `[URGENT] Rappel de restitution - ${device.nom} (${device.numero})`,
      body: `Bonjour ${device.emprunteur},

Nous vous contactons concernant le matériel suivant qui devait être restitué le ${formatDate(device.dateRetour)} :

📦 Matériel : ${device.nom}
🔢 Numéro d'inventaire : ${device.numero}
📅 Date de retour prévue : ${formatDate(device.dateRetour)}
⚠️ Retard : ${daysLate} jour${daysLate > 1 ? 's' : ''}${clientInfo}

Nous vous prions de bien vouloir procéder à la restitution de ce matériel dans les plus brefs délais.

En cas de difficulté ou si vous avez besoin d'une prolongation, merci de nous contacter rapidement.

Cordialement,

${companyInfo.name}
${companyInfo.phone}
${companyInfo.email}`
    };
  };

  // Handle contract preview
  const handlePreviewContract = () => {
    if (!selectedDevice || !loanForm.emprunteur || !loanForm.dateRetour) {
      showNotification('Veuillez remplir les champs obligatoires', 'error');
      return;
    }
    setPdfPreview({
      isOpen: true,
      type: 'contract',
      data: { device: selectedDevice, loan: loanForm }
    });
  };

  // Handle contract download
  const handleDownloadContract = () => {
    if (!pdfPreview.data) return;
    
    try {
      generateAndDownloadPDF('contract', pdfPreview.data);
      showNotification('✓ Document ouvert - Sélectionnez "Enregistrer en PDF" dans la boîte d\'impression', 'success');
      setPdfPreview({ isOpen: false, type: '', data: null });
    } catch (error) {
      console.error('Erreur:', error);
      showNotification('❌ ' + error.message, 'error');
    }
  };

  // Handle return form preview
  const handlePreviewReturnForm = (device) => {
    const historyEntry = historique.find(h => h.appareilId === device.id && h.statut === 'en cours');
    setReturnDevice(device);
    setPdfPreview({
      isOpen: true,
      type: 'return',
      data: { device, historyEntry, notes: returnNotes, condition: returnCondition }
    });
  };

  // Handle return form download
  const handleDownloadReturnForm = () => {
    if (!pdfPreview.data) return;
    
    try {
      generateAndDownloadPDF('return', pdfPreview.data);
      showNotification('✓ Document ouvert - Sélectionnez "Enregistrer en PDF" dans la boîte d\'impression', 'success');
      setPdfPreview({ isOpen: false, type: '', data: null });
    } catch (error) {
      console.error('Erreur:', error);
      showNotification('❌ ' + error.message, 'error');
    }
  };

  // Handle email preview
  const handlePreviewEmail = (device) => {
    const emailData = generateReminderEmail(device);
    setEmailPreview({ isOpen: true, data: emailData, device });
  };

  // Handle email send
  const handleSendEmail = () => {
    showNotification(`✓ Email envoyé à ${emailPreview.data.to}`, 'success');
    setEmailPreview({ isOpen: false, data: null });
  };

  const filteredAppareils = appareils.filter(app => {
    const matchesSearch = app.nom.toLowerCase().includes(searchTerm.toLowerCase()) || app.numero.toLowerCase().includes(searchTerm.toLowerCase()) || (app.emprunteur && app.emprunteur.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch && (statusFilter === 'tous' || app.statut === statusFilter);
  });

  const overdueLoans = getOverdueLoans();
  const stats = { 
    total: appareils.length, 
    disponibles: appareils.filter(a => a.statut === 'disponible').length, 
    empruntes: appareils.filter(a => a.statut === 'emprunté').length, 
    maintenance: appareils.filter(a => a.statut === 'maintenance').length,
    retards: overdueLoans.length
  };

  const handleAddDevice = () => {
    if (formData.nom && formData.numero) {
      if (appareils.some(a => a.numero === formData.numero)) { showNotification("Ce numéro existe déjà", 'error'); return; }
      setAppareils([...appareils, { id: Date.now(), ...formData, statut: 'disponible', emprunteur: null, dateEmprunt: null, dateRetour: null }]);
      setFormData({ nom: '', numero: '' }); setShowAddModal(false); showNotification('Appareil ajouté');
    } else { showNotification('Remplissez tous les champs', 'error'); }
  };

  const handleLoanDevice = () => {
    if (selectedDevice && loanForm.emprunteur && loanForm.dateRetour) {
      const today = new Date().toISOString().split('T')[0];
      setHistorique([{ 
        id: Date.now(), 
        appareilId: selectedDevice.id, 
        appareilNom: selectedDevice.nom, 
        appareilNumero: selectedDevice.numero,
        emprunteur: loanForm.emprunteur, 
        telephoneEmprunteur: loanForm.telephoneEmprunteur, 
        emailEmprunteur: loanForm.emailEmprunteur, 
        entrepriseEmprunteur: loanForm.entrepriseEmprunteur,
        client: loanForm.client,
        telephoneClient: loanForm.telephoneClient,
        emailClient: loanForm.emailClient,
        entrepriseClient: loanForm.entrepriseClient,
        notes: loanForm.notes,
        dateEmprunt: today, 
        dateRetourPrevue: loanForm.dateRetour, 
        dateRetourEffective: null, 
        statut: 'en cours' 
      }, ...historique]);
      setAppareils(appareils.map(app => app.id === selectedDevice.id ? { 
        ...app, 
        statut: 'emprunté', 
        emprunteur: loanForm.emprunteur, 
        telephoneEmprunteur: loanForm.telephoneEmprunteur, 
        emailEmprunteur: loanForm.emailEmprunteur, 
        entrepriseEmprunteur: loanForm.entrepriseEmprunteur,
        client: loanForm.client,
        telephoneClient: loanForm.telephoneClient,
        emailClient: loanForm.emailClient,
        entrepriseClient: loanForm.entrepriseClient,
        notes: loanForm.notes,
        dateEmprunt: today, 
        dateRetour: loanForm.dateRetour 
      } : app));
      setSelectedDevice(null); 
      setLoanForm({ 
        emprunteur: '', 
        telephoneEmprunteur: '', 
        emailEmprunteur: '', 
        entrepriseEmprunteur: '',
        client: '',
        telephoneClient: '',
        emailClient: '',
        entrepriseClient: '',
        dateRetour: '', 
        notes: '' 
      }); 
      showNotification('Emprunt enregistré');
    } else { showNotification('Remplissez les champs obligatoires', 'error'); }
  };

  const openLoanModal = (device) => {
    const d = new Date(); d.setMonth(d.getMonth() + 2);
    setSelectedDevice(device); 
    setLoanForm({ 
      emprunteur: '', 
      telephoneEmprunteur: '', 
      emailEmprunteur: '', 
      entrepriseEmprunteur: '',
      client: '',
      telephoneClient: '',
      emailClient: '',
      entrepriseClient: '',
      dateRetour: d.toISOString().split('T')[0], 
      notes: '' 
    });
  };

  const handleReturnDevice = (device) => {
    setReturnDevice(device);
    setReturnNotes('');
    setReturnCondition('bon');
  };

  const confirmReturn = () => {
    if (!returnDevice) return;
    const today = new Date().toISOString().split('T')[0];
    setHistorique(historique.map(e => e.appareilId === returnDevice.id && e.statut === 'en cours' ? { 
      ...e, 
      dateRetourEffective: today, 
      statut: 'terminé',
      notesRetour: returnNotes,
      conditionRetour: returnCondition
    } : e));
    setAppareils(appareils.map(app => app.id === returnDevice.id ? { 
      ...app, 
      statut: 'disponible', 
      emprunteur: null, 
      telephoneEmprunteur: null, 
      emailEmprunteur: null, 
      entrepriseEmprunteur: null,
      client: null,
      telephoneClient: null,
      emailClient: null,
      entrepriseClient: null,
      notes: null,
      dateEmprunt: null, 
      dateRetour: null 
    } : app));
    showNotification('Appareil retourné');
    setReturnDevice(null);
    setReturnNotes('');
    setReturnCondition('bon');
  };

  const handleDeleteDevice = (id) => { setAppareils(appareils.filter(app => app.id !== id)); setDeviceToDelete(null); showNotification('Appareil supprimé'); };
  const handleSetMaintenance = (id) => { setAppareils(appareils.map(app => app.id === id ? { ...app, statut: 'maintenance', emprunteur: null, dateEmprunt: null, dateRetour: null } : app)); showNotification('En maintenance'); };
  const handleSetAvailable = (id) => { setAppareils(appareils.map(app => app.id === id ? { ...app, statut: 'disponible' } : app)); showNotification('Remis en service'); };

  const toggleHistoryExpand = (id) => {
    setExpandedHistory(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        * { font-family: 'Outfit', sans-serif; }
        .mono { font-family: 'Space Mono', monospace; }
        .stat-card { background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3); transition: all 0.2s ease; }
        .stat-card:hover { transform: scale(1.02); }
        .badge-disponible { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
        .badge-emprunte { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
        .badge-maintenance { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
        .badge-retard { background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%); animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        .gradient-text { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card-hover { transition: all 0.2s ease; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 20px -4px rgb(0 0 0 / 0.1); }
      `}</style>

      {notification && (
        <div className="fixed top-4 right-4 z-[60]">
          <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {notification.type === 'success' ? <Check size={16} /> : <X size={16} />}
            {notification.message}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Gestion de Prêt</h1>
                <p className="text-xs text-gray-500">Gérez vos appareils</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {overdueLoans.length > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                  <AlertTriangle size={14} />
                  {overdueLoans.length} retard{overdueLoans.length > 1 ? 's' : ''}
                </div>
              )}
              <button onClick={() => setShowAddModal(true)} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:shadow-lg transition-all text-sm">
                <Plus size={16} />Ajouter
              </button>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => setActiveTab('appareils')} className={`px-4 py-1.5 rounded-lg font-medium transition-all text-sm ${activeTab === 'appareils' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              Appareils
            </button>
            <button onClick={() => setActiveTab('historique')} className={`px-4 py-1.5 rounded-lg font-medium transition-all text-sm flex items-center gap-1.5 ${activeTab === 'historique' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
              <History size={14} />
              Historique ({historique.length})
            </button>
            {overdueLoans.length > 0 && (
              <button onClick={() => { setActiveTab('appareils'); setStatusFilter('emprunté'); }} className={`px-4 py-1.5 rounded-lg font-medium transition-all text-sm flex items-center gap-1.5 bg-red-500 text-white hover:bg-red-600`}>
                <AlertTriangle size={14} />
                Retards ({overdueLoans.length})
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {activeTab === 'appareils' ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { key: 'disponible', label: 'Disponibles', value: stats.disponibles, color: 'green', icon: Check },
                { key: 'emprunté', label: 'Empruntés', value: stats.empruntes, color: 'amber', icon: ArrowRight },
                { key: 'maintenance', label: 'Maintenance', value: stats.maintenance, color: 'gray', icon: Wrench },
                { key: 'retard', label: 'En retard', value: stats.retards, color: 'red', icon: AlertTriangle }
              ].map(s => (
                <div key={s.key} onClick={() => s.key !== 'retard' && setStatusFilter(s.key)} className={`stat-card rounded-lg p-3 cursor-pointer ${statusFilter === s.key ? `ring-2 ring-${s.color}-500` : ''}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-600 font-medium text-xs">{s.label}</span>
                    <div className={`w-7 h-7 bg-gradient-to-br from-${s.color}-500 to-${s.color === 'amber' ? 'orange' : s.color === 'green' ? 'emerald' : s.color === 'red' ? 'rose' : s.color === 'gray' ? 'slate' : 'cyan'}-500 rounded-lg flex items-center justify-center`}>
                      <s.icon className="text-white" size={14} />
                    </div>
                  </div>
                  <p className={`text-xl font-bold ${s.color === 'red' && s.value > 0 ? 'text-red-600' : 'text-gray-800'}`}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Rechercher par nom, numéro ou emprunteur..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
            </div>

            {/* Devices Grid */}
            <div className="grid grid-cols-2 gap-3">
              {filteredAppareils.map((appareil) => {
                const isLate = appareil.statut === 'emprunté' && appareil.dateRetour && new Date(appareil.dateRetour) < new Date();
                const daysLate = isLate ? getDaysLate(appareil.dateRetour) : 0;
                
                return (
                  <div key={appareil.id} className={`bg-white rounded-xl p-4 shadow-sm border ${isLate ? 'border-red-300 bg-red-50/50' : 'border-gray-100'} card-hover`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 ${isLate ? 'bg-gradient-to-br from-red-500 to-rose-600' : 'bg-gradient-to-br from-indigo-500 to-purple-600'} rounded-xl flex items-center justify-center shadow`}>
                          <Package className="text-white" size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-sm">{appareil.nom}</h3>
                          <span className="mono text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{appareil.numero}</span>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold text-white ${isLate ? 'badge-retard' : appareil.statut === 'disponible' ? 'badge-disponible' : appareil.statut === 'emprunté' ? 'badge-emprunte' : 'badge-maintenance'}`}>
                        {isLate ? `Retard ${daysLate}j` : appareil.statut.charAt(0).toUpperCase() + appareil.statut.slice(1)}
                      </span>
                    </div>
                    
                    {appareil.statut === 'emprunté' && (
                      <div className={`text-xs ${isLate ? 'bg-red-100' : 'bg-amber-50'} rounded-lg p-2 mb-3`}>
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <User size={12} /><span className="font-medium">Emprunteur:</span> {appareil.emprunteur}
                        </div>
                        {appareil.entrepriseEmprunteur && (
                          <div className="flex items-center gap-1.5 text-gray-600 mt-1">
                            <Building2 size={12} />{appareil.entrepriseEmprunteur}
                          </div>
                        )}
                        {appareil.client && (
                          <div className="flex items-center gap-1.5 text-gray-700 mt-2 pt-2 border-t border-gray-200">
                            <User size={12} /><span className="font-medium">Client:</span> {appareil.client}
                          </div>
                        )}
                        {appareil.entrepriseClient && (
                          <div className="flex items-center gap-1.5 text-gray-600 mt-1">
                            <Building2 size={12} />{appareil.entrepriseClient}
                          </div>
                        )}
                        <div className="flex items-center gap-3 mt-2 text-gray-600">
                          <span className="flex items-center gap-1"><Calendar size={12} />Retour: {formatDate(appareil.dateRetour)}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                      {appareil.statut === 'disponible' && (
                        <>
                          <button onClick={() => openLoanModal(appareil)} className="flex-1 px-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 hover:shadow-md transition-all">
                            <ArrowRight size={14} />Emprunter
                          </button>
                          <button onClick={() => handleSetMaintenance(appareil.id)} className="p-2 bg-orange-100 text-orange-600 hover:bg-orange-200 rounded-lg transition-all" title="Mettre en maintenance">
                            <Wrench size={14} />
                          </button>
                        </>
                      )}
                      {appareil.statut === 'emprunté' && (
                        <>
                          <button onClick={() => handleReturnDevice(appareil)} className="flex-1 px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 hover:shadow-md transition-all">
                            <Check size={14} />Retourner
                          </button>
                          {isLate && (
                            <button onClick={() => handlePreviewEmail(appareil)} className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-all" title="Envoyer un rappel">
                              <Mail size={14} />
                            </button>
                          )}
                        </>
                      )}
                      {appareil.statut === 'maintenance' && (
                        <button onClick={() => handleSetAvailable(appareil.id)} className="flex-1 px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 hover:shadow-md transition-all">
                          <Check size={14} />Remettre en service
                        </button>
                      )}
                      <button onClick={() => setDeviceToDelete(appareil)} className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-all" title="Supprimer">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {filteredAppareils.length === 0 && (
              <div className="text-center py-8">
                <Search className="text-gray-300 mx-auto mb-2" size={32} />
                <p className="text-gray-500 text-sm">Aucun appareil trouvé</p>
              </div>
            )}
          </>
        ) : (
          /* History Tab */
          <div>
            <div className="mb-4 flex gap-2 flex-wrap">
              {[
                { key: 'tous', label: `Tous (${historique.length})`, gradient: 'from-indigo-600 to-purple-600' },
                { key: 'en cours', label: `En cours (${historique.filter(h => h.statut === 'en cours').length})`, gradient: 'from-orange-500 to-amber-500' },
                { key: 'terminé', label: `Terminés (${historique.filter(h => h.statut === 'terminé').length})`, gradient: 'from-green-600 to-emerald-600' }
              ].map(f => (
                <button key={f.key} onClick={() => setHistoryFilter(f.key)} className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all ${historyFilter === f.key ? `bg-gradient-to-r ${f.gradient} text-white` : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}>
                  {f.label}
                </button>
              ))}
            </div>
            
            {historique.filter(h => historyFilter === 'tous' || h.statut === historyFilter).length === 0 ? (
              <div className="text-center py-8">
                <Clock className="text-gray-300 mx-auto mb-2" size={32} />
                <p className="text-gray-500 text-sm">Aucun historique</p>
              </div>
            ) : (
              <div className="space-y-2">
                {historique.filter(h => historyFilter === 'tous' || h.statut === historyFilter).map((entry) => {
                  const isLate = entry.statut === 'en cours' && new Date(entry.dateRetourPrevue) < new Date();
                  const daysLate = isLate ? getDaysLate(entry.dateRetourPrevue) : 0;
                  const isExpanded = expandedHistory[entry.id];
                  
                  return (
                    <div key={entry.id} className={`bg-white rounded-lg shadow-sm border ${isLate ? 'border-red-200' : 'border-gray-100'}`}>
                      <div 
                        className="p-3 flex items-center gap-3 text-xs cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleHistoryExpand(entry.id)}
                      >
                        <div className={`w-8 h-8 ${isLate ? 'bg-gradient-to-br from-red-500 to-rose-600' : 'bg-gradient-to-br from-indigo-500 to-purple-600'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Package className="text-white" size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800 truncate">{entry.appareilNom}</span>
                            <span className="mono text-indigo-600 text-[10px]">{entry.appareilNumero}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-500 mt-0.5">
                            <span className="flex items-center gap-1"><User size={10} />{entry.emprunteur}</span>
                            {entry.entreprise && <span className="flex items-center gap-1"><Building2 size={10} />{entry.entreprise}</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <div className="text-center">
                            <div className="text-[10px] text-gray-400">Emprunt</div>
                            <div className="text-gray-700">{formatDate(entry.dateEmprunt)}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-[10px] text-gray-400">Retour prévu</div>
                            <div className={isLate ? 'text-red-600 font-medium' : 'text-gray-700'}>{formatDate(entry.dateRetourPrevue)}</div>
                          </div>
                          {entry.dateRetourEffective && (
                            <div className="text-center">
                              <div className="text-[10px] text-gray-400">Retour effectif</div>
                              <div className="text-emerald-600">{formatDate(entry.dateRetourEffective)}</div>
                            </div>
                          )}
                          <span className={`px-2 py-1 rounded text-[10px] font-semibold text-white ${entry.statut === 'en cours' ? (isLate ? 'bg-red-500' : 'bg-amber-500') : 'bg-green-500'}`}>
                            {entry.statut === 'en cours' ? (isLate ? `Retard ${daysLate}j` : 'En cours') : 'Terminé'}
                          </span>
                          {isExpanded ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="px-3 pb-3 pt-0 border-t border-gray-100">
                          <div className="grid grid-cols-3 gap-4 mt-3 text-xs">
                            <div className="space-y-2">
                              <h4 className="font-medium text-gray-700">Informations emprunteur</h4>
                              <div className="bg-gray-50 rounded-lg p-2 space-y-1">
                                <p className="flex items-center gap-2"><User size={12} className="text-gray-400" />{entry.emprunteur}</p>
                                {entry.telephoneEmprunteur && <p className="flex items-center gap-2"><Phone size={12} className="text-gray-400" />{entry.telephoneEmprunteur}</p>}
                                {entry.emailEmprunteur && <p className="flex items-center gap-2"><Mail size={12} className="text-gray-400" />{entry.emailEmprunteur}</p>}
                                {entry.entrepriseEmprunteur && <p className="flex items-center gap-2"><Building2 size={12} className="text-gray-400" />{entry.entrepriseEmprunteur}</p>}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-medium text-gray-700">Informations client</h4>
                              <div className="bg-gray-50 rounded-lg p-2 space-y-1">
                                {entry.client ? (
                                  <>
                                    <p className="flex items-center gap-2"><User size={12} className="text-gray-400" />{entry.client}</p>
                                    {entry.telephoneClient && <p className="flex items-center gap-2"><Phone size={12} className="text-gray-400" />{entry.telephoneClient}</p>}
                                    {entry.emailClient && <p className="flex items-center gap-2"><Mail size={12} className="text-gray-400" />{entry.emailClient}</p>}
                                    {entry.entrepriseClient && <p className="flex items-center gap-2"><Building2 size={12} className="text-gray-400" />{entry.entrepriseClient}</p>}
                                  </>
                                ) : (
                                  <p className="text-gray-400 italic">Aucun client</p>
                                )}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-medium text-gray-700">Notes</h4>
                              <div className="bg-gray-50 rounded-lg p-2">
                                {entry.notes ? <p className="text-gray-600">{entry.notes}</p> : <p className="text-gray-400 italic">Aucune note</p>}
                                {entry.notesRetour && (
                                  <div className="mt-2 pt-2 border-t border-gray-200">
                                    <p className="text-gray-500 text-[10px] mb-1">Note de retour:</p>
                                    <p className="text-gray-600">{entry.notesRetour}</p>
                                  </div>
                                )}
                                {entry.conditionRetour && (
                                  <div className="mt-2">
                                    <span className={`text-[10px] px-2 py-0.5 rounded ${
                                      entry.conditionRetour === 'bon' ? 'bg-green-100 text-green-700' :
                                      entry.conditionRetour === 'usure' ? 'bg-yellow-100 text-yellow-700' :
                                      entry.conditionRetour === 'dommage' ? 'bg-orange-100 text-orange-700' :
                                      'bg-red-100 text-red-700'
                                    }`}>
                                      État: {entry.conditionRetour === 'bon' ? 'Bon état' : entry.conditionRetour === 'usure' ? 'Usure normale' : entry.conditionRetour === 'dommage' ? 'Dommages' : 'Défaillant'}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Device Panel */}
      <SlidePanel isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Nouvel appareil">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Nom de l'appareil *</label>
            <input type="text" value={formData.nom} onChange={(e) => setFormData({...formData, nom: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder='MacBook Pro 14"' />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Numéro d'inventaire *</label>
            <input type="text" value={formData.numero} onChange={(e) => setFormData({...formData, numero: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mono" placeholder="MPB-001" />
          </div>
          <button onClick={handleAddDevice} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-medium text-sm hover:shadow-md transition-all">
            Ajouter l'appareil
          </button>
        </div>
      </SlidePanel>

      {/* Loan Panel */}
      <SlidePanel isOpen={!!selectedDevice} onClose={() => setSelectedDevice(null)} title="Enregistrer un emprunt" width="w-96">
        {selectedDevice && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Package className="text-white" size={14} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{selectedDevice.nom}</p>
                  <p className="text-xs text-indigo-600 mono">{selectedDevice.numero}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {/* Section Emprunteur */}
              <div className="col-span-2 bg-indigo-50 rounded-lg p-3">
                <h4 className="text-xs font-semibold text-indigo-700 mb-2 flex items-center gap-1.5">
                  <User size={12} />Informations Emprunteur
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Nom <span className="text-red-500">*</span></label>
                    <input type="text" value={loanForm.emprunteur} onChange={(e) => setLoanForm({...loanForm, emprunteur: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white" placeholder="Marie Dubois" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Téléphone</label>
                    <input type="tel" value={loanForm.telephoneEmprunteur} onChange={(e) => setLoanForm({...loanForm, telephoneEmprunteur: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white" placeholder="06 12 34 56 78" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" value={loanForm.emailEmprunteur} onChange={(e) => setLoanForm({...loanForm, emailEmprunteur: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white" placeholder="email@exemple.fr" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Entreprise</label>
                    <input type="text" value={loanForm.entrepriseEmprunteur} onChange={(e) => setLoanForm({...loanForm, entrepriseEmprunteur: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white" placeholder="Société ABC" />
                  </div>
                </div>
              </div>

              {/* Section Client */}
              <div className="col-span-2 bg-purple-50 rounded-lg p-3">
                <h4 className="text-xs font-semibold text-purple-700 mb-2 flex items-center gap-1.5">
                  <Building2 size={12} />Informations Client
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Nom</label>
                    <input type="text" value={loanForm.client} onChange={(e) => setLoanForm({...loanForm, client: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white" placeholder="Jean Martin" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Téléphone</label>
                    <input type="tel" value={loanForm.telephoneClient} onChange={(e) => setLoanForm({...loanForm, telephoneClient: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white" placeholder="06 98 76 54 32" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" value={loanForm.emailClient} onChange={(e) => setLoanForm({...loanForm, emailClient: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white" placeholder="client@email.com" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Entreprise</label>
                    <input type="text" value={loanForm.entrepriseClient} onChange={(e) => setLoanForm({...loanForm, entrepriseClient: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white" placeholder="Client Corp" />
                  </div>
                </div>
              </div>

              {/* Date et Notes */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Retour prévu <span className="text-red-500">*</span></label>
                <input type="date" value={loanForm.dateRetour} onChange={(e) => setLoanForm({...loanForm, dateRetour: e.target.value})} min={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Notes</label>
                <textarea value={loanForm.notes} onChange={(e) => setLoanForm({...loanForm, notes: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none" rows={2} placeholder="Remarques éventuelles..." />
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <button onClick={handlePreviewContract} disabled={!loanForm.emprunteur || !loanForm.dateRetour} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2.5 rounded-lg font-medium text-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <Eye size={16} />Aperçu contrat PDF
              </button>
              <button onClick={handleLoanDevice} disabled={!loanForm.emprunteur || !loanForm.dateRetour} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-medium text-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                Confirmer l'emprunt
              </button>
            </div>
          </div>
        )}
      </SlidePanel>

      {/* Return Modal */}
      <Modal isOpen={!!returnDevice && !pdfPreview.isOpen} onClose={() => setReturnDevice(null)} width="max-w-md">
        {returnDevice && (
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Check className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Restitution du matériel</h3>
                <p className="text-xs text-gray-500">{returnDevice.nom} ({returnDevice.numero})</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">État du matériel</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'bon', label: 'Bon état', color: 'green' },
                    { key: 'usure', label: 'Usure normale', color: 'yellow' },
                    { key: 'dommage', label: 'Dommages', color: 'orange' },
                    { key: 'defaillant', label: 'Défaillant', color: 'red' }
                  ].map(c => (
                    <button
                      key={c.key}
                      onClick={() => setReturnCondition(c.key)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        returnCondition === c.key 
                          ? `bg-${c.color}-100 text-${c.color}-700 ring-2 ring-${c.color}-500` 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Observations</label>
                <textarea
                  value={returnNotes}
                  onChange={(e) => setReturnNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Notes sur l'état du matériel..."
                />
              </div>
              
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    const historyEntry = historique.find(h => h.appareilId === returnDevice.id && h.statut === 'en cours');
                    setPdfPreview({
                      isOpen: true,
                      type: 'return',
                      data: { device: returnDevice, historyEntry, notes: returnNotes, condition: returnCondition }
                    });
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-200 transition-all"
                >
                  <FileText size={14} />Fiche PDF
                </button>
                <button
                  onClick={confirmReturn}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2.5 rounded-lg font-medium text-sm hover:shadow-md transition-all"
                >
                  Confirmer le retour
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <CompactModal isOpen={!!deviceToDelete} onClose={() => setDeviceToDelete(null)}>
        {deviceToDelete && (
          <>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="text-red-600" size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">Supprimer ?</h3>
                <p className="text-xs text-gray-500">{deviceToDelete.nom}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-4">Cette action est irréversible.</p>
            <div className="flex gap-2">
              <button onClick={() => setDeviceToDelete(null)} className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium text-sm hover:bg-gray-200 transition-all">Annuler</button>
              <button onClick={() => handleDeleteDevice(deviceToDelete.id)} className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-red-700 transition-all">Supprimer</button>
            </div>
          </>
        )}
      </CompactModal>

      {/* PDF Preview Modal */}
      <PDFPreviewModal
        isOpen={pdfPreview.isOpen}
        onClose={() => setPdfPreview({ isOpen: false, type: '', data: null })}
        title={pdfPreview.type === 'contract' ? 'Contrat de Prêt' : 'Fiche de Restitution'}
        content={
          pdfPreview.type === 'contract' && pdfPreview.data
            ? generateContractContent(pdfPreview.data.device, pdfPreview.data.loan)
            : pdfPreview.type === 'return' && pdfPreview.data
            ? generateReturnFormContent(pdfPreview.data.device, pdfPreview.data.historyEntry, pdfPreview.data.notes, pdfPreview.data.condition)
            : null
        }
        onDownload={pdfPreview.type === 'contract' ? handleDownloadContract : handleDownloadReturnForm}
      />

      {/* Email Preview Modal */}
      <EmailPreviewModal
        isOpen={emailPreview.isOpen}
        onClose={() => setEmailPreview({ isOpen: false, data: null })}
        emailData={emailPreview.data}
        onSend={handleSendEmail}
      />
    </div>
  );
}
