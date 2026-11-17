// Minimal BibTeX parser for a personal publication list.
// Handles @type{key, field = {value} | "value" | number, ...} with nested braces.
//
// Site-only fields (stripped from the BibTeX shown to visitors):
//   abbr     short venue label shown as a badge, e.g. {TENSYMP}
//   selected {true} to feature on the home page
//   abstract shown behind the "Abstract" button
//   award    e.g. {Best Paper Award}
//   pdf, code, slides, video, preview (image path), url

export type Publication = {
  key: string;
  type: string;
  kind: 'journal' | 'conference' | 'thesis' | 'report' | 'other';
  abbr: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  doi?: string;
  url?: string;
  pdf?: string;
  code?: string;
  slides?: string;
  video?: string;
  preview?: string;
  abstract?: string;
  award?: string;
  note?: string;
  selected: boolean;
  bibtex: string;
};

const KIND: Record<string, Publication['kind']> = {
  article: 'journal',
  inproceedings: 'conference',
  conference: 'conference',
  incollection: 'conference',
  mastersthesis: 'thesis',
  phdthesis: 'thesis',
  techreport: 'report',
};

const DEFAULT_ABBR: Record<Publication['kind'], string> = {
  journal: 'Journal', conference: 'Conf.', thesis: 'Thesis', report: 'Report', other: 'Article',
};

const SITE_ONLY = new Set(['abbr', 'selected', 'abstract', 'award', 'pdf', 'code', 'slides', 'video', 'preview']);

function clean(v: string): string {
  return v
    .replace(/\\&/g, '&')
    .replace(/--/g, '–')
    .replace(/[{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function readValue(src: string, i: number): [string, number] {
  const ch = src[i];
  if (ch === '{') {
    let depth = 0;
    let j = i;
    for (; j < src.length; j++) {
      if (src[j] === '{') depth++;
      else if (src[j] === '}' && --depth === 0) break;
    }
    return [src.slice(i + 1, j), j + 1];
  }
  if (ch === '"') {
    const j = src.indexOf('"', i + 1);
    return [src.slice(i + 1, j), j + 1];
  }
  const m = /^[^,}\s]+/.exec(src.slice(i));
  return [m ? m[0] : '', i + (m ? m[0].length : 0)];
}

export function parseBibtex(src: string): Publication[] {
  const out: Publication[] = [];
  const re = /@(\w+)\s*\{\s*([^,\s]+)\s*,/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const type = m[1].toLowerCase();
    if (type === 'comment' || type === 'string' || type === 'preamble') continue;
    const fields: Record<string, string> = {};
    const order: string[] = [];
    let i = re.lastIndex;
    while (i < src.length) {
      while (/[\s,]/.test(src[i])) i++;
      if (src[i] === '}') { i++; break; }
      const nm = /^([\w-]+)\s*=\s*/.exec(src.slice(i));
      if (!nm) break;
      i += nm[0].length;
      const [val, next] = readValue(src, i);
      const k = nm[1].toLowerCase();
      fields[k] = val;
      order.push(k);
      i = next;
    }
    re.lastIndex = i;

    const authors = (fields.author ?? '')
      .split(/\s+and\s+/)
      .map((a) => {
        const [last, first] = a.split(',').map((s) => clean(s));
        return first ? `${first} ${last}` : clean(last ?? '');
      })
      .filter(Boolean);

    const venueRaw = clean(
      fields.journal ?? fields.booktitle ?? fields.school ?? fields.institution ?? fields.howpublished ?? ''
    );
    const kind = KIND[type] ?? 'other';
    const pad = Math.max(...order.filter((k) => !SITE_ONLY.has(k)).map((k) => k.length));
    const bibtex =
      `@${type}{${m[2]},\n` +
      order
        .filter((k) => !SITE_ONLY.has(k))
        .map((k) => `  ${k.padEnd(pad)} = {${fields[k]}}`)
        .join(',\n') +
      '\n}';

    out.push({
      key: m[2],
      type,
      kind,
      abbr: fields.abbr ? clean(fields.abbr) : DEFAULT_ABBR[kind],
      title: clean(fields.title ?? ''),
      authors,
      venue: fields.type ? `${clean(fields.type)}, ${venueRaw}` : venueRaw,
      year: Number(fields.year) || 0,
      doi: fields.doi ? clean(fields.doi) : undefined,
      url: fields.url?.trim(),
      pdf: fields.pdf?.trim(),
      code: fields.code?.trim(),
      slides: fields.slides?.trim(),
      video: fields.video?.trim(),
      preview: fields.preview?.trim(),
      abstract: fields.abstract ? clean(fields.abstract) : undefined,
      award: fields.award ? clean(fields.award) : undefined,
      note: fields.note ? clean(fields.note) : undefined,
      selected: /^(true|yes|1)$/i.test((fields.selected ?? '').trim()),
      bibtex,
    });
  }
  return out.sort((a, b) => b.year - a.year);
}
