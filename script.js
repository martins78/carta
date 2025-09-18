
    // ===== Tipos y plantillas =====
    const tipos = [
      { id:'formal', nombre:'Carta Formal' },
      { id:'comercial', nombre:'Carta Comercial' },
      { id:'administrativa', nombre:'Carta Administrativa' },
      { id:'memorandum', nombre:'Memorándum' },
      { id:'oficio', nombre:'Oficio' },
      { id:'informal', nombre:'Carta Informal' },
      { id:'pasantias', nombre:'Carta de Solicitud de Pasantías' },
      { id:'renuncia', nombre:'Carta de Renuncia' },
      { id:'agradecimiento', nombre:'Carta de Agradecimiento' },
      { id:'reclamo', nombre:'Carta de Reclamo' },
      { id:'llamado', nombre:'Memorándum de Llamado de Atención' },
      { id:'remision', nombre:'Oficio de Remisión' },
      { id:'invitacion', nombre:'Carta de Invitación' },
      { id:'recomendacion', nombre:'Carta de Recomendación' }
    ];

    const frases = {
      formal:{Apertura:['Me dirijo a usted con el debido respeto para','Por medio de la presente, me permito','Reciba un cordial saludo. El motivo de la presente es'],Cierre:['Agradeciendo de antemano su atención, quedo a disposición.','Sin otro particular, me despido cordialmente.','Quedo atento(a) a cualquier información adicional.']},
      comercial:{Apertura:['Nos es grato contactar con usted para','En atención a su consulta, procedemos a','Conforme a nuestra política comercial, deseamos'],Cierre:['Quedamos a la espera de su confirmación para proceder.','Será un placer atender cualquier duda comercial.','Agradecemos su preferencia.']},
      administrativa:{Apertura:['En cumplimiento de las disposiciones internas, se comunica','Por la presente, se informa a la unidad correspondiente','Se hace conocer al personal que'],Cierre:['Se ruega la mayor difusión y cumplimiento.','Agradecemos su colaboración oportuna.','Para fines consiguientes, regístrese y archívese.']},
      memorandum:{Apertura:['MEMORÁNDUM: Por este medio se comunica','Se instruye a la unidad','Se recuerda que'],Cierre:['Cúmplase y archívese.','Para fines administrativos, tómese razón.','Comuníquese a quien corresponda.']},
      oficio:{Apertura:['Tengo a bien dirigirme a usted para','En atención a la nota recibida, corresponde','Por disposición superior, se solicita'],Cierre:['Sin otro particular, reitero mis consideraciones.','Agradezco su gentil atención.','Se agradece confirmar recepción.']},
      informal:{Apertura:['Hola, espero que te encuentres muy bien.','Quería escribirte para contarte que','Hace tiempo que no hablamos y'],Cierre:['Un abrazo grande.','Con cariño.','Nos vemos pronto.']},
      pasantias:{Apertura:['Me permito solicitar de manera atenta la posibilidad de realizar mis prácticas en su institución.'],Cierre:['Agradezco de antemano la oportunidad que se me pueda brindar.']},
      renuncia:{Apertura:['Por la presente pongo a su consideración mi renuncia irrevocable al cargo que desempeño.'],Cierre:['Agradezco la confianza depositada en mí durante mi permanencia.']},
      agradecimiento:{Apertura:['Deseo expresar mi sincero agradecimiento por la colaboración brindada.'],Cierre:['Reitero mis agradecimientos y quedo a disposición.']},
      reclamo:{Apertura:['Por medio de la presente expongo mi reclamo respecto a'],Cierre:['Solicito se tomen las medidas necesarias a la brevedad posible.']},
      llamado:{Apertura:['Se llama la atención al Sr./Sra. … debido a'],Cierre:['Se advierte que la reincidencia dará lugar a sanciones.']},
      remision:{Apertura:['Remito a su consideración la documentación adjunta.'],Cierre:['Se agradece su confirmación de recepción.']},
      invitacion:{Apertura:['Tengo el agrado de invitarle cordialmente a'],Cierre:['Será grato contar con su presencia.']},
      recomendacion:{Apertura:['Me complace recomendar a … por su desempeño en'],Cierre:['Confío plenamente en sus capacidades y cualidades.']}
    };

    const plantillas = {
      formal: (d)=> `\n${d.ciudad}, ${d.fecha}\n\n${d.dest}\n${d.cargoDest}\n\nAsunto: ${d.asunto}\n\n${d.cuerpo}\n\n${d.despedida}\n\n${d.firma}\n${d.cargo}\n`,
      comercial: (d)=> plantillas.formal(d),
      administrativa: (d)=> plantillas.formal(d),
      memorandum: (d)=> `\n${d.org}\nMEMORÁNDUM\n${d.ciudad}, ${d.fecha}\n\nAsunto: ${d.asunto}\n\n${d.cuerpo}\n\n${d.firma}\n${d.cargo}\n`,
      oficio: (d)=> `\n${d.org}\nOFICIO\n${d.ciudad}, ${d.fecha}\n\nRef.: ${d.asunto}\n\n${d.cuerpo}\n\nAtentamente,\n\n${d.firma}\n${d.cargo}\n`,
      informal: (d)=> plantillas.formal(d),
      pasantias: (d)=> plantillas.formal(d),
      renuncia: (d)=> plantillas.formal(d),
      agradecimiento: (d)=> plantillas.formal(d),
      reclamo: (d)=> plantillas.formal(d),
      llamado: (d)=> plantillas.memorandum(d),
      remision: (d)=> plantillas.oficio(d),
      invitacion: (d)=> plantillas.formal(d),
      recomendacion: (d)=> plantillas.formal(d)
    };

    // ===== Utilidades =====
    const $ = (id)=> document.getElementById(id);
    const fields = ['ciudad','fecha','remitente','cargo','organizacion','destinatario','cargoDest','asunto','cuerpo','despedida','firma','contacto'];

    function isoToHuman(iso){
      if(!iso) return '—';
      const d = new Date(iso + 'T00:00:00');
      return d.toLocaleDateString('es-BO',{year:'numeric',month:'long',day:'2-digit'});
    }

    function refreshPreview(){
      const d = Object.fromEntries(fields.map(k=>[k, $(k).value.trim()]));
      $('orgPrev').textContent = d.organizacion||'—';
      $('contactoPrev').textContent = d.contacto||'—';
      $('ciudadPrev').textContent = d.ciudad||'—';
      $('fechaPrev').textContent = isoToHuman(d.fecha);
      $('destPrev').textContent = d.destinatario||'—';
      $('cargoDestPrev').textContent = d.cargoDest||'—';
      $('asuntoPrev').textContent = d.asunto||'—';
      $('cuerpoPrev').textContent = d.cuerpo||'—';
      $('despedidaPrev').textContent = d.despedida||'—';
      $('firmaPrev').textContent = d.firma||'—';
      $('cargoPrev').textContent = d.cargo||'';
      $('remitentePrev').textContent = d.remitente||'';
      // marca agua si falta firma o asunto
      $('marcaAgua').style.display = (!d.asunto || !d.firma) ? 'grid' : 'none';
    }

    fields.forEach(id=> $(id).addEventListener('input', refreshPreview));

    // Logo: mantener DataURL para usarlo en exportación
    let logoDataURL = null;
    $('logo').addEventListener('change', (ev)=>{
      const f = ev.target.files?.[0];
      if(!f){ logoDataURL=null; $('logoPrev').style.display='none'; return; }
      const reader = new FileReader();
      reader.onload = ()=>{ logoDataURL = reader.result; $('logoPrev').src = logoDataURL; $('logoPrev').style.display='block'; };
      reader.readAsDataURL(f);
    });

    // Menú
    const menu = $('menu');
    function renderMenu(filter=''){
      menu.innerHTML = '';
      tipos.filter(t=> t.nombre.toLowerCase().includes(filter.toLowerCase()))
           .forEach((t,i)=>{
        const b = document.createElement('button');
        b.textContent = t.nombre; b.dataset.id=t.id;
        if(i===0) b.classList.add('active');
        b.onclick = ()=> selectTipo(t.id);
        menu.appendChild(b);
      });
    }
    renderMenu();
    $('searchTpl').addEventListener('input', e=> renderMenu(e.target.value));

    // Selector de plantilla y estilo visual del body
    let tipoActual = 'formal';
    const selPlantilla = $('plantillaSelect');
    tipos.forEach(t=>{ const o=document.createElement('option'); o.value=t.id; o.textContent=t.nombre; selPlantilla.appendChild(o); });
    selPlantilla.value = 'formal';

    function selectTipo(id){
      tipoActual = id; selPlantilla.value=id;
      document.querySelectorAll('.menu button').forEach(b=> b.classList.toggle('active', b.dataset.id===id));
      $('tipoActual').textContent = tipos.find(t=>t.id===id)?.nombre || '—';
      aplicarPlantilla();
    }
    selPlantilla.addEventListener('change', (e)=> selectTipo(e.target.value));

    $('estilo').addEventListener('change', (e)=>{
      document.body.classList.remove('style-classic','style-modern','style-institutional');
      document.body.classList.add(e.target.value);
    });

    function datos(){
      const d = Object.fromEntries(fields.map(k=>[k, $(k).value.trim()]));
      return {
        ciudad: d.ciudad||'[Ciudad]',
        fecha: isoToHuman(d.fecha),
        remitente: d.remitente||'',
        cargo: d.cargo||'',
        org: d.organizacion||'',
        dest: d.destinatario||'',
        cargoDest: d.cargoDest||'',
        asunto: d.asunto||'',
        cuerpo: d.cuerpo||'',
        despedida: d.despedida||'',
        firma: d.firma||'',
        contacto: d.contacto||''
      };
    }

    function aplicarPlantilla(){
      const d = datos();
      const fn = plantillas[tipoActual] || plantillas.formal;
      const _texto = fn(d).trim();
      refreshPreview();
    }

    // Frases sugeridas
    const dlgFrases = $('dlgFrases');
    $('insertarFrase').addEventListener('click', ()=>{
      const set = frases[tipoActual] || {};
      const wrap = $('frasesWrap');
      wrap.innerHTML = '';
      Object.entries(set).forEach(([grupo, arr])=>{
        const title = document.createElement('div');
        title.style.width='100%'; title.style.margin='6px 0'; title.style.fontWeight='700'; title.textContent = grupo;
        wrap.appendChild(title);
        arr.forEach(texto=>{
          const chip = document.createElement('button');
          chip.className='btn ghost'; chip.style.padding='6px 10px'; chip.textContent = texto;
          chip.onclick = ()=> insertAtCursor($('cuerpo'), texto + (/[.!?]$/.test(texto)?'':'... ') );
          wrap.appendChild(chip);
        });
      });
      dlgFrases.showModal();
    });

    function insertAtCursor(el, text){
      const [start,end] = [el.selectionStart||0, el.selectionEnd||0];
      const before = el.value.substring(0,start);
      const after  = el.value.substring(end);
      el.value = before + (before && !before.endsWith('\n') ? ' ' : '') + text + after;
      el.focus();
      const pos = (before + text).length;
      el.selectionStart = el.selectionEnd = pos;
      refreshPreview();
    }

    // Imprimir
    $('imprimir').addEventListener('click', ()=> window.print());

    // Guardar / Cargar borrador
    $('guardar').addEventListener('click', ()=>{
      const data = Object.fromEntries(fields.map(k=>[k, $(k).value]));
      data.tipo = tipoActual; data.estilo = $('estilo').value; data.logo = logoDataURL;
      localStorage.setItem('cartaDraftV3', JSON.stringify(data));
      alert('Borrador guardado');
    });
    $('cargar').addEventListener('click', ()=>{
      const raw = localStorage.getItem('cartaDraftV3');
      if(!raw) return alert('No hay borrador guardado');
      const data = JSON.parse(raw);
      fields.forEach(k=> { if(data[k]!==undefined) $(k).value = data[k]; });
      if(data.tipo) selectTipo(data.tipo); else refreshPreview();
      if(data.estilo){ $('estilo').value=data.estilo; document.body.className=data.estilo; }
      if(data.logo){ logoDataURL=data.logo; $('logoPrev').src=data.logo; $('logoPrev').style.display='block'; }
    });

    // ===== Exportación PDF con jsPDF =====
    $('exportPDF').addEventListener('click', async ()=>{
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ unit:'pt', format:'a4' });
      const margin = 56; // 3/4 inch aprox
      const pageWidth = pdf.internal.pageSize.getWidth();
      let y = margin;

      // Encabezado según estilo
      const estilo = document.body.classList.contains('style-modern') ? 'moderno' : document.body.classList.contains('style-institutional') ? 'institucional' : 'clasico';

      if(estilo==='moderno'){
        pdf.setFillColor(29,78,216); // azul
        pdf.rect(0,0,pageWidth,28,'F');
        y += 6;
      }
      if(estilo==='institucional'){
        const gradH = 40; pdf.setFillColor(29,78,216); pdf.rect(0,0,pageWidth,gradH,'F');
        pdf.setFillColor(14,165,233); pdf.rect(0,gradH-8,pageWidth,8,'F');
        y += 10;
      }

      // Logo
      if(logoDataURL){
        try{ pdf.addImage(logoDataURL, logoDataURL.includes('image/png')?'PNG':'JPEG', margin, y-20, 64, 64); }catch(e){}
      }

      const d = datos();
      pdf.setFont('Times','Bold'); pdf.setFontSize(14);
      pdf.text(d.org || '', margin + (logoDataURL?74:0), y);
      pdf.setFont('Times','Normal'); pdf.setFontSize(10);
      pdf.text(d.contacto || '', margin + (logoDataURL?74:0), y+14);
      pdf.text(`${d.ciudad}, ${d.fecha}`, margin + (logoDataURL?74:0), y+28);

      y += 70;

      // Destinatario
      pdf.setFont('Times','Bold'); pdf.setFontSize(12);
      pdf.text(d.dest || '', margin, y); y += 14;
      pdf.setFont('Times','Normal');
      pdf.text(d.cargoDest || '', margin, y); y += 18;

      // Asunto
      pdf.setFont('Times','Bold');
      pdf.text(`Asunto: ${d.asunto}`, margin, y); y += 18;

      // Cuerpo (text wrap)
      pdf.setFont('Times','Normal'); pdf.setFontSize(12);
      const cuerpoLines = pdf.splitTextToSize(d.cuerpo || '', pageWidth - margin*2);
      pdf.text(cuerpoLines, margin, y); y += (cuerpoLines.length*14) + 16;

      // Despedida y firma
      pdf.text(d.despedida || '', margin, y); y += 48;
      pdf.setFont('Times','Bold'); pdf.text(d.firma || '', margin, y); y += 14;
      pdf.setFont('Times','Normal'); pdf.text(d.cargo || '', margin, y);

      pdf.save(`carta_${tipoActual}.pdf`);
    });

    // ===== Exportación DOCX con docx.js =====
    $('exportDOCX').addEventListener('click', async ()=>{
      const { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, ImageRun } = window.docx;
      const d = datos();

      // Convertir dataURL a ArrayBuffer
      async function dataURLToArrayBuffer(dataURL){
        const res = await fetch(dataURL); return await res.arrayBuffer();
      }

      const children = [];

      // Encabezado institucional con logo
      if(logoDataURL){
        try{
          const imgBuf = await dataURLToArrayBuffer(logoDataURL);
          children.push(new Paragraph({ children:[ new ImageRun({ data: imgBuf, transformation: { width: 120, height: 120 } }) ] }));
        }catch(e){}
      }

      if(d.org){
        children.push(new Paragraph({ alignment: AlignmentType.LEFT, spacing:{after:120}, children:[ new TextRun({ text: d.org, bold:true, size:28 }) ] }));
      }
      if(d.contacto){
        children.push(new Paragraph({ alignment: AlignmentType.LEFT, children:[ new TextRun({ text: d.contacto, size:20, color:'444444' }) ] }));
      }
      children.push(new Paragraph({ alignment: AlignmentType.LEFT, spacing:{after:320}, children:[ new TextRun({ text: `${d.ciudad}, ${d.fecha}`, size:20, color:'444444' }) ] }));

      // Destinatario
      if(d.dest){ children.push(new Paragraph({ children:[ new TextRun({ text: d.dest, bold:true, size:24 }) ] })); }
      if(d.cargoDest){ children.push(new Paragraph({ spacing:{after:160}, children:[ new TextRun({ text: d.cargoDest, size:22 }) ] })); }

      // Asunto
      if(d.asunto){ children.push(new Paragraph({ children:[ new TextRun({ text:`Asunto: ${d.asunto}`, bold:true, size:24 }) ] })); }

      // Cuerpo
      if(d.cuerpo){ d.cuerpo.split(/\n+/).forEach(p=> children.push(new Paragraph({ spacing:{after:160}, children:[ new TextRun({ text:p, size:24 }) ] }))); }

      // Despedida y firma
      if(d.despedida){ children.push(new Paragraph({ spacing:{before:160}, children:[ new TextRun({ text:d.despedida, size:24 }) ] })); }
      children.push(new Paragraph({ spacing:{before:360}, children:[ new TextRun({ text:d.firma || '', bold:true, size:24 }) ] }));
      if(d.cargo){ children.push(new Paragraph({ children:[ new TextRun({ text:d.cargo, size:22, color:'444444' }) ] })); }

      const doc = new Document({
        sections: [{ properties: { page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } } }, children }]
      });

      const blob = await Packer.toBlob(doc);
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `carta_${tipoActual}.docx`;
      a.click();
      URL.revokeObjectURL(a.href);
    });

    // Estado inicial
    (function init(){
      $('fecha').valueAsDate = new Date();
      $('ciudad').value = 'La Paz';
      $('despedida').value = 'Sin otro particular, saludo a usted atentamente.';
      $('tipoActual').textContent = 'Carta Formal';
      renderMenu(); selectTipo('formal'); refreshPreview();
    })();