import React, { useState } from 'react';

function EmbedCodeButton({ src, id, name, width, height }) {
  const [showEmbedCode, setShowEmbedCode] = useState(false);

  const embedCode =  `<iframe src="${src}" id="${id}" name="${name}" width="${width}" height="${height}"></iframe>`;
  
// Or just src if I'm misunderstadning this

  return (
    <div>
      <button onClick={() => setShowEmbedCode(!showEmbedCode)}>
        {showEmbedCode ? 'Hide Embed Code' : 'Show Embed Code'}
      </button>
      {showEmbedCode && (
        <div>
          <textarea readOnly value={embedCode} style={{ height:"50px", width:'400px' }}/>
        </div>
      )}
    </div>
  );
}

export default EmbedCodeButton;