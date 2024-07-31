import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import FeatherIcons from 'feather-icons-react';
import BootstrapToast from 'react-bootstrap/Toast';
// import { DEFAULT_TOAST_DELAY } from 'components/Toast/constants';
import { Modal } from 'react-bootstrap';
// import useScrollToHash from 'hooks/useScrollToHash';

// To allow for "as"
const Button = styled.button``;

const DEFAULT_TOAST_DELAY = 3000;

export const SmallAlert = ({
  type = 'warning',
  className = '',
  style = {},
  children,
  ...props
}) => {
  return (
    <div
      className={`alert alert-${type} px-3 py-2 mt-2 mb-2 ${className}`}
      role="alert"
      style={{ lineHeight: 1, ...style }}
      {...props}
    >
      <small>{children}</small>
    </div>
  );
};

export const BtnRemove = ({
  children,
  onCancel,
  removeText,
  confirm = true,
  style = {},
  className = '',
  hide = false,
  onClick,
  ...props
}) => {
  // TODO: Add a modal instead of inline
  const [showModal, setShowModal] = useState(false);
  const styleConst = { whiteSpace: 'nowrap' };
  return (
    <>
      <button
        type="button"
        onClick={confirm && !showModal ? () => setShowModal(true) : onClick}
        {...props}
        style={{
          ...(hide ? { display: 'none' } : {}),
          ...style,
          ...styleConst,
        }}
        className={`${className} btn round text-danger flex-c px-0`}
      >
        <FeatherIcons
          icon={'trash-2'}
          size={'1rem'}
          style={{ marginRight: 5 }}
        />{' '}
        {children}
      </button>
      <Modal
        centered
        show={showModal}
        onHide={() => {
          if (onCancel) onCancel();
          setShowModal(false);
        }}
        size="sm"
      >
        <Modal.Body style={{ textAlign: 'center' }}>
          <div className={'flex-c-c text-danger mt-2'}>
            <div
              className="flex-c-c"
              style={{
                background: 'currentColor',
                borderRadius: '100%',
                width: 40,
                height: 40,
              }}
            >
              <FeatherIcons icon={'trash-2'} style={{ stroke: '#fff' }} />
            </div>
          </div>
          <h2 className="mb-2 mt-3">Confirm</h2>
          <p className="mb-2">
            {removeText ||
              `Are you sure you want to ${(
                children || 'Remove'
              ).toLowerCase()}?`}
          </p>
        </Modal.Body>
        <Modal.Footer className={'d-flex'} style={{ gap: 3 }}>
          <button
            type={'button'}
            style={{ flex: 1 }}
            className={'btn round btn-light'}
            onClick={() => {
              if (onCancel) onCancel();
              setShowModal(false);
            }}
          >
            Cancel
          </button>
          <button
            type={'button'}
            style={{ flex: 1 }}
            className={'btn round btn-danger'}
            onClick={() => {
              onClick();
              setShowModal(false);
            }}
          >
            {children || 'Remove'}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const BtnConfirm = ({
  children,
  onCancel,
  confirmText,
  confirm = true,
  style = {},
  className = '',
  hide = false,
  onClick,
  ...props
}) => {
  const [showModal, setShowModal] = useState(false);
  const styleConst = { whiteSpace: 'nowrap' };
  return (
    <>
      <button
        type="button"
        onClick={confirm && !showModal ? () => setShowModal(true) : onClick}
        {...props}
        style={{
          ...(hide ? { display: 'none' } : {}),
          ...style,
          ...styleConst,
        }}
        className={`${className} btn btn-sm less-pad btn-primary round flex-c`}
      >
        {children}
      </button>
      <Modal
        centered
        show={showModal}
        onHide={() => {
          if (onCancel) onCancel();
          setShowModal(false);
        }}
        size="sm"
      >
        <Modal.Body style={{ textAlign: 'center' }}>
          <div className={'flex-c-c text-danger mt-2'}>
            <div
              className="flex-c-c"
              style={{
                background: 'currentColor',
                borderRadius: '100%',
                width: 40,
                height: 40,
              }}
            >
              <FeatherIcons
                icon={'alert-triangle'}
                style={{ stroke: '#fff' }}
              />
            </div>
          </div>
          <h2 className="mb-2 mt-3">Confirm</h2>
          <p className="mb-2" style={{ whiteSpace: 'break-spaces' }}>
            {confirmText || `Are you sure you want to proceed?`}
          </p>
        </Modal.Body>
        <Modal.Footer className={'d-flex'} style={{ gap: 3 }}>
          <button
            type={'button'}
            style={{ flex: 1 }}
            className={'btn round btn-light'}
            onClick={() => {
              if (onCancel) onCancel();
              setShowModal(false);
            }}
          >
            Cancel
          </button>
          <button
            type={'button'}
            style={{ flex: 1 }}
            className={'btn round btn-danger'}
            onClick={() => {
              onClick();
              setShowModal(false);
            }}
          >
            {children || 'Remove'}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const SectionHeader = styled.div`
  margin-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 500px) {
    padding: 0rem var(--content-pad); /* TODO: Make this based on content padding and change for mobile */
  }
`;
export const SectionTitle = styled.h3`
  font-family: Poppins !important;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 1.25;
  margin-bottom: 0rem;
  padding-bottom: 0rem;
  @media screen and (max-width: 500px) {
    padding-inline: 0;
  }
`;
export const SectionDescription = styled.p`
  font-size: 0.875rem;
  opacity: 0.7;
  margin-bottom: 0 !important;
`;

const Container = styled.section`
  font-size: 1.1rem;
  margin-bottom: 2.75rem;
  line-height: 1.4;
  color: #222;
  padding: var(--content-pad) var(--content-pad);
  background: #fff;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
  // @media screen and (max-width: 500px) {
  //   padding: 0 var(--content-pad);
  // }
  ${({ noBackground }) => {
    if (noBackground)
      return `
    background: transparent;
    padding: 0;
    box-shadow: none;
    @media screen and (max-width: 500px) {
      padding: 0;
    }
  `;
    return '';
  }}
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }
  > *::last-child {
    margin-bottom: 0 !important;
  }
`;

export const Section = ({
  children,
  noBackground, // no white background or shadow... less padding too
  description,
  title,
  id,
  headerActions = null,
  footer,
  footerActions,
  footerActions: { save, cancel, remove } = {},
  additionalClasses,
  ...props
}) => {
  // // Page load hash handling
  // const { pathname, hash, key } = useLocation();
  // useEffect(() => {
  //   // if not a hash link, scroll to top
  //   if (hash === '') {
  //     window.scrollTo(0, 0);
  //   }
  //   // else scroll to id
  //   else {
  //     const hashId = hash.replace('#', '');
  //     if (hashId === id) {
  //       setTimeout(() => {
  //         const element = document.getElementById(id);
  //         if (element) {
  //           element.scrollIntoView();
  //         }
  //       }, 100);
  //     }
  //   }
  // }, [pathname, hash, key]); // do this on route change
  // useScrollToHash();

  return (
    <div
      key={id}
      id={id}
      className={additionalClasses}
      style={{
        position: 'relative',
      }} // Need this for anchor placement
    >
      {(title || description || headerActions) && (
        <SectionHeader style={{ flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 3,
            }}
          >
            {title && <SectionTitle>{title}</SectionTitle>}
            {headerActions}
          </div>
          <div>
            {description && (
              <SectionDescription>{description}</SectionDescription>
            )}
          </div>
        </SectionHeader>
      )}
      {children && (
        <Container {...props} noBackground={noBackground}>
          <>
            {children}
            {(footer || footerActions) && (
              <footer className="flex-c border-top py-3 mt-3">
                {/* Option to make own footer enirely */}
                {!!footer && footer}
                {/* Option for cancel and/or submit */}
                {footerActions && (
                  <div
                    className="flex-c"
                    style={{
                      justifyContent: 'space-between',
                      gap: 5,
                      width: '100%',
                    }}
                  >
                    <div>
                      {remove && (
                        <BtnRemove
                          className={remove.className}
                          hide={remove.hide}
                          {...remove}
                        >
                          {remove.text}
                        </BtnRemove>
                      )}
                    </div>
                    <div>
                      {cancel && (
                        <Button
                          as={cancel.onClick ? 'button' : 'a'}
                          type="button"
                          style={cancel.hide ? { display: 'none' } : {}}
                          className={`${cancel.className || ''} btn round`}
                          {...cancel}
                        >
                          {cancel.text}
                        </Button>
                      )}
                      {save && (
                        <Button
                          as={save.onClick ? 'button' : 'a'}
                          type="button"
                          style={save.hide ? { display: 'none' } : {}}
                          className={`${save.className ||
                            ''} btn round btn-primary`}
                          {...save}
                        >
                          {save.text}
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </footer>
            )}
          </>
        </Container>
      )}
    </div>
  );
};

const H1 = styled.h1`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 2rem !important;
  margin-bottom: 2rem !important;
  // margin-left: 23px;
  @media screen and (max-width: 500px) {
    margin-left: var(--content-pad);
    font-size: 1.7rem !important;
    margin-top: 1rem;
    margin-bottom: 1rem !important;
  }
`;

export const PageHeader = ({ children, icon }) => {
  return (
    <H1>
      {icon && (
        <div
          style={{
            width: '1.25em',
            height: '1.25em',
            display: 'inline-flex',
            background: '#222',
            borderRadius: '100%',
            marginRight: '.3em',
          }}
        >
          <FeatherIcons
            className={'m-auto'}
            style={{ stroke: '#fff' }}
            icon={icon}
            size={'.65em'}
          />
        </div>
      )}
      {children}
    </H1>
  );
};

export const SectionListItem = ({
  children,
  style = {},
  draggable,
  order,
  lastItem,
  img,
  actions,
  ...props
}) => {
  return (
    <>
      <Container
        style={{
          padding: 0,
          position: 'relative',
          marginBottom: lastItem ? '' : 5,
          ...style,
        }}
        draggable={draggable}
        {...props}
      >
        <div className="flex-c" style={{ alignItems: 'stretch' }}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: 10,
              alignContent: 'center',
              padding:
                'calc(var(--content-pad) * .5) calc(var(--content-pad) * .5) calc(var(--content-pad) * .5) var(--content-pad)' /* TODO: Make this based on content padding and change for mobile */,
              boxShadow: "1px 1px 1px 1px #dddddd",
              // !!!!!!!  Added Box Shadow, need to change
            }}
          >
            {img || null}
            <div style={{ flex: 1 }} className={'flex-c'}>
              {children}
            </div>
            <div className={'flex-c'}>{actions}</div>
          </div>
          {draggable && (
            <div
              style={{
                width: 30,
                background: '#fff',
                borderLeft: '1px solid #ddd',
                textAlign:'center',
                alignItems:'center',
              }}
              className="flex-c-c"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-arrows-move"
                viewBox="0 0 16 16"
                style={{verticalAlign:'center'}}
              >
                <path
                  fillRule="evenodd"
                  d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"
                />
              </svg>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export const EmptySection = ({ onClick, text, btnText }) => {
  return (
    <Section noBackground>
      <div
        style={{
          borderRadius: 10,
          border: '2px dashed #ccc',
          minHeight: 100,
        }}
        className={'flex-c-c'}
      >
        <div style={{ textAlign: 'center' }} className="mb-4 mt-4">
          <div className="mb-2">{text}</div>
          <div className="flex-c-c">
            <button
              type={'button'}
              onClick={onClick}
              className="btn btn-primary round flex-c-c"
            >
              {btnText}{' '}
              <FeatherIcons
                style={{ marginLeft: 5 }}
                icon={'plus'}
                size={'1rem'}
              />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export const Toast = ({ onClose, show, title, body, style = {}, ...props }) => {
  return (
    <BootstrapToast
      animation
      onClose={onClose}
      show={show}
      delay={DEFAULT_TOAST_DELAY}
      autohide
      style={{
        borderRadius: 10,
        left: 15,
        bottom: 15,
        position: 'fixed',
        minWidth: 250,
        ...style,
      }}
      {...props}
    >
      {title && (
        <BootstrapToast.Header
          style={{ paddingTop: 10, paddingBottom: 10, color: '#222' }}
          closeButton={false}
        >
          {title}
        </BootstrapToast.Header>
      )}
      {body && (
        <BootstrapToast.Body style={{ paddingTop: 10, paddingBottom: 15 }}>
          {body}
        </BootstrapToast.Body>
      )}
    </BootstrapToast>
  );
};

