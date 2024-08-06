import React, { useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// monoBlue, nightOwl, shadesOfPurple, tomorrowNightBlue, vs2015, irBlack, xcode


function EmbedCodeButton({ src, id, name, width, height }) {
  const [showEmbedCode, setShowEmbedCode] = useState(false);
  const embedCode =  `<iframe src="${src}" id="${id}" name="${name}" width="${width}" height="${height}"></iframe>`;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500); // Reset after 1.5 seconds
  };

  return (
    <div>
      <button 
        onClick={() => setShowEmbedCode(!showEmbedCode)}
        style={{
          // position:'relative',
          padding:'0.45em .9em',
          fontWeight: 'bold',
          fontSize: '1rem',
          border:'none',

          alignItems:'center',
          justifyContent:'center',
          gap:'5px',
          display:'flex',

          
          // Demo2 styles
          backgroundColor:'#f7f7f7'
          // Demo1 styles
          // borderRadius:'1000px',
          // color: '#fff',
          // backgroundColor:'#0069d9',
          // borderColor:'#0062cc',
          }}
        >
        {showEmbedCode ? 'Embed Code' : 'Embed Code'}
        <FeatherIcon icon={'code'} size={'.95em'} style={{top:'9px', right:'-9px'}}/>
      </button>
      {showEmbedCode && (
        <div style={{position:'absolute', left:'415px', maxWidth:'494px', border:'solid thin ', zIndex:'10', fontSize:'16px'}}>
          {/* border color: rgb(210, 210, 210) */}
          <h4 style={{display:'inline-block', padding:'6.5px'}}>Embed this code into one of your websites</h4>
          <CopyToClipboard text={embedCode} onCopy={handleCopy}>
            <button style={{position:'absolute', right:'10.5px', top:'5px', gap:'10px', justifyContent:'center', alignItems:'center', display:'flex', paddingLeft:'6px'}}>{copied ? 'Copied!' : 'Copy'}
              <FeatherIcon icon='copy' size={'1.45em'} style={{margin:'2px'}}/>
            </button>
          </CopyToClipboard>




          {/* Demo1/2 styles: right:'0px' */}
          {/* Demo3 styles: right:'-88px'  */}
          {/* Demo4 styles: position:'absolute', right:'82px'  */}
          <div style={{fontSize:'13px'}}>
            <SyntaxHighlighter language="jsx" style={xcode}  wrapLongLines={true}>
            {/* <textarea readOnly value={embedCode} style={{ height:"60px", width:'400px', padding:'5px' }}/> */}
            {/* Demo1/2 styles: marginTop: '2px' */}
              {embedCode}
            </SyntaxHighlighter>
           </div>
        </div>
      )}
    </div>
  );
}

export default EmbedCodeButton;