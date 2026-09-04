import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  // Split by double newline to form blocks
  const blocks = content.split(/\n\s*\n/);

  const renderFormattedText = (text: string) => {
    // Regex replacements for inline tokens:
    // Bold: **text**
    // Italic: *text*
    // Inline code: `code`
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx}>{part.slice(2, -2)}</strong>;
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
      return part;
    });
  };

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
              {renderFormattedText(trimmed.replace(/^#\s+/, ''))}
            </h2>
          );
        }

        // H2 Heading
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={index} className="article-heading-2" style={{ marginTop: '1.75rem', marginBottom: '0.75rem' }}>
              {renderFormattedText(trimmed.replace(/^##\s+/, ''))}
            </h3>
          );
        }

        // H3 Heading
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={index} className="article-heading-3" style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              {renderFormattedText(trimmed.replace(/^###\s+/, ''))}
            </h4>
          );
        }

        // Blockquote
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
                padding: '1rem 1.5rem',
                margin: '1.5rem 0',
                borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                fontStyle: 'italic',
                fontSize: '1.05rem',
                color: 'var(--color-secondary)',
                lineHeight: 1.6,
              }}
            >
              {renderFormattedText(quoteLines)}
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
                  {renderFormattedText(item.replace(/^[-*]\s+/, ''))}
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
            {renderFormattedText(trimmed)}
          </p>
        );
      })}
    </div>
  );
};
