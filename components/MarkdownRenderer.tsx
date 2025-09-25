import React from 'react';

const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  const renderLines = (lines: string[]) => {
    const elements = [];
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Handle lists
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        if (!inList) {
          inList = true;
          elements.push(<ul key={`ul-${i}`} className="list-disc list-inside space-y-1 my-2"></ul>);
        }
        const listContent = line.trim().substring(2);
        const lastElement = elements[elements.length - 1];
        if (lastElement && lastElement.type === 'ul') {
          const newLi = <li key={`li-${i}`}>{renderText(listContent)}</li>;
          // This is a workaround since we can't directly push to children
          lastElement.props.children.push(newLi);
        }
        continue;
      } else {
        inList = false;
      }
      
      elements.push(<p key={i}>{renderText(line)}</p>);
    }

    return elements;
  };

  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const lines = text.split('\n');
  return <div className="whitespace-pre-wrap">{renderLines(lines)}</div>;
};

export default MarkdownRenderer;
