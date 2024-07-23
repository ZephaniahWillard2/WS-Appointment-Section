import React, { useState, useEffect } from 'react';
import FeatherIcons from 'feather-icons-react';
import CopyToClipboard from 'react-copy-to-clipboard';

export const CopyToCheck = ({ success, width, height, style = {} }) => {
  return (
    <span style={{ position: 'relative', width, height, ...style }}>
      <FeatherIcons
        icon={'copy'}
        as={'button'}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width,
          height,
          ...(success ? { opacity: 0 } : { transition: '.25s' }),
        }}
      />
      <FeatherIcons
        icon={success ? 'check' : 'copy'}
        className={success ? 'text-success' : ''}
        as={'button'}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width,
          height,
          ...(success ? { transition: '.25s' } : { opacity: 0 }),
        }}
      />
    </span>
  );
};

const CopyText = ({ copyText, text, style = {}, className = '', ...props }) => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 4000);
    }
  }, [copied]);
  return (
    <CopyToClipboard
      text={copyText}
      onCopy={() => {
        setCopied(true);
      }}
    >
      {/* !!!!!!  CopyText Button */}
      <button
        onClick={e => e.stopPropagation()}
        {...props}
        type={'button'}
        className={`flex-c-c ${className}`}
        style={{ gap: 5, whiteSpace: 'nowrap', backgroundColor:'pink', ...style }}
      >
        <CopyToCheck
          success={copied}
          width={'1.3em'}
          height={'1.3em'}
          style={{ display: 'inline-block' }}
        />
        {copied ? <span className="text-success">Copied!</span> : text}
      </button>
    </CopyToClipboard>
  );
};

export default CopyText;









// <>
//           {!editing && projectId !== undefined && (

//               <>
//                 {!isGroupClass && (
//                   <CloneAppointmentType
//                     cloneObjectId={id}
//                     cloneObjectName={titleValue}
//                     text={'Clone'}
//                     className="btn round pl-0 pr-2 btn-sm"
//                     style={{ marginRight: 3, fontWeight: 'bold', display:"flex" }}
//                   />
//                 )}
//               </>
//               )}
//                {!editing && projectId !== undefined && (
//               <>
//                 {/* !!!!!!    Took out "add" in line above */}
//                 <CopyText
//                   copyText={copyText}
//                   text={'Copy Link'}
//                   className="btn round px-0 btn-sm"
//                   style={{ marginRight: 3, fontWeight: 'bold' }}
//                 />
//               </>
//               )}
//         </>