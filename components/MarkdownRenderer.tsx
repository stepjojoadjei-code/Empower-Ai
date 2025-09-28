import React from 'react';
import CodeBlock from './CodeBlock';

const renderInline = (line: string): React.ReactNode => {
    const parts = line.split(/(\*\*.*?\*\*|\*.*?\*|_.*?_|`.*?`)/g);
    
    return parts.filter(Boolean).map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if ((part.startsWith('*') && part.endsWith('*')) || (part.startsWith('_') && part.endsWith('_'))) {
            return <em key={index}>{part.slice(1, -1)}</em>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={index} className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded px-1.5 py-1 text-sm font-mono">{part.slice(1, -1)}</code>;
        }
        return part;
    });
};

const TextSegment: React.FC<{ text: string }> = ({ text }) => {
    const lines = text.split('\n');
    const blocks: React.ReactNode[] = [];
    let listItems: string[] = [];

    const flushList = (key: string) => {
        if (listItems.length > 0) {
            blocks.push(
                <ul key={key} className="list-disc list-outside pl-6 my-2 space-y-1">
                    {listItems.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
                </ul>
            );
            listItems = [];
        }
    };

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
            listItems.push(trimmedLine.substring(2));
        } else {
            flushList(`ul-${index}`);
            if (line.length > 0) { // Render paragraphs, even if just whitespace, to preserve line breaks
                blocks.push(<p key={`p-${index}`}>{renderInline(line)}</p>);
            } else if (index < lines.length -1) { // Render an empty paragraph for line breaks
                 blocks.push(<p key={`p-${index}`}></p>);
            }
        }
    });

    flushList('ul-end');

    return <>{blocks}</>;
};

const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
    // Split by fenced code blocks first
    const parts = text.split(/(```[\s\S]*?```)/g);

    return (
        <div className="space-y-2 break-words whitespace-pre-wrap">
            {parts.filter(Boolean).map((part, index) => {
                if (part.startsWith('```') && part.endsWith('```')) {
                    const codeBlock = part.slice(3, -3);
                    const firstLineBreak = codeBlock.indexOf('\n');
                    const language = codeBlock.substring(0, firstLineBreak).trim();
                    const code = codeBlock.substring(firstLineBreak + 1).trim();
                    return <CodeBlock key={index} language={language} code={code} />;
                }
                return <TextSegment key={index} text={part} />;
            })}
        </div>
    );
};

export default MarkdownRenderer;