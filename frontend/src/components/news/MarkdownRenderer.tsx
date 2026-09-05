import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  const isHtml = /<\/?[a-z][\s\S]*>/i.test(content);

  // Helper to render inline formatting (bold, italic, code, links)
  const renderInlineMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g);

    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} style={{ color: 'var(--color-secondary)' }}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={idx}>{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={idx}
            style={{
              backgroundColor: '#f1f5f9',
              padding: '0.15rem 0.35rem',
              borderRadius: '3px',
              fontSize: '0.85em',
            }}
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <a
            key={idx}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
          >
            {linkMatch[1]}
          </a>
        );
      }
      return part;
    });
  };

  // Convert DOM Node to React Node for HTML-based articles
  const convertDomToReact = (node: Node, key: string | number): React.ReactNode => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || '';
      return text ? renderInlineMarkdown(text) : null;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const elem = node as HTMLElement;
      const tagName = elem.tagName.toLowerCase();
      const childNodes = Array.from(elem.childNodes).map((child, i) => convertDomToReact(child, `${key}-${i}`));

      switch (tagName) {
        case 'p': {
          const isLead = elem.classList.contains('lead-paragraph') || elem.className.includes('lead');
          return (
            <p
              key={key}
              style={{
                fontSize: isLead ? '1.18rem' : '1.0625rem',
                lineHeight: isLead ? 1.7 : 1.75,
                color: isLead ? 'var(--color-secondary)' : '#334155',
                fontWeight: isLead ? 600 : 400,
                marginBottom: '1.25rem',
                borderLeft: isLead ? '3px solid var(--color-primary)' : 'none',
                paddingLeft: isLead ? '1rem' : '0',
              }}
            >
              {childNodes}
            </p>
          );
        }

        case 'div': {
          const isSourceBadge = elem.classList.contains('news-source-badge') || elem.className.includes('badge');
          if (isSourceBadge) {
            return (
              <div
                key={key}
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderLeft: '4px solid var(--color-primary)',
                  borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                  padding: '0.75rem 1rem',
                  fontSize: '0.875rem',
                  color: '#475569',
                  margin: '1.5rem 0',
                }}
              >
                {childNodes}
              </div>
            );
          }
          return <div key={key} style={{ margin: '0.75rem 0' }}>{childNodes}</div>;
        }

        case 'h1':
          return (
            <h2 key={key} style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-secondary)', marginTop: '2rem', marginBottom: '0.75rem' }}>
              {childNodes}
            </h2>
          );
        case 'h2':
          return (
            <h3 key={key} style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-secondary)', marginTop: '1.75rem', marginBottom: '0.75rem' }}>
              {childNodes}
            </h3>
          );
        case 'h3':
          return (
            <h4 key={key} style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-secondary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              {childNodes}
            </h4>
          );

        case 'strong':
        case 'b':
          return <strong key={key} style={{ fontWeight: 700, color: 'var(--color-secondary)' }}>{childNodes}</strong>;

        case 'em':
        case 'i':
          return <em key={key}>{childNodes}</em>;

        case 'blockquote':
          return (
            <blockquote
              key={key}
              style={{
                borderLeft: '4px solid var(--color-primary)',
                backgroundColor: '#fff1f2',
                padding: '1rem 1.25rem',
                margin: '1.5rem 0',
                borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                fontStyle: 'italic',
                fontSize: '1rem',
                color: 'var(--color-secondary)',
                lineHeight: 1.6,
              }}
            >
              {childNodes}
            </blockquote>
          );

        case 'ul':
          return (
            <ul key={key} style={{ paddingLeft: '1.5rem', margin: '1rem 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {childNodes}
            </ul>
          );

        case 'ol':
          return (
            <ol key={key} style={{ paddingLeft: '1.5rem', margin: '1rem 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {childNodes}
            </ol>
          );

        case 'li':
          return <li key={key} style={{ lineHeight: 1.6, color: '#334155' }}>{childNodes}</li>;

        case 'img': {
          const src = elem.getAttribute('src') || '';
          const alt = elem.getAttribute('alt') || '';
          return (
            <figure key={key} style={{ margin: '2rem 0' }}>
              <img
                src={src}
                alt={alt}
                style={{
                  width: '100%',
                  maxHeight: '500px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                loading="lazy"
              />
              {alt && (
                <figcaption style={{ fontSize: '0.8125rem', color: '#64748b', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
                  {alt}
                </figcaption>
              )}
            </figure>
          );
        }

        case 'br':
          return <br key={key} />;

        case 'a': {
          const href = elem.getAttribute('href') || '#';
          return (
            <a key={key} href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
              {childNodes}
            </a>
          );
        }

        default:
          return <span key={key}>{childNodes}</span>;
      }
    }

    return null;
  };

  // If input contains HTML tags, parse with DOMParser
  if (isHtml) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const bodyNodes = Array.from(doc.body.childNodes);
      return (
        <div className="article-body-content">
          {bodyNodes.map((node, i) => convertDomToReact(node, i))}
        </div>
      );
    } catch {
      // Fall through to Markdown parsing if DOMParser fails
    }
  }

  // Split by double newline to form blocks for standard Markdown
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className="article-body-content">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Image match: ![alt](url)
        const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (imgMatch) {
          const altText = imgMatch[1];
          const imgUrl = imgMatch[2];
          return (
            <figure key={index} className="article-embedded-figure" style={{ margin: '2rem 0' }}>
              <img
                src={imgUrl}
                alt={altText}
                style={{
                  width: '100%',
                  maxHeight: '500px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                loading="lazy"
              />
              {altText && (
                <figcaption
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--color-text-muted)',
                    textAlign: 'center',
                    marginTop: '0.5rem',
                    fontStyle: 'italic',
                  }}
                >
                  {altText}
                </figcaption>
              )}
            </figure>
          );
        }

        // H1 Heading
        if (trimmed.startsWith('# ')) {
          return (
            <h2 key={index} className="article-heading-1" style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>
              {renderInlineMarkdown(trimmed.replace(/^#\s+/, ''))}
            </h2>
          );
        }

        // H2 Heading
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={index} className="article-heading-2" style={{ marginTop: '1.75rem', marginBottom: '0.75rem' }}>
              {renderInlineMarkdown(trimmed.replace(/^##\s+/, ''))}
            </h3>
          );
        }

        // H3 Heading
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={index} className="article-heading-3" style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              {renderInlineMarkdown(trimmed.replace(/^###\s+/, ''))}
            </h4>
          );
        }

        // Blockquote / Source badge
        if (trimmed.startsWith('>')) {
          const quoteLines = trimmed
            .split('\n')
            .map((line) => line.replace(/^>\s?/, ''))
            .join(' ');
          return (
            <blockquote
              key={index}
              style={{
                borderLeft: '4px solid var(--color-primary)',
                backgroundColor: '#fff1f2',
                padding: '1rem 1.25rem',
                margin: '1.5rem 0',
                borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                fontStyle: 'italic',
                fontSize: '1rem',
                color: 'var(--color-secondary)',
                lineHeight: 1.6,
              }}
            >
              {renderInlineMarkdown(quoteLines)}
            </blockquote>
          );
        }

        // Unordered List
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const listItems = trimmed.split('\n').filter((l) => l.trim().startsWith('- ') || l.trim().startsWith('* '));
          return (
            <ul
              key={index}
              style={{
                paddingLeft: '1.5rem',
                margin: '1rem 0 1.5rem 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {listItems.map((item, i) => (
                <li key={i} style={{ lineHeight: 1.6 }}>
                  {renderInlineMarkdown(item.replace(/^[-*]\s+/, ''))}
                </li>
              ))}
            </ul>
          );
        }

        // Regular Paragraph
        return (
          <p
            key={index}
            style={{
              marginBottom: '1.25rem',
              fontSize: '1.0625rem',
              lineHeight: 1.75,
              color: '#334155',
            }}
          >
            {renderInlineMarkdown(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

